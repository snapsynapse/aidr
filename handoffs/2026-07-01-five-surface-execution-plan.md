---
title: "AIDR Five-Surface Execution Plan"
version: "1.0.0"
date: 2026-07-01
status: active-handoff
description: "Self-contained execution handoff for the AIDR delivery-surface roadmap. Written for Opus/Sonnet-level agents; no prior conversation context required."
tags: [aidr, handoff, execution-plan, roadmap]
---
# AIDR five-surface execution plan

Audience: any capable coding agent (Claude Opus/Sonnet class or equivalent) executing with Sam Rogers as Maintainer. This document is self-contained. Do not rely on prior chat context.

## Orientation

AIDR (AI Decision Records) is a one-file markdown format for recording consequential decisions made with AI agents: the question, each agent's independent position, objections, and human arbitration. It is the minimal single-artifact expression of the Turnfile protocol (https://turnfile.work/), created 2026-07-01 as a standalone repo (not a fork) to maximize adoption via the ADR playbook: one template, zero required tooling.

Read order before doing anything: `README.md`, then `SPEC.md`, then `INTENT.md`, then `PRIOR_ART.md`, then `examples/AIDR-0001-spin-out-aidr-from-turnfile.md`.

Validation command (must pass after every change to spec, template, or examples):
```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md
```

## Ground rules (violating any of these is a failed task)

1. One decision, one file. Never add session state, task tracking, or transcripts to the format.
2. The linter stays zero-dependency. The format stays adoptable with no tooling at all.
3. Dissent is never deleted. Records are superseded, not rewritten.
4. Arbitration is human. No agent (including you) may author or edit an Arbitration section or fill `decided`/`decided_by` fields. You may transcribe text Sam explicitly dictates, and must say so in the record.
5. Vendor-neutral: no field, tool, or example may require a specific model provider.
6. Spec changes require Maintainer ratification. Delivery surfaces (phases 2 to 5) must consume the format as-is; if a surface seems to need a format change, stop and escalate.
7. SPEC.md section names, frontmatter keys, and claim names are frozen API once v0.1.0 is ratified. Additive optional fields only, via Maintainer decision.

## Stop-and-ask triggers (Maintainer decisions, never yours)

- Anything published or posted outside the local machine: GitHub repo creation, pushes, issues on external repos, domain purchases, landing page go-live.
- The project name (working name "AI Decision Records (AIDR)") and domain choice. Verified available 2026-07-01: aidr.work, aidecisionrecords.com, decisionrecord.ai. Unverified: aidr.dev. Known out-of-domain collision: AIDR = AI for Disaster Response (QCRI), judged non-blocking.
- Any change to SPEC.md normative text.
- Arbitration of any AIDR record.
When asking Sam for a decision, always include the clickable markdown link to the file needing action.

## State snapshot (2026-07-01)

