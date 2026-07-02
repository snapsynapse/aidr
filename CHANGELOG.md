# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
