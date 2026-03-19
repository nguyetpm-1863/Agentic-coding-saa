<!--
Sync Impact Report
===================
Version change: N/A → 1.0.0 (initial creation)
Modified principles: N/A (first version)
Added sections: All (Core Principles ×7, Technology Constraints, Development Workflow, Governance)
Removed sections: N/A
Templates requiring updates:
  - .momorph/templates/plan-template.md ✅ aligned (Constitution Compliance Check present)
  - .momorph/templates/spec-template.md ✅ aligned (constitution dependency listed)
  - .momorph/templates/tasks-template.md ✅ aligned (TDD enforcement in execution order)
Follow-up TODOs: None
-->

# MoMorph Constitution

## Core Principles

### I. Server-First Architecture

All data fetching and rendering MUST default to Server Components. Client components (`'use client'`) are permitted ONLY when browser interactivity is required (event handlers, hooks, browser APIs). The `'use client'` boundary MUST be pushed as far down the component tree as possible.

- Server Components MUST colocate data fetching with the component that uses it.
- Server actions MUST be used for form submissions and mutations.
- Shared server actions MUST be defined in separate files.
- Route segments MUST use `loading.tsx` and `error.tsx` where appropriate.

**Rationale**: Server-first minimizes client bundle size, improves initial load performance, and keeps sensitive logic off the client.

### II. TypeScript Strict Mode

All code MUST be written in TypeScript with `strict: true` enabled. The use of `any` is forbidden — every value MUST have a proper type.

- Path alias `@/*` MUST be used for all project imports.
- Naming conventions: PascalCase (components), camelCase (functions/variables), kebab-case (files/directories).
- No dead code — unused imports, variables, and functions MUST be removed immediately.
- ESLint with `next/core-web-vitals` and `next/typescript` MUST pass before committing (`yarn lint`).

**Rationale**: Strict typing catches errors at compile time, enforces consistent patterns, and makes the codebase self-documenting.

### III. Test-First Development (NON-NEGOTIABLE)

TDD is mandatory. The development cycle MUST follow: write tests → tests fail (red) → implement code → tests pass (green) → refactor.

- Tests MUST be written and approved BEFORE implementation begins.
- Integration tests are required for: new feature contracts, contract changes, inter-service communication, and shared schemas.
- Every user story MUST be independently testable.

**Rationale**: TDD ensures correctness by design, prevents regressions, and produces testable architecture from the start.

### IV. Security-First (OWASP Compliance)

All code MUST comply with OWASP Top 10 guidelines. Security is not an afterthought — it is a gate for every feature.

- ALL user inputs MUST be validated and sanitized server-side. Never trust client-side validation alone.
- Parameterized queries via Supabase client only — never concatenate user input into queries.
- Supabase Auth exclusively — no custom auth implementations.
- Auth state MUST be verified server-side before serving protected content or executing mutations.
- Row Level Security (RLS) MUST be enabled on all database tables. Never disable RLS in production.
- `dangerouslySetInnerHTML` is forbidden unless explicitly justified and content is sanitized.
- Secrets MUST never be committed. Use `NEXT_PUBLIC_` prefix only for truly public values.
- Security headers MUST be configured: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.

**Rationale**: Security vulnerabilities in production are costly and erode user trust. Enforcing security at every layer prevents common attack vectors.

### V. Mobile-First Responsive Design

All UI MUST be built mobile-first and support four breakpoints: Mobile (default, 0px), Tablet (`md:` 768px), Desktop (`lg:` 1024px), Wide (`xl:` 1280px).

- Base styles target mobile; layer up with `md:`, `lg:`, `xl:` prefixes.
- Tailwind responsive utilities MUST be used. Custom media queries are forbidden.
- Flexible layouts (`flex`, `grid`) over fixed widths. Use `max-w-*` with `mx-auto` for containers.
- Touch targets MUST be at least 44×44px on mobile.
- Layouts MUST be tested at 320px, 768px, 1024px, and 1440px widths.

**Rationale**: Mobile-first ensures the widest device compatibility and forces a progressive enhancement approach.

### VI. Edge-Compatible (Cloudflare Workers)

All code MUST run on the Cloudflare Workers runtime (V8 isolates). Node.js APIs are forbidden.

