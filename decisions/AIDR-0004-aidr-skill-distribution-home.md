---
id: AIDR-0004
title: Distribution home for the AIDR Claude Skill
status: arbitrated
date: 2026-07-05
decided: 2026-07-05
arbiter: Sam Rogers
tags: [skill, distribution, phase-1]
---
# AIDR-0004: Distribution home for the AIDR Claude Skill

## Context

T1.9 delivered a Claude Skill teaching agents the AIDR mechanics (open, position, objection, assemble, lint, request arbitration; never author arbitration). It currently lives at `.claude/skills/aidr/SKILL.md` in this repo, which works for local sessions but cannot ship: this repo's `.gitignore` excludes both `.claude/` and any `skills` path, so the file is invisible to adopters and to other machines. T1.9 acceptance requires the skill installed in at least one PAICE repo and exercised on a real record; the five-surface plan names two candidate homes. The skill consumes only the tracked template and linter, so any home works technically.

## Question

Where is the canonical, distributable home for the AIDR skill: a tracked directory in this repo (requires a gitignore exception), the portfolio skills monorepo at `~/Git/skills/aidr/`, or local-only installs per repo?

## Positions

### Position: fable5

- agent: fable5
- model: claude-fable-5
- provider: Anthropic
- stance: recommend
- summary: Track it in this repo under a new `skill/` directory (singular, avoiding the gitignored `skills` pattern), with the monorepo carrying a copy only if portfolio tooling needs it.

The skill is a delivery surface of the AIDR format, like the linter and assemble tool: it should version with the spec it teaches. If SPEC.md gains an optional field, the skill and spec change in one commit, one review. External adopters find it where they find everything else, and `aidr.work` can link it. The monorepo alternative splits provenance: skill drift against the spec becomes possible and invisible to this repo's conformance suite (which could otherwise lint the skill's embedded examples). Local-only installs fail the adoption goal outright since nothing ships. Cost of my recommendation is one deliberate gitignore exception and a small naming dodge (`skill/` or a tracked `.claude/skills/` carve-out); both are one-line changes. Naming note: `skill/aidr/SKILL.md` keeps Claude Code discoverability if symlinked or copied into `.claude/skills/` locally, and the repo README can state the one-copy install step. This position was written without reading any other participant's position.

## Objections

## Arbitration

- decided_by: Sam Rogers
- date: 2026-07-05
- decision: Track the skill in this repo as the canonical home; the skills monorepo links back to it (symlink direction reversed from the recommendation's optional copy), and other agents consume the same skill file rather than maintaining their own.

Transcribed by fable5 at Maintainer direction from Sam's decision in the working session of 2026-07-05; the wording of the decision line paraphrases his dictated instruction and he directed the transcription. No objections were filed on this record. A second independent position was requested from a second provider, but that agent declared itself contaminated (it had read this record before seeing the request) and the arbitration arrived first; the record therefore carries a single position, recorded before arbitration.

## Evidence

- [Five-surface plan T1.9](../handoffs/2026-07-01-five-surface-execution-plan.md) names `.claude/skills/aidr/` or `~/Git/skills/aidr/` as candidate homes and sets the acceptance test.
- `.gitignore` lines `\.claude/` and `skills` are what block the current location from shipping.
