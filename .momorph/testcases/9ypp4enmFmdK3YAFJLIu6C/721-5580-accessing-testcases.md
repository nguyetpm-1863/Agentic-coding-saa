# ACCESSING Test Cases - Dropdown Hashtag Filter

> Note: This is a dropdown component, not a standalone page. No URL-based access tests apply. Tests focus on dropdown trigger and visibility.

## ACC-001: Open dropdown by clicking trigger button
- **Objective:** Verify the dropdown hashtag list opens when the user clicks the dropdown trigger
- **Precondition:** User is on the page containing the hashtag filter dropdown; dropdown is closed
- **Steps:**
  1. Locate the hashtag filter dropdown trigger on the page
  2. Click on the dropdown trigger
- **Expected:** Dropdown list opens and displays the list of 13 hashtag items
- **Spec:** A (Dropdown-List)
- **Priority:** High

## ACC-002: Close dropdown by clicking outside
- **Objective:** Verify the dropdown closes when the user clicks outside the dropdown area
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the hashtag filter dropdown
  2. Click on any area outside the dropdown
- **Expected:** Dropdown closes; no selection change occurs
- **Spec:** A (Dropdown-List)
- **Priority:** High

## ACC-003: Close dropdown by pressing Escape key
- **Objective:** Verify the dropdown closes when the user presses the Escape key
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the hashtag filter dropdown
  2. Press the Escape key on the keyboard
- **Expected:** Dropdown closes; no selection change occurs
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## ACC-004: Dropdown visibility after page load
- **Objective:** Verify the dropdown is closed by default when the page loads
- **Precondition:** Page containing the hashtag filter has loaded
- **Steps:**
  1. Navigate to the page containing the hashtag filter
  2. Observe the dropdown trigger area
- **Expected:** Dropdown list is not visible (closed state); only the trigger element is shown
- **Spec:** A (Dropdown-List)
- **Priority:** High

## ACC-005: Re-open dropdown after closing
- **Objective:** Verify the dropdown can be reopened after being closed
- **Precondition:** Dropdown has been opened and then closed
- **Steps:**
  1. Open the dropdown
  2. Close the dropdown (click outside)
  3. Click the dropdown trigger again
- **Expected:** Dropdown reopens and displays the full list of hashtag items
- **Spec:** A (Dropdown-List)
- **Priority:** Medium
