# ACCESSING Test Cases - Dropdown Profile (Regular User)

## AC-001: Open dropdown by clicking avatar
- **Objective:** Verify dropdown opens when user clicks the avatar in the header
- **Precondition:** User is authenticated and on any page with the header
- **Steps:** 1. Click the user avatar in the header
- **Expected:** Dropdown is displayed with two items: "Profile" (with user icon) and "Logout" (with chevron-right icon). Dropdown appears below the avatar with open animation (opacity + translateY, 150ms).
- **Specs:** A, A.1, A.2
- **Priority:** High

## AC-002: Open dropdown by double-clicking avatar
- **Objective:** Verify no duplicate dropdowns appear on double-click
- **Precondition:** User is authenticated and on any page with the header
- **Steps:** 1. Double-click the user avatar in the header
- **Expected:** Only one dropdown instance is displayed. No duplicate or flickering behavior.
- **Specs:** A
- **Priority:** Medium

## AC-003: Open dropdown via keyboard (Tab + Enter)
- **Objective:** Verify dropdown can be opened via keyboard navigation
- **Precondition:** User is authenticated and on any page with the header
- **Steps:** 1. Press Tab to navigate focus to the avatar. 2. Press Enter.
- **Expected:** Dropdown is displayed correctly with focus on the first item (Profile).
- **Specs:** A, A.1, A.2
- **Priority:** Medium

## AC-004: Open dropdown via keyboard (Tab + Space)
- **Objective:** Verify dropdown can be opened via Space key
- **Precondition:** User is authenticated and on any page with the header
- **Steps:** 1. Press Tab to navigate focus to the avatar. 2. Press Space.
- **Expected:** Dropdown is displayed correctly with focus on the first item (Profile).
- **Specs:** A, A.1, A.2
- **Priority:** Medium

## AC-005: Close dropdown by clicking outside
- **Objective:** Verify dropdown closes when clicking outside
- **Precondition:** Dropdown is open
- **Steps:** 1. Click on any area outside the dropdown
- **Expected:** Dropdown closes with close animation (opacity + translateY, 100ms). No action is performed.
- **Specs:** A
- **Priority:** High

## AC-006: Close dropdown by pressing Escape
- **Objective:** Verify dropdown closes when Escape key is pressed
- **Precondition:** Dropdown is open
- **Steps:** 1. Press the Escape key
- **Expected:** Dropdown closes. No action is performed. Focus returns to the avatar.
- **Specs:** A
- **Priority:** High

## AC-007: Close dropdown by selecting an item
- **Objective:** Verify dropdown closes after an item is clicked
- **Precondition:** Dropdown is open
- **Steps:** 1. Click the "Profile" menu item
- **Expected:** Dropdown closes. Navigation to /profile occurs.
- **Specs:** A.1
- **Priority:** High

## AC-008: Toggle dropdown by clicking avatar again
- **Objective:** Verify avatar click toggles dropdown open/close
- **Precondition:** Dropdown is open
- **Steps:** 1. Click the avatar again
- **Expected:** Dropdown closes. Clicking avatar once more re-opens it.
- **Specs:** A
- **Priority:** Medium

## AC-009: Dropdown not available for unauthenticated users
- **Objective:** Verify dropdown is not accessible when user is not logged in
- **Precondition:** User is not authenticated (no session)
- **Steps:** 1. Navigate to /login. 2. Observe the header area.
- **Expected:** No avatar is displayed. No dropdown trigger is available.
- **Specs:** A
- **Priority:** High

## AC-010: Dropdown available on all authenticated pages
- **Objective:** Verify dropdown is accessible from any page with the header
- **Precondition:** User is authenticated
- **Steps:** 1. Navigate to the home page. 2. Click the avatar. 3. Close dropdown. 4. Navigate to another page. 5. Click the avatar.
- **Expected:** Dropdown opens correctly on all authenticated pages with the same content and behavior.
- **Specs:** A, A.1, A.2
- **Priority:** Medium
