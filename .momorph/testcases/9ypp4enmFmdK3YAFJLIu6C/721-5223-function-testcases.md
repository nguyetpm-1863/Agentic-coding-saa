# FUNCTION Test Cases - Dropdown Profile (Regular User)

## FUN-001: Click "Profile" navigates to profile page
- **Objective:** Verify clicking "Profile" navigates user to /profile
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar. 2. Click "Profile" item.
- **Expected:** User is navigated to the profile page (/profile). Dropdown closes. Page loads correctly.
- **Specs:** A.1
- **Priority:** High

## FUN-002: Profile active indicator on profile page
- **Objective:** Verify "Profile" item shows active state when user is on profile page
- **Precondition:** User is authenticated and on /profile.
- **Steps:** 1. Navigate to /profile. 2. Click the avatar to open dropdown.
- **Expected:** "Profile" item displays with active state: gold-tinted background and gold glow text shadow.
- **Specs:** A.1
- **Priority:** Medium

## FUN-003: Profile not active on other pages
- **Objective:** Verify "Profile" item does NOT show active state on non-profile pages
- **Precondition:** User is authenticated and on the home page (not /profile).
- **Steps:** 1. Navigate to a non-profile page. 2. Click the avatar.
- **Expected:** "Profile" item displays in default state (transparent background, no gold glow).
- **Specs:** A.1
- **Priority:** Medium

## FUN-004: Click "Logout" performs signOut and redirects
- **Objective:** Verify clicking "Logout" calls Supabase signOut() and redirects to /login
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar. 2. Click "Logout" item.
- **Expected:** Supabase signOut() is called. Session is cleared. User is redirected to /login. Dropdown closes.
- **Specs:** A.2
- **Priority:** High

## FUN-005: Logout completes within 2 seconds
- **Objective:** Verify logout redirects within performance threshold
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar. 2. Click "Logout". 3. Measure time until /login is displayed.
- **Expected:** Redirect to /login completes within 2 seconds.
- **Specs:** A.2
- **Priority:** High

## FUN-006: Session fully cleared after logout
- **Objective:** Verify no auth state leaks remain after logout
- **Precondition:** User has just logged out.
- **Steps:** 1. Log out via dropdown. 2. Navigate to a protected page via URL.
- **Expected:** User is redirected to /login. No auto-login occurs. Protected content is not accessible.
- **Specs:** A.2
- **Priority:** High

## FUN-007: Logout error handling - signOut failure
- **Objective:** Verify behavior when Supabase signOut() call fails
- **Precondition:** User is authenticated. signOut() will fail (network error or API error).
- **Steps:** 1. Simulate signOut() failure (e.g., disconnect network). 2. Click avatar. 3. Click "Logout".
- **Expected:** An error notification is displayed. User is NOT left in an ambiguous auth state.
- **Specs:** A.2
- **Priority:** High

## FUN-008: Logout when session already expired
- **Objective:** Verify logout behavior when session has already expired
- **Precondition:** User's session token has expired.
- **Steps:** 1. Wait for session to expire. 2. Click avatar. 3. Click "Logout".
- **Expected:** User is redirected to /login. No error occurs.
- **Specs:** A.2
- **Priority:** Medium

## FUN-009: Dropdown toggle behavior
- **Objective:** Verify avatar click toggles dropdown open and close
- **Precondition:** User is authenticated.
- **Steps:** 1. Click avatar (dropdown opens). 2. Click avatar again (dropdown closes). 3. Click avatar again (dropdown opens).
- **Expected:** Dropdown toggles correctly on each click.
- **Specs:** A
- **Priority:** Medium

## FUN-010: Close dropdown on outside click
- **Objective:** Verify dropdown closes when clicking outside
- **Precondition:** Dropdown is open.
- **Steps:** 1. Click on any area outside the dropdown and avatar.
- **Expected:** Dropdown closes. No navigation or action occurs.
- **Specs:** A
- **Priority:** High

