# Feature Specification: Dropdown Language Selector

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Language Selector Dropdown is a small overlay component triggered from the Header. It allows users to switch between Vietnamese (VN) and English (EN). The dropdown displays two items, each with a country flag icon and language code. The currently active language is highlighted with a gold-tinted background and glow text effect. This component is reused across Login and all authenticated pages.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch Language (Priority: P1)

As a user, I want to switch between Vietnamese and English so that I can use the application in my preferred language.

**Why this priority**: Language switching is the core purpose of this component.

**Independent Test**: Click the language selector in the header, verify the dropdown opens with VN and EN options, select the non-active language, verify the page content updates.

**Acceptance Scenarios**:

1. **Given** the user clicks the language selector trigger in the header, **When** the dropdown is closed, **Then** the dropdown opens displaying two items: "VN" with Vietnam flag and "EN" with UK flag.

2. **Given** the dropdown is open and VN is the current locale, **When** the user views the list, **Then** the "VN" item MUST have the selected state (gold-tinted background, gold glow text) and "EN" MUST have the default state (transparent background, white text).

3. **Given** the dropdown is open, **When** the user clicks "EN", **Then** the locale cookie MUST be updated to `en`, the page MUST re-render with English translations, and the dropdown MUST close.

4. **Given** the user has selected "EN", **When** they navigate to another page, **Then** the language preference MUST persist (locale cookie remains `en`).

---

### User Story 2 - Keyboard Accessible (Priority: P2)

As a keyboard user, I want to navigate the language dropdown with keyboard so that I can switch languages without a mouse.

**Why this priority**: Accessibility is required but the primary interaction is mouse/touch.

**Independent Test**: Focus the language trigger, press Enter to open, use ArrowDown/ArrowUp to navigate, press Enter to select, press Escape to close.

**Acceptance Scenarios**:

1. **Given** the language trigger is focused, **When** the user presses Enter or Space, **Then** the dropdown MUST open and focus MUST move to the currently selected item.

2. **Given** the dropdown is open, **When** the user presses ArrowDown, **Then** focus MUST move to the next item. ArrowUp MUST move to the previous item. Navigation MUST wrap.

3. **Given** the dropdown is open and an item is focused, **When** the user presses Enter, **Then** that language MUST be selected and the dropdown MUST close.

4. **Given** the dropdown is open, **When** the user presses Escape, **Then** the dropdown MUST close and focus MUST return to the trigger.

---

### User Story 3 - Persist Language Preference (Priority: P3)

As a returning user, I want my language preference to be remembered so that I do not have to select it every time.

**Why this priority**: Convenience feature, not blocking core functionality.

**Independent Test**: Select EN, close and reopen the browser, verify the app loads in English.

**Acceptance Scenarios**:

1. **Given** the user selects "EN", **When** they close and reopen the application, **Then** the locale cookie MUST still be `en` and the page MUST render in English.

---

### Edge Cases

- What happens when the locale cookie is missing or invalid? -> Default to VN.
- What happens when the user clicks outside the dropdown? -> Close the dropdown without changing language.
- What happens on mobile with limited header space? -> The dropdown MUST still be accessible and properly positioned.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dropdown Container | 525:11713 | Overlay with 2 items, border gold, dark bg | Open/close on trigger click |
| VN Item | A.1 | Vietnam flag (24x24) + "VN" text | Click selects VN locale |
| EN Item | A.2 | UK flag (24x24) + "EN" text | Click selects EN locale |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Header language trigger (all pages: Login, Homepage, authenticated pages)
- **To**: Same page (re-rendered in selected locale)
- **Triggers**:
  - Click language trigger -> Toggle dropdown
  - Click language item -> Update locale, close dropdown
  - Click outside / Escape -> Close dropdown

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Dropdown open/close: opacity + translateY, 150ms ease-out
- **Accessibility**: `role="listbox"` on container, `role="option"` on items, `aria-selected` on active item, `aria-expanded` on trigger, `aria-haspopup="listbox"` on trigger. Focus indicators: `outline: 2px solid #FFEA9E, offset: 2px`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dropdown with VN and EN language options when the trigger is clicked.
- **FR-002**: The currently active language MUST be visually distinguished (selected state).
- **FR-003**: Selecting a language MUST update the locale cookie and re-render all translatable content.
- **FR-004**: Dropdown MUST close when an item is selected, when clicking outside, or when pressing Escape.

### Technical Requirements

- **TR-001**: Language Selector MUST be a Client Component (`'use client'`) since it requires click handlers and local state.
- **TR-002**: Locale MUST be stored in a cookie accessible by both client and server (for SSR).
- **TR-003**: No Node.js APIs — Cloudflare Workers compatible (constitution Principle VI).
- **TR-004**: Component MUST be reusable across Login and authenticated pages.

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Dropdown visibility |
| selectedLocale | string | from cookie or "vn" | Currently active language |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| Locale | Cookie (`locale`) | Server-side rendering in correct language |

---

## Internationalization (i18n)

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `language.vn` | VN | VN |
| `language.en` | EN | EN |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Language switch updates all visible translatable text within 500ms.
- **SC-002**: Locale cookie persists across sessions.
- **SC-003**: Dropdown passes WCAG AA automated checks (keyboard nav, ARIA roles).

---

## Out of Scope

- Adding additional languages beyond VN and EN.
- Language auto-detection from browser settings.
- Per-page language overrides.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Homepage spec exists (reuses language selector)
