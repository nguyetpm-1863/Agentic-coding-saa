# Reference Viewpoints - Dropdown Profile

## Source: Global_navigation - Check display/undisplay of menu

### Available menu
- Menu is available for authenticated users
- Menu is NOT available for unauthenticated users (no avatar displayed)

### Check NOT Available menu
- Main menu is NOT available for specific Role and Permission
- Main menu is NOT available if user has not logged in
- Dropdown is NOT available on login page

## Source: Global_navigation - Check operation on menu

### Check name, icon in menu
- Display correctly as designed: Position, Label of item
- Profile item: user icon + "Profile" text
- Logout item: chevron-right icon + "Logout" text

### Check order of menu
- Menu items display in correct order: Profile first, Logout second

### Check menu style when hovering
- Hover: background changes to gold-tinted (rgba(255,234,158,0.10))
- Active: gold-tinted background + gold glow text shadow
- Default: transparent background, white text

### Check open an item in menu
- Click "Profile": navigates to profile page, dropdown closes
- Click "Logout": performs signOut, redirects to /login, dropdown closes
- Active item (current page) highlighted correctly

## Source: Dialog_popup - Check open a dialog/popup

### Check open dropdown
- Click avatar to open dropdown
- Double click avatar (no duplicate dropdowns)
- Keyboard: Tab to avatar, Enter/Space to open

## Source: Dialog_popup - Check layout/content/action

### Check layout
- Position of dropdown relative to avatar
- Item labels, icons, font style
- Background color, border, border-radius
- Container padding and item spacing

### Check action with menu items
- Click Profile item
- Click Logout item
- Keyboard Tab to navigate between items
- Press Enter on focused item
- Press Escape to close

### Check focus order
- Tab navigates: Profile -> Logout (top to bottom)

## Source: Dialog_popup - Check display during other actions

### Click outside dropdown
- Dropdown closes when clicking outside

### Scroll while dropdown open
- Dropdown closes or follows avatar position

### Reload page while dropdown open
- Dropdown closes, page reloads normally

### Zoom in/out
- Dropdown displays without layout break

### Rotate screen (mobile)
- Dropdown repositions without overflow

## Source: Links - GUI

### Confirm GUI of menu items
- Display per spec: color (#FFFFFF), bold (700), font-size (16px), font-family (Montserrat)
- Cursor changes to pointer on hover
- Icon size: 24x24px, color: #FFFFFF

## Source: Links - Normal Operation

### Confirm navigation after click
- Profile: redirects to /profile
- Logout: redirects to /login after signOut
- No broken links
