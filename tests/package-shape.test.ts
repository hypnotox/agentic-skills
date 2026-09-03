import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "..");
const skillNames = [
  "agentic-context",
  "agentic-brainstorming",
  "agentic-debugging",
  "agentic-code-design",
  "agentic-planning",
  "agentic-implementing",
  "agentic-reviewing",
];
const roleFiles = ["explorer.md", "premise-checker.md", "implementer.md", "reviewer.md"];

function frontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .filter((line) => line.includes(":"))
      .map((line) => {
        const separator = line.indexOf(":");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      }),
  );
}

describe("canonical package shape", () => {
  test("ships exactly seven root skills with valid routing frontmatter", async () => {
    const entries = (await readdir(join(root, "skills"), { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    expect(entries).toEqual([...skillNames].sort());

    for (const name of skillNames) {
      const content = await readFile(join(root, "skills", name, "SKILL.md"), "utf8");
      const metadata = frontmatter(content);
      expect(metadata.name).toBe(name);
      expect(metadata.description?.length).toBeGreaterThan(20);
      expect(content.replace(/^---[\s\S]*?---\s*/, "").trim()).not.toBe("");
    }
  });

  test("ships four canonical collision-resistant role prompts", async () => {
    expect((await readdir(join(root, "agents"))).sort()).toEqual([...roleFiles].sort());
    for (const file of roleFiles) {
      const content = await readFile(join(root, "agents", file), "utf8");
      const metadata = frontmatter(content);
      expect(metadata.name).toBe(`agentic-${file.replace(/\.md$/, "")}`);
      expect(metadata.description?.length).toBeGreaterThan(20);
    }
  });

  test("both harness manifests point at canonical root content", async () => {
    const packageManifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const pluginManifest = JSON.parse(
      await readFile(join(root, ".claude-plugin", "plugin.json"), "utf8"),
    );

    expect(packageManifest.license).toBe("AGPL-3.0-only");
    expect(packageManifest.pi).toEqual({
      extensions: ["./extensions/pi-subagents/index.ts"],
      skills: ["./skills"],
    });
    expect(pluginManifest.name).toBe("agentic-skills");
    expect(await readdir(root)).not.toContain(".claude");
  });

  test("canonical prose declares authority and avoids implicit persistence", async () => {
    const files = [
      ...skillNames.map((name) => join(root, "skills", name, "SKILL.md")),
      ...roleFiles.map((name) => join(root, "agents", name)),
    ];
    for (const file of files) {
      const content = await readFile(file, "utf8");
      expect(content).toMatch(/(Safety rules|Safety rules, permissions)/);
      expect(content).not.toMatch(/\.awf\/|\bawf\b|agentic-workflows/i);
    }
  });
});
