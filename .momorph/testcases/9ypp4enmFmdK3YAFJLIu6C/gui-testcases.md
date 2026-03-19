# GUI Test Cases - Dropdown-profile Admin

## GUI-001: Dropdown container display
- **Objective:** Verify dropdown container displays with correct dark background, rounded corners, and position
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Click on the profile trigger to open dropdown
  2. Observe the dropdown container appearance
- **Expected:** Dropdown displays with dark background, rounded corners, positioned below/near the profile trigger as per design.
- **Specs:** A
- **Priority:** High

## GUI-002: Menu items display in correct order
- **Objective:** Verify menu items are displayed in correct order: Profile, Dashboard, Logout
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Verify the order of menu items from top to bottom
- **Expected:** Items appear in order: 1) Profile, 2) Dashboard, 3) Logout.
- **Specs:** A, A.1, A.2, A.3
- **Priority:** High

## GUI-003: Profile item displays in active state
- **Objective:** Verify Profile menu item is displayed with active/highlighted state
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe the Profile item appearance
- **Expected:** Profile item has highlighted/light background distinguishing it from other items. Text is light/yellow colored.
- **Specs:** A.1
- **Priority:** High

## GUI-004: Profile item icon display
- **Objective:** Verify user icon is displayed correctly next to Profile label
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe the Profile item icon
- **Expected:** User icon is displayed on the right side of "Profile" text label, matching the design.
- **Specs:** A.1
- **Priority:** Medium

## GUI-005: Dashboard item displays in default state
- **Objective:** Verify Dashboard menu item displays in default (non-active) state
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe the Dashboard item appearance
- **Expected:** Dashboard item has standard dark background with white text, not highlighted.
- **Specs:** A.2
- **Priority:** High

## GUI-006: Dashboard item icon display
- **Objective:** Verify grid/dashboard icon is displayed correctly next to Dashboard label
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe the Dashboard item icon
- **Expected:** Grid icon is displayed on the right side of "Dashboard" text label, matching the design.
- **Specs:** A.2
- **Priority:** Medium

## GUI-007: Logout item displays in default state
- **Objective:** Verify Logout menu item displays in default (non-active) state
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe the Logout item appearance
- **Expected:** Logout item has standard dark background with white text, not highlighted.
- **Specs:** A.3
- **Priority:** High

## GUI-008: Logout item icon display
- **Objective:** Verify chevron/arrow icon is displayed correctly next to Logout label
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe the Logout item icon
- **Expected:** Chevron/right arrow icon is displayed on the right side of "Logout" text label, matching the design.
- **Specs:** A.3
- **Priority:** Medium

## GUI-009: Hover state on Profile item
- **Objective:** Verify hover state changes appearance on Profile item
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Hover mouse over the Profile item
- **Expected:** Background changes to highlight color. Cursor changes to pointer.
- **Specs:** A, A.1
- **Priority:** Medium

## GUI-010: Hover state on Dashboard item
- **Objective:** Verify hover state changes appearance on Dashboard item
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Hover mouse over the Dashboard item
- **Expected:** Background changes to highlight color. Cursor changes to pointer.
- **Specs:** A, A.2
- **Priority:** Medium

## GUI-011: Hover state on Logout item
- **Objective:** Verify hover state changes appearance on Logout item
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Hover mouse over the Logout item
- **Expected:** Background changes to highlight color. Cursor changes to pointer.
- **Specs:** A, A.3
- **Priority:** Medium

## GUI-012: Text and icon alignment
- **Objective:** Verify text labels are left-aligned and icons are right-aligned within each menu item
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Observe alignment of text and icons for all items
- **Expected:** All text labels are left-aligned. All icons are right-aligned. Consistent spacing across items.
- **Specs:** A.1, A.2, A.3
- **Priority:** Medium

## GUI-013: Font style and size consistency
- **Objective:** Verify font style and size are consistent across all menu items
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open the dropdown menu
  2. Compare font style and size of all 3 menu items
- **Expected:** Font family, size, and weight are consistent across all menu items as per design.
- **Specs:** A.1, A.2, A.3
- **Priority:** Medium

## GUI-014: Dropdown display on mobile viewport (320px)
- **Objective:** Verify dropdown displays correctly on mobile screen
- **Precondition:** Admin user is logged in; viewport set to 320px width
- **Steps:**
  1. Open the dropdown menu on mobile viewport
  2. Verify all items are visible and not clipped
- **Expected:** Dropdown is fully visible, items are readable, icons display correctly. No horizontal overflow.
- **Specs:** A
- **Priority:** Medium

## GUI-015: Dropdown display on tablet viewport (768px)
- **Objective:** Verify dropdown displays correctly on tablet screen
- **Precondition:** Admin user is logged in; viewport set to 768px width
- **Steps:**
  1. Open the dropdown menu on tablet viewport
  2. Verify layout and positioning
- **Expected:** Dropdown displays correctly with proper positioning relative to trigger.
- **Specs:** A
- **Priority:** Low

## GUI-016: Dropdown display on desktop viewport (1440px)
- **Objective:** Verify dropdown displays correctly on desktop screen
- **Precondition:** Admin user is logged in; viewport set to 1440px width
- **Steps:**
  1. Open the dropdown menu on desktop viewport
  2. Verify layout and positioning
- **Expected:** Dropdown displays correctly as per design at desktop width.
- **Specs:** A
- **Priority:** Low

## GUI-017: Clicking icon vs text on same item
- **Objective:** Verify clicking on the icon area and text area of a menu item produces the same result
- **Precondition:** Admin user is logged in; dropdown is open
- **Steps:**
  1. Open dropdown and click on the text "Dashboard"
  2. Re-open dropdown and click on the Dashboard grid icon
- **Expected:** Both clicks navigate to the same Dashboard page.
- **Specs:** A.2
- **Priority:** Medium
