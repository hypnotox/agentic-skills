import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { afterAll, beforeEach, describe, expect, test, vi } from "vitest";
import { registerAgenticRoles } from "../extensions/pi-subagents/index.ts";

const inheritedChildMarker = process.env.PI_TOOLS_SUBAGENT_CHILD;
const root = resolve(import.meta.dirname, "..");
const extensionFile = resolve(root, "extensions/pi-subagents/index.ts");
const piToolsRoot = process.env.PI_TOOLS_CHECKOUT
  ? resolve(process.env.PI_TOOLS_CHECKOUT)
  : resolve(root, "node_modules/pi-tools");
const piToolsModule = (await import(
  pathToFileURL(resolve(piToolsRoot, "extensions/subagents/index.ts")).href
)) as {
  registerSubagents(
    pi: any,
    dependencies: { runner: { run(request: any): Promise<any>; shutdown(): Promise<void> } },
  ): void;
};

function createBus() {
  const listeners = new Map<string, Array<(value: unknown) => void>>();
  return {
    emissions: [] as Array<[string, unknown]>,
    on(name: string, listener: (value: unknown) => void) {
      const current = listeners.get(name) ?? [];
      current.push(listener);
      listeners.set(name, current);
      return () => undefined;
    },
    emit(name: string, value?: unknown) {
      this.emissions.push([name, value]);
      for (const listener of [...(listeners.get(name) ?? [])]) listener(value);
    },
  };
}

function createPi(bus: ReturnType<typeof createBus>, activeTools = ["read"]) {
  const tools: any[] = [];
  const handlers = new Map<string, any[]>();
  const api = {
    events: bus,
    registerTool(tool: any) {
      tools.push(tool);
    },
    on(name: string, handler: any) {
      handlers.set(name, [...(handlers.get(name) ?? []), handler]);
    },
    getActiveTools: () => [...activeTools],
  };
  return { api, tools, handlers };
}

function installAdapter(
  pi: ReturnType<typeof createPi>["api"],
  injectedReadFile: (path: string, encoding: "utf8") => Promise<string> = (path, encoding) =>
    readFile(path, encoding),
) {
  registerAgenticRoles(pi as never, { extensionFile, readFile: injectedReadFile });
}

const usage = {
  input: 1,
  output: 2,
  cacheRead: 0,
  cacheWrite: 0,
  totalTokens: 3,
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
};

beforeEach(() => {
  delete process.env.PI_TOOLS_SUBAGENT_CHILD;
});

afterAll(() => {
  if (inheritedChildMarker === undefined) delete process.env.PI_TOOLS_SUBAGENT_CHILD;
  else process.env.PI_TOOLS_SUBAGENT_CHILD = inheritedChildMarker;
});

