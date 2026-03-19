# FUNCTION Test Cases - Dropdown-profile Admin

## FN-001: Click Profile navigates to profile page
- **Objective:** Verify clicking Profile item navigates to user profile page
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Click on "Profile" menu item
- **Expected:** Dropdown closes. User is navigated to the profile page. Profile page loads correctly.
- **Specs:** A.1
- **Priority:** High

## FN-002: Click Dashboard navigates to dashboard page
- **Objective:** Verify clicking Dashboard item navigates to admin dashboard page
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Click on "Dashboard" menu item
- **Expected:** Dropdown closes. User is navigated to the Admin Dashboard page. Dashboard page loads correctly.
- **Specs:** A.2
- **Priority:** High

## FN-003: Click Logout performs logout and redirects to login
- **Objective:** Verify clicking Logout item logs out the user and redirects to login screen
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Click on "Logout" menu item
- **Expected:** Dropdown closes. User session is terminated. User is redirected to the login screen. Accessing protected pages after logout requires re-authentication.
- **Specs:** A.3
- **Priority:** High

## FN-004: Dropdown auto-closes after Profile click
- **Objective:** Verify dropdown automatically closes after clicking Profile
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Click on "Profile"
  3. Observe dropdown state
- **Expected:** Dropdown is no longer visible after navigation.
- **Specs:** A, A.1
- **Priority:** High

## FN-005: Dropdown auto-closes after Dashboard click
- **Objective:** Verify dropdown automatically closes after clicking Dashboard
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Click on "Dashboard"
  3. Observe dropdown state
- **Expected:** Dropdown is no longer visible after navigation.
- **Specs:** A, A.2
- **Priority:** High

## FN-006: Dropdown auto-closes after Logout click
- **Objective:** Verify dropdown automatically closes after clicking Logout
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Click on "Logout"
  3. Observe dropdown state
- **Expected:** Dropdown is no longer visible. User is on login page.
- **Specs:** A, A.3
- **Priority:** High

## FN-007: Double-click on Profile item
- **Objective:** Verify double-clicking Profile does not cause duplicate navigation or errors
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Double-click on "Profile" menu item
- **Expected:** User is navigated to profile page only once. No duplicate pages or errors.
- **Specs:** A.1
- **Priority:** Medium

## FN-008: Double-click on Dashboard item
- **Objective:** Verify double-clicking Dashboard does not cause duplicate navigation or errors
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Double-click on "Dashboard" menu item
- **Expected:** User is navigated to dashboard page only once. No duplicate pages or errors.
- **Specs:** A.2
- **Priority:** Medium

## FN-009: Double-click on Logout item
- **Objective:** Verify double-clicking Logout does not cause duplicate API calls or errors
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Double-click on "Logout" menu item
- **Expected:** Logout is performed once. No duplicate API calls. User is redirected to login screen without errors.
- **Specs:** A.3
- **Priority:** Medium

## FN-010: Rapid clicks on different menu items
- **Objective:** Verify rapid sequential clicks on different items are handled correctly
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Quickly click "Profile" then immediately click "Dashboard"
- **Expected:** Only the first clicked action is performed. No conflicting navigation or errors.
- **Specs:** A.1, A.2
- **Priority:** Medium

## FN-011: Tab navigation between menu items
- **Objective:** Verify Tab key moves focus between dropdown menu items
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Press Tab to move focus to the first item
  3. Press Tab to move to the second item
  4. Press Tab to move to the third item
- **Expected:** Focus moves sequentially through Profile, Dashboard, Logout. Each focused item has a visible focus indicator.
- **Specs:** A.1, A.2, A.3
- **Priority:** Medium

## FN-012: Select menu item using Enter key
- **Objective:** Verify Enter key activates the focused menu item
- **Precondition:** Admin user is logged in; dropdown is open; focus is on a menu item
- **Steps:**
  1. Open the dropdown menu
  2. Use Tab to focus on "Dashboard"
  3. Press Enter
- **Expected:** Dashboard page opens. Same behavior as mouse click.
- **Specs:** A.2
- **Priority:** Medium

## FN-013: Close dropdown using ESC key
- **Objective:** Verify ESC key closes the dropdown without performing any action
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Press ESC key
- **Expected:** Dropdown closes. No navigation occurs. User remains on the current page.
- **Specs:** A
- **Priority:** Medium

## FN-014: Logout invalidates session
- **Objective:** Verify that after logout, the session is properly invalidated
- **Precondition:** Admin user is logged in
- **Steps:**
  1. Open the dropdown menu
  2. Click "Logout"
  3. After redirect to login, press browser Back button
- **Expected:** User is not able to access protected content. User is redirected back to login page or shown unauthorized message.
- **Specs:** A.3
- **Priority:** High

## FN-015: Logout clears authentication tokens
- **Objective:** Verify that logout clears all authentication tokens/cookies
- **Precondition:** Admin user is logged in
- **Steps:**
  1. Open the dropdown menu
  2. Click "Logout"
  3. Check browser cookies/local storage for auth tokens
- **Expected:** All authentication tokens and session cookies are cleared.
- **Specs:** A.3
- **Priority:** High

## FN-016: Profile link shows correct active state on profile page
- **Objective:** Verify Profile item remains in active state when user is on the profile page
- **Precondition:** Admin user is logged in and on the profile page
- **Steps:**
  1. Navigate to the profile page
  2. Open the dropdown menu
- **Expected:** Profile item is displayed in active/highlighted state, other items in default state.
- **Specs:** A.1
- **Priority:** Medium

## FN-017: Dashboard shows active state on dashboard page
- **Objective:** Verify Dashboard item shows active state when user is on the dashboard page
- **Precondition:** Admin user is logged in and on the dashboard page
- **Steps:**
  1. Navigate to the dashboard page
  2. Open the dropdown menu
- **Expected:** Dashboard item is displayed in active/highlighted state (if applicable per design).
- **Specs:** A.2
- **Priority:** Low

## FN-018: Dropdown behavior during page loading
- **Objective:** Verify dropdown behavior when clicked during page load
- **Precondition:** Admin user is logged in; page is in the process of loading
- **Steps:**
  1. Navigate to a page
  2. While page is loading, click the profile trigger
- **Expected:** Dropdown either opens correctly after load completes or is gracefully delayed. No JavaScript errors.
- **Specs:** A
- **Priority:** Low
