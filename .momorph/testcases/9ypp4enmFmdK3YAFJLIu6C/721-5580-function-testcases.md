# FUNCTION Test Cases - Dropdown Hashtag Filter

## FUN-001: Select a hashtag item by clicking
- **Objective:** Verify clicking an unselected hashtag selects it and applies the filter
- **Precondition:** Dropdown is open; no item is currently selected
- **Steps:**
  1. Open the dropdown
  2. Click on '#Dedicated' hashtag item
- **Expected:** '#Dedicated' is selected (shown with glow effect); dropdown closes; page content is filtered by '#Dedicated'
- **Spec:** A.1 (Tag1), A (Dropdown-List)
- **Priority:** High

## FUN-002: Deselect a hashtag item (toggle off)
- **Objective:** Verify clicking a selected hashtag deselects it
- **Precondition:** A hashtag is currently selected; dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Click on the currently selected hashtag item
- **Expected:** Item is deselected; filter is removed; page shows unfiltered content
- **Spec:** A.1 (Tag1)
- **Priority:** High

## FUN-003: Single selection enforcement - selecting new item deselects previous
- **Objective:** Verify only one hashtag can be active at a time
- **Precondition:** '#Dedicated' is currently selected
- **Steps:**
  1. Open the dropdown
  2. Click on '#Inspring' (a different hashtag)
- **Expected:** '#Inspring' becomes selected; '#Dedicated' is deselected; filter updates to '#Inspring'; dropdown closes
- **Spec:** A (Dropdown-List), A.2 (Tag2)
- **Priority:** High

## FUN-004: Select the first item in the list
- **Objective:** Verify the first hashtag in the list can be selected
- **Precondition:** Dropdown is open; scroll position is at top
- **Steps:**
  1. Open the dropdown
  2. Click on the first item (Toan dien)
- **Expected:** First item is selected; dropdown closes; filter applied correctly
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-005: Select a middle item in the list
- **Objective:** Verify a middle hashtag in the list can be selected
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Scroll to middle of list if needed
  3. Click on a middle item (e.g., 'Aim High')
- **Expected:** Middle item is selected; dropdown closes; filter applied correctly
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-006: Select the last item in the list
- **Objective:** Verify the last hashtag in the list can be selected
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Scroll to the bottom of the list
  3. Click on the last item (Quan ly xuat sac)
- **Expected:** Last item is selected; dropdown closes; filter applied correctly
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-007: Dropdown closes after selecting an item
- **Objective:** Verify the dropdown automatically closes after a hashtag is selected
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Click on any hashtag item
- **Expected:** Dropdown closes immediately after selection; selected filter is applied
- **Spec:** A (Dropdown-List)
- **Priority:** High

## FUN-008: Filter applies to entire page after selection
- **Objective:** Verify the selected hashtag filter is applied to the entire page content
- **Precondition:** Page has content associated with different hashtags
- **Steps:**
  1. Open the dropdown
  2. Select '#Dedicated'
  3. Observe page content
- **Expected:** Page displays only content tagged with '#Dedicated'; unrelated content is hidden or filtered out
- **Spec:** A (Dropdown-List)
- **Priority:** High

## FUN-009: Filter removal shows all content
- **Objective:** Verify removing the filter shows all unfiltered content
- **Precondition:** A hashtag filter is currently active
- **Steps:**
  1. Open the dropdown
  2. Click the currently selected hashtag to deselect
  3. Observe page content
- **Expected:** Page returns to showing all content without any hashtag filter
- **Spec:** A (Dropdown-List)
- **Priority:** High

## FUN-010: Change filter from one hashtag to another
- **Objective:** Verify changing the active filter updates page content correctly
- **Precondition:** '#Dedicated' filter is currently active
- **Steps:**
  1. Open the dropdown
  2. Select '#Inspring' (different hashtag)
  3. Observe page content
- **Expected:** Page content updates to show only items tagged with '#Inspring'; previous '#Dedicated' filter is replaced
- **Spec:** A (Dropdown-List), A.2 (Tag2)
- **Priority:** High

## FUN-011: Keyboard navigation with Up/Down arrow keys
- **Objective:** Verify Up and Down arrow keys navigate through hashtag items
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Press the Down arrow key multiple times
  3. Press the Up arrow key multiple times
- **Expected:** Each Down press highlights the next item; each Up press highlights the previous item; highlight wraps or stops at boundaries
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-012: Keyboard selection with Enter key
- **Objective:** Verify pressing Enter selects the currently highlighted item
- **Precondition:** Dropdown is open; an item is highlighted via keyboard navigation
- **Steps:**
  1. Open the dropdown
  2. Use Down arrow to highlight a hashtag
  3. Press Enter
- **Expected:** Highlighted hashtag is selected; dropdown closes; filter is applied to the page
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-013: Close dropdown with Escape key
- **Objective:** Verify pressing Escape closes the dropdown without changing selection
- **Precondition:** Dropdown is open; a hashtag is highlighted but not yet selected
- **Steps:**
  1. Open the dropdown
  2. Navigate with arrow keys to highlight an item
  3. Press Escape
- **Expected:** Dropdown closes; no selection change; previous filter state remains unchanged
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-014: Vertical scroll within dropdown list
- **Objective:** Verify the dropdown list scrolls vertically when items exceed the container height
- **Precondition:** Dropdown is open; 13 items exceed visible area
- **Steps:**
  1. Open the dropdown
  2. Scroll down using mouse wheel or trackpad
  3. Scroll back up
- **Expected:** List scrolls smoothly; all 13 items are accessible via scrolling; scroll does not exceed list boundaries
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-015: Click outside dropdown closes it without selection change
- **Objective:** Verify clicking outside the dropdown closes it and preserves current state
- **Precondition:** Dropdown is open; '#Dedicated' is currently selected
- **Steps:**
  1. Open the dropdown
  2. Click on an area outside the dropdown
- **Expected:** Dropdown closes; '#Dedicated' remains the active filter; page content unchanged
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-016: Rapidly open and close dropdown
- **Objective:** Verify dropdown handles rapid open/close interactions without errors
- **Precondition:** Page with dropdown is loaded
- **Steps:**
  1. Click the dropdown trigger rapidly (open-close-open-close) multiple times
- **Expected:** Dropdown opens and closes correctly each time without visual glitches, lag, or errors
- **Spec:** A (Dropdown-List)
- **Priority:** Low

## FUN-017: Select each of all 13 hashtags sequentially
- **Objective:** Verify every one of the 13 hashtags can be selected and applies a filter
- **Precondition:** Dropdown is functional
- **Steps:**
  1. For each of the 13 hashtags: open dropdown, select hashtag, verify filter is applied, verify page content updates
- **Expected:** All 13 hashtags are selectable; each applies the correct filter; page content updates accordingly for each
- **Spec:** A (Dropdown-List)
- **Priority:** High

## FUN-018: Dropdown state persistence after page interaction
- **Objective:** Verify the selected hashtag filter persists while the user interacts with filtered page content
- **Precondition:** A hashtag filter is active
- **Steps:**
  1. Select a hashtag filter
  2. Interact with the filtered page content (scroll page, click items)
  3. Reopen the dropdown
- **Expected:** Previously selected hashtag is still shown as selected in the dropdown
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## FUN-019: Unable to type text in dropdown
- **Objective:** Verify users cannot type text into the dropdown list
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Attempt to type characters on the keyboard
- **Expected:** No text input is accepted; dropdown does not have a text input field; typing has no effect on the list (except for keyboard navigation keys)
- **Spec:** A (Dropdown-List)
- **Priority:** Low
