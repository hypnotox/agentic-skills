---
name: agentic-reviewing
description: Independently audit existing code or prose, a design, diff, or implementation and report evidence-backed risks without editing.
---

# Agentic reviewing

Use this skill for an explicit audit of existing code or prose, a design, proposed change, diff, or implementation. Independent review is especially useful for compatibility effects, cross-boundary changes, security, concurrency, data loss, migrations, destructive behavior, substantial refactoring, generated ownership, or judgment-heavy verification.

Safety rules, permissions, harness instructions, the actual user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding the requested scope.

## Review

Inspect fresh evidence rather than trusting supplied claims or implementation narration. Compare the intended outcome and settled constraints with relevant source, prose, design, repository instructions, change surface, integration effects, and verification results.

Report only evidence-backed defects or risks with concrete consequences. Do not turn aesthetic, pattern, or stylistic preferences into findings. When judging maintainability, require an identifiable correctness or maintenance risk such as ambiguous ownership, duplicated policy, stale state, representation leakage, inappropriate dependencies, unreadable control flow, weakened verification, or a recurring workaround.

Prefer one combined reviewer. Multiple non-overlapping reviewers are appropriate only when the user requests distinct lenses or materially different expertise or evidence is needed. A fresh `agentic-reviewer` cannot be assumed to know conversation-local context. Supply the intended outcome, settled constraints, review/change boundary, relevant repository constraints, and verification evidence; extract only applicable constraints rather than pasting whole instruction files. Review remains report-only.

## Report

Report findings first in consequence order. For each, give precise path and line or command evidence, concrete consequence, and practical correction. Then state coverage and residual uncertainty. Clearly say when no finding was established.

Route settled corrections through `agentic-implementing`. An unknown cause belongs in `agentic-debugging`; an unresolved structural question belongs in `agentic-code-design`; and a material product, scope, compatibility, safety, user-visible, or system-level architectural choice belongs in `agentic-brainstorming`.
