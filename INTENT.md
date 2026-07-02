---
title: "AIDR INTENT"
version: "0.1.6"
last_updated: 2026-07-02
status: active
description: "Component-level strategy for AIDR as the minimal single-artifact expression of Turnfile's governance concept, plus the delivery-surface roadmap built on it."
tags: [intent, strategy, aidr, governance, decision-records]
---
# AIDR INTENT

Component-scoped strategy. Portfolio-level strategy lives in `paice-foundation/INTENT.md`. The decision to create this project is itself recorded as [examples/AIDR-0001](examples/AIDR-0001-spin-out-aidr-from-turnfile.md), arbitrated and accepted by the Maintainer on 2026-07-02: the project's founding, human-reviewed kickoff. That founding record was single-position by design; every subsequent decision is recorded as an AIDR carrying independent model positions with Maintainer arbitration. The first such multi-model record is [decisions/AIDR-0002](decisions/AIDR-0002-ratify-spec-v0.1.0.md), which ratified SPEC v0.1.0 on 2026-07-02 (independent positions from Anthropic, OpenAI, and Google; arbitrated by the Maintainer).

## What this is

AIDR re-expresses Turnfile's core concept (independent agent positions, preserved dissent, human arbitration, plain-text audit) at the smallest possible unit of adoption: one markdown template. The bet is the ADR playbook: ADRs achieved near-universal adoption because adopting them costs one file and no tooling. AIDR aims the same mechanism at AI-involved decisions.

## Relationship to Turnfile

- Turnfile remains the full session protocol: lifecycle, mailboxes, ownership, closeout, validators. Not deprecated, not forked.
- AIDR is the front door; Turnfile is the advanced profile. A team that outgrows single-decision records graduates to Turnfile sessions.
- Conceptual lineage is by citation, not shared code or shared history. This repo stays dependency-free and small.
- Turnfile's INTENT should record this relationship now that the Maintainer has arbitrated AIDR-0001 (2026-07-02); that edit goes through Turnfile's own governance.

## Design invariants

1. One decision, one file. No session state, ever. Session-scale needs route to Turnfile.
2. Adoptable with zero tooling. The linter is optional and must stay dependency-free.
3. Dissent is never deleted; records are superseded, not rewritten.
4. Arbitration is human. No model authors the Arbitration section.
5. Vendor-neutral. No field names a required provider.
6. The spec stays small. Growth pressure goes to the delivery surfaces below, not into the format.

## Delivery-surface roadmap (sequenced, gated)

AIDR the format is phase 1 of a five-surface plan. Each later surface consumes or emits AIDR files; none may change the format to exist.

1. Format + spec page (this repo). Gate to next: spec ratified by Maintainer, AgDR interop issue opened, canonical landing page live.
2. MCP server (`aidr-mcp`): tools like record_position, file_objection, arbitrate, check_open_dissent, writing conforming files. Gate: format stable for one release cycle and dogfooded in at least two PAICE repos.
3. GitHub Action: fan a PR out to N heterogeneous models, each posts an independent position; disagreement rendered as a comment; merged decision written back as an AIDR file. Gate: MCP server proves the write path; at least one external adopter of the format.
4. Second-opinion SDK: library form of the Action's fan-out (positions only, never execution), emitting AIDR files. May be extracted from the Action rather than built separately.
5. CI governance gate: policy file mapping paths to required claims (e.g. changes under `spec/` require `independent-positions` + `human-arbitrated` evidence). Gate: surfaces 1 to 3 producing records in the wild.

Decision triggers, not dates. Any surface can be dropped if its gate never fires.

### Companion surface: Claude Skill (not gated)

A Claude Skill (`SKILL.md`, no MCP server, no new dependency) is a zero-infrastructure complement to phase 2. It teaches an agent to open a record from the template, record a position with correct metadata, file an objection, check lint status, and request arbitration, never author it (design invariant 4). It consumes only the existing template and `tools/aidr-lint.mjs`, so it carries no format risk under ground rule 6. Cheaper than the MCP server (no SDK, no server process, works in any skill-compatible harness today), it can ship any time after the template and linter are stable, independent of phase 2's own gate. Real use of the skill in a live session counts as dogfooding evidence toward phase 2's gate. See handoff T1.9 for the task-level detail.

## Contribute-over-compete commitments

- AgDR (me2resh/agent-decision-record): propose interop and cross-linking; credit prominently. AIDR does not duplicate AgDR's single-agent use case.
- ADR org: seek listing as a related format once stable.
- FINOS AIR: map conformance claims to AIR human-oversight controls as an evidence format.

