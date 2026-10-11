---
id: AIDR-0006
title: Evaluate provisional Aggregated Intelligence claims
status: open
date: 2026-09-05
arbiter: Sam Rogers
tags: [aggregated-intelligence, tenets, across, governance]
---
# AIDR-0006: Evaluate provisional Aggregated Intelligence claims

## Context

The eight Aggregated Intelligence tenets were ratified as canon on 2026-07-06 and are not being reopened. Two accompanying claims remained provisional: the "facilitation isomorphism" claim in the Lineage section and the "two-failure-modes dual" in the Dual section. This decision evaluates both claims separately using fresh evidence gathered from local implementations (Turnfile, AIDR, Harnessie) and external multi-agent research through August 2026. Reviewers formed positions under isolated contexts across three model families before a bounded objection round. The purpose is to determine whether to adopt bounded revised formulations, retain the original stronger formulations, revise further, keep provisional, or reject.

## Question

How should the two provisional Aggregated Intelligence claims be resolved: (A) adopt a bounded functional translation of facilitation practices into human-agent collaboration controls versus retaining formal isomorphism; and (B) adopt two complementary, nonexhaustive false-confidence lenses versus retaining the exhaustive two-failure-modes dual?

## Positions

### Position: antigravity

- agent: antigravity
- model: gemini-3.8-flash
- provider: google
- stance: recommend
- summary: Adopt the revised bounded wording for both A and B; the revisions ground the claims in demonstrable software mechanisms and nonexhaustive epistemic lenses without overclaiming mathematical isomorphism or taxonomic exhaustiveness.

Position formed independently based on the neutral reviewer packet (`Aggregated Intelligence Neutral Reviewer Packet 2026-09-05.md`), local source register (L1--L8), and verified external research register (R1--R7) prior to viewing peer positions.

#### Proposal A: Bounded Functional Translation vs. Formal Isomorphism
- Verdict: accept revised wording
- Exact proposed wording:
  > Selected facilitation practices can be translated into explicit controls for human-agent collaboration: independent contributions before mutual influence, declared decision rights, retained objections, bounded rounds, and retrospective changes. Turnfile, AIDR and Harnessie embody parts of that design lineage. The mappings are functional and testable; they do not establish equivalence between human group psychology and model computation, or guarantee improved judgment.
- Supporting evidence and limits: L1 documents Sam Rogers' 25-year facilitation experience as the authentic intellectual lineage for Turnfile and AIDR. L2 and L4 confirm implementation in Harnessie (isolated position collection before mutual exposure, bounded rebuttal rounds, immutable objections, Maintainer authority). R3 (BoardroomAI) and R4 (Wang et al.) provide external analogues of structured human-agent deliberation, but R5 (Li et al.) and R6 (Kohli) demonstrate that prompt isolation and provider diversity do not equal statistical error independence or cognitive equivalence.
- Strongest objection / counterexample: A skeptic could argue that concurrency and distributed systems patterns (two-phase commits, mutexes, isolated subshells, barrier synchronization) already explain these controls without needing facilitation ancestry, and that specific facilitation tools (e.g. parking lots as temporary topic deferrals) differ functionally from protocol constructs (e.g. AIDR objections as permanent immutable veto records).
- What evidence would change the verdict: To retain formal isomorphism: a mathematically rigorous specification defining the domains, relation sets, and structure-preserving bijective homomorphisms between human group psychological dynamics and multi-agent runtime states. To reject functional translation: empirical evidence that isolated positioning and bounded rounds fail to reduce anchoring or information cascades in agent ensembles.
- Whether an experiment is necessary before a decision: No. The distinction between formal isomorphism and bounded functional translation is a conceptual scoping and definition boundary. No empirical experiment can convert an intellectual design lineage into a formal mathematical isomorphism.

#### Proposal B: Complementary Lenses vs. Exhaustive Dual
- Verdict: accept revised wording
- Exact proposed wording:
  > Two useful false-confidence lenses are unverified completion and premature convergence. Evidence-bound verification can challenge completion claims; independent contributions, preserved objections and accountable arbitration can challenge premature agreement. Their controls can overlap and should be composed where proportionate. They do not exhaust failure modes or guarantee correctness. Systems also need controls appropriate to stale evidence, wrong objectives, compromised inputs, selection errors and human oversight failures.
