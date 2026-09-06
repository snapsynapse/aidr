# Delivery-surface design backlog

Status: deferred design input, reconciled 2026-09-05 from the processed July 1 execution handoff. INTENT.md owns sequencing and entry gates. This document authorizes no implementation or publication.

## MCP server

Enter only after format stability and real arbitrated dogfood in two other PAICE repositories, with at least one record earning independent-positions. Stability is met; dogfood remains pending.

Proposed location: mcp/, Node.js, stdio transport, MCP SDK. Keep the existing linter dependency-free. Reuse tools/lib/aidr-core.mjs, which already exists; the old extraction task is complete.

| Tool | Contract |
|---|---|
| aidr_open | Create the next numbered open record from title, question, context, arbiter and directory; validate before saving. |
| aidr_record_position | Append a position only to an open record; reject duplicate agent labels. |
| aidr_file_objection | Append an objection only to an open record; preserve existing dissent. |
| aidr_status | Return metadata, counts, earned claims and lint results for a record or directory. |
| aidr_check_open_dissent | List open records with unresolved opposition, alternatives or objections. |
| aidr_request_arbitration | Return a human-facing summary and file link without modifying the record. |

No tool writes arbitration. Acceptance: all writes lint-pass; refusal paths and open-to-arbitrated lifecycle are tested, with human edits represented explicitly in fixtures; host setup documented for two distinct hosts; one real session exercised. Before implementation, resolve safe path boundaries, collision handling and atomic writes in an entry assessment.

## GitHub Action

Gated on a proven MCP write path and an external format adopter. Gather isolated positions from heterogeneous providers against the same PR context, render disagreements, and emit an open AIDR. Missing providers must be disclosed; enforce a bounded diff and cost policy. Never approve, request changes or merge automatically. The old proposal both prohibited pushes and suggested branch write-back: resolve that contradiction before implementation, with artifact output as the conservative proposal. Select supported runtimes and provider integrations at implementation time, not from the July examples.

Acceptance: a real PR run with two providers, readable disagreements, lint-passing output and verified cost bounds. Posting comments and invoking paid providers require separate authorization.

## Second-opinion SDK

Extract the Action fan-out only after it works and a second consumer exists. Proposed operations: gatherPositions, renderAidr and writeAidr. Positions only, never execution. Do not build a standalone SDK speculatively.

## CI governance gate

Gated on surfaces 1 through 3 producing real records. Map changed paths to required claims and linked decision evidence; fail with actionable remediation when evidence is missing. A proposed refs field requires a separate normative decision if needed. Acceptance: enforce the policy for SPEC.md changes in this repository. Preserve zero-dependency verification.
