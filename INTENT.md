---
title: "AIDR INTENT"
version: "0.1.1"
last_updated: 2026-07-01
status: pre-ratification-draft
description: "Component-level strategy for AIDR as the minimal single-artifact expression of Turnfile's governance concept, plus the delivery-surface roadmap built on it."
tags: [intent, strategy, aidr, governance, decision-records]
---
# AIDR INTENT

Component-scoped strategy. Portfolio-level strategy lives in `paice-foundation/INTENT.md`. The decision to create this project is itself recorded as [examples/AIDR-0001](examples/AIDR-0001-spin-out-aidr-from-turnfile.md) and is open pending Maintainer arbitration; until arbitrated, everything here is draft.

## What this is

AIDR re-expresses Turnfile's core concept (independent agent positions, preserved dissent, human arbitration, plain-text audit) at the smallest possible unit of adoption: one markdown template. The bet is the ADR playbook: ADRs achieved near-universal adoption because adopting them costs one file and no tooling. AIDR aims the same mechanism at AI-involved decisions.

## Relationship to Turnfile

- Turnfile remains the full session protocol: lifecycle, mailboxes, ownership, closeout, validators. Not deprecated, not forked.
- AIDR is the front door; Turnfile is the advanced profile. A team that outgrows single-decision records graduates to Turnfile sessions.
- Conceptual lineage is by citation, not shared code or shared history. This repo stays dependency-free and small.
- Turnfile's INTENT should record this relationship once the Maintainer arbitrates AIDR-0001; that edit goes through Turnfile's own governance.

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

- Ratify SPEC.md v0.1.0 (flip `status: draft` to `status: ratified`) and tag the v0.1.0 release; recommended as the first multi-model record (AIDR-0002, see handoff T1.2).
- Flip the GitHub repo from private to public, and go-live timing for the aidr.work landing page.

Resolved: AIDR-0001 arbitrated 2026-07-02 (accepted as drafted). Name confirmed "AI Decision Records (AIDR)"; canonical URL https://aidr.work/ (purchased 2026-07-02). Private repo `snapsynapse/aidr` created 2026-07-02.

## Execution

The sequenced, task-level execution plan for all five surfaces lives at `handoffs/2026-07-01-five-surface-execution-plan.md`. It is written to be executable by any capable agent without this repo's founding conversation.

## Changelog

- 2026-07-02 v0.1.1 - Local commit authorized; portfolio.yaml incubating entry added; execution handoff added; open-decisions list reconciled.
- 2026-07-01 v0.1.0 - Initial draft: scope, Turnfile relationship, invariants, five-surface roadmap, contribute-over-compete commitments. Authored by Claude (Fable 5) at Maintainer direction; pending arbitration via AIDR-0001.
