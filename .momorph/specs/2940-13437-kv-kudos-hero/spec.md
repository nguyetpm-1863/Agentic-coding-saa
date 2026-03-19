# Feature Specification: KV Kudos Hero Section

**Frame ID**: `2940:13431` (items `2940:13437` A, `2940:13449` A.1)
**Frame Name**: `Sun* Kudos - Live board` (Hero Section)
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-16
**Status**: Draft

---

## Overview

The Hero Section is the top banner of the `/kudos` page. It contains:
1. A full-width background image (`Keyvisual.png`) with a gradient overlay
2. A title text "Hệ thống ghi nhận và cảm ơn" (VI) / "Appreciation and recognition system" (EN)
3. The Sun* KUDOS logo image
4. A recognition input field (pill-shaped button) that, when clicked, opens the **recipient search dropdown** — user types a name and sees a list of matching users from the API
5. A search bar "Tìm kiếm profile Sunner" for finding user profiles

**Key difference from current implementation**: The recognition input is NOT just a button that opens a modal. Instead, clicking it transforms into a **searchable dropdown** for finding the recipient (similar to other dropdowns in the project). After selecting a recipient, the Write Kudo modal opens pre-filled with that recipient.

---

## User Scenarios & Testing

### User Story 1 - View Hero Banner (Priority: P1)

A logged-in user navigates to `/kudos` and sees the hero banner with the background image, title text, KUDOS logo, and the recognition input field.

**Why this priority**: This is the first visual element users see — it sets the tone for the entire page.

**Independent Test**: Load the `/kudos` page and verify the hero section renders with all visual elements.

**Acceptance Scenarios**:

