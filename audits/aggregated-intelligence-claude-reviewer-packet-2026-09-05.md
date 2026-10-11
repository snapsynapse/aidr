---
date: 2026-09-05
author: Claude (Sonnet 5)
author_role: reviewer packet author and one independent reviewer, not the human arbiter
canonical_source: /Users/snap/SynologyDrive/LocalBrain/0_Across/Aggregated Intelligence Proposals A-B Reviewer Packet 2026-09-05.md
status: used to gather one independent position (Claude's own); superseded local-Ollama run discarded; Codex and Antigravity ran separate, differently-worded packets concurrently, not this one
tags: [aggregated-intelligence, across, aidr, decision-packet, claude]
---
# Aggregated Intelligence Claude reviewer packet, verbatim

This is Claude's repository copy of the neutral reviewer packet used to form Claude's own independent position on AIDR-0002 and AIDR-0003 in `~/Git/paice-foundation/decisions/`. It is reproduced here verbatim from the LocalBrain canonical source named above. It deliberately excludes Sam's stated preference, the 2026-07-06 peer reviewers' votes, and the original brief author's recommendation.

Note for anyone reconciling concurrent review artifacts: Codex and Antigravity ran their own separate reviews at the same time, using their own differently-titled packets (`Aggregated Intelligence Neutral Reviewer Packet 2026-09-05.md` in LocalBrain, not this file) against local Ollama models plus, in Antigravity's case, itself as a reviewer. Their results are recorded at `decisions/AIDR-0006-evaluate-provisional-aggregated-intelligence-claims.md` and `audits/aidr-0006-antigravity-evaluation-2026-09-05.md` (this repo) and `audits/aggregated-intelligence-codex-decision-packet-2026-09-05.md` (this repo), plus `0_Across/decisions/AIDR-0001-facilitation-translation.md` and `AIDR-0002-false-confidence-lenses.md` in LocalBrain (Codex's own record location, distinct from both this repo's decisions/ and paice-foundation's decisions/). The three efforts were not coordinated with each other and do not share reviewer packet text; see the companion decision-packet file in this directory for the full reconciliation note.

---

# Reviewer packet: two provisional Aggregated Intelligence claims

You are an independent reviewer. Another reviewer's opinion is not available to you, and none is described below. Form your own position from the material given. Do not assume any position is expected of you.

## Decision boundary

Eight tenets underlying "Aggregated Intelligence" (a design philosophy behind the Turnfile, AIDR, and Harnessie projects) were ratified as canon on 2026-07-06 and are NOT being reopened here. This review is about two OTHER claims that were proposed alongside the eight tenets but were explicitly left provisional at ratification, pending further review. You are asked to evaluate each claim separately.

- Claim A concerns whether machine-peer collaboration protocols are an "isomorphism" of human group-facilitation practice.
- Claim B concerns whether two named failure modes are jointly exhaustive of the ways AI systems produce false confidence.

## Claim A: facilitation isomorphism

### Original stronger formulation (as drafted, not yet ratified)

Source: "Aggregated Intelligence Tenets" draft, "The lineage: a facilitator's creed, mechanized" section.

> These tenets are twenty-five years of Learning & Performance work and a diverse array of experiences as a facilitator of group processes in the personal development space ported over to machine peers. These fields taught [the author] something the agent industry has not yet learned: a group is smarter than its smartest member only under structure; unstructured, it is dumber than its smartest member. Anchoring, information cascades, the loudest voice, the boss's prior. The facilitation toolkit exists to defeat exactly those failure modes: independent ideation before sharing, explicit decision rights, turn-taking, documented objections, retrospectives. Turnfile is that toolkit ported to machine peers. Brainwriting became isolated position files. Decision rights became the Maintainer. The parking lot became the Objections section. The retrospective became PRD evolution.

This formulation uses direct-mapping language ("ported," "became") between named facilitation techniques and named protocol mechanisms, without qualifying the mapping's scope or limits.

### Proposed revised (bounded) formulation

