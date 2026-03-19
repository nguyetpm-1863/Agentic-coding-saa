# Tasks: Dropdown List Hashtag (Hashtag Selection)

**Frame**: `1002:13013-Dropdown List Hashtag`
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

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download icons and verify asset availability for the dropdown

- [x] T001 Download media assets from Figma using `get_media_files` tool: Plus icon (24x24, `#999`), Check Circle icon (24x24, green `#4CAF50` circle + white checkmark) → `public/images/kudo/`
- [x] T002 Verify all icon assets exist and follow kebab-case naming | `public/images/kudo/`

---

## Phase 2: Foundation (Types & Constants)

**Purpose**: Define the Hashtag type, predefined hashtag data, and i18n keys that the component depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create Hashtag type definition: `export interface Hashtag { id: string; label: string; }` | `src/types/hashtag.ts`
- [x] T004 [P] Create predefined hashtag constants: array of 13 `Hashtag` objects with the labels from spec (Toan dien, Gioi chuyen mon, Hieu suat cao, Truyen cam hung, Cong hien, Aim High, Be Agile, Wasshoi, Huong muc tieu, Huong khach hang, Chuan quy trinh, Giai phap sang tao, Quan ly xuat sac), export as `PREDEFINED_HASHTAGS` constant. This is temporary seed data to be replaced with Supabase fetch later | `src/libs/constants/hashtags.ts`
- [x] T005 [P] Add i18n translation keys for Hashtag Dropdown: `hashtag.trigger_label` ("Hashtag"/"Hashtag"), `hashtag.max_note` ("Toi da 5"/"Max 5"), `hashtag.limit_reached` ("Da chon toi da 5 hashtag"/"Maximum 5 hashtags selected"), `hashtag.empty_list` ("Khong co hashtag"/"No hashtags available") with Vietnamese and English values per spec i18n table | `src/libs/i18n/translations.ts`

**Checkpoint**: Foundation ready — types defined, hashtag data available, translation keys added, component implementation can begin

---

## Phase 3: User Story 1 — Select Hashtags by Toggling (Priority: P1) 🎯 MVP

**Goal**: User can click the trigger button to open a dropdown displaying all available hashtags, toggle selections by clicking items, and close the dropdown. Selections are communicated to the parent form via `onChange` callback.

**Independent Test**: Render `<HashtagDropdown hashtags={PREDEFINED_HASHTAGS} selected={[]} onChange={fn} />`, click trigger to open, click "Hieu suat cao" — verify `onChange` called with `["hieu-suat-cao"]` and item shows gold background + check icon. Click same item again — verify `onChange` called with `[]` and item returns to transparent. Click outside — verify dropdown closes.

### Component (US1)

- [x] T006 [US1] Create HashtagDropdown Client Component with `'use client'` directive, props: `hashtags: Hashtag[]`, `selected: string[]`, `onChange: (selected: string[]) => void`, `maxSelections?: number` (default: 5). Local state: `isOpen` (boolean). Render wrapper `div` with `relative inline-block`. Trigger button: 116x48px, white bg, border `1px solid #998C5F`, radius 8px, padding `4px 8px`, flex with gap 4px, Plus icon (24x24, `#999`) + text "Hashtag\nToi da 5" (Montserrat 11px/700, `#999`, letter-spacing 0.5px), `aria-haspopup="listbox"`, `aria-expanded={isOpen}`, click toggles `isOpen`. Dropdown container (when `isOpen`): positioned absolute below trigger (`top: calc(100% + 4px)`, `left: 0`), 318px wide, bg `#00070C`, border `1px solid #998C5F`, radius 8px, padding 6px, box-shadow `0 4px 16px rgba(0,0,0,0.3)`, max-height 400px, overflow-y auto, z-index 60, `role="listbox"`, `aria-multiselectable="true"`. Each hashtag item: `role="option"`, `aria-selected={isSelected}`, width 100%, height 40px, padding `0 16px`, radius 2px, flex with `items-center justify-between`, cursor pointer, text Montserrat 16px/700 white letter-spacing 0.15px. Selected items: bg `rgba(255, 234, 158, 0.20)` + green check circle icon (24x24, `#4CAF50` circle with white checkmark SVG) on right. Unselected items: bg transparent, no icon. Sort selected items to top of list, unselected below in original order. Click handler: toggle item in `selected` array, call `onChange` with updated array. Close behaviors: click outside → close, Escape → close, trigger re-click → close. On close, return focus to trigger button | `src/components/kudo/hashtag-dropdown.tsx`

