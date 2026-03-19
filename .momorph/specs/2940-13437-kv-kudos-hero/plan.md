# Implementation Plan: KV Kudos Hero Section

**Frame**: `2940-13437-kv-kudos-hero`
**Date**: 2026-03-16
**Spec**: `specs/2940-13437-kv-kudos-hero/spec.md`

---

## Summary

Rewrite the hero banner of the `/kudos` page to match the Figma design. The hero section needs a background image (`Keyvisual.png`), corrected i18n text, KUDOS logo, and — most critically — the recognition input must be transformed from a simple button (that opens a "Coming soon" modal) into a **searchable recipient dropdown** that, upon user selection, opens the Write Kudo modal pre-filled with that recipient.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, Supabase
**Database**: PostgreSQL (Supabase) — no schema changes needed
**State Management**: Local component state (useState/useRef)
**API Style**: Server Actions (`searchUsers` already exists)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows Server-First architecture — `HeroBanner` is a Server Component; only `RecognitionInput` and `SearchBar` need `'use client'`
- [x] TypeScript strict, no `any` — all types already defined in `SearchResult` interface
- [ ] Tests written before implementation — TDD per constitution (note: no test framework currently configured in project)
- [x] OWASP compliance — `searchUsers` already sanitizes input; Supabase Auth verified server-side
- [x] Mobile-first responsive — design-style.md has breakpoints defined
- [x] No Node.js APIs — all code is edge-compatible
- [x] Simplicity — reusing existing `searchUsers` action and existing dropdown patterns

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Modify 3 existing files (`hero-banner.tsx`, `recognition-input.tsx`, `search-bar.tsx`) + update i18n translations
- **Styling Strategy**: Tailwind CSS 4 utility classes with arbitrary values per design-style.md
- **Data Fetching**: Server action `searchUsers` (already exists) with client-side debounce
- **State Flow**: When a user selects a recipient from the recognition input dropdown → pass `recipientId` and `recipientName` up to `HeroBanner` → then to parent page → open `WriteKudoModal` with pre-filled recipient

### Integration Points

- **Existing**: `searchUsers` server action in `src/libs/kudos/actions.ts` — reuse as-is
- **Existing**: `WriteKudoModal` in `src/components/live-board/write-kudo-modal.tsx` — needs new props (`initialRecipientId`, `initialRecipientName`)
- **Existing**: `WriteKudoButton` in `src/components/live-board/write-kudo-button.tsx` — needs to expose modal open trigger with pre-filled recipient
- **Existing**: i18n translations in `src/libs/i18n/translations.ts` — text corrections needed

### Key Design Decision: Recipient Selection → Modal Opening

The `RecognitionInput` component selects a recipient, but the `WriteKudoModal` lives in `WriteKudoButton` (a separate component tree). To connect them:

**Approach**: Lift the modal state to the kudos page level.
1. `RecognitionInput` calls `onSelectRecipient(id, name)` callback
2. `HeroBanner` passes this callback from its parent
3. `KudosPage` (server component) wraps the client interaction in a new `KudosPageClient` wrapper that manages modal state
4. `WriteKudoModal` receives optional `initialRecipientId` / `initialRecipientName` props

This avoids prop drilling through unrelated components and keeps the server/client boundary clean.

---

## Project Structure

### Source Code (affected areas)

```text
src/
├── components/kudos/
│   ├── hero-banner.tsx           # MODIFY — add background image, logo, gradient, layout rewrite
│   ├── recognition-input.tsx     # REWRITE — from button to searchable dropdown with recipient selection
│   └── search-bar.tsx            # MODIFY — update styles to match Figma (golden bg, larger size)
├── components/live-board/
│   ├── write-kudo-modal.tsx      # MODIFY — accept optional initial recipient props
│   └── write-kudo-button.tsx     # MODIFY — expose imperative open with recipient
├── app/kudos/
│   └── page.tsx                  # MODIFY — add client wrapper for modal state coordination
└── libs/i18n/
    └── translations.ts           # MODIFY — fix hero title and recognition placeholder text
```

### No New Files Needed

All changes are modifications to existing files. No new components, hooks, or utilities required.

### No New Dependencies

All functionality uses existing libraries and patterns.

---

## Implementation Strategy

### Phase 1: Foundation — i18n Text Fixes + Visual Overhaul

**Goal**: Get the hero section visually correct without interactive behavior changes.

