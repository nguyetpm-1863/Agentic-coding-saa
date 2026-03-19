# Feature Specification: Awards System (He thong giai)

**Frame ID**: `313:8436`
**Frame Name**: `He thong giai`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Awards System page ("He thong giai thuong SAA 2025") is a long-scroll single-page layout that presents the complete SAA 2025 award categories in detail. It features a hero key visual banner, a section title, a left sidebar navigation menu for quick-jumping between award categories, and detailed award cards on the right showing each award's description, quantity, and prize value. The page also includes a Sun* Kudos promotional section and a standard footer.

The page uses a two-column layout for the main award content area: a sticky left sidebar with 6 navigation items and a scrollable right panel with 6 corresponding award detail cards. The sidebar tracks the currently visible award card using IntersectionObserver.

The Header is a shared component reused from the Homepage.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Award Details with Sidebar Navigation (Priority: P1)

As an authenticated user, I want to browse detailed award information with a sidebar navigation so that I can quickly find and understand each award category.

**Why this priority**: The award detail content with sidebar navigation is the primary value of this page -- it is the core feature that differentiates this page from the Homepage awards overview.

**Independent Test**: Navigate to the Awards System page, verify the sidebar lists 6 award categories, the right panel displays 6 award detail cards with images, descriptions, quantities, and prize values.

**Acceptance Scenarios**:

1. **Given** the user navigates to the Awards System page, **When** the page loads, **Then** the hero key visual banner is displayed with the awards-specific background (`keyvisual-award-bg.png`), "ROOT FURTHER" text overlays (`root-text.png` + `further-text.png`) on the left side, a bottom gradient overlay, and the section title "Hệ thống giải thưởng SAA 2025" in gold (#FFEA9E) overlaid at the bottom of the banner area.

2. **Given** the awards section is visible, **When** the user views the left sidebar, **Then** 6 navigation items are displayed: "Top Talent", "Top Project", "Top Project Leader", "Best Manager", "Signature 2025 Creator", "MVP".

3. **Given** the awards section is visible, **When** the user views the right panel, **Then** 6 award detail cards are displayed, each containing: an award image (336x336px with gold border), award title, description text, quantity (with unit type), and prize value in VND.

4. **Given** an award card is visible, **When** the user reads the "Top Talent" card, **Then** they see: quantity "10" (Ca nhan), value "7,000,000 VND" per award.

5. **Given** an award card is visible, **When** the user reads the "Top Project" card, **Then** they see: quantity "02" (Tap the), value "15,000,000 VND" per award.

6. **Given** an award card is visible, **When** the user reads the "Signature 2025 Creator" card, **Then** they see dual prize values: "5,000,000 VND" (ca nhan) and "8,000,000 VND" (tap the).

---

### User Story 2 - Navigate Between Awards via Sidebar (Priority: P2)

As an authenticated user, I want to click sidebar navigation items to scroll to the corresponding award card so that I can quickly jump between award categories.

**Why this priority**: Sidebar navigation is the key UX enhancement for this long-scroll page, enabling efficient browsing of 6 detailed award sections.

**Independent Test**: Click each sidebar item and verify smooth scroll to the corresponding award card. Verify the active state updates correctly.

**Acceptance Scenarios**:

1. **Given** the user is on the Awards System page, **When** they click "Top Project" in the sidebar, **Then** the page smooth-scrolls to the Top Project award card, and the sidebar item becomes active (gold color #FFEA9E + bottom border + text-shadow glow).

2. **Given** the user scrolls through the award cards manually, **When** the "Best Manager" card becomes visible in the viewport, **Then** the sidebar "Best Manager" item automatically becomes active (tracked via IntersectionObserver).

3. **Given** the sidebar is displayed, **When** only one item is in active state, **Then** inactive items display in white (#FFFFFF) without underline or glow effect.

4. **Given** the user scrolls rapidly between sections, **When** multiple cards pass through the viewport, **Then** the sidebar active state MUST track the currently most-visible section correctly without flickering.

---

### User Story 3 - View Sun* Kudos Section (Priority: P3)

As an authenticated user, I want to learn about the Sun* Kudos program so that I understand the peer recognition initiative.

**Why this priority**: The Kudos section is supplementary content that promotes a related program but is not the primary purpose of the Awards System page.

**Implementation Note**: This section reuses the `KudosSection` component from `@/components/homepage/kudos-section.tsx` (Homepage SAA). No separate awards-specific Kudos component is needed.

**Independent Test**: Scroll to the Kudos section, verify the promotional content, description text, and "Chi tiet" (Details) button are displayed.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the Kudos section, **When** the section is visible, **Then** they see the subtitle "Phong trao ghi nhan", the title "Sun* Kudos" in gold (#FFEA9E) at 57px display size, a description of the peer recognition program, and a "Chi tiet" button with gold background (#FFEA9E).

2. **Given** the Kudos section is visible, **When** the user clicks "Chi tiet", **Then** they are navigated to the Kudos detail page.

---

### User Story 4 - Responsive Awards System (Priority: P4)

As a mobile/tablet user, I want the Awards System page to display correctly on my device so that I can browse all award details without usability issues.

**Why this priority**: Mobile support is required by constitution (Principle V) but the primary audience accesses via desktop during events.

**Independent Test**: Load the page at 320px, 768px, 1024px, and 1440px widths. Verify all sections are accessible and properly laid out.

**Acceptance Scenarios**:

1. **Given** the user opens the page on mobile (< 768px), **When** the page loads, **Then** the sidebar navigation is hidden or collapses to a horizontal scrollable menu above the cards, award cards stack vertically at full width, and all touch targets are at least 44x44px.

2. **Given** the user opens the page on tablet (768px-1023px), **When** the page loads, **Then** the sidebar may collapse or become a horizontal navigation, award cards display at reduced width with adjusted spacing.

3. **Given** the user opens the page on desktop (>= 1024px), **When** the page loads, **Then** the two-column layout (sidebar + cards) matches the Figma design with the sidebar on the left and detail cards on the right.

---

### Edge Cases

- ~~What happens when no awards data is available?~~ **N/A** — Awards are static/fixed content seeded in the database. There is no empty state; all 6 awards are always present.
- What happens when the user scrolls past all award cards? -> The last award ("MVP") remains active in the sidebar.
- What happens when the sidebar is taller than the viewport? -> The sidebar is sticky (`position: sticky; top: 80px`, below header) with `max-h: calc(100vh - 80px)` and `overflow-y: auto` so it scrolls within its own container if needed.
- What happens when the user navigates directly to an award anchor? -> The page scrolls to the corresponding card and the sidebar reflects the active state.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | 313:8440 | Shared header: logo (links to `/`) + 3 nav tabs next to logo (not centered): "Giới thiệu SAA", "Thông tin giải thưởng" (active), "Sun* Kudos" — no "Tiêu chuẩn chung" in header + right section (bell, language selector, user avatar only — no separate icon) | Tab click navigates between pages, avatar opens profile dropdown |
| Key Visual Banner | 313:8437 | **Composite banner area (1440x547px)** containing: (1) Background image `keyvisual-award-bg.png` (NOT login/homepage bg), (2) Gradient overlay `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)`, (3) "ROOT FURTHER" text overlays (`root-text.png` + `further-text.png` positioned on left side, same as Homepage pattern), (4) Section Title overlaid at bottom of banner area: "Sun* Annual Awards 2025" caption + divider (#2E3940) + "Hệ thống giải thưởng SAA 2025" gold title. The title sits WITHIN the banner/gradient zone, NOT as a separate section below it. | Static display |
| Cover Gradient | 313:8439 | Bottom gradient overlay on key visual (part of Key Visual Banner composite) | Static display |
| Section Title | 313:8453 | "Sun* Annual Awards 2025" caption + "Hệ thống giải thưởng SAA 2025" title — **positioned inside the Key Visual Banner area** (overlaid on the gradient), not as a standalone section below the banner | Static display |
| Award System Container | 313:8458 | Two-column layout: sidebar (178px) + cards (853px), gap: 80px | Flex row |
| Menu List (Sidebar) | 313:8459 | Left navigation with 6 award category links | Click scrolls to card, active state tracking |
| C.1 Top Talent | 313:8460 | Sidebar item (active state: gold + underline + glow) | Click to scroll |
| C.2 Top Project | 313:8461 | Sidebar item (default state: white) | Click to scroll |
| C.3 Top Project Leader | 313:8462 | Sidebar item (default state: white) | Click to scroll |
| C.4 Best Manager | 313:8463 | Sidebar item (default state: white) | Click to scroll |
| C.5 Signature 2025 Creator | 313:8464 | Sidebar item (default state: white) | Click to scroll |
| C.6 MVP | 313:8465 | Sidebar item (default state: white) | Click to scroll |
| D.1 Top Talent Card | 313:8467 | Award card: image + title + description + quantity (10, Ca nhan) + value (7,000,000 VND) | Static display |
| D.2 Top Project Card | 313:8468 | Award card: quantity (02, Tap the) + value (15,000,000 VND) | Static display |
| D.3 Top Project Leader Card | 313:8469 | Award card: quantity (03, Ca nhan) + value (7,000,000 VND) | Static display |
| D.4 Best Manager Card | 313:8470 | Award card: quantity (01, Ca nhan) + value (10,000,000 VND) | Static display |
| D.5 Signature 2025 Creator Card | 313:8471 | Award card: quantity (01) + value (5,000,000 VND ca nhan / 8,000,000 VND tap the) | Static display |
| D.6 MVP Card | 313:8510 | Award card: quantity (01) + value (15,000,000 VND) | Static display |
| Sun* Kudos Section | 335:12023 | **[REUSE]** Reuses `KudosSection` from `@/components/homepage/kudos-section.tsx` (Homepage SAA). Props: subtitle, title, newFeatureLabel, description, detailButtonText. Placed outside the content container (component has its own padding wrapper). | Button click navigates to /kudos |
| Footer | 354:4323 | Shared footer (single row on PC): logo (links to /) + 4 nav links ("Giới thiệu SAA", "Thông tin giải thưởng" (active), "Sun* Kudos", "Tiêu chuẩn chung") + copyright text "Bản quyền thuộc về Sun* © 2025" | Nav link clicks |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Homepage award cards (link/navigation), Header "Award Information" tab, or direct URL
- **To**: Kudos detail page (via "Chi tiet" button), other pages via header/footer navigation
- **Deep link**: Requires authentication (middleware redirects to `/countdown` if unauthenticated; countdown then redirects to `/login` after 1-minute timer)
- **Triggers**:
  - Sidebar item click -> Smooth scroll to corresponding award card
  - IntersectionObserver -> Updates sidebar active state on scroll
  - "Chi tiet" button -> Navigate to Kudos detail page
  - Header nav tab click -> Smooth scroll to section
  - Footer nav links -> Navigate to corresponding pages

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Sidebar active state transition (150ms), smooth scroll behavior, button hover states (150ms)
- **Accessibility**: WCAG AA compliance. All interactive elements MUST have visible focus indicators (outline: 2px solid #FFEA9E, offset: 2px). Sidebar navigation MUST be keyboard-accessible: `Tab` to focus, `ArrowUp`/`ArrowDown` to move between items, `Enter` to activate. Color contrast MUST meet 4.5:1 ratio. Sidebar MUST use `role="navigation"` with `aria-label`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display 6 award detail cards with images, titles, descriptions, quantities, and prize values.
- **FR-002**: System MUST provide a left sidebar navigation with 6 items that scroll to corresponding award cards on click.
- **FR-003**: Sidebar MUST visually indicate the currently active/visible award card (gold color + underline + text-shadow glow).
- **FR-004**: Active sidebar state MUST update automatically when the user scrolls through award cards (IntersectionObserver).
- **FR-005**: System MUST display the Sun* Kudos promotional section with navigation to detail page.
- **FR-006**: System MUST display the hero key visual with "ROOT FURTHER" artwork and section title.
- **FR-007**: Footer MUST display the SAA logo, navigation links, and copyright text.
- **FR-008**: Sidebar MUST be sticky (position: sticky) so it remains visible while scrolling through award cards.

### Technical Requirements

- **TR-001**: Page MUST be a Server Component with Client Component islands for sidebar navigation state tracking (constitution Principle I).
- **TR-002**: Sidebar active state MUST use IntersectionObserver to track visible award cards in the viewport.
- **TR-003**: No Node.js APIs -- all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-004**: Page MUST include `loading.tsx` and `error.tsx` per constitution Principle I.
- **TR-005**: Images MUST use `next/image` with appropriate `priority` for above-the-fold content (key visual).
- **TR-006**: Award data (titles, descriptions, quantities, values) are static content stored in the database via seed data. All 6 awards are always present — no empty/coming-soon state is needed.
- **TR-007**: Sidebar MUST use `scroll-behavior: smooth` for click-triggered navigation.
- **TR-008**: Header component MUST be reused from the Homepage implementation.

### Key Entities *(if feature involves data)*

- **Award Category**: Name, image URL, description, quantity, unit type (ca nhan/tap the/don vi), prize value -- populates the 6 award detail cards.
- **User Profile**: Avatar URL, name -- displayed in header.
- **Notification**: Unread count -- drives the bell indicator red dot in header.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (session) | GET | Verify authentication, get user profile | Exists |
| `/api/awards` or Supabase query | GET | Fetch award categories with full details | Predicted (New) |
| `/api/notifications/unread-count` | GET | Get unread notification count for header | Predicted (New) |

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| activeAward | string | "top-talent" | AwardSidebar | Track which award card is currently visible/active in sidebar |
| isScrolling | boolean | false | AwardSidebar | Prevent IntersectionObserver updates during programmatic scroll |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Verify authentication, get avatar for header |
| Locale | Cookie (`locale`) | Determine language for server-rendered text |
| Awards data | Supabase DB or static | Award categories with full details for cards |

### Loading/Error States

- **Page loading** (`loading.tsx`): Full-screen dark background (#00101A) with centered pulsing placeholder. Keep minimal -- dark screen with subtle loading indicator.
- **Error boundary** (`error.tsx`): Dark background (#00101A), centered "Something went wrong" message with "Try again" button (#FFEA9E, 8px radius).
- **Awards data loading**: Display 6 skeleton card placeholders in the right panel (animate-pulse) with a static sidebar.
- **Key visual loading**: Display placeholder background color (#00101A) while image loads.
- **Notification API failure**: Silently hide red dot in header -- do not block page render.

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `awards.caption` | Sun* Annual Awards 2025 | Sun* Annual Awards 2025 |
| `awards.system_title` | He thong giai thuong SAA 2025 | SAA 2025 Award System |
| `awards.quantity_label` | So luong giai thuong: | Number of awards: |
| `awards.value_label` | Gia tri giai thuong: | Prize value: |
| `awards.per_award` | cho moi giai thuong | per award |
| `awards.per_individual` | cho giai ca nhan | per individual award |
| `awards.per_team` | cho giai tap the | per team award |
| `awards.unit_individual` | Ca nhan | Individual |
| `awards.unit_team` | Tap the | Team |
| `awards.unit_unit` | Don vi | Unit |
| `awards.top_talent` | Top Talent | Top Talent |
| `awards.top_project` | Top Project | Top Project |
| `awards.top_project_leader` | Top Project Leader | Top Project Leader |
| `awards.best_manager` | Best Manager | Best Manager |
| `awards.signature_2025` | Signature 2025 Creator | Signature 2025 Creator |
| `awards.mvp` | MVP | MVP |
| `kudos.subtitle` | Phong trao ghi nhan | Recognition Movement |
| `kudos.title` | Sun* Kudos | Sun* Kudos |
| `kudos.new_feature_label` | TÍNH NĂNG MỚI SAA 2025 | NEW FEATURE SAA 2025 |
| `kudos.homepage_description` | (Homepage description text) | (Homepage description text) |
| `kudos.detail_button` | Chi tiet | Details |
| `nav.about_saa` | About SAA 2025 | About SAA 2025 |
| `nav.award_info` | Award Information | Award Information |
| `nav.kudos` | Sun* Kudos | Sun* Kudos |
| `nav.common_criteria` | Tieu chuan chung | Common Criteria |
| `footer.copyright` | Ban quyen thuoc ve Sun* (c) 2025 | Copyright (c) Sun* 2025 |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page loads in under 3 seconds (LCP) on desktop with good network.
- **SC-002**: All 6 award cards render correctly with images, descriptions, quantities, and values at all 4 breakpoints.
- **SC-003**: Sidebar active state correctly tracks visible award card during scroll (IntersectionObserver accuracy).
- **SC-004**: Sidebar click navigation smooth-scrolls to the correct award card within 500ms.
- **SC-005**: Page passes WCAG AA automated checks.

---

## Out of Scope

- Award voting or nomination functionality -- this is a display-only page.
- Admin management of award categories or values.
- Kudos detail page -- only the CTA button navigating to it is in scope.
- Widget button functionality -- only the visual placement is in scope (if present).
- Notification panel/list -- only the unread count indicator in the header is in scope.
- User profile menu -- only the avatar display in the header is in scope.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Homepage spec exists (`.momorph/specs/2167-9026-homepage/spec.md`) -- header is shared
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- **CRITICAL - Banner/Key Visual structure**: The Key Visual Banner is a COMPOSITE section containing multiple layers: (1) Background image `/images/awards/keyvisual-award-bg.png` (awards-specific, NOT the login or homepage bg), (2) Gradient overlay, (3) "ROOT FURTHER" text overlays (`root-text.png` + `further-text.png` from `/images/homepage/`) positioned on the left side of the banner (same image assets as Homepage), (4) The Section Title ("Sun* Annual Awards 2025" + divider + "Hệ thống giải thưởng SAA 2025") is OVERLAID at the bottom of this banner area within the gradient zone — it is NOT a separate section rendered below the banner. The implementation must use a `relative` container with absolutely-positioned background, gradient, ROOT FURTHER overlays, and content positioned via z-index layering.
- The Figma design is at 1440px width with 144px horizontal padding, giving a 1152px content area. This maps to `max-w-[1440px]` with `px-36` (144px).
- The award system container uses a two-column flex layout with 80px gap between sidebar (178px) and cards area (853px). The sidebar should use `position: sticky; top: 80px` to remain visible during scroll.
- Award card images have a distinctive `0.955px solid #FFEA9E` gold border with `border-radius: 24px` and gold glow box-shadow (`0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287`). Round border to 1px for implementation.
- Each award card content area uses `backdrop-filter: blur(32px)` with `border-radius: 16px` for a glass morphism effect.
- The sidebar active state uses gold color (#FFEA9E), border-bottom (1px solid #FFEA9E), and text-shadow glow (`0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`) -- same as the Homepage header nav active state.
- Award cards are separated by 80px vertical gap and include a 1px divider line (#2E3940) at the bottom of each card.
- The Kudos "Chi tiet" button uses a gold (#FFEA9E) filled background with dark text (#00101A) -- different from the outline buttons on the Homepage.
- The page total height is 6410px at desktop, indicating a very long scroll. Consider lazy-loading below-the-fold award cards.
- Fonts required: Montserrat (400, 500, 700), Montserrat Alternates (700), SVN-Gotham (400, for KUDOS text). These should be shared with the Homepage.
- The section title "He thong giai thuong SAA 2025" uses 57px/64px Montserrat 700 in gold (#FFEA9E) -- same display size as the Homepage.
- The Signature 2025 Creator card has a unique dual-value layout with separate lines for individual and team prizes.
- The footer is a shared component: single horizontal row on PC (flex-row on lg+, flex-col on mobile/tablet) with logo + 4 nav links ("Giới thiệu SAA", "Thông tin giải thưởng" (active), "Sun* Kudos", "Tiêu chuẩn chung") + copyright text. "Tiêu chuẩn chung" appears only in the footer, NOT in the header.
