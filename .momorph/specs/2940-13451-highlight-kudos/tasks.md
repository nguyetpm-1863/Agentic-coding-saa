# Tasks: Highlight Kudos Section

**Frame**: `2940-13451-highlight-kudos`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5)

---

## Phase 1: Setup

**Purpose**: No new project setup needed — all infrastructure exists. This phase handles seed data.

- [x] T001 Add highlight_kudos seed data for dev environment — insert rows referencing existing dev kudos into highlight_kudos table | supabase/seeds/dev/kudos.sql
- [x] T002 Run `supabase db reset` or re-seed to apply highlight_kudos data and verify data loads in DB

**Checkpoint**: Dev database has highlight_kudos rows, hashtags, and departments seeded

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Fix the data query layer so highlight kudos actually load

**⚠️ CRITICAL**: Without these fixes, the UI shows empty even with correct seed data

- [x] T003 Fix `getHighlightKudos` in `src/libs/kudos/queries.ts` — add fallback: when `highlight_kudos` table returns 0 rows, query `kudos` table directly sorted by like_count DESC then created_at DESC, with same pagination and filter support
- [x] T004 Verify `fetchHighlightKudosAction` server action in `src/libs/kudos/actions.ts` correctly passes hashtagId and departmentId to the query
- [x] T005 Verify highlight kudos data loads on `/kudos` page by checking server component data fetching in `src/app/kudos/page.tsx`

**Checkpoint**: Foundation ready — `/kudos` page loads highlight kudos data from API

---

## Phase 3: User Story 1 — View Highlight Kudos (Priority: P1) 🎯 MVP

**Goal**: Section displays correctly with header (subtitle + divider + title), carousel of kudo cards matching Figma design

**Independent Test**: Load `/kudos`, verify "Sun* Annual Awards 2025" text + `#2E3940` divider + "HIGHLIGHT KUDOS" title appear, followed by carousel with kudo cards showing sender→receiver info

### Section Header (US1)

