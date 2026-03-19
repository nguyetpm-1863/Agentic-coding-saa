# Feature Specification: Highlight Kudos Section

**Frame ID**: `2940:13431` (section `2940:13451` B, card `2940:13465` B.3)
**Frame Name**: `Sun* Kudos - Live board` (Highlight Kudos Section)
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-16
**Status**: Draft

---

## Overview

The Highlight Kudos section sits directly below the Hero Banner on the `/kudos` page. It showcases the top kudos (sorted by most likes, fallback to newest) in a carousel format. The section includes:

1. **Section header**: "Sun* Annual Awards 2025" subtitle text, followed by a divider line (`#2E3940`), then the "HIGHLIGHT KUDOS" title
2. **Filter dropdowns**: Hashtag filter (multi-select, max 5) and Department filter (single-select) — both styled with golden border/bg matching the project theme
3. **Kudo card carousel**: Displays up to 3 cards per page with left/right navigation arrows
4. **Kudo card content**: Sender (left) → arrow → Receiver (right) with avatar, name, department, hero badge; gold divider; badge title; appreciation message (max 3 lines); hashtags; gold divider; like count with like/unlike toggle; copy link button; "Xem chi tiết" link
5. **Pagination**: Back arrow, page indicator (e.g., "2/5"), next arrow

**Key issues in current implementation**:
- Missing "Sun* Annual Awards 2025" subtitle and `#2E3940` divider line before "HIGHLIGHT KUDOS"
- Hashtag dropdown filter not implemented (needs DB seed data for hashtag list)
- Department dropdown filter not implemented (static list from design)
- API not connected — kudos don't load despite successful creation
- Kudo cards missing proper layout (sender/receiver with badges, gold dividers, badge title)

---

## User Scenarios & Testing

### User Story 1 - View Highlight Kudos (Priority: P1)

A logged-in user navigates to `/kudos` and sees the Highlight Kudos section with the section header, filter dropdowns, and a carousel of top kudos cards.

**Why this priority**: Core display — users need to see the most appreciated kudos to encourage participation.

**Independent Test**: Load `/kudos`, verify the section renders with header, filters, and kudo cards from the API.

**Acceptance Scenarios**:

1. **Given** the user is logged in and kudos exist, **When** they navigate to `/kudos`, **Then** they see "Sun* Annual Awards 2025" text, a `#2E3940` divider line, "HIGHLIGHT KUDOS" title, two filter dropdowns (Hashtag, Phòng ban), and a carousel of up to 3 kudo cards
2. **Given** no kudos exist, **When** the page loads, **Then** an empty state message is shown
3. **Given** the carousel has multiple pages, **When** the user clicks the right arrow, **Then** the next page of cards is shown and the pagination updates

---

### User Story 2 - Filter Kudos by Hashtag (Priority: P1)

A user clicks the "Hashtag" dropdown and selects one or more hashtags (max 5) to filter the highlight kudos.

**Why this priority**: Essential for finding kudos by category/value.

**Independent Test**: Click Hashtag dropdown, select a hashtag, verify carousel updates.

**Acceptance Scenarios**:

1. **Given** the user clicks the Hashtag dropdown, **When** the dropdown opens, **Then** they see a list of all hashtags from DB with checkboxes, showing "Tối đa 5" (max 5) subtitle
2. **Given** 3 hashtags are already selected, **When** the user selects 2 more (total 5), **Then** additional selections are disabled
3. **Given** a hashtag is selected, **When** the filter is applied, **Then** only kudos with that hashtag are shown in the carousel

**Hashtag list from design** (to seed in DB):
- #Toàn diện / #BE PROFESSIONAL
- #Giỏi chuyên môn / #High-performing
- #Hiệu suất cao / #BE OPTIMISTIC
- #Truyền cảm hứng / #Inspiring
- #Cống hiến / #Dedicated
- #Aim High
- #Be Agile / #BE A TEAM
- #Wasshoi / #WASSHOI
- #Hướng mục tiêu / #THINK OUTSIDE THE BOX
- #Hướng khách hàng
- #Chuẩn quy trình
- #Giải pháp sáng tạo / #GET RISKY
- #Quản lý xuất sắc / #GO FAST

---

### User Story 3 - Filter Kudos by Department (Priority: P1)

A user clicks the "Phòng ban" dropdown and selects a department to filter kudos.

**Why this priority**: Essential for browsing kudos within a specific team.

