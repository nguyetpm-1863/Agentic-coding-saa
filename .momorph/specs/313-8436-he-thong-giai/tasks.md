# Tasks: Awards System (He thong giai)

**Frame**: `313:8436-He thong giai`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation & Global Config)

**Purpose**: Download assets from Figma and configure fonts/design tokens needed by all phases

- [x] T001 Download award card images from Figma using `get_media_files` tool: top-talent.png, top-project.png, top-project-leader.png, best-manager.png, signature-2025.png, mvp.png (336x336px each) | `public/images/awards/`
- [x] T002 Download icon assets from Figma: icon-target.svg, icon-diamond.svg, icon-license.svg, icon-arrow-right.svg | `public/images/awards/`
- [x] T003 Download kudos-bg.webp background image from Figma | `public/images/awards/kudos-bg.webp`
- [x] T004 Export and optimize key visual background (awards-specific image, NOT reused from login) | `public/images/awards/keyvisual-award-bg.png`
- [x] T005 Verify all assets exist and follow kebab-case naming | `public/images/awards/`
- [x] T006 [P] Obtain SVN-Gotham font file (.woff2) for "KUDOS" decorative text, configure via `next/font/local` with CSS variable `--font-svn-gotham`, add fallback to sans-serif | `src/app/layout.tsx`
- [x] T007 [P] Add awards design tokens (colors, spacing, typography) as CSS custom properties from design-style.md: `--color-accent-gold`, `--color-divider`, `--shadow-text-gold`, `--shadow-box-gold` | `src/app/globals.css`

---

## Phase 2: Foundation (Database + i18n)

**Purpose**: Set up the data layer and translation keys — BLOCKS all user story work

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Create database migration: `awards` table with columns `id` (uuid PK), `slug` (text unique), `name` (text), `name_en` (text), `description` (text), `description_en` (text), `image_url` (text), `quantity` (integer), `unit_type` (text — 'individual'/'team'/'unit'), `prize_value` (bigint), `prize_value_secondary` (bigint nullable), `sort_order` (integer), `created_at` (timestamptz default now()). Enable RLS. Add SELECT policy for authenticated users. | `supabase/migrations/YYYYMMDDHHMMSS_create_awards_table.sql`
- [x] T009 [P] Create seed data: INSERT 6 award categories — Top Talent (10, individual, 7M), Top Project (02, team, 15M), Top Project Leader (03, individual, 7M), Best Manager (01, individual, 10M), Signature 2025 Creator (01, individual 5M + team 8M via prize_value_secondary), MVP (01, individual, 15M). Include VN and EN names/descriptions. | `supabase/seeds/common/awards.sql`
- [x] T010 [P] Update translations: add all `awards.*` keys (caption, system_title, quantity_label, value_label, per_award, per_individual, per_team, unit_individual, unit_team, unit_unit, top_talent, top_project, top_project_leader, best_manager, signature_2025, mvp) and `kudos.*` keys (subtitle, title, detail_button) and `nav.*` keys (about_saa, award_info, kudos, common_criteria) for both VN and EN | `src/libs/i18n/translations.ts`
- [x] T011 Run `make up` to apply migration and verify seed data loads correctly via Supabase Studio

**Checkpoint**: Database populated with 6 awards, translations ready — UI implementation can begin

---

## Phase 3: User Story 1 — View Award Details (Priority: P1) MVP

**Goal**: Display 6 award detail cards with images, titles, descriptions, quantities, and prize values. Hero key visual and section title visible. Authenticated-only access.

**Independent Test**: Navigate to `/awards` while authenticated. Verify the hero key visual, section title "He thong giai thuong SAA 2025" in gold, and 6 award cards render with correct data (images, descriptions, quantities, values). Verify Signature 2025 Creator shows dual prize values.

### Page Shell (US1)

