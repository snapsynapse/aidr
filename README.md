# AI Decision Records (AIDR)

**Keep the decision after the chat is gone.**

An AIDR is one Markdown file containing the question, each participant's position, any objections, and the human's decision. No runtime. No service. No protocol to learn. Here is a completed record about where to keep a shared agent skill.

## A completed record

Excerpt from a real completed record, [AIDR-0004](decisions/AIDR-0004-aidr-skill-distribution-home.md):

> **Question:** Where is the canonical, distributable home for the AIDR skill: a tracked directory in this repo (requires a gitignore exception), the portfolio skills monorepo at `~/Git/skills/aidr/`, or local-only installs per repo?
>
> **Position (fable5, Anthropic, recommend):** Track it in this repo under a new `skill/` directory (singular, avoiding the gitignored `skills` pattern), with the monorepo carrying a copy only if portfolio tooling needs it.
>
> **Decision (Sam Rogers, 2026-07-05):** Track the skill in this repo as the canonical home; the skills monorepo links back to it (symlink direction reversed from the recommendation's optional copy), and other agents consume the same skill file rather than maintaining their own.

| What a reader can recover | AIDR-0004 evidence |
|---|---|
| Question | Where should the canonical, distributable AIDR skill live: this repo, the skills monorepo, or local-only installs? |
| Recorded position | One participant recommends keeping it with the format and spec, with an optional monorepo copy |
| Human decision | Keep the canonical skill in this repo; the monorepo links to it, and other agents use the same file |
| Decision authority and date | Sam Rogers; 2026-07-05 |
| State | `arbitrated` |
| Lint result (`--strict`) | `PASS [human-arbitrated]`; no `independent-positions` or `dissent-preserved` claim |

The record carries one position and no objections, and it says why: a second provider had already read the record and declared itself contaminated, and the arbitration arrived first. The decision line was transcribed at the arbiter's direction. The record's historical `skill/` path predates the current skill home, [`skills/aidr/`](skills/aidr/SKILL.md).

Lint checks structure and claim prerequisites. It does not authenticate a human, prove model isolation, or establish that the decision was wise.

For a record with positions from three providers (Anthropic, Google, OpenAI), see [AIDR-0002](decisions/AIDR-0002-ratify-spec-v0.1.0.md), which lints `PASS [independent-positions, human-arbitrated]`. Provider labels alone do not prove the positions were formed independently; read each position's disclosure.

## Try it

The format needs no runtime or service. Node.js 20 or later is needed only for the optional linter. There is no npm install, package dependency, hosted validator, or required model provider.

From a scratch directory where `aidr-trial` does not already exist, get the released source. This contacts GitHub. Git reports a detached HEAD at the tag; that is expected.

Literal
```bash
git clone --branch v0.3.0 --depth 1 https://github.com/snapsynapse/aidr.git aidr-trial
cd aidr-trial
```

Open `decisions/AIDR-0004-aidr-skill-distribution-home.md` in a text editor, then optionally lint it.

Literal
```bash
node tools/aidr-lint.mjs --strict decisions/AIDR-0004-aidr-skill-distribution-home.md
```

Expected: `PASS ... [human-arbitrated]`, exit 0.

### Open a record for your own decision

Pick one real, unresolved question in your own project. Run these commands from the `aidr-trial` checkout, targeting your project, not this repository's `decisions/` directory. Record IDs are scoped to each repository: use the next unused number in your project's sequence, and never reuse a gap.

Replace: DECISIONS_DIR -> absolute path to your project's decisions directory.
Replace: RECORD_FILENAME -> an unused filename of the form AIDR-NNNN-short-slug.md, using the next available ID in your project.
Customize
```bash
mkdir -p 'DECISIONS_DIR'
cp -n templates/AIDR-0000-template.md 'DECISIONS_DIR/RECORD_FILENAME'
```

`cp -n` leaves an existing file untouched, so confirm the new file was created. The template is an illustrative arbitrated specimen. In the new copy:

1. Set `id` to match the filename, a real title, today's date, the actual human `arbiter`, and `status: open`. Remove the sample `decided` field.
2. Remove the template's sample positions, objections, and arbitration. Leave Arbitration as an empty heading.
3. Write the Context and one decidable Question.
4. Have at least one real participant, human or agent, write its own position with real metadata. Disclose if a position was formed after reading other positions. A paid multi-provider sweep is not required.
5. Record objections if they arise. Never delete them.

Then lint the new file.

Replace: RECORD_PATH -> absolute path to your new record.
Customize
```bash
node tools/aidr-lint.mjs --strict 'RECORD_PATH'
```

A one-position open record can pass with no named claims. That is a useful first result: the question and one real position survive outside the chat, and authority stays with the human. An empty scaffold fails, and strict mode also fails leftover template placeholder text.

Arbitration is a separate step that only the named human performs: they write it, or dictate it for attributed transcription, then set `decided` and `status: arbitrated`. Agents must not author arbitration, invent dissent, or resolve objections on the human's behalf.

## Who this is for

Teams making high-consequence decisions with AI agents (architecture calls, release gates, security-relevant changes, public claims) who will later need to reconstruct who objected before acting and who held the authority to resolve it.

## What problem it solves

Multi-model tools increasingly surface where models disagree, then the disagreement evaporates into a chat answer. Execution logs record what ran, not who dissented or who decided. AIDR captures independent agent positions, preserved dissent, and required human arbitration in one plain-text file that survives tool changes.

Canonical URL: https://aidr.work/

## How a record works

- One decision, one file. Required frontmatter, ordered sections, and an `open`, `arbitrated`, or `superseded` lifecycle. See [SPEC.md](SPEC.md).
- Positions are written independently, before arbitration, and objections are never deleted.
- Only a human arbitrates.

A conforming record can carry three claims, checkable by anyone from the file alone:

- `independent-positions`: two or more positions from distinct providers, recorded before arbitration.
- `dissent-preserved`: disagreement exists and the arbitration addresses it. A record with no objections does not earn this claim.
- `human-arbitrated`: a human, not a model, made and signed the decision.

For recurring decisions, [RECIPES.md](RECIPES.md) describes an optional position sweep: fan a brief to several providers, assemble the files with `tools/aidr-assemble.mjs`, and lint. It never produces a verdict on its own.

## Why

Multi-model tools (councils, juries, AI code review) show where models disagree, then the disagreement evaporates into a chat answer. Execution logs tell you what ran. Neither answers the audit question that matters for high-consequence work: who objected before we acted, and who decided. AIDR makes that answer a plain file in your repo. [WHY.md](WHY.md) explains why AIDR refuses model-synthesized verdicts.

## Documents

| Document | Purpose |
|---|---|
| [SPEC.md](SPEC.md) | Normative format specification |
| [templates/AIDR-0000-template.md](templates/AIDR-0000-template.md) | Copy-and-fill template (lints clean, shows all claims) |
| [examples/AIDR-0001-spin-out-aidr-from-turnfile.md](examples/AIDR-0001-spin-out-aidr-from-turnfile.md) | Real record: the decision to create this project, arbitrated 2026-07-02 (accepted as drafted) |
| [decisions/AIDR-0002-ratify-spec-v0.1.0.md](decisions/AIDR-0002-ratify-spec-v0.1.0.md) | Real multi-model record: ratifying this spec, independent positions from Anthropic, OpenAI, and Google, arbitrated 2026-07-02 |
| [RECIPES.md](RECIPES.md) | How to produce records mechanically: the runner-agnostic position sweep and worked Ringer example |
| [WHY.md](WHY.md) | Why AIDR refuses model-synthesized verdicts |
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
| [skills/aidr/SKILL.md](skills/aidr/SKILL.md) | Agent-agnostic skill teaching the record mechanics; never authors arbitration |
| [tools/aidr-lint.mjs](tools/aidr-lint.mjs) | Reference linter, zero dependencies |
| [tools/aidr-assemble.mjs](tools/aidr-assemble.mjs) | Merges independent position files into one open record, zero dependencies |
| [tests/](tests/) | Conformance suite: `node tests/run.mjs` pins the linter to SPEC.md (invalid + valid fixtures) |

## Verify

Literal
```bash
make check
```

Equivalent commands:

Literal
```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/
node tests/run.mjs
```

Add `--strict` to have the linter also fail records that still contain template
placeholder text. Useful right after copying the template; see
[CONFORMANCE.md](CONFORMANCE.md) for why this is an authoring aid rather than a
conformance rule.

Literal
```bash
node tools/aidr-lint.mjs --strict decisions/
```

## When to use AIDR

Use it when a decision involves AI positions and someone will later need to reconstruct why it was made: architecture calls, release gates, security-relevant changes, public claims. Skip it for routine work; a decision record nobody needed is noise.

Need session-scale governance (multiple agents working over time, mailboxes, turn coordination, ownership)? That is [Turnfile](https://turnfile.work/), the full protocol this format distills. AIDR is Turnfile's concept at minimum viable size: one decision, one file. Need to verify agent-produced changes before merging them? That is a separate tool, [Harnessie](https://harnessie.com/). AIDR is useful on its own; adopting it does not require either.

## Relationship to AgDR

[Agent Decision Records (AgDR)](https://github.com/me2resh/agent-decision-record) documents decisions an AI coding agent makes during development. AIDR is complementary: it covers decisions with multiple independent agent positions, first-class dissent, and required human arbitration. See [PRIOR_ART.md](PRIOR_ART.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Changes to SPEC.md normative text require a Maintainer decision.

## License

Code: Apache-2.0 ([LICENSE](LICENSE)). Specification and documentation prose: CC BY 4.0 ([LICENSE-SPEC](LICENSE-SPEC)).

## About

AIDR is a [PAICE.work](https://paice.work/) project, distilled from the [Turnfile](https://turnfile.work/) protocol. PAICE.work PBC is a public benefit corporation building infrastructure for productive collaboration between humans and autonomous agents. A portable, human-arbitrated record of where AI agents disagreed before a decision is a natural expression of that mission.
