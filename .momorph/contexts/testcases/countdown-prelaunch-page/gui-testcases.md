# GUI Test Cases - Countdown - Prelaunch Page

## GUI-001: Verify overall page layout matches design
- **Category:** GUI > Layout
- **Test Objective:** Verify the countdown page layout matches the Figma design specification
- **Precondition:** Countdown page is accessible
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Compare the overall layout with the Figma design (Frame 2268:35127)
- **Expected Result:** Page layout matches the design: countdown units (Days, Hours, Minutes) are properly positioned and aligned
- **Priority:** High
- **Testcase Type:** Normal

## GUI-002: Verify Days counter displays 2 LED-style digit boxes
- **Category:** GUI > Days Counter Display
- **Test Objective:** Verify the Days counter displays with 2 LED-style digit boxes as per design
- **Precondition:** Countdown page is loaded with a target date more than 1 day away
- **Test Data:** Target date set to at least 2 days in the future
- **Steps:**
  1. Open the countdown page
  2. Observe the Days counter section
- **Expected Result:** The Days counter shows exactly 2 LED-style digit boxes displaying the number of remaining days
- **Priority:** High
- **Testcase Type:** Normal

## GUI-003: Verify Hours counter displays 2 LED-style digit boxes
- **Category:** GUI > Hours Counter Display
- **Test Objective:** Verify the Hours counter displays with 2 LED-style digit boxes as per design
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Observe the Hours counter section
- **Expected Result:** The Hours counter shows exactly 2 LED-style digit boxes displaying the remaining hours (00-23)
- **Priority:** High
- **Testcase Type:** Normal

## GUI-004: Verify Minutes counter displays 2 LED-style digit boxes
- **Category:** GUI > Minutes Counter Display
- **Test Objective:** Verify the Minutes counter displays with 2 LED-style digit boxes as per design
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Observe the Minutes counter section
- **Expected Result:** The Minutes counter shows exactly 2 LED-style digit boxes displaying the remaining minutes (00-59)
- **Priority:** High
- **Testcase Type:** Normal

## GUI-005: Verify "DAYS" label display
- **Category:** GUI > Labels
- **Test Objective:** Verify the "DAYS" label is displayed correctly as per design
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Observe the label below the Days counter
- **Expected Result:** The label "DAYS" is displayed in uppercase, white text, positioned correctly below the digit boxes
- **Priority:** High
- **Testcase Type:** Normal

## GUI-006: Verify "HOURS" label display
- **Category:** GUI > Labels
- **Test Objective:** Verify the "HOURS" label is displayed correctly as per design
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Observe the label below the Hours counter
- **Expected Result:** The label "HOURS" is displayed in uppercase, white text, positioned correctly below the digit boxes
- **Priority:** High
- **Testcase Type:** Normal

## GUI-007: Verify "MINUTES" label display
- **Category:** GUI > Labels
- **Test Objective:** Verify the "MINUTES" label is displayed correctly as per design
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Observe the label below the Minutes counter
- **Expected Result:** The label "MINUTES" is displayed in uppercase, white text, positioned correctly below the digit boxes
- **Priority:** High
- **Testcase Type:** Normal

## GUI-008: Verify labels are not editable
- **Category:** GUI > Labels
- **Test Objective:** Verify the countdown labels (DAYS, HOURS, MINUTES) cannot be edited by the user
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Try to click on the "DAYS" label and type text
  3. Try to click on the "HOURS" label and type text
  4. Try to click on the "MINUTES" label and type text
- **Expected Result:** None of the labels can be edited or modified by user interaction
- **Priority:** Medium
- **Testcase Type:** Normal

## GUI-009: Verify countdown digit values are not editable
- **Category:** GUI > Layout
- **Test Objective:** Verify the countdown digit values cannot be edited by the user
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Try to click on each digit box and type a value
  3. Try to select the digit text
- **Expected Result:** Digit values cannot be edited or selected by user interaction
- **Priority:** Medium
- **Testcase Type:** Normal

## GUI-010: Verify zero-padded display format for single-digit values
- **Category:** GUI > Days Counter Display
- **Test Objective:** Verify that single-digit values are displayed with leading zero
- **Precondition:** Target date is set so that days remaining is between 1 and 9
- **Test Data:** Target date set to produce single-digit days (e.g., 5 days away)
- **Steps:**
  1. Open the countdown page when days remaining is a single digit (e.g., 5)
  2. Observe the Days counter display
- **Expected Result:** The Days counter displays "05" (zero-padded 2-digit format), not "5"
- **Priority:** High
- **Testcase Type:** Normal

## GUI-011: Verify responsive layout on mobile (320px)
- **Category:** GUI > Responsive Design
- **Test Objective:** Verify the countdown page displays correctly on small mobile screens
- **Precondition:** Countdown page is accessible
- **Test Data:** Screen width: 320px
- **Steps:**
  1. Open the countdown page
  2. Set viewport width to 320px (or use mobile device)
  3. Observe the layout of all countdown elements
- **Expected Result:** All countdown units (Days, Hours, Minutes) are visible and properly laid out; no overlapping or cut-off elements; text is readable
- **Priority:** High
- **Testcase Type:** Normal

