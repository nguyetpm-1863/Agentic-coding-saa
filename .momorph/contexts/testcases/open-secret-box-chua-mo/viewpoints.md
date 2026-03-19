# Viewpoints: Open Secret Box - Chua Mo (Modal)

**Source Screen:** Dialog_popup, Image

---

## 1. Check open a dialog/popup

### Viewpoint: Open dialog box
- Click into button/link which opens dialog box
- Double click into button/link which opens dialog box
- Click TAB to move to button/link which opens dialog box

**Expected:**
- Dialog/Popup is displayed without error
- Contents under Popup/Dialog are clickable/unclickable (based on spec)
- Background under Popup/Dialog shows overlay (based on spec)

---

## 2. Check layout/content/action of dialog/popup

### Viewpoint: Check layout
- Position of dialog/popup
- Title: position, text content, style
- Description: position, text content, style
- Close/OK/Cancel button: position, text content, style
- Icon
- Background color

**Expected:** All items display correctly as designed.

### Viewpoint: Check action with ACTIVE button
- Click button Close / X
- Double click button Close / X
- Click Tab to move to X button and click Enter
- Click ESC to close popup

**Expected:** Dialog/Popup is closed and nothing changes.

### Viewpoint: Check action with INACTIVE button (disabled box when count=0)
- Click button
- Double click button
- Click Tab to move to button and click Enter

**Expected:** Nothing happens, cannot click on inactive elements.

### Viewpoint: Click on any area on Dialog/Popup (not buttons, links)
**Expected:** Dialog/Popup keeps unchanged.

### Viewpoint: Select text in Dialog/Popup, Ctrl+C Ctrl+V
**Expected:** Dialog/Popup keeps unchanged, can copy paste text properly.

---

## 3. Check display of dialog/popup when do another action

### Viewpoint: Click outside Dialog/popup
**Expected:** Dialog/Popup is closed/not closed (based on spec).

### Viewpoint: Check clicking on any items on the screen when popup is opening
**Expected:** No interaction with background elements.

### Viewpoint: Scroll up/down on screen while displaying dialog/popup
**Expected:** Dialog/Popup keeps displaying properly.

### Viewpoint: Re-load screen while displaying dialog/popup
**Expected:** Dialog/Popup is closed and nothing changes.

### Viewpoint: Zoom in/zoom out screen
**Expected:** Zoom in/out without error or broken layout.

### Viewpoint: Rotate left/right screen
**Expected:** Rotate popup/dialog without error or broken layout.

---

## 4. Image display viewpoints

### Viewpoint: Check display of image in modal
- Box image displays correctly within the modal bounds
- Image is not broken or distorted
- Image renders correctly across different screen sizes

**Expected:** Image displays correctly as designed.
