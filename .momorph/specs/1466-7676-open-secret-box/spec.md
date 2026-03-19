# Feature Specification: Open Secret Box (Unopened State)

**Frame ID**: `1466:7676`
**Frame Name**: `Open secret box- chưa mở`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Draft

---

## Overview

The "Open Secret Box" modal is a gamification dialog within the Sun* Kudos system. Users earn secret boxes by receiving kudos and can open them to reveal random badges/insignias. This specification covers the "unopened" state — a dark-themed modal displaying a closed gift box that the user clicks to trigger a reveal animation.

The modal uses a dark background (`#00101A`) with gold accent text (`#FFEA9E`) and white body text. It is opened from the Kudos Live Board page via the "Mo Secret Box" button. The central interaction is clicking the gift box image to trigger a server-side weighted random badge selection, followed by an opening animation that reveals the awarded badge.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open a Secret Box (Priority: P1)

As an authenticated user with unopened secret boxes, I want to click the box to reveal a random badge so that I can discover what badge I earned.

**Why this priority**: This is the core purpose of the modal. Without the ability to open a box and reveal a badge, the feature has no value.

**Independent Test**: Open the Secret Box modal with at least 1 unopened box, click the gift box image, verify a server request is made, an opening animation plays, and a badge is revealed.

**Acceptance Scenarios**:

1. **Given** the user has unopened secret boxes (count > 0) and the modal is open, **When** they click the gift box image (C - 1466:7684), **Then** the system sends a POST request to the server action to open the box, shows a loading/opening animation on the box, and on success reveals the awarded badge with a transition animation.

2. **Given** the server action returns a badge type, **When** the response is received, **Then** the box image transitions from the closed state to an opened state showing the revealed badge. The animation sequence is: idle -> opening -> revealed.

3. **Given** the box opening request fails (network error, server error), **When** the error occurs, **Then** the system displays an error message, the box returns to its idle (closed) state, and the unopened count is NOT decremented.

4. **Given** the box is currently in the "opening" animation state, **When** the user clicks the box again, **Then** the click is ignored (no duplicate requests).

5. **Given** the server returns a badge, **When** the badge probabilities are evaluated, **Then** the distribution MUST follow: Stay Gold (30%), Flow to Horizon (25%), Touch of Light (20%), Beyond the Boundary (10%), Revival (10%), Root Further (5%). Badge selection is server-side only.

---

### User Story 2 - View Unopened Box Count (Priority: P2)

As a user, I want to see how many secret boxes I have remaining so that I know how many I can still open.

**Why this priority**: The count provides essential context for the user's interaction with the modal — it determines whether the box is clickable.

**Independent Test**: Open the modal, verify the unopened count is displayed with the correct number and label.

**Acceptance Scenarios**:

1. **Given** the user has 5 unopened secret boxes, **When** the modal is displayed, **Then** the count section (D - 1466:7689) shows "05" in gold text and "Secretbox chua mo" as the label.

2. **Given** the user opens a box successfully, **When** the badge is revealed, **Then** the unopened count decreases by 1 (e.g., "05" becomes "04"). The count update MUST use `aria-live="polite"` for screen reader announcements.

3. **Given** the count is a single digit (e.g., 3), **When** the count is displayed, **Then** it MUST be zero-padded to two digits ("03").

---

### User Story 3 - Handle Empty State (Priority: P3)

As a user with no unopened secret boxes, I want to see that I cannot open any boxes so that I understand I need to earn more.

**Why this priority**: Without proper empty state handling, users may be confused when clicking does nothing.

**Independent Test**: Open the modal with 0 unopened boxes, verify the box is not clickable and the instruction text is hidden.

**Acceptance Scenarios**:

1. **Given** the user has 0 unopened secret boxes, **When** the modal is displayed, **Then** the instruction text (B - 1466:7681) "Click vao box de mo" is hidden.

