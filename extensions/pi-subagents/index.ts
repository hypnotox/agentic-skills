import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import type {
  ProfileCapability,
  ProfileDefinition,
  ProfileRegistrationResult,
} from "pi-tools/subagent-profile";

const PROTOCOL_VERSION = 2;
const REGISTRATION_ID = "agentic-skills:subagent-profiles:v2";
const REQUEST_EVENT = "pi-tools:subagent-profiles:request";
const CAPABILITY_EVENT = "pi-tools:subagent-profiles:capability";
const RESULT_EVENT = "pi-tools:subagent-profiles:registration-result";

const TASK_PARAMETERS = Type.Object(
  { task: Type.String({ minLength: 1, description: "Self-contained task for the selected role." }) },
  { additionalProperties: false },
);
const EMPTY_PROFILE_DATA = Type.Object({}, { additionalProperties: false });

interface AdapterDependencies {
  extensionFile: string;
  readFile(path: string, encoding: "utf8"): Promise<string>;
  randomId(): string;
}

interface RoleDefinition {
  id: string;
  file: string;
  toolName: string;
  label: string;
  description: string;
  promptSnippet: string;
  promptGuideline: string;
}

const ROLES: readonly RoleDefinition[] = [
  {
    id: "agentic-premise-checker",
    file: "premise-checker.md",
    toolName: "subagent_grounding",
    label: "Premise Check Subagent",
    description: "Challenge one consequential premise against a bounded evidence set.",
    promptSnippet: "Challenge a consequential premise in fresh read-only context",
    promptGuideline:
      "Use subagent_grounding for one self-contained premise challenge when fresh adversarial evidence would materially improve the route.",
  },
  {
    id: "agentic-explorer",
    file: "explorer.md",
    toolName: "subagent_explore",
    label: "Explore Subagent",
    description: "Investigate one bounded question in fresh read-only context.",
    promptSnippet: "Investigate a bounded evidence question in fresh read-only context",
    promptGuideline:
      "Use subagent_explore for one self-contained bounded investigation when separate fresh context is useful.",
  },
  {
    id: "agentic-reviewer",
    file: "reviewer.md",
    toolName: "subagent_review_code",
    label: "Review Subagent",
    description: "Perform one fresh, report-only review of supplied change context.",
    promptSnippet: "Delegate an evidence-backed report-only review to fresh context",
    promptGuideline:
      "Use subagent_review_code with one combined review brief when independent risk-based scrutiny is warranted.",
  },
  {
    id: "agentic-implementer",
    file: "implementer.md",
    toolName: "subagent_implement",
    label: "Implementation Subagent",
    description: "Implement one bounded unit in the active project with an explicit write boundary.",
    promptSnippet: "Delegate one bounded implementation unit in the active project",
    promptGuideline:
      "Use subagent_implement for one self-contained implementation unit with explicit assigned paths; preserve integration and final verification for the parent.",
  },
];

function instructionBody(content: string, path: string): string {
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "").trim();
  if (!body) throw new Error(`Agentic role prompt has no instruction body: ${path}`);
  return body;
}

export function registerAgenticProfiles(pi: ExtensionAPI, dependencies: AdapterDependencies): void {
  const packageRoot = resolve(dirname(dependencies.extensionFile), "../..");
  const correlationId = dependencies.randomId();
  let sessionContext:
    | { ui?: { notify?(message: string, type: "error"): void } }
    | undefined;
  let registered = false;
  let failureReason: string | undefined;
  let notified = false;

  const reportUnavailable = (reason: string): void => {
    failureReason ??= reason;
    if (!sessionContext || notified || registered) return;
    notified = true;
    sessionContext.ui?.notify?.(
      `Agentic role delegation is unavailable (${failureReason}). Install or update hypnotox/pi-tools with subagent-profile protocol v2, then reload Pi. The agentic-skills Markdown skills remain available.`,
      "error",
    );
  };

  const profiles: ProfileDefinition<typeof TASK_PARAMETERS>[] = ROLES.map((role) => ({
    id: role.id,
    toolName: role.toolName,
    label: role.label,
    description: role.description,
    promptSnippet: role.promptSnippet,
    promptGuidelines: [role.promptGuideline],
    parameters: TASK_PARAMETERS,
    profileDataSchema: EMPTY_PROFILE_DATA,
    selectModel: ({ parent }) => parent.model,
    async prepare({ args, parent }) {
      const promptPath = join(packageRoot, "agents", role.file);
      let content: string;
      try {
        content = await dependencies.readFile(promptPath, "utf8");
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Cannot load agentic role prompt ${promptPath}: ${detail}`);
      }
      return {
        cwd: parent.cwd,
        systemPrompt: instructionBody(content, promptPath),
        prompt: args.task,
        toolPolicy: { mode: "inherit", deny: [] },
      };
    },
  }));

  const acceptCapability = (value: unknown): void => {
    const capability = value as Partial<ProfileCapability>;
    if (capability.correlationId !== undefined && capability.correlationId !== correlationId) return;
    if (capability.protocolVersion !== PROTOCOL_VERSION || typeof capability.register !== "function") {
      failureReason ??= "an incompatible pi-tools capability responded";
      return;
    }
    try {
      const receipt = capability.register({ registrationId: REGISTRATION_ID, profiles });
      if (receipt.state === "registered") registered = true;
      else if (receipt.state === "rejected" || receipt.state === "late")
        reportUnavailable(receipt.reason ?? `profile registration was ${receipt.state}`);
    } catch (error) {
      reportUnavailable(error instanceof Error ? error.message : String(error));
    }
  };

  pi.events?.on?.(CAPABILITY_EVENT, acceptCapability);
  pi.events?.on?.(RESULT_EVENT, (value: unknown) => {
    const result = value as Partial<ProfileRegistrationResult>;
    if (result.registrationId !== REGISTRATION_ID) return;
    if (result.protocolVersion === PROTOCOL_VERSION && result.state === "registered") {
      registered = true;
      return;
    }
    reportUnavailable(result.reason ?? "profile registration was rejected");
  });
  pi.events?.emit?.(REQUEST_EVENT, { protocolVersion: PROTOCOL_VERSION, correlationId });

  pi.on("session_start", (_event, context) => {
    sessionContext = context;
    setTimeout(() => {
      if (!registered)
        reportUnavailable(failureReason ?? "pi-tools is missing, late, or does not support protocol v2");
    }, 0);
  });
}

export default function agenticSubagents(pi: ExtensionAPI): void {
  registerAgenticProfiles(pi, {
    extensionFile: fileURLToPath(import.meta.url),
    readFile,
    randomId: randomUUID,
  });
}
