# Feature Specification: Dropdown List Hashtag (Hashtag Selection)

**Frame ID**: `1002:13013`
**Frame Name**: `Dropdown List Hashtag`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Draft

---

## Overview

The "Dropdown List Hashtag" is a multi-select dropdown component for choosing hashtags when writing a Kudo. It is used within the "Viet Kudo" (Write Kudo) modal's Hashtag field section. The component consists of a trigger button ("+ Hashtag / Toi da 5") and a dropdown list that displays available hashtags with checkmark indicators for selected items.

Users can select up to 5 hashtags from a predefined list of 13 items. Selected items appear with a gold-tinted background and a green check icon, while unselected items have a transparent background. The dropdown uses a dark background (`#00070C`) contrasting with the parent modal's cream theme, creating a clear visual distinction.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select Hashtags by Toggling (Priority: P1)

As a user writing a Kudo, I want to select hashtags from a dropdown list so that I can categorize my Kudo for discoverability on the Live Board.

**Why this priority**: Hashtag selection is a required field (min 1) in the Kudo form. Without this component, users cannot fulfill the hashtag requirement.

**Independent Test**: Click the "+ Hashtag" trigger, select 3 hashtags by clicking them, verify checkmarks appear, close the dropdown, verify selected hashtags are reflected in the parent form.

**Acceptance Scenarios**:

1. **Given** the Hashtag section is visible in the Kudo form, **When** the user clicks the "+ Hashtag" trigger button, **Then** the dropdown list opens below the trigger, displaying all available hashtags.

2. **Given** the dropdown is open, **When** the user clicks an unselected hashtag item, **Then** the item becomes selected (gold background + check icon appears), and the selection is communicated to the parent form.

3. **Given** the dropdown is open with some items selected, **When** the user clicks a selected hashtag item, **Then** the item becomes unselected (check icon removed, background returns to transparent).

4. **Given** the user has selected hashtags, **When** they close and reopen the dropdown, **Then** previously selected items retain their selected state with check icons visible.

---

### User Story 2 - Maximum 5 Hashtag Limit Enforcement (Priority: P2)

As a user, I want the system to prevent me from selecting more than 5 hashtags so that Kudos maintain focused categorization.

**Why this priority**: The max limit is a business rule that must be enforced to maintain content quality and UI consistency.

**Independent Test**: Select 5 hashtags, attempt to select a 6th, verify the 6th item cannot be selected and visual feedback is provided.

**Acceptance Scenarios**:

1. **Given** the user has selected 5 hashtags, **When** they view the dropdown, **Then** all unselected items appear visually disabled (reduced opacity or muted styling) and are non-interactive.

2. **Given** 5 hashtags are selected, **When** the user attempts to click an unselected item, **Then** nothing happens — the item is not selected and the count remains at 5.

3. **Given** 5 hashtags are selected, **When** the user deselects one (clicks a selected item), **Then** the count drops to 4 and previously disabled items become selectable again.

4. **Given** 5 hashtags are selected, **When** the trigger button is visible, **Then** the trigger text or a nearby indicator communicates that the maximum has been reached.

---

### User Story 3 - Visual Feedback with Checkmarks (Priority: P3)

As a user, I want to see clear visual indicators of which hashtags are selected so that I can quickly review my choices.

**Why this priority**: Visual feedback is essential for usability in a multi-select pattern where selections persist across interactions.

**Independent Test**: Select and deselect hashtags, verify check icons appear/disappear correctly, verify selected items have distinct background styling.

**Acceptance Scenarios**:

1. **Given** a hashtag is selected, **When** the dropdown is visible, **Then** the item displays with `rgba(255, 234, 158, 0.20)` background and a green circle check icon (24x24px) on the right.

2. **Given** a hashtag is unselected, **When** the dropdown is visible, **Then** the item displays with transparent background and no check icon.

3. **Given** the dropdown is open, **When** the user hovers over an item, **Then** the item shows a subtle background change to indicate interactivity.

