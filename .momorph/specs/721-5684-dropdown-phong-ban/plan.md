# Implementation Plan: Dropdown Department Filter (Phong ban)

**Frame**: `721:5684-Dropdown-Phong-ban`
**Date**: 2026-03-09
**Spec**: `specs/721-5684-dropdown-phong-ban/spec.md`

---

## Summary

Build the Department Filter Dropdown for the Kudos Live Board Highlight section. It displays a scrollable list of 50 organizational departments fetched from the Supabase database, allowing single-select filtering of the kudos feed. The component shares the same design system and structure as the Hashtag Filter dropdown but handles a significantly larger dataset (50 items vs 13). Department names are organizational codes (not translated). Filter state is lifted to the parent Live Board component. Uses the shared `useDropdown` hook and shared dropdown CSS tokens.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr
**Database**: Supabase (departments table — list of organizational units)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: Local client state (isOpen via useDropdown), parent state for feed filtering
**API Style**: Server Component data fetching from Supabase DB, passed as props

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (Supabase, React, Tailwind — no new deps)
- [x] Adheres to folder structure guidelines (feature component in `src/components/live-board/`)
- [x] Meets security requirements (Principle IV: Data from Supabase with RLS, no user input)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: Department list fetched server-side, passed as props)
- [x] Mobile-first responsive (Principle V: 56px touch targets > 44px, touch scroll)
- [x] Edge-compatible (Principle VI: No Node.js APIs, Supabase SSR is edge-compatible)
- [x] Simplicity (Principle VII: Standard scroll for 50 items, no virtualization unless measured need)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**:
  - `src/components/live-board/department-filter-dropdown.tsx` — Client Component with `'use client'`
  - Accepts `departments: Department[]`, `selectedDepartment: string | null`, `onSelect: (department: string | null) => void`
  - Uses `useDropdown` hook for dropdown mechanics
- **Styling Strategy**: Tailwind CSS 4 with shared dropdown tokens. Same `letter-spacing: 0.5px` as Hashtag Filter. Container `max-height: 360px` (348px content + 12px padding) for scroll area.
- **Data Fetching**: Department list fetched server-side from Supabase `departments` table by the parent Live Board Server Component.

### Backend Approach

- **API Design**: No custom endpoint. Data fetched directly from Supabase in Server Component.
- **Data Access**: `@/libs/supabase/server.ts` for server-side query: `supabase.from('departments').select('id, name').order('name')`.
- **Validation**: RLS on `departments` table ensures only authorized data is returned.

### Integration Points

- **Existing Services**: Supabase DB (`departments` table)
- **Shared Components**:
  - `useDropdown` hook from `src/hooks/use-dropdown.ts`
  - Shared dropdown CSS custom properties from `globals.css`
  - Near-identical structure to Hashtag Filter dropdown
- **API Contracts**: Parent component interface: `{ departments: Department[], selectedDepartment: string | null, onSelect: (department: string | null) => void }`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5684-dropdown-phong-ban/
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
├── components/
│   └── live-board/
│       └── department-filter-dropdown.tsx  # DepartmentFilterDropdown Client Component
├── types/
│   └── department.ts                       # Department type definition

# Database
supabase/
└── migrations/
    └── YYYYMMDDHHMMSS_create_departments.sql  # Departments table migration

# Test Files
tests/
├── unit/
│   └── department-filter-dropdown.test.tsx  # Component unit tests
└── e2e/
    └── department-filter-dropdown.spec.ts   # Playwright E2E tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

---

## Implementation Strategy

### Phase 0: Database Schema

**Purpose**: Create the departments table in Supabase.

1. **Create migration `supabase/migrations/YYYYMMDDHHMMSS_create_departments.sql`**:
   ```sql
   CREATE TABLE public.departments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL UNIQUE,
     created_at TIMESTAMPTZ DEFAULT now() NOT NULL
   );

   -- Enable RLS
   ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

   -- Allow authenticated users to read departments
   CREATE POLICY "Authenticated users can read departments"
     ON public.departments
     FOR SELECT
     TO authenticated
     USING (true);
   ```

2. **Seed data** in `supabase/seeds/common/departments.sql`:
   - Insert all 50 department codes from the spec

3. **Define `src/types/department.ts`**:
   ```typescript
   export interface Department {
     id: string;
     name: string;
   }
   ```

### Phase 1: User Story 1 — Filter Kudos by Department (P1, MVP)

**Purpose**: Core single-select department filtering.

