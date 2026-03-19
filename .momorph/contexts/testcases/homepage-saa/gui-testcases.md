# Homepage SAA - GUI Test Cases

Testcase_Type: User interface

---

## TC_HOMEPAGE_SAA_GUI_001
- **Category:** GUI
- **Sub_Category:** Page Layout
- **Test_Objective:** Verify the overall page layout displays correctly across all responsive breakpoints
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Open the Homepage SAA in a browser
  2. Verify at 320px (Mobile): all sections stack vertically, content is readable, no horizontal overflow
  3. Verify at 768px (Tablet): layout adapts, award grid is 2 columns
  4. Verify at 1024px (Desktop): layout adapts, award grid is 3 columns
  5. Verify at 1440px (Wide): layout is centered with max-width container
- **Expected_Result:**
  1. At 320px: All sections stack vertically, text is readable, touch targets >= 44x44px, no horizontal scrollbar
  2. At 768px: Layout uses tablet breakpoint, award card grid displays 2 columns
  3. At 1024px: Layout uses desktop breakpoint, award card grid displays 3 columns
  4. At 1440px: Content is centered, no excessive whitespace, layout is visually balanced
  5. Page contains sections in order: Header, Hero/Keyvisual, Awards Section, Kudos Section, Footer
  6. Widget button is fixed at bottom-right on all breakpoints
- **Specs:** 3.5, C2, D1, 7, 6
- **Priority:** High

---

## TC_HOMEPAGE_SAA_GUI_002
- **Category:** GUI
- **Sub_Category:** Header
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the header displays all elements in correct positions and default states
- **Precondition:** User is logged in and navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Observe the header at the top of the page
  2. Verify logo is on the left side
  3. Verify navigation links are displayed: 'About SAA 2025', 'Awards Information', 'Sun* Kudos'
  4. Verify right-side controls: notification bell, language 'VN', user avatar
  5. Verify 'About SAA 2025' shows selected state (yellow/underline)
- **Expected_Result:**
  1. Logo (64x60px) displays on the left
  2. Navigation links display in correct order
  3. 'About SAA 2025' shows selected state (yellow text with underline)
  4. Right-side icons display: bell, 'VN' text, user avatar (each 40x40px)
  5. All elements are properly aligned
- **Specs:** A1, A1.1, A1.2, A1.3, A1.5, A1.6, A1.7, A1.8
- **Priority:** High

---

## TC_HOMEPAGE_SAA_GUI_003
- **Category:** GUI
- **Sub_Category:** Hero Section
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the hero/keyvisual section displays all elements correctly in default state
- **Precondition:** Event has not yet started (countdown > 0)
- **Test_Data:**
- **Steps:**
  1. Navigate to the Homepage SAA
  2. Observe the hero section
  3. Verify 'ROOT FURTHER' title is displayed in large font
  4. Verify 'Coming soon' subtitle is visible
  5. Verify countdown displays 3 groups: DAYS, HOURS, MINUTES
  6. Verify event info: time '18h30', location
  7. Verify two CTA buttons: 'ABOUT AWARDS', 'ABOUT KUDOS'
  8. Verify decorative background pattern
- **Expected_Result:**
  1. 'ROOT FURTHER' displays in very large font
  2. 'Coming soon' subtitle is visible below the title
  3. Countdown shows 3 blocks with 2-digit numbers and labels 'DAYS', 'HOURS', 'MINUTES'
  4. Event info shows 'Thoi gian: 18h30' and 'Dia diem: Nha hat nghe thuat quan doi'
  5. Livestream note displays: 'Tuong thuat truc tiep tai Group Facebook Sun* Family'
  6. 'ABOUT AWARDS' button displays in yellow (hover state in design)
  7. 'ABOUT KUDOS' button displays with border outline (normal state)
  8. Background decorative pattern is visible
- **Specs:** 3.5, B1, B1.2, B1.3, B2, B3, B3.1, B3.2
- **Priority:** High

---

