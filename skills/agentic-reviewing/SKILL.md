---
name: agentic-reviewing
description: Independently review existing code or prose, a design, implementation, or work history for defects, grounded risks, and useful improvements without editing.
---

# Agentic reviewing

Use this skill to review existing code or prose, a design, proposed change, diff, implementation, or work history. Obtain or reuse directly applicable independent review when the relevant assessment requires nontrivial judgment. Routine, well-understood and uniform mechanical work is exempt regardless of size. Reuse covers only the questions and evidence actually assessed; materially changed assumptions, designs, results, or history require refreshing affected conclusions.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission. Review remains report-only.

## Delegate required independent review

When new independent review is required, delegate it to a suitable available reviewer. This instruction authorizes the coordinating agent to launch that review without a separate operator request, within the active task and applicable permissions and role boundaries. Reuse directly applicable independent review instead of repeating it.

The parent selects the reviewer whose primary question matches the assignment:

| Reviewer | Primary question |
|---|---|
| [`agentic-implementation-reviewer`](../../agents/implementation-reviewer.md) | Does the implementation deliver the agreed behavior? |
| [`agentic-code-design-reviewer`](../../agents/code-design-reviewer.md) | Does the solution fit a coherent, understandable model? |
| [`agentic-plan-reviewer`](../../agents/plan-reviewer.md) | Is this a sound, proportionate route to the settled outcome? |
| [`agentic-instruction-reviewer`](../../agents/instruction-reviewer.md) | Will the guidance produce the intended behavior? |
| [`agentic-artifact-reviewer`](../../agents/artifact-reviewer.md) | Can the intended reader understand and use the artifact correctly? |
| [`agentic-retrospective-reviewer`](../../agents/retrospective-reviewer.md) | What significant issues, avoidable friction, and useful lessons does the work history establish? |

One specialist is sufficient when one focus covers the task. Use multiple specialists when distinct questions warrant separate judgment, not merely because the roles exist. Give each a clear primary focus; overlapping evidence is acceptable. These focuses are not file-type boundaries or reasons to ignore an obvious material issue, but do not silently expand an assignment into a comprehensive audit.

The parent selects coverage, consolidates related findings, reconciles them against evidence and agreed constraints, makes authorized corrections, refreshes affected checks, and reports material limitations. Review adds no approval stage and does not settle user-owned consequential choices. Reviewers do not delegate. Use `agentic-subagents` to choose supported model and thinking settings for the authorized delegation.

Use supported discovery and activation within applicable permissions before treating delegation as unavailable. If an explicit prohibition applies or no suitable reviewer can be made available, apply the relevant focuses directly and disclose the reason and lack of independence. Absence of a separate operator request is not a prohibition.

## Establish the review brief

For delegation, supply a self-contained assignment with the outcome or evaluation standard, review surface, and applicable task-specific constraints or the explicit value `none`. Include settled decisions needed to assess the work. Reference authoritative repository paths where available rather than duplicating instructions the child can already read. Source restrictions, desired detail, and existing verification evidence are optional.

Children start with a fresh conversation, not the parent transcript. Use the brief together with applicable global and repository instructions. If material input is missing or conflicting, ask the parent through an available communication channel before dependent review. If it cannot be resolved, state what cannot be assessed; do not infer a broader assignment or ask the user directly.

## Review

Inspect applicable evidence directly rather than trusting supplied claims or narration. Compare the outcome or evaluation standard and applicable constraints with evidence relevant to the assignment: settled decisions, source or prose, work history, integration effects, and available verification results.

Distinguish defects, grounded risks, and improvement opportunities relevant to the review's purpose. Support each with evidence and a concrete consequence or benefit. An improvement need not correct a defect; do not present it as required unless the evaluation standard requires it. When judging maintainability, identify what becomes easier to understand or change. Pattern preference or stylistic taste alone does not establish a problem or useful improvement.

Match rigor to established requirements, real consumers, trust assumptions, and concrete evidence. Do not invent defensive requirements or substitute a preferred solution for the intended outcome. Surface material conflicts and unknowns rather than silently resolving them by expanding scope.

## Report

Report material findings first, ordered by consequence or benefit. Consolidate related observations; do not seek a finding count. For each, state its kind, precise evidence reference, consequence or benefit, and a proportionate recommendation. Use paths and lines, commands, or historical records as appropriate. Separate observed facts, inferences, and unknowns, and qualify uncertainty that affects the finding. Then state coverage, checks actually performed, and remaining uncertainty, including material questions that could not be assessed. Clearly say when no finding was established.

Route settled corrections through `agentic-implementing`. An unknown cause belongs in `agentic-debugging`; an unresolved target-structure question belongs in `agentic-code-design`; and a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction belongs in `agentic-brainstorming`. A delegated reviewer returns findings and unresolved choices to the parent; it does not make corrections or take over those decisions.
