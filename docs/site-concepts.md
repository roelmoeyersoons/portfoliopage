# Site Concepts — build spec

The showcase mounts 6 full website concepts. This is the spec every concept
follows, the shared APIs it may use, and the per-variant design briefs.
Variant 1 (`aurora-glass`) is the reference implementation — read it before
writing anything new:

- `src/sites/sites/aurora-glass/Site.tsx` — shell, top tabs, backdrop, tab transitions
- `src/sites/sites/aurora-glass/tabs/*.tsx` — one file per tab
- `src/sites/sites/aurora-glass/ui.tsx` — local styled primitives

## The 6 concepts (registered in `src/sites/registry.ts`)

| # | id | Name | Identity |
|---|---|---|---|
| 1 | `aurora-glass` | Aurora Glass | WebGL aurora, glass panels, Fraunces serif, violet→fuchsia→cyan |
| 2 | `galaxy` | Galaxy Drift | Deep-space WebGL galaxy, decrypted headings, orbital skill rings |
| 3 | `noir-threads` | Noir Threads | Editorial monochrome noir, web-thread canvas, accordion gallery |
| 4 | `plasma-bento` | Plasma Bento | Magnetic bento grids with glow-follow cards over gradient blinds |
| 5 | `prism-ribbons` | Prism Ribbons | Flowing WebGL ribbons, plasma-wave hero, card-swap project deck |
| 6 | `original` | Original v1 | The first one-pager (`src/App.tsx`): particles + terminal |

`SiteDef` shape: `{ id, name, tagline, palette: string[] (3 hex, toast swatches),
components: string[], load: () => Promise<{ default: ComponentType }>`.

## Hard requirements (every variant)

1. **Tabs at the top** for `home · experience · skills · projects · about ·
   contact` (labels may be restyled, ids stay).
2. **Experience tab**: LEFT sidebar menu listing the 4 roles; selecting one shows
   paragraphs, artwork, bullets, tech, metrics, deep-dive in the MAIN pane.
3. **Skills tab**: same left-menu + main-pane pattern — but per owner decision the
   presentation is plain & professional: heading just "Skills", one neutral intro
   sentence, click-to-open skill detail (see AGENTS.md rules 4–5).
4. Data comes from the shared content module — **never hardcode content**.
5. Fully responsive: on `<lg` the left menu becomes a horizontal scrollable strip
   above the detail pane (see aurora-glass `Experience.tsx` for the pattern).
6. TypeScript strict must pass (`npx tsc --noEmit`); keep `npm run dev` clean.

## Shared APIs (do NOT edit files outside your variant folder)

```ts
// src/sites/shared/content.ts
siteTabs: { id: TabId, label }[]                       // TabId = 'home'|'experience'|'skills'|'projects'|'about'|'contact'
TabNavigate(tab: TabId, focusId?: string)              // cross-tab nav with focus targeting (skill links)
profile     // name, firstName, lastName, initials, title, tagline, bioParagraphs, location, stats[4]
experiences: { id, index:'01', role, company, shortCompany, period, location, type, domain,
               summary, paragraphs[], bullets[], tech[], metrics[{label,value}],
               deepDive{challenge, solution, learnings[]}, art{style,hue} }[]
coreSkills: { id, index, title, description, narrative[], proofPoints[], links[] }[]
            // the 6 core skills (owner model) — NO proficiency percentages
otherSkills // "Other — used along the way": groups with items[{name, level, years?, badge?}]
            // percentage bars here are framed as usage centrality, not proficiency
projects:   { id, title, category, tagline, description, tags[], githubUrl?, highlights[],
              stats[{label,value}], featured, art }[]
education   // degree, institution, period, grade, thesis{title, abstract, keyContributions[], supervisors[]}
contact     // email, linkedinUrl, githubUrl, location
techMarquee: string[]
rotatingRoles: string[]

// src/sites/shared/Artwork.tsx (default export)
<Artwork spec={art} seed={id} className="absolute inset-0 h-full w-full" />
// spec = {style: 'orbits'|'mesh'|'waves'|'constellation'|'strata'|'grid', hue} — deterministic SVG

// src/sites/shared/iconMap.ts
resolveIcon('Code2') -> LucideIcon

// src/sites/shared/bits — typed barrel of raw ReactBits components (props = any)
AccordionGallery AnimatedList Aurora BlurText BounceCards CardSwap CountUp DecryptedText
Dock DotGrid FlowingMenu Galaxy GlassIcons GooeyNav GradualBlur GradientBlinds GradientText
LogoLoop MagicBento MagicRings MaskedHeading Particles PillNav Plasma PlasmaWave Ribbons
RotatingText ShinyText SpecularButton SpotlightCard SplitText Stepper TextType Threads
TrueFocus WarpText WebThreads

// available deps: framer-motion, lucide-react, clsx, tailwind-merge, @/demo/helpers (cn)
```

