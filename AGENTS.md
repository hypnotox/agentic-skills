# Repository instructions

This repository packages repository-agnostic engineering skills and focused delegation roles for Claude Code and Pi.

Keep ownership explicit: [`skills/*/SKILL.md`](skills) define generic methods, [`agents/*.md`](agents) define role behavior, [`extensions/pi-subagents/index.ts`](extensions/pi-subagents/index.ts) bridges those roles into Pi, [`README.md`](README.md) explains use, and [`tests`](tests) protect package and behavioral contracts. Role and delegated-brief boundaries outrank any loaded skill; skills provide method only within those boundaries.

Keep the cross-harness design thin. Do not add persistence, memory, scheduling, orchestration, or generated instruction machinery. Ordinary development dependencies track latest with `"*"`; keep the `pi-tools` main-branch tarball, add no version pins, and commit no lockfile.

Run `npm install`, `npm run check`, and `npm pack --dry-run`. Follow the linked canonical files instead of duplicating their procedures here.
