# Tasks: Addlink Box (Add Link Dialog)

**Frame**: `1002:12917-Addlink Box`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download icons and verify asset availability for the dialog

- [x] T001 Download media assets from Figma using `get_media_files` tool: Link icon (24x24), Close/X icon (24x24) → `public/images/kudo/`
- [x] T002 Verify all icon assets exist and follow kebab-case naming | `public/images/kudo/`

---

## Phase 2: Foundation (Types & Validation Utility)

**Purpose**: Create the URL validation utility and type definitions that the dialog depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create URL validation utility: `validateUrl(input: string): { valid: boolean; error?: string }`, accept only `http:` and `https:` protocols, reject `javascript:`, `data:`, `vbscript:`, `file:`, `ftp:` and all others, enforce length 5–2048 characters, use native `URL` constructor (Cloudflare Workers compatible), return error keys for i18n | `src/libs/validation/url.ts`
- [x] T004 [P] Add i18n translation keys for Addlink Box: `addlink.title`, `addlink.text_label`, `addlink.url_label`, `addlink.cancel`, `addlink.save`, `addlink.error_text_required`, `addlink.error_url_invalid` with Vietnamese and English values per spec i18n table | `src/libs/i18n/translations.ts`

**Checkpoint**: Foundation ready — URL validation works, translation keys defined, dialog implementation can begin

---

## Phase 3: User Story 1 — Add a Link with Text and URL (Priority: P1) 🎯 MVP

**Goal**: User can open the dialog, enter display text and a URL, click "Luu" to save, or dismiss via "Huy"/Escape/click-outside. Focus is trapped within the dialog while open.

**Independent Test**: Render `<AddLinkDialog isOpen={true} onSave={fn} onCancel={fn} />`, enter text "Example" and URL "https://example.com", click "Luu", verify `onSave` called with `{ text: "Example", url: "https://example.com" }`. Click "Huy", verify `onCancel` called. Press Escape, verify `onCancel` called.

### Component (US1)

- [x] T005 [US1] Create AddLinkDialog Client Component with `'use client'` directive, props: `isOpen`, `initialText?`, `onSave: (data: { text: string; url: string }) => void`, `onCancel: () => void`. Local state: `text`, `url`, `textError`, `urlError`, `isSubmitting`. Render dialog container with `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing title. Structure: title "Them duong dan" (centered, Montserrat 32px/700, `#00101A`), text field row (label "Noi dung" 22px/700 + input `flex-1 h-14 border-[#998C5F] rounded-lg bg-white px-6 py-4`), URL field row (same layout + Link icon 24x24 right-aligned inside input), action row (Cancel "Huy" + X icon with secondary outline style `border-[#998C5F] rounded bg-[#FFEA9E]/10 px-10 py-4`, Save "Luu" + Link icon with primary style `flex-1 h-[60px] bg-[#FFEA9E] rounded-lg`). Dialog container: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[752px] min-h-[388px] bg-[#FFF8E1] rounded-3xl p-10 z-[60] flex flex-col gap-8`. Semi-transparent overlay backdrop behind dialog. Pre-fill `text` from `initialText` prop when dialog opens. Auto-focus "Noi dung" input on open. Save click: call `onSave({ text, url })`. Cancel click: call `onCancel()`. Escape key: call `onCancel()`. Click outside dialog: call `onCancel()`. Implement focus trap within dialog while open (custom implementation, no external library). On close, return focus to previously focused element | `src/components/kudo/add-link-dialog.tsx`

**Checkpoint**: User Story 1 complete — dialog opens, accepts input, saves/cancels correctly with focus management

---

## Phase 4: User Story 2 — URL Validation (Priority: P2)

**Goal**: When user clicks "Luu", both fields are validated. Invalid input shows inline errors below each field with red border styling. Submission is blocked until errors are resolved.

**Independent Test**: Enter empty text and click "Luu" — verify "Vui long nhap noi dung" error appears. Enter `javascript:alert(1)` as URL and click "Luu" — verify "URL khong hop le" error appears and field border turns red. Enter valid text + `https://example.com` — verify no errors and `onSave` called.

- [x] T006 [US2] Integrate validation in AddLinkDialog: on "Luu" click validate text field (non-empty, 1–100 chars, not whitespace-only) and URL field (call `validateUrl` from `src/libs/validation/url.ts`), display validation errors inline below each field using i18n keys (`addlink.error_text_required`, `addlink.error_url_invalid`), error styling: border `2px solid #CF1322` on invalid field + error text Montserrat 14px/500 in `#CF1322`, link fields to errors via `aria-describedby`, add `aria-required="true"` to both inputs, add `aria-live="polite"` on error containers for screen reader announcements, block submission when validation fails, set `isSubmitting` to true during save to prevent double-click, input states: default border `#998C5F`, focus `2px solid #FFEA9E`, error `2px solid #CF1322` | `src/components/kudo/add-link-dialog.tsx`

**Checkpoint**: User Stories 1 & 2 complete — dialog validates input and prevents invalid links

---

## Phase 5: User Story 3 — Cancel Without Saving (Priority: P3)

**Goal**: All dismissal paths (Cancel button, Escape, click-outside) close the dialog cleanly without side effects. Focus returns to the trigger element.

**Independent Test**: Open dialog, enter text and URL, click "Huy" — verify `onCancel` called and no data returned. Press Escape — same. Click outside — same. Verify focus returns to the element that was focused before dialog opened.

