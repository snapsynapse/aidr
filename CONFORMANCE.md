# Conformance Report

Report date: 2026-07-02
Spec version: `0.1.0-draft`

## Claims

A conforming AIDR file may earn three claims, defined in SPEC.md section 7:

| Claim | Requirement |
|---|---|
| `independent-positions` | Two or more positions with distinct `provider` values, recorded before arbitration |
| `dissent-preserved` | An `oppose`/`alternative` position or an objection exists, and the Arbitration prose addresses it |
| `human-arbitrated` | `status` is `arbitrated` and the Arbitration section satisfies SPEC.md section 5.5 |

Claims are verifiable by any party from the file alone. This report is informational; conformance is defined by SPEC.md, not by this document or the reference linter.

## Fixture Coverage

| Fixture | Status | Claims earned |
|---|---|---|
| `templates/AIDR-0000-template.md` | template | `independent-positions`, `dissent-preserved`, `human-arbitrated` |
| `examples/AIDR-0001-spin-out-aidr-from-turnfile.md` | arbitrated | `human-arbitrated` |

`AIDR-0001` earns only `human-arbitrated`: it was arbitrated with a single position, so it correctly does not earn `independent-positions`, and no dissent was recorded, so it correctly does not earn `dissent-preserved`.

## Local Verification
```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md
```

CI is not yet configured for this repository; tracked in the delivery-surface roadmap (INTENT.md).
