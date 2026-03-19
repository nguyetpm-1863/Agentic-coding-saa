# Feature Specification: Homepage SAA 2025

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Homepage is the main landing page of the Sun Annual Awards 2025 (SAA 2025) application, accessible after authentication. It presents the event branding ("ROOT FURTHER"), a live countdown timer to the event, award categories, and the Sun* Kudos program. The page is a long-scroll single-page layout with distinct sections: Hero (key visual + countdown), Awards grid, Kudos promotion, and Footer.

The Header features authenticated navigation with active/hover/normal tab states, a notification bell with unread indicator, language selector, and user avatar.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Homepage Hero & Countdown (Priority: P1)

As an authenticated user, I want to see the event branding and a live countdown timer so that I know when the SAA 2025 event will take place.

**Why this priority**: The hero section with countdown is the primary value of the homepage — it creates anticipation and communicates the event timeline. It is the MVP.

**Independent Test**: Navigate to `/` after login, verify the hero section renders with "ROOT FURTHER" branding, countdown timer displays and updates in real-time, event info (time + venue) is visible, and CTA buttons are clickable.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and navigates to `/`, **When** the page loads, **Then** the hero section displays the "ROOT FURTHER" key visual, a "Coming soon" subtitle, and a countdown timer showing days/hours/minutes until the event date.

2. **Given** the countdown timer is visible, **When** one minute passes, **Then** the timer MUST update in real-time without requiring a page refresh.

