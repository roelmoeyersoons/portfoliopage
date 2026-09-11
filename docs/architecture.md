# Architecture

How the app is put together: boot flow, module map, data flow, design tokens,
and coding conventions. The short version of all of this is in `AGENTS.md`.

## Boot flow

```
index.html
  └─ src/main.tsx (ReactDOM + StrictMode)
       └─ src/sites/sites/bento-galaxy/Site.tsx   ← THE site; single root component
            ├─ <Galaxy/> WebGL starfield backdrop (fixed, -z-10) + vignette overlays
            ├─ header: wordmark + <GooeyTabs/> (6 pill tabs)
            ├─ <ActiveView/>  ← one of tabs/{Hero,Experience,Skills,Projects,About,Contact}
            │    └─ tab swaps run through shared/useTabVeil (fade-through-dark)
            └─ footer + <GradualBlur/> bottom fade
```

No hash routing, no switcher, no error-boundary-per-site — there is exactly
one site. The pre-consolidation app is preserved at git tag `showcase-v1`.

## Module map

### The site — `src/sites/sites/bento-galaxy/`

| File | Role |
|---|---|
| `Site.tsx` | Root: Galaxy backdrop, header (wordmark + GooeyTabs), veil-driven tab views, footer |
| `ui.tsx` | Tokens (`ACCENTS`, `ACCENT_GRADIENT`, `ACTIVE_GLOW`, `GLOW`, `TEXT_GRADIENT`) + primitives (`Chip`, `TechPill`, `Panel`, `SectionHeading`, `OrbitRing`, `Metric`) |
| `ui/BentoCard.tsx` | `BentoGrid`/`BentoCard`: page-level cursor spotlight, gsap tilt, click burst, per-card `--glow-color` |
| `ui/GooeyTabs.tsx` | Controlled gooey pill nav (local fork of ReactBits GooeyNav: buttons, onSelect, resize/font-load repositioning) |
| `ui/bento.css` | Card surfaces + glow masks (gx- prefix, deep-space navy glass) |
| `ui/gooey.css` | Gooey filter/pill/particle effect (indigo/violet/cyan palette vars) |
| `ui/station.css` | Stepper re-theme (indigo→cyan) + pulsing availability dot |
| `tabs/Hero.tsx` | SIG/LOC/EXP/SYS telemetry bar · identity (availability chip, gradient name, "> tracking ::" roles, "sys.log>" tagline) · scan-station card (DotGrid + radar sweep + locked marker + observatory captions) · stat bento row · LogoLoop marquee · scroll cue |
| `tabs/About.tsx` | Bio + education/thesis bento cards → career Stepper → interactive Terminal panel (bottom) |
| `tabs/Terminal.tsx` | CLI carried from original v1: help/about/experience/table/projects/skills/education/contact/clear, ↑/↓ history; reads shared content |
| `tabs/Skills.tsx` | 6 selector tiles + "Other" slim bar → stage dossier (banner, narrative, proof points, click-through evidence); OrbitRings for the toolbox |
| `tabs/Experience.tsx` | Left role menu (glowing active rows) + bento detail pane (story 2×2, contributions, artwork, metrics, stack, skills links, deep dive) |
| `tabs/Projects.tsx` | Full-width expandable slabs: collapsed row → two-column dossier with generated artwork |
| `tabs/Contact.tsx` | "transmission channel open" kicker, CTA, 3 link cards, "signal ends · awaiting your reply" |

### Shared layer — `src/sites/shared/`

| File | Role |
|---|---|
| `content.ts` | THE content API (see Data flow) |
| `Artwork.tsx` | Deterministic generated SVG per item — spec `{style, hue}`, styles: `orbits · mesh · waves · constellation · strata · grid` |
| `iconMap.ts` | String icon names → `LucideIcon` |
| `useTabVeil.tsx` | Tab-swap veil: page dims to a stage color, content swaps, veil lifts |
| `cn.ts` | clsx + tailwind-merge class join |
| `bits/` | 11 raw ReactBits components (JSX + CSS, 1:1 from the repo) behind a typed barrel: CountUp, DecryptedText, DotGrid, Galaxy, GradualBlur, GradientText, LogoLoop, RotatingText, SpecularButton, Stepper, TextType |

### Data — `src/data/` + `src/types/`

`src/data/portfolioData.ts` is the single raw content file (typed by
`src/types/portfolio.ts`): `profileData`, `experiencesData`, `projectsData`,
`coreSkillsData`, `otherSkillsData`, `educationData`, `marqueeTechList`.
Editing it updates the site (via content.ts).

## Data flow

```
src/data/portfolioData.ts        (raw typed content — the only place to edit content)
        │  .map()/shaping
        ▼
src/sites/shared/content.ts      (site-facing API: profile, experiences,
        │                         coreSkills, otherSkills, projects, education,
        │                         contact, techMarquee, rotatingRoles, siteTabs)
        └──► src/sites/sites/bento-galaxy/**   (tabs/Terminal.tsx also reads it directly)
```

Key content.ts exports:

- `siteTabs`, `TabId`, `TabNavigate(tab, focusId?)` — cross-tab navigation with
  focus targeting (skill ↔ project/experience links; `TabFocus.nonce`
  re-triggers even for the same id).
- `experiences: ExperienceEntry[]` — story paragraphs, bullets, tech, metrics,
  `deepDive{challenge, solution, learnings[]}`, art spec.
- `coreSkills` / `otherSkills` — the 6-core-skills + Other model (owner
  decision M-0004). **No percentage levels on core skills**; the Other toolbox
  keeps usage-centrality rings.
- `projects`, `profile`, `education`, `contact`, `techMarquee`, `rotatingRoles`.

## Design tokens

| Token | Value |
|---|---|
| Stage bg | `#05060d` (Site root, body, scrollbar track) |
| Accents | indigo `#818cf8` · violet `#a78bfa` · cyan `#67e8f9` (the one gradient: 92deg indigo→violet→cyan) |
| Glass | `white/[0.04]` panels, `white/[0.08]` borders, `backdrop-blur-xl` |
| Card glows (RGB triplets) | indigo `129,140,248` · violet `167,139,250` · cyan `103,232,249` |
| Text | slate-50/100 display · slate-300/400 body · slate-500/600 mono details |
| Fonts | `sans` Inter · `mono` JetBrains Mono · `display` Space Grotesk (`serif` Fraunces still loaded in index.html) |

The bento card geometry (26px radius, 1.5px masked border glow, spark dots,
click ripple) lives in `ui/bento.css`; every value derives from the card's
`--glow-color` RGB triplet.

## Conventions

- TypeScript strict; `npx tsc --noEmit` must pass. `React.FC` + typed prop
  interfaces with sensible defaults.
- `framer-motion` in site/tab files; the raw ReactBits bits import
  `motion/react` (both packages are intentional — do not unify casually).
- Every canvas/RAF/listener effect cleans up on unmount (StrictMode
  double-mount). WebGL canvases unmount cleanly — give each a sized parent.
- `gx-` prefix for all local CSS classes/effects.
- `@/` alias for `src/`; prefer it in new code.
- `base: './'` → static hosting anywhere (GitHub Pages, Cloudflare, Vercel, …).

## Deployment

`npm run build` = `tsc && vite build && npm run ship`. The `ship` step copies
`dist/` to `/mnt/d/Users/daroe/Desktop/projecten/AI/landingpage-dist` — it only
works where that WSL mount exists. Otherwise run `npx vite build` and ship
manually.
