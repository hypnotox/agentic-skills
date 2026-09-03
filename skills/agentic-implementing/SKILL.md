---
name: agentic-implementing
description: Execute a settled change, preserve unrelated work, integrate cleanly, and verify the resulting behavior.
---

# Agentic implementing

Use this skill when the requested outcome and any material design choices are settled. It governs mutation and verification, not whether the task needs a separate process.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Procedure

1. Inspect the current state and affected contracts before editing. Preserve unrelated and concurrent work.
2. Implement at the semantic owner and smallest clean integration point.
3. Make bounded enabling refactors when they prevent duplication, inappropriate coupling, representation leakage, or workaround code. Surface a new material choice instead of silently broadening scope.
4. Run focused feedback while iterating. Use the strongest practical oracle for changed behavior and never weaken tests, fixtures, goldens, or checks to hide a failure.
5. Update documentation and generated expectations when the behavior or source of truth changes. Explain why expectation changes are correct.
6. Inspect the final diff and run terminal verification proportionate to risk.

Optional delegation may accelerate a bounded unit. Give `agentic-implementer` a self-contained task and explicit write boundary. Keep overlapping, shared, generated, integration, repository-state, and final-verification work with one owner. Delegation is not required.

On failure, stop broadening work, inventory the affected state, and preserve successful or unrelated edits. Recover only known offending paths with explicit operations; do not use destructive blanket cleanup.

Report changed paths, checks and results, deviations, residual risks, and blockers.
