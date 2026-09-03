---
name: agentic-code-design
description: Design or reshape non-trivial code when a change affects semantic modeling, state or invariants, ownership, public contracts, dependency direction, test seams, or refactor boundaries.
---

# Agentic code design

Use this skill when an agreed behavior raises a structural question: where meaning or state belongs, which component owns an invariant, how representations cross a boundary, which direction dependencies should point, what contract consumers need, or whether enabling refactoring is necessary.

Do not use it for a local mechanical edit that already fits an established design. Use `agentic-brainstorming` when materially different choices would change user-visible behavior, compatibility, scope, risk, or a durable architectural direction. Planning owns task sequencing; this skill owns the design those tasks implement.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Start from the behavior

1. Establish the requested behavior, existing model, authoritative state, applicable contracts, and concrete constraints before selecting a structure.
2. Prefer the simplest design that completely supports the behavior. Additional abstractions, indirection, validation, extension points, tooling, or generalization must solve a present requirement, defect, invariant, or demonstrated source of change.
3. Treat SOLID, DRY, YAGNI, and named patterns as diagnostic vocabulary rather than compliance rules. Duplication of policy matters more than textual similarity; similar-looking code does not necessarily share one abstraction.
4. Prefer a direct implementation until actual variation, volatility, ownership, or translation pressure creates a useful seam.

## Model meaning and state

1. Separate domain meaning from storage, transport, UI, serialization, and framework representations. Translate at the boundary instead of spreading external shapes through policy code.
2. Model meaningful state, invariants, transitions, lifecycle, and failure behavior explicitly. Do not introduce wrapper types or state machines when a direct representation already expresses the meaning safely.
3. Give each authoritative value or policy one owner and one coherent mutation path. Avoid duplicated sources of truth and hidden synchronization obligations.
4. Keep operation-derived state within that operation and pass it explicitly to consumers. If state must be retained or cached, identify its owner, lifetime, invalidation rule, and consistency requirements.
5. Make mutability, ordering requirements, and side effects visible where they materially affect correctness.

## Assign cohesive ownership

1. Place behavior with the component that has the knowledge and lifecycle needed to enforce its invariants.
2. Choose the smallest boundary that fully owns the concern, not merely the smallest file that can contain the change.
3. Keep code that changes for the same semantic reason together. Split unrelated responsibilities rather than accumulating generic utility, common, helper, or coordinator homes.
4. Keep one implementation for a shared concern. Configure or extend its real owner instead of creating a reduced parallel copy. Separate implementations are justified only when they serve materially different contracts.
5. Minimize public surface. New exports, configuration points, and extension hooks should have a real consumer and a clear semantic contract.

## Direct dependencies deliberately

1. Derive dependency direction from ownership and stability rather than incidental call flow. Consumers depend on an owner's contract; the owner should not need knowledge of individual consumers.
2. Select volatile mechanisms at the outermost layer that has enough information, then pass the required capability inward explicitly. Avoid service locators, universal dependency bags, mutable globals, and silently selected production defaults.
3. Prefer explicit contracts, but do not create an interface automatically. A function or immutable value is often sufficient for a narrow dependency; an interface is useful for a cohesive behavioral contract with real substitution or boundary pressure.
4. Let adapters translate mechanism-specific values and failures without absorbing business policy.
5. Avoid dependency cycles and bidirectional coordination. When two components must know too much about each other, reconsider the ownership boundary.

## Design contracts and outcomes

1. Express contracts in domain terms and expose only what consumers need. Make mutation, ordering, lifecycle, ownership, and compatibility semantics explicit when callers rely on them.
2. Give failures a stable identity or structured shape when callers must react programmatically. Preserve underlying causes and add context at the boundary that understands it; do not make production control flow depend on human-readable message text.
3. Make partial success and retry behavior explicit when an operation can leave changed state. Report enough observed state for the caller to decide whether recovery or retry is safe.
4. Avoid public outcome types, error variants, or extension points without a real consumer. Human-facing wording is a presentation concern unless its exact text is itself the contract.

## Optimize for local reasoning

1. Name code for its domain meaning, not its implementation technique.
2. Keep the common path legible and direct. Handle failures at the nearest boundary that can recover or add useful meaning.
3. Prefer explicit, conventional constructs over clever compression or unnecessary indirection.
4. Let structure express what the code does. Comments should explain constraints, external contracts, or reasoning that the code itself cannot show.
5. If correctness requires holding several distant facts in mind, move those facts closer or represent their relationship explicitly.
6. Create testable seams that correspond to real production boundaries. Do not introduce mutable globals, unnecessary interfaces, or alternate implementations solely for tests.

## Integrate the change cleanly

1. Identify the current owner, target owner, relevant callers, authoritative data flow, representations, public contracts, generated or build references, and operational constraints.
2. Include a bounded enabling refactor when it prevents duplicated policy, inappropriate coupling, representation leakage, hidden state, or a workaround around the wrong model.
3. Surface a larger refactor through brainstorming when it changes the approved outcome, compatibility, risk, or durable architecture. Do not silently expand scope, but do not preserve avoidable structural debt merely to minimize the diff.
4. Base compatibility on real consumers and contracts. Define the migration shape, migrate consumers, and remove the obsolete path when practical. Any temporary parallel path needs a reason and a removal condition.
5. Move or add verification at the narrowest meaningful seam that protects the affected invariant or contract.

## Ground recommendations in risk

Recommend structural work because it prevents a concrete risk: ambiguous ownership, future divergence, duplicated policy, stale state, representation leakage, inappropriate dependency direction, unreadable control flow, weakened verification, or a recurring workaround.

Do not prescribe restructuring solely because a named pattern, stylistic preference, or theoretical flexibility would look cleaner.

Apply these rules inline during the work. When a separate recommendation is useful, summarize the semantic owner, authoritative state, invariants, boundary and dependency direction, affected contracts, migration or deletion shape, verification seam, and any material unresolved trade-off. Keep it in the active interaction unless persistence is explicitly requested or required by repository instructions and authorized.