Notes on tricky bits (read their `.jsx` for exact props):

- `MagicBento` is a monolithic demo (content baked in). To use the *effect*, fork
  the pattern into a local component **inside your variant folder** (spotlight-follow
  glow + gsap tilt + click particles; copy `MagicBento.css` locally if needed).
- `GooeyNav` has internal state and no selection callback — fork locally adding
  `onSelect(index)` if it must drive tabs.
- `AccordionGallery`/`CardSwap`/`BounceCards` need image URLs — feed them
  `data:image/svg+xml;utf8,...` URIs (see aurora-glass `About.tsx` for the
  encodeURIComponent pattern).
- `MaskedHeading` needs `src` (masked media) — SVG data URI works well.
- `WarpText` renders warped text via WebGL texture from the given text.
- `Threads`/`WebThreads`/`Galaxy`/`Ribbons`/`PlasmaWave`/`GradientBlinds`/`Particles`/`Aurora`
  are full-bleed WebGL canvases — give the parent a sized/positioned container;
  they clean up on unmount.
- `Dock` items: `{icon, label, onClick}`; magnifies on hover.
- `CountUp` is numeric only — strip suffixes and render them outside the counter.

## Conventions

- Files: `src/sites/sites/<id>/Site.tsx` (default export) + `tabs/*.tsx` + optional
  `ui.tsx` or `ui/` folder.
- Site root sets its own bg/text colors and `min-h-screen`; the toast floats above
  everything (its z-index is self-managed).
- Add a small footer line: name · "concept N — <name>" · year.
- Verify: `npx tsc --noEmit` passes; smoke-test at
  `http://localhost:5173/#/site/<id>` (dev server has HMR).
- Do not touch `registry.ts`, `VariantToast.tsx`, `Showcase.tsx`, shared files, or
  other variants — the shell integrates them.

## Per-variant briefs

### V1 — `aurora-glass` (reference implementation)
Aurora WebGL backdrop, glass panels, Fraunces serif display, violet→fuchsia→cyan.
Complete; use it as the quality bar and pattern source.

### V2 — `galaxy` "Galaxy Drift" (`src/sites/sites/galaxy/`)
Deep-space observatory. Bg: full-bleed `Galaxy` (hueShift ~210, mouseInteraction,
saturation ~0.4) over `#05060d`, subtle vignette. Panels: white/[0.04] glass,
borders white/[0.08]. Accents: indigo #818cf8, violet #a78bfa, cyan #67e8f9.
Fonts: `font-display` (Space Grotesk) headings, Inter body.
- Tabs: `Dock` top-center (Home, Briefcase, Cpu, FolderGit2, User, Mail) + wordmark left.
- Hero: `DecryptedText` headline, `RotatingText` roles, `TextType` tagline, stats with `CountUp`, Artwork banner.
- Experience: left menu (numbered rows, cyan glow on active); detail: DecryptedText heading, Artwork, paragraphs, bullets, mono tech pills, CountUp metrics, deep-dive disclosure.
- Skills: left menu; `DotGrid` panel backdrop at low opacity, orbit-ring/level-bar skill visuals.
- Projects: glass card grid with constellation Artwork + CountUp stats.
- About: bio + education card + `MagicRings` as muted decoration.
- Contact: `SpecularButton` (cyan/indigo) + link cards.

