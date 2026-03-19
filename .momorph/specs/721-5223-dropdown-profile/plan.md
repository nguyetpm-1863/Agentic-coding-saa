# Implementation Plan: Dropdown Profile

**Frame**: `721:5223-Dropdown-profile`
**Date**: 2026-03-09
**Spec**: `specs/721-5223-dropdown-profile/spec.md`

---

## Summary

Build the Profile Dropdown component for regular (non-admin) authenticated users. Triggered by clicking the user avatar in the Header, it displays two menu items: "Profile" (navigate to profile page) and "Logout" (Supabase signOut + redirect to /login). Uses the shared dropdown design system (dark bg, gold border, gold-accent states) and the shared `useDropdown` hook extracted in the Language Selector plan. The component conditionally renders as the admin variant when an `isAdmin` prop is provided (see Profile Admin plan).

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/navigation
**Database**: Supabase (auth.users — session verification)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: Local client state (isOpen via useDropdown hook), server-side session via Supabase Auth
**API Style**: Supabase Auth SDK (signOut)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases, naming)
- [x] Uses approved libraries and patterns (Supabase Auth, Tailwind, useRouter — no new deps)
- [x] Adheres to folder structure guidelines (shared component in `src/components/shared/`)
- [x] Meets security requirements (Principle IV: Supabase Auth for signOut, server-side session check)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined)
- [x] Server-first architecture (Principle I: isAdmin determined server-side, passed as prop)
- [x] Mobile-first responsive (Principle V: 56px touch targets > 44px minimum)
- [x] Edge-compatible (Principle VI: No Node.js APIs, Supabase SSR is edge-compatible)
- [x] Simplicity (Principle VII: Single component handles both regular and admin variants via props)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Single `<ProfileDropdown />` Client Component in `src/components/shared/profile-dropdown.tsx`. Accepts `isAdmin` prop to conditionally render the "Dashboard" item (admin variant). Uses the shared `useDropdown` hook for dropdown behavior.
- **Styling Strategy**: Tailwind CSS 4 with shared dropdown CSS custom properties from `globals.css`. Active/hover states use gold-accent tokens.
- **Data Fetching**: No client-side data fetching. User session and admin role determined server-side in Header Server Component and passed as props.

### Backend Approach

