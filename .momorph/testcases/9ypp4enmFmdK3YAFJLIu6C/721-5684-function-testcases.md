# FUNCTION Test Cases - Dropdown Phong Ban

## Selection

### TC_DPB_FUN_001 - Select the first department in the list
- **Objective:** Verify selecting the first department in the list works correctly
- **Precondition:** Dropdown is open, no department currently selected (or different department selected)
- **Steps:**
  1. Open the department dropdown.
  2. Click on the first department item in the list.
- **Expected:** Department is selected, dropdown closes, page filter is applied showing kudos for people in that department.
- **Priority:** High

### TC_DPB_FUN_002 - Select a middle department in the list
- **Objective:** Verify selecting a department from the middle of the list works correctly
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Scroll to a department in the middle of the list (e.g., CEVEC).
  3. Click on that department item.
- **Expected:** Department is selected, dropdown closes, page filter is applied showing kudos for people in that department.
- **Priority:** High

### TC_DPB_FUN_003 - Select the last department in the list
- **Objective:** Verify selecting the last department in the list works correctly
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Scroll to the bottom of the list.
  3. Click on the last department item (PAO - PAO).
- **Expected:** Department is selected, dropdown closes, page filter is applied showing kudos for people in that department.
- **Priority:** High

### TC_DPB_FUN_004 - Change selection from one department to another
- **Objective:** Verify switching between departments updates the filter correctly
- **Precondition:** A department is currently selected (e.g., CEVC2)
- **Steps:**
  1. Observe current filter results for CEVC2.
  2. Open the department dropdown.
  3. Select a different department (e.g., CEVC3).
- **Expected:** Dropdown closes. Page filter updates to show kudos for people in CEVC3. Previous CEVC2 filter is no longer applied. CEVC3 is now highlighted as selected.
- **Priority:** High

### TC_DPB_FUN_005 - Re-select the currently selected department
- **Objective:** Verify selecting the already-selected department does not cause errors
- **Precondition:** CEVC2 is currently selected
- **Steps:**
  1. Open the department dropdown.
  2. Click on CEVC2 (the already highlighted/selected department).
- **Expected:** Dropdown closes. Filter remains the same for CEVC2. No errors or unexpected behavior.
- **Priority:** Medium

## Filter

### TC_DPB_FUN_006 - Filter results match selected department
- **Objective:** Verify page content is filtered correctly for the selected department
- **Precondition:** User is on the kudos page
- **Steps:**
  1. Open the department dropdown.
  2. Select department "CEVC2".
  3. Observe the kudos displayed on the page.
- **Expected:** Only kudos addressed to people belonging to CEVC2 department are displayed.
- **Priority:** High

### TC_DPB_FUN_007 - Filter results for department with no kudos
- **Objective:** Verify behavior when selecting a department that has no associated kudos
- **Precondition:** User is on the kudos page
- **Steps:**
  1. Open the department dropdown.
  2. Select a department with no kudos (e.g., a newly created department).
- **Expected:** Page displays an empty state or "no results" message. No errors.
- **Priority:** Medium

### TC_DPB_FUN_008 - Filter persists after page interaction
- **Objective:** Verify the department filter remains applied when interacting with other page elements
- **Precondition:** A department filter is applied
- **Steps:**
  1. Select a department (e.g., CEVC3).
  2. Interact with other elements on the page (scroll, view details, etc.).
  3. Observe whether the filter is still active.
- **Expected:** Department filter remains active. Content continues to show only kudos for the selected department.
- **Priority:** Medium

## Department List

### TC_DPB_FUN_009 - All 50 departments are present in the list
- **Objective:** Verify all departments from the database are displayed in the dropdown
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Scroll through the entire list.
  3. Count and verify all department names.
- **Expected:** All 50 departments are present: CTO, SPD, FCOV, CEVC1, CEVC2, STVC - R&D, CEVC2 - CySS, FCOV - LRM, CEVC2 - System, OPDC - HRF, CEVC1 - DSV - UI/UX 1, CEVC1 - DSV, CEVEC, OPDC - HRD - C&C, STVC, FCOV - F&A, CEVC1 - DSV - UI/UX 2, CEVC1 - AIE, OPDC - HRF - C&B, FCOV - GA, FCOV - ISO, STVC - EE, GEU - HUST, CEVEC - SAPD, OPDC - HRF - OD, CEVEC - GSD, GEU - TM, STVC - R&D - DTR, STVC - R&D - DPS, CEVC3, STVC - R&D - AIR, CEVC4, PAO, GEU, GEU - DUT, OPDC - HRD - L&D, OPDC - HRD - TI, OPDC - HRF - TA, GEU - UET, STVC - R&D - SDX, OPDC - HRD - HRBP, PAO - PEC, IAV, STVC - Infra, CPV - CGP, GEU - UIT, OPDC - HRD, BDV, CPV, PAO - PAO.
- **Priority:** High

### TC_DPB_FUN_010 - Department list order matches expected order
- **Objective:** Verify departments are listed in the correct order
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Scroll through and verify the order of departments.
- **Expected:** Departments are displayed in the expected order as specified in the design.
- **Priority:** Medium

## Keyboard

