# Tasks: Homepage SAA 2025

**Frame**: `2167:9026-Homepage SAA`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets, Fonts & Config)

**Purpose**: Download assets from Figma, source custom fonts, and register them in the project

- [x] T001 Download award card images from Figma using `get_media_files` tool (6 images: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP) → `public/images/homepage/`
- [x] T002 Verify hero key visual background image — reuse `public/images/homepage/keyvisual-bg.png` if identical to login, otherwise export homepage version → `public/images/homepage/keyvisual-bg.png`
- [x] T003 Verify ROOT FURTHER logo asset — reuse from login if identical, otherwise export → `public/images/homepage/root-further-logo.png`
- [ ] T004 Source Digital Numbers font file and place at `public/fonts/digital-numbers.woff2`
- [ ] T005 Source SVN-Gotham font file and place at `public/fonts/svn-gotham.woff2`
- [ ] T006 Verify all assets exist and follow kebab-case naming | `public/images/homepage/`, `public/fonts/`
- [x] T007 [P] Register custom fonts (Digital Numbers, SVN-Gotham) in root layout via `next/font/local` with CSS variables `--font-digital-numbers` and `--font-svn-gotham`, add Montserrat weight `"500"` to existing font config, apply font variables to `<body>` className | `src/app/layout.tsx`
- [x] T008 [P] Add CSS custom properties for homepage design tokens from design-style.md (countdown gradient, gold glow text-shadow, glass morphism backdrop-blur) and add `scroll-behavior: smooth` to `html` | `src/app/globals.css`

---

## Phase 2: Foundation (DB Migration, i18n, Event Config)

**Purpose**: Data layer and shared infrastructure required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create Supabase migration for `award_categories` table: columns `id` (uuid PK default gen_random_uuid()), `name_vi` (text not null), `name_en` (text not null), `description_vi` (text), `description_en` (text), `image_url` (text), `display_order` (integer), `created_at` (timestamptz default now()); enable RLS; add SELECT policy for authenticated users; seed 6 awards (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP) with `display_order` 1-6 and `image_url` pointing to `/images/homepage/award-*.webp` | `supabase/migrations/YYYYMMDDHHMMSS_create_award_categories.sql`
- [x] T010 [P] Add event configuration environment variables to `.env.example`: `EVENT_DATE=2025-12-15T18:30:00+07:00`, `EVENT_VENUE=...`, `EVENT_TIME_DISPLAY=18h30`; copy to `.env.development` if not present | `.env.example`
- [x] T011 [P] Extend i18n translations with all homepage keys: `homepage.coming_soon`, `homepage.event_time`, `homepage.cta_awards`, `homepage.cta_kudos`, `nav.about_saa`, `nav.award_info`, `nav.kudos`, `awards.caption`, `awards.title`, `kudos.detail_button`, `countdown.days`, `countdown.hours`, `countdown.minutes`; update `TranslationKeys` type to include new keys | `src/libs/i18n/translations.ts`

**Checkpoint**: Foundation ready — database seeded, i18n keys defined, event config available. User story implementation can begin.

---

## Phase 3: User Story 1 — Hero & Countdown (Priority: P1) MVP

**Goal**: Authenticated user sees the hero section with "ROOT FURTHER" branding, live countdown timer, event info, and CTA buttons. This is the above-the-fold MVP experience.

**Independent Test**: Navigate to `/` after login, verify hero section renders with "ROOT FURTHER" branding, countdown timer displays days/hours/minutes and updates in real-time, event info (time + venue) is visible, and CTA buttons scroll to their target sections.

### Components (US1)