- Repo at `~/Git/aidr`, branch `main`, initial commit made, no remote, not pushed.
- Contents: SPEC.md v0.1.0-draft, README.md, INTENT.md, PRIOR_ART.md, template, example AIDR-0001 (status open, one position, awaiting Sam's arbitration), zero-dep linter, Apache-2.0 + CC BY 4.0 licenses, this handoff.
- Lint status: all green. Template earns all three claims; AIDR-0001 correctly earns none yet (single position, open).
- Portfolio manifest `~/Git/portfolio.yaml` carries an `aidr` component entry marked incubating.
- Turnfile is untouched and NOT deprecated: it is the advanced profile. Its INTENT.md should record the AIDR relationship only after Sam arbitrates AIDR-0001, and that edit goes through Turnfile's own governance (Maintainer-gated, multi-agent repo).

## Phase gates (summary)

| Phase | Surface | Gate to enter |
|---|---|---|
| 1 | Format + spec page | Started (this repo) |
| 2 | MCP server | Spec ratified; format stable one release cycle; dogfooded in 2+ PAICE repos |
| 3 | GitHub Action | MCP server proves write path; 1+ external adopter of the format |
| 4 | Second-opinion SDK | Extracted from phase 3 fan-out once it works; not built standalone |
| 5 | CI governance gate | Surfaces 1 to 3 producing records in the wild |

Gates are decision triggers, not dates. Any surface can be dropped if its gate never fires. Do not start a phase before its gate; do not skip a gate without a recorded Maintainer decision (record it as an AIDR in `decisions/`).

## Phase 1: format, ratification, public surface

### T1.1 Sam arbitrates AIDR-0001 — DONE 2026-07-02

- Accepted as drafted; Arbitration section transcribed at Maintainer direction; `human-arbitrated` claim earned.

### T1.2 First multi-model record: AIDR-0002, spec ratification (recommended next)

- AIDR-0001 was arbitrated with a single position, which is honest and final (positions recorded after arbitration cannot earn `independent-positions`). The demo moment moves to the next real decision: ratifying SPEC.md v0.1.0.
- Open `decisions/AIDR-0002-ratify-spec-v0.1.0.md` in this repo. Gather independent positions from Claude (Anthropic), Codex (OpenAI), and Gemini (Google) BEFORE Sam arbitrates.
- Two routes: (a) a normal Turnfile session in `~/Git/turnfile` with this question as a lane — note the Claude lane is model-agnostic and already validated on Fable 5 (Turnfile session 14), so no new onboarding is needed; or (b) lightweight direct prompting of each agent in its own tool, pasting positions in. Route (a) also produces cross-protocol dogfood evidence; prefer it if session overhead is acceptable.
- Acceptance: AIDR-0002 lint-passes with `independent-positions`, then Sam arbitrates (T1.8 executes the ratification mechanics).

### T1.3 Name and domain — DONE 2026-07-02

- Name confirmed: AI Decision Records (AIDR). Domain purchased: aidr.work. Canonical URL https://aidr.work/ propagated to README, INTENT, portfolio.yaml.

### T1.4 GitHub repo + push — DONE 2026-07-02 (private)

- Created `snapsynapse/aidr` as PRIVATE at Maintainer direction; public flip is a pending Maintainer decision (see INTENT open decisions). Description + topics set.
- Remaining when public flip happens: confirm README renders, re-check portfolio.yaml `status: incubating` removal with Sam.

### T1.5 AgDR interop issue (contribute-over-compete; post only after Sam approves)

Post to https://github.com/me2resh/agent-decision-record/issues after Sam reviews this draft:

> Title: Interop proposal: AgDR + AIDR (multi-agent decision records with human arbitration)
>
> Hi! I maintain AIDR (AI Decision Records), a decision-record format distilled from the Turnfile multi-agent governance protocol. AgDR is the closest prior art we found, and we think the two are complementary rather than overlapping: AgDR documents decisions an AI coding agent makes during development; AIDR covers decisions where multiple independent agents (ideally different providers) record positions, objections are preserved, and a human signs the arbitration.
>
> Proposal: (1) cross-link the two projects in each README with a one-line "when to use which"; (2) keep frontmatter keys compatible where they overlap (id, title, status, date) so tooling can index both; (3) an AgDR record may link out to an AIDR when a decision escalated to multi-agent review. Happy to send PRs for any of these if welcome. AIDR credits AgDR in its spec and prior-art survey.

- Acceptance: issue posted, URL recorded in PRIOR_ART.md under the AgDR row.

### T1.6 Repo polish + canonical spec page — DONE 2026-07-02, live at aidr.work

- Ran `repo-polish` then `canonical-spec-page` (in that order) against `~/Git/aidr`. CHANGELOG.md, CONTRIBUTING.md, SECURITY.md, CONFORMANCE.md, `.github/` templates added. `docs/index.html` built: SEO meta, JSON-LD (TechArticle + DefinedTerm), OG/Twitter meta (no `og:image`, no source image exists yet), light theme, amber accent, convergence-mark logo, skill-a11y-audit WCAG 2.1 AA pass (0 violations). robots.txt with AI-crawler allows, llms.txt, sitemap.xml, 404.html, site.webmanifest, favicon.svg all committed under `docs/`.
- Also adopted GuideCheck Level 2: `assistant-guide.txt` at repo root and `docs/.well-known/` (byte-identical), referenced from `docs/llms.txt`, README, and `docs/index.html` head + footer.
- Maintainer enabled GitHub Pages on the private repo and it went live same day. Post-deploy verification found and fixed two gaps: `https_enforced` was off (`gh api --method PUT repos/snapsynapse/aidr/pages -F https_enforced=true`, HTTP now 301s to HTTPS as expected), and `docs/.well-known/assistant-guide.txt` 404'd in production even with `.nojekyll` present (a known GitHub Pages quirk, not just Jekyll's normal dot-path exclusion: a fresh MISS from origin still 404'd after a build that included `.nojekyll`). Fix: drop `.nojekyll`, add `docs/_config.yml` with `include: [".well-known"]`, let Jekyll run. Safe here because none of this site's files carry YAML front matter, so Jekyll treats them all as static passthrough regardless; confirmed by re-checking every path (`/`, `robots.txt`, `llms.txt`, `sitemap.xml`, `favicon.svg`, `site.webmanifest`, the custom `404.html`) after the fix, all unchanged. `assistant-guide.txt` now serves at the canonical `.well-known` path with a SHA-256 matching the local file exactly.
- `/imgs/og.png` still does not exist; produce one and re-run canonical-spec-page's C3/C3b steps to wire it back in.
- Acceptance: met. GitHub Pages serves the landing page at aidr.work; skill checklists pass. Repo itself remains private, that's a separate open Maintainer decision (see INTENT.md "Open decisions").
- Portfolio note: any other repo using the `docs/` + `docs/.well-known/` pattern on GitHub's legacy Jekyll build type may have the same silent `.well-known` 404 even with `.nojekyll` present. Worth a live check on repos with this pair (see LocalBrain `0_Across/Repo Standards.md` drift register).

### T1.9 Claude Skill (parallel track, not gated)

- A `.claude/skills/aidr/SKILL.md` bundle (or a home in the portfolio skills monorepo, `~/Git/skills/aidr/`) teaching an agent to open a record from the template, record a position with correct metadata, file an objection, check lint status, and request arbitration, never author it (ground rule 4). Consumes only the existing template and `tools/aidr-lint.mjs`; no new dependency, no format change, so ground rule 6 is a non-issue.
- Cheaper than phase 2's MCP server: no SDK, no server process, works in any skill-compatible harness today. Can ship any time after the template and linter are stable; not gated like phases 2-5.
- Real use of the skill in a live session counts as dogfooding evidence toward phase 2's "dogfooded in at least two PAICE repos" gate.
- Acceptance: skill installed in at least one PAICE repo's `.claude/skills/`, exercised end to end on one real (not synthetic) AIDR record.

### T1.7 Dogfood in two PAICE repos (phase 2 gate evidence)

- Author real AIDRs for live decisions. Candidate venues: a `decisions/` dir in `paice-foundation` (portfolio-level bets fit AIDR well) and one product repo (e.g. a PAICE2 architecture call or a tokenese scope decision).
- Each record must be a real decision Sam actually arbitrates, not a synthetic demo.
- Acceptance: 2+ arbitrated records in other repos, lint-passing, at least one carrying `independent-positions`.

### T1.8 Ratify and tag v0.1.0

- After T1.1 and any spec feedback: Sam ratifies SPEC.md; flip its `status: draft` to `status: ratified`; add CHANGELOG.md; tag `v0.1.0`; `gh release create`.
- Acceptance: tagged release with spec, template, linter; lint green in a fresh clone.

## Phase 2: MCP server

Goal: agents in any MCP host (Claude Code, Codex, Cursor, Windsurf, ADK hosts) read and write conforming AIDR files through tools instead of reading the spec. Kills per-agent skill-bundle drift.

Location: `mcp/` inside this repo (same component, second surface; split out only if it grows). Node + `@modelcontextprotocol/sdk`, stdio transport.

Tools (all writes MUST pass `tools/aidr-lint.mjs` logic before saving; reuse its functions by extracting them into `tools/lib/` first):
- `aidr_open`: args title, question, context, arbiter, dir (default `decisions/`). Creates next-numbered file from template, status open. Returns id + path.
- `aidr_record_position`: args id, agent, model, provider, stance, summary, prose. Appends a Position subsection. MUST refuse if status is not open. MUST refuse a second position for the same agent label.
- `aidr_file_objection`: args id, agent, target, prose. Appends an Objection subsection. MUST refuse if status is not open.
- `aidr_status`: args id or dir. Returns frontmatter, position/objection counts, earned claims, lint result.
- `aidr_check_open_dissent`: args dir. Lists open records with unaddressed oppose/alternative stances or objections; intended for session-start hygiene.
- `aidr_request_arbitration`: args id. Marks nothing; returns a formatted summary for the human arbiter with a link to the file. There is intentionally NO tool that writes the Arbitration section (ground rule 4). The human edits the file directly.

Tests: `node --test` fixtures covering every refusal path and a full open-to-arbitrated lifecycle (arbitration step simulated by direct file edit, as a human would).

Acceptance: all tools emit lint-PASS files; refusal paths tested; README section documents host setup for Claude Code and one non-Anthropic host; dogfooded in one real session.

## Phase 3: GitHub Action (the reach play)

Goal: on a PR, N heterogeneous models independently review the same diff; their positions and disagreements are posted as one PR comment; on merge, the decision is written back as an AIDR file. No mainstream tool does heterogeneous-family disagreement surfacing as of mid-2026 (see PRIOR_ART.md); this is the differentiator. Positions only: the Action MUST never approve, request changes, merge, or push code.

Shape: JavaScript action (node20), inputs:
- `models`: list like `anthropic:claude-sonnet-5,openai:gpt-5,google:gemini-3-pro` (2+ providers required for the independent-positions claim).
- API keys via repo secrets, one per provider; skip a provider gracefully if its key is absent, and say so in the comment.
- `paths`: optional filter; `max-diff-kb`: cost cap, default conservative; oversize diffs get a summary-only prompt.
Flow: collect diff and PR description; prompt each model in isolation (no model sees another's output; same prompt template, provider-specific client); each returns stance, summary, prose, objections in a JSON shape mirroring SPEC.md section 5.3; render one comment: positions table, then a Disagreements section listing concrete conflicts; write `decisions/AIDR-NNNN-pr-<num>.md` (status open) into the PR branch or as an artifact, per an input flag. Human merge + a follow-up `arbitrated` edit completes the record.
Acceptance: green run on a real PR in an aidr-family repo with 2+ providers; comment readable; emitted file lint-passes; runaway-cost test (large diff) stays under cap.

## Phase 4: second-opinion SDK (extraction, not construction)

Extract the phase 3 fan-out core into a package (working name `@paice/aidr`): `gatherPositions({question, context, participants}) -> record object`, `renderAidr(record) -> markdown`, `writeAidr(record, dir)`. Positions only, never execution. Publish only when a second consumer beyond the Action exists (the MCP server or an external adopter). Acceptance: Action depends on the package with no behavior change.

## Phase 5: CI governance gate

Goal: CODEOWNERS-style enforcement of review diversity. A policy file at repo root, e.g.:
```toml
# GOVERNANCE.toml
[[rule]]
paths = ["spec/**", "SECURITY.md"]
require = ["independent-positions", "human-arbitrated"]
```
`aidr-check` (new tool, zero-dep like the linter) runs in CI: for changed paths matching a rule, require a lint-passing record in `decisions/` that carries the required claims and references the change (PR number or commit in Evidence). Missing record fails the check with a copy-pasteable remediation snippet. A `refs:` frontmatter field may be needed; that is a spec change, so it goes to the Maintainer first (ground rule 6). Acceptance: gate enforced on the aidr repo itself for `SPEC.md` changes.

## Provenance

Authored 2026-07-01 by Claude (Fable 5) in a Claude Code session at Maintainer (Sam Rogers) direction, alongside the initial repo scaffold. Prior-art evidence and the spin-out rationale live in PRIOR_ART.md and examples/AIDR-0001. Keep this handoff updated as phases complete: mark tasks done with dates rather than deleting them.