- [x] T012 [P] [US1] Create awards page loading skeleton: full-screen `#00101A` background with 6 skeleton card placeholders using `animate-pulse`, static sidebar placeholders | `src/app/awards/loading.tsx`
- [x] T013 [P] [US1] Create awards page error boundary: `#00101A` background, centered "Something went wrong" message with "Try again" button (`bg-[#FFEA9E]`, `rounded-lg`, `text-[#00101A]`), receives `reset` function | `src/app/awards/error.tsx`

### Components (US1)

- [x] T014 [P] [US1] Create KeyVisual composite banner component (Server Component): 4 layers — (1) `next/image` with `priority` for awards-specific background (`keyvisual-award-bg.png`, `object-cover`, `alt=""`), (2) gradient overlay (`linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0.00) 52.79%)`, 627px, `absolute z-[1]`), (3) ROOT FURTHER text overlays (left-aligned, `root-text.png` + `further-text.png` from `/images/homepage/`), (4) section title at bottom (caption "Sun* Annual Awards 2025" + divider + title in `#FFEA9E`). Accept `caption` and `title` as props for i18n. | `src/components/awards/key-visual.tsx`
- ~~T015~~ _(REMOVED — SectionTitle merged into KeyVisual composite banner in T014)_
- [x] T016 [P] [US1] Create AwardCard component (presentational): flex-row layout with image (336x336px, `rounded-3xl`, `border border-[#FFEA9E]`, `shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`, `mix-blend-screen`) and content area (`backdrop-blur-[32px]`, `rounded-2xl`, flex-col gap-8). Content sections: title row (target icon 24x24 + name in 24px/700 `#FFEA9E`), description (16px/700 `#FFFFFF` `text-justify`), divider, quantity (diamond icon + label in `#FFEA9E` + value in 36px/700 `#FFFFFF` + unit type in 14px/700), divider, value (license icon + label in `#FFEA9E` + amount in 36px/700 + "cho moi giai thuong" in 14px/700). Handle dual-value layout for Signature 2025 Creator (`prize_value_secondary`): show separate lines for individual and team prizes. Bottom divider `#2E3940` between cards. Accept award data object and translations as props. | `src/components/awards/award-card.tsx`
- [x] T017 [P] [US1] Reuse KudosSection from Homepage (`src/components/homepage/kudos-section.tsx`). Pass awards-page translations as props (subtitle, title, newFeatureLabel, description, detailButtonText). No awards-specific KudosSection component needed. | `src/components/homepage/kudos-section.tsx` (REUSE)

### Page Assembly (US1)

- [x] T018 [US1] Create awards page (Server Component): verify auth via `supabase.auth.getUser()` (middleware handles redirect), read locale cookie, call `getTranslations(locale)`. Award data is **static** via `getAwardsData(t)` from `src/libs/constants/awards.ts` — NO Supabase query for awards. Render full layout: `bg-[#00101A] min-h-screen` → Header → KeyVisual (composite banner with caption + title) → AwardSystem → KudosSection (reuse homepage) → Footer. | `src/app/awards/page.tsx`, `src/libs/constants/awards.ts`
- [x] T019 [US1] Update shared Header component: add `activeTab?: string` prop and `navItems?: Array<{key: string, label: string, href: string}>` prop. Render nav tabs with active state (gold color `#FFEA9E`, border-bottom, text-shadow glow `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`, bg `rgba(255,234,158,0.10)`). Default nav items: About SAA, Award Info, Kudos. Add notification bell icon (24x24, white, with red dot 8px for unread count), user avatar (24x24, `border border-[#998C5F]`, `rounded`). | `src/components/shared/header.tsx`
- [x] T020 [US1] Update shared Footer component: add `navItems?: Array<{key: string, label: string, href: string}>` prop and `activeTab?: string` prop. Render logo (69x64px), nav links (flex, gap-12, 16px/700), active link gets `bg-[rgba(255,234,158,0.10)]` + gold text-shadow glow. Footer padding `px-[90px] py-10`, `border-t border-[#2E3940]`. Awards page passes 4 nav items including "Tieu chuan chung". | `src/components/shared/footer.tsx`

