---
id: AIDR-0002
title: Ratify AIDR specification v0.1.0
status: arbitrated
date: 2026-07-02
decided: 2026-07-02
arbiter: Sam Rogers
tags: [spec, ratification, release]
---
# AIDR-0002: Ratify AIDR specification v0.1.0

## Context

SPEC.md v0.1.0 is complete in draft: purpose, design rules, file conventions, frontmatter, body sections, status lifecycle, three named conformance claims, and prior-art positioning. AIDR-0001 (the spin-out decision) was arbitrated 2026-07-02 with a single position, so this record is the first eligible for the `independent-positions` claim. Ratification flips SPEC.md `status: draft` to `status: ratified` and tags the v0.1.0 release (handoff T1.2/T1.8). This record gathers independent positions from Claude (Anthropic), Codex (OpenAI), and Gemini (Google) before arbitration.

## Question

Should SPEC.md v0.1.0 be ratified as-is and tagged as the v0.1.0 release?

## Positions

### Position: claude

- agent: claude
- model: claude-fable-5
- provider: Anthropic
- stance: recommend
- summary: Ratify v0.1.0 as-is; the spec is small, internally consistent, and testable, and both findings from review are non-blocking and better handled post-ratification.

Written independently; no other positions existed in this record at authoring time. Disclosure: this participant authored AIDR's INTENT.md and arbitrated positions in AIDR-0001, so it is an insider to the format, not an arm's-length reviewer.

Review basis: full read of SPEC.md v0.1.0 (125 lines) against the template, AIDR-0001, and the five-surface execution plan. The spec satisfies its own design rules: one-decision-one-file is enforced by sections 3 and 5.2; dissent preservation by 5.4 and the append-only lifecycle in 6; human arbitration by design rule 5 plus the `arbiter` MUST in section 4; vendor neutrality holds (no field names a provider). The three conformance claims in section 7 are each mechanically checkable except one caveat below. The lifecycle has no dead ends: no rejected status is the right call, and supersession preserves originals.

Two findings, both non-blocking:

1. Temporal verifiability of `independent-positions`. Section 7 says claims are "verifiable by any party from the file alone," but "each recorded before arbitration" is a temporal fact a single file cannot prove — a position could be appended after arbitration and backdated. Git history corroborates in practice. Suggest a future clarifying sentence (file-alone verification is structural; temporal claims are corroborated by version-control history), not a v0.1.0 blocker: every format with in-file claims shares this limit, and the spec never promises cryptographic provenance.
2. Records do not declare a spec version. A record has no optional `spec_version` frontmatter field, so a v0.2 conformance checker cannot tell which spec a record targeted. Defer: add the optional field in the first post-ratification revision; retrofitting is trivial while record count is small.

Ratifying now is better than iterating in draft: the spec's supersession model and status lifecycle are exactly the machinery for evolving it, and an unratified spec undercuts the format's own credibility claim (a governance format whose own governance is pending).

### Position: gemini

- agent: gemini
- model: gemini-3.5-flash
- provider: Google
- stance: recommend
- summary: Recommend ratification of SPEC v0.1.0; the design is lightweight, vendor-neutral, and correctly isolates agent deliberation from human authority, while minor post-ratification enhancements like explicit spec versioning are easy to add.

Gemini supports ratification of the AI Decision Records (AIDR) specification v0.1.0. The specification successfully balances developer-friendliness (standard markdown plus YAML) with rigorous structural constraints for multi-agent accountability. 

Specifically:
1. **Design Rule 5 (Human-only Arbitration)** is a necessary safety guardrail. Ensuring that agents are forbidden from writing or altering the Arbitration section preserves human agency and authority, preventing automated consensus laundering.
2. **Dissent Preservation** (Section 5.4) treats disagreement as valuable history rather than an error or an intermediate execution state. This aligns with multi-agent heterogeneity and robust auditing.
3. **Draft-to-Ratified lifecycle** (Section 6) provides a clean, append-only pathway that avoids the complexity of intermediate consensus protocols.

*Disclosure:* Gemini read Claude's position prior to authoring this position. We concur with Claude's findings:
- The temporal verifiability of the `independent-positions` claim is a common and acceptable limit of file-level metadata that version-control systems (such as Git) natively solve.
- The omission of a `spec_version` field in the record frontmatter should be addressed in a future minor revision (e.g. v0.2.0) to assist conformance checkers, but does not block this release given the currently small corpus of records.

Ratifying v0.1.0 now provides a stable baseline for Turnfile-AIDR integration.

### Position: codex

- agent: codex
- model: GPT-5 / Codex desktop
- provider: OpenAI
- stance: recommend
- summary: Ratify AIDR SPEC v0.1.0 and tag it as the v0.1.0 release, with the explicit understanding that the spec is a minimal decision-record format and not a session protocol or consensus mechanism.

I formed this position after reading only `/Users/snap/Git/aidr/SPEC.md` v0.1.0 and before reading the existing AIDR-0002 record or any other posted position.

I recommend ratifying SPEC v0.1.0 because its core contract is narrow, internally coherent, and testable from a single markdown file: one decision per file, required human arbiter, required participant positions, immutable dissent, and clear status lifecycle. The most important boundary is also clear: AIDR records positions and human arbitration, but does not claim to orchestrate agents, assign tasks, or turn model agreement into authority. That boundary makes it suitable as a stable v0.1.0 release rather than an overbroad governance protocol.

The required metadata is sufficient for the first release. `agent`, `model`, `provider`, `stance`, and `summary` let a reader verify independent-provider claims and understand the decision posture without parsing transcripts. Section 7's named claims are likewise useful because they are file-verifiable and avoid vague assertions of review quality.

I do not see a blocker to ratification. The main risk is that future users may overread `independent-positions` as consensus or authority; section 8 already counters that by saying agreement among models is evidence, not authority. I would keep that line prominent in follow-on docs and examples, but I would not hold v0.1.0 for it.

## Objections

## Arbitration

- decided_by: Sam Rogers
- date: 2026-07-02
- decision: Ratify SPEC.md v0.1.0 and tag it as the v0.1.0 release.

Yes this conforms to my intent for the beginning of this project. This is a strong start, not a complete effort in and of itself.

## Evidence

- [SPEC.md v0.1.0](../SPEC.md) — the document under decision, frontmatter `version: "0.1.0"`, `status: draft`.
- [AIDR-0001](../examples/AIDR-0001-spin-out-aidr-from-turnfile.md) — prior arbitrated record; single-position, motivating the multi-model demo here.
- [Five-surface execution plan, T1.2/T1.8](../handoffs/2026-07-01-five-surface-execution-plan.md) — names this record and the ratification mechanics.
- Turnfile PRD-047 Test 2 (`~/Git/turnfile/working-session/docs/PRD-047-cross-repo-v1-validation-tests.md`) — this record doubles as the real work item for the Turnfile-in-AIDR dogfood run; independence caveat (AIDR is Turnfile's spin-out; the claude participant authored AIDR's INTENT) recorded there and in the position prose above.
