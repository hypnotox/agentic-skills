---
name: agentic-code-design
description: Resolve a structural question about semantic ownership, state or invariants, contracts, dependency direction, or refactor boundaries for agreed behavior.
---

# Agentic code design

Use this skill when agreed behavior raises a structural question about meaning, state, invariants, ownership, dependencies, contracts, or enabling refactoring. Skip mechanical edits that fit the current model. Explorer establishes current structure; code design chooses target structure. Planning sequences the resulting work.

`agentic-brainstorming` owns material changes to outcome, scope, compatibility, safety, user-visible behavior, or system direction. Code design owns internal structure for agreed behavior. `agentic-implementing` makes local choices within that boundary and escalates only material boundary changes.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Selecting this skill does not authorize edits. A bounded enabling refactor requires implementation authority from the surrounding task.

## Define the target model

1. Establish the agreed behavior, current model, consumers, constraints, and authoritative data flow before choosing structure.
2. Prefer the simplest complete design and the smallest adequate response. Add abstraction, indirection, validation, compatibility, extension, hardening, recovery, or other machinery only for a settled current outcome or constraint, or a relevant evidenced risk. A proposed or existing mechanism is not evidence of its own necessity.
3. Give each value, policy, and mutation path one semantic owner. Place behavior where knowledge and lifecycle can enforce its invariants, not merely in the smallest file.
4. Model meaningful state, transitions, lifetime, invalidation, ordering, and side effects explicitly when they affect correctness. Model partial success and retry behavior only for identified failure modes where state may have changed, or the outcome of a state-changing operation may be uncertain when failure is observed. Do not invent rollback, journaling, reconciliation, self-healing, or corruption handling for merely conceivable failures. Keep operation-derived state local and pass it directly.
5. Separate domain meaning from storage, transport, UI, serialization, and framework shapes. Translate at boundaries rather than spreading external representations through policy code.

Choose names and control flow that expose intent and the underlying model. Use comments for constraints or rationale that the code cannot express clearly.

Use KISS and YAGNI as the default against unjustified complexity; treat SOLID, DRY, and patterns as diagnostics rather than reasons to add machinery. Policy duplication matters more than textual similarity; stay direct until evidenced variation, volatility, ownership, or translation pressure creates a useful seam. Treat verified applicable platform guarantees and established contracts as valid assumptions rather than adding defenses for their hypothetical violation.

For security design, use only an applicable explicit threat profile and established trust assumptions. Do not infer project-specific threats. Route a grounded unresolved material security choice through `agentic-brainstorming`.

## Set boundaries, dependencies, and contracts

- Keep code that changes for the same semantic reason together and split unrelated responsibilities. Avoid generic helper or coordinator homes.
- Keep shared policy and invariants authoritative in one place. Multiple mechanism implementations may satisfy one contract, but must not duplicate its policy.
- Derive dependency direction from ownership and stability, not call flow. Select volatile mechanisms at the outermost informed layer and pass narrow capabilities inward; avoid service locators, mutable globals, silent defaults, cycles, and dependency bags.
- Use an interface only for a cohesive contract with real substitution or boundary pressure. Functions and immutable values often suffice. Test-only implementations may satisfy an existing production contract without distorting production architecture.
- Let adapters translate mechanism-specific values and failures without absorbing domain policy. Expose only what consumers need.
- Give failures stable identity when callers react programmatically, preserve causes, and add context at the boundary that understands them. Define the smallest adequate partial-success and retry semantics only when an identified failure mode may change state before failure is observed, or may leave the outcome of a state-changing operation uncertain.

## Integrate and verify

Trace affected owners, callers, representations, public contracts, generated references, and operational constraints. Include a bounded enabling refactor when authorized and needed to prevent duplicated policy, inappropriate coupling, representation leakage, hidden state, or workaround code.

Base compatibility on real consumers. Define migration, move consumers, and remove obsolete paths when practical; any temporary parallel path needs a reason and removal condition. Protect the invariant or contract at the narrowest meaningful verification seam.

Recommend structural work only for an identifiable correctness or maintenance risk, such as ambiguous ownership, future divergence, stale state, representation leakage, inappropriate dependency direction, unreadable control flow, weakened verification, or a recurring workaround—not for pattern compliance or theoretical flexibility.

## Return the design

Inline use needs no separate artifact. For standalone use, return the owner, authoritative state, invariants, contracts, dependency direction, migration or deletion shape, and verification seam as applicable. If a material choice remains outside design authority, name it as unresolved rather than selecting it. Keep the result in the active interaction unless persistence is requested or required and authorized.
