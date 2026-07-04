#!/usr/bin/env node
// AIDR assemble tool suite. Exercises tools/aidr-assemble.mjs as shipped: a good
// assembly must emit an open record that lints clean and earns independent-positions,
// position blocks must land verbatim in filename order with objections routed, an
// existing file must not be overwritten without --force, and malformed input must
// fail loudly. Zero dependencies. Output goes to a throwaway temp dir, never to
// decisions/. Also run by tests/run.mjs as one aggregated check.
// Usage: node tests/assemble.test.mjs   (exit 0 when every check passes, 1 otherwise)

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..');
const assemble = join(repo, 'tools', 'aidr-assemble.mjs');
const linter = join(repo, 'tools', 'aidr-lint.mjs');
const fixtures = join(here, 'fixtures', 'assemble');

function run(tool, argv) {
  // stdio is set explicitly so expected-failure stderr is captured, not passed through.
  const opts = { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] };
  try {
    return { code: 0, out: execFileSync('node', [tool, ...argv], opts) };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

let checks = 0;
let failures = 0;
function check(name, ok, detail = '') {
  checks++;
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}`);
  if (!ok && detail) console.log(detail.trimEnd().split('\n').map((l) => '        ' + l).join('\n'));
}

const outDir = mkdtempSync(join(tmpdir(), 'aidr-assemble-test-'));
const goodArgs = [
  '--id', 'AIDR-0900', '--title', 'Assemble tool fixture decision',
  '--brief', join(fixtures, 'brief.md'),
  '--positions', join(fixtures, 'positions'),
  '--out', outDir, '--date', '2026-07-03',
];
const outFile = join(outDir, 'AIDR-0900-assemble-tool-fixture-decision.md');

console.log('assemble tool checks:');

const first = run(assemble, goodArgs);
check('assembles an open record from brief + positions', first.code === 0, first.out);

const lint = run(linter, [outFile]);
check('emitted record passes aidr-lint (exit 0)', lint.code === 0, lint.out);
check('emitted record earns independent-positions', lint.out.includes('independent-positions'), lint.out);

const text = first.code === 0 ? readFileSync(outFile, 'utf8') : '';
check('frontmatter is status open with the given date',
  text.includes('status: open') && text.includes('date: 2026-07-03'));
check('position blocks are verbatim, in filename order',
  text.includes('### Position: claude') &&
  text.indexOf('### Position: claude') < text.indexOf('### Position: codex') &&
  text.includes('Written independently; no other positions were visible at authoring time.'));
check('objection inside a position file routes to Objections',
  /## Objections\n\n### Objection: codex to Position claude/.test(text));
check('arbitration is scaffolded blank',
  text.includes('## Arbitration\n\n- decided_by:\n- date:\n- decision:'));

const second = run(assemble, goodArgs);
check('refuses to overwrite without --force',
  second.code !== 0 && second.out.includes('--force'), second.out);

const forced = run(assemble, [...goodArgs, '--force']);
check('overwrites with --force', forced.code === 0, forced.out);

const badMeta = run(assemble, [
  '--id', 'AIDR-0901', '--title', 'Broken metadata',
  '--brief', join(fixtures, 'brief.md'),
  '--positions', join(fixtures, 'malformed-missing-summary'),
  '--out', outDir, '--date', '2026-07-03',
]);
check('position missing metadata fails loudly',
  badMeta.code !== 0 && badMeta.out.includes('missing metadata: summary'), badMeta.out);

const noHeading = run(assemble, [
  '--id', 'AIDR-0902', '--title', 'No position block',
  '--brief', join(fixtures, 'brief.md'),
  '--positions', join(fixtures, 'malformed-no-heading'),
  '--out', outDir, '--date', '2026-07-03',
]);
check('file without a Position block fails loudly',
  noHeading.code !== 0 && noHeading.out.includes('### Position:'), noHeading.out);

rmSync(outDir, { recursive: true, force: true });

console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'}: ${checks - failures}/${checks} checks passed`);
process.exit(failures === 0 ? 0 : 1);
