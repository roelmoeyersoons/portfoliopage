# Showcase Sites — Build Spec

This project hosts **6 full website concepts** for Roel's portfolio. A shell
(`src/sites/Showcase.tsx`) mounts one site at a time; a neutral toast at the
bottom center (`src/sites/VariantToast.tsx`) switches between them
(hash-routed `#/site/<id>`, keys `1..6`, `←`/`→`).

Variant 1 (`aurora-glass`) is **complete** and is the reference implementation.
Read it before writing anything:

- `src/sites/sites/aurora-glass/Site.tsx` — shell, top tabs, backdrop, tab transitions
- `src/sites/sites/aurora-glass/tabs/*.tsx` — one file per tab
- `src/sites/sites/aurora-glass/ui.tsx` — local styled primitives

## Hard requirements (every variant)

1. **Tabs at the top** for: `home · experience · skills · projects · about · contact`
   (labels can be restyled but ids stay).
2. **Experience tab**: LEFT sidebar menu listing the 4 roles; selecting one shows
   paragraphs, artwork, bullets, tech, metrics, deep-dive in the MAIN pane.
3. **Skills tab**: same left-menu + main-pane pattern for the 4 skill categories.
4. Data comes from the shared content module — never hardcode content.
5. Fully responsive: on `<lg` the left menu becomes a horizontal scrollable strip
   above the detail pane (see aurora-glass `Experience.tsx` for the pattern).
6. TypeScript strict must pass; keep `npm run dev` and `npx tsc --noEmit` clean.

## Shared APIs (do NOT edit any file outside your variant folder)

```ts
// src/sites/shared/content.ts
siteTabs: { id: 'home'|'experience'|'skills'|'projects'|'about'|'contact', label }[]
profile   // name, firstName, lastName, initials, title, tagline, bioParagraphs, location, stats[4]
experiences: { id, index:'01', role, company, shortCompany, period, location, type, domain,
               summary, paragraphs[], bullets[], tech[], metrics[{label,value}],
               deepDive{challenge, solution, learnings[]}, art{style,hue} }[]
skillGroups: { id, index, title, icon:'Code2'|'Cpu'|'Layout'|'Server', description,
               items[{name, level:0-100, years?, badge?}], art }[]
projects:    { id, title, category, tagline, description, tags[], githubUrl?, highlights[],
               stats[{label,value}], featured, art }[]
education    // degree, institution, period, grade, thesis{title, abstract, keyContributions[], supervisors[]}
contact      // email, linkedinUrl, githubUrl, location
techMarquee: string[]
rotatingRoles: string[]

// src/sites/shared/Artwork.tsx  (default export)
<Artwork spec={art} seed={id} className="absolute inset-0 h-full w-full" />
// deterministic generated SVG art; spec = {style: 'orbits'|'mesh'|'waves'|'constellation'|'strata'|'grid', hue}

// src/sites/shared/iconMap.ts
resolveIcon('Code2') -> LucideIcon

// src/sites/shared/bits  (typed barrel of raw ReactBits components, props = any)
AccordionGallery AnimatedList Aurora BlurText BounceCards CardSwap CountUp DecryptedText
Dock DotGrid FlowingMenu Galaxy GlassIcons GooeyNav GradualBlur GradientBlinds GradientText
LogoLoop MagicBento MagicRings MaskedHeading Particles PillNav Plasma PlasmaWave Ribbons
RotatingText ShinyText SpecularButton SpotlightCard SplitText Stepper TextType Threads
TrueFocus WarpText WebThreads

// available deps: framer-motion, lucide-react, clsx, tailwind-merge, @/demo/helpers (cn)
```

Notes on tricky bits (read their `.jsx` for exact props):

- `MagicBento` is a **monolithic demo** (content baked in). To use the *effect*,
  fork the pattern into a local component **inside your variant folder**
  (spotlight-follow glow + gsap tilt + click particles; reuse `MagicBento.css`
  via your own css copy if needed).
- `GooeyNav` has internal state and no selection callback. Fork locally into
  your folder adding `onSelect(index)` if you need it to drive tabs.