3. **Given** the hero section is loaded, **When** the user views the event info, **Then** the event date (26/12/2026) and venue ("Âu Cơ Art Center / Trung tâm nghệ thuật Âu Cơ") are displayed below the countdown, with labels ("Thời gian:", "Địa điểm:") in white 16px and values in gold (#FFEA9E) 24px bold. A livestream note is shown below.

4. **Given** the hero section is loaded, **When** the user clicks "ABOUT AWARDS" CTA button, **Then** the user is navigated to the `/awards` page.

5. **Given** the hero section is loaded, **When** the user clicks "ABOUT KUDOS" CTA button, **Then** the user is navigated to the `/kudos` page.

6. **Given** the event date has passed, **When** the user views the homepage, **Then** the countdown MUST display 00:00:00 (or a "The event has started!" message).

---

### User Story 2 - Browse Award Categories (Priority: P2)

As an authenticated user, I want to browse the award categories so that I understand the different awards available at SAA 2025.

**Why this priority**: The awards grid is the core informational content of the homepage, directly supporting the event's purpose.

**Independent Test**: Scroll to the Awards section, verify 6 award cards are displayed in a 3-column grid, each with an image, title, and category label.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the Awards section, **When** the section is visible, **Then** 6 award cards are displayed in a 3-column grid with titles: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP.

2. **Given** the Awards section header is visible, **When** the user reads it, **Then** they see the caption "Sun* annual awards 2025" and title "Hệ thống giải thưởng" (translatable via i18n key `awards.title`). The title block MUST be center-aligned.

3. **Given** an award card is visible, **When** the user views it, **Then** they see an award image with a gold border, the award name below, and a brief description.

---

### User Story 3 - Navigate via Header (Priority: P3)

As an authenticated user, I want to use the header navigation to jump between sections so that I can quickly find the content I need.

**Why this priority**: Navigation improves UX but users can also scroll manually. It enhances but doesn't block core content consumption.

**Independent Test**: Click each nav link in the header and verify smooth scroll to the corresponding section. Verify active state changes.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they view the header, **Then** they see navigation tabs: "About SAA 2025", "Award Information", "Sun* Kudos" with the current section highlighted in gold (#FFEA9E).

2. **Given** the user clicks "Award Information" nav link, **When** the click occurs, **Then** the page smooth-scrolls to the Awards section and the nav tab becomes active (gold text + bottom border).

3. **Given** the user clicks "Sun* Kudos" nav link, **When** the click occurs, **Then** the page smooth-scrolls to the Kudos section.

4. **Given** the user is on the header, **When** they view the right side, **Then** they see a notification bell (with red dot for unread), language selector, and user avatar.

---

### User Story 4 - View Sun* Kudos Section (Priority: P4)

As an authenticated user, I want to learn about the Sun* Kudos program so that I understand how peer recognition works.

**Why this priority**: Kudos is a secondary feature that complements the awards but is not the primary purpose of the homepage.

**Independent Test**: Scroll to the Kudos section, verify the promotional content, description text, and "Chi tiet" (Details) button are displayed.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the Kudos section, **When** the section is visible, **Then** they see the "KUDOS" branding text, a description of the peer recognition program, and a "Chi tiet" button.

2. **Given** the Kudos section is visible, **When** the user clicks "Chi tiet", **Then** they are navigated to the Kudos detail page.

---

### User Story 5 - Responsive Homepage (Priority: P5)

As a mobile/tablet user, I want the homepage to display correctly on my device so that I can browse all content without usability issues.

**Why this priority**: Mobile support is required by constitution (Principle V) but the primary audience accesses via desktop during events.

**Independent Test**: Load the homepage at 320px, 768px, 1024px, and 1440px widths. Verify all sections are accessible and properly laid out.

**Acceptance Scenarios**:

1. **Given** the user opens the homepage on mobile (< 768px), **When** the page loads, **Then** the awards grid collapses to 1-column, the countdown timer stacks vertically, CTAs are full-width, and all touch targets are at least 44x44px.

2. **Given** the user opens the homepage on tablet (768px-1023px), **When** the page loads, **Then** the awards grid displays in 2 columns with adjusted spacing.

3. **Given** the user opens the homepage on desktop (>= 1024px), **When** the page loads, **Then** the layout matches the Figma design with 3-column awards grid and full horizontal navigation.

---

### Edge Cases

- What happens when the event date is not configured? -> Display the countdown at 00:00:00 or hide it.
- What happens when no awards data is available? -> Display a placeholder or "Coming soon" message.
- What happens when the notification API fails? -> Hide the red dot indicator, do not block page load.
- What happens when the user scrolls rapidly between sections? -> Navigation active state MUST track the visible section correctly (intersection observer).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | A1_Header | Fixed navigation bar. **Left group**: Logo (links to `/`) + Nav Tabs (64px gap, positioned next to logo, NOT centered). **Right group**: Bell, Language, User Avatar. When logged in, show ONLY the user's avatar image (not avatar + separate user icon). | Tab click navigates to page, hover/active states |
| Nav Tabs | A1.1-A1.3 | "About SAA 2025" → `/`, "Award Information" → `/awards`, "Sun* Kudos" → `/kudos` | Click navigates to corresponding page, active = gold + border-bottom |
| Notification Bell | A1.5 | Bell icon with red dot (8px) for unread notifications | Click opens notifications (future) |
| Language Selector | A1.6 | "VN" dropdown (reused from Login) | Click opens language dropdown |
| User Avatar | A1.7 | Circular user profile image (40x40px). When logged in, display ONLY the user's Google avatar. Do NOT show a separate person icon alongside the avatar. | Click opens profile dropdown menu |
| Key Visual Section | B_Keyvisual | Hero with background image, **cover gradient overlay** (linear-gradient 12.34deg to reduce brightness), ROOT FURTHER logo. **Background extends from hero section through C_Content section to the beginning of the Awards (B4) section header.** | Static display |
| Cover Gradient Overlay | 2167:9029 | Absolute-positioned gradient on top of keyvisual BG: `linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%)`. Height: **1480px** (extends beyond keyvisual into content area). Reduces background brightness for text readability. | None (decorative) |
| Countdown Timer | B.3 | Days/Hours/Minutes digit boxes with labels | Real-time countdown, updates every minute |
| Event Info | B.4 | Event date + venue. Labels ("Thời gian:", "Địa điểm:") in white 16px, values ("26/12/2026", "Âu Cơ Art Center / Trung tâm nghệ thuật Âu Cơ") in gold (#FFEA9E) 24px/700. Below: "Tường thuật trực tiếp qua sóng Livestream" in white 16px/700. | Static display |
| CTA Buttons | B.5-B.6 | "ABOUT AWARDS" and "ABOUT KUDOS". **Normal**: outline style (10% gold bg, #998C5F border, white text). **Hover**: solid gold bg (#FFEA9E), dark text (#00101A). Both 8px radius, Montserrat 22px/700. | Click navigates to `/awards` or `/kudos` page |
| Root Further Content | C_Content (3204:10152) | **"ROOT FURTHER" title images** (two decorative image assets: "Root" 189×67px + "Further" 290×67px — NOT text) followed by long-form content paragraphs (Montserrat **24px/700**, line-height 32px) with a centered English quote. Padding: 120px 104px. See design-style.md for full details. | Static display |
| Awards Section | D_Awards | Section header + 6 award cards in 3-col grid | Static display (cards may link in future) |
| Award Card | D.3 | Image (gold border) + title + description | Hover state (future) |
| Kudos Section | E_Kudos | Promotional section with "Chi tiet" button | Button click navigates to Kudos page |
| Footer | F_Footer | Logo, nav links, copyright | Nav links for navigation |
| Widget Button | G_Widget | Floating action button | Click opens widget (future) |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Successful authentication (redirect from `/login` via OAuth) or direct URL `/`
- **To**: Award detail pages (future), Kudos page, Notification panel (future), Profile menu (future)
- **Deep link**: `/` — requires authentication (middleware redirects to `/countdown` if unauthenticated; countdown page then redirects to `/login` after 1-minute timer)
- **Triggers**:
  - Nav tab click -> Navigate to corresponding page (`/`, `/awards`, `/kudos`)
  - "ABOUT AWARDS" CTA -> Navigate to `/awards` page
  - "ABOUT KUDOS" CTA -> Navigate to `/kudos` page
  - "Chi tiet" button -> Navigate to Kudos detail page
  - Language selector -> Language dropdown (stays on page)

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Button hover/active states (150ms), countdown digit transitions, smooth scroll behavior, nav tab active state transition
- **Accessibility**: WCAG AA compliance. All interactive elements MUST have visible focus indicators (outline: 2px solid #FFEA9E, offset: 2px). Navigation tabs MUST be keyboard-accessible: `Tab` to focus tab group, `ArrowLeft`/`ArrowRight` to move between tabs, `Enter` to activate. Countdown timer MUST use `aria-live="polite"` for screen reader updates (announce "X days, Y hours, Z minutes remaining"). Color contrast MUST meet 4.5:1 ratio. Nav tabs MUST use `role="tablist"` with `role="tab"` and `aria-selected`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a real-time countdown timer to the SAA 2025 event date.
- **FR-002**: System MUST display 6 award categories with images, titles, and descriptions.
- **FR-003**: System MUST provide header navigation with smooth-scroll to page sections.
- **FR-004**: Header navigation MUST visually indicate the currently active/visible section.
- **FR-005**: System MUST display the Sun* Kudos promotional section with navigation to detail page.
- **FR-006**: System MUST show a notification indicator (red dot) when unread notifications exist.
- **FR-007**: Language selector MUST persist language preference and update all translatable content.
- **FR-008**: Footer MUST display the SAA logo, navigation links, and copyright text.

### Technical Requirements

- **TR-001**: Homepage MUST be a Server Component with Client Component islands for countdown timer and navigation state (constitution Principle I).
- **TR-002**: Countdown timer MUST use `setInterval` with 1-minute granularity (not seconds) to minimize re-renders.
- **TR-003**: Navigation uses page-based routing with `usePathname()` to determine active tab (NOT IntersectionObserver scroll tracking).
- **TR-004**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-005**: Page MUST include `loading.tsx` and `error.tsx` per constitution Principle I.
- **TR-006**: Images MUST use `next/image` with appropriate `priority` for above-the-fold content.
- **TR-007**: Event date/time and venue MUST be configurable (environment variable or database), not hardcoded.

### Key Entities *(if feature involves data)*

- **Event**: Date/time, venue, description — drives the countdown timer and event info display.
- **Award Category**: Name, image, description — populates the 6 award cards.
- **Notification**: Unread count — drives the bell indicator red dot.
- **User Profile**: Avatar URL, name — displayed in header.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (session) | GET | Verify authentication, get user profile | Exists |
| `/api/awards` or Supabase query | GET | Fetch award categories | Predicted (New) |
| `/api/notifications/unread-count` | GET | Get unread notification count | Predicted (New) |
| Event config | - | Event date/time/venue | Predicted (env var or DB) |

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| activeSection | string | "about" | NavTabs | Track which section is currently visible/active |
| countdown | {days, hours, minutes} | calculated | CountdownTimer | Live countdown values |
| isDropdownOpen | boolean | false | LanguageSelector | Language dropdown visibility (reused from Login) |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Verify authentication, get avatar |
| Locale | Cookie (`locale`) | Determine language for server-rendered text |
| Awards data | Supabase DB or static | Award categories for card grid |
| Event config | Env var or DB | Event date/time/venue for countdown |
| Unread count | Supabase DB | Notification bell indicator |

### Loading/Error States

- **Page loading** (`loading.tsx`): Full-screen dark background (#00101A) with centered pulsing placeholder. Keep minimal — dark screen with subtle loading indicator.
- **Error boundary** (`error.tsx`): Dark background (#00101A), centered "Something went wrong" message with "Try again" button (#FFEA9E, 8px radius). Same pattern as Login error.tsx.
- **Countdown loading**: Display "00 : 00 : 00" as placeholder while calculating.
- **Awards data loading**: Display 6 skeleton card placeholders (animate-pulse).
- **Notification API failure**: Silently hide red dot — do not block page render.

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `homepage.coming_soon` | Coming soon | Coming soon |
| `homepage.event_date` | 26/12/2026 | 26/12/2026 |
| `homepage.event_venue` | Âu Cơ Art Center / Trung tâm nghệ thuật Âu Cơ | Âu Cơ Art Center |
| `homepage.event_time_label` | Thời gian: | Time: |
| `homepage.event_venue_label` | Địa điểm: | Venue: |
| `homepage.livestream_note` | Tường thuật trực tiếp qua sóng Livestream | Live broadcast via Livestream |
| `homepage.cta_awards` | ABOUT AWARDS | ABOUT AWARDS |
| `homepage.cta_kudos` | ABOUT KUDOS | ABOUT KUDOS |
| `nav.about_saa` | About SAA 2025 | About SAA 2025 |
| `nav.award_info` | Award Information | Award Information |
| `nav.kudos` | Sun* Kudos | Sun* Kudos |
| `awards.caption` | Sun* annual awards 2025 | Sun* annual awards 2025 |
| `awards.title` | Hệ thống giải thưởng | Award System |
| `kudos.detail_button` | Chi tiết | Details |
| `countdown.days` | DAYS | DAYS |
| `countdown.hours` | HOURS | HOURS |
| `countdown.minutes` | MINUTES | MINUTES |
| `footer.copyright` | Bản quyền thuộc về Sun* © 2025 | Copyright © Sun* 2025 |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Homepage loads in under 3 seconds (LCP) on desktop with good network.
- **SC-002**: Countdown timer updates accurately within 1 second of real time.
- **SC-003**: All 6 award cards render correctly at all 4 breakpoints.
- **SC-004**: Navigation active state correctly tracks visible section during scroll.
- **SC-005**: Homepage passes WCAG AA automated checks.

---

## Out of Scope

- Award detail pages — separate feature/screen.
- Notification panel/list — only the unread count indicator is in scope.
- User profile menu — only the avatar display is in scope.
- Widget button functionality — only the visual placement is in scope.
- Kudos detail page — only the CTA button navigating to it is in scope.
- Admin management of awards or event configuration.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Figma design is at 1512px width with 144px horizontal padding, giving a 1224px content area. This maps to `max-w-[1512px]` with `px-36` (144px).
- The header background uses `rgba(16, 20, 23, 0.80)` which is slightly different from the Login header's `rgba(11, 15, 18, 0.80)`. Verify which is correct and unify.
- The hero section uses the same key visual background as the Login screen but with a different gradient overlay: `linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%)` — this overlay reduces background brightness for text readability.
- **CRITICAL**: The C_Content "Root Further" section contains two **image assets** for the "ROOT" and "FURTHER" title (not text) at 189×67px and 290×67px respectively. Content paragraphs use **Montserrat 24px/700** (not 16px). Section padding is **120px 104px** (not 96px 144px). Includes a centered English quote block.
- Award card images have a distinctive `0.955px solid #FFEA9E` gold border — this is a signature design element.
- The countdown timer digit boxes use a gradient fill (`linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)`) with `0.5px solid #FFEA9E` border — requires careful implementation for the text gradient effect.
- Navigation text uses a gold glow text-shadow effect: `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`.
- The "KUDOS" text in the Kudos section uses a beige color `rgba(219, 209, 193, 1)` (#DBD1C1), distinct from the gold accent.
- Fonts required: Montserrat (400, 500, 700), Montserrat Alternates (700), Digital Numbers (400, for countdown digits), SVN-Gotham (400, for KUDOS logo). The latter two are custom fonts — need to source and load them.
- The section title "Hệ thống giải thưởng" uses 57px display size — significantly larger than other headings.
