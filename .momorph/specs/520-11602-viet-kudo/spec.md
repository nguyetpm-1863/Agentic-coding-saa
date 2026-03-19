# Feature Specification: Viet Kudo (Write Kudo)

**Frame ID**: `520:11602`
**Frame Name**: `Viet Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed
**Last Updated**: 2026-03-12
**Last Reviewed**: 2026-03-12

---

## Overview

The "Viet Kudo" (Write Kudo) screen is a modal/dialog for composing and sending a Kudo (peer appreciation message) to a colleague. It is opened from the Kudos Live Board page and overlays the page with a semi-transparent dark mask. The modal contains a multi-field form: recipient search, title/badge, rich text editor with formatting toolbar, hashtag selection, image upload, and an anonymous toggle. The form validates required fields and submits to create a new Kudo entry.

The modal uses a warm cream/yellow background (`#FFF8E1`) with dark text, contrasting the dark page behind it. Required fields are marked with red asterisks. The primary action "Gui" (Send) uses a solid yellow/gold background (`#FFEA9E`).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Write and Send a Kudo (Priority: P1)

As an authenticated user, I want to write and send a Kudo to a colleague so that I can publicly recognize and appreciate their contribution.

**Why this priority**: This is the core purpose of the modal. Without the ability to compose and send a Kudo, the entire feature has no value. It is the MVP.

**Independent Test**: Open the Kudo modal, fill in all required fields (recipient, title/badge, message content, at least 1 hashtag), click "Gui", and verify the Kudo is created successfully.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and on the Kudos page (`/kudos`), **When** they click the fixed icon button on the right side of the page, **Then** the modal opens with a dark overlay (`rgba(0, 16, 26, 0.80)`) covering the page, the modal is centered, and focus is trapped inside the modal.

2. **Given** the modal is open with all required fields filled (recipient, title/badge, message, at least 1 hashtag), **When** the user clicks "Gui" (Send), **Then** the system submits the Kudo via a server action, shows a loading state on the button, and on success closes the modal and refreshes the Live Board.

3. **Given** the Kudo submission fails (network error, server error), **When** the error occurs, **Then** the system displays an error message within the modal (aria-live region), re-enables the Send button, and preserves all form data so the user can retry.

4. **Given** the user clicks "Huy" (Cancel) or clicks outside the modal, **When** the action occurs, **Then** the modal closes without submitting. If any fields have been modified, a confirmation dialog SHOULD appear ("Discard changes?").

5. **Given** the modal is open, **When** the user presses `Escape`, **Then** the modal closes (with discard confirmation if data was entered).

---

### User Story 2 - Select Recipient with Autocomplete (Priority: P2)

As a user writing a Kudo, I want to search and select a recipient from a dropdown so that I can quickly find the right colleague.

**Why this priority**: The recipient is a required field and the search/autocomplete interaction is critical for usability — users cannot memorize colleague IDs.

**Independent Test**: Click the recipient field, type a partial name, verify the dropdown shows matching users, select one, and verify the selection is displayed.

**Acceptance Scenarios**:

1. **Given** the recipient field is focused, **When** the user types at least 2 characters, **Then** the system queries the user search API and displays matching results in a dropdown with a debounce of 300ms.

2. **Given** search results are displayed, **When** the user clicks a result (or presses `Enter` on a highlighted result), **Then** the selected user is shown in the field and the dropdown closes.

3. **Given** the search query returns no results, **When** the dropdown is visible, **Then** a "No results found" message is displayed.

4. **Given** the user has selected a recipient, **When** they click the field again or the clear button, **Then** they can search for and select a different recipient.

5. **Given** the recipient field is empty, **When** the user attempts to submit, **Then** the field shows a validation error: "Vui long chon nguoi nhan" (Please select a recipient).

---

### User Story 3 - Rich Text Editing (Priority: P3)

As a user writing a Kudo, I want to format my appreciation message with bold, italic, strikethrough, numbered lists, links, and quotes so that my message is expressive and well-structured.

**Why this priority**: Rich text enhances the quality of Kudos but the core message can be sent as plain text. Formatting is an enhancement.