## TC_HOMEPAGE_SAA_GUI_004
- **Category:** GUI
- **Sub_Category:** Hero Section
- **Sub_Sub_Category:** Countdown Display
- **Test_Objective:** Verify countdown timer displays with correct zero-padding format
- **Precondition:** Event has not yet started
- **Test_Data:** Event date set so that days < 10, hours < 10, minutes < 10
- **Steps:**
  1. Configure event datetime so remaining time has single-digit values
  2. Navigate to the Homepage SAA
  3. Observe the countdown digits
- **Expected_Result:**
  1. Days displays with leading zero (e.g., '05' not '5')
  2. Hours displays with leading zero (e.g., '03' not '3')
  3. Minutes displays with leading zero (e.g., '09' not '9')
  4. Each digit is enclosed in a number box
- **Specs:** B1.3, B1.3.1, B1.3.2, B1.3.3
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_005
- **Category:** GUI
- **Sub_Category:** Hero Section
- **Sub_Sub_Category:** Countdown Zero State
- **Test_Objective:** Verify countdown display when event time has passed (all zeros)
- **Precondition:** Event datetime is in the past
- **Test_Data:** Event date set to a past datetime
- **Steps:**
  1. Configure event datetime to a past date
  2. Navigate to the Homepage SAA
  3. Observe countdown and 'Coming soon' label
- **Expected_Result:**
  1. Countdown displays '00' for DAYS, HOURS, and MINUTES
  2. 'Coming soon' subtitle is hidden
- **Specs:** B1.2, B1.3
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_006
- **Category:** GUI
- **Sub_Category:** Awards Section
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the awards section header and card grid display correctly
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll to the awards section
  2. Verify section header: caption 'Sun* annual awards 2025', title 'He thong giai thuong', description text
  3. Verify 6 award cards are displayed in grid
  4. Verify each card has: thumbnail image, title, description, 'Chi tiet' link
- **Expected_Result:**
  1. Section header displays caption, title, and description correctly
  2. 6 award cards display: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP
  3. Each card shows: square thumbnail with yellow border/light effect, title text, description (max 2 lines), 'Chi tiet' link with icon
  4. Grid layout: 3 columns on desktop, 2 columns on tablet/mobile
- **Specs:** C1, C2, C2.1, C2.2, C2.3, C2.4, C2.5, C2.6
- **Priority:** High

---

## TC_HOMEPAGE_SAA_GUI_007
- **Category:** GUI
- **Sub_Category:** Award Cards
- **Sub_Sub_Category:** Description Truncation
- **Test_Objective:** Verify award card descriptions truncate with ellipsis after 2 lines
- **Precondition:** Award card has a description longer than 2 lines
- **Test_Data:**
- **Steps:**
  1. Navigate to the Homepage SAA
  2. Observe award cards with long descriptions
- **Expected_Result:**
  1. Description text displays maximum 2 lines
  2. If text exceeds 2 lines, ellipsis (...) appears at the end
- **Specs:** C2.1.3
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_008
- **Category:** GUI
- **Sub_Category:** Kudos Section
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the Sun* Kudos promotion section displays correctly
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll to the Kudos section
  2. Verify label 'Phong trao ghi nhan' is displayed
  3. Verify title 'Sun* Kudos' is displayed
  4. Verify description paragraph is present
  5. Verify illustration image on the right side
  6. Verify 'Chi tiet' button with icon
- **Expected_Result:**
  1. Label 'Phong trao ghi nhan' displays correctly
  2. Title 'Sun* Kudos' displays in large text
  3. Description text is readable
  4. Illustration image renders on the right
  5. 'Chi tiet' button displays with icon
- **Specs:** D1, D2, D2.1
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_009
- **Category:** GUI
- **Sub_Category:** Footer
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the footer displays all elements correctly
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll to the bottom of the page
  2. Verify footer logo on the left
  3. Verify navigation links: 'About SAA 2025', 'Awards Information', 'Sun* Kudos'
  4. Verify copyright text on the right