## Non-goals

- Not a session protocol, task tracker, or transcript store.
- Not an orchestrator; surfaces 3 and 4 gather positions, never execute actions.
- Not a consensus engine; model agreement is evidence, never authority.
- Not a hosted service; files in the adopter's repo are the product.

## Open decisions (Maintainer)

None currently open. All phase-1 gates are cleared; the next decisions are the phase-2 gate (format stable one release cycle, dogfooded in two PAICE repos) and whether to ship the non-gated Claude Skill companion.

Resolved: AgDR interop outreach opened 2026-07-02 as [me2resh/agent-decision-record#8](https://github.com/me2resh/agent-decision-record/issues/8) (cross-linking plus shared-frontmatter-key alignment; contribute-over-compete, no ask for AgDR to change its model). This was the last unmet phase-1 gate, so aidr graduated `incubating` -> `active` in `portfolio.yaml` the same day. SPEC.md v0.1.0 ratified 2026-07-02 via [AIDR-0002](decisions/AIDR-0002-ratify-spec-v0.1.0.md) (`status: draft` to `status: ratified`), the first multi-model record: independent positions from Anthropic (Claude), OpenAI (Codex), and Google (Gemini), all recommending, arbitrated by the Maintainer. This clears the phase-1 ratification gate in the delivery-surface roadmap. AIDR-0001 arbitrated 2026-07-02 (accepted as drafted). Name confirmed "AI Decision Records (AIDR)"; canonical URL https://aidr.work/ (purchased 2026-07-02). Repo `snapsynapse/aidr` created 2026-07-02 and flipped public 2026-07-02 (the "Prepare repo for public release" commit); the manifest note and this section reconciled to the public state the same day. aidr.work landing page went live 2026-07-02 (HTTPS enforced, DNS verified against all four expected IPs, assistant-guide.txt confirmed served byte-identical at the canonical `.well-known` path). Portfolio membership: aidr is a standalone `spec`-role component in `portfolio.yaml` (not a Turnfile surface — lineage is by citation, not shared code), admitted 2026-07-02 and held at `incubating` pending the AgDR interop gate above.

## Execution

The sequenced, task-level execution plan for all five surfaces lives at `handoffs/2026-07-01-five-surface-execution-plan.md`. It is written to be executable by any capable agent without this repo's founding conversation.

## Changelog

- 2026-07-02 v0.1.6 - AgDR interop issue opened (me2resh/agent-decision-record#8), clearing the last phase-1 gate. Emptied Open decisions (pointed forward to the phase-2 gate and the Claude Skill companion); moved the AgDR outreach to Resolved; recorded the incubating -> active graduation mirrored in portfolio.yaml.
- 2026-07-02 v0.1.5 - Reconciled to the public state after the repo flipped public. Replaced the private-to-public open decision with the AgDR interop gate (now the last unmet phase-1 gate and the graduation condition for the portfolio manifest); folded the flip and its verification into Resolved; recorded portfolio membership as a standalone incubating `spec` component. Mirrors the `portfolio.yaml` aidr status/note reconciliation made the same day.
- 2026-07-02 v0.1.4 - SPEC v0.1.0 ratified via AIDR-0002 (first multi-model record: Anthropic, OpenAI, Google positions, Maintainer-arbitrated). Moved ratification from Open decisions to Resolved; noted the phase-1 ratification gate is cleared; updated the intro to point at AIDR-0002 as the founding record's multi-model successor.
- 2026-07-02 v0.1.3 - Reconciled AIDR-0001 to its arbitrated-accepted outcome (2026-07-02, human-reviewed founding kickoff): lifted the pre-ratification-draft framing that was gated on AIDR-0001, set status to active, and resolved the contradiction between the intro and the Open-decisions Resolved note. SPEC v0.1.0 ratification remains pending as AIDR-0002.
- 2026-07-02 v0.1.2 - Added Claude Skill as a non-gated companion surface to the delivery-surface roadmap (handoff T1.9). Adopted GuideCheck Level 2 (`assistant-guide.txt` at repo root and `docs/.well-known/`, byte-identical).
- 2026-07-02 v0.1.1 - Local commit authorized; portfolio.yaml incubating entry added; execution handoff added; open-decisions list reconciled.
- 2026-07-01 v0.1.0 - Initial draft: scope, Turnfile relationship, invariants, five-surface roadmap, contribute-over-compete commitments. Authored by Claude (Fable 5) at Maintainer direction; pending arbitration via AIDR-0001.
