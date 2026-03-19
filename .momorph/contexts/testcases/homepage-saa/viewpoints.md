# Homepage SAA - Test Viewpoints Reference

## Source Screens

The following reference screens from the test viewpoints library were matched to the Homepage SAA screen components:

1. **Global_navigation** - Menu visibility and operation (Header/Footer navigation)
2. **Fixed_Navigation** - Sticky header behavior, hover states
3. **Links** - Link GUI and navigation behavior (all clickable links)
4. **Text_only** - Fixed text/label display (static content sections)
5. **Image** - Image link functionality (award card thumbnails)
6. **Notification** - Bell notification behavior
7. **Scrollbar** - Page scrollbar behavior

---

## Viewpoints by Screen

### Global_navigation

#### Check display/undisplay of menu
- **Viewpoint:** Available menu
- **Viewpoint:** Check NOT Available menu based on Role/Permission, Login/Not Login session, spec
  - **Expected:** Main menu is NOT available for specific Role and Permission; NOT available if user has already login/Not login; NOT available on some screens

#### Check operation on menu
- **Viewpoint:** Check name, icon in menu (Main menu / Single-level / Multi-level)
  - **Expected:** Display correctly as designed: Position, Label of item
- **Viewpoint:** Check order of menu
  - **Expected:** Menu list displays with correct order
- **Viewpoint:** Check border of menu items (Min/Max characters)
  - **Expected:** Border of each menu item fits with its text
- **Viewpoint:** Check menu style when hovering
  - **Expected:** Display correctly as designed: Position, Format
- **Viewpoint:** Check tooltip displays when hovering
  - **Expected:** Display correctly as designed: Position, Content, Format
- **Viewpoint:** Check open an item in menu
  - **Expected:** Appropriate page displays; opening menu is highlighted correctly
- **Viewpoint:** Additional menu items: Search menu, Translate menu
  - **Expected:** Search menu displays correctly; user can use Search bar

### Fixed_Navigation

#### Available
- **Viewpoint:** Verify Fixed Navigation is available in specified screens
  - **Expected:** Displays correctly as designed: Position, Label of item

#### Position
- **Viewpoint:** Verify position of Fixed Navigation when scroll down/up (arrows, keyboard, Page up/down, Zoom)
  - **Expected:** Fixed Navigation still displayed on screen; does not move to another position

#### Hover on
- **Viewpoint:** Verify style of menu items when hovered on
  - **Expected:** Displays correctly as designed: background-color, text-color

### Links

#### Links - GUI
- **Viewpoint:** Confirm GUI of link
  - **Expected:** Display like text links as required on spec (color, bold, italic, font size, hover, mouse icon)

#### Links - Normal Operation
- **Viewpoint:** Confirm the link after click on the links
  - **Expected:** Redirect to corresponding URL
- **Viewpoint:** Confirm the redirection time (internal links)
  - **Expected:** Redirect immediately with time < 1000ms (10s)
- **Viewpoint:** Confirm the redirection time (external links)
  - **Expected:** Redirect to corresponding URL
- **Viewpoint:** Confirm new tab/window opens on click (Chrome, Firefox, IE, Safari)
  - **Expected:** New tab will be opened (or same as required on spec)
- **Viewpoint:** Confirm broken links (Check My Links)
  - **Expected:** No broken links

### Text_only

#### Fixed text
- **Viewpoint:** Check fixed text/label displays corresponding with design, spec
  - **Expected:** Display correctly as design/spec: Position, Format, Value
- **Viewpoint:** Check fixed text/label unable to edit on screen
  - **Expected:** Can not edit text by action on screen

### Image

#### Check link of image
- **Viewpoint:** Click on image link (permitted, logged out)
  - **Expected:** Can open link successfully
- **Viewpoint:** Click on image link (permitted, logged in)
  - **Expected:** Can open link successfully
- **Viewpoint:** Click on image link (not permitted, logged out)
  - **Expected:** Cannot open link; redirect to login page
- **Viewpoint:** Click on image link (not permitted, logged in)
  - **Expected:** Can open link successfully

### Scrollbar

#### Web page
- **Viewpoint:** Content does not exceed page limit (short content, zoom in)
  - **Expected:** Web page does not display horizontal/vertical scroll bar
- **Viewpoint:** Content exceeds page limit (long content, zoom out)
  - **Expected:** Web page displays horizontal/vertical scroll bar
