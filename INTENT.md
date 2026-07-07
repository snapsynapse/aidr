---
title: "AIDR INTENT"
version: "0.1.11"
last_updated: 2026-07-06
status: active
description: "Component-level strategy for AIDR as the minimal single-artifact expression of Turnfile's governance concept, plus the delivery-surface roadmap built on it."
tags: [intent, strategy, aidr, governance, decision-records]
---
# AIDR INTENT

Component-scoped strategy. Portfolio-level strategy lives in `paice-foundation/INTENT.md`. The decision to create this project is itself recorded as [examples/AIDR-0001](examples/AIDR-0001-spin-out-aidr-from-turnfile.md), arbitrated and accepted by the Maintainer on 2026-07-02: the project's founding, human-reviewed kickoff. That founding record was single-position by design; every subsequent decision is recorded as an AIDR carrying independent model positions with Maintainer arbitration. The first such multi-model record is [decisions/AIDR-0002](decisions/AIDR-0002-ratify-spec-v0.1.0.md), which ratified SPEC v0.1.0 on 2026-07-02 (independent positions from Anthropic, OpenAI, and Google; arbitrated by the Maintainer).

## What this is

AIDR re-expresses Turnfile's core concept (independent agent positions, preserved dissent, human arbitration, plain-text audit) at the smallest possible unit of adoption: one markdown template. One decision, one file: the question, each agent's independent position, any objections, and the human arbitration that resolved them.

## Why it exists

Multi-model tools (councils, juries, AI code review) increasingly show where models disagree, then the disagreement evaporates into a chat answer; execution logs record what ran, not who dissented or who decided. No portable artifact answers the audit question high-consequence work needs: who objected before we acted, and who had authority to resolve it. AIDR fills that gap by making the answer a plain file in the adopter's repo. The bet is the ADR playbook: ADRs achieved near-universal adoption because adopting them costs one file and no tooling. AIDR aims the same mechanism at AI-involved decisions.

## Design invariants

1. One decision, one file. No session state, ever. Session-scale needs route to Turnfile.
2. Adoptable with zero tooling. The linter is optional and must stay dependency-free.
3. Dissent is never deleted; records are superseded, not rewritten.
4. Arbitration is human. No model authors the Arbitration section.
5. Vendor-neutral. No field names a required provider.
6. The spec stays small. Growth pressure goes to the delivery surfaces below, not into the format.

## Scope boundaries

In scope: the AIDR file format (YAML frontmatter plus fixed-order body sections), the optional dependency-free linter (`tools/aidr-lint.mjs`), the conformance suite (`tests/`), the spec page, and interop conventions with adjacent formats.

Out of scope:
- Not a session protocol, task tracker, or transcript store.
- Not an orchestrator; the later delivery surfaces gather positions, never execute actions.
- Not a consensus engine; model agreement is evidence, never authority.
- Not a hosted service; files in the adopter's repo are the product.

## Conformance philosophy

- Testable-claim model. Conformance is defined by `CONFORMANCE.md` and checkable by `tools/aidr-lint.mjs`; `tests/run.mjs` exercises valid and invalid fixtures. A record is conformant if it passes the published rules.
- No central oracle. The linter uses only Node.js built-ins and runs anywhere. There is no hosted validator, registry, or gatekeeper service; any party can verify any record locally.
- Verifier-anywhere. Conformance does not depend on who ran the check or where.
- Form, not quality. Conformance verifies the record's shape — required fields, a human arbiter, preserved dissent — never whether the decision was wise. Model agreement is evidence, never authority.

## Admission criteria for changes

A change to the normative spec (`SPEC.md`) must:

1. Be arbitrated by the Maintainer (per `CONTRIBUTING.md`). No model authors normative text or the arbitration of a change.
2. Preserve all six design invariants above. A change that violates one is rejected, not negotiated.
3. Keep the format small. Growth pressure routes to the delivery surfaces, not into new required fields, unless the gap genuinely cannot be met by a surface.
4. Supersede, never rewrite. Breaking changes ship as a new spec version; records stay valid under the version they were written against.
5. Be recorded as an AIDR with independent positions when the change is consequential — the format dogfoods itself (see AIDR-0002).

