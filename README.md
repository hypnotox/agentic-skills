# agentic-skills

Repository-agnostic engineering skills and delegation roles for Claude Code and Pi. Markdown skills work from this package alone; Pi delegation requires compatible `pi-tools`.

## Authority and adaptation

1. Safety, harness constraints, and the user request are authoritative.
2. Repository instructions specialize defaults; they do not expand delegated authority.
3. Report conflicts or missing context rather than infer permission.

## Skills

| Skill | Use it for |
|---|---|
| `agentic-context` | Orient before substantial fresh, takeover, or widened-scope work; investigate one bounded non-defect unknown; or test a consequential premise. |
| `agentic-artifact-design` | Design or substantially revise documentation, a plan, handoff, report, decision record, runbook, specification, skill, or another substantial prose artifact when audience, structure, information ownership, or local conventions materially affect the result. Skip routine replies and incidental edits. |
| `agentic-brainstorming` | Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or durable architecture before dependent work proceeds. |
| `agentic-debugging` | Investigate unexpected behavior with an unknown cause, distinguish hypotheses with evidence, and establish a regression oracle or report that the cause remains unresolved. |
| `agentic-code-design` | Resolve a structural question about semantic ownership, state or invariants, contracts, dependency direction, or refactor boundaries for agreed behavior. |
| `agentic-planning` | Sequence a settled non-obvious change into verifiable units with dependencies, ownership, integration points, and terminal checks. |
| `agentic-implementing` | Implement and verify a settled change while preserving unrelated work and surfacing newly material choices. |
| `agentic-reviewing` | Independently audit existing code or prose, a design, diff, or implementation and report evidence-backed risks without editing. |

## Optional roles

| Role | Purpose | Pi tool |
|---|---|---|
| `agentic-explorer` | Investigate one bounded factual or structural question in fresh read-only context; return evidence, searched boundary, and uncertainty. | `subagent_explore` |
| `agentic-premise-checker` | Adversarially test one explicit consequential premise in fresh read-only context; return `supported`, `revise`, or `unresolved` with evidence. | `subagent_grounding` |
| `agentic-implementer` | Implement one settled self-contained unit with an explicit write boundary; return a completion receipt while the parent retains integration. | `subagent_implement` |
| `agentic-reviewer` | Independently inspect one supplied change or existing surface in fresh report-only context; return concrete findings, coverage, and uncertainty. | `subagent_review_code` |

Both harnesses share the canonical Markdown; Pi adds a small adapter for optional role tools.

## Claude Code

```bash
claude plugin marketplace add hypnotox/agentic-skills
claude plugin install agentic-skills@agentic-skills

# Local checkout
claude --plugin-dir /absolute/path/to/agentic-skills
```

## Pi

```bash
pi install git:github.com/hypnotox/pi-tools
pi install git:github.com/hypnotox/agentic-skills

# Local checkouts
pi install /absolute/path/to/pi-tools
pi install /absolute/path/to/agentic-skills
```

### Delegation context

The child starts a fresh Pi session with the role prompt and delegated task. It does not inherit the parent transcript, and automatic repository-context discovery is disabled. Installed skills and extensions remain available and may contribute instructions or context.

Delegated tasks must be self-contained: include the relevant outcome, repository constraints, evidence or write boundary, and verification expectations. Loaded skills are capabilities, not parent-task context.

### Behavioral boundary

Read-only and report-only roles are behaviorally constrained prompts. They inherit harness-provided tools and permissions and are not security boundaries.

## Development checks

`npm run check` requires Node.js 22.19+, npm, and Claude Code.

```bash
npm install
npm run check
npm pack --dry-run
```

## License and provenance

[`AGPL-3.0-only`](LICENSE). Adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows); see [`NOTICE`](NOTICE).