- **API Design**: No custom API endpoints. Uses Supabase Auth `signOut()` client-side.
- **Data Access**: `@/libs/supabase/client.ts` for browser-side signOut.
- **Validation**: Session verification happens server-side in middleware. No additional validation needed in the dropdown.

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/client.ts` — Browser client for `signOut()`
  - `@/libs/supabase/server.ts` — Server client for `getUser()` in Header
- **Shared Components**:
  - `useDropdown` hook from `src/hooks/use-dropdown.ts` (created in Language Selector plan)
  - Header component renders ProfileDropdown
- **API Contracts**: Supabase Auth built-in (no custom API spec needed)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5223-dropdown-profile/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # Codebase research findings
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── components/
│   └── shared/
│       └── profile-dropdown.tsx    # ProfileDropdown Client Component

# Modified Files
src/
├── components/
│   └── shared/
│       └── header.tsx              # Add avatar trigger + ProfileDropdown

# Assets
public/
└── images/
    └── icons/
        ├── user-icon.svg           # User profile icon (24x24)
        └── chevron-right.svg       # Logout chevron icon (24x24)

# Test Files
tests/
├── unit/
│   └── profile-dropdown.test.tsx   # Component unit tests
└── e2e/
    └── profile-dropdown.spec.ts    # Playwright E2E tests
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

---

## Implementation Strategy

### Phase 1: User Story 1 — Logout (P1, MVP)

**Purpose**: Core logout functionality — the security-critical path.

1. **Create `src/components/shared/profile-dropdown.tsx`** — ProfileDropdown Client Component
   - `'use client'` directive
   - Props: `isAdmin?: boolean`, `currentPath: string` (for active state detection)
   - Use `useDropdown` hook with `itemCount: isAdmin ? 3 : 2, role: 'menu'` (menu pattern, NOT listbox — Profile dropdown triggers actions/navigation, not value selection)
   - Avatar trigger button: user avatar or default icon, click toggles dropdown
   - Menu items as a `role="menu"` container with `role="menuitem"` items (note: no `aria-selected` on menu items — use `aria-current="page"` for active page indicator instead)
   - "Logout" item:
     - Icon: chevron-right (24x24, white)
     - Text: "Logout" (i18n key: `profile.menu.logout`)
     - On click: call `supabase.auth.signOut()`, then `router.push('/login')`
     - Handle signOut errors: display error notification, do not leave ambiguous auth state
   - Styling per `design-style.md`:
     - Container: `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5`
     - Items: `h-14 px-4 rounded flex items-center gap-2`
     - Default state: `bg-transparent text-white`
     - Hover state: `bg-[#FFEA9E]/10`
     - Typography: Montserrat 16px/24px bold, letter-spacing 0.15px

2. **Handle signOut error gracefully**:
   - Wrap `signOut()` in try/catch
   - On error: show brief error message (could use a simple state-based toast)
   - On success: redirect to `/login`
   - If session already expired, redirect to `/login` regardless

### Phase 2: User Story 2 — Navigate to Profile (P2)

**Purpose**: Profile page navigation with active state.

1. **Add "Profile" menu item**:
   - Icon: user icon (24x24, white)
   - Text: "Profile" (i18n key: `profile.menu.profile`)
   - On click: `router.push('/profile')`, close dropdown
   - Active state when `currentPath === '/profile'`:
     - Background: `rgba(255, 234, 158, 0.10)`
     - Text shadow: gold glow `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`

2. **Integrate with Header**:
   - Header Server Component fetches user session via `supabase.auth.getUser()`
   - Determines `isAdmin` from user metadata (e.g., `user.app_metadata.role === 'admin'`)
   - Passes `isAdmin` and `currentPath` props to ProfileDropdown
   - Avatar displays user's avatar image (from Supabase Auth metadata) or a default icon

### Phase 3: Polish

1. **Animations**: Open/close with opacity + translateY(-4px to 0), 150ms ease-out / 100ms ease-in
2. **Keyboard navigation**: `role="menu"` pattern — Enter/Space to open, ArrowUp/Down to navigate, Enter to activate, Escape to close. **Note**: Unlike `listbox` pattern (used by Language/Hashtag/Department), the `menu` pattern uses `aria-current="page"` instead of `aria-selected` for the active page indicator. The `useDropdown` hook handles this distinction via the `role` config parameter.
3. **Accessibility**: Focus indicators (outline: 2px solid #FFEA9E, offset: 2px), focus trap within menu when open
4. **Responsive**: Right-align dropdown on mobile to avoid viewport overflow
5. **i18n**: Use translation keys for "Profile" and "Logout" text

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| signOut fails on Cloudflare Workers | Low | High | `@supabase/ssr` is edge-compatible; test on `wrangler dev` |
| Session race condition (signOut + redirect) | Low | Med | Await signOut before redirecting; middleware handles expired sessions |
| Admin role metadata not yet defined in Supabase | Med | Med | Use a fallback `isAdmin: false` until schema is defined; profile dropdown works independently |
| Avatar image URL from OAuth may be slow | Low | Low | Use `next/image` with fallback to default icon |

### Estimated Complexity

- **Frontend**: Low — Single client component with 2-3 menu items
- **Backend**: None (uses existing Supabase Auth)
- **Testing**: Low — Focused on signOut flow and menu interaction

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: ProfileDropdown + useDropdown hook + Supabase Auth signOut
- [x] **External dependencies**: Supabase Auth (signOut)
- [ ] **Data layer**: N/A
- [x] **User workflows**: Open menu, click Logout, verify signOut + redirect

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Avatar click opens menu, Logout triggers signOut, Profile navigates |
| Service <-> Service | Yes | signOut call to Supabase Auth |
| App <-> External API | No | — |
| App <-> Data Layer | No | — |
| Cross-platform | Yes | Responsive positioning |

### Test Environment

- **Environment type**: Local (Vitest + jsdom for unit, Playwright for E2E)
- **Test data strategy**: Mock Supabase Auth client
- **Isolation approach**: Fresh DOM state per test, mocked router

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth client | Mock | Avoid real auth calls in unit tests |
| next/navigation (useRouter) | Mock | Standard Next.js testing pattern |
| useDropdown hook | Real | Test integration with actual hook |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Avatar click opens dropdown with "Profile" and "Logout" items
   - [ ] Click "Logout" calls signOut and redirects to /login
   - [ ] Click "Profile" navigates to /profile and closes dropdown
   - [ ] Active state shown on "Profile" when on /profile page

2. **Error Handling**
   - [ ] signOut failure shows error message, does not redirect
   - [ ] Expired session on Logout click still redirects to /login

3. **Edge Cases**
   - [ ] Outside click closes dropdown
   - [ ] Escape key closes dropdown, focus returns to avatar
   - [ ] Keyboard navigation through menu items
   - [ ] Dropdown positions correctly on mobile (no viewport overflow)

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: @testing-library/react, mock Supabase client
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| signOut flow | 95%+ | High |
| Menu interactions | 85%+ | High |
| Active state logic | 85%+ | Medium |
| Keyboard navigation | 90%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [x] API contracts defined — Supabase Auth built-in
- [ ] Database migrations planned — N/A (admin role metadata schema TBD)

### External Dependencies

- `useDropdown` hook from Language Selector plan (Phase 0) must be implemented first
- Icon assets (user-icon.svg, chevron-right.svg) need to be exported from Figma
- Header component must support avatar trigger slot

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation (depends on Language Selector Phase 0 completing first)

---

## Notes

- **Single component for both regular and admin variants**: The `ProfileDropdown` component accepts an `isAdmin` prop. When `true`, it renders the additional "Dashboard" item. This avoids code duplication and follows Principle VII (Simplicity). See the Profile Admin plan for details.
- **signOut redirect approach**: Using `router.push('/login')` after `signOut()` rather than `window.location.href` to stay within Next.js routing. The middleware will handle clearing any stale session cookies. **Caveat**: `router.push` performs a client-side navigation that may leave stale React state (e.g., cached server component data) in memory. If post-logout state leaks are observed during testing, fall back to `window.location.href = '/login'` for a full page load, which is simpler and guarantees clean state (Principle VII).
- **Avatar implementation**: The avatar trigger is part of the Header component. It should display the user's Google profile picture (from OAuth metadata) with a fallback to a default user icon. The avatar itself is not a dropdown concern — the dropdown attaches to whatever trigger element the Header provides.
