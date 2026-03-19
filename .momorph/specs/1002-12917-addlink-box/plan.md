# Implementation Plan: Addlink Box (Add Link Dialog)

**Frame**: `1002:12917-Addlink Box`
**Date**: 2026-03-09
**Spec**: `specs/1002-12917-addlink-box/spec.md`

---

## Summary

Build a lightweight dialog/popover for inserting hyperlinks in the Write Kudo rich text editor. The dialog provides two input fields (display text and URL), Cancel/Save action buttons, and inline validation. It opens from the editor toolbar's Link button, validates inputs (requiring http/https URLs), sanitizes against XSS, and returns link data to the parent editor on save. The component is a focused Client Component that shares the parent Kudo modal's warm cream visual language.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, next/font (Montserrat)
**Database**: N/A — no server-side data, purely client-side dialog
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: React useState (local form state only)
**API Style**: N/A — callback props to parent editor component

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (React 19, Tailwind CSS 4 — no new deps)
- [x] Adheres to folder structure guidelines (App Router: `src/components/kudo/`)
- [x] Meets security requirements (Principle IV: URL sanitization, XSS prevention, http/https only)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: Client Component only where needed — dialog is interactive)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, stacked layout on mobile)
- [x] Edge-compatible (Principle VI: No Node.js APIs, no `crypto`/`fs`/`Buffer`)
- [x] Simplicity (Principle VII: Minimal state, no external libraries for validation)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Single Client Component `<AddLinkDialog />` under `src/components/kudo/`. Self-contained with no sub-components — the dialog is simple enough (title, 2 fields, 2 buttons) to keep in one file.
- **Styling Strategy**: Tailwind CSS 4 utility classes matching design tokens from `design-style.md`. Shared visual language with parent Kudo modal (cream bg, gold accents, Montserrat).
- **Data Fetching**: None — this is a purely client-side form dialog.

### Backend Approach

- **API Design**: N/A — no server interaction. Link data is passed back to the parent editor via callback props.
- **Data Access**: N/A
- **Validation**: Client-side URL validation using the `URL` constructor (Web API, Cloudflare Workers compatible). Protocol whitelist: `http:` and `https:` only. No Zod or external validation library needed (Principle VII).

### Integration Points

- **Existing Services**: None — self-contained dialog
- **Shared Components**: None currently, but input field styles match the parent Kudo modal's fields and could be extracted later if needed
- **API Contracts**: Callback interface:
  ```typescript
  interface AddLinkDialogProps {
    isOpen: boolean;
    initialText?: string; // Pre-filled from editor selection
    onSave: (data: { text: string; url: string }) => void;
    onCancel: () => void;
  }
  ```

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/1002-12917-addlink-box/
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
│       └── add-link-dialog.tsx    # AddLinkDialog (Client Component)
├── libs/
│   └── validation/
│       └── url.ts                 # URL validation utility (sanitize + validate)

# Test Files
__tests__/
├── unit/
│   └── libs/validation/
│       └── url.test.ts            # URL validation unit tests
├── integration/
│   └── components/kudo/
│       └── add-link-dialog.test.tsx  # Dialog integration tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

> All required packages (`react`, `tailwindcss`, `next`) are already installed. URL validation uses the native `URL` Web API.

---

## Implementation Strategy

### Phase 0: Foundation — URL Validation Utility

**Purpose**: Create the reusable URL validation/sanitization function that enforces security requirements.

1. **Create `src/libs/validation/url.ts`** — URL validation utility
   - `validateUrl(input: string): { valid: boolean; error?: string }`
   - Accept only `http:` and `https:` protocols
   - Reject `javascript:`, `data:`, `vbscript:`, `file:`, `ftp:` and all other protocols (FR-007, TR-002)
   - Enforce length: 5–2048 characters (FR-003)
   - Use native `URL` constructor for parsing (Cloudflare Workers compatible, Principle VI)
   - Return localized error keys for i18n

2. **Write tests first (TDD, Principle III)**:
   - Valid: `https://example.com`, `http://example.com/path?q=1`
   - Invalid: `javascript:alert(1)`, `data:text/html,...`, `ftp://files.com`, empty string, spaces, `not-a-url`, strings > 2048 chars, missing protocol

### Phase 1: User Story 1 — Add a Link with Text and URL (P1, Core)

**Purpose**: Build the dialog UI with input fields and save/cancel actions.

