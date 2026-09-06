# Accessibility release gate, 2026-09-05

Scope: local candidate docs/index.html, docs/why.html and docs/404.html rendered with Playwright setContent in Sam's existing, shared Comet tab. Inline CSS came from the candidate; unchanged relative assets resolved from aidr.work. This does not represent a deployment. The published page was reloaded afterward.

Method: installed axe-core 4.12.1 injected through the Comet MCP connection; WCAG 2 A/AA and WCAG 2.1 A/AA tags. The skill's Puppeteer runner was not used because the user's browser rule requires Comet. Browser: Chrome/150.0.0.0 on macOS. No browser profile or controller was created by the test.

| Check | Result |
|---|---|
| Desktop automated scan | 0 violations; 23 passing rules; 39 inapplicable rules |
| Mobile automated scan, 390 by 844 | 0 violations; 24 passing rules |
| Mobile horizontal overflow | document scrollWidth 375, viewport 390; no document overflow |
| Contrast items requiring review | Four byline separator dots only, selectors .sep:nth-child(3), (5), (7), (9). Decorative punctuation, no information conveyed; not a blocking text-contrast finding. |
| Keyboard | First Tab reaches Skip to content; Enter resolves #main-content. Active element ID was empty, so this does not establish full focus-transfer behavior. |

Automated release gate passes with no blocking findings. This is not a full WCAG conformance claim. Screen-reader navigation, comprehensive keyboard traversal, zoom/text-spacing and visual review remain manual coverage limits. No Lighthouse score was collected. The final scan includes the corrected Arbitration example heading and new template-copy instructions.

## Full-surface follow-up

After the consistency corrections, all three HTML pages were scanned again in shared Comet at 1280 and 390 pixel widths (height 900). All six scans had zero violations and no document overflow. Passing-rule counts: index 23 desktop / 24 mobile; why 17 / 17; 404 9 / 9. Only index retained the four non-blocking decorative separator review items. The published page was restored afterward.
