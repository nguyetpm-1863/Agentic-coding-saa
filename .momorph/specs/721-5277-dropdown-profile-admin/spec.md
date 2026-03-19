# Feature Specification: Dropdown Profile Admin

**Frame ID**: `721:5277`
**Frame Name**: `Dropdown-profile Admin`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Admin Profile Dropdown extends the regular Profile Dropdown with an additional "Dashboard" menu item. It is displayed when the authenticated user has an admin role (determined server-side from Supabase auth metadata). The dropdown provides three actions: navigate to Profile, navigate to Admin Dashboard, and Logout.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access Admin Dashboard (Priority: P1)

As an admin user, I want quick access to the admin dashboard from any page so that I can manage the application.

**Why this priority**: Dashboard access is the primary differentiator of the admin dropdown.

**Independent Test**: Log in as admin, click avatar, verify dropdown shows 3 items including "Dashboard", click "Dashboard", verify navigation to admin dashboard.

**Acceptance Scenarios**:

1. **Given** the user is authenticated with admin role, **When** they click the avatar, **Then** the dropdown MUST display three items: "Profile", "Dashboard", and "Logout".

2. **Given** the dropdown is open, **When** the user clicks "Dashboard", **Then** the user MUST be navigated to the admin dashboard page and the dropdown MUST close.

3. **Given** the user does NOT have admin role, **When** they click the avatar, **Then** the regular 2-item dropdown MUST be shown (NOT the admin version).

---

### User Story 2 - Logout (Priority: P2)

As an admin user, I want to log out securely so that my admin session is ended.

**Why this priority**: Security-critical function.

**Independent Test**: Click avatar, click "Logout", verify signOut and redirect.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks "Logout", **Then** Supabase `signOut()` MUST be called, the session MUST be cleared, and the user MUST be redirected to `/login`.

---

### User Story 3 - Navigate to Profile (Priority: P3)

As an admin user, I want to access my profile page from the dropdown.

**Why this priority**: Profile access is supplementary to admin-specific functionality.

**Independent Test**: Click avatar, click "Profile", verify navigation.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks "Profile", **Then** the user MUST be navigated to the profile page and the dropdown MUST close.

---

### Edge Cases

- What happens if the admin role is revoked while the user is logged in? -> The next server-side check MUST use the regular dropdown. Client-side should re-fetch role on dropdown open if possible.
- What happens when clicking outside? -> Close without action.
- What happens on mobile? -> Dropdown positioned to avoid overflow, all items remain accessible.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dropdown Container | 666:9728 | Overlay with 3 items | Open/close on avatar click |
| Profile Item | A.1 | User icon + "Profile" text, active state | Click navigates to profile |
| Dashboard Item | A.2 | Dashboard grid icon (24x24) + "Dashboard" text, default state | Click navigates to admin dashboard |
| Logout Item | A.3 | Chevron-right icon (24x24) + "Logout" text, default state | Click triggers signOut |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Header avatar (all authenticated pages, admin users only)
- **To**: Profile page, Admin Dashboard, or Login page (via logout)
- **Triggers**:
  - Click avatar -> Toggle dropdown
  - Click "Profile" -> Navigate to /profile
  - Click "Dashboard" -> Navigate to /admin/dashboard
  - Click "Logout" -> signOut, redirect to /login
  - Click outside / Escape -> Close dropdown

### Visual Requirements

- **Accessibility**: `role="menu"` on container, `role="menuitem"` on items, `aria-expanded` on avatar trigger. Keyboard: Enter/Space to open, ArrowUp/Down to navigate, Enter to activate, Escape to close.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the admin dropdown (3 items) ONLY for users with admin role.
- **FR-002**: Admin role MUST be determined server-side from Supabase auth metadata.
- **FR-003**: "Dashboard" MUST navigate to the admin dashboard page.
- **FR-004**: "Logout" MUST call Supabase `signOut()` and redirect to `/login`.
- **FR-005**: "Profile" MUST navigate to the profile page.

### Technical Requirements

- **TR-001**: Admin role check MUST happen server-side (Server Component or server action). The role flag can be passed as a prop to the Client Component.
- **TR-002**: The admin and regular dropdowns SHOULD share the same base component, conditionally rendering the "Dashboard" item.
- **TR-003**: No Node.js APIs — Cloudflare Workers compatible (constitution Principle VI).

---

## State Management

### Local State (Client Component)

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Dropdown visibility |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| isAdmin | Supabase Auth metadata | Determines whether to show admin dropdown |
| User session | Supabase Auth (cookies) | Verify authentication |

---

## Internationalization (i18n)

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `profile.menu.profile` | Profile | Profile |
| `profile.menu.dashboard` | Dashboard | Dashboard |
| `profile.menu.logout` | Logout | Logout |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admin dropdown shows 3 items; regular dropdown shows 2 items.
- **SC-002**: Non-admin users MUST NOT see the "Dashboard" item under any circumstances.
- **SC-003**: Logout and navigation complete within 2 seconds.

---

## Out of Scope

- Admin dashboard page content.
- Role management UI.
- Multi-level admin roles (only single admin role supported).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Supabase Auth integration exists
- [ ] Admin role defined in Supabase auth metadata schema
