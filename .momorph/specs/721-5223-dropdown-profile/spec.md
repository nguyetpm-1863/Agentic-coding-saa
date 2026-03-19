# Feature Specification: Dropdown Profile (Regular User)

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Profile Dropdown is a small overlay triggered by clicking the user avatar in the Header. It provides two actions for regular (non-admin) users: navigate to the Profile page and Logout. The dropdown uses the shared dropdown design system with gold-accent selected states and dark background.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Logout (Priority: P1)

As an authenticated user, I want to log out from the application so that I can end my session securely.

**Why this priority**: Logout is a critical security function that must always be accessible.

**Independent Test**: Click avatar, verify dropdown appears with "Profile" and "Logout" items, click "Logout", verify Supabase signOut is called and user is redirected to /login.

**Acceptance Scenarios**:

1. **Given** the user clicks the avatar in the header, **When** the dropdown opens, **Then** it MUST display two items: "Profile" (with user icon) and "Logout" (with chevron-right icon).

2. **Given** the dropdown is open, **When** the user clicks "Logout", **Then** Supabase `signOut()` MUST be called, the session MUST be cleared, and the user MUST be redirected to `/login`.

3. **Given** the signOut call fails, **When** an error occurs, **Then** the system MUST display an error notification and NOT leave the user in an ambiguous auth state.

---

### User Story 2 - Navigate to Profile (Priority: P2)

As an authenticated user, I want to access my profile page so that I can view and manage my account information.

**Why this priority**: Profile navigation is important but secondary to logout functionality.

**Independent Test**: Click avatar, click "Profile", verify navigation to profile page.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks "Profile", **Then** the user MUST be navigated to the profile page and the dropdown MUST close.

2. **Given** the user is on the profile page, **When** they open the dropdown, **Then** the "Profile" item MUST show the active/selected state (gold-tinted background, gold glow text).

---

### Edge Cases

- What happens when the user clicks outside the dropdown? -> Close without action.
- What happens if the session has already expired when clicking Logout? -> Redirect to /login.
- What happens on mobile? -> Dropdown MUST be positioned to avoid viewport overflow.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dropdown Container | 666:9601 | Overlay with 2 items, dark bg, gold border | Open/close on avatar click |
| Profile Item | A.1 | User icon (24x24) + "Profile" text, active state | Click navigates to profile |
| Logout Item | A.2 | Chevron-right icon (24x24) + "Logout" text, default state | Click triggers signOut |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Header avatar (all authenticated pages)
- **To**: Profile page (`/profile`) or Login page (`/login` via logout)
- **Triggers**:
  - Click avatar -> Toggle dropdown
  - Click "Profile" -> Navigate to /profile, close dropdown
  - Click "Logout" -> signOut, redirect to /login
  - Click outside / Escape -> Close dropdown

### Visual Requirements

- **Animations/Transitions**: Dropdown open/close: opacity + translateY, 150ms ease-out
- **Accessibility**: `role="menu"` on container, `role="menuitem"` on items, `aria-expanded` on avatar trigger. Keyboard: Enter/Space to open, ArrowUp/Down to navigate, Enter to activate, Escape to close.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dropdown with "Profile" and "Logout" options when avatar is clicked.
- **FR-002**: "Logout" MUST call Supabase `signOut()` and redirect to `/login`.
- **FR-003**: "Profile" MUST navigate to the profile page.
- **FR-004**: Dropdown MUST close on item selection, outside click, or Escape key.

### Technical Requirements

- **TR-001**: Profile Dropdown MUST be a Client Component (`'use client'`).
- **TR-002**: Logout MUST use Supabase Auth client from `@/libs/supabase/client.ts`.
- **TR-003**: Navigation MUST use Next.js `useRouter` or `<Link>`.
- **TR-004**: No Node.js APIs — Cloudflare Workers compatible (constitution Principle VI).

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Dropdown visibility |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Verify authentication, determine role |

---

## Internationalization (i18n)

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `profile.menu.profile` | Profile | Profile |
| `profile.menu.logout` | Logout | Logout |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Logout completes and redirects within 2 seconds.
- **SC-002**: Dropdown keyboard navigation works per WCAG AA.
- **SC-003**: No auth state leaks after logout (session fully cleared).

---

## Out of Scope

- Admin-specific menu items (see Dropdown Profile Admin spec).
- Profile page content and editing.
- Avatar upload or customization within the dropdown.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Supabase Auth integration exists (`@/libs/supabase/client.ts`)
