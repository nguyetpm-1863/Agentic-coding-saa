# Tasks: Login

**Frame**: `662:14387-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation & Global Config)

**Purpose**: Download assets from Figma and configure global foundations (fonts, design tokens)

- [x] T001 Download media assets from Figma using `get_media_files` tool: SAA logo, ROOT FURTHER logo, Google icon, VN flag, chevron-down → `public/images/login/`
- [x] T002 Export and optimize key visual background image as WebP → `public/images/login/keyvisual-bg.png`
- [x] T003 Verify all assets exist and follow kebab-case naming | `public/images/login/`
- [x] T004 [P] Update root layout: replace Geist fonts with Montserrat (700) + Montserrat Alternates (700) via `next/font/google`, set CSS variables `--font-montserrat` and `--font-montserrat-alternates`, update metadata title to "Sun Annual Awards 2025" | `src/app/layout.tsx`
- [x] T005 [P] Add login design tokens (colors, spacing, typography) as CSS custom properties from design-style.md, map Montserrat fonts to Tailwind via `--font-sans` | `src/app/globals.css`

---

## Phase 2: Foundation (Auth Infrastructure)

**Purpose**: Auth middleware and OAuth callback — BLOCKS all user story work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create auth middleware: use `@/libs/supabase/middleware.ts` client, refresh session on every request, redirect unauthenticated users from protected routes to `/login?next={originalPath}`, redirect authenticated users from `/login` to `/`, configure `matcher` to exclude static files, define public routes (`/login`, `/auth/callback`) | `src/middleware.ts`
- [x] T007 [P] Create OAuth callback route handler: extract `code` and `next` params, validate `next` is relative path starting with `/` (open redirect protection), exchange code for session via `supabase.auth.exchangeCodeForSession(code)`, redirect 302 to validated `next` or `/` on success, redirect 302 to `/login?error=auth_callback_failed` on failure, handle missing `code` param | `src/app/auth/callback/route.ts`

**Checkpoint**: Auth infrastructure ready — login UI implementation can begin

---

## Phase 3: User Story 1 — Google Login (Priority: P1) 🎯 MVP

**Goal**: User can click "LOGIN With Google", complete OAuth flow, and be redirected to the authenticated home page. Error states handled gracefully.

**Independent Test**: Navigate to `/login`, click the login button, complete Google OAuth, verify redirect to home page. Also verify: authenticated users are redirected away, error params display messages, loading state shows spinner.

### Page Shell (US1)

- [x] T008 [P] [US1] Create login page loading skeleton: full-screen #00101A background with centered pulsing indicator | `src/app/login/loading.tsx`
- [x] T009 [P] [US1] Create login page error boundary: #00101A background, centered "Something went wrong" message with "Try again" retry button styled as #FFEA9E, receives `reset` function | `src/app/login/error.tsx`

### Components (US1)

- [x] T010 [P] [US1] Create Header component (Server Component): fixed position, `bg-[#0B0F12]/80`, logo on left via `next/image` (52×56px), language selector slot on right, `justify-between`, responsive padding (16px mobile → 48px tablet → 80px desktop → 144px wide) | `src/components/shared/header.tsx`
- [x] T011 [P] [US1] Create Footer component (Server Component): copyright text centered ("Bản quyền thuộc về Sun* © 2025"), Montserrat Alternates 16px/700, border-top `1px solid #2E3940`, responsive padding (16px mobile → 48px tablet → 80px desktop → 90px wide) | `src/components/shared/footer.tsx`
- [x] T012 [P] [US1] Create LoginButton component (Client Component): `'use client'`, call `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '${origin}/auth/callback?next=${next}' } })` on click, manage `isLoading` state (disabled + spinner, prevent double-click), use `useSearchParams()` to read `?error=` param, map error codes to messages (`auth_callback_failed` → "Login failed. Please try again.", `access_denied` → "Access was denied. Please try again."), display error in `aria-live="polite"` region below button, auto-dismiss error after 5s via `useEffect`+`setTimeout`, style per design-style.md (#FFEA9E bg, 8px radius, Montserrat 22px/700, #00101A text), focus state `outline: 2px solid #FFFFFF`, Google icon 24×24px right of text | `src/components/login/login-button.tsx`

### Page Assembly (US1)

- [x] T013 [US1] Create login page (Server Component): check auth via `supabase.auth.getUser()` → redirect to `/` if authenticated, render full-screen layout with `next/image` background (priority, WebP), left gradient overlay (`bg-gradient-to-r from-[#00101A] via-25% to-transparent`), bottom gradient overlay (`bg-gradient-to-t from-[#00101A] from-22% to-transparent to-52%`), Header, ROOT FURTHER logo (451×200px via `next/image`, `alt=""`), description text (Montserrat 20px/700, #FFF), LoginButton, Footer | `src/app/login/page.tsx`

**Checkpoint**: User Story 1 complete — Google login flow works end-to-end

---

## Phase 4: User Story 2 — Language Selection (Priority: P2)

**Goal**: User can switch between Vietnamese and English using a language selector dropdown. Preference persists across sessions via cookie.

**Independent Test**: Click the language selector, choose a different language, verify all text updates. Refresh page, verify language preference persisted.

### i18n Infrastructure (US2)

- [x] T014 [P] [US2] Create translations module: define type-safe translation object for VN and EN, keys: `login.description`, `login.button`, `footer.copyright`, export `getTranslations(locale: string)` function | `src/libs/i18n/translations.ts`

### Components (US2)

- [x] T015 [US2] Create LanguageSelector component (Client Component): `'use client'`, display current language with flag icon + chevron, toggle dropdown on click, close on outside click or `Escape`, keyboard nav (`Enter`/`Space` to open, arrow keys to navigate, `Enter` to select), ARIA: `role="listbox"`, `aria-expanded`, `aria-label="Select language"`, options use `role="option"` with `aria-selected`, persist selection in cookie (`locale`) via `document.cookie`, style per design-style.md (108×56px, 4px radius), states: hover `rgba(255,255,255,0.08)`, focus `outline: 2px solid #FFEA9E`, active/open `rgba(255,255,255,0.12)` + chevron rotated 180deg | `src/components/shared/language-selector.tsx`

### Integration (US2)

- [x] T016 [US2] Update Header to render LanguageSelector in the right slot, pass current locale | `src/components/shared/header.tsx`
- [x] T017 [US2] Update login page: read `locale` cookie server-side, call `getTranslations(locale)`, pass translated strings to description text, LoginButton label, and Footer copyright | `src/app/login/page.tsx`
- [x] T018 [US2] Update Footer to accept `copyright` prop for translated text | `src/components/shared/footer.tsx`

**Checkpoint**: User Stories 1 & 2 complete — login works with language switching

---

## Phase 5: User Story 3 — Responsive Design (Priority: P3)

**Goal**: Login page displays correctly at all 4 breakpoints (320px, 768px, 1024px, 1440px) with proper touch targets.

**Independent Test**: Load login page at 320px, 768px, 1024px, 1440px widths. Verify all elements are accessible, properly sized, and no overflow/overlap.

- [x] T019 [US3] Apply mobile-first responsive styles to login page: mobile defaults (16px padding, full-width button ≥52px height, ROOT FURTHER logo max-width 280px, description 16px/28px), `md:` tablet (48px padding, auto-width button min-width 280px, logo 360px, description 18px), `lg:` desktop (80px padding, logo 420px, description 20px/480px, button 305px), `xl:` wide (144px padding, max-width 1440px centered, match Figma exactly) | `src/app/login/page.tsx`
- [x] T020 [P] [US3] Verify all responsive padding is applied to Header and Footer per design-style.md breakpoints | `src/components/shared/header.tsx`, `src/components/shared/footer.tsx`
- [x] T021 [US3] Verify touch targets: login button ≥ 44×44px, language selector ≥ 44×44px on mobile (80×44px minimum) | all interactive components

**Checkpoint**: All user stories complete — fully responsive login page

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility audit, performance optimization, animations, edge cases

### Accessibility

- [x] T022 [P] Verify focus indicators on all interactive elements: LoginButton (`outline: 2px solid #FFFFFF`), LanguageSelector (`outline: 2px solid #FFEA9E`) | all interactive components
- [x] T023 [P] Verify tab order: Language Selector → Login Button (logo is decorative, skip it with `tabIndex={-1}` or no focusable element) | `src/app/login/page.tsx`
- [x] T024 [P] Verify decorative images have `alt=""`: keyvisual background, ROOT FURTHER logo | `src/app/login/page.tsx`

### Performance

- [x] T025 [P] Verify key visual background uses `next/image` with `priority` prop, WebP format, responsive `sizes` attribute for different viewports | `src/app/login/page.tsx`
- [x] T026 [P] Verify fonts load via `next/font` with `display: swap` — no FOIT | `src/app/layout.tsx`

### Animations

- [x] T027 Add 300ms fade-in animation on login page mount (CSS `@keyframes fadeIn` or Tailwind `animate-*`) | `src/app/login/page.tsx`, `src/app/globals.css`
- [x] T028 [P] Add button hover/active transitions: 150ms `ease-in-out` for background-color/box-shadow, 100ms `ease-out` for transform on active press | `src/components/login/login-button.tsx`
- [x] T029 [P] Add language dropdown open/close transition: 150ms opacity + transform | `src/components/shared/language-selector.tsx`

### Edge Cases

- [x] T030 Verify `/auth/callback` without `code` param redirects to `/login?error=auth_callback_failed` | `src/app/auth/callback/route.ts`
- [x] T031 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3) ──→ Phase 6 (Polish)
                                                    │                     │
                                                    └─ STOP & VALIDATE ──┘ (can deploy after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (assets + fonts must exist) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (Header/Footer must exist to integrate i18n)
- **US3 (Phase 5)**: Depends on Phase 4 (responsive applies to final component state)
- **Polish (Phase 6)**: Depends on Phase 5

### Within Each User Story

- Loading/error shell [P] can be created in parallel with components
- Components marked [P] can be created in parallel (different files)
- Page assembly depends on all components being ready
- Integration tasks depend on components they connect

### Parallel Opportunities

**Phase 1**: T004 and T005 can run in parallel (layout.tsx vs globals.css)
**Phase 2**: T006 and T007 can run in parallel (middleware vs callback route)
**Phase 3**: T008, T009, T010, T011, T012 can ALL run in parallel (5 independent files). T013 depends on all of them.
**Phase 4**: T014 can start immediately. T015 depends on T014 (needs translation types). T016-T018 depend on T015.
**Phase 6**: T022-T026, T028-T029 can run in parallel (independent verification/enhancement tasks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Auth Infrastructure)
2. Complete Phase 3 (User Story 1 — Google Login)
3. **STOP and VALIDATE**: Test login flow end-to-end
4. Deploy if ready — users can log in

### Incremental Delivery

1. Setup + Foundation → Auth works
2. Add User Story 1 → Test → Deploy (MVP)
3. Add User Story 2 → Test → Deploy (i18n)
4. Add User Story 3 → Test → Deploy (responsive polish)
5. Polish → Test → Deploy (final)

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — all dependencies already installed
- The `LanguageSelector` dropdown is a simple toggle; the detailed dropdown design (frame 721:4942) is out of scope
- ROOT FURTHER logo `alt=""` — it's decorative branding, not informational
- Google icon position: right of text (per Figma design, not standard Google placement)
- Mark tasks complete as you go: `[x]`
