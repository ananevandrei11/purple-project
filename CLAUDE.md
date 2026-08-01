# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (Next.js, with 8GB heap allowance)
npm run build        # production build
npm run start        # run production build
npm run lint         # next lint (ESLint)
npm run stylelint    # stylelint --fix on all CSS files (also runs as a pre-commit hook via husky)
npm run debug        # dev server with --inspect for Node debugging
```

There is no test runner configured in this repo (no test script, no test files/framework present).

### Environment variables

- `NEXT_PUBLIC_DOMAIN` — required. Base host for the backend API; `config/apiStore.tsx` builds the axios `baseURL` as `${NEXT_PUBLIC_DOMAIN}/api-demo`. This is the only env var referenced anywhere in the code. No `.env.example` value is committed with a working default — the backend is `https://purpleschool.ru` (the demo API lives at `https://purpleschool.ru/api-demo/...`). Do **not** include a trailing `/api` in this value — that produces `.../api/api-demo/...` and 404s.

Package manager: both `package-lock.json` and `pnpm-lock.yaml` are present; check which the environment expects before installing — don't introduce a third lockfile.

## Architecture

Next.js 14 App Router e-commerce storefront (Russian-language UI). Backend is an external REST API — this repo has no server-side data layer of its own beyond thin fetch wrappers.

### Layer structure

- `app/` — routes only. Every route follows a **server page + client component** split: `page.tsx` is an async Server Component that fetches data (via `api/`) and calls `notFound()` on failure, then renders a colocated `client.tsx` (`'use client'`) that receives the data as props and handles all interactivity/state. CSS is colocated as `client.module.css`.
- `api/` — read-side data fetchers (`getProducts`, `getProductBySku`, `getFilter`, `getOrders`). These call `apiStore` directly, catch errors, log them, and return `null` on failure — callers are expected to `notFound()` on `null`. Re-exported through `api/index.ts`.
- `actions/` — write-side / mutation calls (`login`, `authenticate` (register), `restore`, `createOrder`, `updateUser`, `getProfile`, `review`). Marked `'use server'`. These throw on failure (via `handlerError`) rather than returning `null` — the two error-handling conventions are intentionally different between `api/` (read, swallow+null) and `actions/` (write, throw).
- `config/apiStore.tsx` — the single axios instance. Base URL is `${NEXT_PUBLIC_DOMAIN}/api-demo`. All fetchers/actions go through this instance.
- `helpers/api.ts` — the `API` object: central map of backend endpoint path strings/builders. Add new endpoints here, not as inline strings.
- `routes/index.ts` — the `ROUTES` object: central map of frontend paths. Use this for all internal `Link`/`router.push` targets instead of hardcoded strings.
- `helpers/handlerError.ts` — normalizes `AxiosError` vs generic `Error` into a message string; used by `actions/`.
- `interfaces/` — shared TypeScript types (`product`, `cart`, `order`, `profile`, `review`, `filter`, `params`), re-exported via `interfaces/index.ts`.
- `schemas/` — Zod validation schemas for forms (paired with `react-hook-form` via `@hookform/resolvers`).
- `page-components/` — larger, page-specific composite components (e.g. `ProductList`, `CartForm`, `Filter`, `LoginRegister`, `ProductGallery`), each with colocated `.module.css` and sometimes a `components/` subfolder for internal pieces.
- `components/` — small, generic/reusable UI primitives (`Button`, `Input`, `Select`, `Checkbox`, `Counter`, `RangeSlider`, `TextElement`, etc.), each colocated with its `.module.css`.
- `layout/` — app shell: `Header`, `Footer`, `Menu` (with separate `Desktop`/`Mobile` variants), `ProgressBar`. Mounted once in `app/layout.tsx`.
- `context/` — React Context providers for client-side global state: `cartContext` (cart items, reducer-based), `loadingContext`, `shopPageContext` (shop/filter page state). `CartProvider` wraps the whole app in `app/layout.tsx`.
- `state/localStorage/` — typed localStorage wrappers built on `usehooks-ts` (`useLocalStorage`/`useReadLocalStorage`): `session.ts` (`useSession` — auth token/email under the `purple-session` key) and `favorites.ts`. Auth state is client-side localStorage, not cookies/JWT-in-httpOnly-cookie.
- `hooks/` — generic hooks (`useDebounce`, `useMediaQuery`).
- `utils/` — pure helpers (`date`, `number`, `pluralize`, `debounce`, `throttle`).
- `markdown/` — static markdown content (e.g. `about.md`) rendered via `remark`/`remark-html` (see `getMarkdownContent.ts`).
- `constants/` — app-wide constant values.

### Conventions to follow

- New pages: add a `page.tsx` (async Server Component, data fetching + `notFound()` guard) paired with a `client.tsx` (`'use client'`, receives fetched data as props). Don't fetch data inside client components.
- New backend endpoints: add the path to `helpers/api.ts`'s `API` object, then add a fetcher in `api/` (read) or `actions/` (write, `'use server'`), always through `apiStore`.
- New internal links: add to `routes/index.ts`'s `ROUTES` object rather than hardcoding path strings.
- Styling is CSS Modules (`*.module.css`) colocated per component — no CSS-in-JS, no Tailwind. `stylelint` (standard + recess property order) enforces style; it autofixes on commit via husky.
- Path alias `@/*` maps to repo root (see `tsconfig.json`).
- Forms use `react-hook-form` + `zod` schemas from `schemas/` via `@hookform/resolvers`.
- Prettier: single quotes, no semicolon-insertion quirks (semicolons via `@typescript-eslint/semi` instead of ESLint's own `semi` rule, which is off), 100-char print width, no trailing commas.
