# GUI Test Cases - Dropdown Phong Ban

## Layout - Container

### TC_DPB_GUI_001 - Dropdown container display
- **Objective:** Verify the dropdown container displays correctly per design specs
- **Precondition:** User is logged in and dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Observe the dropdown container.
- **Expected:** Dropdown container displays with dark background, rounded corners, approximately 101x348px dimensions.
- **Priority:** High

### TC_DPB_GUI_002 - Dropdown position relative to trigger
- **Objective:** Verify the dropdown appears in correct position relative to the trigger element
- **Precondition:** User is logged in
- **Steps:**
  1. Click on the department dropdown trigger.
  2. Observe the position of the dropdown list.
- **Expected:** Dropdown list appears directly below (or near) the trigger element, properly aligned.
- **Priority:** Medium

## Layout - List Items

### TC_DPB_GUI_003 - Department item text alignment
- **Objective:** Verify all department items have centered text
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Observe text alignment of all visible items.
- **Expected:** All department names are centered within their respective list items.
- **Priority:** Medium

### TC_DPB_GUI_004 - Department item text color
- **Objective:** Verify unselected items display white text on dark background
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Observe text color of unselected items.
- **Expected:** Unselected items display white text on dark background.
- **Priority:** Medium

### TC_DPB_GUI_005 - Department item spacing
- **Objective:** Verify consistent spacing between department items
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Observe spacing between consecutive items.
- **Expected:** All items have consistent, uniform spacing between them.
- **Priority:** Low

## Display State - Default State

### TC_DPB_GUI_006 - Default selected department display
- **Objective:** Verify the default selected department is displayed correctly when dropdown opens
- **Precondition:** User is on the page, no department filter change has been made
- **Steps:**
  1. Open the department dropdown.
  2. Observe the initially selected/highlighted item.
- **Expected:** The default department (e.g., user's own department) is highlighted with a lighter background.
- **Priority:** High

### TC_DPB_GUI_007 - All visible departments display
- **Objective:** Verify visible departments display correctly in the initial view
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Observe the visible items without scrolling.
- **Expected:** Approximately 6 department items are visible (CEVC2, CEVC3, CEVC4, CEVC1, OPD, Infra as shown in design). Text is readable and not truncated.
- **Priority:** High

## Display State - Selected State

### TC_DPB_GUI_008 - Selected item highlight
- **Objective:** Verify the selected department item has a distinct highlighted appearance
- **Precondition:** Dropdown is open with a department selected
- **Steps:**
  1. Open the department dropdown.
  2. Observe the currently selected department item.
- **Expected:** Selected item displays with a lighter/brighter background, clearly distinguishable from unselected items.
- **Priority:** High

### TC_DPB_GUI_009 - Only one item highlighted at a time
- **Objective:** Verify only one department can be visually highlighted as selected
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Count the number of items with selected/highlight state.
- **Expected:** Exactly one item displays the selected/highlighted state.
- **Priority:** High

## Display State - Hover State

### TC_DPB_GUI_010 - Hover effect on unselected item
- **Objective:** Verify hover effect appears on unselected department items
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Hover over an unselected department item.
- **Expected:** Item displays a subtle highlight effect. Cursor changes to pointer.
- **Priority:** Medium

### TC_DPB_GUI_011 - Hover effect on selected item
- **Objective:** Verify hover effect on the already selected department item
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Hover over the currently selected (highlighted) department item.
- **Expected:** Cursor changes to pointer. Selected highlight is maintained.
- **Priority:** Low

## Scroll

### TC_DPB_GUI_012 - Vertical scrollbar display
- **Objective:** Verify scrollbar appears when department list exceeds visible area
- **Precondition:** Dropdown is open (50 departments, ~6 visible)
- **Steps:**
  1. Open the department dropdown.
  2. Observe whether a vertical scrollbar is present.
- **Expected:** A vertical scrollbar is displayed since the list contains 50 departments but only ~6 are visible at once.
- **Priority:** High

### TC_DPB_GUI_013 - Scroll to bottom of list
- **Objective:** Verify user can scroll to see all departments including the last item
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Scroll down to the bottom of the list.
- **Expected:** The last department in the list is visible and accessible. Scrolling is smooth.
- **Priority:** High

### TC_DPB_GUI_014 - Scroll to top of list
- **Objective:** Verify user can scroll back to the top of the department list
- **Precondition:** Dropdown is open, scrolled to bottom
- **Steps:**
  1. Open the department dropdown.
  2. Scroll to the bottom of the list.
  3. Scroll back to the top.
- **Expected:** The first department in the list is visible. Scrolling is smooth.
- **Priority:** Medium

## Responsive

### TC_DPB_GUI_015 - Dropdown display on mobile (320px)
- **Objective:** Verify dropdown displays correctly on mobile viewport
- **Precondition:** Browser viewport set to 320px width
- **Steps:**
  1. Set viewport to 320px width.
  2. Open the department dropdown.
- **Expected:** Dropdown displays correctly without overflowing the screen. Items are readable and tappable (touch targets at least 44x44px).
- **Priority:** High

### TC_DPB_GUI_016 - Dropdown display on tablet (768px)
- **Objective:** Verify dropdown displays correctly on tablet viewport
- **Precondition:** Browser viewport set to 768px width
- **Steps:**
  1. Set viewport to 768px width.
  2. Open the department dropdown.
- **Expected:** Dropdown displays correctly, properly positioned, items readable.
- **Priority:** Medium

### TC_DPB_GUI_017 - Dropdown display on desktop (1024px+)
- **Objective:** Verify dropdown displays correctly on desktop viewport
- **Precondition:** Browser viewport set to 1024px or wider
- **Steps:**
  1. Set viewport to 1024px width.
  2. Open the department dropdown.
- **Expected:** Dropdown displays correctly as per design specs (101x348px container, dark background, rounded corners).
- **Priority:** Medium