1. **Create `src/components/kudo/add-link-dialog.tsx`** — AddLinkDialog (Client Component)
   - `'use client'` directive
   - Props: `isOpen`, `initialText?`, `onSave`, `onCancel`
   - Local state: `text`, `url`, `textError`, `urlError`, `isSubmitting`
   - Pre-fill `text` from `initialText` prop when dialog opens (FR-008)
   - Dialog container: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing title
   - Focus management:
     - Trap focus within dialog while open (custom hook or manual implementation)
     - Auto-focus "Noi dung" (text) input on open
     - Return focus to trigger element on close
   - Title: "Them duong dan" (centered, Montserrat 32px/700)
   - Text field: Label "Noi dung" + input (row layout desktop, stacked mobile)
   - URL field: Label "URL" + input with link icon (same layout pattern)
   - Action row: Cancel ("Huy" + X icon) and Save ("Luu" + Link icon) buttons
   - Save click: validate both fields → call `onSave({ text, url })` → parent closes dialog
   - Cancel click: call `onCancel()` → parent closes dialog
   - Escape key and click-outside: call `onCancel()`
   - Animations: fade-in/out 150ms on open/close

2. **Styles per `design-style.md`**:
   - Dialog: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`, cream bg `#FFF8E1`, 24px radius, 40px padding, z-60
   - Inputs: 56px height, border `#998C5F`, radius 8px, white bg, Montserrat 16px/700
   - Save button: flex-1, `#FFEA9E` bg, 8px radius, Montserrat 22px/700
   - Cancel button: border `#998C5F`, 4px radius, gold/10 bg, Montserrat 16px/700
   - Overlay: semi-transparent backdrop behind dialog

### Phase 2: User Story 2 — URL Validation (P2)

**Purpose**: Enforce URL format validation and display inline errors.

1. **Integrate validation in dialog**:
   - On "Luu" click, validate text (non-empty, 1-100 chars, not whitespace-only) and URL (valid http/https, 5-2048 chars)
   - Display validation errors inline below each field
   - Error styling: red border `#CF1322`, error text 14px/500
   - `aria-describedby` linking error messages to fields
   - `aria-live="polite"` on error container for screen reader announcements
   - Block submission when validation fails

2. **Input states**:
   - Default: border `#998C5F`
   - Focus: border `2px solid #FFEA9E`
   - Error: border `2px solid #CF1322`

### Phase 3: User Story 3 — Cancel Without Saving (P3)

**Purpose**: Ensure clean dismissal without side effects.

1. **Cancel behaviors** (most already implemented in Phase 1):
   - "Huy" button click → close without saving
   - Escape key → close without saving
   - Click outside dialog → close without saving
   - Verify no editor content modification on cancel
   - Verify focus returns to toolbar Link button

### Phase 4: Responsive Design

**Purpose**: Ensure dialog works across all breakpoints.

1. **Apply responsive styles per `design-style.md`**:
   - Mobile (< 768px): `width: calc(100vw - 32px)`, padding 16px, radius 16px, stacked fields (flex-col), stacked buttons (flex-col, both full-width), title 24px, labels 18px
   - Tablet (768–1023px): `width: 90vw, max-width: 752px`, padding 24px, title 28px, row layout for fields
   - Desktop (1024px+): Match Figma exactly (752px, 40px padding)
   - Wide (1280px+): Same as desktop

2. **Verify touch targets**: All buttons and inputs >= 44x44px on mobile (min-height: 48px on action buttons)

3. **Test at 4 breakpoints**: 320px, 768px, 1024px, 1440px

### Phase 5: Polish & Accessibility

**Purpose**: Accessibility audit and final refinements.

1. **Accessibility audit**:
   - Verify focus trap works correctly (Tab cycles within dialog)
   - Verify `aria-modal`, `aria-labelledby`, `aria-required`, `aria-describedby` attributes
   - Verify validation errors announced via `aria-live`
   - Verify color contrast meets WCAG AA 4.5:1
   - Run axe-core automated check

2. **Animation polish**:
   - Dialog open: fade-in + scale 150ms ease-out
   - Dialog close: fade-out 150ms
   - Button hover/active state transitions: 150ms
   - Input focus border transition: 150ms

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Rich text editor integration timing | Med | Med | Tiptap is confirmed as the editor (see `specs/520-11602-viet-kudo/plan.md` Phase 4). Dialog is standalone with callback props; Tiptap integration is handled in the parent `kudo-editor.tsx`. Dialog can be built and tested independently. |
| Focus trap conflicts with parent Kudo modal | Med | Med | When AddLinkDialog opens, suspend the parent KudoModal's focus trap (e.g., via a shared `isFocusTrapActive` state or by checking if a child dialog is open before trapping). Ensure z-index layering: dialog z-60 > modal z-50. Test that Tab cycles only within AddLinkDialog while it is open, and resumes cycling within KudoModal after close. |
| URL constructor behavior differences across runtimes | Low | Med | `URL` is a Web API standard supported on Cloudflare Workers; test edge cases in Vitest |
| XSS via URL field (e.g., `javascript:` protocol) | Low | High | Strict protocol whitelist (http/https only); validate server-side if URL is stored |

