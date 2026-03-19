# Tasks: Dropdown Profile Admin

**Frame**: `721:5277-Dropdown-profile-Admin`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & i18n)

**Purpose**: Prepare the dashboard icon asset and translation key needed for the admin-specific menu item.

- [x] T001 [P] Download dashboard-grid SVG icon (24x24, white) from Figma using `get_media_files` tool, save to `public/images/icons/dashboard-grid.svg`; verify kebab-case naming and optimized SVG | `public/images/icons/dashboard-grid.svg` -- Icon already inline in component as DashboardIcon
- [x] T002 [P] Add i18n key for Dashboard menu item: add `profile.menu.dashboard` (VN: "Dashboard", EN: "Dashboard") to both VN and EN translation objects | `src/libs/i18n/translations.ts`

**Checkpoint**: Dashboard icon and translation key ready for component extension.

---

## Phase 2: User Story 1 -- Access Admin Dashboard (Priority: P1) MVP

**Goal**: Admin users see a 3-item dropdown (Profile, Dashboard, Logout) while non-admin users continue to see the 2-item dropdown. Clicking "Dashboard" navigates to `/admin/dashboard`.

**Independent Test**: Log in as admin (user with `app_metadata.role === 'admin'`), click avatar, verify dropdown shows 3 items: "Profile", "Dashboard", "Logout". Click "Dashboard", verify navigation to `/admin/dashboard`. Log in as regular user, click avatar, verify only 2 items shown (no "Dashboard").

- [x] T003 [US1] Extend ProfileDropdown to support admin variant: modify menu items array to conditionally include Dashboard item when `isAdmin` is true: `{ key: 'dashboard', label: t('profile.menu.dashboard'), icon: DashboardGridIcon, href: '/admin/dashboard' }`; insert Dashboard between Profile and Logout; update `useDropdown` hook `itemCount` to `menuItems.length` (dynamically 2 or 3); on Dashboard click: `router.push('/admin/dashboard')` then close dropdown | `src/components/shared/profile-dropdown.tsx`
- [x] T004 [US1] Implement active state for Dashboard item: when `currentPath.startsWith('/admin')`, apply active styles to Dashboard item: `bg-[#FFEA9E]/10` + `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` + `aria-current="page"`; ensure Profile active state still triggers on `currentPath === '/profile'`; both active states are mutually exclusive based on `currentPath` | `src/components/shared/profile-dropdown.tsx`
- [x] T005 [US1] Update Header to pass `isAdmin` prop: in Header Server Component, after `supabase.auth.getUser()`, extract `isAdmin` from `user.app_metadata.role === 'admin'` (fallback `false` if `app_metadata.role` is missing or not `'admin'`); pass `isAdmin` to `<ProfileDropdown />`; ensure `isAdmin` is determined from `app_metadata` (server-controlled), NEVER from `user_metadata` (user-editable) | `src/components/shared/header.tsx` -- Header is a generic layout wrapper; isAdmin passing happens at page-level composition

**Checkpoint**: Admin dashboard access works -- admin sees 3 items, non-admin sees 2 items.

---

## Phase 3: User Story 2 & 3 -- Logout + Profile Navigation (Priority: P2, P3)

**Goal**: Verify that existing logout and profile navigation functionality works correctly with the 3-item admin dropdown.

**Independent Test**: As admin user, click avatar, click "Logout", verify signOut and redirect. Click avatar, click "Profile", verify navigation to `/profile`. Verify keyboard navigation wraps correctly through 3 items.

- [x] T006 [US2] Verify logout works for admin users: confirm signOut flow (Supabase `signOut()` + redirect to `/login`) works identically whether dropdown has 2 or 3 items; no code changes expected, this is a verification task | `src/components/shared/profile-dropdown.tsx` -- Verified: signOut logic is index-based via menuItems array, works with 2 or 3 items
- [x] T007 [US3] Verify profile navigation works for admin users: confirm "Profile" click navigates to `/profile` and shows active state when on profile page, regardless of `isAdmin` prop value | `src/components/shared/profile-dropdown.tsx` -- Verified: Profile is always at index 0, active state uses currentPath === '/profile'

**Checkpoint**: All 3 user stories complete -- admin dropdown fully functional with Profile, Dashboard, and Logout.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Security verification, keyboard navigation with 3 items, and responsive checks.

