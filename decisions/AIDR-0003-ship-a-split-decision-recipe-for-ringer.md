---
id: AIDR-0003
title: Ship a Split Decision recipe for Ringer
status: arbitrated
date: 2026-07-04
decided: 2026-07-04
arbiter: Sam Rogers
tags: [aidr, delivery-surface]
---
# AIDR-0003: Ship a Split Decision recipe for Ringer

## Context

### What AIDR is

AIDR (AI Decision Records) is a days-old format: one markdown file per consequential decision, holding independent agent positions, preserved dissent, and human arbitration. Its spec (v0.1.0, ratified 2026-07-02) carries these invariants:

- Zero-tooling adoption: a record is readable and writable with nothing but a text editor.
- Vendor neutrality: no field requires any particular model, provider, or runtime.
- The spec stays small. Growth routes to delivery surfaces, not spec expansion.
- Delivery surfaces gather positions but never execute actions.

A reference linter (aidr-lint, zero dependencies) mechanically verifies conformance and named claims, including independent-positions (2+ positions from distinct providers recorded before arbitration).

### What Ringer is

Ringer is an unreleased batch swarm orchestrator. Its shape:

- A JSON manifest of tasks. Each task has a spec (worker prompt), a check (shell command whose exit 0 is the only accepted evidence of success), and expect_files.
- A per-task engine field routes each task to any headless CLI via TOML config — provider-agnostic by construction.
- JSONL logging of every attempt, with token counts and durations.
- Isolated worker taskdirs: workers cannot see each other's output.

### The proposed recipe

A "Split Decision" recipe for Ringer (one Ringer run fans a single decision question to N provider engines; the record it emits is an AIDR):

- N parallel position tasks, one per engine/provider, each writing an independent Position block from an identical brief.
- An assemble step (zero-dependency tool living in the aidr repo) merges the position blocks into a single open AIDR record.
- The Ringer check for the assembled record is aidr-lint exit 0, which mechanically verifies that 2+ distinct providers recorded positions before any human arbitration occurs.

Ringer's isolation and per-task engine routing map directly onto AIDR's independence requirement; the recipe adds no execution capability (positions in, record out).

### Timing

Ringer releases publicly within days (Sunday 2026-07-06 at the earliest). The recipe author has early access and a courtesy-testing relationship with Ringer's developers.

### License boundary

The recipe would stay in the aidr repo under Apache-2.0. Ringer's own license reserves resale rights to its owner. The recipe depends on Ringer to run but ships no Ringer code.

### Alternatives on the table

1. Ship the recipe now as AIDR's first delivery surface (docs + assemble tool in the aidr repo).
2. Propose it upstream as a native Ringer feature instead of hosting it in aidr.
3. Defer until adopter pull exists (someone asks for it).
4. Express it as an optional profile of Turnfile (the larger session-governance protocol AIDR was spun out of) rather than an AIDR surface.

## Question

Should AIDR ship a "Split Decision" recipe for the Ringer swarm orchestrator as its first delivery surface — docs plus a zero-dependency assemble tool, hosted in the aidr repo under Apache-2.0, offered to Ringer's developers as an optional companion — or should the effort be held or routed elsewhere (e.g., proposed as an upstream Ringer feature, deferred until adopter pull exists, or expressed as a Turnfile optional profile instead)?

## Positions

### Position: Claude Opus 4.8

- agent: Claude Opus 4.8
- model: claude-opus-4-8
- provider: anthropic
- stance: recommend
- summary: Ship it, but as a self-standing zero-dependency assemble tool plus an abstract "Split Decision" pattern for which Ringer is the first worked example, not a dependency.

A days-old format with zero delivery surfaces has exactly one urgent problem: nothing yet demonstrates that its central claim — 2+ independent positions from distinct providers, recorded before arbitration — can be produced mechanically rather than assembled by hand. This recipe is the cleanest available proof of that claim. Ringer's isolated taskdirs and per-task engine routing are not an incidental fit; they are the independence guarantee expressed in an orchestrator's native primitives, and the check (aidr-lint exit 0) enforces the invariant with no trust in the author. The recipe adds no execution capability, ships no Ringer code, and lives under Apache-2.0 in the aidr repo. On the merits, it violates none of AIDR's stated invariants and directly exercises the one that most needs a public witness. That is a strong reason to ship rather than hold.

