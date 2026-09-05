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
const roleNames = {
  "explorer.md": "agentic-explorer",
  "premise-checker.md": "agentic-premise-checker",
  "reviewer.md": "agentic-reviewer",
  "implementer.md": "agentic-implementer",
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

    expect((await readdir(join(root, "agents"))).sort()).toEqual(Object.keys(roleNames).sort());
    for (const [file, name] of Object.entries(roleNames)) {
      const { metadata, body } = parseDocument(
        await readFile(join(root, "agents", file), "utf8"),
      );
      expect(metadata.name).toBe(name);
      expect(metadata.description?.trim().length).toBeGreaterThan(0);
      expect(Object.keys(metadata).sort()).toEqual(["description", "name"]);
      expect(body.length).toBeGreaterThan(0);
    }
  });

  test("keeps Claude import and required package content", async () => {
    const claude = await readFile(join(root, "CLAUDE.md"), "utf8");
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

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

  test("uses versionless Claude manifests and configured package mappings", async () => {
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const pluginManifest = JSON.parse(
      await readFile(join(root, ".claude-plugin", "plugin.json"), "utf8"),
    );
    const marketplaceManifest = JSON.parse(
      await readFile(join(root, ".claude-plugin", "marketplace.json"), "utf8"),
    );

    expect(packageManifest.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(packageManifest.license).toBe("AGPL-3.0-only");
    expect(packageManifest.pi).toEqual({
      extensions: ["./extensions/pi-subagents/index.ts"],
      skills: ["./skills"],
    });
    expect(pluginManifest.name).toBe("agentic-skills");
    expect(pluginManifest).not.toHaveProperty("version");
    expect(marketplaceManifest.plugins).toHaveLength(1);
    expect(marketplaceManifest.plugins[0]).toMatchObject({
      name: "agentic-skills",
      source: "./",
    });
    expect(marketplaceManifest.plugins[0]).not.toHaveProperty("version");
    expect(packageManifest.scripts.check).toContain("claude plugin validate .");
    expect(packageManifest.scripts.check).toContain("claude plugin validate --strict skills");
    expect(packageManifest.scripts.check).toContain("claude plugin validate --strict agents");
  });

  test("uses always-current development sources and creates no lockfile", async () => {
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

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
