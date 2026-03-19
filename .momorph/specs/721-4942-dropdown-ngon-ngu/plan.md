# Implementation Plan: Dropdown Language Selector

**Frame**: `721:4942-Dropdown-ngon-ngu`
**Date**: 2026-03-09
**Spec**: `specs/721-4942-dropdown-ngon-ngu/spec.md`

---

## Summary

Enhance the existing `LanguageSelector` component at `src/components/shared/language-selector.tsx` to match the Figma design: dark background (#00070C), gold border (#998C5F), 8px radius, 56px item height, gold-tinted selected state with text glow, and open/close animations. This component is part of a family of 5 dropdowns that share common design tokens, so a shared dropdown base hook (`useDropdown`) will be extracted for reuse. The language selector is used across Login and all authenticated pages via the Header.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, next/image
**Database**: N/A (cookie-based locale persistence)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: Local client state (isOpen, activeIndex), cookie for persistence
**API Style**: N/A (client-side only)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (React, Tailwind, next/image — no new deps)
- [x] Adheres to folder structure guidelines (shared component in `src/components/shared/`)
- [x] Meets security requirements (Principle IV: cookie-based, no secrets)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: Client Component only for interactivity, `'use client'` boundary minimal)
- [x] Mobile-first responsive (Principle V: 56px touch targets > 44px minimum)
- [x] Edge-compatible (Principle VI: No Node.js APIs, cookie via `document.cookie`)
- [x] Simplicity (Principle VII: Enhances existing component, extracts shared hook only when 2+ consumers exist)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Enhance existing `src/components/shared/language-selector.tsx` to match Figma design tokens. Extract a shared `useDropdown` hook into `src/hooks/use-dropdown.ts` for open/close state, outside-click, keyboard navigation, and ARIA management — reused by all 5 dropdown components.
- **Styling Strategy**: Tailwind CSS 4 utility classes with inline arbitrary values matching `design-style.md` tokens. Shared dropdown CSS custom properties added to `globals.css`.
- **Data Fetching**: No data fetching. Locale list is static (VN, EN). Current locale read from cookie server-side and passed as prop.

### Backend Approach

- **API Design**: N/A — no server endpoints needed.
- **Data Access**: Cookie read server-side in Server Component (Header), passed to LanguageSelector as prop.
- **Validation**: N/A.

### Integration Points

- **Existing Services**: `@/libs/i18n/translations.ts` for locale constants and translation strings.
- **Shared Components**: Header (`src/components/shared/header.tsx`) renders LanguageSelector. The `useDropdown` hook will be shared across all 5 dropdown components.
- **API Contracts**: N/A.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-4942-dropdown-ngon-ngu/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # Codebase research findings
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# Modified Files
src/
├── components/
│   └── shared/
│       └── language-selector.tsx   # Restyle to match Figma design tokens
├── hooks/
│   └── use-dropdown.ts             # NEW: Shared hook for dropdown behavior
└── app/
    └── globals.css                 # Add shared dropdown CSS custom properties

# Test Files
tests/
├── unit/
│   ├── use-dropdown.test.ts        # Hook unit tests
│   └── language-selector.test.tsx  # Component unit tests
└── e2e/
    └── language-selector.spec.ts   # Playwright E2E tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

---

## Implementation Strategy

### Phase 0: Shared Dropdown Infrastructure

**Purpose**: Extract reusable dropdown logic shared by all 5 dropdown components.

1. **Create `src/hooks/use-dropdown.ts`** — Shared dropdown hook
   - Manages `isOpen` state (toggle, open, close)
   - Manages `activeIndex` state for keyboard navigation
   - Outside-click detection via `useEffect` + `mousedown` listener
   - Keyboard handler factory: `Enter`/`Space` to toggle, `ArrowDown`/`ArrowUp` to navigate (with wrapping), `Escape` to close, `Enter` on focused item to select
   - Returns: `isOpen`, `activeIndex`, `containerRef`, `handleTriggerKeyDown`, `handleItemKeyDown`, `open`, `close`, `toggle`, `setActiveIndex`
   - Accepts config: `itemCount`, `onSelect(index)`, `onClose`, `role: 'listbox' | 'menu'` (default: `'listbox'`)
   - ARIA helpers (role-aware):
     - When `role='listbox'`: `triggerProps` returns `aria-expanded`, `aria-haspopup="listbox"`, `role="combobox"`; `listProps` returns `role="listbox"`; `getItemProps(index)` returns `role="option"`, `aria-selected`, `tabIndex`
     - When `role='menu'`: `triggerProps` returns `aria-expanded`, `aria-haspopup="menu"`; `listProps` returns `role="menu"`; `getItemProps(index)` returns `role="menuitem"`, `tabIndex` (no `aria-selected`)
   - **Scroll-into-view support**: When `activeIndex` changes, call `element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })` on the active item. Accepts an optional `itemRefs: React.RefObject<(HTMLElement | null)[]>` or uses `containerRef` to query `[role="option"]`/`[role="menuitem"]` children by index. Required for Hashtag (13 items) and Department (50 items) scrollable dropdowns.
   - **Close animation support**: Expose `isClosing` state. When `close()` is called, set `isClosing=true` for the animation duration (100ms) before setting `isOpen=false`. Consumers use `isOpen || isClosing` to keep the DOM mounted during the exit animation, applying open vs closing CSS classes accordingly.

