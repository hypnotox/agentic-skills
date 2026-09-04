import { access, readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { parse } from "yaml";

const root = resolve(import.meta.dirname, "..");
const skillNames = [
  "agentic-artifact-design",
  "agentic-brainstorming",
  "agentic-code-design",
  "agentic-context",
  "agentic-debugging",
  "agentic-implementing",
  "agentic-planning",
  "agentic-reviewing",
] as const;
const roleSpecs = {
  "explorer.md": {
    name: "agentic-explorer",
    tool: "subagent_explore",
    routing: [
      /\b(?:investigat\w*|explor\w*|research\w*)\b/i,
      /\bbounded\b/i,
      /\bquestion\b/i,
      /\bfresh\b/i,
      /\b(?:read|report)-only context\b/i,
    ],
    brief: [/\bquestion\b/i, /evidence boundary/i, /applicable constraints/i, /`none`/],
  },
  "premise-checker.md": {
    name: "agentic-premise-checker",
    tool: "subagent_grounding",
    routing: [
      /\b(?:test\w*|check\w*|challeng\w*|falsif\w*)\b/i,
      /\bconsequential\b/i,
      /\bpremise\b/i,
      /\bfresh\b/i,
      /\b(?:read|report)-only context\b/i,
    ],
    brief: [
      /\bpremise\b/i,
      /consequence if wrong/i,
      /evidence boundary/i,
      /applicable constraints/i,
      /`none`/,
    ],
  },
  "reviewer.md": {
    name: "agentic-reviewer",
    tool: "subagent_review_code",
    routing: [
      /\b(?:review\w*|inspect\w*|audit\w*)\b/i,
      /\b(?:surface|change|work)\b/i,
      /\bfresh\b/i,
      /\b(?:read|report)-only context\b/i,
    ],
    brief: [
      /outcome or evaluation standard/i,
      /review surface/i,
      /applicable constraints/i,
      /`none`/,
    ],
  },
  "implementer.md": {
    name: "agentic-implementer",
    tool: "subagent_implement",
    routing: [
      /\b(?:implement\w*|deliver\w*|change\w*)\b/i,
      /\bsettled\b/i,
      /\b(?:unit|change|work)\b/i,
      /\bfresh context\b/i,
    ],
    brief: [
      /\boutcome\b/i,
      /settled constraints/i,
      /write boundary/i,
      /applicable constraints/i,
      /`none`/,
      /acceptance checks/i,
    ],
  },
} as const;

function parseDocument(content: string): { metadata: Record<string, string>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return { metadata: {}, body: "" };

  try {
    const value: unknown = parse(match[1]);
    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value) ||
      Object.values(value).some((entry) => typeof entry !== "string")
    )
      return { metadata: {}, body: "" };
    return { metadata: value as Record<string, string>, body: match[2].trim() };
  } catch {
    return { metadata: {}, body: "" };
  }
}

async function doesNotExist(path: string): Promise<boolean> {
  try {
    await access(path);
    return false;
  } catch {
    return true;
  }
}

async function readRole(file: keyof typeof roleSpecs): Promise<string> {
  return readFile(join(root, "agents", file), "utf8");
}

