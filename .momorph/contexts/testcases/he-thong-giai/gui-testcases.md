# GUI Test Cases: He Thong Giai (Award System)

## GUI-001: Keyvisual banner display
- **Category:** GUI
- **Sub_Category:** Keyvisual Banner
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify the keyvisual hero banner displays correctly with image, title, and subtitle
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Navigate to the Award System page
  2. Observe the keyvisual banner at the top of the page
- **Expected_Result:**
  - Background image displays at 1200x871px with cover fit and center crop
  - Title "ROOT FURTHER" displays correctly
  - Subtitle "Sun* Annual Award 2025" displays correctly
  - Logo and icon visible in top corner
  - Image has alt text "Keyvisual Sun* Annual Award 2025"
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-002: Keyvisual banner responsive - Mobile (320px)
- **Category:** GUI
- **Sub_Category:** Keyvisual Banner
- **Sub_Sub_Category:** Responsive
- **Test_Objective:** Verify keyvisual banner scales correctly on mobile viewport
- **Precondition:** User is on the Award System page
- **Test_Data:** Viewport width: 320px
- **Steps:**
  1. Set browser viewport to 320px width
  2. Observe the keyvisual banner
- **Expected_Result:** Banner scales responsively with center crop; title and subtitle remain readable; no horizontal overflow
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-003: Keyvisual banner responsive - Tablet (768px)
- **Category:** GUI
- **Sub_Category:** Keyvisual Banner
- **Sub_Sub_Category:** Responsive
- **Test_Objective:** Verify keyvisual banner scales correctly on tablet viewport
- **Precondition:** User is on the Award System page
- **Test_Data:** Viewport width: 768px
- **Steps:**
  1. Set browser viewport to 768px width
  2. Observe the keyvisual banner
- **Expected_Result:** Banner scales responsively with center crop; all text elements display correctly
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-004: Keyvisual banner responsive - Desktop (1024px, 1440px)
- **Category:** GUI
- **Sub_Category:** Keyvisual Banner
- **Sub_Sub_Category:** Responsive
- **Test_Objective:** Verify keyvisual banner displays correctly at desktop widths
- **Precondition:** User is on the Award System page
- **Test_Data:** Viewport widths: 1024px, 1440px
- **Steps:**
  1. Set browser viewport to 1024px, then 1440px
  2. Observe the keyvisual banner at each width
- **Expected_Result:** Banner displays at full width with proper cover/crop behavior; all elements positioned correctly
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-005: Title section display
- **Category:** GUI
- **Sub_Category:** Title Section
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify the award system title section displays correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to the title section below the keyvisual
  2. Observe the title text elements
- **Expected_Result:**
  - Sub-text "Sun* annual awards 2025" displays in small, faded style
  - Main title "He thong giai thuong SAA 2025" displays in large, gold/yellow color
  - Text is not editable
  - Position and formatting match design spec
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-006: Navigation menu display
- **Category:** GUI
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify the left navigation menu displays all 6 award categories correctly
- **Precondition:** User is on the Award System page, scrolled to award section
- **Test_Data:**
- **Steps:**
  1. Scroll to the award system section
  2. Observe the left navigation menu
- **Expected_Result:**
  - 6 menu items displayed in correct order: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP
  - Active item shows yellow color + underline indicator
  - Font, color, and positioning match design spec
  - Icons display correctly (Top Talent has icon before text)
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-007: Navigation menu hover state
- **Category:** GUI
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Hover State
- **Test_Objective:** Verify navigation menu items show hover highlight effect
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Hover mouse over each navigation menu item (Top Talent through MVP)
  2. Observe the hover effect
- **Expected_Result:** Each menu item highlights on hover; mouse cursor changes to pointer; hover style matches design spec
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-008: Navigation menu responsive behavior
- **Category:** GUI
- **Sub_Category:** Navigation Menu
- **Sub_Sub_Category:** Responsive
- **Test_Objective:** Verify navigation menu adapts to different screen sizes
- **Precondition:** User is on the Award System page
- **Test_Data:** Viewport widths: 320px, 768px, 1024px, 1440px
- **Steps:**
  1. Test at each viewport width
  2. Observe the navigation menu layout and behavior
- **Expected_Result:** Navigation menu adapts responsively; on mobile it may collapse or reposition; on desktop it displays as left sidebar; all items remain accessible
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-009: Award card - Top Talent display
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify Top Talent award card displays all information correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to or click "Top Talent" in the navigation
  2. Observe the Top Talent award card
- **Expected_Result:**
  - Award image displays at 336x336px, not broken
  - Title: "Top Talent"
  - Description text about criteria and significance
  - Quantity: "10" with unit "Don vi" (Individual)
  - Prize value: "7.000.000 VND" per award
  - Layout matches design spec
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-010: Award card - Top Project display
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify Top Project award card displays all information correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to or click "Top Project" in the navigation
  2. Observe the Top Project award card
- **Expected_Result:**
  - Award image displays correctly, not broken
  - Title: "Top Project"
  - Quantity: "02" with unit "Tap the" (Team)
  - Prize value: "15.000.000 VND" per award
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-011: Award card - Top Project Leader display
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify Top Project Leader award card displays correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to or click "Top Project Leader" in the navigation
  2. Observe the card
- **Expected_Result:**
  - Title: "Top Project Leader"
  - Quantity: "03" (Ca nhan / Individual)
  - Prize value: "7.000.000 VND"
  - Image and layout match design
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-012: Award card - Best Manager display
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify Best Manager award card displays correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to or click "Best Manager" in the navigation
  2. Observe the card
