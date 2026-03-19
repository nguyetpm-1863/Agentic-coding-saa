# GUI Test Cases: Dropdown-ngon-ngu

## GUI_001 - Default Collapsed State Display
- **Objective:** Verify the dropdown displays correctly in its default collapsed state
- **Precondition:** User is on a page with the language dropdown
- **Steps:** 1. Navigate to any page. 2. Observe the language dropdown in the header.
- **Expected:** Dropdown displays: Vietnam flag icon on the left, "VN" text on the right, dark gray background. Compact and properly aligned in header.
- **Priority:** High

## GUI_002 - Expanded State Display
- **Objective:** Verify the dropdown displays correctly when expanded/opened
- **Precondition:** User is on a page with the language dropdown
- **Steps:** 1. Click on the language dropdown.
- **Expected:** Dropdown expands showing: Selected item (VN) on top with dark gray background, EN option below with darker/black background. UK flag + "EN" text displayed in option area.
- **Priority:** High

## GUI_003 - Vietnam Flag Icon Display
- **Objective:** Verify the Vietnam flag icon renders correctly
- **Precondition:** Dropdown is visible
- **Steps:** 1. Observe the VN option in the dropdown.
- **Expected:** Vietnam flag (red background with yellow star) is displayed as a small rectangular icon, clearly recognizable.
- **Priority:** Medium

## GUI_004 - UK Flag Icon Display
- **Objective:** Verify the UK/British flag icon renders correctly
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Click on the language dropdown. 2. Observe the EN option.
- **Expected:** UK flag (Union Jack) is displayed as a small rectangular icon on the left side of "EN" text, clearly recognizable.
- **Priority:** Medium

## GUI_005 - Text Color and Contrast
- **Objective:** Verify text is readable with proper contrast against dark background
- **Precondition:** Dropdown is visible
- **Steps:** 1. Observe VN text in collapsed state. 2. Open dropdown and observe EN text.
- **Expected:** Both "VN" and "EN" text are displayed in white color with sufficient contrast against the dark backgrounds.
- **Priority:** Medium

## GUI_006 - Hover State on EN Option
- **Objective:** Verify hover visual feedback on the EN language option
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Click to open the dropdown. 2. Hover mouse over the EN option.
- **Expected:** EN option background changes to a highlight color to indicate interactive state. Cursor changes to pointer.
- **Priority:** Medium

## GUI_007 - Hover State on VN Option
- **Objective:** Verify hover visual feedback on the VN language option
- **Precondition:** Dropdown is expanded with EN currently selected
- **Steps:** 1. Switch language to EN first. 2. Click to open the dropdown. 3. Hover mouse over the VN option.
- **Expected:** VN option background changes to indicate hover state. Cursor changes to pointer.
- **Priority:** Medium

## GUI_008 - Selected vs Non-Selected Visual Distinction
- **Objective:** Verify visual difference between selected and non-selected language
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Click to open the dropdown. 2. Compare the selected language item vs the non-selected option.
- **Expected:** Selected language (top area) has a distinct dark gray background. Non-selected language (bottom area) has a darker/black background. Clear visual distinction between the two states.
- **Priority:** High

## GUI_009 - Option Size (EN Item)
- **Objective:** Verify the EN option item matches design dimensions
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Open dropdown. 2. Inspect EN option element dimensions.
- **Expected:** EN option measures approximately 110x56px as per design spec.
- **Priority:** Low

## GUI_010 - Responsive Display on Mobile (320px)
- **Objective:** Verify dropdown displays correctly on mobile viewport
- **Precondition:** Browser viewport set to 320px width
- **Steps:** 1. Set viewport to 320px width. 2. Navigate to any page. 3. Observe language dropdown.
- **Expected:** Language dropdown is visible, properly sized for mobile, touch target at least 44x44px. Flag and text are not cut off.
- **Priority:** High

## GUI_011 - Responsive Display on Tablet (768px)
- **Objective:** Verify dropdown displays correctly on tablet viewport
- **Precondition:** Browser viewport set to 768px width
- **Steps:** 1. Set viewport to 768px width. 2. Navigate to any page. 3. Observe language dropdown.
- **Expected:** Language dropdown displays correctly, properly positioned in header, all elements visible.
- **Priority:** Medium

## GUI_012 - Responsive Display on Desktop (1024px+)
- **Objective:** Verify dropdown displays correctly on desktop viewport
- **Precondition:** Browser viewport set to 1024px or wider
- **Steps:** 1. Set viewport to 1024px width. 2. Navigate to any page. 3. Observe language dropdown.
- **Expected:** Language dropdown displays correctly at top-right of header, matching Figma design specifications.
- **Priority:** Medium

## GUI_013 - Dropdown Position Relative to Header
- **Objective:** Verify dropdown is positioned correctly within the page header
- **Precondition:** User is on any page
- **Steps:** 1. Navigate to any page. 2. Observe dropdown position within header.
- **Expected:** Dropdown is positioned at the top-right area of the header, properly aligned with other header elements.
- **Priority:** Medium

## GUI_014 - Keyboard Focus Indicator
- **Objective:** Verify visible focus indicator when dropdown receives keyboard focus
- **Precondition:** User is on any page
- **Steps:** 1. Use Tab key to navigate to the dropdown. 2. Observe the focus state.
- **Expected:** A visible focus ring/outline is displayed around the dropdown when it receives keyboard focus.
- **Priority:** Medium

## GUI_015 - Display After Language Switch to EN
- **Objective:** Verify dropdown updates its display after switching to English
- **Precondition:** Current language is VN
- **Steps:** 1. Open dropdown. 2. Click EN option. 3. Observe collapsed dropdown.
- **Expected:** Collapsed dropdown now shows UK flag + "EN" text. Previously displayed VN flag is replaced.
- **Priority:** High
