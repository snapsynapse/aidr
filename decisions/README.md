# decisions/

This directory holds the AIDR records governing this repository. It is also the first
place a visitor looks for real examples of the format, so this note explains what is
here and why the numbering reads the way it does.

## What is here

| Record | Status | What it decided |
|---|---|---|
| [AIDR-0002](AIDR-0002-ratify-spec-v0.1.0.md) | arbitrated | Ratified SPEC.md v0.1.0. Three independent positions, from Anthropic, OpenAI and Google. |
| [AIDR-0003](AIDR-0003-ship-a-split-decision-recipe-for-ringer.md) | arbitrated | Ship the position-sweep recipe as AIDR's first delivery surface, with Ringer as the worked example. |
| [AIDR-0004](AIDR-0004-aidr-skill-distribution-home.md) | arbitrated | The canonical home of the agent skill is `skills/aidr/` in this repo, not a copy per harness. |

## Why AIDR-0001 is not here

[AIDR-0001](../examples/AIDR-0001-spin-out-aidr-from-turnfile.md) records the decision to
create this project, made before this repository governed itself. It lives in
`examples/` because it is presented as a worked example of the format rather than as one
of this repository's own governance records. It is a real, arbitrated record either way,
and the conformance suite lints it alongside the records here.

## Why the numbering has gaps

Numbers are allocated when a record is opened and are never reused, so a gap means a
number was allocated to a decision that was not ultimately recorded here. The format is
append-only: records are superseded, never deleted or renumbered. A gap is therefore
expected behavior, not a missing file.

`AIDR-0005` was never written. Work in progress may also exist outside version control
before it is ready to track, so the highest number here is not necessarily the highest
number allocated.

## Record IDs are repository-scoped

An AIDR ID identifies a record within one repository. It is not globally unique, and
several repositories in this portfolio maintain their own independent `AIDR-NNNN`
sequences. When referring to a record in another repository, qualify it: write
`harnessie#AIDR-0002`, not a bare `AIDR-0002`. See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Adding a record

Copy the template, take the next unused number, and follow the steps in the
[README](../README.md). Only the human named in the `arbiter` field may write the
Arbitration section. That is a hard rule of the format, not a style preference.