**Independent Test**: Type a message in the editor, apply each formatting option (bold, italic, strikethrough, numbered list, link, quote), and verify the formatting is applied and visible.

**Acceptance Scenarios**:

1. **Given** the text editor is focused, **When** the user clicks the Bold button (C.1) or presses `Ctrl+B`/`Cmd+B`, **Then** selected text becomes bold (or bold mode is toggled for subsequent typing).

2. **Given** the text editor is focused, **When** the user clicks the Italic button (C.2) or presses `Ctrl+I`/`Cmd+I`, **Then** selected text becomes italic.

3. **Given** the text editor is focused, **When** the user clicks the Strikethrough button (C.3), **Then** selected text gets strikethrough formatting.

4. **Given** the text editor is focused, **When** the user clicks the Numbered List button (C.4), **Then** a numbered list is inserted or the current line becomes a list item.

5. **Given** the text editor is focused, **When** the user clicks the Link button (C.5), **Then** an AddLink modal/dialog appears allowing the user to enter a URL for the selected text. This is the ONLY way to insert links — there is no standalone link field.

6. **Given** the text editor is focused, **When** the user clicks the Quote button (C.6), **Then** the current line/selection is formatted as a blockquote.

7. **Given** the text editor supports @ mentions, **When** the user types "@" followed by characters, **Then** a user suggestion dropdown appears (same search API as recipient), and selecting a user inserts an @mention.

8. **Given** the "Tieu chuan cong dong" (Community Standards) link is in the toolbar, **When** the user clicks it, **Then** it navigates to the community standards page (dedicated route).

---

### User Story 4 - Add Hashtags (Priority: P4)

As a user writing a Kudo, I want to add hashtags to categorize my Kudo so that it can be discovered and filtered on the Live Board.

**Why this priority**: Hashtags are required (min 1) but the interaction is simpler than rich text. They enable discoverability.

**Independent Test**: Click "+ Hashtag", select or type hashtags, verify chips appear with remove buttons, verify max 5 limit.

**Acceptance Scenarios**:

1. **Given** the hashtag section is visible, **When** the user clicks "+ Hashtag" button, **Then** a hashtag input/selection interface appears (either a text input or a predefined list).

2. **Given** hashtags are being added, **When** the user adds a hashtag, **Then** it appears as a chip/tag with an "x" remove button.

3. **Given** the user has added 5 hashtags, **When** they attempt to add another, **Then** the system prevents addition and the "+ Hashtag" button is disabled or hidden. The "Toi da 5" (Max 5) note is always visible.

4. **Given** a hashtag chip is displayed, **When** the user clicks the "x" button, **Then** the hashtag is removed.

5. **Given** no hashtags are selected, **When** the user attempts to submit, **Then** a validation error is shown: "Vui long chon it nhat 1 hashtag" (Please select at least 1 hashtag).

---

### User Story 5 - Upload Images (Priority: P5)

As a user writing a Kudo, I want to attach images to my Kudo so that I can include visual context or photos with my appreciation.

**Why this priority**: Images are optional and enhance Kudos but are not required for core functionality.

**Independent Test**: Click "+ Image", select images, verify thumbnails appear with remove buttons, verify max 5 limit.

**Acceptance Scenarios**:

1. **Given** the image section is visible, **When** the user clicks "+ Image" button, **Then** a file picker opens accepting image files only (JPEG, PNG, GIF, WebP). Non-image files MUST be rejected.

2. **Given** the user selects an image, **When** the upload begins, **Then** a thumbnail preview (80x80px, rounded corners) appears with an upload progress indicator.

3. **Given** the upload completes, **When** the thumbnail is displayed, **Then** it shows the image with a red circular "x" close button in the top-right corner.

4. **Given** the user has uploaded 5 images, **When** they attempt to add another, **Then** the "+ Image" button is disabled or hidden. The "Toi da 5" note is always visible.

5. **Given** an image thumbnail is displayed, **When** the user clicks the "x" close button, **Then** the image is removed from the form and the upload is cancelled/deleted.

6. **Given** an image upload fails, **When** the error occurs, **Then** the thumbnail shows an error state with a retry option.

---

### User Story 6 - Send Anonymously (Priority: P6)

