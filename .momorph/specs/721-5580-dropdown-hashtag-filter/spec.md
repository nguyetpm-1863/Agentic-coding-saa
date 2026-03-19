# Feature Specification: Dropdown Hashtag Filter

**Frame ID**: `721:5580`
**Frame Name**: `Dropdown Hashtag filter`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Hashtag Filter Dropdown is a scrollable overlay used on the Kudos Live Board (Highlight section). It allows users to filter the kudos feed by selecting a single hashtag from a predefined list of 13 recognition-related tags. The dropdown shares the common design system (dark background, gold border, gold-accent selected states) with added scroll behavior for the longer list.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Filter Kudos by Hashtag (Priority: P1)

As a user viewing the Kudos Live Board, I want to filter kudos by hashtag so that I can see recognition posts related to a specific value or competency.

**Why this priority**: Filtering is the core purpose of this component.

**Independent Test**: Open the hashtag filter dropdown, select a hashtag, verify the kudos feed updates to show only posts with that hashtag.

**Acceptance Scenarios**:

1. **Given** the user clicks the hashtag filter trigger, **When** the dropdown opens, **Then** it MUST display the full list of 13 hashtags in a scrollable container.

2. **Given** the dropdown is open, **When** the user selects "#Dedicated" (Cong hien), **Then** that hashtag MUST be visually highlighted (gold-tinted background, gold glow text) and the kudos feed MUST filter to show only posts tagged with that hashtag.

3. **Given** a hashtag is currently selected, **When** the user selects a different hashtag, **Then** the previous selection MUST be deselected (single-select behavior) and the feed MUST update.

4. **Given** the dropdown is open, **When** the user scrolls, **Then** additional hashtags MUST be visible and the scroll behavior MUST be smooth.

---

### User Story 2 - Clear Hashtag Filter (Priority: P2)

As a user, I want to clear the hashtag filter so that I can see all kudos posts again.

**Why this priority**: Clearing a filter is essential to restore the default view.

**Independent Test**: Select a hashtag, then clear the filter, verify the feed shows all posts.

**Acceptance Scenarios**:

1. **Given** a hashtag filter is active, **When** the user clicks the same hashtag again (or a "clear" mechanism), **Then** the filter MUST be removed and the feed MUST show all kudos posts.

---

### User Story 3 - Scroll Through Options (Priority: P3)

As a user, I want to scroll through the hashtag list so that I can find and select any hashtag.

**Why this priority**: Scrollability is required since all 13 items may not fit in the visible area.

**Independent Test**: Open dropdown, verify scrollbar appears, scroll to the last item, verify it is selectable.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the list exceeds the visible area, **Then** a scrollbar MUST appear and the user MUST be able to scroll to all 13 items.

---

### Edge Cases

- What happens when no kudos match the selected hashtag? -> Display an empty state message in the feed (not the dropdown's responsibility).
- What happens when clicking outside the dropdown? -> Close without changing the filter.
- What happens on mobile? -> Dropdown MUST be scrollable with touch, positioned to avoid overflow.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dropdown Container | 563:8026 | Scrollable overlay with hashtag list | Open/close on trigger click |
| Tag Item (selected) | A.1 | e.g., "#Dedicated", 135x56px, selected state with glow | Click selects/deselects |
| Tag Item (default) | A.2+ | e.g., "#Inspiring", 118x56px, default state | Click selects |

### Hashtag List (13 items)

| # | Display Text | i18n Key |
|---|-------------|----------|
| 1 | #Toàn diện | `hashtag.toan_dien` |
| 2 | #Giỏi chuyên môn | `hashtag.gioi_chuyen_mon` |
| 3 | #Hiệu suất cao | `hashtag.hieu_suat_cao` |
| 4 | #Truyền cảm hứng | `hashtag.truyen_cam_hung` |
| 5 | #Cống hiến | `hashtag.cong_hien` |
| 6 | #Aim High | `hashtag.aim_high` |
| 7 | #Be Agile | `hashtag.be_agile` |
| 8 | #Wasshoi | `hashtag.wasshoi` |
| 9 | #Hướng mục tiêu | `hashtag.huong_muc_tieu` |
| 10 | #Hướng khách hàng | `hashtag.huong_khach_hang` |
| 11 | #Chuẩn quy trình | `hashtag.chuan_quy_trinh` |
| 12 | #Giải pháp sáng tạo | `hashtag.giai_phap_sang_tao` |
| 13 | #Quản lý xuất sắc | `hashtag.quan_ly_xuat_sac` |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Kudos Live Board Highlight section
- **To**: Same page (filtered feed)
- **Triggers**:
  - Click hashtag trigger -> Toggle dropdown
  - Click hashtag item -> Select/deselect, filter feed
  - Click outside / Escape -> Close dropdown

### Visual Requirements

- **Animations/Transitions**: Dropdown open/close: 150ms ease-out. Item hover: background-color 150ms.
- **Accessibility**: `role="listbox"` on container, `role="option"` on items, `aria-selected` on active item. Keyboard: ArrowUp/Down to navigate, Enter to select, Escape to close.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a scrollable dropdown with 13 hashtag options.
- **FR-002**: Selection MUST be single-select — only one hashtag active at a time.
- **FR-003**: Selecting a hashtag MUST filter the Kudos Live Board feed.
- **FR-004**: User MUST be able to clear the filter (deselect the active hashtag).
- **FR-005**: Dropdown MUST close on selection, outside click, or Escape key.

### Technical Requirements

- **TR-001**: Hashtag Filter MUST be a Client Component (`'use client'`).
- **TR-002**: The hashtag list SHOULD be fetched from the server or passed as props (not hardcoded in the client component).
- **TR-003**: Filter state MUST be lifted to the parent Kudos Live Board component to trigger feed re-fetch/re-filter.
- **TR-004**: No Node.js APIs — Cloudflare Workers compatible (constitution Principle VI).

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Dropdown visibility |
| selectedHashtag | string or null | null | Currently selected hashtag (null = no filter) |

### Parent State

| State | Source | Purpose |
|-------|--------|---------|
| activeFilter | Lifted from dropdown | Kudos feed filtering |

---

## Internationalization (i18n)

See the hashtag list table above for all 13 i18n keys.

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `hashtag.filter.label` | Lọc theo hashtag | Filter by hashtag |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 13 hashtags are scrollable and selectable.
- **SC-002**: Feed updates within 500ms of hashtag selection.
- **SC-003**: Keyboard navigation works through all 13 items.

---

## Out of Scope

- Multi-select hashtag filtering.
- Hashtag search/autocomplete within the dropdown.
- Creating or managing hashtags.
- Kudos feed rendering (separate component).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Kudos Live Board spec exists
- [ ] Hashtag data source defined (API or database)
