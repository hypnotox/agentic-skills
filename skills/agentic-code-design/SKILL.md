---
name: agentic-code-design
description: Resolve a structural question about semantic ownership, state or invariants, contracts, dependency direction, or refactor boundaries for agreed behavior.
---

# Agentic code design

Use this skill when agreed behavior raises questions about meaning, state, invariants, boundaries, dependencies, contracts, or enabling refactoring.

Skip mechanical edits that fit the model. Use `agentic-brainstorming` only when a structural choice materially changes settled outcome, scope, compatibility, safety, user-visible behavior, or system-level direction outside delegated design authority. Planning sequences work; this skill defines design.

Safety rules, permissions, harness instructions, the actual user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding the requested scope.

## Start from behavior

1. Establish behavior, model, authoritative state, contracts, consumers, and constraints before choosing structure.
2. Prefer the simplest complete design. Add abstraction, indirection, validation, extension points, tooling, or generalization only for a present requirement, defect, invariant, or demonstrated change.
3. Treat SOLID, DRY, YAGNI, and patterns as diagnostics, not rules. Policy duplication matters more than textual similarity.
4. Stay direct until variation, volatility, ownership, or translation pressure creates a useful seam.

## Model meaning and state

1. Separate domain meaning from storage, transport, UI, serialization, and framework shapes. Translate at boundaries instead of spreading external shapes through policy code.
2. Model meaningful state, invariants, transitions, lifecycle, and failures explicitly, without wrappers or state machines when a direct representation is safe.
3. Give each authoritative value or policy one owner and coherent mutation path. Avoid duplicated truth and hidden synchronization.
4. Keep operation-derived state within that operation and pass it explicitly. For retained or cached state, identify owner, lifetime, invalidation, and consistency requirements.
5. Make mutability, ordering, partial success, retry behavior, and side effects visible when they affect correctness.

## Assign ownership and policy

1. Place behavior where the knowledge and lifecycle can enforce its invariants. Choose the smallest boundary that fully owns the concern, not merely the smallest file.
2. Keep code that changes for the same semantic reason together. Split unrelated responsibilities instead of accumulating generic helper or coordinator homes.
3. Keep one authoritative home for shared policy and invariants. Multiple mechanism implementations may satisfy one contract when real variation requires them; do not duplicate policy across them.
4. Minimize public surface. Exports, configuration points, outcome variants, and extension hooks need real consumers and clear semantic contracts.

## Direct dependencies deliberately

1. Derive dependency direction from ownership and stability, not call flow. Consumers depend on an owner's contract; the owner should not know individual consumers.
2. Select volatile mechanisms at the outermost informed layer, then pass capabilities inward explicitly. Avoid service locators, universal dependency bags, mutable globals, and silent production defaults.
3. Do not create interfaces automatically. A function or immutable value often serves a narrow dependency; use an interface for a cohesive contract with real substitution or boundary pressure.
4. Let adapters translate mechanism-specific values and failures without absorbing business policy. Avoid cycles and bidirectional coordination; excessive mutual knowledge signals misplaced ownership.

## Design contracts and outcomes

1. Express contracts in domain terms and expose only what consumers need. State mutation, ordering, lifecycle, ownership, and compatibility semantics when callers rely on them.
2. Give failures stable identity or structure when callers react programmatically. Preserve causes and add context at the boundary that understands them; do not branch production control flow on human-readable messages.
3. When operations can leave changed state, make partial success and retry safety explicit and report enough observed state for the caller to choose recovery.
4. Keep human-facing wording in presentation unless exact text is itself a contract.

## Optimize for local reasoning

1. Name domain meaning, keep the common path direct, and handle failure where recovery or useful context is possible.
2. Prefer explicit conventional constructs. Comments explain constraints, external contracts, or reasoning code cannot show.
3. Move distant correctness facts closer or represent their relationship.
4. Create test seams at real production boundaries. Do not distort production architecture solely for test convenience; test-only implementations may satisfy an existing production contract.

## Integrate cleanly

1. Trace the current and target owners, callers, authoritative data flow, representations, public contracts, generated or build references, and operational constraints.
2. Include a bounded enabling refactor when it prevents duplicated policy, inappropriate coupling, representation leakage, hidden state, or a workaround around the wrong model.
3. Return a refactor choice to `agentic-brainstorming` only when it materially changes the settled outcome, scope, compatibility, safety, user-visible behavior, or a system-level architectural direction outside delegated design authority. Keep routine ownership, dependency, and refactor choices here; do not silently expand scope or preserve avoidable structural debt merely to minimize the diff.
4. Base compatibility on real consumers and contracts. Define the migration, move consumers, and remove obsolete paths when practical. A temporary parallel path needs a reason and removal condition.
5. Put verification at the narrowest meaningful seam protecting the affected invariant or contract.

## Ground recommendations in risk

Recommend structural work for an identifiable correctness or maintenance risk: ambiguous ownership, future divergence, duplicated policy, stale state, representation leakage, inappropriate dependency direction, unreadable control flow, weakened verification, or a recurring workaround. Do not restructure for pattern compliance, aesthetic preference, or theoretical flexibility.

Apply this guidance inline. When useful, state the owner, authoritative state, invariants, boundary and dependency direction, affected contracts, migration or deletion shape, verification seam, and unresolved material choices. Keep it in the active interaction unless persistence is requested or required and authorized.
