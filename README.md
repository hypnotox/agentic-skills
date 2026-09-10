# agentic-skills

Repository-agnostic engineering skills and delegation roles for Claude Code and Pi. Markdown skills work from this package alone; Pi role execution is owned by [`pi-subagents`](https://github.com/nicobailon/pi-subagents).

## Skills

Each skill is a generic method. Read its canonical file for routing and procedure.

| Skill | Focus |
|---|---|
| [`agentic-context`](skills/agentic-context/SKILL.md) | Orientation, bounded exploration, and premise testing |
| [`agentic-artifact-design`](skills/agentic-artifact-design/SKILL.md) | Substantial prose artifacts |
| [`agentic-brainstorming`](skills/agentic-brainstorming/SKILL.md) | Material outcome or system direction choices |
| [`agentic-code-design`](skills/agentic-code-design/SKILL.md) | Target structure for agreed behavior |
| [`agentic-debugging`](skills/agentic-debugging/SKILL.md) | Unexpected behavior with an unknown cause |
| [`agentic-planning`](skills/agentic-planning/SKILL.md) | Proportionate sequencing for settled work |
| [`agentic-implementing`](skills/agentic-implementing/SKILL.md) | Implementation and verification |
| [`agentic-reviewing`](skills/agentic-reviewing/SKILL.md) | Independent, evidence-backed audit |
| [`agentic-subagents`](skills/agentic-subagents/SKILL.md) | Model and thinking selection for optional delegation |

## Delegated roles

Treat every delegated role as fresh context: provide a self-contained brief rather than assuming access to the parent transcript. Safety, permissions, and harness constraints remain authoritative. The delegated brief and applicable repository instructions govern work within the role; the role and brief set the boundary, while loaded skills supply method within it.

| Role | Required brief |
|---|---|
| [`agentic-explorer`](agents/explorer.md) | question; evidence boundary; applicable constraints or `none` |
| [`agentic-premise-checker`](agents/premise-checker.md) | premise; consequence if wrong; evidence boundary; applicable constraints or `none` |
| [`agentic-reviewer`](agents/reviewer.md) | outcome or evaluation standard; review surface; applicable constraints or `none` |
| [`agentic-implementer`](agents/implementer.md) | outcome; settled constraints; write boundary; applicable constraints or `none`; acceptance checks |

Write `none` explicitly when no constraints apply. Cite the repository path for a load-bearing constraint when one exists. Source restrictions, desired detail, and existing verification evidence are optional.

Explorer, premise-checker, and reviewer are report-only roles. Their mutation limits are behavioral prompt constraints, not security boundaries; harness-provided safety and permissions still apply.

## Claude Code

```bash
claude plugin marketplace add hypnotox/agentic-skills
claude plugin install agentic-skills@agentic-skills

# Local checkout
claude --plugin-dir /absolute/path/to/agentic-skills
```

The marketplace plugin deliberately has no manifest version, so Claude identifies Git-hosted updates by the source commit. Run `claude plugin update agentic-skills@agentic-skills` to check for and install a newer revision; commit identity does not schedule updates or add automatic watching.

Claude Code namespaces the role agents as:

- `agentic-skills:agentic-explorer`
- `agentic-skills:agentic-premise-checker`
- `agentic-skills:agentic-reviewer`
- `agentic-skills:agentic-implementer`

## Pi

Install [`pi-subagents`](https://github.com/nicobailon/pi-subagents) as the sole `subagent` provider, then install this package:

```bash
pi install npm:pi-subagents
pi install git:github.com/hypnotox/agentic-skills

# Local checkout
pi install /absolute/path/to/agentic-skills
```

This package declares its canonical [`agents`](agents) directory for native discovery. Use the role names with the installed `subagent` API; for example:

```js
{
  agent: "agentic-explorer",
  task: "Question: ...\nEvidence boundary: ...\nApplicable constraints: none"
}
```

Use `/subagents-guide tool-reference` for the installed version's complete invocation contract.

Merge these Pi-specific settings into your existing user or project settings while preserving unrelated values:

```json
{
  "subagents": {
    "agentOverrides": {
      "agentic-premise-checker": { "inheritSkills": true, "excludeTools": ["handoff_session"] },
      "agentic-explorer": { "inheritSkills": true, "excludeTools": ["handoff_session"] },
      "agentic-reviewer": { "inheritSkills": true, "excludeTools": ["handoff_session"] },
      "agentic-implementer": { "inheritSkills": true, "excludeTools": ["handoff_session"] }
    }
  }
}
```

These overrides expose discovered skills while keeping Pi-specific runtime fields out of the cross-harness role prompts. The roles otherwise retain `pi-subagents` custom-agent defaults: replacement prompts, fresh context without automatic context files, and no nested delegation. The handoff tool is explicitly excluded. Supported per-launch model and thinking choices may follow [`agentic-subagents`](skills/agentic-subagents/SKILL.md); effective Pi and `pi-subagents` configuration remains authoritative. This package adds no runtime routing.

Before execution, call `subagent({ action: "list", capabilities: true })` and select only an executable agent. Before passing a model override, call `subagent({ action: "models" })` and use an exact `provider/id` from its available-model output. Use native background execution when a role needs ordinary installed extensions; foreground SDK children do not automatically load ambient extensions. Restart Pi after changing installed packages or these settings, and use `/subagents-guide agents` for further inspection.

## Development checks

`npm run check` requires the current Node release, npm, and Claude Code.

```bash
npm install
npm run check
npm pack --dry-run
```

## License and provenance

[`AGPL-3.0-only`](LICENSE). Adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows); see [`NOTICE`](NOTICE).
