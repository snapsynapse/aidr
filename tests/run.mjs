#!/usr/bin/env node
// AIDR linter conformance suite. Exercises the reference linter (tools/aidr-lint.mjs)
// as shipped, against known-invalid records (each MUST fail on a specific rule) and
// known-valid records (each MUST pass and earn an exact claim set). Also runs the
// assemble tool suite (tests/assemble.test.mjs) as one aggregated check. Zero dependencies.
// Usage: node tests/run.mjs   (exit 0 when every check passes, 1 otherwise)

import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..');
const linter = join(repo, 'tools', 'aidr-lint.mjs');
const invalidDir = join(here, 'fixtures', 'invalid');
const validDir = join(here, 'fixtures', 'valid');

function lint(path) {
  try {
    return { code: 0, out: execFileSync('node', [linter, path], { encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '').toString() };
  }
}

// Each invalid fixture MUST fail (exit 1) and its output MUST name the expected rule.
// One fixture per error branch in aidr-lint.mjs.
const invalid = [
  ['AIDR-0101-missing-arbiter.md', 'frontmatter missing required field: arbiter'],
  ['AIDR-0102-invalid-status.md', 'invalid status: ratified'],
  ['AIDR-99-bad-id.md', 'id must match AIDR-NNNN: AIDR-99'],
  ['AIDR-0104-bad-date.md', 'date must be ISO 8601: 2026-7-2'],
  ['AIDR-0105-arbitrated-missing-decided.md', 'status arbitrated requires frontmatter field: decided'],
  ['AIDR-0106-superseded-missing-superseded_by.md', 'status superseded requires frontmatter field: superseded_by'],
  ['AIDR-0107-missing-context.md', 'missing required section: Context'],
  ['AIDR-0108-empty-question.md', 'section is empty: Question'],
  ['AIDR-0109-no-positions.md', 'Positions must contain at least one'],
  ['AIDR-0110-position-missing-metadata.md', 'Position claude: missing metadata: summary'],
  ['AIDR-0111-invalid-stance.md', 'Position claude: invalid stance: maybe'],
  ['AIDR-0112-open-with-arbitration.md', 'status open must not carry a completed Arbitration section'],
  ['AIDR-0113-arbitrated-no-arbitration.md', 'status arbitrated requires an Arbitration section'],
  ['AIDR-0114-missing-frontmatter.md', 'missing YAML frontmatter'],
];

// Each valid record MUST pass (exit 0) and earn exactly this claim set. Includes the
// purpose-built fixture plus shipped records/templates in the repo (regression).
const valid = [
  [join(validDir, 'AIDR-0100-valid-full.md'), ['independent-positions', 'dissent-preserved', 'human-arbitrated']],
  [join(repo, 'examples', 'AIDR-0001-spin-out-aidr-from-turnfile.md'), ['human-arbitrated']],
  [join(repo, 'templates', 'AIDR-0000-template.md'), ['independent-positions', 'dissent-preserved', 'human-arbitrated']],
  [join(repo, 'decisions', 'AIDR-0002-ratify-spec-v0.1.0.md'), ['independent-positions', 'human-arbitrated']],
  [join(repo, 'decisions', 'AIDR-0003-ship-a-split-decision-recipe-for-ringer.md'), ['independent-positions', 'human-arbitrated']],
];

const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();
let failures = 0;

// The assemble tool keeps its own standalone suite; run it here as one aggregated
// check so `node tests/run.mjs` stays the single entry point.
function runAssembleSuite() {
  console.log('assemble tool (delegates to tests/assemble.test.mjs):');
  try {
    const out = execFileSync('node', [join(here, 'assemble.test.mjs')], { encoding: 'utf8' });
    console.log(out.trimEnd().split('\n').map((l) => '  ' + l).join('\n'));
    return true;
  } catch (e) {
    console.log(((e.stdout ?? '') + (e.stderr ?? '')).trimEnd().split('\n').map((l) => '  ' + l).join('\n'));
    return false;
  }
}

console.log('invalid fixtures (must FAIL on the named rule):');
for (const [file, expect] of invalid) {
  const { code, out } = lint(join(invalidDir, file));
  const ok = code === 1 && out.includes('FAIL') && out.includes(expect);
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${file}  -> expected "${expect}"`);
  if (!ok) console.log(out.split('\n').map((l) => '        ' + l).join('\n'));
}

console.log('valid records (must PASS with the exact claim set):');
for (const [path, claims] of valid) {
  const { code, out } = lint(path);
  const m = out.match(/\[([^\]]*)\]/);
  const got = m ? m[1].split(',').map((s) => s.trim()).filter(Boolean) : [];
  const ok = code === 0 && out.includes('PASS') && sameSet(got, claims);
  if (!ok) failures++;
  const rel = path.replace(repo + '/', '');
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${rel}  -> expected [${claims.join(', ')}], got [${got.join(', ')}]`);
}

if (!runAssembleSuite()) failures++;

const total = invalid.length + valid.length + 1;
console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'}: ${total - failures}/${total} checks passed`);
process.exit(failures === 0 ? 0 : 1);
