# Repository instructions

This repository packages repository-agnostic engineering skills and focused delegation roles for Claude Code and Pi.

Keep ownership explicit: [`skills/*/SKILL.md`](skills) define generic methods, [`agents/*.md`](agents) define role behavior, [`package.json`](package.json) exposes those canonical files to each harness, [`README.md`](README.md) explains use, and [`tests`](tests) protect package contracts. Tests cover machine-consumed configuration and executable behavior; review instruction meaning directly rather than locking its phrasing into assertions. Role and delegated-brief boundaries outrank any loaded skill; skills provide method only within those boundaries.

Keep the cross-harness design thin. Do not add persistence, memory, scheduling, orchestration, adapters, or generated instruction machinery. Development dependencies use `"*"` so published sources stay current. Add no version pins and commit no lockfile.

Run `npm install`, `npm run check`, and `npm pack --dry-run`. Follow the linked canonical files instead of duplicating their procedures here.
