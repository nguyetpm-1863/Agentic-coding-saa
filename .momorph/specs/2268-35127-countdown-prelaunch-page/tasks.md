# Tasks: Countdown — Prelaunch Page

**Frame**: `2268:35127-Countdown - Prelaunch page`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation & Font Config)

**Purpose**: Download assets from Figma, configure the Digital Numbers custom font

- [x] T001 Download key visual background image from Figma (may reuse from login), export as optimized WebP | `public/images/countdown/keyvisual-bg.webp`
- [x] T002 Obtain Digital Numbers font file (.woff2) for countdown digits | `public/fonts/digital-numbers.woff2`
- [x] T003 Verify all assets exist and follow kebab-case naming | `public/images/countdown/`, `public/fonts/`
- [x] T004 [P] Configure Digital Numbers font via `next/font/local` with CSS variable `--font-digital-numbers`, set `display: 'swap'`, add fallback to monospace. Export font object for use in countdown components. | `src/app/layout.tsx`
- [x] T005 [P] Add countdown design tokens as CSS custom properties from design-style.md: `--gradient-cover` (18deg), `--gradient-digit-box`, `--blur-digit-box`, digit box border/radius values | `src/app/globals.css`

---

## Phase 2: Foundation (Routing + i18n)

**Purpose**: Set up middleware routing logic and translation keys — BLOCKS all user story work

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Update auth middleware: ensure `/countdown` is a protected route (NOT public) — unauthenticated users redirect to `/login`. Add logic: if `EVENT_START_DATE` env var is set and event date has passed, redirect authenticated users from `/countdown` to `/`. Keep middleware edge-compatible (no Node.js APIs). | `src/middleware.ts`
- [x] T007 [P] Update translations: add `countdown.title` ("Su kien se bat dau sau" / "The event will start in"), `countdown.days` ("DAYS"), `countdown.hours` ("HOURS"), `countdown.minutes` ("MINUTES") for both VN and EN | `src/libs/i18n/translations.ts`
- [x] T008 [P] Add `EVENT_START_DATE` environment variable (ISO 8601 format, e.g., `2026-06-15T09:00:00+07:00`) to `.env.example` and `.env.development` | `.env.example`, `.env.development`

**Checkpoint**: Routing enforced, translations ready, env var configured — countdown UI implementation can begin

---

## Phase 3: User Story 1 — View Countdown Timer (Priority: P1) MVP

**Goal**: Authenticated user sees a full-screen immersive countdown page with live timer (days, hours, minutes) that updates every minute. Auto-redirects to `/` when event date arrives. No header, no footer.

**Independent Test**: Navigate to `/countdown` while authenticated and before event date. Verify title "Su kien se bat dau sau" is displayed. Verify countdown shows days, hours, minutes with glass morphism digit boxes. Wait 1 minute and verify timer updates. Set event date to past and verify redirect to `/`.

### Page Shell (US1)

- [x] T009 [P] [US1] Create countdown page loading skeleton: full-screen `#00101A` background with centered pulsing placeholder showing "00 : 00 : 00" as placeholder digits | `src/app/countdown/loading.tsx`
- [x] T010 [P] [US1] Create countdown page error boundary: `#00101A` background, centered "Something went wrong" message with "Try again" button (`bg-[#FFEA9E]`, `rounded-lg`, `text-[#00101A]`), receives `reset` function | `src/app/countdown/error.tsx`

### Components (US1)

- [x] T011 [P] [US1] Create CountdownUnit component (presentational, Server Component compatible): props `value: number`, `label: string`. Split value into two digits via `String(value).padStart(2, '0')`. Digit pair: flex, gap `gap-3 md:gap-4 xl:gap-[21px]`. Each digit box: responsive sizing `w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[68px] lg:h-[110px] xl:w-[77px] xl:h-[123px]`, `rounded-lg xl:rounded-[12px]`, `border-[0.75px] border-[#FFEA9E]`, `backdrop-blur-[24.96px]`. Glass morphism: inner absolute `<div>` with `bg-gradient-to-b from-white to-white/10 opacity-50 rounded-[inherit]` behind digit text. Digit text: `font-digital-numbers text-[46px] md:text-[58px] lg:text-[66px] xl:text-[73.73px] font-normal text-white text-center`. Label: `font-montserrat text-base md:text-2xl xl:text-4xl font-bold text-white text-center`. Unit container: `flex flex-col items-center gap-3 md:gap-4 xl:gap-[21px]`. | `src/components/countdown/countdown-unit.tsx`
- [x] T012 [US1] Create CountdownTimer component (Client Component): `'use client'` directive. Props: `initialCountdown: { days: number, hours: number, minutes: number }`, `eventDate: string` (ISO), `translations: { days: string, hours: string, minutes: string }`. State: `countdown` (days/hours/minutes), `isEventStarted` boolean. On mount (`useEffect`): recalculate countdown from `eventDate - Date.now()`, set up `setInterval` at 60-second intervals. Each tick: recalculate from current time (not decrement — prevents drift). When countdown <= 0: set `isEventStarted = true`, call `router.push('/')` via `useRouter()`, clear interval. Cleanup: clear interval on unmount. Use `suppressHydrationWarning` on digit elements to handle server/client time mismatch. Timer container: `flex gap-6 md:gap-10 lg:gap-12 xl:gap-[60px] items-center`, `aria-live="polite"`, `role="timer"`, `aria-label` with full countdown text. Render 3 CountdownUnit components (days, hours, minutes). | `src/components/countdown/countdown-timer.tsx`

