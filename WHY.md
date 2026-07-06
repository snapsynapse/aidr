---
title: "Why not synthesis"
version: "1.0.0"
status: current
last_updated: 2026-07-05
description: "The design refusal behind AIDR: when models disagree, no model resolves the disagreement. What synthesis destroys, what the record preserves, and what that costs."
tags: [aidr, positioning, governance, dissent, arbitration]
---
# Why not synthesis

AIDR exists because of one design refusal: when multiple models disagree, we do not let a model resolve the disagreement.

Every multi-model council product converges on the same final step. Gather answers in parallel, surface the differences, then synthesize: a chairman model, a verdict model, a summary that "highlights agreement and disagreement." The synthesis reads as rigor. It is the opposite. The moment a model merges the positions, the disagreement stops being evidence and becomes an editorial choice made by whichever model held the pen, with all of its own priors and none of the accountability.

AIDR keeps the disagreement.

## What synthesis destroys

A synthesized answer destroys exactly the information a consequential decision needs most:

- Who held which position before anyone saw anyone else's. Independence is the only defense against anchoring and correlated error. A synthesis cannot prove positions were independent; a record with positions filed before arbitration can.
- What the dissent actually said. Syntheses compress objections into "some models noted concerns." The record preserves the objection verbatim, permanently. Objections are never deleted; records are superseded, not rewritten.
- Who decided, and by what right. A verdict emitted by a model is an answer with no owner. In an AIDR record the Arbitration section is human-authored by a named person, because accountability cannot be delegated to something that cannot be held accountable.

Agreement itself proves less than it appears to. Models from the same family, or models that have seen each other's output, agree for reasons that have nothing to do with being right. That is why the `independent-positions` claim requires two or more distinct providers and positions recorded before arbitration, and why the linter checks it mechanically. Consensus is evidence to weigh, never an authority to obey.

## The two audit questions

Execution tooling answers: what ran, and did the checks pass? That question matters and other tools answer it well. AIDR answers the question no execution log can: who proposed, who objected, and who decided? A system can prove every task passed and still have no way to prove the task was worth doing. The decision record is the missing half of the audit trail, and the two halves compose: a record can cite an execution log as evidence, and an execution pipeline can emit an open record for a human to arbitrate.

## What this costs

Refusing synthesis has a price, and AIDR pays it knowingly:

- A human must actually read the positions and write the arbitration. There is no summary button. That is the point: the arbiter's attention is the accountability.
- Records with real dissent are slower to close than a verdict. A decision worth recording is worth the latency.
- The format cannot promise convergence. A unanimous record and a split record are equally valid outputs; only the human decides which way to go.

If a decision does not merit that cost, it does not merit an AIDR record. Use a lighter tool. But when the decision is consequential enough that someone will later ask "who decided this, and did anyone object," synthesis is the one step you cannot afford, because it answers that question with a shrug.

## See also

- [SPEC.md](SPEC.md) for the format that enforces these commitments
- [PRIOR_ART.md](PRIOR_ART.md) for the council products and where each one hands the verdict back to a model
- [RECIPES.md](RECIPES.md) for producing independent positions mechanically
