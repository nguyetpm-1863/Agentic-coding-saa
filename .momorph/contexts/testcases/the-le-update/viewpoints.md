# Test Viewpoints - The le UPDATE

## Matching Screens from Viewpoint Database

### 1. Dialog_popup (Primary Match)
- **Relevance:** High - This screen is a modal/popup displaying rules content
- **Item Types:**
  - Check open a dialog/popup
  - Check layout/content/action of dialog/popup
  - Check display of dialog/popup when do another action in screen

#### Viewpoints: Check open a dialog/popup
- Check open dialog box: Click/Double click/Tab to button/link which opens dialog box
- Expected: Dialog/Popup displayed without error, background behavior per spec

#### Viewpoints: Check layout/content/action of dialog/popup
- Check layout: Position, title, description, close/OK/cancel button styles, icon, background color
- Check action with ACTIVE button: Click/Double click Close/OK/Cancel/[X], Tab+Enter, ESC
- Check action with INACTIVE button: Click/Double click/Tab+Enter on inactive buttons
- Check action with link/other buttons in Dialog/Popup
- Check Tab focus order on Dialog/Popup
- Click on any non-interactive area
- Select text, Ctrl+C/Ctrl+V
- Select text, right-click Copy
- Ctrl+A selection
- Drag to move dialog/popup
- Click corners to resize

#### Viewpoints: Check display during other actions
- Click outside Dialog/popup
- Click items on screen when popup is open
- Timeout behavior (dismiss-on-timeout)
- Scroll while displaying dialog/popup
- Reload screen while displaying dialog/popup
- Zoom in/out
- Rotate left/right

### 2. Text_only (Secondary Match)
- **Relevance:** Medium - Content display with fixed text labels
- **Item Types:**
  - Fixed text

#### Viewpoints: Fixed text
- Check fixed text/label displays corresponding with design/spec (Position, Format, Value)
- Check fixed text/label unable to edit on screen

### 3. Scrollbar (Secondary Match)
- **Relevance:** Medium - Content may require scrolling
- **Item Types:**
  - Web page (display conditions)
  - Event (scroll interactions)

#### Viewpoints: Scrollbar display
- Short content: No scrollbar displayed
- Long content: Scrollbar displayed

#### Viewpoints: Scrollbar events
- Mouse: Click arrows, drag scrollbar, mouse wheel
- Keyboard: Arrow keys, PgUp/PgDn
- Page: Resize behavior, no duplicate content

### 4. Update (Low Match)
- **Relevance:** Low - Screen name contains "UPDATE" but this is a display-only modal
- Not directly applicable as there are no editable fields
