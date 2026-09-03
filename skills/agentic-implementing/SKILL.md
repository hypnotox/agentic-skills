---
name: agentic-implementing
description: Implement and verify a settled change while preserving unrelated work and surfacing newly material choices.
---

# Agentic implementing

Use this skill when the requested outcome and material choices are settled.

Safety rules, permissions, harness instructions, the actual user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding the requested scope.

## Implement and verify

1. Inspect current state and affected contracts before editing. Preserve unrelated and concurrent work.
2. Implement at the semantic owner and smallest clean integration point.
3. Apply `agentic-code-design` when the existing model cannot carry the settled change cleanly. Make bounded enabling refactors that prevent duplicated policy, inappropriate coupling, representation leakage, hidden state, or workaround code.
4. Surface new material product, scope, compatibility, safety, user-visible, or durable architectural choices through `agentic-brainstorming`; make local implementation choices directly.
5. Run focused feedback while iterating. Use the strongest practical oracle for changed behavior and never weaken tests, fixtures, goldens, or checks to hide failure.
6. Update documentation and generated expectations when their source of truth changes, and explain why expectation changes are correct.
7. Inspect the final diff and run terminal verification proportionate to risk.

Optional delegation may accelerate one settled unit. A fresh `agentic-implementer` cannot be assumed to know conversation-local context. Supply the outcome, settled constraints, explicit write boundary, relevant repository constraints, and acceptance oracle. Extract only applicable constraints rather than pasting whole instruction files. Keep overlapping, shared, generated, integration, repository-state, and final combined verification work with the parent.

On failure, stop broadening work, inventory affected state, and preserve successful and unrelated edits. Recover only known offending paths with explicit operations; never use destructive blanket reset, restore, clean, or stash operations.

Report changed paths, checks and results, deviations, residual risks, and blockers.
