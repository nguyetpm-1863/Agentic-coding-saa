# Tasks: Open Secret Box

**Frame**: `1466:7676-Open Secret Box`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets)

**Purpose**: Download Figma assets for gift box, particle glow, badge images, and close icon

- [x] T001 Download media assets from Figma using `get_media_files` tool: gift box closed image -> `public/images/secret-box/gift-box-closed.webp`, particle glow overlay -> `public/images/secret-box/particle-glow.webp`, close (X) icon -> reuse from `public/images/shared/` or download to `public/images/secret-box/` | `public/images/secret-box/`
- [x] T002 Download 6 badge images from Figma: stay-gold.webp, flow-to-horizon.webp, touch-of-light.webp, beyond-the-boundary.webp, revival.webp, root-further.webp -> `public/images/secret-box/badges/` | `public/images/secret-box/badges/`
- [x] T003 Verify all assets exist, are WebP-optimized, and follow kebab-case naming | `public/images/secret-box/`

**Checkpoint**: All assets in `public/images/secret-box/` including 6 badge images

---

## Phase 2: Foundation (DB Migration, Types, Server Actions)

**Purpose**: Database schema (3 tables + RPC), TypeScript types, server actions, i18n keys — BLOCKS all user stories

**WARNING**: No user story work can begin until this phase is complete

- [x] T004 Create database migration for `secret_boxes` table: user_id UUID PK FK auth.users, unopened_count integer DEFAULT 0, updated_at timestamptz DEFAULT now(); RLS: authenticated users can SELECT own row only (user_id = auth.uid()), no direct INSERT/UPDATE from client | `supabase/migrations/YYYYMMDD_create_secret_boxes.sql`
- [x] T005 [P] Create database migration for `secret_box_openings` table: id UUID PK DEFAULT gen_random_uuid(), user_id UUID FK auth.users NOT NULL, badge_type text NOT NULL, opened_at timestamptz DEFAULT now(); RLS: authenticated users can SELECT own rows, INSERT via server action; INDEX on (user_id, opened_at) | `supabase/migrations/YYYYMMDD_create_secret_box_openings.sql`
- [x] T006 [P] Create database migration for `badge_configs` table: type text PK, display_name text NOT NULL, probability numeric NOT NULL CHECK(probability > 0 AND probability <= 1), image_url text NOT NULL, sort_order integer NOT NULL; RLS: all authenticated users can SELECT (read-only public config) | `supabase/migrations/YYYYMMDD_create_badge_configs.sql`
- [x] T007 Create stored procedure `open_secret_box(p_user_id UUID)` as SECURITY DEFINER: BEGIN; SELECT unopened_count FROM secret_boxes WHERE user_id = p_user_id FOR UPDATE; IF count <= 0 RAISE EXCEPTION 'No unopened boxes'; weighted random badge selection from badge_configs (generate random float [0,1), walk cumulative probabilities); INSERT INTO secret_box_openings (user_id, badge_type); UPDATE secret_boxes SET unopened_count = unopened_count - 1, updated_at = now(); RETURN badge_type, display_name, image_url, remaining_count; COMMIT implicit | `supabase/migrations/YYYYMMDD_create_open_secret_box_rpc.sql`
- [x] T008 [P] Create seed data for badge_configs: Stay Gold (0.30), Flow to Horizon (0.25), Touch of Light (0.20), Beyond the Boundary (0.10), Revival (0.10), Root Further (0.05) with image_url paths `/images/secret-box/badges/{type}.webp` | `supabase/seeds/common/badge_configs.sql`
- [x] T009 [P] Create dev seed data: test user secret_boxes records with unopened_count = 5 for development/testing | `supabase/seeds/dev/secret_boxes.sql`
- [x] T010 [P] Create TypeScript types: `BadgeType` union type ('stay_gold' | 'flow_to_horizon' | 'touch_of_light' | 'beyond_the_boundary' | 'revival' | 'root_further'), `AnimationState` ('idle' | 'opening' | 'revealed'), `OpenSecretBoxResult` (success discriminated union with badgeType, badgeDisplayName, badgeImageUrl, remainingCount), `SecretBoxModalProps` (isOpen, onClose, triggerRef, initialCount) | `src/types/secret-box.ts`
- [x] T011 Create server actions `getSecretBoxCount` and `openSecretBox`: both `'use server'`; `getSecretBoxCount`: verify auth, query secret_boxes for user's unopened_count, return number (default 0); `openSecretBox`: verify auth, call stored procedure `open_secret_box(auth.uid())` via `supabase.rpc()`, return `OpenSecretBoxResult` | `src/libs/actions/secret-box.ts`
- [x] T012 [P] Add all `secretbox.*` i18n translation keys from spec i18n table (9 keys: title, instruction, unopened_count, success_title, close, error, empty, box_aria_label, box_disabled_aria_label) to both VN and EN objects | `src/libs/i18n/translations.ts`
- [x] T013 [P] Add CSS @keyframes animations to globals.css: `box-shake` (translateX -4px/+4px oscillation), `box-glow` (brightness 1 -> 1.5 -> 2), `badge-reveal` (scale 0 -> 1.1 -> 1 with opacity), `glow-pulse` (opacity 0.6 -> 1 -> 0.6 cycle) | `src/app/globals.css`

