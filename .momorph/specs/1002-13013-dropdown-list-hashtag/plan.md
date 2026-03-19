# Implementation Plan: Dropdown List Hashtag (Hashtag Selection)

**Frame**: `1002:13013-Dropdown List Hashtag`
**Date**: 2026-03-09
**Spec**: `specs/1002-13013-dropdown-list-hashtag/spec.md`

---

## Summary

Build a multi-select hashtag dropdown component for the Write Kudo modal. The component consists of a trigger button ("+ Hashtag / Toi da 5") and a dark-themed dropdown list displaying 13 predefined hashtags. Users can toggle selections (max 5) with visual feedback via gold-tinted backgrounds and green check icons. The component communicates selections to the parent form via callback props, supports full keyboard navigation following the WAI-ARIA Listbox pattern, and enforces the maximum selection limit with disabled styling on unselected items.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, next/font (Montserrat)
**Database**: Supabase (PostgreSQL) — hashtag list may be fetched from DB or passed as props
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: React useState (local dropdown state), parent form manages selected hashtags
**API Style**: Props/callbacks — hashtag data passed from parent, selections reported via onChange

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (React 19, Tailwind CSS 4 — no new deps)
- [x] Adheres to folder structure guidelines (App Router: `src/components/kudo/`)
- [x] Meets security requirements (Principle IV: Hashtag IDs validated, no user-generated input injected)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: Client Component only where needed — dropdown requires interactivity)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, touch target considerations)
- [x] Edge-compatible (Principle VI: No Node.js APIs, all Web API standard)
- [x] Simplicity (Principle VII: No external dropdown library, built with native HTML + React)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Single Client Component `<HashtagDropdown />` under `src/components/kudo/`. Internally manages open/close state and keyboard navigation. Receives hashtag list and selection state via props, reports changes via `onChange` callback.
- **Styling Strategy**: Tailwind CSS 4 utility classes matching design tokens from `design-style.md`. Dark dropdown theme (`#00070C`) contrasts with parent modal's cream theme.
- **Data Fetching**: Hashtag list is passed as props from the parent form. The parent is responsible for fetching hashtags (via Server Component or server action). This keeps the dropdown component pure and testable (TR-002, Principle VII).

### Backend Approach

- **API Design**: N/A for this component. The parent Write Kudo form handles data fetching.
- **Data Access**: Hashtag data source TBD — either a Supabase table query or static seed data. The dropdown component is agnostic to the data source.
- **Validation**: Max selection limit (5) enforced client-side. Parent form validates minimum (1) on submission.

### Integration Points

- **Existing Services**: None directly — hashtag data provided via props
- **Shared Components**: None currently. The trigger button style matches the "+ Hashtag" button defined in the parent Viet Kudo modal design.
- **API Contracts**: Props interface:
  ```typescript
  interface Hashtag {
    id: string;
    label: string; // Display text (e.g., "Hieu suat cao")
  }

  interface HashtagDropdownProps {
    hashtags: Hashtag[];           // Available hashtags
    selected: string[];            // Currently selected hashtag IDs
    onChange: (selected: string[]) => void;  // Callback when selection changes
    maxSelections?: number;        // Max allowed (default: 5)
  }
  ```

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/1002-13013-dropdown-list-hashtag/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── testcase.md          # (optional) Test cases
```

### Source Code (affected areas)

```text
# New Files
src/
├── components/
│   └── kudo/
│       └── hashtag-dropdown.tsx   # HashtagDropdown (Client Component)
├── types/
│   └── hashtag.ts                 # Hashtag type definition

# Test Files
__tests__/
├── unit/
│   └── components/kudo/
│       └── hashtag-dropdown.test.tsx  # Unit + integration tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

> All required packages (`react`, `tailwindcss`, `next`) are already installed. Dropdown built with native HTML elements + React state.

---

## Implementation Strategy

### Phase 0: Foundation — Types & Data Structure

**Purpose**: Define the hashtag type and establish the data contract.