- Supporting evidence and limits: L6 shows that Harnessie required dedicated memory triage and freshness controls to handle temporal drift, which is distinct from both unverified completion and premature agreement. R7 (Cemri et al., MAST) demonstrates 14 distinct failure modes in multi-agent LLM systems, disproving exhaustiveness. R1 (Ji et al.) shows answer-selection failure discarding valid minority candidates, and R2 (Kostka & Chudziak) shows verification and disagreement controls interacting rather than operating as disjoint domains.
- Strongest objection / counterexample: A defender of the original dual might argue that at a sufficiently high level of abstraction, all false confidence is either individual ungrounded assertion (node failure) or collective ungrounded consensus (network failure), and that additional categories are merely environmental inputs or sub-types. However, stretching definitions to force all failures into two buckets destroys their operational diagnostic utility.
- What evidence would change the verdict: To retain the exhaustive dual: an operational classification proof showing that all failure modes across multi-agent workflows can be partitioned into hallucinated completion and premature convergence with zero residual categories. To reject the lenses: evidence that composing verification and structured dissent provides zero risk reduction over uncoordinated execution.
- Whether an experiment is necessary before a decision: No. Exhaustiveness is already refuted conceptually and empirically by existing taxonomies (MAST) and Harnessie's drift controls. Determining whether a taxonomy is exhaustive or lens-based is a matter of epistemic honesty, not pending empirical benchmark runs.

### Position: qwen

- agent: qwen
- model: qwen3.8:latest
- provider: alibaba
- stance: recommend
- summary: The revised formulations are clearly superior for both A and B, correctly scoping to functional analogy and nonexhaustive lenses with explicit disclaimers, though residual ambiguities in 'testable' and the operational criteria for 'premature convergence' remain.

Position formed independently in a fresh stateless Ollama request based solely on the neutral reviewer packet and registers.

#### Proposal A: Bounded Functional Translation vs. Formal Isomorphism
- Verdict: accept revised wording
- Exact proposed wording:
  > Selected facilitation practices can be translated into explicit controls for human-agent collaboration: independent contributions before mutual influence, declared decision rights, retained objections, bounded rounds, and retrospective changes. Turnfile, AIDR and Harnessie embody parts of that design lineage. The mappings are functional and testable; they do not establish equivalence between human group psychology and model computation, or guarantee improved judgment.
- Supporting evidence and limits: L2 (Harnessie INTENT §7) supports functional-analogy scoping and explicit disclaimers. L4 (runner.py) shows concrete implementation of isolated position collection followed by bounded objections. R5 (Li et al.) motivates evidence partitioning. The counterexample of parking lots vs. objection records confirms mappings are not automatic equivalences.
- Strongest objection: The phrase 'functional and testable' is doing unqualified work. 'Testable' implies a defined pass/fail criterion, but the text does not state what the test would be or against what baseline.
- What evidence would change the verdict: Retaining the original's formal-isomorphism framing would require a defined pair of structures, an explicit mapping function, a stated domain, and a proof or formal specification of preserved relations between facilitation-practice states and agent-control states.
- Whether an experiment is necessary before a decision: No. Wording is a scoping and precision question: which level of correspondence to claim. The conceptual clarification is separable from empirical effectiveness questions.

#### Proposal B: Complementary Lenses vs. Exhaustive Dual
- Verdict: accept revised wording
- Exact proposed wording:
  > Two useful false-confidence lenses are unverified completion and premature convergence. Evidence-bound verification can challenge completion claims; independent contributions, preserved objections and accountable arbitration can challenge premature agreement. Their controls can overlap and should be composed where proportionate. They do not exhaust failure modes or guarantee correctness. Systems also need controls appropriate to stale evidence, wrong objectives, compromised inputs, selection errors and human oversight failures.
