# Roel Moeyersoons — Personal Portfolio & Systems Experience Hub

A futuristic, high-performance developer portfolio and experience showcase built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and animated components inspired by **React Bits**.

---

## 🎨 Design Showcase (6 site concepts)

The app now boots into a **showcase shell** (`src/sites/Showcase.tsx`) that mounts
one full website concept at a time. A neutral toast at the bottom center
(supported by keyboard shortcuts `1..6` and `←`/`→`) switches between concepts —
the choice is remembered in `localStorage` and reflected in the URL
(`#/site/<id>`).

| # | Concept | Route | Identity |
|---|---------|-------|----------|
| 1 | **Aurora Glass** | `#/site/aurora-glass` | WebGL aurora, glass panels, Fraunces serif, violet→fuchsia→cyan |
| 2 | **Galaxy Drift** | `#/site/galaxy` | Deep-space WebGL galaxy, decrypted headings, orbital skill rings |
| 3 | **Noir Threads** | `#/site/noir-threads` | Editorial monochrome noir (rbp-portfolio inspired), web-thread canvas, accordion gallery |
| 4 | **Plasma Bento** | `#/site/plasma-bento` | Magnetic bento grids with glow-follow cards over gradient blinds |
| 5 | **Prism Ribbons** | `#/site/prism-ribbons` | Flowing WebGL ribbons, plasma-wave hero, card-swap project deck |
| 6 | **Original v1** | `#/site/original` (or `#/original`) | The first version of the site from the earlier session (particles + terminal) |

Every concept implements the same structure: **top tabs**
(home · experience · skills · projects · about · contact) and — for
experience/skills — a **left menu** that selects the item shown in the main pane
(story paragraphs, generated artwork, bullets, tech stack, metrics, deep dives).

Shared building blocks:

- `src/sites/shared/content.ts` — the single content source (wraps
  `src/data/portfolioData.ts`) used by all concepts.
- `src/sites/shared/Artwork.tsx` — deterministic generated SVG artwork per item
  (six styles, hue-driven; no binary assets needed).
- `src/sites/shared/bits/` — ~35 raw ReactBits components (JSX + CSS, 1:1 from
  the [react-bits repo](https://github.com/DavidHDev/react-bits)) behind a typed
  barrel (`import { Aurora, Galaxy, MagicBento, … } from '@/sites/shared/bits'`).
  Requires the added deps: `ogl`, `gsap` (3.13+ with free SplitText/Inertia),
  `three`, `motion`, `@gsap/react`.
- `SITES_SPEC.md` — the build spec + conventions for all concepts.

---

## ✨ Features

- ⚡ **100% Static & Serverless**: Zero backend or database required. Outputs static assets ready for GitHub Pages, Cloudflare Pages, Vercel, Netlify, or AWS S3/CloudFront.
- 🎛️ **Full Content & Experience Control**: All data (multi-paragraph stories, tables, metrics, bullet points, tech stacks, and deep-dive architectural specs) is cleanly centralized in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts).
- 🧩 **React Bits Component Suite**:
  - **`ParticlesBackground`**: Interactive 60 FPS HTML5 canvas particle/starfield with mouse repulsion and dynamic connections.
  - **`DecryptedText`**: Matrix/cyber text decryption animation on hover and scroll.
  - **`TrueFocus`**: Animated visual focus bounding box that highlights words.
  - **`SpotlightCard`**: Radial glowing cursor light with 3D hover feedback and border highlighting.
  - **`InfiniteScrollMarquee`**: Velocity ticker showcasing core technologies.
  - **`AnimatedCounter`**: Smooth cubic-eased numerical KPI counters.
  - **`SplitText`**: Staggered spring text entrance animations.
- 📊 **Interactive Experience Showcase**:
  - **Visual Timeline & Cards Mode**: Rich story paragraphs, deliverables, metrics, and tech pills.
  - **Matrix Table Mode**: Sortable and searchable comparison table with columns for timeline, company, role, scope, deliverables, and impact metrics.
  - **Deep-Dive Specs Modal**: Modal popup detailing architectural challenges, engineered solutions, and key learnings.
- 🍱 **Bento Projects Grid**: Highlights OpenGL Mandelbrot visualizer, Distributed UWB MAC Protocol, Discord Blockchain Bot, and ArchConfig Linux automation suite.
- 🎓 **Academic & Research Spotlight**: Ghent University (UGent) Master of Science thesis on hybrid Sub-GHz + Ultra-Wideband (UWB) distance determination protocol, plus GitHub Arctic Code Vault Contributor badge.
- 💻 **Interactive CLI Terminal**: Integrated terminal easter egg with support for commands: `help`, `experience`, `table`, `projects`, `skills`, `education`, `about`, `contact`, and `clear`.
- 📱 **Animated Drawer & Mobile Navigation**: Modern glassmorphic floating header with active scroll spy and responsive hamburger drawer.

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build optimized static bundle for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📝 Customizing Your Content

All website content is defined in typed TypeScript files. To update or add your experiences, simply edit:

- **Portfolio Data**: [`src/data/portfolioData.ts`](./src/data/portfolioData.ts)
  - `profileData`: Name, bio paragraphs, social URLs, and top-level stats.
  - `experiencesData`: Add/edit roles, paragraphs, bullet points, metrics, and matrix table columns.
  - `projectsData`: Add/edit featured projects, repo links, and tags.
  - `skillCategoriesData`: Update skills, proficiency levels, and category badges.
  - `educationData`: Academic credentials, thesis abstract, and supervisors.
- **Type Definitions**: [`src/types/portfolio.ts`](./src/types/portfolio.ts)

---

## 🚀 Static Deployment & Shipping

To build and automatically sync to your Windows directory (`D:\Users\daroe\Desktop\projecten\AI\landingpage-dist`):
```bash
# Builds and ships in one step:
npm run build

# Or ship existing dist folder manually:
npm run ship
```

The output will be in both the local `dist/` directory and `/mnt/d/Users/daroe/Desktop/projecten/AI/landingpage-dist/`. Because `base: './'` is configured in `vite.config.ts`, the page can be opened locally in a browser or served via any static web host.

