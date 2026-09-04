---
name: agentic-brainstorming
description: Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction, including when a prescribed mechanism rests on an unsupported material premise.
---

# Agentic brainstorming

Use this skill only when a material choice remains about outcome, scope, compatibility, safety, user-visible behavior, or system direction, including when a proposed mechanism rests on an unsupported premise that materially affects the solution. A mechanism is not settled merely because the agent, user, plan, or current implementation proposed it; challenge the premise within the active task boundary. Code design owns internal structure for agreed behavior, and implementation owns local choices within settled boundaries; do not turn those choices into approval gates.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Resolve the choice

1. State the intended outcome, settled constraints, affected boundary, and evidence needed separately from proposed mechanisms.
2. Separate settled facts from assumptions and unknowns; do not promote an assumption or unknown into a requirement. Test a checkable consequential premise through `agentic-context`, while keeping genuine choices here.
3. Present only evidence-supported viable options with proportionate trade-offs, risks, reversibility, and compatibility effects. One option is enough when only one is supported; do not manufacture alternatives for balance.
4. Recommend the simplest effective option. Possibility alone is not evidence of need, and an evidenced concern receives the smallest adequate response. If the evidence cannot distinguish the options responsibly, report the choice as unresolved, name the missing discriminating evidence, and propose a bounded investigation.
5. Confirm a supported direction before dependent work, unless the user explicitly delegated the decision and proceeding remains within granted authority. Do not force a choice while it remains unresolved.

Surface only concerns grounded in the current task, system, contract, or observed behavior that would materially affect the solution; omit merely conceivable concerns instead of asking about them. For security choices, use only an applicable explicit threat profile and established trust assumptions. Do not invent threats, adversaries, posture, or trust assumptions. When missing security scope creates a grounded unresolved material choice, a user-facing agent asks the user if they own it; a delegated agent returns the choice to its parent. A few explicit settled statements in the active interaction are sufficient to define the profile.

Keep the decision in the active interaction by default. Persist it only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not invent a decision log, memory store, hidden state, or other process artifact.

Once settled, preserve the decision's boundary. Reopen it only when new evidence creates another material choice.
