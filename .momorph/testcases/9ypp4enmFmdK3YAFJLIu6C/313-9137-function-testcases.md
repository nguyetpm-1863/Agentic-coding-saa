# FUNCTION Test Cases - Floating Action Button (313:9137)

## FUN-001: Verify FAB click opens expanded state
- **Objective:** Confirm clicking the FAB widget button expands to show 2 action options
- **Precondition:** User is on a page with the FAB displayed in collapsed state
- **Steps:**
  1. Click on the FAB widget button
- **Expected:** FAB expands to show 2 action options: "the le SAA" and "viet kudos" (navigates to expanded state 313:9139)
- **Priority:** High

## FUN-002: Verify FAB double click behavior
- **Objective:** Confirm the FAB behaves correctly on double click
- **Precondition:** User is on a page with the FAB displayed in collapsed state
- **Steps:**
  1. Double-click on the FAB widget button
- **Expected:** FAB expands to show 2 action options (same as single click), no error or unexpected behavior
- **Priority:** Medium

## FUN-003: Verify FAB keyboard navigation (Tab)
- **Objective:** Confirm the FAB is accessible via keyboard Tab navigation
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Press Tab key repeatedly until focus reaches the FAB
  2. Observe focus indicator on the FAB
- **Expected:** FAB receives keyboard focus with visible focus indicator
- **Priority:** Medium

## FUN-004: Verify FAB keyboard activation (Enter)
- **Objective:** Confirm pressing Enter on focused FAB opens the expanded state
- **Precondition:** FAB has keyboard focus
- **Steps:**
  1. Tab to the FAB widget button
  2. Press Enter key
- **Expected:** FAB expands to show 2 action options (same as click behavior)
- **Priority:** Medium

## FUN-005: Verify FAB remains fixed during scroll
- **Objective:** Confirm FAB position does not change when scrolling
- **Precondition:** User is on a scrollable page with the FAB displayed
- **Steps:**
  1. Note the FAB position
  2. Scroll down using mouse wheel
  3. Scroll down using keyboard arrows
  4. Scroll using Page Down button
  5. Check FAB position after each scroll action
- **Expected:** FAB remains at the same fixed position on screen throughout all scroll methods
- **Priority:** High

## FUN-006: Verify FAB hover effect (light shadow)
- **Objective:** Confirm the hover effect produces a light shadow
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Move mouse cursor onto the FAB
  2. Observe the shadow effect
  3. Move mouse cursor away from FAB
  4. Observe shadow removal
- **Expected:** Light shadow appears on hover and disappears when cursor moves away
- **Priority:** Low

## FUN-007: Verify background interaction with FAB collapsed
- **Objective:** Confirm page background content is fully interactive when FAB is in collapsed state
- **Precondition:** User is on a page with the FAB in collapsed state
- **Steps:**
  1. Click on various page elements behind/near the FAB
  2. Scroll the page
  3. Interact with other UI elements
- **Expected:** All background page elements are fully interactive; FAB does not block interactions except on the FAB button itself
- **Priority:** Medium

## FUN-008: Verify FAB click on kudos icon
- **Objective:** Confirm clicking the kudos (write) icon within the FAB triggers the expand action
- **Precondition:** User is on a page with the FAB displayed in collapsed state
- **Steps:**
  1. Click specifically on the kudos/write icon (left icon) within the FAB
- **Expected:** FAB expands to show 2 action options (navigates to expanded state 313:9139)
- **Priority:** Medium

## FUN-009: Verify FAB click on the le SAA icon
- **Objective:** Confirm clicking the the le SAA icon within the FAB triggers the expand action
- **Precondition:** User is on a page with the FAB displayed in collapsed state
- **Steps:**
  1. Click specifically on the the le SAA icon (right icon) within the FAB
- **Expected:** FAB expands to show 2 action options (navigates to expanded state 313:9139)
- **Priority:** Medium