**Checkpoint**: User Story 1 complete — dropdown opens, displays hashtags, toggles selections, closes properly

---

## Phase 4: User Story 2 — Maximum 5 Hashtag Limit (Priority: P2)

**Goal**: When 5 hashtags are selected, all unselected items become visually disabled and non-interactive. Deselecting an item re-enables the others.

**Independent Test**: Render with `selected` containing 5 IDs, open dropdown — verify unselected items have muted text `rgba(255, 255, 255, 0.40)`, `cursor: not-allowed`, and clicking them does not call `onChange`. Deselect one item — verify previously disabled items become selectable again.

- [x] T007 [US2] Implement max selection limit enforcement in HashtagDropdown: when `selected.length >= maxSelections`, prevent further selections on unselected items (click handler is no-op), apply disabled styling to unselected items: text color `rgba(255, 255, 255, 0.40)`, `cursor: not-allowed`, no hover effect, add `aria-disabled="true"` on disabled items. Already-selected items remain interactive (can be deselected). When user deselects bringing count below max, previously disabled items become selectable immediately. Add `aria-live="polite"` region announcing selection count (e.g., "3 of 5 selected") | `src/components/kudo/hashtag-dropdown.tsx`

**Checkpoint**: User Stories 1 & 2 complete — dropdown enforces max 5 limit with visual feedback

---

## Phase 5: User Story 3 — Visual Feedback with Checkmarks (Priority: P3)

**Goal**: Selection and deselection have smooth visual transitions. Hover states provide interactivity cues.

**Independent Test**: Select a hashtag — verify check icon appears with fade-in transition. Deselect — verify check icon fades out. Hover unselected item — verify subtle background change. Hover disabled item — verify no hover effect.

- [x] T008 [US3] Add visual transition polish to HashtagDropdown: check icon animation on select (fade-in + scale 0.8→1, 150ms ease-out) and deselect (fade-out + scale 1→0.8, 100ms ease-in), item hover states: unselected hover `rgba(255, 255, 255, 0.05)` bg 150ms transition, selected hover `rgba(255, 234, 158, 0.30)` bg, disabled items no hover effect, background color transition on selection toggle 150ms ease-in-out | `src/components/kudo/hashtag-dropdown.tsx`

**Checkpoint**: User Stories 1–3 complete — smooth visual feedback on all interactions

---

## Phase 6: User Story 4 — Keyboard Accessibility (Priority: P4)

**Goal**: Full keyboard navigation following WAI-ARIA Listbox pattern. Keyboard-only users can open, navigate, select, and close the dropdown.

**Independent Test**: Tab to trigger button, press Enter — verify dropdown opens and first item is focused. Press ArrowDown 3 times — verify focus moves through items. Press Space — verify focused item toggles selection. Press Escape — verify dropdown closes and focus returns to trigger.

- [x] T009 [US4] Implement keyboard navigation in HashtagDropdown: add `focusedIndex` local state, trigger focused + Enter/Space → open dropdown and focus first item (or first selected item), ArrowDown → focus next item, ArrowUp → focus previous item, Home → focus first item, End → focus last item, Enter/Space on focused item → toggle selection (respecting max limit, no-op on disabled items), Escape → close and return focus to trigger. Apply visible focus indicator: `outline: 2px solid #FFEA9E, outline-offset: -2px`. Scroll focused item into view via `scrollIntoView({ block: 'nearest' })` when navigating with arrow keys. Prevent default scroll behavior on ArrowUp/ArrowDown. Reset `focusedIndex` when dropdown closes | `src/components/kudo/hashtag-dropdown.tsx`

**Checkpoint**: All user stories complete — fully keyboard-accessible hashtag dropdown

---

## Phase 7: Responsive Design

**Purpose**: Ensure dropdown works across all breakpoints with proper touch targets and no viewport overflow

- [x] T010 Apply mobile-first responsive styles to HashtagDropdown: mobile defaults (dropdown `width: calc(100vw - 32px)`, `max-width: 318px`, `max-height: 60vh`, item height consider 44px for touch target compliance), trigger button 116x48px on all breakpoints (already compact), `md:` tablet (dropdown 318px width, same as desktop), `lg:` desktop (match Figma exactly: 318px dropdown, 40px item height, 400px max-height), `xl:` wide (same as desktop). Viewport overflow prevention: dropdown should not extend beyond viewport edges | `src/components/kudo/hashtag-dropdown.tsx`
- [x] T011 [P] Verify touch targets: trigger button 116x48px (meets 44px minimum height), dropdown items 40px height on desktop (increase to 44px on mobile via responsive padding) | `src/components/kudo/hashtag-dropdown.tsx`

