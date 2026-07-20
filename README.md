# Purple Project

A Next.js 14 (App Router) e-commerce storefront — jewelry shop demo with product catalog, filtering, cart, checkout, reviews, and user auth (register/login/restore, profile, order history). As demo API use PS demo backend API.

## Getting Started

1. Copy `.env.example` to `.env` and set the API domain:

   ```bash
   cp .env.example .env
   ```

   ```
   NEXT_PUBLIC_DOMAIN=[PS domain]
   ```

2. Install dependencies and run the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # start dev server (8GB heap allowance)
npm run build        # production build
npm run start        # run production build
npm run lint         # ESLint
npm run stylelint    # stylelint --fix on all CSS files (also runs pre-commit via husky)
npm run debug        # dev server with --inspect for Node debugging
```

## Tech stack

Next.js 14 (App Router) · TypeScript · CSS Modules · axios · react-hook-form + zod · React Context for cart/session state · localStorage-based auth session.