As a user writing a Kudo, I want to optionally send it anonymously so that I can recognize someone without revealing my identity.

**Why this priority**: Anonymous sending is an optional enhancement that adds privacy flexibility.

**Independent Test**: Check the anonymous checkbox, verify the anonymous name field appears, fill it in, submit, and verify the Kudo is marked as anonymous.

**Acceptance Scenarios**:

1. **Given** the anonymous toggle is visible, **When** the user checks the "Gui loi cam on va ghi nhan an danh" checkbox, **Then** the anonymous mode is enabled and an optional text field for an anonymous display name appears.

2. **Given** anonymous mode is enabled, **When** the user submits the Kudo, **Then** the Kudo is created with the sender marked as anonymous. The Kudo displays the anonymous name (or a default "Anonymous") instead of the real user name.

3. **Given** anonymous mode is enabled, **When** the user unchecks the checkbox, **Then** the anonymous name field is hidden and the Kudo will be sent with the real user identity.

---

### User Story 7 - Form Validation and Error States (Priority: P7)

As a user, I want to see clear validation errors when I miss required fields so that I know what to fix before submitting.

**Why this priority**: Validation is critical for data integrity but is a cross-cutting concern that applies to all fields.

**Independent Test**: Attempt to submit with various missing required fields and verify each error message appears correctly.

**Acceptance Scenarios**:

1. **Given** the form has empty required fields, **When** the user clicks "Gui" (Send), **Then** the button remains disabled (the Send button MUST be disabled when required fields are incomplete).

2. **Given** all required fields are filled, **When** the form is valid, **Then** the "Gui" button becomes enabled with the yellow background (`#FFEA9E`).

3. **Given** the recipient field is empty, **When** focus leaves the field, **Then** the field border turns red and an error message appears below it.

4. **Given** the title/badge field is empty, **When** focus leaves the field, **Then** a validation error appears.

5. **Given** the message content is empty, **When** the user attempts to submit, **Then** validation prevents submission and highlights the editor.

6. **Given** no hashtags are selected, **When** the user attempts to submit, **Then** an error message appears in the hashtag section.

---

### Edge Cases

