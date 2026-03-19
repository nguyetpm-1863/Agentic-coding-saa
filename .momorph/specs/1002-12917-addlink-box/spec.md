# Feature Specification: Addlink Box (Add Link Dialog)

**Frame ID**: `1002:12917`
**Frame Name**: `Addlink Box`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Draft

---

## Overview

The "Addlink Box" is a dialog/popover for inserting hyperlinks in the rich text editor used within the "Viet Kudo" (Write Kudo) modal. It provides two input fields — one for the display text ("Noi dung") and one for the URL — along with Cancel ("Huy") and Save ("Luu") action buttons. The dialog opens when the user clicks the Link toolbar button (C.5) in the rich text editor and closes after saving or cancelling.

The dialog uses the same warm cream background (`#FFF8E1`) as the parent Kudo modal, with consistent border and typography styles. It is a focused, lightweight form overlay that validates both fields before inserting a link into the editor content.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add a Link with Text and URL (Priority: P1)

As a user composing a Kudo, I want to add a hyperlink with custom display text so that I can reference external resources in my appreciation message.

**Why this priority**: This is the core purpose of the dialog. Without the ability to insert a link, the toolbar link button has no function.

**Independent Test**: Click the Link toolbar button, enter display text and a valid URL, click "Luu", and verify the link is inserted into the editor with correct text and href.

**Acceptance Scenarios**:

1. **Given** the rich text editor is focused, **When** the user clicks the Link toolbar button (C.5), **Then** the Addlink Box dialog opens centered over the editor area, and focus moves to the "Noi dung" (Content) input field.

2. **Given** the dialog is open with both fields filled with valid values (text: "Example", URL: "https://example.com"), **When** the user clicks "Luu" (Save), **Then** the system validates both fields, inserts an `<a>` element with the given text and href into the editor at the cursor position, and closes the dialog.

3. **Given** the link is successfully inserted, **When** the dialog closes, **Then** focus returns to the rich text editor at the position after the inserted link.

4. **Given** the user has selected text in the editor before opening the dialog, **When** the dialog opens, **Then** the "Noi dung" field SHOULD be pre-filled with the selected text.

---

### User Story 2 - Validate URL Format (Priority: P2)

As a user, I want the system to validate the URL I enter so that only valid links are inserted into my Kudo.

**Why this priority**: Invalid URLs would create broken links in published Kudos, degrading content quality.

**Independent Test**: Enter various invalid URLs (no protocol, spaces, empty) and verify validation errors appear. Enter valid URLs and verify acceptance.

**Acceptance Scenarios**:

1. **Given** the URL field contains an invalid value (e.g., "not-a-url", "ftp://example.com", "javascript:alert(1)"), **When** the user clicks "Luu", **Then** a validation error "URL khong hop le" appears below the URL field, the field border turns red, and submission is blocked.

2. **Given** the URL field is empty, **When** the user clicks "Luu", **Then** a validation error is displayed and submission is blocked.

3. **Given** the URL field contains a valid http/https URL, **When** the user clicks "Luu", **Then** no URL error is shown and the link is inserted (assuming text is also valid).

4. **Given** the text field is empty or whitespace-only, **When** the user clicks "Luu", **Then** a validation error "Vui long nhap noi dung" appears below the text field.

---

### User Story 3 - Cancel Without Saving (Priority: P3)

As a user, I want to cancel the link insertion so that I can return to editing without adding a link.

**Why this priority**: Users need an escape hatch to close the dialog without side effects.

**Independent Test**: Open the dialog, enter some text, click "Huy", and verify the dialog closes without modifying the editor content.

**Acceptance Scenarios**:

1. **Given** the dialog is open (with or without data entered), **When** the user clicks "Huy" (Cancel), **Then** the dialog closes immediately without inserting any link, and focus returns to the editor.

2. **Given** the dialog is open, **When** the user presses `Escape`, **Then** the dialog closes without saving.

3. **Given** the dialog is open, **When** the user clicks outside the dialog, **Then** the dialog closes without saving.

---

### Edge Cases