describe("canonical package invariants", () => {
  test("ships only the canonical skills and roles with valid nonempty documents", async () => {
    const skillDirectories = (await readdir(join(root, "skills"), { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    expect(skillDirectories).toEqual([...skillNames].sort());

    for (const name of skillNames) {
      const { metadata, body } = parseDocument(
        await readFile(join(root, "skills", name, "SKILL.md"), "utf8"),
      );
      expect(metadata.name).toBe(name);
      expect(metadata.description?.trim().length).toBeGreaterThan(0);
      expect(Object.keys(metadata).sort()).toEqual(["description", "name"]);
      expect(body.length).toBeGreaterThan(0);
    }

    expect((await readdir(join(root, "agents"))).sort()).toEqual(Object.keys(roleSpecs).sort());
    for (const [file, spec] of Object.entries(roleSpecs)) {
      const { metadata, body } = parseDocument(await readRole(file as keyof typeof roleSpecs));
      expect(metadata.name).toBe(spec.name);
      expect(metadata.description?.trim().length).toBeGreaterThan(0);
      expect(Object.keys(metadata).sort()).toEqual(["description", "name"]);
      expect(body.length).toBeGreaterThan(0);
    }
  });

  test("keeps repository instructions local and bridges Claude to their canonical owner", async () => {
    const agents = await readFile(join(root, "AGENTS.md"), "utf8");
    const claude = await readFile(join(root, "CLAUDE.md"), "utf8");
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const wordCount = agents.match(/\b[\w'-]+\b/g)?.length ?? 0;

    expect(wordCount).toBeGreaterThanOrEqual(100);
    expect(wordCount).toBeLessThanOrEqual(150);
    expect(agents).toMatch(/skills\/\*\/SKILL\.md[\s\S]*generic methods/i);
    expect(agents).toMatch(/agents\/\*\.md[\s\S]*role behavior/i);
    expect(agents).toMatch(/extensions\/pi-subagents\/index\.ts[\s\S]*bridges[\s\S]*roles[\s\S]*Pi/i);
    expect(agents).toMatch(/README[\s\S]*explains use[\s\S]*tests[\s\S]*contracts/i);
    expect(agents).toMatch(/Role and delegated-brief boundaries[\s\S]*loaded skill/i);
    expect(agents).toMatch(/latest[\s\S]*no version pins[\s\S]*no lockfile/i);
    expect(agents).toMatch(/cross-harness design thin[\s\S]*persistence[\s\S]*orchestration/i);
    for (const command of ["npm install", "npm run check", "npm pack --dry-run"])
      expect(agents).toContain(command);

    expect(claude).toBe("@AGENTS.md\n");
    expect([...packageManifest.files].sort()).toEqual(
      [
        ".claude-plugin",
        "agents",
        "extensions",
        "skills",
        "LICENSE",
        "NOTICE",
        "README.md",
      ].sort(),
    );
    expect(packageManifest.files).not.toContain("AGENTS.md");
    expect(packageManifest.files).not.toContain("CLAUDE.md");
  });

  test("uses always-current development sources and creates no lockfile", async () => {
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
    expect(packageManifest.peerDependencies).toEqual({
      "@earendil-works/pi-coding-agent": "*",
      typebox: "*",
    });
    for (const dependency of [
      "@earendil-works/pi-coding-agent",
      "@types/node",
      "typebox",
      "typescript",
      "vitest",
      "yaml",
    ]) {
      expect(packageManifest.devDependencies).toHaveProperty(dependency);
    }
    const currentSourceExceptions = {
      "@earendil-works/pi-coding-agent":
        "https://github.com/hypnotox/pi/releases/latest/download/pi-coding-agent.tgz",
      "pi-tools": "https://github.com/hypnotox/pi-tools/archive/refs/heads/main.tar.gz",
    };
    for (const [dependency, source] of Object.entries(packageManifest.devDependencies)) {
      if (dependency in currentSourceExceptions)
        expect(source).toBe(currentSourceExceptions[dependency as keyof typeof currentSourceExceptions]);
      else expect(source).toBe("*");
    }

    expect(await readFile(join(root, ".npmrc"), "utf8")).toBe("package-lock=false\n");
    expect(await doesNotExist(join(root, "package-lock.json"))).toBe(true);
    expect(pluginManifest.name).toBe("agentic-skills");
    expect(pluginManifest.version).toBe(packageManifest.version);
    expect(packageManifest.scripts.check).toContain("claude plugin validate .");
    expect(packageManifest.scripts.check).toContain("claude plugin validate --strict skills");
    expect(packageManifest.scripts.check).toContain("claude plugin validate --strict agents");
  });

  test("requires the same minimum fresh-context brief in metadata and role preflight", async () => {
    for (const [file, spec] of Object.entries(roleSpecs)) {
      const { metadata, body } = parseDocument(await readRole(file as keyof typeof roleSpecs));
      const routingClause = metadata.description.split(/[.;]/, 1)[0];
      for (const signal of spec.routing) expect(routingClause).toMatch(signal);
      for (const requirement of spec.brief) {
        expect(metadata.description).toMatch(requirement);
        expect(body).toMatch(requirement);
      }
      expect(body).toMatch(/Cite the repository path[\s\S]*load-bearing constraint/i);
      expect(body).toMatch(/Source restrictions[\s\S]*optional/i);
    }
  });

  test("keeps role authority inside the brief and forbids further delegation", async () => {
    for (const file of Object.keys(roleSpecs) as Array<keyof typeof roleSpecs>) {
      const content = await readRole(file);
      expect(content).toMatch(/Safety[\s\S]*permissions[\s\S]*harness constraints[\s\S]*authoritative/i);
      expect(content).toMatch(/delegated brief[\s\S]*repository instructions[\s\S]*govern/i);
      expect(content).toMatch(/brief may narrow[\s\S]*never expand/i);
      expect(content).toMatch(/role and brief[\s\S]*boundary[\s\S]*loaded skills[\s\S]*method/i);
      expect(content).toMatch(/conflicts or missing material context[\s\S]*inferring permission/i);
      expect(content).toContain("Do not delegate.");
      expect(content).not.toContain("actual user request");
    }

    for (const name of skillNames) {
      const content = await readFile(join(root, "skills", name, "SKILL.md"), "utf8");
      expect(content).not.toContain("actual user request");
    }
  });

  test("protects report-only and implementer terminal boundaries", async () => {
    const explorer = await readRole("explorer.md");
    const premiseChecker = await readRole("premise-checker.md");
    const reviewer = await readRole("reviewer.md");
    const implementer = await readRole("implementer.md");

    for (const reportOnly of [explorer, premiseChecker, reviewer]) {
      const mutationBoundary = reportOnly.match(/Do not modify[^.\n]*\./i)?.[0];
      expect(mutationBoundary).toMatch(/tracked files/i);
      expect(mutationBoundary).toMatch(/Git state/i);
      expect(mutationBoundary).toMatch(/external systems/i);
      expect(reportOnly).toMatch(/Evidence commands[\s\S]*transient output/i);
      expect(reportOnly).toMatch(/leave no intentional artifacts/i);
      expect(reportOnly).toMatch(/directly observed facts, inferences, and unknowns/i);
    }

    expect(explorer).toMatch(/return `inconclusive`[\s\S]*searched boundary/i);
    expect(premiseChecker).toMatch(/`supported`[\s\S]*`revise`[\s\S]*`unresolved`/i);
    expect(premiseChecker).toMatch(/Lack of evidence is not support/i);
    expect(reviewer).toMatch(/missing input[\s\S]*cannot be assessed/i);
    expect(reviewer).toMatch(/say when no finding was established/i);

    expect(implementer).toMatch(/return `stopped` without mutation/i);
    expect(implementer).toMatch(/Mutate only the explicit write boundary/i);
    expect(implementer).toMatch(/parent owns staging[\s\S]*commits[\s\S]*integration/i);
    expect(implementer).toMatch(/shared or cross-unit generated outputs[\s\S]*parent/i);
    expect(implementer).toMatch(
      /explicit, non-overlapping generated output[\s\S]*write boundary[\s\S]*source ownership/i,
    );
    const materialBoundary = implementer.match(/[^.\n]*system direction[^.\n]*\./i)?.[0];
    for (const subject of [
      "outcome",
      "scope",
      "compatibility",
      "safety",
      "user-visible behavior",
      "system direction",
    ])
      expect(materialBoundary).toMatch(new RegExp(subject, "i"));
    expect(implementer).toMatch(/material[\s\S]*choice[\s\S]*stop before work depends on it/i);
    expect(implementer).toMatch(/Return `completed` only when[\s\S]*Otherwise return `stopped`/i);
  });

  test("keeps skill ownership, mutation authority, and terminal outputs aligned", async () => {
    const artifact = await readFile(
      join(root, "skills", "agentic-artifact-design", "SKILL.md"),
      "utf8",
    );
    const brainstorming = await readFile(
      join(root, "skills", "agentic-brainstorming", "SKILL.md"),
      "utf8",
    );
    const codeDesign = await readFile(
      join(root, "skills", "agentic-code-design", "SKILL.md"),
      "utf8",
    );
    const context = await readFile(join(root, "skills", "agentic-context", "SKILL.md"), "utf8");
    const debugging = await readFile(
      join(root, "skills", "agentic-debugging", "SKILL.md"),
      "utf8",
    );
    const implementing = await readFile(
      join(root, "skills", "agentic-implementing", "SKILL.md"),
      "utf8",
    );
    const planning = await readFile(
      join(root, "skills", "agentic-planning", "SKILL.md"),
      "utf8",
    );
    const reviewing = await readFile(
      join(root, "skills", "agentic-reviewing", "SKILL.md"),
      "utf8",
    );

    expect(artifact).toMatch(/After applying higher-authority instructions[\s\S]*prefer in order/i);
    expect(artifact).not.toContain("authority hierarchy above");
    expect(codeDesign).toMatch(/Explorer establishes current structure[\s\S]*chooses target structure/i);
    expect(codeDesign).toMatch(/Selecting this skill does not authorize edits/i);
    expect(codeDesign).toMatch(/enabling refactor[\s\S]*implementation authority/i);
    expect(codeDesign).toMatch(/brainstorming[\s\S]*material changes[\s\S]*internal structure/i);
    expect(codeDesign).toMatch(/standalone use[\s\S]*owner[\s\S]*authoritative state[\s\S]*invariants/i);
    expect(codeDesign).toMatch(/contracts[\s\S]*migration[\s\S]*verification seam/i);
    expect(codeDesign).toMatch(/material choice[\s\S]*unresolved/i);
    expect(brainstorming).toMatch(/Code design owns internal structure[\s\S]*implementation owns local choices/i);
    for (const routing of [brainstorming, codeDesign, debugging, implementing, reviewing]) {
      const materialBoundary = routing.match(/[^.\n]*system direction[^.\n]*\./i)?.[0];
      for (const subject of [
        "outcome",
        "scope",
        "compatibility",
        "safety",
        "user-visible behavior",
        "system direction",
      ])
        expect(materialBoundary).toMatch(new RegExp(subject, "i"));
    }
    expect(context).toMatch(/All three lanes are evidence-only and non-mutating/i);
    expect(implementing).toMatch(/shared outputs[\s\S]*cross-unit generated outputs[\s\S]*parent/i);
    expect(implementing).toMatch(
      /explicit, non-overlapping generated output[\s\S]*write boundary[\s\S]*source ownership/i,
    );
    expect(debugging).toMatch(/`unresolved` is an honest terminal outcome[\s\S]*cause remains unresolved/i);
    expect(planning).toMatch(/plan is a revisable route, not a frozen contract/i);
    expect(reviewing).toMatch(/Route settled corrections through `agentic-implementing`/i);
  });

  test("documents canonical links, shared delegation rules, and harness mappings", async () => {
    const readme = await readFile(join(root, "README.md"), "utf8");
    const delegatedStart = readme.indexOf("## Delegated roles");
    const claudeStart = readme.indexOf("## Claude Code");
    const piStart = readme.indexOf("## Pi");
    const delegated = readme.slice(delegatedStart, claudeStart);

    for (const name of skillNames)
      expect(readme).toContain(`skills/${name}/SKILL.md`);
    const pi = readme.slice(piStart);
    for (const [file, spec] of Object.entries(roleSpecs)) {
      expect(delegated).toContain(`agents/${file}`);
      const briefRow = delegated
        .split(/\r?\n/)
        .find((line) => line.includes(`agents/${file}`));
      const toolRow = pi.split(/\r?\n/).find((line) => line.includes(`agents/${file}`));
      expect(briefRow).toBeDefined();
      for (const requirement of spec.brief) expect(briefRow).toMatch(requirement);
      expect(toolRow).toContain(`\`${spec.tool}\``);
      expect(readme).toContain(`agentic-skills:${spec.name}`);
    }

    expect(delegatedStart).toBeGreaterThan(-1);
    expect(claudeStart).toBeGreaterThan(delegatedStart);
    expect(piStart).toBeGreaterThan(claudeStart);
    expect(delegated).toMatch(/fresh context[\s\S]*self-contained brief/i);
    expect(delegated).toMatch(/report-only roles[\s\S]*behavioral prompt constraints/i);
    const optionalGuidance = delegated.match(/[^.\n]*optional[^.\n]*\./i)?.[0];
    for (const detail of ["Source restrictions", "desired detail", "existing verification evidence"])
      expect(optionalGuidance).toMatch(new RegExp(detail, "i"));
    expect(pi).toMatch(/context files, delegation tools, and handoff remain unavailable/i);
  });

  test("contains no generated agentic-workflows machinery", async () => {
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const dependencyNames = Object.keys({
      ...packageManifest.dependencies,
      ...packageManifest.devDependencies,
      ...packageManifest.peerDependencies,
    });

    expect(dependencyNames.some((name) => name.includes("agentic-workflows"))).toBe(false);
    expect(JSON.stringify(packageManifest.scripts)).not.toMatch(/agentic-workflows|\bawf\b/i);
    for (const path of [
      ".awf",
      ".agentic-workflows",
      ".claude",
      "agentic-workflows.config.ts",
      "agentic-workflows.config.json",
    ]) {
      expect(await doesNotExist(join(root, path))).toBe(true);
    }
  });
});
