# Tasks: Viet Kudo (Write Kudo)

**Frame**: `520:11602-Viet Kudo`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US7)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & Dependencies)

**Purpose**: Download Figma assets and install Tiptap + sanitization packages

- [x] T001 Download media assets from Figma using `get_media_files` tool: toolbar icons (bold, italic, strikethrough, numbered-list, link, quote), send icon, close icon, plus icon, dropdown chevron -> `public/images/kudo/`
- [x] T002 Verify all assets exist, are WebP-optimized, and follow kebab-case naming | `public/images/kudo/`
- [x] T003 Install Tiptap packages: `yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention @tiptap/extension-placeholder` and HTML sanitizer: `yarn add sanitize-html && yarn add -D @types/sanitize-html` | `package.json`
- [x] T004 [P] Verify `sanitize-html` Workers compatibility: run `yarn build` and confirm no Node.js API errors. If incompatible, switch to a minimal allowlist-based sanitizer using DOMParser or HTMLRewriter | `package.json`

**Checkpoint**: All assets in `public/images/kudo/`, Tiptap + sanitizer installed and build-verified

---

## Phase 2: Foundation (DB Migration, Types, Shared Infrastructure)

**Purpose**: Database schema, TypeScript types, server action, constants, and i18n keys — BLOCKS all user stories

**WARNING**: No user story work can begin until this phase is complete

