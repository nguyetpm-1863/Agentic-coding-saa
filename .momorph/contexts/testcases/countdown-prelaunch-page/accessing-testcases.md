# ACCESSING Test Cases - Countdown - Prelaunch Page

## ACC-001: Access countdown page via direct URL
- **Category:** ACCESSING > Direct URL Access
- **Test Objective:** Verify the countdown page loads correctly when accessed via direct URL
- **Precondition:** Application is deployed and running
- **Test Data:** Valid countdown page URL
- **Steps:**
  1. Open a browser
  2. Enter the countdown page URL in the address bar
  3. Press Enter
- **Expected Result:** The countdown page loads successfully displaying the countdown timer with Days, Hours, and Minutes sections
- **Priority:** High
- **Testcase Type:** Normal

## ACC-002: Access countdown page when server is down
- **Category:** ACCESSING > Direct URL Access
- **Test Objective:** Verify appropriate error handling when the server is unavailable
- **Precondition:** Application server is stopped/unavailable
- **Test Data:** Valid countdown page URL
- **Steps:**
  1. Open a browser
  2. Enter the countdown page URL in the address bar
  3. Press Enter
- **Expected Result:** An appropriate error page or message is displayed (e.g., 503 Service Unavailable)
- **Priority:** Medium
- **Testcase Type:** Abnormal

## ACC-003: Access countdown page using browser Back button
- **Category:** ACCESSING > Browser Navigation
- **Test Objective:** Verify the countdown page loads correctly when navigated to via browser Back button
- **Precondition:** User has navigated away from the countdown page
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Navigate to another page
  3. Click the browser Back button
- **Expected Result:** The countdown page loads correctly with updated countdown values
- **Priority:** Medium
- **Testcase Type:** Normal

## ACC-004: Access countdown page using browser Forward button
- **Category:** ACCESSING > Browser Navigation
- **Test Objective:** Verify the countdown page loads correctly when navigated to via browser Forward button
- **Precondition:** User has navigated back from the countdown page
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Navigate to another page
  3. Click the browser Back button to return to countdown page
  4. Click the browser Forward button to go to the other page
  5. Click the browser Back button again
- **Expected Result:** The countdown page loads correctly with updated countdown values
- **Priority:** Low
- **Testcase Type:** Normal

## ACC-005: Refresh the countdown page using F5
- **Category:** ACCESSING > Browser Navigation
- **Test Objective:** Verify the countdown page reloads correctly on refresh
- **Precondition:** Countdown page is currently displayed
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Press F5 to refresh the page
- **Expected Result:** The page reloads and countdown values are recalculated and displayed correctly
- **Priority:** High
- **Testcase Type:** Normal

## ACC-006: Refresh the countdown page using Ctrl+F5 (hard refresh)
- **Category:** ACCESSING > Browser Navigation
- **Test Objective:** Verify the countdown page loads correctly on hard refresh (bypass cache)
- **Precondition:** Countdown page is currently displayed
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Press Ctrl+F5 to hard refresh
- **Expected Result:** The page reloads completely and countdown values are recalculated correctly
- **Priority:** Medium
- **Testcase Type:** Normal

## ACC-007: Access countdown page without authentication
- **Category:** ACCESSING > Authentication
- **Test Objective:** Verify the countdown page is accessible without requiring login
- **Precondition:** User is not logged in (no active session)
- **Test Data:** Valid countdown page URL
- **Steps:**
  1. Open a new browser (incognito/private mode)
  2. Enter the countdown page URL
  3. Press Enter
- **Expected Result:** The countdown page loads successfully without requiring login or redirecting to a login page
- **Priority:** High
- **Testcase Type:** Normal

## ACC-008: Access countdown page with invalid URL path
- **Category:** ACCESSING > URL Manipulation
- **Test Objective:** Verify appropriate error handling for invalid URL paths
- **Precondition:** Application is deployed and running
- **Test Data:** Invalid URL path (e.g., /countdown/invalid, /countdownxyz)
- **Steps:**
  1. Open a browser
  2. Enter an invalid variation of the countdown page URL
  3. Press Enter
- **Expected Result:** A 404 Not Found page is displayed
- **Priority:** Medium
- **Testcase Type:** Abnormal

## ACC-009: Access countdown page by copying and pasting URL in a new tab
- **Category:** ACCESSING > Direct URL Access
- **Test Objective:** Verify the countdown page loads correctly when URL is pasted in a new tab
- **Precondition:** Countdown page is open in one tab
- **Test Data:**
- **Steps:**
  1. Open the countdown page in a browser tab
  2. Copy the URL from the address bar
  3. Open a new tab
  4. Paste the URL and press Enter
- **Expected Result:** The countdown page loads correctly in the new tab with accurate countdown values
- **Priority:** Medium
- **Testcase Type:** Normal

## ACC-010: Access countdown page on mobile device
- **Category:** ACCESSING > Direct URL Access
- **Test Objective:** Verify the countdown page is accessible on mobile devices
- **Precondition:** Application is deployed and running
- **Test Data:** Valid countdown page URL, mobile device (or mobile emulation)
- **Steps:**
  1. Open a mobile browser
  2. Enter the countdown page URL
  3. Press Go/Enter
- **Expected Result:** The countdown page loads successfully and is usable on mobile screen
- **Priority:** High
- **Testcase Type:** Normal