> Selected facilitation practices can be translated into explicit controls for human-agent collaboration: independent contributions before mutual influence, declared decision rights, retained objections, bounded rounds, and retrospective changes. Turnfile, AIDR and Harnessie embody parts of that design lineage. The mappings are functional and testable; they do not establish equivalence between human group psychology and model computation, or guarantee improved judgment.

### Documented implementation (what actually runs in code today)

Source: Harnessie GOVERNANCE.md, a shipped multi-agent harness that implements this design lineage.

- Position round: each position agent runs in an isolated context with side effects locked, must end with a machine-parseable stance object.
- Objection round(s): agents see other positions and must return objections or an explicit no-new-objection marker; bounded by a configured round count (default 1).
- Assembly: the harness itself (never an agent) assembles the decision record; arbitration is human-only, mechanically enforced — no code path can write the arbitration section.
- The "independent-positions" structural claim requires two or more DISTINCT PROVIDER STRINGS recorded before arbitration. A documented 2026-07-10 run routed three different models through one shared `openai-compat` provider string; the run did not earn the independent-positions claim even though the underlying models were genuinely different, because the structural check keys on provider string, not on verified model identity.
- The harness's own "Independence statement," recorded in every decision record: "positions run in isolated model contexts within one harness process; isolation is code-enforced for context and tools, behavioral for everything a shared filesystem could leak."

### Design lineage (documented, not independently verified)

The claimed lineage is first-person: named facilitation techniques (brainwriting, parking lot, retrospective, decision rights) mapped one-to-one to named protocol mechanisms (isolated position files, Objections section, PRD evolution, Maintainer role). This is asserted provenance, not a controlled comparison between the two domains.

### Normative commitments already ratified (not up for review, given as context only)

Tenet 3: "Independence before influence. Positions form in isolation before anyone sees anyone else's... Distinct model families are required for the same reason: a monoculture cannot produce honest dissent, only echo with variance."

Tenet 6: "The record is the relationship... Plain-text records of who proposed, who objected, and who decided are legibility infrastructure."

### Limitations and considerations already raised

