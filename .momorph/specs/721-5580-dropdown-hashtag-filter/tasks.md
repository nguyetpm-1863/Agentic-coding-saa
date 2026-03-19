# Tasks: Dropdown Hashtag Filter

**Frame**: `721:5580-Dropdown-Hashtag-filter`
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

## Phase 1: Setup (Types & i18n)

**Purpose**: Define the Hashtag type and add translation keys for all 13 hashtags.

- [x] T001 [P] Create Hashtag type definition: `export interface Hashtag { id: string; key: string; displayText: string; }` where `key` is the i18n key (e.g., `"hashtag.cong_hien"`) and `displayText` is the resolved display text (e.g., `"#Cong hien"`) | `src/types/hashtag.ts`
- [x] T002 [P] Add i18n keys for all 13 hashtags and the filter label to both VN and EN translation objects: `hashtag.filter.label` (VN: "Loc theo hashtag", EN: "Filter by hashtag"), `hashtag.toan_dien` (VN: "#Toan dien", EN: "#Comprehensive"), `hashtag.gioi_chuyen_mon` (VN: "#Gioi chuyen mon", EN: "#Expert"), `hashtag.hieu_suat_cao` (VN: "#Hieu suat cao", EN: "#High Performance"), `hashtag.truyen_cam_hung` (VN: "#Truyen cam hung", EN: "#Inspiring"), `hashtag.cong_hien` (VN: "#Cong hien", EN: "#Dedicated"), `hashtag.aim_high` ("#Aim High"), `hashtag.be_agile` ("#Be Agile"), `hashtag.wasshoi` ("#Wasshoi"), `hashtag.huong_muc_tieu` (VN: "#Huong muc tieu", EN: "#Goal Oriented"), `hashtag.huong_khach_hang` (VN: "#Huong khach hang", EN: "#Customer Focused"), `hashtag.chuan_quy_trinh` (VN: "#Chuan quy trinh", EN: "#Process Standard"), `hashtag.giai_phap_sang_tao` (VN: "#Giai phap sang tao", EN: "#Creative Solutions"), `hashtag.quan_ly_xuat_sac` (VN: "#Quan ly xuat sac", EN: "#Excellent Management") | `src/libs/i18n/translations.ts`

**Checkpoint**: Hashtag type and all i18n keys ready for component implementation.

---

## Phase 2: User Story 1 -- Filter Kudos by Hashtag (Priority: P1) MVP

**Goal**: User can open the hashtag filter dropdown, see all 13 hashtags in a scrollable list, and select one to filter the kudos feed. Single-select behavior with proper visual feedback.

**Independent Test**: Click the hashtag filter trigger, verify dropdown opens showing 13 hashtags in a scrollable container (dark bg `#00070C`, gold border `#998C5F`, 8px radius). Select a hashtag, verify it shows selected state (gold bg 20% + gold glow text), verify `onSelect` callback fires with correct hashtag ID, verify dropdown closes.

- [x] T003 [US1] Create HashtagFilterDropdown Client Component: `'use client'` directive; accept props `hashtags: Hashtag[]`, `selectedHashtag: string | null`, `onSelect: (hashtag: string | null) => void`; use `useDropdown` hook with `{ itemCount: hashtags.length, role: 'listbox' }` (selection pattern); render trigger button displaying current filter text or default label; render dropdown container: `absolute z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[400px]`; render each hashtag item: `h-14 px-4 rounded flex items-center cursor-pointer whitespace-nowrap`; selected state: `bg-[#FFEA9E]/20 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`; default state: `bg-transparent text-white`; hover state: `bg-[#FFEA9E]/10 transition-colors duration-150 ease-in-out`; typography: `font-montserrat text-base font-bold tracking-[0.5px]` (note: 0.5px NOT 0.15px); on item click: call `onSelect(hashtag.id)` then close dropdown | `src/components/live-board/hashtag-filter-dropdown.tsx`
- [x] T004 [US1] Add scrollbar styling to HashtagFilterDropdown container: apply `scrollbar-width: thin; scrollbar-color: #998C5F #00070C` for Firefox; add WebKit scrollbar custom styles (`::-webkit-scrollbar` with thin width, dark track, gold-muted thumb) for Chrome/Safari; can be applied via inline style or a utility class in globals.css | `src/components/live-board/hashtag-filter-dropdown.tsx`
- [x] T005 [US1] Add open/close animation: render dropdown list when `isOpen || isClosing` is true; apply `animate-dropdown-open` when `isOpen && !isClosing`; apply `animate-dropdown-close` when `isClosing` | `src/components/live-board/hashtag-filter-dropdown.tsx`

**Checkpoint**: Hashtag filter dropdown displays all 13 items, scrollable, with single-select filtering.

---

## Phase 3: User Story 2 -- Clear Hashtag Filter (Priority: P2)

**Goal**: User can clear the active hashtag filter by clicking the already-selected hashtag, restoring the unfiltered feed view.

**Independent Test**: Select a hashtag (verify selected state), click the same hashtag again, verify it deselects (returns to default state), verify `onSelect(null)` is called, verify feed shows all posts.

- [x] T006 [US2] Implement toggle/deselect behavior: in the item click handler, check if `hashtag.id === selectedHashtag`; if true, call `onSelect(null)` to clear filter; if false, call `onSelect(hashtag.id)` to select new; deselected item immediately returns to default visual state (transparent bg, no glow) | `src/components/live-board/hashtag-filter-dropdown.tsx`

