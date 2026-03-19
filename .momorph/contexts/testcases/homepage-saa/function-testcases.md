# Homepage SAA - FUNCTION Test Cases

Testcase_Type: Functionality

---

## TC_HOMEPAGE_SAA_FUN_001
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Header
- **Test_Objective:** Verify clicking the logo navigates to the homepage
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the logo (A1.1) in the header
- **Expected_Result:**
  1. Page scrolls to the top of the Homepage SAA
  2. URL remains the homepage URL
- **Specs:** A1.1
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_002
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Header
- **Test_Objective:** Verify clicking 'About SAA 2025' link when already selected scrolls to top
- **Precondition:** User is on the Homepage SAA, 'About SAA 2025' is in selected state
- **Test_Data:**
- **Steps:**
  1. Scroll down the page
  2. Click 'About SAA 2025' link (A1.2) in the header
- **Expected_Result:**
  1. Page scrolls to the top
  2. 'About SAA 2025' remains in selected state (yellow/underline)
- **Specs:** A1.2
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_003
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Header
- **Test_Objective:** Verify clicking 'Awards Information' link navigates to Awards Information page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click 'Awards Information' link (A1.3) in the header
- **Expected_Result:**
  1. User is navigated to the Awards Information page
  2. Awards Information page loads correctly
- **Specs:** A1.3
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_004
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Header
- **Test_Objective:** Verify clicking 'Sun* Kudos' link navigates to the Sun* Kudos page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click 'Sun* Kudos' link (A1.5) in the header
- **Expected_Result:**
  1. User is navigated to the Sun* Kudos page
  2. Sun* Kudos page loads correctly
- **Specs:** A1.5
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_005
- **Category:** FUNCTION
- **Sub_Category:** Notification
- **Test_Objective:** Verify clicking the notification bell icon opens the notification panel
- **Precondition:** User is logged in and on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the notification bell icon (A1.6)
- **Expected_Result:**
  1. Notification panel opens
  2. Panel displays list of notifications (if any)
- **Specs:** A1.6
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_006
- **Category:** FUNCTION
- **Sub_Category:** Notification
- **Test_Objective:** Verify notification badge displays when there are unread notifications
- **Precondition:** User is logged in and has unread notifications
- **Test_Data:** User account with unread notifications
- **Steps:**
  1. Navigate to the Homepage SAA
  2. Observe the notification bell icon
- **Expected_Result:**
  1. Red badge displays on the notification bell icon indicating unread notifications
- **Specs:** A1.6
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_007
- **Category:** FUNCTION
- **Sub_Category:** Language Switcher
- **Test_Objective:** Verify clicking the language switcher opens the language menu and switches language
- **Precondition:** User is on the Homepage SAA, current language is VN
- **Test_Data:**
- **Steps:**
  1. Click the language button showing 'VN' (A1.7)
  2. Select 'EN' from the dropdown
- **Expected_Result:**
  1. Language menu opens with options: VN, EN
  2. After selecting EN, the interface switches to English
  3. Language button now displays 'EN'
- **Specs:** A1.7
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_008
- **Category:** FUNCTION
- **Sub_Category:** User Menu
- **Test_Objective:** Verify clicking the user avatar opens the profile dropdown menu
- **Precondition:** User is logged in and on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the user avatar icon (A1.8)
- **Expected_Result:**
  1. Profile dropdown menu opens
  2. Menu contains: Profile, Sign out options
- **Specs:** A1.8
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_009
- **Category:** FUNCTION
- **Sub_Category:** User Menu
- **Test_Objective:** Verify Sign out option logs the user out
- **Precondition:** User is logged in and on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the user avatar icon (A1.8)
  2. Click 'Sign out' from the dropdown
- **Expected_Result:**
  1. User is logged out
  2. Page refreshes/redirects to reflect unauthenticated state
  3. Header no longer shows user-specific controls
- **Specs:** A1.8
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_010
- **Category:** FUNCTION
- **Sub_Category:** Countdown Timer
- **Test_Objective:** Verify the countdown timer counts down in real-time
- **Precondition:** Event datetime is set to a future date via environment variable
- **Test_Data:** Event datetime in ISO-8601 format (e.g., future date)
- **Steps:**
  1. Navigate to the Homepage SAA
  2. Note the current countdown values (Days, Hours, Minutes)
  3. Wait for 1 minute
  4. Observe the countdown values again
