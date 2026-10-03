---
name: agentic-artifact-design
description: Use for substantial documents and assets when purpose, consumers, form, ownership, or repository conventions affect the result; skip routine replies and incidental edits.
---

# Agentic artifact design

Use this skill to create or substantially revise documents, game assets, or other lasting outputs whose purpose, consumers, form, ownership, or local conventions affect the result. Apply it inline and proportionally, including for expressive and narrative purposes.

Skip routine replies, incidental edits with an established shape, commit messages, ordinary source comments, source code, configuration, and structured data.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. This skill supplies method; it does not authorize mutation or persistence.

## Establish the contract and owner

Determine the people or systems that will use the artifact, its purpose, enabled action or experience, authority, expected lifetime, destination, and required format. Let purpose determine form, organization, and level of detail. Identify the content's role and status, such as current-state reference, instruction, rationale, decision history, proposal, plan, report, or fiction. Surface missing input only when it would materially change the result; do not ask about routine formatting.

After applying higher-authority instructions, prefer in order:

1. Required contracts, templates, schemas, and generated-source ownership.
2. Clear precedent from comparable artifacts in the same owning area.
3. The generic defaults in this skill.

Treat precedent as evidence, not unconditional law. Match established terminology, information placement, headings, links, format, and voice when compatible with the artifact's contract. If examples conflict, follow the strongest applicable contract or use the simplest suitable form without inventing a repository-wide convention.

Inspect only what remains necessary: applicable instructions, the destination and subject owner, relevant indexes, a small number of same-kind examples, templates or generated markers, and available documentation checks. Edit the owning source rather than generated output; when generation is required, regenerate and verify it. For interaction-only artifacts, the active task is the local contract.

## Shape the artifact

- Give each element a purpose, including expressive or narrative use. Organize and present it so its consumers can find and use what matters; adapt templates to the content rather than inventing content to fill them.
- For explanatory and operational documents, lead with the outcome, operating rule, decision, finding, or conclusion the reader needs unless a required order applies. Organize around reader questions and use, not discovery order.
- Give each changing fact one most-specific authoritative home. Link or refer to it elsewhere rather than creating competing owners.
- Preserve context needed for interpretation, use, and maintenance, including relevant reasoning, design intent, and usage constraints. Make standalone transfer artifacts independently usable while identifying authoritative sources.
- Distinguish proposals, decisions, observations, history, and uncertainty where their status matters. Keep intended behavior, current implementation, verification, and acceptance distinguishable when material.
- For documents, prefer useful synthesis to exhaustive reproduction. Include examples when they resolve ambiguity or materially ease correct action.

For explanatory and operational prose, use connected paragraphs by default, bullets for independent items, numbering for sequence or priority, tables for repeated comparisons, code blocks for exact syntax, and diagrams when relationships or branching become clearer. Avoid decorative structure, bullet soup, and prose that repeats a table or diagram. Choose other forms when the artifact's expressive or narrative purpose calls for them.

## Draft and compose

For explanatory and operational prose, write concisely and precisely. Match tense and voice to the content's status; use imperative language for instructions. Use concrete actions and stable domain terms; match applicable repository spelling, naming, capitalization, links, and formatting. Remove promotional language, filler, incidental tool narration, and stale-prone detail while preserving qualifications that affect correctness, compatibility, safety, or scope.

For fictional text, consider its author, intended reader, setting, and status. Choose wording and voice that fit that context; repeated technical jargon or instructions do not create credibility by themselves. Preserve deliberate expressive choices that serve the purpose.

For guidance, state intended behavior and when it applies; distinguish requirements, defaults, and options. Prescribe a method or exact value only when explicitly adopted as a requirement or necessary to the outcome; current implementation alone does not justify making it mandatory. Separate instructions from explanation and examples, clarify required and incidental example details when they could be confused, and reconcile conflicting or repeated instructions.

When another task skill applies, it owns task-specific method, evidence, required content, terminal behavior, and applicable review. Apply this skill inline for purpose, consumer fit, and artifact integrity, and include its questions in any review the owning task requires. Do not add a separate review checkpoint, approval gate, or persistence requirement. Apply `agentic-visual-design`, `agentic-typography`, or `agentic-animation` when those concerns matter; they own specialist methods and appearance or motion evidence.

Refine against the purpose after drafting: remove unneeded repetition and filler, replace vague references with owned concepts or paths, and confirm required context and caveats remain. For explanatory and operational prose, merge fragments expressing one idea. Maintain artifacts meant to stay current; preserve useful history without presenting superseded material as current.

## Verify and deliver

Check that form, organization, and detail serve the intended consumers and purpose, required content and order remain, material factual claims and terminology agree with sources, changing facts have one owner, links, commands, and usage constraints are accurate, and generated ownership is respected. Run applicable format, rendering, link, or repository checks, then inspect the artifact in its intended use. Use the owning task's specialist verification where applicable.

Before delivering a standalone artifact whose assessment requires nontrivial judgment, delegate a fresh-context assessment to `agentic-artifact-reviewer` unless directly applicable independent review can be reused. This checkpoint authorizes the coordinating agent to delegate without a separate operator request, within applicable permissions and role boundaries. Apply `agentic-reviewing` for shared trigger, reuse, activation, and fallback rules. Assess purpose, consumer usability, context, source integrity, and lifetime; add instruction review when the artifact directs behavior and that warrants separate judgment. Keep specialized evaluation with its owner and avoid stacking reviews over the same questions. Reconcile material findings against the artifact's purpose and constraints before delivery, and recheck conclusions affected by substantive corrections.

Keep the artifact in the active interaction unless the task requests a file or applicable instructions require one and the write is authorized. Do not invent documentation, plans, logs, caches, memory stores, directories, or process artifacts merely because this skill applies.
