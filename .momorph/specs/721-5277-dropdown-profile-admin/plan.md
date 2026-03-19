# Implementation Plan: Dropdown Profile Admin

**Frame**: `721:5277-Dropdown-profile-Admin`
**Date**: 2026-03-09
**Spec**: `specs/721-5277-dropdown-profile-admin/spec.md`

---

## Summary

The Admin Profile Dropdown extends the regular Profile Dropdown with a third "Dashboard" menu item. Rather than building a separate component, this plan describes how the existing `<ProfileDropdown />` component (from the regular Profile Dropdown plan) is extended via an `isAdmin` prop to conditionally render the Dashboard item. The admin role is determined server-side from Supabase auth metadata and passed as a prop — non-admin users never see the Dashboard option. This plan focuses on the admin-specific additions: the Dashboard menu item, server-side role detection, and security enforcement.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/navigation
**Database**: Supabase (auth.users — app_metadata for admin role)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: Server-side role determination, local client state via useDropdown hook
**API Style**: Supabase Auth SDK

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (Supabase Auth metadata for role, no new deps)
- [x] Adheres to folder structure guidelines (extends shared component in `src/components/shared/`)
- [x] Meets security requirements (Principle IV: Role determined server-side only, never trust client)
- [x] Follows testing standards (Principle III: TDD, role-based scenarios defined)
- [x] Server-first architecture (Principle I: Role check in Server Component, passed as prop)
- [x] Mobile-first responsive (Principle V: 56px touch targets > 44px)
- [x] Edge-compatible (Principle VI: No Node.js APIs)
- [x] Simplicity (Principle VII: Extends existing component via prop, no separate component)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: No new component. The `<ProfileDropdown />` from `src/components/shared/profile-dropdown.tsx` accepts `isAdmin?: boolean`. When `true`, a "Dashboard" item is inserted between "Profile" and "Logout".
- **Styling Strategy**: Dashboard item uses the same default-state styles as other menu items. Active state (when on /admin/dashboard) uses gold-accent background + text glow, identical to the Profile active state.
- **Data Fetching**: Admin role fetched server-side in Header via `supabase.auth.getUser()` -> `user.app_metadata.role`.

### Backend Approach

