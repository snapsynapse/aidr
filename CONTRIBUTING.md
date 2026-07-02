# Contributing

AIDR is a small specification plus a zero-dependency reference linter. Contributions should keep both small.

## Development

Validate any change to the spec, template, or examples:
```bash
node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md
```

## Change Rules

- One decision, one file. Do not propose session state, task tracking, or transcripts inside the format.
- The linter stays dependency-free. Do not add a `package.json` or third-party import to `tools/`.
- Dissent is never deleted. Records are superseded, not rewritten.
- Arbitration is human. No pull request may add or edit an Arbitration section on behalf of an agent.
- Vendor-neutral. No field, tool, or example may require a specific model provider.
- Once SPEC.md reaches `status: ratified`, section names, frontmatter keys, and claim names are frozen API. Propose additive optional fields only, and expect a Maintainer decision before merge.

## Pull Request Checklist

- Linter passes: `node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md`
- Changes to SPEC.md normative text are called out in the PR description; expect a Maintainer decision before merge.
- CHANGELOG.md entry added for user-visible changes.
