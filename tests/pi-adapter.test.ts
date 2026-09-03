import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createExtensionRecorder } from "pi-tools/testing";
import { createSubagentToolkit } from "../node_modules/pi-tools/extensions/subagents/index.ts";
import type { RunRequest } from "../node_modules/pi-tools/extensions/subagents/runner.ts";
import { describe, expect, test } from "vitest";
import { registerAgenticProfiles } from "../extensions/pi-subagents/index.ts";

const root = resolve(import.meta.dirname, "..");
const extensionFile = resolve(root, "extensions/pi-subagents/index.ts");
const nextTask = () => new Promise<void>((resolvePromise) => setTimeout(resolvePromise, 0));

function profileContext(task = "inspect this") {
  return {
    args: { task },
    parent: {
      cwd: "/live/active-project",
      activeTools: ["read"],
      model: { provider: "test", id: "model", thinkingLevels: ["off"] as const },
      thinkingLevel: "off" as const,
      trusted: true,
    },
    signal: new AbortController().signal,
  };
}

async function adapterHarness() {
  const recorder = createExtensionRecorder();
  await recorder.install((pi) =>
    registerAgenticProfiles(pi, {
      extensionFile,
      readFile,
      randomId: () => "test-correlation",
    }),
  );
  await recorder.ready;
  return recorder;
}

describe("Pi profile adapter", () => {
  test("negotiates protocol v2 and registers all canonical roles", async () => {
    const recorder = await adapterHarness();
    const request = recorder.emissions.find(
      ([name]) => name === "pi-tools:subagent-profiles:request",
    )?.[1] as { protocolVersion: number; correlationId: string };
    let batch: any;

    recorder.api.events.emit("pi-tools:subagent-profiles:capability", {
      protocolVersion: 2,
      correlationId: request.correlationId,
      register(value: unknown) {
        batch = value;
        return { state: "pending" };
      },
    });

    expect(request).toEqual({ protocolVersion: 2, correlationId: "test-correlation" });
    expect(batch.registrationId).toBe("agentic-skills:subagent-profiles:v2");
    expect(batch.suppressDefault).toBeUndefined();
    expect(batch.profiles.map((profile: any) => profile.id)).toEqual([
      "agentic-premise-checker",
      "agentic-explorer",
      "agentic-reviewer",
      "agentic-implementer",
    ]);
    expect(batch.profiles.map((profile: any) => profile.toolName)).toEqual([
      "subagent_grounding",
      "subagent_explore",
      "subagent_review_code",
      "subagent_implement",
    ]);

    const context = profileContext("bounded question");
    for (const profile of batch.profiles) {
      expect(await profile.selectModel(context)).toBe(context.parent.model);
      const prepared = await profile.prepare(context);
      expect(prepared.cwd).toBe("/live/active-project");
      expect(prepared.prompt).toBe("bounded question");
      expect(prepared.toolPolicy).toEqual({ mode: "inherit", deny: [] });
      expect(prepared.systemPrompt).not.toMatch(/^---/);
      expect(prepared.systemPrompt).toMatch(/^# /);
    }

    recorder.api.events.emit("pi-tools:subagent-profiles:registration-result", {
      protocolVersion: 2,
      registrationId: batch.registrationId,
      state: "registered",
    });
    await recorder.invokeRaw("session_start");
    await nextTask();
    expect(recorder.ui.calls).toEqual([]);
  });

  test("reports missing, incompatible, and rejected providers clearly", async () => {
    const missing = await adapterHarness();
    await missing.invokeRaw("session_start");
    await nextTask();
    expect(missing.ui.calls[0]?.args[0]).toMatch(/role delegation is unavailable.*pi-tools.*protocol v2/i);

    const incompatible = await adapterHarness();
    incompatible.api.events.emit("pi-tools:subagent-profiles:capability", {
      protocolVersion: 1,
      correlationId: "test-correlation",
      register() {
        throw new Error("must not register");
      },
    });
    await incompatible.invokeRaw("session_start");
    await nextTask();
    expect(incompatible.ui.calls[0]?.args[0]).toMatch(/incompatible pi-tools capability/i);

    const rejected = await adapterHarness();
    rejected.api.events.emit("pi-tools:subagent-profiles:capability", {
      protocolVersion: 2,
      correlationId: "test-correlation",
      register() {
        return { state: "rejected", reason: "tool collision" };
      },
    });
    await rejected.invokeRaw("session_start");
    await nextTask();
    expect(rejected.ui.calls[0]?.args[0]).toMatch(/tool collision/);
  });

  test("delegates through pi-tools in the live active project", async () => {
    const recorder = createExtensionRecorder({ activeTools: ["read"] });
    recorder.modelRegistry.configuredAuth = true;
    const model: any = {
      provider: "test",
      id: "model",
      name: "Model",
      api: "openai-completions",
      reasoning: false,
      input: ["text"],
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      contextWindow: 100_000,
      maxTokens: 4_096,
    };
    recorder.modelRegistry.add(model);
    const requests: RunRequest[] = [];

    await recorder.install((pi) =>
      registerAgenticProfiles(pi, {
        extensionFile,
        readFile,
        randomId: () => "integrated-correlation",
      }),
    );
    await recorder.install((pi) =>
      createSubagentToolkit(pi, {
        runner: {
          async run(request: RunRequest) {
            requests.push(request);
            return {
              state: "completed",
              report: "done",
              usage: {
                input: 0,
                output: 0,
                cacheRead: 0,
                cacheWrite: 0,
                totalTokens: 0,
                cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
              },
              activity: [],
              omittedActivity: 0,
              retries: 0,
              retryActive: false,
            };
          },
          async shutdown() {},
        },
      }),
    );
    await recorder.ready;

    const context = recorder.makeContext({
      cwd: "/live/active-project",
      model,
      thinkingLevel: "off",
      modelRegistry: recorder.modelRegistry.registry as any,
    });
    await recorder.invokeRaw("session_start", {}, context);
    await nextTask();

    const result: any = await recorder.invokeToolDirect(
      "subagent_explore",
      { task: "find the owner" },
      { context },
    );
    expect(result.content[0].text).toBe("done");
    expect(requests).toHaveLength(1);
    expect(requests[0].prepared.cwd).toBe("/live/active-project");
    expect(requests[0].prepared.prompt).toBe("find the owner");
    expect(requests[0].prepared.systemPrompt).toContain("# Explorer");
    expect(requests[0].prepared.systemPrompt).not.toContain("name: agentic-explorer");
  });

  test("contains no target-repository write or process API", async () => {
    const source = await readFile(extensionFile, "utf8");
    expect(source).not.toMatch(/\b(writeFile|mkdir|rename|unlink|appendEntry|exec)\b/);
    expect(source).not.toMatch(/\.awf\/|agentic-workflows/i);
  });
});
