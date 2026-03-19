# Tasks: Dropdown Department Filter (Phong ban)

**Frame**: `721:5684-Dropdown-Phong-ban`
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

## Phase 1: Setup (Database Schema, Types & i18n)

**Purpose**: Create the departments table in Supabase, define the Department type, and add translation keys. The database migration is Phase 0 from the plan because the parent Server Component needs to fetch department data.

- [x] T001 [P] Create Supabase migration for departments table: `CREATE TABLE public.departments (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, name TEXT NOT NULL UNIQUE, created_at TIMESTAMPTZ DEFAULT now() NOT NULL);`; enable RLS: `ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;`; create read policy for authenticated users: `CREATE POLICY "Authenticated users can read departments" ON public.departments FOR SELECT TO authenticated USING (true);` | `supabase/migrations/YYYYMMDDHHMMSS_create_departments.sql`
- [x] T002 [P] Create seed data with all 50 department codes: CTO, SPD, FCOV, CEVC1, CEVC2, STVC - R&D, CEVC2 - CySS, FCOV - LRM, CEVC2 - System, OPDC - HRF, CEVC1 - DSV - UI/UX 1, CEVC1 - DSV, CEVEC, OPDC - HRD - C&C, STVC, FCOV - F&A, CEVC1 - DSV - UI/UX 2, CEVC1 - AIE, OPDC - HRF - C&B, FCOV - GA, FCOV - ISO, STVC - EE, GEU - HUST, CEVEC - SAPD, OPDC - HRF - OD, CEVEC - GSD, GEU - TM, STVC - R&D - DTR, STVC - R&D - DPS, CEVC3, STVC - R&D - AIR, CEVC4, PAO, GEU, GEU - DUT, OPDC - HRD - L&D, OPDC - HRD - TI, OPDC - HRF - TA, GEU - UET, STVC - R&D - SDX, OPDC - HRD - HRBP, PAO - PEC, IAV, STVC - Infra, CPV - CGP, GEU - UIT, OPDC - HRD, BDV, CPV, PAO - PAO; use INSERT INTO with all 50 rows | `supabase/seeds/common/departments.sql`
- [x] T003 [P] Create Department type definition: `export interface Department { id: string; name: string; }` | `src/types/department.ts`
- [x] T004 [P] Add i18n key for the filter label: `department.filter.label` (VN: "Loc theo phong ban", EN: "Filter by department") to both VN and EN translation objects; note: department names themselves are NOT translated (organizational codes) | `src/libs/i18n/translations.ts`

**Checkpoint**: Database schema, seed data, type definition, and i18n key all ready. Run `make up` to apply migration and seeds.

---

## Phase 2: User Story 1 -- Filter Kudos by Department (Priority: P1) MVP

**Goal**: User can open the department filter dropdown, see all 50 departments in a scrollable list, and select one to filter the kudos feed. Single-select with proper visual feedback.

**Independent Test**: Click the department filter trigger, verify dropdown opens showing departments in a scrollable container (dark bg `#00070C`, gold border `#998C5F`, 8px radius, max-height 360px). Select "CEVC2", verify it shows selected state (gold bg 20% + gold glow text), verify `onSelect` callback fires with correct department ID, verify dropdown closes.

- [x] T005 [US1] Create DepartmentFilterDropdown Client Component: `'use client'` directive; accept props `departments: Department[]`, `selectedDepartment: string | null`, `onSelect: (department: string | null) => void`; use `useDropdown` hook with `{ itemCount: departments.length, role: 'listbox' }` (selection pattern); render trigger button displaying current filter text or default label; render dropdown container: `absolute z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[360px]`; render each department item: `h-14 px-4 rounded flex items-center cursor-pointer whitespace-nowrap`; selected state: `bg-[#FFEA9E]/20 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`; default state: `bg-transparent text-white`; hover state: `bg-[#FFEA9E]/10 transition-colors duration-150 ease-in-out`; typography: `font-montserrat text-base font-bold tracking-[0.5px]` (note: 0.5px NOT 0.15px); on item click: call `onSelect(department.id)` then close dropdown | `src/components/live-board/department-filter-dropdown.tsx`
- [x] T006 [US1] Add scrollbar styling to DepartmentFilterDropdown container: apply `scrollbar-width: thin; scrollbar-color: #998C5F #00070C` for Firefox; add WebKit scrollbar custom styles (`::-webkit-scrollbar` with thin width, dark track `#00070C`, gold-muted thumb `#998C5F`) for Chrome/Safari | `src/components/live-board/department-filter-dropdown.tsx`
- [x] T007 [US1] Add open/close animation: render dropdown list when `isOpen || isClosing` is true; apply `animate-dropdown-open` when `isOpen && !isClosing`; apply `animate-dropdown-close` when `isClosing` | `src/components/live-board/department-filter-dropdown.tsx`

**Checkpoint**: Department filter dropdown displays all 50 items in a scrollable list with single-select filtering.

---

## Phase 3: User Story 2 -- Scroll Through Departments (Priority: P2)

**Goal**: All 50 departments are smoothly scrollable with keyboard-driven scroll-into-view. Performance remains smooth.

**Independent Test**: Open dropdown, verify scrollbar appears (50 items at 56px = 2800px, max-height 360px shows ~6 items). Scroll to the last department (PAO - PAO), verify it is visible and selectable. Use keyboard ArrowDown to navigate past visible items, verify focused item scrolls into view smoothly.

- [x] T008 [US2] Verify scroll behavior: confirm container `max-height: 360px` with `overflow-y: auto` enables scroll for 50 items; confirm touch scroll works on mobile (native behavior); verify keyboard navigation triggers scroll-into-view via `useDropdown` hook's `activeIndex` change callback; verify no jank or performance issues with 50 DOM elements (standard scroll, no virtualization needed per Principle VII) | `src/components/live-board/department-filter-dropdown.tsx`

