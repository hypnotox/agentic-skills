---
name: agentic-code-design
description: Resolve a structural question about semantic ownership, state or invariants, contracts, dependency direction, or refactor boundaries for agreed behavior.
---

# Agentic code design

Use this skill when agreed behavior raises a structural question about meaning, state, invariants, ownership, dependencies, contracts, or enabling refactoring. For non-trivial code changes, first assess whether the proposed integration fits those parts of the current model; skip a design exercise for mechanical edits that already fit. Explorer establishes current structure; code design chooses target structure. Planning sequences the settled result.

`agentic-brainstorming` owns material changes to outcome, scope, compatibility, safety, user-visible behavior, or system direction. Code design owns internal structure for agreed behavior and its user-facing discussion. Agreement on behavior does not by itself settle a consequential structural choice. `agentic-implementing` makes local choices within a settled design boundary.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Selecting this skill does not authorize edits. A bounded enabling refactor requires implementation authority from the surrounding task.

## Define the target model

1. Establish the agreed behavior, current model, consumers, constraints, and authoritative data flow before choosing structure. Assess whether the proposed integration preserves current ownership, state, contracts, and dependency direction or would bolt on duplicated policy, workaround code, or representation leakage. Before introducing a mechanism, check whether existing codebase, platform, or dependency capabilities meet the need cleanly. Reuse them when they fit; explain a concrete reason for an alternative.
2. Prefer the simplest coherent design and the smallest adequate response, not automatically the smallest diff. Add abstraction, indirection, validation, compatibility, extension, hardening, recovery, or other machinery only for a settled current outcome or constraint, or a relevant evidenced risk. A proposed or existing mechanism is not evidence of its own necessity.
3. Give each value, policy, and mutation path one semantic owner. Place behavior where knowledge and lifecycle can enforce its invariants, not merely in the smallest file.
4. Model meaningful state, transitions, lifetime, invalidation, ordering, side effects, and operation-derived state explicitly when they affect correctness. Define partial-success and retry behavior only for identified failure modes where state may have changed or the result of a state-changing operation is uncertain. Do not invent rollback, journaling, reconciliation, self-healing, or corruption handling for merely conceivable failures.
5. Separate domain meaning from storage, transport, UI, serialization, and framework shapes where doing so clarifies ownership, protects invariants, or makes change easier. Translate at meaningful boundaries; keep representations direct when they already express the domain without obscuring policy.

Choose names and control flow that expose intent and the underlying model. Use comments for constraints or rationale that the code cannot express clearly.

Use KISS and YAGNI as the default against unjustified complexity; treat SOLID, DRY, and patterns as diagnostics rather than reasons to add machinery. Policy duplication matters more than textual similarity; stay direct until evidenced variation, volatility, ownership, or translation pressure creates a useful seam. Treat verified applicable platform guarantees and established contracts as valid assumptions rather than adding defenses for their hypothetical violation.

Base security design on explicit requirements, established trust assumptions, and concrete project evidence. A documented threat profile is not a prerequisite for recognizing an evidenced risk. Do not invent threats or defenses; route an unresolved material security choice through `agentic-brainstorming` before dependent work.

## Set boundaries, dependencies, and contracts

- Keep code that changes for the same semantic reason together and split unrelated responsibilities. Keep helpers and coordinators cohesive; do not use them to collect unrelated responsibilities or obscure semantic ownership.
- Keep shared policy and invariants authoritative in one place. Multiple mechanism implementations may satisfy one contract, but must not duplicate its policy.
- Derive dependency direction from ownership and stability, not call flow. Select volatile mechanisms at the outermost informed layer and pass narrow capabilities inward; avoid service locators, mutable globals, silent defaults, cycles, and dependency bags.
- Use an interface only for a cohesive contract with real substitution or boundary pressure. Functions and immutable values often suffice. Test-only implementations may satisfy an existing production contract without distorting production architecture.
- Let adapters translate mechanism-specific values and failures without absorbing domain policy. Expose only what consumers need.
- Keep failure distinguishable from valid results. Recover or fall back only when the behavior has a defined meaning and still satisfies the relevant contract; do not conceal failure behind defaults or apparent success. Give failures stable identity when callers react programmatically, preserve causes, and add context at the boundary that understands them.

## Integrate and verify

Trace affected owners, callers, representations, public contracts, generated references, and operational constraints. Look for a bounded enabling refactor that would prevent duplicated policy, inappropriate coupling, representation leakage, hidden state, or workaround code even when the feature could technically be bolted on. State its concrete correctness or maintenance reason, affected boundary, and whether dependent work requires it or it is only recommended. Do not make unrelated cleanup a prerequisite.

A recommendation does not expand implementation authority. Surface a justified refactor outside current edit authority before work depends on it; obtain the needed decision for a prerequisite, but do not block a sound authorized change on an optional improvement.

Base compatibility on real consumers. Define migration, move consumers, and remove obsolete paths when practical; any temporary parallel path needs a reason and removal condition. Protect the invariant or contract at the narrowest meaningful verification seam. Recommend structural work only for an identifiable correctness or maintenance risk, not pattern compliance or theoretical flexibility.

## Expose the design for steering

For substantial work whose implementation shape is not settled, give the user a concise outline before editing or delegating dependent implementation. Explain where behavior will live, the important abstractions or patterns and their purpose, relevant data flow, any enabling refactor, and the verification seam—but only where these help the user steer the change.

When a consequential structural choice or broader refactor remains, recommend an option and let the user settle it unless they explicitly delegated that decision. An announcement immediately before editing is not a steering point. Reuse an already visible, settled outline; make routine local choices directly, and do not reopen settled structure without consequential new evidence. This is proportionate interaction, not a separate approval phase or required artifact.

## Return the design

Inline use needs no separate artifact. For standalone use, return the owner, authoritative state, invariants, contracts, dependency direction, enabling-refactor status, migration or deletion shape, and verification seam as applicable. Name consequential choices outside design authority as unresolved rather than selecting them. Keep the result in the active interaction unless persistence is requested or required and authorized.
