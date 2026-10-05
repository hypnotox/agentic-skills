# agentic-skills

Repository-agnostic engineering and creative skills and delegation roles for Claude Code, Codex, omp, and Pi. Skills use the same Markdown in every harness. Codex roles are distributed as committed [TOML files](codex/agents); omp uses its built-in `task` tool with the committed Markdown roles; Pi role execution is owned by [`pi-subagents`](https://github.com/nicobailon/pi-subagents).

## Skills

Each skill is a generic method. Read its canonical file for routing and procedure.

| Skill | Focus |
|---|---|
| [`agentic-exploration`](skills/agentic-exploration/SKILL.md) | Orientation and bounded factual exploration |
| [`agentic-artifact-design`](skills/agentic-artifact-design/SKILL.md) | Purpose, context, ownership, and maintenance of documents and assets |
| [`agentic-visual-design`](skills/agentic-visual-design/SKILL.md) | Visual intent, composition, form, colour, and appearance in context |
| [`agentic-typography`](skills/agentic-typography/SKILL.md) | Text roles, hierarchy, voice, placement, and rendered readability |
| [`agentic-animation`](skills/agentic-animation/SKILL.md) | Staging, timing, dynamics, continuity, and playback assessment |
| [`agentic-brainstorming`](skills/agentic-brainstorming/SKILL.md) | Material outcome or system direction choices |
| [`agentic-code-design`](skills/agentic-code-design/SKILL.md) | Target structure for agreed behavior |
| [`agentic-debugging`](skills/agentic-debugging/SKILL.md) | Unexpected behavior with an unknown cause |
| [`agentic-planning`](skills/agentic-planning/SKILL.md) | Proportionate sequencing for settled work |
| [`agentic-implementing`](skills/agentic-implementing/SKILL.md) | Implementation and verification |
| [`agentic-reviewing`](skills/agentic-reviewing/SKILL.md) | Shared review method and specialist selection |
| [`agentic-subagents`](skills/agentic-subagents/SKILL.md) | Model and thinking selection for delegation |

Brainstorming, code design, planning, implementation, artifact design, visual design, typography, and animation own their applicable review checkpoints. Implementation includes result and task-level historical review. The [reviewing skill](skills/agentic-reviewing/SKILL.md) supplies the review method, reuse rules, and specialist selection. Brainstorming calls the premise-checker directly; earlier exploration does not replace that second opinion.

Artifact design supplies the common purpose, consumer, context, and ownership questions for documents and assets; its prose guidance applies to prose. The producing task skill owns specialized method, evidence, and completion, with shared artifact questions included in its applicable review. Visual design spans illustration, graphics, interfaces, and 3D work; typography owns text treatment and placement, and animation owns movement over time. Select specialists for the distinct judgments the task needs. Appearance and readability require actual presentation evidence; motion quality requires continuous playback at the intended speed and context. Report qualities left unassessed when that evidence is unavailable.

Applicable workflow instructions authorize the coordinating agent to delegate the reviews they require and the exploration or implementation they permit, without a separate operator request. Required independent review uses a suitable available reviewer unless directly applicable review can be reused; exploration and implementation delegation remain optional. Task scope, write boundaries, explicit prohibitions, harness permissions, and child-role limits still apply. `agentic-subagents` configures delegation after the calling workflow supplies that authority.

## Delegated roles

Start each child with a fresh conversation, without forking or inheriting the parent transcript. Provide a self-contained assignment with the outcome, task boundary, and relevant settled decisions. Applicable global and repository instructions should remain available; the brief need not duplicate them. Safety, permissions, and harness constraints remain authoritative. The role and brief set the boundary, while loaded skills supply method within it.

| Role | Required brief |
|---|---|
| [`agentic-explorer`](agents/explorer.md) | question; evidence boundary; applicable task-specific constraints or `none` |
| [`agentic-premise-checker`](agents/premise-checker.md) | intended outcome; proposed direction; settled constraints; evidence boundary; applicable task-specific constraints or `none` |
| [`agentic-implementer`](agents/implementer.md) | outcome; settled constraints; write boundary; applicable task-specific constraints or `none`; acceptance checks |
| [`agentic-implementation-reviewer`](agents/implementation-reviewer.md) | review brief |
| [`agentic-code-design-reviewer`](agents/code-design-reviewer.md) | review brief |
| [`agentic-plan-reviewer`](agents/plan-reviewer.md) | review brief |
| [`agentic-instruction-reviewer`](agents/instruction-reviewer.md) | review brief |
| [`agentic-artifact-reviewer`](agents/artifact-reviewer.md) | review brief |
| [`agentic-visual-design-reviewer`](agents/visual-design-reviewer.md) | review brief |
| [`agentic-typography-reviewer`](agents/typography-reviewer.md) | review brief |
| [`agentic-animation-reviewer`](agents/animation-reviewer.md) | review brief |
| [`agentic-retrospective-reviewer`](agents/retrospective-reviewer.md) | review brief; available work history, with gaps identified |

The [shared reviewing skill](skills/agentic-reviewing/SKILL.md) guides direct review, reviewer selection, and delegation briefs. Each reviewer role carries its own report-only review contract. There is no generic reviewer role. Write `none` explicitly when no task-specific constraints apply; this does not discard applicable instructions. Cite the repository path for a load-bearing constraint when one exists. Source restrictions, desired detail, and existing verification evidence are optional.

Children may ask the parent for material missing context through an available communication channel; otherwise they report the limitation or blocker. Clarification does not expand role authority. Explorer, premise-checker, and all reviewers are report-only roles. Their mutation limits are behavioral prompt constraints, not security boundaries; harness-provided safety and permissions still apply.

## Claude Code

```bash
claude plugin marketplace add hypnotox/agentic-skills
claude plugin install agentic-skills@agentic-skills

# Local checkout
claude --plugin-dir /absolute/path/to/agentic-skills
```

The marketplace plugin deliberately has no manifest version, so Claude identifies Git-hosted updates by the source commit. Run `claude plugin update agentic-skills@agentic-skills` to check for and install a newer revision; commit identity does not schedule updates or add automatic watching.

Claude Code prefixes each role name with `agentic-skills:`, for example `agentic-skills:agentic-implementation-reviewer`.

## Codex

Use a current Codex release with [custom TOML agents](https://learn.chatgpt.com/docs/agent-configuration/subagents). The full installation below comes directly from this GitHub repository and needs only Git and a shell—no npm install, generation, or build step.

### Install skills and agents from the repository

Clone the whole repository into Codex's user [skills directory](https://learn.chatgpt.com/docs/build-skills#where-to-save-skills), then link its generated agents into Codex's user agent directory. Codex discovers the nested skill folders and TOML files. In Bash on Linux or macOS:

```bash
(
  set -e
  repo="$HOME/.agents/skills/agentic-skills"
  agents="${CODEX_HOME:-$HOME/.codex}/agents/agentic-skills"
  test ! -e "$agents"
  test ! -L "$agents"
  mkdir -p "$(dirname "$repo")" "$(dirname "$agents")"
  git clone https://github.com/hypnotox/agentic-skills.git "$repo"
  ln -s "$repo/codex/agents" "$agents"
)
```

The destination names must be unused; the commands do not replace an existing agent directory or symlink. Keep the full checkout: some skills link to `../../agents/*.md`, so copying only individual skill directories would lose their role references. For an existing checkout, link its root into `~/.agents/skills/agentic-skills` and its `codex/agents` directory into `${CODEX_HOME:-$HOME/.codex}/agents/agentic-skills`, using unused destination names. For project-only discovery, use the project's `.agents/skills/agentic-skills` and `.codex/agents/agentic-skills` instead.

Restart Codex after installation. Check `/skills` for the skills listed above (Codex may prefix them with `agentic-skills:`), and refer to agents by their declared names, such as `agentic-explorer` or `agentic-implementation-reviewer`. Give each the [required brief](#delegated-roles) and explicitly choose fresh/no-history context using the installed Codex delegation tool's contract; do not assume its default is fresh. The TOML files set only `name`, `description`, and `developer_instructions`, leaving model, reasoning, tools, and permission configuration to Codex and the user.

Update the checkout and restart Codex:

```bash
git -C "$HOME/.agents/skills/agentic-skills" pull --ff-only
```

The directory link follows added, changed, and removed agent files without regeneration or relinking. To uninstall, remove only the agent-directory symlink and move the checkout out of the skills directory (or remove it if no longer needed).

### Native repository plugin: skills only

Alternatively, install the skills through Codex's [plugin marketplace](https://developers.openai.com/plugins/build/plugins). This repository includes a root [`plugin.json`](plugin.json) and [marketplace catalog](.agents/plugins/marketplace.json):

```bash
codex plugin marketplace add hypnotox/agentic-skills
codex plugin add agentic-skills@agentic-skills

# Local checkout instead of the GitHub marketplace source
codex plugin marketplace add /absolute/path/to/agentic-skills
codex plugin add agentic-skills@agentic-skills
```

Choose one skills installation route to avoid duplicate discovery. The plugin carries the role files but does **not** register custom Codex agents. If using the plugin and wanting named agents too, keep an ordinary checkout outside the skills directory and link only its `codex/agents` directory into Codex's agent directory as above. Refresh the marketplace with `codex plugin marketplace upgrade agentic-skills`; manage the installed plugin with Codex's plugin commands. This repository is not a listing in OpenAI's public plugin directory.

## omp (Oh My Pi)

Use a current [omp](https://github.com/can1357/oh-my-pi) release with plugin skill and task-agent discovery. Install through its native marketplace commands; omp reuses the repository's Claude-compatible catalog:

```bash
omp plugin marketplace add hypnotox/agentic-skills
omp plugin install agentic-skills@agentic-skills

# Local checkout, without installation
omp --plugin-dir /absolute/path/to/agentic-skills

# Persistent local checkout link instead (Bun required for uninstall)
omp plugin link /absolute/path/to/agentic-skills
```

Choose one route. The marketplace installation and local link both expose the committed [`skills`](skills) and all twelve Markdown roles in [`agents`](agents), including all nine reviewers. The explicit `package.json` `omp` manifest is empty because omp discovers these conventional directories without extension modules or path mappings. No `pi-subagents`, Pi-specific overrides, generation, or build step is needed.

The marketplace and `--plugin-dir` routes do not require Bun for this instruction-only package. Local-link removal goes through omp's npm/link plugin manager and requires `bun` on `PATH`. To persistently install a local checkout without that prerequisite, use `omp plugin marketplace add /absolute/path/to/agentic-skills` followed by the same marketplace install command.

Restart omp after CLI installation or linking. After an in-session `/marketplace install`, use `/reload-plugins` to refresh skills and task agents. Skill commands use `/skill:agentic-reviewing` (and the other skill names above); roles use their unprefixed frontmatter names, such as `agentic-implementation-reviewer`, not Claude Code's `agentic-skills:` prefix.

If omp also discovers a Claude installation of this package, it deduplicates identical skills instead of importing them twice. Differing revisions remain available under namespaced skill names; keep both installations aligned or select a single discovery source if you want only one revision exposed.

Launch reviewers with omp's native `task` tool and the [required review brief](#delegated-roles). With its default batch schema:

```json
{
  "context": "Outcome: the change must preserve the public API. Review surface: src/ and the affected tests. Settled decisions: no API changes. Applicable task-specific constraints: none.",
  "tasks": [
    {
      "agent": "agentic-implementation-reviewer",
      "task": "Review the change for correctness and contract consistency. Report findings with precise evidence; do not edit or delegate.",
      "solutionSpace": "Independent correctness review; no known defect or prescribed fix."
    }
  ]
}
```

The calling workflow must authorize delegation. omp starts task children without the parent transcript and carries discovered skills and applicable context files into the child; do not pass Pi's `context: "fresh"` field. Here `context` is shared assignment text, not a history mode. Supply each child a complete brief. Role and brief boundaries remain authoritative; report-only roles' mutation and no-further-delegation limits remain prompt constraints, not a sandbox.

For other specialist reviews, replace `agent` with the appropriate name from [Delegated roles](#delegated-roles). Use the active tool schema if `task.batch` is disabled. The shared roles do not pin models, thinking, or tools; omp's configuration and supported per-item launch overrides remain authoritative. Follow [`agentic-subagents`](skills/agentic-subagents/SKILL.md) before choosing overrides. Background results are delivered automatically; use `wait` only when blocked and `agent://<id>` for full reports. Use `write` to `agent://<id>` for clarification when omp exposes peer messaging.

For marketplace updates:

```bash
omp plugin marketplace update agentic-skills
omp plugin upgrade agentic-skills@agentic-skills
```

Upgrade this plugin explicitly: omp's upgrade-all version comparison does not detect new revisions of this versionless catalog entry. For a local link, update the checkout instead. Restart or reload after updates. Uninstall with `omp plugin uninstall agentic-skills@agentic-skills` for a marketplace install, or `omp plugin uninstall agentic-skills` for a local link; the latter removes the link, not the source checkout. Use `--scope project` on marketplace installation, upgrade, and removal for project-only use; `plugin link` is user-scoped.

## Pi

Install [`pi-subagents`](https://github.com/nicobailon/pi-subagents) as the sole `subagent` provider, then install this package:

```bash
pi install npm:pi-subagents
pi install git:github.com/hypnotox/agentic-skills

# Local checkout
pi install /absolute/path/to/agentic-skills
```

This package declares its committed [`agents`](agents) directory for native discovery. Use the role names with the installed `subagent` API. Pass `context: "fresh"` explicitly when launching these roles so a global context default cannot fork the parent conversation:

```js
{
  agent: "agentic-explorer",
  context: "fresh",
  task: "Question: ...\nEvidence boundary: ...\nApplicable task-specific constraints: none"
}
```

Use `/subagents-guide tool-reference` for the installed version's complete invocation contract.

Merge these Pi-specific settings into your existing user or project settings while preserving unrelated values:

```json
{
  "subagents": {
    "agentOverrides": {
      "agentic-premise-checker": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-explorer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-implementer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-implementation-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-code-design-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-plan-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-instruction-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-artifact-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-visual-design-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-typography-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-animation-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]},
      "agentic-retrospective-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]}
    }
  }
}
```

These overrides append the specialist prompt to Pi's base prompt, load project and global instruction files, and expose discovered skills without inheriting the parent conversation. They keep Pi-specific runtime fields out of the cross-harness role prompts. Remove the obsolete `agentic-reviewer` override when updating an existing installation.

Use Pi's native `contact_supervisor` and parent `reply` mechanism for material clarification when available. Roles do not delegate further, and `handoff_session` remains excluded. Supported per-launch model and thinking choices may follow [`agentic-subagents`](skills/agentic-subagents/SKILL.md); effective Pi and `pi-subagents` configuration remains authoritative. This package adds no runtime routing.

For delegation authorized by an applicable workflow, if `subagent` is inactive and `subagents_enable` is exposed, call `subagents_enable({})` first. It activates tools without launching work; `subagent` becomes available on the next model request. Use this supported activation before treating delegation as unavailable. If `subagent` is already exposed, proceed directly.

Before execution, call `subagent({ action: "list", capabilities: true })` and select only an executable agent. Before passing a model override, call `subagent({ action: "models" })` and use an exact `provider/id` from its available-model output. Use native background execution when a role needs ordinary installed extensions; foreground SDK children do not automatically load ambient extensions. Restart Pi after changing installed packages or these settings, and use `/subagents-guide agents` for further inspection.

## Development

omp, Pi, Claude Code, and Codex use the committed skills and self-contained agent files directly. Installation and execution require no generation or build step; there are no install or packaging hooks that generate instructions.

### Agent sources and rendering

The reviewer Markdown files in [`agents`](agents) and every TOML file in [`codex/agents`](codex/agents) are generated. Maintain their sources instead:

- [`templates/reviewers/template.md`](templates/reviewers/template.md) owns the common role boundary and composition.
- [`templates/reviewers/roles`](templates/reviewers/roles) owns each reviewer's frontmatter, introduction, and `## Focus` section. Each source filename determines its output filename in `agents/`.
- [`skills/agentic-reviewing/SKILL.md`](skills/agentic-reviewing/SKILL.md) owns the generic method. Its complete `## Review` and `## Report` sections are included in every reviewer; the selection and delegation guidance stays in the skill.

[`scripts/generate-agents.ts`](scripts/generate-agents.ts) fills the template's four slots: `introduction`, `review`, `focus`, and `report`. Each slot must occur exactly once. No template processing happens in any harness. Explorer, premise-checker, and implementer remain handwritten in `agents/`.

The same generator renders every role's Markdown metadata and body into a self-contained Codex TOML file. It composes reviewers from their owning sources in memory, not from potentially stale generated Markdown. Codex filenames follow the frontmatter `name`; duplicate or invalid names fail before outputs are changed. Build notices are excluded from `developer_instructions`, and no harness settings are added to the shared role prompts. omp discovers the shared Markdown agents directly; it has no separate generated format.

After changing reviewer sources or handwritten roles, run `npm run generate` and commit the source and generated changes together. Generation also removes marked generated agents whose source was removed, leaving unowned files alone. The generator and templates are development tooling, excluded from the npm package.

### Checks

`npm run check` requires the current Node release, npm, and Claude Code. It checks generated files without rewriting them, then runs typechecking, tests, and harness validation. `npm run generate:check` runs only the non-writing drift check and fails for missing, changed, or obsolete generated agents in either format. Tests parse the Codex TOML, compare it with the canonical Markdown, and inspect npm's actual package file list, including the hidden marketplace. Codex itself is not required for these development checks.

```bash
npm install
npm run generate # After changing reviewer sources
npm run check
npm pack --dry-run
```

## License and provenance

[`AGPL-3.0-only`](LICENSE). Adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows); see [`NOTICE`](NOTICE).

The methods expand principles from [`agentic-doctrine`](https://github.com/hypnotox/agentic-doctrine) into self-contained skills and focused reviewer criteria. This README owns the provenance reference; installed skills and roles carry the guidance they need.
