# Implementation Plan: Open Secret Box

**Frame**: `1466:7676-Open Secret Box`
**Date**: 2026-03-09
**Spec**: `specs/1466-7676-open-secret-box/spec.md`

---

## Summary

Build the "Open Secret Box" modal — a gamification dialog where users click a gift box to reveal a randomly awarded badge. The modal opens from the Kudos Live Board page with a dark overlay and displays: a gold title, instruction text, an animated gift box image (clickable to trigger server-side weighted random badge selection), dividers, and an unopened box count. The server action implements atomic badge awarding with configurable probability distribution. The modal uses a dark theme (`#00101A`) with gold accent (`#FFEA9E`) and Montserrat typography.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image
**Database**: Supabase (PostgreSQL) — `secret_boxes`, `secret_box_openings`, `badge_configs` tables with RLS
**Testing**: Playwright (E2E), Vitest (unit/integration)
**State Management**: Local React state (useState) for animation state and count, server state via Supabase
**API Style**: Next.js Server Actions + Supabase server client

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (Supabase Auth/DB, Tailwind, next/image — no new deps)
- [x] Adheres to folder structure guidelines (App Router: modal component under `src/components/secret-box/`)
- [x] Meets security requirements (Principle IV: server-side badge selection, auth verification, atomic transactions, RLS)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: server actions for box opening + count fetch, client boundary on modal only)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, scaled box image, 44px touch targets)
- [x] Edge-compatible (Principle VI: No Node.js APIs, CSS animations only, Cloudflare Workers safe)
- [x] Simplicity (Principle VII: minimal state, CSS animations instead of canvas/WebGL, no heavy animation libraries)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based modal with sub-components
  - `src/components/secret-box/` — All Secret Box modal components
  - `SecretBoxModal` — Top-level client component (overlay, focus trap, animation state)
  - Sub-components: `BoxImage` (clickable box with animation states), `UnopenedCount` (live counter), `BadgeReveal` (revealed badge display)
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`
- **Animation Strategy**: CSS `@keyframes` + Tailwind `animate-*` custom utilities for:
  - Modal open/close (fade + scale, 200ms)
  - Box idle state (subtle glow pulse via CSS radial-gradient animation)
  - Box opening sequence (shake -> lift lid -> glow intensify -> badge appear, ~1000-1500ms total)
  - Badge reveal (scale-in + sparkle, using CSS animations)
  - Count decrement (number transition)
- **No heavy animation libraries**: Use CSS animations and `requestAnimationFrame` for smooth transitions. No GSAP, Framer Motion, or Lottie to keep bundle minimal (Principle VI, VII).

### Backend Approach

- **API Design**: Server actions for both mutations and queries
  - `openSecretBox` — Atomic badge selection + awarding
  - `getSecretBoxCount` — Fetch unopened count for initial modal render
- **Data Access**: Supabase server client with parameterized queries, RLS-enforced
- **Badge Selection Algorithm**: Weighted random selection using cumulative probability distribution, entirely server-side
  - Probabilities stored in `badge_configs` table (configurable without code changes per spec note)
  - Algorithm: generate random float [0, 1), walk cumulative probabilities, select matching badge
- **Atomicity**: Database transaction via Supabase RPC (stored procedure) to ensure badge award + count decrement happen together or not at all

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/server.ts` — Server client for server actions (auth verification + DB operations)
  - `@/libs/supabase/client.ts` — Not needed (all operations are server-side for security)
  - `@/libs/i18n/translations.ts` — Translation strings for modal text
- **Shared Components**: Header (from login), modal overlay pattern (potentially shared with KudoModal)
- **API Contracts**: `openSecretBox` server action, `getSecretBoxCount` server action

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/1466-7676-open-secret-box/
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
├── components/
│   └── secret-box/
│       ├── secret-box-modal.tsx      # Modal wrapper (Client Component) — overlay, focus trap, state machine
│       ├── box-image.tsx             # Clickable gift box with animation states (Client Component)
│       ├── unopened-count.tsx         # Count display with aria-live (Client Component)
│       └── badge-reveal.tsx          # Revealed badge display with celebration animation (Client Component)
├── libs/
│   └── actions/
│       └── secret-box.ts            # Server actions: openSecretBox, getSecretBoxCount
└── types/
    └── secret-box.ts                # TypeScript types for SecretBox, BadgeType, AnimationState, etc.