1. **Create `src/types/hashtag.ts`** — Hashtag type definition
   ```typescript
   export interface Hashtag {
     id: string;
     label: string;
   }
   ```

2. **Define the 13 predefined hashtags** — These will initially live as a constant (seed data) that can later be replaced with a Supabase fetch. Place in `src/libs/constants/hashtags.ts` or pass from server.

### Phase 1: User Story 1 — Select Hashtags by Toggling (P1, Core)

**Purpose**: Build the trigger button and dropdown list with toggle selection.

1. **Create `src/components/kudo/hashtag-dropdown.tsx`** — HashtagDropdown (Client Component)
   - `'use client'` directive
   - Props: `hashtags`, `selected`, `onChange`, `maxSelections` (default: 5)
   - Local state: `isOpen` (boolean)

2. **Trigger Button**:
   - 116x48px, white bg, border `#998C5F`, radius 8px
   - Plus icon (24x24, `#999`) + text "Hashtag\nToi da 5" (Montserrat 11px/700, `#999`)
   - Click toggles `isOpen`
   - `aria-haspopup="listbox"`, `aria-expanded={isOpen}`

3. **Dropdown Container**:
   - Positioned absolute below trigger (`top: calc(100% + 4px)`)
   - 318px wide, dark bg `#00070C`, border `#998C5F`, radius 8px, padding 6px
   - Box shadow: `0 4px 16px rgba(0,0,0,0.3)`
   - `max-height: 400px`, `overflow-y: auto` (13 items at 40px = 520px, will scroll)
   - `role="listbox"`, `aria-multiselectable="true"`

4. **Hashtag Items**:
   - Each item: `role="option"`, `aria-selected={isSelected}`
   - Width 100%, height 40px, padding 0 16px, radius 2px
   - Text: Montserrat 16px/700, white, letter-spacing 0.15px
   - Click handler: toggle item in `selected` array, call `onChange` with updated array

5. **Selected Item Styling**:
   - Background: `rgba(255, 234, 158, 0.20)` (gold tint)
   - Green check circle icon (24x24) on the right: green circle `#4CAF50` with white checkmark

6. **Unselected Item Styling**:
   - Background: transparent
   - No check icon

7. **Close behaviors**:
   - Click outside dropdown → close
   - Escape key → close
   - Trigger button re-click → close
   - On close, focus returns to trigger button

### Phase 2: User Story 2 — Maximum 5 Hashtag Limit (P2)

**Purpose**: Enforce the selection limit with visual feedback.

1. **Limit enforcement**:
   - When `selected.length >= maxSelections`, prevent further selections
   - Unselected items become visually disabled: text color `rgba(255, 255, 255, 0.40)`, `cursor: not-allowed`, no hover effect
   - `aria-disabled="true"` on disabled items
   - Already-selected items remain interactive (can be deselected to free up slots)

2. **Trigger feedback**:
   - When max reached, optionally update trigger text or add indicator
   - Trigger button itself may show disabled state if appropriate (opacity 0.5)

3. **Deselection recovery**:
   - When user deselects an item bringing count below max, previously disabled items become selectable again immediately

### Phase 3: User Story 3 — Visual Feedback with Checkmarks (P3)

**Purpose**: Polish selection/deselection visual transitions.

1. **Check icon animation**:
   - Select: check icon fades in + scales from 0.8 to 1 (150ms ease-out)
   - Deselect: check icon fades out + scales from 1 to 0.8 (100ms ease-in)

2. **Item hover states**:
   - Unselected hover: `rgba(255, 255, 255, 0.05)` bg (150ms transition)
   - Selected hover: `rgba(255, 234, 158, 0.30)` bg
   - Disabled: no hover effect

3. **Background transition**:
   - Selection toggle: background color transition 150ms ease-in-out

### Phase 4: User Story 4 — Keyboard Accessibility (P4)

**Purpose**: Full keyboard navigation following WAI-ARIA Listbox pattern.

