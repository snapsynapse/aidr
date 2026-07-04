#!/usr/bin/env node
// aidr-assemble: merge independent position files into one open AIDR record (SPEC.md).
// Usage: node tools/aidr-assemble.mjs --id AIDR-NNNN --title "..." --brief <brief.md>
//        --positions <dir> --out <decisions-dir> [--date YYYY-MM-DD] [--arbiter <name>] [--force]
// Exit 0 on success, 1 on malformed input, 2 on usage errors.
// No dependencies. Conformance is defined by SPEC.md; the emitted record is
// status: open (positions gathered, Arbitration scaffolded blank) and should pass
// tools/aidr-lint.mjs as written.
//
// Brief file shape (markdown):
//   ---                        optional YAML frontmatter
//   arbiter: Your Name         required here or via --arbiter (a record needs a human arbiter)
//   tags: [a, b]               optional, copied to the record frontmatter
//   ---
//   ## Context                 required, non-empty prose (SPEC.md 5.1)
//   ## Question                required, non-empty prose (SPEC.md 5.2)
//   Any other brief content is ignored.
//
// Position file shape (one participant per .md file, merged verbatim in filename order):
//   Anything before the block (author notes, frontmatter) is ignored.
//   ### Position: <label>      exactly one per file; label must equal the agent key
//   - agent / model / provider / stance / summary metadata list, then prose (SPEC.md 5.3)
//   ### Objection: <label> to <ref>   zero or more after the position; routed into the
//   record's Objections section in the same filename order (SPEC.md 5.4)
//
// The record date comes from --date when given, otherwise from the newest mtime among
// the input files (deterministic from inputs; no ambient clock read).

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const STANCES = new Set(['recommend', 'oppose', 'alternative', 'abstain']);
const POSITION_KEYS = ['agent', 'model', 'provider', 'stance', 'summary'];
const USAGE =
  'usage: node tools/aidr-assemble.mjs --id AIDR-NNNN --title "..." --brief <brief.md> ' +
  '--positions <dir> --out <decisions-dir> [--date YYYY-MM-DD] [--arbiter <name>] [--force]';

function usage(msg) {
  console.error(`aidr-assemble: ${msg}`);
  console.error(USAGE);
  process.exit(2);
}

function fail(msg) {
  console.error(`aidr-assemble: ${msg}`);
  process.exit(1);
}

// Helpers below mirror tools/aidr-lint.mjs so both tools read the format identically.
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return fm;
}