- **Expected_Result:**
  1. Minutes value decreases by 1 after 1 minute
  2. Hours and Days adjust correctly when Minutes reaches 00
  3. All values remain zero-padded (2 digits)
- **Specs:** B1.3, B1.3.1, B1.3.2, B1.3.3
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_011
- **Category:** FUNCTION
- **Sub_Category:** Countdown Timer
- **Test_Objective:** Verify 'Coming soon' label is hidden and countdown shows 00 when event time has passed
- **Precondition:** Event datetime is in the past
- **Test_Data:** Event datetime set to a past ISO-8601 value
- **Steps:**
  1. Set the event datetime environment variable to a past date
  2. Navigate to the Homepage SAA
- **Expected_Result:**
  1. Countdown displays '00' for DAYS, '00' for HOURS, '00' for MINUTES
  2. 'Coming soon' subtitle is hidden/not visible
- **Specs:** B1.2, B1.3
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_012
- **Category:** FUNCTION
- **Sub_Category:** CTA Buttons
- **Test_Objective:** Verify clicking 'ABOUT AWARDS' button navigates to Awards Information page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the 'ABOUT AWARDS' button (B3.1) in the hero section
- **Expected_Result:**
  1. User is navigated to the Awards Information page
  2. Page loads correctly
- **Specs:** B3.1
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_013
- **Category:** FUNCTION
- **Sub_Category:** CTA Buttons
- **Test_Objective:** Verify clicking 'ABOUT KUDOS' button navigates to Sun* Kudos page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the 'ABOUT KUDOS' button (B3.2) in the hero section
- **Expected_Result:**
  1. User is navigated to the Sun* Kudos page
  2. Page loads correctly
- **Specs:** B3.2
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_014
- **Category:** FUNCTION
- **Sub_Category:** Award Card Interaction
- **Test_Objective:** Verify clicking an award card thumbnail navigates to Awards Information with correct hashtag
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the thumbnail image of the 'Top Talent' award card (C2.1.1)
- **Expected_Result:**
  1. User is navigated to the Awards Information page
  2. URL contains hashtag with the slug of 'Top Talent' category
  3. Browser auto-scrolls to the Top Talent section on the Awards Information page
- **Specs:** C2.1.1, C2.1
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_015
- **Category:** FUNCTION
- **Sub_Category:** Award Card Interaction
- **Test_Objective:** Verify clicking an award card title navigates to Awards Information with correct hashtag
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the title text 'Top Talent' on the award card (C2.1.2)
- **Expected_Result:**
  1. User is navigated to the Awards Information page
  2. URL contains hashtag with the slug of 'Top Talent' category
  3. Browser auto-scrolls to the correct section
- **Specs:** C2.1.2
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_016
- **Category:** FUNCTION
- **Sub_Category:** Award Card Interaction
- **Test_Objective:** Verify clicking 'Chi tiet' link on an award card navigates to Awards Information with correct hashtag
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the 'Chi tiet' link on the 'Top Talent' award card (C2.1.4)
- **Expected_Result:**
  1. User is navigated to the Awards Information page
  2. URL contains hashtag with the slug of 'Top Talent' category
  3. Browser auto-scrolls to the correct section
- **Specs:** C2.1.4
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_017
- **Category:** FUNCTION
- **Sub_Category:** Award Card Interaction
- **Test_Objective:** Verify all 6 award cards navigate to their respective sections on Awards Information page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click 'Chi tiet' on 'Top Project' card (C2.2)
  2. Navigate back, click 'Chi tiet' on 'Top Project Leader' card (C2.3)
  3. Navigate back, click 'Chi tiet' on 'Best Manager' card (C2.4)
  4. Navigate back, click 'Chi tiet' on 'Signature 2025 - Creator' card (C2.5)
  5. Navigate back, click 'Chi tiet' on 'MVP' card (C2.6)
- **Expected_Result:**
  1. Each card navigates to the Awards Information page with the correct hashtag slug
  2. Browser auto-scrolls to the corresponding award category section
  3. All 6 cards function correctly
- **Specs:** C2.2, C2.3, C2.4, C2.5, C2.6
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_018
- **Category:** FUNCTION
- **Sub_Category:** Kudos Section
- **Test_Objective:** Verify clicking 'Chi tiet' button in Kudos section navigates to Sun* Kudos page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll to the Sun* Kudos section
  2. Click the 'Chi tiet' button (D2.1)
