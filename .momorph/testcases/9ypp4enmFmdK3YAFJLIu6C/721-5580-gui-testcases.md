# GUI Test Cases - Dropdown Hashtag Filter

## GUI-001: Dropdown container layout
- **Objective:** Verify the dropdown container displays with correct position, size, background, and border
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the hashtag filter dropdown
  2. Inspect the dropdown container visually
- **Expected:** Container has dark (near-black) background, rounded corners, subtle border, positioned correctly below the trigger
- **Spec:** A (Dropdown-List)
- **Priority:** High

## GUI-002: Item dimensions and spacing
- **Objective:** Verify each hashtag item has correct dimensions and spacing
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Inspect individual tag items
- **Expected:** Each tag item is approximately 131x56px with consistent spacing between items
- **Spec:** A.1, A.2, A.3
- **Priority:** High

## GUI-003: Default state display - unselected items
- **Objective:** Verify unselected hashtag items display with correct default styling
- **Precondition:** Dropdown is open with at least one unselected item visible
- **Steps:**
  1. Open the dropdown
  2. Observe unselected hashtag items
- **Expected:** Unselected items show white/bright bold text with '#' prefix on dark background, no glow effect
- **Spec:** A.2 (Tag2), A.3 (Tag3)
- **Priority:** High

## GUI-004: Selected state display - active item
- **Objective:** Verify the selected hashtag item displays with glow/highlight effect
- **Precondition:** Dropdown is open; one item is selected
- **Steps:**
  1. Open the dropdown
  2. Select a hashtag item
  3. Reopen the dropdown
  4. Observe the selected item
- **Expected:** Selected item has dark background with glowing border/highlight effect and bright text, visually distinct from unselected items
- **Spec:** A.1 (Tag1)
- **Priority:** High

## GUI-005: Hover state display
- **Objective:** Verify hashtag items show hover effect when mouse hovers over them
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Hover the mouse over an unselected hashtag item
- **Expected:** Item displays a light background highlight to indicate interactivity
- **Spec:** A.2 (Tag2)
- **Priority:** Medium

## GUI-006: All 13 hashtags display correctly
- **Objective:** Verify all 13 hashtag labels are displayed with correct text
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Scroll through the entire list
  3. Verify each hashtag label
- **Expected:** All 13 hashtags display correctly: Toan dien, Gioi chuyen mon, Hieu suat cao, Truyen cam hung, Cong hien, Aim High, Be Agile, Wasshoi, Huong muc tieu, Huong khach hang, Chuan quy trinh, Giai phap sang tao, Quan ly xuat sac
- **Spec:** A (Dropdown-List)
- **Priority:** High

## GUI-007: Hashtag text format with '#' prefix
- **Objective:** Verify all hashtag items are displayed with '#' prefix
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Check text format of each item
- **Expected:** Each hashtag label is prefixed with '#' character (e.g., '#Dedicated', '#Inspring')
- **Spec:** A.1, A.2, A.3
- **Priority:** Medium

## GUI-008: Font style and color consistency
- **Objective:** Verify font style, size, and color are consistent across all hashtag items
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Compare font properties across all items
- **Expected:** All items use the same font family, size, weight (bold), and color (white/bright for default, bright for selected)
- **Spec:** A.1, A.2, A.3
- **Priority:** Medium

## GUI-009: Scrollbar appearance when list exceeds container
- **Objective:** Verify vertical scrollbar appears when the list of 13 items exceeds the visible container area
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Check if all 13 items fit within the visible area
- **Expected:** If items exceed the container height, a vertical scrollbar appears and functions correctly (scroll up/down)
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## GUI-010: No horizontal scrollbar
- **Objective:** Verify no horizontal scrollbar appears in the dropdown
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Check for horizontal scrollbar
- **Expected:** No horizontal scrollbar is displayed; all content fits within the container width
- **Spec:** A (Dropdown-List)
- **Priority:** Low

## GUI-011: Dropdown order of hashtags
- **Objective:** Verify hashtag items appear in the correct order as specified
- **Precondition:** Dropdown is open
- **Steps:**
  1. Open the dropdown
  2. Verify the order of items from top to bottom
- **Expected:** Items appear in the defined order matching the spec list (Toan dien first through Quan ly xuat sac last)
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## GUI-012: Responsive display on mobile (320px)
- **Objective:** Verify dropdown displays correctly on mobile viewport
- **Precondition:** Browser viewport set to 320px width
- **Steps:**
  1. Set viewport to 320px width
  2. Open the hashtag filter dropdown
  3. Inspect layout, text, and item visibility
- **Expected:** Dropdown displays correctly; items are readable; touch targets are at least 44x44px; no content overflow
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## GUI-013: Responsive display on tablet (768px)
- **Objective:** Verify dropdown displays correctly on tablet viewport
- **Precondition:** Browser viewport set to 768px width
- **Steps:**
  1. Set viewport to 768px width
  2. Open the hashtag filter dropdown
  3. Inspect layout
- **Expected:** Dropdown displays correctly with proper sizing and alignment for tablet
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## GUI-014: Responsive display on desktop (1024px+)
- **Objective:** Verify dropdown displays correctly on desktop viewport
- **Precondition:** Browser viewport set to 1024px+ width
- **Steps:**
  1. Set viewport to 1024px or wider
  2. Open the hashtag filter dropdown
  3. Inspect layout
- **Expected:** Dropdown displays correctly with proper sizing and alignment for desktop
- **Spec:** A (Dropdown-List)
- **Priority:** Medium

## GUI-015: Selected item visual distinction
- **Objective:** Verify the selected item is clearly distinguishable from unselected items
- **Precondition:** Dropdown is open with one item selected
- **Steps:**
  1. Select a hashtag
  2. Reopen the dropdown
  3. Compare selected vs unselected items visually
- **Expected:** Selected item has clearly visible glow/highlight effect that makes it easily distinguishable from unselected items
- **Spec:** A.1 (Tag1)
- **Priority:** High
