# GUI Test Cases - The le UPDATE

## GUI-001: Verify modal layout and position
- **Category:** Layout
- **Sub Category:** Modal Position
- **Test Objective:** Verify the modal is displayed at the correct position per design specs
- **Precondition:** User is logged in and "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Observe the modal position on screen
- **Expected Result:** Modal is centered on screen (or positioned as per design). Background has overlay/dimmed effect as per spec.
- **Priority:** High
- **Testcase Type:** Manual

## GUI-002: Verify modal background overlay
- **Category:** Layout
- **Sub Category:** Background Overlay
- **Test Objective:** Verify background overlay is displayed when modal is open
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Observe the background behind the modal
- **Expected Result:** Background is covered with a semi-transparent overlay as per design
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-003: Verify title display
- **Category:** Content Display
- **Sub Category:** Title
- **Test Objective:** Verify the title text is displayed correctly with proper styling
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check the title text, position, font, size, and color
- **Expected Result:** Title is displayed at the correct position with correct text content, font style, font size, and color matching the design
- **Priority:** High
- **Testcase Type:** Manual

## GUI-004: Verify description text display
- **Category:** Content Display
- **Sub Category:** Description
- **Test Objective:** Verify the description text is displayed correctly
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check the description text content, position, and styling
- **Expected Result:** Description is displayed correctly with proper text, position, font, size, color, and line spacing matching the design
- **Priority:** High
- **Testcase Type:** Manual

## GUI-005: Verify reward list display
- **Category:** Content Display
- **Sub Category:** Reward List
- **Test Objective:** Verify the reward list items are displayed correctly
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check the reward list items, order, and styling
- **Expected Result:** All reward items are listed in correct order with proper formatting, bullet points/numbering, and styling per design
- **Priority:** High
- **Testcase Type:** Manual

## GUI-006: Verify 6 badges display
- **Category:** Content Display
- **Sub Category:** Badges
- **Test Objective:** Verify all 6 badges are displayed correctly
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check all 6 badge images, labels, positions, and sizes
- **Expected Result:** All 6 badges are displayed with correct images, labels, positions, sizes, and spacing as per design
- **Priority:** High
- **Testcase Type:** Manual

## GUI-007: Verify badge image quality
- **Category:** Content Display
- **Sub Category:** Badges
- **Sub Sub Category:** Image Quality
- **Test Objective:** Verify badge images are not blurry or distorted
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Inspect each badge image for clarity and quality
- **Expected Result:** All badge images are clear, not blurry, not distorted, and properly rendered
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-008: Verify "Dong" button display (default state)
- **Category:** Button Display
- **Sub Category:** Dong Button
- **Sub Sub Category:** Default State
- **Test Objective:** Verify the "Dong" button displays correctly in default state
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check the "Dong" button: icon (X), text, position, style (secondary/outlined)
- **Expected Result:** "Dong" button displays with X icon on the left, text "Dong", secondary/outlined style, at correct position in footer
- **Priority:** High
- **Testcase Type:** Manual

## GUI-009: Verify "Dong" button hover state
- **Category:** Button Display
- **Sub Category:** Dong Button
- **Sub Sub Category:** Hover State
- **Test Objective:** Verify hover effect on "Dong" button
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Hover mouse over the "Dong" button
- **Expected Result:** Button shows hover effect (color/elevation change) as per design
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-010: Verify "Viet KUDOS" button display (default state)
- **Category:** Button Display
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Default State
- **Test Objective:** Verify the "Viet KUDOS" button displays correctly in default state
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check the "Viet KUDOS" button: icon (pen), text, position, style (primary/yellow)
- **Expected Result:** "Viet KUDOS" button displays with pen icon on the left, text "Viet KUDOS", primary yellow style, at correct position in footer
- **Priority:** High
- **Testcase Type:** Manual

## GUI-011: Verify "Viet KUDOS" button hover state
- **Category:** Button Display
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Hover State
- **Test Objective:** Verify hover effect on "Viet KUDOS" button
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Hover mouse over the "Viet KUDOS" button
- **Expected Result:** Button shows hover effect (color/elevation change) as per design
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-012: Verify "Viet KUDOS" button disabled state
- **Category:** Button Display
- **Sub Category:** Viet KUDOS Button
- **Sub Sub Category:** Disabled State
- **Test Objective:** Verify the "Viet KUDOS" button displays correctly when disabled
- **Precondition:** "The le UPDATE" modal is open and button is in disabled state (if applicable)
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal under conditions where "Viet KUDOS" is disabled
  2. Check the button appearance
