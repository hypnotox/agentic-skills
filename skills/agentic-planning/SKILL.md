---
name: agentic-planning
description: Turn a settled direction into executable sequencing, ownership, and verification when coordination or complexity benefits from a plan.
---

# Agentic planning

Use this skill when a settled change benefits from explicit sequencing, dependency ordering, ownership, or verification. Skip it for work that is already obvious and safely executable.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Build the plan

1. State the outcome and settled constraints.
2. Divide work into independently verifiable units at semantic boundaries.
3. Order dependencies and identify integration points.
4. Assign ownership only when delegation is useful; keep shared and integration work with one owner.
5. Pair each unit with focused feedback and define terminal verification for the combined result.
6. Surface open blockers instead of disguising them as tasks.

A useful plan says what changes, where, why, what it depends on, and how completion is proved. Prefer concrete paths and commands when known, without inventing details unsupported by evidence.

Plans remain in the active interaction by default. Create or update a plan file only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not create hidden state, caches, memory, or a plan lifecycle as a fallback.
