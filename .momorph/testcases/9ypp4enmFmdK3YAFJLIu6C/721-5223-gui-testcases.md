# GUI Test Cases - Dropdown Profile (Regular User)

## GUI-001: Dropdown container layout
- **Objective:** Verify the dropdown container displays correctly per design specs
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar to open dropdown. 2. Observe the container.
- **Expected:** Dropdown container displays with: dark background (#00070C), gold border (1px solid #998C5F), border-radius 8px, padding 6px, flex column layout. Positioned absolutely below the avatar.
- **Specs:** A
- **Priority:** High

## GUI-002: Profile item display - default state
- **Objective:** Verify the "Profile" menu item displays correctly
- **Precondition:** User is authenticated. Dropdown is open. User is NOT on the profile page.
- **Steps:** 1. Click the avatar. 2. Observe the "Profile" item.
- **Expected:** Profile item shows: label "Profile" in white (#FFFFFF), Montserrat 16px Bold, letter-spacing 0.15px. User icon (24x24px, white) displayed. Item height 56px, padding 0 16px, border-radius 4px. Background transparent (default state).
- **Specs:** A.1
- **Priority:** High

## GUI-003: Profile item display - active state (on profile page)
- **Objective:** Verify the "Profile" item shows active state when on the profile page
- **Precondition:** User is authenticated and on the profile page. Dropdown is open.
- **Steps:** 1. Navigate to /profile. 2. Click the avatar. 3. Observe the "Profile" item.
- **Expected:** Profile item shows active state: gold-tinted background (rgba(255,234,158,0.10)), gold glow text shadow (0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287).
- **Specs:** A.1
- **Priority:** High

## GUI-004: Logout item display
- **Objective:** Verify the "Logout" menu item displays correctly
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar. 2. Observe the "Logout" item.
- **Expected:** Logout item shows: label "Logout" in white (#FFFFFF), Montserrat 16px Bold, letter-spacing 0.15px. Chevron-right icon (24x24px, white) displayed. Item height 56px, padding 0 16px, border-radius 4px. Background transparent. No text shadow/glow.
- **Specs:** A.2
- **Priority:** High

## GUI-005: Menu item order
- **Objective:** Verify menu items appear in correct order
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar. 2. Observe the order of items.
- **Expected:** "Profile" item appears first (top), "Logout" item appears second (bottom).
- **Specs:** A, A.1, A.2
- **Priority:** High

## GUI-006: Profile item hover state
- **Objective:** Verify the "Profile" item hover visual effect
- **Precondition:** User is authenticated. Dropdown is open. User is NOT on the profile page.
- **Steps:** 1. Click the avatar. 2. Hover over the "Profile" item.
- **Expected:** Background changes to gold-tinted (rgba(255,234,158,0.10)) with 150ms ease-in-out transition. Cursor changes to pointer.
- **Specs:** A.1
- **Priority:** Medium

## GUI-007: Logout item hover state
- **Objective:** Verify the "Logout" item hover visual effect
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Click the avatar. 2. Hover over the "Logout" item.
- **Expected:** Background changes to gold-tinted (rgba(255,234,158,0.10)) with 150ms ease-in-out transition. Cursor changes to pointer.
- **Specs:** A.2
- **Priority:** Medium

## GUI-008: Focus state on keyboard navigation
- **Objective:** Verify focus indicator displays on keyboard navigation
- **Precondition:** User is authenticated. Dropdown is open via keyboard.
- **Steps:** 1. Open dropdown via keyboard. 2. Press ArrowDown to move focus between items.
- **Expected:** Focused item shows outline: 2px solid #FFEA9E with 2px offset. Focus moves from Profile to Logout.
- **Specs:** A.1, A.2
- **Priority:** Medium

## GUI-009: Dropdown open animation
- **Objective:** Verify the dropdown open animation
- **Precondition:** User is authenticated.
- **Steps:** 1. Click the avatar to open dropdown. 2. Observe the animation.
- **Expected:** Dropdown appears with opacity fade-in and translateY from -4px to 0, duration 150ms, ease-out easing.
- **Specs:** A
- **Priority:** Low

## GUI-010: Dropdown close animation
- **Objective:** Verify the dropdown close animation
- **Precondition:** Dropdown is open.
- **Steps:** 1. Click outside the dropdown. 2. Observe the animation.
- **Expected:** Dropdown disappears with opacity fade-out and translateY from 0 to -4px, duration 100ms, ease-in easing.
- **Specs:** A
- **Priority:** Low

## GUI-011: Dropdown on mobile viewport
- **Objective:** Verify dropdown avoids viewport overflow on mobile
- **Precondition:** User is authenticated on a mobile device (320px width).
- **Steps:** 1. Click the avatar. 2. Observe dropdown position.
- **Expected:** Dropdown is fully visible within the viewport. Right-aligned to prevent overflow. All items are readable and tappable (min 44x44px touch target).
- **Specs:** A
- **Priority:** High

## GUI-012: Dropdown on zoom in/out
- **Objective:** Verify dropdown displays correctly when page is zoomed
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Open dropdown. 2. Zoom in to 150%. 3. Observe. 4. Zoom out to 75%. 5. Observe.
- **Expected:** Dropdown displays without layout break or overflow at both zoom levels.
- **Specs:** A
- **Priority:** Low

## GUI-013: Icon specifications
- **Objective:** Verify icons display correctly per design specs
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Open dropdown. 2. Observe the user icon on Profile item. 3. Observe the chevron-right icon on Logout item.
- **Expected:** User icon: 24x24px, #FFFFFF color, positioned with 8px gap from text. Chevron-right icon: 24x24px, #FFFFFF color, positioned with 8px gap from text.
- **Specs:** A.1, A.2
- **Priority:** Medium

## GUI-014: Typography consistency
- **Objective:** Verify text styling is consistent across both menu items
- **Precondition:** User is authenticated. Dropdown is open.
- **Steps:** 1. Open dropdown. 2. Inspect text styling of both items.
- **Expected:** Both items use: Montserrat font, 16px size, 700 weight, 24px line-height, 0.15px letter-spacing, #FFFFFF color.
- **Specs:** A.1, A.2
- **Priority:** Medium