- What happens when the user search API is slow or fails? -> Show a loading spinner in the dropdown. On failure, display "Unable to load results. Please try again."
- What happens when the user pastes a very long message? -> Enforce a character limit (e.g., 2000 characters) with a counter in the editor.
- What happens when image upload fails midway? -> Show error state on the thumbnail with retry option. Do not block form submission for failed optional uploads (remove failed images).
- What happens when the user loses network during submission? -> Show error message, preserve form data, allow retry.
- What happens when the modal is opened on mobile? -> Modal should be full-screen or near-full-screen with scrollable content.
- What happens when the user types an @ mention for a deactivated user? -> Show the user in results but grayed out / non-selectable.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dark Overlay/Mask | 520:11646 | Full-screen dark overlay behind modal | Click closes modal (with confirmation if dirty) |
| Modal Container | 520:11647 | Centered modal (752x1012px), cream background, 24px radius | Scrollable if content overflows |
| Title | I520:11647;520:9870 | "Gui loi cam on va ghi nhan den dong doi" - centered heading | Static display |
| Recipient Field | I520:11647;520:9871 | Label "Nguoi nhan *" + search dropdown input | Click opens dropdown, type searches |
| Title/Badge Field | I520:11647;1688:10448 | Label "Danh hieu *" + text input + helper text | Type to enter badge title |
| Rich Text Toolbar | I520:11647;520:9877 | Bold, Italic, Strikethrough, Number List, Link, Quote buttons + "Tieu chuan cong dong" link | Each button toggles formatting |
| Text Editor | I520:11647;520:9886 | Textarea with placeholder and @ mention support | Type, paste, format text |
| Editor Helper | I520:11647;520:9887 | Hint text about @ mentions | Static display |
| Hashtag Section | I520:11647;520:9890 | Label "Hashtag *" + chip tags + "+ Hashtag" button | Add/remove hashtag chips |
| Image Section | I520:11647;520:9896 | Label "Image" + thumbnail row + "+ Image" button | Upload/remove images |
| Anonymous Toggle | I520:11647;520:14099 | Checkbox + "Gui loi cam on va ghi nhan an danh" label | Toggle anonymous mode |
| Cancel Button | I520:11647;520:9906 | "Huy" text with X icon, secondary outline style | Click closes modal |
| Send Button | I520:11647;520:9907 | "Gui" with send icon, primary yellow background | Click submits form (disabled when invalid) |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Kudos page (`/kudos`) — click the **fixed icon button positioned on the right side** of the page
- **To**: Back to Kudos page (after successful submission or cancel)
- **Deep link**: None — the modal is opened from within the `/kudos` page, not a separate route. The modal overlays the current page.
- **Trigger element**: A floating/fixed icon button anchored to the right side of the `/kudos` page. When clicked, it opens this modal.
- **Close triggers**:
  - "Gui" (Send) button -> Submits Kudo, closes modal on success
  - "Huy" (Cancel) button -> Closes modal (with confirmation if dirty)
  - Click dark overlay -> Closes modal (with confirmation if dirty)
  - `Escape` key -> Closes modal (with confirmation if dirty)

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Modal open (fade-in overlay 200ms + slide-up modal 200ms), modal close (reverse), button hover/active states (150ms), dropdown open/close (150ms)
- **Accessibility**:
  - Modal MUST trap focus — `Tab` cycles through interactive elements within the modal only.
  - Modal MUST have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the title.
  - All form fields MUST have associated `<label>` elements (or `aria-label`).
  - Required fields MUST have `aria-required="true"`.
  - Validation errors MUST be associated with fields via `aria-describedby` and announced via `aria-live="polite"`.
  - Toolbar buttons MUST have `aria-label` (e.g., "Bold", "Italic") and `aria-pressed` for toggle state.
  - Image remove buttons MUST have descriptive `aria-label` (e.g., "Remove image 1").
  - Color contrast MUST meet WCAG AA 4.5:1 ratio for all text.
  - On modal close, focus MUST return to the trigger element that opened the modal.
  - The rich text editor MUST be keyboard-navigable with standard shortcuts.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow authenticated users to compose and send a Kudo with recipient, title/badge, message content, and hashtags.
- **FR-002**: Recipient field MUST provide autocomplete search with debounced API calls (300ms).
- **FR-003**: Rich text editor MUST support bold, italic, strikethrough, numbered list, link, and quote formatting.
- **FR-004**: Rich text editor MUST support @ mentions that trigger a user search dropdown.
- **FR-005**: Hashtag field MUST enforce minimum 1 and maximum 5 hashtags.
- **FR-006**: Image upload MUST support up to 5 images with preview thumbnails.
- **FR-007**: Anonymous toggle MUST allow users to send Kudos without revealing their identity.
- **FR-008**: Send button MUST be disabled when any required field is incomplete.
- **FR-009**: System MUST validate all inputs server-side before creating the Kudo (constitution Principle IV).
- **FR-010**: "Tieu chuan cong dong" (Community Standards) link MUST be accessible from the toolbar and navigate to the community standards page.

### Technical Requirements

- **TR-001**: Modal MUST be a Client Component (`'use client'`) since it requires interactivity. Keep it as a thin wrapper; form submission MUST use a server action (constitution Principle I).
- **TR-002**: Image uploads MUST use Supabase Storage with appropriate bucket permissions (constitution Principle IV).
- **TR-003**: User search MUST use parameterized queries via Supabase client — never concatenate user input (constitution Principle IV).
- **TR-004**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-005**: Rich text content MUST be sanitized server-side before storage to prevent XSS (constitution Principle IV).
- **TR-006**: Image file type MUST be validated (image files only: JPEG, PNG, GIF, WebP) and file size MUST be validated client-side (max 4MB per image) and server-side.
- **TR-007**: Form state MUST be preserved if submission fails (no data loss on error).

### Key Entities *(if feature involves data)*