- **API Design**: No custom endpoints. Admin role stored in Supabase `auth.users.app_metadata`.
- **Data Access**: Server-side read of `app_metadata.role` via `@/libs/supabase/server.ts`.
- **Validation**: Role is NEVER sent from the client or read from client-accessible metadata. Only `app_metadata` (server-controlled) is trusted.

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/server.ts` — Server client for `getUser()` to read admin role
  - `<ProfileDropdown />` — Extended with `isAdmin` prop
- **Shared Components**:
  - `useDropdown` hook (itemCount dynamically set to 2 or 3 based on isAdmin, `role: 'menu'` — same as regular Profile Dropdown)
  - Header Server Component determines role and passes prop
- **API Contracts**: Supabase `app_metadata` schema: `{ role?: 'admin' }`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5277-dropdown-profile-admin/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # Codebase research findings
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# Modified Files
src/
├── components/
│   └── shared/
│       ├── profile-dropdown.tsx    # Add conditional "Dashboard" item
│       └── header.tsx              # Add isAdmin prop determination

# Assets
public/
└── images/
    └── icons/
        └── dashboard-grid.svg      # Dashboard grid icon (24x24)

# Test Files
tests/
├── unit/
│   └── profile-dropdown-admin.test.tsx  # Admin-specific unit tests
└── e2e/
    └── profile-dropdown-admin.spec.ts   # Admin E2E tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

---

## Implementation Strategy

### Phase 1: Server-Side Role Detection

**Purpose**: Securely determine admin role server-side.

1. **Update Header Server Component** (`src/components/shared/header.tsx`):
   - After `supabase.auth.getUser()`, extract `isAdmin` from `user.app_metadata.role === 'admin'`
   - Pass `isAdmin` as prop to `<ProfileDropdown />`
   - Fallback: `isAdmin = false` if `app_metadata.role` is missing or not `'admin'`

2. **Security enforcement**:
   - `isAdmin` MUST come from `app_metadata` (set only by server/admin API), NOT `user_metadata` (editable by user)
   - The prop is purely for UI rendering — all admin routes must independently verify role server-side via middleware or page-level checks

### Phase 2: User Story 1 — Access Admin Dashboard (P1)

**Purpose**: Add Dashboard menu item for admin users.

1. **Extend `<ProfileDropdown />`**:
   - Accept `isAdmin?: boolean` prop (defaults to `false`)
   - Define menu items array dynamically:
     ```typescript
     const menuItems = [
       { key: 'profile', label: t('profile.menu.profile'), icon: UserIcon, href: '/profile' },
       ...(isAdmin ? [{ key: 'dashboard', label: t('profile.menu.dashboard'), icon: DashboardGridIcon, href: '/admin/dashboard' }] : []),
       { key: 'logout', label: t('profile.menu.logout'), icon: ChevronRightIcon, action: handleLogout },
     ];
     ```
   - Pass `itemCount: menuItems.length` to `useDropdown` hook
   - Dashboard item: click navigates to `/admin/dashboard` via `router.push()`

2. **Active state logic**:
   - "Profile" is active when `currentPath === '/profile'`
   - "Dashboard" is active when `currentPath.startsWith('/admin')`
   - Active item: `bg-[#FFEA9E]/10` + gold text shadow

3. **Icon**: Dashboard grid icon (24x24px, white SVG)

### Phase 3: User Story 2 & 3 — Logout + Profile Navigation (P2, P3)

**Purpose**: Already implemented in regular Profile Dropdown plan. Verify they work with 3 items.

1. Verify keyboard navigation works with 3 items (ArrowDown/Up wrapping)
2. Verify all 3 items are accessible via keyboard
3. Verify signOut works identically for admin users

### Phase 4: Polish

1. **Security test**: Verify non-admin users NEVER see "Dashboard" item, even if client-side prop is tampered
2. **Role revocation**: If admin role is removed mid-session, next page load re-checks server-side and renders regular dropdown
3. **Responsive**: 3-item dropdown still fits on mobile; right-aligned positioning

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Admin role not yet defined in Supabase schema | High | Med | Component works with `isAdmin: false` by default; can be enabled later |
| Client-side prop tampering to show Dashboard | Low | High | Dashboard route itself must verify admin role server-side; dropdown is cosmetic |
| Role revocation not reflected immediately | Med | Low | Next page load re-fetches from server; acceptable latency per spec |

### Estimated Complexity

- **Frontend**: Low — Adding one conditional menu item to existing component
- **Backend**: Low — Reading existing `app_metadata` field
- **Testing**: Low — Role-based conditional rendering tests

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: ProfileDropdown with isAdmin=true showing 3 items
- [x] **External dependencies**: Supabase Auth metadata
- [ ] **Data layer**: N/A
- [x] **User workflows**: Admin opens menu, sees Dashboard, navigates to admin dashboard

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | isAdmin=true shows 3 items, isAdmin=false shows 2 items |
| Service <-> Service | Yes | Server-side role check from Supabase Auth |
| App <-> External API | No | — |
| App <-> Data Layer | No | — |
| Cross-platform | Yes | Responsive with 3 items |

### Test Environment

- **Environment type**: Local (Vitest + jsdom for unit, Playwright for E2E)
- **Test data strategy**: Mock Supabase Auth user with/without admin role in app_metadata
- **Isolation approach**: Fresh DOM state per test

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth (getUser) | Mock | Control app_metadata.role in tests |
| next/navigation | Mock | Standard Next.js testing pattern |
| useDropdown hook | Real | Test integration with actual hook |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Admin user sees 3 items: Profile, Dashboard, Logout
   - [ ] Non-admin user sees 2 items: Profile, Logout
   - [ ] Click Dashboard navigates to /admin/dashboard
   - [ ] Dashboard item shows active state on admin pages

2. **Error Handling**
   - [ ] Missing app_metadata.role defaults to non-admin dropdown
   - [ ] Invalid role value defaults to non-admin dropdown

3. **Edge Cases**
   - [ ] Role revocation: admin sees regular dropdown on next page load
   - [ ] Keyboard navigation wraps correctly with 3 items
   - [ ] Dashboard item not in DOM for non-admin (not just hidden)

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Role-based rendering | 95%+ | High |
| Dashboard navigation | 85%+ | High |
| Security (non-admin exclusion) | 100% | Critical |
| Keyboard navigation (3 items) | 90%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined — `app_metadata.role` schema
- [ ] Database migrations planned — Admin role assignment mechanism TBD

### External Dependencies

- Regular Profile Dropdown (`profile-dropdown.tsx`) must be implemented first
- `useDropdown` hook from Language Selector plan (Phase 0) must exist
- Admin role must be assignable in Supabase (via admin API or dashboard)
- Dashboard grid icon SVG must be exported from Figma

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation (depends on Profile Dropdown completing first)

---

## Notes

- **Security is the top priority**: The Dashboard menu item is cosmetic. The actual `/admin/dashboard` route MUST independently verify admin role server-side. This dropdown plan does NOT provide admin route protection — that belongs to the admin dashboard feature spec.
- **Single component, not two**: Following Principle VII (Simplicity), there is one `<ProfileDropdown />` component that conditionally renders based on `isAdmin`. There is no `<AdminProfileDropdown />` component.
- **`app_metadata` vs `user_metadata`**: Supabase's `app_metadata` can only be modified by server-side admin calls (or the Supabase dashboard). `user_metadata` can be modified by the user themselves. Admin role MUST use `app_metadata` to prevent privilege escalation.
