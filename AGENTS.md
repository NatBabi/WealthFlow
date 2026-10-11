# WealthFlow Design Rules (Naya Studio Dubai v1)

This project adopts the **Naya Studio Dubai** design system (Livery v1). All future UI additions and refactors must adhere to these core rules:

## Visual Principles

1. **Contrast, Not Colour**
   - Build visual hierarchy through contrast, font weight, and size. Keep the color palette neutral and near-black (`#0d0d0d` / `#000000`).
   - Do not introduce arbitrary saturated accent colors; buttons and active elements rely on tone contrast, weight, and subtle borders.

2. **Flat Surfaces, Drawn Edges**
   - **No drop shadows.** Elevation and depth are achieved strictly through 1px borders (`rgba(0,0,0,0.1)` or `rgba(255,255,255,0.1)`) and subtle surface tonal shifts.
   - Use backdrop blur (`backdrop-blur-md`) and subtle grain overlays for tactile texture.

3. **Single Typography Family & Tight Large Headings**
   - Single clean sans-serif typography (`Inter` / `Helvetica Neue`).
   - Headings use tight letter-spacing (`tracking-tighter` / `-0.02em`) and large scale.
   - Never introduce competing display/serif typefaces.

4. **Rounded and Approachable Contours**
   - Controls, badges, and CTA buttons use fully rounded pill shapes (`rounded-full`).
   - Cards and structural containers use generous radii (`rounded-[29px]` or `rounded-[88px]`).

5. **Direct & Calm Voice**
   - Copy is calm, declarative, and concise (~10 words per heading).
   - Avoid sales hyperbole, aggressive exclamation points, and wordy explanations.