- What happens when the user pastes a very long URL? -> Enforce max 2048 characters with validation error.
- What happens when the user enters only spaces in the text field? -> Treat as empty and show required error.
- What happens when the user enters a URL without protocol? -> Show validation error requiring http:// or https://.
- What happens when the dialog opens on mobile? -> Dialog should be near-full-width with stacked fields.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dialog Container | 1002:12917 | 752x388px, cream background, 24px radius, 40px padding | Modal overlay |
| Title (A) | — | "Them duong dan" heading, centered | Static display |
| Text Field (B) | — | Label "Noi dung" + input 610x56px | Type to enter display text |
| URL Field (C) | — | Label "URL" + input with link icon 610x56px | Type to enter URL |
| Cancel Button (D.1) | — | "Huy" with X icon, secondary outline | Click closes dialog |
| Save Button (D.2) | — | "Luu" with link icon, primary yellow | Click validates and saves |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Rich text editor toolbar Link button (C.5) in Viet Kudo modal
- **To**: Back to rich text editor (after save or cancel)
- **Deep link**: None — this is a nested dialog within the Kudo modal
- **Triggers**:
  - Link toolbar button -> Opens dialog
  - "Luu" (Save) button -> Validates, inserts link, closes dialog
  - "Huy" (Cancel) button -> Closes dialog
  - `Escape` key -> Closes dialog
  - Click outside dialog -> Closes dialog

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Dialog open (fade-in 150ms), dialog close (fade-out 150ms), button hover/active states (150ms)
- **Accessibility**:
  - Dialog MUST have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the title.
  - Focus MUST be trapped within the dialog while open.
  - All form fields MUST have associated `<label>` elements.
  - Required fields MUST have `aria-required="true"`.
  - Validation errors MUST be associated with fields via `aria-describedby` and announced via `aria-live="polite"`.
  - On dialog close, focus MUST return to the toolbar Link button.
  - Color contrast MUST meet WCAG AA 4.5:1 ratio.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dialog with text and URL input fields when the Link toolbar button is clicked.
- **FR-002**: Text field MUST be required, 1-100 characters, no whitespace-only values.
- **FR-003**: URL field MUST be required, 5-2048 characters, valid http:// or https:// URL format.
- **FR-004**: "Luu" button MUST validate both fields before inserting the link into the editor.
- **FR-005**: "Huy" button MUST close the dialog without modifying editor content.
- **FR-006**: Dialog MUST close on Escape key press and click outside.
- **FR-007**: URLs MUST be sanitized to prevent XSS — only http:// and https:// protocols allowed (constitution Principle IV).
- **FR-008**: If text was selected in the editor before opening, the text field SHOULD be pre-filled.

### Technical Requirements

- **TR-001**: Dialog MUST be a Client Component (`'use client'`) as it requires interactivity. Keep it minimal (constitution Principle VII).
- **TR-002**: URL validation MUST reject `javascript:`, `data:`, and other non-http/https protocols (constitution Principle IV).
- **TR-003**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-004**: Link content MUST be sanitized before insertion into the rich text editor to prevent XSS.

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| text | string | "" (or selected text) | AddLinkDialog | Display text input value |
| url | string | "" | AddLinkDialog | URL input value |
| textError | string \| null | null | AddLinkDialog | Text field validation error |
| urlError | string \| null | null | AddLinkDialog | URL field validation error |
| isSubmitting | boolean | false | AddLinkDialog | Submission state |

### Loading/Error States

- **Dialog opening**: Fade-in (150ms). No skeleton needed — form is empty or pre-filled.
- **Validation errors**: Inline below each field, announced via `aria-live="polite"`.
- **Saving**: Brief disabled state on "Luu" button while inserting link into editor.

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `addlink.title` | Them duong dan | Add Link |
| `addlink.text_label` | Noi dung | Content |
| `addlink.url_label` | URL | URL |
| `addlink.cancel` | Huy | Cancel |
| `addlink.save` | Luu | Save |
| `addlink.error_text_required` | Vui long nhap noi dung | Please enter content |
| `addlink.error_url_invalid` | URL khong hop le | Invalid URL |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can insert a valid link in under 10 seconds (excluding typing time).
- **SC-002**: Validation errors display within 100ms of "Luu" click.
- **SC-003**: Dialog opens within 150ms of toolbar button click.
- **SC-004**: Dialog passes WCAG AA automated accessibility checks.
- **SC-005**: No XSS payloads can be inserted via the URL field.

---

## Out of Scope

- Editing existing links — this dialog is for inserting new links only.
- Link preview or unfurling — the dialog only collects text and URL.
- Removing links — handled by the editor's built-in functionality.
- Bookmark or saved links — no link history or suggestions.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Parent feature spec exists (`.momorph/specs/520-11602-viet-kudo/spec.md`)
- [ ] Rich text editor library selected and integrated

---

## Notes

- This dialog is a child component of the Viet Kudo modal's rich text editor. It shares the same visual language (cream background, gold accents, Montserrat typography).
- The dialog container is 752x388px at desktop — same width as the parent modal but shorter, as it only contains a title, two fields, and action buttons.
- The Save button at 502x60px dominates the action row, consistent with the parent modal's Send button pattern.
- The Cancel button uses the same secondary outline style as the parent modal's Cancel button.
- Field labels use the same 22px/700 Montserrat style as other form labels in the Kudo modal.
