# Tasks: KV Kudos Hero Section

**Frame**: `2940-13437-kv-kudos-hero`
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

## Phase 1: Foundation (i18n + Shared Fixes)

**Purpose**: Fix i18n text to match Figma design — required before any UI work

- [x] T001 Fix Vietnamese hero title from "Hệ thống ghi nhận lời cảm ơn" to "Hệ thống ghi nhận và cảm ơn" and recognition placeholder from "Hôm nay, bạn muốn gửi lời cảm ơn đến ai?" to "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" | src/libs/i18n/translations.ts (lines ~289-290)
- [x] T002 Fix English hero title from "Appreciation recognition system" to "Appreciation and recognition system" and recognition placeholder from "Who do you want to appreciate today?" to "Who do you want to appreciate and recognize today?" | src/libs/i18n/translations.ts (lines ~443-444)

**Checkpoint**: i18n texts match Figma design for both languages

---

## Phase 2: User Story 1 — View Hero Banner (Priority: P1) MVP

**Goal**: Hero banner renders with Keyvisual.png background, gold title, KUDOS logo, and correct layout per Figma design

**Independent Test**: Navigate to `/kudos` → verify hero section shows background image, "Hệ thống ghi nhận và cảm ơn" gold title, KUDOS logo, recognition input field, and search bar

### UI (US1)

- [x] T003 [US1] Rewrite hero-banner.tsx: Replace current layout with Figma-matching structure. Add CSS background-image for `/images/kudos/Keyvisual.png` on the section element (not Next.js Image). Add 25deg gradient overlay div with `background: linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%)`. Add bottom fade gradient div with 180deg gradient. Change content alignment from `items-center` to `items-start`. Update content padding to `pt-8 md:pt-12 lg:pt-[96px] pb-12 md:pb-16 lg:pb-[120px] px-4 md:px-12 lg:px-20 xl:px-36`. Add `<Image>` for KUDOS logo (`/images/homepage/kudos.png`, h-[48px] md:h-[64px] lg:h-[80px] w-auto) below title with mt-4 gap. Change title styling: `text-[24px] md:text-[32px] lg:text-[36px] font-bold leading-[32px] md:leading-[40px] lg:leading-[44px] text-[#FFEA9E]`. Keep accepting `locale` prop and `onSelectRecipient` callback. Update input row: `flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mt-8` | src/components/kudos/hero-banner.tsx

- [x] T004 [P] [US1] Update search-bar.tsx styles to match Figma design: Change container from `md:max-w-[300px]` to `w-full md:w-[300px] lg:w-[381px]`. Change height from `h-11` to `h-11 md:h-14 lg:h-[72px]`. Change background from `bg-white/[0.08]` to `bg-[rgba(255,234,158,0.10)]`. Change border from `border-white/[0.15]` to `border-[#998C5F]`. Change border-radius from `rounded-full` to `rounded-[68px]`. Change search icon size from 20px to 24px with white color. Change placeholder font-weight from normal to bold (`font-bold`). Change placeholder color from `text-white/50` to `text-white`. Update focus state border to `focus:border-[#FFEA9E]`. Keep all existing search behavior and dropdown functionality unchanged | src/components/kudos/search-bar.tsx

**Checkpoint**: Hero banner visually matches Figma — background image, gradients, gold title, logo, styled inputs

---

## Phase 3: User Story 2 — Search Recipient via Recognition Input (Priority: P1)

**Goal**: Recognition input transforms from a static button into a searchable dropdown. Typing shows matching users from API. Selecting a user opens Write Kudo modal pre-filled.

**Independent Test**: Click recognition input → type "Nguyễn" → see dropdown with matching users → click a user → Write Kudo modal opens with that user as recipient

### UI (US2)

