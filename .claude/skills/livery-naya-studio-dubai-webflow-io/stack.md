# Stack

What the source site appears to be built with, read from its page: script and asset URLs, attributes and class patterns. It is evidence, not certainty. Treat "likely" entries as a guess.

**Never switch your project's framework or add these libraries just to match.** Recreate each effect with what your project already uses; reach for a library only when the user asks.

| | Built with | Evidence | Confidence |
|---|---|---|---|
| Site builder | Webflow | data-wf-site on <html> | detected |
| Motion | GSAP | GSAP script | detected |
| Motion | Swiper | Swiper markup | detected |
| Scrolling | Lenis | Lenis script | detected |
| 3D and canvas | Three.js r152 | window.__THREE__ | detected |

## 3D and canvas

- The scene renders into a canvas that fills the first screen further down the page.
- Built with Three.js r152.
- To recreate: `three` (0.152.x) with one renderer per page.
- The scene's main colours, most used first: #08162a, #08111b, #0e2e6c, #0d2655, #081d47. Light, materials and background should land on these, so the page around it can share the same palette.
- Keep it light: cap devicePixelRatio at 2, render only while the canvas is on screen, show a still frame under prefers-reduced-motion, and a static image when WebGL isn't available.
