# CLAUDE.md

Agent guidance for working in this repo. See INTENT.md and SPEC.md for full detail; this file is a fast orientation layer.

## Purpose

AIDR (AI Decision Records) is a single-file markdown format for recording consequential decisions made with AI agents: the question, each agent's independent position, objections, and the human arbitration that resolved them. No runtime, no service, no protocol — copy a template, fill it in. Canonical URL: https://aidr.work/

## Tech stack

- Zero-dependency Node.js (>=20) tooling — no `package.json`, no npm install, no build step.
- Plain markdown with YAML frontmatter as the data format (records, spec, docs).
- Static site in `docs/` (Jekyll via GitHub Pages, `docs/_config.yml`) for the canonical landing page.
- CI: GitHub Actions (`.github/workflows/ci.yml`), Node 20, runs lint + conformance suite on PRs and pushes to `main`.

## Directory layout

- `SPEC.md` — normative format specification (ratified v0.1.0).
- `templates/AIDR-0000-template.md` — copy-and-fill template for new records.
- `decisions/` — real, tracked AIDR records for this repo's own decisions (AIDR-0002 onward).
- `examples/` — worked examples not treated as this repo's own governance records (AIDR-0001).
- `tools/aidr-lint.mjs`, `tools/aidr-assemble.mjs` — reference linter and position-file assembler, both zero-dependency; shared parser core in `tools/lib/aidr-core.mjs`.
- `tests/` — conformance suite (`tests/run.mjs`, `tests/assemble.test.mjs`, `tests/fixtures/`) pinning the linter to `SPEC.md`.
- `skills/aidr/` — canonical home for the agent-agnostic AIDR Claude Skill (SKILL.md, MANIFEST.yaml, CHANGELOG.md); teaches an agent to open a record, position, object, assemble, lint, and request arbitration — it never authors arbitration itself.
- `docs/` — the aidr.work static site (landing page, `why.html`, `llms.txt`/`llms-full.txt`, `.well-known/assistant-guide.txt`).
- `RECIPES.md` — runner-agnostic position-sweep recipe (fan a brief to N providers, assemble, lint-gate).
- `INTENT.md` — roadmap, design rules, open decisions, exceptions to repo standards, changelog of intent itself.
- `WHY.md`, `PRIOR_ART.md`, `CONFORMANCE.md` — supporting rationale and claim-definition docs.
- `working-session/`, `handoffs/` — private session scratch, gitignored, not part of the shipped artifact.

## Conventions

- One decision, one file. Filenames and frontmatter `id` must match (`AIDR-000N-slug.md`).
- Positions are recorded independently, before arbitration; objections are never deleted (append-only history).
- Only a human may write the Arbitration section and resolve dissent — this is a hard design invariant, repeated across README, INTENT.md, and the skill.
- Records carry three checkable conformance claims: `independent-positions`, `dissent-preserved`, `human-arbitrated`.
- Vendor neutrality: no field names a specific provider as required.
- New decisions go in `decisions/`, numbered sequentially from the current highest (`AIDR-0004` is the latest as of this assessment).

## Build / verify (from docs — not executed by this assessment)

```bash
make check          # = lint + test
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/
node tests/run.mjs
```

CI runs the same two steps on Node 20 for every PR and push to `main`.

## Current state (as of 2026-07-12 assessment)

- Branch `main`, clean working tree, in sync with `origin/main` (0 ahead / 0 behind).
- Last commit 2026-07-09; four decisions arbitrated (AIDR-0001–0004), all closed, no open Maintainer decisions in INTENT.md.
- Spec at v0.1.0 (ratified), repo release at v0.2.0 with unreleased changes queued in CHANGELOG.md (AIDR-0003 port, RECIPES.md Ringer-swarm worked example).
- Health: actively maintained, docs and decision records unusually well cross-referenced and internally consistent.