- [x] T012 [P] [US1] Create DigitBox presentational component: renders a single digit in a glass morphism box (51x82px, `rounded-lg`, `border-[0.5px] border-[#FFEA9E]`, `backdrop-blur-[16.64px]`, gradient background at opacity 0.5), font Digital Numbers 49px via `var(--font-digital-numbers)`, white text, flex centered | `src/components/homepage/digit-box.tsx`
- [x] T013 [P] [US1] Create CountdownTimer client component (`'use client'`): props `targetDate: string` (ISO 8601); compute `{ days, hours, minutes }` from `targetDate - Date.now()`; `useEffect` with `setInterval` at 60s; handle past date showing `00:00:00`; render 3 digit-pair groups (DAYS/HOURS/MINUTES) each with 2 DigitBox components and a label below (Montserrat 24px/700, #FFEA9E); `aria-live="polite"` region; responsive layout (horizontal desktop, stacked/smaller mobile); digit-pair gap 14px, group gap 40px | `src/components/homepage/countdown-timer.tsx`
- [x] T014 [P] [US1] Create HeroSection server component: relative container with `next/image` background (`priority`, `fill`, `object-cover`), gradient overlay div (`linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)`), content stack with ROOT FURTHER logo, "Coming soon" subtitle (Montserrat 20px/700, #FFF), CountdownTimer (client), event info (time + venue from props), CTA buttons as anchor links (`href="#awards"` and `href="#kudos"`) styled per design-style.md B.5/B.6 (outline, 8px radius, `bg-[#FFEA9E]/10`, `border border-[#998C5F]`), responsive padding (16px → 48px → 80px → 144px) | `src/components/homepage/hero-section.tsx`
- [x] T015 [P] [US1] Create HomeHeader server component: wraps the shared `<Header>` with background override to `rgba(16, 20, 23, 0.80)`, renders placeholder slots for NavTabs (center) and NotificationBell + LanguageSelector + UserAvatar (right); add optional `className` prop to shared Header if needed for background override | `src/components/homepage/home-header.tsx`, `src/components/shared/header.tsx`
- [x] T016 [P] [US1] Create loading skeleton: full-screen dark background (#00101A) with centered pulsing placeholder, minimal to avoid layout shift | `src/app/(home)/loading.tsx`
- [x] T017 [P] [US1] Create error boundary: dark background (#00101A), centered "Something went wrong" message with "Try again" button (#FFEA9E, 8px radius), receives `reset` function, same pattern as login error.tsx | `src/app/(home)/error.tsx`

### Page Assembly (US1)

- [x] T018 [US1] Delete existing `src/app/page.tsx` (IMPORTANT: must be removed to avoid route conflict with `(home)` route group which also maps to `/`) and create homepage server component: verify auth via `supabase.auth.getUser()`, fetch awards from Supabase `award_categories` table ordered by `display_order`, read event config from env vars (`EVENT_DATE`, `EVENT_VENUE`, `EVENT_TIME_DISPLAY`), read locale from cookie, compose full page: HomeHeader → HeroSection (with `id="about"`) → placeholder sections for Content/Awards/Kudos → Footer; set `scroll-behavior: smooth` | `src/app/page.tsx` (delete), `src/app/(home)/page.tsx` (create)

### Footer Extension (US1)

- [x] T019 [US1] Extend Footer with optional `navLinks` prop: `Array<{ label: string; href: string }>` for nav links row above copyright; render nav links (About SAA, Award Info, Kudos) with hover gold text (#FFEA9E), transition 150ms; login page continues to pass no navLinks — backward-compatible | `src/components/shared/footer.tsx`

**Checkpoint**: User Story 1 complete — hero section with live countdown renders on `/`, CTA buttons present, loading/error states work.

---

## Phase 4: User Story 2 — Awards Grid (Priority: P2)

**Goal**: Display 6 award categories in a responsive grid below the hero section with images, titles, and descriptions.

**Independent Test**: Scroll to the Awards section, verify 6 award cards displayed in a 3-column grid (desktop), each with gold-bordered image, title, and description.

- [x] T020 [P] [US2] Create AwardCard presentational component: props `name: string`, `description: string`, `imageUrl: string`; `next/image` with square aspect ratio, `rounded-3xl`, `border border-[#FFEA9E]`, gold glow box-shadow (`0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`); title Montserrat 24px/400 #FFEA9E; description Montserrat 16px/400 #FFFFFF; 9.5px gap between image and text | `src/components/homepage/award-card.tsx`
- [x] T021 [US2] Create AwardsSection server component: section with `id="awards"`, header with caption "Sun* annual awards 2025" (Montserrat 24px/700, #FFEA9E) and title from i18n `awards.title` (Montserrat 57px/700, #FFEA9E, line-height 64px), 48px gap to grid, grid layout `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-x-6 gap-y-16 lg:gap-y-20`, receives awards data as props, renders AwardCard for each; responsive padding (16px → 48px → 80px → 144px) | `src/components/homepage/awards-section.tsx`
- [x] T022 [US2] Integrate AwardsSection into homepage page component: pass fetched awards data (selecting `name_vi`/`name_en` and `description_vi`/`description_en` based on locale) as props to AwardsSection | `src/app/(home)/page.tsx`

**Checkpoint**: User Stories 1 & 2 complete — hero + awards grid render correctly.

---

## Phase 5: User Story 3 — Header Navigation (Priority: P3)

**Goal**: Fixed header with section-tracking navigation tabs, notification bell, and user avatar. Clicking a tab smooth-scrolls to the corresponding section.

**Independent Test**: Click each nav tab and verify smooth scroll to the corresponding section. Scroll manually and verify active tab state updates to match the visible section.

- [x] T023 [P] [US3] Create NavTabs client component (`'use client'`): props `sections: Array<{ id: string; label: string }>`; use `IntersectionObserver` with `threshold: [0, 0.25, 0.5, 0.75, 1.0]` to track `activeSection` state; render tab buttons with states — normal: white text, hover: gold text (#FFEA9E) + text-shadow glow, active: gold text + `border-bottom: 1px solid #FFEA9E` + text-shadow glow; `onClick` calls `document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })`; ARIA: `role="tablist"`, `role="tab"`, `aria-selected`; keyboard: `ArrowLeft`/`ArrowRight` between tabs, `Enter` to activate; Montserrat 14px/700, gap 60px, height 56px, transition 150ms | `src/components/homepage/nav-tabs.tsx`
- [x] T024 [P] [US3] Create NotificationBell client component (`'use client'`): fetch unread count from Supabase on mount (client-side via `@/libs/supabase/client.ts`); bell icon 24x24px white; conditional red dot (8px, `bg-red-600`, positioned `absolute -top-0.5 -right-0.5`); graceful failure: if fetch fails, hide red dot silently; focus state `outline: 2px solid #FFEA9E, outline-offset: 2px`; hover opacity 0.8, transition 150ms | `src/components/homepage/notification-bell.tsx`
- [x] T025 [P] [US3] Create UserAvatar component: props `avatarUrl: string`, `userName: string`; circular image 40x40px via `next/image` with `rounded-full overflow-hidden`; hover: `ring-2 ring-white/30`, transition 150ms; focus: `outline: 2px solid #FFEA9E, outline-offset: 2px`; alt text from `userName` | `src/components/homepage/user-avatar.tsx`
- [x] T026 [US3] Update HomeHeader to integrate NavTabs (center slot with sections: About SAA 2025, Award Information, Sun* Kudos mapped to `id="about"`, `id="awards"`, `id="kudos"`), NotificationBell, LanguageSelector (reuse existing), and UserAvatar (right slot); pass user session data (avatar URL, name) from page props | `src/components/homepage/home-header.tsx`
- [x] T027 [US3] Update homepage page component to pass user session data (avatar URL, display name) and locale-aware nav labels to HomeHeader | `src/app/(home)/page.tsx`

**Checkpoint**: User Stories 1-3 complete — full header navigation with section tracking works.

---

## Phase 6: User Story 4 — Kudos & Content Sections (Priority: P4)

**Goal**: Display the "Root Further" description and Sun* Kudos promotional section with navigation to the detail page.

**Independent Test**: Scroll to the Kudos section, verify "KUDOS" branding text (SVN-Gotham font), description paragraph, and "Chi tiet" button are displayed. Click "Chi tiet" and verify navigation to `/kudos`.

- [x] T028 [P] [US4] Create ContentSection server component: `id="about"` section (or part of hero), "Root Further" philosophy paragraph, Montserrat 16px/700 #FFFFFF, `letter-spacing: 0.15px`, responsive padding (16px → 48px → 80px → 144px), max-width matching content area | `src/components/homepage/content-section.tsx`
- [x] T029 [P] [US4] Create KudosSection server component: section with `id="kudos"`, "KUDOS" decorative text (SVN-Gotham 96px/400 via `var(--font-svn-gotham)`, #DBD1C1, `letter-spacing: -0.13em`), description paragraph (Montserrat 16px/700, #FFFFFF), "Chi tiet" button as `<Link href="/kudos">` styled same as CTA buttons (outline, 8px radius, `bg-[#FFEA9E]/10`, `border border-[#998C5F]`), responsive padding (16px → 48px → 80px → 144px), 24px gap between elements | `src/components/homepage/kudos-section.tsx`
- [x] T030 [US4] Integrate ContentSection and KudosSection into homepage page component: insert ContentSection after HeroSection and KudosSection after AwardsSection, pass i18n-translated text as props | `src/app/(home)/page.tsx`

**Checkpoint**: User Stories 1-4 complete — all content sections render with correct styling.

---

## Phase 7: User Story 5 — Responsive & Polish (Priority: P5)

**Goal**: All breakpoints work correctly (320px, 768px, 1024px, 1440px), accessibility audit passes, performance optimized.

**Independent Test**: Load homepage at 320px, 768px, 1024px, 1440px widths. Verify all sections are accessible, properly laid out, touch targets meet 44px minimum, and no overflow/overlap at any breakpoint.

### Responsive (US5)

- [x] T031 [US5] Apply mobile-first responsive styles across all homepage components per design-style.md: mobile (< 768px) — header nav tabs hidden, awards 1-col, countdown stacked/smaller (digit boxes ~48x64px), CTAs full-width stacked, padding 16px; tablet (768-1023px) — nav tabs with 32px gap, awards 2-col, padding 48px; desktop (1024-1279px) — full nav, awards 3-col, padding 80px; wide (>= 1280px) — match Figma at 1512px, `max-w-[1512px] mx-auto`, padding 144px | all homepage components
- [x] T032 [P] [US5] Verify all interactive touch targets are at least 44x44px on mobile: nav tabs 56px height, CTA buttons 48px+ height, notification bell with adequate padding, user avatar with adequate padding, language selector, footer nav links | all interactive components

### Accessibility (US5)

- [x] T033 [P] [US5] Verify countdown timer has `aria-live="polite"` that announces "X days, Y hours, Z minutes remaining" for screen readers | `src/components/homepage/countdown-timer.tsx`
- [x] T034 [P] [US5] Verify nav tabs keyboard navigation: `Tab` to focus tab group, `ArrowLeft`/`ArrowRight` between tabs, `Enter` to activate; `role="tablist"` and `role="tab"` with `aria-selected` | `src/components/homepage/nav-tabs.tsx`
- [x] T035 [P] [US5] Verify all images have appropriate alt text: decorative images (hero background, ROOT FURTHER logo) use `alt=""`, award card images have descriptive alt text | all image components
- [x] T036 [P] [US5] Verify focus indicators on all interactive elements: `outline: 2px solid #FFEA9E, outline-offset: 2px` for buttons, nav tabs, bell, avatar | all interactive components

**Checkpoint**: All user stories complete — fully responsive, accessible homepage.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, widget button placeholder, final cleanup

### Performance

- [x] T037 [P] Verify hero background uses `next/image` with `priority` prop, WebP format, responsive `sizes` attribute | `src/components/homepage/hero-section.tsx`
- [x] T038 [P] Verify award card images are lazy-loaded (below fold), WebP format, responsive `sizes` attribute | `src/components/homepage/award-card.tsx`
- [ ] T039 [P] Verify custom fonts load via `next/font` with `display: swap` — no FOIT | `src/app/layout.tsx`

### Widget Button

- [x] T040 Create WidgetButton client component (`'use client'`): fixed position bottom-right (`fixed bottom-6 right-6 z-50`), circular floating action button, visual placeholder only — click handler is out of scope, gold glow box-shadow, 200ms hover transition | `src/components/homepage/widget-button.tsx`
- [x] T041 Add WidgetButton to homepage page component | `src/app/(home)/page.tsx`

### Final Cleanup

- [x] T042 Run `yarn lint` and fix any ESLint errors across all new/modified files
- [x] T043 Verify glass morphism `backdrop-filter` has progressive enhancement fallback (semi-transparent background without blur for unsupported browsers) | `src/components/homepage/digit-box.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3) ──→ Phase 6 (US4) ──→ Phase 7 (US5) ──→ Phase 8 (Polish)
                                                     │
                                                     └─ STOP & VALIDATE (can deploy after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (assets + fonts must exist) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (page structure must exist to integrate awards grid)
- **US3 (Phase 5)**: Depends on Phase 3 (HomeHeader must exist to integrate NavTabs/Bell/Avatar)
- **US4 (Phase 6)**: Depends on Phase 3 (page structure must exist to add content/kudos sections)
- **US5 (Phase 7)**: Depends on Phases 4-6 (responsive applies to final component state)
- **Polish (Phase 8)**: Depends on Phase 7

### Within Each User Story

- Loading/error shell [P] can be created in parallel with components
- Components marked [P] can be created in parallel (different files)
- Page assembly depends on all components being ready
- Integration tasks depend on components they connect

### Parallel Opportunities

**Phase 1**: T007 and T008 can run in parallel (layout.tsx vs globals.css)
**Phase 2**: T009, T010, and T011 can ALL run in parallel (migration vs env config vs i18n)
**Phase 3**: T012, T013, T014, T015, T016, T017 can ALL run in parallel (6 independent files). T018 depends on all of them. T019 is independent of T018.
**Phase 4**: T020 can start immediately (independent component). T021 depends on T020. T022 depends on T021.
**Phase 5**: T023, T024, T025 can ALL run in parallel (3 independent files). T026 depends on T023-T025. T027 depends on T026.
**Phase 6**: T028 and T029 can run in parallel. T030 depends on both.
**Phase 7**: T032-T036 can run in parallel (independent verification tasks). T031 is the main responsive task.
**Phase 8**: T037-T039 can run in parallel. T040-T041 are sequential. T042-T043 are independent.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (User Story 1 — Hero & Countdown)
3. **STOP and VALIDATE**: Test hero section, countdown timer, CTA buttons end-to-end
4. Deploy if ready — users see the homepage with branding and countdown

### Incremental Delivery

1. Setup + Foundation → DB seeded, fonts loaded, i18n ready
2. Add User Story 1 → Test → Deploy (MVP hero + countdown)
3. Add User Story 2 → Test → Deploy (awards grid)
4. Add User Story 3 → Test → Deploy (header navigation)
5. Add User Story 4 → Test → Deploy (kudos + content sections)
6. Add User Story 5 → Test → Deploy (responsive polish)
7. Polish → Test → Deploy (performance, widget, cleanup)

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — custom fonts use `next/font/local` (built-in), IntersectionObserver and setInterval are Web APIs
- The existing `src/app/page.tsx` MUST be deleted before creating `src/app/(home)/page.tsx` to avoid route conflict — both map to `/`
- Header extension uses a wrapper pattern (`HomeHeader`) to avoid breaking the login page
- Award data uses `_vi`/`_en` column suffixes — Server Component selects based on locale cookie
- Countdown timer uses 60-second interval (not 1-second) per TR-002 to minimize re-renders
- Glass morphism `backdrop-filter` may need progressive enhancement fallback
- Both CTA buttons share identical outline styling — they are NOT primary/secondary variants
- Mark tasks complete as you go: `[x]`
