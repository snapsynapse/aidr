---
id: AIDR-0100
title: Valid full record
status: arbitrated
date: 2026-07-02
decided: 2026-07-02
arbiter: Test Human
tags: [test, fixture]
---
# AIDR-0100: Valid full record

## Context

A self-contained fixture that exercises every conformance claim: two independent
providers, preserved dissent, and a human arbitration that addresses the objection.

## Question

Should the reference linter accept this record and earn all three claims?

## Positions

### Position: claude

- agent: claude
- model: claude-fable-5
- provider: Anthropic
- stance: recommend
- summary: Accept it.

### Position: codex

- agent: codex
- model: gpt-5
- provider: OpenAI
- stance: oppose
- summary: Reject it.

## Objections

### Objection: codex to claude's position

Concrete failure mode: the record could be appended after arbitration and backdated.

## Arbitration

- decided_by: Test Human
- date: 2026-07-02
- decision: Accept the record.

Addressing codex's objection: deferred to a future spec revision that documents
version-control corroboration for temporal claims. Recorded, not dismissed.
