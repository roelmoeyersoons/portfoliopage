# AGENTS.md — read this first

Compact map of this repo so a session does not have to re-read the codebase.
Deeper detail lives in `docs/architecture.md`.

## What this project is

Roel Moeyersoons' personal portfolio: **one single website, "Bento Galaxy"** —
Plasma Bento's layout (chunky bento grids with cursor-spotlight cards, gooey
pill tabs, veil tab-swaps, tab structure `home · experience · skills ·
projects · about · contact`) fully re-skinned in Galaxy Drift's deep-space
observatory theme (#05060d stage, indigo/violet/cyan accents, WebGL starfield,
mono telemetry chrome). `src/main.tsx` mounts the site directly — there is no
shell, switcher or hash routing anymore.

Stack: React 18 + TypeScript (strict) + Vite 6 + Tailwind CSS 3.4 + Framer
Motion 11, composed from a pruned set of raw
[React Bits](https://www.reactbits.dev) components (WebGL/canvas/gsap/motion)
plus deterministic generated SVG artwork — no binary image assets.

## Hard rules (owner decisions — never violate)

Owner decisions live in the workspace memory log (`.dsh/memory/DECISIONS.md`;
entries are prefixed M-000x). The standing ones:

1. **Never mention "Gneiss"** anywhere on the site (M-0001); the Baloise BE
   role is presented as independent/self-employed.
2. **Positioning**: application engineer — Dynamics 365 / Power Platform,
   C#/.NET and Azure lead everywhere; AI present but kept light;
   MAC/UWB/OpenGL-type skills belong under "Other"; education is included but
   never as the site's main header (M-0002).
3. **Content workflow**: content changes flow through
   `src/data/portfolioData.ts` → `src/sites/shared/content.ts`; no design
   updates unless explicitly requested (M-0003).
4. **Skills model**: exactly 6 core skills (Dynamics 365 & Power Platform →
   Azure platform → Applied AI → C#/.NET → DevOps/CI-CD+IaC → Solution
   architecture), narrative + proof points, **no proficiency percentages on
   core skills**; everything else sits in "Other — used along the way" with
   usage-centrality rings (M-0004).
5. **Skills presentation**: plain heading "Skills", one short neutral intro
   sentence, click-to-open detail, cross-tab skill links (M-0006).
6. **Single-site consolidation** (2026-09): the other 5 concepts, original v1
   and the React Bits Lab were removed; the old "apply changes to all
   variants" default is retired. The pre-consolidation showcase is preserved
   at git tag `showcase-v1` (see below).

## Structure at a glance

```
src/
  main.tsx                      → mounts <Site/> directly (no shell)
  index.css                     → tailwind base + deep-space body + scrollbar utils
  sites/
    sites/bento-galaxy/         → THE site
      Site.tsx                  → Galaxy backdrop, header + GooeyTabs, veil, footer
      ui.tsx                    → tokens & primitives (ACCENTS, GLOW, Chip, TechPill,
                                  Panel, SectionHeading, OrbitRing, Metric)
      ui/BentoCard.tsx          → BentoGrid/BentoCard (spotlight, gsap tilt, click burst)
      ui/GooeyTabs.tsx          → gooey pill tab nav (controlled fork of GooeyNav)
      ui/bento.css              → card surfaces/glows           (gx- prefix)
      ui/gooey.css              → gooey nav effect            (gx- prefix)
      ui/station.css            → stepper re-theme + ping dot (gx- prefix)
      tabs/Hero.tsx             → telemetry bar, identity, scan-station card, stats, marquee
      tabs/About.tsx            → bio + education + career stepper + Terminal (bottom)
      tabs/Terminal.tsx         → interactive CLI (from original v1; content-module-driven)
      tabs/Skills.tsx           → selector tiles + stage dossier, OrbitRing toolbox
      tabs/Experience.tsx       → left menu + bento detail pane
      tabs/Projects.tsx         → expandable signal slabs
      tabs/Contact.tsx          → transmission console, "signal ends · awaiting your reply"
    shared/
      content.ts                → THE content API (wraps portfolioData)
      Artwork.tsx               → deterministic SVG art per item (6 styles, hue-driven)
      iconMap.ts                → resolveIcon('Code2') → LucideIcon
      useTabVeil.tsx            → fade-through-dark tab transition
      cn.ts                     → class merge helper (clsx + tailwind-merge)
      bits/                     → 11 raw ReactBits JSX+CSS files 1:1 behind a typed barrel
  data/portfolioData.ts         → ALL raw content (the only place to edit content)
  types/portfolio.ts            → type definitions for the data
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server → http://localhost:5173 (HMR) |
| `npx tsc --noEmit` | Type check — **must pass before finishing any change** |
| `npm run build` | tsc + vite build + **ships dist to `/mnt/d/Users/daroe/Desktop/projecten/AI/landingpage-dist`** — fails when that Windows path is not mounted; use `npx vite build` instead |
| `npm run ship` | Copy an existing `dist/` to the Windows dir |
| `npm run preview` | Preview the production build |

## Replaying the old showcase (archive)

The pre-consolidation app — 5 concepts + original v1 + the React Bits Lab —
is **tagged, not deleted**. To launch it exactly as it was:

```bash
git worktree add ../landingpage-showcase-v1 showcase-v1   # materialize a full copy
cd ../landingpage-showcase-v1 && npm install && npm run dev
git worktree remove ../landingpage-showcase-v1            # when done
```

## Gotchas

- React **StrictMode double-mounts** effects in dev: every canvas / RAF /
  event-listener effect must return a cleanup function.
- `@` is the path alias for `src/` (vite.config.ts + tsconfig.json). Prefer it.
- There is now **one** bits collection: `src/sites/shared/bits/` — 11 raw
  JSX+CSS ReactBits files (CountUp, DecryptedText, DotGrid, Galaxy,
  GradualBlur, GradientText, LogoLoop, RotatingText, SpecularButton, Stepper,
  TextType). To add one back: drop the file(s) in and add a typed export to
  `bits/index.ts`.
- Local primitives/classes use the `gx-` prefix (`gx-bento-card`,
  `gx-gooey`, `gx-stepper`, `gx-ping`, `gx-spotlight`…).
- Deps in use: `ogl` (Galaxy, SpecularButton), `gsap` + InertiaPlugin
  (BentoCard, DotGrid, TextType), `motion` (ReactBits bits),
  `framer-motion` (site tabs), `clsx` + `tailwind-merge` (cn),
  `lucide-react`. `three` and `@gsap/react` were removed in the
  consolidation — don't re-add without a reason.
- `base: './'` in vite.config.ts → the build works on any static host.
- The terminal lives at the bottom of About; its commands read from
  `shared/content.ts` (the ASCII `table` is hand-kept — update it when
  experiences change).

## Docs

- `docs/architecture.md` — boot flow, module map, data flow, tokens, conventions
- The per-concept specs (`docs/site-concepts.md`, `docs/demo-lab.md`) were
  retired in the consolidation; they live in git history under tag
  `showcase-v1`.
