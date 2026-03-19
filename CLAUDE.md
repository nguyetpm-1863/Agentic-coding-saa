# CLAUDE.md - Project Constitution

## Project Overview

MoMorph - A Next.js 15 full-stack application with Supabase backend, deployed on Cloudflare Workers.

**Tech Stack:** Next.js 15 (App Router, Turbopack) | React 19 | TypeScript 5 | Tailwind CSS 4 | Supabase (Auth, DB, Storage) | Cloudflare Workers (via OpenNext) | Yarn 1.22

## Commands

- `make up` — Full local setup (tools + deps + env + Supabase)
- `make dev` — Start Next.js dev server with Turbopack
- `make down` — Stop Supabase local
- `yarn lint` — Run ESLint
- `yarn build` — Production build
- `yarn deploy` — Build and deploy to Cloudflare Workers

## Project Structure

```
src/
├── app/            # Next.js App Router (pages, layouts, route handlers, server actions)
│   ├── layout.tsx  # Root layout
│   ├── page.tsx    # Home page
│   └── globals.css # Global styles (Tailwind)
└── libs/
    └── supabase/   # Supabase client utilities
        ├── client.ts      # Browser client
        ├── server.ts      # Server client (cookie-aware)
        └── middleware.ts   # Auth middleware
supabase/
├── config.toml     # Local dev config
└── seeds/          # Seed data (common/ and dev/)
```

**Path alias:** `@/*` maps to `./src/*`

## Code Style & Conventions

- **Language:** TypeScript strict mode. No `any` — use proper types.
- **Formatting:** 2-space indentation, UTF-8, LF line endings (see `.editorconfig`).
- **Linting:** ESLint with `next/core-web-vitals` and `next/typescript`. Run `yarn lint` before committing.
- **Imports:** Use path alias `@/` for all project imports (e.g., `import { createClient } from '@/libs/supabase/client'`).
- **Naming:** PascalCase for components, camelCase for functions/variables, kebab-case for files and directories.
- **Components:** Prefer Server Components by default. Only use `'use client'` when client interactivity is required.
- **Functions:** Keep functions small and focused. Extract reusable logic into `src/libs/`.
- **No dead code.** Remove unused imports, variables, and functions immediately.

## Next.js Best Practices

- Use App Router patterns: layouts, loading states, error boundaries, server actions.
- Prefer Server Components for data fetching. Colocate data fetching with the component that uses it.
- Use `loading.tsx` and `error.tsx` for each route segment where appropriate.
- Use Next.js `<Image>`, `<Link>`, and metadata API.
- Keep client components small — push `'use client'` boundary as far down the tree as possible.
- Use server actions for form submissions and mutations. Define them in separate files when shared.

## Cloudflare Workers Constraints

- **No Node.js APIs.** Code runs on Cloudflare Workers runtime (V8 isolates), not Node.js. Avoid `fs`, `path`, `crypto` (use Web Crypto API), `Buffer` (use `Uint8Array`), etc.
- Use `getCloudflareContext()` for Cloudflare bindings (KV, R2, D1, etc.).
- Be mindful of Worker limits: 128MB memory, 30s CPU time (paid plan).
- Keep bundle size minimal — avoid heavy npm packages.

## Supabase Best Practices

- **Browser:** Use `createClient()` from `@/libs/supabase/client.ts`.
- **Server (Server Components, Route Handlers, Server Actions):** Use `createClient()` from `@/libs/supabase/server.ts`.
- **Middleware:** Use the dedicated middleware client from `@/libs/supabase/middleware.ts`.
- Never expose `SUPABASE_SECRET_KEY` to the client. Only use `NEXT_PUBLIC_*` keys client-side.
- Write database migrations in `supabase/migrations/`. Keep them small and reversible.
- Use Row Level Security (RLS) on all tables. Never disable RLS in production.

## Responsive Design

All UI must be responsive and support these breakpoints:

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile     | (default) | 0px    |
| Tablet     | `md:`  | 768px     |
| Desktop    | `lg:`  | 1024px    |
| Wide       | `xl:`  | 1280px    |

- **Mobile-first approach:** Write base styles for mobile, then layer up with `md:`, `lg:`, `xl:`.
- Use Tailwind's responsive utilities. Avoid custom media queries.
- Test layouts at 320px, 768px, 1024px, and 1440px widths.
- Use flexible layouts (`flex`, `grid`) over fixed widths. Prefer `max-w-*` with `mx-auto` for content containers.
- Ensure touch targets are at least 44x44px on mobile.
- Use `text-sm` or `text-base` on mobile, scale up on larger screens.

## Security — OWASP Compliance

### Input Validation
- Validate and sanitize ALL user inputs on the server side. Never trust client-side validation alone.
- Use parameterized queries via Supabase client — never concatenate user input into queries.
- Validate URL parameters, form data, and API request bodies with strict schemas.

### Authentication & Session
- Use Supabase Auth exclusively. Do not implement custom auth.
- Always verify auth state server-side before serving protected content or executing mutations.
- Refresh sessions via middleware (`@/libs/supabase/middleware.ts`).

### XSS Prevention
- React escapes output by default — never use `dangerouslySetInnerHTML` unless absolutely necessary, and sanitize content first.
- Set proper Content-Security-Policy headers.
- Sanitize any user-generated content before rendering.

### CSRF Protection
- Use server actions (which include CSRF protection by default in Next.js).
- For custom API routes, validate the `Origin` header.

### Sensitive Data
- Never commit `.env` files, API keys, or secrets.
- Use `NEXT_PUBLIC_` prefix only for truly public values.
- Store secrets in Cloudflare Workers secrets or Supabase vault.

### HTTP Security Headers
- Configure security headers in `public/_headers` or middleware:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (restrict unnecessary APIs)

### Dependency Security
- Keep dependencies updated. Review changelogs before upgrading major versions.
- Avoid packages with known vulnerabilities.

## Environment Variables

- **Client-side:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Server-side:** `SUPABASE_SECRET_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Copy `.env.example` to `.env.development` for local dev (`make up` does this automatically).
