# Surface consistency review, 2026-09-05

Scope: all tracked public Markdown, HTML and discovery metadata, agent instructions and bundle metadata, contribution/security/support templates, and release preparation. Normative SPEC.md, real decision records, historical changelog entries and test fixtures were inspected as evidence and preserved. Dated prior audits describe their original assessments; the September assessment is the current execution pointer.

## Findings resolved

| Surface | Correction |
|---|---|
| README, landing page, full machine summary and assistant guide | Match record IDs; distinguish template placeholders from actual dissent; form an open record with a real position before linting; correct Arbitration to level two. |
| WHY.md and why.html | Remove the claim that records alone prove actual isolation; explain declared provenance versus process evidence. Both representations and dates agree. |
| Landing page | SPEC.md owns normative conformance; the site is its canonical overview. Explicitly state structural checking limits. |
| Machine-readable format outline | Mark Objections optional as a section and include optional Evidence. |
| Skill | Empty scaffolds are incomplete, not lint-passing; locate a trusted checkout for tools when installed separately; distinguish declared providers from actual isolation. Bundle v1.0.1, file v2. |
| Contribution guide | Recognize participant-authored isolated files and verbatim assembly without permitting paraphrase or substituted authorship. |
| Recipe | Exact-record claim gate preserves lint failure; record state does not prove off-record chronology. |
| Security/citation | Ratified specification is not a draft; citation lists both code and prose licenses. |
| Current context | No open AIDR arbitration is distinct from CONTRIBUTING's unresolved procedural question. |
| Release surfaces | Repo v0.2.1, spec v0.1.0 and skill v1.0.1 are separate versions; candidate publication status remains explicit. |

## Validation and boundaries

make check passes 20/20 including 11/11 assembler checks. Skill frontmatter validation passes. All three HTML pages pass the automated WCAG 2.1 AA scan at desktop/mobile widths, with decorative separator review items explained in accessibility-2026-09-05.md. Archive checks and clean-consumer results are recorded with the local package metadata.

No normative rules or arbitrated records changed. No external provider runs, messages, commits, pushes, tags or publication performed. Current GitHub/API/runtime choices were not upgraded as part of a documentation consistency pass. Historical claims are retained as dated history, not fresh platform validation.

Release candidate wording is intentionally retained until publication authorization. After finalizing wording and dates, restage, validate, commit/push with explicit authority, verify exact-commit CI, tag, rebuild packages from that tag, publish, and verify deployment. MCP adoption remains a separate gate.
