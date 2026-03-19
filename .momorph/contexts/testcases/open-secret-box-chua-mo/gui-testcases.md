# GUI Test Cases: Open Secret Box - Chua Mo (Modal)

---

## GUI-001: Modal position and overlay
- **Category:** GUI > Layout > Modal position
- **Objective:** Verify modal is centered on screen with dark overlay background
- **Precondition:** Modal is open
- **Steps:**
  1. Open the secret box modal
  2. Observe the modal position and background
- **Expected:** Modal is centered horizontally and vertically on screen; dark semi-transparent overlay covers the background content
- **Priority:** High

## GUI-002: Title text and style
- **Category:** GUI > Label > Title
- **Objective:** Verify title displays correct text with proper styling
- **Precondition:** Modal is open
- **Steps:**
  1. Observe the title text at the top of the modal
- **Expected:** Title displays "KHAM PHA SECRET BOX CUA BAN" in uppercase, bold, golden/yellow color, centered at top of modal
- **Priority:** High

## GUI-003: Close button (X) position and style
- **Category:** GUI > Button > Close
- **Objective:** Verify X button displays correctly in top-right corner
- **Precondition:** Modal is open
- **Steps:**
  1. Observe the X button position and appearance
- **Expected:** X button is positioned at top-right corner of the modal, visible and properly styled
- **Priority:** High

## GUI-004: Close button (X) hover state
- **Category:** GUI > Button > Close hover
- **Objective:** Verify X button has visual feedback on hover
- **Precondition:** Modal is open
- **Steps:**
  1. Hover mouse over the X button
- **Expected:** X button shows hover state (color change, opacity change, or cursor change to pointer)
- **Priority:** Low

## GUI-005: Instruction text display (count > 0)
- **Category:** GUI > Label > Instruction text
- **Objective:** Verify instruction text displays when user has unopened boxes
- **Precondition:** Modal is open; unopened secret box count > 0
- **Steps:**
  1. Observe the instruction text below the title
- **Expected:** Text "Click vao box de mo" is displayed, centered, white color, below the title and above the box image
- **Priority:** High

## GUI-006: Instruction text hidden (count = 0)
- **Category:** GUI > Label > Instruction text hidden
- **Objective:** Verify instruction text is hidden when user has 0 unopened boxes
- **Precondition:** Modal is open; unopened secret box count = 0
- **Steps:**
  1. Observe the area below the title
- **Expected:** Instruction text "Click vao box de mo" is not displayed
- **Priority:** High

## GUI-007: Box image display
- **Category:** GUI > Image > Box image
- **Objective:** Verify gift box image displays correctly
- **Precondition:** Modal is open; unopened secret box count > 0
- **Steps:**
  1. Observe the box image in the center of the modal
- **Expected:** Gift box illustration with golden ribbon and sparkle effects displays correctly, not broken or distorted, centered in modal
- **Priority:** High

## GUI-008: Box image cursor style (count > 0)
- **Category:** GUI > Image > Cursor active
- **Objective:** Verify cursor shows pointer when hovering box image with available boxes
- **Precondition:** Modal is open; unopened secret box count > 0
- **Steps:**
  1. Hover mouse over the box image
- **Expected:** Cursor changes to pointer (hand icon) indicating the image is clickable
- **Priority:** Medium

## GUI-009: Box image cursor style (count = 0)
- **Category:** GUI > Image > Cursor disabled
- **Objective:** Verify cursor shows default/not-allowed when box count is 0
- **Precondition:** Modal is open; unopened secret box count = 0
- **Steps:**
  1. Hover mouse over the box image
- **Expected:** Cursor shows default arrow or not-allowed icon, indicating the image is not clickable
- **Priority:** Medium

## GUI-010: Counter label display
- **Category:** GUI > Label > Counter label
- **Objective:** Verify "Secretbox chua mo" label text and style
- **Precondition:** Modal is open
- **Steps:**
  1. Observe the counter area at the bottom of the modal
- **Expected:** Label "Secretbox chua mo" displays in small, white text at the bottom of the modal
- **Priority:** High