2. **Given** the user has 0 unopened secret boxes, **When** they click the gift box image, **Then** nothing happens — the click is disabled. The box SHOULD appear visually dimmed or inactive (e.g., `opacity: 0.5`, `cursor: not-allowed`).

3. **Given** the user has 0 unopened boxes, **When** the count section is displayed, **Then** it shows "00" and "Secretbox chua mo".

---

### User Story 4 - Close Modal (Priority: P4)

As a user, I want to close the Secret Box modal so that I can return to the Kudos Live Board.

**Why this priority**: Users must be able to dismiss the modal at any time. This is a basic UX requirement.

**Independent Test**: Open the modal, click the X button, verify the modal closes. Repeat with clicking the overlay backdrop. Repeat with pressing Escape.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks the close button (X icon, 19x19px, top-right of title area), **Then** the modal closes with a fade-out animation and focus returns to the trigger element ("Mo Secret Box" button on the Live Board).

2. **Given** the modal is open, **When** the user clicks the dark overlay backdrop behind the modal, **Then** the modal closes.

3. **Given** the modal is open, **When** the user presses `Escape`, **Then** the modal closes.

4. **Given** the box is currently in the "opening" animation state, **When** the user attempts to close the modal, **Then** the close action SHOULD be prevented until the animation completes (or the close should abort the animation gracefully).

---

### Edge Cases

- What happens when the user opens the last box (count goes from 1 to 0)? -> After the badge is revealed, the instruction text hides and the box becomes disabled for further clicks.
- What happens when two users open boxes simultaneously and badge stock is limited? -> Badge distribution is probabilistic (not inventory-based), so concurrent opens are safe. Server handles randomization independently.
- What happens if the modal is opened on a slow connection? -> Show a loading skeleton for the unopened count while fetching initial data. The box image should be pre-loaded or use a placeholder.
- What happens when the user refreshes the page mid-animation? -> The box opening is atomic on the server side. If the server action completed, the badge is awarded and the count is decremented. On refresh, the modal re-opens with the updated count.
- What happens when the modal is opened on mobile? -> Modal should be near-full-screen width with appropriate padding. The box image scales down proportionally.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dark Overlay/Backdrop | — | Full-screen semi-transparent dark overlay | Click closes modal |
| Modal Container | 1466:7676 | Centered modal (651.5x822.6px), dark background, 12.73px radius | Static container |
| Title | 1466:7678 (A) | "KHAM PHA SECRET BOX CUA BAN" — gold, centered, Montserrat 25.46px/700 | Static display |
| Close Button | — (within A) | X icon, 19x19px, top-right of title area | Click closes modal |
| Divider (top) | 1466:7680 | 626px wide, 1px, color #2E3940 | Static display |
| Instruction Text | 1466:7681 (B) | "Click vao box de mo" — white, centered, Montserrat 12.73px/700 | Hidden when count = 0 |
| Box Image Area | 1466:7684 (C) | 557x557px gift box with particle glow overlay | Click to open box (disabled when count = 0) |
| Divider (bottom) | 1466:7688 | Same as top divider | Static display |
| Unopened Count | 1466:7689 (D) | Row: number "05" (gold) + label "Secretbox chua mo" (white) | Live-updated after opening |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Kudos Live Board page (click "Mo Secret Box" button)
- **To**: Back to Kudos Live Board (after closing modal)
- **Deep link**: None — the modal is opened from within the Live Board page, not a separate route
- **Triggers**:
  - "Mo Secret Box" button on Live Board -> Opens modal
  - Click gift box image -> Opens a secret box (server action)
  - Close button (X) -> Closes modal
  - Click dark overlay -> Closes modal
  - `Escape` key -> Closes modal

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Modal open (fade-in overlay 200ms + scale-up modal 200ms), modal close (reverse), box opening animation (idle -> opening -> revealed, ~1000-1500ms total), particle glow effect on box, count decrement transition
- **Accessibility**:
  - Modal MUST trap focus — `Tab` cycles through interactive elements within the modal only.
  - Modal MUST have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the title.
  - Close button MUST have `aria-label="Close"`.
  - Gift box image MUST have `aria-label` describing the action (e.g., "Open secret box") and `role="button"`.
  - When the box is disabled (count = 0), it MUST have `aria-disabled="true"`.
  - Unopened count MUST use `aria-live="polite"` to announce changes after opening.
  - `Escape` key MUST close the modal.
  - On modal close, focus MUST return to the trigger element that opened the modal.
  - Color contrast MUST meet WCAG AA 4.5:1 ratio for all text.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow authenticated users to open a secret box by clicking the gift box image, triggering a server-side weighted random badge selection.
