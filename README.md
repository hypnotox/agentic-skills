# agentic-skills

Repository-agnostic engineering skills and delegation roles for Claude Code and Pi. Markdown skills work from this package alone; Pi delegation uses `pi-tools` for child execution.

## Skills

Each skill is a generic method. Read its canonical file for routing and procedure.

| Skill | Focus |
|---|---|
| [`agentic-context`](skills/agentic-context/SKILL.md) | Orientation, bounded exploration, and premise testing |
| [`agentic-artifact-design`](skills/agentic-artifact-design/SKILL.md) | Substantial prose artifacts |
| [`agentic-brainstorming`](skills/agentic-brainstorming/SKILL.md) | Material outcome or system direction choices |
| [`agentic-code-design`](skills/agentic-code-design/SKILL.md) | Target structure for agreed behavior |
| [`agentic-debugging`](skills/agentic-debugging/SKILL.md) | Unexpected behavior with an unknown cause |
| [`agentic-planning`](skills/agentic-planning/SKILL.md) | Verifiable sequencing for settled work |
| [`agentic-implementing`](skills/agentic-implementing/SKILL.md) | Implementation and verification |
| [`agentic-reviewing`](skills/agentic-reviewing/SKILL.md) | Independent, evidence-backed audit |

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

Claude Code namespaces the role agents as:

- `agentic-skills:agentic-explorer`
- `agentic-skills:agentic-premise-checker`
- `agentic-skills:agentic-reviewer`
- `agentic-skills:agentic-implementer`

## Pi

```bash
pi install git:github.com/hypnotox/pi-tools
pi install git:github.com/hypnotox/agentic-skills

# Local checkouts
pi install /absolute/path/to/pi-tools
pi install /absolute/path/to/agentic-skills
```

| Role | Pi tool |
|---|---|
| [`agentic-explorer`](agents/explorer.md) | `subagent_explore` |
| [`agentic-premise-checker`](agents/premise-checker.md) | `subagent_grounding` |
| [`agentic-reviewer`](agents/reviewer.md) | `subagent_review_code` |
| [`agentic-implementer`](agents/implementer.md) | `subagent_implement` |

The [Pi adapter](extensions/pi-subagents/index.ts) publishes each role as the private structural payload `toolName`, `description`, and `loadSystemPrompt`; `pi-tools` requests a replay so either package load order works.

Each tool starts a fresh no-session Pi process with the role prompt and delegated brief. It inherits the parent model, thinking level, working directory, trust state, and ordinary active tools, but not the parent transcript. Skills and ordinary extensions load; context files, delegation tools, and handoff remain unavailable.

## Development checks

`npm run check` requires the current Node release, npm, and Claude Code.

```bash
npm install
npm run check
npm pack --dry-run
```

## License and provenance

[`AGPL-3.0-only`](LICENSE). Adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows); see [`NOTICE`](NOTICE).