2. **Add shared dropdown CSS custom properties to `src/app/globals.css`**:
   - `--dropdown-bg: #00070C`
   - `--dropdown-border: #998C5F`
   - `--dropdown-radius: 8px`
   - `--dropdown-item-height: 56px`
   - `--dropdown-item-radius: 4px`
   - `--dropdown-item-selected-bg: rgba(255, 234, 158, 0.20)` (Language/Hashtag/Department selected state)
   - `--dropdown-item-active-bg: rgba(255, 234, 158, 0.10)` (Profile active/current-page state — note: 10% opacity, distinct from 20% selected)
   - `--dropdown-item-hover-bg: rgba(255, 234, 158, 0.10)`
   - `--dropdown-gold-glow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`
   - `--dropdown-focus-ring: #FFEA9E`

3. **Add shared dropdown animation keyframes to `src/app/globals.css`**:
   ```css
   @keyframes dropdownOpen {
     from { opacity: 0; transform: translateY(-4px); }
     to { opacity: 1; transform: translateY(0); }
   }
   @keyframes dropdownClose {
     from { opacity: 1; transform: translateY(0); }
     to { opacity: 0; transform: translateY(-4px); }
   }
   .animate-dropdown-open {
     animation: dropdownOpen 150ms ease-out forwards;
   }
   .animate-dropdown-close {
     animation: dropdownClose 100ms ease-in forwards;
   }
   ```

### Phase 1: User Story 1 — Switch Language (P1)

**Purpose**: Restyle the existing LanguageSelector to match Figma design.

1. **Refactor `src/components/shared/language-selector.tsx`**:
   - Replace inline state management with `useDropdown` hook
   - Update container: `absolute z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col`
   - Update items: 56px height, 16px horizontal padding, 4px radius
   - Selected state: `bg-[#FFEA9E]/20` + gold text shadow
   - Default state: `bg-transparent`, white text, no shadow
   - Hover state: `bg-[#FFEA9E]/10`
   - Flag icons: 24x24px via `next/image`
   - Typography: Montserrat 16px/24px bold, letter-spacing 0.15px
   - Cookie update on selection + `window.location.reload()` for full re-render

2. **Add open/close animation**:
   - Open: opacity 0->1 + translateY(-4px->0), 150ms ease-out
   - Close: opacity 1->0 + translateY(0->-4px), 100ms ease-in
   - Item hover: background-color transition 150ms ease-in-out
   - **Implementation note**: Use `isClosing` state from `useDropdown` hook. Render the dropdown list when `isOpen || isClosing` is true. Apply `animate-dropdown-open` class when `isOpen && !isClosing`, and `animate-dropdown-close` class when `isClosing`. Define both keyframe animations in `globals.css`. This avoids conditional render `{isOpen && ...}` which prevents exit animations.

### Phase 2: User Story 2 — Keyboard Accessible (P2)

**Purpose**: Full ARIA listbox pattern with keyboard navigation.

1. **ARIA attributes** (via `useDropdown` hook):
   - Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, `aria-label="Select language"`
   - List: `role="listbox"`, `aria-label="Languages"`
   - Items: `role="option"`, `aria-selected` on current locale
   - Focus indicator: `outline: 2px solid #FFEA9E`, offset 2px

2. **Keyboard behavior**:
   - `Enter`/`Space` on trigger: toggle dropdown, focus moves to selected item
   - `ArrowDown`/`ArrowUp`: navigate items with wrapping
   - `Enter` on item: select locale, close dropdown
   - `Escape`: close dropdown, return focus to trigger

