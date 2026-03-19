# ACCESSING Test Cases - Addlink Box (Modal)

## AC-001: Open modal by clicking trigger button/link
- **Objective:** Verify modal opens when user clicks the trigger element
- **Precondition:** User is on the parent page containing the "Add link" trigger
- **Steps:** 1. Click the "Add link" button/link on the parent page
- **Expected:** Modal "Them duong dan" is displayed centered on screen with dimmed background overlay. All fields are empty by default.
- **Specs:** A, B, C, D
- **Priority:** High

## AC-002: Open modal by double-clicking trigger button/link
- **Objective:** Verify modal opens correctly on double-click without duplicate modals
- **Precondition:** User is on the parent page containing the "Add link" trigger
- **Steps:** 1. Double-click the "Add link" button/link on the parent page
- **Expected:** Only one modal instance is displayed. No duplicate modals appear.
- **Specs:** A, B, C, D
- **Priority:** Medium

## AC-003: Open modal via keyboard (Tab + Enter)
- **Objective:** Verify modal can be opened via keyboard navigation
- **Precondition:** User is on the parent page containing the "Add link" trigger
- **Steps:** 1. Press Tab to navigate focus to the "Add link" trigger. 2. Press Enter.
- **Expected:** Modal "Them duong dan" is displayed correctly.
- **Specs:** A, B, C, D
- **Priority:** Medium

## AC-004: Close modal by clicking Cancel button
- **Objective:** Verify modal closes when Cancel (Huy) button is clicked
- **Precondition:** Modal "Them duong dan" is open
- **Steps:** 1. Click the "Huy" (Cancel) button
- **Expected:** Modal is closed. No data is saved. Parent page returns to previous state.
- **Specs:** D.1
- **Priority:** High

## AC-005: Close modal by pressing ESC key
- **Objective:** Verify modal closes when ESC key is pressed
- **Precondition:** Modal "Them duong dan" is open
- **Steps:** 1. Press the ESC key
- **Expected:** Modal is closed without saving any data.
- **Specs:** D.1
- **Priority:** Medium

## AC-006: Close modal by clicking outside the modal
- **Objective:** Verify behavior when clicking outside the modal area
- **Precondition:** Modal "Them duong dan" is open
- **Steps:** 1. Click on the dimmed background area outside the modal
- **Expected:** Modal is closed (or remains open based on spec). No data is saved if closed.
- **Specs:** D
- **Priority:** Medium

## AC-007: Background interaction blocked while modal is open
- **Objective:** Verify that background elements are not interactive while modal is displayed
- **Precondition:** Modal "Them duong dan" is open
- **Steps:** 1. Try to click on various elements on the parent page behind the modal overlay
- **Expected:** No interaction occurs with background elements. Modal remains displayed.
- **Specs:** D
- **Priority:** High
