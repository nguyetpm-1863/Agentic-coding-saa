# Implementation Plan: Countdown — Prelaunch Page

**Frame**: `2268:35127-Countdown - Prelaunch page`
**Date**: 2026-03-09
**Spec**: `specs/2268-35127-countdown-prelaunch-page/spec.md`

---

## Summary

Build the Countdown Prelaunch Page — a full-screen immersive landing page displayed to authenticated users before the SAA 2025 event goes live. The page shows a real-time countdown timer (days, hours, minutes) over the key visual background with a diagonal gradient overlay. No header, no footer — a single immersive screen. When the event date arrives, the page auto-redirects to the Homepage (`/`). The countdown timer is a Client Component island using `setInterval` with 1-minute granularity, while the page shell is a Server Component with server-rendered initial countdown values.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image
**Database**: Supabase (PostgreSQL) — auth only. Event date via `EVENT_START_DATE` environment variable (decided, see Notes)
**Testing**: Playwright (E2E), Vitest (unit/integration)
**State Management**: Server-side sessions (Supabase Auth cookies), client state for countdown values and redirect trigger
**API Style**: Supabase client queries (Server Components for auth) + `EVENT_START_DATE` environment variable for event date

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases `@/*`, PascalCase components, kebab-case files)
- [x] Uses approved libraries and patterns (Supabase, Tailwind CSS, next/image, next/font — no new deps)
- [x] Adheres to folder structure guidelines (App Router: `src/app/countdown/`, feature: `src/components/countdown/`)
- [x] Meets security requirements (Principle IV: Supabase Auth only, server-side session verification, authenticated-only access)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined in spec)
- [x] Server-first architecture (Principle I: Server Component page, client boundary only on CountdownTimer)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, mobile-first Tailwind)
- [x] Edge-compatible (Principle VI: No Node.js APIs, `setInterval` and `Date` are standard Web APIs, Cloudflare Workers safe)
- [x] Simplicity (Principle VII: Single-purpose page, minimal state, one Client Component)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Minimal, feature-based
  - `src/app/countdown/` — Countdown page (Server Component), loading/error boundaries
  - `src/components/countdown/` — CountdownTimer (Client Component), CountdownUnit (presentational)
  - No shared Header or Footer — this is a full-screen immersive page (TR-007)
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`. Glass morphism digit boxes via `backdrop-blur-[24.96px]` with gradient background at 0.5 opacity.
- **Data Fetching**: Server Component reads event date from `EVENT_START_DATE` environment variable. Calculates initial countdown values server-side and passes to Client Component.
- **Timer Logic**: Client Component uses `setInterval` at 60-second intervals. Initial values are server-rendered for SSR/no-JS fallback. `useEffect` cleanup on unmount.

### Backend Approach

- **API Design**: No custom API routes needed. Event date configured via `EVENT_START_DATE` environment variable.
- **Data Access**: `process.env.EVENT_START_DATE` (Principle VII: Simplicity). **Decision**: Use environment variable, not a Supabase config table. This is a one-time event — changing the date requires a redeploy, which is acceptable. **Note**: On Cloudflare Workers, `process.env` is available at build time via Next.js inline replacement. Add `EVENT_START_DATE` to `.env.example` with format: `EVENT_START_DATE=2026-06-15T09:00:00+07:00`.
- **Validation**: Server-side auth check via middleware. Event date validation (future date check for redirect logic).

### Integration Points

- **Existing Services**:
  - `src/middleware.ts` — Auth middleware (redirects unauthenticated to `/login`). Needs extension to handle `/countdown` route logic (redirect to `/` if event has started).
  - `@/libs/supabase/server.ts` — Server client for auth check
  - `@/libs/i18n/translations.ts` — Translation strings for countdown page
- **Shared Components**: None — no header/footer on this page
- **API Contracts**: No custom API contracts needed

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2268-35127-countdown-prelaunch-page/
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
│   └── countdown/
│       ├── page.tsx              # Countdown page (Server Component)
│       ├── loading.tsx           # Loading skeleton (constitution Principle I)
│       └── error.tsx             # Error boundary with retry (constitution Principle I)
├── components/
│   └── countdown/
│       ├── countdown-timer.tsx   # Real-time countdown (Client Component)
│       └── countdown-unit.tsx    # Single unit display: digit pair + label (presentational)
└── libs/
    └── i18n/
        └── translations.ts      # Add countdown.* i18n keys

# Modified Files
src/
├── middleware.ts                  # Add /countdown route logic (redirect if event started)

# Assets
public/
└── images/
    └── countdown/
        └── keyvisual-bg.webp     # Hero key visual background (may reuse from login)

# Fonts
public/
└── fonts/
    └── digital-numbers.woff2     # Digital Numbers font for countdown digits
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

> All required packages (`@supabase/ssr`, `next`, `react`, `tailwindcss`) are already installed. `setInterval`, `Date`, and `useRouter` are standard APIs.

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download the key visual background from Figma → `public/images/countdown/keyvisual-bg.webp` (may reuse from login if same artwork)
- Obtain "Digital Numbers" font file → `public/fonts/digital-numbers.woff2`
- Configure font via `next/font/local` in root layout or countdown page

### Phase 1: Foundation (Routing + i18n + Font)

**Purpose**: Set up routing logic, translations, and font configuration.

1. **Update `src/middleware.ts`** — Add countdown route logic
   - `/countdown` is a **protected route** (NOT public). Unauthenticated users MUST be redirected to `/login` (FR-004).
   - Add logic: if event date has passed and authenticated user navigates to `/countdown`, redirect to `/` (FR-005).
   - Event date can be read from environment variable at middleware level (build-time inlined).
   - **Note**: Middleware runs on the edge. Environment variable access must work in Cloudflare Workers context.

2. **Update translations** — `src/libs/i18n/translations.ts`
   - Add `countdown.title`: "Su kien se bat dau sau" / "The event will start in"
   - Add `countdown.days`: "DAYS" / "DAYS"
   - Add `countdown.hours`: "HOURS" / "HOURS"
   - Add `countdown.minutes`: "MINUTES" / "MINUTES"

3. **Configure Digital Numbers font**
   - Add font file to `public/fonts/digital-numbers.woff2`
   - Register via `next/font/local` with CSS variable `--font-digital-numbers`
   - Apply to countdown digits only

### Phase 2: User Story 1 — View Countdown Timer (P1, MVP)

**Purpose**: Core countdown display with real-time updates.

1. **Create `src/app/countdown/page.tsx`** — Countdown page (Server Component)
   - Verify auth via middleware (handled automatically)
   - Read `EVENT_START_DATE` from environment variable
   - Calculate initial countdown values server-side: `{ days, hours, minutes }`
   - Read locale from cookie for i18n
   - Render: full-screen background image → gradient overlay → content container with title + CountdownTimer
   - Background: `bg-[#00101A] min-h-screen relative overflow-hidden`
   - Background image: `next/image` with `priority`, `fill`, `object-cover`, `z-0`
   - Gradient overlay: `absolute inset-0 z-[1]` with `linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)`
   - Content container: `relative z-10 flex flex-col items-center` with responsive padding and gap
   - Title: `font-montserrat text-xl md:text-[28px] lg:text-4xl font-bold text-white text-center`
   - Pass `initialCountdown` and `eventDate` (ISO string) to CountdownTimer

2. **Create `src/app/countdown/loading.tsx`** — Loading skeleton
   - Full-screen dark background (`#00101A`) with centered pulsing placeholder
   - Display "00 : 00 : 00" as placeholder digits

3. **Create `src/app/countdown/error.tsx`** — Error boundary
   - Dark background, centered "Something went wrong" with "Try again" button (`#FFEA9E`, 8px radius)

4. **Create `src/components/countdown/countdown-timer.tsx`** — Real-time countdown (Client Component)
   - `'use client'` directive
   - Props: `initialCountdown: { days: number, hours: number, minutes: number }`, `eventDate: string` (ISO), `translations: { days: string, hours: string, minutes: string }`
   - State: `countdown` object (days, hours, minutes), `isEventStarted` boolean
   - `useEffect` on mount: calculate current countdown from `eventDate`, set up `setInterval` at 60-second intervals
   - On each tick: recalculate `{ days, hours, minutes }` from `eventDate - Date.now()` (always recalculate from current time, never decrement — this prevents drift)
   - When countdown reaches 0 or below: set `isEventStarted = true`, trigger `router.push('/')` via `useRouter()`
   - `useEffect` cleanup: clear interval on unmount
   - **Hydration mismatch prevention**: Use `suppressHydrationWarning` on digit elements, or render placeholder values on server and immediately recalculate on client mount. The server-rendered values are a best-effort snapshot; the client takes over within the first tick. Since granularity is minutes, any sub-minute difference between server render and client hydration is acceptable.
   - Render: flex row with 3 `CountdownUnit` components (days, hours, minutes)
   - `aria-live="polite"` and `role="timer"` on timer container for screen reader announcements
   - `aria-label` with full countdown text (e.g., "X days, Y hours, Z minutes remaining")
   - Gap: `gap-6 md:gap-10 lg:gap-12 xl:gap-[60px]`

5. **Create `src/components/countdown/countdown-unit.tsx`** — Single unit display
   - Props: `value: number`, `label: string`
   - Split value into two digits: `String(value).padStart(2, '0')` → `[tens, ones]`
   - Digit pair: `flex gap-3 md:gap-4 xl:gap-[21px]`
   - Digit box: glass morphism effect
     - Outer: `w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[68px] lg:h-[110px] xl:w-[77px] xl:h-[123px]`
     - Border: `border-[0.75px] border-[#FFEA9E]`
     - Radius: `rounded-lg xl:rounded-[12px]`
     - `backdrop-blur-[24.96px]`
     - Background gradient (0.5 opacity): use a `::before` pseudo-element or inner `<div>` with `bg-gradient-to-b from-white to-white/10 opacity-50 absolute inset-0 rounded-[inherit]`
     - `flex items-center justify-center`
   - Digit text: `font-digital-numbers text-[46px] md:text-[58px] lg:text-[66px] xl:text-[73.73px] font-normal text-white`
   - Label text: `font-montserrat text-base md:text-2xl xl:text-4xl font-bold text-white text-center`

### Phase 3: User Story 2 — Pre-event Redirect (P2)

**Purpose**: Correct routing based on auth status and event timing.

1. **Server-side redirect logic** in `src/app/countdown/page.tsx`
   - If event date has passed: `redirect('/')` (Next.js server redirect)
   - If event date not configured: display 00:00:00 fallback (graceful degradation)

2. **Client-side redirect** in CountdownTimer
   - When `isEventStarted` becomes true → `router.push('/')`
   - Cleanup interval before redirect

3. **Middleware extension** in `src/middleware.ts`
   - Unauthenticated → redirect to `/login`
   - Authenticated + event started → redirect to `/` (optional server-side check for immediate redirect without page load)

### Phase 4: User Story 3 — Responsive Layout (P3)

**Purpose**: Ensure countdown displays correctly across all breakpoints.

1. **Mobile (< 768px)**:
   - Content container: `px-4 py-8 gap-12`
   - Title: `text-xl leading-7`
   - Timer: `gap-6` (horizontal, fits 3 units at smaller size)
   - Digit boxes: `w-12 h-[77px] rounded-lg`
   - Digit text: `text-[46px]`
   - Unit labels: `text-base`
   - Digit pair gap: `gap-3`
   - Unit internal gap: `gap-3`

2. **Tablet (768px - 1023px)**:
   - Content container: `md:px-12 md:py-16 md:gap-20`
   - Title: `md:text-[28px] md:leading-9`
   - Timer: `md:gap-10`
   - Digit boxes: `md:w-[60px] md:h-24 md:rounded-[10px]`
   - Digit text: `md:text-[58px]`
   - Unit labels: `md:text-2xl`

3. **Desktop (1024px - 1279px)**:
   - Content container: `lg:px-20 lg:py-24 lg:gap-[100px]`
   - Title: `lg:text-4xl`
   - Timer: `lg:gap-12`
   - Digit boxes: `lg:w-[68px] lg:h-[110px]`
   - Digit text: `lg:text-[66px]`

4. **Wide (>= 1280px)**:
   - Content container: `xl:px-36 xl:py-24 xl:gap-[120px]`
   - Digit boxes: `xl:w-[77px] xl:h-[123px] xl:rounded-[12px]`
   - Digit text: `xl:text-[73.73px]`
   - Unit labels: `xl:text-4xl`
   - Timer gap: `xl:gap-[60px]`
   - Digit pair gap: `xl:gap-[21px]`

### Phase 5: Polish & Edge Cases

**Purpose**: Accessibility, performance, and remaining edge cases.

1. **Accessibility audit**:
   - Timer container: `aria-live="polite"` for screen reader updates (announce "X days, Y hours, Z minutes remaining")
   - Semantic HTML: use `<time>` element or `role="timer"` on countdown container
   - Color contrast: white text on dark gradient — verify 4.5:1 ratio
   - No interactive elements beyond the error boundary retry button
   - Run axe-core automated check — target WCAG AA pass

2. **Performance optimization**:
   - Key visual: `next/image` with `priority`, `fill`, `sizes="100vw"`, WebP format
   - Digital Numbers font: preload via `next/font/local`
   - Minimal Client Component — only `countdown-timer.tsx` has `'use client'`
   - `setInterval` at 60s intervals — very low CPU overhead
   - LCP target: < 2 seconds

3. **Edge cases**:
   - Event date not configured → display 00:00:00, no redirect
   - User's clock significantly wrong → server-rendered initial values provide accurate snapshot; client timer is cosmetic but acceptable drift
   - JavaScript disabled → server-rendered countdown values visible as static snapshot
   - Timer reaches exactly 0 → redirect fires, interval clears
   - Multiple tabs open → each tab has its own timer (acceptable, no cross-tab sync needed)

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Digital Numbers font not available or license issue | Med | Med | Source font file early; configure `next/font/local` with fallback to monospace (`font-mono`) |
| Timer drift over long periods | Low | Low | Recalculate from `Date.now()` on each tick (not decrement); drift < 1 minute is acceptable |
| Background image same as login — cache conflicts | Low | Low | Use distinct file paths per page or share a single optimized asset |
| Event date env var not set in production | Med | High | Validate at build time; fallback to 00:00:00 display; add warning log |
| Glass morphism `backdrop-filter` performance on mobile | Low | Med | Test on low-end devices; consider simplified style (solid semi-transparent bg) on mobile |

### Estimated Complexity

- **Frontend**: Low-Medium — Simple full-screen layout, one Client Component, glass morphism digit boxes
- **Backend**: Low — Environment variable or single Supabase query, middleware route addition
- **Testing**: Low-Medium — Timer logic unit tests, redirect flow E2E, responsive visual testing

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: CountdownTimer interval → state update → UI render → redirect trigger
- [x] **External dependencies**: Supabase Auth (session verification)
- [ ] **Data layer**: Minimal — event date from env var
- [x] **User workflows**: Authenticated user → view countdown → event starts → auto-redirect to `/`

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Timer tick → digit update, countdown reaches 0 → redirect |
| Service ↔ Service | No | No inter-service communication |
| App ↔ External API | No | No external APIs beyond Supabase Auth |
| App ↔ Data Layer | No | Event date from env var, not DB |
| Cross-platform | Yes | Responsive layout at 4 breakpoints |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E
- **Test data strategy**: Set `EVENT_START_DATE` env var to future/past dates for different test scenarios
- **Isolation approach**: Different env var values per test case; fresh auth state

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack |
| Date/Time | Mock (Vitest) | Use `vi.useFakeTimers()` to control time for countdown logic unit tests |
| setInterval | Mock (Vitest) | Use `vi.advanceTimersByTime()` to simulate timer ticks |
| Environment variable | Real | Set different values per test scenario |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Authenticated user visits `/countdown` → title and countdown timer displayed
   - [ ] Timer shows correct days, hours, minutes for a known future event date
   - [ ] After 1 minute (simulated), timer values update correctly
   - [ ] When event date arrives (simulated), user is redirected to `/`

2. **Error Handling**
   - [ ] Unauthenticated user visits `/countdown` → redirected to `/login`
   - [ ] Event date already passed → immediate redirect to `/`
   - [ ] Event date not configured → displays 00:00:00

3. **Edge Cases**
   - [ ] Timer at exactly 00:00:00 → redirect fires
   - [ ] Page loads with < 1 minute remaining → shows 00:00:01 then redirects on next tick
   - [ ] Responsive layout at 320px, 768px, 1024px, 1440px — digits readable and centered
   - [ ] Server-rendered initial values match client-calculated values (no hydration mismatch)

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: Supabase local, Playwright browser automation, `vi.useFakeTimers()`
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Countdown timer logic (calculate, tick, redirect) | 95%+ | High |
| Routing/redirect logic (middleware + page) | 90%+ | High |
| Responsive layout | Visual regression | Medium |
| i18n translations | 80%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [ ] Digital Numbers font file obtained
- [ ] Event date decided and documented

### External Dependencies

- Supabase local running (`make up`)
- Key visual background image available (may reuse from login)
- Digital Numbers font file (`.woff2`) for countdown digits
- `EVENT_START_DATE` environment variable defined (ISO 8601 format, e.g., `2026-06-15T09:00:00+07:00`)
- Login implementation complete (middleware, auth infrastructure)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **No shared components reused.** This is a standalone immersive page with no header or footer (TR-007). The only shared infrastructure is the auth middleware and i18n translations.
- **No new npm packages needed.** `setInterval`, `Date`, `useRouter`, and `useEffect` are all standard APIs.
- **Server-rendered initial values prevent hydration mismatch**: The server calculates `{ days, hours, minutes }` and passes them as `initialCountdown` props. The client-side `useEffect` recalculates on mount. There may be a brief discrepancy (< 1 minute) between server render time and client mount time — this is acceptable.
- **Glass morphism digit box implementation**: The gradient background needs to be at 0.5 opacity while the digit text stays at full opacity. Use an absolute-positioned inner `<div>` for the gradient layer, not `opacity` on the box itself (which would also affect the text).
- **The design is at 1512px width** (not 1440px like other pages). The responsive implementation should still use `max-w-[1440px]` or allow full-width content since this is a full-screen immersive page.
- **Timer granularity is minutes, not seconds** (FR-002, TR-002). The `setInterval` runs every 60 seconds. This minimizes re-renders and is sufficient for a pre-event countdown.
- **Environment variable for event date (RESOLVED)**: Use `EVENT_START_DATE` environment variable (Principle VII: Simplicity). This is a one-time event — changing the date requires a redeploy, which is acceptable. No Supabase config table needed. Add to `.env.example`: `EVENT_START_DATE=2026-06-15T09:00:00+07:00`.