**Checkpoint**: Migrations applied via `make up`, RPC callable, types compile, server actions return data, animations defined

---

## Phase 3: User Story 1 — Open a Secret Box (Priority: P1) MVP

**Goal**: User can click the gift box to trigger server-side badge selection with opening animation and badge reveal.

**Independent Test**: Open SecretBoxModal with count >= 1, click gift box, verify opening animation plays, server action called, badge revealed with animation, count decremented.

### Components (US1)

- [x] T014 [P] [US1] Create SecretBoxModal component (Client Component): `'use client'`, props `isOpen`, `onClose`, `triggerRef`, `initialCount`; overlay `fixed inset-0 bg-[rgba(0,16,26,0.80)] z-40 flex items-center justify-center`; modal container `max-w-[652px] w-[calc(100%-32px)] bg-[#00101A] rounded-[13px] p-[24px_13px] flex flex-col items-center gap-[22px] z-50 relative`; `role="dialog"` `aria-modal="true"` `aria-labelledby="secret-box-title"`; focus trap (Tab/Shift+Tab between close button and box image); close via X button + overlay click + Escape; prevent close during `opening` animation state; on close return focus to `triggerRef`; open animation fade-in 200ms + scale-up 200ms; local state: `animationState` (idle/opening/revealed), `unopenedCount`, `revealedBadge`, `error`; title section: `<h2>` "KHAM PHA SECRET BOX CUA BAN" (Montserrat 25px/700, #FFEA9E, centered) with close button (absolute top-0 right-0, 19x19 icon, 44x44 min touch target, `aria-label="Close"`, opacity 0.8 hover 1, focus outline 2px solid #FFEA9E) | `src/components/secret-box/secret-box-modal.tsx`
- [x] T015 [P] [US1] Create BoxImage component (Client Component): props `animationState`, `disabled` (count=0), `onClick`; render `next/image` for gift box (priority, object-contain, responsive max-w-[557px] aspect-square); particle glow overlay absolutely positioned pointer-events-none z-1 with glow-pulse animation; states: idle+enabled (cursor-pointer, hover brightness(1.1) 200ms, active scale(0.98) 100ms), idle+disabled (opacity-50, cursor-not-allowed, no click), opening (box-shake animation then box-glow, click ignored), revealed (hidden, replaced by BadgeReveal); `role="button"`, `aria-label` based on state, `aria-disabled="true"` when count=0 | `src/components/secret-box/box-image.tsx`
- [x] T016 [P] [US1] Create BadgeReveal component (Client Component): props `badgeType`, `badgeDisplayName`, `badgeImageUrl`; render badge image via `next/image` from `badgeImageUrl`; badge-reveal animation on mount (scale 0 -> 1.1 -> 1, 500ms); badge name text below image | `src/components/secret-box/badge-reveal.tsx`

### Assembly (US1)

- [x] T017 [US1] Wire box opening flow in SecretBoxModal: render divider (`w-full max-w-[626px] h-px bg-[#2E3940]`) above and below box area; on box click set `animationState='opening'`, call `openSecretBox()` server action; use `Promise.all([animationDelay(1000), serverAction])` to coordinate timing; on success: after animation set `animationState='revealed'`, set `revealedBadge`, decrement `unopenedCount`; on error: set `animationState='idle'`, show error message in `aria-live="polite"` region, count unchanged; if server faster than animation wait for animation; if server slower extend glow-pulse until response | `src/components/secret-box/secret-box-modal.tsx`

**Checkpoint**: User Story 1 complete — box click triggers animation + server badge award + reveal

---

## Phase 4: User Story 2 — View Unopened Box Count (Priority: P2)

**Goal**: Display live-updating unopened count with zero-padding and accessible announcements.

**Independent Test**: Open modal, verify count shows correct zero-padded number (e.g., "05"). Open a box, verify count decrements to "04". Verify screen reader announces change.

- [x] T018 [US2] Create UnopenedCount component (Client Component): props `count`; zero-pad to 2 digits via `String(count).padStart(2, '0')`; count number in gold #FFEA9E Montserrat 29px/700 leading-[35px]; label "Secretbox chua mo" in white Montserrat 13px/700 leading-[19px] tracking-[0.4px]; layout flex-row gap-[6px] items-center; `aria-live="polite"` on container; `aria-label` with full text e.g. "05 Unopened secret boxes" | `src/components/secret-box/unopened-count.tsx`

### Integration (US2)

- [x] T019 [US2] Integrate UnopenedCount into SecretBoxModal: render after bottom divider, pass `unopenedCount` state, count updates automatically after successful box opening | `src/components/secret-box/secret-box-modal.tsx`

**Checkpoint**: User Stories 1 & 2 complete — count displays and updates live

---

## Phase 5: User Story 3 — Handle Empty State (Priority: P3)

**Goal**: When count = 0, instruction text hidden, box disabled, count shows "00".

**Independent Test**: Open modal with count 0, verify "Click vao box de mo" hidden, box visually dimmed (opacity 50%, cursor not-allowed), click does nothing, count shows "00".

- [x] T020 [US3] Implement empty state in SecretBoxModal: instruction text "Click vao box de mo" (white, Montserrat 13px/700, centered, tracking 0.4px) conditionally rendered only when `unopenedCount > 0` with fade-out 200ms when count reaches 0; BoxImage receives `disabled={unopenedCount === 0}`; after opening last box (1 -> 0): badge revealed, then instruction fades out, box becomes disabled | `src/components/secret-box/secret-box-modal.tsx`

**Checkpoint**: User Stories 1-3 complete — empty state handled gracefully

---

## Phase 6: User Story 4 — Close Modal (Priority: P4)

**Goal**: Modal closable via X button, overlay click, and Escape. Close prevented during opening animation.

**Independent Test**: Open modal, close via X button — verify closes + focus returns to trigger. Repeat with overlay click. Repeat with Escape. Start opening animation, try to close — verify prevented until animation completes.

- [x] T021 [US4] Verify and refine close behavior in SecretBoxModal: X button click closes with fade-out animation; overlay backdrop click closes; Escape key closes; ALL close methods prevented when `animationState === 'opening'` (ignore close attempts); on close return focus to `triggerRef` element; close animation: fade-out overlay 200ms + scale-down modal 200ms | `src/components/secret-box/secret-box-modal.tsx`

**Checkpoint**: All user stories complete — modal fully functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility audit, responsive testing, animation polish, edge cases

### Accessibility

- [x] T022 [P] Verify focus trap: Tab cycles between close button and box image only (2 interactive elements in modal); verify `role="dialog"`, `aria-modal="true"`, `aria-labelledby` references title | `src/components/secret-box/secret-box-modal.tsx`
- [x] T023 [P] Verify ARIA: close button has `aria-label="Close"`, box has `role="button"` + `aria-label` (changes based on enabled/disabled state), count has `aria-live="polite"`, box has `aria-disabled="true"` when count=0 | all secret-box components

### Responsive

- [x] T024 [P] Apply mobile-first responsive styles: mobile (w-[calc(100%-32px)] max-w-full, p-[16px_12px], title 20px/26px, gap-16, box scales proportionally via max-w-full, count number 24px), md tablet (max-w-[580px], title 22px, box max-w-[480px]), lg desktop (max-w-[620px], near-Figma), xl wide (max-w-[652px], exact Figma) | `src/components/secret-box/secret-box-modal.tsx`
- [x] T025 [P] Verify close button touch target: icon is 19x19 but hit area must be 44x44 minimum via padding or min-w/min-h | `src/components/secret-box/secret-box-modal.tsx`

### Animation Polish

- [x] T026 [P] Verify animation timing coordination: if server response faster than 1000ms animation, wait for animation before showing badge; if server slower, loop glow-pulse animation until response arrives; use `Promise.all` pattern | `src/components/secret-box/secret-box-modal.tsx`
- [x] T027 [P] Verify particle glow effect: CSS radial-gradient pulse or static particle image with opacity animation (glow-pulse keyframe), looks satisfying and magical | `src/components/secret-box/box-image.tsx`

### Edge Cases

- [x] T028 [P] Verify duplicate click prevention: rapid double-click on box only triggers one server request (click ignored during `opening` state), server-side row lock serializes concurrent requests | `src/components/secret-box/secret-box-modal.tsx`
- [x] T029 [P] Verify last box transition: opening box with count=1, after badge reveal count shows "00", instruction text fades out, box becomes disabled for further clicks | `src/components/secret-box/secret-box-modal.tsx`
- [x] T030 Run `yarn lint` and fix any ESLint errors across all new/modified files

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) --> Phase 2 (Foundation) --> Phase 3 (US1 MVP) --> Phase 4 (US2) --> Phase 5 (US3) --> Phase 6 (US4) --> Phase 7 (Polish)
                                                   |
                                                   +-- STOP & VALIDATE (can deploy after US1)
