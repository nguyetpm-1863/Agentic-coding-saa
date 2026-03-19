# Reference Viewpoints - Dropdown Hashtag Filter

## Source: Select_box screen

### Check default value
- [Add new form] Check default display of item -> Display correctly (position, label, default value)
- [Edit form] Check default display of item -> Display correctly with DB value
- Check value list of item -> Display correct values with right order

### Event in Select box
- Check scroll on list value when has N-1 values -> No vertical scroll bar
- Check scroll on list value when has N values -> No vertical scroll bar
- Check scroll on list value when has N+1 values -> Display vertical scroll bar, operates normally
- Check operation when press Up/Down key on keyboard -> Highlight Next/Previous value
- Check operation when press Enter key on keyboard -> Close list and set selected value
- Check operation while typing on Select box -> Unable to input text

### Select value from list
- Select the first value in list -> Process successfully
- Select the middle value in list -> Process successfully
- Select the last value in list -> Process successfully
- Select multi values in list -> All selected values displayed correctly
- Delete 1 selected value -> Can delete, function works with remaining
- Delete all selected values -> Same as not selecting any value
- Re-select a value after delete -> Can re-select deleted values

## Source: Tags screen

### Check display of tag in tag section
- Check if no tags -> No tags displayed with message
- Check if Tags has status='active' -> Display correctly (tag name, position, format)
- Check if Tags has status='pending'/'deleted' -> Not displayed
- Check if Tag name has length=Max length -> Display correctly with truncation
- Check order of Tags list -> Ordered by CREATED DATE DESC, then ID ASC
- Check URL of Tags -> URL correct, displays on hover, opens on click

## Applied Viewpoints for Dropdown Hashtag Filter

### ACCESSING
- This is a dropdown component (not a standalone page) - no URL access tests
- Focus on: dropdown open/close trigger, visibility conditions

### GUI
- Default display of dropdown list
- Position, size, alignment of items
- Selected state visual (glow/highlight)
- Default state visual (white text on dark bg)
- Hover state visual
- Scroll behavior when list exceeds height
- Font, color, spacing consistency
- Responsive behavior across breakpoints

### FUNCTION
- Click to select an item
- Click to deselect (toggle)
- Single selection enforcement
- Filter application on selection
- Dropdown close after selection
- Keyboard navigation (Up/Down/Enter)
- Scroll within dropdown
- All 13 hashtags selectable
- First/middle/last item selection
