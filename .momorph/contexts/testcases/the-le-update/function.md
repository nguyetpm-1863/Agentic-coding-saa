# FUNCTION Test Cases - The le UPDATE

## FUN-001: Click "Dong" button to close modal
- **Category:** Button Actions
- **Sub Category:** Dong Button
- **Sub Sub Category:** Click
- **Test Objective:** Verify clicking "Dong" button closes the modal
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Click the "Dong" button
- **Expected Result:** Modal is closed, user returns to the previous screen/content, no data changes occur
- **Priority:** High
- **Testcase Type:** Manual

## FUN-002: Double-click "Dong" button
- **Category:** Button Actions
- **Sub Category:** Dong Button
- **Sub Sub Category:** Double Click
- **Test Objective:** Verify double-clicking "Dong" button closes modal without errors
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Double-click the "Dong" button
- **Expected Result:** Modal is closed once without error, no duplicate actions triggered
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-003: Close modal using keyboard (Tab to "Dong" + Enter)
- **Category:** Button Actions
- **Sub Category:** Dong Button
- **Sub Sub Category:** Keyboard
- **Test Objective:** Verify closing modal via keyboard navigation
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Press Tab to focus on the "Dong" button
  3. Press Enter
- **Expected Result:** Modal is closed, user returns to previous content
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-004: Close modal using ESC key
- **Category:** Button Actions
- **Sub Category:** Dong Button
- **Sub Sub Category:** ESC Key
- **Test Objective:** Verify pressing ESC key closes the modal
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Press ESC key
- **Expected Result:** Modal is closed, user returns to previous content
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-005: Click "Viet KUDOS" button to navigate to KUDOS form
- **Category:** Button Actions
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Click
- **Test Objective:** Verify clicking "Viet KUDOS" button opens the KUDOS writing form
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Click the "Viet KUDOS" button
- **Expected Result:** The "Viet Kudo" form/modal (frame 520:11602) is opened for the user to write KUDOS
- **Priority:** High
- **Testcase Type:** Manual

## FUN-006: Double-click "Viet KUDOS" button
- **Category:** Button Actions
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Double Click
- **Test Objective:** Verify double-clicking "Viet KUDOS" does not cause duplicate navigation
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Double-click the "Viet KUDOS" button
- **Expected Result:** The "Viet Kudo" form opens once, no duplicate modals or navigation errors
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-007: Navigate to KUDOS form using keyboard (Tab to "Viet KUDOS" + Enter)
- **Category:** Button Actions
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Keyboard
- **Test Objective:** Verify navigating to KUDOS form via keyboard
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Press Tab to focus on the "Viet KUDOS" button
  3. Press Enter
- **Expected Result:** The "Viet Kudo" form/modal is opened
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-008: Click disabled "Viet KUDOS" button (if applicable)
- **Category:** Button Actions
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Disabled State
- **Test Objective:** Verify clicking disabled "Viet KUDOS" button has no effect
- **Precondition:** "The le UPDATE" modal is open with "Viet KUDOS" button in disabled state
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal in a state where "Viet KUDOS" is disabled
  2. Click the "Viet KUDOS" button
- **Expected Result:** Nothing happens, no navigation occurs, button does not respond to click
- **Priority:** Low
- **Testcase Type:** Manual

## FUN-009: Scroll content within modal using mouse wheel
- **Category:** Scroll Behavior
- **Sub Category:** Mouse Wheel
- **Test Objective:** Verify scrolling within modal using mouse wheel
- **Precondition:** "The le UPDATE" modal is open with content exceeding visible area
- **Test Data:** Long rules content
- **Steps:**
  1. Open the "The le UPDATE" modal with long content
  2. Place cursor inside the content area
  3. Scroll down using mouse wheel
  4. Scroll up using mouse wheel
- **Expected Result:** Content scrolls smoothly up and down within the modal. Footer buttons remain fixed at the bottom.
- **Priority:** High
- **Testcase Type:** Manual

## FUN-010: Scroll content by dragging scrollbar
- **Category:** Scroll Behavior
- **Sub Category:** Drag Scrollbar
- **Test Objective:** Verify scrolling by dragging the scrollbar
- **Precondition:** "The le UPDATE" modal is open with scrollable content
- **Test Data:** Long rules content
- **Steps:**
  1. Open the "The le UPDATE" modal with long content
  2. Click and drag the scrollbar down
  3. Click and drag the scrollbar up
- **Expected Result:** Content scrolls corresponding to scrollbar position, no content duplication or visual glitches
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-011: Scroll content using keyboard (Arrow keys, PgUp/PgDn)
- **Category:** Scroll Behavior
- **Sub Category:** Keyboard Scroll
- **Test Objective:** Verify scrolling with keyboard keys
- **Precondition:** "The le UPDATE" modal is open with scrollable content, focus is on modal
- **Test Data:** Long rules content
- **Steps:**
  1. Open the "The le UPDATE" modal with long content
  2. Press Down Arrow key
  3. Press Up Arrow key
  4. Press Page Down key
  5. Press Page Up key