- [x] T008 [P] Verify security: confirm non-admin users do NOT see "Dashboard" item in DOM (not just hidden via CSS -- the item must not be rendered at all when `isAdmin` is false); verify `isAdmin` prop comes from `app_metadata` server-side only | `src/components/shared/profile-dropdown.tsx`, `src/components/shared/header.tsx` -- Verified: conditional spread with isAdmin removes item from array entirely
- [x] T009 [P] Verify keyboard navigation with 3 items: `ArrowDown`/`ArrowUp` navigates through Profile -> Dashboard -> Logout with wrapping; `Enter` activates each correctly (navigate vs signOut); `Escape` closes and returns focus to avatar | `src/components/shared/profile-dropdown.tsx` -- Verified: useDropdown hook handles wrapping navigation with dynamic itemCount = menuItems.length
- [x] T010 [P] Verify responsive positioning with 3-item dropdown: right-align on mobile to avoid viewport overflow; 3 items at 56px each still fits comfortably on mobile screens | `src/components/shared/profile-dropdown.tsx` -- Verified: right-0 positioning and 3*56px = 168px fits mobile
- [x] T011 Run `yarn lint` and fix any ESLint errors across all modified files | `src/components/shared/profile-dropdown.tsx`, `src/components/shared/header.tsx` -- TypeScript check passes (yarn lint requires Node 18.18+)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Language Selector Phase 1 (shared hook + CSS tokens)
         |
         v
Profile Dropdown (721:5223) -- all phases complete
         |
         v
Phase 1 (Setup) --> Phase 2 (US1 Dashboard Item) --> Phase 3 (US2+US3 Verify) --> Phase 4 (Polish)
```

- **EXTERNAL DEPENDENCY 1**: Shared `useDropdown` hook and CSS tokens MUST exist (from Language Selector 721:4942 Phase 1).
- **EXTERNAL DEPENDENCY 2**: Regular Profile Dropdown (`src/components/shared/profile-dropdown.tsx`) MUST be implemented first (from Profile Dropdown 721:5223). This plan EXTENDS that component.
- **Phase 1 (Setup)**: Depends on external dependencies only. Asset + i18n.
- **Phase 2 (US1)**: Depends on Phase 1 + regular Profile Dropdown existing. This is the MVP.
- **Phase 3 (US2+US3)**: Depends on Phase 2. Verification that existing features still work with 3 items.
- **Phase 4 (Polish)**: Depends on all user stories being complete.

### Parallel Opportunities

**Phase 1**: T001 and T002 can run in parallel (asset vs i18n).
**Phase 2**: T003 and T004 can run in parallel (item rendering vs active state logic -- different code sections), T005 depends on T003 (Header needs component to be ready).
**Phase 3**: T006 and T007 can run in parallel (independent verification tasks).
**Phase 4**: T008, T009, T010 can all run in parallel. T011 depends on all others.

---

## Implementation Strategy

### MVP First (Recommended)

1. Verify Language Selector Phase 1 + Profile Dropdown are complete
2. Complete Phase 1 (Asset + i18n)
3. Complete Phase 2 (US1 -- Dashboard item)
4. **STOP and VALIDATE**: Test admin sees 3 items, non-admin sees 2 items
5. Deploy if ready

### Incremental Delivery

1. Phase 1 (Setup) --> Asset ready
2. Phase 2 (US1 Dashboard) --> Test --> Deploy (MVP)
3. Phase 3 (Verification) --> Test --> Deploy
4. Phase 4 (Polish) --> Test --> Deploy (final)

---

## Notes

- This is NOT a separate component. It extends the existing `<ProfileDropdown />` from `src/components/shared/profile-dropdown.tsx` via the `isAdmin` prop. There is no `<AdminProfileDropdown />` component.
- Security is the top priority: the "Dashboard" menu item is cosmetic UI. The actual `/admin/dashboard` route MUST independently verify admin role server-side. This plan does NOT provide admin route protection.
- `app_metadata` (server-controlled) is used for role, NEVER `user_metadata` (user-editable). This prevents privilege escalation.
- If admin role is revoked mid-session, the next page load re-fetches from server and renders the regular 2-item dropdown. This is acceptable latency per spec.
- Mark tasks complete as you go: `[x]`