- A formal isomorphism, in the mathematical sense, would require specifying the two structures being compared, an explicit correspondence between their elements, and a demonstration that the relations of interest are preserved across that correspondence. Naming parallel functions (a parking lot defers an issue; an objection record preserves a challenge) is not the same as demonstrating that the two structures play the same role under all relevant operations — the functions may overlap in some cases without being interchangeable in general.
- Independent position files structurally prevent one specific exposure pathway (reading a peer's output before writing your own in the same run). They do not recreate the psychological and social conditions of human independence (private evaluation without any anchoring context, absence of authority cues, etc.).
- Human facilitation is grounded in social/psychological dynamics (status, trust, tone, timing) that have no direct code analogue; a protocol can enforce ORDER of information exposure but cannot enforce the internal cognitive independence a facilitator is actually managing for.
- Countervailing consideration: the harness enforcement is a genuine causal mechanism (code-level exposure ordering, not merely aspirational instruction), which is a meaningfully different assurance than an unenforced human norm — the question is whether that is grounds for calling the design lineage a translation/mapping (bounded) or an isomorphism (structural equivalence).

## Claim B: two-failure-modes dual (exhaustiveness)

### Original stronger formulation (as drafted, not yet ratified)

Source: "Aggregated Intelligence Tenets" draft, "The dual: two failure modes of the era" section.

> The age of capable models has two false-confidence failure modes. Hallucinated completion: the individual agent reporting "done" with total confidence. Premature convergence: the group collapsing into agreement before dissent surfaced. Orchestration frameworks with mechanical verification are the industry's best answer to the first. Turnfile and AIDR are the answer to the second. Neither covers the other's failure mode. A complete system composes them: mechanical verification below, structured dissent above, one accountable human on top.

This formulation states "has two" (implying completeness) and "neither covers the other's failure mode" (implying the two lenses are strictly disjoint / mutually exclusive in coverage).

### Proposed revised (nonexhaustive) formulation

> Two useful false-confidence lenses are unverified completion and premature convergence. Evidence-bound verification can challenge completion claims; independent contributions, preserved objections and accountable arbitration can challenge premature agreement. Their controls can overlap and should be composed where proportionate. They do not exhaust failure modes or guarantee correctness. Systems also need controls appropriate to stale evidence, wrong objectives, compromised inputs, selection errors and human oversight failures.

### Documented implementation (what actually runs in code today)

Source: Harnessie GOVERNANCE.md and INTENT.md.

- Mechanical verification gate: every side-effecting phase passes deterministic checks plus an independent fresh-context verifier before it is treated as done.
- Contested-decision phase: structured dissent (isolated positions, bounded objection rounds, human-only arbitration) for judgment calls rather than artifact correctness.
- Documented separate control surfaces NOT covered by either lens, per the same repository's own documentation: memory freshness/staleness (a scheduled triage workflow re-verifies or archives facts past a verification deadline — a drift problem, not a completion-confidence or convergence problem), and a named, currently-unresolved identity gap (the runtime mechanically blocks agent-authored arbitration text, but does not authenticate an outside process as human, and does not yet record distinct operator-of-record vs. arbiter-of-record identities).
- Hash-chained audit log: tamper-evident against silent partial edits; explicitly NOT tamper-proof against wholesale log replacement without an external anchor. The repository's own text: "A valid log is not proof of a good decision."

### External evidence reviewed (dates and one-line relevance; abstracts verified against the live paper pages during this review)

| Source | Date | What it shows | Direct limit on generalizing to Claim B |
|---|---|---|---|
| [Candidate supply and answer selection shape the value of LLM judging](https://arxiv.org/abs/2608.25937), v2 | revised 2026-08-30 | In multi-agent systems, the correct answer is often present among generated candidates but lost during selection; weighting by answer frequency plus judge evaluation recovered much of that loss (63.82% -> ~70.9% in the reported setup). | This is a THIRD, distinct failure locus — correct information generated but discarded at selection — not cleanly "unverified completion" (no one claimed false completion) nor "premature convergence" (the system didn't converge on agreement, it discarded a minority-supported correct candidate). |
| [BoardroomAI](https://arxiv.org/abs/2608.13046) | 2026-08-13 | A dependency-aware, human-steerable deliberation system where a human can intervene at any point (challenge assumptions, add evidence, redirect). Authors state results are synthetic/prototype-level; a 12-case pilot produced valid updated decisions in 6 cases and abstained in the other 6. | Half the pilot cases were abstentions, meaning persistent human presence plus correct dependency routing was, by the authors' own report, insufficient on its own to reach a decision in half the tested cases. Human presence and correct routing are not shown to be sufficient conditions. |
| [LLM Agents for Deliberative Collaboration](https://arxiv.org/abs/2607.06157) | 2026-07-07 | Benchmarks joint decision-making under partial observability; found information-alignment and reasoning failures persist even with deliberation and tool access, though deliberation sometimes enabled error correction. | Evaluated a fixed scaffold across multiple models without a human-baseline comparison; failures documented here (information-alignment failures during deliberation) do not map cleanly onto either "hallucinated completion" or "premature convergence" — they are communication/reasoning failures that can occur independent of whether the group converges or claims completion. |
| [Diverse Evidence, Better Forecasts](https://arxiv.org/abs/2607.01661) | 2026-07-02 (predates ratification) | When agents share identical information, deliberation collapses into herding; splitting evidence into shared/exclusive components and giving agents different information reduced this and improved forecasting 12-18% (Brier score) on 375 questions. Removing the information asymmetry eliminated most of the gain. | Directly relevant to premature convergence ("herding"), but the fix tested is INFORMATION diversity (who sees what evidence), not the tenets' proposed fix of PROCEDURAL independence (isolated position formation, retained objections). The two are related but not shown to be equivalent interventions. |
| [Nine Judges, Two Effective Votes](https://machinelearning.apple.com/research/correlated-llm-evaluation-panels) | 2026-06 (predates ratification) | Panels of 9 models from 7 distinct model families, on NLI tasks, provided roughly the information of 2 independent votes because models tended to fail on the same items; the strongest single model sometimes matched the whole panel. | Directly undercuts the "distinct providers => independence" assumption used to operationalize Claim A's independence mechanism and, by extension, Claim B's premature-convergence lens: provider-string diversity is not measured statistical independence, so a system could pass the tenets' structural independence check and still be exposed to the correlated-error problem the panel study documents. |
| [Controlling Uncertainty and Hallucination Risk in Multi-Agent Fact Verification](https://proceedings.mlr.press/v337/kostka26a.html), UAI 2026 | conference Aug 17-21, 2026 | Proposes scoring disagreement within an ensemble (rather than simple majority agreement) plus a calibration procedure with provable false-discovery-rate bounds, substantially improving recall of hallucinated claims at a fixed risk budget vs. naive baselines. | Offers a third kind of control (statistical calibration with a provable guarantee) for a problem adjacent to both lenses (false confidence in a claim), that is neither the tenets' "mechanical verification" (deterministic pass/fail) nor "structured dissent with human arbitration" (no statistical guarantee, no automatic threshold). |
| [Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/abs/2503.13657), v3 | revised 2025-10-26 (predates the tenets and this review by many months; older, not new, counterevidence) | A taxonomy (MAST) of 14 distinct multi-agent failure modes across 3 categories (system design, inter-agent misalignment, task verification), built from 1600+ annotated traces across 7 frameworks, kappa = 0.88 inter-annotator agreement. | A published, empirically-derived taxonomy with materially more than 2 categories. Its existence does not by itself prove no 2-category taxonomy can be useful for a narrower scope, but it is direct counter-evidence to any claim that 2 categories are exhaustive of multi-agent LLM failure in general. |

No external experiment was reproduced for this review; all of the above are as-published claims from the source, checked against the live paper/abstract page on 2026-09-05, not independently re-run.

### Limitations and considerations already raised

- "Neither covers the other" reads as a strict, mutually-exclusive-coverage claim. Counter-considerations: a verification step can expose a group's shared/systemic error (collapsing the "verification only checks individual completion, not group agreement" boundary), and a dissenting reviewer's objection can be exactly what surfaces that a "done" claim was never actually true (collapsing the "structured dissent only checks group agreement, not individual completion" boundary). If every counterexample can be redescribed after the fact as secretly belonging to one of the two categories, the exhaustiveness claim becomes difficult to falsify, which is itself a reason for caution about accepting it as stated.
- The two lenses may still be JOINTLY USEFUL and WORTH COMPOSING even if they are not JOINTLY EXHAUSTIVE — accepting the nonexhaustive wording does not require abandoning the practice of combining verification and structured dissent; it only withdraws the claim that nothing else is needed.
- Countervailing consideration: even a nonexhaustive pair of lenses could be defended as exhaustive WITHIN A DELIBERATELY NARROW SCOPE (e.g., "the two failure modes this specific harness's governance layer is designed to answer," rather than "the two failure modes of the era" generally) — the question is whether the wording as drafted supports that narrower reading or overreaches it.

## What is being asked of you

Give a SEPARATE, independently-argued response for Claim A and for Claim B. For EACH claim, answer all of the following:

1. Verdict — choose exactly one: accept the revised (bounded/nonexhaustive) wording; retain the original stronger wording with a precise definition and evidence you supply; the claim needs further revision (and to what); keep it provisional as-is (neither accept nor retain); or reject the claim entirely.
2. Exact proposed wording you are voting for (write it out, even if it is one of the two given formulations verbatim, or your own if you chose "needs further revision" or "reject").
3. Supporting evidence for your verdict, and the limits of that evidence.
4. The strongest objection or counterexample against your own verdict that you are aware of.
5. What observation or evidence would change your verdict.
6. Whether a controlled experiment is necessary before this claim could be decided with confidence, and why or why not — do not assume an experiment is required just because one could be run.

Do not state a preference about how the human decision-maker (who is not a participant in this review) should ultimately rule beyond your own reasoned verdict. Write your position as if it will be read by other reviewers only after you have submitted it, not before.
