# Roel Moeyersoons — Portfolio · "Bento Galaxy"

One single portfolio website: **Plasma Bento's layout** (chunky bento grids
with cursor-spotlight cards, gooey pill tabs, veil tab-swaps) **fully
re-skinned in Galaxy Drift's deep-space observatory theme** — #05060d stage,
indigo/violet/cyan accents, a WebGL starfield, mono telemetry chrome, and the
interactive terminal from the original site — tucked away on its own hidden
`terminal` tab, an icon-only easter egg at the end of the nav.

Built with React 18, TypeScript (strict), Vite 6, Tailwind CSS 3.4, Framer
Motion, and a pruned set of raw React Bits components. All content is
centralized in `src/data/portfolioData.ts` and flows through
`src/sites/shared/content.ts`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npx tsc --noEmit   # type check (must stay clean)
npm run build      # build + ship to the configured Windows dist folder
```

## The old showcase (6 concepts + React Bits Lab)

The pre-consolidation app is preserved at **git tag `showcase-v1`**. To launch
it exactly as it was:

```bash
git worktree add ../landingpage-showcase-v1 showcase-v1
cd ../landingpage-showcase-v1 && npm install && npm run dev
git worktree remove ../landingpage-showcase-v1   # when done
```

## Documentation

- [AGENTS.md](./AGENTS.md) — session primer: project map, hard content rules, commands, gotchas
- [docs/architecture.md](./docs/architecture.md) — structure, boot flow, data flow, tokens, conventions
