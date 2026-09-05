---
name: agentic-planning
description: Sequence a settled non-obvious change into verifiable units with dependencies, ownership, integration points, and terminal checks.
---

# Agentic planning

Use this skill when settled work is non-obvious enough to benefit from explicit sequencing, dependency ordering, ownership, integration points, or terminal verification. Skip it when the route is already obvious and safely executable.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Build a revisable route

Inspect the affected current state, dependencies, and verification surfaces. For a code change with an unresolved structural question, apply `agentic-code-design` before sequencing or expose it as a blocker.

1. State the outcome and settled constraints.
2. Divide work into independently verifiable units at semantic boundaries.
3. Order dependencies and identify integration points.
4. Assign ownership only when delegation helps; keep shared and integration work with one owner.
5. Pair each unit with focused feedback and define terminal verification for the combined result.
6. Surface open blockers instead of disguising them as tasks.

A useful plan says what changes, where, why, what it depends on, and how completion is proved. Carry forward enough of the settled implementation shape and enabling-refactor dependencies to keep that route understandable; reuse the existing design explanation rather than creating a second source of truth, and make a requested standalone handoff self-contained. Include only work required by the settled outcome or a relevant evidenced risk. Specify enough to sequence, assign, integrate, and verify it; name known semantic owners and prefer concrete paths and commands when evidence supports them, but leave reversible local design choices to implementation. Do not add edge-case, flexibility, hardening, compatibility, or recovery work for hypothetical concerns. Test a consequential factual premise through `agentic-context`, and surface a genuine unresolved material or structural choice through its proper owner rather than silently planning around it.

A plan is a revisable route, not a frozen contract. Paths, order, commands, and delegated ownership may change as evidence develops while the outcome and settled constraints remain authoritative. Surface changes that affect that outcome or those constraints rather than silently revising them.

Keep plans in the active interaction by default. Create or update a plan file only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not create hidden state, caches, memory, or a plan lifecycle as a fallback.
