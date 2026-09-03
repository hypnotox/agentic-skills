---
name: agentic-code-design
description: Choose maintainable ownership, dependency direction, interfaces, and refactor boundaries for a non-trivial code change.
---

# Agentic code design

Use this skill when implementation depends on where behavior should live, how components should relate, or how to bound a structural refactor. Use `agentic-brainstorming` as well only when the design direction remains a material user-facing or architectural choice.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Design the boundary

1. Identify the behavior's semantic owner and the smallest cohesive boundary that can own it.
2. Trace callers, dependencies, data and representation flow, public contracts, generated/build references, tests, and operational or migration coupling that matter to the change.
3. Prefer explicit interfaces and one-way dependencies over duplicated policy, representation leakage, or coordination through hidden state.
4. Keep refactors proportionate. Include enabling refactors when they make the requested change clean; avoid speculative frameworks and unrelated cleanup.
5. Define migration order, compatibility behavior, and verification surfaces before moving ownership.
6. Remove obsolete parallel paths when safe. If one must remain, identify the residual debt and why.

Return a concise recommendation: owner, boundary, dependency direction, affected contracts, sequencing, verification, and unresolved risks. Keep it in the active interaction unless persistence is explicitly requested or repository-required and authorized.
