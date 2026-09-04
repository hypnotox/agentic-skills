---
name: agentic-artifact-design
description: Design or substantially revise documentation, a plan, handoff, report, decision record, runbook, specification, skill, or another substantial prose artifact when audience, structure, information ownership, or local conventions materially affect the result. Skip routine replies and incidental edits.
---

# Agentic artifact design

Use this skill when creating or substantially revising documentation, a plan, handoff, report, decision record, runbook, specification, skill, or another substantial prose artifact whose audience, structure, information ownership, or local conventions materially affect the result. It applies whether the artifact is maintained, transferred, or delivered only in the active interaction. Apply it inline and proportionally rather than introducing a separate design phase or approval gate.

Skip this skill for routine conversational replies, small prose edits whose structure is already clear, commit messages, ordinary source comments, source code, configuration, structured data, and visual or interactive artifacts such as application interfaces, standalone HTML, images, presentations, and spreadsheets.

Safety rules, permissions, harness instructions, the actual user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding the requested scope or permission. This skill does not authorize mutation or persistence.

## Establish the artifact contract

Determine the intended readers, the question or task the artifact must answer, the action it should enable, its authority, expected lifetime, destination, and required format. Identify whether it is current-state reference, instruction, rationale, decision history, proposal, plan, or report; those purposes require different structures and voices.

Do not ask about routine formatting choices. Surface a blocker only when missing audience, purpose, authority, destination, or required content would materially change the result.

First apply the authority hierarchy above. It governs conflicts among the user request, harness constraints, and repository instructions. Within that boundary, prefer:

1. Required artifact contracts, templates, schemas, and generated-source ownership.
2. Clear precedent from comparable artifacts in the same repository.
3. The generic defaults in this skill.

Treat precedent as evidence, not unconditional law. Prefer examples of the same artifact kind from the owning area. Match established terminology, information placement, headings, link style, formatting, and voice when they are clear and compatible with higher authority. If examples conflict, follow the strongest applicable instruction or contract; otherwise use the simplest suitable form without inventing a repository-wide convention. Surface only conflicts that materially affect the artifact.

## Inspect local context

Reuse applicable context and evidence already established by the active task, revalidating it when the artifact requires current evidence. Before choosing a repository artifact's structure, inspect only what remains necessary to establish its contract, ownership, and local precedent:

- Applicable repository and directory instructions.
- The destination and the document or source that owns the subject.
- Relevant indexes or document maps.
- A small number of comparable artifacts of the same kind.
- Templates, schemas, generated-file markers, and editing ownership.
- Available documentation checks, renderers, or linters.

Do not survey the repository broadly once the contract and precedent are clear. When mutation is authorized, edit the owning source rather than a generated output. If the repository defines a generation mechanism, regenerate the required outputs and run the applicable rendering or consistency checks.

For an artifact delivered only in the active interaction, use the user request and available conversational context as its local contract. Do not invent repository conventions.

## Design the information

Choose the artifact's home and information shape before polishing sentences.

- Honor any output order required by the governing task. Otherwise lead with the outcome, operating rule, decision, highest-consequence finding, or conclusion the reader needs.
- Organize around the reader's questions and expected use, not the author's discovery order.
- For maintained documentation, give each changing fact one most-specific authoritative home and link or refer to it from secondary documents.
- For a standalone handoff, report, or other transfer artifact, include the context required for independent use and identify the authoritative source without presenting the copy as another maintained owner.
- Use headings to navigate real subjects, not to decorate or wrap every paragraph.
- Keep connected reasoning together rather than fragmenting one argument across tiny sections or bullets.
- Keep one coherent subject per artifact or section. Split content when readers would look it up for different reasons.
- Separate normative current state from rationale, proposals, history, and uncertainty when the distinction matters.
- Include examples only when they resolve ambiguity or materially ease correct action.

Do not impose one template across artifact kinds. A runbook, architecture reference, audit report, plan, and decision record should reflect their distinct reader tasks.

Use connected paragraphs by default. Choose another structure when it represents the information more clearly:

- Bullets for independent, scannable items.
- Numbered lists for order, priority, or procedure.
- Tables for exact mappings or comparisons across repeated fields.
- Code blocks for syntax, commands, schemas, or exact machine-readable examples.
- Diagrams when relationships, ownership, branching, or event order become materially clearer than in prose.

Avoid bullet soup, decorative or one-cell tables, redundant prose-plus-table repetition, and diagrams that merely restate a short linear explanation.

## Write and refine

Use the shortest phrasing that remains precise and complete. Prefer present-tense, authoritative prose; use the imperative for instructions. Choose concrete actions, outcomes, and domain terms over incidental runtime-tool narration. Use stable terminology, direct sentences, and ordinary sentence structure rather than punctuation as a substitute for clarity.

Match repository spelling, capitalization, naming, link, and code-format conventions. Avoid editorializing, promotional language, and historical narration unless evaluation or history is part of the artifact's purpose. Avoid dates and exact counts when they will become stale and are not required. State a tooling-enforced rule and point to its owner when useful rather than narrating its enforcement. Preserve qualifications that affect correctness, compatibility, safety, or scope, and keep the artifact consistent with the reality it describes.

After drafting, perform a compression and coherence pass:

1. Remove repetition, filler, throat-clearing, and repeated conclusions.
2. Merge fragments that express one connected idea.
3. Replace vague references with the owned concept, path, command, or contract when known.
4. Remove incidental stale-prone detail only when it is unnecessary for independent use and the authoritative source remains accessible.
5. Confirm that compression preserved required context, caveats, evidence, and verification instructions.

## Compose with task skills

When another task skill applies, it governs the task-specific method, required content and evidence, and completion standard derived from the user request and applicable repository contracts. Apply this skill inline to improve audience fit, information architecture, prose, formatting, and document integrity without removing required substance.

Do not add an artifact-design-specific phase, handoff, approval gate, or persistence requirement. Preserve any routing or gates required by the governing task.

## Verify and deliver

Verify proportionally to the artifact and repository:

- Any output order required by the governing task is preserved; otherwise the opening communicates the purpose and primary outcome.
- The structure supports the intended reader task.
- Required task-specific content remains present.
- Claims, examples, commands, paths, links, and terminology agree with their sources.
- Maintained documentation does not create a competing owner for a changing fact or contradict nearby documentation.
- A standalone handoff, report, or other transfer artifact identifies its authoritative sources and contains the context its reader needs to act independently.
- Generated-source and template ownership are respected.
- Applicable formatting, documentation, rendering, link, and repository checks pass.

Inspect the final artifact as a reader; a successful formatter or linter does not prove that it communicates well.

Keep the artifact in the active interaction unless the user asks to save it or applicable repository instructions require a file and the task authorizes that write. Do not invent documentation, plans, decision logs, reports, directories, templates, caches, or memory stores merely because this skill applies.
