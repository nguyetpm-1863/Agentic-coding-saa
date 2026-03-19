# ACCESSING Test Cases - Floating Action Button 2 (313:9139)

## ACC-001: Verify expanded FAB panel is displayed after clicking collapsed FAB
- **Objective:** Confirm the expanded FAB panel appears when user clicks the collapsed FAB widget
- **Precondition:** User is on a page with the collapsed FAB (313:9137) displayed
- **Steps:**
  1. Click the collapsed FAB widget button
  2. Observe the expanded FAB panel
- **Expected:** Expanded FAB panel is displayed showing 3 buttons: "The le", "Viet KUDOS", and cancel (X) button
- **Priority:** High

## ACC-002: Verify all 3 buttons are visible in expanded state
- **Objective:** Confirm all action buttons are visible and accessible in the expanded FAB
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Observe the expanded FAB panel
  2. Check for "The le" button
  3. Check for "Viet KUDOS" button
  4. Check for cancel (X) button
- **Expected:** All 3 buttons are visible and not clipped or hidden
- **Priority:** High

## ACC-003: Verify expanded FAB remains fixed during scroll
- **Objective:** Confirm the expanded FAB panel stays fixed when scrolling the page
- **Precondition:** FAB is in expanded state on a scrollable page
- **Steps:**
  1. Scroll down using mouse wheel
  2. Scroll up
  3. Scroll using keyboard (Page Down, Page Up)
- **Expected:** Expanded FAB panel remains at the same fixed position throughout scrolling
- **Priority:** High

## ACC-004: Verify expanded FAB state after page reload
- **Objective:** Confirm the expanded FAB state behavior after page refresh
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Reload the page (F5 or browser refresh)
  2. Observe the FAB state
- **Expected:** FAB returns to collapsed state after page reload
- **Priority:** Medium