### Page Assembly (US1)

- [x] T013 [US1] Create countdown page (Server Component): read `EVENT_START_DATE` from `process.env`, calculate initial countdown values `{ days, hours, minutes }` server-side, read locale cookie, call `getTranslations(locale)`. If event date has passed: `redirect('/')`. If event date not configured: pass 00:00:00 as fallback. Render: `bg-[#00101A] min-h-screen relative overflow-hidden` → background `next/image` (fill, object-cover, priority, `z-0`, `alt=""`, `sizes="100vw"`) → gradient overlay (`absolute inset-0 z-[1]`, `background: linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)`) → content container (`relative z-10 flex flex-col items-center`, responsive padding `px-4 py-8 md:px-12 md:py-16 lg:px-20 lg:py-24 xl:px-36 xl:py-24`, gap `gap-12 md:gap-20 lg:gap-[100px] xl:gap-[120px]`) → title `<h1>` (Montserrat `text-xl md:text-[28px] lg:text-4xl font-bold text-white text-center`) → CountdownTimer with `initialCountdown`, `eventDate`, and `translations` props. No header, no footer (TR-007). | `src/app/countdown/page.tsx`

**Checkpoint**: User Story 1 complete — countdown timer renders and updates in real-time, auto-redirect works

---

## Phase 4: User Story 2 — Pre-event Redirect (Priority: P2)

**Goal**: Correct routing: unauthenticated users to `/login`, authenticated users to `/` if event has started. Both server-side and client-side redirect paths work.

**Independent Test**: Visit `/countdown` while unauthenticated — verify redirect to `/login`. Visit `/countdown` after event date — verify redirect to `/`. Visit `/countdown` before event date — verify countdown displays.

- [x] T014 [US2] Verify server-side redirect in countdown page: if `EVENT_START_DATE` is in the past, call Next.js `redirect('/')` before rendering. Verify this works with the middleware redirect (T006) as a double-check. | `src/app/countdown/page.tsx`
- [x] T015 [US2] Verify client-side redirect in CountdownTimer: when `isEventStarted` becomes true, `router.push('/')` fires, interval is cleared before redirect. Test by setting event date to near-future and waiting for countdown to reach 0. | `src/components/countdown/countdown-timer.tsx`
- [x] T016 [US2] Verify middleware handles all routing edge cases: unauthenticated → `/login`, authenticated + event started → `/`, authenticated + event not started → allow `/countdown` | `src/middleware.ts`

**Checkpoint**: User Story 2 complete — all routing scenarios handled correctly

---

## Phase 5: User Story 3 — Responsive Layout (Priority: P3)

**Goal**: Countdown page displays correctly at 320px, 768px, 1024px, 1440px. Digit boxes readable, content centered.

**Independent Test**: Load countdown page at all 4 breakpoints. Verify digits are readable, timer units are horizontally aligned (or appropriately stacked), no overflow.

- [x] T017 [US3] Verify responsive styles already applied via Tailwind responsive prefixes in T011-T013. Test at 320px: content `px-4 py-8 gap-12`, title `text-xl`, digit boxes `w-12 h-[77px]`, digits `text-[46px]`, labels `text-base`, timer `gap-6`, digit pair `gap-3`. Test at 768px: `md:` values. Test at 1024px: `lg:` values. Test at 1440px: `xl:` values matching Figma exactly. | all countdown components
- [x] T018 [P] [US3] Verify countdown timer fits horizontally at 320px: 3 units x (2 digit boxes at 48px + 12px gap) + 2 inter-unit gaps at 24px = ~384px. If overflow at 320px, reduce digit box to `w-10 h-16` or add `flex-wrap` with appropriate spacing. | `src/components/countdown/countdown-unit.tsx`, `src/components/countdown/countdown-timer.tsx`

