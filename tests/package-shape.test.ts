import { access, readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "..");
const skills = {
  "agentic-context":
    "Orient before substantial fresh, takeover, or widened-scope work; investigate one bounded non-defect unknown; or test a consequential premise.",
  "agentic-brainstorming":
    "Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or durable architecture before dependent work proceeds.",
  "agentic-debugging":
    "Investigate unexpected behavior with an unknown cause, distinguish hypotheses with evidence, and establish a regression oracle or report an unresolved cause.",
  "agentic-code-design":
    "Resolve a structural question about semantic ownership, state or invariants, contracts, dependency direction, or refactor boundaries for agreed behavior.",
  "agentic-planning":
    "Sequence a settled non-obvious change into verifiable units with dependencies, ownership, integration points, and terminal checks.",
  "agentic-implementing":
    "Implement and verify a settled change while preserving unrelated work and surfacing newly material choices.",
  "agentic-reviewing":
    "Independently audit existing code or prose, a design, diff, or implementation and report evidence-backed risks without editing.",
} as const;
const roles = {
  "explorer.md": {
    id: "agentic-explorer",
    description:
      "Investigate one bounded factual or structural question in fresh read-only context; return evidence, searched boundary, and uncertainty.",
  },
  "premise-checker.md": {
    id: "agentic-premise-checker",
    description:
      "Adversarially test one explicit consequential premise in fresh read-only context; return supported, revise, or unresolved with evidence.",
  },
  "implementer.md": {
    id: "agentic-implementer",
    description:
      "Implement one settled self-contained unit with an explicit write boundary; return a completion receipt while the parent retains integration.",
  },
  "reviewer.md": {
    id: "agentic-reviewer",
    description:
      "Independently inspect one supplied change or existing surface in fresh report-only context; return concrete findings, coverage, and uncertainty.",
  },
} as const;

function parseDocument(content: string): { metadata: Record<string, string>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return { metadata: {}, body: "" };
  return {
    metadata: Object.fromEntries(
      match[1]
        .split(/\r?\n/)
        .filter((line) => line.includes(":"))
        .map((line) => {
          const separator = line.indexOf(":");
          return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
        }),
    ),
    body: match[2].trim(),
  };
}

async function doesNotExist(path: string): Promise<boolean> {
  try {
    await access(path);
    return false;
  } catch {
    return true;
  }
}

