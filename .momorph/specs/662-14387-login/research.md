# Research: Login

**Frame**: `662:14387-Login`
**Date**: 2026-03-09
**Spec**: `specs/662-14387-login/spec.md`

---

## Purpose

This document captures findings from codebase analysis to inform the Login implementation plan.

---

## Codebase Analysis

### Existing Patterns Identified

#### Supabase Client Patterns
| Pattern | Location | Relevance |
|---------|----------|-----------|
| Browser client | `src/libs/supabase/client.ts` | Use for client-side OAuth trigger (`signInWithOAuth`) |
| Server client | `src/libs/supabase/server.ts` | Use in Server Components for session check and in `/auth/callback` route handler |
| Middleware client | `src/libs/supabase/middleware.ts` | Use in `src/middleware.ts` for session refresh + auth redirect |

#### Font & Styling Patterns
| Pattern | Location | Relevance |
|---------|----------|-----------|
| Google Fonts via `next/font` | `src/app/layout.tsx` | Currently loads Geist; must add Montserrat + Montserrat Alternates |
| Tailwind 4 with CSS vars | `src/app/globals.css` | Currently uses `--background`/`--foreground` vars; must add login design tokens |
| Dark/light mode via `prefers-color-scheme` | `src/app/globals.css` | Login is always dark — no theme toggle needed on this page |

#### Auth Configuration
| Pattern | Location | Relevance |
|---------|----------|-----------|
| Google OAuth enabled | `supabase/config.toml` | Provider configured, reads `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` |
| Redirect URLs configured | `supabase/config.toml` | `http://localhost:3000` and `https://127.0.0.1:3000` |
| Email auth disabled | `supabase/config.toml` | Confirms Google OAuth is the sole method |

---

## Reusable Components

### Components to Leverage

**None exist.** `src/components/` directory does not exist. All components must be created from scratch.

### Hooks to Leverage

**None exist.** No custom hooks directory.

### Services to Leverage

| Service | Path | Usage in Feature |
|---------|------|------------------|
| Supabase browser client | `src/libs/supabase/client.ts` | Call `supabase.auth.signInWithOAuth({ provider: 'google' })` |
| Supabase server client | `src/libs/supabase/server.ts` | Call `supabase.auth.getUser()` for session check |
| Supabase middleware client | `src/libs/supabase/middleware.ts` | Session refresh and auth redirect logic |

---

## Integration Points

### APIs to Connect

| API Endpoint | Method | Current Status | Notes |
|--------------|--------|----------------|-------|
| Supabase Auth `/auth/v1/authorize` | GET | Exists (built-in) | Triggered by `signInWithOAuth()` |
| `/auth/callback` | GET | **Does not exist** | Must create as Next.js route handler |
| Supabase Auth `/auth/v1/token` | POST | Exists (built-in) | Called by Supabase SDK in callback |

### Database Entities

| Entity | Table | Status | Notes |
|--------|-------|--------|-------|
| User (auth.users) | auth.users | Exists (Supabase managed) | Auto-created on first OAuth login |

### External Services

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| Google OAuth | Authentication | Supabase Auth SDK (`signInWithOAuth`) |
| Supabase Auth | Session management | `@supabase/ssr` package |

---

## Potential Challenges

### Technical Challenges

| Challenge | Impact | Proposed Solution |
|-----------|--------|-------------------|
| No middleware exists yet | High | Create `src/middleware.ts` with auth redirect logic |
| Font switch from Geist to Montserrat | Low | Update `layout.tsx` to load Montserrat via `next/font/google` |
| Background image optimization for edge | Med | Use `next/image` with priority; consider WebP format |
| Cloudflare Workers cookie handling | Med | Supabase SSR package handles this; verify with `@supabase/ssr` |

### Integration Challenges

| Challenge | Impact | Proposed Solution |
|-----------|--------|-------------------|
| OAuth callback flow on Cloudflare Workers | Med | Use standard `@supabase/ssr` pattern — already edge-compatible |
| Return URL after login | Low | Pass `redirectTo` param in `signInWithOAuth()` options |

---

## Media Assets (from Figma)

| Asset | Node ID | Type | Target Path |
|-------|---------|------|-------------|
| SAA 2025 Logo | I662:14391;178:1033;178:1030 | PNG | `public/images/login/saa-logo.png` |
| Vietnam Flag | I662:14391;186:1696;186:1821;186:1709 | SVG | `public/images/login/flag-vn.svg` |
| Chevron Down | I662:14391;186:1696;186:1821;186:1441 | SVG | `public/images/login/chevron-down.svg` |
| ROOT FURTHER Logo | 2939:9548 | PNG | `public/images/login/root-further-logo.png` |
| Google Icon | I662:14426;186:1766 | SVG | `public/images/login/google-icon.svg` |
| Key Visual Background | (full frame export) | PNG/WebP | `public/images/login/keyvisual-bg.png` |

---

## Recommendations

### Architecture Recommendations

1. **Server Component page with Client Component islands**: The login page (`src/app/login/page.tsx`) should be a Server Component that checks auth and redirects. Only `LoginButton` and `LanguageSelector` need `'use client'`.
2. **Middleware for auth guards**: Create `src/middleware.ts` that refreshes sessions and redirects unauthenticated users from protected routes to `/login`.
3. **Reusable Header/Footer**: Build `Header` and `Footer` as shared components since they appear across multiple screens.

### Implementation Recommendations

1. **Start with**: Auth infrastructure (middleware + callback route), then the login page UI.
2. **Leverage**: Existing Supabase client utilities in `src/libs/supabase/` — they follow the recommended `@supabase/ssr` pattern.
3. **Avoid**: Custom session management. Let Supabase Auth handle everything via cookies.

### Testing Recommendations

1. **Focus on**: OAuth callback route handler, middleware redirect logic, login button state transitions.
2. **Mock**: Supabase Auth responses for unit tests; use Supabase local for integration tests.
3. **E2E scenarios**: Full Google OAuth flow (may need to mock Google consent in E2E).

---

## Files to Review Before Implementation

### Must Read

- [x] `src/libs/supabase/client.ts` — Browser client for `signInWithOAuth`
- [x] `src/libs/supabase/server.ts` — Server client for session verification
- [x] `src/libs/supabase/middleware.ts` — Middleware client for session refresh
- [x] `src/app/layout.tsx` — Root layout (font + metadata changes needed)
- [x] `src/app/globals.css` — Global styles (design token additions)
- [x] `supabase/config.toml` — Auth configuration (Google OAuth enabled)

---

## Notes

- The project is in an early state — only the default Next.js homepage exists. No components, no middleware, no auth UI.
- Supabase local is configured with Google OAuth enabled and email auth disabled, matching the spec requirement.
- The storage bucket `images` exists in Supabase config — but login assets should go in `public/` for static serving, not Supabase Storage.
- `@supabase/ssr` v0.8.0 is already installed and the client utilities follow the latest recommended patterns.
