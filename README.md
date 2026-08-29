# Roel Moeyersoons — Personal Portfolio & Systems Experience Hub

A futuristic, high-performance developer portfolio and experience showcase built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and animated components inspired by **React Bits**.

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

