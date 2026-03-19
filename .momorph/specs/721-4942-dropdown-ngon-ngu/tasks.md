# Tasks: Dropdown Language Selector

**Frame**: `721:4942-Dropdown-ngon-ngu`
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

## Phase 1: Setup (Shared Dropdown Infrastructure)

**Purpose**: Create the shared `useDropdown` hook and CSS tokens that ALL 5 dropdown components depend on. This is Phase 0 from the plan and is foundational for the entire dropdown family.

- [x] T001 [P] Create shared `useDropdown` hook: manage `isOpen`, `isClosing`, `activeIndex` state; implement outside-click detection via `useEffect` + `mousedown` listener on `containerRef`; implement keyboard handler factory (`Enter`/`Space` to toggle, `ArrowDown`/`ArrowUp` to navigate with wrapping, `Escape` to close, `Enter` on focused item to select); implement close animation support (`isClosing` state, 100ms delay before setting `isOpen=false`); implement scroll-into-view on `activeIndex` change via `element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })`; accept config `{ itemCount, onSelect, onClose, role: 'listbox' | 'menu' }`; return `{ isOpen, isClosing, activeIndex, containerRef, triggerProps, listProps, getItemProps, open, close, toggle, setActiveIndex }`; ARIA helpers role-aware: `role='listbox'` returns `role="combobox"` on trigger + `role="option"` + `aria-selected` on items; `role='menu'` returns `aria-haspopup="menu"` on trigger + `role="menuitem"` + no `aria-selected` on items | `src/hooks/use-dropdown.ts`
- [x] T002 [P] Add shared dropdown CSS custom properties to globals.css: `--dropdown-bg: #00070C`, `--dropdown-border: #998C5F`, `--dropdown-radius: 8px`, `--dropdown-item-height: 56px`, `--dropdown-item-radius: 4px`, `--dropdown-item-selected-bg: rgba(255, 234, 158, 0.20)`, `--dropdown-item-active-bg: rgba(255, 234, 158, 0.10)`, `--dropdown-item-hover-bg: rgba(255, 234, 158, 0.10)`, `--dropdown-gold-glow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`, `--dropdown-focus-ring: #FFEA9E`; add `@keyframes dropdownOpen` (opacity 0->1, translateY -4px->0) and `@keyframes dropdownClose` (opacity 1->0, translateY 0->-4px); add `.animate-dropdown-open` (150ms ease-out forwards) and `.animate-dropdown-close` (100ms ease-in forwards) | `src/app/globals.css`
- [x] T003 [P] Download EN flag asset (UK flag SVG, 24x24) from Figma using `get_media_files` tool, save as `flag-en.svg`, verify `flag-vn.svg` already exists | `public/images/login/flag-en.svg`

**Checkpoint**: Shared dropdown infrastructure ready -- all 5 dropdown components can now consume `useDropdown` hook and CSS tokens.

---

## Phase 2: User Story 1 -- Switch Language (Priority: P1) MVP

**Goal**: User can open the language dropdown, see VN and EN options with correct visual states, and switch language by clicking an option.

**Independent Test**: Click the language selector in the header, verify dropdown opens with VN and EN options styled per Figma (dark bg, gold border, 8px radius, 56px items). Select the non-active language, verify cookie updates and page re-renders.

- [x] T004 [US1] Refactor LanguageSelector to use `useDropdown` hook: replace existing inline state management with `useDropdown({ itemCount: 2, onSelect, onClose, role: 'listbox' })`, remove manual `isOpen`/`setIsOpen` state, remove manual outside-click handler, remove manual keyboard handler; keep existing locale cookie logic and `window.location.reload()` on selection | `src/components/shared/language-selector.tsx`
- [x] T005 [US1] Restyle dropdown container: `absolute z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col`; restyle items to 56px height (`h-14`), 16px horizontal padding (`px-4`), 4px radius (`rounded`); selected state: `bg-[#FFEA9E]/20` + `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`; default state: `bg-transparent text-white`; hover state: `bg-[#FFEA9E]/10` with `transition-colors duration-150 ease-in-out`; flag icons 24x24 via `next/image` with 8px gap; typography: Montserrat 16px/24px bold, `tracking-[0.15px]` | `src/components/shared/language-selector.tsx`
- [x] T006 [US1] Add open/close animation: render dropdown list when `isOpen || isClosing` is true; apply `animate-dropdown-open` class when `isOpen && !isClosing`; apply `animate-dropdown-close` class when `isClosing`; remove conditional `{isOpen && ...}` render pattern to allow exit animation | `src/components/shared/language-selector.tsx`

**Checkpoint**: Language dropdown visually matches Figma design, opens/closes with animation, and switches language correctly.

---

## Phase 3: User Story 2 -- Keyboard Accessible (Priority: P2)

**Goal**: Full ARIA listbox pattern with keyboard navigation for the language dropdown.

