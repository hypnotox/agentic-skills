import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const ROLE_PUBLICATION_EVENT = "agentic-skills:roles";
const ROLE_REQUEST_EVENT = "agentic-skills:roles:request";
const CHILD_MARKER = "PI_TOOLS_SUBAGENT_CHILD";

interface AgenticRole {
  toolName: string;
  description: string;
  loadSystemPrompt(): Promise<string>;
}

interface AdapterDependencies {
  extensionFile: string;
  readFile(path: string, encoding: "utf8"): Promise<string>;
}

const ROLE_DEFINITIONS = [
  {
    file: "premise-checker.md",
    toolName: "subagent_grounding",
    description:
      "Run one fresh-context, no-mutation premise check. Give a self-contained brief with the premise, consequence if wrong, evidence boundary, and applicable constraints or `none`. The child inherits the parent model, thinking level, working directory, trust state, and ordinary tools; it loads skills but not context files and cannot delegate or hand off.",
  },
  {
    file: "explorer.md",
    toolName: "subagent_explore",
    description:
      "Investigate one bounded factual or structural question in fresh report-only context. Give a self-contained brief with the question, evidence boundary, and applicable constraints or `none`; source restrictions and desired detail are optional. Expect evidence, searched boundary, and uncertainty. The child inherits the parent model, thinking level, working directory, trust state, and ordinary tools; it loads skills but not context files and cannot delegate or hand off.",
  },
  {
    file: "reviewer.md",
    toolName: "subagent_review_code",
    description:
      "Independently review one supplied change or existing surface in fresh report-only context. Give a self-contained brief with the outcome or evaluation standard, review surface, and applicable constraints or `none`; existing verification evidence is optional. Expect concrete findings, coverage, and uncertainty. The child inherits the parent model, thinking level, working directory, trust state, and ordinary tools; it loads skills but not context files and cannot delegate or hand off.",
  },
  {
    file: "implementer.md",
    toolName: "subagent_implement",
    description:
      "Implement one settled self-contained unit in fresh context. Give a self-contained brief with the outcome, settled constraints, explicit write boundary, applicable constraints or `none`, and acceptance checks; the parent retains integration and final verification. The child inherits the parent model, thinking level, working directory, trust state, and ordinary tools; it loads skills but not context files and cannot delegate or hand off.",
  },
] as const;

function instructionBody(content: string, path: string): string {
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "").trim();
  if (!body) throw new Error(`Agentic role prompt has no instruction body: ${path}`);
  return body;
}

export function registerAgenticRoles(pi: ExtensionAPI, dependencies: AdapterDependencies): void {
  if (process.env[CHILD_MARKER] === "1") return;

  const packageRoot = resolve(dirname(dependencies.extensionFile), "../..");
  const roles: AgenticRole[] = ROLE_DEFINITIONS.map((role) => ({
    toolName: role.toolName,
    description: role.description,
    async loadSystemPrompt() {
      const path = join(packageRoot, "agents", role.file);
      try {
        return instructionBody(await dependencies.readFile(path, "utf8"), path);
      } catch (error) {
        if (error instanceof Error && error.message.startsWith("Agentic role prompt")) throw error;
        throw new Error(
          `Cannot load agentic role prompt ${path}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    },
  }));

  const publish = (): void => pi.events.emit(ROLE_PUBLICATION_EVENT, roles);
  pi.events.on(ROLE_REQUEST_EVENT, publish);
  publish();
}

export default function agenticSubagents(pi: ExtensionAPI): void {
  registerAgenticRoles(pi, {
    extensionFile: fileURLToPath(import.meta.url),
    readFile,
  });
}