- No `fs`, `path`, `crypto` (use Web Crypto API), `Buffer` (use `Uint8Array`), or other Node.js built-ins.
- Use `getCloudflareContext()` for Cloudflare bindings (KV, R2, D1).
- Worker limits MUST be respected: 128MB memory, 30s CPU time (paid plan).
- Bundle size MUST be kept minimal — avoid heavy npm packages.

**Rationale**: The application deploys to Cloudflare Workers via OpenNext. Code that relies on Node.js APIs will fail at runtime.

### VII. Simplicity

Start simple. Apply YAGNI (You Aren't Gonna Need It) rigorously.

- No premature abstractions — three similar lines of code are better than a premature helper.
- No feature flags or backwards-compatibility shims when direct changes suffice.
- No extra error handling for scenarios that cannot occur. Validate only at system boundaries.
- Functions MUST be small and focused. Extract reusable logic into `src/libs/`.
- Keep components, hooks, and utilities minimal in scope.

**Rationale**: Simplicity reduces cognitive load, accelerates development, and minimizes bugs. Complexity MUST be justified.

## Technology Constraints

### Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 15 |
| UI Library | React | 19 |
| Language | TypeScript (strict) | 5 |
| Styling | Tailwind CSS | 4 |
| Auth & Database | Supabase (Auth, DB, Storage) | Latest |
| Deployment | Cloudflare Workers (via OpenNext) | Latest |
| Package Manager | Yarn | 1.22 |

### Supabase Client Usage

| Context | Client Source |
|---------|-------------|
| Browser | `@/libs/supabase/client.ts` |
| Server Components, Route Handlers, Server Actions | `@/libs/supabase/server.ts` |
| Middleware | `@/libs/supabase/middleware.ts` |

### Project Structure

```
src/
├── app/            # Next.js App Router (pages, layouts, route handlers, server actions)
│   ├── layout.tsx  # Root layout
│   ├── page.tsx    # Home page
│   └── globals.css # Global styles (Tailwind)
└── libs/           # Reusable logic and utilities
    └── supabase/   # Supabase client utilities
supabase/
├── config.toml     # Local dev config
├── migrations/     # Database migrations (small, reversible)
└── seeds/          # Seed data (common/ and dev/)
```

### Environment Variables

- **Client-side**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Server-side**: `SUPABASE_SECRET_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

## Development Workflow

### Commands

| Command | Purpose |
|---------|---------|
| `make up` | Full local setup (tools + deps + env + Supabase) |
| `make dev` | Start Next.js dev server with Turbopack |
| `make down` | Stop Supabase local |
| `yarn lint` | Run ESLint (MUST pass before committing) |
| `yarn build` | Production build |
| `yarn deploy` | Build and deploy to Cloudflare Workers |

### Quality Gates

1. **Before committing**: `yarn lint` MUST pass with zero errors.
2. **Before merging**: All tests MUST pass. Constitution compliance verified in PR review.
3. **Before deploying**: `yarn build` MUST succeed. No `any` types. No dead code.

### Code Review Checklist

- [ ] Follows Server-First architecture (Principle I)
- [ ] TypeScript strict, no `any` (Principle II)
- [ ] Tests written before implementation (Principle III)
- [ ] OWASP compliance verified (Principle IV)
- [ ] Responsive at all breakpoints (Principle V)
- [ ] No Node.js APIs used (Principle VI)
- [ ] No unnecessary complexity (Principle VII)

## Governance

This constitution is the single source of truth for all development decisions on MoMorph. It supersedes conflicting guidance in any other document.

### Amendment Process

1. Propose changes with rationale in a pull request modifying this file.
2. Changes MUST be reviewed and approved before merging.
3. Every amendment MUST include a migration plan for existing code if applicable.
4. Version MUST be incremented per semantic versioning:
   - **MAJOR**: Principle removal or backward-incompatible redefinition.
   - **MINOR**: New principle or materially expanded guidance.
   - **PATCH**: Clarifications, wording, typo fixes.

### Compliance

- All PRs and code reviews MUST verify compliance with these principles.
- Added complexity MUST be justified against Principle VII (Simplicity).
- Use `CLAUDE.md` as the runtime development guidance file, which MUST remain consistent with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-03-09 | **Last Amended**: 2026-03-09