**Independent Test**: Click Phòng ban dropdown, select a department, verify carousel updates.

**Acceptance Scenarios**:

1. **Given** the user clicks the Phòng ban dropdown, **When** the dropdown opens, **Then** they see a list of all departments with the selected item highlighted
2. **Given** a department is selected, **When** the filter is applied, **Then** only kudos where the receiver belongs to that department are shown

**Department list from design** (static, stored in DB `departments` table):
CTO, SPD, FCOV, CEVC1, CEVC2, STVC - R&D, CEVC2 - CySS, FCOV - LRM, CEVC2 - System, OPDC - HRF, CEVC1 - DSV - UI/UX 1, CEVC1 - DSV, CEVEC, OPDC - HRD - C&C, STVC, FCOV - F&A, CEVC1 - DSV - UI/UX 2, CEVC1 - AIE, OPDC - HRF - C&B, FCOV - GA, FCOV - ISO, STVC - EE, GEU - HUST, CEVEC - SAPD, OPDC - HRF - OD, CEVEC - GSD, GEU - TM, STVC - R&D - DTR, STVC - R&D - DPS, CEVC3, STVC - R&D - AIR, CEVC4, PAO, GEU, GEU - DUT, OPDC - HRD - L&D, OPDC - HRD - TI, OPDC - HRF - TA, GEU - UET, STVC - R&D - SDX, OPDC - HRD - HRBP, PAO - PEC, IAV, STVC - Infra, CPV - CGP, GEU - UIT, OPDC - HRD, BDV, CPV, PAO - PAO

---

### User Story 4 - Interact with Kudo Card (Priority: P2)

A user interacts with a kudo card: likes/unlikes, copies link, or views detail.

**Why this priority**: Secondary interaction that enhances engagement.

**Independent Test**: Click like button, copy link button, and "Xem chi tiết" on a kudo card.

**Acceptance Scenarios**:

1. **Given** a kudo card is displayed, **When** the user clicks the heart icon, **Then** the like count increments and the heart turns red (active); clicking again decrements and returns to gray (inactive)
2. **Given** a kudo card is displayed, **When** the user clicks "Copy Link", **Then** the kudo URL is copied to clipboard and a toast appears "Link copied — ready to share!"
3. **Given** a kudo card is displayed, **When** the user clicks "Xem chi tiết", **Then** they navigate to the kudo detail page

---

### User Story 5 - Hero Badge Tooltip (Priority: P3)

A user hovers over the hero badge (star count) on a sender/receiver profile to see the badge description.

**Why this priority**: Nice-to-have informational feature.

**Independent Test**: Hover over a star badge on a kudo card, verify tooltip appears.

**Acceptance Scenarios**:

1. **Given** a user has 1+ star badges, **When** the user hovers over the star(s), **Then** a tooltip shows the badge level description (e.g., "Legend Hero - Có hơn 20 người gửi Kudos cho bạn")

**Badge levels from design (frameId: 3241:15003)**:
- Legend Hero: Có hơn 20 người gửi Kudos cho bạn. Bạn đã trở thành huyền thoại – người để lại dấu ấn khó quên trong tập thể bằng trái tim và hành động của mình.

---

### Edge Cases

- What happens when both hashtag and department filters are applied? → Both filters are AND-combined
- What happens when the carousel has only 1 page? → Pagination arrows are disabled, page shows "1/1"
- What happens when a kudo has no images? → Image gallery section is hidden
- What happens when appreciation message exceeds 3 lines? → Truncated with "..."
- What happens when hashtags exceed 1 line? → Truncated with "..."

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Section Subtitle | "Sun* Annual Awards 2025" text | Static |
| Divider Line | 1px `#2E3940` horizontal line | Static |
| Section Title | "HIGHLIGHT KUDOS" large text | Static |
| Hashtag Dropdown | Multi-select filter (max 5) with golden style | Click → open, check/uncheck |
| Department Dropdown | Single-select filter with golden style | Click → open, select one |
| Carousel Arrow Left | Circle button with chevron-left | Click → previous page |
| Carousel Arrow Right | Circle button with chevron-right | Click → next page |
| Kudo Card | Card with sender/receiver info, message, hashtags, actions | Like, copy link, view detail |
| Pagination | "<  2/5  >" format | Click arrows to navigate |

### Navigation Flow

