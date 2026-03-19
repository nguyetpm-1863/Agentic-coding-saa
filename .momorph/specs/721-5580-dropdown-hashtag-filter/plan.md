# Implementation Plan: Dropdown Hashtag Filter

**Frame**: `721:5580-Dropdown-Hashtag-filter`
**Date**: 2026-03-09
**Spec**: `specs/721-5580-dropdown-hashtag-filter/spec.md`

---

## Summary

Build the Hashtag Filter Dropdown for the Kudos Live Board Highlight section. It displays a scrollable list of 13 recognition-related hashtags, allowing single-select filtering of the kudos feed. The component shares the common dark/gold dropdown design system with added scroll behavior for the longer list. Filter state is lifted to the parent Live Board component to trigger feed updates. Uses the shared `useDropdown` hook for open/close, keyboard navigation, and ARIA management.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4
**Database**: Supabase (hashtag data — potentially fetched from DB or passed as props from server)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: Local client state (isOpen, selectedHashtag via useDropdown), parent state for feed filtering
**API Style**: Props-based (hashtag list passed from Server Component parent)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (React, Tailwind — no new deps)
- [x] Adheres to folder structure guidelines (feature component in `src/components/live-board/`)
- [x] Meets security requirements (Principle IV: No user input to sanitize; data from server)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: Hashtag list fetched server-side, passed as props)
- [x] Mobile-first responsive (Principle V: 56px touch targets > 44px, touch scroll)
- [x] Edge-compatible (Principle VI: No Node.js APIs)
- [x] Simplicity (Principle VII: Standard scroll, no virtualization unless measured need)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**:
  - `src/components/live-board/hashtag-filter-dropdown.tsx` — Client Component with `'use client'`
  - Accepts `hashtags: Hashtag[]` (list from server), `selectedHashtag: string | null`, `onSelect: (hashtag: string | null) => void`
  - Uses `useDropdown` hook for dropdown mechanics
- **Styling Strategy**: Tailwind CSS 4 with shared dropdown tokens. Notable difference: `letter-spacing: 0.5px` (vs 0.15px for profile/language dropdowns).
- **Data Fetching**: Hashtag list fetched server-side in the parent Kudos Live Board Server Component and passed as props. Not hardcoded in the client component per TR-002.

### Backend Approach

- **API Design**: No custom endpoint initially. Hashtag list can be stored in a Supabase `hashtags` table or as a server-side constant until the database schema is finalized.
- **Data Access**: Parent Server Component fetches hashtags from Supabase DB (or uses a constant list as interim).
- **Validation**: N/A — hashtag list is server-provided, not user input.

### Integration Points

- **Existing Services**: Supabase DB (hashtags table, TBD)
- **Shared Components**:
  - `useDropdown` hook from `src/hooks/use-dropdown.ts`
  - Shared dropdown CSS custom properties from `globals.css`
- **API Contracts**: Parent component interface: `{ hashtags: Hashtag[], selectedHashtag: string | null, onSelect: (hashtag: string | null) => void }`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5580-dropdown-hashtag-filter/
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
│       └── hashtag-filter-dropdown.tsx  # HashtagFilterDropdown Client Component
├── types/
│   └── hashtag.ts                       # Hashtag type definition

# Test Files
tests/
├── unit/
│   └── hashtag-filter-dropdown.test.tsx  # Component unit tests
└── e2e/
    └── hashtag-filter-dropdown.spec.ts   # Playwright E2E tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

---

## Implementation Strategy

### Phase 1: User Story 1 — Filter Kudos by Hashtag (P1, MVP)

**Purpose**: Core single-select hashtag filtering.

1. **Define `src/types/hashtag.ts`**:
   ```typescript
   export interface Hashtag {
     id: string;
     key: string;       // i18n key, e.g., "hashtag.cong_hien"
     displayText: string; // Resolved display text, e.g., "#Cong hien"
   }
   ```

