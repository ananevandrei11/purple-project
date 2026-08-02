# Purple Project

A demo jewelry e-commerce store: product catalog with filtering, cart, checkout, reviews, and a user account area.

The repository contains two parts:

- **Frontend** — Next.js 14 (App Router), at the repository root.
- **Backend** — Fastify + Prisma + PostgreSQL, in the [`backend/`](backend) directory. Product images are served from MinIO (S3-compatible storage).

## Requirements

- Node.js 20+
- Docker and Docker Compose (for PostgreSQL and MinIO)
- pnpm for the frontend, npm for the backend

## Quick start

Start the backend first — the frontend fetches its data from `http://localhost:4000`.

### 1. Backend

```bash
cd backend
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL=postgresql://root:admin@localhost:5432/api_demo?schema=public
DATABASE_URL_VIEWER=postgresql://root:admin@localhost:5432/api_demo
SALT_SESSION=10
ACCESS_TOKEN_SECRET=<any random string>
```

`SALT_SESSION` is the bcrypt cost factor, `ACCESS_TOKEN_SECRET` is the JWT signing secret. Both are required — the server refuses to start without them.

Bring up the infrastructure, apply migrations, and load the demo data:

```bash
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

`docker compose up -d` starts PostgreSQL on `5432` and MinIO on `9000` (console on `9001`), and does a one-off creation of the public `bucket` with product images from `seed-data/images`. The server listens on `http://localhost:4000`; the liveness check is `GET /health`.

### 2. Frontend

From the repository root:

```bash
cp .env.example .env
```

```
NEXT_PUBLIC_DOMAIN=http://localhost:4000
ACCESS_TOKEN_SECRET=<the same secret as in backend/.env>
```

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

### Frontend (root)

```bash
pnpm dev          # dev server (heap raised to 8 GB)
pnpm build        # production build
pnpm start        # run the production build
pnpm lint         # ESLint
pnpm stylelint    # stylelint --fix across all CSS (also runs in the husky pre-commit hook)
pnpm debug        # dev server with --inspect for Node debugging
```

### Backend (`backend/`)

```bash
npm run dev         # tsx watch, restarts on changes
npm run build       # compile TypeScript into dist/
npm run start       # run the compiled server
npm run db:migrate  # prisma migrate dev
npm run db:seed     # load categories and products from seed-data/products.json
npm run db:reset    # drop the database and re-apply migrations with the seed
```

## API

All endpoints belong to the backend; CORS is allowed only for `http://localhost:3000`.

| Method  | Path                        | Description                                                  |
| ------- | --------------------------- | ------------------------------------------------------------ |
| `GET`   | `/health`                   | Liveness check                                                |
| `GET`   | `/products`                 | Product list: `limit`, `offset`, `name`, `categoryId`, `priceMin`, `priceMax`, `discounted` |
| `GET`   | `/products/sku/:sku`        | Product by SKU, including its reviews                         |
| `GET`   | `/products/get-filter`      | Categories and the price range bounds for the filter          |
| `POST`  | `/products/sku/:sku/review` | Add a review                                                  |
| `POST`  | `/auth/register`            | Registration                                                  |
| `POST`  | `/auth/login`               | Sign in                                                       |
| `GET`   | `/user/profile`             | Current user's profile *(requires authentication)*            |
| `PATCH` | `/user/profile`             | Update name, phone, address *(requires authentication)*       |
| `GET`   | `/order/my`                 | Current user's orders *(requires authentication)*             |
| `POST`  | `/order`                    | Create an order *(requires authentication)*                   |

### Authentication

`/auth/register` and `/auth/login` return an access token (a JWT valid for 15 minutes) in the response body and set a refresh token in the httpOnly `refreshToken` cookie with a 30-day lifetime. Protected endpoints expect an `Authorization: Bearer <accessToken>` header.

On the frontend, the session is stored in localStorage under the `purple-session` key.

## Project structure

```
app/              — App Router routes (home, /shop, /shop/[sku], /cart, /favorites, /login, /about)
page-components/  — large page blocks (Filter, ProductList, CartForm, Profile, ReviewForm, …)
components/       — reusable UI elements (Button, Input, Select, ProductCard, Paginator, …)
layout/           — header, footer, menus, progress bar
api/              — server-side requests to the backend (products, filters, orders)
actions/          — server actions: login, registration, restore, profile, order, review
context/          — React Context for the cart, loading state, and catalog page state
state/            — localStorage access (session, favorites) and JWT decoding
hooks/            — useDebounce, useMediaQuery
helpers/          — API path map and error handling
utils/            — date and number formatting, pluralization, debounce/throttle
schemas/          — zod form schemas
interfaces/       — shared types
backend/src/      — Fastify server: routes/ (products, user, order), utils/token.ts, db.ts
backend/prisma/   — schema, migrations, and seed
```

## Stack

**Frontend:** Next.js 14 (App Router) · TypeScript · CSS Modules · axios · react-hook-form + zod · framer-motion · embla-carousel · react-hot-toast

**Backend:** Fastify 5 · Prisma 7 · PostgreSQL 17 · MinIO · bcrypt · jsonwebtoken

**Tooling:** ESLint · Prettier · Stylelint (`stylelint-config-recess-order`) · husky
