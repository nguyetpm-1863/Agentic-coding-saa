# Implementation Plan: Viet Kudo (Write Kudo)

**Frame**: `520:11602-Viet Kudo`
**Date**: 2026-03-09
**Spec**: `specs/520-11602-viet-kudo/spec.md`

---

## Summary

Build the "Write Kudo" modal — a multi-field form dialog for composing and sending peer appreciation messages. The modal opens from the Kudos Live Board page with a dark overlay and contains: recipient search with autocomplete, badge/title input, rich text editor with formatting toolbar, hashtag selection (1-5), image upload (0-5) via Supabase Storage, anonymous toggle, and form submission via server action. The modal uses a warm cream background (`#FFF8E1`) with Montserrat typography and gold accent buttons.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image, Tiptap (rich text editor)
**Database**: Supabase (PostgreSQL) — `kudos`, `users`, `hashtags` tables with RLS
**Testing**: Playwright (E2E), Vitest (unit/integration)
**State Management**: Local React state (useState/useReducer) for form, server state via Supabase
**API Style**: Next.js Server Actions + Supabase client queries

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (Supabase Auth/DB/Storage, Tailwind, next/image)
- [x] Adheres to folder structure guidelines (App Router: modal component under `src/components/kudo/`)
- [x] Meets security requirements (Principle IV: server-side validation, sanitized HTML, parameterized queries, RLS)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: server action for submission, client boundary on modal only)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, full-screen modal on mobile, 44px touch targets)
- [x] Edge-compatible (Principle VI: No Node.js APIs, Tiptap is browser-only, Cloudflare Workers safe)
- [x] Simplicity (Principle VII: minimal state, thin client wrapper, no over-engineering)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| New dependency: `@tiptap/react` + extensions | Lightweight, modular rich text editor (~30KB gzipped). Runs entirely in browser (no Node.js APIs). Required for bold/italic/strike/list/link/quote/mentions per spec FR-003/FR-004. | (1) `textarea` with markdown — does not match Figma WYSIWYG design. (2) `draft-js` — heavy (200KB+), React 19 compatibility issues. (3) `slate` — heavier than Tiptap, more complex API. (4) `contenteditable` DIV — requires building formatting from scratch, fragile. |
| New dependency: `isomorphic-dompurify` | Required for server-side HTML sanitization of rich text content (TR-005, Principle IV). ~15KB gzipped. Works in both browser and server environments (provides a DOM shim for non-browser runtimes). No Node.js stream dependencies — safe for Cloudflare Workers. | (1) `sanitize-html` — depends on `htmlparser2` and `dom-serializer` which use Node.js streams, incompatible with Cloudflare Workers runtime. (2) Custom regex sanitization — error-prone, security risk. (3) No sanitization — violates OWASP/constitution. |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based modal with sub-components
  - `src/components/kudo/` — All Kudo modal components
  - `KudoModal` — Top-level client component (focus trap, overlay, form state)
  - Sub-components: `RecipientSearch`, `BadgeField`, `KudoEditor` (toolbar + Tiptap), `HashtagField`, `ImageUploadRow`, `AnonymousToggle`
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`
- **Data Fetching**: Server action for submission; client-side Supabase queries for user search and hashtag suggestions (debounced)
- **Rich Text Editor**: Tiptap with extensions:
  - `@tiptap/starter-kit` (bold, italic, strike, blockquote, ordered list)
  - `@tiptap/extension-link` (links)
  - `@tiptap/extension-mention` (@ mentions)
  - `@tiptap/extension-placeholder` (placeholder text)
  - All are pure JavaScript — no Node.js APIs, compatible with Cloudflare Workers bundling (editor runs client-side only)

### Backend Approach

- **API Design**: Server actions for mutations (`createKudo`), Route Handler for user search (`/api/users/search`)
- **Data Access**: Supabase server client with parameterized queries, RLS-enforced
- **Validation**: Zod schemas for server-side input validation (already available in Next.js ecosystem, zero-dep)
  - Note: If Zod is not already installed, use manual validation functions to avoid a new dependency (Principle VII)
- **Sanitization**: HTML sanitization of rich text content before database insertion using a V8-compatible sanitizer

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/client.ts` — Browser client for user search queries and image uploads
  - `@/libs/supabase/server.ts` — Server client for `createKudo` server action (auth verification + DB insert)
  - `@/libs/i18n/translations.ts` — Translation strings for form labels and messages
