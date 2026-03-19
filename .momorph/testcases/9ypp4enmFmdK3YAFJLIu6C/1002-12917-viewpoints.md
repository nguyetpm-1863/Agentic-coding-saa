# Reference Viewpoints - Addlink Box

## Source: Dialog_popup

### Check open a dialog/popup
- Click into button/link which opens dialog box
- Double click into button/link which opens dialog box
- Click TAB to move to button/link which opens dialog box
- **Expected:** Dialog/Popup displayed without error; background dimmed

### Check layout/content/action of dialog/popup
- Position, title, description, buttons, icon, background color
- Click/double-click Close/OK/Cancel/X buttons
- Click ESC to close
- Tab order within dialog
- Click outside dialog area
- Copy/paste text in dialog
- Ctrl+A text selection
- Drag to move dialog (if applicable)

### Check display during other actions
- Click outside dialog
- Scroll while dialog open
- Reload page while dialog open
- Zoom in/out
- Rotate screen (mobile)

## Source: InputBox > String

### Default display
- Position, label, default value (blank), placeholder

### Valid character input
- Alphabet and numeric
- Half-width / Full-width Japanese
- Special characters: ~!@#$%^&*()_+{}:"|<>?,./;'\[]-=`
- Unicode characters
- Spaces in value
- SQL injection attempts
- HTML/script injection
- Redundant spaces (before/after/between)

### Boundary values
- Min / Min+1
- Max / Max-1
- Empty / whitespace only
- Over max (Max+1)
- Under min (Min-1)

### Copy/paste
- Full-width characters copy paste

## Source: Links

### Links - GUI
- Display like text links per spec (color, bold, italic, font size, hover state, cursor icon)
