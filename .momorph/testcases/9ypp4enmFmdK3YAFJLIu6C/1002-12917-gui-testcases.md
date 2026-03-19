# GUI Test Cases - Addlink Box (Modal)

## GUI-001: Modal position and overlay
- **Objective:** Verify modal is displayed centered with dimmed background overlay
- **Precondition:** Modal is triggered to open
- **Steps:** 1. Open the "Add link" modal. 2. Observe position and background.
- **Expected:** Modal is centered on the screen. Background is dimmed/covered with overlay.
- **Specs:** A, B, C, D
- **Priority:** High

## GUI-002: Title display
- **Objective:** Verify title "Them duong dan" is displayed correctly
- **Precondition:** Modal is open
- **Steps:** 1. Observe the title area at top of modal.
- **Expected:** Title "Them duong dan" (Add link) is displayed in bold, dark text, top-left aligned within the modal.
- **Specs:** A
- **Priority:** High

## GUI-003: Text field label display
- **Objective:** Verify label "Noi dung" is displayed correctly for the Text input
- **Precondition:** Modal is open
- **Steps:** 1. Observe the first input field area.
- **Expected:** Label "Noi dung" is displayed to the left of the text input box.
- **Specs:** B.1
- **Priority:** High

## GUI-004: Text input box display
- **Objective:** Verify the Text input box displays correctly
- **Precondition:** Modal is open
- **Steps:** 1. Observe the Text input box.
- **Expected:** Input box is displayed with white background, thin border, rounded corners, approximately 610x56px. Field is empty by default.
- **Specs:** B.2
- **Priority:** High

## GUI-005: Link field label display
- **Objective:** Verify label "URL" is displayed correctly for the Link input
- **Precondition:** Modal is open
- **Steps:** 1. Observe the second input field area.
- **Expected:** Label "URL" is displayed to the left of the link input box.
- **Specs:** C.1
- **Priority:** High

## GUI-006: Link input box display
- **Objective:** Verify the Link/URL input box displays correctly
- **Precondition:** Modal is open
- **Steps:** 1. Observe the Link input box.
- **Expected:** Input box is displayed with white background, thin border, rounded corners, approximately 609x56px. Field is empty by default.
- **Specs:** C.2
- **Priority:** High

## GUI-007: Cancel button display
- **Objective:** Verify Cancel (Huy) button displays correctly
- **Precondition:** Modal is open
- **Steps:** 1. Observe the Cancel button at bottom-left of modal.
- **Expected:** Button displays text "Huy" with "X" icon. Small size, outlined/bordered style.
- **Specs:** D.1
- **Priority:** High

## GUI-008: Save button display
- **Objective:** Verify Save (Luu) button displays correctly
- **Precondition:** Modal is open
- **Steps:** 1. Observe the Save button at bottom-right of modal.
- **Expected:** Button displays text "Luu" with link icon. Large size, yellow background.
- **Specs:** D.2
- **Priority:** High

## GUI-009: Text input focus state
- **Objective:** Verify Text input shows focus highlight when focused
- **Precondition:** Modal is open
- **Steps:** 1. Click into the Text input box.
- **Expected:** Input box shows a highlighted border (focus ring) indicating it is active.
- **Specs:** B.2
- **Priority:** Medium

## GUI-010: Link input focus state
- **Objective:** Verify Link input shows focus highlight when focused
- **Precondition:** Modal is open
- **Steps:** 1. Click into the Link/URL input box.
- **Expected:** Input box shows a highlighted border (focus ring) indicating it is active.
- **Specs:** C.2
- **Priority:** Medium

## GUI-011: Error message display for Text field
- **Objective:** Verify error message displays correctly when Text field validation fails
- **Precondition:** Modal is open
- **Steps:** 1. Leave Text field empty. 2. Click Save (Luu).
- **Expected:** Error message is displayed near the Text field with correct format, position, and styling.
- **Specs:** B, B.2
- **Priority:** High

## GUI-012: Error message display for Link field
- **Objective:** Verify error message displays correctly when Link field validation fails
- **Precondition:** Modal is open
- **Steps:** 1. Leave Link field empty. 2. Click Save (Luu).
- **Expected:** Error message is displayed near the Link field with correct format, position, and styling.
- **Specs:** C, C.2
- **Priority:** High

## GUI-013: Modal display on zoom in/out
- **Objective:** Verify modal displays correctly when browser is zoomed
- **Precondition:** Modal is open
- **Steps:** 1. Zoom browser to 150%. 2. Observe modal layout. 3. Zoom browser to 75%. 4. Observe modal layout.
- **Expected:** Modal layout is not broken. All elements remain visible and usable at different zoom levels.
- **Specs:** A, B, C, D
- **Priority:** Low

## GUI-014: Modal display on different screen sizes
- **Objective:** Verify modal is responsive across different viewport sizes
- **Precondition:** Modal is open
- **Steps:** 1. View modal at 320px width (mobile). 2. View at 768px (tablet). 3. View at 1024px (desktop). 4. View at 1440px (wide).
- **Expected:** Modal adjusts appropriately for each breakpoint. No overflow or cut-off elements. Touch targets >= 44x44px on mobile.
- **Specs:** A, B, C, D
- **Priority:** Medium

## GUI-015: Tab order within modal
- **Objective:** Verify correct tab order among focusable elements
- **Precondition:** Modal is open
- **Steps:** 1. Press Tab repeatedly to cycle through elements.
- **Expected:** Focus moves in order: Text input -> Link input -> Cancel button -> Save button. Focus stays within the modal (focus trap).
- **Specs:** B.2, C.2, D.1, D.2
- **Priority:** Medium

## GUI-016: Modal display on page scroll
- **Objective:** Verify modal remains visible when background page has scrollable content
- **Precondition:** Modal is open, parent page has scrollable content
- **Steps:** 1. Attempt to scroll the page while modal is open.
- **Expected:** Modal remains centered and fully visible. Background scroll is prevented or modal stays in position.
- **Specs:** A, B, C, D
- **Priority:** Medium
