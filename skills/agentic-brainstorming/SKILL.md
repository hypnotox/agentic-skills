---
name: agentic-brainstorming
description: Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or durable architecture before dependent work proceeds.
---

# Agentic brainstorming

Use this skill only when a material choice remains about outcome, scope, compatibility, safety, user-visible behavior, or durable architecture. Do not turn routine implementation choices into approval gates.

Safety rules, permissions, harness instructions, the actual user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding the requested scope.

## Resolve the choice

1. State the choice, outcome, constraints, affected boundary, and evidence needed.
2. Separate settled facts from assumptions and unknowns.
3. Present a proportionate set of viable options with trade-offs, risks, reversibility, and compatibility effects.
4. Recommend the option that best fits the evidence.
5. Confirm the direction before dependent work, unless the user explicitly delegated this decision and proceeding remains within granted authority.

Keep the decision in the active interaction by default. Persist it only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not invent a decision log, memory store, hidden state, or other process artifact.

Once settled, preserve the decision's boundary. Return only when new evidence creates another material choice; make local implementation choices without reopening routine details.
