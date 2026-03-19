# Viewpoints - Floating Action Button - phim noi chuc nang (313:9137)

## Reference Screens Used
- **Dialog_popup** - For open/close toggle behavior, layout checks, interaction with background
- **Fixed_Navigation** - For fixed position behavior, availability, hover states

## Collected Viewpoints

### From Dialog_popup: Check open a dialog/popup
- Click into button/link which opens dialog box
- Double click into button/link which opens dialog box
- Click TAB to move to button/link which opens dialog box
- **Expected:** Dialog/Popup is displayed without error

### From Dialog_popup: Check layout/content/action
- Check layout: Position, Title, Description, Close/OK/Cancel button, Icon, Background color
- Check action with ACTIVE button: Click, Double click, Tab+Enter, ESC
- Check action with INACTIVE button
- Check action with link/other buttons
- Check order focus when press Tab key
- Click on any area (not buttons/links) - keeps unchanged
- Select text, Ctrl+C Ctrl+V
- Drag to move dialog/popup

### From Dialog_popup: Check display when do another action
- Click outside Dialog/popup -> closed/not closed based on spec
- Check clicking on any items on screen when popup is opening
- Scroll up/down/left/right while displaying
- Re-load screen while displaying
- Zoom in/zoom out screen
- Rotate left/right screen

### From Fixed_Navigation: Available
- Verify Fixed Navigation is available in some screens
- **Expected:** Displays correctly as designed (Position, Label)

### From Fixed_Navigation: Position
- Verify position when scroll down/up using arrows, keyboard, Page up/Page Down, Zoom
- **Expected:** Fixed Navigation still displayed, does not move

### From Fixed_Navigation: Hover on
- Verify style of menu items when hovered on
- **Expected:** Displays correctly as designed (background-color, text-color)