1. **Given** the user is logged in, **When** they navigate to `/kudos`, **Then** they see the hero banner with Keyvisual.png background, "Hệ thống ghi nhận và cảm ơn" title, KUDOS logo, and the recognition input field
2. **Given** the page loads, **When** the background image fails to load, **Then** the dark fallback background (#00101A) is shown with the gradient overlay still visible

---

### User Story 2 - Search for Recipient via Recognition Input (Priority: P1)

A user clicks on the recognition input "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" and starts typing a name. A dropdown appears showing matching users from the API.

**Why this priority**: Core interaction — this is the primary CTA of the hero section.

**Independent Test**: Click the recognition input, type a partial name, verify dropdown with search results appears.

**Acceptance Scenarios**:

1. **Given** the user clicks on the recognition input, **When** they type at least 2 characters, **Then** a dropdown appears with matching user profiles (name, avatar, department) from the search API
2. **Given** the user is typing in the recognition input, **When** there are no results, **Then** a "Không tìm thấy kết quả" / "No results found" message is shown in the dropdown
3. **Given** the dropdown is showing results, **When** the user clicks on a user, **Then** the Write Kudo modal opens with that user pre-selected as the recipient
4. **Given** the dropdown is open, **When** the user clicks outside, **Then** the dropdown closes
5. **Given** the user is typing, **When** the API is loading, **Then** a loading indicator is shown in the dropdown

---

### User Story 3 - Search Sunner Profile (Priority: P2)

A user uses the search bar on the right side of the hero to find a Sunner's profile.

**Why this priority**: Secondary feature — profile browsing rather than kudo writing.

**Independent Test**: Type a name in the search bar, verify dropdown results appear.

**Acceptance Scenarios**:

1. **Given** the user types in the search bar, **When** they type ≥ 2 characters, **Then** a dropdown shows matching users with avatar, name, and department
2. **Given** results are shown, **When** the user clicks a result, **Then** they navigate to that user's profile or the dropdown closes

---

### Edge Cases

- What happens when the user searches with special characters (%, _, ')? → Input is sanitized server-side
- What happens on slow network? → Debounced search (300ms) with loading state
- What happens when there are many results? → Limit to 10 results
- How does the hero look on mobile? → Stacked layout, inputs full-width

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Background Image | Full-width Keyvisual.png with gradient overlay | None (static) |
| Title Text | "Hệ thống ghi nhận và cảm ơn" | None (static) |
| KUDOS Logo | `public/images/homepage/kudos.png` centered below title | None (static) |
| Recognition Input | Pill-shaped field with pen icon and placeholder text | Click → focus + keyboard input → dropdown with search results |
| Search Bar | Pill-shaped input with search icon | Type → debounced search → dropdown results |
| Recipient Dropdown | List of matching users (avatar, name, department) | Click result → open Write Kudo modal with recipient |

### Navigation Flow

- From: Header nav → "Sun* Kudos" link
- To: Clicking a recipient → Opens Write Kudo modal (pre-filled)
- Triggers: Click recognition input → type → select user

### Visual Requirements

- Responsive breakpoints: mobile (default), md (768px), lg (1024px), xl (1280px)
- Background image should cover the section with `object-cover`
- Gradient overlay fades from transparent to #00101A (bottom)
- See `design-style.md` for all visual specifications
- Accessibility: WCAG AA compliant, combobox ARIA pattern for search inputs

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display the hero banner with background image, title, logo, and recognition input
- **FR-002**: Recognition input MUST function as a searchable dropdown (not just a button)
- **FR-003**: System MUST search users by name via API with debounce (300ms) when ≥ 2 chars typed
- **FR-004**: Dropdown MUST show up to 10 results with avatar, name, and department
- **FR-005**: Selecting a user from dropdown MUST open Write Kudo modal with that recipient pre-selected
- **FR-006**: Search bar MUST independently search for Sunner profiles
- **FR-007**: i18n text MUST match design exactly:
  - VI hero title: "Hệ thống ghi nhận và cảm ơn"
  - VI recognition placeholder: "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
  - EN hero title: "Appreciation and recognition system"
  - EN recognition placeholder: "Who do you want to appreciate and recognize today?"

### Technical Requirements

- **TR-001**: API search debounced at 300ms to reduce server load
- **TR-002**: Input sanitized against SQL wildcards (%, _) before querying
- **TR-003**: Images loaded via Next.js `<Image>` for optimization
- **TR-004**: Background image uses CSS `background-image` (not `<Image>`) for full-bleed coverage

### Key Entities

- **UserProfile**: id, name, avatarUrl, department, departmentCode, heroBadge
- **SearchResult**: id, name, avatarUrl, department (from `searchUsers` server action)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `searchUsers(query)` server action | POST | Search user profiles by name (ILIKE) | Exists |
| `/api/auth` (Supabase) | GET | Verify logged-in user | Exists |

---

## Success Criteria

- **SC-001**: Hero banner renders with all visual elements matching Figma design
- **SC-002**: Recognition input opens a working search dropdown within 500ms of typing
- **SC-003**: Selecting a recipient pre-fills the Write Kudo modal correctly
- **SC-004**: i18n texts match design for both Vietnamese and English

---

## Out of Scope

- Write Kudo modal implementation (covered in separate spec `520-11602-viet-kudo`)
- Highlight Kudos, Spotlight Board, All Kudos sections (separate specs)
- User profile page navigation from search results

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] i18n translations exist (`src/libs/i18n/translations.ts`)
- [x] Search API exists (`src/libs/kudos/actions.ts` → `searchUsers`)
- [x] Background image exists (`public/images/kudos/Keyvisual.png`)
- [x] Logo image exists (`public/images/homepage/kudos.png`)

---

## Notes

- The current implementation has the recognition input as a simple button that opens a "Coming soon" modal. This needs to be changed to a searchable dropdown.
- The current i18n text says "Hệ thống ghi nhận lời cảm ơn" but the design says "Hệ thống ghi nhận và cảm ơn" — needs updating.
- The current recognition placeholder says "Hôm nay, bạn muốn gửi lời cảm ơn đến ai?" but design says "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" — needs updating.
- The Figma gradient is at 25 degrees from #00101A to transparent, but the current implementation uses 180deg. The design image shows a left-to-right gradient fading effect — implementation should match Figma at approximately 25deg angle.
