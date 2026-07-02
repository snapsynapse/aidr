# Contributing

AIDR is a small specification plus a zero-dependency reference linter. Contributions should keep both small.

## Development

Fast path:
```bash
make check
```

Validate any change to the spec, template, or examples:
```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/
```

Run the conformance suite, which checks the linter against known-invalid and known-valid
records (see `tests/README.md`):
```bash
node tests/run.mjs
```

If you add or change a rule in `tools/aidr-lint.mjs`, add a matching fixture under
`tests/fixtures/` in the same change.

## Change Rules

- One decision, one file. Do not propose session state, task tracking, or transcripts inside the format.
- The linter stays dependency-free. Do not add a `package.json` or third-party import to `tools/`.
- Dissent is never deleted. Records are superseded, not rewritten.
- Arbitration is human. No pull request may add or edit an Arbitration section on behalf of an agent.
- Vendor-neutral. No field, tool, or example may require a specific model provider.
- Once SPEC.md reaches `status: ratified`, section names, frontmatter keys, and claim names are frozen API. Propose additive optional fields only, and expect a Maintainer decision before merge.

## Authoring a decision record

A record is the single source of truth for its own decision. By design AIDR has no mailbox, no session log, and no side-channel: one decision, one file. Every position therefore lives inside the record file itself. This is the deliberate difference from a full session protocol like Turnfile, which keeps positions in a separate coordination layer.

- Author your position directly in the record's `## Positions` section, in place. If a side-channel (chat, mailbox, issue) is used to coordinate, it is not the record: a position is not logged until it lands in the file.
- Form your position before reading the others where practical. If you formed it after reading another position, say so in its prose (SPEC section 5.3).
- Author your own position directly and unaltered. No participant may enter, transcribe, paraphrase, or rewrite another participant's position on its behalf. One author handling another's substantive work destroys the provenance the record exists to preserve.
- Open question, under Maintainer review: whether an agent may apply purely mechanical conformance fixes to a record's metadata (frontmatter keys, status flags) without touching any authored content or decision, or whether even that must be flagged to the author. Until decided, when in doubt flag it to the author rather than fix it.
- If a participant cannot reach the repository, resolve access (grant write access, or bring the record to where it can write) so it authors directly. Do not work around it by transcribing.
- Only the human arbiter writes the Arbitration section, directly and in their own words (see Change Rules).
- Records live in `decisions/` (SPEC section 3); use one location per repository.

## Pull Request Checklist

- Linter passes: `node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/`
- Conformance suite passes: `node tests/run.mjs`
- Changes to SPEC.md normative text are called out in the PR description; expect a Maintainer decision before merge.
- CHANGELOG.md entry added for user-visible changes.