- **Expected Result:** Button is dimmed/grayed out and cursor does not change to pointer
- **Priority:** Low
- **Testcase Type:** Manual

## GUI-013: Verify scrollbar display when content overflows
- **Category:** Scrollbar
- **Sub Category:** Display
- **Test Objective:** Verify scrollbar appears when content exceeds visible area
- **Precondition:** "The le UPDATE" modal is open with content longer than modal height
- **Test Data:** Rules content that exceeds the modal viewport
- **Steps:**
  1. Open the "The le UPDATE" modal with long content
  2. Check if vertical scrollbar is displayed
- **Expected Result:** Vertical scrollbar is displayed within the content area of the modal
- **Priority:** High
- **Testcase Type:** Manual

## GUI-014: Verify no scrollbar when content fits
- **Category:** Scrollbar
- **Sub Category:** No Display
- **Test Objective:** Verify scrollbar does not appear when content fits within modal
- **Precondition:** "The le UPDATE" modal is open with short content
- **Test Data:** Rules content that fits within the modal viewport
- **Steps:**
  1. Open the "The le UPDATE" modal with short content
  2. Check if scrollbar is present
- **Expected Result:** No scrollbar is displayed
- **Priority:** Low
- **Testcase Type:** Manual

## GUI-015: Verify modal display on mobile (320px)
- **Category:** Responsive Design
- **Sub Category:** Mobile
- **Test Objective:** Verify modal layout on mobile screen
- **Precondition:** Browser set to 320px width
- **Test Data:** Screen width: 320px
- **Steps:**
  1. Set browser width to 320px
  2. Open the "The le UPDATE" modal
  3. Check all elements: title, description, rewards, badges, buttons
- **Expected Result:** Modal is fully visible, no horizontal overflow, all elements properly stacked, touch targets at least 44x44px, text readable
- **Priority:** High
- **Testcase Type:** Manual

## GUI-016: Verify modal display on tablet (768px)
- **Category:** Responsive Design
- **Sub Category:** Tablet
- **Test Objective:** Verify modal layout on tablet screen
- **Precondition:** Browser set to 768px width
- **Test Data:** Screen width: 768px
- **Steps:**
  1. Set browser width to 768px
  2. Open the "The le UPDATE" modal
  3. Check all elements layout
- **Expected Result:** Modal displays correctly with appropriate sizing and spacing for tablet
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-017: Verify modal display on desktop (1024px)
- **Category:** Responsive Design
- **Sub Category:** Desktop
- **Test Objective:** Verify modal layout on desktop screen
- **Precondition:** Browser set to 1024px width
- **Test Data:** Screen width: 1024px
- **Steps:**
  1. Set browser width to 1024px
  2. Open the "The le UPDATE" modal
  3. Check all elements layout
- **Expected Result:** Modal displays correctly with appropriate sizing and spacing for desktop
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-018: Verify modal display on wide screen (1440px)
- **Category:** Responsive Design
- **Sub Category:** Wide
- **Test Objective:** Verify modal layout on wide screen
- **Precondition:** Browser set to 1440px width
- **Test Data:** Screen width: 1440px
- **Steps:**
  1. Set browser width to 1440px
  2. Open the "The le UPDATE" modal
  3. Check all elements layout
- **Expected Result:** Modal displays correctly, centered, with appropriate max-width
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-019: Verify fixed text/labels are not editable
- **Category:** Text Display
- **Sub Category:** Non-editable
- **Test Objective:** Verify that all static text and labels cannot be edited by user
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Try to click and edit any text/label in the modal
- **Expected Result:** All text and labels are read-only and cannot be edited
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-020: Verify modal display after zoom in/out
- **Category:** Responsive Design
- **Sub Category:** Zoom
- **Test Objective:** Verify modal layout is not broken when zooming
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** Zoom levels: 75%, 100%, 125%, 150%
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Zoom in to 125% and 150%
  3. Zoom out to 75%
  4. Check layout at each zoom level
- **Expected Result:** Modal layout remains intact without broken elements or overlapping content at all zoom levels
- **Priority:** Medium
- **Testcase Type:** Manual

## GUI-021: Verify footer buttons alignment
- **Category:** Button Display
- **Sub Category:** Footer Alignment
- **Test Objective:** Verify both footer buttons are properly aligned
- **Precondition:** "The le UPDATE" modal is open
- **Test Data:** N/A
- **Steps:**
  1. Open the "The le UPDATE" modal
  2. Check the alignment and spacing of "Dong" and "Viet KUDOS" buttons in the footer
- **Expected Result:** Both buttons are properly aligned in the footer area with correct spacing between them as per design
- **Priority:** Medium
- **Testcase Type:** Manual
