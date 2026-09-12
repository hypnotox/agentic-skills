---
name: agentic-brainstorming
description: Resolve a material choice about outcome, scope, compatibility, safety, user-visible behavior, or system direction, including when a prescribed mechanism rests on an unsupported material premise.
---

# Agentic brainstorming

Use this skill only when a material choice remains about outcome, scope, compatibility, safety, user-visible behavior, or system direction, including when a proposed mechanism rests on an unsupported premise that materially affects the solution. A mechanism is not settled merely because the agent, user, plan, or current implementation proposed it; challenge the premise within the active task boundary. Code design owns internal structure for agreed behavior, including user steering on consequential structural choices; implementation owns local choices within settled boundaries. Do not route every design discussion here or turn routine choices into approval gates.

Safety, permissions, harness constraints, the active task, and applicable repository instructions remain authoritative. Repository instructions may specialize this guidance without expanding scope or permission.

## Resolve the choice

1. State the intended outcome, settled constraints, affected boundary, and evidence needed separately from proposed mechanisms.
2. Separate settled facts from assumptions and unknowns; do not promote an assumption or unknown into a requirement. Test a checkable consequential premise through `agentic-context`, while keeping genuine choices here.
3. Present only evidence-supported viable options with proportionate trade-offs, risks, reversibility, and compatibility effects. One option is enough when only one is supported; do not manufacture alternatives for balance.
4. Recommend the simplest effective option. Possibility alone is not evidence of need, and an evidenced concern receives the smallest adequate response. If the evidence cannot distinguish the options responsibly, report the choice as unresolved, name the missing discriminating evidence, and propose a bounded investigation.
5. Confirm a supported direction before dependent work, unless the user explicitly delegated the decision and proceeding remains within granted authority. Do not force a choice while it remains unresolved.

Surface only concerns grounded in the current task, system, contract, or observed behavior that would materially affect the solution; omit merely conceivable concerns instead of asking about them. Follow the project's established security requirements and trust assumptions. Without stricter requirements, implementing the agreed behavior is sufficient. Do not add safeguards for hypothetical risks. If a concrete risk would require expanding the agreed scope, resolve that choice under the decision authority above before dependent work. A delegated agent returns the choice to its parent.

Keep the decision in the active interaction by default. Persist it only when the user asks or applicable repository instructions require it and the task authorizes that write. Do not invent a decision log, memory store, hidden state, or other process artifact.

Once settled, preserve the decision's boundary. Reopen it only when new evidence creates another material choice.
