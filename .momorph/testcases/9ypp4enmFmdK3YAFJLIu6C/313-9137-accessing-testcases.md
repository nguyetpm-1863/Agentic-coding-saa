# ACCESSING Test Cases - Floating Action Button (313:9137)

## ACC-001: Verify FAB is displayed on applicable screens
- **Objective:** Confirm the Floating Action Button is visible on screens where it should appear
- **Precondition:** User is logged in and on a page that should display the FAB
- **Steps:**
  1. Navigate to a page where FAB is specified to appear
  2. Observe the bottom-right area of the screen
- **Expected:** FAB widget button is displayed at the bottom-right corner with two icons and '/' separator on yellow background
- **Priority:** High

## ACC-002: Verify FAB remains visible after page scroll
- **Objective:** Confirm the FAB stays fixed in position when the user scrolls the page
- **Precondition:** User is on a page with scrollable content and FAB is displayed
- **Steps:**
  1. Scroll down the page using mouse wheel
  2. Scroll up the page
  3. Scroll using keyboard (Page Down, Page Up, Arrow keys)
- **Expected:** FAB remains visible and fixed at the bottom-right corner throughout scrolling
- **Priority:** High

## ACC-003: Verify FAB is not displayed for unauthorized users
- **Objective:** Confirm the FAB is hidden for users who should not have access
- **Precondition:** User is not logged in or does not have the required role
- **Steps:**
  1. Navigate to a page where FAB would normally appear
  2. Observe the bottom-right area of the screen
- **Expected:** FAB is not displayed
- **Priority:** Medium

## ACC-004: Verify FAB is displayed after page reload
- **Objective:** Confirm the FAB persists after refreshing the page
- **Precondition:** User is logged in on a page with the FAB
- **Steps:**
  1. Verify FAB is displayed
  2. Reload the page (F5 or browser refresh)
  3. Observe the FAB area
- **Expected:** FAB is displayed correctly after page reload in collapsed state
- **Priority:** Medium
