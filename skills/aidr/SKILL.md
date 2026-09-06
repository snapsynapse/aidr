---
name: aidr
description: Work with AI Decision Records (AIDR) in any repo with a decisions/ directory. Open a new record from the template, record an independent position, file an objection, assemble positions into a record, check lint status and earned claims, and request human arbitration. Use when the user says "open an AIDR", "record my position", "file an objection", "check the decision record", "request arbitration", or asks to document a consequential decision made with AI agents. NEVER authors arbitration.
---
# AIDR skill

AIDR (https://aidr.work/) is a one-file markdown format for consequential decisions made with AI agents: the question, each agent's independent position, objections, and human arbitration. This skill teaches the mechanics. `SPEC.md` v0.1.0 is normative; when in doubt read it.

## Hard rules (violating any is a failed task)

1. Arbitration is human. You MUST NOT author or edit an Arbitration section, or fill the `decided` frontmatter field or `decided_by` metadata. You MAY transcribe text the human arbiter explicitly dictates, and must say so in the record prose.
2. Dissent is never deleted. Never remove or rewrite a recorded position or objection. Records are superseded by new records, not edited.
3. One decision, one file. No session state, task tracking, or transcripts in the record.
4. A position claiming independence must be written before reading other positions. If you have read them, say so in the position prose.
5. Validate each populated record after every write. An empty scaffold is incomplete and cannot pass: SPEC.md requires at least one real position. Report that state honestly; never add a synthetic position to clear lint.

## File layout

- Records live in `decisions/`, named `AIDR-NNNN-kebab-title.md`. `id` frontmatter must equal the filename's `AIDR-NNNN`.
- Template: `templates/AIDR-0000-template.md` (in the aidr repo; copy it into target repos that lack one).
- Run commands from a checkout of AIDR, using absolute target paths when the adopter lives elsewhere. A standalone skill install does not include the template or tools; locate a trusted AIDR checkout first.
- Tools (zero-dependency, need only Node): `tools/aidr-lint.mjs`, `tools/aidr-assemble.mjs`.

## Operations

### Open a record

1. Find the next number: highest `AIDR-NNNN` in `decisions/` plus one.
2. Copy the template to `decisions/AIDR-NNNN-<kebab-title>.md`.
3. Set frontmatter: `id` (must match filename), `title`, `status: open`, `date` (today), `arbiter` (the human who will decide), `tags`. OMIT `decided` while open.
4. Fill Context (under 200 words, links go in Evidence) and Question (one decidable question).
5. Leave Positions/Objections with real content only as gathered; leave Arbitration as heading only, empty.
6. Once at least one real position exists, lint and require PASS. Before then, report an incomplete scaffold awaiting its first position.

### Record a position

Append under `## Positions`. Replace each value with the participant's actual metadata and prose.
Replace: AGENT_LABEL -> participant label, identical in heading and agent field
Replace: MODEL_ID -> reported model identifier
Replace: PROVIDER -> model vendor or human
Replace: STANCE -> recommend, oppose, alternative or abstain
Replace: SUMMARY -> one-sentence position summary
Replace: POSITION_PROSE -> participant-authored reasoning
Customize
```markdown
### Position: AGENT_LABEL

- agent: AGENT_LABEL
- model: MODEL_ID
- provider: PROVIDER
- stance: STANCE
- summary: SUMMARY

POSITION_PROSE
```
Refuse if `status` is not `open`. Refuse a second position for the same agent label. Two declared providers satisfy the provider-count prerequisite. Lint does not prove actual isolation or model identity; preserve process evidence.

### File an objection

Append under `## Objections`.
Replace: AGENT_LABEL -> objection author
Replace: TARGET_LABEL -> position being challenged
Replace: OBJECTION_PROSE -> concrete failure mode, contradiction or risk
Customize
```markdown
### Objection: AGENT_LABEL to Position TARGET_LABEL

OBJECTION_PROSE
```
Generic preference belongs in the position, not an objection. Refuse if status is not open.

### Assemble from independent position files

When positions were gathered in isolation, merge mechanically. The output directory must exist; the brief must name the human arbiter.
Replace: AIDR-NNNN -> unused record ID
Replace: DECISION_TITLE -> decision title
Replace: BRIEF_PATH -> path to the brief
Replace: POSITIONS_DIR -> directory containing flat participant .md files
Replace: OUTPUT_DIR -> existing destination directory
Customize
```bash
node tools/aidr-assemble.mjs --id AIDR-NNNN --title "DECISION_TITLE" --brief "BRIEF_PATH" --positions "POSITIONS_DIR" --out "OUTPUT_DIR"
```
Brief file: optional frontmatter (`arbiter`, `tags`) then `## Context` and `## Question`. Position files: one `### Position: <label>` block each, optional `### Objection:` blocks after. Emitted record is `status: open` and lint-clean.

### Check status

`node tools/aidr-lint.mjs decisions/` reports PASS/FAIL per file plus earned claims: `independent-positions` (2+ providers), `dissent-preserved` (dissent recorded and arbitration addresses it), `human-arbitrated` (status arbitrated, arbitration filled, zero errors).

### Request arbitration

When positions and objections are complete, summarize for the human arbiter: the question, each position's stance and summary, open objections, and a clickable link to the file. Then STOP. The human edits the Arbitration section, fills `decided`, and flips `status: arbitrated` themselves (or dictates text for you to transcribe, noted as such).
