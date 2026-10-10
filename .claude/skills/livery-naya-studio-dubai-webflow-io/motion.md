# Motion and Interactions

Considered transitions, with signature motion that carries the personality: line drawing, float.

- Default to 800ms transitions (36% of measured ones).
- Ease with ease.
- Animate opacity, transform, margin, height; avoid animating layout.
- Looping motion is slow and steady (several seconds per cycle), never frantic.
- Respect prefers-reduced-motion.

## Signature motion

The animations that make this site feel like itself. Recreate the behaviour with your own elements and content; the keyframes are the measured reference.

### Line drawing

SVG lines draw themselves in over 1.8s with ease-in-out. It runs on its own, on SVG paths.

```css
@keyframes draw { 0% { stroke-dashoffset: var(--path-length); } 100% { stroke-dashoffset: 0; } }
.draw { animation: draw 1800ms ease-in-out both; }
```

### Float

Drifts gently up and down every 2s. It runs on its own, on blocks.

```css
@keyframes waveSlide { 0% { transform: translateX(0px); } 100% { transform: translateX(-50%); } }
.waveSlide { animation: waveSlide 2000ms linear infinite; }
```

## Interactions

- **Hover** changes shadow (33% of hover rules), background (33% of hover rules), background colour (33% of hover rules). Things rarely move on hover; they change colour.

## Measurements

- Durations: 800ms (36%), 600ms (27%), 500ms (12%), 200ms (5%), 1500ms (5%)
- Easings: `ease`, `linear`, `ease-in`, `ease-in-out`
- Animated properties: opacity, transform, margin, height, width, all, background-color, padding

Always respect `prefers-reduced-motion: reduce`.