### Estimated Complexity

- **Frontend**: Low-Medium — Single dialog component, straightforward form with validation
- **Backend**: None — No server-side work
- **Testing**: Low — Unit tests for URL validation, integration tests for dialog behavior

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: AddLinkDialog ↔ URL validation utility ↔ Parent editor callback
- [ ] **External dependencies**: None
- [ ] **Data layer**: None
- [x] **User workflows**: Open dialog → fill fields → validate → save/cancel → return to editor

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Form validation, save/cancel flows, focus management |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive layout at 4 breakpoints, touch targets |

### Test Environment

- **Environment type**: Local (Vitest + jsdom/happy-dom for unit/integration, Playwright for E2E)
- **Test data strategy**: Inline test fixtures (valid/invalid URLs, text inputs)
- **Isolation approach**: Fresh component render per test

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Parent callbacks (onSave, onCancel) | Mock (vi.fn()) | Verify callback invocations with correct arguments |
| URL validation utility | Real | Small pure function, no reason to mock |
| Rich text editor | Mock | Editor integration is out of scope; mock the parent context |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open dialog → enter text and valid URL → click Save → onSave called with correct data
   - [ ] Open dialog with initialText → text field pre-filled → modify URL → Save
   - [ ] Open dialog → click Cancel → onCancel called, no data returned

2. **Error Handling**
   - [ ] Empty text field → Save → "Vui long nhap noi dung" error displayed
   - [ ] Invalid URL (no protocol) → Save → "URL khong hop le" error displayed
   - [ ] `javascript:alert(1)` URL → Save → error displayed, XSS blocked
   - [ ] URL > 2048 chars → Save → error displayed
   - [ ] Whitespace-only text → Save → treated as empty, error displayed

3. **Edge Cases**
   - [ ] Escape key closes dialog without saving
   - [ ] Click outside closes dialog without saving
   - [ ] Focus trapped within dialog while open
   - [ ] Focus returns to trigger on close
   - [ ] Double-click Save does not call onSave twice (isSubmitting guard)

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react for component testing
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| URL validation utility | 95%+ | High |
| Dialog form logic (validate + submit) | 90%+ | High |
| Accessibility (focus trap, ARIA) | 85%+ | High |
| Responsive layout | Visual regression | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined (callback props interface — no server API)
- [x] Rich text editor library selected: Tiptap (see `specs/520-11602-viet-kudo/plan.md`; integration deferred; dialog works standalone via callbacks)

### External Dependencies

- Parent Write Kudo modal (frame 520:11602) — dialog is a child component
- Rich text editor: Tiptap (confirmed in parent plan) — dialog communicates via `onSave` callback, decoupled from editor internals
- Icon assets: Link icon (24x24), Close/X icon (24x24) — download from Figma or use inline SVG

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **No new npm packages needed.** URL validation uses the native `URL` Web API. Focus trapping can be implemented with a small custom hook (~20 lines) rather than pulling in a library like `focus-trap-react` (Principle VII).
- **Decoupled from editor**: The dialog communicates exclusively through `onSave({ text, url })` and `onCancel()` callbacks. This means it can be developed and tested before the rich text editor integration. The parent Write Kudo plan (`specs/520-11602-viet-kudo/plan.md`, Phase 4) specifies Tiptap as the editor. Integration: the `kudo-editor.tsx` toolbar Link button (C.5) will open this dialog, passing `initialText` from the editor selection. On save, the editor calls `editor.chain().focus().insertContent({ type: 'text', text, marks: [{ type: 'link', attrs: { href: url } }] }).run()`.
- **Shared visual language**: The dialog reuses the exact same design tokens as the parent Kudo modal (cream bg `#FFF8E1`, border `#998C5F`, gold buttons `#FFEA9E`, Montserrat typography). Consider extracting shared Tailwind classes or design tokens if the Kudo modal components are built first.
- **z-index layering**: Dialog uses z-60, parent Kudo modal uses z-50. The dialog may optionally add its own semi-transparent overlay or rely on the parent modal's overlay.
- **i18n**: All user-facing strings have translation keys defined in the spec. Implementation should use the same i18n approach established in the Login feature (`src/libs/i18n/translations.ts`).