1. **Create `src/components/live-board/department-filter-dropdown.tsx`**:
   - `'use client'` directive
   - Props: `departments: Department[]`, `selectedDepartment: string | null`, `onSelect: (department: string | null) => void`
   - Use `useDropdown` hook with `itemCount: departments.length, role: 'listbox'` (selection pattern — user selects a value from a list)
   - Trigger button: displays current filter text or default label
   - Container: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[360px]`
   - Items: 56px height, 16px horizontal padding, 4px radius, `white-space: nowrap`
   - Selected state: `bg-[#FFEA9E]/20` + gold text shadow
   - Default/hover states: same as Hashtag Filter
   - Typography: Montserrat 16px/24px bold, `letter-spacing: 0.5px`
   - On item click: call `onSelect(department.id)` to lift state to parent, then close the dropdown (per FR-005: "Dropdown MUST close on selection")
   - Single-select behavior

2. **Scrollbar styling**:
   - `scrollbar-width: thin; scrollbar-color: #998C5F #00070C`
   - WebKit scrollbar styles for cross-browser consistency

### Phase 2: User Story 2 — Scroll Through Departments (P2)

**Purpose**: Ensure all 50 items are smoothly scrollable.

1. **Scroll behavior**:
   - Container `max-height: 360px` with `overflow-y: auto`
   - 50 items at 56px each = 2800px total scroll height; ~6 items visible
   - Standard native scroll (no virtualization per Principle VII)
   - Touch scroll enabled on mobile

2. **Keyboard scroll-into-view**:
   - ArrowDown/ArrowUp navigation scrolls the focused item into view
   - `element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })`

3. **Performance check**:
   - 50 DOM elements at 56px is trivial for modern browsers
   - If measured performance is poor (unlikely), consider virtualization as optimization

### Phase 3: User Story 3 — Clear Department Filter (P3)

**Purpose**: Allow removing the active filter.

1. **Toggle behavior**: Click selected department again to deselect
   - If `department.id === selectedDepartment`, call `onSelect(null)`
   - Otherwise call `onSelect(department.id)`

### Phase 4: Polish

1. **Animations**: Open/close with opacity + translateY, 150ms/100ms
2. **ARIA**: `role="listbox"`, `role="option"`, `aria-selected`
3. **Focus indicators**: `outline: 2px solid #FFEA9E, offset: 2px`
4. **Responsive**: On mobile, container width auto-expands for long department names (e.g., "CEVC1 - DSV - UI/UX 1"). Positioned to avoid viewport overflow.
5. **Loading state**: Show skeleton or spinner while departments are being fetched (if fetch is async in parent)

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Departments table not yet in Supabase schema | High | Med | Create migration as Phase 0; can use static list as interim |
| Scroll performance with 50 items | Low | Low | 50 items is trivial; measure first, optimize only if needed |
| Long department names overflow on mobile | Med | Low | `white-space: nowrap` + auto width; test with longest names |
| Department list changes (org restructure) | Low | Low | Fetched from DB, not hardcoded; updates are automatic |
| Parent Live Board component not yet built | High | Med | Build dropdown as standalone; integration when Live Board exists |

### Estimated Complexity

- **Frontend**: Low — Scrollable dropdown with single-select (near-identical to Hashtag Filter)
- **Backend**: Low — Simple table + RLS + seed data
- **Testing**: Low — Standard dropdown + scroll tests

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: DepartmentFilterDropdown + useDropdown hook + parent onSelect
- [ ] **External dependencies**: Supabase DB (departments table)
- [x] **Data layer**: Departments table read via Supabase client
- [x] **User workflows**: Open dropdown, scroll, select department, verify callback

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Item click triggers onSelect, selection state updates |
| Service <-> Service | No | — |
| App <-> External API | No | — |
| App <-> Data Layer | Yes | Server Component fetches from departments table |
| Cross-platform | Yes | Touch scroll, responsive width for long names |

### Test Environment

- **Environment type**: Local (Vitest for unit, Playwright for E2E, Supabase local for integration)
- **Test data strategy**: Mock department list fixture (50 items) for unit tests; seeded DB for integration
- **Isolation approach**: Fresh DOM per unit test; seeded DB state for integration tests

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Department data | Fixture (unit) / Real DB (integration) | Unit tests use fixture; integration tests use seeded Supabase |
| onSelect callback | Mock (vi.fn()) | Verify call arguments |
| useDropdown hook | Real | Test integration |
| Supabase client | Mock (unit) / Real (integration) | Isolate component logic in unit tests |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open dropdown shows all 50 departments
   - [ ] Click department calls onSelect with correct ID and closes dropdown
   - [ ] Selected department shows gold background and glow
   - [ ] Scroll to last department, verify it is selectable

2. **Error Handling**
   - [ ] Empty department list renders empty dropdown
   - [ ] Supabase fetch failure in parent shows loading/error state

3. **Edge Cases**
   - [ ] Click selected department calls onSelect(null) to clear filter
   - [ ] Keyboard navigation through all 50 items with scroll-into-view
   - [ ] Long department names ("CEVC1 - DSV - UI/UX 1") render correctly
   - [ ] Outside click closes dropdown without changing filter
   - [ ] Escape closes dropdown

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react, Supabase local
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Selection/deselection logic | 95%+ | High |
| Scroll behavior (50 items) | 80%+ | Medium |
| Keyboard navigation | 90%+ | High |
| DB integration (departments fetch) | 85%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined — props interface + DB schema
- [ ] Database migrations planned — departments table (Phase 0 of this plan)

### External Dependencies

- `useDropdown` hook from Language Selector plan (Phase 0) must be implemented first
- Shared dropdown CSS tokens in `globals.css` must exist
- Supabase local running (`make up`) for migration and seed testing
- Kudos Live Board parent component (can be stubbed for testing)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation (Phase 0 DB migration can start immediately; UI depends on shared hook)

---

## Notes

- **Near-identical to Hashtag Filter**: The Department and Hashtag dropdowns share the same design tokens, item height, scroll behavior, and interaction patterns. The key differences are: (1) department list comes from DB instead of static/semi-static data, (2) 50 items instead of 13, (3) `max-height: 360px` instead of `400px`, (4) department names are not translated.
- **No virtualization**: 50 items at 56px each = 2800px of scroll content. This is well within browser rendering capabilities. Per Principle VII (Simplicity), standard scroll is used. Virtualization (e.g., react-window) should only be added if performance profiling shows jank.
- **Department names are organizational codes**: They are NOT translated. The same code (e.g., "CEVC2", "STVC - R&D") is displayed regardless of the selected locale.
- **Shared FilterDropdown extraction**: After implementing both Hashtag and Department dropdowns, if the code duplication is significant, a shared `<FilterDropdown />` component can be extracted. This is a refactoring step, not a prerequisite.
- **Database migration is Phase 0**: The departments table must exist before the parent Server Component can fetch data. The migration and seed data should be created early, even before the UI work begins.
