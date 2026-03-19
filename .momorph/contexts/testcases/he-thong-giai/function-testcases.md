# FUNCTION Test Cases: He Thong Giai (Award System)

## FUNC-001: Click navigation menu - Top Talent
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "Top Talent" in navigation scrolls to the Top Talent award card
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to the award system section
  2. Click "Top Talent" in the left navigation menu
- **Expected_Result:** Page smoothly scrolls to the Top Talent award card section; "Top Talent" menu item becomes active (yellow + underline)
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-002: Click navigation menu - Top Project
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "Top Project" in navigation scrolls to the Top Project award card
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click "Top Project" in the left navigation menu
- **Expected_Result:** Page smoothly scrolls to the Top Project award card; "Top Project" menu item becomes active; previously active item loses active state
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-003: Click navigation menu - Top Project Leader
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "Top Project Leader" scrolls to correct section
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click "Top Project Leader" in the left navigation menu
- **Expected_Result:** Page scrolls to Top Project Leader card; menu item becomes active with yellow + underline
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-004: Click navigation menu - Best Manager
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "Best Manager" scrolls to correct section
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click "Best Manager" in the left navigation menu
- **Expected_Result:** Page scrolls to Best Manager card; menu item becomes active
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-005: Click navigation menu - Signature 2025 - Creator
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "Signature 2025 - Creator" scrolls to correct section
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click "Signature 2025 - Creator" in the left navigation menu
- **Expected_Result:** Page scrolls to Signature 2025 - Creator card; menu item becomes active
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-006: Click navigation menu - MVP
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "MVP" scrolls to correct section
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click "MVP" in the left navigation menu
- **Expected_Result:** Page scrolls to MVP card; menu item becomes active
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-007: Navigation menu active state toggle
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Active State
- **Test_Objective:** Verify only one menu item is active at a time and active state updates on each click
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click "Top Talent" - observe active state
  2. Click "Best Manager" - observe active state change
  3. Click "MVP" - observe active state change
- **Expected_Result:** Each click sets the clicked item as active (yellow + underline) and removes active state from the previously active item; only one item is active at any time
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-008: Navigation menu - rapid multiple clicks
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Multiple Clicks
- **Test_Objective:** Verify navigation handles rapid successive clicks correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Rapidly click different navigation menu items in succession (e.g., Top Talent -> MVP -> Top Project -> Best Manager)
- **Expected_Result:** Page scrolls to the last clicked item's section; active state shows the last clicked item; no duplicate scrolling, layout glitches, or errors
- **Priority:** Medium
- **Testcase_Type:** Manual

## FUNC-009: Navigation menu - double click on same item
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Multiple Clicks
- **Test_Objective:** Verify double-clicking the same navigation item does not cause issues
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Double-click on "Top Talent" in the navigation menu
- **Expected_Result:** Page scrolls to Top Talent section once; no duplicate navigation or errors; item remains active
- **Priority:** Medium
- **Testcase_Type:** Manual

## FUNC-010: Navigation menu - keyboard Enter
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Keyboard
- **Test_Objective:** Verify navigation menu items can be activated via keyboard (Tab + Enter)
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Use Tab key to focus on a navigation menu item
  2. Press Enter to activate it
- **Expected_Result:** Page scrolls to the corresponding award section; menu item becomes active; same behavior as mouse click
- **Priority:** Medium
- **Testcase_Type:** Manual

## FUNC-011: Click navigation item with icon and text
- **Category:** FUNCTION
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking on the icon or text of a menu item both navigate to the same section
- **Precondition:** User is on the Award System page; Top Talent has an icon before text
- **Test_Data:**
- **Steps:**
  1. Click on the icon of "Top Talent" menu item
  2. Observe the scroll target
  3. Click on the text "Top Talent"
  4. Observe the scroll target
- **Expected_Result:** Both icon click and text click navigate to the same Top Talent section
- **Priority:** Medium
- **Testcase_Type:** Manual

## FUNC-012: Click "Chi tiet" button - navigate to Sun* Kudos
- **Category:** FUNCTION
- **Sub_Category:** Button
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify clicking "Chi tiet" button navigates to the Sun* Kudos detail page
- **Precondition:** User is on the Award System page, scrolled to Sun* Kudos block
- **Test_Data:**
- **Steps:**
  1. Scroll to the Sun* Kudos promotional block
  2. Click the "Chi tiet" button
- **Expected_Result:** User is navigated to the Sun* Kudos detail page; page loads correctly within acceptable time
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-013: Double-click "Chi tiet" button
- **Category:** FUNCTION
- **Sub_Category:** Button
- **Sub_Sub_Category:** Multiple Clicks
- **Test_Objective:** Verify double-clicking "Chi tiet" button does not cause duplicate navigation or errors
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Double-click the "Chi tiet" button rapidly
- **Expected_Result:** Navigates to Sun* Kudos page once; no duplicate page loading or navigation errors
- **Priority:** Medium
- **Testcase_Type:** Manual

