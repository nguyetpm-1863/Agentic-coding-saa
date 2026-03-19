# Feature Specification: Dropdown Department Filter (Phong ban)

**Frame ID**: `721:5684`
**Frame Name**: `Dropdown Phòng ban`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Department Filter Dropdown is a scrollable overlay used on the Kudos Live Board (Highlight section). It allows users to filter the kudos feed by selecting a single department from a list of 50 organizational units. The dropdown shares the common design system with the Hashtag Filter but handles a significantly larger dataset requiring efficient scroll behavior.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Filter Kudos by Department (Priority: P1)

As a user viewing the Kudos Live Board, I want to filter kudos by department so that I can see recognition posts from a specific team.

**Why this priority**: Filtering is the core purpose of this component.

**Independent Test**: Open the department filter dropdown, select a department, verify the kudos feed updates to show only posts from that department.

**Acceptance Scenarios**:

1. **Given** the user clicks the department filter trigger, **When** the dropdown opens, **Then** it MUST display the department list in a scrollable container.

2. **Given** the dropdown is open, **When** the user selects "CEVC2", **Then** that department MUST be visually highlighted (gold-tinted background, gold glow text) and the kudos feed MUST filter to show only posts from CEVC2.

3. **Given** a department is currently selected, **When** the user selects a different department, **Then** the previous selection MUST be deselected (single-select) and the feed MUST update.

4. **Given** the dropdown is open with 50 items, **When** the user scrolls, **Then** the scroll MUST be smooth and all 50 departments MUST be accessible.

---

### User Story 2 - Scroll Through Departments (Priority: P2)

As a user, I want to scroll through the full department list so that I can find my target department.

**Why this priority**: With 50 items, scrollability is essential for usability.

**Independent Test**: Open dropdown, scroll to the last department, verify it is selectable.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the content area is 101x348px, **Then** approximately 6 departments are visible at once and the rest MUST be accessible via scrolling.

2. **Given** the user is scrolling, **When** they reach the end of the list, **Then** the scroll MUST stop at the last item (no over-scroll).

---

### User Story 3 - Clear Department Filter (Priority: P3)

As a user, I want to clear the department filter so that I can see all kudos posts again.

**Why this priority**: Clearing a filter restores the default view.

**Independent Test**: Select a department, clear the filter, verify the feed shows all posts.

**Acceptance Scenarios**:

1. **Given** a department filter is active, **When** the user clicks the same department again (or a clear mechanism), **Then** the filter MUST be removed and the feed MUST show all kudos posts.

---

### Edge Cases

- What happens when the department list changes (org restructure)? -> List MUST be fetched from server, not hardcoded.
- What happens when no kudos match the selected department? -> Display empty state in feed (not dropdown's concern).
- What happens when clicking outside? -> Close without changing filter.
- What happens on slow networks with 50 items? -> Show loading state in dropdown while fetching list.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dropdown Container | 563:8027 | Scrollable overlay, 101x348px content area | Open/close on trigger click |
| Dept Item (selected) | A.1 | e.g., "CEVC2", selected state with glow | Click selects/deselects |
| Dept Item (default) | A.2, A.3+ | e.g., "CEVC3", "CEVC4", default state | Click selects |

### Department List (50 items)

CTO, SPD, FCOV, CEVC1, CEVC2, STVC - R&D, CEVC2 - CySS, FCOV - LRM, CEVC2 - System, OPDC - HRF, CEVC1 - DSV - UI/UX 1, CEVC1 - DSV, CEVEC, OPDC - HRD - C&C, STVC, FCOV - F&A, CEVC1 - DSV - UI/UX 2, CEVC1 - AIE, OPDC - HRF - C&B, FCOV - GA, FCOV - ISO, STVC - EE, GEU - HUST, CEVEC - SAPD, OPDC - HRF - OD, CEVEC - GSD, GEU - TM, STVC - R&D - DTR, STVC - R&D - DPS, CEVC3, STVC - R&D - AIR, CEVC4, PAO, GEU, GEU - DUT, OPDC - HRD - L&D, OPDC - HRD - TI, OPDC - HRF - TA, GEU - UET, STVC - R&D - SDX, OPDC - HRD - HRBP, PAO - PEC, IAV, STVC - Infra, CPV - CGP, GEU - UIT, OPDC - HRD, BDV, CPV, PAO - PAO

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Kudos Live Board Highlight section
- **To**: Same page (filtered feed)
- **Triggers**:
  - Click department trigger -> Toggle dropdown
  - Click department item -> Select/deselect, filter feed
  - Click outside / Escape -> Close dropdown

### Visual Requirements

- **Accessibility**: `role="listbox"` on container, `role="option"` on items, `aria-selected` on active item. Keyboard: ArrowUp/Down to navigate (with scroll-into-view), Enter to select, Escape to close.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a scrollable dropdown with the full department list.
- **FR-002**: Selection MUST be single-select.
- **FR-003**: Selecting a department MUST filter the Kudos Live Board feed.
- **FR-004**: User MUST be able to clear the filter.
- **FR-005**: Dropdown MUST close on selection, outside click, or Escape key.
- **FR-006**: Department list MUST be fetched from the server (not hardcoded).

### Technical Requirements

- **TR-001**: Department Filter MUST be a Client Component (`'use client'`).
- **TR-002**: Department list MUST be fetched from Supabase or an API endpoint and passed as props.
- **TR-003**: Filter state MUST be lifted to the parent Kudos Live Board component.
- **TR-004**: Consider virtualized scrolling if performance degrades with 50 items (YAGNI — measure first per constitution Principle VII).
- **TR-005**: No Node.js APIs — Cloudflare Workers compatible (constitution Principle VI).

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Dropdown visibility |
| selectedDepartment | string or null | null | Currently selected department (null = no filter) |

### Parent State

| State | Source | Purpose |
|-------|--------|---------|
| activeFilter | Lifted from dropdown | Kudos feed filtering |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| departments | Supabase DB | List of departments for dropdown options |

---

## Internationalization (i18n)

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `department.filter.label` | Lọc theo phòng ban | Filter by department |

Department names are organizational codes (e.g., "CEVC2", "STVC - R&D") and are NOT translated.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 50 departments are scrollable and selectable.
- **SC-002**: Feed updates within 500ms of department selection.
- **SC-003**: Scroll performance remains smooth with 50 items (no jank).
- **SC-004**: Keyboard navigation with scroll-into-view works for all items.

---

## Out of Scope

- Department search/autocomplete within the dropdown.
- Multi-select department filtering.
- Department management or creation.
- Kudos feed rendering (separate component).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Kudos Live Board spec exists
- [ ] Department data source defined (Supabase table or API)
