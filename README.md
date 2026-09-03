# agentic-skills

Repository-agnostic engineering skills and focused role prompts for Claude Code and Pi.

The package provides defaults, not a competing project process:

1. Safety rules, permissions, harness instructions, and the current user request are authoritative.
2. Applicable repository instructions specialize these defaults.
3. Where the repository is silent, the generic default applies.
4. Nothing in this package implicitly creates memory, plan files, decision records, caches, hidden state, or target-repository files.

## Contents

### Skills

| Skill | Use it for |
|---|---|
| `agentic-context` | Orientation, bounded evidence gathering, and premise challenges |
| `agentic-brainstorming` | Material unresolved choices and trade-offs |
| `agentic-debugging` | Unknown causes, reproducible hypotheses, and regression protection |
| `agentic-code-design` | Ownership, dependency direction, interfaces, and refactor boundaries |
| `agentic-planning` | Useful sequencing, ownership, and verification |
| `agentic-implementing` | Settled changes, clean integration, and verification |
| `agentic-reviewing` | Fresh, evidence-backed, report-only review |

### Roles

The canonical prompts in [`agents/`](agents/) define four optional focused roles:

- `agentic-explorer`
- `agentic-premise-checker`
- `agentic-implementer`
- `agentic-reviewer`

Skills remain useful without role delegation.

## Install for Claude Code

This repository is a Claude Code plugin and marketplace. Add it, then install the plugin:

```bash
claude plugin marketplace add hypnotox/agentic-skills
claude plugin install agentic-skills@agentic-skills
```

For local development without installation:

```bash
git clone https://github.com/hypnotox/agentic-skills.git
claude --plugin-dir "$PWD/agentic-skills"
```

Claude Code discovers the canonical root `skills/` and `agents/` directories. There are no generated harness-specific prose copies.

## Install for Pi

Pi skill loading works from this package alone. The four role tools additionally require a separately installed, protocol-v2-compatible [`hypnotox/pi-tools`](https://github.com/hypnotox/pi-tools). Install `pi-tools` first:

```bash
pi install git:github.com/hypnotox/pi-tools@v0.3.0
pi install git:github.com/hypnotox/agentic-skills
```

For a local checkout:

```bash
pi install /absolute/path/to/pi-tools
pi install /absolute/path/to/agentic-skills
```

Restart Pi or run `/reload` after changing installed resources. For reproducible use after releases begin, pin `agentic-skills` to a release tag.

The thin Pi adapter registers these `pi-tools` profiles:

| Role identity | Pi tool |
|---|---|
| `agentic-premise-checker` | `subagent_grounding` |
| `agentic-explorer` | `subagent_explore` |
| `agentic-reviewer` | `subagent_review_code` |
| `agentic-implementer` | `subagent_implement` |

Each delegated run uses the active Pi project's working directory and the parent model, thinking level, tools, trust, and normal `pi-tools` execution defaults. The adapter adds no routing, preferences, policy engine, scheduler, Git checks, persistence, or project configuration.

If `pi-tools` is absent or incompatible, Pi reports an actionable role-delegation error. The Markdown skills still load; the adapter does not install a fallback provider or pretend a role ran.

## Development

Requirements: Node.js 22.19 or newer, Claude Code for plugin validation, and npm.

```bash
npm install
npm run check
```

`npm run check` type-checks the adapter, runs focused package and protocol tests, and validates Claude plugin discovery.

## License and provenance

Copyright (C) 2026 Josua Müller. Licensed under [`AGPL-3.0-only`](LICENSE).

Some skill and role material was adapted from [`hypnotox/agentic-workflows`](https://github.com/hypnotox/agentic-workflows) with the copyright holder's authorization. See [`NOTICE`](NOTICE).