**Checkpoint**: 50 departments are all accessible via smooth scroll with keyboard support.

---

## Phase 4: User Story 3 -- Clear Department Filter (Priority: P3)

**Goal**: User can clear the active department filter by clicking the already-selected department.

**Independent Test**: Select "CEVC2" (verify selected state), click "CEVC2" again, verify it deselects (returns to default state), verify `onSelect(null)` is called.

- [x] T009 [US3] Implement toggle/deselect behavior: in the item click handler, check if `department.id === selectedDepartment`; if true, call `onSelect(null)` to clear filter; if false, call `onSelect(department.id)` to select new; deselected item immediately returns to default visual state | `src/components/live-board/department-filter-dropdown.tsx`

**Checkpoint**: All user stories complete -- department filter with select, scroll, and deselect.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: ARIA attributes, focus indicators, responsive adjustments, and long department name handling.

- [x] T010 [P] Apply ARIA attributes from `useDropdown` hook: spread `triggerProps` on trigger button (`aria-expanded`, `aria-haspopup="listbox"`); spread `listProps` on dropdown container (`role="listbox"`, add `aria-label="Filter by department"`); spread `getItemProps(index)` on each item (`role="option"`, `aria-selected` on currently selected department, `tabIndex`); add focus indicator: `outline-2 outline-offset-2 outline-[#FFEA9E]` on focus-visible | `src/components/live-board/department-filter-dropdown.tsx`
- [x] T011 [P] Verify keyboard navigation: `Enter`/`Space` on trigger opens dropdown; `ArrowDown`/`ArrowUp` navigates items with wrapping through all 50 items; `Enter` on item selects/deselects department; `Escape` closes dropdown and returns focus to trigger; verify scroll-into-view on keyboard navigation for off-screen items | `src/components/live-board/department-filter-dropdown.tsx`
- [x] T012 [P] Verify responsive behavior: on mobile, container width auto-expands for long department names (e.g., "CEVC1 - DSV - UI/UX 1", "OPDC - HRD - HRBP"); positioned to avoid viewport overflow; touch scroll enabled; all touch targets 56px height (exceeds 44px minimum) | `src/components/live-board/department-filter-dropdown.tsx`
- [x] T013 Run `yarn lint` and fix any ESLint errors across all new files | `src/types/department.ts`, `src/components/live-board/department-filter-dropdown.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Language Selector Phase 1 (shared hook + CSS tokens)
         |
         v
Phase 1 (Setup: DB + Types) --> Phase 2 (US1 Filter MVP) --> Phase 3 (US2 Scroll) --> Phase 4 (US3 Clear) --> Phase 5 (Polish)
```

- **EXTERNAL DEPENDENCY**: Shared `useDropdown` hook (`src/hooks/use-dropdown.ts`) and dropdown CSS tokens in `globals.css` MUST exist before starting Phase 2. These are created in the Language Selector tasks (721:4942) Phase 1.
- **Phase 1 (Setup)**: Database migration and types can start immediately (no dependency on shared hook). i18n keys need translations module.
- **Phase 2 (US1)**: Depends on Phase 1 (types must exist) AND shared hook. This is the MVP.
- **Phase 3 (US2)**: Depends on Phase 2 (component must exist to verify scroll).
- **Phase 4 (US3)**: Depends on Phase 2 (component must exist to add toggle behavior).
- **Phase 5 (Polish)**: Depends on all user stories being complete.

### Parallel Opportunities

**Phase 1**: T001, T002, T003, T004 can ALL run in parallel (4 independent files: migration, seed, type, i18n).
**Phase 2**: T005 must complete first. T006 and T007 can run in parallel after T005 (scrollbar vs animation).
**Phase 3**: Single task (T008), sequential.
**Phase 4**: Single task (T009), sequential. Note: Phase 3 and Phase 4 could run in parallel since they modify different code sections.
**Phase 5**: T010, T011, T012 can all run in parallel. T013 depends on all others.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (DB migration can start immediately, parallel with Language Selector)
2. Verify Language Selector Phase 1 is complete (shared hook exists)
3. Complete Phase 2 (US1 -- Filter by department)
4. **STOP and VALIDATE**: Test dropdown shows 50 scrollable departments with single-select
5. Deploy if ready

### Incremental Delivery

1. Phase 1 (Setup: DB + Types) --> Run `make up` to apply migration
2. Phase 2 (US1 Filter) --> Test --> Deploy (MVP)
3. Phase 3 (US2 Scroll) --> Test --> Deploy
4. Phase 4 (US3 Clear filter) --> Test --> Deploy
5. Phase 5 (Polish) --> Test --> Deploy (final)

---

## Notes

- The Department dropdown is near-identical to the Hashtag Filter dropdown. Key differences: (1) data comes from Supabase DB (not static), (2) 50 items instead of 13, (3) `max-height: 360px` instead of `400px`, (4) department names are organizational codes and are NOT translated.
- Database migration (T001) and seed data (T002) can start immediately, even before the shared hook is ready. This parallelizes well with Language Selector Phase 1.
- The Figma content area is 101x348px (narrow), but actual implementation uses `auto`/`fit-content` width to accommodate long department names like "CEVC1 - DSV - UI/UX 1".
- 50 items at 56px = 2800px scroll height. Standard scroll is sufficient per Principle VII (Simplicity). Virtualization should only be added if performance profiling shows jank.
- After both Hashtag and Department dropdowns are implemented, a shared `<FilterDropdown />` base component could be extracted if duplication warrants it.
- Mark tasks complete as you go: `[x]`
