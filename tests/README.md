# AIDR conformance suite

A conformance suite for the reference linter (`tools/aidr-lint.mjs`). It runs the
linter as shipped and checks two things the everyday `PASS` output cannot:

1. Every invalid record is rejected on its specific rule (not just rejected somehow).
2. Every valid record earns exactly the claim set it should, no more, no fewer.

The linter backs all three conformance claims in SPEC.md section 7, so a checker that
was only ever run against passing files is untested where it matters. This suite closes
that gap.

## Run

```bash
node tests/run.mjs
```

Exit 0 when every check passes, 1 otherwise. Zero dependencies (Node built-ins only).

## Layout

- `fixtures/invalid/` — one record per error branch in the linter. Each MUST fail, and
  its filename names the rule under test. `AIDR-99-bad-id.md` deliberately carries a
  malformed id; its filename matches that id so only the id-format rule fires.
- `fixtures/valid/` — purpose-built records that MUST pass with a stated claim set.
- The suite also re-checks the three real records in the repo (`examples/`,
  `templates/`, `decisions/`) as a regression guard.

## Adding a case

When you add or change a rule in `aidr-lint.mjs`, add a fixture here in the same change:
a minimal record that isolates the rule, plus a row in the `invalid` or `valid` table in
`run.mjs`. Conformance is defined by SPEC.md; this suite pins the reference tool to it.
