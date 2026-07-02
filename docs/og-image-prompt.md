# OpenGraph image prompt

Use this prompt in Gemini to create the AIDR OpenGraph image.

## Target

- Output size: 1200 x 630 px
- Output path after export: `docs/imgs/og.png`
- Format: PNG
- Safe margin: keep all text and important marks at least 100 px from each edge
- Background: light, high-contrast, professional
- Accessibility: readable at small social-preview sizes

## Prompt

Create a clean OpenGraph image for "AIDR", short for "AI Decision Records". The previous draft had the right concept but exported at the wrong size and wrapped the supporting line. This version must be exactly 1200 x 630 px, PNG, with the support copy on one line.

Composition:
- 1200 x 630 px horizontal social preview. Do not create any other size.
- Light neutral background, not dark.
- Left text block, aligned on a clean vertical axis:
  - Large title: "AIDR"
  - Subtitle below it: "AI Decision Records"
  - Supporting line below subtitle, on one line: "Independent positions. Preserved dissent. Human arbitration."
- Right-side mark: a refined abstract document icon. Show one plain page outline with three distinct colored agent-position lines entering from the left and converging into one human-signed decision line on the right. The signature mark should be small, controlled, and secondary to the convergence lines.
- Keep the right-side mark fully inside the safe margin, with clear breathing room on the top and right.
- Use simple geometric forms, not a cartoon, not a stock photo, not a robot face.
- Make the visual feel like an open specification: trustworthy, minimal, portable, and audit-ready.

Style:
- Crisp editorial/technical design.
- No gradients that dominate the image.
- No 3D render, no glassmorphism, no glowing orbs, no busy background.
- Palette: warm amber accent, deep charcoal text, off-white background, with two muted secondary accents for distinct model positions.
- Use generous whitespace and strong alignment.

Typography:
- Large readable title.
- Use plain sans-serif type.
- Do not use tiny body text.
- Keep the supporting line on one line. Adjust font size or tracking if needed, but keep it readable.
- Text must be spelled exactly:
  - "AIDR"
  - "AI Decision Records"
  - "Independent positions. Preserved dissent. Human arbitration."

Avoid:
- No vendor logos.
- No provider names.
- No "www".
- No fake UI chrome.
- No code snippets.
- No extra words beyond the specified text.
- No watermarks.

Final output requirements:
- Export a PNG at exactly 1200 x 630 px.
- Do not export JPEG.
- Do not crop or resize to a different aspect ratio.