- **Kudo**: Recipient (user ID), sender (user ID or anonymous), title/badge (string), content (rich text/HTML), hashtags (string[]), images (URL[]), isAnonymous (boolean), anonymousName (string, optional), createdAt (timestamp).
- **User** (for recipient search): ID, name, avatar URL, department, level.
- **Hashtag**: Name (string) — may be predefined or user-created.
- **Image Upload**: File (Blob), storage URL (string), thumbnail URL (string).

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (session) | GET | Verify authentication, get sender info | Exists |
| `/api/users/search?q=` | GET | Search users for recipient and @ mentions | Predicted (New) |
| Server Action: `createKudo` | POST | Create a new Kudo entry | Predicted (New) |
| Supabase Storage upload | POST | Upload image files to storage bucket | Exists (Supabase built-in) |
| `/api/hashtags` | GET | Fetch available/suggested hashtags | Predicted (New) |

### Server Action: `createKudo` Detail

- **Input**: `{ recipientId: string, title: string, content: string (sanitized HTML), hashtags: string[], imageUrls: string[], isAnonymous: boolean, anonymousName?: string }`
- **Validation**:
  - `recipientId` MUST be a valid UUID of an existing user. Sender cannot kudo themselves.
  - `title` MUST be 1-200 characters.
  - `content` MUST be 1-2000 characters (stripped of HTML tags for length check). MUST be sanitized to prevent XSS.
  - `hashtags` MUST have 1-5 items, each 1-50 characters.
  - `imageUrls` MUST have 0-5 items, each MUST be a valid Supabase Storage URL.
  - `isAnonymous` MUST be boolean.
  - `anonymousName` if provided, MUST be 1-50 characters.
- **Auth**: Sender MUST be authenticated. Verify via Supabase server client.
- **Process**: Insert into `kudos` table with RLS enforced.
- **Success**: Return `{ success: true, kudoId: string }`.
- **Error**: Return `{ success: false, error: string }`.

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| isOpen | boolean | false | KudoModal | Modal visibility |
| recipientQuery | string | "" | RecipientSearch | Search input value |
| selectedRecipient | User \| null | null | RecipientSearch | Selected recipient |
| recipientResults | User[] | [] | RecipientSearch | Search results |
| isSearching | boolean | false | RecipientSearch | Search loading state |
| title | string | "" | TitleField | Badge/title input value |
| content | string | "" | RichTextEditor | Editor content (HTML) |
| hashtags | string[] | [] | HashtagField | Selected hashtags |
| images | ImageUpload[] | [] | ImageUpload | Uploaded images with status |
| isAnonymous | boolean | false | AnonymousToggle | Anonymous mode toggle |
| anonymousName | string | "" | AnonymousToggle | Anonymous display name |
| isSubmitting | boolean | false | KudoModal | Submission loading state |
| errors | Record<string, string> | {} | KudoModal | Field-level validation errors |
| isDirty | boolean | false | KudoModal | Track if any field has been modified |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Verify authentication, get sender info |
| User search results | Supabase DB query | Populate recipient and @mention dropdowns |
| Hashtag suggestions | Supabase DB query | Populate hashtag selection |
| Image URLs | Supabase Storage | Store and retrieve uploaded image URLs |

### Loading/Error States