```

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 (assets must exist for image_url references) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 (Phase 4)**: Depends on Phase 3 (modal must exist to integrate count)
- **US3 (Phase 5)**: Depends on Phase 4 (count must exist for empty state logic)
- **US4 (Phase 6)**: Depends on Phase 5 (all states must exist for close behavior refinement)
- **Polish (Phase 7)**: Depends on Phase 6

### Within Each User Story

- Components marked [P] can be created in parallel (different files)
- Assembly/integration tasks depend on all components being ready
- Server actions (T011) can be tested independently before frontend integration

### Parallel Opportunities

**Phase 2**: T005, T006, T008, T009, T010, T012, T013 can ALL run in parallel (7 independent files). T004 is first (secret_boxes FK). T007 (RPC) depends on T004+T005+T006. T011 depends on T007+T010.
**Phase 3**: T014, T015, T016 can ALL run in parallel (3 independent component files). T017 depends on all three.
**Phase 7**: T022-T029 can mostly run in parallel (independent verification/enhancement tasks).

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation with DB + RPC)
2. Complete Phase 3 (User Story 1 — Box opening with animation + badge reveal)
3. **STOP and VALIDATE**: Test box opening flow end-to-end, verify atomic transaction
4. Deploy if ready — users can open boxes and see badges

### Incremental Delivery

1. Setup + Foundation -> Migrations applied, RPC works, server actions callable
2. Add User Story 1 -> Test -> Deploy (MVP: click box, animation, badge)
3. Add User Story 2 -> Test -> Deploy (live count display)
4. Add User Story 3 -> Test -> Deploy (empty state)
5. Add User Story 4 -> Test -> Deploy (close behavior refinement)
6. Polish -> Test -> Deploy (final)

---

## Notes

- Commit after each phase or logical task group
- Run `yarn lint` before committing (constitution requirement)
- No new npm packages needed — all animations use pure CSS @keyframes
- Figma pixel values use non-standard decimals (12.73px, 25.46px) — round to practical integers (13px, 25px)
- The stored procedure `open_secret_box` is SECURITY DEFINER to bypass RLS for the atomic transaction
- Badge probabilities are configurable via `badge_configs` table — no code changes needed to adjust
- Animation timing strategy: `Promise.all([animationDelay, serverAction])` ensures consistent UX regardless of server response time
- The "opened" state modal (congratulatory layout after reveal) is a separate frame spec — out of scope
- Consider extracting shared `<ModalBase>` component after both KudoModal and SecretBoxModal are implemented (not prematurely)
- Mark tasks complete as you go: `[x]`
