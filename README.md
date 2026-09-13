# agentic-skills

Repository-agnostic engineering skills and delegation roles for Claude Code and Pi. Markdown skills work from this package alone; Pi role execution is owned by [`pi-subagents`](https://github.com/nicobailon/pi-subagents).

## Skills

Each skill is a generic method. Read its canonical file for routing and procedure.

| Skill | Focus |
|---|---|
| [`agentic-exploration`](skills/agentic-exploration/SKILL.md) | Orientation and bounded factual exploration |
| [`agentic-artifact-design`](skills/agentic-artifact-design/SKILL.md) | Substantial prose artifacts |
| [`agentic-brainstorming`](skills/agentic-brainstorming/SKILL.md) | Material outcome or system direction choices |
| [`agentic-code-design`](skills/agentic-code-design/SKILL.md) | Target structure for agreed behavior |
| [`agentic-debugging`](skills/agentic-debugging/SKILL.md) | Unexpected behavior with an unknown cause |
| [`agentic-planning`](skills/agentic-planning/SKILL.md) | Proportionate sequencing for settled work |
| [`agentic-implementing`](skills/agentic-implementing/SKILL.md) | Implementation and verification |
| [`agentic-reviewing`](skills/agentic-reviewing/SKILL.md) | Shared review method and specialist selection |
| [`agentic-subagents`](skills/agentic-subagents/SKILL.md) | Model and thinking selection for delegation |

Brainstorming, planning, implementation, and artifact design own their applicable review checkpoints. The [reviewing skill](skills/agentic-reviewing/SKILL.md) coordinates independent review and shared checkpoints; exploration gathers evidence without replacing the end-of-brainstorming second opinion.

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
      "agentic-artifact-reviewer": {"systemPromptMode": "append", "inheritProjectContext": true, "inheritGlobalContext": true, "inheritSkills": true, "defaultContext": "fresh", "excludeTools": ["handoff_session"]}
    }
  }
}
```

These overrides append the specialist prompt to Pi's base prompt, load project and global instruction files, and expose discovered skills without inheriting the parent conversation. They keep Pi-specific runtime fields out of the cross-harness role prompts. Remove the obsolete `agentic-reviewer` override when updating an existing installation.

Use Pi's native `contact_supervisor` and parent `reply` mechanism for material clarification when available. Roles do not delegate further, and `handoff_session` remains excluded. Supported per-launch model and thinking choices may follow [`agentic-subagents`](skills/agentic-subagents/SKILL.md); effective Pi and `pi-subagents` configuration remains authoritative. This package adds no runtime routing.

Before execution, call `subagent({ action: "list", capabilities: true })` and select only an executable agent. Before passing a model override, call `subagent({ action: "models" })` and use an exact `provider/id` from its available-model output. Use native background execution when a role needs ordinary installed extensions; foreground SDK children do not automatically load ambient extensions. Restart Pi after changing installed packages or these settings, and use `/subagents-guide agents` for further inspection.

## Development

Pi and Claude Code install the committed skills and self-contained agent files directly. Installation and execution require no generation or build step; there are no install or packaging hooks that generate instructions.

### Reviewer sources

The five reviewer files in [`agents`](agents) are generated. Maintain their sources instead:

- [`templates/reviewers/template.md`](templates/reviewers/template.md) owns the common role boundary and composition.
- [`templates/reviewers/roles`](templates/reviewers/roles) owns each reviewer's frontmatter, introduction, and `## Focus` section. Each source filename determines its output filename in `agents/`.
- [`skills/agentic-reviewing/SKILL.md`](skills/agentic-reviewing/SKILL.md) owns the generic method. Its complete `## Review` and `## Report` sections are included in every reviewer; the selection and delegation guidance stays in the skill.

[`scripts/generate-agents.ts`](scripts/generate-agents.ts) fills the template's four slots: `introduction`, `review`, `focus`, and `report`. Each slot must occur exactly once. No template processing happens in either harness. Explorer, premise-checker, and implementer remain handwritten.

After changing these sources, run `npm run generate` and commit the source and generated changes together. Generation also removes marked generated agents whose role source was removed, leaving handwritten agents alone. The generator and templates are development tooling, excluded from the npm package.

### Checks

`npm run check` requires the current Node release, npm, and Claude Code. It checks generated files without rewriting them, then runs typechecking, tests, and harness validation. `npm run generate:check` runs only the non-writing drift check and fails for missing, changed, or obsolete generated agents.

```bash
npm install
npm run generate # After changing reviewer sources
npm run check
npm pack --dry-run
```

## License and provenance

[`AGPL-3.0-only`](LICENSE). Adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows); see [`NOTICE`](NOTICE).
