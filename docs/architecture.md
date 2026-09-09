# Architecture

How the app is put together: boot flow, module map, data flow, design tokens,
and coding conventions. The short version of all of this is in `AGENTS.md`.

## Boot flow

```
index.html
  └─ src/main.tsx (ReactDOM + StrictMode)
       └─ src/sites/Showcase.tsx        ← the shell; ALWAYS the root component
            ├─ useSiteRoute()           ← hash #/site/<id> + localStorage 'showcase.site'
            ├─ <Site/>                  ← lazy-loaded from src/sites/registry.ts
            │    └─ 'original' resolves to src/App.tsx (the v1 one-pager)
            │         └─ #/reactbits renders the DemoLab overlay inside it
            └─ <VariantToast/>          ← bottom switcher, kept mounted across switches
```

- Empty hash / first visit → saved site from localStorage, else `aurora-glass`
  (first entry in the registry).
- `parseHash` in `shared/hooks.ts` maps `#/reactbits` → `original` so the lab
  renders inside the original site while the toast stays coherent.
- A per-site error boundary catches a crashed concept and offers the switcher.

## Module map

### The showcase layer — `src/sites/`

| File | Role |
|---|---|
| `registry.ts` | `SiteDef[]`: id, name, tagline, palette (toast swatches), components list, lazy `load()` |
| `Showcase.tsx` | Error boundary + lazy site mount + toast |
| `VariantToast.tsx` | Neutral switcher UI: swatches, keys `1..6`, `←`/`→`, hash update |
| `shared/content.ts` | THE content API every variant consumes (see below) |
| `shared/Artwork.tsx` | Deterministic generated SVG per item — spec `{style, hue}`, styles: `orbits · mesh · waves · constellation · strata · grid` |
| `shared/hooks.ts` | `useSiteRoute` (hash ↔ state ↔ localStorage) |
| `shared/iconMap.ts` | String icon names → `LucideIcon` |
| `shared/bits/` | ~38 raw ReactBits files (JSX + CSS, 1:1 from the repo) behind a typed barrel import |

### The concepts — `src/sites/sites/<id>/`

Each concept is standalone: `Site.tsx` (default export; sets its own
bg/text/min-h-screen), `tabs/*.tsx` (one per tab), optional `ui.tsx` or `ui/`
folder for local primitives. Tab ids are fixed:
`home · experience · skills · projects · about · contact`.

### Original v1 — `src/App.tsx` + `src/components/`

The first single-page portfolio (particles + terminal). Sections:
Hero → Experience (cards + matrix table + deep-dive modal) → Projects bento →
Skills → Education → Terminal easter egg → Contact → Footer. Scroll-spy navbar,
glassmorphic mobile drawer. Its ReactBits components live in
`src/components/reactbits/` (7 files — stable, don't casually modify).

### React Bits Lab — `src/demo/`

Full-screen overlay at `#/reactbits`, opened from a floating ⚡ button inside
the original site. Sidebar of categorized preview components. See
`docs/demo-lab.md`.

### Data — `src/data/` + `src/types/`

`src/data/portfolioData.ts` is the single raw content file (typed by
`src/types/portfolio.ts`): `profileData`, `experiencesData`,
`projectsData`, `coreSkillsData`, `otherSkillsData`, `educationData`,
`marqueeTechList`. Editing it updates all six sites.

## Data flow

```
src/data/portfolioData.ts        (raw typed content — the only place to edit content)
        │  .map()/shaping
        ▼
src/sites/shared/content.ts      (variant-facing API: profile, experiences,
        │                         coreSkills, otherSkills, projects, education,
        │                         contact, techMarquee, rotatingRoles, siteTabs)
        ├──► aurora-glass / galaxy / noir-threads / plasma-bento / prism-ribbons
        └──► (original v1 imports portfolioData directly — legacy path)
```

Key content.ts exports (see `docs/site-concepts.md` for full shapes):

- `siteTabs`, `TabId`, `TabNavigate(tab, focusId?)` — cross-tab navigation with
  focus targeting (used by skill ↔ project/experience links).
- `experiences: ExperienceEntry[]` — story paragraphs, bullets, tech, metrics,
  `deepDive{challenge, solution, learnings[]}`, art spec.
- `coreSkills` / `otherSkills` — the 6-core-skills + Other model (owner
  decision — see AGENTS.md rule 4). **No percentage levels on core skills.**
- `projects`, `profile`, `education`, `contact`, `techMarquee`, `rotatingRoles`.

## Design tokens (`tailwind.config.js`)

| Token | Value |
|---|---|
| Page bg | `background #090a0f` |
| Surfaces | `surface-50 #181b26 · surface-100 #13151f · surface-200 #0f1118 · surface-300 #0b0c12` |
| Border / glow | `surface-border rgba(255,255,255,.08)` · `surface-glow rgba(56,189,248,.15)` |
| Brand | cyan `#00f2fe` · blue `#4facfe` · purple `#7928ca` · pink `#ff0080` · emerald `#10b981` · amber `#f59e0b` |
| Fonts | `sans` Inter · `mono` JetBrains Mono · `serif` Fraunces · `display` Space Grotesk |

The five concepts layer their own palettes on top (indigo/violet/cyan, monochrome
noir + blue, orange/pink/violet, prism cyan/violet/pink) — see
`docs/site-concepts.md`.

## Conventions

- TypeScript strict; `npx tsc --noEmit` must pass. `React.FC<Props>` with typed
  props interfaces and sensible defaults.
- Framer Motion v11 (`framer-motion` package name — do not migrate to `motion`
  in existing files); spring-physics transitions
  (`{ type: 'spring', stiffness, damping }`).
- Every canvas/RAF/listener effect cleans up on unmount (StrictMode double-mount).
- `@/` alias for `src/`; prefer it in new code.
- `base: './'` → static hosting anywhere (GitHub Pages, Cloudflare, Vercel, …).
- Cleanup discipline: WebGL canvases (the bits backgrounds) unmount cleanly —
  give each a sized/positioned parent container.

## Deployment

`npm run build` = `tsc && vite build && npm run ship`. The `ship` step copies
`dist/` to `/mnt/d/Users/daroe/Desktop/projecten/AI/landingpage-dist` — it only
works where that WSL mount exists. Otherwise run `npx vite build` and ship manually.
