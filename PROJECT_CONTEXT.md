# PROJECT_CONTEXT.md

Context for content/docs skills working on this repo.

## What this project is

AIDR (AI Decision Records) is an open, single-file markdown format for recording consequential decisions made with AI agents — the question, each agent's independent position, preserved objections, and the human arbitration that resolved them. It is deliberately not a runtime, service, or protocol: adoption is "copy a template, fill it in." It is phase 1 of a five-surface roadmap (format/spec, MCP server, GitHub Action, second-opinion SDK, CI governance gate); later surfaces are gated on real-world dogfooding and are not yet built.

## Audience

Teams and individual builders making high-consequence decisions with AI agents — architecture calls, release gates, security-relevant changes, public claims — who need to later reconstruct who objected and who held authority to decide. Secondary audience: other decision-record / governance-format projects (ADR community, AgDR) for interop and citation.

## Style / tone

Formal, precise, spec-like in normative documents (SPEC.md uses RFC 2119 keywords). README and INTENT.md are direct and unhedged, favor short declarative sentences, and are comfortable naming trade-offs and risks explicitly rather than smoothing them over. Decision records themselves are written in first person by the agent/human holding each position, with an explicit "this position was written without reading any other participant's position" independence disclosure. No marketing gloss — claims are framed as mechanically checkable ("conformance claims"), not aspirational.

## Key URLs

- Canonical site: https://aidr.work/
- Repo: https://github.com/snapsynapse/aidr
- Related/cited: Aggregated Intelligence tenets — https://paice.foundation/papers/aggregated-intelligence-tenets.html
- Interop outreach: AgDR issue — https://github.com/me2resh/agent-decision-record/issues/8

## Current status

- Spec v0.1.0 ratified (2026-07-02); repo release v0.2.0 (2026-07-05); unreleased changes accumulating in CHANGELOG.md.
- All four decision records to date (AIDR-0001–0004) are arbitrated and closed; no open Maintainer decisions.
- Portfolio status: graduated `incubating` -> `active` (2026-07-02) in the maintainer's portfolio manifest.
- Companion Claude Skill (`skills/aidr/`) ships in-repo as the canonical distribution home (per AIDR-0004).
- Next roadmap gate: phase 2 (MCP server) requires the format to be stable for one release cycle and dogfooded in at least two PAICE repos — not yet met.
