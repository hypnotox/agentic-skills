---
name: agentic-reviewing
description: Independently review existing code or prose, a design, diff, or implementation for defects, grounded risks, and useful improvements without editing.
---

# Agentic reviewing

Use this skill for a required review checkpoint or an explicit audit of existing code or prose, a design, proposed change, diff, or implementation. Independent review is especially useful for compatibility effects, cross-boundary changes, security, concurrency, data loss, migrations, destructive behavior, substantial refactoring, generated ownership, or judgment-heavy verification.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission. Review remains report-only.

## Coordinate review checkpoints

Producing skills own when review is required and its purpose. Judge substance by changes to behavior, structure, decisions, or meaning, not file count or diff size. Mechanical edits need no separate checkpoint.

At an applicable checkpoint, use fresh-context subagents when available and permitted. Otherwise apply the relevant checks directly and state that independent review was unavailable. Use `agentic-subagents` for supported model and thinking settings when delegating.

The parent coordinates one checkpoint for the same result across applied skills and owns review of delegated work. Children return their result without launching reviewers. Reuse prior review only where it still covers the current result. Review reports do not trigger recursive checkpoints.

Reconcile findings against evidence and settled constraints before relying on the result. Route corrections and unresolved choices to their owners; do not treat preferences as required changes or report unresolved blockers as completion. Recheck conclusions affected by substantive corrections.

## Select reviewers when delegating

For an end-of-brainstorming check, use [`agentic-premise-checker`](../../agents/premise-checker.md) to assess the proposed direction and its material premises. Its role owns the brief and verdict.

For an output review, the parent selects the reviewer whose primary question matches the assignment:

| Reviewer | Primary question |
|---|---|
| [`agentic-implementation-reviewer`](../../agents/implementation-reviewer.md) | Does the implementation deliver the agreed behavior? |
| [`agentic-code-design-reviewer`](../../agents/code-design-reviewer.md) | Does the solution fit a coherent, understandable model? |
| [`agentic-plan-reviewer`](../../agents/plan-reviewer.md) | Is this a sound, proportionate route to the settled outcome? |
| [`agentic-instruction-reviewer`](../../agents/instruction-reviewer.md) | Will the guidance produce the intended behavior? |
| [`agentic-artifact-reviewer`](../../agents/artifact-reviewer.md) | Can the intended reader understand and use the artifact correctly? |

One specialist is sufficient when one focus covers the task. Use multiple specialists when distinct questions warrant separate judgment, not merely because the roles exist. Give each a clear primary focus; overlapping evidence is acceptable. These focuses are not file-type boundaries or reasons to ignore an obvious material issue, but do not silently expand an assignment into a comprehensive audit.

The parent selects reviewers, consolidates related findings, and resolves disagreements against evidence and agreed constraints. Reviewers do not delegate. Outside a required checkpoint, delegation remains optional; direct review must not be presented as a separate independent review.

## Establish the review brief

For output-review delegation, supply a self-contained assignment with the outcome or evaluation standard, review surface, and applicable task-specific constraints or the explicit value `none`. Include settled decisions needed to assess the work. Reference authoritative repository paths where available rather than duplicating instructions the child can already read. Source restrictions, desired detail, and existing verification evidence are optional.

Children start with a fresh conversation, not the parent transcript. Use the brief together with applicable global and repository instructions. If material input is missing or conflicting, ask the parent through an available communication channel before dependent review. If it cannot be resolved, state what cannot be assessed; do not infer a broader assignment or ask the user directly.

## Review

Inspect fresh evidence rather than trusting supplied claims or implementation narration. Compare the outcome or evaluation standard and applicable constraints with the settled design, relevant source or prose, repository instructions, review surface, integration effects, and available verification results.

Distinguish defects, grounded risks, and improvement opportunities relevant to the review's purpose. Support each with evidence and a concrete consequence or benefit. An improvement need not correct a defect; do not present it as required unless the evaluation standard requires it. When judging maintainability, identify what becomes easier to understand or change. Pattern preference or stylistic taste alone does not establish a problem or useful improvement.

Match rigor to established requirements, real consumers, trust assumptions, and concrete evidence. Do not invent defensive requirements or substitute a preferred solution for the intended outcome. Surface material conflicts and unknowns rather than silently resolving them by expanding scope.

## Report

Report material findings first, ordered by consequence or benefit. Consolidate related observations; do not seek a finding count. For each, state its kind, precise path and line or command evidence, consequence or benefit, and a proportionate recommendation. Separate observed facts, inferences, and unknowns, and qualify uncertainty that affects the finding. Then state coverage, checks actually performed, and remaining uncertainty, including intended behavior that could not be assessed. Clearly say when no finding was established.

Route settled corrections through `agentic-implementing`. An unknown cause belongs in `agentic-debugging`; an unresolved target-structure question belongs in `agentic-code-design`; and a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction belongs in `agentic-brainstorming`. A delegated reviewer returns findings and unresolved choices to the parent; it does not make corrections or take over those decisions.