## FUN-011: Close dropdown on Escape key
- **Objective:** Verify dropdown closes when Escape key is pressed
- **Precondition:** Dropdown is open.
- **Steps:** 1. Press the Escape key.
- **Expected:** Dropdown closes. Focus returns to the avatar trigger.
- **Specs:** A
- **Priority:** High

## FUN-012: Keyboard - ArrowDown navigation
- **Objective:** Verify ArrowDown moves focus between menu items
- **Precondition:** Dropdown is open via keyboard.
- **Steps:** 1. Open dropdown via keyboard. 2. Press ArrowDown.
- **Expected:** Focus moves from "Profile" to "Logout". ArrowDown on last item wraps to first or stops.
- **Specs:** A.1, A.2
- **Priority:** Medium

## FUN-013: Keyboard - ArrowUp navigation
- **Objective:** Verify ArrowUp moves focus between menu items
- **Precondition:** Dropdown is open. Focus is on "Logout".
- **Steps:** 1. Open dropdown. 2. Navigate to "Logout". 3. Press ArrowUp.
- **Expected:** Focus moves from "Logout" to "Profile".
- **Specs:** A.1, A.2
- **Priority:** Medium

## FUN-014: Keyboard - Enter activates focused item
- **Objective:** Verify pressing Enter on a focused menu item activates it
- **Precondition:** Dropdown is open. "Profile" is focused.
- **Steps:** 1. Open dropdown. 2. Focus on "Profile". 3. Press Enter.
- **Expected:** User navigates to /profile. Dropdown closes.
- **Specs:** A.1
- **Priority:** Medium

## FUN-015: ARIA attributes - container
- **Objective:** Verify dropdown container has correct ARIA attributes
- **Precondition:** Dropdown is open.
- **Steps:** 1. Open dropdown. 2. Inspect the container element.
- **Expected:** Container has role="menu".
- **Specs:** A
- **Priority:** Medium

## FUN-016: ARIA attributes - menu items
- **Objective:** Verify menu items have correct ARIA attributes
- **Precondition:** Dropdown is open.
- **Steps:** 1. Open dropdown. 2. Inspect "Profile" and "Logout" elements.
- **Expected:** Both items have role="menuitem".
- **Specs:** A.1, A.2
- **Priority:** Medium

## FUN-017: ARIA attributes - avatar trigger
- **Objective:** Verify avatar trigger has correct aria-expanded attribute
- **Precondition:** User is authenticated.
- **Steps:** 1. Inspect avatar element (dropdown closed). 2. Click avatar. 3. Inspect avatar element (dropdown open).
- **Expected:** aria-expanded="false" when closed. aria-expanded="true" when open.
- **Specs:** A
- **Priority:** Medium

## FUN-018: Multiple rapid clicks on Logout
- **Objective:** Verify no duplicate signOut calls on rapid clicks
- **Precondition:** Dropdown is open.
- **Steps:** 1. Rapidly click "Logout" multiple times.
- **Expected:** signOut() is called only once. User is redirected to /login without errors.
- **Specs:** A.2
- **Priority:** Medium

## FUN-019: Multiple rapid clicks on Profile
- **Objective:** Verify no duplicate navigations on rapid clicks
- **Precondition:** Dropdown is open.
- **Steps:** 1. Rapidly click "Profile" multiple times.
- **Expected:** Navigation to /profile occurs once. No errors or duplicate page loads.
- **Specs:** A.1
- **Priority:** Low

## FUN-020: Dropdown after navigating to different pages
- **Objective:** Verify dropdown works correctly after navigating between pages
- **Precondition:** User is authenticated.
- **Steps:** 1. Open dropdown on home page, close it. 2. Navigate to another page. 3. Open dropdown again.
- **Expected:** Dropdown opens correctly on each page. Active state reflects current page.
- **Specs:** A, A.1
- **Priority:** Medium
