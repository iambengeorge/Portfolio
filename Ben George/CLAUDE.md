# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # Install dependencies (pnpm overrides are set in package.json)
npm run dev    # Start Vite dev server with HMR
npm run build  # Production build
```

No test suite is configured.

## Architecture

This is a single-page React 18 + TypeScript portfolio site built with Vite and Tailwind CSS v4. The project was generated with Figma Make Kit and depends on `@make-kits/folio-home`.

### Key files

- `src/app/App.tsx` — monolithic ~640-line component containing all portfolio sections, state, and inline styles. There is intentionally no routing or sub-page structure.
- `src/styles/theme.css` — all design tokens as CSS custom properties (OKLCH color space, light/dark mode). This is the single source of truth for the color palette and typography scale.
- `src/imports/space_for_mind_remix-1.json` — local JSON for the Unicorn Studio WebGL background scene.
- `vite.config.ts` — includes a custom Vite plugin that resolves `figma:asset/` import specifiers; required for Figma Make Kit assets to load.

### WebGL background

`App.tsx` includes a `UnicornBg` component that loads the Unicorn Studio WebGL renderer from an external CDN script. It monkey-patches `window.fetch` to intercept calls to `app.unicornstudio.com` and serve the local scene JSON instead, avoiding network dependency. Opacity is set per color scheme (0.45 dark / 0.25 light).

### Styling approach

The project mixes three styling mechanisms:
1. **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — not PostCSS)
2. **Inline style objects** — used heavily in `App.tsx` for dynamic/conditional styles
3. **CSS custom properties** from `theme.css` — consumed by both Tailwind utilities and inline styles

`postcss.config.mjs` is intentionally minimal; Tailwind v4 is handled entirely by the Vite plugin.

### Component library

`src/app/components/ui/` contains 50+ shadcn/ui components backed by Radix UI primitives. These are pre-generated and generally should not be edited unless upgrading shadcn.

### Figma Make Kit dependency

The `@make-kits/folio-home` package is a private kit. If it is missing or symlinks are broken, the dev server will fail. Run `npm i` from the `Ben George/` directory (not the repo root) to restore it.
