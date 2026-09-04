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
2. Prefer the simplest complete design. Add abstraction, indirection, validation, extension points, or generalization only for a present requirement, defect, invariant, or demonstrated variation.
3. Give each value, policy, and mutation path one semantic owner. Place behavior where knowledge and lifecycle can enforce its invariants, not merely in the smallest file.
4. Model meaningful state, transitions, lifetime, invalidation, ordering, partial success, retry behavior, and side effects explicitly when they affect correctness. Keep operation-derived state local and pass it directly.
5. Separate domain meaning from storage, transport, UI, serialization, and framework shapes. Translate at boundaries rather than spreading external representations through policy code.

Choose names and control flow that expose intent and the underlying model. Use comments for constraints or rationale that the code cannot express clearly.

Treat SOLID, DRY, YAGNI, and patterns as diagnostics, not rules. Policy duplication matters more than textual similarity; stay direct until variation, volatility, ownership, or translation pressure creates a useful seam.

## Set boundaries, dependencies, and contracts

- Keep code that changes for the same semantic reason together and split unrelated responsibilities. Avoid generic helper or coordinator homes.
- Keep shared policy and invariants authoritative in one place. Multiple mechanism implementations may satisfy one contract, but must not duplicate its policy.
- Derive dependency direction from ownership and stability, not call flow. Select volatile mechanisms at the outermost informed layer and pass narrow capabilities inward; avoid service locators, mutable globals, silent defaults, cycles, and dependency bags.
- Use an interface only for a cohesive contract with real substitution or boundary pressure. Functions and immutable values often suffice. Test-only implementations may satisfy an existing production contract without distorting production architecture.
- Let adapters translate mechanism-specific values and failures without absorbing domain policy. Expose only what consumers need.
- Give failures stable identity when callers react programmatically, preserve causes, and add context at the boundary that understands them. When state can change before failure, define partial-success and retry semantics.

## Integrate and verify

Trace affected owners, callers, representations, public contracts, generated references, and operational constraints. Include a bounded enabling refactor when authorized and needed to prevent duplicated policy, inappropriate coupling, representation leakage, hidden state, or workaround code.

Base compatibility on real consumers. Define migration, move consumers, and remove obsolete paths when practical; any temporary parallel path needs a reason and removal condition. Protect the invariant or contract at the narrowest meaningful verification seam.

Recommend structural work only for an identifiable correctness or maintenance risk, such as ambiguous ownership, future divergence, stale state, representation leakage, inappropriate dependency direction, unreadable control flow, weakened verification, or a recurring workaround—not for pattern compliance or theoretical flexibility.

## Return the design

Inline use needs no separate artifact. For standalone use, return the owner, authoritative state, invariants, contracts, dependency direction, migration or deletion shape, and verification seam as applicable. If a material choice remains outside design authority, name it as unresolved rather than selecting it. Keep the result in the active interaction unless persistence is requested or required and authorized.
