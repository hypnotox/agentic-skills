---
name: agentic-reviewing
description: Perform a fresh, evidence-backed, report-only review of an implementation or proposed change when risk warrants independent scrutiny.
---

# Agentic reviewing

Use this skill for independent scrutiny of non-obvious or consequential work: public or compatibility effects, cross-boundary changes, security, concurrency, data loss, migrations, destructive behavior, substantial refactoring, generated ownership, or judgment-heavy verification. Low-risk, obvious, well-verified work may be self-reviewed.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Review

Review from fresh evidence rather than implementation narration alone. Inspect the requested outcome, settled constraints, relevant source and repository instructions, diff or proposed change, integration effects, and verification results. Focus on risks relevant to the change rather than a ceremonial checklist.

Optionally delegate one combined review brief to `agentic-reviewer`; delegation is not required. Review remains report-only unless the user separately asks for fixes.

## Report

Report findings first, ordered by consequence. For each finding include precise path/line or command evidence, the concrete consequence, and a practical correction. Then state coverage performed and residual uncertainty. Clearly say when no finding was established.

A clean report is evidence, not approval or a status transition. Route requested corrections through `agentic-implementing`, verify them, and re-review only when the correction materially changes risk.
