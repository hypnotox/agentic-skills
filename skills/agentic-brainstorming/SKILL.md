---
name: agentic-brainstorming
description: Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction before dependent work proceeds.
---

# Agentic brainstorming

Use this skill only when a material choice remains about outcome, scope, compatibility, safety, user-visible behavior, or system direction. Code design owns internal structure for agreed behavior, and implementation owns local choices within settled boundaries; do not turn those choices into approval gates.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Resolve the choice

1. State the choice, outcome, constraints, affected boundary, and evidence needed.
2. Separate settled facts from assumptions and unknowns.
3. Present a proportionate set of viable options with trade-offs, risks, reversibility, and compatibility effects.
4. Recommend the option that best fits the evidence. If the evidence cannot distinguish the options responsibly, report the choice as unresolved, name the missing discriminating evidence, and propose a bounded investigation.
5. Confirm a supported direction before dependent work, unless the user explicitly delegated the decision and proceeding remains within granted authority. Do not force a choice while it remains unresolved.

Keep the decision in the active interaction by default. Persist it only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not invent a decision log, memory store, hidden state, or other process artifact.

Once settled, preserve the decision's boundary. Reopen it only when new evidence creates another material choice.
