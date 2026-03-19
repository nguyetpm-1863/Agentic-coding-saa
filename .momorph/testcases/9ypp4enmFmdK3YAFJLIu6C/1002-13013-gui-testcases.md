# GUI Test Cases - Dropdown List Hashtag

## TC_HASH_GUI_001 - Verify dropdown header display
- **Category:** GUI > Dropdown Header > Label Display
- **Objective:** Verify the dropdown header shows "Hashtag" label and "Toi da 5" subtitle correctly
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Observe the header area
- **Expected:** Header displays "Hashtag" label text and "Toi da 5" (Max 5) subtitle. "+" icon is visible to the left.
- **Specs:** specs.md - Visual Specifications
- **Priority:** High

## TC_HASH_GUI_002 - Verify all 13 hashtags are displayed
- **Category:** GUI > Hashtag List > Item Display
- **Objective:** Verify all 13 hashtags are displayed in the dropdown with '#' prefix
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Scroll through the entire list
  3. Count and verify each hashtag
- **Expected:** All 13 hashtags are displayed, each with '#' prefix: #Toan dien, #Gioi chuyen mon, #Hieu suat cao, #Truyen cam hung, #Cong hien, #Aim High, #Be Agile, #Wasshoi, #Huong muc tieu, #Huong khach hang, #Chuan quy trinh, #Giai phap sang tao, #Quan ly xuat sac.
- **Specs:** specs.md - Hashtag List
- **Priority:** High

## TC_HASH_GUI_003 - Verify hashtag list order
- **Category:** GUI > Hashtag List > Item Order
- **Objective:** Verify hashtags are displayed in the correct predefined order
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Scroll through the list and note the order
- **Expected:** Hashtags appear in the order defined in specs: Toan dien, Gioi chuyen mon, Hieu suat cao, Truyen cam hung, Cong hien, Aim High, Be Agile, Wasshoi, Huong muc tieu, Huong khach hang, Chuan quy trinh, Giai phap sang tao, Quan ly xuat sac.
- **Specs:** specs.md - Hashtag List
- **Priority:** Medium

## TC_HASH_GUI_004 - Verify selected item display with checkmark
- **Category:** GUI > Hashtag List > Selected State
- **Objective:** Verify selected hashtag items display a golden checkmark icon on the right
- **Precondition:** User is logged in. Dropdown is open. At least one hashtag is selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Click on a hashtag to select it
  3. Observe the selected item
- **Expected:** The selected hashtag displays a golden/yellow checkmark icon (24x24px) on the right side of the item row.
- **Specs:** specs.md - Design Items (A.2), Visual Specifications
- **Priority:** High

## TC_HASH_GUI_005 - Verify unselected item display without checkmark
- **Category:** GUI > Hashtag List > Unselected State
- **Objective:** Verify unselected hashtag items do not show a checkmark icon
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Observe unselected hashtag items
- **Expected:** Unselected items display only the hashtag text with '#' prefix. No checkmark icon is shown. Space for the icon is preserved.
- **Specs:** specs.md - Design Items (D), Visual Specifications
- **Priority:** High

## TC_HASH_GUI_006 - Verify hover effect on hashtag items
- **Category:** GUI > Hashtag List > Hover State
- **Objective:** Verify background color changes on hover over a hashtag item
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Hover the mouse over a hashtag item (without clicking)
- **Expected:** The hovered item's background color changes slightly to highlight it, distinguishing it from other items.
- **Specs:** specs.md - Functional Rules (Hover effect)
- **Priority:** Medium

## TC_HASH_GUI_007 - Verify dark background theme
- **Category:** GUI > Dropdown Container > Background
- **Objective:** Verify the dropdown has a dark/black background theme
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Observe the dropdown background
- **Expected:** Dropdown container has a dark/black background. Hashtag text is white for contrast.
- **Specs:** specs.md - Visual Specifications
- **Priority:** Medium

## TC_HASH_GUI_008 - Verify scrollbar when list exceeds visible area
- **Category:** GUI > Dropdown Container > Scroll
- **Objective:** Verify a scrollbar appears when the hashtag list exceeds the dropdown visible area
- **Precondition:** User is logged in. Dropdown is open. All 13 items cannot fit in visible area.
- **Steps:**
  1. Open the hashtag dropdown
  2. Observe if a scrollbar is present
  3. Scroll down to see remaining items
- **Expected:** A vertical scrollbar appears when the list exceeds the visible area. User can scroll up and down smoothly to see all 13 items.
- **Specs:** viewpoints.md - Select_box > Event in Select box (Scroll)
- **Priority:** Medium

## TC_HASH_GUI_009 - Verify hashtag text with '#' prefix format
- **Category:** GUI > Hashtag List > Text Format
- **Objective:** Verify each hashtag item displays with '#' character prefix
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Observe the text format of each item
- **Expected:** Every hashtag item text starts with '#' character (e.g., "#High-perorming", "#BE PROFESSIONAL", "#BE OPTIMISTIC").
- **Specs:** specs.md - Design Items (A.1)
- **Priority:** Medium

## TC_HASH_GUI_010 - Verify checkmark icon size (24x24px)
- **Category:** GUI > Hashtag List > Icon Size
- **Objective:** Verify the checkmark icon for selected items is 24x24 pixels
- **Precondition:** User is logged in. Dropdown is open. At least one item selected.
- **Steps:**
  1. Open the hashtag dropdown
  2. Select a hashtag
  3. Inspect the checkmark icon dimensions
- **Expected:** The checkmark icon is rendered at 24x24 pixels in a circular shape.
- **Specs:** specs.md - Design Items (A.2)
- **Priority:** Low

## TC_HASH_GUI_011 - Verify responsive display on mobile (320px)
- **Category:** GUI > Responsive > Mobile
- **Objective:** Verify the dropdown displays correctly on mobile screen width
- **Precondition:** User is logged in. Browser viewport set to 320px width.
- **Steps:**
  1. Set browser viewport to 320px width
  2. Open the hashtag dropdown
  3. Observe layout and readability
- **Expected:** Dropdown displays correctly within the viewport. All hashtag text is readable. Checkmark icons are visible. No horizontal overflow.
- **Specs:** specs.md - Visual Specifications
- **Priority:** Medium

## TC_HASH_GUI_012 - Verify responsive display on tablet (768px)
- **Category:** GUI > Responsive > Tablet
- **Objective:** Verify the dropdown displays correctly on tablet screen width
- **Precondition:** User is logged in. Browser viewport set to 768px width.
- **Steps:**
  1. Set browser viewport to 768px width
  2. Open the hashtag dropdown
  3. Observe layout and readability
- **Expected:** Dropdown displays correctly. All elements properly sized and positioned.
- **Specs:** specs.md - Visual Specifications
- **Priority:** Medium

## TC_HASH_GUI_013 - Verify multiple selected items display simultaneously
- **Category:** GUI > Hashtag List > Multiple Selected
- **Objective:** Verify that multiple selected hashtags all display checkmark icons simultaneously
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Select 3 different hashtags
  3. Observe all selected items
- **Expected:** All 3 selected hashtags display golden checkmark icons on the right. Unselected items remain without checkmarks.
- **Specs:** specs.md - Design Items (A, B, C)
- **Priority:** High
