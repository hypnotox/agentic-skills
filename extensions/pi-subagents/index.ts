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
  {
    task: Type.String({
      minLength: 1,
      description:
        "Self-contained brief for a fresh child: include the applicable outcome, repository constraints, evidence or write boundary, and verification expectations.",
    }),
  },
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
  roleGuidance: string;
}

const ROLES: readonly RoleDefinition[] = [
  {
    id: "agentic-premise-checker",
    file: "premise-checker.md",
    toolName: "subagent_grounding",
    label: "Premise Check Subagent",
    description:
      "Adversarially test one explicit consequential premise in fresh read-only context; return supported, revise, or unresolved with evidence.",
    promptSnippet: "Test one explicit consequential premise in fresh read-only context",
    roleGuidance:
      "Minimum brief: exact premise, consequence if wrong, evidence boundary, and relevant repository constraints.",
  },
  {
    id: "agentic-explorer",
    file: "explorer.md",
    toolName: "subagent_explore",
    label: "Explore Subagent",
    description:
      "Investigate one bounded factual or structural question in fresh read-only context; return evidence, searched boundary, and uncertainty.",
    promptSnippet: "Investigate one bounded question in fresh read-only context",
    roleGuidance:
      "Minimum brief: question, evidence boundary, allowed source types, relevant repository constraints, and desired detail.",
  },
  {
    id: "agentic-reviewer",
    file: "reviewer.md",
    toolName: "subagent_review_code",
    label: "Review Subagent",
    description:
      "Independently inspect one supplied change or existing surface in fresh report-only context; return concrete findings, coverage, and uncertainty.",
    promptSnippet: "Inspect one supplied change or existing surface in fresh report-only context",
    roleGuidance:
      "Minimum brief: intended outcome, settled constraints, review or change boundary, relevant repository constraints, and verification evidence.",
  },
  {
    id: "agentic-implementer",
    file: "implementer.md",
    toolName: "subagent_implement",
    label: "Implementation Subagent",
    description:
      "Implement one settled self-contained unit with an explicit write boundary; return a completion receipt while the parent retains integration.",
    promptSnippet: "Implement one settled self-contained unit with an explicit write boundary",
    roleGuidance:
      "Minimum brief: outcome, settled constraints, explicit write boundary, relevant repository constraints, and acceptance oracle; the parent retains integration.",
  },
];

function promptGuideline(role: RoleDefinition): string {
  return `Use ${role.toolName} only for this role. The child receives only its role prompt and delegated task—not the parent transcript, installed skills, or repository context files. Include the applicable outcome, repository constraints, evidence or write boundary, and verification expectations in the task. ${role.roleGuidance} Extract only applicable repository constraints; do not paste whole instruction files by default.`;
}

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
    promptGuidelines: [promptGuideline(role)],
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