1. **Fix i18n translations** (`translations.ts`)
   - VI: `"kudos.live_board.hero_title"`: `"Hệ thống ghi nhận lời cảm ơn"` → `"Hệ thống ghi nhận và cảm ơn"`
   - VI: `"kudos.live_board.recognition_placeholder"`: `"Hôm nay, bạn muốn gửi lời cảm ơn đến ai?"` → `"Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"`
   - EN: `"kudos.live_board.hero_title"`: → `"Appreciation and recognition system"`
   - EN: `"kudos.live_board.recognition_placeholder"`: → `"Who do you want to appreciate and recognize today?"`

2. **Rewrite `hero-banner.tsx`** layout:
   - Add `Keyvisual.png` as CSS `background-image` on the section (not `<Image>`)
   - Add 25deg gradient overlay div
   - Add bottom fade gradient div
   - Change title color from white to `#FFEA9E`
   - Change title font-size to `36px` on desktop
   - Add `<Image>` for KUDOS logo (`/images/homepage/kudos.png`) below title
   - Update content padding: `pt-[96px] pb-[120px] xl:px-36` (144px = 36×4)
   - Left-align content (`items-start` instead of `items-center`)
   - Update spacing between elements per design-style.md

3. **Update `search-bar.tsx`** styles:
   - Change dimensions to `w-[381px] h-[72px]` on desktop
   - Change bg to `rgba(255,234,158,0.10)`
   - Change border to `#998C5F`
   - Change border-radius to `rounded-[68px]`
   - Change placeholder font-weight to bold
   - Change search icon to 24px white
   - Add responsive sizes (mobile: full-width, h-11)

### Phase 2: Core Feature — Recognition Input as Searchable Dropdown (US1 + US2)

**Goal**: Transform the recognition input from a button into a searchable dropdown that selects a recipient.

4. **Rewrite `recognition-input.tsx`**:
   - Remove the "Coming soon" modal entirely
   - Change from `<button>` to a container with `<input>` inside
   - Default state: shows pen icon + placeholder text (looks like current button)
   - Click: focus the input, user can type
   - Typing ≥ 2 chars: debounced call to `searchUsers`, show dropdown below
   - Dropdown: same style as existing `SearchBar` dropdown (dark bg, avatar + name + department)
   - Selecting a user: call `onSelectRecipient(id, name)` callback prop
   - Reuse same search logic patterns from existing `search-bar.tsx` (debounce, outside click, loading state)
   - Add ARIA combobox pattern (`role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`)

5. **Add `onSelectRecipient` callback prop to `RecognitionInput`**:
   ```typescript
   interface RecognitionInputProps {
     locale?: string;
     onSelectRecipient: (recipientId: string, recipientName: string) => void;
   }
   ```

6. **Update `hero-banner.tsx`** to accept and pass callback:
   - `HeroBanner` needs to become a client component OR accept the callback from parent
   - Since `HeroBanner` is currently a server component that only uses `getTranslations` (a pure function), it can stay as server component if we extract the interactive part
   - **Decision**: Keep `HeroBanner` as server component for the static layout. The `RecognitionInput` (already client) handles all interactivity via its own props.
   - Pass `onSelectRecipient` through from page-level

### Phase 3: Integration — Connect to Write Kudo Modal (US2 acceptance scenario 3)

**Goal**: When a user selects a recipient from the hero dropdown, open the Write Kudo modal pre-filled.

7. **Modify `WriteKudoModal`** to accept optional initial recipient:
   ```typescript
   interface WriteKudoModalProps {
     isOpen: boolean;
     onClose: () => void;
     onSuccess: () => void;
     locale: string;
     initialRecipientId?: string;    // NEW
     initialRecipientName?: string;  // NEW
   }
   ```
   - When these props are provided and the modal opens, pre-fill `recipientId` and `recipientName` in form state
   - Use `useEffect` to set initial values when modal opens with new recipient

8. **Modify `WriteKudoButton`** to accept trigger from parent:
   ```typescript
   interface WriteKudoButtonProps {
     locale: string;
     openWithRecipient?: { id: string; name: string } | null;  // NEW
     onOpenHandled?: () => void;  // NEW — clear the trigger after handling
   }
   ```
   - When `openWithRecipient` changes from null to a value, auto-open the modal

9. **Update `page.tsx`** to coordinate state:
   - Extract a `KudosPageClient` wrapper component (client component) that holds:
     - `selectedRecipient` state
     - Passes it to `WriteKudoButton` and receives it from `HeroBanner`
   - OR simpler: use a lightweight client wrapper just around the hero + write button area

   **Simpler approach chosen**: Create a minimal `KudosHeroWithModal` client component that wraps `RecognitionInput` + `WriteKudoModal` interaction. This avoids restructuring the entire page.