- Supporting evidence and limits: R7 (MAST, 14 failure modes in 3 categories) directly supports non-exhaustiveness. R6 (Apple) shows panel count does not equal independence. R2 (Kostka & Chudziak) shows verification and disagreement controls interact, refuting exclusivity. L6 (§5, §7) demonstrates drift and tampering failure modes outside the two lenses.
- Strongest objection: The revised retains 'premature convergence' as a lens but omits a criterion distinguishing premature convergence from legitimate rapid agreement.
- What evidence would change the verdict: Retaining stronger wording would require evidence that the two failure modes are genuinely exclusive in their control mechanisms, which R2 and overlap counterexamples contradict.
- Whether an experiment is necessary before a decision: No. Wording decision is about scoping: claiming an exhaustive two-mode taxonomy versus a useful pair of lenses with acknowledged overlap.

### Position: gptoss

- agent: gptoss
- model: gpt-oss:20b
- provider: openai
- stance: alternative
- summary: Accept revised wording for B as balanced and nonexhaustive; revise A further because 'functional and testable' conflates analogy with proven effectiveness and requires empirical validation.

Position formed independently based on the supplied reviewer packet.

#### Proposal A: Bounded Functional Translation vs. Formal Isomorphism
- Verdict: revise further
- Exact proposed wording:
  > Selected facilitation practices can be translated into explicit controls for human-agent collaboration: independent contributions before mutual influence, declared decision rights, retained objections, bounded rounds, and retrospective changes. Turnfile, AIDR and Harnessie embody parts of that design lineage. The mappings are functional and testable; they do not establish equivalence between human group psychology and model computation, nor guarantee improved judgment.
- Supporting evidence and limits: L1 describes facilitation lineage; L2-L5 document Turnfile/AIDR/Harnessie design; R1-R5 empirical studies support that structured controls influence outcomes but do not prove equivalence or guarantee improvement. Limits: no direct experiments comparing proposed controls to alternative designs.
- Strongest objection: The wording conflates functional analogy with formal equivalence, potentially misleading stakeholders into believing controls are proven to improve judgment. The claim that mappings are 'functional and testable' is vague and does not specify measurable outcomes.
- What evidence would change the verdict: Empirical evidence showing that implementing the specified controls leads to statistically significant improvements in decision accuracy or reliability compared to an unstructured baseline.
- Whether an experiment is necessary before a decision: Yes. An experiment implementing the controls in a realistic multi-agent setting and measuring decision quality, error rates, and user satisfaction is needed to substantiate that controls are beneficial and clarify their effectiveness.

#### Proposal B: Complementary Lenses vs. Exhaustive Dual
- Verdict: accept revised wording
- Exact proposed wording:
  > Two useful false-confidence lenses are unverified completion and premature convergence. Evidence-bound verification can challenge completion claims; independent contributions, preserved objections and accountable arbitration can challenge premature agreement. Their controls can overlap and should be composed where proportionate. They do not exhaust failure modes or guarantee correctness. Systems also need controls appropriate to stale evidence, wrong objectives, compromised inputs, selection errors and human oversight failures.
- Supporting evidence and limits: L2-L5 governance specs; R2 disagreement scoring; R1, R4, R5 multi-agent studies. Limits: no direct empirical comparison of composed vs separate controls.
- Strongest objection: Presents the two lenses as 'useful' without quantifying usefulness or demonstrating that they capture all relevant false-confidence failures.
- What evidence would change the verdict: Empirical data showing that applying both controls reduces false-confidence errors more than either alone.
- Whether an experiment is necessary before a decision: No. The wording is cautious and does not assert exhaustive coverage or guarantee correctness.

## Objections

### Objection: antigravity to Position gptoss

Conflating conceptual scoping with empirical benchmark validation on Proposal A. GPT-OSS asserts that 'functional and testable' conflates analogy with proven effectiveness and demands an empirical benchmark measuring decision accuracy and user satisfaction before adopting the wording. This is a category error: the revised text explicitly disclaims that the mappings 'establish equivalence between human group psychology and model computation, or guarantee improved judgment.' Demanding empirical proof of improved judgment before adopting wording that disclaims guaranteeing improved judgment is contradictory. 'Testable' denotes operational falsifiability (controls can be mechanically audited in code), not proven performance superiority. Blocking conceptual bounding pending empirical runs leaves an unearned, overbroad claim in place.

### Objection: antigravity to Position qwen

