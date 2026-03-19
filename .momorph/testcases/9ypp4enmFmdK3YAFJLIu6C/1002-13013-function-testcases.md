# FUNCTION Test Cases - Dropdown List Hashtag

## TC_HASH_FUNC_001 - Verify selecting a single hashtag
- **Category:** FUNCTION > Selection > Single Select
- **Objective:** Verify clicking an unselected hashtag toggles it to selected state
- **Precondition:** User is logged in. Dropdown is open. No hashtags are selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Click on "#High-perorming"
- **Expected:** "#High-perorming" becomes selected. Checkmark icon appears on the right. The item visually indicates selected state.
- **Specs:** specs.md - Functional Rules (Selection)
- **Priority:** High

## TC_HASH_FUNC_002 - Verify selecting the first item in the list
- **Category:** FUNCTION > Selection > First Item
- **Objective:** Verify the first hashtag in the list can be selected
- **Precondition:** User is logged in. Dropdown is open. No hashtags selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Click on the first hashtag item in the list
- **Expected:** The first item is selected with checkmark icon displayed.
- **Specs:** viewpoints.md - Select value from list (First value)
- **Priority:** High

## TC_HASH_FUNC_003 - Verify selecting the last item in the list
- **Category:** FUNCTION > Selection > Last Item
- **Objective:** Verify the last hashtag in the list can be selected
- **Precondition:** User is logged in. Dropdown is open. No hashtags selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Scroll to the bottom of the list
  3. Click on the last hashtag item
- **Expected:** The last item is selected with checkmark icon displayed.
- **Specs:** viewpoints.md - Select value from list (Last value)
- **Priority:** High

## TC_HASH_FUNC_004 - Verify selecting multiple hashtags (2-4)
- **Category:** FUNCTION > Selection > Multi Select
- **Objective:** Verify multiple hashtags can be selected simultaneously
- **Precondition:** User is logged in. Dropdown is open. No hashtags selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Click on "#High-perorming"
  3. Click on "#BE PROFESSIONAL"
  4. Click on "#BE OPTIMISTIC"
- **Expected:** All 3 hashtags are selected. Each shows a checkmark icon. Other items remain unselected.
- **Specs:** specs.md - Functional Rules (Selection)
- **Priority:** High

## TC_HASH_FUNC_005 - Verify selecting exactly 5 hashtags (maximum)
- **Category:** FUNCTION > Boundary > Select All 5
- **Objective:** Verify exactly 5 hashtags can be selected (the maximum allowed)
- **Precondition:** User is logged in. Dropdown is open. No hashtags selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Select 5 different hashtags one by one
- **Expected:** All 5 hashtags are selected with checkmark icons. Selection functions normally up to the 5th selection.
- **Specs:** specs.md - Functional Rules (Maximum selection)
- **Priority:** High

## TC_HASH_FUNC_006 - Verify 6th selection is blocked when 5 are selected
- **Category:** FUNCTION > Boundary > Attempt 6th Selection
- **Objective:** Verify that selecting a 6th hashtag is blocked when 5 are already selected
- **Precondition:** User is logged in. Dropdown is open. 5 hashtags are already selected.
- **Steps:**
  1. Ensure 5 hashtags are selected
  2. Attempt to click on an unselected (6th) hashtag
- **Expected:** The 6th hashtag is NOT selected. The click is disabled/blocked. The 5 previously selected hashtags remain selected. No error message is required (visual disable state is sufficient).
- **Specs:** specs.md - Functional Rules (Maximum selection), Design Items (A.1)
- **Priority:** High

## TC_HASH_FUNC_007 - Verify deselecting a hashtag
- **Category:** FUNCTION > Selection > Deselect
- **Objective:** Verify clicking a selected hashtag deselects it
- **Precondition:** User is logged in. Dropdown is open. At least one hashtag is selected.
- **Steps:**
  1. Open the hashtag dropdown with a selected hashtag
  2. Click on the selected hashtag
- **Expected:** The hashtag is deselected. The checkmark icon disappears. The item returns to unselected state.
- **Specs:** specs.md - Functional Rules (Selection toggle)
- **Priority:** High

## TC_HASH_FUNC_008 - Verify re-selecting a deselected hashtag
- **Category:** FUNCTION > Selection > Re-select After Deselect
- **Objective:** Verify a deselected hashtag can be re-selected
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Select a hashtag
  2. Deselect the same hashtag
  3. Select it again
- **Expected:** The hashtag is successfully re-selected. Checkmark icon reappears.
- **Specs:** viewpoints.md - Select value from list (Re-select)
- **Priority:** Medium

## TC_HASH_FUNC_009 - Verify deselecting at max allows new selection
- **Category:** FUNCTION > Selection > Select at Max Then Deselect
- **Objective:** Verify that after deselecting one hashtag when at max (5), a new hashtag can be selected
- **Precondition:** User is logged in. Dropdown is open. 5 hashtags are selected.
- **Steps:**
  1. With 5 hashtags selected, deselect one hashtag
  2. Click on a different unselected hashtag
- **Expected:** The deselected hashtag loses its checkmark. The newly clicked hashtag becomes selected with checkmark. Total selected count remains at 5.
- **Specs:** specs.md - Functional Rules (Maximum selection)
- **Priority:** High