---

### User Story 4 - Keyboard Accessible (Priority: P4)

As a keyboard user, I want to navigate and select hashtags using the keyboard so that the component is accessible without a mouse.

**Why this priority**: Keyboard accessibility is required for WCAG AA compliance and inclusive design.

**Independent Test**: Use Tab to focus the trigger, Enter to open, Arrow keys to navigate, Space/Enter to toggle, Escape to close.

**Acceptance Scenarios**:

1. **Given** the trigger button is focused, **When** the user presses `Enter` or `Space`, **Then** the dropdown opens and focus moves to the first item.

2. **Given** the dropdown is open, **When** the user presses `ArrowDown`/`ArrowUp`, **Then** focus moves between items sequentially.

3. **Given** an item is focused, **When** the user presses `Enter` or `Space`, **Then** the item's selected state toggles.

4. **Given** the dropdown is open, **When** the user presses `Escape`, **Then** the dropdown closes and focus returns to the trigger button.

---

### Edge Cases

- What happens when all 13 hashtags are needed but max is 5? -> Only 5 can be selected; the rest are disabled at the limit.
- What happens when the hashtag list changes (items added/removed server-side)? -> The dropdown should fetch the latest list each time it opens, or use a cached list refreshed on form load.
- What happens when the user deselects all hashtags? -> The parent form shows a validation error on submit (min 1 required), but the dropdown itself allows 0 selections.
- What happens on a very narrow screen? -> Dropdown should not overflow viewport; position adjustment may be needed.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Trigger Button | 1002:15114 | 116x48px, "+ Hashtag / Toi da 5" text, plus icon, white bg | Click opens dropdown |
| Dropdown Container | 1002:13102 | 318px wide, dark bg, border, 8px radius | Appears below trigger |
| Selected Item (A, B, C) | — | 306x40px, gold-tinted bg, white text, check icon | Click deselects |
| Unselected Item (D+) | — | 306x40px, transparent bg, white text, no icon | Click selects |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Hashtag List (13 predefined items)

| # | Vietnamese Display | Category |
|---|-------------------|----------|
| 1 | Toan dien | Comprehensive |
| 2 | Gioi chuyen mon | Professional |
| 3 | Hieu suat cao | High-performing |
| 4 | Truyen cam hung | Inspiring |
| 5 | Cong hien | Dedicated |
| 6 | Aim High | Aim High |
| 7 | Be Agile | Be Agile |
| 8 | Wasshoi | Wasshoi |
| 9 | Huong muc tieu | Goal-oriented |
| 10 | Huong khach hang | Customer-oriented |
| 11 | Chuan quy trinh | Process-compliant |
| 12 | Giai phap sang tao | Creative solutions |
| 13 | Quan ly xuat sac | Excellent management |

### Navigation Flow

- **From**: "+ Hashtag" trigger button in Viet Kudo modal
- **To**: Dropdown closes, selections reflected in parent form
- **Triggers**:
  - Trigger button click -> Opens dropdown
  - Item click -> Toggles selection
  - Click outside -> Closes dropdown
  - `Escape` key -> Closes dropdown

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Dropdown open (fade-in + slideDown 150ms), dropdown close (fade-out 150ms), item selection (background transition 150ms)
- **Accessibility**:
  - Trigger button MUST have `aria-haspopup="listbox"` and `aria-expanded` reflecting open state.
  - Dropdown MUST have `role="listbox"` and `aria-multiselectable="true"`.
  - Each item MUST have `role="option"` and `aria-selected` reflecting selection state.
  - Items at max limit MUST have `aria-disabled="true"`.
  - Keyboard navigation MUST support ArrowUp/ArrowDown for movement, Enter/Space for toggle, Escape to close.
  - Focus management: focus moves to first item on open, returns to trigger on close.
  - Selected count SHOULD be announced via `aria-live="polite"` region.
  - Color contrast MUST meet WCAG AA 4.5:1 ratio (white text on dark background).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dropdown with all available hashtags when the trigger button is clicked.
