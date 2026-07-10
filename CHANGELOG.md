# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- `decisions/AIDR-0003`: the arbitrated Split Decision record, landed from its launch-gated branch now that Ringer is public. The record documents the decision that produced the position-sweep recipe: ship it as AIDR's first delivery surface, Ringer as the first worked example, never as an upstream Ringer feature. Both gate conditions (Ringer's public launch, maintainer signal) are met.

## [0.2.0] - 2026-07-05

Repo release only: SPEC.md is unchanged and stays at spec v0.1.0 (no normative changes; spec version moves only by ratification record). This release ships the tooling, docs, and site work accumulated since launch.

### Added

- `tools/aidr-assemble.mjs`: zero-dependency tool merging independent position files into one open record, plus `tests/assemble.test.mjs` wired into the conformance suite (landed 2026-07-03, previously unlisted here)
- `tools/lib/aidr-core.mjs`: shared zero-dependency parser/linter core for `aidr-lint`, `aidr-assemble`, and future delivery surfaces
- RECIPES.md: runner-agnostic position-sweep recipe: fan a decision brief to N providers, merge with `aidr-assemble`, gate on `aidr-lint`'s `independent-positions` claim
- README: Documents table now lists `tools/aidr-assemble.mjs` and RECIPES.md
- `skills/aidr/SKILL.md`: agent-agnostic skill teaching the AIDR mechanics (open, position, objection, assemble, lint, request arbitration; never authors arbitration), canonical home per AIDR-0004
- `skills/aidr/MANIFEST.yaml`, `skills/aidr/CHANGELOG.md`: Skill Provenance adoption for the bundle (repo is its canonical home, matching the `hardguard25`/`siteline` precedent — no `PROJECT_CONTEXT.md` in the bundle itself; that file is a consumer-side artifact)
- `decisions/AIDR-0004-aidr-skill-distribution-home.md`: real arbitrated record deciding the skill's distribution home
- WHY.md (repo root, YAML frontmatter): why AIDR refuses model-synthesized verdicts, with HTML representation at `docs/why.html` (aidr.work/why.html); linked from README, `docs/llms.txt`, sitemap, and the landing-page footer

### Changed

- Canonical page (`docs/index.html`): byline updated-date and version brought current (v0.2.0, footer also names spec v0.1.0 separately), and first on-page GuideCheck reference added (footer links the Level 2 `assistant-guide.txt`); `CITATION.cff` and `docs/sitemap.xml` propagated per RELEASE_CHECKLIST.md
- `tools/aidr-lint.mjs` and `tools/aidr-assemble.mjs` now reuse the shared core while preserving CLI behavior
- Repo-polish refresh: CONFORMANCE.md report brought current (AIDR-0004 fixture row), `docs/llms-full.txt` gained the position-sweep recipe, agent skill, and why-not-synthesis sections, README Documents table lists the skill
- Repo-standards gap audit: renamed the skill bundle `skill/aidr/` to canonical `skills/aidr/` and adopted Skill Provenance for it (`MANIFEST.yaml`, `CHANGELOG.md`); resynced the `assistant-guide.txt` root/`.well-known` pair to byte-identical; corrected a stale INTENT.md exception; ran skill-a11y-audit against `docs/why.html` (0 violations, 29 passes) since it had never been through the gate that `docs/index.html` cleared at launch

### Security

- `tools/lib/aidr-core.mjs`: `sectionBody`/`parseSubsections` now escape their `heading`/`label` argument before interpolating it into a `RegExp` constructor. Both call sites in this codebase have only ever passed hardcoded literals, so this was not exploitable today, but an unescaped interpolation is a regex-injection ReDoS class (verified: a constructed 30-character adversarial value took 14 seconds against the unescaped code; the fixed version handles 1000 characters in under 1ms). Closes the class regardless of future callers.
- `tools/aidr-assemble.mjs`: the emitted record's `title` frontmatter value is now quoted when (and only when) the plain form would be YAML-type-ambiguous under a real YAML parser (e.g. a title of `null`, `true`, or `2026`); ordinary titles remain unquoted, matching every existing shipped record's style.
- First `/security-audit` pass against this repo (2026-07-05): otherwise clean — no dependencies to begin with, no secrets in the repo or its git history, CI workflow already scoped to `permissions: contents: read` with the safe `pull_request` (not `pull_request_target`) trigger, no path traversal, no command injection, no executable JavaScript on the static site.

## [0.1.0] - 2026-07-02

First public release. Specification ratified and recorded in [AIDR-0002](decisions/AIDR-0002-ratify-spec-v0.1.0.md): independent positions from Claude (Anthropic), Codex (OpenAI), and Gemini (Google), arbitrated by the Maintainer. `SPEC.md` frontmatter is `status: ratified`; section names, frontmatter keys, and claim names are frozen API per CONTRIBUTING.md. This release also carries every surface that supports the ratified format — reference tooling, conformance suite, hosted page, and repo-standards adoption.

### Added

- SPEC.md: AIDR format specification, ratified at v0.1.0
- Template: copy-and-fill AIDR record (templates/AIDR-0000-template.md)
- Reference linter: zero-dependency conformance checker (tools/aidr-lint.mjs)
- Conformance suite (tests/run.mjs, tests/fixtures/): zero-dependency negative and positive fixtures pinning the reference linter to SPEC.md; one invalid fixture per linter error branch plus valid records with asserted claim sets
- GitHub Actions CI for shipped-record linting and the conformance suite
- `Makefile` convenience targets: `make lint`, `make test`, and `make check`
- First AIDR record: the decision to spin AIDR out from Turnfile (examples/AIDR-0001), arbitrated 2026-07-02
- First multi-model record: SPEC ratification (decisions/AIDR-0002), three independent provider positions, arbitrated 2026-07-02
- PRIOR_ART.md: survey of adjacent formats (ADR, MADR, AgDR, FINOS AIR)
- CONTRIBUTING.md, SECURITY.md, CONFORMANCE.md, RELEASE_CHECKLIST.md
- Public-readiness metadata: CODE_OF_CONDUCT.md, SUPPORT.md, CITATION.cff, .editorconfig
- Dual license: Apache-2.0 for code, CC BY 4.0 for specification and documentation text
- Canonical landing page (docs/index.html) plus favicon, CNAME, sitemap.xml, robots.txt, llms.txt, llms-full.txt, site.webmanifest, 404.html, and the Gemini OpenGraph image prompt (docs/og-image-prompt.md)
- OpenGraph image at imgs/og.png and docs/imgs/og.png, wired into landing-page OG/Twitter metadata
- assistant-guide.txt (repo root and docs/.well-known/, byte-identical): GuideCheck Level 2 conformant install guide for AI agents
- INTENT.md following the 9-section repo-standards template, including an Exceptions to Repo Standards section

### Changed

- Documented that the reference linter checks structural prerequisites, while semantic arbitration review remains a human responsibility
- LICENSE scope footer corrected (specification prose had been misattributed to "the Turnfile protocol")
- Ignored local agent/session coordination directories that should not be published as repository content