# Modified Files
src/
├── app/
│   └── globals.css                  # Add @keyframes: box-shake, box-glow, badge-reveal, glow-pulse (4 animations)
└── libs/
    └── i18n/
        └── translations.ts          # Add secretbox.* translation keys (9 keys per spec i18n table)

# Database
supabase/
├── migrations/
│   ├── YYYYMMDD_create_secret_boxes.sql      # Create secret_boxes + secret_box_openings tables + RLS
│   ├── YYYYMMDD_create_badge_configs.sql     # Create badge_configs table + RLS
│   └── YYYYMMDD_create_open_secret_box_rpc.sql  # Stored procedure for atomic box opening
└── seeds/
    ├── common/
    │   └── badge_configs.sql                 # Seed 6 badge types with probabilities
    └── dev/
        └── secret_boxes.sql                  # Test user secret box records

# Assets
public/
└── images/
    └── secret-box/
        ├── gift-box-closed.webp      # Closed gift box image
        ├── gift-box-opening.webp     # Opening state image (optional, can use CSS)
        ├── particle-glow.webp        # Particle glow overlay
        └── badges/
            ├── stay-gold.webp        # Badge image: Stay Gold
            ├── flow-to-horizon.webp  # Badge image: Flow to Horizon
            ├── touch-of-light.webp   # Badge image: Touch of Light
            ├── beyond-the-boundary.webp  # Badge image: Beyond the Boundary
            ├── revival.webp          # Badge image: Revival
            └── root-further.webp     # Badge image: Root Further
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

> All required packages (`@supabase/ssr`, `next`, `react`, `tailwindcss`) are already installed. Animations use pure CSS.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Database

- Download required UI assets from Figma:
  - Gift box closed image -> `public/images/secret-box/gift-box-closed.webp`
  - Particle glow overlay -> `public/images/secret-box/particle-glow.webp`
  - Close (X) icon -> reuse from shared icons or `public/images/shared/`
  - 6 badge images -> `public/images/secret-box/badges/`