- **Expected_Result:**
  1. Footer logo (69x64px) displays on the left
  2. Navigation links display in the center
  3. Copyright text 'Ban quyen thuoc ve Sun* (c) 2025' displays on the right
  4. All elements are properly aligned
- **Specs:** 7, 7.1, 7.2, 7.3, 7.4
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_010
- **Category:** GUI
- **Sub_Category:** Widget
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the floating widget button displays correctly and stays fixed
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Navigate to the Homepage SAA
  2. Observe the widget button at bottom-right
  3. Scroll down the page
  4. Verify widget button remains in fixed position
- **Expected_Result:**
  1. Widget button (105x64px) displays at bottom-right with yellow pill background, rounded corners
  2. Pencil icon on left, SAA icon on right, '/' separator between them
  3. Button remains fixed at bottom-right during scrolling
- **Specs:** 6
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_011
- **Category:** GUI
- **Sub_Category:** Hover States
- **Sub_Sub_Category:** Navigation Links
- **Test_Objective:** Verify hover states on header navigation links
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Hover over 'About SAA 2025' link (selected state)
  2. Hover over 'Awards Information' link
  3. Hover over 'Sun* Kudos' link
- **Expected_Result:**
  1. Hovered links display highlight background effect
  2. Mouse cursor changes to pointer on hover
  3. Selected link ('About SAA 2025') maintains yellow/underline while also showing hover effect
- **Specs:** A1.2, A1.3, A1.5
- **Priority:** Low

---

## TC_HOMEPAGE_SAA_GUI_012
- **Category:** GUI
- **Sub_Category:** Hover States
- **Sub_Sub_Category:** CTA Buttons
- **Test_Objective:** Verify hover states on CTA buttons ('ABOUT AWARDS' and 'ABOUT KUDOS')
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Hover over 'ABOUT AWARDS' button
  2. Hover over 'ABOUT KUDOS' button
- **Expected_Result:**
  1. Both buttons change appearance on hover (same hover style)
  2. 'ABOUT AWARDS' in normal state displays like 'ABOUT KUDOS' normal state (outline/border)
  3. 'ABOUT KUDOS' in hover state displays like 'ABOUT AWARDS' hover state (yellow filled)
- **Specs:** B3, B3.1, B3.2
- **Priority:** Low

---

## TC_HOMEPAGE_SAA_GUI_013
- **Category:** GUI
- **Sub_Category:** Hover States
- **Sub_Sub_Category:** Award Cards
- **Test_Objective:** Verify hover effect on award category cards
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Hover over any award card (e.g., Top Talent)
- **Expected_Result:**
  1. Card elevates slightly (lift effect)
  2. Border or light highlight becomes visible
  3. Mouse cursor changes to pointer
- **Specs:** C2.1
- **Priority:** Low

---

## TC_HOMEPAGE_SAA_GUI_014
- **Category:** GUI
- **Sub_Category:** Event Info
- **Sub_Sub_Category:** Default Display
- **Test_Objective:** Verify the event information block displays static content correctly
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Observe the event information section within the hero area
- **Expected_Result:**
  1. 'Thoi gian:' label with value '18h30' displays correctly
  2. 'Dia diem:' label with value 'Nha hat nghe thuat quan doi' displays correctly
  3. Livestream note 'Tuong thuat truc tiep tai Group Facebook Sun* Family' displays correctly
  4. Text wraps properly on smaller screens without overflow
- **Specs:** B2
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_GUI_015
- **Category:** GUI
- **Sub_Category:** Text & Labels
- **Sub_Sub_Category:** Root Further Description
- **Test_Objective:** Verify the 'Root Further' description paragraph displays correctly
- **Precondition:** User navigates to the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll to the description block below the hero section
  2. Verify the paragraph text is displayed
- **Expected_Result:**
  1. Description text displays in light color on dark background
  2. Font size is medium
  3. Text wraps and adjusts on smaller screens
  4. Text is not editable by user interaction
- **Specs:** B4
- **Priority:** Low