- **Shared Components**: Header (from login), potentially shared button styles
- **API Contracts**: `createKudo` server action, `/api/users/search` route handler, Supabase Storage upload

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/520-11602-viet-kudo/
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
├── app/
│   └── api/
│       └── users/
│           └── search/
│               └── route.ts          # User search API (GET, debounced queries)
├── components/
│   └── kudo/
│       ├── kudo-modal.tsx            # Modal wrapper (Client Component) — overlay, focus trap, form state
│       ├── recipient-search.tsx      # Recipient autocomplete (Client Component)
│       ├── badge-field.tsx           # Badge/title input field
│       ├── kudo-editor.tsx           # Rich text editor + toolbar (Client Component, Tiptap)
│       ├── hashtag-field.tsx         # Hashtag chips + add button wrapper (Client Component)
│       ├── hashtag-dropdown.tsx     # Multi-select hashtag dropdown (Client Component, see 1002-13013)
│       ├── add-link-dialog.tsx      # Link insertion dialog (Client Component, see 1002-12917)
│       ├── image-upload-row.tsx      # Image thumbnails + upload (Client Component)
│       └── anonymous-toggle.tsx      # Anonymous checkbox + name field (Client Component)
├── libs/
│   └── actions/
│       └── kudo.ts                   # Server action: createKudo
├── libs/
│   └── validation/
│       └── url.ts                   # URL validation utility (shared with AddLinkDialog, see 1002-12917)
└── types/
    ├── kudo.ts                       # TypeScript types for Kudo, ImageUpload, etc.
    └── hashtag.ts                    # Hashtag type definition (shared with HashtagDropdown, see 1002-13013)

# Modified Files
src/
├── app/
│   └── globals.css                   # Add kudo modal design tokens (if needed)
└── libs/
    ├── constants/
    │   └── hashtags.ts               # 13 predefined hashtags (seed data, replaceable with Supabase fetch)
    └── i18n/
        └── translations.ts           # Add kudo.* + addlink.* + hashtag.* translation keys

# Database
supabase/
└── migrations/
    └── YYYYMMDD_create_kudos.sql     # Create kudos table + RLS policies
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tiptap/react` | ^2 | React bindings for Tiptap editor |
| `@tiptap/starter-kit` | ^2 | Core extensions (bold, italic, strike, list, blockquote) |
| `@tiptap/extension-link` | ^2 | Link formatting support |
| `@tiptap/extension-mention` | ^2 | @ mention support with suggestion dropdown |
| `@tiptap/extension-placeholder` | ^2 | Placeholder text in editor |
| `isomorphic-dompurify` | ^2 | HTML sanitization for rich text content (~15KB gzipped). Works in both browser and server environments. No Node.js stream dependencies — Cloudflare Workers compatible. |

> **Bundle impact**: Tiptap core + extensions ~30KB gzipped (client-only). `isomorphic-dompurify` ~15KB (used server-side for sanitization, also available client-side). No Node.js stream dependencies — Cloudflare Workers compatible out of the box.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Database

- Download required UI assets from Figma:
  - Toolbar icons (bold, italic, strikethrough, numbered list, link, quote) -> `public/images/kudo/`
  - Send icon, close icon, plus icon, dropdown chevron -> `public/images/kudo/`
- Create database migration `supabase/migrations/YYYYMMDD_create_kudos.sql`:
  - `kudos` table: id (UUID), sender_id (UUID, FK auth.users), recipient_id (UUID, FK auth.users), title (varchar 200), content (text), hashtags (text[]), image_urls (text[]), is_anonymous (boolean), anonymous_name (varchar 50), created_at (timestamptz)
  - RLS policies: authenticated users can INSERT own kudos (sender_id = auth.uid()), SELECT all kudos, cannot UPDATE/DELETE after creation
  - Index on recipient_id, created_at for Live Board queries
- Install Tiptap packages and `isomorphic-dompurify`
- **Verify `isomorphic-dompurify` Workers compatibility**: Run `wrangler dev` with a minimal test that imports DOMPurify and sanitizes a sample HTML string. Expected to work since `isomorphic-dompurify` bundles `jsdom` for server environments and has no Node.js stream dependencies. Configure DOMPurify with a strict allowlist: `ALLOWED_TAGS: ['p', 'strong', 'em', 's', 'ol', 'li', 'a', 'blockquote', 'span']`, `ALLOWED_ATTR: ['href', 'target', 'rel', 'data-mention']`

### Phase 1: Modal Foundation (US7 — Form Validation, partial)

**Purpose**: Create the modal shell with overlay, focus trap, open/close behavior, and ARIA attributes.

1. **Create `src/types/kudo.ts`** — Type definitions
   - `KudoFormData`, `ImageUpload`, `UserSearchResult`, `CreateKudoInput`, `CreateKudoResult`

2. **Create `src/components/kudo/kudo-modal.tsx`** — Modal wrapper (Client Component)
   - `'use client'` directive
   - Props interface (shared contract with Live Board):
     ```typescript
     interface WriteKudoModalProps {
       isOpen: boolean;
       onClose: () => void;
       onSuccess: () => void; // triggers feed refresh on Live Board
     }
     ```
   - Additional internal prop: `triggerRef` (for focus return)
   - Dark overlay: `fixed inset-0 bg-[rgba(0,16,26,0.80)] z-40`
   - Modal container: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50`, responsive width
   - `role="dialog"`, `aria-modal="true"`, `aria-labelledby="kudo-modal-title"`
   - Focus trap: on mount, find all focusable elements, trap `Tab`/`Shift+Tab`
   - `Escape` key closes (with dirty check confirmation)
   - Overlay click closes (with dirty check confirmation)
   - Open animation: fade-in overlay 200ms + slide-up modal 200ms
   - Close animation: reverse
   - On close, return focus to `triggerRef`
   - Form state management via `useReducer` for complex state (recipient, title, content, hashtags, images, anonymous, errors, isDirty, isSubmitting)

