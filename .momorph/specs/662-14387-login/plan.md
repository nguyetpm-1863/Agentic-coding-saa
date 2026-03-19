# Implementation Plan: Login

**Frame**: `662:14387-Login`
**Date**: 2026-03-09 (updated 2026-03-10)
**Spec**: `specs/662-14387-login/spec.md`

---

## Summary

Build the Login screen — the application entry point for Sun Annual Awards 2025. The screen displays a full-screen hero with "ROOT FURTHER" branding and a single "LOGIN With Google" button powered by Supabase Auth + Google OAuth. The implementation requires creating auth infrastructure (middleware, callback route), the login page UI with responsive design, and a language selector component.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image
**Database**: Supabase (PostgreSQL) — auth.users managed by Supabase Auth
**Testing**: Playwright (E2E), Vitest (unit/integration) — to be set up
**State Management**: Server-side sessions (Supabase Auth cookies), minimal client state (loading/error)
**API Style**: Next.js Route Handlers + Supabase Auth SDK

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (Supabase Auth, Tailwind, next/font — no new deps)
- [x] Adheres to folder structure guidelines (App Router: `src/app/login/`, shared: `src/components/`)
- [x] Meets security requirements (Principle IV: Supabase Auth only, server-side session, no secrets exposed)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: Server Component page, client boundary on interactive elements only)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, 44px touch targets)
- [x] Edge-compatible (Principle VI: No Node.js APIs, Cloudflare Workers safe)
- [x] Simplicity (Principle VII: Single OAuth method, minimal components)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based with shared components
  - `src/app/login/` — Login page (Server Component)
  - `src/components/login/` — Login-specific client components (LoginButton)
  - `src/components/shared/` — Reusable components (Header, Footer, LanguageSelector)
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`
- **Data Fetching**: Server Component calls `supabase.auth.getUser()` to check session; redirects if authenticated
- **Fonts**: Montserrat (700) + Montserrat Alternates (700) via `next/font/google`, replacing Geist

### Backend Approach

- **API Design**: Single Route Handler at `/auth/callback` for OAuth code exchange
- **Data Access**: Supabase Auth SDK — no direct database queries needed
- **Validation**: URL parameter validation in callback route (code parameter)

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/client.ts` — Browser client for `signInWithOAuth()`
  - `@/libs/supabase/server.ts` — Server client for `getUser()` in page + callback
  - `@/libs/supabase/middleware.ts` — Middleware client for session refresh
- **Shared Components**: Header and Footer will be reusable across all screens
- **API Contracts**: Supabase Auth built-in endpoints (no custom API spec needed)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/662-14387-login/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # Codebase research findings
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/
│   ├── login/
│   │   ├── page.tsx              # Login page (Server Component)
│   │   ├── loading.tsx           # Loading skeleton (constitution Principle I / TR-006)
│   │   └── error.tsx             # Error boundary with retry (constitution Principle I / TR-006)
│   └── auth/
│       └── callback/
│           └── route.ts          # OAuth callback handler
├── components/
│   ├── login/
│   │   └── login-button.tsx      # "LOGIN With Google" button (Client Component)
│   └── shared/
│       ├── header.tsx            # Fixed header with logo + language selector
│       ├── footer.tsx            # Copyright footer
│       └── language-selector.tsx # Language dropdown toggle (Client Component)
├── middleware.ts                  # Auth middleware (session refresh + redirects)
└── libs/
    └── i18n/
        └── translations.ts       # Translation strings (VN, EN)

# Modified Files
src/
├── app/
│   ├── layout.tsx                # Add Montserrat font, update metadata
│   └── globals.css               # Add login design tokens

# Assets
public/
└── images/
    └── login/
        ├── saa-logo.png          # SAA 2025 logo (from Figma)
        ├── root-further-logo.png # ROOT FURTHER hero image (from Figma)
        ├── keyvisual-bg.webp     # Background artwork (from Figma, optimized)
        ├── google-icon.svg       # Google brand icon (from Figma)
        ├── flag-vn.svg           # Vietnam flag icon (from Figma)
        └── chevron-down.svg      # Dropdown chevron (from Figma)
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

