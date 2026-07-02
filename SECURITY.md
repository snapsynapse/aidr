# Security Policy

## Supported Versions

AIDR is pre-1.0. Security-relevant fixes are made against the most recent draft on `main`.

## Reporting a Vulnerability

Report suspected vulnerabilities privately by email to `info@snapsynapse.com`. Include:

- Affected file: SPEC.md, tools/aidr-lint.mjs, or a specific record
- Reproduction steps
- Expected and observed behavior
- Any known impact

Please do not open a public issue for exploitable vulnerabilities before disclosure coordination.

## Security Notes

AIDR is a plain-markdown record format plus a zero-dependency reference linter. It is not an authorization mechanism, secrets store, or execution runtime, and it does not grant or revoke access to anything. Repository access control is the actual security boundary for who can write or arbitrate a record. `tools/aidr-lint.mjs` only reads the files it is pointed at.
