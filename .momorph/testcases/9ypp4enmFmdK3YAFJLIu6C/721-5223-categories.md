# Test Categories - Dropdown Profile (Regular User)

This is a DROPDOWN component triggered from the Header. No direct URL access tests are applicable.

## 1. ACCESSING

Tests for how the dropdown is opened and closed.

| Sub_Category | Description |
|---|---|
| Open Dropdown | Verify dropdown opens correctly via avatar click |
| Open Dropdown (Keyboard) | Verify dropdown opens via keyboard (Tab + Enter/Space) |
| Close Dropdown | Verify dropdown closes via item click, Escape, click outside |
| Authentication Gate | Verify dropdown only available for authenticated users |

## 2. GUI

Tests for visual display and layout of the dropdown.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Layout | Container | Dropdown position, background, border, border-radius, padding |
| Layout | Profile Item | Label, icon, size, position, spacing |
| Layout | Logout Item | Label, icon, size, position, spacing |
| Display State | Default State | Initial display when dropdown opens (Profile active if on profile page) |
| Display State | Hover State | Item background change on hover |
| Display State | Active State | Gold-tinted background + gold glow text on current page item |
| Display State | Focus State | Focus outline on keyboard navigation |
| Typography | Item Text | Font family, size, weight, color, letter-spacing |
| Icons | Item Icons | User icon and chevron-right icon size, color, position |
| Animation | Open/Close | Dropdown open/close transition (opacity + translateY) |
| Responsive | Mobile | Dropdown avoids viewport overflow on small screens |
| Responsive | Zoom | Display on zoom in/out |

## 3. FUNCTION

Tests for functional behavior of the dropdown.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Profile Navigation | Click Profile | Navigate to /profile on click |
| Profile Navigation | Active Indicator | Profile item shows active state on profile page |
| Logout | Click Logout | signOut() called, redirect to /login |
| Logout | Error Handling | Behavior when signOut() fails |
| Logout | Session Cleared | Verify session fully cleared after logout |
| Dropdown Behavior | Toggle | Avatar click toggles open/close |
| Dropdown Behavior | Close on Selection | Dropdown closes after item selection |
| Dropdown Behavior | Close on Outside Click | Dropdown closes on click outside |
| Dropdown Behavior | Close on Escape | Dropdown closes on Escape key |
| Keyboard | Arrow Navigation | ArrowUp/ArrowDown navigates items |
| Keyboard | Enter Activation | Enter activates focused item |
| Keyboard | Escape Close | Escape closes dropdown |
| Accessibility | ARIA Attributes | role="menu", role="menuitem", aria-expanded |
| Edge Cases | Expired Session Logout | Redirect to /login if session expired |
| Edge Cases | Multiple Rapid Clicks | No duplicate actions on rapid clicks |
