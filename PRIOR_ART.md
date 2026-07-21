---
title: "AIDR Prior Art Survey"
version: "0.1.1"
last_updated: 2026-07-21
description: "What already exists near AIDR, what each covers, and the gap AIDR fills."
tags: [aidr, prior-art, research]
---
# Prior art survey

Surveyed 2026-07-01 (Perplexity sonar-pro plus direct repository verification). Conclusion up front: no existing format records multiple independent AI model positions, preserved dissent, and required human arbitration in a portable plain-text artifact. That intersection is the gap AIDR fills. Everything below is either an ancestor, a complement, or an adjacent product that proves demand without producing a durable record.

## Decision record formats (ancestors and complements)

| Project | What it is | Relationship to AIDR |
|---|---|---|
| [ADR](https://adr.github.io/) (Nygard) | The original architecture decision record practice | Direct ancestor; AIDR copies its adoption model (one template, no runtime) |
| [MADR](https://adr.github.io/madr/) | ADR variant emphasizing options and pros/cons | Ancestor for the multi-option structure; no agents, no dissent, no arbitration fields |
| [AgDR](https://github.com/me2resh/agent-decision-record) (me2resh) | ADR extension for decisions an AI coding agent makes mid-session; agent metadata, Y-statement, options table, and a `/decide` skill | Closest prior art. Complementary: AgDR documents one agent's decision; AIDR records several agents' independent positions plus human arbitration. Interop outreach opened 2026-07-02 (see below) |
| DRF (Decision Reasoning Format) | Machine-readable YAML/JSON decision reasoning format referenced by the ADR org | Candidate machine-readable companion; AIDR stays markdown-first |
| IBIS, QOC, DRL, REMAP | Classical issue/argument/criteria structuring research | Conceptual ancestors for modeling positions and objections |

## Multi-model councils and juries (adjacent products)

These prove demand for inter-model disagreement but none produces a portable governance artifact; disagreement lives in a product UI or an API response and evaporates.

| Project | What it is | Gap AIDR fills |
|---|---|---|
| [Council AI](https://council-ai.app/) | Hosted multi-provider council (27+ models), consensus scoring, MCP server | Hosted, ephemeral; no file, no arbitration record |
| Perplexity Model Council | Three models in parallel, synthesis highlights agreement and disagreement | Product feature; output is a chat answer |
| [llmcouncil.ai](https://llmcouncil.ai/) | Independent multi-model answers, peer review, visible disagreement, final verdict | Verdict is model-synthesized, not human-arbitrated; no durable record |
| [Karpathy llm-council](https://github.com/karpathy/llm-council) | OSS prototype: council answers, anonymous peer ranking, chairman synthesis | Prototype pattern; same gaps, and chairman is a model, not a human |
| Council Mode (arXiv 2604.02923) | Research: heterogeneous parallel experts, synthesis enumerating consensus, disagreements, unique findings | Research architecture; AIDR is the artifact such systems could emit |
| Replacing Judges with Juries (Cohere) and multiagent debate literature | Evaluation research using model panels | Aggregate judgment is the output; disagreement is internal |

## Execution orchestrators

Execution-layer tools mechanically verify what ran and whether checks passed. AIDR records who held positions, who dissented, and who decided. The two audit trails are complementary.

| Project | What it is | Relationship to AIDR |
|---|---|---|
| [Ringer](https://github.com/NateBJones-Projects/ringer) | Parallel AI-agent swarm orchestrator. A manifest routes tasks to configurable engines, runs each worker in its own task directory, accepts only an executed check with exit code 0 as proof of success, retries a failure once with failure context, and records attempts in an evaluation log | Ringer can gather separate position files and mechanically run `aidr-assemble` plus `aidr-lint`; AIDR preserves the resulting positions and human arbitration. Ringer proves execution outcomes, while AIDR preserves decision authority and dissent. The worked integration is in [RECIPES.md](RECIPES.md#worked-example-a-ringer-swarm) |

## Code review tools

CodeRabbit, Qodo/PR-Agent, Greptile, Ellipsis, and Copilot code review are single-model or single-provider per repo as of mid-2026. None runs heterogeneous model families on the same diff and surfaces inter-model disagreement as the product. That gap is the target of the planned AIDR GitHub Action (see the roadmap in INTENT.md).

## Governance and audit standards

- FINOS AIR requires human approval before agent actions and detailed audit logging in financial services; a normative hook AIDR conformance claims can cite, and a candidate contribution venue.
- MCP governance today is gateways, registries, and policy layers (MCPManager, Tyk guidance). No MCP server records positions, objections, and arbitration; that gap is the target of the planned AIDR MCP server.
- No project was found using git commit trailers or git notes for AI decision provenance. Open space.

## Contribute-over-compete posture

- AgDR: interop issue [#8](https://github.com/me2resh/agent-decision-record/issues/8) opened 2026-07-02, proposing cross-links and compatible overlapping frontmatter keys. Credit in SPEC.md section 9 is complete.
- ADR org (adr.github.io): once AIDR is stable, propose a listing alongside MADR and DRF as a related format.
- FINOS AIR: map AIDR conformance claims (human-arbitrated, dissent-preserved) to AIR mitigation controls and propose AIDR as an evidence format.
