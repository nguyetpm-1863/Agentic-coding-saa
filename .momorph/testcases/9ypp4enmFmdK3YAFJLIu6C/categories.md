# Test Categories - Dropdown-profile Admin

This is a DROPDOWN component. No direct URL access tests are applicable.

## 1. ACCESSING

Tests for how the dropdown is opened and closed, and role-based visibility.

| Sub_Category | Description |
|---|---|
| Open Dropdown | Verify dropdown opens correctly via profile trigger |
| Close Dropdown | Verify dropdown closes via item click, click outside, ESC key |
| Role-based Visibility | Verify dropdown is only visible for admin users |

## 2. GUI

Tests for visual display and layout of the dropdown.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Layout | Dropdown Container | Dark background, rounded corners, position relative to trigger |
| Layout | Menu Items | Text labels, icons, order, spacing, alignment |
| Display State | Active State | Profile item highlighted/active appearance |
| Display State | Default State | Dashboard and Logout default appearance |
| Display State | Hover State | Background highlight on mouse hover for all items |
| Icons | Profile Icon | User icon displayed correctly |
| Icons | Dashboard Icon | Grid icon displayed correctly |
| Icons | Logout Icon | Chevron/arrow icon displayed correctly |
| Responsive | Screen Size | Display on different viewport sizes |

## 3. FUNCTION

Tests for functional behavior of the dropdown menu items.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Profile Navigation | Click | Navigate to profile page on click |
| Dashboard Navigation | Click | Navigate to dashboard page on click |
| Logout Action | Click | Perform logout, close session, redirect to login |
| Dropdown Behavior | Auto-close | Dropdown closes after item selection |
| Dropdown Behavior | Click Outside | Dropdown closes when clicking outside |
| Interaction | Double Click | No duplicate actions on double click |
| Interaction | Rapid Clicks | Handles rapid consecutive clicks correctly |
| Keyboard | Tab Navigation | Tab between menu items |
| Keyboard | Enter Key | Select item with Enter key |
| Keyboard | ESC Key | Close dropdown with ESC key |
| Security | Session | Logout properly invalidates session |
