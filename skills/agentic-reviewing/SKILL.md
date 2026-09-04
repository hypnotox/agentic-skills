---
name: agentic-reviewing
description: Independently audit existing code or prose, a design, diff, or implementation and report evidence-backed risks without editing.
---

# Agentic reviewing

Use this skill for an explicit audit of existing code or prose, a design, proposed change, diff, or implementation. Independent review is especially useful for compatibility effects, cross-boundary changes, security, concurrency, data loss, migrations, destructive behavior, substantial refactoring, generated ownership, or judgment-heavy verification.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Review

Inspect fresh evidence rather than trusting supplied claims or implementation narration. Compare the outcome or evaluation standard and applicable constraints with relevant source, prose, design, repository instructions, review surface, integration effects, and available verification results.

Report only evidence-backed defects or risks with concrete consequences. Do not turn aesthetic, pattern, or stylistic preferences into findings. When judging maintainability, require an identifiable correctness or maintenance risk such as ambiguous ownership, duplicated policy, stale state, representation leakage, inappropriate dependencies, unreadable control flow, weakened verification, or a recurring workaround.

Prefer one combined reviewer. Multiple non-overlapping reviewers are appropriate only when the user requests distinct lenses or materially different expertise or evidence is needed. A fresh `agentic-reviewer` cannot be assumed to know conversation-local context. Supply the outcome or evaluation standard, review surface, and applicable constraints or the explicit value `none`. Cite the repository path when a load-bearing constraint has one. Source restrictions, desired detail, and existing verification evidence are optional. Review remains report-only.

## Report

Report findings first in consequence order. For each, give precise path and line or command evidence, concrete consequence, and practical correction. Then state coverage and residual uncertainty. Clearly say when no finding was established.

Route settled corrections through `agentic-implementing`. An unknown cause belongs in `agentic-debugging`; an unresolved target-structure question belongs in `agentic-code-design`; and a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction belongs in `agentic-brainstorming`.