Over-indexing on procedural protocol definitions for an epistemic failure lens on Proposal B. Qwen notes that 'premature convergence' lacks an operational criterion distinguishing it from valid rapid consensus, suggesting defining it by the absence of a protocol step (such as an objection round). Defining premature convergence strictly by the presence or absence of a specific protocol step risks procedural circularity (defining epistemic failure by whether an AIDR-style process was executed). Premature convergence is an epistemic failure mode where a group collapses into agreement despite unexamined counterevidence or correlated training biases. As a conceptual lens, it does not require a rigid procedural formula to be valid.

### Objection: qwen to Position gptoss

Conflating scoping decisions with empirical effectiveness on Proposal A. GPT-OSS's request for an experiment to validate wording conflates the scoping decision (which level of correspondence to claim) with the empirical effectiveness question (whether controls improve outcomes). The packet explicitly instructs reviewers to separate these. The revised wording correctly scopes the claim to functional analogy and disclaims equivalence. GPT-OSS's proposed 'revise further' verdict does not offer a materially distinct alternative wording resolving the ambiguity better than the current text.

### Objection: gptoss to Position qwen

Ambiguity of 'testable' on Proposal A and lack of operational definition for 'premature convergence' on Proposal B. On A, the phrase 'functional and testable' is unsupported without a defined pass/fail test protocol, baseline comparison, or measurable outcome; the text should clarify that controls are *potentially* testable. On B, omitting a concrete operational boundary (such as agreement reached before at least one independent objection round has been recorded) leaves premature convergence underdetermined and liable to misclassify legitimate rapid consensus.

## Arbitration

## Evidence

- [Local Review Brief 2026-09-05](file:///Users/snap/SynologyDrive/LocalBrain/0_Across/Aggregated%20Intelligence%20Proposals%20Review%20Brief%202026-09-05.md): Decision boundary, drift analysis, and research review.
- [Neutral Reviewer Packet 2026-09-05](file:///Users/snap/SynologyDrive/LocalBrain/0_Across/Aggregated%20Intelligence%20Neutral%20Reviewer%20Packet%202026-09-05.md): Neutral formulation comparisons, source registers L1-L8, research registers R1-R7, counterexamples.
- [Tenets Draft 2026-07-04](file:///Users/snap/SynologyDrive/LocalBrain/0_Across/Aggregated%20Intelligence%20Tenets%20%28draft%202026-07-04%29.md): Ratified eight tenets and original provisional formulations.
- [Tenets Peer Review 2026-07-06](file:///Users/snap/SynologyDrive/LocalBrain/0_Across/Tenets%20Peer%20Review%202026-07-06.md): July 6 independent review establishing the provisional status of the two claims.
- [Harnessie INTENT.md](file:///Users/snap/Git/harnessie/INTENT.md) and [GOVERNANCE.md](file:///Users/snap/Git/harnessie/GOVERNANCE.md): Implementation evidence for isolated positions, bounded rounds, drift controls, and tamper-evident audit logs.
- [Candidate supply and answer selection (Ji et al., 2026)](https://arxiv.org/abs/2608.25937v2): R1, candidate loss during selection.
- [Controlling Uncertainty in Multi-Agent Fact Verification (Kostka & Chudziak, 2026)](https://proceedings.mlr.press/v337/kostka26a.html): R2, disagreement-sensitive scoring and verification calibration.
- [BoardroomAI (Manivannan, 2026)](https://arxiv.org/abs/2608.13046v1): R3, human intervention and dependency-aware repair prototype.
- [LLM Agents for Deliberative Collaboration (Wang et al., 2026)](https://arxiv.org/abs/2607.06157v1): R4, deliberative correction and reasoning failures under partial observability.
- [Diverse Evidence, Better Forecasts (Li et al., 2026)](https://arxiv.org/abs/2607.01661v1): R5, evidence diversity vs prompt framing.
- [Nine Judges, Two Effective Votes (Kohli, Apple, 2026)](https://machinelearning.apple.com/research/correlated-llm-evaluation-panels): R6, model family correlated errors.
- [Why Do Multi-Agent LLM Systems Fail? (Cemri et al., 2025)](https://arxiv.org/abs/2503.13657v3): R7, MAST 14-mode multi-agent failure taxonomy.