1. **Keyboard interactions**:
   - Trigger focused + `Enter`/`Space` → open dropdown, focus first item
   - `ArrowDown` → move focus to next item
   - `ArrowUp` → move focus to previous item
   - `Enter`/`Space` on focused item → toggle selection (respecting max limit)
   - `Escape` → close dropdown, return focus to trigger
   - `Home` → focus first item
   - `End` → focus last item

2. **Focus management**:
   - Track `focusedIndex` in local state
   - Apply visible focus indicator: `outline: 2px solid #FFEA9E, outline-offset: -2px`
   - On open, focus moves to first item (or first selected item)
   - On close, focus returns to trigger

3. **Screen reader support**:
   - `aria-live="polite"` region announcing selection count (e.g., "3 of 5 selected")
   - Each item has `aria-selected` and `aria-disabled` attributes

### Phase 5: Responsive Design

**Purpose**: Ensure dropdown works across all breakpoints.

1. **Apply responsive styles per `design-style.md`**:
   - Mobile (< 768px):
     - Dropdown: `width: calc(100vw - 32px)`, `max-width: 318px`
     - `max-height: 60vh` (prevent overflow on small screens)
     - Item height: consider 44px for touch target compliance (up from 40px)
     - Position: may need viewport-aware positioning (open upward if near bottom)
   - Tablet (768–1023px): Same as desktop (318px width)
   - Desktop (1024px+): Match Figma design exactly
   - Wide (1280px+): Same as desktop

2. **Trigger button**: 116x48px across all breakpoints (already compact)

3. **Viewport overflow prevention**: Dropdown should not extend beyond viewport edges; adjust position if needed

### Phase 6: Polish & Animations

**Purpose**: Final transitions, animations, and accessibility audit.

1. **Dropdown open/close animation**:
   - Open: fade-in + translateY(-4px → 0) 150ms ease-out
   - Close: fade-out + translateY(0 → -4px) 100ms ease-in

2. **Accessibility audit**:
   - Verify `role="listbox"`, `aria-multiselectable`, `aria-expanded`
   - Verify all items have `role="option"`, `aria-selected`, `aria-disabled`
   - Verify keyboard navigation works end-to-end
   - Verify color contrast: white text on `#00070C` bg (ratio ~19:1, passes AA)
   - Run axe-core automated check

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Hashtag data source not yet defined (API vs static) | Med | Low | Component receives data via props, agnostic to source; use static constant initially |
| Dropdown positioning overflow on mobile | Med | Med | Implement viewport-aware positioning; clamp with `max-height: 60vh` on mobile |
| Parent Kudo form not yet implemented | High | Med | Component is self-contained with props/callbacks; can be developed and tested standalone |
| Scrollable dropdown keyboard navigation complexity | Low | Med | Follow WAI-ARIA Listbox pattern; manage scrollIntoView for focused items |
| Touch target size (40px items < 44px minimum) | Med | Med | Increase to 44px on mobile breakpoint via responsive padding (`py-0.5` on mobile). Constitution Principle V mandates 44x44px touch targets. This is not optional on mobile. |

### Estimated Complexity

- **Frontend**: Medium — Multi-select dropdown with keyboard navigation, max limit enforcement, animations
- **Backend**: None — No server-side work for this component
- **Testing**: Medium — Multiple interaction patterns (click, keyboard, max limit, responsive)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: HashtagDropdown ↔ Parent form state management
- [ ] **External dependencies**: None (hashtag data passed as props)
- [ ] **Data layer**: None for this component
- [x] **User workflows**: Open dropdown → browse → select/deselect → max limit → close → verify selections

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Toggle selection, max limit enforcement, keyboard navigation |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive layout, touch targets, viewport overflow |

### Test Environment

