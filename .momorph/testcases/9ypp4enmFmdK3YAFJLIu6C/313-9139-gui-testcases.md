# GUI Test Cases - Floating Action Button 2 (313:9139)

## GUI-001: Verify expanded FAB panel layout
- **Objective:** Confirm the expanded FAB panel displays buttons in correct vertical stack order
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Observe the expanded FAB panel layout
  2. Check button stacking order from top to bottom
- **Expected:** Buttons are stacked vertically at bottom-right: "The le" on top, "Viet KUDOS" in middle, cancel (X) button at bottom
- **Priority:** High

## GUI-002: Verify Button The le appearance
- **Objective:** Confirm the "The le" button displays correctly per design specs
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Observe the "The le" button
  2. Check icon, label text, size, background color, border radius
- **Expected:**
  - Icon displayed on the left side
  - Label text: "The le"
  - Size: 149x64px
  - Background: light yellow
  - Rounded corners (bo goc)
- **Priority:** High

## GUI-003: Verify Button Viet KUDOS appearance
- **Objective:** Confirm the "Viet KUDOS" button displays correctly per design specs
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Observe the "Viet KUDOS" button
  2. Check icon (pen), label text, background color, border radius
- **Expected:**
  - Pen/write icon displayed on the left
  - Label text: "Viet KUDOS"
  - Background: light yellow
  - Rounded corners
- **Priority:** High

## GUI-004: Verify Button Huy (cancel) appearance
- **Objective:** Confirm the cancel button displays correctly per design specs
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Observe the cancel (X) button
  2. Check shape, size, color, icon
- **Expected:**
  - Circular shape
  - Size: 56x56px
  - Background: red
  - White 'X' icon centered
  - Light shadow effect
- **Priority:** High

## GUI-005: Verify Button The le hover state
- **Objective:** Confirm the "The le" button shows proper hover effect
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Move mouse cursor over the "The le" button
  2. Observe visual change
  3. Move cursor away
- **Expected:** Light shadow increases on hover; returns to normal when cursor leaves
- **Priority:** Medium

## GUI-006: Verify Button Viet KUDOS hover state
- **Objective:** Confirm the "Viet KUDOS" button shows proper hover effect
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Move mouse cursor over the "Viet KUDOS" button
  2. Observe visual change
  3. Move cursor away
- **Expected:** Shadow increases and brightness changes on hover; returns to normal when cursor leaves
- **Priority:** Medium

## GUI-007: Verify Button Huy hover state
- **Objective:** Confirm the cancel button shows proper hover effect
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Move mouse cursor over the cancel (X) button
  2. Observe visual change
- **Expected:** Visual feedback on hover (e.g., darker red or increased shadow)
- **Priority:** Low

## GUI-008: Verify expanded FAB z-index
- **Objective:** Confirm the expanded FAB panel floats above all page content
- **Precondition:** FAB is in expanded state on a page with content near bottom-right
- **Steps:**
  1. Scroll so page content overlaps the FAB position
  2. Observe layering
- **Expected:** Expanded FAB panel and all buttons float above page content
- **Priority:** Medium

## GUI-009: Verify expanded FAB responsive on mobile (< 768px)
- **Objective:** Confirm expanded FAB displays correctly on mobile viewport
- **Precondition:** FAB is in expanded state, viewport < 768px
- **Steps:**
  1. Resize browser to mobile width (320px - 767px)
  2. Observe the expanded FAB layout, button sizes, positions
- **Expected:** All buttons are visible, properly sized, touch targets at least 44x44px, no overlap or clipping
- **Priority:** High

## GUI-010: Verify expanded FAB responsive on tablet (768px - 1023px)
- **Objective:** Confirm expanded FAB displays correctly on tablet viewport
- **Precondition:** FAB is in expanded state, viewport 768px - 1023px
- **Steps:**
  1. Resize browser to tablet width (768px)
  2. Observe the expanded FAB layout
- **Expected:** All buttons displayed correctly matching design specs
- **Priority:** Medium

## GUI-011: Verify expanded FAB responsive on desktop (>= 1024px)
- **Objective:** Confirm expanded FAB displays correctly on desktop viewport
- **Precondition:** FAB is in expanded state, viewport >= 1024px
- **Steps:**
  1. Resize browser to desktop width (1024px, 1440px)
  2. Observe the expanded FAB layout
- **Expected:** All buttons displayed correctly matching design specs
- **Priority:** Medium

## GUI-012: Verify expanded FAB display after zoom in/out
- **Objective:** Confirm expanded FAB layout is not broken when zooming
- **Precondition:** FAB is in expanded state
- **Steps:**
  1. Zoom in to 150%
  2. Observe expanded FAB appearance
  3. Zoom out to 75%
  4. Observe expanded FAB appearance
- **Expected:** Expanded FAB remains properly displayed without layout breakage at various zoom levels
- **Priority:** Low