- **FR-002**: Badge distribution MUST follow server-side probabilities: Stay Gold (30%), Flow to Horizon (25%), Touch of Light (20%), Beyond the Boundary (10%), Revival (10%), Root Further (5%).
- **FR-003**: Each box opening MUST reveal exactly 1 random badge and decrement the user's unopened count by 1.
- **FR-004**: The gift box MUST be disabled (not clickable) when the unopened count is 0.
- **FR-005**: The instruction text "Click vao box de mo" MUST be hidden when the unopened count is 0.
- **FR-006**: The unopened count MUST be displayed as a zero-padded two-digit number.
- **FR-007**: The modal MUST be closable via the X button, overlay click, or Escape key.
- **FR-008**: The modal MUST show a loading/opening animation while the server action is in progress.
- **FR-009**: The modal MUST handle server errors gracefully — display error message, preserve state, allow retry.
- **FR-010**: Duplicate clicks during the opening animation MUST be prevented.

### Technical Requirements

- **TR-001**: Modal MUST be a Client Component (`'use client'`) since it requires interactivity (click handlers, animation state, API calls). Keep it as a thin wrapper; box opening MUST use a server action (constitution Principle I).
- **TR-002**: Badge selection logic MUST be server-side only — probabilities and random selection MUST NOT be exposed to the client (constitution Principle IV).
- **TR-003**: Server action MUST verify authentication before processing the box opening (constitution Principle IV).
- **TR-004**: Server action MUST validate that the user actually has unopened boxes before awarding a badge.
- **TR-005**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-006**: The box opening operation MUST be atomic — either the badge is awarded and count decremented, or neither happens (database transaction).
- **TR-007**: Image assets (gift box, particle effects) SHOULD be optimized and served via Next.js `<Image>` component.

### Key Entities *(if feature involves data)*

- **SecretBox**: userId (UUID), unopenedCount (integer), lastOpenedAt (timestamp).
- **SecretBoxOpening**: id (UUID), userId (UUID), badgeType (enum: 'stay_gold' | 'flow_to_horizon' | 'beyond_the_boundary' | 'root_further' | 'touch_of_light' | 'revival'), openedAt (timestamp).
- **BadgeConfig**: type (string), probability (number 0-1), displayName (string), imageUrl (string).

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (session) | GET | Verify authentication, get user info | Exists |
| Server Action: `openSecretBox` | POST | Open a box, return awarded badge type | Predicted (New) |
| Server Action: `getSecretBoxCount` | GET | Fetch user's unopened box count | Predicted (New) |

### Server Action: `openSecretBox` Detail

- **Input**: None (user identified via auth session).
- **Validation**:
  - User MUST be authenticated.
  - User MUST have at least 1 unopened secret box.
- **Process**:
  1. Verify auth via Supabase server client.
  2. Check unopened box count (with row lock to prevent race conditions).
  3. Select badge using weighted random based on configured probabilities.
  4. Insert record into `secret_box_openings` table.
  5. Decrement `unopened_count` in user's secret box record.
  6. All within a single database transaction.
