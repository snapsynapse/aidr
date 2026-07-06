# Conformance Report

Report date: 2026-07-05
Spec version: `0.1.0` (ratified 2026-07-02, AIDR-0002)

## Claims

A conforming AIDR file may earn three claims, defined in SPEC.md section 7:

| Claim | Requirement |
|---|---|
| `independent-positions` | Two or more positions with distinct `provider` values, recorded before arbitration |
| `dissent-preserved` | An `oppose`/`alternative` position or an objection exists, and the Arbitration prose addresses it |
| `human-arbitrated` | `status` is `arbitrated` and the Arbitration section satisfies SPEC.md section 5.5 |

Claims are verifiable by any party from the file alone. This report is informational; conformance is defined by SPEC.md, not by this document or the reference linter.

The reference linter checks structural prerequisites for conformance and claim eligibility. It cannot prove semantic facts such as whether Arbitration prose adequately addresses every objection; those remain human review responsibilities.

## Fixture Coverage

| Fixture | Status | Claims earned |
|---|---|---|
| `templates/AIDR-0000-template.md` | template | `independent-positions`, `dissent-preserved`, `human-arbitrated` |
| `examples/AIDR-0001-spin-out-aidr-from-turnfile.md` | arbitrated | `human-arbitrated` |
| `decisions/AIDR-0002-ratify-spec-v0.1.0.md` | arbitrated | `independent-positions`, `human-arbitrated` |
| `decisions/AIDR-0004-aidr-skill-distribution-home.md` | arbitrated | `human-arbitrated` |

`AIDR-0001` earns only `human-arbitrated`: it was arbitrated with a single position, so it correctly does not earn `independent-positions`, and no dissent was recorded, so it correctly does not earn `dissent-preserved`.

`AIDR-0002` earns `independent-positions` (three positions from distinct providers: Anthropic, OpenAI, Google, all recorded before arbitration) and `human-arbitrated`. It does not earn `dissent-preserved`: all three positions recommended and no objection was filed, so there is no dissent to preserve.

`AIDR-0004` earns only `human-arbitrated`: a second provider position was requested but that agent declared itself contaminated, and arbitration arrived first; the record honestly carries a single position, like `AIDR-0001`.

## Local Verification
```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/
node tests/run.mjs
```

The first command lints the shipped records. The second runs the conformance suite
(`tests/README.md`), which pins the reference linter to SPEC.md: every invalid fixture
must be rejected on its specific rule, and every valid record must earn exactly its
claim set. Suite last run 2026-07-05: 19/19 checks passed.

CI runs these same checks on pushes to `main` and on pull requests.
