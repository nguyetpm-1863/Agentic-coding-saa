# FUNCTION Test Cases: Dropdown-ngon-ngu

## FUN_001 - Open Dropdown by Click
- **Objective:** Verify clicking the dropdown opens the language menu
- **Precondition:** Dropdown is in collapsed state
- **Steps:** 1. Click on the language dropdown.
- **Expected:** Dropdown expands showing both VN and EN options. Selected language is visually distinguished.
- **Priority:** High

## FUN_002 - Close Dropdown by Click on Dropdown
- **Objective:** Verify clicking the dropdown again closes the menu
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Click on the language dropdown to open it. 2. Click on the dropdown trigger again.
- **Expected:** Dropdown collapses. Current language selection remains unchanged.
- **Priority:** High

## FUN_003 - Close Dropdown by Click Outside
- **Objective:** Verify clicking outside the dropdown closes the menu
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Click on the language dropdown to open it. 2. Click on any area outside the dropdown.
- **Expected:** Dropdown collapses. Current language selection remains unchanged.
- **Priority:** High

## FUN_004 - Select English Language
- **Objective:** Verify selecting EN changes the application language to English
- **Precondition:** Current language is VN, dropdown is visible
- **Steps:** 1. Click on the language dropdown. 2. Click on the EN option.
- **Expected:** Dropdown closes. Dropdown display updates to show UK flag + "EN". Application UI text changes to English.
- **Priority:** High

## FUN_005 - Select Vietnamese Language
- **Objective:** Verify selecting VN changes the application language to Vietnamese
- **Precondition:** Current language is EN, dropdown is visible
- **Steps:** 1. Click on the language dropdown. 2. Click on the VN option.
- **Expected:** Dropdown closes. Dropdown display updates to show Vietnam flag + "VN". Application UI text changes to Vietnamese.
- **Priority:** High

## FUN_006 - Re-select Current Language
- **Objective:** Verify selecting the already-active language does not cause errors
- **Precondition:** Current language is VN
- **Steps:** 1. Click on the language dropdown. 2. Click on the VN option (already selected).
- **Expected:** Dropdown closes. Language remains VN. No errors or visual glitches.
- **Priority:** Medium

## FUN_007 - Language Persistence After Page Reload
- **Objective:** Verify selected language persists after reloading the page
- **Precondition:** User has switched language to EN
- **Steps:** 1. Switch language to EN. 2. Reload the page (F5).
- **Expected:** After reload, dropdown shows EN and UI remains in English.
- **Priority:** High

## FUN_008 - Language Persistence Across Pages
- **Objective:** Verify selected language persists when navigating between pages
- **Precondition:** User has switched language to EN
- **Steps:** 1. Switch language to EN on the current page. 2. Navigate to a different page (e.g., kudos page). 3. Observe language dropdown and page content.
- **Expected:** Dropdown shows EN on the new page. UI content is displayed in English.
- **Priority:** High

## FUN_009 - Language Switch Multiple Times
- **Objective:** Verify switching language back and forth works correctly
- **Precondition:** Dropdown is visible
- **Steps:** 1. Switch to EN. 2. Verify UI is in English. 3. Switch back to VN. 4. Verify UI is in Vietnamese. 5. Switch to EN again. 6. Verify UI is in English.
- **Expected:** Each switch correctly updates the dropdown display and application UI language without errors.
- **Priority:** High

## FUN_010 - Keyboard Navigation - Open with Enter
- **Objective:** Verify dropdown can be opened via keyboard Enter key
- **Precondition:** Dropdown has keyboard focus
- **Steps:** 1. Tab to the language dropdown. 2. Press Enter key.
- **Expected:** Dropdown expands showing language options.
- **Priority:** Medium

## FUN_011 - Keyboard Navigation - Arrow Keys
- **Objective:** Verify arrow keys navigate between language options
- **Precondition:** Dropdown is expanded via keyboard
- **Steps:** 1. Open dropdown with Enter. 2. Press Down arrow key. 3. Press Up arrow key.
- **Expected:** Down arrow highlights the next option. Up arrow highlights the previous option. Highlighted option is visually indicated.
- **Priority:** Medium

## FUN_012 - Keyboard Navigation - Select with Enter
- **Objective:** Verify pressing Enter selects the highlighted language option
- **Precondition:** Dropdown is expanded, an option is highlighted
- **Steps:** 1. Open dropdown. 2. Use arrow keys to highlight EN. 3. Press Enter.
- **Expected:** EN is selected. Dropdown closes. Language updates to English.
- **Priority:** Medium

## FUN_013 - Keyboard Navigation - Close with Escape
- **Objective:** Verify pressing Escape closes the dropdown without changing selection
- **Precondition:** Dropdown is expanded
- **Steps:** 1. Open dropdown. 2. Press Escape key.
- **Expected:** Dropdown closes. Language selection remains unchanged.
- **Priority:** Medium

## FUN_014 - Language Change Does Not Affect Auth State
- **Objective:** Verify switching language does not log the user out or affect session
- **Precondition:** User is logged in
- **Steps:** 1. Log in to the application. 2. Switch language from VN to EN. 3. Verify user is still authenticated.
- **Expected:** User remains logged in after language switch. No re-authentication required.
- **Priority:** High

## FUN_015 - Dropdown on Touch Device (Mobile)
- **Objective:** Verify dropdown works correctly with touch interactions
- **Precondition:** User is on a mobile device or emulated touch device
- **Steps:** 1. Tap on the language dropdown. 2. Tap on EN option.
- **Expected:** Dropdown opens on first tap. Language switches to EN on second tap. Dropdown closes after selection.
- **Priority:** High

## FUN_016 - Rapid Click on Dropdown
- **Objective:** Verify rapid clicking does not cause inconsistent state
- **Precondition:** Dropdown is visible
- **Steps:** 1. Rapidly click on the dropdown toggle multiple times.
- **Expected:** Dropdown opens and closes correctly without getting stuck in an inconsistent state.
- **Priority:** Medium

## FUN_017 - Security - Client-Side Value Manipulation
- **Objective:** Verify changing language value via browser dev tools does not affect server-side behavior
- **Precondition:** User is on any page
- **Steps:** 1. Open browser dev tools. 2. Inspect the dropdown element. 3. Change the language value attribute to an invalid value. 4. Attempt to submit or navigate.
- **Expected:** Application behavior is unaffected by the client-side manipulation. Server uses validated language value.
- **Priority:** Medium

## FUN_018 - Security - Inspect and Add New Option
- **Objective:** Verify adding a new language option via dev tools does not affect functionality
- **Precondition:** User is on any page
- **Steps:** 1. Open browser dev tools. 2. Add a new option element (e.g., "FR") to the dropdown. 3. Select the new option.
- **Expected:** Application ignores the invalid option. Only VN and EN are accepted as valid language selections.
- **Priority:** Medium

## FUN_019 - Language Persistence After Browser Restart
- **Objective:** Verify language preference is remembered after closing and reopening browser
- **Precondition:** User switched language to EN
- **Steps:** 1. Switch language to EN. 2. Close the browser completely. 3. Reopen browser and navigate to the application.
- **Expected:** Application loads with EN language (or falls back to default VN based on implementation).
- **Priority:** Low

## FUN_020 - Default Language on First Visit
- **Objective:** Verify the default language is VN on first visit
- **Precondition:** User visits the application for the first time (no cookies/storage)
- **Steps:** 1. Clear all browser data for the application. 2. Navigate to the application.
- **Expected:** Language dropdown shows VN flag + "VN". Application UI is displayed in Vietnamese.
- **Priority:** High