- [x] T005 Create database migration: `kudos` table (id UUID PK default gen_random_uuid(), sender_id UUID FK auth.users NOT NULL, recipient_id UUID FK auth.users NOT NULL, title varchar(200) NOT NULL, content text NOT NULL, hashtags text[] NOT NULL, image_urls text[] DEFAULT '{}', is_anonymous boolean DEFAULT false, anonymous_name varchar(50), created_at timestamptz DEFAULT now()); add CHECK(sender_id != recipient_id); add INDEX on (recipient_id, created_at); add RLS: authenticated INSERT where sender_id = auth.uid(), SELECT for all authenticated, no UPDATE/DELETE | `supabase/migrations/YYYYMMDD_create_kudos.sql`
- [x] T006 [P] Create TypeScript types: `KudoFormData`, `ImageUpload` (file, url, status, thumbnailUrl), `UserSearchResult` (id, name, avatarUrl, department), `CreateKudoInput`, `CreateKudoResult` (success discriminated union) | `src/types/kudo.ts`
- [x] T007 [P] Create hashtag type definition: `Hashtag` (id, name, category) | `src/types/hashtag.ts`
- [x] T008 [P] Create predefined hashtags constant: 13 hashtags as array of `Hashtag` objects for initial seed data | `src/libs/constants/hashtags.ts`
- [x] T009 [P] Create URL validation utility: `isValidUrl(url: string): boolean` for shared use with AddLinkDialog (validates http/https URLs) | `src/libs/validation/url.ts`
- [x] T010 [P] Add all `kudo.*`, `addlink.*`, and `hashtag.*` i18n translation keys from spec i18n table (37 keys) to both VN and EN objects | `src/libs/i18n/translations.ts`
- [x] T011 Create `createKudo` server action: `'use server'`, verify auth via Supabase server client, validate all inputs server-side (recipientId: valid UUID + existing user + not self, title: 1-200 chars, content: sanitize HTML + 1-2000 stripped chars, hashtags: 1-5 items each 1-50 chars, imageUrls: 0-5 valid Supabase Storage URLs, isAnonymous: boolean, anonymousName: optional 1-50 chars), insert into `kudos` table, return `{ success: true, kudoId }` or `{ success: false, error }` | `src/libs/actions/kudo.ts`
- [x] T012 [P] Add kudo modal design tokens as CSS custom properties if needed (overlay color, modal bg #FFF8E1, border #998C5F, accent gold, etc.) per design-style.md | `src/app/globals.css`

**Checkpoint**: Migration applied via `make up`, types compile, server action callable, translations available, constants ready

---

## Phase 3: User Story 1 — Write and Send a Kudo (Priority: P1) MVP

**Goal**: User can open the modal, fill in the badge/title field, and submit a Kudo. Modal shell with overlay, focus trap, form state management, open/close animations, and basic form submission.

**Independent Test**: Open KudoModal, fill badge/title, provide a hardcoded recipient + content + hashtag, click "Gui", verify kudo is created in DB and modal closes.

### Modal Shell (US1)

- [x] T013 [P] [US1] Create KudoModal component (Client Component): `'use client'`, props `isOpen`, `onClose`, `triggerRef`; dark overlay `fixed inset-0 bg-[rgba(0,16,26,0.80)] z-40`; modal container `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50` with `bg-[#FFF8E1] rounded-3xl p-10`; `role="dialog"` `aria-modal="true"` `aria-labelledby="kudo-modal-title"`; focus trap (Tab/Shift+Tab); Escape closes with dirty check confirmation; overlay click closes with dirty check; open animation (fade-in 200ms + slide-up 200ms); form state via `useReducer` (recipient, title, content, hashtags, images, isAnonymous, anonymousName, errors, isDirty, isSubmitting); responsive: mobile `w-screen h-screen rounded-none p-4`, md `w-[90vw] max-w-[752px] h-auto max-h-[90vh] rounded-3xl p-6`, lg+ `w-[752px] p-10` | `src/components/kudo/kudo-modal.tsx`

### Components (US1)

- [x] T014 [P] [US1] Create BadgeField component: label "Danh hieu" with red asterisk (`<span className="text-[#CF1322] text-base font-bold">*</span>`), text input with border `1px solid #998C5F`, radius 8px, bg white, padding 16px 24px, placeholder "Danh tang mot danh hieu cho dong doi" color #999, helper text below (16px/700 #999), validation error via `aria-describedby`, field states (default, focus `2px solid #FFEA9E`, error `2px solid #CF1322`) | `src/components/kudo/badge-field.tsx`

### Page Assembly (US1)

- [x] T015 [US1] Wire form submission in KudoModal: title section "Gui loi cam on va ghi nhan den dong doi" (Montserrat 32px/700 #00101A centered), render BadgeField, Cancel button (border #998C5F, r-4, bg rgba(255,234,158,0.10), px-10 py-4, 16px/700 + X icon), Send button (flex-1 h-60 bg-#FFEA9E r-8, 22px/700 + send icon, disabled when required fields empty at 50% opacity cursor-not-allowed), on submit call `createKudo` server action, handle success (close modal) and error (show in aria-live region, preserve form), loading state (spinner replaces send icon, "Dang gui...", all fields disabled) | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: User Story 1 complete — modal opens, badge field works, form submits via server action

---

## Phase 4: User Story 2 — Select Recipient with Autocomplete (Priority: P2)

**Goal**: User can search and select a recipient from a debounced autocomplete dropdown.

**Independent Test**: Open modal, click recipient field, type 2+ chars, see matching users in dropdown, select one, verify selection displayed. Clear and re-search.

### Backend (US2)

- [x] T016 [P] [US2] Create user search API route handler: GET `/api/users/search?q=...`, min 2 chars required, parameterized Supabase query on `users` table (name ILIKE, email ILIKE), return top 10 matches as `{ id, name, avatarUrl, department }[]`, validate auth, return 401 if unauthenticated | `src/app/api/users/search/route.ts`

### Frontend (US2)

- [x] T017 [US2] Create RecipientSearch component (Client Component): label "Nguoi nhan" with red asterisk, input with dropdown chevron icon 24x24, on input (>=2 chars) debounce 300ms then fetch `/api/users/search?q=...`, dropdown results showing user name + avatar + department, keyboard nav (ArrowDown/ArrowUp highlight, Enter select, Escape close), selected state shows user with clear/re-search, loading spinner in dropdown, "Khong tim thay ket qua" for empty results, ARIA: `role="combobox"` + `aria-expanded` + `aria-activedescendant` + `role="listbox"` for options, input styles per design-style.md (border #998C5F, r-8, bg white, p 16px 24px) | `src/components/kudo/recipient-search.tsx`

### Integration (US2)

- [x] T018 [US2] Integrate RecipientSearch into KudoModal: render between title and BadgeField, wire `selectedRecipient` to form state, add recipient validation ("Vui long chon nguoi nhan" error when empty on blur) | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: User Stories 1 & 2 complete — recipient search + badge + submit works

---

## Phase 5: User Story 3 — Rich Text Editing (Priority: P3)

**Goal**: User can format their Kudo message with bold, italic, strikethrough, numbered list, link, quote, and @ mentions via a Tiptap WYSIWYG editor.

**Independent Test**: Open modal, type in editor, apply each formatting option, verify formatting visible. Type `@` + chars, verify mention suggestion dropdown. Click "Tieu chuan cong dong" link.

### Components (US3)

- [x] T019 [P] [US3] Create AddLinkDialog component (Client Component): small dialog for link URL + display text input, validate URL via `@/libs/validation/url.ts`, "Huy" cancel and "Them" confirm buttons, ARIA: `role="dialog"`, focus trap within dialog, Escape to cancel | `src/components/kudo/add-link-dialog.tsx`
- [x] T020 [US3] Create KudoEditor component (Client Component): Tiptap editor with `@tiptap/starter-kit` (bold, italic, strike, orderedList, blockquote), `@tiptap/extension-link`, `@tiptap/extension-mention` (suggestion plugin querying `/api/users/search`), `@tiptap/extension-placeholder`; toolbar row: Bold (C.1 r: 8px 0 0 0), Italic (C.2), Strikethrough (C.3), Numbered List (C.4), Link (C.5 opens AddLinkDialog), Quote (C.6), "Tieu chuan cong dong" link section (r: 0 8px 0 0, w-336px, text-right, #E46060); each toolbar button 40px h, px-4 py-2.5, border #998C5F, bg transparent, 24x24 icon, `aria-label` + `aria-pressed`; toolbar states (hover bg rgba(0,0,0,0.05), toggled bg rgba(255,234,158,0.20), focus outline 2px solid #FFEA9E); editor area connected below toolbar (no gap), r: 0 0 8px 8px, border #998C5F, bg white, min-h 120px, h-200px, pl-24px; hint text below: "Ban co the @ + ten..." (16px/700 #00101A ls 0.5px); character count enforcement 2000 chars; Cmd+B/Cmd+I handled natively by Tiptap | `src/components/kudo/kudo-editor.tsx`

### Integration (US3)

- [x] T021 [US3] Integrate KudoEditor into KudoModal: render between BadgeField and Hashtag section, wire `content` (HTML string) to form state, add content validation ("Vui long nhap noi dung" when empty), dynamically import Tiptap with `next/dynamic` + `ssr: false` for performance | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: User Stories 1-3 complete — rich text editing with all formatting and mentions works

---

## Phase 6: User Story 4 — Add Hashtags (Priority: P4)

**Goal**: User can select 1-5 hashtags from predefined list via chips with add/remove.

**Independent Test**: Click "+ Hashtag", select hashtags from dropdown, verify chips displayed with remove buttons, verify max 5 limit, remove a chip.

### Components (US4)

- [x] T022 [P] [US4] Create HashtagDropdown component (Client Component): multi-select dropdown rendering 13 predefined hashtags, props `hashtags`, `selected`, `onChange`, `maxSelections={5}`, disable items when max reached, close on outside click or Escape, ARIA: `role="listbox"`, `aria-multiselectable="true"`, keyboard nav | `src/components/kudo/hashtag-dropdown.tsx`
- [x] T023 [US4] Create HashtagField component (Client Component): label "Hashtag" with red asterisk, chip tags display (each chip = hashtag text + "x" remove button with `aria-label="Remove hashtag: {name}"`), "+ Hashtag" trigger button (h-48px, p 4px 8px, border #998C5F, r-8, bg white, plus icon 24x24, text 11px/700 #999), renders `<HashtagDropdown />` on click, max 5 note "Toi da 5" always visible, trigger disabled when 5 reached, gap-8 between chips | `src/components/kudo/hashtag-field.tsx`

### Integration (US4)

- [x] T024 [US4] Integrate HashtagField into KudoModal: render after KudoEditor section, wire `hashtags` array to form state, add validation ("Vui long chon it nhat 1 hashtag" when empty), pass predefined hashtags from constants | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: User Stories 1-4 complete — hashtag selection works with chips

---

## Phase 7: User Story 5 — Upload Images (Priority: P5)

**Goal**: User can upload 0-5 images with thumbnails via Supabase Storage.

**Independent Test**: Click "+ Image", select files, verify thumbnails appear with upload progress, verify remove works, verify max 5 limit, verify 5MB size limit.

- [x] T025 [US5] Create ImageUploadRow component (Client Component): label "Image" (22px/700, no asterisk), thumbnails row (flex-row gap-16), each thumbnail 80x80 r-[18px] border #998C5F bg white with inner image border #FFEA9E r-4 object-cover, remove button 20x20 red circle (#D4271D) absolute top-right with white X icon + `aria-label="Remove image {n}"`, "+ Image" button (same style as + Hashtag: h-48px p 4px 8px border r-8 bg white 11px #999) opens native file picker `accept="image/jpeg,image/png,image/gif,image/webp"`, client-side validation max 5MB + MIME check, upload to Supabase Storage bucket `kudo-images` via browser client, during upload show placeholder spinner, on error show retry icon, disable "+ Image" at 5, "Toi da 5" note, mobile thumbnails 64x64 gap-8 | `src/components/kudo/image-upload-row.tsx`

### Integration (US5)

- [x] T026 [US5] Integrate ImageUploadRow into KudoModal: render after HashtagField, wire `images` array (ImageUpload[]) to form state, collect uploaded URLs for createKudo submission, on modal cancel clean up uncommitted uploads | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: User Stories 1-5 complete — image upload with thumbnails works

---

## Phase 8: User Story 6 — Send Anonymously (Priority: P6)

**Goal**: User can optionally toggle anonymous sending with an optional display name.

**Independent Test**: Check anonymous checkbox, verify name field appears, fill name, submit, verify kudo is_anonymous = true in DB.

- [x] T027 [US6] Create AnonymousToggle component (Client Component): custom checkbox 24x24 r-4 border #999 bg white, checked state bg #FFEA9E border #FFEA9E with checkmark icon, hover border #998C5F, focus outline 2px solid #FFEA9E offset 2px, label "Gui loi cam on va ghi nhan an danh" (22px/700 #999), when checked show optional text input for anonymous display name (same input style as other fields), wire `isAnonymous` and `anonymousName` to parent form state | `src/components/kudo/anonymous-toggle.tsx`

### Integration (US6)

- [x] T028 [US6] Integrate AnonymousToggle into KudoModal: render after ImageUploadRow before action buttons, wire isAnonymous and anonymousName to form state | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: User Stories 1-6 complete — anonymous toggle works

---

## Phase 9: User Story 7 — Form Validation and Error States (Priority: P7)

**Goal**: Send button disabled when required fields incomplete, field-level validation errors on blur, server error preserved.

**Independent Test**: Open modal with empty fields, verify Send disabled. Fill all required fields, verify Send enabled. Clear one, verify disabled again. Submit with server error, verify error message + form data preserved.

- [x] T029 [US7] Implement comprehensive client-side form validation in KudoModal: Send button disabled unless recipient + title + content + >=1 hashtag all filled, field-level errors on blur (recipient: "Vui long chon nguoi nhan", badge: "Vui long nhap danh hieu", content: "Vui long nhap noi dung", hashtags: "Vui long chon it nhat 1 hashtag"), errors displayed via `aria-describedby` on each field, errors cleared on input change, `aria-required="true"` on required fields, global error display in `aria-live="polite"` region for server errors | `src/components/kudo/kudo-modal.tsx`

**Checkpoint**: All user stories complete — fully validated form

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility audit, responsive testing, animations, edge cases, performance

### Accessibility

- [x] T030 [P] Verify focus trap cycles within modal only, Tab within Tiptap editor handled by Tiptap (not trapped to next modal element) | `src/components/kudo/kudo-modal.tsx`
- [x] T031 [P] Verify all form fields have associated labels or aria-label, all toolbar buttons have aria-label + aria-pressed, image remove buttons have descriptive aria-label | all kudo components
- [x] T032 [P] Verify tab order: close target -> recipient -> badge -> editor -> hashtag -> images -> anonymous -> cancel -> send | `src/components/kudo/kudo-modal.tsx`

### Responsive

- [x] T033 [P] Apply mobile-first responsive styles: mobile (p-4, flex-col fields, full-width buttons stacked, 64x64 thumbnails, title 24px, labels 18px, toolbar wrap with reduced padding), md tablet (p-6, row fields, 72x72 thumbnails, title 28px), lg desktop (p-10, match Figma 752px), xl wide (match Figma exactly) | `src/components/kudo/kudo-modal.tsx`
- [x] T034 [P] Verify touch targets: all interactive elements >= 44x44px on mobile (buttons, checkbox, toolbar buttons, remove buttons) | all kudo components

### Animations

- [x] T035 [P] Add modal open/close animation: overlay fade-in 200ms ease-out + modal slide-up from +20px 200ms ease-out, close reverses | `src/components/kudo/kudo-modal.tsx`
- [x] T036 [P] Add button hover/active transitions: 150ms ease-in-out bg-color, Send hover #FFE080 active #FFD760, Cancel hover rgba(255,234,158,0.20) active 0.30, toolbar hover bg rgba(0,0,0,0.05) | `src/components/kudo/kudo-modal.tsx`
- [x] T037 [P] Add input focus border-color transition 150ms ease-in-out, dropdown open/close 150ms opacity + max-height, hashtag chip add/remove 150ms opacity + transform | all kudo components

### Edge Cases

- [x] T038 Verify dirty state check: confirm discard dialog appears when closing modal with modified fields (Escape, overlay click, Cancel) | `src/components/kudo/kudo-modal.tsx`
- [x] T039 [P] Verify error recovery: on server action failure, error message displayed, form data fully preserved, Send button re-enabled for retry | `src/components/kudo/kudo-modal.tsx`
- [x] T040 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) --> Phase 2 (Foundation) --> Phase 3 (US1 MVP) --> Phase 4 (US2) --> Phase 5 (US3) --> Phase 6 (US4) --> Phase 7 (US5) --> Phase 8 (US6) --> Phase 9 (US7) --> Phase 10 (Polish)
                                                   |
                                                   +-- STOP & VALIDATE (can deploy after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (assets + packages installed) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (modal shell must exist)
- **US3 (Phase 5)**: Depends on Phase 4 (modal integration pattern established)
- **US4 (Phase 6)**: Depends on Phase 5 (modal integration pattern, constants ready)
- **US5 (Phase 7)**: Depends on Phase 6 (modal integration pattern)
- **US6 (Phase 8)**: Depends on Phase 7 (modal integration pattern)
- **US7 (Phase 9)**: Depends on Phase 8 (all fields exist for validation)
- **Polish (Phase 10)**: Depends on Phase 9

### Within Each User Story

- Components marked [P] can be created in parallel (different files)
- Integration tasks depend on their components being ready
- Server-side tasks (API routes, server actions) can run in parallel with frontend components

### Parallel Opportunities

**Phase 2**: T006, T007, T008, T009, T010, T012 can ALL run in parallel (6 independent files). T005 (migration) and T011 (server action) depend on T006 (types).
**Phase 3**: T013 and T014 can run in parallel (different files). T015 depends on both.
**Phase 4**: T016 and T017 can start in parallel. T018 depends on T017.
**Phase 5**: T019 can start in parallel with other work. T020 depends on T019 (AddLinkDialog). T021 depends on T020.
**Phase 6**: T022 can run in parallel. T023 depends on T022. T024 depends on T023.
**Phase 10**: T030-T037 can mostly run in parallel (independent verification/enhancement tasks).

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (User Story 1 — Modal + Badge + Submit)
3. **STOP and VALIDATE**: Test form submission end-to-end
4. Deploy if ready — basic kudo creation works

### Incremental Delivery

1. Setup + Foundation -> Types compile, migration applied, server action ready
2. Add User Story 1 -> Test -> Deploy (MVP modal with badge field)
3. Add User Story 2 -> Test -> Deploy (recipient search)
4. Add User Story 3 -> Test -> Deploy (rich text editor)
5. Add User Story 4 -> Test -> Deploy (hashtags)
6. Add User Story 5 -> Test -> Deploy (image upload)
7. Add User Story 6 -> Test -> Deploy (anonymous toggle)
8. Add User Story 7 -> Test -> Deploy (validation polish)
9. Polish -> Test -> Deploy (final)

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- Tiptap MUST be dynamically imported with `next/dynamic` + `ssr: false` — it is browser-only
- Use `<span className="text-[#CF1322] text-base font-bold">*</span>` for required asterisks instead of loading Noto Sans JP
- HTML sanitization is defense-in-depth: Tiptap limits output client-side + `sanitize-html` with strict allowlist server-side (p, strong, em, s, ol, li, a, blockquote, span[data-mention])
- Images are uploaded immediately on selection (not on form submit) to avoid blocking submission. Clean up uncommitted uploads on cancel.
- Focus trap must allow Tiptap to handle Tab within editor (detect active element within editor container)
- After successful submission, call `revalidatePath()` in server action or `router.refresh()` to update Live Board
- Mark tasks complete as you go: `[x]`
