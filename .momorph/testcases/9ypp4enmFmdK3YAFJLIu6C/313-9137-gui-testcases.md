# GUI Test Cases - Floating Action Button (313:9137)

## GUI-001: Verify FAB default appearance (collapsed state)
- **Objective:** Confirm the FAB displays correctly in its default collapsed state
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Observe the FAB widget button
  2. Check the shape, size, background color, and icon layout
- **Expected:**
  - FAB is a rounded button with yellow background
  - Size is 41x32px
  - Two icons displayed with '/' separator between them
  - Left icon: kudos/write icon, Right icon: the le SAA icon
- **Priority:** High

## GUI-002: Verify FAB fixed position at bottom-right
- **Objective:** Confirm the FAB is positioned at the bottom-right corner of the viewport
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Observe the FAB position on the screen
  2. Compare with design spec
- **Expected:** FAB is positioned at the bottom-right corner of the viewport, matching the design specification
- **Priority:** High

## GUI-003: Verify FAB hover state
- **Objective:** Confirm the FAB shows a light shadow effect on hover
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Move the mouse cursor over the FAB widget button
  2. Observe the visual change
- **Expected:** FAB displays a light shadow effect when hovered
- **Priority:** Medium

## GUI-004: Verify FAB icon rendering
- **Objective:** Confirm both icons inside the FAB render correctly
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Observe the kudos (write) icon on the left
  2. Observe the '/' separator
  3. Observe the the le SAA icon on the right
- **Expected:** Both icons are clearly visible, properly sized, and the '/' separator is displayed between them
- **Priority:** High

## GUI-005: Verify FAB z-index (floats above content)
- **Objective:** Confirm the FAB floats above all other page content
- **Precondition:** User is on a page with content near the bottom-right corner
- **Steps:**
  1. Scroll so that page content overlaps the FAB position
  2. Observe whether FAB is above or below the content
- **Expected:** FAB always floats above page content, never hidden behind other elements
- **Priority:** Medium

## GUI-006: Verify FAB responsive display on mobile (< 768px)
- **Objective:** Confirm the FAB displays correctly on mobile viewport
- **Precondition:** Page is viewed on a mobile device or viewport width < 768px
- **Steps:**
  1. Resize browser to mobile width (320px - 767px)
  2. Observe the FAB position, size, and appearance
- **Expected:** FAB is displayed correctly, positioned at bottom-right, touch target is at least 44x44px
- **Priority:** High

## GUI-007: Verify FAB responsive display on tablet (768px - 1023px)
- **Objective:** Confirm the FAB displays correctly on tablet viewport
- **Precondition:** Page is viewed on a tablet device or viewport width 768px - 1023px
- **Steps:**
  1. Resize browser to tablet width (768px)
  2. Observe the FAB position, size, and appearance
- **Expected:** FAB is displayed correctly at bottom-right corner matching design specs
- **Priority:** Medium

## GUI-008: Verify FAB responsive display on desktop (>= 1024px)
- **Objective:** Confirm the FAB displays correctly on desktop viewport
- **Precondition:** Page is viewed on a desktop device or viewport width >= 1024px
- **Steps:**
  1. Resize browser to desktop width (1024px, 1440px)
  2. Observe the FAB position, size, and appearance
- **Expected:** FAB is displayed correctly at bottom-right corner matching design specs
- **Priority:** Medium

## GUI-009: Verify FAB display after zoom in/out
- **Objective:** Confirm FAB layout is not broken when zooming
- **Precondition:** User is on a page with the FAB displayed
- **Steps:**
  1. Zoom in to 150%
  2. Observe FAB appearance and position
  3. Zoom out to 75%
  4. Observe FAB appearance and position
- **Expected:** FAB remains properly displayed without layout breakage at various zoom levels
- **Priority:** Low