**Checkpoint**: Dropdown is fully responsive across all breakpoints

---

## Phase 8: Polish & Final Checks

**Purpose**: Dropdown open/close animations, accessibility audit, lint

### Animations

- [x] T012 [P] Add dropdown open/close animation: open fade-in + translateY(-4px→0) 150ms ease-out, close fade-out + translateY(0→-4px) 100ms ease-in, using CSS transitions or Tailwind classes | `src/components/kudo/hashtag-dropdown.tsx`
- [x] T013 [P] Add trigger button state transitions: hover bg `#F5F5F5` 150ms, focus `outline: 2px solid #FFEA9E offset 2px`, active/open bg `#F0F0F0` + border `#FFEA9E` | `src/components/kudo/hashtag-dropdown.tsx`

### Accessibility Audit

- [x] T014 [P] Verify ARIA attributes: trigger has `aria-haspopup="listbox"` and `aria-expanded`, dropdown has `role="listbox"` and `aria-multiselectable="true"`, each item has `role="option"` and `aria-selected`, disabled items have `aria-disabled="true"`, `aria-live="polite"` region announces selection count | `src/components/kudo/hashtag-dropdown.tsx`
- [x] T015 [P] Verify color contrast meets WCAG AA 4.5:1: white text `#FFFFFF` on dark bg `#00070C` (~19:1 ratio), trigger text `#999` on white bg, disabled text `rgba(255,255,255,0.40)` on dark bg | `src/components/kudo/hashtag-dropdown.tsx`

### Final

- [x] T016 Handle empty hashtag list edge case: when `hashtags` array is empty, display "Khong co hashtag" message (using i18n key `hashtag.empty_list`) centered in dropdown area, Montserrat 14px/500, `rgba(255,255,255,0.60)` | `src/components/kudo/hashtag-dropdown.tsx`
- [x] T017 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3) ──→ Phase 6 (US4) ──→ Phase 7 (Responsive) ──→ Phase 8 (Polish)
                                                    │
                                                    └─ STOP & VALIDATE (can test dropdown standalone after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (icons must exist) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (dropdown must exist to add limit enforcement)
- **US3 (Phase 5)**: Depends on Phase 4 (visual transitions apply to all states including disabled)
- **US4 (Phase 6)**: Depends on Phase 5 (keyboard nav must respect disabled states and visual feedback)
- **Responsive (Phase 7)**: Depends on Phase 6 (responsive applies to final component state)
- **Polish (Phase 8)**: Depends on Phase 7

### Within Each Phase

- Tasks marked [P] can run in parallel (different concerns)
- Component creation (T006) depends on types (T003) and constants (T004)
- Keyboard navigation (T009) depends on max limit logic (T007) being in place

### Parallel Opportunities

**Phase 2**: T003, T004, and T005 can ALL run in parallel (different files)
**Phase 7**: T010 and T011 can run in parallel
**Phase 8**: T012, T013, T014, T015, T016 can ALL run in parallel (independent tasks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (User Story 1 — Toggle Selection)
3. **STOP and VALIDATE**: Test dropdown with mock props and onChange
4. Continue to Phase 4–8 for limit, polish, keyboard, responsive, accessibility

### Incremental Delivery

1. Setup + Foundation → Types and constants ready
2. Add User Story 1 → Test → Dropdown opens/toggles/closes
3. Add User Story 2 → Test → Max 5 limit enforced
4. Add User Story 3 → Test → Visual transitions smooth
5. Add User Story 4 → Test → Full keyboard navigation
6. Responsive → Test at 4 breakpoints
7. Polish → Final animations + accessibility audit

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — dropdown built with native HTML + React state + Tailwind CSS
- Component is decoupled from parent form — communicates via `hashtags`, `selected`, `onChange` props
- Dark dropdown theme (`#00070C`) contrasts with parent modal's cream theme (`#FFF8E1`) — this is intentional
- Selected items sorted to top of list per design (plan.md notes section)
- The 13 predefined hashtags are temporary constants; replace with Supabase fetch when data source is finalized
- Check Circle icon: green circle `#4CAF50` with white checkmark — not a simple checkmark
- Item height 40px is slightly below 44px touch target minimum — increase on mobile breakpoint
- Add `hashtag.empty_list` i18n key (noted as missing in plan.md)
- Mark tasks complete as you go: `[x]`