- **Expected_Result:**
  1. User is navigated to the Sun* Kudos page
  2. Page loads correctly
- **Specs:** D2.1
- **Priority:** High

---

## TC_HOMEPAGE_SAA_FUN_019
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Footer
- **Test_Objective:** Verify footer logo click navigates to homepage top
- **Precondition:** User is on the Homepage SAA, scrolled to the footer
- **Test_Data:**
- **Steps:**
  1. Scroll to the footer
  2. Click the footer logo (7.1)
- **Expected_Result:**
  1. Page scrolls to the top of the Homepage SAA
- **Specs:** 7.1
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_020
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Footer
- **Test_Objective:** Verify footer navigation links navigate to correct pages
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll to the footer
  2. Click 'About SAA 2025' link (7.2)
  3. Navigate back, click 'Awards Information' link (7.3)
  4. Navigate back, click 'Sun* Kudos' link (7.4)
- **Expected_Result:**
  1. 'About SAA 2025' navigates to the About SAA 2025 page
  2. 'Awards Information' navigates to the Awards Information page
  3. 'Sun* Kudos' navigates to the Sun* Kudos page
- **Specs:** 7.2, 7.3, 7.4
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_021
- **Category:** FUNCTION
- **Sub_Category:** Widget Button
- **Test_Objective:** Verify clicking the floating widget button opens the quick action menu
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Click the floating widget button (6) at the bottom-right
- **Expected_Result:**
  1. Quick action menu opens
  2. Menu displays available action options
- **Specs:** 6
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_022
- **Category:** FUNCTION
- **Sub_Category:** Scrolling
- **Test_Objective:** Verify the header remains fixed/sticky when scrolling the page
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Scroll down the page using mouse wheel
  2. Scroll down using keyboard (Page Down, Arrow Down)
  3. Scroll back up
- **Expected_Result:**
  1. Header remains fixed at the top of the viewport during all scroll actions
  2. Header does not move or disappear
  3. All header elements remain functional while scrolling
- **Specs:** A1
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_023
- **Category:** FUNCTION
- **Sub_Category:** Countdown Timer
- **Test_Objective:** Verify the countdown timer reads the event datetime from environment variable
- **Precondition:** Access to environment variable configuration
- **Test_Data:** Custom future datetime in ISO-8601 format (e.g., 2026-12-31T18:30:00+07:00)
- **Steps:**
  1. Set the event datetime environment variable to a specific future date
  2. Start/restart the application
  3. Navigate to the Homepage SAA
  4. Calculate expected Days, Hours, Minutes from current time to the configured datetime
- **Expected_Result:**
  1. Countdown displays values matching the configured datetime
  2. Days, Hours, Minutes correspond to the time difference between now and the configured event date
- **Specs:** B1
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_024
- **Category:** FUNCTION
- **Sub_Category:** Cross-browser
- **Test_Objective:** Verify all functional behaviors work consistently across major browsers
- **Precondition:** User has access to Chrome, Firefox, Safari, and Edge browsers
- **Test_Data:**
- **Steps:**
  1. Open the Homepage SAA in Chrome and verify: navigation, countdown, card clicks, widget
  2. Repeat in Firefox
  3. Repeat in Safari
  4. Repeat in Edge
- **Expected_Result:**
  1. All navigation links work in all browsers
  2. Countdown timer updates correctly in all browsers
  3. Award card hover and click behaviors work in all browsers
  4. Widget button functions in all browsers
  5. No broken links in any browser
- **Specs:** A1, B1, C2, D1, 6
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_FUN_025
- **Category:** FUNCTION
- **Sub_Category:** Navigation - Header
- **Test_Objective:** Verify no broken links exist on the Homepage SAA
- **Precondition:** User is on the Homepage SAA
- **Test_Data:**
- **Steps:**
  1. Use a link checker tool (e.g., Chrome extension 'Check My Links') on the Homepage SAA
  2. Verify all internal and external links
- **Expected_Result:**
  1. No broken links (404 or other error responses) are found
  2. All links resolve to valid pages
- **Specs:** A1, B3, C2, D1, 7
- **Priority:** Medium
