---
name: agentic-debugging
description: Investigate unexpected behavior when the cause is unknown, establish a root cause, and protect the fix with a regression oracle.
---

# Agentic debugging

Use this skill when observed behavior differs from expected behavior and the cause is not already established. Do not use it for a known mechanical fix.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Investigation

1. State observed and expected behavior with reproducible evidence.
2. Minimize the reproduction without discarding relevant conditions.
3. Form a specific, falsifiable hypothesis.
4. Run the narrowest experiment that distinguishes it from plausible alternatives.
5. Refute, refine, and retest until evidence identifies the root cause rather than only a symptom.
6. Check adjacent paths that could share the cause.

Preserve evidence from the unfixed behavior. Do not change expected output merely to accommodate a defect.

## Regression oracle and handoff

Before changing production behavior, establish the strongest practical regression oracle. Prefer a deterministic automated test that fails before the fix and passes afterward. When that is impractical, explain why and use the strongest reproducible alternative.

Adding the oracle may be the first mutation when authorized. Route the actual fix through `agentic-implementing`. If root-cause work uncovers a material design choice, use `agentic-brainstorming` first.
