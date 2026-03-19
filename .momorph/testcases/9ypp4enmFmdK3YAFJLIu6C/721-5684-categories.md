# Test Categories - Dropdown Phong Ban (Department Dropdown)

This is a DROPDOWN component. No direct URL access tests are applicable.

## 1. ACCESSING

Tests for how the dropdown is opened and closed.

| Sub_Category | Description |
|---|---|
| Open Dropdown | Verify dropdown opens correctly when user clicks the department trigger |
| Close Dropdown | Verify dropdown closes when item is selected, or user clicks outside |

## 2. GUI

Tests for visual display and layout of the dropdown.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Layout | Container | Dropdown container: dark background, rounded corners, 101x348px |
| Layout | List Items | Department items: text centered, white text, proper spacing |
| Display State | Default State | Dropdown shows correct default selected department |
| Display State | Selected State | Selected item highlighted with lighter background |
| Display State | Hover State | Hover effect on items (subtle highlight, pointer cursor) |
| Scroll | Scrollbar | Vertical scrollbar when items exceed visible area (50 departments) |
| Responsive | Screen Size | Display on different viewport sizes |

## 3. FUNCTION

Tests for functional behavior of the dropdown.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Selection | Select First Item | Select first department in the list |
| Selection | Select Middle Item | Select a middle department in the list |
| Selection | Select Last Item | Select last department in the list |
| Selection | Change Selection | Switch from one department to another |
| Filter | Apply Filter | Selected department filters kudos on the page |
| Filter | Filter Result | Page content updates to show only kudos for selected department |
| Department List | Value List | All 50 departments displayed correctly |
| Department List | Order | Departments displayed in correct order |
| Keyboard | Up/Down Keys | Navigate through items with arrow keys |
| Keyboard | Enter Key | Select highlighted item with Enter |
| Keyboard | Type Prevention | Cannot type text in dropdown |
| Scroll | Scroll Up/Down | Scroll through the full list of 50 departments |
| Data Integrity | List Update | Department list reflects database changes after reload |
| Security | Inspect Manipulation | Client-side value changes do not affect server-side behavior |
