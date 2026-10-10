# naya-studio-dubai.webflow.io: design rules

A dark interface on a near-black neutral background, built on contrast rather than colour. Type is Helvetica Neue set tight at large sizes, corners are fully rounded on controls, and depth comes from borders and surface tone rather than shadows.

## Principles

### Contrast, not colour

Build hierarchy from contrast, weight and size; keep the palette neutral.

_Why:_ No saturated colour carries real weight on the measured page; emphasis comes from dark-on-light contrast alone.

### Flat surfaces, drawn edges

Separate surfaces with 1px borders in #000000, not shadows.

_Why:_ No visible shadows were measured, so depth comes from lines and tone shifts, which keeps the page calm.

### Big type, quiet body

Pair 195px headings with 58px body text in Helvetica Neue.

_Why:_ A 3.4× jump between headline and body creates strong hierarchy with few elements.

### Rounded and approachable

Use pill shapes for buttons and chips, and 29px corners for containers.

_Why:_ Fully rounded shapes make up 44% of measured radii; they soften an otherwise structured page.

## Never

- **Never use drop shadows for depth.** No visible shadows were measured anywhere on the site.
- **Never use positive letter-spacing on headings.** Large type is tightened, down to -0.02em on the biggest sizes.
- **Never mix in a second display typeface.** Headings and body share Helvetica Neue; a second family would split the voice.

## Colour

- Dark theme: near-black neutral background (#000000).
- Body text #ffffff on the background reads at 21.0:1; secondary text uses #545454.
- There is no saturated accent; links and actions rely on weight and underline.

## Typography

- Helvetica Neue throughout.
- Scale: display 195px, h1 122.5px, h2 105px, h3 87.5px, h4 58.5px, h5 58px, h6 52.5px.
- Weights in use: 400.
- Headings are tightened (-0.02em at 195px); body text keeps normal tracking.

## Shape and depth

- Radii: 27px (4%), 29px (11%), 31px (4%), 39px (4%), 42px (9%), 53px (4%), 88px (9%), pill (44%).
- Borders: 1px in #000000.
- No shadows: elevation comes from surface tone and borders.
