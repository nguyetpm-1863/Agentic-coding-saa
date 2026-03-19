# Feature Specification: Countdown — Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed
**Last Updated**: 2026-03-10

---

## Overview

A full-screen prelaunch splash page that serves as the **first screen** visitors see when entering the SAA 2025 application. It displays a **visible 1-minute countdown timer** (hours:minutes:seconds) over the key visual background with a gradient overlay. No header, no footer — a single immersive screen.

**Key behavior:**
- This page is shown at `/countdown` as the **entry point** for unauthenticated visitors. Middleware redirects all unauthenticated users to `/countdown`.
- It runs a **1-minute visual countdown** (00:01:00 → 00:00:00), ticking every second, then automatically redirects to `/login`.
- **Already-authenticated users skip this page entirely** — they are redirected straight to the Homepage.
- This page is **independent** from the Homepage SAA. It is NOT a section of the Homepage.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — View Prelaunch Countdown (Priority: P1)

As a first-time visitor, I want to see a visually immersive countdown splash so that I feel the anticipation of the SAA 2025 event before logging in.

**Why this priority**: This is the sole purpose of the page — the MVP. It creates a "wow" first impression.

**Independent Test**: Navigate to `/countdown` while not logged in. Verify the countdown renders with a 1-minute timer (showing hours, minutes, seconds) that updates every second, then redirects to `/login` after 1 minute.

**Acceptance Scenarios**:

1. **Given** the user is not authenticated, **When** they navigate to `/countdown`, **Then** the title "Sự kiện sẽ bắt đầu sau" is displayed with a countdown timer showing hours (00), minutes (01), and seconds (00) counting down from 1 minute.

2. **Given** the 1-minute countdown is running, **When** one second passes, **Then** the visual countdown updates in real-time (seconds tick down visibly every second).

3. **Given** the 1-minute countdown reaches 00:00:00, **When** the timer expires, **Then** the user is automatically redirected to `/login`.

4. **Given** the user navigates away and comes back, **When** the page loads, **Then** the 1-minute countdown restarts from 00:01:00.

---

### User Story 2 — Skip for Authenticated Users (Priority: P2)

As an authenticated user, I want to skip the prelaunch splash and go directly to the Homepage.

**Why this priority**: Routing logic ensures logged-in users are not forced to watch the splash screen again.

**Independent Test**: Log in, then navigate to `/countdown`. Verify immediate redirect to Homepage `/`.

**Acceptance Scenarios**:

1. **Given** the user is already authenticated, **When** they navigate to `/countdown`, **Then** they are immediately redirected to the Homepage (`/`).

2. **Given** the user is already authenticated, **When** they enter the application for the first time in this session, **Then** the prelaunch page is NOT shown — they go directly to the Homepage.

---

### User Story 3 — Responsive Layout (Priority: P3)

As a mobile/tablet user, I want the countdown page to display correctly on my device.

**Why this priority**: Required by constitution (Principle V) but the page is simple enough that responsive adaptation is straightforward.

**Independent Test**: Load the page at 320px, 768px, 1024px, and 1440px widths. Verify the countdown is readable and centered.

**Acceptance Scenarios**:

1. **Given** the user opens the page on mobile (< 768px), **When** the page loads, **Then** the countdown units shrink to fit, digit boxes reduce in size, and text remains readable.

2. **Given** the user opens the page on tablet (768px-1023px), **When** the page loads, **Then** the countdown displays horizontally with adjusted spacing.

3. **Given** the user opens the page on desktop (>= 1024px), **When** the page loads, **Then** the layout matches the Figma design.

---

### Edge Cases

- What happens when JavaScript is disabled? -> Server-rendered "00:01:00" static snapshot is visible. The redirect will NOT happen automatically — user must manually navigate.
- What happens if the user navigates away and comes back? -> The 1-minute timer restarts from the beginning each time the page is loaded.
- What happens when the countdown reaches 0? -> Redirect to `/login` fires immediately. Timer stops at 00:00:00.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Background Image | 2268:35129 | Full-screen key visual artwork via `next/image` with fill, priority, object-cover | Static display |
| Gradient Overlay | 2268:35130 | 18deg dark-to-transparent diagonal gradient | Static display |
| Content Container | 2268:35131 | Centered flex column with title + timer | Static layout |
| Title Text | 2268:35137 | "Sự kiện sẽ bắt đầu sau" | Static display |
| Countdown Timer | 2268:35138 | 3 unit groups (Hours/Minutes/Seconds) with digit boxes, counting down from 1 minute | Real-time updates every second |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component details.

### Navigation Flow