## FUNC-014: Award card content accuracy - Top Talent
- **Category:** FUNCTION
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Content
- **Test_Objective:** Verify Top Talent award card displays correct data values
- **Precondition:** User is on the Award System page
- **Test_Data:** Expected: Quantity=10, Unit=Don vi, Value=7.000.000 VND
- **Steps:**
  1. Navigate to Top Talent section
  2. Verify quantity, unit, and prize value
- **Expected_Result:** Quantity shows "10", Unit shows "Don vi", Prize value shows "7.000.000 VND" per award
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-015: Award card content accuracy - Top Project
- **Category:** FUNCTION
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Content
- **Test_Objective:** Verify Top Project award card displays correct data values
- **Precondition:** User is on the Award System page
- **Test_Data:** Expected: Quantity=02, Unit=Tap the, Value=15.000.000 VND
- **Steps:**
  1. Navigate to Top Project section
  2. Verify quantity, unit, and prize value
- **Expected_Result:** Quantity shows "02", Unit shows "Tap the", Prize value shows "15.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-016: Award card content accuracy - Top Project Leader
- **Category:** FUNCTION
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Content
- **Test_Objective:** Verify Top Project Leader card data
- **Precondition:** User is on the Award System page
- **Test_Data:** Expected: Quantity=03, Unit=Ca nhan, Value=7.000.000 VND
- **Steps:**
  1. Navigate to Top Project Leader section
  2. Verify data
- **Expected_Result:** Quantity "03", Unit "Ca nhan", Value "7.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-017: Award card content accuracy - Best Manager
- **Category:** FUNCTION
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Content
- **Test_Objective:** Verify Best Manager card data
- **Precondition:** User is on the Award System page
- **Test_Data:** Expected: Quantity=01, Unit=Ca nhan, Value=10.000.000 VND
- **Steps:**
  1. Navigate to Best Manager section
  2. Verify data
- **Expected_Result:** Quantity "01", Unit "Ca nhan", Value "10.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-018: Award card content accuracy - Signature 2025 - Creator
- **Category:** FUNCTION
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Content
- **Test_Objective:** Verify Signature 2025 - Creator card data with dual prize values
- **Precondition:** User is on the Award System page
- **Test_Data:** Expected: Quantity=01, Individual Value=5.000.000 VND, Team Value=8.000.000 VND
- **Steps:**
  1. Navigate to Signature 2025 - Creator section
  2. Verify quantity and both prize values
- **Expected_Result:** Quantity "01", Individual prize "5.000.000 VND", Team prize "8.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-019: Award card content accuracy - MVP
- **Category:** FUNCTION
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Content
- **Test_Objective:** Verify MVP card data
- **Precondition:** User is on the Award System page
- **Test_Data:** Expected: Quantity=01, Value=15.000.000 VND
- **Steps:**
  1. Navigate to MVP section
  2. Verify data
- **Expected_Result:** Quantity "01", Prize value "15.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## FUNC-020: Smooth scroll animation
- **Category:** FUNCTION
- **Sub_Category:** Page
- **Sub_Sub_Category:** Scroll
- **Test_Objective:** Verify clicking navigation items triggers smooth scroll animation
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Click any navigation menu item
  2. Observe the scroll behavior
- **Expected_Result:** Page scrolls smoothly (animated) to the target section rather than jumping instantly
- **Priority:** Low
- **Testcase_Type:** Manual

## FUNC-021: Page load performance with images
- **Category:** FUNCTION
- **Sub_Category:** Page
- **Sub_Sub_Category:** Performance
- **Test_Objective:** Verify all images load within acceptable time
- **Precondition:** Standard network connection
- **Test_Data:**
- **Steps:**
  1. Open browser developer tools (Network tab)
  2. Navigate to the Award System page
  3. Observe image load times
- **Expected_Result:** All images (keyvisual, 6 award images, kudos illustration) load within 3 seconds; no failed requests; total page weight is reasonable
- **Priority:** Medium
- **Testcase_Type:** Manual

## FUNC-022: No broken links on page
- **Category:** FUNCTION
- **Sub_Category:** Button
- **Sub_Sub_Category:** Click
- **Test_Objective:** Verify there are no broken links on the Award System page
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Use browser extension "Check My Links" or developer tools
  2. Scan all links on the page
- **Expected_Result:** No broken links found; all navigation targets and the "Chi tiet" button link resolve correctly
- **Priority:** Medium
- **Testcase_Type:** Manual
