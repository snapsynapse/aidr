// Shared AIDR parsing and linting primitives.
// No dependencies. Conformance is defined by SPEC.md, not by this helper.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

export const STANCES = new Set(['recommend', 'oppose', 'alternative', 'abstain']);
export const STATUSES = new Set(['open', 'arbitrated', 'superseded']);
export const POSITION_KEYS = ['agent', 'model', 'provider', 'stance', 'summary'];

// Escapes regex metacharacters before a string is interpolated into a RegExp
// constructor. Every call site here passes a hardcoded literal today (section
// headings, subsection labels), but escaping closes the regex-injection class
// outright rather than relying on that staying true for every future caller.
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return fm;
}

export function sectionBody(text, heading) {
  const re = new RegExp(`^## ${escapeRegExp(heading)}\\s*$`, 'm');
  const m = re.exec(text);
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = rest.search(/^## /m);
  return next === -1 ? rest : rest.slice(0, next);
}

export function parseMetaList(block) {
  const meta = {};
  for (const line of block.split('\n')) {
    const kv = line.match(/^- ([a-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return meta;
}

export function parseSubsections(body, label) {
  const out = [];
  const re = new RegExp(`^### ${escapeRegExp(label)}: (.+)$`, 'gm');
  let m;
  const marks = [];
  while ((m = re.exec(body)) !== null) marks.push({ name: m[1].trim(), start: m.index + m[0].length });
  for (let i = 0; i < marks.length; i++) {
    const end = i + 1 < marks.length ? body.indexOf(`### ${label}: ${marks[i + 1].name}`) : body.length;
    out.push({ name: marks[i].name, block: body.slice(marks[i].start, end) });
  }
  return out;
}

export function lintFile(path) {
  const errors = [];
  const claims = [];
  const text = readFileSync(path, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm) return { errors: ['missing YAML frontmatter'], claims };

  for (const key of ['id', 'title', 'status', 'date', 'arbiter']) {
    if (!fm[key]) errors.push(`frontmatter missing required field: ${key}`);
  }
  if (fm.status && !STATUSES.has(fm.status)) errors.push(`invalid status: ${fm.status}`);
  if (fm.id && !/^AIDR-\d{4,}$/.test(fm.id)) errors.push(`id must match AIDR-NNNN: ${fm.id}`);
  if (fm.id && !basename(path).startsWith(fm.id)) errors.push(`filename must start with id ${fm.id}`);
  if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) errors.push(`date must be ISO 8601: ${fm.date}`);
  const decided = fm.status === 'arbitrated' || fm.status === 'superseded';
  if (decided && !fm.decided) errors.push(`status ${fm.status} requires frontmatter field: decided`);
  if (fm.status === 'superseded' && !fm.superseded_by) errors.push('status superseded requires frontmatter field: superseded_by');

  for (const heading of ['Context', 'Question']) {
    const body = sectionBody(text, heading);
    if (body === null) errors.push(`missing required section: ${heading}`);
    else if (!body.trim()) errors.push(`section is empty: ${heading}`);
  }

  const posBody = sectionBody(text, 'Positions');
  const positions = posBody === null ? [] : parseSubsections(posBody, 'Position');
  if (posBody === null) errors.push('missing required section: Positions');
  else if (positions.length === 0) errors.push('Positions must contain at least one "### Position:" subsection');
  const providers = new Set();
  const stances = [];
  for (const p of positions) {
    const meta = parseMetaList(p.block);
    for (const key of POSITION_KEYS) {
      if (!meta[key]) errors.push(`Position ${p.name}: missing metadata: ${key}`);
    }
    if (meta.stance && !STANCES.has(meta.stance)) errors.push(`Position ${p.name}: invalid stance: ${meta.stance}`);
    if (meta.provider) providers.add(meta.provider.toLowerCase());
    if (meta.stance) stances.push(meta.stance);
  }

  const objBody = sectionBody(text, 'Objections');
  const objections = objBody === null ? [] : parseSubsections(objBody, 'Objection');

  const arbBody = sectionBody(text, 'Arbitration');
  const arbMeta = arbBody ? parseMetaList(arbBody) : {};
  const arbFilled = Boolean(arbMeta.decided_by && arbMeta.date && arbMeta.decision);
  if (decided) {
    if (arbBody === null) errors.push(`status ${fm.status} requires an Arbitration section`);
    else {
      for (const key of ['decided_by', 'date', 'decision']) {
        if (!arbMeta[key]) errors.push(`Arbitration: missing metadata: ${key}`);
      }
    }
  }
  if (fm.status === 'open' && arbFilled) errors.push('status open must not carry a completed Arbitration section');

  if (providers.size >= 2) claims.push('independent-positions');
  const hasDissent = objections.length > 0 || stances.includes('oppose') || stances.includes('alternative');
  if (hasDissent && arbFilled) claims.push('dissent-preserved');
  if (fm.status === 'arbitrated' && arbFilled && errors.length === 0) claims.push('human-arbitrated');

  return { errors, claims };
}

// Strings the shipped template carries as placeholders. A real record replaces all of
// them. These are used only by the opt-in --strict lint mode: conformance is defined by
// SPEC.md, and an unedited template is structurally conforming, so finding these is a
// warning about unfinished authoring, never a conformance failure.
export const TEMPLATE_PLACEHOLDERS = [
  'Short noun phrase naming the decision',
  'Why this decision exists and what is at stake.',
  'One decidable question, stated so a reader can tell',
  'agent-label',
  'model-id-as-reported',
  'vendor-name',
  'different-vendor',
  'One sentence stating the position.',
  'Prose argument for the position.',
  'Concrete failure mode, contradiction, or risk.',
  'One sentence stating what was decided.',
  'Human-authored rationale.',
  'Your Name',
  'https://example.com/',
  '2026-01-01',
  '2026-01-02',
];

// Returns the placeholder strings still present in a record, in template order.
export function findTemplatePlaceholders(text) {
  return TEMPLATE_PLACEHOLDERS.filter((needle) => text.includes(needle));
}

export function collectAidrFiles(target) {
  const st = statSync(target);
  if (st.isFile()) return [target];
  return readdirSync(target)
    .filter((f) => /^AIDR-\d{4,}.*\.md$/.test(f))
    .map((f) => join(target, f));
}