## GUI-012: Verify responsive layout on tablet (768px)
- **Category:** GUI > Responsive Design
- **Test Objective:** Verify the countdown page displays correctly on tablet screens
- **Precondition:** Countdown page is accessible
- **Test Data:** Screen width: 768px
- **Steps:**
  1. Open the countdown page
  2. Set viewport width to 768px
  3. Observe the layout of all countdown elements
- **Expected Result:** All countdown units are displayed correctly with appropriate sizing for tablet view
- **Priority:** High
- **Testcase Type:** Normal

## GUI-013: Verify responsive layout on desktop (1024px)
- **Category:** GUI > Responsive Design
- **Test Objective:** Verify the countdown page displays correctly on desktop screens
- **Precondition:** Countdown page is accessible
- **Test Data:** Screen width: 1024px
- **Steps:**
  1. Open the countdown page
  2. Set viewport width to 1024px
  3. Observe the layout of all countdown elements
- **Expected Result:** All countdown units are displayed correctly matching the Figma desktop design
- **Priority:** High
- **Testcase Type:** Normal

## GUI-014: Verify responsive layout on wide screen (1440px)
- **Category:** GUI > Responsive Design
- **Test Objective:** Verify the countdown page displays correctly on wide screens
- **Precondition:** Countdown page is accessible
- **Test Data:** Screen width: 1440px
- **Steps:**
  1. Open the countdown page
  2. Set viewport width to 1440px
  3. Observe the layout of all countdown elements
- **Expected Result:** All countdown units are displayed correctly; content is properly centered/contained
- **Priority:** Medium
- **Testcase Type:** Normal

## GUI-015: Verify page display on Chrome browser
- **Category:** GUI > Cross-Browser
- **Test Objective:** Verify the countdown page renders correctly on Chrome
- **Precondition:** Latest Chrome browser installed
- **Test Data:**
- **Steps:**
  1. Open the countdown page in Chrome
  2. Verify all visual elements match the design
- **Expected Result:** Page layout, LED-style digits, labels, and countdown animation display correctly in Chrome
- **Priority:** High
- **Testcase Type:** Normal

## GUI-016: Verify page display on Firefox browser
- **Category:** GUI > Cross-Browser
- **Test Objective:** Verify the countdown page renders correctly on Firefox
- **Precondition:** Latest Firefox browser installed
- **Test Data:**
- **Steps:**
  1. Open the countdown page in Firefox
  2. Verify all visual elements match the design
- **Expected Result:** Page layout, LED-style digits, labels, and countdown animation display correctly in Firefox
- **Priority:** High
- **Testcase Type:** Normal

## GUI-017: Verify page display on Safari browser
- **Category:** GUI > Cross-Browser
- **Test Objective:** Verify the countdown page renders correctly on Safari
- **Precondition:** Latest Safari browser installed
- **Test Data:**
- **Steps:**
  1. Open the countdown page in Safari
  2. Verify all visual elements match the design
- **Expected Result:** Page layout, LED-style digits, labels, and countdown animation display correctly in Safari
- **Priority:** High
- **Testcase Type:** Normal

## GUI-018: Verify page display on Edge browser
- **Category:** GUI > Cross-Browser
- **Test Objective:** Verify the countdown page renders correctly on Edge
- **Precondition:** Latest Edge browser installed
- **Test Data:**
- **Steps:**
  1. Open the countdown page in Edge
  2. Verify all visual elements match the design
- **Expected Result:** Page layout, LED-style digits, labels, and countdown animation display correctly in Edge
- **Priority:** Medium
- **Testcase Type:** Normal

## GUI-019: Verify page display when zoomed in (150%)
- **Category:** GUI > Responsive Design
- **Test Objective:** Verify the countdown page displays correctly when browser zoom is increased
- **Precondition:** Countdown page is loaded
- **Test Data:** Browser zoom level: 150%
- **Steps:**
  1. Open the countdown page
  2. Zoom in to 150% using Ctrl+Plus (or Cmd+Plus)
  3. Observe the layout
- **Expected Result:** All countdown elements remain visible and properly aligned; no elements overlap or get cut off
- **Priority:** Medium
- **Testcase Type:** Normal

## GUI-020: Verify page display when zoomed out (75%)
- **Category:** GUI > Responsive Design
- **Test Objective:** Verify the countdown page displays correctly when browser zoom is decreased
- **Precondition:** Countdown page is loaded
- **Test Data:** Browser zoom level: 75%
- **Steps:**
  1. Open the countdown page
  2. Zoom out to 75% using Ctrl+Minus (or Cmd+Minus)
  3. Observe the layout
- **Expected Result:** All countdown elements remain visible and properly aligned
- **Priority:** Low
- **Testcase Type:** Normal

## GUI-021: Verify no unnecessary scrollbars on default viewport
- **Category:** GUI > Layout
- **Test Objective:** Verify the countdown page does not display unnecessary scrollbars
- **Precondition:** Countdown page is loaded at standard desktop resolution
- **Test Data:** Screen width: 1024px or larger
- **Steps:**
  1. Open the countdown page at standard desktop resolution
  2. Check for horizontal and vertical scrollbars
- **Expected Result:** No unnecessary horizontal scrollbar is displayed; vertical scrollbar only appears if content exceeds viewport height
- **Priority:** Medium
- **Testcase Type:** Normal
