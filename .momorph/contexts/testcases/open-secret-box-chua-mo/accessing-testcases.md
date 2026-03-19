# Accessing Test Cases: Open Secret Box - Chua Mo (Modal)

---

## ACC-001: Open modal as authenticated user with available secret boxes
- **Category:** ACCESSING > Authentication > Logged-in user
- **Objective:** Verify that logged-in user with secret boxes can open the modal
- **Precondition:** User is logged in; user has >= 1 unopened secret box
- **Steps:**
  1. Navigate to the page containing the secret box trigger
  2. Click the button/link that opens the "Open Secret Box" modal
- **Expected:** Modal "KHAM PHA SECRET BOX CUA BAN" displays correctly with box image and counter showing correct number
- **Priority:** High

## ACC-002: Attempt to open modal as unauthenticated user
- **Category:** ACCESSING > Authentication > Not logged-in
- **Objective:** Verify that unauthenticated users cannot access the secret box modal
- **Precondition:** User is not logged in
- **Steps:**
  1. Navigate to the page containing the secret box trigger
  2. Attempt to click the button/link that opens the modal
- **Expected:** Modal does not open; user is redirected to login page or shown an authentication prompt
- **Priority:** High

## ACC-003: Open modal when user has 0 unopened secret boxes
- **Category:** ACCESSING > Authorization > Zero boxes
- **Objective:** Verify modal behavior when user has no unopened boxes
- **Precondition:** User is logged in; user has 0 unopened secret boxes
- **Steps:**
  1. Navigate to the page containing the secret box trigger
  2. Click the button/link that opens the modal
- **Expected:** Modal opens showing counter = 0, instruction text "Click vao box de mo" is hidden, box image click is disabled
- **Priority:** High

## ACC-004: Close modal using X button
- **Category:** ACCESSING > Modal Close > X button
- **Objective:** Verify modal closes when clicking the X button
- **Precondition:** Modal is open
- **Steps:**
  1. Click the X button in the top-right corner of the modal
- **Expected:** Modal closes, returns to parent screen with no data changes
- **Priority:** High

## ACC-005: Close modal using ESC key
- **Category:** ACCESSING > Modal Close > Keyboard
- **Objective:** Verify modal closes when pressing ESC key
- **Precondition:** Modal is open
- **Steps:**
  1. Press ESC key on keyboard
- **Expected:** Modal closes, returns to parent screen with no data changes
- **Priority:** Medium

## ACC-006: Click outside modal overlay
- **Category:** ACCESSING > Modal Close > Outside click
- **Objective:** Verify behavior when clicking outside the modal on the overlay
- **Precondition:** Modal is open
- **Steps:**
  1. Click on the dark overlay area outside the modal content
- **Expected:** Modal closes or stays open (per spec design)
- **Priority:** Medium

## ACC-007: Double-click trigger to open modal
- **Category:** ACCESSING > Modal Open > Double click
- **Objective:** Verify modal opens correctly on double-click of the trigger
- **Precondition:** User is logged in with >= 1 unopened secret box
- **Steps:**
  1. Double-click the button/link that opens the modal
- **Expected:** Modal opens once without duplication or error
- **Priority:** Low

## ACC-008: Reload page while modal is open
- **Category:** ACCESSING > Modal State > Page reload
- **Objective:** Verify modal state after page reload
- **Precondition:** Modal is open
- **Steps:**
  1. Press F5 or Ctrl+R to reload the page
- **Expected:** Page reloads, modal is closed, no data corruption
- **Priority:** Medium