- **From**: Direct URL `/countdown`, or middleware redirect from any protected route (entry point for unauthenticated visitors)
- **To**: Login page `/login` (after 1-minute countdown expires)
- **Skip condition**: Authenticated users are redirected to Homepage `/` immediately (never see this page)
- **Triggers**:
  - 1-minute visual countdown reaches 0 -> Auto-redirect to `/login`
  - Authenticated user detected (middleware or server-side) -> Immediate redirect to `/`

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Countdown digit value changes every second (no animation needed — values update in-place)
- **Accessibility**: WCAG AA compliance. Countdown timer MUST use `aria-live="polite"` for screen reader updates (announce "X hours, Y minutes, Z seconds"). Color contrast MUST meet 4.5:1 ratio for white text on dark background.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a **visible 1-minute countdown timer** (hours, minutes, seconds) that counts down from 00:01:00 to 00:00:00.
- **FR-002**: Countdown timer MUST update every **second** without page refresh.
- **FR-003**: System MUST auto-redirect to `/login` when the countdown reaches 00:00:00.
- **FR-004**: Authenticated users MUST be immediately redirected to the Homepage (`/`) — they never see this page.
- **FR-005**: The 1-minute countdown MUST restart each time the page is loaded (no persistence across visits).

### Technical Requirements

- **TR-001**: Page MUST be a Server Component with a Client Component island for the countdown timer (constitution Principle I).
- **TR-002**: Countdown timer MUST use `setInterval` with **1-second granularity** for visible second-by-second updates.
- **TR-003**: The countdown duration (60 seconds) is passed as a prop `durationSeconds` to the client component.
- **TR-004**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-005**: Page MUST include `loading.tsx` and `error.tsx` (constitution Principle I).
- **TR-006**: Background image MUST use `next/image` with `fill`, `priority`, `object-cover`, and `sizes="100vw"` (above-the-fold).
- **TR-007**: No header or footer — full-screen immersive layout.
- **TR-008**: Auth check MUST happen both server-side (page component `redirect("/")`) and middleware-level (redirect authenticated users away from `/countdown`).

### Key Entities *(if feature involves data)*

- **User Session**: Auth state via Supabase — determines whether to show this page or redirect to Homepage.
- **Page Timer**: 1-minute client-side countdown — controls both the visual display and the redirect to `/login`.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (session) | GET | Check if user is authenticated (server-side + middleware) | Exists |

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| remaining | number | 60 | CountdownTimer | Seconds remaining in the 1-minute countdown, decremented every second |

Derived values from `remaining`:
- `hours = Math.floor(remaining / 3600)` → always 0 for 1-minute countdown
- `minutes = Math.floor((remaining % 3600) / 60)` → starts at 1, goes to 0
- `seconds = remaining % 60` → 0 → 59 → 58 → ... → 0

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Check if authenticated → redirect to `/` if yes |
| Locale | Cookie (`locale`) | Determine language for server-rendered text |

### Loading/Error States

- **Page loading** (`loading.tsx`): Full-screen dark background (#00101A) with centered pulsing placeholder. Minimal — dark screen with subtle loading indicator.
- **Error boundary** (`error.tsx`): Dark background (#00101A), centered "Something went wrong" message with "Try again" button (#FFEA9E, 8px radius).
- **Countdown loading**: Display "00 : 01 : 00" as initial placeholder.

---

## Internationalization (i18n)

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `countdown.title` | Sự kiện sẽ bắt đầu sau | The event will start in |
| `countdown.hours` | Giờ | Hours |
| `countdown.minutes` | Phút | Minutes |
| `countdown.seconds` | Giây | Seconds |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page loads in under 2 seconds (LCP) on desktop with good network.
- **SC-002**: Countdown timer ticks visually every second with accurate timing.
- **SC-003**: Auto-redirect to `/login` triggers within 1 second of the countdown reaching 00:00:00.
- **SC-004**: Page passes WCAG AA automated checks.
- **SC-005**: Authenticated users are redirected to Homepage within 500ms (middleware + server-side redirect).

---

## Out of Scope

- Header navigation — not present on this page.
- Footer — not present on this page.
- Event date countdown (days/hours/minutes to event) — that lives on the Homepage hero section.
- Admin configuration — only the visual countdown is in scope.
- Persistence of the timer across visits — it always restarts from 1 minute.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Figma design shows DAYS/HOURS/MINUTES with event countdown values, but the **actual behavior** is a 1-minute visual countdown showing HOURS/MINUTES/SECONDS. The Figma visual design (digit boxes, glass morphism, typography) applies; only the unit labels and countdown source differ.
- The Figma design is at 1512px width. The content container uses 144px horizontal padding with a 120px gap between title and timer.
- This page reuses the same key visual background image as the Homepage and Login screens, but with a different gradient overlay angle (18deg vs 12deg on Homepage).
- Fonts required: Montserrat (700) for title and labels, Digital Numbers (400) for countdown digits.
- The digit boxes use a glass morphism effect (backdrop-filter blur + gradient background at 0.5 opacity).
- The countdown digit boxes on this page (77x123px, 12px radius, 0.75px border) are larger than the Homepage version (51x82px, 8px radius, 0.5px border) — this is the hero version.
- **This page is NOT part of the Homepage.** It is a standalone splash screen shown before login.
- Middleware redirects unauthenticated users from protected routes to `/countdown` (not `/login`). The flow is: `/countdown` → 1 minute → `/login` → OAuth → Homepage.
