# agentic-skills

Repository-agnostic engineering skills and focused delegation roles for Claude Code and Pi.

## Authority and adaptation

1. Safety, harness constraints, and the user request are authoritative.
2. Repository instructions specialize defaults; they do not expand delegated authority.
3. Report conflicts or missing context rather than infer permission.

## Skills

| Skill | Use it for |
|---|---|
| `agentic-context` | Orient before substantial fresh, takeover, or widened-scope work; investigate one bounded non-defect unknown; or test a consequential premise. |
| `agentic-brainstorming` | Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or durable architecture before dependent work proceeds. |
| `agentic-debugging` | Investigate unexpected behavior with an unknown cause, distinguish hypotheses with evidence, and establish a regression oracle or report an unresolved cause. |
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

Both harnesses use the same Markdown sources. Pi's small routing-metadata representation is protected by alignment tests.

## Claude Code

```bash
claude plugin marketplace add hypnotox/agentic-skills
claude plugin install agentic-skills@agentic-skills

# Local checkout
claude --plugin-dir /absolute/path/to/agentic-skills
```

## Pi

```bash
pi install git:github.com/hypnotox/pi-tools@v0.3.0
pi install git:github.com/hypnotox/agentic-skills

# Local checkouts
pi install /absolute/path/to/pi-tools
pi install /absolute/path/to/agentic-skills
```

### Delegation context

Pi role children receive their role prompt and delegated task, but not the parent transcript, installed skills, or repository context files. The parent must supply the relevant outcome, repository constraints, evidence or write boundary, and verification expectations. Pass applicable constraints, not whole instruction files.

### Behavioral boundary

Read-only and report-only roles are behaviorally constrained prompts. They inherit harness-provided tools and permissions and are not security boundaries.

## Development checks

```bash
npm install
npm run check
npm pack --dry-run
```

## License and provenance

[`AGPL-3.0-only`](LICENSE). Adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows); see [`NOTICE`](NOTICE).