**Checkpoint**: All user stories complete — fully responsive countdown page

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance optimization, edge cases

### Accessibility

- [x] T019 [P] Verify timer container has `aria-live="polite"` and `role="timer"` with `aria-label` describing full countdown (e.g., "5 days, 12 hours, 30 minutes remaining"). Verify screen reader announces updates. | `src/components/countdown/countdown-timer.tsx`
- [x] T020 [P] Verify color contrast: white `#FFFFFF` text on dark gradient background meets 4.5:1 ratio. Gold border `#FFEA9E` on dark background is decorative (no contrast requirement). | all components

### Performance

- [x] T021 [P] Verify background image uses `next/image` with `priority`, `fill`, `sizes="100vw"`, WebP format. No FOIT for fonts (Montserrat via `next/font/google`, Digital Numbers via `next/font/local` with `display: swap`). | `src/app/countdown/page.tsx`, `src/app/layout.tsx`
- [x] T022 [P] Verify minimal Client Component bundle — only `countdown-timer.tsx` has `'use client'`. CountdownUnit is presentational and rendered within client boundary. Page shell remains Server Component. `setInterval` at 60s is low CPU overhead. | all components

### Edge Cases

- [x] T023 [P] Handle event date not configured: display 00:00:00 as fallback, no redirect. Log warning to console. | `src/app/countdown/page.tsx`
- [x] T024 [P] Handle timer reaching exactly 0: ensure redirect fires and interval is cleared. Prevent negative values from displaying. | `src/components/countdown/countdown-timer.tsx`
- [x] T025 [P] Handle JavaScript disabled: server-rendered initial countdown values are visible as a static snapshot (graceful degradation). | `src/app/countdown/page.tsx`
- [x] T026 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3) ──→ Phase 6 (Polish)
                                                    │
                                                    └─ STOP & VALIDATE (can deploy after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (font + assets must exist) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 (needs translations + middleware + env var) — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (redirect logic builds on existing page and timer)
- **US3 (Phase 5)**: Depends on Phase 3 (responsive applies to existing components)
- **Polish (Phase 6)**: Depends on Phase 5

### Within Each Phase

- Loading/error shell [P] can be created in parallel with components
- CountdownUnit (T011) can be created in parallel with page shell (T009, T010)
- CountdownTimer (T012) depends on CountdownUnit (T011) existing
- Page assembly (T013) depends on CountdownTimer (T012) being ready

### Parallel Opportunities

**Phase 1**: T004 and T005 can run in parallel (layout.tsx vs globals.css)
**Phase 2**: T006, T007, and T008 — T007 and T008 can run in parallel; T006 is independent
**Phase 3**: T009, T010, T011 can ALL run in parallel (3 independent files). T012 depends on T011. T013 depends on T012.
**Phase 4**: T014, T015, T016 can run in parallel (verification of different files)
**Phase 5**: T017 and T018 can run in parallel
**Phase 6**: T019-T025 tasks marked [P] can all run in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Routing + i18n)
2. Complete Phase 3 (User Story 1 — View Countdown Timer)
3. **STOP and VALIDATE**: Verify countdown renders, updates every minute, and auto-redirects
4. Deploy if ready — users see countdown to event

### Incremental Delivery

1. Setup + Foundation → Font configured, middleware updated, translations ready
2. Add User Story 1 → Test → Deploy (MVP — countdown timer works)
3. Add User Story 2 → Test → Deploy (routing edge cases)
4. Add User Story 3 → Test → Deploy (responsive)
5. Polish → Test → Deploy (final)

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — all dependencies already installed
- No header or footer on this page (TR-007) — full-screen immersive layout
- Timer granularity is minutes, not seconds (FR-002) — `setInterval` at 60s
- Digital Numbers font: if font file unavailable, fallback to monospace (`font-mono`)
- The design is at 1512px width (not 1440px like other pages) — use full-width layout since this is immersive
- Glass morphism: gradient background at 0.5 opacity on digit boxes, digit text stays at full opacity — use inner absolute `<div>` not `opacity` on the box itself
- Server-rendered initial values prevent blank flash — client recalculates on mount
- `EVENT_START_DATE` env var is build-time inlined by Next.js — for runtime config, migrate to Supabase config table later
- Mark tasks complete as you go: `[x]`
