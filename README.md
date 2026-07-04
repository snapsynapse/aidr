# AI Decision Records (AIDR)

**Who objected before we acted, and who had authority to resolve it?**

An AIDR is one markdown file recording one consequential decision made with AI agents: the question, each agent's independent position, objections, and the human arbitration that resolved them. Like an ADR, but for decisions where models hold positions and a human holds authority.

No runtime. No service. No protocol to learn. Copy one template, fill it in when a decision matters.

## Who this is for

Teams making high-consequence decisions with AI agents — architecture calls, release gates, security-relevant changes, public claims — who will later need to reconstruct who objected before acting and who held the authority to resolve it.

## What problem it solves

Multi-model tools increasingly surface where models disagree, then the disagreement evaporates into a chat answer; execution logs record what ran, not who dissented or who decided. AIDR captures independent agent positions, preserved dissent, and required human arbitration in one plain-text file that survives tool changes.

## Canonical URL

https://aidr.work/

## Adopt in 60 seconds

```bash
mkdir -p decisions
cp templates/AIDR-0000-template.md decisions/AIDR-0001-your-decision.md
# in the new file, set the id: field to AIDR-0001 so it matches the filename
node tools/aidr-lint.mjs decisions/
```

The linter is optional. It uses only Node.js built-ins and is tested on Node.js 20 in CI.

## Why

Multi-model tools (councils, juries, AI code review) increasingly show you where models disagree, then the disagreement evaporates into a chat answer. Execution logs tell you what ran. Neither answers the audit question that matters for high-consequence work: who objected before we acted, and who decided. AIDR makes that answer a plain file in your repo.

## Quick start

1. Copy [templates/AIDR-0000-template.md](templates/AIDR-0000-template.md) to `decisions/AIDR-0001-your-decision.md`, and set the `id` field in the new file to `AIDR-0001` so it matches the filename.
2. Have each agent (ideally from different providers) write its position independently.
3. Record objections. Never delete them.
4. The human arbiter writes the Arbitration section, addressing every objection.
5. Optionally verify: `node tools/aidr-lint.mjs decisions/`

A conforming record can carry three verifiable claims, checkable by anyone from the file alone:

- `independent-positions`: two or more positions from distinct providers, recorded before arbitration.
- `dissent-preserved`: disagreement exists and the arbitration addresses it.
- `human-arbitrated`: a human, not a model, made and signed the decision.

## Documents

| Document | Purpose |
|---|---|
| [SPEC.md](SPEC.md) | Normative format specification |
| [templates/AIDR-0000-template.md](templates/AIDR-0000-template.md) | Copy-and-fill template (lints clean, shows all claims) |
| [examples/AIDR-0001-spin-out-aidr-from-turnfile.md](examples/AIDR-0001-spin-out-aidr-from-turnfile.md) | Real record: the decision to create this project, arbitrated 2026-07-02 (accepted as drafted) |
| [decisions/AIDR-0002-ratify-spec-v0.1.0.md](decisions/AIDR-0002-ratify-spec-v0.1.0.md) | Real multi-model record: ratifying this spec, independent positions from Anthropic, OpenAI, and Google, arbitrated 2026-07-02 |
| [PRIOR_ART.md](PRIOR_ART.md) | Survey of adjacent work and the gap AIDR fills |
| [INTENT.md](INTENT.md) | Where this project is going |
| [CONFORMANCE.md](CONFORMANCE.md) | Claim definitions and current fixture coverage |
| [CHANGELOG.md](CHANGELOG.md) | Notable changes, Keep a Changelog format |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to propose changes |
| [SECURITY.md](SECURITY.md) | How to report a vulnerability |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Contribution conduct expectations |
| [SUPPORT.md](SUPPORT.md) | Where to ask questions or report issues |
| [CITATION.cff](CITATION.cff) | Citation metadata |
| [assistant-guide.txt](assistant-guide.txt) | Plain-text install guide for AI agents (GuideCheck Level 2) |
| [tools/aidr-lint.mjs](tools/aidr-lint.mjs) | Reference linter, zero dependencies |
| [tests/](tests/) | Conformance suite: `node tests/run.mjs` pins the linter to SPEC.md (invalid + valid fixtures) |

## Verify

```bash
make check
```

Equivalent commands:

```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/
node tests/run.mjs
```

## When to use AIDR

Use it when a decision involves AI positions and someone will later need to reconstruct why it was made: architecture calls, release gates, security-relevant changes, public claims. Skip it for routine work; a decision record nobody needed is noise.

Need session-scale governance (multiple agents working over time, mailboxes, turn coordination, ownership)? That is [Turnfile](https://turnfile.work/), the full protocol this format distills. AIDR is Turnfile's concept at minimum viable size: one decision, one file.

## Relationship to AgDR

[Agent Decision Records (AgDR)](https://github.com/me2resh/agent-decision-record) documents decisions an AI coding agent makes during development. AIDR is complementary: it covers decisions with multiple independent agent positions, first-class dissent, and required human arbitration. See [PRIOR_ART.md](PRIOR_ART.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Changes to SPEC.md normative text require a Maintainer decision.

## License

Code: Apache-2.0 ([LICENSE](LICENSE)). Specification and documentation prose: CC BY 4.0 ([LICENSE-SPEC](LICENSE-SPEC)).

## About

AIDR is a [PAICE.work](https://paice.work/) project, distilled from the [Turnfile](https://turnfile.work/) protocol. PAICE.work PBC is a public benefit corporation building infrastructure for productive collaboration between humans and autonomous agents. A portable, human-arbitrated record of where AI agents disagreed before a decision is a natural expression of that mission.