> All required packages (`@supabase/ssr`, `next`, `react`, `tailwindcss`) are already installed.

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download required UI assets from Figma using `get_media_files` tool:
  - SAA 2025 Logo → `public/images/login/saa-logo.png`
  - ROOT FURTHER Logo → `public/images/login/root-further-logo.png`
  - Google Icon → `public/images/login/google-icon.svg`
  - Vietnam Flag → `public/images/login/flag-vn.svg`
  - Chevron Down → `public/images/login/chevron-down.svg`
- Export and optimize the key visual background → `public/images/login/keyvisual-bg.png`
- Verify asset quality and naming conventions (kebab-case per constitution)

### Phase 1: Foundation (Auth Infrastructure)

**Purpose**: Set up the authentication backbone that all features depend on.

1. **Create `src/middleware.ts`** — Auth middleware
   - Use `@/libs/supabase/middleware.ts` to create Supabase client
   - Refresh session tokens on every request
   - Redirect unauthenticated users from protected routes to `/login?next={originalPath}`
   - Redirect authenticated users from `/login` to `/` (home)
   - Configure `matcher` to process all routes except static files:
     ```typescript
     export const config = {
       matcher: [
         '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
       ],
     }
     ```
   - **Public routes** (no auth required): `/login`, `/auth/callback`
   - **Protected routes** (auth required): all other routes (`/`, `/dashboard`, etc.)

2. **Create `src/app/auth/callback/route.ts`** — OAuth callback handler
   - Extract `code` and `next` parameters from URL search params
   - **Open redirect protection (constitution Principle IV)**: Validate `next` URL is a relative path starting with `/` — reject absolute URLs or external domains. Default to `/` if invalid.
   - Exchange code for session using `supabase.auth.exchangeCodeForSession(code)`
   - Redirect 302 to validated `next` URL or `/` (home) on success
   - Redirect 302 to `/login?error=auth_callback_failed` on failure
   - Use server-side Supabase client from `@/libs/supabase/server.ts`

3. **Update `src/app/layout.tsx`** — Font + metadata changes
   - Replace Geist fonts with Montserrat (weight 700) and Montserrat Alternates (weight 700)
   - Set CSS variables `--font-montserrat` and `--font-montserrat-alternates`
   - Update metadata: title "Sun Annual Awards 2025", description, etc.

4. **Update `src/app/globals.css`** — Design tokens
   - Add login-specific CSS custom properties from `design-style.md`
   - Map Montserrat fonts to Tailwind via `--font-sans`

### Phase 2: User Story 1 — Google Login (P1, MVP)

**Purpose**: Core login UI and OAuth flow.

1. **Create `src/app/login/page.tsx`** — Login page (Server Component)
   - Check auth via `supabase.auth.getUser()` — redirect to `/` if authenticated
   - Render full-screen layout: background image, gradient overlays, header, hero, footer
   - Use `next/image` with `priority` for key visual background (LCP optimization)
   - All static elements rendered server-side

2. **Create `src/components/login/login-button.tsx`** — Login button (Client Component)
   - `'use client'` directive
   - Call `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${origin}/auth/callback?next=${next}` } })` on click
   - `redirectTo` MUST include the full origin + `/auth/callback` path with the `next` parameter forwarded
   - Manage loading state (`isLoading`): disabled button with spinner during OAuth redirect, prevent double-click
   - **Error handling (P1 MVP scope)**:
     - Use `useSearchParams()` to read `?error=` URL parameter
     - Map error codes to user-friendly messages: `auth_callback_failed` → "Login failed. Please try again.", `access_denied` → "Access was denied. Please try again.", default → "An error occurred."
     - Display error message in an `aria-live="polite"` region below the login button
     - Auto-dismiss error after 5 seconds using `useEffect` + `setTimeout`
     - Re-enable the button for retry when error is displayed
   - Style per `design-style.md`: #FFEA9E background, 8px radius, Montserrat 22px/700
   - **Button responsive sizing** (updated per spec review):
     - Mobile: `w-full h-[52px]` (full-width, 52px height, text-base/16px)
     - Tablet+ (md:): `w-[305px] h-[60px]` (fixed 305px width, 60px height, text-[22px])
     - CSS: `w-full md:w-[305px] h-[52px] md:h-[60px] text-base md:text-[22px]`
     - Minimum touch target (44px) met at all breakpoints
   - Focus state: `outline: 2px solid #FFFFFF` for keyboard accessibility

