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

function installAdapter(pi: ReturnType<typeof createPi>["api"]) {
  registerAgenticRoles(pi as never, { extensionFile, readFile });
}

const requiredBriefByTool = new Map([
  ["subagent_grounding", "premise, consequence if wrong, evidence boundary"],
  ["subagent_explore", "question, evidence boundary"],
  ["subagent_review_code", "outcome or evaluation standard, review surface"],
  ["subagent_implement", "outcome, settled constraints, explicit write boundary"],
]);

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
  test("publishes the complete local three-field role payload", async () => {
    const bus = createBus();
    const pi = createPi(bus);
    installAdapter(pi.api);

    const publication = bus.emissions.find(([name]) => name === "agentic-skills:roles")?.[1] as any[];
    expect(publication.map((role) => role.toolName)).toEqual([
      "subagent_grounding",
      "subagent_explore",
      "subagent_review_code",
      "subagent_implement",
    ]);
    for (const role of publication) {
      expect(Object.keys(role).sort()).toEqual(["description", "loadSystemPrompt", "toolName"]);
      expect(role.description).toContain("self-contained");
      expect(role.description).toContain(requiredBriefByTool.get(role.toolName));
      expect(role.description).toContain("applicable constraints or `none`");
      expect(role.description).toContain("inherits the parent model");
      expect(role.description).toContain("loads skills but not context files");
      expect(role.description).toContain("cannot delegate or hand off");
      expect(await role.loadSystemPrompt()).toMatch(/^# /);
    }
  });

  test.each(["adapter before pi-tools", "pi-tools before adapter"])(
    "supports %s, repeated publication, and parent execution inheritance",
    async (order) => {
      const bus = createBus();
      const pi = createPi(bus, ["read", "handoff_session", "subagent"]);
      const requests: any[] = [];
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
        installAdapter(pi.api);
        installTools();
      } else {
        installTools();
        installAdapter(pi.api);
      }
      bus.emit(
        "agentic-skills:roles",
        bus.emissions.find(([name]) => name === "agentic-skills:roles")?.[1],
      );

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
      expect(requests[0]).toMatchObject({
        cwd: "/project",
        task: "find the owner",
        model: { provider: "provider", id: "model" },
        thinkingLevel: "high",
        tools: ["read"],
        approved: true,
        systemPrompt: expect.stringContaining("# Explorer"),
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