**Checkpoint**: User Story 1 complete — 6 award cards render with correct data, key visual and section title visible, Kudos section displayed

---

## Phase 4: User Story 2 — Sidebar Navigation (Priority: P2)

**Goal**: Interactive sticky sidebar with 6 navigation items. Click to smooth-scroll to award card. IntersectionObserver tracks active award on manual scroll.

**Independent Test**: Click each sidebar item and verify smooth scroll to corresponding card. Manually scroll through awards and verify sidebar active state tracks the currently visible card without flickering. Verify keyboard navigation: Tab to focus, ArrowUp/ArrowDown to move between items, Enter to activate.

- [x] T021 [US2] Create AwardSystem component (Client Component): `'use client'` directive. Flex-row layout: sidebar (178px) + cards area (flex-1), gap 80px. Manages `activeAward` state (default: first award slug) and `isScrolling` flag. Sets up IntersectionObserver with `threshold: 0.5`, `rootMargin: '-80px 0px 0px 0px'`. On sidebar click: sets `isScrolling = true`, calls `element.scrollIntoView({ behavior: 'smooth' })`, resets after scroll completes (setTimeout ~800ms). While `isScrolling` is true, observer updates are suppressed. Renders AwardSidebar and AwardCard children. Award data and translations passed as serializable props from Server Component page. | `src/components/awards/award-system.tsx`
- [x] T022 [US2] Create AwardSidebar component (presentational): receives `activeAward`, `awards`, `onAwardClick` as props. `position: sticky; top: 80px`, w-[178px], flex-col, gap-4. Each item: flex, p-4, items-center, gap-1, target icon 24x24 + text (14px/700, `tracking-[0.25px]`). Active state: `text-[#FFEA9E]`, `border-b border-[#FFEA9E]`, `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`. Default: `text-white`, `rounded`, no border. Hover: gold color + glow (150ms transition). `role="navigation"`, `aria-label="Award categories"`. Keyboard: `onKeyDown` handler with `ArrowDown`/`ArrowUp` to move focus between items (prevent default to avoid page scroll, wrap at boundaries), `Enter` to activate. Focus indicator: `outline: 2px solid #FFEA9E, outline-offset: 2px`. | `src/components/awards/award-sidebar.tsx`
- [x] T023 [US2] Update awards page: replace direct card list rendering with AwardSystem component wrapper. Pass awards data and translations as props. Add `id` attributes on each card section for scroll targeting (using award slug). | `src/app/awards/page.tsx`

**Checkpoint**: User Stories 1 & 2 complete — sidebar navigation and scroll tracking work end-to-end

---

## Phase 5: User Story 3 — Kudos Section Interaction (Priority: P3)

**Goal**: "Chi tiet" button navigates to Kudos detail page. Hover/focus states match design.

**Independent Test**: Scroll to Kudos section. Hover over "Chi tiet" button and verify background changes to `#FFE07A` (150ms). Click button and verify navigation to Kudos detail page. Verify focus state `outline: 2px solid #FFEA9E, outline-offset: 2px`.

- [x] T024 [US3] KudosSection CTA button already implemented in reused Homepage component (`src/components/homepage/kudos-section.tsx`). Button uses `next/link` to Kudos detail page with hover/focus states. No additional work needed. | `src/components/homepage/kudos-section.tsx` (REUSE)

**Checkpoint**: User Story 3 complete — Kudos CTA navigates correctly with proper interaction states

---

## Phase 6: User Story 4 — Responsive Design (Priority: P4)

**Goal**: Awards page displays correctly at 320px, 768px, 1024px, 1440px with proper touch targets.

**Independent Test**: Load awards page at all 4 breakpoints. Verify sidebar behavior (hidden/horizontal on mobile, visible/sticky on desktop), card layout (stacked on mobile, side-by-side on desktop), touch targets >= 44x44px, no overflow/overlap.

