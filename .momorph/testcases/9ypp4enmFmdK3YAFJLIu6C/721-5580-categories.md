# Test Categories - Dropdown Hashtag Filter

## ACCESSING
This is a dropdown component, NOT a standalone page. No URL access tests needed.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Dropdown Trigger | Open dropdown | Verify dropdown opens when trigger is clicked |
| Dropdown Trigger | Close dropdown | Verify dropdown closes (click outside, select item, press Esc) |
| Dropdown Trigger | Visibility | Verify dropdown appears/disappears correctly |

## GUI
Visual and layout verification of the dropdown component.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Layout | Dropdown container | Container position, size, background, border, corners |
| Layout | Item dimensions | Each tag item size (~131x56px), spacing, alignment |
| Layout | Scrollbar | Scrollbar appearance when list exceeds visible area |
| Display States | Default state | White/bright text on dark background |
| Display States | Selected state | Glow/highlight effect, bright text, dark bg |
| Display States | Hover state | Light background highlight on hover |
| Text | Hashtag labels | '#' prefix, font style, color, size, truncation |
| Text | All 13 hashtags | All hashtag names display correctly |
| Responsive | Mobile | Dropdown display on mobile (320px) |
| Responsive | Tablet | Dropdown display on tablet (768px) |
| Responsive | Desktop | Dropdown display on desktop (1024px+) |

## FUNCTION
Behavioral and interaction testing of the dropdown.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Selection | Select item | Click to select a hashtag |
| Selection | Deselect item | Click selected item to deselect (toggle) |
| Selection | Single select | Only one hashtag active at a time |
| Selection | First item | Select first item in list |
| Selection | Middle item | Select middle item in list |
| Selection | Last item | Select last item in list |
| Filter | Apply filter | Selected hashtag filters page content |
| Filter | Remove filter | Deselecting removes filter |
| Filter | Change filter | Selecting different hashtag changes filter |
| Dropdown behavior | Close on select | Dropdown closes after item selection |
| Dropdown behavior | Close on outside click | Dropdown closes when clicking outside |
| Keyboard | Arrow keys | Up/Down keys navigate items |
| Keyboard | Enter key | Enter selects highlighted item |
| Keyboard | Escape key | Esc closes dropdown |
| Scroll | Vertical scroll | List scrolls when items exceed container height |
| Scroll | Scroll position | Scroll position behavior on reopen |
