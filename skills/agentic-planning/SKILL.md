---
name: agentic-planning
description: Sequence settled non-obvious work into coherent changes with real dependencies and integration points.
---

# Agentic planning

Use this skill when settled work is non-obvious enough to benefit from an explicit route through meaningful changes and real dependencies. Skip it when the route is already obvious and safely executable.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Build a revisable route

Inspect the affected current state, dependencies, and verification surfaces. For a code change, apply `agentic-code-design` before sequencing when a structural question remains or assessing the proposed structure requires nontrivial judgment, even if the design choice is settled. Reuse directly applicable independent review and preserve settled choices unless consequential new evidence reopens them. Expose unresolved design dependencies as blockers.

1. State the outcome and settled constraints.
2. Structure work around coherent changes to behavior, responsibilities, architecture, state, or integration.
3. Order actual dependencies, including necessary trials before dependent work or polish, and identify where separately changed parts meet; do not manufacture phases or coordination for naturally linear work.
4. Assign ownership only when delegation helps; keep shared and integration work with one owner.
5. Include verification where it meaningfully helps establish the outcome, proportionate to the task and its risks; not every step needs its own proof.
6. Surface open blockers instead of disguising them as tasks.

Explain what changes and why. Carry forward enough of the settled implementation shape and enabling-refactor dependencies to keep that route understandable; reuse the existing design explanation rather than creating a second source of truth, and make a requested standalone handoff self-contained. Include only work required by the settled outcome or a relevant evidenced risk. Include concrete design details, paths, symbols, or commands only when they preserve a consequential settled decision or materially clarify the route; their being known is not enough. Leave reversible local choices to implementation. Do not add edge-case, flexibility, hardening, compatibility, or recovery work for hypothetical concerns. Resolve consequential factual questions through `agentic-exploration`, and surface a genuine unresolved material or structural choice through its proper owner rather than silently planning around it.

A plan is a revisable route, not a frozen contract. Paths, order, commands, and delegated ownership may change as evidence develops while the outcome and settled constraints remain authoritative. Surface changes that affect that outcome or those constraints rather than silently revising them.

Before relying on a plan whose route requires nontrivial judgment, delegate a fresh-context assessment to `agentic-plan-reviewer` unless directly applicable independent review can be reused. This checkpoint authorizes the coordinating agent to delegate without a separate operator request, within applicable permissions and role boundaries. Apply `agentic-reviewing` for shared trigger, reuse, activation, and fallback rules. Assess the route, dependencies, scope, and verification. Reconcile material findings against the settled outcome and constraints before proceeding, and recheck conclusions affected by substantive corrections.

Keep plans in the active interaction by default. Create or update a plan file only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not create hidden state, caches, memory, or a plan lifecycle as a fallback.
