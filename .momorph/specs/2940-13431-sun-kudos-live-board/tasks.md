# Tasks: Sun* Kudos Live Board

**Frame**: `2940:13431-Sun* Kudos - Live board`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3…US7)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & Dependencies)

**Purpose**: Download Figma assets, add design tokens, extend i18n

- [x] T001 Download hero banner background image from Figma using `get_media_files` tool, optimize as WebP | `public/images/kudos/hero-bg.webp`
- [x] T002 [P] Download KUDOS branding logo from Figma using `get_media_files` tool | `public/images/kudos/kudos-logo.png`
- [x] T003 [P] Verify all downloaded assets exist and follow kebab-case naming | `public/images/kudos/`
- [x] T004 [P] Add kudos design tokens as CSS custom properties from design-style.md (colors, gradients, spacing) if not already covered by login tokens | `src/app/globals.css`
- [x] T005 [P] Add all `kudos.*` i18n keys from spec i18n table (Vietnamese + English) to translations module | `src/libs/i18n/translations.ts`

---

## Phase 2: Foundation (DB Migration, Types, Shared Infra)

**Purpose**: Database schema, TypeScript types, server-side queries/actions, and shared Toast component — BLOCKS all user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create database migration: `kudos`, `kudo_hashtags`, `kudo_images`, `kudo_likes`, `hashtags`, `departments`, `highlight_kudos`, `secret_boxes`, `user_profiles` tables with RLS policies on ALL tables, indexes on `kudos(created_at DESC, id DESC)`, `kudo_likes(kudo_id, user_id)` unique constraint, and Supabase Storage bucket `kudo-images` (authenticated INSERT/SELECT, max 5MB) | `supabase/migrations/YYYYMMDDHHMMSS_create_kudos_tables.sql`
- [x] T007 [P] Create seed data: 5-10 sample users, 20-30 kudos, likes, hashtags (#Dedicated, #Inspiring, #TeamPlayer, #Innovative), departments, highlight kudos, secret boxes with matching `user_profiles` entries | `supabase/seeds/dev/kudos-seed.sql`
- [x] T008 [P] Define TypeScript types: `Kudo`, `KudoWithDetails` (joined with sender, receiver, hashtags, images, like count, user like status), `HighlightKudo`, `UserStats`, `SecretBox`, `Hashtag`, `Department`, `UserProfile`, `KudosFeedResponse` (items, nextCursor, hasMore), `HighlightsResponse` (items, currentPage, totalPages) | `src/libs/kudos/types.ts`
- [x] T009 [P] Create Toast notification component (Client Component): `'use client'`, fixed bottom-center z-50, success (green) and error (red) variants, auto-dismiss after 3s via `useEffect` timer, manage visibility state internally | `src/components/shared/toast.tsx`
- [x] T010 Create server-side query functions: `getKudosFeed(cursor?, pageSize=10)` with cursor-based pagination joining kudos+sender+receiver+hashtags+images+like count+user like status ordered by `created_at DESC, id DESC`, `getKudoLikeStatus(kudoIds[], userId)`, `getHashtags()`, `getDepartments()`, returning `KudosFeedResponse` | `src/libs/kudos/queries.ts`
- [x] T011 [P] Create server actions: `toggleLike(kudoId)` with auth check + INSERT/DELETE from `kudo_likes` returning new count+status, `fetchMoreKudos(cursor)` returning `KudosFeedResponse` | `src/libs/kudos/actions.ts`

**Checkpoint**: Database migrated and seeded, types defined, core queries and actions functional, Toast available

---

## Phase 3: User Story 1 — View All Kudos Feed (Priority: P1) MVP

**Goal**: Authenticated users can browse a paginated feed of kudos cards with like/unlike and copy link interactions

**Independent Test**: Navigate to `/kudos` after login, verify All Kudos section renders kudos cards with sender/receiver info, timestamps, messages, hashtags, images, like count, and interaction controls. Click "Load more" to paginate. Like/unlike a kudo. Copy a kudo permalink.

### Page Shell (US1)

- [x] T012 [P] [US1] Create loading skeleton: dark background (#00101A), pulsing skeleton blocks for hero, highlight carousel, and 3-5 feed card placeholders using `animate-pulse` | `src/app/kudos/loading.tsx`
- [x] T013 [P] [US1] Create error boundary: `'use client'`, dark background (#00101A), centered "Something went wrong" message, "Try again" button (#FFEA9E bg, 8px radius) calling `reset` prop | `src/app/kudos/error.tsx`

### Kudo Card Components (US1)

- [x] T014 [P] [US1] Create KudoBadge component: inline-flex, 4px radius, bg `rgba(255,234,158,0.15)`, 12px/700 uppercase, #FFEA9E text, padding 4px 8px | `src/components/kudos/kudo-badge.tsx`
- [x] T015 [P] [US1] Create HashtagChip component: pill shape (9999px radius), bg `rgba(255,234,158,0.10)`, border `rgba(255,234,158,0.30)`, 14px/500, #FFEA9E text, padding 6px 12px | `src/components/kudos/hashtag-chip.tsx`
- [x] T016 [P] [US1] Create ImageGallery component (Client Component): `'use client'`, thumbnails 80x80px (60x60 mobile) with 8px radius, `object-cover`, `next/image` with lazy loading, click to open lightbox modal with dark overlay, `Escape` to close lightbox, cursor pointer on thumbnails | `src/components/kudos/image-gallery.tsx`
- [x] T017 [P] [US1] Create LikeButton component (Client Component): `'use client'`, heart icon 20px (outline white/60 when not liked, filled #FF4D4D when liked), optimistic toggle on click calling `toggleLike` server action, revert + error toast on failure, scale animation 1.0→1.3→1.0 200ms ease-out, count via `Intl.NumberFormat`, `aria-pressed` toggle, `aria-label` | `src/components/kudos/like-button.tsx`
- [x] T018 [P] [US1] Create CopyLinkButton component (Client Component): `'use client'`, `navigator.clipboard.writeText('${origin}/kudos?kudo=${kudoId}')`, text changes to "Da sao chep!" for 2s with #FFEA9E color, hover transitions to white 150ms, 14px/500 | `src/components/kudos/copy-link-button.tsx`
- [x] T019 [US1] Create KudoCardHeader component: sender avatar (40px pill) + name (16px/700) → arrow icon (16px, white/40) → receiver avatar + name, timestamp (14px/400, white/50), optional KudoBadge, flex items-center gap-12px | `src/components/kudos/kudo-card-header.tsx`
- [x] T020 [US1] Create KudoCardBody component: message text (16px/400, white, 24px line-height, 0.5px letter-spacing), HashtagChip row (flex-wrap gap-8px), conditional ImageGallery | `src/components/kudos/kudo-card-body.tsx`
- [x] T021 [US1] Create KudoCardActions component (Client Component): `'use client'`, flex justify-between, LikeButton + count on left, CopyLinkButton on right | `src/components/kudos/kudo-card-actions.tsx`
- [x] T022 [US1] Create KudoCard component: container with 12px radius, bg white/5, border white/8, 24px padding (16px mobile), flex-col gap-16px, hover bg white/8 150ms transition, composes KudoCardHeader + KudoCardBody + KudoCardActions | `src/components/kudos/kudo-card.tsx`

### Feed & Section (US1)

- [x] T023 [US1] Create KudosFeed component (Client Component): `'use client'`, receives initial kudos as prop, renders list of KudoCard with 16px gap, "Load more" button at bottom calling `fetchMoreKudos` server action and appending results, skeleton cards while loading more, empty state "Chua co kudos nao..." with CTA, `aria-live="polite"` for new items | `src/components/kudos/kudos-feed.tsx`
- [x] T024 [US1] Create AllKudos section container (Server Component): "ALL KUDOS" heading (#FFEA9E, Montserrat 32px/700), flex row on desktop (feed + sidebar) / single column on mobile, responsive padding (16px mobile, 48px tablet, 80px desktop, 144px wide) | `src/components/kudos/all-kudos.tsx`

### Page Assembly (US1)

- [x] T025 [US1] Create Live Board page (Server Component): verify auth via `supabase.auth.getUser()` (redirect to `/login` if unauthenticated), read locale from cookie, fetch initial data in `Promise.all` (first page of kudos feed, hashtags, departments), render page shell with dark bg (#00101A), max-w-[1512px] mx-auto container, render AllKudos section passing fetched data, use shared Header and Footer | `src/app/kudos/page.tsx`

**Checkpoint**: User Story 1 complete — kudos feed browsable with like/unlike and copy link

---

## Phase 4: User Story 2 — Send a Kudo (Priority: P2)

**Goal**: User can trigger the Write Kudo dialog from the hero banner recognition input

**Independent Test**: Click the pill-shaped recognition input, verify the Write Kudo dialog opens (placeholder modal for now). Verify `createKudo` server action validates and inserts a kudo.

- [x] T026 [P] [US2] Create HeroBanner component (Server Component): full-width, min-height 400px, `next/image` for hero-bg.webp with `priority` (LCP), gradient overlay (`linear-gradient(180deg, transparent 0%, #00101A 100%)`), title "He thong ghi nhan loi cam on" (Montserrat 40px/700, white, centered), KUDOS logo image, input row (flex justify-between on desktop, flex-col on mobile), responsive padding (32px 16px mobile, 48px tablet, 48px 144px wide) | `src/components/kudos/hero-banner.tsx`
- [x] T027 [P] [US2] Create RecognitionInput component (Client Component): `'use client'`, pill shape (9999px radius), max-width 600px, height 56px, bg white/8, border white/20, pen icon (20px, white/60) + placeholder text (16px/400, white/60), hover bg white/12 + border white/30 150ms, focus outline 2px solid #FFEA9E offset 2px, click sets `isWriteDialogOpen=true`, render placeholder modal (interface: `{ isOpen, onClose, onSuccess }`) until Write Kudo spec is available | `src/components/kudos/recognition-input.tsx`
- [x] T028 [US2] Add `createKudo` server action: validate recipient (required, valid UUID), message (required, non-empty, max 1000 chars), hashtags (array of valid IDs), images (FormData, max 5 files, max 5MB each, only JPEG/PNG/WebP), auth check via `supabase.auth.getUser()`, upload images to Supabase Storage bucket `kudo-images`, insert into `kudos` + `kudo_hashtags` + `kudo_images` tables, return created kudo | `src/libs/kudos/actions.ts`
- [x] T029 [US2] Update Live Board page: add HeroBanner section between Header and AllKudos, render RecognitionInput inside HeroBanner | `src/app/kudos/page.tsx`

**Checkpoint**: User Story 2 complete — recognition input triggers Write Kudo dialog, createKudo server action functional

---

## Phase 5: User Story 3 — Highlight Kudos Carousel (Priority: P3)

**Goal**: Featured kudos displayed in a paginated carousel with hashtag and department filters

**Independent Test**: Verify Highlight Kudos section shows carousel with featured cards, pagination "2/5", left/right arrows. Select hashtag filter and verify carousel re-filters. Select department filter and verify.

- [x] T030 [US3] Add `getHighlightKudos(page, pageSize, hashtagId?, departmentId?)` query function: page-based pagination for highlight_kudos joined with kudos details, filter by hashtag and/or department, return `HighlightsResponse` with items, currentPage, totalPages | `src/libs/kudos/queries.ts`
- [x] T031 [US3] Add `fetchHighlightKudos(page, hashtagId?, departmentId?)` server action: calls `getHighlightKudos`, returns `HighlightsResponse` | `src/libs/kudos/actions.ts`
- [x] T032 [P] [US3] Create FilterDropdown component (Client Component): `'use client'`, reusable for hashtag and department, height 40px, 8px radius, border white/15, transparent bg, dropdown below with shadow `0 4px 12px rgba(0,0,0,0.30)`, open/close animation 150ms opacity+translateY, keyboard: Enter/Space to open, arrow keys to navigate, Enter to select, Escape to close, ARIA: `role="listbox"`, `aria-expanded`, `aria-label` | `src/components/kudos/filter-dropdown.tsx`
- [x] T033 [P] [US3] Create HighlightCarousel component (Client Component): `'use client'`, receives highlight data and filter state as props, displays 1 card (mobile) / 2 cards (tablet) / 3 cards (desktop/wide) with 16px gap, left/right arrow buttons (40px circle, bg white/10, hover white/20, disabled opacity 0.3 cursor not-allowed), pagination text "2/5" (16px/500, white/60, centered), slide transition 300ms ease-in-out, lazy-load pages on navigation, keyboard ArrowLeft/ArrowRight | `src/components/kudos/highlight-carousel.tsx`
- [x] T034 [US3] Create HighlightKudos section wrapper (Client Component): `'use client'` (owns filter state: selectedHashtag, selectedDepartment), receives initial highlights, hashtags list, and departments list as props, "HIGHLIGHT KUDOS" heading (#FFEA9E, Montserrat 32px/700), "Sun* Annual Awards 2025" label (14px/500, white/60), renders FilterDropdown components and HighlightCarousel, on filter change calls `fetchHighlightKudos` server action with new filters, responsive padding (32px 16px mobile, 48px tablet, 64px 144px wide) | `src/components/kudos/highlight-kudos.tsx`
- [x] T035 [US3] Update Live Board page: fetch initial highlight kudos in `Promise.all`, render HighlightKudos section between HeroBanner and AllKudos, pass highlights + hashtags + departments as props | `src/app/kudos/page.tsx`

**Checkpoint**: User Story 3 complete — highlight carousel with filtering works independently

---

## Phase 6: User Story 4 — Spotlight Board Visualization (Priority: P4)

**Goal**: Visual graph showing kudos connections with a total kudos count

**Independent Test**: Scroll to Spotlight Board section, verify "SPOTLIGHT BOARD" heading, total kudos count (e.g., "388 KUDOS"), and graph visualization with nodes and edges renders.

- [x] T036 [US4] Add `getSpotlightData()` query function: total kudos count, graph nodes (top 50 most-connected users with kudos count for sizing) and edges (sender→receiver pairs with weight), pre-compute node positions server-side for static layout | `src/libs/kudos/queries.ts`
- [x] T037 [P] [US4] Create SpotlightGraph component (Client Component): `'use client'`, Canvas-based rendering with `requestAnimationFrame`, nodes as circles (#FFEA9E, 8-24px varying by kudos count), edges as lines (gold/30, 1px), responsive (fills container), min-height 300px, graceful fallback "Data loading" placeholder if data unavailable. Attempt custom Canvas first; if force layout needed evaluate `d3-force` (~15KB) | `src/components/kudos/spotlight-graph.tsx`
- [x] T038 [US4] Create SpotlightBoard section container (Server Component): "SPOTLIGHT BOARD" heading (#FFEA9E, Montserrat 32px/700), count display "{count} KUDOS" (Montserrat 48px/700 desktop, 32px mobile, #FFEA9E, centered), radial-gradient background glow `rgba(255,234,158,0.08)`, responsive padding (32px 16px mobile, 48px tablet, 64px 144px wide), renders SpotlightGraph | `src/components/kudos/spotlight-board.tsx`
- [x] T039 [US4] Update Live Board page: fetch spotlight data in `Promise.all`, render SpotlightBoard section between HighlightKudos and AllKudos | `src/app/kudos/page.tsx`

**Checkpoint**: User Story 4 complete — spotlight board visualization renders with total count

---

## Phase 7: User Story 5 — User Stats & Secret Box (Priority: P5)

**Goal**: Personal kudos stats sidebar with Secret Box gamification

**Independent Test**: Verify stats sidebar shows kudos received/sent counts and Secret Box opened/unopened counts. Click "Mo Secret Box" with unopened boxes and verify interaction. Verify button disabled when no unopened boxes.

- [x] T040 [US5] Add `getUserStats(userId)` query function: kudos received count, kudos sent count, total kudos received, secret boxes opened count, secret boxes unopened count, auth-gated | `src/libs/kudos/queries.ts`
- [x] T041 [US5] Add `openSecretBox()` server action: verify auth, verify user has unopened boxes, UPDATE `secret_boxes` SET `is_opened=true` WHERE `user_id=auth.uid()` AND `is_opened=false` LIMIT 1, return opened box with reward info | `src/libs/kudos/actions.ts`
- [x] T042 [P] [US5] Create SecretBoxButton component (Client Component): `'use client'`, full-width, 48px height, 8px radius, bg #FFEA9E, text #00101A (Montserrat 16px/700), hover #FFE580, active #FFD84D, disabled opacity 0.4 cursor not-allowed (when no unopened boxes), focus outline 2px solid #FFEA9E offset 2px, click calls `openSecretBox` server action, show placeholder reveal modal | `src/components/kudos/secret-box-button.tsx`
- [x] T043 [US5] Create StatsSidebar component (Client Component): `'use client'`, width 300px (wide) / 280px (desktop) / full-width (mobile/tablet), sticky on desktop (`position: sticky; top: 100px`), non-sticky on mobile/tablet, bg white/5, border white/8, 16px radius, 24px padding, stat rows (label 14px/400 white/60 + value 32px/700 #FFEA9E, flex justify-between), divider 1px solid #2E3940 between kudos stats and secret box stats, renders SecretBoxButton, updates stats after actions | `src/components/kudos/stats-sidebar.tsx`
- [x] T044 [US5] Update Live Board page: fetch user stats in `Promise.all`, pass stats to AllKudos which renders StatsSidebar beside the feed on desktop | `src/app/kudos/page.tsx`

**Checkpoint**: User Story 5 complete — stats sidebar with Secret Box interaction works

---

## Phase 8: User Story 6 — Filter and Search (Priority: P6)

**Goal**: Search for Sunner profiles and filter highlight kudos

**Independent Test**: Type a name in the search bar (2+ chars), verify results appear after 300ms debounce. Select a result. Verify filter dropdowns on Highlight section filter carousel content.

- [x] T045 [US6] Add `searchUsers(query)` server action: search `user_profiles` by name (ILIKE `%query%`) with parameterized query, validate minimum 2 chars / max 100 chars, sanitize input, auth check, return top 10 matches with id, name, avatar_url, department | `src/libs/kudos/actions.ts`
- [x] T046 [US6] Create SearchBar component (Client Component): `'use client'`, pill shape (9999px), max-width 300px (full-width on mobile), height 44px, bg white/8, border white/15, focus border #FFEA9E + box-shadow 0 0 0 2px gold/20, placeholder "Tim kiem profile Sunner" (14px/400, white/50), 300ms debounce, results dropdown below with shadow `0 4px 12px rgba(0,0,0,0.30)`, each result: avatar (32px) + name + department, select navigates to user profile, no results: "Khong tim thay ket qua", ARIA: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"` | `src/components/kudos/search-bar.tsx`
- [x] T047 [US6] Update HeroBanner: render SearchBar in the input row beside RecognitionInput (flex-row on tablet+, flex-col on mobile) | `src/components/kudos/hero-banner.tsx`

**Checkpoint**: User Story 6 complete — search and filter work independently

---

## Phase 9: User Story 7 — Responsive Layout (Priority: P7)

**Goal**: All sections display correctly at all 4 breakpoints (320px, 768px, 1024px, 1440px)

**Independent Test**: Load Live Board at 320px, 768px, 1024px, and 1440px widths. Verify all sections accessible, properly laid out, no overflow.

- [x] T048 [US7] Apply responsive styles to HeroBanner: title 24px mobile / 32px tablet / 40px desktop+, input row flex-col mobile / flex-row tablet+, recognition input full-width mobile / max-width 600px tablet+, search bar full-width mobile / max-width 300px tablet+ | `src/components/kudos/hero-banner.tsx`
- [x] T049 [P] [US7] Apply responsive styles to HighlightKudos: padding 32px 16px mobile / 48px tablet / 64px 80px desktop / 64px 144px wide, filter dropdowns stacked on mobile / inline on tablet+ | `src/components/kudos/highlight-kudos.tsx`
- [x] T050 [P] [US7] Apply responsive styles to SpotlightBoard: padding 32px 16px mobile / 48px tablet / 64px 80px desktop / 64px 144px wide, count font-size 32px mobile / 48px desktop | `src/components/kudos/spotlight-board.tsx`
- [x] T051 [P] [US7] Apply responsive styles to AllKudos + StatsSidebar: single column on mobile/tablet, two columns on desktop+ (feed flex-1 + sidebar 280px desktop / 300px wide), sidebar non-sticky on mobile/tablet, KudoCard padding 16px mobile / 24px desktop, thumbnails 60x60 mobile / 80x80 desktop | `src/components/kudos/all-kudos.tsx`, `src/components/kudos/stats-sidebar.tsx`, `src/components/kudos/kudo-card.tsx`
- [x] T052 [US7] Apply page-level responsive container: max-width 1512px, mx-auto on wide screens, verify section paddings match breakpoint table (16px mobile, 48px tablet, 80px desktop, 144px wide) | `src/app/kudos/page.tsx`
- [x] T053 [US7] Verify all touch targets >= 44x44px on mobile: like button, carousel arrows, filter dropdowns, search bar, Secret Box button, recognition input | all interactive components

**Checkpoint**: User Story 7 complete — fully responsive at all breakpoints

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, animations, and edge cases

### Accessibility

- [x] T054 [P] Verify carousel keyboard navigation: ArrowLeft/ArrowRight to navigate pages, Enter to interact with cards, focus trap within carousel when active | `src/components/kudos/highlight-carousel.tsx`
- [x] T055 [P] Verify like button `aria-pressed` toggle state and accessible label ("Like"/"Unlike") | `src/components/kudos/like-button.tsx`
- [x] T056 [P] Verify feed `aria-live="polite"` announces new items on "Load more" | `src/components/kudos/kudos-feed.tsx`
- [x] T057 [P] Verify filter dropdowns fully keyboard accessible (Enter/Space open, arrow keys navigate, Enter select, Escape close) with proper ARIA roles | `src/components/kudos/filter-dropdown.tsx`
- [x] T058 [P] Verify image gallery lightbox: focus trap when open, `Escape` to close | `src/components/kudos/image-gallery.tsx`
- [x] T059 [P] Verify focus indicators (2px solid #FFEA9E, offset 2px) on all interactive elements | all interactive components

### Performance

- [x] T060 [P] Verify hero background uses `next/image` with `priority` prop, WebP format, responsive `sizes` | `src/components/kudos/hero-banner.tsx`
- [x] T061 [P] Verify feed images use `next/image` with lazy loading (below fold) | `src/components/kudos/image-gallery.tsx`
- [x] T062 [P] Verify carousel lazy-loads pages on navigation (no upfront fetch of all pages) | `src/components/kudos/highlight-carousel.tsx`

### Edge Cases

- [x] T063 Verify empty feed displays "Chua co kudos nao. Hay la nguoi dau tien gui loi cam on!" message with CTA to Write Kudo dialog | `src/components/kudos/kudos-feed.tsx`
- [x] T064 [P] Verify like API failure reverts optimistic UI and shows error toast "Could not update like. Try again." | `src/components/kudos/like-button.tsx`
- [x] T065 [P] Verify image load failure shows placeholder with broken-image indicator | `src/components/kudos/image-gallery.tsx`
- [x] T066 [P] Verify no Secret Boxes state: "0" counts displayed, button disabled | `src/components/kudos/stats-sidebar.tsx`, `src/components/kudos/secret-box-button.tsx`
- [x] T067 [P] Verify spotlight data unavailable: "Data loading" placeholder or hidden section | `src/components/kudos/spotlight-board.tsx`
- [x] T068 [P] Verify filter/search no results: "Khong tim thay ket qua" message | `src/components/kudos/search-bar.tsx`, `src/components/kudos/highlight-carousel.tsx`

### Final

- [x] T069 Run `yarn lint` and fix any ESLint errors across all new/modified files
- [x] T070 Run `yarn build` and verify production build succeeds with no errors

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3)
                                                    │                                       │
                                                    └─── STOP & VALIDATE (deploy after US1) │
                                                                                            ↓
                                              Phase 8 (US6) ←── Phase 7 (US5) ←── Phase 6 (US4)
                                                    │
                                                    ↓
                                              Phase 9 (US7) ──→ Phase 10 (Polish)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (assets + tokens) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (page must exist to add HeroBanner)
- **US3 (Phase 5)**: Depends on Phase 4 (HeroBanner exists, page layout established)
- **US4 (Phase 6)**: Depends on Phase 5 (page layout established)
- **US5 (Phase 7)**: Depends on Phase 3 (AllKudos section must exist for sidebar)
- **US6 (Phase 8)**: Depends on Phase 4 (HeroBanner must exist for SearchBar)
- **US7 (Phase 9)**: Depends on all US phases (responsive applies to final components)
- **Polish (Phase 10)**: Depends on Phase 9

### Within Each Phase

- Tasks marked [P] can run in parallel (different files, no dependencies)
- Page assembly tasks depend on all component tasks in the same phase
- Server action/query tasks should precede components that consume them

### Parallel Opportunities

**Phase 1**: T001-T005 — T002, T003, T004, T005 all parallel with T001
**Phase 2**: T007, T008, T009 parallel with each other; T010 and T011 parallel after T008 (needs types)
**Phase 3**: T012-T018 all parallel (independent files); T019-T022 sequential (card composition); T023-T024 after cards; T025 last
**Phase 4**: T026 and T027 parallel; T028 parallel; T029 last
**Phase 5**: T032 and T033 parallel; T034 after both; T035 last
**Phase 6**: T037 parallel with T036; T038 after both; T039 last
**Phase 7**: T042 parallel with T040-T041; T043 after T042; T044 last
**Phase 8**: T045 then T046 then T047
**Phase 9**: T048-T051 all parallel; T052-T053 after all
**Phase 10**: All accessibility (T054-T059) parallel, all performance (T060-T062) parallel, all edge cases (T063-T068) parallel; T069-T070 last

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (User Story 1 — View All Kudos Feed)
3. **STOP and VALIDATE**: Test feed browsing, like/unlike, copy link end-to-end
4. Deploy if ready — users can browse and interact with kudos

### Incremental Delivery

1. Setup + Foundation → DB ready, types defined, queries functional
2. Add User Story 1 → Test → Deploy (MVP — feed works)
3. Add User Story 2 → Test → Deploy (hero banner + send kudo trigger)
4. Add User Story 3 → Test → Deploy (highlight carousel + filters)
5. Add User Story 4 → Test → Deploy (spotlight visualization)
6. Add User Story 5 → Test → Deploy (stats + secret box)
7. Add User Story 6 → Test → Deploy (search)
8. Add User Story 7 → Test → Deploy (responsive)
9. Polish → Test → Deploy (final)

---

## Notes

- No new npm packages required initially — all deps (Supabase, Tailwind, Next.js, React) already installed
- Montserrat font already configured from login implementation
- Shared Header, Footer, LanguageSelector reused from `src/components/shared/`
- Write Kudo modal is a separate spec — only the trigger interface (`{ isOpen, onClose, onSuccess }`) is implemented here with a placeholder
- Secret Box reveal modal is a separate spec — basic open action only for MVP
- Real-time feed updates out of scope — manual pagination with "Load more"
- Number formatting uses `Intl.NumberFormat` (safe on Cloudflare Workers)
- Content area: 1512px total, 144px padding each side = 1224px content on wide screens
- Mark tasks complete as you go: `[x]`