- **Environment type**: Local (Vitest + jsdom/happy-dom for unit/integration, Playwright for E2E)
- **Test data strategy**: Inline fixtures with 13 predefined hashtags, various selection states
- **Isolation approach**: Fresh component render per test with controlled props

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| onChange callback | Mock (vi.fn()) | Verify callback invocations with correct selected arrays |
| Hashtag data | Real (fixtures) | Static data, no reason to mock |
| Parent form context | Mock | Dropdown is isolated; parent integration tested separately |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Click trigger → dropdown opens → all 13 hashtags visible
   - [ ] Click unselected item → item becomes selected (gold bg + check icon) → onChange called
   - [ ] Click selected item → item becomes unselected → onChange called
   - [ ] Select 3 items → close → reopen → same 3 items still selected
   - [ ] Keyboard: Tab to trigger → Enter → ArrowDown → Space to select → Escape to close

2. **Error Handling**
   - [ ] Select 5 items → 6th item click does nothing → count stays at 5
   - [ ] Select 5 items → unselected items show disabled styling
   - [ ] Deselect 1 of 5 → previously disabled items become selectable
   - [ ] Empty hashtag list → "Khong co hashtag" message displayed

3. **Edge Cases**
   - [ ] Click outside dropdown → closes
   - [ ] Escape key → closes, focus returns to trigger
   - [ ] Trigger re-click while open → closes
   - [ ] Rapid toggling does not cause state inconsistency
   - [ ] Dropdown with 13 items scrolls correctly (content > max-height)
   - [ ] Keyboard focus follows scrollIntoView for off-screen items

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react for component testing
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Selection toggle logic (including max limit) | 95%+ | High |
| Keyboard navigation | 90%+ | High |
| Accessibility attributes | 90%+ | High |
| Responsive layout | Visual regression | Medium |
| Animations | Manual verification | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined (props interface — no server API)
- [ ] Hashtag data source finalized (static seed or Supabase table)

### External Dependencies

- Parent Write Kudo modal (frame 520:11602, `specs/520-11602-viet-kudo/plan.md` Phase 5) — dropdown is a child component of the Hashtag section, rendered inside `hashtag-field.tsx`
- Hashtag seed data or Supabase table with the 13 predefined hashtags
- Icon assets: Plus icon (24x24), Check Circle icon (24x24) — download from Figma or use inline SVG

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **No new npm packages needed.** The dropdown is built with native HTML elements, React state, and Tailwind CSS. No headless UI library (Radix, Headless UI) is required — the component is simple enough to implement directly (Principle VII).
- **Decoupled from parent form**: The dropdown communicates exclusively through props and callbacks (`hashtags`, `selected`, `onChange`). It can be developed and tested before the Write Kudo form is built.
- **State clarification**: The spec's State Management table lists `selectedHashtags` as local state, but the plan correctly uses controlled props (`selected` + `onChange`) from the parent. The component does NOT maintain its own `selectedHashtags` state -- only `isOpen` and `focusedIndex` are local. This is the correct architecture for a controlled component.
- **Dark theme contrast**: The dropdown's dark background (`#00070C`) is a deliberate design choice that contrasts with the parent modal's cream theme. This is not an error — it creates visual separation for the selection interface.
- **Sorting behavior**: The design shows selected items at the top of the list (A, B, C). The implementation should sort selected items to the top, with unselected items below in their original order. This improves usability when reopening the dropdown to review selections.
- **Scroll behavior**: With 13 items at 40px each (520px content) and a 400px max-height, the dropdown will always scroll. Ensure smooth scrolling and that keyboard-focused items scroll into view automatically.
- **i18n**: Trigger text and limit message have translation keys defined in the spec. Individual hashtag labels are data-driven (from props) and do not need i18n keys — they are fetched in the appropriate language from the data source.
- **Missing i18n key**: The plan references a "Khong co hashtag" empty list message (Phase 2 error handling test, spec Loading/Error States) but no corresponding i18n key exists in the spec. Add `hashtag.empty_list` = "Khong co hashtag" / "No hashtags available" to `translations.ts` during implementation.
- **Hashtag chips in parent**: Displaying selected hashtags as chips/tags in the parent form is out of scope for this component. The parent Hashtag section handles chip rendering based on the `selected` array.