- **Modal opening**: Fade-in overlay (200ms) + slide-up modal (200ms). No skeleton needed — form is empty.
- **Recipient search loading**: Spinner icon in the search dropdown while querying.
- **Recipient search error**: "Unable to load results" message in dropdown.
- **Image upload in progress**: Thumbnail placeholder with progress bar or spinner overlay.
- **Image upload error**: Red border on thumbnail with retry icon.
- **Form submission loading**: "Gui" button disabled with spinner, all form fields disabled.
- **Form submission error**: Error message in `aria-live="polite"` region at top of modal. Form fields re-enabled. Form data preserved.
- **Form submission success**: Modal closes, optional success toast on the Live Board.

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `kudo.modal_title` | Gui loi cam on va ghi nhan den dong doi | Send appreciation and recognition to your teammate |
| `kudo.recipient_label` | Nguoi nhan | Recipient |
| `kudo.recipient_placeholder` | Tim kiem | Search |
| `kudo.recipient_required` | Vui long chon nguoi nhan | Please select a recipient |
| `kudo.badge_label` | Danh hieu | Badge/Title |
| `kudo.badge_placeholder` | Danh tang mot danh hieu cho dong doi | Give a badge to your teammate |
| `kudo.badge_helper` | Vi du: Nguoi truyen dong luc cho toi. Danh hieu se hien thi lam tieu de Kudos cua ban. | Example: The person who inspires me. The badge will be displayed as your Kudo's title. |
| `kudo.badge_required` | Vui long nhap danh hieu | Please enter a badge/title |
| `kudo.content_placeholder` | Hay gui gam loi cam on va ghi nhan den dong doi tai day nhe! | Write your appreciation and recognition here! |
| `kudo.content_mention_hint` | Ban co the "@ + ten" de nhac toi dong nghiep khac | You can "@ + name" to mention another colleague |
| `kudo.content_required` | Vui long nhap noi dung | Please enter content |
| `kudo.community_standards` | Tieu chuan cong dong | Community Standards |
| `kudo.hashtag_label` | Hashtag | Hashtag |
| `kudo.hashtag_add` | + Hashtag | + Hashtag |
| `kudo.hashtag_max` | Toi da 5 | Max 5 |
| `kudo.hashtag_required` | Vui long chon it nhat 1 hashtag | Please select at least 1 hashtag |
| `kudo.image_label` | Image | Image |
| `kudo.image_add` | + Image | + Image |
| `kudo.image_max` | Toi da 5 | Max 5 |
| `kudo.anonymous_label` | Gui loi cam on va ghi nhan an danh | Send appreciation and recognition anonymously |
| `kudo.cancel` | Huy | Cancel |
| `kudo.send` | Gui | Send |
| `kudo.submit_error` | Khong the gui Kudo. Vui long thu lai. | Unable to send Kudo. Please try again. |
| `kudo.submit_success` | Gui Kudo thanh cong! | Kudo sent successfully! |
| `kudo.discard_confirm` | Ban co muon huy bo thay doi? | Do you want to discard changes? |
| `kudo.no_results` | Khong tim thay ket qua | No results found |
| `kudo.toolbar_bold` | In dam | Bold |
| `kudo.toolbar_italic` | In nghieng | Italic |
| `kudo.toolbar_strikethrough` | Gach ngang | Strikethrough |
| `kudo.toolbar_numbered_list` | Danh sach so | Numbered list |
| `kudo.toolbar_link` | Lien ket | Link |
| `kudo.toolbar_quote` | Trich dan | Quote |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully submit a Kudo with all required fields in under 30 seconds (excluding content writing time).
- **SC-002**: Recipient search returns results within 500ms for queries of 2+ characters.
- **SC-003**: Image uploads complete within 5 seconds for files under 4MB on good network.
- **SC-004**: Modal opens within 200ms of trigger click.
- **SC-005**: Form validation errors are displayed within 100ms of blur/submit.
- **SC-006**: Modal passes WCAG AA automated accessibility checks (axe-core or similar).

---

## Out of Scope