- [x] T006 [US1] Fix section header layout in `src/components/kudos/highlight-kudos.tsx` — reorder to: subtitle "Sun* Annual Awards 2025" (24px/700/white) ABOVE title, add 1px `#2E3940` divider between subtitle and title, title "HIGHLIGHT KUDOS" uses responsive sizes `text-[32px] md:text-[44px] lg:text-[57px]` font-bold text-[#FFEA9E]

### Kudo Card Styling (US1)

- [x] T007 [P] [US1] Update `src/components/kudos/kudo-card.tsx` — change to `rounded-2xl bg-[#FFF8E1] border-4 border-[#FFEA9E] p-6 pb-4` with `shadow-[0_2px_8px_rgba(0,0,0,0.20)]`, remove the outer gold border wrapper from highlight-carousel.tsx
- [x] T008 [P] [US1] Update `src/components/kudos/kudo-card-header.tsx` — fix avatar size to 48px (w-12 h-12), fix department text to use `departmentCode` with `text-[#999] text-sm font-bold`, verify sender→arrow→receiver layout matches design
- [x] T009 [US1] Update `src/components/kudos/kudo-card-body.tsx` — add gold divider (`h-px bg-[#FFEA9E]`) before timestamp section, fix timestamp to `text-base font-bold text-[#999] tracking-[0.5px]`, add badge title centered (`text-base font-bold text-center`), fix message to `text-xl font-bold leading-8 line-clamp-3`, fix hashtag color to `text-[#D4271D]` with `line-clamp-1`, add gold divider after hashtags
- [x] T010 [US1] Update `src/components/kudos/kudo-card-actions.tsx` — remove `border-t border-[#00101A]/10` (gold divider now in body), fix like count to `text-2xl font-bold`, add "Xem chi tiết" text link with external-link icon that navigates to kudo detail

### Carousel & Pagination (US1)

- [x] T011 [US1] Update `src/components/kudos/highlight-carousel.tsx` — remove outer gold border div wrapper on each card (card itself now has border), update carousel arrow buttons to 80px (w-20 h-20), update pagination text to `text-[28px] font-bold` with current page gold `text-[#FFEA9E]` and total gray `text-[#999]`, update pagination arrows to 48px (w-12 h-12)

**Checkpoint**: User Story 1 complete — section header and kudo cards display correctly matching Figma

---

## Phase 4: User Story 2 — Filter by Hashtag (Priority: P1)

**Goal**: Hashtag dropdown filter works and updates the carousel

**Independent Test**: Click "Hashtag" dropdown, select a hashtag, verify carousel shows only matching kudos

- [x] T012 [US2] Verify `HashtagFilterDropdown` in `src/components/live-board/hashtag-filter-dropdown.tsx` renders with correct golden styling — button should have `bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded p-4` per design, text `text-base font-bold text-white`. If using CSS variables, verify they resolve to correct values or replace with direct Tailwind classes
- [x] T013 [US2] Verify `KudosFilters` in `src/components/kudos/kudos-filters.tsx` passes correct props and renders both filter buttons aligned right on desktop (flex-row, gap)
- [x] T014 [US2] Verify hashtag filter triggers `fetchHighlightKudosAction` with correct hashtagId and carousel updates with filtered results

**Checkpoint**: Hashtag filtering works end-to-end

---

## Phase 5: User Story 3 — Filter by Department (Priority: P1)

**Goal**: Department dropdown filter works and updates the carousel

**Independent Test**: Click "Phòng ban" dropdown, select a department, verify carousel shows only kudos where receiver belongs to that department

- [x] T015 [P] [US3] Verify `DepartmentFilterDropdown` in `src/components/live-board/department-filter-dropdown.tsx` renders with correct golden styling matching Hashtag filter
- [x] T016 [US3] Verify department filter triggers `fetchHighlightKudosAction` with correct departmentId and carousel updates with filtered results
- [x] T017 [US3] Verify both filters work together (AND combination) — selecting a hashtag AND department filters to kudos matching both criteria

**Checkpoint**: Both filters work independently and combined

---

## Phase 6: User Story 4 — Card Interactions (Priority: P2)

**Goal**: Like/unlike, copy link, and view detail work correctly on kudo cards

**Independent Test**: Click heart to like/unlike, click "Copy Link" to copy URL, click "Xem chi tiết" to navigate

- [x] T018 [P] [US4] Verify `LikeButton` in `src/components/kudos/like-button.tsx` calls `toggleLike` server action correctly — heart red when liked, gray when not, count updates
- [x] T019 [P] [US4] Verify `CopyLinkButton` in `src/components/kudos/copy-link-button.tsx` copies correct kudo URL to clipboard and shows toast notification
- [x] T020 [US4] Verify "Xem chi tiết" link in `src/components/kudos/kudo-card-actions.tsx` navigates to kudo detail page (define route pattern, e.g., `/kudos/[id]`)

**Checkpoint**: All card interactions functional

---

## Phase 7: User Story 5 — Hero Badge Tooltip (Priority: P3)

**Goal**: Hovering over hero badge stars shows tooltip with badge level description

**Independent Test**: Hover over star badge on a kudo card sender/receiver, verify tooltip appears with description

- [x] T021 [US5] Add tooltip component to hero badge in `src/components/kudos/kudo-card-header.tsx` — on hover over `heroBadge` stars, show tooltip with badge level name and description text from design (e.g., "Legend Hero — Có hơn 20 người gửi Kudos cho bạn...")

**Checkpoint**: Badge tooltip displays on hover

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design, edge cases, and visual polish

- [x] T022 [P] Verify responsive layout at 320px (1 card, no side arrows), 768px (2 cards), 1024px+ (3 cards) in `src/components/kudos/highlight-carousel.tsx`
- [x] T023 [P] Verify empty state message when no kudos match filters in `src/components/kudos/highlight-carousel.tsx`
- [x] T024 [P] Verify section padding matches responsive specs — `px-4 md:px-12 lg:px-20 xl:px-36` in `src/components/kudos/highlight-kudos.tsx`
- [x] T025 Run `yarn lint` to verify no TypeScript or ESLint errors across all modified files
- [x] T026 Visual review: compare implemented UI against Figma frame `2940:13431` for the highlight section

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 (seed data must exist for queries to return results)
- **Phase 3 (US1 - View)**: Depends on Phase 2 (data must load)
  - T007, T008 can run in parallel (different files)
  - T009 depends on T007 (card structure)
  - T010 depends on T009 (actions below body)
  - T011 depends on T007 (card wrapper changes)
- **Phase 4 (US2 - Hashtag Filter)**: Depends on Phase 2 (data + filters)
- **Phase 5 (US3 - Department Filter)**: Depends on Phase 2
  - US2 and US3 can run in PARALLEL (independent filter components)
- **Phase 6 (US4 - Interactions)**: Depends on Phase 3 (cards must render)
- **Phase 7 (US5 - Tooltip)**: Depends on Phase 3 (card header must exist)
  - US4 and US5 can run in PARALLEL
- **Phase 8 (Polish)**: Depends on all desired user stories

### Parallel Opportunities

Within Phase 3 (US1):
- T007 + T008 can run in parallel (different component files)
- T006 can run in parallel with T007/T008 (different component)

Between phases:
- Phase 4 (US2) + Phase 5 (US3) can run in parallel
- Phase 6 (US4) + Phase 7 (US5) can run in parallel
- Phase 8 tasks T022, T023, T024 can all run in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (data fix — **the blocker**)
2. Complete Phase 3 (US1 — visual correctness)
3. **STOP and VALIDATE**: Verify highlight kudos render with correct styling
4. Continue with Phase 4 + 5 (filters)

### Incremental Delivery

1. Phase 1 + 2: Seed data + query fix → Kudos now load
2. Phase 3: Header + card styling → Matches Figma
3. Phase 4 + 5: Filters → Functional filtering
4. Phase 6 + 7: Interactions + tooltips → Full interactivity
5. Phase 8: Polish → Production ready

---

## Notes

- The PRIMARY blocker is Phase 1+2: without seed data and query fixes, the entire section shows empty
- Most UI components already exist — this is primarily a styling fix + data fix task
- The `HashtagFilterDropdown` and `DepartmentFilterDropdown` may use CSS variables (`--dropdown-bg`, `--dropdown-border`) — verify these are defined in globals.css or replace with direct values
- The `getHighlightKudos` nested PostgREST filter (`query.eq("kudo.kudo_hashtags.hashtag_id", hashtagId)`) may not work correctly — test and potentially rewrite to use a different approach