3. **Create `src/components/shared/header.tsx`** — Header (Server Component)
   - Fixed position, semi-transparent background (rgba(11,15,18,0.8))
   - Logo on left (next/image, SAA logo)
   - Language selector slot on right
   - Responsive padding: 16px mobile → 48px tablet → 144px desktop

4. **Create `src/components/shared/footer.tsx`** — Footer (Server Component)
   - Copyright text centered, Montserrat Alternates 16px/700
   - Top border: 1px solid #2E3940
   - Responsive padding: 16px mobile → 48px tablet → 90px desktop

### Phase 3: User Story 2 — Language Selection (P2)

**Purpose**: i18n support with language toggle.

1. **Create `src/libs/i18n/translations.ts`** — Translation data
   - Define translation object for VN and EN (at minimum)
   - Keys: `login.description`, `login.button`, `footer.copyright`
   - Type-safe translation keys

2. **Create `src/components/shared/language-selector.tsx`** — Language selector (Client Component)
   - `'use client'` directive
   - Display current language with flag icon and chevron
   - Toggle dropdown on click (open/close)
   - Close on outside click or `Escape` key
   - Keyboard navigation: `Enter`/`Space` to open, arrow keys to navigate options, `Enter` to select, `Escape` to close
   - ARIA attributes: `role="listbox"`, `aria-expanded`, `aria-label="Select language"`, options use `role="option"` with `aria-selected`
   - Persist selection in cookie (`locale`) for server-side reading via `document.cookie`
   - Style per `design-style.md`: 108×56px, 4px radius, focus state with `outline: 2px solid #FFFFFF`

3. **Update login page** — Apply i18n
   - Read language preference from cookie (server-side)
   - Pass translations to components
   - All user-facing text uses translation keys

### Phase 4: User Story 3 — Responsive Design (P3)

**Purpose**: Ensure layout works across all breakpoints.

1. **Apply responsive styles** per `design-style.md` responsive specifications:
   - Mobile (< 768px): Full-width button (`w-full h-[52px]`), text-base (16px), 16px padding, scaled logos
   - Tablet (768–1023px): 48px padding, button `w-[305px] h-[60px]`, text-[22px]
   - Desktop (≥ 1024px): Full Figma layout (144px padding), button 305×60px
   - Wide (≥ 1280px): max-width 1440px, centered, button 305×60px

2. **Verify touch targets**: All interactive elements ≥ 44×44px on mobile

3. **Test at 4 breakpoints**: 320px, 768px, 1024px, 1440px

### Phase 5: Polish & Edge Cases

**Purpose**: Accessibility audit, performance optimization, and remaining edge cases.