## GUI-011: Counter number display
- **Category:** GUI > Label > Counter number
- **Objective:** Verify the counter number displays with correct style
- **Precondition:** Modal is open; user has 5 unopened secret boxes
- **Steps:**
  1. Observe the number next to the counter label
- **Expected:** Number "05" displays in large, bold, yellow/golden font next to the label text
- **Priority:** High

## GUI-012: Counter number with single digit
- **Category:** GUI > Label > Counter format
- **Objective:** Verify counter displays with leading zero for single-digit numbers
- **Precondition:** Modal is open; user has 3 unopened secret boxes
- **Steps:**
  1. Observe the counter number
- **Expected:** Number displays as "03" (zero-padded two-digit format)
- **Priority:** Medium

## GUI-013: Counter number with zero
- **Category:** GUI > Label > Counter zero
- **Objective:** Verify counter displays correctly when count is 0
- **Precondition:** Modal is open; user has 0 unopened secret boxes
- **Steps:**
  1. Observe the counter number
- **Expected:** Number displays as "00" in the same style
- **Priority:** Medium

## GUI-014: Modal background color
- **Category:** GUI > Layout > Background
- **Objective:** Verify modal has dark background color as per design
- **Precondition:** Modal is open
- **Steps:**
  1. Observe the modal background
- **Expected:** Modal has dark navy/black background color matching the Figma design
- **Priority:** Medium

## GUI-015: Responsive display - Mobile (320px)
- **Category:** GUI > Responsive > Mobile
- **Objective:** Verify modal displays correctly on mobile viewport
- **Precondition:** Modal is open; viewport width = 320px
- **Steps:**
  1. Open modal on mobile viewport
  2. Observe all elements
- **Expected:** Modal scales appropriately, all elements visible, no horizontal scrolling, text readable, image not cropped
- **Priority:** High

## GUI-016: Responsive display - Tablet (768px)
- **Category:** GUI > Responsive > Tablet
- **Objective:** Verify modal displays correctly on tablet viewport
- **Precondition:** Modal is open; viewport width = 768px
- **Steps:**
  1. Open modal on tablet viewport
  2. Observe all elements
- **Expected:** Modal scales appropriately, layout intact, all elements properly sized
- **Priority:** Medium

## GUI-017: Responsive display - Desktop (1024px)
- **Category:** GUI > Responsive > Desktop
- **Objective:** Verify modal displays correctly on desktop viewport
- **Precondition:** Modal is open; viewport width = 1024px
- **Steps:**
  1. Open modal on desktop viewport
  2. Observe all elements
- **Expected:** Modal displays centered with proper proportions matching Figma design
- **Priority:** Medium

## GUI-018: Zoom in/out display
- **Category:** GUI > Responsive > Zoom
- **Objective:** Verify modal layout integrity when zooming browser
- **Precondition:** Modal is open
- **Steps:**
  1. Zoom browser to 150%
  2. Zoom browser to 75%
  3. Observe modal layout at each zoom level
- **Expected:** Modal layout is not broken, all elements visible and properly aligned at different zoom levels
- **Priority:** Low

## GUI-019: Background content not interactive
- **Category:** GUI > Layout > Overlay interaction
- **Objective:** Verify background content is not clickable while modal is open
- **Precondition:** Modal is open
- **Steps:**
  1. Try to click on various elements on the background page (behind the overlay)
- **Expected:** No interaction with background elements; modal stays open
- **Priority:** Medium

## GUI-020: Scroll behavior with modal open
- **Category:** GUI > Layout > Scroll lock
- **Objective:** Verify background page does not scroll while modal is open
- **Precondition:** Modal is open; parent page has scrollable content
- **Steps:**
  1. Try to scroll up/down using mouse wheel
  2. Try to scroll using keyboard (arrow keys, Page Up/Down)
- **Expected:** Background page does not scroll; modal remains fixed in position
- **Priority:** Medium

## GUI-021: Text selection in modal
- **Category:** GUI > Interaction > Text select
- **Objective:** Verify text can be selected and copied in the modal
- **Precondition:** Modal is open
- **Steps:**
  1. Try to select the title text
  2. Try to select the instruction text
  3. Try Ctrl+C to copy selected text
- **Expected:** Text is selectable and copyable; modal remains unchanged
- **Priority:** Low
