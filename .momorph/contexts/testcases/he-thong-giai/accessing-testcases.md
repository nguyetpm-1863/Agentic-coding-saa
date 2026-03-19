# ACCESSING Test Cases: He Thong Giai (Award System)

## ACC-001: Access Award System page via direct URL
- **Category:** ACCESSING
- **Sub_Category:** URL Access
- **Test_Objective:** Verify user can access the Award System page via direct URL
- **Precondition:** User has a valid account and is logged in
- **Test_Data:**
- **Steps:**
  1. Open browser
  2. Navigate to the Award System page URL (e.g., /awards)
- **Expected_Result:** Award System page loads successfully with all elements displayed correctly (keyvisual, title, navigation menu, award cards, Sun* Kudos block)
- **Priority:** High
- **Testcase_Type:** Manual

## ACC-002: Access Award System page without authentication
- **Category:** ACCESSING
- **Sub_Category:** Authentication
- **Test_Objective:** Verify behavior when accessing Award System page without logging in
- **Precondition:** User is not logged in
- **Test_Data:**
- **Steps:**
  1. Open browser (no active session)
  2. Navigate to the Award System page URL directly
- **Expected_Result:** Page behavior follows authentication requirements - either displays the page (if public) or redirects to login page
- **Priority:** High
- **Testcase_Type:** Manual

## ACC-003: Access Award System page with expired session
- **Category:** ACCESSING
- **Sub_Category:** Authentication
- **Test_Objective:** Verify behavior when session expires while on the Award System page
- **Precondition:** User is logged in, session is about to expire
- **Test_Data:**
- **Steps:**
  1. Log in and navigate to the Award System page
  2. Wait for the session to expire
  3. Attempt to interact with the page (e.g., click navigation menu)
- **Expected_Result:** Session is refreshed via middleware, or user is redirected to login if session cannot be refreshed
- **Priority:** Medium
- **Testcase_Type:** Manual

## ACC-004: Access Award System page via invalid URL
- **Category:** ACCESSING
- **Sub_Category:** URL Access
- **Test_Objective:** Verify that accessing an invalid/modified Award System URL shows appropriate error
- **Precondition:** User is logged in
- **Test_Data:** Invalid URL variations (e.g., /awards/invalid, /award, /awards?id=xxx)
- **Steps:**
  1. Navigate to an invalid variation of the Award System URL
- **Expected_Result:** 404 Not Found page is displayed, or user is redirected to the correct page
- **Priority:** Low
- **Testcase_Type:** Manual

## ACC-005: Access Award System page using browser back/forward
- **Category:** ACCESSING
- **Sub_Category:** Browser Navigation
- **Test_Objective:** Verify Award System page loads correctly when navigating with browser back/forward buttons
- **Precondition:** User has navigated to the Award System page from another page
- **Test_Data:**
- **Steps:**
  1. Navigate from another page to the Award System page
  2. Click browser Back button
  3. Click browser Forward button
- **Expected_Result:** Award System page reloads correctly with all elements intact; scroll position may be restored
- **Priority:** Medium
- **Testcase_Type:** Manual

## ACC-006: Refresh Award System page
- **Category:** ACCESSING
- **Sub_Category:** Browser Navigation
- **Test_Objective:** Verify Award System page reloads correctly after browser refresh
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Navigate to the Award System page
  2. Press F5 or Ctrl+R to refresh
- **Expected_Result:** Page reloads fully with all content displayed correctly
- **Priority:** Medium
- **Testcase_Type:** Manual

## ACC-007: Bookmark Award System page
- **Category:** ACCESSING
- **Sub_Category:** Browser Navigation
- **Test_Objective:** Verify Award System page can be bookmarked and accessed from bookmark
- **Precondition:** User is logged in
- **Test_Data:**
- **Steps:**
  1. Navigate to the Award System page
  2. Bookmark the page
  3. Close the browser
  4. Open browser and access the bookmarked URL
- **Expected_Result:** Award System page loads correctly from the bookmark (session/auth permitting)
- **Priority:** Low
- **Testcase_Type:** Manual

## ACC-008: Page load performance
- **Category:** ACCESSING
- **Sub_Category:** Page Load
- **Test_Objective:** Verify Award System page loads within acceptable time
- **Precondition:** Stable network connection
- **Test_Data:**
- **Steps:**
  1. Navigate to the Award System page
  2. Measure total page load time (including images)
- **Expected_Result:** Page loads completely within 3 seconds on standard broadband connection; all images and content visible
- **Priority:** Medium
- **Testcase_Type:** Manual