The real risk is not license or scope; it is coupling a format's first public impression to an unreleased third-party tool whose fate AIDR does not control. If Ringer slips its Sunday date, underwhelms at launch, or pivots, a Ringer-shaped delivery surface strands AIDR's proof and feeds the "AIDR is Ringer-specific" perception the brief rightly flags. The mitigation is a scoping decision, and it is decisive: the durable, announced artifact is the zero-dependency assemble tool plus a written "Split Decision" pattern that any fan-out orchestrator with a post-step check can run. Ringer becomes the first verified instantiation — "confirmed working with Ringer" — not a prerequisite. Because the assemble tool already carries no Ringer code, most of this separation is a documentation and framing choice, not new engineering. Have the aidr-side artifacts ready under the early-access relationship, and let the Ringer-branded recipe land at or just after Ringer's public release so nothing in aidr's own repo blocks on a tool users cannot yet obtain.

Objection: routing this upstream as a native Ringer feature (alternative 2) is the worst option on the table. It would place AIDR's conformance logic in a repo whose license reserves resale to its owner, subordinate AIDR's core proof to another project's roadmap, and cede control of how the independent-positions claim is demonstrated to a party with no obligation to preserve the spec's invariants. A format defined by vendor neutrality must own its own delivery surfaces; it cannot outsource its first one to a single proprietary vendor.

On deferring until adopter pull exists (alternative 3): this sounds disciplined but is self-defeating here. A format this young generates pull precisely by showing the claim working end to end; with no surface, there is nothing for a prospective adopter to be pulled toward. The generic assemble tool is low-cost, invariant-preserving, and useful even absent Ringer, so the effort is not speculative overreach — it is the minimum artifact needed to make the claim legible. Alternative 4 (a Turnfile optional profile) reintroduces exactly the scope entanglement AIDR was spun out of Turnfile to escape; folding the first surface back into Turnfile blurs the boundary the split was meant to draw. Recommend shipping, scoped tool-and-pattern first, Ringer as the lead example.

### Position: Codex

- agent: Codex
- model: GPT-5
- provider: openai
- stance: recommend
- summary: Ship the Split Decision recipe now as an optional AIDR-hosted delivery surface, with tight framing that it is a companion recipe rather than part of the AIDR spec or a Ringer feature.

AIDR should ship the Split Decision recipe now because it is a concrete, well-scoped demonstration of the format's hardest promise: independent positions can be gathered mechanically without making the record depend on any one vendor or runtime. Ringer's task isolation, per-task engine routing, and check-driven completion line up unusually well with AIDR's independent-positions invariant, and the proposed surface preserves the right boundary: Ringer gathers position files, a zero-dependency assemble tool emits an AIDR, and aidr-lint verifies the record. That is a delivery surface, not spec growth.

The timing risk is real, but it is also the main reason to do it. Ringer is unreleased, so the recipe should not be presented as the canonical way to use AIDR or as a dependency of AIDR itself. It should be labeled experimental or companion-level, live in the aidr repo under Apache-2.0, and document the boundary clearly: no Ringer code is shipped, no action execution is added, and the resulting AIDR remains plain markdown. Those constraints keep the coupling optical rather than architectural.

Routing it upstream into Ringer would be the wrong first move. AIDR needs to own the semantics of what counts as a valid decision record, while Ringer should remain a general orchestrator. Making Split Decision native to Ringer risks burying AIDR's portability inside one tool's release cycle and product framing. AIDR-hosted docs plus a small assemble tool are easier to revise, easier to remove if the idea fails, and more honest about the relationship.

Objection: Deferring until adopter pull exists is too passive for a days-old format whose value is easiest to understand through a working example. The proposed recipe is small enough that the opportunity cost is acceptable, especially with early access and a courtesy-testing path available before Ringer's public release.

Turnfile should also stay out of the critical path. If AIDR was spun out to keep the decision-record format small and vendor-neutral, making its first practical surface a Turnfile profile would blur that separation immediately. Turnfile can later reference or wrap the recipe, but the first delivery surface should prove AIDR on its own terms.

## Objections

## Arbitration

- decided_by: Sam Rogers
- date: 2026-07-04
- decision: ship Split Decision