3. **Mobile-first responsive modal**:
   - Default (mobile): `w-screen h-screen rounded-none p-4`
   - `md:`: `w-[90vw] max-w-[752px] h-auto max-h-[90vh] rounded-3xl p-6`
   - `lg:` and `xl:`: `w-[752px] p-10`

### Phase 2: User Story 1 — Write and Send a Kudo (P1, MVP)

**Purpose**: Core form with all required fields and submission.

1. **Create `src/libs/actions/kudo.ts`** — Server action: `createKudo`
   - `'use server'` directive
   - Validate auth via Supabase server client
   - Validate all inputs server-side:
     - `recipientId`: valid UUID, existing user, not self
     - `title`: 1-200 chars
     - `content`: sanitize HTML, 1-2000 chars (stripped)
     - `hashtags`: 1-5 items, each 1-50 chars
     - `imageUrls`: 0-5 items, each valid Supabase Storage URL
     - `isAnonymous`: boolean
     - `anonymousName`: optional, 1-50 chars
   - Insert into `kudos` table via Supabase server client
   - Return `{ success: true, kudoId }` or `{ success: false, error }`

2. **Wire up form submission in `kudo-modal.tsx`**:
   - Validate all required fields client-side (for UX)
   - Disable Send button when required fields incomplete (FR-008)
   - On submit: set `isSubmitting`, call `createKudo`, handle success (close modal) and error (show message, preserve form)
   - Error display in `aria-live="polite"` region

3. **Create `src/components/kudo/badge-field.tsx`** — Badge/title input
   - Label "Danh hieu *" with red asterisk
   - Text input with placeholder, border styles from design-style.md
   - Helper text below
   - Validation error display via `aria-describedby`

### Phase 3: User Story 2 — Recipient Search (P2)

**Purpose**: Autocomplete search for selecting a recipient.

1. **Create `src/app/api/users/search/route.ts`** — User search endpoint
   - GET with query param `q` (min 2 chars)
   - Parameterized Supabase query on `users` table (name ILIKE, email ILIKE)
   - Return top 10 matches: `{ id, name, avatarUrl, department }`
   - Rate limit consideration: debounce is client-side (300ms)

