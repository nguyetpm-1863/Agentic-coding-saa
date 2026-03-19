# ACCESSING Test Cases - Dropdown-profile Admin

## AC-001: Open dropdown by clicking profile trigger
- **Objective:** Verify dropdown opens when admin user clicks the profile area/avatar
- **Precondition:** Admin user is logged in and on any page with the profile trigger visible
- **Steps:**
  1. Click on the profile area/avatar in the header
- **Expected:** Dropdown menu is displayed with 3 items: Profile (active), Dashboard, Logout. Dropdown appears below/near the profile trigger.
- **Specs:** A, A.1, A.2, A.3
- **Priority:** High

## AC-002: Open dropdown by double-clicking profile trigger
- **Objective:** Verify dropdown handles double-click without creating duplicate dropdowns
- **Precondition:** Admin user is logged in and on any page with the profile trigger visible
- **Steps:**
  1. Double-click on the profile area/avatar in the header
- **Expected:** Only one dropdown instance is displayed. No duplicate or flickering behavior.
- **Specs:** A
- **Priority:** Medium

## AC-003: Open dropdown via keyboard (Tab + Enter)
- **Objective:** Verify dropdown can be opened using keyboard navigation
- **Precondition:** Admin user is logged in and on any page with the profile trigger visible
- **Steps:**
  1. Press Tab to navigate focus to the profile trigger
  2. Press Enter
- **Expected:** Dropdown menu is displayed correctly with all 3 items.
- **Specs:** A
- **Priority:** Medium

## AC-004: Close dropdown by clicking outside
- **Objective:** Verify dropdown closes when user clicks outside the dropdown area
- **Precondition:** Dropdown menu is open
- **Steps:**
  1. Click on any area outside the dropdown menu
- **Expected:** Dropdown is closed. No navigation occurs.
- **Specs:** A
- **Priority:** High

## AC-005: Close dropdown by pressing ESC key
- **Objective:** Verify dropdown closes when ESC key is pressed
- **Precondition:** Dropdown menu is open
- **Steps:**
  1. Press the ESC key
- **Expected:** Dropdown is closed. No navigation occurs.
- **Specs:** A
- **Priority:** Medium

## AC-006: Close dropdown by selecting a menu item
- **Objective:** Verify dropdown closes after a menu item is clicked
- **Precondition:** Dropdown menu is open
- **Steps:**
  1. Click on any menu item (Profile, Dashboard, or Logout)
- **Expected:** Dropdown closes and the corresponding action is performed (navigation or logout).
- **Specs:** A, A.1, A.2, A.3
- **Priority:** High

## AC-007: Dropdown visibility - Admin role only
- **Objective:** Verify dropdown profile trigger is visible only for admin users
- **Precondition:** User is logged in with admin role
- **Steps:**
  1. Log in as admin user
  2. Verify profile trigger is visible in the header
- **Expected:** Profile trigger is visible and dropdown can be opened.
- **Specs:** A
- **Priority:** High

## AC-008: Dropdown not visible when not logged in
- **Objective:** Verify dropdown profile trigger is not visible for unauthenticated users
- **Precondition:** User is not logged in
- **Steps:**
  1. Navigate to the application without logging in
- **Expected:** Profile trigger and dropdown are not visible.
- **Specs:** A
- **Priority:** High

## AC-009: Toggle dropdown open/close by clicking trigger
- **Objective:** Verify clicking the profile trigger toggles the dropdown open and closed
- **Precondition:** Admin user is logged in
- **Steps:**
  1. Click on the profile trigger to open dropdown
  2. Click on the profile trigger again
- **Expected:** Dropdown opens on first click and closes on second click.
- **Specs:** A
- **Priority:** Medium