### Phase 4: Polish

10. **Responsive verification**:
    - Test at 320px, 768px, 1024px, 1440px
    - Verify dropdown positioning on mobile (full-width below input)
    - Verify background image covers properly at all sizes

11. **Accessibility**:
    - Ensure combobox ARIA pattern on recognition input
    - Keyboard navigation in dropdown (arrow keys, Enter to select, Escape to close)
    - Focus management (return focus to input after dropdown closes)

---

## File Change Details

### `src/libs/i18n/translations.ts`
- Lines ~289-290 (VI): Fix hero_title and recognition_placeholder
- Lines ~443-444 (EN): Fix hero_title and recognition_placeholder

### `src/components/kudos/hero-banner.tsx`
- Complete visual rewrite of JSX template
- Add background image layer, gradient overlays, KUDOS logo
- Accept `onSelectRecipient` callback prop
- Update padding, alignment, spacing per design-style.md
- Must import `Image` from `next/image` for logo

### `src/components/kudos/recognition-input.tsx`
- Full rewrite from button to searchable dropdown
- Import `searchUsers` from `@/libs/kudos/actions`
- Add `useState` for query, results, isOpen, isLoading
- Add `useRef` for debounce timer and container (outside click)
- Add `useEffect` for debounced search and click-outside listener
- Add dropdown JSX with user results (avatar, name, department)
- Add `onSelectRecipient` callback prop
- Remove "Coming soon" modal entirely

### `src/components/kudos/search-bar.tsx`
- Style changes only (dimensions, colors, border-radius, icon size)
- No behavior changes

### `src/components/live-board/write-kudo-modal.tsx`
- Add optional `initialRecipientId` and `initialRecipientName` props
- Add `useEffect` to pre-fill form state when modal opens with initial values

### `src/components/live-board/write-kudo-button.tsx`
- Add `openWithRecipient` and `onOpenHandled` props
- Add `useEffect` to auto-open modal when recipient is provided

### `src/app/kudos/page.tsx`
- Add `KudosHeroWithModal` or inline client wrapper to coordinate recipient selection → modal opening
- Pass callback through `HeroBanner` → `RecognitionInput`

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Server/client boundary complexity — `HeroBanner` is server component but needs callback | Medium | Medium | Keep HeroBanner as server component, pass callback only to the client child `RecognitionInput` via page-level client wrapper |
| WriteKudoModal pre-fill not working with TipTap editor state | Low | Medium | Pre-fill only the simple fields (recipientId, recipientName) via form reducer dispatch, not the editor |
| Background image too large on mobile | Low | Low | CSS `background-size: cover` handles this; image is already optimized |
| Dropdown positioning overlapping other content on mobile | Low | Medium | Use `position: absolute` with `z-50`; test at 320px width |

---

## Estimated Complexity

- **Frontend**: Medium (rewrite 2 components, modify 4 others, state coordination)
- **Backend**: None (all APIs already exist)
- **Testing**: Low (manual visual testing + existing patterns)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: RecognitionInput → dropdown → recipient selection → WriteKudoModal
- [x] **External dependencies**: Supabase `searchUsers` server action
- [ ] **Data layer**: No DB changes
- [x] **User workflows**: Type name → see results → select → modal opens with recipient

### Test Scenarios

1. **Happy Path**
   - [ ] Type name → dropdown shows matching users → select user → modal opens with recipient pre-filled
   - [ ] Search bar shows results independently from recognition input

2. **Error Handling**
   - [ ] Type < 2 chars → no dropdown
   - [ ] API returns empty → "No results" message shown
   - [ ] API fails → dropdown closes gracefully

3. **Edge Cases**
   - [ ] Type special chars (%, _) → handled by sanitization
   - [ ] Click outside dropdown → closes
   - [ ] Select recipient → open modal → close modal → recognition input resets

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- The `WriteKudoModal` already has `recipientId` and `recipientName` in its form state — we just need to initialize them from props
- The `searchUsers` server action already exists and works — no backend changes needed
- The `SearchBar` component already implements the debounced search + dropdown pattern — `RecognitionInput` should follow the same pattern for consistency
- No database migrations required — all data structures already exist
- The hero banner's `HeroBanner` component can remain a server component since only the child `RecognitionInput` needs interactivity
