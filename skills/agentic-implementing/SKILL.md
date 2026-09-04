---
name: agentic-implementing
description: Implement and verify a settled change while preserving unrelated work and surfacing newly material choices.
---

# Agentic implementing

Use this skill when the requested outcome and material choices are settled.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Implement and verify

1. Inspect current state and affected contracts before editing. Preserve unrelated and concurrent work.
2. Implement at the semantic owner and smallest clean integration point.
3. Apply `agentic-code-design` when the current model cannot carry the settled change cleanly. Selecting that skill does not expand edit authority; make bounded enabling refactors only when the active task authorizes them.
4. Make local implementation choices directly. Route material changes to outcome, scope, compatibility, safety, user-visible behavior, or durable architecture through `agentic-brainstorming` before dependent work.
5. Run focused feedback while iterating. Use the strongest practical oracle for changed behavior and never weaken tests, fixtures, goldens, or checks to hide failure.
6. If feedback reveals unexpected behavior whose cause is unknown, stop speculative changes and apply `agentic-debugging`.
7. Update documentation and generated expectations when their source of truth changes, and explain why expectation changes are correct.
8. Inspect the final diff and run terminal verification proportionate to risk.

Optional delegation may accelerate one settled unit. A fresh `agentic-implementer` cannot be assumed to know conversation-local context. Supply the outcome, settled constraints, explicit write boundary, applicable constraints or the explicit value `none`, and acceptance checks. Cite the repository path when a load-bearing constraint has one. Source restrictions, desired detail, and existing verification evidence are optional.

Keep overlapping work, shared outputs, cross-unit generated outputs, integration, repository-state operations, and final combined verification with the parent. An explicit, non-overlapping generated output may fall inside a delegated write boundary when source ownership permits.

On failure, stop broadening work, inventory affected state, and preserve successful and unrelated edits. Recover only known offending paths with explicit operations; never use destructive blanket reset, restore, clean, or stash operations.

Report changed paths, checks and results, deviations, residual risks, and blockers.