**Checkpoint**: Users can both select and deselect hashtag filters.

---

## Phase 4: User Story 3 -- Scroll Through Options (Priority: P3)

**Goal**: All 13 hashtags are accessible via smooth scroll, including keyboard-driven scroll-into-view.

**Independent Test**: Open dropdown, verify scrollbar appears (13 items at 56px = 728px, max-height 400px shows ~7 items). Scroll to the last item (#Quan ly xuat sac), verify it is visible and selectable. Use keyboard ArrowDown to navigate past visible items, verify focused item scrolls into view.

- [x] T007 [US3] Verify scroll behavior: confirm container `max-height: 400px` with `overflow-y: auto` enables scroll for 13 items; confirm touch scroll works on mobile (native behavior); verify keyboard navigation triggers scroll-into-view via `useDropdown` hook's `activeIndex` change callback (`element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })`) | `src/components/live-board/hashtag-filter-dropdown.tsx`

**Checkpoint**: All user stories complete -- hashtag filter with select, deselect, and scroll.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: ARIA attributes, focus indicators, responsive adjustments, and accessibility audit.

- [x] T008 [P] Apply ARIA attributes from `useDropdown` hook: spread `triggerProps` on trigger button (`aria-expanded`, `aria-haspopup="listbox"`); spread `listProps` on dropdown container (`role="listbox"`, add `aria-label="Filter by hashtag"`); spread `getItemProps(index)` on each item (`role="option"`, `aria-selected` on currently selected hashtag, `tabIndex`); add focus indicator: `outline-2 outline-offset-2 outline-[#FFEA9E]` on focus-visible | `src/components/live-board/hashtag-filter-dropdown.tsx`
- [x] T009 [P] Verify keyboard navigation: `Enter`/`Space` on trigger opens dropdown; `ArrowDown`/`ArrowUp` navigates items with wrapping through all 13 items; `Enter` on item selects/deselects hashtag; `Escape` closes dropdown and returns focus to trigger | `src/components/live-board/hashtag-filter-dropdown.tsx`
- [x] T010 [P] Verify responsive positioning: on mobile, dropdown may need adjusted positioning or full-width to avoid viewport overflow; touch scroll enabled for the list; all touch targets 56px height (exceeds 44px minimum) | `src/components/live-board/hashtag-filter-dropdown.tsx`
- [x] T011 Run `yarn lint` and fix any ESLint errors across all new files | `src/types/hashtag.ts`, `src/components/live-board/hashtag-filter-dropdown.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Language Selector Phase 1 (shared hook + CSS tokens)
         |
         v
Phase 1 (Setup) --> Phase 2 (US1 Filter MVP) --> Phase 3 (US2 Clear) --> Phase 4 (US3 Scroll) --> Phase 5 (Polish)
```

- **EXTERNAL DEPENDENCY**: Shared `useDropdown` hook (`src/hooks/use-dropdown.ts`) and dropdown CSS tokens in `globals.css` MUST exist before starting. These are created in the Language Selector tasks (721:4942) Phase 1.
- **Phase 1 (Setup)**: Depends on shared infrastructure only. Type + i18n keys.
- **Phase 2 (US1)**: Depends on Phase 1. This is the MVP.
- **Phase 3 (US2)**: Depends on Phase 2 (component must exist to add toggle behavior).
- **Phase 4 (US3)**: Depends on Phase 2 (scroll behavior is built into the container from Phase 2, this is verification + keyboard scroll).
- **Phase 5 (Polish)**: Depends on all user stories being complete.

### Parallel Opportunities

**Phase 1**: T001 and T002 can run in parallel (type definition vs i18n keys).
**Phase 2**: T003 must complete first. T004 and T005 can run in parallel after T003 (scrollbar styling vs animation).
**Phase 3**: Single task (T006), sequential.
**Phase 4**: Single task (T007), sequential.
**Phase 5**: T008, T009, T010 can all run in parallel. T011 depends on all others.

---

## Implementation Strategy

### MVP First (Recommended)

1. Verify Language Selector Phase 1 is complete (shared hook exists)
2. Complete Phase 1 (Types + i18n)
3. Complete Phase 2 (US1 -- Filter by hashtag)
4. **STOP and VALIDATE**: Test dropdown shows 13 scrollable hashtags with single-select
5. Deploy if ready

### Incremental Delivery

1. Phase 1 (Setup) --> Types ready
2. Phase 2 (US1 Filter) --> Test --> Deploy (MVP)
3. Phase 3 (US2 Clear filter) --> Test --> Deploy
4. Phase 4 (US3 Scroll verification) --> Test --> Deploy
5. Phase 5 (Polish) --> Test --> Deploy (final)

---

## Notes

- Letter-spacing is `0.5px` for hashtag items, NOT `0.15px` as in profile/language dropdowns. This matches the `--text-body` token from design-style.md.
- The hashtag list is passed as props from a Server Component parent (Kudos Live Board). The dropdown does NOT own the data or the filter state -- it is a controlled component.
- The parent Live Board component may not exist yet. Build the dropdown as standalone; test with a mock parent passing fixture data.
- `onSelect` fires on every click. The parent is responsible for filtering the feed and re-rendering.
- The Hashtag and Department dropdowns are nearly identical. A shared `<FilterDropdown />` could be extracted later per Principle VII (Simplicity) -- only after both exist and duplication is confirmed.
- Mark tasks complete as you go: `[x]`
