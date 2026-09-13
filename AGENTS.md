# Repository instructions

This repository packages repository-agnostic engineering skills and focused delegation roles for Claude Code and Pi.

Keep ownership explicit: [`skills/*/SKILL.md`](skills) define generic methods. [`templates/reviewers`](templates/reviewers) own reviewer composition, boundaries, and specialist content; the generator reuses the reviewing skill's generic method. The reviewer files in [`agents`](agents) are committed generated outputs; other agent files remain handwritten role sources. [`package.json`](package.json) exposes ready-to-use skills and agents to each harness, [`README.md`](README.md) explains use and regeneration, and [`tests`](tests) protect package contracts. Tests cover machine-consumed configuration and executable behavior; review instruction meaning directly rather than locking its phrasing into assertions. Role and delegated-brief boundaries outrank any loaded skill; skills provide method only within those boundaries.

Keep the cross-harness design thin. Build-time composition may produce committed, self-contained agent files; installation and execution in Pi and Claude Code must not require generation or a build step. Edit the owning sources and regenerate rather than editing generated agents. Do not add runtime instruction machinery, persistence, memory, scheduling, orchestration, or harness adapters. Development dependencies use `"*"` so published sources stay current. Add no version pins and commit no lockfile.

Run `npm install`, `npm run check`, and `npm pack --dry-run`. Follow the linked canonical files instead of duplicating their procedures here.