### Phase 3: User Story 3 — Persist Language Preference (P3)

**Purpose**: Cookie persistence across sessions.

1. Already implemented: cookie `locale` set with `max-age=365 days`, `path=/`, `samesite=lax`
2. Server-side reading: Header Server Component reads cookie and passes `currentLocale` prop
3. Default to `vi` when cookie is missing or invalid

### Phase 4: Polish

1. **Responsive**: Right-align dropdown on mobile to avoid viewport overflow. Touch targets already 56px (> 44px).
2. **Animation polish**: Ensure smooth open/close transitions
3. **Accessibility audit**: Run axe-core, verify focus management

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `useDropdown` hook API doesn't fit all 5 dropdowns | Med | Med | Design hook API with configurable `role` param (`'listbox'` vs `'menu'`); validate ARIA output against all 5 specs before implementing. Language/Hashtag/Department use `listbox`; Profile uses `menu`. |
| Animation jank on low-end devices | Low | Low | Use CSS transitions (GPU-accelerated opacity/transform), not JS animation |
| Cookie not readable on Cloudflare Workers | Low | Med | Standard `Set-Cookie` is supported; test early on `wrangler dev` |

### Estimated Complexity

- **Frontend**: Low — Restyling existing component + extracting hook
- **Backend**: None
- **Testing**: Low — Focused unit tests for hook + visual regression

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LanguageSelector + useDropdown hook + Header integration
- [ ] **External dependencies**: None
- [ ] **Data layer**: Cookie read/write
- [x] **User workflows**: Open dropdown, select language, verify cookie update + page reload

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Trigger click opens dropdown, item click updates locale cookie |
| Service <-> Service | No | — |
| App <-> External API | No | — |
| App <-> Data Layer | Yes | Cookie persistence |
| Cross-platform | Yes | Responsive positioning, touch targets |

### Test Environment

- **Environment type**: Local (Vitest + jsdom for unit, Playwright for E2E)
- **Test data strategy**: Mock cookie API, mock locale constants
- **Isolation approach**: Fresh DOM state per test

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Cookie API | Mock | `document.cookie` mocked in jsdom |
| window.location.reload | Mock | Prevent actual reload in tests |
| next/image | Mock | Render as plain `<img>` in unit tests |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Click trigger opens dropdown with VN and EN options
   - [ ] Click EN item updates cookie to `en` and triggers reload
   - [ ] Selected item (current locale) shows gold background and glow

2. **Error Handling**
   - [ ] Invalid/missing cookie defaults to VN
   - [ ] Component renders correctly when locale prop is unknown

3. **Edge Cases**
   - [ ] Outside click closes dropdown without changing locale
   - [ ] Escape key closes dropdown, focus returns to trigger
   - [ ] Keyboard navigation wraps from last to first item and vice versa
   - [ ] Multiple rapid clicks do not cause state inconsistency

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react for component tests
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| useDropdown hook | 95%+ | High |
| LanguageSelector component | 85%+ | High |
| Keyboard navigation | 90%+ | High |
| Responsive layout | Visual regression | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined — N/A
- [x] Database migrations planned — N/A

### External Dependencies

- Flag icon assets already exist in `public/images/login/` (flag-vn.svg; EN flag needs to be added)
- Header component already renders LanguageSelector

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 first — shared hook benefits all 5 dropdowns)

---

## Notes

- **Shared hook extraction is Phase 0** because all 5 dropdown components need the same open/close, keyboard navigation, and outside-click behavior. Building this first accelerates all subsequent dropdown implementations.
- **The existing `language-selector.tsx` is functional** but uses different design tokens (gray bg/border instead of dark/gold). The refactor is primarily visual — behavior logic moves to the shared hook.
- **EN flag asset is missing** — the current code has a TODO comment using the VN flag as placeholder for EN. The EN flag (UK/US flag) SVG should be sourced from the same flag icon set as the VN flag. The asset task in `tasks.md` should download it from Figma using the `get_media_files` tool. If the EN flag is not available in Figma, use a simple circle flag SVG matching the VN flag style. This needs to be resolved during the asset download phase. Target path: `public/images/login/flag-en.svg`.
- **`window.location.reload()` is the permanent approach** for applying the new locale (Principle VII: Simplicity). This is a small app for a one-time event — the overhead of a React context i18n system is not justified. Translations are resolved server-side, and a full page reload ensures all components receive the updated locale. No future migration to a client-side i18n context is planned.