- **Success**: Return `{ success: true, badgeType: string, badgeDisplayName: string, remainingCount: number }`.
- **Error**: Return `{ success: false, error: string }`.

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| isOpening | boolean | false | SecretBoxModal | Loading state during API call |
| revealedBadge | string \| null | null | SecretBoxModal | Badge type returned from server |
| animationState | 'idle' \| 'opening' \| 'revealed' | 'idle' | SecretBoxModal | Tracks box animation phase |
| unopenedCount | number | (from server) | SecretBoxModal | Current count of unopened boxes |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Verify authentication |
| Unopened box count | Supabase DB query | Display count, determine clickability |
| Badge distribution config | Server-side config | Weighted random badge selection |

### Loading/Error States

- **Modal opening**: Fade-in overlay (200ms) + scale-up modal (200ms). Count fetched from server; show skeleton/placeholder until loaded.
- **Box opening (loading)**: Gift box shows opening animation (glow intensifies, box shakes or lifts). Button clicks disabled.
- **Box opening (success)**: Transition from closed box to revealed badge with animation (~1000-1500ms). Count decrements.
- **Box opening (error)**: Error toast or inline message. Box returns to idle state. Count unchanged.
- **Empty state (count = 0)**: Instruction text hidden. Box visually dimmed. Click disabled.

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `secretbox.title` | KHAM PHA SECRET BOX CUA BAN | DISCOVER YOUR SECRET BOX |
| `secretbox.instruction` | Click vao box de mo | Click the box to open |
| `secretbox.unopened_count` | Secretbox chua mo | Unopened Secret Boxes |
| `secretbox.success_title` | MO SECRET BOX THANH CONG | SECRET BOX OPENED SUCCESSFULLY |
| `secretbox.close` | Dong | Close |
| `secretbox.error` | Khong the mo secret box. Vui long thu lai. | Unable to open secret box. Please try again. |
| `secretbox.empty` | Ban khong co secret box nao | You have no secret boxes |
| `secretbox.box_aria_label` | Mo secret box | Open secret box |
| `secretbox.box_disabled_aria_label` | Khong co secret box de mo | No secret boxes to open |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully open a secret box and see the revealed badge within 3 seconds (including animation time).
- **SC-002**: Server action `openSecretBox` completes within 500ms.
- **SC-003**: Badge distribution over 1000+ openings MUST approximate the configured probabilities within 5% tolerance.
- **SC-004**: Modal opens within 200ms of trigger click.
- **SC-005**: Unopened count updates within 100ms of badge reveal.
- **SC-006**: Modal passes WCAG AA automated accessibility checks (axe-core or similar).
- **SC-007**: No duplicate badge awards from rapid clicking (race condition prevention).

---

## Out of Scope

- Badge collection/inventory page — separate feature.
- Secret box earning mechanism (how boxes are awarded for receiving kudos) — separate feature.
- Badge details or badge info modal — separate feature.
- Sharing the revealed badge on social media — future enhancement.
- Box opening history/log view — separate feature.
- The "opened" state of the modal (after badge reveal) — separate frame specification.
- Animation design details (keyframes, easing curves) — to be defined during implementation.
- Sound effects on box opening — not in current design.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [ ] Badge image assets available (gift box closed, gift box opening, 6 badge images)
- [ ] Particle effect assets available (glow overlay)

---

## Notes

- The modal dimensions (651.5x822.6px) are Figma values. Implementation should use responsive sizing with `max-w` and appropriate scaling for smaller screens.
- The Figma pixel values use non-standard decimals (12.73px, 25.46px, etc.) — these appear to be scaled from a base design. Implementation should round to practical values (13px, 25px) or use rem equivalents.
- The particle/glow effect overlay (546.5x546.5px) on the box image area creates the magical feel. This could be implemented as a CSS animation (radial gradient pulse) or a lightweight image/SVG overlay.
- Badge probabilities MUST be configurable server-side (not hardcoded) to allow future adjustments without code changes. Store in database or environment config.
- The box opening animation is a key UX moment — it should feel rewarding and exciting. Consider: box shake -> lid lifts -> glow intensifies -> badge appears with sparkle effect.
- The unopened count format "05" (zero-padded) suggests a maximum of 99 boxes. Confirm with product if a higher limit is needed.