1. **Accessibility audit**:
   - Verify all interactive elements have visible focus indicators (`outline: 2px solid #FFFFFF`)
   - Verify tab order: Language Selector → Login Button (skip logo, it's decorative)
   - Verify background image has `alt=""` (decorative)
   - Verify `aria-live` region announces error/loading state changes
   - Run axe-core automated check — target WCAG AA pass

2. **Performance optimization**:
   - Key visual background: `next/image` with `priority`, WebP format, responsive `sizes` attribute
   - Font preloading: `next/font` handles this automatically with `display: swap`
   - Verify LCP < 3s on simulated 3G (Lighthouse)

3. **Edge cases**:
   - Session expiry during login page visit → middleware handles on next navigation
   - Supabase service unavailable → `error.tsx` boundary catches and displays retry UI
   - User navigates to `/auth/callback` directly without `code` param → redirect to `/login?error=auth_callback_failed`

4. **Page transition**: 300ms fade-in animation on login page mount (CSS `@keyframes` or Tailwind `animate-*`)

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| OAuth callback fails on Cloudflare Workers | Low | High | `@supabase/ssr` is edge-compatible; test early on `wrangler dev` |
| Background image too large for mobile | Med | Med | Serve WebP, use responsive `sizes` attribute, lazy-load on mobile |
| Google branding compliance | Low | Med | Review Google's Sign-in branding guidelines; custom button may need adjustments |
| Font loading delay (FOIT/FOUT) | Low | Low | Use `next/font` with `display: swap` and `preload` |
| Cookie-based i18n on Cloudflare Workers | Low | Med | Use standard `Set-Cookie` header — Workers supports this |

### Estimated Complexity

- **Frontend**: Medium — Multiple components, responsive layout, gradient overlays
- **Backend**: Low — Single route handler + middleware (Supabase handles auth)
- **Testing**: Medium — OAuth flow mocking, responsive viewport testing

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LoginButton → Supabase Auth → Callback → Redirect
- [x] **External dependencies**: Supabase Auth, Google OAuth
- [x] **Data layer**: Session cookies (Supabase SSR)
- [x] **User workflows**: Full login flow, authenticated redirect, error recovery

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Login button click → OAuth initiation, loading states |
| Service ↔ Service | Yes | Callback route → Supabase Auth code exchange |
| App ↔ External API | Yes | Supabase Auth → Google OAuth |
| App ↔ Data Layer | Yes | Session cookie creation/reading |
| Cross-platform | Yes | Responsive layout at 4 breakpoints |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E
- **Test data strategy**: Supabase local auth with test Google credentials
- **Isolation approach**: Fresh Supabase auth state per test suite

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack |
| Google OAuth | Mock | Cannot automate real Google consent; mock at Supabase level |
| Session cookies | Real | Test actual cookie flow via Playwright |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] User clicks login → redirected to Google → callback → session created → home page
   - [ ] Authenticated user visits /login → auto-redirected to home
   - [ ] User selects language → text updates → preference persists

2. **Error Handling**
   - [ ] OAuth fails (denied/error) → error message displayed → button re-enabled
   - [ ] Invalid callback code → redirect to /login with error
   - [ ] Network error during OAuth → graceful error display

3. **Edge Cases**
   - [ ] User navigates to protected route → redirect to /login?next=/protected → login → redirect back
   - [ ] Double-click login button → only one OAuth request initiated
   - [ ] Session expires → middleware redirects to /login

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: Supabase local, Playwright browser automation
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Auth flow (middleware + callback) | 90%+ | High |
| Login UI components | 80%+ | High |
| Responsive layout | Visual regression | Medium |
| i18n language switching | 80%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [x] `research.md` completed
- [x] API contracts defined (Supabase Auth built-in — no custom contracts needed)
- [ ] Database migrations planned — N/A (auth.users managed by Supabase)

### External Dependencies

- Google OAuth credentials configured in Supabase (already set up in `config.toml`)
- Supabase local running (`make up`)
- Figma media assets downloaded to `public/images/login/`

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **No new npm packages needed.** All required dependencies are already installed.
- **Fonts must change globally**: Replacing Geist with Montserrat affects the root layout. The current home page uses Geist but will be replaced when the authenticated home screen is implemented.
- **Background image source**: The key visual background is part of the Figma frame but needs to be exported as a separate optimized image (WebP preferred). It may need to be obtained from the design team if Figma export quality is insufficient.
- **Language dropdown overlay** (frame 721:4942) is out of scope for the login page itself. The `LanguageSelector` component will toggle a simple dropdown. The detailed dropdown design can be implemented when that frame is specified.
- **Google branding**: The Figma design uses a custom-styled button. Google's branding guidelines allow customization as long as the Google "G" icon is used and certain spacing rules are followed. Verify compliance during implementation.
