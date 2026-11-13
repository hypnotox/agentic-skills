---
name: agentic-debugging
description: Investigate unexpected behavior or output in code or any other medium when its cause is unknown; skip known mechanical fixes.
---

# Agentic debugging

Use this skill when observed behavior or output differs from what was expected and the cause is unknown, whether in code, documents, rendered output, assets, pipelines, or motion. Do not use it for a known mechanical fix.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Investigate

1. Start from available observed evidence and state expected behavior and its basis.
2. Attempt a reproduction and minimize it without discarding relevant conditions. Investigation may continue when reliable reproduction is unavailable.
3. Form specific, falsifiable hypotheses.
4. Run the narrowest experiment that distinguishes a hypothesis from plausible alternatives.
5. Refute, refine, and retest until evidence establishes a cause, or the available boundary cannot resolve it.
6. Check adjacent paths that could share the cause.

Do not stack speculative changes or describe one as a root-cause fix; a symptom that disappears without an understood cause does not establish a fix. Preserve evidence of unfixed behavior in the active interaction or an authorized regression oracle; do not invent evidence files, logs, or persistent state. Do not change expected output merely to accommodate a defect.

## Outcome and handoff

Before changing production behavior or delivered output, establish a reliable regression oracle proportionate to the observed defect and its risks. Prefer a deterministic automated test that fails before the fix and passes afterward. When that is impractical, explain why and use a reproducible alternative sufficient to distinguish the defect from the fix.

For intermittent, production-only, environment-dependent, or evidence-limited failures, `unresolved` is an honest terminal outcome. State that the cause remains unresolved, then report eliminated hypotheses, the strongest remaining explanation, evidence limits, and the next discriminating experiment.

Adding the oracle may be the first mutation when authorized. Route a supported fix through `agentic-implementing` or the task skill that owns the affected output. Apply `agentic-code-design` when the established cause creates a structural ownership, state, invariant, contract, dependency, or refactor-boundary question. Use `agentic-brainstorming` only when the evidence creates a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction.
