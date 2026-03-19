# FUNCTION Test Cases - Floating Action Button 2 (313:9139)

## FUN-001: Verify Button The le click navigates to The le UPDATE
- **Objective:** Confirm clicking "The le" button opens the The le UPDATE page/modal
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Click the "The le" button
- **Expected:** The le UPDATE page/modal (3204:6051) is opened
- **Priority:** High

## FUN-002: Verify Button Viet KUDOS click navigates to Viet Kudo form
- **Objective:** Confirm clicking "Viet KUDOS" button opens the Viet Kudo form/modal
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Click the "Viet KUDOS" button
- **Expected:** Viet Kudo form/modal (520:11602) is opened for composing kudos
- **Priority:** High

## FUN-003: Verify Button Huy click collapses FAB
- **Objective:** Confirm clicking the cancel (X) button closes the expanded FAB panel
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Click the cancel (X) button
- **Expected:** Expanded FAB panel closes and returns to collapsed state (313:9137)
- **Priority:** High

## FUN-004: Verify Button The le double click
- **Objective:** Confirm double clicking "The le" button behaves correctly
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Double-click the "The le" button
- **Expected:** The le UPDATE page/modal is opened once without error or duplicate actions
- **Priority:** Medium

## FUN-005: Verify Button Viet KUDOS double click
- **Objective:** Confirm double clicking "Viet KUDOS" button behaves correctly
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Double-click the "Viet KUDOS" button
- **Expected:** Viet Kudo form is opened once without error or duplicate actions
- **Priority:** Medium

## FUN-006: Verify Button Huy double click
- **Objective:** Confirm double clicking cancel button behaves correctly
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Double-click the cancel (X) button
- **Expected:** FAB collapses without error
- **Priority:** Medium

## FUN-007: Verify keyboard Tab navigation through expanded FAB buttons
- **Objective:** Confirm Tab key navigates through all buttons in correct order
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Press Tab to focus on first button in expanded FAB
  2. Continue pressing Tab to cycle through buttons
  3. Observe focus order
- **Expected:** Focus moves through buttons in order: The le -> Viet KUDOS -> Huy (X), with visible focus indicator on each
- **Priority:** Medium

## FUN-008: Verify keyboard Enter activates Button The le
- **Objective:** Confirm pressing Enter on focused "The le" button triggers navigation
- **Precondition:** FAB is expanded, "The le" button has keyboard focus
- **Steps:**
  1. Tab to focus on "The le" button
  2. Press Enter
- **Expected:** The le UPDATE page/modal (3204:6051) is opened
- **Priority:** Medium

## FUN-009: Verify keyboard Enter activates Button Viet KUDOS
- **Objective:** Confirm pressing Enter on focused "Viet KUDOS" button triggers navigation
- **Precondition:** FAB is expanded, "Viet KUDOS" button has keyboard focus
- **Steps:**
  1. Tab to focus on "Viet KUDOS" button
  2. Press Enter
- **Expected:** Viet Kudo form/modal (520:11602) is opened
- **Priority:** Medium

## FUN-010: Verify keyboard Enter activates Button Huy
- **Objective:** Confirm pressing Enter on focused cancel button collapses the FAB
- **Precondition:** FAB is expanded, cancel (X) button has keyboard focus
- **Steps:**
  1. Tab to focus on cancel (X) button
  2. Press Enter
- **Expected:** Expanded FAB panel closes and returns to collapsed state
- **Priority:** Medium

## FUN-011: Verify ESC key closes expanded FAB
- **Objective:** Confirm pressing Escape key collapses the expanded FAB panel
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Press ESC key
- **Expected:** Expanded FAB panel closes and returns to collapsed state
- **Priority:** Medium

## FUN-012: Verify click outside expanded FAB panel
- **Objective:** Confirm behavior when clicking outside the expanded FAB panel area
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Click on an area outside the expanded FAB panel
- **Expected:** Expanded FAB panel closes and returns to collapsed state (based on spec)
- **Priority:** Medium

## FUN-013: Verify background interaction while expanded
- **Objective:** Confirm whether background page elements are interactive while FAB is expanded
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Try clicking on background page elements
  2. Try scrolling the page
- **Expected:** Background elements are not interactive while the expanded FAB is open (or closes FAB first then allows interaction - based on spec)
- **Priority:** Medium

## FUN-014: Verify expanded FAB position remains fixed during scroll
- **Objective:** Confirm the expanded panel stays fixed when user scrolls
- **Precondition:** FAB is in expanded state on a scrollable page
- **Steps:**
  1. Scroll down using mouse wheel
  2. Scroll using keyboard arrows
  3. Scroll using Page Down
- **Expected:** Expanded FAB panel and all buttons remain at fixed position
- **Priority:** High

## FUN-015: Verify expanded FAB state after page reload
- **Objective:** Confirm the FAB reverts to collapsed state on page reload
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Press F5 or reload the page
  2. Observe the FAB state
- **Expected:** FAB is displayed in collapsed state after reload
- **Priority:** Low