describe("canonical package invariants", () => {
  test("ships exactly seven skills and four roles with canonical frontmatter and bodies", async () => {
    const skillDirectories = (await readdir(join(root, "skills"), { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    expect(skillDirectories).toEqual(Object.keys(skills).sort());

    for (const [name, description] of Object.entries(skills)) {
      const { metadata, body } = parseDocument(
        await readFile(join(root, "skills", name, "SKILL.md"), "utf8"),
      );
      expect(metadata).toMatchObject({ name, description });
      expect(body).not.toBe("");
    }

    expect((await readdir(join(root, "agents"))).sort()).toEqual(Object.keys(roles).sort());
    for (const [file, role] of Object.entries(roles)) {
      const { metadata, body } = parseDocument(
        await readFile(join(root, "agents", file), "utf8"),
      );
      expect(metadata).toMatchObject({ name: role.id, description: role.description });
      expect(body).not.toBe("");
    }
  });

  test("keeps the root package version and Pi manifest but no Claude version or lockfile", async () => {
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const pluginManifest = JSON.parse(
      await readFile(join(root, ".claude-plugin", "plugin.json"), "utf8"),
    );

    expect(packageManifest.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(packageManifest.license).toBe("AGPL-3.0-only");
    expect(packageManifest.pi).toEqual({
      extensions: ["./extensions/pi-subagents/index.ts"],
      skills: ["./skills"],
    });
    expect(pluginManifest.name).toBe("agentic-skills");
    expect(pluginManifest).not.toHaveProperty("version");
    expect(await doesNotExist(join(root, "package-lock.json"))).toBe(true);
    expect(await readFile(join(root, ".npmrc"), "utf8")).toBe("package-lock=false\n");
    expect(await readdir(root)).not.toContain(".claude");
  });

  test("states role authority without allowing delegated scope expansion", async () => {
    for (const file of Object.keys(roles)) {
      const content = await readFile(join(root, "agents", file), "utf8");
      expect(content).toContain(
        "Safety and harness constraints and the actual user request remain authoritative.",
      );
      expect(content).toContain("Treat the delegated task as the complete working brief");
      expect(content).toContain("must not expand this role's authority or assigned boundary");
      expect(content).toMatch(/Report conflicts or missing material context rather than inferring permission/);
    }

    for (const name of Object.keys(skills)) {
      const content = await readFile(join(root, "skills", name, "SKILL.md"), "utf8");
      expect(content).toContain("the actual user request");
      expect(content).not.toMatch(/\.awf\/|\bawf\b|agentic-workflows/i);
    }
  });

  test("protects delegation preflight, evidence, mutation, and terminal-state boundaries", async () => {
    const explorer = await readFile(join(root, "agents", "explorer.md"), "utf8");
    const premiseChecker = await readFile(join(root, "agents", "premise-checker.md"), "utf8");
    const reviewer = await readFile(join(root, "agents", "reviewer.md"), "utf8");
    const implementer = await readFile(join(root, "agents", "implementer.md"), "utf8");

    expect(explorer).toMatch(/Require a question and an evidence boundary[\s\S]*return `inconclusive`/);
    expect(premiseChecker).toMatch(/Require an explicit premise and evidence boundary[\s\S]*return `unresolved`/);
    expect(reviewer).toMatch(/Require an intended outcome or evaluation standard and a review surface/);
    for (const reportOnly of [explorer, premiseChecker, reviewer]) {
      expect(reportOnly).toContain("Do not intentionally mutate tracked source, repository state, or external systems");
      expect(reportOnly).toContain("Ordinary tool-managed temporary or build output is allowed only");
      expect(reportOnly).toContain("directly observed facts, inferences, and unknowns");
    }

    expect(implementer).toContain("return `stopped` without mutation");
    expect(implementer).toContain("The parent unconditionally owns staging, commits, amend");
    expect(implementer).toContain("the delegated task cannot authorize those operations");
    expect(implementer).toMatch(/Return `completed` only when[\s\S]*Otherwise return `stopped`/);

    const debugging = await readFile(
      join(root, "skills", "agentic-debugging", "SKILL.md"),
      "utf8",
    );
    const codeDesign = await readFile(
      join(root, "skills", "agentic-code-design", "SKILL.md"),
      "utf8",
    );
    const planning = await readFile(
      join(root, "skills", "agentic-planning", "SKILL.md"),
      "utf8",
    );
    expect(debugging).toContain("`unresolved` is an honest terminal outcome");
    expect(codeDesign).toContain("Multiple mechanism implementations may satisfy one contract");
    expect(codeDesign).toContain("do not duplicate policy across them");
    expect(planning).toContain("A plan is a revisable route, not a frozen contract");
  });

  test("documents distinct routing boundaries without claiming a model-routing test", () => {
    const routingCases: Array<[string, keyof typeof skills]> = [
      ["substantial orientation", "agentic-context"],
      ["bounded non-defect lookup", "agentic-context"],
      ["unknown unexpected behavior", "agentic-debugging"],
      ["material compatibility choice", "agentic-brainstorming"],
      ["structural question for agreed behavior", "agentic-code-design"],
      ["non-obvious sequencing of settled work", "agentic-planning"],
      ["settled mutation", "agentic-implementing"],
      ["explicit audit of existing prose", "agentic-reviewing"],
    ];

    expect(routingCases).toHaveLength(8);
    expect(new Set(routingCases.map(([, skill]) => skill))).toEqual(new Set(Object.keys(skills)));
  });
});