- [x] T025 [US4] Apply mobile-first responsive styles to awards page and content container: mobile `px-4 py-8 gap-12`, `md:px-12 md:py-16 md:gap-20`, `lg:px-20 lg:py-16 lg:gap-[80px]`, `xl:px-36 xl:py-24 xl:gap-[120px]`, `max-w-[1440px] mx-auto` on wide | `src/app/awards/page.tsx`
- [x] T026 [P] [US4] ~~Apply responsive styles to SectionTitle~~ → Section title responsive styles are now part of KeyVisual composite banner (T014). Responsive title sizes: mobile `text-[32px] leading-[40px]`, `md:text-[44px] md:leading-[52px]`, `lg:text-[52px]`, `xl:text-[57px] xl:leading-[64px]` | `src/components/awards/key-visual.tsx`
- [x] T027 [P] [US4] Apply responsive styles to AwardSystem: mobile — sidebar hidden, cards full-width single column with horizontal scrollable tabs above cards. `md:` — sidebar as horizontal scrollable tabs, cards full width. `lg:` — two-column layout, sidebar visible sticky `lg:w-[160px]`, gap 40px. `xl:` — sidebar 178px, gap 80px, cards 853px. | `src/components/awards/award-system.tsx`
- [x] T028 [P] [US4] Apply responsive styles to AwardCard: mobile — `flex-col`, image 280px centered, content stacked below. `md:` — image 280px, reduced gaps. `lg:` — `flex-row`, image 280px, gap 24px. `xl:` — image 336px, gap 40px, content 480px. | `src/components/awards/award-card.tsx`
- [x] T029 [P] [US4] KudosSection responsive styles already handled in reused Homepage component. No additional work needed. | `src/components/homepage/kudos-section.tsx` (REUSE)
- [x] T030 [P] [US4] Apply responsive padding to Header and Footer per breakpoints: Header `px-4 md:px-12 lg:px-20 xl:px-36`, Footer `px-4 py-6 md:px-12 md:py-8 lg:px-20 lg:py-10 xl:px-[90px] xl:py-10` | `src/components/shared/header.tsx`, `src/components/shared/footer.tsx`
- [x] T031 [US4] Verify touch targets: all sidebar items >= 44x44px, "Chi tiet" button >= 44x44px (already 56px height), footer nav links >= 44x44px on mobile | all interactive components

**Checkpoint**: All user stories complete — fully responsive awards page

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility audit, performance optimization, edge cases

### Accessibility

- [x] T032 [P] Verify sidebar accessibility: `role="navigation"`, `aria-label="Award categories"`, keyboard nav (Tab, ArrowUp/Down, Enter), focus indicators (`outline: 2px solid #FFEA9E, offset: 2px`) | `src/components/awards/award-sidebar.tsx`
- [x] T033 [P] Verify award card images have descriptive `alt` text (e.g., "Top Talent award") — not empty since they are informational | `src/components/awards/award-card.tsx`
- [x] T034 [P] Verify color contrast: gold `#FFEA9E` on `#00101A` background, white `#FFFFFF` on `#00101A`, verify 4.5:1 ratio for all text sizes | all components
- [x] T035 [P] Verify tab order: Header nav → sidebar items → award card content → Kudos button → Footer nav | `src/app/awards/page.tsx`

### Performance

- [x] T036 [P] Verify key visual uses `next/image` with `priority`, WebP format, responsive `sizes` attribute. Award card images use lazy loading for below-the-fold cards (only first 1-2 cards get `priority`). Kudos background image uses `loading="lazy"`. | `src/components/awards/key-visual.tsx`, `src/components/awards/award-card.tsx`, `src/components/awards/kudos-section.tsx`
- [x] T037 [P] Verify fonts load via `next/font` with `display: swap` — Montserrat, Montserrat Alternates, SVN-Gotham. No FOIT. | `src/app/layout.tsx`
- [x] T038 [P] Verify minimal Client Component bundle — only `award-system.tsx` (which includes AwardSidebar and AwardCards within its boundary) has `'use client'`. KeyVisual and Homepage KudosSection remain Server Components. _(SectionTitle removed — merged into KeyVisual)_ | all components

