---
name: agentic-reviewing
description: Independently review existing code or prose, a design, diff, or implementation for defects, grounded risks, and useful improvements without editing.
---

# Agentic reviewing

Use this skill for an explicit audit of existing code or prose, a design, proposed change, diff, or implementation. Independent review is especially useful for compatibility effects, cross-boundary changes, security, concurrency, data loss, migrations, destructive behavior, substantial refactoring, generated ownership, or judgment-heavy verification.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Review

Inspect fresh evidence rather than trusting supplied claims or implementation narration. Compare the outcome or evaluation standard and applicable constraints with the settled design, relevant source or prose, repository instructions, review surface, integration effects, and available verification results.

Distinguish defects, grounded risks, and improvement opportunities relevant to the review's purpose. Support each with evidence and a concrete consequence or benefit. An improvement need not correct a defect; do not present it as required unless the evaluation standard requires it. When judging maintainability, identify what becomes easier to understand or change. Pattern preference or stylistic taste alone does not establish a problem or useful improvement.

Prefer one combined reviewer. For optional delegation, use `agentic-subagents` to choose supported model and thinking settings. Multiple non-overlapping reviewers are appropriate only when the user requests distinct lenses or materially different expertise or evidence is needed. A fresh `agentic-reviewer` cannot be assumed to know conversation-local context. Supply the outcome or evaluation standard, review surface, and applicable constraints or the explicit value `none`. Cite the repository path when a load-bearing constraint has one. Source restrictions, desired detail, and existing verification evidence are optional. Review remains report-only.

## Report

Report material findings first, ordered by consequence or benefit. Consolidate related observations; do not seek a finding count. For each, state its kind, precise path and line or command evidence, consequence or benefit, and a proportionate recommendation. Qualify uncertainty that affects the finding. Then state coverage and remaining uncertainty. Clearly say when no finding was established.

Route settled corrections through `agentic-implementing`. An unknown cause belongs in `agentic-debugging`; an unresolved target-structure question belongs in `agentic-code-design`; and a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction belongs in `agentic-brainstorming`.