- **FR-002**: Users MUST be able to toggle hashtag selection by clicking items.
- **FR-003**: Maximum 5 hashtags MUST be selectable. Exceeding the limit MUST be prevented.
- **FR-004**: Selected items MUST display with gold-tinted background and green check icon.
- **FR-005**: Unselected items MUST display with transparent background and no check icon.
- **FR-006**: Dropdown MUST close on click outside, Escape key, or trigger button re-click.
- **FR-007**: Selected hashtags MUST be communicated to the parent Kudo form state.
- **FR-008**: Minimum 1 hashtag is required for form submission (validated by parent form, not this component).

### Technical Requirements

- **TR-001**: Component MUST be a Client Component (`'use client'`) due to dropdown interactivity (constitution Principle I).
- **TR-002**: Hashtag list SHOULD be fetched from the server or passed as props. Do not hardcode in the component (constitution Principle VII — data should be configurable).
- **TR-003**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-004**: Component MUST be keyboard accessible following WAI-ARIA Listbox pattern.

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| isOpen | boolean | false | HashtagDropdown | Dropdown visibility |
| selectedHashtags | string[] | [] | HashtagDropdown | Currently selected hashtag IDs/names |

### Props (from Parent)

| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| hashtags | Hashtag[] | Yes | Available hashtag list |
| selected | string[] | Yes | Currently selected hashtag IDs |
| onChange | (selected: string[]) => void | Yes | Callback when selection changes |
| maxSelections | number | No (default: 5) | Maximum allowed selections |

### Loading/Error States

- **Dropdown opening**: Fade-in + slideDown (150ms). No loading state needed if hashtag list is passed as props.
- **Max limit reached**: Unselected items become visually disabled. Optional toast or inline message: "Da chon toi da 5 hashtag".
- **Empty list**: "Khong co hashtag" message (unlikely with predefined list but handle defensively).

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `hashtag.trigger_label` | Hashtag | Hashtag |
| `hashtag.max_note` | Toi da 5 | Max 5 |
| `hashtag.limit_reached` | Da chon toi da 5 hashtag | Maximum 5 hashtags selected |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can select/deselect hashtags with a single click, each interaction completing within 100ms.
- **SC-002**: Max 5 limit is enforced with zero possibility of exceeding it.
- **SC-003**: Dropdown opens within 150ms of trigger click.
- **SC-004**: Component passes WCAG AA automated accessibility checks.
- **SC-005**: Keyboard-only users can complete the full selection workflow (open, navigate, select, close).

---

## Out of Scope

- Creating custom/user-defined hashtags — only predefined list is supported.
- Searching/filtering hashtags within the dropdown — the list is short enough (13 items) to browse.
- Reordering hashtags — display order is fixed.
- Hashtag management (CRUD) — admin feature, not part of this component.
- Hashtag chip display in the parent form — handled by the parent Hashtag section, not this dropdown.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Parent feature spec exists (`.momorph/specs/520-11602-viet-kudo/spec.md`)
- [ ] Hashtag data source (API endpoint or seed data)

---

## Notes

- The dropdown uses a dark background (`#00070C`) which contrasts sharply with the parent modal's cream (`#FFF8E1`). This is a deliberate design choice to visually separate the selection interface from the form.
- Selected items use `rgba(255, 234, 158, 0.20)` — a subtle gold tint that aligns with the project's gold accent theme.
- The check icon is a green circle with a white checkmark — not a simple checkmark. This provides stronger visual feedback than a standard checkbox pattern.
- The trigger button dimensions (116x48px) are smaller than typical form inputs, matching the "+ Hashtag" add-button pattern established in the parent Kudo modal.
- The dropdown width (318px) is wider than the trigger button (116px), positioned to align with the left edge of the trigger or the hashtag section.
- With 13 items at 40px each, the dropdown could be up to ~520px tall plus padding. On mobile, this may require scroll containment within the dropdown.
