# Release Checklist — AIDR

AIDR ships an agent-facing surface (the spec, the template, the linter, an
`assistant-guide.txt`, and a hosted landing page) and its records are used in
security-relevant decisions. Run this checklist before tagging a release.

## 1. Gates (must pass on the commit being tagged)

```bash
make check                       # aidr-lint over examples/ + template + decisions/, then the conformance suite
node tools/aidr-lint.mjs decisions/   # every shipped record is conformant
node tests/run.mjs               # conformance suite green
```

A failing gate blocks the tag unless the Maintainer records an explicit deferral
with reason and next owner.

## 2. Accessibility (hosted landing page)

Run the a11y gate against the landing page before release (skill-a11y-audit,
WCAG 2.1 AA). A blocking violation blocks the tag.

```bash
# skill-a11y-audit against https://aidr.work/ (or the local docs/index.html)
```

## 3. Version + surface propagation

Per the cross-portfolio versioning rule, bump the version and propagate it to
every surface that displays a version or date:

- `SPEC.md` — Version line, Date line (normative spec changes only).
- `CHANGELOG.md` — new entry (version, ISO date, summary); prior entries preserved.
- `README.md` — any inline version/status references.
- `docs/index.html` — version block, byline/last-updated date, JSON-LD `dateModified`.
- `docs/llms.txt` and `docs/llms-full.txt` — `Updated:` date; any URLs that changed.
- `assistant-guide.txt` (+ `docs/.well-known/` copy) — if content changed, edit both
  copies and confirm they stay byte-identical (`cmp` / `shasum -a 256`).
- `CITATION.cff` — `version` and `date-released`.

## 4. Security / integrity

- Confirm no secrets or `.env` are tracked.
- Confirm `docs/robots.txt` still permits the intended AI/LLM crawlers.
- Confirm the trust-anchored `assistant-guide.txt` pair is byte-identical and the
  `.well-known/` copy is served live (`curl -sI https://aidr.work/.well-known/assistant-guide.txt`).

## 5. Tag + GitHub Release

A commit without a tag is not a release; a tag without a GitHub Release object is
not a release. Both are required.

```bash
git tag -a vX.Y.Z -m "AIDR vX.Y.Z — title"
git push origin vX.Y.Z
gh release create vX.Y.Z --title "vX.Y.Z — title" --notes-file <(...)
gh release list --limit 5
```