## TC_HASH_FUNC_010 - Verify checkmark toggle on click
- **Category:** FUNCTION > Toggle State > Check Icon Toggle
- **Objective:** Verify the checkmark icon appears on select and disappears on deselect
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Click on an unselected hashtag
  2. Observe the checkmark icon
  3. Click on the same hashtag again
  4. Observe the checkmark icon
- **Expected:** Step 2: Checkmark icon appears immediately on the right side. Step 4: Checkmark icon disappears immediately.
- **Specs:** specs.md - Design Items (A.2)
- **Priority:** High

## TC_HASH_FUNC_011 - Verify zero selections state
- **Category:** FUNCTION > Boundary > Zero Selected
- **Objective:** Verify the component works correctly with no hashtags selected
- **Precondition:** User is logged in. Dropdown is open. No hashtags selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Verify no items have checkmarks
  3. Close the dropdown without selecting any
- **Expected:** All items are in unselected state (no checkmarks). The component functions normally. No error occurs.
- **Specs:** specs.md - Functional Rules
- **Priority:** Medium

## TC_HASH_FUNC_012 - Verify keyboard Up/Down arrow navigation
- **Category:** FUNCTION > Keyboard > Arrow Navigation
- **Objective:** Verify Up/Down arrow keys navigate through the hashtag list
- **Precondition:** User is logged in. Dropdown is open and focused.
- **Steps:**
  1. Open the hashtag dropdown
  2. Press the Down arrow key multiple times
  3. Press the Up arrow key multiple times
- **Expected:** Each Down arrow press highlights the next item. Each Up arrow press highlights the previous item. The highlight wraps or stops at boundaries.
- **Specs:** viewpoints.md - Select_box > Event in Select box (Up/Down key)
- **Priority:** Medium

## TC_HASH_FUNC_013 - Verify Enter key selects highlighted item
- **Category:** FUNCTION > Keyboard > Enter Key
- **Objective:** Verify pressing Enter key selects/deselects the currently highlighted hashtag
- **Precondition:** User is logged in. Dropdown is open. An item is highlighted via keyboard.
- **Steps:**
  1. Open the hashtag dropdown
  2. Use arrow keys to highlight an item
  3. Press Enter
- **Expected:** The highlighted hashtag is toggled (selected if unselected, deselected if selected). Checkmark appears/disappears accordingly.
- **Specs:** viewpoints.md - Select_box > Event in Select box (Enter key)
- **Priority:** Medium

## TC_HASH_FUNC_014 - Verify selections persist when dropdown is closed and reopened
- **Category:** FUNCTION > Data Persistence > Save Selection
- **Objective:** Verify selected hashtags remain selected after closing and reopening the dropdown
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Select 3 hashtags
  3. Close the dropdown
  4. Reopen the dropdown
- **Expected:** The same 3 hashtags are still selected with checkmark icons when the dropdown is reopened.
- **Specs:** specs.md - Functional Rules
- **Priority:** High

## TC_HASH_FUNC_015 - Verify selecting all then deselecting all
- **Category:** FUNCTION > Selection > Deselect All
- **Objective:** Verify all selected hashtags can be deselected one by one
- **Precondition:** User is logged in. Dropdown is open. 5 hashtags are selected.
- **Steps:**
  1. With 5 hashtags selected, click each selected hashtag to deselect
  2. Verify after each deselect
- **Expected:** Each click deselects one hashtag. After all 5 are deselected, no items have checkmarks. Component state returns to zero selections.
- **Specs:** viewpoints.md - Select value from list (Delete all)
- **Priority:** Medium

## TC_HASH_FUNC_016 - Verify clicking checkmark icon area toggles selection
- **Category:** FUNCTION > Toggle State > Icon Click
- **Objective:** Verify clicking directly on the checkmark icon area toggles the selection
- **Precondition:** User is logged in. Dropdown is open. A hashtag is selected.
- **Steps:**
  1. Click directly on the checkmark icon of a selected hashtag
- **Expected:** The hashtag is deselected. The checkmark icon disappears.
- **Specs:** specs.md - Design Items (A.2)
- **Priority:** Medium

## TC_HASH_FUNC_017 - Verify clicking hashtag text area toggles selection
- **Category:** FUNCTION > Toggle State > Text Click
- **Objective:** Verify clicking on the hashtag text toggles the selection
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Click directly on the text label of an unselected hashtag
- **Expected:** The hashtag is selected. The checkmark icon appears.
- **Specs:** specs.md - Design Items (A.1)
- **Priority:** Medium

## TC_HASH_FUNC_018 - Verify rapid consecutive clicks on same item
- **Category:** FUNCTION > Toggle State > Rapid Toggle
- **Objective:** Verify the component handles rapid consecutive clicks correctly
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Rapidly click the same hashtag item multiple times in quick succession
- **Expected:** The item toggles correctly between selected and unselected states. No UI glitch or inconsistent state occurs. Final state reflects the last toggle.
- **Specs:** specs.md - Functional Rules
- **Priority:** Low

## TC_HASH_FUNC_019 - Verify previously saved selections load on edit
- **Category:** FUNCTION > Data Persistence > Load Existing
- **Objective:** Verify previously saved hashtag selections are loaded when editing a kudos
- **Precondition:** User is logged in. A kudos with saved hashtags exists.
- **Steps:**
  1. Navigate to edit an existing kudos that has hashtags
  2. Open the hashtag dropdown
- **Expected:** Previously saved hashtags appear as selected (with checkmark icons). User can modify the selection.
- **Specs:** viewpoints.md - Checkbox > Default display (Edit form)
- **Priority:** High
