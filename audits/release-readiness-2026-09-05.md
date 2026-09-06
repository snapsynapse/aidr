# AIDR v0.2.1 release readiness

Status: local candidate prepared and staged; local verification and automated accessibility gate passed. Preparation and staging authorized; commit, push, tag and publication not authorized by this session.

## Scope

Open-spec repository, documentation-only patch release. Latest GitHub release is v0.2.0. GitHub main and local HEAD were verified at 6cfcc807cfbb67e193972070b5d6dd23ca4b8e72 on 2026-09-05; no remote v0.2.1 tag existed. Version choice: v0.2.1 because accumulated changes add documentation and conformance coverage without changing the normative specification or runtime API. SPEC.md remains v0.1.0; the skill bundle is v1.0.1 (SKILL.md v2).

Candidate changes include the previously landed Ringer record/recipe and conformance coverage, processed handoff reconciliation, corrected template-copy instructions, fresh conformance counts, and aligned discovery documents. Version/date propagation: CHANGELOG.md, CITATION.cff, docs/index.html, docs/llms.txt, docs/llms-full.txt and the homepage sitemap entry. The corrected why.html rationale and its sitemap date now match September 5. Both assistant-guide copies include matching template-reset guidance.

## Verification

- make check passes: 20/20 top-level checks, including 11/11 assembler checks. All shipped records lint clean.
- Clean-directory consumer smoke passes: copy the template, replace placeholders, form an open single-position record, then lint with no earned claims. This is synthetic verification, never adoption evidence.
- Local documentation targets resolve; JSON-LD and sitemap XML parse; candidate versions agree.
- Assistant-guide copies are byte-identical; updated skill and bundle changelog SHA-256 values match their manifest.
- Seven live routes returned 200: /, /why.html, /robots.txt, /llms.txt, /llms-full.txt, /sitemap.xml and /.well-known/assistant-guide.txt. The live guide matches baseline HEAD, not the unpublished candidate.
- Automated browser accessibility gate passed after Sam shared a Comet tab: axe-core 4.12.1 reports zero violations at desktop and mobile widths. Four decorative separator contrast items were reviewed as non-blocking. Method and manual coverage limits: accessibility-2026-09-05.md.
- Candidate exact-commit CI and post-deployment verification have not run because there is no candidate commit or publication yet.

## Publication sequence after prerequisites

1. Review the recorded passing automated accessibility gate and its manual coverage limits; rerun on any subsequent page changes.
2. Obtain explicit authorization for commit, push, tag, GitHub Release and Pages delivery. Reconcile remote main and the proposed tag again; stop if either conflicts.
3. Remove preparation-only wording from CHANGELOG.md and discovery files, update agent status, and set the actual release date across the candidate surfaces if it differs from September 5. Revalidate changed content and record its exact commit.
4. Commit the scoped tranche, push, and verify CI for that commit. Create and push the v0.2.1 tag and GitHub Release from the reviewed changelog. No npm package or other registry publication is required. Attach the source ZIP, skill package and SHA256SUMS after rebuilding them from the final tag. Candidate artifacts are local under dist/v0.2.1/.
5. Verify tag target, release object and Pages deployment; compare live candidate discovery and guide bytes with the published commit. Report source, release and deployment separately. Never overwrite an existing tag or claim delivery from local tests.

Machine-readable preparation state: release-state-2026-09-05.json. The package BUILDINFO.json inventories every staged member hash; SHA256SUMS identifies the resulting candidate archives.

## MCP is a separate gate

This patch release does not depend on PAICE arbitration. MCP implementation requires real, arbitrated dogfood in two other PAICE repositories, with at least one independent-positions claim, under the existing execution packet. The open GuideCheck and PAICE Foundation records are candidates, not mandatory choices. Review each against its owner's current authority and gather missing independent evidence before human arbitration. Do not force a decision merely to qualify AIDR.

## Package preparation

Local candidate artifacts: dist/v0.2.1/aidr-0.2.1-source.zip, dist/v0.2.1/aidr-skill-1.0.1.skill and dist/v0.2.1/SHA256SUMS. BUILDINFO.json records the staged member hashes and candidate baseline. The source archive contains staged tracked files only; private handoffs, working-session, Git metadata and credentials are excluded. The skill package contains aidr/SKILL.md, MANIFEST.yaml and CHANGELOG.md; it requires the template/tools from an AIDR checkout. Packaging is preparation, not registry or release publication.

Before publishing, finalize candidate-only wording and rebuild the archives from the final tagged commit; candidate checksums must not be presented as release checksums for different bytes. Full consistency findings are in surface-consistency-2026-09-05.md.

## Local commit boundary

Sam authorized staging and local commit, with human arbitration before any push. The tracked governance inventory wording is qualified to exclude separate untracked cross-entity reviews. No review position or arbitration is included in this documentation commit. Candidate archives are rebuilt after this scoped correction; prior archive hashes identify older bytes. Commit identity and refreshed package hashes are recorded in the local delivery receipt. Push, tag, release and deployment remain unperformed.
