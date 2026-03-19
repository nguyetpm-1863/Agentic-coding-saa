# Reference Viewpoints - Dropdown-profile Admin

## Source: Global_navigation > Check display/undisplay of menu

### Menu Visibility
- Available menu: Verify menu is available for correct roles
- NOT Available menu:
  - Based on Role and Permission
  - Based on Login/Not Login session
  - Based on spec (menu not available on some screens)
- **Expected:** Main menu is NOT available for specific Role and Permission; NOT available if user has already login/Not login; NOT available on some screens

## Source: Global_navigation > Check operation on menu

### Menu Display
- Check name, icon in menu items (main menu, single-level, multi-level)
- **Expected:** Display correctly as designed: Position, Label of item

### Menu Order
- Check order of menu items
- **Expected:** Menu list displays with correct order

### Menu Item Border
- Check border when item name = Min characters / Max characters
- **Expected:** Border of each menu item fits with its text

### Hover Style
- Check menu style when hovering mouse over menu item
- **Expected:** Display correctly as designed: Position, Format

### Tooltip
- Check tooltip on hover (if applicable): Required item, NULL, Max/Min length
- **Expected:** Display correctly: Position, Content, Format

### Open Item
- Check open an item in menu (single-level)
- **Expected:** Appropriate page displays; opening menu item is highlighted correctly

## Source: Sidebar > UI Verification

### UI Check
- Position, dimension, color of background, font, title
- **Expected:** Display exactly UI as the design

## Source: Sidebar > Functional Elements

### Menu Without Submenu
- Hover mouse: highlight text, active mouse, show link at end of page
- Click on link or image: open exact page and highlight exact selected link

## Source: Sidebar > Interaction Testing

### Mixed Content (Text + Icon)
- Clicking on image and clicking on text link will open the same page

### Multiple Clicks
- Double click on link: Menu operates exactly (no duplicate page)
- Click many links continuously: Menu operates exactly, opens correct selected link

### Keyboard Navigation
- Tab key to move between items
- Enter to select item and open correct page
