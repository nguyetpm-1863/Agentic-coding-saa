# Tasks: Dropdown Profile

**Frame**: `721:5223-Dropdown-profile`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & Types)

**Purpose**: Prepare icon assets and define component interface before building the dropdown.

- [x] T001 [P] Download user-icon SVG (24x24, white) from Figma using `get_media_files` tool, save to `public/images/icons/user-icon.svg`; download chevron-right SVG (24x24, white), save to `public/images/icons/chevron-right.svg`; verify both are kebab-case and optimized | `public/images/icons/`
- [x] T002 [P] Add i18n keys for Profile dropdown: add `profile.menu.profile` (VN: "Profile", EN: "Profile") and `profile.menu.logout` (VN: "Logout", EN: "Logout") to both VN and EN translation objects | `src/libs/i18n/translations.ts`

**Checkpoint**: Assets and translation keys ready for component implementation.

---

## Phase 2: User Story 1 -- Logout (Priority: P1) MVP

**Goal**: Authenticated user can open the profile dropdown from the header avatar and log out securely. Supabase `signOut()` is called and user is redirected to `/login`.

**Independent Test**: Click the avatar in the header, verify dropdown appears with "Profile" and "Logout" items. Click "Logout", verify Supabase signOut is called and user is redirected to `/login`. Verify signOut error shows error message.

- [x] T003 [US1] Create ProfileDropdown Client Component: `'use client'` directive; accept props `isAdmin?: boolean`, `currentPath: string`; use `useDropdown` hook with `{ itemCount: isAdmin ? 3 : 2, role: 'menu' }` (menu pattern, NOT listbox); define menu items array with "Profile" (user-icon, href `/profile`) and "Logout" (chevron-right icon, action `handleLogout`); render avatar trigger button that toggles dropdown; render dropdown container: `absolute z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col`; render each item: `h-14 px-4 rounded flex items-center gap-2 cursor-pointer`; default state: `bg-transparent text-white`; hover state: `bg-[#FFEA9E]/10 transition-colors duration-150 ease-in-out`; typography: `font-montserrat text-base font-bold tracking-[0.15px]`; icons: 24x24 white SVG via `next/image` or inline SVG | `src/components/shared/profile-dropdown.tsx`
- [x] T004 [US1] Implement logout handler in ProfileDropdown: wrap `supabase.auth.signOut()` in try/catch using browser client from `@/libs/supabase/client.ts`; on success: `router.push('/login')`; on error: set local `errorMessage` state, display briefly, do NOT redirect; if session already expired, redirect to `/login` regardless; prevent double-click by tracking `isLoggingOut` loading state | `src/components/shared/profile-dropdown.tsx`
- [x] T005 [US1] Add open/close animation to ProfileDropdown: render dropdown list when `isOpen || isClosing` is true; apply `animate-dropdown-open` when `isOpen && !isClosing`; apply `animate-dropdown-close` when `isClosing` | `src/components/shared/profile-dropdown.tsx`

**Checkpoint**: User Story 1 complete -- logout flow works end-to-end with proper error handling.

---

## Phase 3: User Story 2 -- Navigate to Profile (Priority: P2)

**Goal**: User can navigate to the profile page from the dropdown. Active state is shown when on the `/profile` page.

**Independent Test**: Click avatar, click "Profile", verify navigation to `/profile` and dropdown closes. Open dropdown while on `/profile` page, verify "Profile" item shows active state (gold-tinted bg + gold glow text).

- [x] T006 [US2] Implement Profile navigation: on "Profile" item click, call `router.push('/profile')` then close dropdown; implement active state detection: when `currentPath === '/profile'`, apply active styles to Profile item: `bg-[#FFEA9E]/10` + `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`; use `aria-current="page"` on active item (menu pattern, not `aria-selected`) | `src/components/shared/profile-dropdown.tsx`
- [x] T007 [US2] Integrate ProfileDropdown with Header: in Header Server Component, fetch user session via `supabase.auth.getUser()`; extract `isAdmin` from `user.app_metadata.role === 'admin'` (fallback `false`); get `currentPath` from request or pass via props; render user avatar (Google profile picture from OAuth metadata via `next/image`, fallback to default user icon); render `<ProfileDropdown isAdmin={isAdmin} currentPath={currentPath} />` anchored to avatar | `src/components/shared/header.tsx`

