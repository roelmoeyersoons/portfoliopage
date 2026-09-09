# Roel Moeyersoons — Portfolio (6-concept showcase)

One React app that boots into a showcase shell mounting **6 full website
concepts** one at a time: Aurora Glass, Galaxy Drift, Noir Threads, Plasma
Bento, Prism Ribbons, and the Original v1 one-pager. Switch via the bottom
toast, keys `1..6` / `←`·`→`, or the URL hash `#/site/<id>`.

Built with React 18, TypeScript (strict), Vite 6, Tailwind CSS 3.4, Framer
Motion, and raw React Bits components. All content is centralized in
`src/data/portfolioData.ts` and flows through `src/sites/shared/content.ts`
to every variant.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npx tsc --noEmit   # type check (must stay clean)
npm run build      # build + ship to the configured Windows dist folder
```

## Documentation

- [AGENTS.md](./AGENTS.md) — session primer: project map, hard content rules, commands, gotchas
- [docs/architecture.md](./docs/architecture.md) — structure, boot flow, data flow, tokens, conventions
- [docs/site-concepts.md](./docs/site-concepts.md) — the 6 concepts and the build spec each one follows
- [docs/demo-lab.md](./docs/demo-lab.md) — the React Bits Lab (`#/reactbits`)