### Animations & Transitions

- [x] T039 [P] Add sidebar item hover/active transitions: 150ms `ease-in-out` for color, text-shadow, border-bottom | `src/components/awards/award-sidebar.tsx`
- [x] T040 [P] Add header nav tab hover/active transitions: 150ms `ease-in-out` for color, text-shadow, border, background | `src/components/shared/header.tsx`
- [x] T041 [P] Add footer nav link hover transitions: 150ms `ease-in-out` for color | `src/components/shared/footer.tsx`

### Edge Cases

- ~~T042~~ _(REMOVED — Awards are static seed data. No empty state needed. "Coming soon" placeholder removed.)_
- [x] T043 [P] Handle last award scrolled past: ensure MVP remains active in sidebar when user scrolls beyond all cards | `src/components/awards/award-system.tsx`
- [x] T044 [P] Handle sidebar taller than viewport: add `overflow-y: auto` within sticky container, set `max-h-[calc(100vh-80px)]` | `src/components/awards/award-sidebar.tsx`
- [x] T045 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3) ──→ Phase 6 (US4) ──→ Phase 7 (Polish)
                                                    │                     │
                                                    └─ STOP & VALIDATE ──┘ (can deploy after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (assets + fonts must exist) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 (needs DB data + translations) — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (AwardCard components must exist for IntersectionObserver targeting)
- **US3 (Phase 5)**: Depends on Phase 3 (KudosSection must exist)
- **US4 (Phase 6)**: Depends on Phase 4 (responsive applies to final component state including sidebar)
- **Polish (Phase 7)**: Depends on Phase 6

### Within Each Phase

- Loading/error shell [P] can be created in parallel with components
- Components marked [P] can be created in parallel (different files)
- Page assembly (T018) depends on all Phase 3 components (T014-T017) being ready
- AwardSystem (T021) depends on AwardCard existing; AwardSidebar (T022) can be created in parallel with T021
- T023 (page update) depends on T021 and T022

### Parallel Opportunities

**Phase 1**: T006 and T007 can run in parallel (layout.tsx vs globals.css). T001-T004 are sequential asset downloads.
**Phase 2**: T009 and T010 can run in parallel (seed SQL vs translations). T008 must complete before T011.
**Phase 3**: T012, T013, T014, T016 can run in parallel (4 independent files; T015 removed, T017 is a reuse). T018 depends on T014 and T016. T019 and T020 can run in parallel with each other.
**Phase 4**: T021 and T022 can run in parallel. T023 depends on both.
**Phase 6**: T025-T031 tasks marked [P] can run in parallel.
**Phase 7**: T032-T044 tasks marked [P] can run in parallel.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Database + i18n)
2. Complete Phase 3 (User Story 1 — View Award Details)
3. **STOP and VALIDATE**: Verify 6 award cards render with correct data
4. Deploy if ready — users can view award details

### Incremental Delivery

1. Setup + Foundation → Database populated, translations ready
2. Add User Story 1 → Test → Deploy (MVP — award cards display)
3. Add User Story 2 → Test → Deploy (sidebar navigation)
4. Add User Story 3 → Test → Deploy (Kudos CTA)
5. Add User Story 4 → Test → Deploy (responsive)
6. Polish → Test → Deploy (final)

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — all dependencies already installed
- The shared Header needs extension for nav tabs, notification bell, and user avatar — these are new elements beyond the login header
- The shared Footer needs extension for configurable nav items and active state
- SVN-Gotham font for "KUDOS" text: if font file unavailable, fallback to sans-serif
- Signature 2025 Creator is the only card with `prize_value_secondary` — handle this special case in AwardCard
- Award card images use `mix-blend-mode: screen` — this is a deliberate design choice
- The page total height is 6410px at desktop — lazy-load below-the-fold card images
- Mark tasks complete as you go: `[x]`
