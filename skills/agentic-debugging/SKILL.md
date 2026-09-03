---
name: agentic-debugging
description: Investigate unexpected behavior with an unknown cause, distinguish hypotheses with evidence, and establish a regression oracle or report that the cause remains unresolved.
---

# Agentic debugging

Use this skill when observed behavior differs from expected behavior and the cause is unknown. Do not use it for a known mechanical fix.

Safety rules, permissions, harness instructions, the actual user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding the requested scope.

## Investigate

1. Start from available observed evidence and state expected behavior and its basis.
2. Attempt a reproduction and minimize it without discarding relevant conditions. Investigation may continue when reliable reproduction is unavailable.
3. Form specific, falsifiable hypotheses.
4. Run the narrowest experiment that distinguishes a hypothesis from plausible alternatives.
5. Refute, refine, and retest until evidence establishes a cause, or the available boundary cannot resolve it.
6. Check adjacent paths that could share the cause.

Do not describe a speculative causal change as a root-cause fix. Preserve evidence of unfixed behavior in the active interaction or an authorized regression oracle; do not invent evidence files, logs, or persistent state. Do not change expected output merely to accommodate a defect.

## Outcome and handoff

Before changing production behavior, establish the strongest practical regression oracle. Prefer a deterministic automated test that fails before the fix and passes afterward. When that is impractical, explain why and use the strongest reproducible alternative.

For intermittent, production-only, environment-dependent, or evidence-limited failures, `unresolved` is an honest terminal outcome. State that the cause remains unresolved, then report eliminated hypotheses, the strongest remaining explanation, evidence limits, and the next discriminating experiment.

Adding the oracle may be the first mutation when authorized. Route a supported fix through `agentic-implementing`. Apply `agentic-code-design` when the established cause creates a structural ownership, state, invariant, contract, dependency, or refactor-boundary question. Use `agentic-brainstorming` only when the evidence creates a material choice about outcome, scope, compatibility, safety, user-visible behavior, or durable architecture.