function sectionBody(text, heading) {
  const re = new RegExp(`^## ${heading}\\s*$`, 'm');
  const m = re.exec(text);
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = rest.search(/^## /m);
  return next === -1 ? rest : rest.slice(0, next);
}

function parseMetaList(block) {
  const meta = {};
  for (const line of block.split('\n')) {
    const kv = line.match(/^- ([a-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return meta;
}

function parseArgs(argv) {
  const valueFlags = new Set(['id', 'title', 'brief', 'positions', 'out', 'date', 'arbiter']);
  const args = { force: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--force') { args.force = true; continue; }
    const name = argv[i].startsWith('--') ? argv[i].slice(2) : '';
    if (!valueFlags.has(name)) usage(`unknown argument: ${argv[i]}`);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith('--')) usage(`missing value for --${name}`);
    args[name] = value;
    i++;
  }
  for (const name of ['id', 'title', 'brief', 'positions', 'out']) {
    if (!args[name]) usage(`missing required argument: --${name}`);
  }
  return args;
}

function readBrief(path) {
  let text;
  try { text = readFileSync(path, 'utf8'); } catch { fail(`cannot read brief: ${path}`); }
  const brief = { fm: parseFrontmatter(text) ?? {} };
  for (const heading of ['Context', 'Question']) {
    const body = sectionBody(text, heading);
    if (body === null) fail(`brief missing required section: ${heading} (${path})`);
    if (!body.trim()) fail(`brief section is empty: ${heading} (${path})`);
    brief[heading.toLowerCase()] = body.trim();
  }
  return brief;
}

function readPositionFile(path) {
  let text;
  try { text = readFileSync(path, 'utf8'); } catch { fail(`cannot read position file: ${path}`); }
  const headings = [...text.matchAll(/^### (Position|Objection): (.+)$/gm)]
    .map((m) => ({ kind: m[1], name: m[2].trim(), start: m.index }));
  const posCount = headings.filter((h) => h.kind === 'Position').length;
  if (posCount !== 1) fail(`${path}: expected exactly one "### Position:" block, found ${posCount}`);
  if (headings[0].kind !== 'Position') fail(`${path}: "### Objection:" appears before the "### Position:" block`);
  const blocks = headings.map((h, i) => {
    const end = i + 1 < headings.length ? headings[i + 1].start : text.length;
    return { ...h, block: text.slice(h.start, end).trim() };
  });
  for (const b of blocks) {
    if (/^## /m.test(b.block)) fail(`${path}: level-2 heading inside the ${b.kind} block would break record sectioning`);
  }
  const position = blocks[0];
  const meta = parseMetaList(position.block);
  for (const key of POSITION_KEYS) {
    if (!meta[key]) fail(`${path}: Position ${position.name}: missing metadata: ${key}`);
  }
  if (!STANCES.has(meta.stance)) fail(`${path}: Position ${position.name}: invalid stance: ${meta.stance}`);
  if (meta.agent !== position.name) {
    fail(`${path}: Position heading "${position.name}" does not match agent metadata "${meta.agent}"`);
  }
  return { position: position.block, objections: blocks.slice(1).map((b) => b.block), meta };
}

const args = parseArgs(process.argv.slice(2));
if (!/^AIDR-\d{4,}$/.test(args.id)) fail(`--id must match AIDR-NNNN: ${args.id}`);
if (args.date && !/^\d{4}-\d{2}-\d{2}$/.test(args.date)) fail(`--date must be ISO 8601: ${args.date}`);
if (/[\r\n]/.test(args.title)) fail('--title must be a single line');
const slug = args.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
if (!slug) fail(`--title produces an empty slug: ${args.title}`);

const brief = readBrief(args.brief);
const arbiter = args.arbiter ?? brief.fm.arbiter;
if (!arbiter) fail('no arbiter: set "arbiter:" in the brief frontmatter or pass --arbiter (SPEC.md section 4)');

let entries;
try { entries = readdirSync(args.positions); } catch { fail(`cannot read positions directory: ${args.positions}`); }
const files = entries.filter((f) => f.endsWith('.md') && statSync(join(args.positions, f)).isFile()).sort();
if (files.length === 0) fail(`no .md position files in ${args.positions}`);

const positions = [];
const objections = [];
const agents = new Set();
const providers = new Set();
for (const file of files) {
  const parsed = readPositionFile(join(args.positions, file));
  if (agents.has(parsed.meta.agent)) fail(`${file}: duplicate agent label: ${parsed.meta.agent}`);
  agents.add(parsed.meta.agent);
  providers.add(parsed.meta.provider.toLowerCase());
  positions.push(parsed.position);
  objections.push(...parsed.objections);
}

const inputs = [args.brief, ...files.map((f) => join(args.positions, f))];
const date = args.date ?? new Date(Math.max(...inputs.map((p) => statSync(p).mtimeMs))).toISOString().slice(0, 10);

let outIsDir = false;
try { outIsDir = statSync(args.out).isDirectory(); } catch { /* handled below */ }
if (!outIsDir) fail(`--out is not an existing directory: ${args.out}`);
const outPath = join(args.out, `${args.id}-${slug}.md`);
if (existsSync(outPath) && !args.force) fail(`refusing to overwrite existing ${outPath} (pass --force to replace)`);

const frontmatter = [
  '---',
  `id: ${args.id}`,
  `title: ${args.title}`,
  'status: open',
  `date: ${date}`,
  `arbiter: ${arbiter}`,
  `tags: ${brief.fm.tags ?? '[]'}`,
  '---',
].join('\n');

const parts = [
  `# ${args.id}: ${args.title}`,
  '## Context',
  brief.context,
  '## Question',
  brief.question,
  '## Positions',
  positions.join('\n\n'),
  '## Objections',
];
if (objections.length) parts.push(objections.join('\n\n'));
parts.push('## Arbitration', '- decided_by:\n- date:\n- decision:');

writeFileSync(outPath, `${frontmatter}\n${parts.join('\n\n')}\n`);
console.log(`wrote ${outPath} (${positions.length} positions, ${providers.size} providers, ${objections.length} objections)`);
