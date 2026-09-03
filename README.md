# agentic-skills

Repository-agnostic engineering skills and focused role prompts for Claude Code and Pi.

## Authority and adaptation

The package supplies reusable engineering defaults that adapt to each task:

1. Safety rules, permissions, harness instructions, and the current user request are authoritative.
2. Applicable repository instructions specialize the defaults for the project.
3. The generic guidance applies where the repository is silent.

## Contents

### Skills

| Skill | Use it for |
|---|---|
| `agentic-context` | Orientation, bounded evidence gathering, and premise challenges |
| `agentic-brainstorming` | Material unresolved choices and trade-offs |
| `agentic-debugging` | Unknown causes, reproducible hypotheses, and regression protection |
| `agentic-code-design` | Semantic modeling, state ownership, contracts, dependencies, and refactor boundaries |
| `agentic-planning` | Useful sequencing, ownership, and verification |
| `agentic-implementing` | Settled changes, clean integration, and verification |
| `agentic-reviewing` | Fresh, evidence-backed, report-only review |

### Roles

The shared sources in [`skills/`](skills/) and [`agents/`](agents/) are canonical for both harness integrations. The role prompts define four optional focused roles:

- `agentic-explorer`
- `agentic-premise-checker`
- `agentic-implementer`
- `agentic-reviewer`

Skills support direct use, while roles provide focused delegation.

## Install for Claude Code

This repository is a Claude Code plugin and marketplace. Add it, then install the plugin:

```bash
claude plugin marketplace add hypnotox/agentic-skills
claude plugin install agentic-skills@agentic-skills
```

For local development from a checkout:

```bash
git clone https://github.com/hypnotox/agentic-skills.git
claude --plugin-dir "$PWD/agentic-skills"
```

Claude Code discovers the shared skills and role prompts directly from the canonical root directories.

## Install for Pi

Pi loads the Markdown skills directly from this package. Focused role delegation uses a separately installed, protocol-v2-compatible [`hypnotox/pi-tools`](https://github.com/hypnotox/pi-tools); install that prerequisite first:

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

The Pi adapter registers these `pi-tools` profiles:

| Role identity | Pi tool |
|---|---|
| `agentic-premise-checker` | `subagent_grounding` |
| `agentic-explorer` | `subagent_explore` |
| `agentic-reviewer` | `subagent_review_code` |
| `agentic-implementer` | `subagent_implement` |

Each delegated run uses the active Pi project's working directory and inherits the parent model, thinking level, tools, trust, and normal `pi-tools` execution defaults.

A compatible `pi-tools` installation is required for role delegation. Pi reports an actionable error when that prerequisite is unavailable or incompatible, while the Markdown skills remain available for direct use.

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