## Relationships to other PAICE standards

Turnfile (https://turnfile.work/):
- Turnfile remains the full session protocol: lifecycle, mailboxes, ownership, closeout, validators. Not deprecated, not forked.
- AIDR is the front door; Turnfile is the advanced profile. A team that outgrows single-decision records graduates to Turnfile sessions.
- Conceptual lineage is by citation, not shared code or shared history. This repo stays dependency-free and small.
- Turnfile's INTENT should record this relationship now that the Maintainer has arbitrated AIDR-0001 (2026-07-02); that edit goes through Turnfile's own governance.

Aggregated Intelligence tenets (https://paice.foundation/papers/aggregated-intelligence-tenets.html):
- The eight tenets, ratified as canon 2026-07-06, are the design principles beneath both AIDR and Turnfile: structured dissent, independence before influence, preserved disagreement, human-only arbitration, plain-text records, commons licensing, practice-earned rules.
- Lineage is by citation only; the tenets impose no conformance requirement and name no required provider, consistent with tenet 7.

Contribute-over-compete commitments (non-binding integrations, explicitly named):
- AgDR (me2resh/agent-decision-record): interop and cross-linking proposed 2026-07-02 (issue #8); credit prominently. AIDR does not duplicate AgDR's single-agent use case.
- ADR org: seek listing as a related format once stable.
- FINOS AIR: map conformance claims to AIR human-oversight controls as an evidence format.

## Delivery-surface roadmap (sequenced, gated)

AIDR the format is phase 1 of a five-surface plan. Each later surface consumes or emits AIDR files; none may change the format to exist.

1. Format + spec page (this repo). Gate to next: spec ratified by Maintainer, AgDR interop issue opened, canonical landing page live. (All three cleared 2026-07-02.)
2. MCP server (`aidr-mcp`): tools like record_position, file_objection, arbitrate, check_open_dissent, writing conforming files. Gate: format stable for one release cycle and dogfooded in at least two PAICE repos.
3. GitHub Action: fan a PR out to N heterogeneous models, each posts an independent position; disagreement rendered as a comment; merged decision written back as an AIDR file. Gate: MCP server proves the write path; at least one external adopter of the format.
4. Second-opinion SDK: library form of the Action's fan-out (positions only, never execution), emitting AIDR files. May be extracted from the Action rather than built separately.
5. CI governance gate: policy file mapping paths to required claims (e.g. changes under `spec/` require `independent-positions` + `human-arbitrated` evidence). Gate: surfaces 1 to 3 producing records in the wild.

Decision triggers, not dates. Any surface can be dropped if its gate never fires.

### Companion surface: shared AIDR Skill (not gated)

The shared AIDR Skill (`skills/aidr/SKILL.md`, no MCP server, no new dependency) is a zero-infrastructure complement to phase 2. It teaches an agent to open a record from the template, record a position with correct metadata, file an objection, assemble isolated position files, check lint status, and request arbitration, never author it (design invariant 4). It consumes only the existing template plus `tools/aidr-lint.mjs` and `tools/aidr-assemble.mjs`, so it carries no format risk under ground rule 6. Cheaper than the MCP server (no SDK, no server process, works in any skill-compatible harness today), it can ship any time after the template and linter are stable, independent of phase 2's own gate.

AIDR-0004 resolved the distribution-home decision on 2026-07-05: the canonical home is tracked in this repo under `skills/aidr/SKILL.md`; local Claude Code installs and the portfolio skills monorepo link back to it rather than maintaining copies. Codex and other agents consume the same skill file; there is intentionally no Codex-specific fork unless a concrete surface gap appears that cannot be handled in the shared instructions. Real use of the skill in live sessions counts as dogfooding evidence toward phase 2's gate.

## Open decisions (Maintainer)

None currently open. All phase-1 gates are cleared; the next decisions are the phase-2 gate (format stable one release cycle, dogfooded in two PAICE repos) and launch timing for a worked-example companion to the RECIPES.md position sweep (gated on a third-party tool's public launch).

Resolved: AgDR interop outreach opened 2026-07-02 as [me2resh/agent-decision-record#8](https://github.com/me2resh/agent-decision-record/issues/8) (cross-linking plus shared-frontmatter-key alignment; contribute-over-compete, no ask for AgDR to change its model). This was the last unmet phase-1 gate, so aidr graduated `incubating` -> `active` in `portfolio.yaml` the same day. SPEC.md v0.1.0 ratified 2026-07-02 via [AIDR-0002](decisions/AIDR-0002-ratify-spec-v0.1.0.md) (`status: draft` to `status: ratified`), the first multi-model record: independent positions from Anthropic (Claude), OpenAI (Codex), and Google (Gemini), all recommending, arbitrated by the Maintainer. This clears the phase-1 ratification gate in the delivery-surface roadmap. AIDR-0001 arbitrated 2026-07-02 (accepted as drafted). Name confirmed "AI Decision Records (AIDR)"; canonical URL https://aidr.work/ (purchased 2026-07-02). Repo `snapsynapse/aidr` created 2026-07-02 and flipped public 2026-07-02 (the "Prepare repo for public release" commit); the manifest note and this section reconciled to the public state the same day. aidr.work landing page went live 2026-07-02 (HTTPS enforced, DNS verified against all four expected IPs, assistant-guide.txt confirmed served byte-identical at the canonical `.well-known` path). Portfolio membership: aidr is a standalone `spec`-role component in `portfolio.yaml` (not a Turnfile surface — lineage is by citation, not shared code), admitted 2026-07-02 and graduated to active the same day.

## Execution

The sequenced, task-level execution plan for all five surfaces lives at `handoffs/2026-07-01-five-surface-execution-plan.md`. It is written to be executable by any capable agent without this repo's founding conversation.

## Exceptions to Repo Standards

Deviations from `0_Across/Repo Standards.md`, each with reason and status:

- `handoffs/` is gitignored, not tracked. This entry previously said the opposite ("tracked, not gitignored, execution handoffs are durable deliverables"); that was superseded by the 2026-07-04 standing rule that handoffs/ is private session scratch in all of the Maintainer's repos, and the exception was never updated to match. Corrected 2026-07-05 (repo-polish pass); `.gitignore` itself already carried the current rule and comment. Status: resolved, no longer an exception.
- `assistant-guide.txt` is adopted at GuideCheck Level 2 — byte-identical root + `docs/.well-known/` pair, no manifest sidecar. The manifest sidecar is a Level 4+ artifact and is not adopted at the current level. Status: intentional; revisit on any promotion to Level 4+. Note: a 2026-07-05 audit found the pair briefly non-identical (root copy carried 3 lines the served copy lacked, from an earlier quickstart edit); resynced same day.
- GitHub Pages serves `docs/.well-known/` via `docs/_config.yml` (`include: [".well-known"]`, Jekyll) rather than `.nojekyll`. Reason: on the legacy Jekyll build type `.nojekyll` did not stop `docs/.well-known/` returning 404; the include-based fix does (verified live 200). This is the documented portfolio remedy, recorded here so the absent `.nojekyll` is not read as drift.
- Skill-bundle-in-repo pattern: this repo IS the canonical home for the AIDR Skill (per AIDR-0004), so the full bundle is tracked at `skills/aidr/` (canonical plural naming) with Skill Provenance adoption (`MANIFEST.yaml`, bundle `CHANGELOG.md`). Status: intentional, matches the standards doc's named exception case (same pattern as `hardguard25/skills/hardguard25/`, `siteline/skill/`); neither of those precedents carries a `PROJECT_CONTEXT.md` inside the bundle either (that file is a consumer-side artifact for repos that use a skill, not for the skill's own canonical home), so this bundle omits it too, correcting the standards doc's row 193 wording for future reference. Historical note: the bundle briefly lived at singular `skill/aidr/` (2026-07-05, same day) on the stated rationale that `skills` was a gitignored path in this repo; that rationale was factually wrong (this repo's `.gitignore` never contained such a pattern) and is preserved as-is in AIDR-0004's recorded Position prose, which is not edited after the fact. The folder was renamed to the canonical name the same day once the error was caught; the decision AIDR-0004 actually arbitrated (canonical home tracked in this repo) is unaffected.

## Changelog

- 2026-07-06 v0.1.11 - Relationships section gains the Aggregated Intelligence tenets (ratified canon 2026-07-06, canonical URL at paice.foundation/papers) as the cited design ground; lineage by citation, no conformance requirement.
- 2026-07-05 v0.1.10 - Repo-polish gap-audit pass: renamed the skill bundle from `skill/aidr/` to canonical `skills/aidr/` (both local symlinks re-pointed, `make check` reverified 20/20); adopted Skill Provenance for the bundle (`MANIFEST.yaml`, `CHANGELOG.md`; no `PROJECT_CONTEXT.md`, since that is a consumer-side artifact); corrected the stale "handoffs/ tracked" exception to match the 2026-07-04 standing rule; resynced the assistant-guide.txt root/`.well-known` pair to byte-identical. No format or decision change.
- 2026-07-05 v0.1.9 - Updated the roadmap's non-gated skill companion from a Claude-specific framing to the shared AIDR Skill resolved by AIDR-0004: canonical tracked home `skill/aidr/SKILL.md`, symlinked local installs, and one shared file consumed by Claude, Codex, and other agents rather than separate per-agent forks.
- 2026-07-02 v0.1.8 - First release tagged and published: v0.1.0 (GitHub Release, https://github.com/snapsynapse/aidr/releases/tag/v0.1.0). Removed the now-resolved "no tagged release yet" entry from Exceptions to Repo Standards.
- 2026-07-02 v0.1.7 - Restructured INTENT into the 9-section repo-standards template (repo-standards-audit walk): added Why it exists, Scope boundaries, Conformance philosophy, Admission criteria for changes, and Exceptions to Repo Standards; folded Relationship to Turnfile and Contribute-over-compete into Relationships to other PAICE standards; preserved the delivery-surface roadmap, companion skill, open decisions, and execution sections. No strategy change. Companion standards-adoption edits in the same pass: fixed the LICENSE scope footer (spec prose was misattributed to "the Turnfile protocol" and listed nonexistent PRDs), added RELEASE_CHECKLIST.md, and generated docs/llms-full.txt.
- 2026-07-02 v0.1.6 - AgDR interop issue opened (me2resh/agent-decision-record#8), clearing the last phase-1 gate. Emptied Open decisions (pointed forward to the phase-2 gate and the Claude Skill companion); moved the AgDR outreach to Resolved; recorded the incubating -> active graduation mirrored in portfolio.yaml.
- 2026-07-02 v0.1.5 - Reconciled to the public state after the repo flipped public. Replaced the private-to-public open decision with the AgDR interop gate (now the last unmet phase-1 gate and the graduation condition for the portfolio manifest); folded the flip and its verification into Resolved; recorded portfolio membership as a standalone incubating `spec` component. Mirrors the `portfolio.yaml` aidr status/note reconciliation made the same day.
- 2026-07-02 v0.1.4 - SPEC v0.1.0 ratified via AIDR-0002 (first multi-model record: Anthropic, OpenAI, Google positions, Maintainer-arbitrated). Moved ratification from Open decisions to Resolved; noted the phase-1 ratification gate is cleared; updated the intro to point at AIDR-0002 as the founding record's multi-model successor.
- 2026-07-02 v0.1.3 - Reconciled AIDR-0001 to its arbitrated-accepted outcome (2026-07-02, human-reviewed founding kickoff): lifted the pre-ratification-draft framing that was gated on AIDR-0001, set status to active, and resolved the contradiction between the intro and the Open-decisions Resolved note. SPEC v0.1.0 ratification remains pending as AIDR-0002.
- 2026-07-02 v0.1.2 - Added Claude Skill as a non-gated companion surface to the delivery-surface roadmap (handoff T1.9). Adopted GuideCheck Level 2 (`assistant-guide.txt` at repo root and `docs/.well-known/`, byte-identical).
- 2026-07-02 v0.1.1 - Local commit authorized; portfolio.yaml incubating entry added; execution handoff added; open-decisions list reconciled.
- 2026-07-01 v0.1.0 - Initial draft: scope, Turnfile relationship, invariants, five-surface roadmap, contribute-over-compete commitments. Authored by Claude (Fable 5) at Maintainer direction; pending arbitration via AIDR-0001.
