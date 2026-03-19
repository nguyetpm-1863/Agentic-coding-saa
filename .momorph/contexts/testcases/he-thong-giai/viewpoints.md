# Test Viewpoints: He Thong Giai (Award System)

## Matching Screens from Test Viewpoint Library

### 1. Text_only - Fixed Text
**Relevance:** All labels, titles, descriptions, and award information are static/fixed text.

**Viewpoints:**
- Check fixed text/label displays corresponding with design/spec (position, format, value)
- Check fixed text/label is not editable on screen

### 2. Sidebar - UI Verification
**Relevance:** Left navigation menu (award categories) acts as a sidebar.

**Viewpoints:**
- Check UI of sidebar on multiple browsers: position, dimension, background color, font, title
- Expected: Display exactly as design (Left Sidebar), correct width/height

### 3. Sidebar - Functional Elements
**Relevance:** Navigation menu items function as sidebar menu links.

**Viewpoints:**
- Check function names, sort order, color, icons
- Menu without submenu: hover highlights text, active mouse cursor, show link; click opens exact page and highlights selected link
- Menu with submenu: hover highlights, click opens/closes submenus

### 4. Sidebar - Interaction Testing
**Relevance:** Testing click and keyboard navigation on menu items.

**Viewpoints:**
- If menu item has text and icon, clicking either opens the same target
- Double-click on link: operates correctly (no duplicate)
- Click many links continuously: operates correctly, opens exact selected link
- Tab + Enter keyboard navigation: can use Tab to move through items, Enter to select

### 5. Sidebar - Responsive Behavior
**Relevance:** Navigation menu responsive behavior.

**Viewpoints:**
- Check maximize/minimize screen: sidebar auto-responds to screen dimensions
- Check drag border of browser: sidebar auto-responds
- Check zoom in/out: sidebar auto-responds

### 6. Links - GUI
**Relevance:** "Chi tiet" button/link visual appearance.

**Viewpoints:**
- Confirm GUI of link: display as text link matching spec (color, bold, italic, font size, hover state, mouse cursor)

### 7. Links - Normal Operation
**Relevance:** "Chi tiet" button navigates to Sun* Kudos page.

**Viewpoints:**
- Confirm link redirects to corresponding URL after click
- Confirm redirection time < 1000ms for internal links
- Confirm new tab/window behavior across browsers (Chrome, Firefox, Safari)
- Confirm no broken links

### 8. Image - Display
**Relevance:** Keyvisual banner and award card images.

**Viewpoints:**
- Check image display at various sizes/zoom levels
- Image is not broken
- Image displays correctly in published web as per settings

### 9. Scrollbar - Web Page
**Relevance:** Page scrolling behavior when content exceeds viewport.

**Viewpoints:**
- Short content / zoom in: no scrollbar displayed
- Long content / zoom out: scrollbar displayed (vertical)
