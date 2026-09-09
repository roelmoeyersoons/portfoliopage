# AGENTS.md — read this first

Compact map of this repo so a session does not have to re-read the codebase.
Deeper detail lives in the three docs listed at the bottom.

## What this project is

Roel Moeyersoons' personal portfolio: **one React app that boots into a showcase
shell** (`src/sites/Showcase.tsx`) mounting **6 full website concepts**, one at a
time. A neutral toast at the bottom (`src/sites/VariantToast.tsx`) switches
between concepts (hash `#/site/<id>`, keys `1..6`, `←`/`→`, choice persisted in
`localStorage` under `showcase.site`).

Stack: React 18 + TypeScript (strict) + Vite 6 + Tailwind CSS 3.4 + Framer
Motion 11. Concept sites are composed from raw [React Bits](https://www.reactbits.dev)
components (WebGL/canvas/gsap/motion) plus deterministic generated SVG artwork —
no binary image assets.

## Hard rules (owner decisions — never violate)

Read from .dsh/Decisions.md

## Structure at a glance

```
src/
  main.tsx                  → renders <Showcase/> (the shell, always)
  sites/
    Showcase.tsx            → mounts one site + keeps the toast mounted
    registry.ts             → SiteDef[] — the 6 concepts (lazy-loaded)
    VariantToast.tsx        → bottom switcher (toast, shortcuts, palette swatches)
    shared/
      content.ts            → THE content source for all variants (wraps portfolioData)
      Artwork.tsx           → deterministic SVG art per item (6 styles, hue-driven)
      hooks.ts              → useSiteRoute (hash + localStorage routing)
      iconMap.ts            → resolveIcon('Code2') → LucideIcon
      bits/                 → ~38 raw ReactBits JSX+CSS files 1:1 behind a typed barrel
    sites/<id>/             → the 6 concepts: Site.tsx + tabs/*.tsx + ui.tsx
  App.tsx                   → "Original v1" site: one-pager + React Bits Lab overlay
  components/               → original v1 sections (hero, experience, terminal, …)
  components/reactbits/     → 7 TS components powering the original v1 page
  demo/                     → React Bits Lab (DemoLab.tsx, registry.ts, bits/)
  data/portfolioData.ts     → ALL raw content (profile, experiences, projects,
                              coreSkillsData, otherSkillsData, education, marquee)
  types/portfolio.ts        → type definitions for the data
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server → http://localhost:5173 (HMR) |
| `npx tsc --noEmit` | Type check — **must pass before finishing any change** |
| `npm run build` | tsc + vite build + **ships dist to `/mnt/d/Users/daroe/Desktop/projecten/AI/landingpage-dist`** — fails when that Windows path is not mounted; use `npx vite build` instead |
| `npm run ship` | Copy an existing `dist/` to the Windows dir |
| `npm run preview` | Preview the production build |

## Routing map

- `#/site/aurora-glass` · `#/site/galaxy` · `#/site/noir-threads` ·
  `#/site/plasma-bento` · `#/site/prism-ribbons` — the five showcase concepts
- `#/original` — the original v1 one-pager (`src/App.tsx`)
- `#/reactbits` — React Bits Lab overlay (rendered inside the original site;
  the toast maps this hash back to the original site)

## Gotchas

- React **StrictMode double-mounts** effects in dev: every canvas / RAF /
  event-listener effect must return a cleanup function.
- `@` is the path alias for `src/` (vite.config.ts + tsconfig.json). Prefer it in new code.
- There are **three separate "bits" collections** — do not confuse them:
  1. `src/components/reactbits/` — 7 typed components powering original v1 (do not casually modify)
  2. `src/demo/bits/` — ~37 TS+Tailwind lab re-implementations (React Bits Lab)
  3. `src/sites/shared/bits/` — ~38 raw JSX+CSS ReactBits files 1:1, used by the 5 concept sites
- Root-level folders `galaxy/`, `noir-threads/`, `plasma-bento/`, `prism-ribbons/`
  are **stale placeholder stubs** from an earlier layout plan. The real variants
  live in `src/sites/sites/<id>/`. Ignore the stubs.
- WebGL deps (`ogl`, `three`, `gsap`, `@gsap/react`, `motion`) exist for the ReactBits
  components — don't remove them casually.
- `base: './'` in vite.config.ts → the build works on any static host.

## Docs

- `docs/architecture.md` — full structure, boot flow, data flow, design tokens, conventions
- `docs/site-concepts.md` — the 6 concepts, hard requirements, shared APIs, per-variant briefs
- `docs/demo-lab.md` — the React Bits Lab: what it is, status, promotion path
