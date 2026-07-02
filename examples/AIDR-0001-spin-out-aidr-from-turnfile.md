---
id: AIDR-0001
title: Deliver Turnfile's governance concept as a single-file decision record standard
status: arbitrated
date: 2026-07-01
decided: 2026-07-02
arbiter: Sam Rogers
tags: [turnfile, pivot, adoption, aidr]
---
# AIDR-0001: Deliver Turnfile's governance concept as a single-file decision record standard

## Context

Turnfile (https://turnfile.work/) is a file-based governance protocol for auditable peer disagreement among AI agents with human arbitration. It works, and is approaching its v1.0.0 Minimal Governance Profile freeze, but its unit of adoption is a practice: sessions, mailboxes, handshakes, and a validator suite. The maintainer is weighing a pivot: deliver the same concept (independent positions, preserved dissent, human arbitration, plain-text audit) in a technically divergent form with a much lower adoption cost. The candidate is AIDR, a one-file markdown decision record modeled on the ADR playbook, with the full Turnfile protocol repositioned as the advanced profile.

## Question

Should the AIDR single-file decision record format be created as a new standalone spec repository, with Turnfile retained separately as the full session protocol?

## Positions

### Position: claude

- agent: claude
- model: claude-fable-5
- provider: Anthropic
- stance: recommend
- summary: Create AIDR as a new sibling repo; it is the cheapest faithful expression of Turnfile's concept and the strongest adoption play.

ADRs achieved near-universal adoption because the cost to adopt is one template file, and prior art search (2026-07-01) found the specific niche open: AgDR covers single-agent decision documentation but has no multi-model dissent or required human arbitration; multi-model council tools (Council AI, Perplexity Model Council, llmcouncil.ai) surface disagreement ephemerally in product UIs but produce no durable, portable audit artifact. A fork of Turnfile would drag 47 PRDs and session machinery into a project whose entire pitch is smallness; a new repo keeps lineage by citation instead. Risk accepted: two specs to maintain; mitigated by keeping AIDR frozen-small and pointing all session-scale needs at Turnfile.

## Objections

## Arbitration

- decided_by: Sam Rogers
- date: 2026-07-02
- decision: Create AIDR as a new standalone spec repository, with Turnfile retained separately as the full session protocol.

Maintainer's written direction of 2026-07-02: "I accept the AIDR-0001 as drafted." No objections were recorded and no opposing positions were filed, so there is nothing further to address. The domain aidr.work was purchased the same day, confirming the working name. Transcription note: this section was transcribed into the record by Claude (Fable 5) at the Maintainer's direction; the decision and its wording are the Maintainer's own.

## Evidence

- [Turnfile INTENT.md](https://github.com/snapsynapse/turnfile/blob/main/INTENT.md): the concept being re-expressed, and the fresh-context adoption test AIDR is designed to pass trivially.
- [AgDR](https://github.com/me2resh/agent-decision-record): closest prior art; complementary, not overlapping (verified active 2026-06, no dissent or arbitration fields).
- PRIOR_ART.md in this repository: full 2026-07-01 prior art survey.
