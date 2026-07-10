# Recipes

How to produce AIDR records mechanically. The spec stays small; recipes live here. Every recipe gathers positions and emits one record; a recipe never executes actions on the decision it records.

## Position sweep

One decision question, fanned out to N models from distinct providers, each answering in isolation from an identical brief; a zero-dependency assemble step merges the answers into one open record; `aidr-lint` verifies the result. This is the mechanical path to the `independent-positions` claim: two or more positions from distinct declared providers, recorded before any arbitration.

The sweep is runner-agnostic. Any way of invoking N models works: a batch orchestrator, a CI matrix, a shell loop over provider CLIs, or N terminal windows by hand. The recipe only fixes the inputs each participant receives and the shape of what they write back.

### Layout

```
sweep/
  brief.md                 the decision brief; the only context a participant receives
  format-instructions.md   the Position block contract participants must follow
  positions/
    anthropic.md           one flat .md file per participant
    openai.md
decisions/                 existing directory; the assemble tool writes into it
```

Flat files, one per participant: `aidr-assemble.mjs` reads the direct `.md` children of `--positions` and does not recurse. If your runner writes each output in its own subdirectory, copy the files up to `positions/<provider>.md` before assembling.

### The brief

The brief must carry two non-empty level-2 sections, `## Context` and `## Question` (SPEC.md 5.1, 5.2); other content is ignored by the assemble tool. Put `arbiter: Your Name` in the brief's YAML frontmatter, or pass `--arbiter` at assemble time; the tool hard-errors without one. Optional `tags:` frontmatter is copied to the record.

Keep the brief self-contained. It is the only context a participant receives; identical input per participant is what makes the positions comparable.

### The format contract

Give every participant the same instructions:

```markdown
# Position block format

Write exactly one Position block, nothing else, in this shape:

### Position: <your agent label>

- agent: <same label as the heading>
- model: <your model name>
- provider: <anthropic | openai | google | ...>
- stance: <recommend | oppose | alternative | abstain>
- summary: <one sentence>

<Your reasoning as prose paragraphs. Take a genuine stance on the brief's
Question. If you disagree with the premise or see a better alternative,
say so plainly; dissent is first-class, not failure. If you hold an
objection to a specific alternative, state it as inline prose within
your reasoning (a paragraph beginning "Objection:").>

Rules: the heading label must equal the agent value. All five metadata
keys are required. Do not write an Arbitration section. Do not read any
other participant's file.
```

### Independence is behavioral unless your runner enforces it

Be honest about what the sweep proves. `aidr-lint`'s `independent-positions` claim verifies that two or more distinct *declared* `provider` values recorded positions before arbitration. It cannot see whether participants ran in isolation, whether two engine labels resolve to genuinely different models, or whether one participant peeked at another's file. Isolation is your runner's job and, in most runners, a convention plus an instruction rather than an enforced barrier. State in the record's Evidence section what your runner actually guaranteed, and link the runner's log (if it has one) as evidence of parallel independent generation.

A participant that fails mid-sweep is not fatal: drop it and continue. Two surviving providers still satisfy the claim.

### Assemble and lint

```bash
node tools/aidr-assemble.mjs \
  --id AIDR-0004 \
  --title "Your decision title" \
  --brief sweep/brief.md \
  --positions sweep/positions \
  --out decisions
node tools/aidr-lint.mjs decisions/AIDR-0004-your-decision-title.md
```

- Required flags: `--id`, `--title`, `--brief`, `--positions`, `--out`. Optional: `--date`, `--arbiter`, `--force`.
- `--out` is an existing directory, not a filename; the tool derives `<id>-<slug>.md` from the lowercased title. It does not `mkdir`, and refuses to overwrite without `--force`.
- The record's `date` defaults to the newest input mtime as a UTC calendar date; pass `--date YYYY-MM-DD` to pin it.
- Exit codes: 0 success, 1 malformed input, 2 usage error.

The assemble step enforces the format contract: all five metadata keys, heading label equal to `agent`, exactly one Position block per file, no duplicate `agent` labels, no level-2 headings inside a block. A participant file that dodged your runner's checks still gets rejected here rather than landing silently in the record. Expected lint output with two or more distinct providers:

```
PASS decisions/AIDR-0004-your-decision-title.md [independent-positions]
```

To gate a pipeline on the claim rather than bare conformance:

```bash
node tools/aidr-lint.mjs decisions/AIDR-0004-your-decision-title.md | grep -q 'PASS.*independent-positions'
```

An `### Objection: <label> to <reference>` heading after a participant's Position block is lifted into the record's Objections section in filename order; inline-prose objections stay inside the position. The bundled contract above asks for inline prose; switch both together if you want heading-style routing.

### Arbitration

The record leaves the sweep with `status: open` and an empty Arbitration section. That is correct and required: the linter rejects an open record with completed arbitration, which is how the sweep proves no arbitration happened before or during position gathering.

A human then arbitrates: fills the Arbitration metadata (`decided_by`, `date`, `decision`) with prose addressing every objection, flips `status` to `arbitrated`, and adds the `decided:` frontmatter field. On re-lint:

```
PASS decisions/AIDR-0004-your-decision-title.md [independent-positions, human-arbitrated]
```

If any position opposed or offered an alternative, or an objection was filed, `dissent-preserved` lights too. The linter checks presence, not adequacy; whether the prose genuinely answers each objection stays a human responsibility.

## Worked example: a Ringer swarm

[Ringer](https://github.com/NateBJones-Projects/ringer) is a batch swarm orchestrator whose per-task `engine` field routes each task to a different provider CLI and whose isolated task directories keep workers from reading each other's output. That maps directly onto the sweep: one position task per provider, isolation by construction rather than convention.

One position task per engine, each receiving the identical brief and format contract:

```json
{
  "key": "position-anthropic",
  "engine": "claude",
  "spec": "Read brief.md and format-instructions.md (absolute paths). Write exactly one Position block to position.md in your task directory. Do not read any other participant's output.",
  "check": "grep -q '^### Position: ' position.md",
  "expect_files": ["position.md"]
}
```

Duplicate the task per engine (`codex`, `opencode`, ...). Use absolute paths in the spec: each worker's cwd is its own task directory.

Ringer tasks have no ordering, so assemble-and-lint cannot be a task that waits on the others. Run it as a second phase after the swarm exits: copy each taskdir's `position.md` up to `positions/<provider>.md` (the assemble tool reads flat files, it does not recurse), then

```bash
node tools/aidr-assemble.mjs --id AIDR-NNNN --title "..." --brief brief.md --positions positions/ --out decisions/
node tools/aidr-lint.mjs decisions/AIDR-NNNN-*.md | grep -q 'PASS.*independent-positions'
```

or make the second phase a one-task Ringer manifest whose `check` is exactly that lint gate: exit code zero is then the swarm's own evidence that two or more distinct providers recorded positions before any arbitration existed.

For the isolation statement the Evidence section should carry (see above): Ringer gives you isolated task directories and per-task engine routing mechanically, and its JSONL run log (`worker_engine`, `duration_ms`, `worker_tokens` per attempt) is linkable evidence of parallel independent generation. Whether two engines resolve to genuinely different models remains a declaration; Ringer's model-identity registry helps but does not prove it.

## Scope

Session-scale governance (many decisions, turn coordination, ownership) is Turnfile, https://turnfile.work/. A recipe here is the one-decision case: positions in, one record out, a human decides.
