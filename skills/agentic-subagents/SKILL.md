---
name: agentic-subagents
description: Choose model capability and thinking settings before an optional subagent launch, within available controls and user preferences.
---

# Agentic subagents

If subagents are available and you choose to delegate, use this guidance for the model and thinking settings you can control. Without subagents, work directly. Role boundaries, permissions, harness constraints, and user preferences remain authoritative. This skill does not authorize delegation or persistent configuration changes. Retain environment-supplied settings where selection is unavailable, without claiming control over them.

## Assess the contribution

Assess the assigned contribution, not the surrounding project:

- **Complexity:** Interpretation, ambiguity, and judgment required.
- **Scope:** Interacting concerns that must be understood together, rather than file count.
- **Impact:** Consequences of error, downstream reliance, correction cost, and how readily verification would catch mistakes.

Gathering references for a consequential decision usually needs less capability than making that decision.

## Choose supported settings

Before passing a model override, inspect the models currently exposed by the active harness through its supported discovery mechanism. Select from that observed set and use an identifier reported by the harness. Do not infer model identifiers from memory, examples, provider rankings, or another environment. If availability cannot be established, do not guess; retain the environment-supplied model and report that explicit selection was unavailable.

From the verified available options, use established user preferences and match capability to the contribution's demands. Use progressively more capable models for greater reasoning demands; reserve exceptional-reasoning options for a concrete need beyond normal high-complexity work.

Choose thinking separately from model capability. Before passing a thinking override, inspect which levels the active harness reports as supported for the selected model and provider. Do not assume every level exists; when support cannot be established, do not guess or override. Treat **low**, **medium**, **high**, and **xhigh** as a relative scale where available: low suits trivial, fully specified and directly checkable work; medium is the normal starting point; high suits deeper reasoning, interacting concerns, or consequential judgment; and xhigh suits exceptional deliberation demands. Select an appropriate supported point on that scale. Additional deliberation is not automatically a substitute for a more capable model.