- Kudo editing after submission — separate feature.
- Kudo templates or pre-filled messages — future enhancement.
- Scheduled/delayed Kudo sending — not in current design.
- Multi-recipient Kudos (sending to multiple people at once) — design shows single recipient.
- Image cropping or editing within the modal — images are uploaded as-is.
- Rich text editor with bullet lists (only numbered lists per design).
- Kudos page (`/kudos`) itself — only the modal is in scope. The fixed trigger button on the `/kudos` page is part of the Kudos page implementation.
- Community Standards page content — only the link to it is in scope.
- **Standalone "Link" field** — the design does NOT include a separate link input field. The Link icon (C.5) in the toolbar opens an AddLink modal/dialog for inserting hyperlinks within the rich text content. The existing standalone `AddLinkBox` component should be repurposed as this toolbar-triggered dialog, not displayed as a separate form field.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The modal container is 752x1012px at desktop, with 40px internal padding, giving a 672px content width. It uses `border-radius: 24px` and `background-color: rgba(255, 248, 225, 1)` (#FFF8E1 — warm cream).
- The dark overlay behind the modal is `rgba(0, 16, 26, 0.80)` — same dark blue as the page background but with 80% opacity.
- Field labels use Montserrat 22px/700 (heavier than typical form labels) with dark text `#00101A`.
- Required field asterisks use `rgba(207, 19, 34, 1)` (red) with Noto Sans JP font at 16px.
- Input fields have `border: 1px solid #998C5F`, `border-radius: 8px`, `background: #FFF`, `padding: 16px 24px`.
- Placeholder text color is `rgba(153, 153, 153, 1)` (#999).
- The toolbar buttons use `border: 1px solid #998C5F`, `background: transparent`, `padding: 10px 16px`, with icon size 24x24px. The first button has `border-radius: 8px 0 0 0` (top-left rounded) and the last section has `border-radius: 0 8px 0 0` (top-right rounded).
- The text editor area is connected to the toolbar (no gap), with `border: 1px solid #998C5F`, `border-radius: 0 0 8px 8px`, `min-height: 120px`, `padding-left: 24px`, `background: #FFF`.
- Image thumbnails are 80x80px with `border-radius: 18px`, `border: 1px solid #998C5F`, `background: #FFF`. The image inside has `border: 1px solid #FFEA9E`, `border-radius: 4px`. The remove button is a 20px red circle (`rgba(212, 39, 29, 1)`) with a white X icon, positioned top-right.
- The "+ Hashtag" and "+ Image" buttons use a smaller size: `padding: 4px 8px`, `border: 1px solid #998C5F`, `border-radius: 8px`, `background: #FFF`, with 11px font and a plus icon.
- The "Huy" (Cancel) button uses the secondary outline style: `border: 1px solid #998C5F`, `background: rgba(255, 234, 158, 0.10)`, `border-radius: 4px`, `padding: 16px 40px`.
- The "Gui" (Send) button uses solid yellow: `background: rgba(255, 234, 158, 1)` (#FFEA9E), `border-radius: 8px`, `width: 502px`, `height: 60px`, `padding: 16px`, centered text with send icon.
- The anonymous toggle checkbox is 24x24px with `border: 1px solid #999`, `border-radius: 4px`, `background: #FFF`.
- The "Tieu chuan cong dong" (Community Standards) text uses `rgba(228, 96, 96, 1)` — a red/coral color indicating it is a link.
- The modal title "Gui loi cam on va ghi nhan den dong doi" is Montserrat 32px/700, line-height 40px, dark text `#00101A`, centered.
- Fonts required: Montserrat (700) and Noto Sans JP (700 for asterisk).
- The helper text for the badge field uses gray `#999` at 16px/24px: "Vi du: Nguoi truyen dong luc cho toi. Danh hieu se hien thi lam tieu de Kudos cua ban."
- The @ mention hint text uses dark text `#00101A` at 16px/24px with 0.5px letter-spacing.
- The background page behind the modal shows the Kudos Live Board with a user profile section — this is purely behind the overlay and not part of the modal implementation.

---

## Implementation Gap Analysis (Review 2026-03-12)

The following gaps exist between the current implementation (`src/components/live-board/write-kudo-modal.tsx`) and this specification:

| Gap | Spec (Figma Design) | Current Implementation | Priority |
|-----|---------------------|----------------------|----------|
| Rich Text Editor | Toolbar with B/I/S/List/Link/Quote + connected textarea. Use a library that closely matches the design and is easy to customize (e.g., TipTap or Lexical). | Plain `<textarea>` without formatting toolbar | P3 |
| Image Upload | Up to 5 image thumbnails with remove buttons. Image files only, max 4MB per file. | Not implemented | P5 |
| @ Mentions | Type `@` + name to trigger user suggestion dropdown | Not implemented | P3 |
| "Tiêu chuẩn cộng đồng" link | Coral red link in toolbar right side, navigates to community standards page | Not implemented | P3 |
| Standalone Link field | NOT in design | Implemented as separate "Link" section with `AddLinkBox` | **Remove**. Repurpose `AddLinkBox` as the dialog shown when clicking toolbar Link icon (C.5) |
| i18n | All text via translation keys | Hardcoded Vietnamese strings | P1 |
| Helper text (Danh hiệu) | "Ví dụ: Người truyền động lực cho tôi..." (2-line with example) | "Nhap danh hieu ban muon trao tang" (1-line, different text) | P2 |
| Field layout (desktop) | Label left, input right (`flex-row`, `gap-16`) | Label above input (`flex-col`) | P2 |
