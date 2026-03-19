# ACCESSING Test Cases - The le UPDATE

## ACC-001: Open "The le" modal by clicking the rules/regulations link or button
- **Category:** Open Modal
- **Sub Category:** Click
- **Test Objective:** Verify the "The le UPDATE" modal opens when user clicks on the trigger element
- **Precondition:** User is logged in and on the main screen where the "The le" trigger is visible
- **Test Data:** N/A
- **Steps:**
  1. Navigate to the screen containing the "The le" trigger
  2. Click on the "The le" button/link
- **Expected Result:** The "The le UPDATE" modal is displayed without error, showing title, description, reward list, 6 badges, and "Dong"/"Viet KUDOS" buttons
- **Priority:** High
- **Testcase Type:** Manual

## ACC-002: Open "The le" modal by double-clicking the trigger element
- **Category:** Open Modal
- **Sub Category:** Double Click
- **Test Objective:** Verify the modal opens correctly when double-clicking the trigger
- **Precondition:** User is logged in and on the main screen where the "The le" trigger is visible
- **Test Data:** N/A
- **Steps:**
  1. Navigate to the screen containing the "The le" trigger
  2. Double-click on the "The le" button/link
- **Expected Result:** The "The le UPDATE" modal is displayed once without error (no duplicate modals)
- **Priority:** Medium
- **Testcase Type:** Manual

## ACC-003: Open "The le" modal using keyboard navigation (Tab + Enter)
- **Category:** Open Modal
- **Sub Category:** Keyboard
- **Test Objective:** Verify the modal opens via keyboard navigation
- **Precondition:** User is logged in and on the main screen where the "The le" trigger is visible
- **Test Data:** N/A
- **Steps:**
  1. Navigate to the screen containing the "The le" trigger
  2. Press Tab to focus on the "The le" button/link
  3. Press Enter
- **Expected Result:** The "The le UPDATE" modal is displayed without error
- **Priority:** Medium
- **Testcase Type:** Manual

## ACC-004: Access "The le" modal when user is not logged in
- **Category:** Permission/Authentication
- **Sub Category:** Unauthenticated User
- **Test Objective:** Verify behavior when unauthenticated user tries to access the rules modal
- **Precondition:** User is NOT logged in
- **Test Data:** N/A
- **Steps:**
  1. Navigate to the application without logging in
  2. Attempt to access the "The le" trigger
- **Expected Result:** User is redirected to login page or the trigger is not accessible
- **Priority:** High
- **Testcase Type:** Manual

## ACC-005: Re-open "The le" modal after closing it
- **Category:** Open Modal
- **Sub Category:** Re-open
- **Test Objective:** Verify modal can be reopened after being closed
- **Precondition:** User is logged in and on the main screen
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Close the modal by clicking "Dong"
  3. Click the "The le" trigger again
- **Expected Result:** The modal reopens correctly with all content displayed properly
- **Priority:** Medium
- **Testcase Type:** Manual

## ACC-006: Open "The le" modal on different screen sizes
- **Category:** Open Modal
- **Sub Category:** Responsive
- **Test Objective:** Verify modal opens correctly across all breakpoints
- **Precondition:** User is logged in
- **Test Data:** Screen widths: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)
- **Steps:**
  1. Set browser to each target width
  2. Click on the "The le" trigger
- **Expected Result:** Modal opens correctly and is fully visible at each breakpoint
- **Priority:** Medium
- **Testcase Type:** Manual