describe("Pi role adapter", () => {
  test("publishes each role with a lazy loader for its frontmatter-free prompt", async () => {
    const bus = createBus();
    const pi = createPi(bus);
    const fixtures = [
      ["premise-checker.md", "subagent_grounding", "Premise fixture body."],
      ["explorer.md", "subagent_explore", "Explorer fixture body."],
      ["reviewer.md", "subagent_review_code", "Reviewer fixture body."],
      ["implementer.md", "subagent_implement", "Implementer fixture body."],
    ] as const;
    const fixtureDocuments = new Map(
      fixtures.map(([file, , body]) => [
        resolve(root, "agents", file),
        `---\nname: fixture\ndescription: ${file}\n---\n${body}\n`,
      ]),
    );
    const injectedReadFile = vi.fn(async (path: string, encoding: "utf8") => {
      expect(encoding).toBe("utf8");
      const document = fixtureDocuments.get(path);
      if (!document) throw new Error(`unexpected path: ${path}`);
      return document;
    });

    installAdapter(pi.api, injectedReadFile);

    const publication = bus.emissions.find(([name]) => name === "agentic-skills:roles")?.[1] as any[];
    expect(injectedReadFile).not.toHaveBeenCalled();
    expect(publication.map((role) => role.toolName)).toEqual(fixtures.map(([, tool]) => tool));
    for (const [index, role] of publication.entries()) {
      expect(Object.keys(role).sort()).toEqual(["description", "loadSystemPrompt", "toolName"]);
      expect(typeof role.description).toBe("string");
      expect(role.description.length).toBeGreaterThan(0);
      expect(await role.loadSystemPrompt()).toBe(fixtures[index][2]);
      expect(injectedReadFile).toHaveBeenNthCalledWith(
        index + 1,
        resolve(root, "agents", fixtures[index][0]),
        "utf8",
      );
    }
  });

  test("reports missing and empty role prompts at the loader seam", async () => {
    const bus = createBus();
    const pi = createPi(bus);
    const injectedReadFile = vi.fn(async (path: string) => {
      if (path.endsWith("premise-checker.md")) throw new Error("fixture missing");
      return "---\nname: empty\ndescription: empty fixture\n---\n  \n";
    });
    installAdapter(pi.api, injectedReadFile);

    const publication = bus.emissions.find(([name]) => name === "agentic-skills:roles")?.[1] as any[];
    await expect(publication[0].loadSystemPrompt()).rejects.toThrow(
      /Cannot load agentic role prompt .*premise-checker\.md: fixture missing/,
    );
    await expect(publication[1].loadSystemPrompt()).rejects.toThrow(
      /Agentic role prompt has no instruction body: .*explorer\.md/,
    );
  });

  test.each(["adapter before pi-tools", "pi-tools before adapter"])(
    "supports %s, repeated publication, and parent execution inheritance",
    async (order) => {
      const bus = createBus();
      const pi = createPi(bus, ["read", "handoff_session", "subagent"]);
      const requests: any[] = [];
      const forwardedPrompt = "Distinct explorer prompt forwarded to the runner.";
      const injectedReadFile = vi.fn(async (path: string) => {
        expect(path).toBe(resolve(root, "agents", "explorer.md"));
        return `---\nname: fixture\ndescription: fixture\n---\n${forwardedPrompt}\n`;
      });
      const installTools = () =>
        piToolsModule.registerSubagents(pi.api, {
          runner: {
            async run(request) {
              requests.push(request);
              return { state: "completed", report: "done", usage };
            },
            async shutdown() {},
          },
        });

      if (order === "adapter before pi-tools") {
        installAdapter(pi.api, injectedReadFile);
        installTools();
      } else {
        installTools();
        installAdapter(pi.api, injectedReadFile);
      }
      bus.emit(
        "agentic-skills:roles",
        bus.emissions.find(([name]) => name === "agentic-skills:roles")?.[1],
      );

      expect(injectedReadFile).not.toHaveBeenCalled();
      expect(pi.tools.map((tool) => tool.name)).toEqual([
        "subagent",
        "subagent_grounding",
        "subagent_explore",
        "subagent_review_code",
        "subagent_implement",
      ]);
      const explore = pi.tools.find((tool) => tool.name === "subagent_explore");
      const result = await explore.execute(
        "call",
        { task: "find the owner" },
        undefined,
        undefined,
        {
          cwd: "/project",
          model: { provider: "provider", id: "model" },
          thinkingLevel: "high",
          isProjectTrusted: () => true,
        },
      );
      expect(result.content).toEqual([{ type: "text", text: "done" }]);
      expect(injectedReadFile).toHaveBeenCalledOnce();
      expect(requests[0]).toMatchObject({
        cwd: "/project",
        task: "find the owner",
        model: { provider: "provider", id: "model" },
        thinkingLevel: "high",
        tools: ["read"],
        approved: true,
        systemPrompt: forwardedPrompt,
      });
    },
  );

  test.each(["adapter before pi-tools", "pi-tools before adapter"])(
    "exposes no delegation tools in a marked child with %s",
    (order) => {
      process.env.PI_TOOLS_SUBAGENT_CHILD = "1";
      const bus = createBus();
      const pi = createPi(bus);
      const installTools = () =>
        piToolsModule.registerSubagents(pi.api, {
          runner: { run: vi.fn(), shutdown: vi.fn(async () => undefined) },
        });
      if (order === "adapter before pi-tools") {
        installAdapter(pi.api);
        installTools();
      } else {
        installTools();
        installAdapter(pi.api);
      }
      expect(pi.tools).toEqual([]);
      expect(bus.emissions).toEqual([]);
    },
  );
});
