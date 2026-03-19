# Reference Viewpoints - Dropdown Phong Ban

## Source: Select_box > Check default value

### Default display
- [Add new form] Check default display of item
  - Expected: Display correctly as designed (position, label, default value: blank)
- [Edit form] Check default display of item
  - Expected: Display correctly as designed (position, label, default value: DB's value)
- Check value list of item
  - Expected: Display correct values with right order in list

## Source: Select_box > Event in Select box

### Scroll behavior
- Check scroll on list value when has N-1 values -> Do not display vertical scroll bar
- Check scroll on list value when has N values -> Do not display vertical scroll bar
- Check scroll on list value when has N+1 values -> Display vertical scroll bar, operates normally (scroll up/down/quickly)

### Keyboard interactions
- Check operation when press Up/Down key on keyboard -> Highlight Next/Previous value
- Check operation when press Enter key on keyboard -> Close list value and set selected value (highlighted value)
- Check operation while typing on Select box -> Unable to input text

## Source: Select_box > Select value from list

### Single selection
- Check operation when Select the first value in list -> Process successfully with selected value
- Check operation when Select the middle value in list -> Process successfully with selected value
- Check operation when Select the last value in list -> Process successfully with selected value

## Source: Select_box > Update value list

### List update behavior
- Check display after add new an item to list and reload page -> List updated correctly, operation normal
- Check display after update display text of an item in list and reload -> List updated correctly, operation normal
- Check display after delete an item of list and reload -> List updated correctly, operation normal
- Check operation when not reload page after update selected value in DB -> Display exact error message
- Check operation when not reload page after delete selected value in DB -> Display exact error message

### Client-side manipulation (Security)
- Check operation when change display text to another text (not exist value) by inspect page -> Operation unaffected
- Check operation when change display text to exist text by inspect page -> Operation unaffected
- Check operation when change value to another value (not exist value) by inspect page -> Operation unaffected
- Check operation when change value to existed value by inspect page -> Operation unaffected
- Check operation when add new item by inspect page -> Operation unaffected