2. **Create `src/components/kudo/recipient-search.tsx`** — Autocomplete (Client Component)
   - Label "Nguoi nhan *" with red asterisk
   - Input field with dropdown chevron icon
   - On input (>=2 chars): debounce 300ms, fetch `/api/users/search?q=...`
   - Dropdown with results: user name, avatar, department
   - Keyboard navigation: `ArrowDown`/`ArrowUp` to highlight, `Enter` to select, `Escape` to close dropdown
   - Selected state: show selected user, allow clear/re-search
   - Loading spinner in dropdown during search
   - "No results found" message for empty results
   - `aria-expanded`, `aria-activedescendant`, `role="combobox"`, `role="listbox"` for options

### Phase 4: User Story 3 — Rich Text Editing (P3)

**Purpose**: Tiptap-based WYSIWYG editor with toolbar.

1. **Create `src/components/kudo/kudo-editor.tsx`** — Editor (Client Component)
   - Tiptap editor instance with extensions: StarterKit, Link, Mention, Placeholder
   - **Toolbar** (connected to editor top):
     - Bold (C.1): `editor.chain().focus().toggleBold().run()`, `aria-pressed={editor.isActive('bold')}`
     - Italic (C.2): `toggleItalic()`
     - Strikethrough (C.3): `toggleStrike()`
     - Numbered List (C.4): `toggleOrderedList()`
     - Link (C.5): opens `<AddLinkDialog />` (see `specs/1002-12917-addlink-box/plan.md`); on save, calls `editor.chain().focus().setLink({ href }).run()` to insert link with display text
     - Quote (C.6): `toggleBlockquote()`
     - "Tieu chuan cong dong" link (coral `#E46060`, right-aligned)
   - Toolbar styles: buttons connected, first has `rounded-tl-lg`, last section has `rounded-tr-lg`
   - Editor area: connected below toolbar, `rounded-b-lg`, min-height 120px
   - Keyboard shortcuts: `Cmd+B`, `Cmd+I` (handled by Tiptap natively)
   - **@ Mention support**:
     - Tiptap Mention extension with suggestion plugin
     - On `@` + typing: query same `/api/users/search` endpoint
     - Suggestion dropdown with user names
     - Insert mention node on select
   - Hint text below editor: "Ban co the @ + ten..."
   - Character count: track content length, enforce 2000 char limit

### Phase 5: User Story 4 — Hashtags (P4)

**Purpose**: Hashtag chip selection with add/remove.

1. **Create `src/components/kudo/hashtag-field.tsx`** — Hashtag chips wrapper (Client Component)
   - Label "Hashtag *" with red asterisk
   - Chip tags display: each chip shows hashtag text + "x" remove button
   - "+ Hashtag" trigger: renders `<HashtagDropdown />` sub-component (see `specs/1002-13013-dropdown-list-hashtag/plan.md`) which handles the predefined hashtag multi-select dropdown
   - Props to `<HashtagDropdown />`: `hashtags` (13 predefined items from server or constants), `selected`, `onChange`, `maxSelections={5}`
   - Max 5 limit: enforced by `<HashtagDropdown />` internally; trigger button disabled when 5 reached; "Toi da 5" note always visible
   - Remove: click "x" on chip removes it from `selected` array and calls parent form state update
   - Validation: at least 1 required for submission (enforced by parent `KudoModal` form validation)
   - `aria-label` on remove buttons: "Remove hashtag: {name}"

2. **Hashtag data source**: Fetch predefined hashtags from Supabase `hashtags` table in a server component or server action, pass as props to the form. Fallback: use `src/libs/constants/hashtags.ts` static seed data initially (Principle VII).

### Phase 6: User Story 5 — Image Upload (P5)

**Purpose**: Image upload with thumbnails via Supabase Storage.

1. **Create `src/components/kudo/image-upload-row.tsx`** — Image upload (Client Component)
   - Label "Image" (no asterisk — optional)
   - "+ Image" button: opens native file picker (`accept="image/jpeg,image/png,image/gif,image/webp"`)
   - Client-side validation: max 5MB per file, image MIME type check
   - Upload to Supabase Storage bucket `kudo-images` via browser client
   - During upload: show 80x80 thumbnail placeholder with spinner
   - On success: show thumbnail with image preview (object-fit: cover) + red "x" remove button
   - On error: show error state on thumbnail with retry icon
   - Remove: click "x" deletes from Storage and removes from form state
   - Max 5 images: disable "+ Image" when 5 reached, show "Toi da 5" note
   - Thumbnail styles: 80x80, `rounded-[18px]`, border `#998C5F`, inner image border `#FFEA9E` with `rounded`
   - Remove button: 20x20 red circle, absolute top-right, white X icon
   - Mobile: thumbnails 64x64, gap 8px