- `AccordionGallery`/`CardSwap`/`BounceCards` need image URLs — feed them
  `data:image/svg+xml;utf8,...` URIs (see aurora-glass `About.tsx` for the
  encodeURIComponent pattern, or build a small local helper that renders an
  Artwork-like SVG string from `{style,hue}`).
- `MaskedHeading` needs `src` (masked media) — SVG data URI works well.
- `WarpText` renders warped text via WebGL texture from the given text.
- `Threads`/`WebThreads`/`Galaxy`/`Ribbons`/`PlasmaWave`/`GradientBlinds`/
  `Particles`/`Aurora` are full-bleed WebGL canvases — give the parent a
  sized/positioned container; they clean up on unmount.
- `Dock` items: `{icon, label, onClick}`; magnifies on hover.
- `CountUp` — numeric only; strip suffixes and render them outside the counter
  (see aurora-glass `Hero.tsx` stats).

## Conventions

- Files: `src/sites/sites/<id>/Site.tsx` (default export) + `tabs/*.tsx` + optional `ui.tsx`.
- Site root sets its own bg/text colors and `min-h-screen`; the toast floats above everything (z-[9999] is already handled by the toast itself).
- Add a small footer line: name · "concept N — <name>" · year.
- Verify: `npx tsc --noEmit` passes; smoke-test your modules via the running dev server (http://localhost:5173) by loading `http://localhost:5173/#/site/<id>` — HMR is live.
- Do not touch `registry.ts`, `VariantToast.tsx`, `Showcase.tsx`, shared files, or other variants — the parent integrates.

## Variant briefs

### V2 — `galaxy` "Galaxy Drift"  (`src/sites/sites/galaxy/`)
Deep-space observatory. Bg: full-bleed `Galaxy` (hueShift ~210, mouseInteraction,
saturation ~0.4) over `#05060d`, subtle vignette. Panels: white/[0.04] glass,
borders white/[0.08]. Accents: indigo #818cf8, violet #a78bfa, cyan #67e8f9.
Fonts: `font-display` (Space Grotesk) for headings, Inter body.
- Tabs: reactbits `Dock` top-center (lucide icons: Home, Briefcase, Cpu, FolderGit2, User, Mail) + wordmark left. Dock items call onNavigate.
- Hero: `DecryptedText` big headline (name), `RotatingText` roles, `TextType` tagline, stats row with `CountUp`, Artwork banner.
- Experience: left menu (numbered rows, cyan glow on active); detail: DecryptedText role heading, Artwork, paragraphs, bullets, tech pills (mono), metrics CountUp, deep-dive disclosure.
- Skills: left menu; detail: `DotGrid` panel as the detail backdrop (absolute, low opacity) with custom ring/bars — skill "orbit rings": circular conic-gradient rings per skill or level bars with glow.
- Projects: grid of glass cards, constellation Artwork, hover glow; stats with CountUp.
- About: bio + education card + `MagicRings` as a decorative element (e.g. behind the education card or hero corner, ~300px, muted colors).
- Contact: `SpecularButton` (cyan/indigo tints) + link cards.

### V3 — `noir-threads` "Noir Threads"  (`src/sites/sites/noir-threads/`)
Editorial monochrome noir — **rbp-portfolio inspired**: bg #0a0a0a, text #fafafa,
muted #a3a3a3, borders #262626, ring accent #3b82f6, Fraunces serif (`font-serif`),
very rounded (rounded-3xl), generous whitespace, thin dividers. `WebThreads`
canvas subtle behind hero only (opacity ~0.25, white threads). NO colorful
gradients — restraint is the identity; the only strong color is the blue accent.
- Tabs: minimal text tabs top-center with a 1px sliding underline (framer motion layout), letter-spaced uppercase 12px.
- Hero: huge `MaskedHeading` (name as text, grayscale SVG data-URI media, reveal 'rise'), mono metadata rows (location · availability · focus areas), `SpecularButton` neutral CTA.
- Experience: left menu as editorial index (mono `01` + serif title, thin bottom borders, blue left rule on active); detail: serif headings, Artwork with `grayscale`/low-saturation filter, paragraphs possibly in 2 columns (md:columns-2), metrics as thin stat rows (label left, value right, 1px separators), deep-dive as numbered footnotes.
- Skills: left menu; detail: 1px-track level bars with blue fill, mono percentage, subtle hover.
- Projects: reactbits `AccordionGallery` (horizontal; images = grayscale-able SVG data URIs from project art specs; labels = project titles; accent #3b82f6). Below/above it, editorial project rows with links.
- About: `SplitText` (scroll-triggered) bio lines, education + thesis in bordered cards, `GradualBlur` at bottom.
- Contact: big serif line, `SpecularButton`, `LogoLoop` (tech names, monochrome) as a divider strip.

### V4 — `plasma-bento` "Plasma Bento"  (`src/sites/sites/plasma-bento/`)
Vibrant gradient playground. Bg: `GradientBlinds` top band (gradientColors
orange #f97316 → pink #ec4899 → violet #8b5cf6, blindCount ~14, distort ~0.6,
shine) fading into #0d0a12; rest of page solid with faint glow blobs. Accents:
orange/pink/violet. Fonts: Space Grotesk (`font-display`), chunky rounded-3xl
surfaces with strong shadows.
- Tabs: fork `GooeyNav` locally (add onSelect) OR custom pill tabs with gooey-ish blob indicator (your call) — must drive the 6 tabs.
- Hero: `GradientText` animated name, `RotatingText` roles, `TextType` tagline, stats with CountUp, big rounded Artwork card.
- Experience: left menu (chunky rounded items, orange→pink gradient bar on active); detail: MagicBento-style layout — fork the bento card effect locally: grid of cards with cursor spotlight glow (radial gradient following mouse), slight gsap tilt, click particle burst (reuse patterns from MagicBento.jsx). Cards: story card (col-span-2), contributions, metrics (CountUp), stack pills, deep-dive.
- Skills: same left menu; detail: bento grid — one card per skill group item? No: one card per skill with level ring/bar; description card on top with Artwork.
- Projects: bento cards (featured spans 2 cols) with Artwork, glow, links.
- About: bio card + education card + `Stepper` as career timeline (4 steps = experiences).
- Contact: `SpecularButton` (orange tint) + link cards; `GradualBlur` bottom.

### V5 — `prism-ribbons` "Prism Ribbons"  (`src/sites/sites/prism-ribbons/`)
Flowing holographic. Bg: `Ribbons` full-bleed (colorful polylines, low alpha)
over #07080d; a `PlasmaWave` band across the hero (check its props: strokeColor
cyan/violet, backgroundColor transparent). Accents: cyan #22d3ee, violet #a78bfa,
pink #f472b6. Fonts: Inter body, `font-serif` italic accents.
- Tabs: custom floating capsule tabs top-center — glass capsule, framer layoutId prism-gradient indicator (linear-gradient across cyan→violet→pink), subtle tilt on hover.
- Hero: `DecryptedText` headline, `RotatingText`, stats, PlasmaWave band behind/under the headline, Artwork strip.
- Experience: left menu as 3D tilt cards (active card lifts with rotateY ~4deg, gradient border via border-image or pseudo); detail: Artwork, paragraphs, metrics CountUp, tech pills, deep-dive accordion.
- Skills: left menu; detail: prism gradient level bars + `AnimatedList` for "highlights" (top badges per category) — read AnimatedList.jsx for its item shape ({name, description, time?}).
- Projects: featured project in `CardSwap` (3 swap cards using Artwork SVG data URIs); remaining projects in a grid; `BounceCards` as an optional playful gallery strip on Home.
- About: `FlowingMenu` for "what I do" items (read its item shape: {link, text, img?} — svg data URIs ok), education card.
- Contact: `DotGrid` panel behind a centered CTA + `SpecularButton`.

## Definition of done (per variant)

- [ ] All 6 tabs implemented; experience + skills follow the left-menu pattern
- [ ] Uses the assigned ReactBits components for its identity (plus a few extras of taste)
- [ ] Responsive (menu stacks on mobile), keyboard-safe, no console errors
- [ ] `npx tsc --noEmit` passes
- [ ] Visual quality matches or exceeds aurora-glass
