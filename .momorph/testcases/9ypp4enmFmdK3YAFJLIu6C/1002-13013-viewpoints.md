# Viewpoints - Dropdown List Hashtag

## Source: Select_box > Check default value
- [Add new form] Check default display of item -> Display correctly (position, label, default value: blank)
- [Edit form] Check default display of item -> Display correctly (position, label, default value: DB's value)
- Check value list of item -> Display correct values with right order in list

## Source: Select_box > Event in Select box
- Check scroll on list value when has N-1 values -> No vertical scroll bar
- Check scroll on list value when has N values -> No vertical scroll bar
- Check scroll on list value when has N+1 values -> Display vertical scroll bar, operates normally
- Check operation when press Up/Down key on keyboard -> Highlight Next/Previous value
- Check operation when press Enter key on keyboard -> Close list and set selected value
- Check operation while typing on Select box -> Unable to input text

## Source: Select_box > Select value from list
- Check operation when Select the first value in list -> Process successfully
- Check operation when Select the middle value in list -> Process successfully
- Check operation when Select the last value in list -> Process successfully
- Check operation when Select multi values in list -> All selected values displayed correctly with [X] button
- Check operation when delete 1 selected value -> Can delete, function works with remaining values
- Check operation when delete any values -> Can delete, function works with remaining values
- Check operation when delete all selected values -> Function same as not selecting any value
- Check operation when Re-select a value after delete -> Can re-select deleted values
- Check operation when Select another value after delete -> Can select more values

## Source: Checkbox > Default display
- [Add new form] Check default display -> Position, label, default selected value, list of values correct
- [Edit form] Check default display -> Default selected value from DB

## Source: Checkbox > Select value
- Select a value (first/any/last) -> Selected value is Check ON, others unselected
- Select multi values -> Selected values are Check ON, others unselected

## Source: Checkbox > Check all option
- Not select any item then click Check all -> All items checked
- Select some items then click Check all -> All items checked
- Select all items related -> Check all becomes checked
- Select all then click Check all -> All unchecked
- Select all then deselect some -> Check all becomes unchecked, deselected items unchecked

## Applied Viewpoints for Dropdown Hashtag Component

### Display/GUI
- Verify dropdown displays all 13 hashtags in correct order with '#' prefix
- Verify header shows "Hashtag" label and "Toi da 5" subtitle
- Verify selected items show golden checkmark icon (24x24px)
- Verify unselected items have no checkmark icon
- Verify dark background theme
- Verify hover effect on items

### Selection Function
- Verify clicking toggles select/deselect
- Verify maximum 5 selections enforced
- Verify checkmark appears/disappears on toggle
- Verify selecting 6th item is blocked when 5 already selected
- Verify deselecting one item when at max allows selecting another

### Keyboard & Scroll
- Verify scroll behavior when list exceeds visible area
- Verify keyboard navigation (Up/Down arrows)
