---
name: agentic-implementing
description: Implement and verify a settled change while preserving unrelated work and surfacing newly material choices.
---

# Agentic implementing

Use this skill when the requested outcome and material choices are settled. A mechanism named in a request, plan, or current implementation is not settled merely by appearing there. If its added complexity serves neither a settled current purpose nor a relevant evidenced risk and materially affects the solution, apply `agentic-brainstorming` before implementation or delegation. Preserve explicitly settled behavior and structure unless consequential new evidence reopens them.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Implement and verify

1. Inspect current state and affected contracts before editing. Preserve unrelated and concurrent work.
2. For a non-trivial code change, assess whether the proposed integration fits current ownership, state, contracts, and dependencies, including whether a concrete enabling refactor would avoid a correctness or maintenance problem. Apply `agentic-code-design` before reliance when a structural question remains or assessing the proposed structure requires nontrivial judgment, even if the design choice is settled. Reuse directly applicable independent review and preserve settled choices unless consequential new evidence reopens them. Selecting that skill does not expand edit authority.
3. If substantial implementation shape is not settled, give the user the concise code-design outline and resolve any consequential structural choice before editing or delegating dependent work. Reuse an already agreed outline, proceed when the choice was explicitly delegated, and skip this interaction for mechanical changes.
4. Implement the smallest coherent design at the semantic owner and clean integration point. Make routine local choices directly; make bounded enabling refactors only when the task authorizes them.
5. Use the smallest adequate mitigation for a relevant evidenced risk. Do not introduce speculative abstraction, validation, compatibility, hardening, or recovery behavior. Route material changes to outcome, scope, compatibility, safety, user-visible behavior, or system direction through `agentic-brainstorming` before dependent work.
6. Run focused feedback while iterating. Choose checks sufficient to establish the agreed behavior and relevant failure cases, and never weaken tests, fixtures, goldens, or checks to hide failure.
7. If feedback reveals unexpected behavior whose cause is unknown, stop speculative changes and apply `agentic-debugging`.
8. Update affected documentation and generated expectations when their source of truth changes, including relevant documents outside the existing diff. Preserve authoritative agreements, active decisions, historical and proposal status, and source ownership; a mismatch may require fixing the implementation. Explain why expectation changes are correct.
9. Inspect the final diff and run terminal verification proportionate to risk.
10. Obtain or reuse independent result review through `agentic-reviewing` when assessing the delivered behavior, structure, instructions, or artifact meaning requires nontrivial judgment. Routine, well-understood and uniform mechanical work is exempt regardless of size. Assign coverage of affected documentation claims against agreed behavior, the delivered result, and active decisions, including relevant untouched documents, instructions, and references. The implementation reviewer covers behavior and contract consistency; add artifact or instruction review only when distinct judgment is needed. For code changes, assess actual structure, reusing applicable design conclusions while checking deviations and newly visible interactions. Reconcile material findings and refresh affected checks before completion. The parent owns combined result review and task completion; delegated children return their work without separate completion cycles.

Follow the project's established stance on defensive development and testing. Without a stricter requirement or concrete project-specific risk, straightforward tests of normal operation and relevant edge cases are sufficient. Discuss newly discovered risks before expanding the work to address them.

Optional delegation may accelerate one settled unit. Use `agentic-subagents` to choose supported model and thinking settings when delegating. The parent owns user steering and the simplicity check before carrying agreed structural constraints into the existing brief; an explicitly settled brief remains authoritative to the child. A fresh `agentic-implementer` cannot be assumed to know conversation-local context. Supply the outcome, settled constraints, explicit write boundary, applicable task-specific constraints or the explicit value `none`, and acceptance checks. Cite the repository path when a load-bearing constraint has one. Source restrictions, desired detail, and existing verification evidence are optional.

Keep overlapping work, shared outputs, cross-unit generated outputs, integration, repository-state operations, and final combined verification with the parent. An explicit, non-overlapping generated output may fall inside a delegated write boundary when source ownership permits. If a child finds that dependent work requires a broader refactor or consequential design choice outside the brief, it stops and returns the blocker; it reports optional improvements without needlessly stopping a sound assigned unit or widening its boundary.

On failure, stop broadening work, inventory affected state, and preserve successful and unrelated edits. Recover only known offending paths with explicit operations; never use destructive blanket reset, restore, clean, or stash operations.

## Review the work history at completion

Retain a lightweight retrospective after implementation including affected documentation, verification, material result-review reconciliation, and any integration performed within the task, before final reporting and cleanup. Establish documentation currency first. PR completion does not wait for a future merge. Default to independent `agentic-retrospective-reviewer` assessment through `agentic-reviewing` for long-running or multi-stage work whose accumulated history merits separate judgment, and smaller work with meaningful issues, including resolved issues. Routine, well-understood and uniform mechanical work is exempt unless meaningful issues arose; an ordinary expected failing test alone does not mandate a reviewer.

Provide available history explicitly: relevant transcripts or excerpts, effort notes, decisions, review findings, verification and integration outcomes, and source where useful. Do not require unavailable transcripts or universal logging; qualify partial coverage. Reuse applicable historical conclusions and refresh them when later consequential integration evidence or corrections affect them. Make authorized bounded corrections or guidance updates, refresh affected verification or review, and surface substantial follow-up work. Do not manufacture findings or documents: an existing fix or behavioral test may capture a lesson, while a material issue still reaches the user.

Report changed paths, checks and results, deviations, residual risks, and blockers.