- [x] T007 [US3] Verify and polish cancel behaviors in AddLinkDialog: confirm "Huy" button click calls `onCancel()` without modifying any state, confirm Escape key closes without saving, confirm click-outside closes without saving, verify form state resets when dialog reopens (clear previous text/url/errors when `isOpen` transitions from false to true), verify focus returns to the previously focused element (the toolbar Link button) on all close paths | `src/components/kudo/add-link-dialog.tsx`

**Checkpoint**: All user stories complete — dialog handles all dismissal paths correctly

---

## Phase 6: Responsive Design

**Purpose**: Ensure dialog displays correctly at all 4 breakpoints with proper touch targets

- [x] T008 [US3] Apply mobile-first responsive styles to AddLinkDialog: mobile defaults (`width: calc(100vw - 32px)`, padding 16px, border-radius 16px, fields stacked `flex-col` instead of `flex-row`, action buttons stacked `flex-col` both full-width with `min-height: 48px`, title 24px, labels 18px), `md:` tablet (width `90vw max-width 752px`, padding 24px, title 28px, row layout for fields), `lg:` desktop (match Figma: 752px width, 40px padding, 32px title, row layout), `xl:` wide (same as desktop) | `src/components/kudo/add-link-dialog.tsx`
- [x] T009 [P] Verify touch targets: all buttons and inputs >= 44x44px on mobile (Cancel and Save buttons `min-height: 48px`), inputs `h-14` (56px) | `src/components/kudo/add-link-dialog.tsx`

**Checkpoint**: Dialog is fully responsive across all breakpoints

---

## Phase 7: Polish & Accessibility

**Purpose**: Animations, accessibility audit, and final refinements

### Accessibility

- [x] T010 [P] Verify focus trap works correctly: Tab cycles only within dialog elements (text input → URL input → Cancel → Save → text input), Shift+Tab reverses order, focus does not escape to parent page | `src/components/kudo/add-link-dialog.tsx`
- [x] T011 [P] Verify ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on dialog, `aria-required="true"` on inputs, `aria-describedby` on inputs linked to error messages, `aria-live="polite"` on error containers | `src/components/kudo/add-link-dialog.tsx`
- [x] T012 [P] Verify color contrast meets WCAG AA 4.5:1: title `#00101A` on `#FFF8E1`, input text `#00101A` on `#FFFFFF`, error text `#CF1322` on `#FFF8E1`, button text `#00101A` on `#FFEA9E` | `src/components/kudo/add-link-dialog.tsx`

### Animations

- [x] T013 [P] Add dialog open/close animation: fade-in + scale from 0.95 to 1 (150ms ease-out) on open, fade-out (150ms) on close using CSS transitions or Tailwind `animate-*` | `src/components/kudo/add-link-dialog.tsx`
- [x] T014 [P] Add button hover/active state transitions: Cancel button hover `rgba(255, 234, 158, 0.20)` 150ms, Save button hover `#FFE080` 150ms, Save active `#FFD760`, input focus border transition 150ms | `src/components/kudo/add-link-dialog.tsx`

### Final

- [x] T015 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1 MVP) ──→ Phase 4 (US2) ──→ Phase 5 (US3) ──→ Phase 6 (Responsive) ──→ Phase 7 (Polish)
                                                    │
                                                    └─ STOP & VALIDATE (can test dialog standalone after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (icons must exist) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (dialog must exist to add validation)
- **US3 (Phase 5)**: Depends on Phase 4 (verify all close paths work with validation state)
- **Responsive (Phase 6)**: Depends on Phase 5 (responsive applies to final component state)
- **Polish (Phase 7)**: Depends on Phase 6

### Within Each Phase

- Tasks marked [P] can be created in parallel (different concerns, no file conflicts)
- Validation integration (T006) depends on URL utility (T003) and dialog component (T005)
- Responsive (T008) depends on complete dialog structure from all user stories

### Parallel Opportunities

**Phase 2**: T003 and T004 can run in parallel (url.ts vs translations.ts)
**Phase 6**: T008 and T009 can run in parallel (responsive styles vs touch target verification)
**Phase 7**: T010, T011, T012, T013, T014 can ALL run in parallel (independent audit/enhancement tasks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (User Story 1 — Dialog UI)
3. **STOP and VALIDATE**: Test dialog with mock callbacks
4. Continue to Phase 4–7 for validation, cancel polish, responsive, and accessibility

### Incremental Delivery

1. Setup + Foundation → URL validation utility ready
2. Add User Story 1 → Test → Dialog opens/saves/cancels
3. Add User Story 2 → Test → Validation works
4. Add User Story 3 → Test → All dismissal paths clean
5. Responsive → Test at 4 breakpoints
6. Polish → Final accessibility + animations

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — URL validation uses native `URL` Web API, focus trap is custom (~20 lines)
- This dialog is decoupled from the rich text editor — communicates via `onSave`/`onCancel` callbacks
- The dialog shares visual language with the parent Kudo modal (`#FFF8E1` bg, `#998C5F` borders, `#FFEA9E` gold accents, Montserrat typography)
- z-index: dialog z-60 > parent Kudo modal z-50
- Icons (Link, Close/X) can be inline SVGs if Figma export is not available
- Mark tasks complete as you go: `[x]`