- **Expected Result:** Content scrolls appropriately: arrows scroll one line, PgUp/PgDn scroll one page
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-012: Click outside modal
- **Category:** Modal Behavior
- **Sub Category:** Click Outside
- **Test Objective:** Verify behavior when clicking outside the modal
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Click on the background/overlay area outside the modal
- **Expected Result:** Modal is closed (or remains open, depending on spec). No errors occur.
- **Priority:** High
- **Testcase Type:** Manual

## FUN-013: Click on background items while modal is open
- **Category:** Modal Behavior
- **Sub Category:** Background Interaction
- **Test Objective:** Verify background elements are not clickable while modal is open
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Try to click on any element visible behind the overlay
- **Expected Result:** No interaction with background elements occurs while modal is open
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-014: Reload page while modal is open
- **Category:** Modal Behavior
- **Sub Category:** Page Reload
- **Test Objective:** Verify modal behavior on page reload
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Press F5 or Ctrl+R to reload the page
- **Expected Result:** Page reloads, modal is closed, no errors occur, page returns to normal state
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-015: Scroll background page while modal is open
- **Category:** Modal Behavior
- **Sub Category:** Background Scroll
- **Test Objective:** Verify background page does not scroll while modal is open
- **Precondition:** "The le UPDATE" modal is open, background page has scrollable content
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Try to scroll the background page (mouse wheel outside content area)
- **Expected Result:** Background page does not scroll; only modal content scrolls (if applicable)
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-016: Select and copy text from modal content
- **Category:** Text Interaction
- **Sub Category:** Copy Text
- **Test Objective:** Verify text in modal can be selected and copied
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Select some text in the content area
  3. Press Ctrl+C
  4. Paste in another application to verify
- **Expected Result:** Text can be selected and copied correctly, modal remains unchanged
- **Priority:** Low
- **Testcase Type:** Manual

## FUN-017: Right-click and copy text from modal
- **Category:** Text Interaction
- **Sub Category:** Right-click Copy
- **Test Objective:** Verify right-click copy functionality within modal
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Select some text in the content area
  3. Right-click and select "Copy"
- **Expected Result:** Context menu appears, text is copied correctly, modal remains unchanged
- **Priority:** Low
- **Testcase Type:** Manual

## FUN-018: Ctrl+A to select all text in modal
- **Category:** Text Interaction
- **Sub Category:** Select All
- **Test Objective:** Verify Ctrl+A behavior within modal
- **Precondition:** "The le UPDATE" modal is open, focus is within modal
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Click inside the content area
  3. Press Ctrl+A
- **Expected Result:** Text within the modal is selected, modal remains unchanged
- **Priority:** Low
- **Testcase Type:** Manual

## FUN-019: Tab order within modal (focus trap)
- **Category:** Navigation
- **Sub Category:** Tab Order
- **Test Objective:** Verify correct Tab key navigation order within modal
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Press Tab key repeatedly and observe focus order
- **Expected Result:** Focus cycles through interactive elements within the modal only (e.g., "Dong" -> "Viet KUDOS" -> "Dong"), does not escape to background elements
- **Priority:** Medium
- **Testcase Type:** Manual

## FUN-020: Click on non-interactive area within modal
- **Category:** Modal Behavior
- **Sub Category:** Non-interactive Click
- **Test Objective:** Verify clicking on non-interactive areas within the modal
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Click on empty space / non-button areas within the modal
- **Expected Result:** Modal remains unchanged, no errors or unexpected behavior
- **Priority:** Low
- **Testcase Type:** Manual

## FUN-021: Zoom in/out while modal is open
- **Category:** Modal Behavior
- **Sub Category:** Zoom
- **Test Objective:** Verify modal behavior when zooming in/out
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** Zoom levels: 75%, 125%, 150%
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Zoom in (Ctrl+Plus) to 125% and 150%
  3. Zoom out (Ctrl+Minus) to 75%
- **Expected Result:** Modal remains functional, layout not broken, buttons still clickable at all zoom levels
- **Priority:** Low
- **Testcase Type:** Manual

## FUN-022: Rotate screen while modal is open (mobile/tablet)
- **Category:** Modal Behavior
- **Sub Category:** Rotation
- **Test Objective:** Verify modal behavior when rotating device
- **Precondition:** "The le UPDATE" modal is open on a mobile/tablet device
- **Test Data:** Portrait and landscape orientations
- **Steps:**
  1. Open the "The le UPDATE" modal on mobile/tablet
  2. Rotate device from portrait to landscape
  3. Rotate back to portrait
- **Expected Result:** Modal adjusts layout properly without broken UI or errors
- **Priority:** Low
- **Testcase Type:** Manual
