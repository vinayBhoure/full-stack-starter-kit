# Starter Kit — by Vinay Bhoure

A full-stack Next.js starter, pre-wired the way I set up every new project: Next.js (App Router)
for both frontend and backend, Tailwind CSS, shared shadcn-style UI components, Zod validation,
and Prisma configured for **either** PostgreSQL (Neon) or MongoDB (Atlas) — pick one via an env
variable, no code changes needed.

## Stack

- **Next.js 16** (App Router, TypeScript) — frontend + backend in one app
- **Tailwind CSS v4**
- **shadcn-style UI components** (`src/components/ui`) — Button, Card, Badge, Input, built on
  `class-variance-authority` + `clsx`/`tailwind-merge`, ready for `npx shadcn add <component>`
- **Zod** — request validation (`src/lib/validations`)
- **Prisma** — ORM, configured for PostgreSQL *or* MongoDB via `DATABASE_PROVIDER`
- A small backend layer under `src/server/` (`config`, `controllers`, `routers`, `middleware`) so
  API routes stay thin

## Getting started

```bash
git clone <your-repo-url>
cd starter-kit
npm install
```

`npm install` automatically copies the right Prisma schema and runs `prisma generate`
(see [Database setup](#database-setup) below) — nothing else to configure to get the app running.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the starter kit landing page with
a **Check DB Connection** button.

> The button will fail until you've filled in `DATABASE_URL` (next section) — that's expected on a
> fresh clone.

## Database setup

This kit supports **one database at a time** — PostgreSQL or MongoDB — chosen with
`DATABASE_PROVIDER` in `.env`.

1. Copy the example env file if you haven't already:
   ```bash
   cp .env.example .env
   ```
2. In `.env`, set:
   ```bash
   DATABASE_PROVIDER=postgresql   # or: mongodb
   DATABASE_URL=...               # see below for where to get this
   ```
3. Re-run the switch script (or just restart `npm run dev` — it runs this automatically):
   ```bash
   npm run db:switch
   ```
4. Push the example schema to your database:
   ```bash
   npm run db:push
   ```
5. Click **Check DB Connection** on the landing page. It calls `POST /api/health`, which writes
   and reads back an example `Ping` row/document and reports latency.

### Where to get `DATABASE_URL`

**PostgreSQL — Neon**
Neon dashboard → your project → **Connect** → **Prisma** tab → copy the connection string
(`postgresql://user:password@ep-xxxx-pooler.neon.tech/dbname?sslmode=require`).

**MongoDB — Atlas**
Atlas dashboard → your cluster → **Connect** → **Drivers** → copy the connection string
(`mongodb+srv://user:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority`).

### Switching providers later

Change `DATABASE_PROVIDER` and `DATABASE_URL` in `.env`, then run `npm run db:switch` (or
`npm run dev` / `npm run build`). This copies `prisma/schema.postgresql.prisma` or
`prisma/schema.mongodb.prisma` over `prisma/schema.prisma` and regenerates the Prisma client —
there are two schema files so each can use the field types its provider needs (e.g. Mongo's
`@db.ObjectId` vs Postgres's `cuid()`), but the models are kept in sync.

## Project structure

```
prisma/
  schema.postgresql.prisma   # source schema for Postgres
  schema.mongodb.prisma      # source schema for MongoDB
  schema.prisma              # generated — do not edit directly
scripts/
  switch-db-provider.mjs     # copies the right schema + runs `prisma generate`
src/
  app/
    page.tsx                 # landing page
    api/health/route.ts      # DB connection check endpoint
  components/
    ui/                      # shared shadcn-style components (Button, Card, Badge, Input)
    db-check.tsx             # "Check DB Connection" client component
  lib/
    db.ts                    # Prisma client singleton
    utils.ts                 # cn() helper
    validations/             # Zod schemas
  server/
    config/                  # env access
    controllers/             # business logic
    routers/                 # validate -> controller -> response
    middleware/               # e.g. Zod body validation helper
```

## Adding your own models & endpoints

1. Add a model to **both** `prisma/schema.postgresql.prisma` and `prisma/schema.mongodb.prisma`
   (or just the one you're using).
2. `npm run db:switch && npm run db:push`.
3. Add a Zod schema in `src/lib/validations/`.
4. Add a controller in `src/server/controllers/`, a router in `src/server/routers/`, and a route
   file in `src/app/api/.../route.ts` that calls it — following the pattern in `health.*`.

## Adding more shadcn components

```bash
npx shadcn@latest add dialog
```

`components.json` is already configured, so new components land in `src/components/ui`
alongside the ones already here.