### V3 — `noir-threads` "Noir Threads" (`src/sites/sites/noir-threads/`)
Editorial monochrome noir. Bg #0a0a0a, text #fafafa, muted #a3a3a3, borders
#262626, ring accent #3b82f6, Fraunces serif, rounded-3xl, generous whitespace,
thin dividers. `WebThreads` canvas behind hero only (opacity ~0.25, white).
NO colorful gradients — restraint is the identity; blue is the only strong color.
- Tabs: minimal text tabs, 1px sliding underline (framer layout), uppercase 12px letter-spaced.
- Hero: huge `MaskedHeading` (grayscale SVG data-URI, reveal 'rise'), mono metadata rows, neutral `SpecularButton`.
- Experience: editorial index left menu (mono 01 + serif title, blue left rule); detail: serif headings, grayscale-filtered Artwork, paragraphs (md:columns-2), thin stat rows, deep-dive as numbered footnotes.
- Skills: left menu; 1px-track level bars with blue fill, mono percentage.
- Projects: `AccordionGallery` (grayscale-able SVG data URIs, accent #3b82f6) + editorial rows.
- About: `SplitText` (scroll-triggered) bio, education/thesis bordered cards, `GradualBlur` bottom.
- Contact: big serif line, `SpecularButton`, `LogoLoop` (monochrome tech names) divider.

### V4 — `plasma-bento` "Plasma Bento" (`src/sites/sites/plasma-bento/`)
Vibrant gradient playground. Bg: `GradientBlinds` top band (orange #f97316 → pink
#ec4899 → violet #8b5cf6, blindCount ~14, distort ~0.6) fading into #0d0a12.
Accents: orange/pink/violet. Space Grotesk display, chunky rounded-3xl surfaces,
strong shadows.
- Tabs: local `GooeyTabs` fork (onSelect added) — must drive the 6 tabs.
- Hero: `GradientText` name, `RotatingText`, `TextType`, CountUp stats, big rounded Artwork card.
- Experience: left menu (orange→pink gradient bar on active); MagicBento-forked detail: cursor-spotlight glow cards, gsap tilt, click particle burst (local `ui/BentoCard.tsx` + `ui/bento.css`).
- Skills: left menu; bento grid with per-skill level ring/bar + description card.
- Projects: bento cards (featured spans 2 cols), Artwork + glow + links.
- About: bio card + education card + `Stepper` career timeline (4 steps).
- Contact: `SpecularButton` (orange tint) + link cards, `GradualBlur` bottom.

### V5 — `prism-ribbons` "Prism Ribbons" (`src/sites/sites/prism-ribbons/`)
Flowing holographic. Bg: `Ribbons` full-bleed (colorful polylines, low alpha) over
#07080d; `PlasmaWave` band across the hero. Accents: cyan #22d3ee, violet #a78bfa,
pink #f472b6. Inter body, italic `font-serif` accents.
- Tabs: floating glass capsule tabs, framer `layoutId` prism-gradient indicator (cyan→violet→pink).
- Hero: `DecryptedText` headline, `RotatingText`, stats, PlasmaWave band, Artwork strip.
- Experience: left menu as 3D tilt cards (active lifts rotateY ~4deg, gradient border); detail: Artwork, CountUp metrics, tech pills, deep-dive accordion.
- Skills: left menu; prism gradient level bars + `AnimatedList` highlights.
- Projects: featured project in `CardSwap` (Artwork SVG data URIs); rest in grid; `BounceCards` playful strip on Home.
- About: `FlowingMenu` for "what I do" items, education card.
- Contact: `DotGrid` panel behind centered CTA + `SpecularButton`.

### V6 — `original` (`src/App.tsx`)
The original v1 one-pager: `ParticlesBackground`, terminal easter egg, matrix
table mode, bento projects. Hosts the React Bits Lab at `#/reactbits`
(see `docs/demo-lab.md`). Kept as a working site, not restyled.

## Definition of done (per variant)

- [ ] All 6 tabs implemented; experience + skills follow the left-menu pattern
- [ ] Uses the assigned ReactBits components for its identity (plus a few of taste)
- [ ] Responsive (menu stacks on mobile), keyboard-safe, no console errors
- [ ] `npx tsc --noEmit` passes
- [ ] Visual quality matches or exceeds aurora-glass
