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

- Spec v0.1.0 ratified (2026-07-02); repo release v0.2.0 (2026-07-05); v0.2.1 documentation release candidate prepared locally, not published; see audits/release-readiness-2026-09-05.md.
- The release’s tracked governance inventory contains four arbitrated, closed records (AIDR-0001–0004). Separate untracked cross-entity review material remains open and is excluded from this release. CONTRIBUTING.md retains a separate procedural question about mechanical metadata edits.
- Portfolio status: graduated `incubating` -> `active` (2026-07-02) in the maintainer's portfolio manifest.
- Companion agent-agnostic AIDR Skill (`skills/aidr/`) ships in-repo as the canonical distribution home (per AIDR-0004).
- The phase-2 format-stability condition is met. The 2026-09-05 bounded local audit found open, lint-passing records in GuideCheck and PAICE Foundation, neither arbitrated or earning claims yet. Harnessie has eight arbitrated records plus an open AIDR-0009, but is a Snap Synapse project. The two-PAICE-repo dogfood condition remains unmet. See audits/handoff-relevance-2026-09-05.md for the current work packet.
