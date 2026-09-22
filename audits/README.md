# audits/

Tracked current-state assessments of this repository. Filenames are date-stamped and
nothing here is rewritten as the project moves, so **read this index first**: it names
which document is current and what each one is good for. `CLAUDE.md` and `INTENT.md`
point agents at this directory as an execution packet, which only works if the pointer
is accurate.

Two rules apply to everything here:

1. An audit is a dated observation, not a standing claim. If an audit and the live
   repository disagree, the repository wins. Verify before acting on an assertion.
2. Corrections are appended or marked in place, never silently rewritten, so a reader
   can see what changed and when.

## Current

| Document | Use it for |
|---|---|
| [handoff-relevance-2026-09-05.md](handoff-relevance-2026-09-05.md) | **The execution pointer.** Disposition of every processed handoff and the current bounded work packet. Named as authoritative by `INTENT.md`. |
| [release-state-2026-09-05.json](release-state-2026-09-05.json) | Machine-readable release step state. Corrected 2026-09-22; see `correction_note`. |
| [release-readiness-2026-09-05.md](release-readiness-2026-09-05.md) | The v0.2.1 publication sequence and its prerequisites. Carries a 2026-09-22 correction at the top: push and deployment happened; tag and release did not. |

## Supporting evidence

These are appendices. They record how something was checked, and carry no open items.

| Document | Use it for |
|---|---|
| [accessibility-2026-09-05.md](accessibility-2026-09-05.md) | axe-core results for the landing pages. Self-limited: ran against local renders, not the deployment, and claims no WCAG conformance. |
| [surface-consistency-2026-09-05.md](surface-consistency-2026-09-05.md) | Cross-surface wording corrections already landed. |
| [delivery-surface-design.md](delivery-surface-design.md) | Deferred phase 2-5 surface contracts. `INTENT.md` is explicit that these are design input, not implementation authority. |

## Superseded

| Document | Why |
|---|---|
| [handoff-relevance-2026-07-21.md](handoff-relevance-2026-07-21.md) | Replaced by the 2026-09-05 audit, which states it is a dated assessment rather than the current queue. Kept as history. |

## Untracked material

Some files in this directory are deliberately not under version control: review packets
belonging to a cross-entity decision that is still open and is not part of this
repository's governance inventory. They are absent from a clean clone, which is
intentional. Do not stage them to make an inventory look complete.

This means a local `ls` of this directory can show more files than `git ls-files` does.
That is expected. Anything not listed in the tables above is untracked working material.

## Adding an audit

Date-stamp the filename, state the observation window and what was not checked, and add
a row here in the same change. An audit that nobody can place in time is worse than no
audit.