### TC_DPB_FUN_011 - Navigate items with Up/Down arrow keys
- **Objective:** Verify keyboard navigation through department items using arrow keys
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Press the Down arrow key multiple times.
  3. Press the Up arrow key multiple times.
- **Expected:** Highlight moves to the next item on Down press and previous item on Up press. Highlight wraps or stops at boundaries.
- **Priority:** Medium

### TC_DPB_FUN_012 - Select highlighted item with Enter key
- **Objective:** Verify pressing Enter selects the currently highlighted department
- **Precondition:** Dropdown is open, an item is highlighted via keyboard
- **Steps:**
  1. Open the department dropdown.
  2. Press Down arrow to highlight a different department.
  3. Press Enter.
- **Expected:** Highlighted department is selected. Dropdown closes. Page filter is applied for the selected department.
- **Priority:** Medium

### TC_DPB_FUN_013 - Cannot type text in the dropdown
- **Objective:** Verify that typing text in the dropdown does not input characters
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Type random characters on the keyboard (e.g., "abc").
- **Expected:** No text is entered or displayed in the dropdown. The dropdown remains functional.
- **Priority:** Low

## Scroll

### TC_DPB_FUN_014 - Scroll down with mouse wheel
- **Objective:** Verify scrolling through the department list with mouse wheel
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Use mouse wheel to scroll down through the list.
- **Expected:** List scrolls smoothly. All departments below the initial view become visible.
- **Priority:** High

### TC_DPB_FUN_015 - Scroll quickly through the list
- **Objective:** Verify rapid scrolling through the department list does not cause issues
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Quickly scroll from top to bottom and back.
- **Expected:** Scrolling is smooth. Items render correctly without visual glitches. Dropdown remains responsive.
- **Priority:** Low

## Data Integrity

### TC_DPB_FUN_016 - Department list updates after new department added
- **Objective:** Verify the dropdown reflects a newly added department after page reload
- **Precondition:** Access to database to add a new department
- **Steps:**
  1. Add a new department to the database.
  2. Reload the page.
  3. Open the department dropdown.
- **Expected:** New department appears in the dropdown list. Dropdown operates normally.
- **Priority:** Medium

### TC_DPB_FUN_017 - Department list updates after department deleted
- **Objective:** Verify the dropdown reflects a deleted department after page reload
- **Precondition:** Access to database to delete a department
- **Steps:**
  1. Delete a department from the database.
  2. Reload the page.
  3. Open the department dropdown.
- **Expected:** Deleted department no longer appears in the dropdown list. Dropdown operates normally.
- **Priority:** Medium

### TC_DPB_FUN_018 - Department name update reflected after reload
- **Objective:** Verify an updated department name is reflected in the dropdown after page reload
- **Precondition:** Access to database to update a department name
- **Steps:**
  1. Update a department name in the database.
  2. Reload the page.
  3. Open the department dropdown.
- **Expected:** Updated department name is displayed correctly. Dropdown operates normally.
- **Priority:** Medium

### TC_DPB_FUN_019 - Stale selection after selected department deleted in DB
- **Objective:** Verify behavior when the currently selected department is deleted from DB without page reload
- **Precondition:** A department is selected, then that department is deleted from DB
- **Steps:**
  1. Select a department (e.g., CEVC3).
  2. Without reloading, delete CEVC3 from the database (via another session).
  3. Interact with the page (e.g., attempt to use the filter).
- **Expected:** An appropriate error message is displayed or the page handles gracefully (e.g., resets to default).
- **Priority:** Medium

## Security

### TC_DPB_FUN_020 - Manipulate dropdown value via browser inspect (non-existent value)
- **Objective:** Verify server-side is not affected when dropdown value is changed to a non-existent value via browser DevTools
- **Precondition:** Dropdown is open, user has browser DevTools access
- **Steps:**
  1. Open browser DevTools.
  2. Inspect the dropdown element.
  3. Change the selected value to a non-existent department ID.
  4. Submit/apply the filter.
- **Expected:** Server rejects the invalid value or ignores it. Page function is unaffected. No server error.
- **Priority:** High

### TC_DPB_FUN_021 - Manipulate dropdown value via browser inspect (existing value)
- **Objective:** Verify server-side correctly processes when dropdown value is changed to an existing valid value via browser DevTools
- **Precondition:** Dropdown is open, user has browser DevTools access
- **Steps:**
  1. Open browser DevTools.
  2. Inspect the dropdown element.
  3. Change the selected value to a different existing department ID.
  4. Submit/apply the filter.
- **Expected:** Operation is unaffected by the client-side manipulation. Server validates and processes correctly.
- **Priority:** Medium

### TC_DPB_FUN_022 - Add fake item via browser inspect
- **Objective:** Verify adding a fake dropdown item via DevTools does not affect server operation
- **Precondition:** Dropdown is open, user has browser DevTools access
- **Steps:**
  1. Open browser DevTools.
  2. Add a new option element to the dropdown with a fabricated value.
  3. Select the fabricated item.
  4. Submit/apply the filter.
- **Expected:** Server rejects the fabricated value. Operation is unaffected. No data corruption.
- **Priority:** Medium