- From: Below Hero Banner
- To: Clicking "Xem chi tiết" → Kudo detail page; Clicking hashtag → filters the view
- Triggers: Filter changes, pagination, card actions

### Visual Requirements

- Responsive: mobile (default), md (768px), lg (1024px), xl (1280px)
- See `design-style.md` for all visual specifications
- Kudo card has 4px golden border (`#FFEA9E`) and cream background (`#FFF8E1`)
- Gold dividers inside cards use `#FFEA9E`
- Section dividers use `#2E3940`

---

## Requirements

### Functional Requirements

- **FR-001**: Section MUST display "Sun* Annual Awards 2025" subtitle, `#2E3940` divider, then "HIGHLIGHT KUDOS" title
- **FR-002**: Hashtag dropdown MUST load hashtags from `hashtags` DB table and allow multi-select (max 5)
- **FR-003**: Department dropdown MUST load departments from `departments` DB table and allow single-select
- **FR-004**: Carousel MUST display kudos sorted by most likes (descending), fallback to newest
- **FR-005**: Each kudo card MUST show: sender (avatar, name, department, badge), receiver (avatar, name, department, badge), timestamp, badge title, message (max 3 lines), hashtags (max 1 line), like count, copy link, view detail
- **FR-006**: Like/unlike MUST update in real-time via server action
- **FR-007**: Copy link MUST copy kudo URL to clipboard
- **FR-008**: Pagination MUST show current page / total pages with back/next arrows
- **FR-009**: Filters MUST trigger re-fetch of highlight kudos

### Technical Requirements

- **TR-001**: Highlight kudos fetched via `getHighlightKudos()` server query or `fetchHighlightKudosAction` server action
- **TR-002**: Hashtags seeded in DB via migration
- **TR-003**: Departments seeded in DB via migration (static list)
- **TR-004**: Like/unlike via `toggleKudoLike` server action

### Key Entities

- **HighlightKudo**: id, kudoId, campaign, featuredAt, kudo (KudoWithDetails)
- **KudoWithDetails**: id, message, title, badge, createdAt, sender, receiver, hashtags, images, likeCount, isLikedByUser
- **UserProfile**: id, name, avatarUrl, departmentId, departmentCode, heroBadge
- **Hashtag**: id, key, displayTextVi, displayTextEn

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `getHighlightKudos(page, pageSize, hashtagId?, departmentId?)` | Server Query | Fetch paginated highlight kudos | Exists |
| `fetchHighlightKudosAction(page, hashtagId?, departmentId?)` | Server Action | Client-callable wrapper | Exists |
| `getHashtags(locale)` | Server Query | Fetch all hashtags | Exists |
| `getDepartments()` | Server Query | Fetch all departments | Exists |
| `toggleKudoLike(kudoId)` | Server Action | Toggle like/unlike | Exists |

---

## Success Criteria

- **SC-001**: Section header displays "Sun* Annual Awards 2025" + divider + "HIGHLIGHT KUDOS" matching Figma
- **SC-002**: Both filter dropdowns render with correct styling and function properly
- **SC-003**: Carousel loads and displays kudo cards with correct data from API
- **SC-004**: Like/unlike, copy link, and view detail actions work correctly
- **SC-005**: Pagination navigates between pages correctly

---

## Out of Scope

- KV Kudos Hero Section (covered in separate spec `2940-13437-kv-kudos-hero`)
- Spotlight Board section
- All Kudos section
- Kudo detail page
- User profile page

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] i18n translations exist (`kudos.live_board.highlight_title`, `kudos.live_board.highlight_subtitle`)
- [x] Supabase queries exist (`getHighlightKudos`, `getHashtags`, `getDepartments`)
- [ ] Hashtag seed data in DB
- [ ] Department seed data in DB (complete list from design)
- [x] KudoCard components exist (`kudo-card.tsx`, `kudo-card-header.tsx`, etc.)

---

## Notes

- The current implementation is missing the "Sun* Annual Awards 2025" subtitle and divider before the title
- The highlight_subtitle i18n key already exists but is rendered as a `<p>` below the title — it should be ABOVE the title per design
- The kudo card needs rework to match the Figma design: sender on left with arrow to receiver on right, gold border, proper badge display
- The `getHighlightKudos` query exists but may not be returning data — need to verify the `highlight_kudos` table has data or change the query to use `kudos` table directly sorted by like count
- Department list from Figma dropdown design has ~50 departments that need to be seeded