**Checkpoint**: User Stories 1 & 2 complete -- logout and profile navigation both work from the dropdown.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Keyboard accessibility, responsive adjustments, and final refinements.

- [x] T008 [P] Apply ARIA attributes from `useDropdown` hook: spread `triggerProps` on avatar button (`aria-expanded`, `aria-haspopup="menu"`); spread `listProps` on dropdown container (`role="menu"`); spread `getItemProps(index)` on each item (`role="menuitem"`, `tabIndex`); add `aria-label="User menu"` on trigger | `src/components/shared/profile-dropdown.tsx`
- [x] T009 [P] Verify keyboard navigation: `Enter`/`Space` on avatar opens menu; `ArrowDown`/`ArrowUp` navigates items with wrapping; `Enter` on item activates it (navigate or logout); `Escape` closes menu and returns focus to avatar | `src/components/shared/profile-dropdown.tsx`
- [x] T010 [P] Add focus indicators: `outline-2 outline-offset-2 outline-[#FFEA9E]` on focus-visible for avatar trigger and all menu items | `src/components/shared/profile-dropdown.tsx`
- [x] T011 [P] Verify responsive positioning: dropdown right-aligns on mobile to avoid viewport overflow; all touch targets are 56px height (exceeds 44px minimum) | `src/components/shared/profile-dropdown.tsx`
- [x] T012 Run `yarn lint` and fix any ESLint errors across all new/modified files | `src/components/shared/profile-dropdown.tsx`, `src/components/shared/header.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Language Selector Phase 1 (shared hook + CSS tokens)
         |
         v
Phase 1 (Setup) --> Phase 2 (US1 Logout MVP) --> Phase 3 (US2 Profile Nav) --> Phase 4 (Polish)
```

- **EXTERNAL DEPENDENCY**: Shared `useDropdown` hook (`src/hooks/use-dropdown.ts`) and dropdown CSS tokens in `globals.css` MUST exist before starting. These are created in the Language Selector tasks (721:4942) Phase 1.
- **Phase 1 (Setup)**: Depends on shared infrastructure only. Asset download + i18n keys.
- **Phase 2 (US1)**: Depends on Phase 1 (assets must exist). This is the MVP.
- **Phase 3 (US2)**: Depends on Phase 2 (component must exist to add profile navigation + Header integration).
- **Phase 4 (Polish)**: Depends on all user stories being complete.

### Parallel Opportunities

**Phase 1**: T001 and T002 can run in parallel (assets vs translations).
**Phase 2**: T003 must complete first, then T004 (logout handler), then T005 (animation). T004 and T005 could run in parallel since they modify different aspects.
**Phase 3**: T006 and T007 are sequential (component logic first, then Header integration).
**Phase 4**: T008, T009, T010, T011 can all run in parallel. T012 depends on all others.

---

## Implementation Strategy

### MVP First (Recommended)

1. Verify Language Selector Phase 1 is complete (shared hook exists)
2. Complete Phase 1 (Assets + i18n)
3. Complete Phase 2 (US1 -- Logout)
4. **STOP and VALIDATE**: Test logout flow end-to-end
5. Deploy if ready -- users can log out

### Incremental Delivery

1. Phase 1 (Setup) --> Assets ready
2. Phase 2 (US1 Logout) --> Test --> Deploy (MVP)
3. Phase 3 (US2 Profile Nav) --> Test --> Deploy
4. Phase 4 (Polish) --> Test --> Deploy (final)

---

## Notes

- The ProfileDropdown is a single component that handles BOTH regular and admin variants via the `isAdmin` prop. The admin-specific "Dashboard" item is added in the Profile Admin tasks (721:5277).
- Uses `role="menu"` pattern (not `listbox`) because the dropdown triggers actions/navigation, not value selection. This means `aria-current="page"` for active state instead of `aria-selected`.
- `router.push('/login')` is used for post-logout redirect. If stale React state is observed during testing, fall back to `window.location.href = '/login'` for a full page load.
- The avatar trigger is part of Header integration (T007). The avatar displays the user's Google profile picture with a fallback to the default user icon.
- Mark tasks complete as you go: `[x]`