**Independent Test**: Focus the language trigger with Tab, press Enter to open, use ArrowDown/ArrowUp to navigate between VN and EN, press Enter to select, press Escape to close and verify focus returns to trigger.

- [x] T007 [US2] Apply ARIA attributes from `useDropdown` hook: spread `triggerProps` on trigger button (`role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, add `aria-label="Select language"`); spread `listProps` on dropdown list (`role="listbox"`, `aria-label="Languages"`); spread `getItemProps(index)` on each item (`role="option"`, `aria-selected` on current locale, `tabIndex`); add focus indicator: `outline-2 outline-offset-2 outline-[#FFEA9E]` on focus-visible for items | `src/components/shared/language-selector.tsx`
- [x] T008 [US2] Verify keyboard behavior works end-to-end: `Enter`/`Space` on trigger toggles dropdown and focuses selected item; `ArrowDown`/`ArrowUp` navigates items with wrapping (2 items); `Enter` on item selects locale and closes dropdown; `Escape` closes dropdown and returns focus to trigger; verify all behavior is provided by `useDropdown` hook, no manual keyboard handlers needed in component | `src/components/shared/language-selector.tsx`

**Checkpoint**: Language dropdown is fully keyboard accessible with proper ARIA roles.

---

## Phase 4: User Story 3 -- Persist Language Preference (Priority: P3)

**Goal**: Language preference persists across sessions via cookie.

**Independent Test**: Select EN, close and reopen the browser, verify the app loads in English and the dropdown shows EN as selected.

- [x] T009 [US3] Verify cookie persistence: ensure locale cookie is set with `max-age=31536000` (365 days), `path=/`, `samesite=lax` on selection; verify Header Server Component reads `locale` cookie and passes `currentLocale` prop to LanguageSelector; verify default to `vi` when cookie is missing or invalid | `src/components/shared/language-selector.tsx`

**Checkpoint**: All user stories complete -- language selector works with persistence and keyboard accessibility.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive adjustments, accessibility audit, and final refinements.

- [x] T010 [P] Verify dropdown right-aligns on mobile to avoid viewport overflow; confirm touch targets are 56px height (exceeds 44px minimum) | `src/components/shared/language-selector.tsx`
- [x] T011 [P] Verify focus indicators on all interactive elements: trigger button and dropdown items both show `outline: 2px solid #FFEA9E, offset: 2px` on focus-visible | `src/components/shared/language-selector.tsx`
- [x] T012 [P] Verify item hover transition: `background-color` transition 150ms ease-in-out | `src/components/shared/language-selector.tsx`
- [x] T013 Run `yarn lint` and fix any ESLint errors across all new/modified files | `src/hooks/use-dropdown.ts`, `src/app/globals.css`, `src/components/shared/language-selector.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup/Shared Infrastructure) --> Phase 2 (US1 Switch Language) --> Phase 3 (US2 Keyboard) --> Phase 4 (US3 Persist) --> Phase 5 (Polish)
```

- **Phase 1 (Setup)**: No dependencies -- start immediately. BLOCKS all 5 dropdown components.
- **Phase 2 (US1)**: Depends on Phase 1 (shared hook + CSS tokens must exist). This is the MVP.
- **Phase 3 (US2)**: Depends on Phase 2 (component must exist to add ARIA).
- **Phase 4 (US3)**: Depends on Phase 2 (cookie logic already exists, this is verification).
- **Phase 5 (Polish)**: Depends on all user stories being complete.

### Parallel Opportunities

**Phase 1**: T001, T002, T003 can ALL run in parallel (3 independent files: hook, CSS, asset).
**Phase 2**: T004 must run first (hook integration), then T005 (styling), then T006 (animation). Sequential within phase.
**Phase 3**: T007 and T008 are sequential (apply ARIA, then verify keyboard).
**Phase 5**: T010, T011, T012 can run in parallel. T013 depends on all others.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Shared Infrastructure -- benefits all 5 dropdowns)
2. Complete Phase 2 (US1 -- visual redesign + language switching)
3. **STOP and VALIDATE**: Test dropdown visually matches Figma
4. Deploy if ready

### Incremental Delivery

1. Phase 1 (Shared hook + tokens) --> All 5 dropdowns unblocked
2. Phase 2 (US1) --> Test --> Deploy (visual match)
3. Phase 3 (US2) --> Test --> Deploy (keyboard accessibility)
4. Phase 4 (US3) --> Test --> Deploy (persistence verification)
5. Phase 5 (Polish) --> Test --> Deploy (final)

---

## Notes

- The `useDropdown` hook created in Phase 1 is shared by ALL 5 dropdown components. It is the single most important task in this plan.
- The EN flag asset (`flag-en.svg`) is currently missing and must be downloaded from Figma.
- The existing `language-selector.tsx` is functional but uses different design tokens. The refactor is primarily visual.
- `window.location.reload()` is used after locale change since translations are resolved server-side.
- Mark tasks complete as you go: `[x]`
