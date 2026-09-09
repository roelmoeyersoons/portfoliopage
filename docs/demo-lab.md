# React Bits Lab (`#/reactbits`)

A navigable demo page inside the **original v1 site** that showcases a broad set
of React Bits components so Roel can compare variants and pick winners to promote
into the real sites. Open it from the floating ⚡ button, or directly at
`http://localhost:5173/#/reactbits` (deep links like `#/reactbits/magnet` work;
the hash maps back to the `original` site so the toast stays coherent).

> Historical note: this doc condenses the old 22 KB
> `REACTBITS_LAB_IMPLEMENTATION_PLAN.md` (removed after this file was written).
> The lab is already built — the plan below describes what exists.

## Architecture

- **Route**: hash-based overlay, no router dependency. `src/App.tsx` syncs
  `labOpen` with `window.location.hash.startsWith('#/reactbits')`, saves/restores
  scroll position, and renders `<DemoLab onExit/>` as a full-screen `fixed` overlay.
- **Shell**: `src/demo/DemoLab.tsx` — left sidebar of categorized components,
  main stage with a themed preview card (name, reactbits.dev link, deps badge,
  one-liner), exit button.
- **Registry**: `src/demo/registry.ts` — typed `DemoTabMeta[]`:
  `{ id, category, name, description, deps: 'none'|'canvas'|'ogl'|'gsap'|'three', url?, component }`.
  Adding a component = adding one entry.
- **Components**: `src/demo/bits/` — ~37 TS + Tailwind implementations (one file
  per component) plus `ExistingBits.tsx` (mini replicas of the live page's bits,
  because the live `ParticlesBackground` is `position: fixed` and would be
  invisible behind the opaque lab surface) and `StretchPlaceholder.tsx`.
- Previews reuse real portfolio data (roles, bio, tech list, project titles) so
  comparisons are realistic — no lorem ipsum.

## Status (built in an earlier session)

- 5 categories, **48 registry entries**:
  - Text Animations (10): RotatingText, TextType, GlitchText, BlurText, GradientText, ShinyText, ScrollFloat, FallingText, TextLoop, ASCIIText
  - Cursor & Hover (9 + 1 stretch): Magnet, GlareHover, PixelTransition, Noise, ClickSpark, BlobCursor, StarBorder, ElectricBorder, SplashCursor (GlowCursor = stretch)
  - UI Components (11 + 1 stretch): TiltedCard, BorderGlow, ScrollStack, Stepper, AnimatedList, BounceCards, GooeyNav, PillNav, Dock, CardSwap, ProfileCard (MagicBento = stretch)
  - Backgrounds (6 + 3 stretch): LetterGlitch, FaultyTerminal, DotGrid, GridMotion, Aurora, Beams (Orb, Topography, Hyperspeed = stretch)
  - Existing Live Bits (7): ParticlesBackground (mini replica), DecryptedText, TrueFocus, SpotlightCard, SplitText, InfiniteScrollMarquee, AnimatedCounter
- **Zero extra deps installed**: all implemented with framer-motion/canvas only;
  ScrollStack is a pure framer-motion re-implementation. The 5 stretch items
  (Orb, GlowCursor, MagicBento, Topography, Hyperspeed) render a
  "needs ogl/three — not installed" placeholder. Install the lib and swap the
  registry entry to opt in.
- Verified at the time: `npx tsc --noEmit` clean; `npx vite build` clean
  (main chunk ~421 kB / ~126 kB gzip; every component code-split — no WebGL bloat).
- Still open: full manual browser QA (hover/click/scroll per tab, StrictMode
  double-mount noise, scroll restore, mobile sidebar, refresh persistence).

## Promotion path (how a lab bit ships)

When Roel picks winners:

1. For the **original v1 page**: copy the file from `src/demo/bits/` →
   `src/components/reactbits/`, wire it into the section, remove the lab registry entry.
2. For the **concept sites**: prefer the raw 1:1 JSX+CSS copies already in
   `src/sites/shared/bits/` (typed barrel) — check there first; fork/adapt
   inside the variant folder when the effect needs customization
   (see `docs/site-concepts.md` → tricky bits).

## Best-look shortlist (from the implementing session)

- Text: RotatingText (hero roles), GradientText (headings), GlitchText (section titles)
- Cursor: Magnet (CTAs), StarBorder (card accents), SplashCursor (contact canvas)
- UI: ScrollStack (experience timeline), BounceCards (projects), Dock (nav), GooeyNav vs PillNav (skill tabs)
- Backgrounds: Aurora (hero backdrop), DotGrid (skills), LetterGlitch (terminal)
