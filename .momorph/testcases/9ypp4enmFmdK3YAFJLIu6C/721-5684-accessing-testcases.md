# ACCESSING Test Cases - Dropdown Phong Ban

## Open Dropdown

### TC_DPB_ACC_001 - Open dropdown by clicking trigger
- **Objective:** Verify the department dropdown opens when user clicks the dropdown trigger
- **Precondition:** User is logged in and on a page containing the department dropdown
- **Steps:**
  1. Navigate to the page with the department dropdown.
  2. Click on the department dropdown trigger.
- **Expected:** Dropdown list expands showing department items with dark background, rounded corners. Currently selected department is highlighted.
- **Priority:** High

### TC_DPB_ACC_002 - Open dropdown by keyboard (Enter/Space)
- **Objective:** Verify the department dropdown opens when user presses Enter or Space on focused trigger
- **Precondition:** User is logged in and on a page containing the department dropdown
- **Steps:**
  1. Navigate to the page with the department dropdown.
  2. Tab to focus on the dropdown trigger.
  3. Press Enter (or Space).
- **Expected:** Dropdown list expands showing department items.
- **Priority:** Medium

## Close Dropdown

### TC_DPB_ACC_003 - Close dropdown by selecting an item
- **Objective:** Verify the dropdown closes after selecting a department
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Click on any department item.
- **Expected:** Dropdown closes. Selected department is applied as filter.
- **Priority:** High

### TC_DPB_ACC_004 - Close dropdown by clicking outside
- **Objective:** Verify the dropdown closes when user clicks outside the dropdown area
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Click on any area outside the dropdown.
- **Expected:** Dropdown closes. Previously selected department remains unchanged.
- **Priority:** High

### TC_DPB_ACC_005 - Close dropdown by pressing Escape
- **Objective:** Verify the dropdown closes when user presses the Escape key
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the department dropdown.
  2. Press the Escape key.
- **Expected:** Dropdown closes. Previously selected department remains unchanged.
- **Priority:** Medium

### TC_DPB_ACC_006 - Double-click on dropdown trigger
- **Objective:** Verify dropdown behaves correctly on double-click
- **Precondition:** User is logged in and on a page containing the department dropdown
- **Steps:**
  1. Double-click on the department dropdown trigger.
- **Expected:** Dropdown opens and closes (or opens once) without error. No duplicate actions.
- **Priority:** Low
