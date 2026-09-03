---
name: agentic-context
description: Orient to a task from relevant evidence, investigate a bounded unknown, or challenge a consequential premise before choosing a route.
---

# Agentic context

Use this skill when the next action depends on understanding the task, its environment, or a questionable assumption. It is read-oriented and does not authorize mutation.

Safety rules, permissions, harness instructions, the user request, and applicable repository instructions remain authoritative. Repository instructions may specialize this default.

## Orient

Before substantial fresh work, takeover, or widened scope:

1. Restate the requested outcome and identify uncertainty that affects the route.
2. Read applicable repository instructions and inspect relevant status, source, tests, documentation, and dependency contracts.
3. Distinguish facts supported by evidence from assumptions.
4. State constraints, source boundaries, and unresolved questions.

Prefer an exact known-source read over broad exploration.

## Explore

When a separate fresh-context investigation would help, optionally delegate one bounded question to `agentic-explorer`. Supply the question, evidence boundary, allowed source types, and desired level of detail. Delegation is optional; perform the same bounded investigation directly when it is unavailable.

Return the answer first, followed by evidence, the boundary searched, and uncertainty. Do not silently widen the task.

## Challenge

For a broad, unfamiliar, weakly supported, or high-consequence premise, try to falsify it. Optionally delegate the challenge to `agentic-premise-checker`. Report **supported**, **revise**, or **unresolved**, with consequence-ordered evidence. Lack of counterevidence is not proof.

A challenge informs the route; it is not approval to implement.