2. **Create `src/components/live-board/hashtag-filter-dropdown.tsx`**:
   - `'use client'` directive
   - Props: `hashtags: Hashtag[]`, `selectedHashtag: string | null`, `onSelect: (hashtag: string | null) => void`
   - Use `useDropdown` hook with `itemCount: hashtags.length, role: 'listbox'` (selection pattern — user selects a value from a list)
   - Trigger button: displays current filter text or default label
   - Container: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[400px]`
   - Items: 56px height, 16px horizontal padding, 4px radius
   - Selected state: `bg-[#FFEA9E]/20` + gold text shadow
   - Default state: `bg-transparent text-white`
   - Hover state: `bg-[#FFEA9E]/10`
   - Typography: Montserrat 16px/24px bold, `letter-spacing: 0.5px`, `white-space: nowrap`
   - On item click: call `onSelect(hashtag.id)` to lift filter state to parent, then close the dropdown (per FR-005: "Dropdown MUST close on selection"). Note: deselecting the current hashtag keeps the dropdown open — see Phase 2.
   - Single-select: clicking a different item deselects the previous one

3. **Scrollbar styling**:
   - Thin scrollbar with dark track and gold-muted thumb
   - CSS: `scrollbar-width: thin; scrollbar-color: #998C5F #00070C`
   - WebKit: `::-webkit-scrollbar` custom styles for cross-browser support

### Phase 2: User Story 2 — Clear Hashtag Filter (P2)

**Purpose**: Allow removing the active filter.

1. **Toggle behavior**: Clicking the already-selected hashtag deselects it
   - On click: if `hashtag.id === selectedHashtag`, call `onSelect(null)` (clear filter) and **keep the dropdown open** so the user sees the deselection feedback
   - Otherwise call `onSelect(hashtag.id)` (select new) and **close the dropdown** (per FR-005)
   - **Decision**: Deselect keeps the dropdown open; selecting a new hashtag closes it. This ensures the user gets visual confirmation when clearing a filter without having to reopen the dropdown.
2. **Visual feedback**: Deselected item returns to default state immediately

### Phase 3: User Story 3 — Scroll Through Options (P3)

**Purpose**: Ensure all 13 items are accessible via scroll.

1. **Scroll behavior**:
   - Container `max-height: 400px` with `overflow-y: auto`
   - 13 items at 56px each = 728px total; approximately 7 items visible at once
   - Smooth scroll on touch devices (already native behavior)
2. **Keyboard scroll-into-view**:
   - When navigating with ArrowDown/ArrowUp, the focused item MUST scroll into view
   - Use `element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })` in the `useDropdown` hook's activeIndex change callback

### Phase 4: Polish

1. **Animations**: Open/close with opacity + translateY, 150ms/100ms
2. **ARIA**: `role="listbox"` on container, `role="option"` on items, `aria-selected` on active
3. **Focus indicators**: `outline: 2px solid #FFEA9E, offset: 2px`
4. **Responsive**: On mobile, may need adjusted positioning or full-width. Touch scroll enabled.
5. **Empty state**: If no hashtags provided, show nothing (edge case unlikely since list is static)

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Hashtag data source not yet defined | Med | Med | Use static constant list initially; migrate to Supabase when schema ready |
| Scroll performance with 13 items | Low | Low | 13 items is trivial; no virtualization needed per Principle VII |
| Long hashtag text overflow | Low | Low | `white-space: nowrap` + `fit-content` width; container auto-expands |
| Parent Live Board component not yet built | High | Med | Build dropdown as standalone; integration tested when Live Board exists |

### Estimated Complexity

- **Frontend**: Low — Single scrollable dropdown with single-select
- **Backend**: Low — Static list or simple DB query
- **Testing**: Low — Standard dropdown interaction tests

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: HashtagFilterDropdown + useDropdown hook + parent onSelect callback
- [ ] **External dependencies**: None (hashtag list is props-based)
- [ ] **Data layer**: N/A for dropdown itself
- [x] **User workflows**: Open dropdown, select hashtag, verify callback, scroll, deselect

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Item click triggers onSelect, selected state updates |
| Service <-> Service | No | — |
| App <-> External API | No | — |
| App <-> Data Layer | No | — |
| Cross-platform | Yes | Touch scroll, responsive positioning |

### Test Environment

- **Environment type**: Local (Vitest + jsdom for unit, Playwright for E2E)
- **Test data strategy**: Mock hashtag list fixture (13 items)
- **Isolation approach**: Fresh DOM per test, mock onSelect callback

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Hashtag data | Fixture | Static test data matching the 13 spec items |
| onSelect callback | Mock (vi.fn()) | Verify call arguments |
| useDropdown hook | Real | Test integration |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open dropdown shows all 13 hashtags
   - [ ] Click hashtag calls onSelect with correct ID and closes dropdown
   - [ ] Selected hashtag shows gold background and glow
   - [ ] Click different hashtag deselects previous, selects new, closes dropdown

2. **Error Handling**
   - [ ] Empty hashtag list renders empty dropdown (or nothing)

3. **Edge Cases**
   - [ ] Click selected hashtag calls onSelect(null) to clear filter and keeps dropdown open
   - [ ] Scroll to last item, verify it is visible and selectable
   - [ ] Keyboard navigation scrolls into view for off-screen items
   - [ ] Outside click closes dropdown without changing filter
   - [ ] Escape closes dropdown

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Selection/deselection logic | 95%+ | High |
| Scroll behavior | 80%+ | Medium |
| Keyboard navigation | 90%+ | High |
| Responsive layout | Visual regression | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined — props interface
- [ ] Database migrations planned — hashtag table TBD

### External Dependencies

- `useDropdown` hook from Language Selector plan (Phase 0) must be implemented first
- Shared dropdown CSS tokens in `globals.css` must exist
- Kudos Live Board parent component (can be stubbed for testing)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation (depends on Language Selector Phase 0 for shared hook)

---

## Notes

- **Letter-spacing difference**: Hashtag items use `0.5px` letter-spacing (matching `--text-body` token), NOT `0.15px` used in profile/language dropdowns. This is noted in the `design-style.md` and must be applied correctly.
- **Hashtag list source**: The spec says the list SHOULD be fetched from server (TR-002). Initially, a static constant can be used server-side and passed as props. When the Supabase `hashtags` table is created, the constant is replaced with a DB query — no client-side changes needed.
- **Filter state ownership**: The dropdown does NOT own the filter state. It receives `selectedHashtag` and calls `onSelect` — the parent Live Board component owns the state and triggers feed re-fetch/re-filter. This follows React's controlled component pattern.
- **Shared base with Department dropdown**: The Hashtag and Department dropdowns are nearly identical in structure (scrollable list, single-select, same design tokens). A shared `<FilterDropdown />` wrapper could be extracted, but per Principle VII (Simplicity), this should only happen after both are implemented and the duplication is confirmed to be worth abstracting.
