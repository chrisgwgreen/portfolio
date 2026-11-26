<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Browser support

Target browsers released in roughly the last two years (Safari 16.5+, Chrome/Edge/Firefox from 2023). Native CSS nesting, `@layer` and `@property` can be used freely. Newer features need a graceful fallback.

## Styling

Styles are CSS Modules (`Component.module.css` next to `Component.tsx`). Design tokens are CSS custom properties on `:root` in `src/app/globals.css`.

Font sizes are in `rem` and never below `1rem` (16px). Don't set a font size on `html`, so the visitor's browser setting still scales the text.

## Visual checks

`pnpm test:visual` builds the site and compares screenshots against local references in `tests/visual/__screenshots__/` (git-ignored). Capture new references with `pnpm exec playwright test --update-snapshots` before a refactor, then run the check after it.
