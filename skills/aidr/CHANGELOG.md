---
skill_bundle: aidr
file_role: handoff
version: 1
version_date: 2026-07-05
previous_version: null
change_summary: >
  Initial versioned release. Skill Provenance bootstrapped for a bundle
  that already existed and had been dogfooded once (AIDR-0004) before
  provenance tracking was added.
---

# Changelog

## v1.0.0 -- 2026-07-05

- Initial versioned release. `SKILL.md` (v1) inventoried and hashed;
  no prior versions existed to record.
- Bundle originally landed the same day (commit `3da9db1`) at
  `skill/aidr/` (singular). Renamed to the canonical `skills/aidr/`
  (plural) later the same day during a repo-standards gap audit; the
  rename corrects a naming choice made on a factual error (the
  rationale recorded in AIDR-0004's Position prose — that `skills` was
  a gitignored path in this repo — turned out to be false; the
  `.gitignore` never contained such a pattern). The arbitrated decision
  itself (this repo is the skill's canonical home) is unaffected.
- `frontmatter_mode: minimal` chosen over the richer `metadata` block:
  the skill is explicitly designed to be read by non-Claude harnesses
  (Codex and others, per AIDR-0004's "no per-agent fork" resolution),
  so `SKILL.md`'s frontmatter stays name + description only, and this
  manifest is the sole version record.