### Phase 7: User Story 6 — Anonymous Toggle (P6)

**Purpose**: Optional anonymous sending.

1. **Create `src/components/kudo/anonymous-toggle.tsx`** — Toggle (Client Component)
   - Checkbox: 24x24, custom styled per design-style.md
   - Label: "Gui loi cam on va ghi nhan an danh"
   - When checked: show optional text input for anonymous display name
   - Checkbox states: unchecked (white bg), checked (gold bg `#FFEA9E` + checkmark), hover, focus
   - Pass `isAnonymous` and `anonymousName` to parent form state

### Phase 8: Polish & Accessibility

**Purpose**: Final accessibility audit, responsive testing, animations, edge cases.

1. **Focus trap verification**: Tab cycles within modal only
2. **ARIA audit**: all fields have labels, errors have `aria-describedby`, toolbar buttons have `aria-label` + `aria-pressed`
3. **Dirty state check**: confirm discard on close when form modified
4. **Responsive testing**: 320px (full-screen modal), 768px (90vw), 1024px+ (752px)
5. **Animation polish**: modal open/close (200ms), dropdown (150ms), chip add/remove (150ms)
6. **Error recovery**: preserve form data on submission failure, retry
7. **Performance**: lazy-load Tiptap (dynamic import), optimize image thumbnails
8. **i18n**: add all `kudo.*` translation keys to `translations.ts`

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tiptap bundle size too large for Workers | Low | High | Tiptap is client-only (not bundled for Workers). Verify with `yarn build`. Use dynamic import `next/dynamic` with `ssr: false`. |
| HTML sanitization library incompatible with Workers runtime | Low | High | Using `isomorphic-dompurify` which has no Node.js stream dependencies and works in both browser and server environments (~15KB). Verify on `wrangler dev` in Phase 0. Fallback: minimal allowlist-based sanitizer using Cloudflare Workers `HTMLRewriter` API. |
| Rich text content XSS bypass | Low | Critical | Double sanitize: client-side (Tiptap limits output to known tags) + server-side (DOMPurify with strict allowlist of tags and attributes). |
| Image upload to Supabase Storage fails on large files | Low | Med | Client-side 5MB limit check before upload. Show retry on failure. |
| User search performance with many users | Med | Med | Database index on user name. Limit results to 10. Debounce 300ms client-side. |
| Focus trap conflicts with Tiptap editor | Med | Med | Tiptap manages its own focus internally. Focus trap should allow Tiptap to handle Tab within editor, only trap at modal boundary. |
| Noto Sans JP font for asterisk not loaded | Low | Low | Use CSS `content: "*"` with red color instead of relying on Noto Sans JP. Simpler and avoids extra font load (Principle VII). |

### Estimated Complexity

- **Frontend**: High — Multiple interactive components (editor, search, upload, chips), complex form state, focus management, animations
- **Backend**: Medium — Server action with validation + sanitization, user search endpoint, Supabase Storage integration, DB migration
- **Testing**: High — Rich text editor testing, file upload mocking, autocomplete interaction testing, focus trap verification

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: KudoModal form state -> sub-components -> server action -> DB
- [x] **External dependencies**: Supabase Auth, Supabase DB, Supabase Storage
- [x] **Data layer**: kudos table CRUD with RLS, image storage
- [x] **User workflows**: Full kudo creation flow, search + select + type + upload + submit

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Form state management, validation, editor formatting, search autocomplete |
| Service <-> Service | Yes | Server action -> Supabase DB insert, user search -> Supabase query |
| App <-> External API | Yes | Supabase Storage upload, Supabase Auth session verification |
| App <-> Data Layer | Yes | kudos table insert with RLS, users search query |
| Cross-platform | Yes | Responsive modal at 4 breakpoints, mobile full-screen |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E
- **Test data strategy**: Seed users for search testing, fixtures for form data
- **Isolation approach**: Transaction rollback per test, clean storage bucket

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack |
| Supabase DB | Real (local) | Test actual RLS policies and queries |
| Supabase Storage | Real (local) | Test actual upload flow |
| User search API | Real (local) | Test actual parameterized queries |
| Tiptap editor | Real | Browser-based, testable via Playwright |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open modal -> fill all required fields -> submit -> kudo created -> modal closes
   - [ ] Search recipient -> type 2+ chars -> see results -> select one
   - [ ] Format text with bold/italic -> verify HTML output
   - [ ] Add 3 hashtags -> verify chips displayed -> remove 1 -> verify removed
   - [ ] Upload 2 images -> verify thumbnails -> remove 1 -> verify removed
   - [ ] Toggle anonymous -> fill name -> submit -> kudo has anonymous flag