- **Expected_Result:**
  - Title: "Best Manager"
  - Description text about purpose and criteria
  - Quantity: "01" (Ca nhan / Individual)
  - Prize value: "10.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-013: Award card - Signature 2025 - Creator display
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify Signature 2025 - Creator award card displays correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to or click "Signature 2025 - Creator" in the navigation
  2. Observe the card
- **Expected_Result:**
  - Title: "Signature 2025 - Creator"
  - Quantity: "01"
  - Prize value: "5.000.000 VND" (individual), "8.000.000 VND" (team)
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-014: Award card - MVP display
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify MVP award card displays correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to or click "MVP" in the navigation
  2. Observe the card
- **Expected_Result:**
  - Title: "MVP (Most Valuable Person)"
  - Description text about objective and significance
  - Quantity: "01"
  - Prize value: "15.000.000 VND"
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-015: Award cards responsive - Mobile
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Responsive
- **Test_Objective:** Verify award cards layout adapts correctly on mobile viewport
- **Precondition:** User is on the Award System page
- **Test_Data:** Viewport width: 320px
- **Steps:**
  1. Set viewport to 320px
  2. Scroll through all award cards
- **Expected_Result:** Cards stack vertically; images scale proportionally; text remains readable; no horizontal overflow; touch targets at least 44x44px
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-016: Award cards responsive - Tablet and Desktop
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Responsive
- **Test_Objective:** Verify award cards layout at tablet and desktop breakpoints
- **Precondition:** User is on the Award System page
- **Test_Data:** Viewport widths: 768px, 1024px, 1440px
- **Steps:**
  1. Test at each viewport width
  2. Observe card layout, image sizes, and text formatting
- **Expected_Result:** Cards display with proper layout (image + content side by side on larger screens); consistent spacing and alignment
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-017: Sun* Kudos block display
- **Category:** GUI
- **Sub_Category:** Sun* Kudos Block
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify Sun* Kudos promotional block displays correctly
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll to the Sun* Kudos section
  2. Observe the block content
- **Expected_Result:**
  - Label "Phong trao ghi nhan" displays
  - Title "Sun* Kudos" displays
  - Description text visible
  - Illustration image displays correctly
  - "Chi tiet" button visible with icon
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-018: "Chi tiet" button display and hover
- **Category:** GUI
- **Sub_Category:** Button
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify "Chi tiet" button appearance and hover effect
- **Precondition:** User is on the Award System page, scrolled to Sun* Kudos section
- **Test_Data:**
- **Steps:**
  1. Observe the "Chi tiet" button
  2. Hover mouse over the button
- **Expected_Result:**
  - Button displays as text link style matching design spec (color, font size, icon)
  - On hover: subtle float/elevation effect; cursor changes to pointer
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-019: Page scrollbar behavior
- **Category:** GUI
- **Sub_Category:** Page Layout
- **Sub_Sub_Category:** Scrollbar
- **Test_Objective:** Verify vertical scrollbar appears when content exceeds viewport
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. View page at standard viewport size
  2. Check for vertical scrollbar
  3. Zoom in the page and check scrollbar
  4. Zoom out and check scrollbar
- **Expected_Result:** Vertical scrollbar appears when content exceeds viewport; no horizontal scrollbar at standard widths; scrollbar responds to zoom level
- **Priority:** Low
- **Testcase_Type:** Manual

## GUI-020: Cross-browser compatibility
- **Category:** GUI
- **Sub_Category:** Page Layout
- **Sub_Sub_Category:** Cross-browser
- **Test_Objective:** Verify page displays consistently across major browsers
- **Precondition:** User has access to Chrome, Firefox, and Safari
- **Test_Data:**
- **Steps:**
  1. Open the Award System page in Chrome
  2. Open in Firefox
  3. Open in Safari
  4. Compare layout, fonts, colors, and element positioning
- **Expected_Result:** Page displays consistently across all browsers; no layout breaks, missing elements, or significant visual differences
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-021: Image alt text accessibility
- **Category:** GUI
- **Sub_Category:** Accessibility
- **Sub_Sub_Category:** Alt Text
- **Test_Objective:** Verify all images have appropriate alt text attributes
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Inspect the page source or use accessibility tools
  2. Check alt attributes on all images (keyvisual, award images, Sun* Kudos illustration)
- **Expected_Result:** Keyvisual has alt="Keyvisual Sun* Annual Award 2025"; all award images have descriptive alt text; decorative images have empty alt=""
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-022: Keyboard tab navigation
- **Category:** GUI
- **Sub_Category:** Accessibility
- **Sub_Sub_Category:** Keyboard
- **Test_Objective:** Verify interactive elements are accessible via keyboard Tab navigation
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Press Tab key repeatedly to navigate through the page
  2. Observe focus indicators on navigation menu items and "Chi tiet" button
- **Expected_Result:** Tab moves focus through interactive elements in logical order; focus indicator is visible on each element; navigation menu items and "Chi tiet" button are reachable via Tab
- **Priority:** Medium
- **Testcase_Type:** Manual

## GUI-023: Award card images display correctly
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify all award card images load and display without being broken
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Scroll through all 6 award cards
  2. Observe each award image
- **Expected_Result:** All 6 award images load successfully; images are not broken or distorted; images display at correct dimensions (336x336px for Top Talent reference)
- **Priority:** High
- **Testcase_Type:** Manual

## GUI-024: Text not editable
- **Category:** GUI
- **Sub_Category:** Title Section
- **Sub_Sub_Category:** Display
- **Test_Objective:** Verify all static text on the page cannot be edited by user interaction
- **Precondition:** User is on the Award System page
- **Test_Data:**
- **Steps:**
  1. Double-click on various text elements (titles, descriptions, award values)
  2. Try to type or modify the text
- **Expected_Result:** No text is editable; double-click only selects text for copy but does not enable editing
- **Priority:** Low
- **Testcase_Type:** Manual