- Create database migrations:
  - `secret_boxes` table: user_id (UUID, PK, FK auth.users), unopened_count (integer, default 0), updated_at (timestamptz)
  - `secret_box_openings` table: id (UUID, PK), user_id (UUID, FK auth.users), badge_type (text), opened_at (timestamptz, default now())
  - `badge_configs` table: type (text, PK), display_name (text), probability (numeric), image_url (text), sort_order (integer)
  - Seed `badge_configs`: Stay Gold (0.30), Flow to Horizon (0.25), Touch of Light (0.20), Beyond the Boundary (0.10), Revival (0.10), Root Further (0.05)
  - RLS policies:
    - `secret_boxes`: users can SELECT own row only, no direct INSERT/UPDATE (managed by server action via service role or RPC)
    - `secret_box_openings`: users can SELECT own rows only, INSERT via server action
    - `badge_configs`: all authenticated users can SELECT (read-only, public config)
  - Stored procedure `open_secret_box(p_user_id UUID)`:
    - Must be created as `SECURITY DEFINER` to bypass RLS within the transaction (the calling user's RLS policies would otherwise prevent UPDATE on `secret_boxes` since users only have SELECT). Alternatively, grant authenticated users UPDATE on their own row via RLS policy — evaluate which approach is simpler.
    - BEGIN transaction
    - **Validate badge probability configuration**: SELECT SUM(probability) FROM badge_configs and verify it equals 1.0 within an epsilon tolerance of 0.001 (i.e., `ABS(SUM(probability) - 1.0) < 0.001`). If validation fails, RAISE EXCEPTION 'Badge probability configuration error: probabilities must sum to 1.0'. This prevents silent misconfiguration from causing unexpected badge distribution.
    - SELECT unopened_count FROM secret_boxes WHERE user_id = p_user_id FOR UPDATE (row lock)
    - IF count <= 0, RAISE EXCEPTION
    - SELECT weighted random badge from badge_configs
    - INSERT INTO secret_box_openings
    - UPDATE secret_boxes SET unopened_count = unopened_count - 1
    - RETURN badge_type, badge_display_name, badge_image_url, remaining_count
    - COMMIT (implicit)
  - **Seed data** — `supabase/seeds/common/badge_configs.sql`
    - Insert 6 badge configs with probabilities: Stay Gold (0.30), Flow to Horizon (0.25), Touch of Light (0.20), Beyond the Boundary (0.10), Revival (0.10), Root Further (0.05)
  - **Dev seed data** — `supabase/seeds/dev/secret_boxes.sql`
    - Insert test user secret box records with non-zero unopened_count for development/testing

### Phase 1: Modal Foundation (US4 — Close Modal)

**Purpose**: Create the modal shell with overlay, focus trap, open/close behavior, and ARIA attributes.

1. **Create `src/types/secret-box.ts`** — Type definitions
   - `BadgeType` enum: `'stay_gold' | 'flow_to_horizon' | 'touch_of_light' | 'beyond_the_boundary' | 'revival' | 'root_further'`
   - `AnimationState`: `'idle' | 'opening' | 'revealed'`
   - `OpenSecretBoxResult`: `{ success: true, badgeType: BadgeType, badgeDisplayName: string, badgeImageUrl: string, remainingCount: number } | { success: false, error: string }`
   - `SecretBoxModalProps`: `{ isOpen: boolean, onClose: () => void, triggerRef: RefObject<HTMLElement>, initialCount: number }`

2. **Create `src/components/secret-box/secret-box-modal.tsx`** — Modal wrapper (Client Component)
   - `'use client'` directive
   - Props: `isOpen`, `onClose`, `triggerRef`, `initialCount`
   - Dark overlay: `fixed inset-0 bg-[rgba(0,16,26,0.80)] z-40 flex items-center justify-center`
   - Modal container: dark bg `#00101A`, `rounded-[13px]`, responsive width
   - `role="dialog"`, `aria-modal="true"`, `aria-labelledby="secret-box-title"`
   - Focus trap: on mount, trap Tab/Shift+Tab within modal
   - Close via: X button, overlay click, Escape key
   - Prevent close during `opening` animation state (US4-AC4)
   - On close, return focus to `triggerRef`
   - Open animation: fade-in overlay 200ms + scale-up modal 200ms
   - Local state: `animationState` (`idle` | `opening` | `revealed`), `unopenedCount`, `revealedBadge`, `error`
   - Layout: flex-col, items-center, gap-[22px], padding 24px 13px

3. **Title section with close button**:
   - Title: "KHAM PHA SECRET BOX CUA BAN", gold `#FFEA9E`, Montserrat 25px/700, centered
   - Close button: absolute top-right, 19x19 icon, 44x44 touch target, `aria-label="Close"`

### Phase 2: User Story 1 — Open a Secret Box (P1, MVP)

**Purpose**: Core box opening interaction with server-side badge selection.

1. **Create `src/libs/actions/secret-box.ts`** — Server actions
   - `'use server'` directive

   - **`getSecretBoxCount()`**:
     - Verify auth via Supabase server client
     - Query `secret_boxes` for user's `unopened_count`
     - Return count (default 0 if no row exists)

   - **`openSecretBox()`**:
     - Verify auth via Supabase server client
     - Call stored procedure `open_secret_box(auth.uid())`
     - The stored procedure handles: row lock, validation (count > 0), weighted random selection, insert opening record, decrement count — all atomically
     - Return `{ success: true, badgeType, badgeDisplayName, remainingCount }` or `{ success: false, error }`
     - Duplicate prevention: client prevents clicks during `opening` state; server prevents via row lock (concurrent requests will serialize)

2. **Create `src/components/secret-box/box-image.tsx`** — Gift box (Client Component)
   - Props: `animationState`, `disabled` (count = 0), `onClick`
   - Render `next/image` for gift box (priority load, `object-fit: contain`)
   - Particle glow overlay: absolutely positioned, `pointer-events-none`
   - States:
     - `idle` + enabled: cursor pointer, hover brightness(1.1), active scale(0.98)
     - `idle` + disabled: opacity 0.5, cursor not-allowed, no click handler
     - `opening`: CSS animation sequence (shake -> glow intensify), click ignored
     - `revealed`: replaced by badge image (via `BadgeReveal` component)
   - `role="button"`, `aria-label` based on state (enabled: "Open secret box", disabled: "No secret boxes to open")
   - `aria-disabled="true"` when count = 0
   - Click handler: if idle + enabled, call parent's `onOpenBox()`

3. **CSS Animations** (in `globals.css` or Tailwind config):
   ```css
   @keyframes box-shake {
     0%, 100% { transform: translateX(0); }
     10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
     20%, 40%, 60%, 80% { transform: translateX(4px); }
   }
   @keyframes box-glow {
     0% { filter: brightness(1); }
     50% { filter: brightness(1.5); }
     100% { filter: brightness(2); }
   }
   @keyframes badge-reveal {
     0% { transform: scale(0); opacity: 0; }
     60% { transform: scale(1.1); opacity: 1; }
     100% { transform: scale(1); opacity: 1; }
   }
   @keyframes glow-pulse {
     0%, 100% { opacity: 0.6; }
     50% { opacity: 1; }
   }
   ```

4. **Create `src/components/secret-box/badge-reveal.tsx`** — Badge display (Client Component)
   - Props: `badgeType`, `badgeDisplayName`
   - Render badge image from `public/images/secret-box/badges/{badge-type}.webp`
   - Scale-in animation on mount (badge-reveal keyframe, 500ms)
   - Badge name text below image

5. **Wire up in `secret-box-modal.tsx`**:
   - On box click: set `animationState = 'opening'`, call `openSecretBox()` server action
   - On success: after animation completes (~1000ms), set `animationState = 'revealed'`, set `revealedBadge`, decrement `unopenedCount`
   - On error: set `animationState = 'idle'`, show error message, count unchanged
   - Coordinate animation timing: use `setTimeout` or `onAnimationEnd` to sync CSS animation with server response

### Phase 3: User Story 2 — Unopened Count Display (P2)

**Purpose**: Display and live-update the unopened box count.

1. **Create `src/components/secret-box/unopened-count.tsx`** — Count display (Client Component)
   - Props: `count`
   - Zero-pad to 2 digits: `String(count).padStart(2, '0')`
   - Count number: gold `#FFEA9E`, Montserrat 29px/700
   - Label: "Secretbox chua mo", white, Montserrat 13px/700, tracking 0.4px
   - Layout: flex-row, gap-[6px], items-center
   - `aria-live="polite"` on the container to announce count changes
   - `aria-label` with full text: e.g., "05 Unopened secret boxes"

2. **Divider component** (or inline):
   - `<div className="w-full max-w-[626px] h-px bg-[#2E3940]" />`
   - Used above and below the box image

### Phase 4: User Story 3 — Empty State (P3)

**Purpose**: Handle count = 0 gracefully.

1. **Instruction text** (in modal):
   - "Click vao box de mo" — white, Montserrat 13px/700, centered
   - Conditionally rendered: only when `unopenedCount > 0`
   - Fade-out animation (200ms) when count reaches 0

2. **Box disabled state**:
   - When `unopenedCount === 0`: box gets `opacity-50`, `cursor-not-allowed`, click handler disabled
   - `aria-disabled="true"` on box button
   - Count shows "00"

3. **Transition from last box**:
   - After opening the last box (count 1 -> 0): badge is revealed, then instruction text fades out, box becomes disabled for further clicks

### Phase 5: Polish & Accessibility

**Purpose**: Final accessibility audit, responsive testing, animation polish.

1. **Focus trap verification**: Tab cycles between close button and box image (2 interactive elements)
2. **ARIA audit**: dialog role, modal true, labelledby title, live region on count, button labels
3. **Responsive testing**:
   - Mobile (< 768px): `w-[calc(100%-32px)]`, padding 16px 12px, title 20px, box scales proportionally, gap 16px
   - Tablet (768-1023px): max-width 580px, title 22px, box max-width 480px
   - Desktop (1024-1279px): max-width 620px, near-Figma values
   - Wide (>= 1280px): 652px, exact Figma
4. **Animation timing coordination**:
   - If server response is faster than animation: wait for animation to complete before showing badge
   - If server response is slower than animation: extend glow/shake animation or show a loading pulse until response arrives
   - Use `Promise.all([animationPromise, serverActionPromise])` pattern
5. **Particle glow effect**: CSS radial-gradient pulse animation on the overlay image (or use the static particle image with opacity animation)
6. **i18n**: add all `secretbox.*` translation keys to `translations.ts`
7. **Touch target**: close button icon is 19x19 but touch target must be 44x44 (use padding or min-w/min-h)

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Stored procedure not supported via Supabase JS client | Low | High | Supabase supports `rpc()` calls. Test with local Supabase. Fallback: use multiple queries with optimistic locking (check-and-set). |
| Race condition on concurrent box openings | Low | High | `FOR UPDATE` row lock in stored procedure serializes concurrent requests. Test with parallel requests. |
| Animation feels underwhelming | Med | Med | Iterate on CSS keyframes during implementation. Consider adding subtle particle CSS effects. Keep it pure CSS — no external animation libraries. |
| Badge images not available from Figma | Med | Med | Use placeholder images during development. Request assets from design team early. |
| Weighted random distribution skewed | Low | Med | Unit test with 10,000 iterations, verify distribution within 5% tolerance of configured probabilities. |
| Modal close during opening animation causes inconsistent state | Low | Med | Prevent close during `opening` state (US4-AC4). If close is forced (e.g., browser back), server transaction is atomic — no data inconsistency. |

### Estimated Complexity

- **Frontend**: Medium — Modal with animation states, conditional rendering, responsive design. No complex form state.
- **Backend**: Medium — Stored procedure for atomic operation, weighted random algorithm, database schema design.
- **Testing**: Medium — Animation state transitions, race condition testing, probability distribution verification.

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: SecretBoxModal state machine -> BoxImage animation -> server action -> count update
- [x] **External dependencies**: Supabase Auth, Supabase DB (stored procedure)
- [x] **Data layer**: secret_boxes count, secret_box_openings records, badge_configs read
- [x] **User workflows**: Open modal -> click box -> animation -> badge revealed -> count decremented

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Box click -> animation state transition -> badge display, count update |
| Service <-> Service | Yes | Server action -> Supabase RPC (stored procedure) -> DB transaction |
| App <-> External API | No | No external APIs beyond Supabase |
| App <-> Data Layer | Yes | Atomic box opening, count decrement, badge record insertion |
| Cross-platform | Yes | Responsive modal at 4 breakpoints, mobile touch target |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E
- **Test data strategy**: Seed badge_configs, create test user with secret_boxes row (unopened_count = 5)
- **Isolation approach**: Reset unopened_count and clear openings per test suite

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack |
| Supabase DB + RPC | Real (local) | Test actual stored procedure and RLS |
| CSS Animations | Real | Playwright can wait for animation end |
| Badge images | Placeholder | Use colored rectangles if real assets unavailable |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open modal with count 5 -> click box -> animation plays -> badge revealed -> count shows "04"
   - [ ] Open multiple boxes sequentially -> count decrements correctly each time
   - [ ] Badge type is one of the 6 valid types

2. **Error Handling**
   - [ ] Server action fails -> error message shown, box returns to idle, count unchanged
   - [ ] Network error during opening -> graceful error, box returns to idle

3. **Edge Cases**
   - [ ] Count = 0 -> instruction hidden, box disabled, click does nothing
   - [ ] Open last box (count 1 -> 0) -> badge revealed, then box becomes disabled
   - [ ] Rapid double-click -> only one server request (click ignored during opening)
   - [ ] Close modal via X button -> modal closes, focus returns to trigger
   - [ ] Close modal via overlay click -> modal closes
   - [ ] Close modal via Escape -> modal closes
   - [ ] Attempt close during opening animation -> close prevented

4. **Probability Distribution (unit test)**
   - [ ] Run 10,000 simulated openings -> verify each badge type within 5% of configured probability

### Tooling & Framework

- **Test framework**: Vitest (unit/integration — server actions, probability algorithm), Playwright (E2E — modal interactions, animations)
- **Supporting tools**: Supabase local, Playwright browser automation
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Server actions (openSecretBox, getSecretBoxCount) | 90%+ | High |
| Stored procedure (atomic transaction) | 90%+ | High |
| Animation state machine | 85%+ | High |
| Probability distribution algorithm | 95%+ | High |
| Responsive layout | Visual regression | Medium |
| Accessibility (ARIA, focus trap) | Manual + axe-core | High |
| Empty state handling | 90%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [ ] Database migrations planned (secret_boxes, secret_box_openings, badge_configs)
- [ ] Stored procedure designed and tested locally
- [ ] Badge image assets available (6 badge images + gift box + particle glow)

### External Dependencies

- Supabase local running (`make up`)
- Figma media assets (gift box, particle glow, 6 badge images) downloaded to `public/images/secret-box/`
- Login feature completed (auth infrastructure required)
- Kudos Live Board page exists (modal is opened from there)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **New `src/types/` directory**: This plan introduces `src/types/secret-box.ts` as the first types file. The `src/types/` directory does not yet exist in the project. This establishes a convention for shared type definitions. If the team prefers co-locating types within feature directories, move types into `src/components/secret-box/types.ts` instead.
- **No new npm packages needed.** All animations use pure CSS `@keyframes` and Tailwind utilities. No Framer Motion, GSAP, or Lottie. This keeps the bundle minimal per Principle VI and VII.
- **Stored procedure is the key architectural decision**: The `open_secret_box` RPC function ensures atomicity. Without it, a race condition could allow a user to open more boxes than they have (read count -> another request decrements -> first request still opens). The `FOR UPDATE` row lock prevents this.
- **Badge probabilities are configurable**: Stored in `badge_configs` table, not hardcoded. Product team can adjust probabilities via database update without code deployment. The server action reads probabilities from the table on each call (cached in the stored procedure execution context). **The stored procedure validates that `SUM(probability) = 1.0` (with epsilon tolerance of 0.001) at the start of each `open_secret_box()` call**, raising an exception if misconfigured. This prevents silent misconfiguration from corrupting badge distribution.
- **Animation timing strategy**: The opening animation runs for ~1000-1500ms regardless of server response time. If the server responds faster (typical case), the animation continues to completion before revealing the badge. If the server is slower, a looping glow-pulse animation extends until the response arrives. This creates a consistent, satisfying experience.
- **Shared modal pattern**: Both KudoModal and SecretBoxModal share similar overlay + focus trap + close behavior. Consider extracting a shared `<ModalBase>` component after both are implemented (not prematurely — Principle VII). For now, implement independently with awareness of the shared pattern.
- **Badge image strategy**: The `badge_configs` table has an `image_url` column. For local development, store images in `public/images/secret-box/badges/` and set `image_url` to `/images/secret-box/badges/{type}.webp`. For production, these could be served from Supabase Storage or a CDN. The `BadgeReveal` component should read `image_url` from the server action response, not construct paths client-side.
- **Particle glow implementation**: Recommend using the static particle image from Figma with a CSS `opacity` pulse animation (`glow-pulse` keyframe). This is simpler and more performant than a canvas particle system, and the visual impact is sufficient given the image already contains the glow effect.
- **The "opened" state modal** (showing the revealed badge in a congratulatory layout) is a separate frame specification per the spec's Out of Scope section. This plan covers the transition to `revealed` state within the current modal. A future plan may add a distinct "opened" modal design.