- [x] T005 [US2] Rewrite recognition-input.tsx from button to searchable dropdown: Remove the "Coming soon" placeholder modal entirely. Change outer element from `<button>` to a `<div>` container wrapping an `<input>`. Add `onSelectRecipient: (recipientId: string, recipientName: string) => void` callback prop. Default state shows pen icon + placeholder text (looks like current pill button). On click: focus the hidden input, cursor appears. On type ≥ 2 chars: debounced (300ms) call to `searchUsers` from `@/libs/kudos/actions`. Show dropdown below input with results (reuse same dropdown styling as search-bar.tsx: `bg-[#00101A] border border-white/15 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-50`). Each result item: 32px avatar (rounded-full, fallback bg-[#FFEA9E]/20), name (14px bold white), department (12px white/50). On result click: call `onSelectRecipient(user.id, user.name)`, clear input, close dropdown. Add outside-click listener to close dropdown. Add loading state ("Searching...") and empty state (i18n no_results). Add ARIA combobox pattern: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-controls`. Keep existing visual styling: `h-14 rounded-full bg-white/[0.08] border border-white/20 px-6 gap-3` with hover and focus states per design-style.md | src/components/kudos/recognition-input.tsx

### Integration (US2)

- [x] T006 [US2] Update hero-banner.tsx to accept and pass `onSelectRecipient` callback: Add `onSelectRecipient?: (recipientId: string, recipientName: string) => void` to `HeroBannerProps`. Pass it through to `<RecognitionInput onSelectRecipient={onSelectRecipient} />`. Note: HeroBanner must become a client component since it now passes a function prop (or keep as server component and receive children) — simplest approach: add `"use client"` directive since it's lightweight | src/components/kudos/hero-banner.tsx

- [x] T007 [US2] Add `initialRecipientId` and `initialRecipientName` optional props to WriteKudoModal. When modal opens (`isOpen` changes to true) and these props are provided, dispatch form actions to set `recipientId` and `recipientName` fields. Add a `useEffect` that watches `isOpen` + initial props: `if (isOpen && initialRecipientId) { dispatch({ type: 'SET_FIELD', field: 'recipientId', value: initialRecipientId }); dispatch({ type: 'SET_FIELD', field: 'recipientName', value: initialRecipientName }); }` | src/components/live-board/write-kudo-modal.tsx

- [x] T008 [US2] Update WriteKudoButton to support external trigger: Add `openWithRecipient?: { id: string; name: string } | null` and `onOpenHandled?: () => void` props. Add `useEffect`: when `openWithRecipient` changes from null/undefined to a value, set `isOpen(true)` and call `onOpenHandled?.()`. Pass `initialRecipientId={openWithRecipient?.id}` and `initialRecipientName={openWithRecipient?.name}` to WriteKudoModal | src/components/live-board/write-kudo-button.tsx

- [x] T009 [US2] Update kudos page.tsx to coordinate recipient selection with Write Kudo modal: Since page.tsx is a server component and cannot hold useState, create a lightweight client wrapper. Wrap `<HeroBanner>` and `<WriteKudoButton>` in an inline or extracted client component that manages `selectedRecipient` state. When `HeroBanner`'s `onSelectRecipient` fires, set `selectedRecipient`. Pass `openWithRecipient={selectedRecipient}` to `WriteKudoButton`. Pass `onOpenHandled={() => setSelectedRecipient(null)}` to clear after modal opens. Minimal approach: extract a `KudosClientWrapper` that renders children and coordinates the state, or convert only the wrapper div to a client island | src/app/kudos/page.tsx

**Checkpoint**: Full flow works — type name in recognition input → see results → select user → Write Kudo modal opens with recipient pre-filled

---

## Phase 4: User Story 3 — Search Sunner Profile (Priority: P2)

**Goal**: Search bar on the right independently searches for Sunner profiles

**Independent Test**: Type a name in the search bar → see dropdown with matching users

### UI (US3)

- [ ] T010 [US3] Verify search-bar.tsx behavior is preserved after style changes in T004. The existing search functionality (debounced search, dropdown results, outside-click close) should work unchanged. No additional behavior changes needed — this story is already implemented, just needs visual verification after style update | src/components/kudos/search-bar.tsx

**Checkpoint**: Search bar works with updated Figma-matching styles

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design, accessibility, edge cases

- [x] T011 [P] Add keyboard navigation to recognition-input.tsx dropdown: Arrow Up/Down to move selection, Enter to select highlighted user, Escape to close dropdown and return focus to input. Track `highlightedIndex` state, update on keydown | src/components/kudos/recognition-input.tsx

- [ ] T012 [P] Verify responsive layout at 320px, 768px, 1024px, 1440px widths: Hero background covers properly. Title scales (24px → 32px → 36px). Logo scales (48px → 64px → 80px). Input row stacks vertically on mobile, horizontal on tablet+. Search bar goes full-width on mobile. Dropdown positions correctly on all sizes | src/components/kudos/hero-banner.tsx

- [x] T013 Run `yarn lint` to verify all changes pass ESLint with zero errors | project root

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: No dependencies — start immediately
- **Phase 2 (US1 - Visual)**: Depends on Phase 1 (i18n text)
- **Phase 3 (US2 - Recognition Dropdown)**: Depends on Phase 2 (hero-banner layout must be in place)
  - T005 (recognition-input rewrite) can start as soon as T003 is done
  - T006 (hero-banner callback) depends on T003 + T005
  - T007 (modal props) can start in parallel with T005 (different file)
  - T008 (button trigger) depends on T007
  - T009 (page coordination) depends on T006 + T008
- **Phase 4 (US3 - Search)**: Can run in parallel with Phase 3 (only depends on T004 which is in Phase 2)
- **Phase 5 (Polish)**: Depends on Phase 3 completion

### Parallel Opportunities

Within Phase 2:
- T003 and T004 can run in parallel [P] (different files)

Within Phase 3:
- T005 and T007 can run in parallel (different files: recognition-input vs write-kudo-modal)

Within Phase 5:
- T011 and T012 can run in parallel [P]

### Critical Path

T001/T002 → T003 → T005 → T006 → T009 (longest sequential chain = 5 tasks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (i18n fixes) + Phase 2 (visual overhaul)
2. **STOP and VALIDATE**: Hero looks correct visually
3. Complete Phase 3 (recognition input dropdown + modal integration)
4. **STOP and VALIDATE**: Full flow works end-to-end
5. Complete Phase 4 + 5 (search bar + polish)

### Quick Wins

- T001 + T002 (i18n fixes): 2 minutes, instant visible improvement
- T004 (search bar styles): 5 minutes, independent, visible improvement

---

## Notes

- No new files needed — all tasks modify existing files
- No backend changes — `searchUsers` server action already exists and works
- No database migrations — all data structures already exist
- The `WriteKudoModal` already has `recipientId` / `recipientName` in its FormState — we just need to initialize from props
- The `SearchBar` component already implements the debounced search + dropdown pattern — `RecognitionInput` should follow the exact same pattern for consistency
- HeroBanner will need `"use client"` directive once it passes function props (T006), but it's lightweight enough that this is acceptable
- Commit after each phase completion for clean git history