2. **Error Handling**
   - [ ] Submit with empty required fields -> Send button disabled
   - [ ] Server action fails -> error message displayed, form data preserved
   - [ ] Image upload fails -> error state on thumbnail, retry available
   - [ ] User search API fails -> "Unable to load results" in dropdown

3. **Edge Cases**
   - [ ] Add 5 hashtags -> "+ Hashtag" button disabled
   - [ ] Upload 5 images -> "+ Image" button disabled
   - [ ] Paste very long text (>2000 chars) -> character limit enforced
   - [ ] Close modal with dirty form -> confirmation dialog appears
   - [ ] Press Escape -> modal closes (with confirmation if dirty)
   - [ ] Click overlay -> modal closes (with confirmation if dirty)
   - [ ] Sender tries to kudo themselves -> server-side rejection

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: Supabase local, Playwright browser automation
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Server action (createKudo) | 90%+ | High |
| Form validation logic | 90%+ | High |
| Recipient search flow | 85%+ | High |
| Rich text editor integration | 75%+ | Medium |
| Image upload flow | 80%+ | Medium |
| Responsive layout | Visual regression | Medium |
| Accessibility (ARIA, focus trap) | Manual + axe-core | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [ ] API contracts defined (createKudo server action, /api/users/search)
- [ ] Database migration planned (kudos table)
- [ ] Tiptap packages evaluated for Workers compatibility

### External Dependencies

- Supabase local running (`make up`)
- Supabase Storage bucket `kudo-images` created
- Figma media assets (toolbar icons, send icon, close icon) downloaded to `public/images/kudo/`
- User seed data in Supabase for search testing
- Login feature completed (auth infrastructure required)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **Tiptap chosen over alternatives** because it is modular (import only needed extensions), lightweight (~30KB), has first-class React 19 support, runs entirely in the browser (no Node.js APIs), and supports mentions natively. It is the most constitution-compliant option for a rich text editor.
- **HTML sanitization is critical**: Rich text content is stored as HTML. Server-side sanitization with a strict allowlist (p, strong, em, s, ol, li, a, blockquote, span[data-mention]) prevents XSS. Client-side Tiptap already limits output to known tags, but defense-in-depth requires server-side sanitization per constitution Principle IV.
- **No `dangerouslySetInnerHTML` on render**: When displaying Kudo content on the Live Board, use Tiptap's read-only mode or a safe HTML renderer with the same allowlist. This is out of scope for this modal but noted for the Live Board implementation.
- **Image upload strategy**: Upload images immediately when selected (not on form submit) to avoid blocking submission. Store upload URLs in form state. On form cancel, clean up uploaded but uncommitted images (background cleanup job or Storage lifecycle rules).
- **Focus trap and Tiptap**: The Tiptap editor manages its own internal focus (Tab for indentation in lists). The modal focus trap must be aware that Tab inside the editor should not cycle to the next modal element. Implementation: detect if active element is within the editor container and let Tiptap handle Tab.
- **Asterisk rendering**: Use `<span className="text-[#CF1322] text-base font-bold">*</span>` instead of loading Noto Sans JP font for a single asterisk character. This follows Principle VII (Simplicity).
- **Kudo Live Board integration**: The modal is opened from the Live Board page. After successful submission, the Live Board should refresh/revalidate to show the new kudo. Use `revalidatePath()` in the server action or `router.refresh()` on the client after success.
