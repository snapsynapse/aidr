#!/usr/bin/env node
// aidr-lint: reference linter for the AIDR specification (SPEC.md).
// Usage: node tools/aidr-lint.mjs [--strict] <file-or-dir> [...more]
// Exit 0 when every checked file conforms, 1 otherwise.
// No dependencies. Conformance is defined by SPEC.md, not by this tool.
//
// --strict additionally reports records that still carry strings from the shipped
// template. Those records are structurally conforming, so this never changes what
// the specification requires; it catches the common first-run mistake of linting a
// template copy before writing anything into it.

import { collectAidrFiles, lintFile, findTemplatePlaceholders } from './lib/aidr-core.mjs';
import { readFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const strict = argv.includes('--strict');
const targets = argv.filter((a) => a !== '--strict');
if (targets.length === 0) {
  console.error('usage: node tools/aidr-lint.mjs [--strict] <file-or-dir> [...more]');
  process.exit(2);
}

let failed = false;
for (const target of targets.flatMap(collectAidrFiles)) {
  const { errors, claims } = lintFile(target);
  if (errors.length) {
    failed = true;
    console.log(`FAIL ${target}`);
    for (const e of errors) console.log(`  - ${e}`);
    continue;
  }

  const placeholders = strict ? findTemplatePlaceholders(readFileSync(target, 'utf8')) : [];
  if (placeholders.length) {
    failed = true;
    console.log(`FAIL ${target}${claims.length ? ` [${claims.join(', ')}]` : ''}`);
    console.log(`  - record still contains ${placeholders.length} template placeholder${placeholders.length === 1 ? '' : 's'}; replace them before claiming this record`);
    for (const p of placeholders) console.log(`    ${JSON.stringify(p)}`);
    continue;
  }

  console.log(`PASS ${target}${claims.length ? ` [${claims.join(', ')}]` : ''}`);
}
process.exit(failed ? 1 : 0);
