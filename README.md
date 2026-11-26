# GWGreen portfolio

A Next.js site exported as static files and hosted on Firebase. Project content comes from Firestore at build time, so a content change needs a rebuild and deploy.

## Getting started

Uses [pnpm](https://pnpm.io) (the version is pinned in `package.json`) and Node 22.

```sh
pnpm install
pnpm dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Runs the dev server at http://localhost:3000 |
| `pnpm build` | Exports the static site to `out/` |
| `pnpm start` | Serves `out/` locally |
| `pnpm lint` | Runs ESLint |
| `pnpm test:visual` | Builds the site and compares page screenshots against local references |

## Deploying

```sh
pnpm build
firebase deploy --only hosting
```
