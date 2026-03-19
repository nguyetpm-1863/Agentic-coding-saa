# Viet Kudo - Test Viewpoints Reference

## Matched Screens and Viewpoints

### 1. Dialog_popup (Modal behavior)

#### Check open a dialog/popup
- **Viewpoint:** Click/double-click button/link that opens dialog; Tab to button and press Enter
- **Expected:** Dialog displays without error; background overlay behavior per spec

#### Check layout/content/action of dialog/popup
- **Viewpoint:** Position, title, description, close/OK/cancel buttons, icon, background color
- **Expected:** All items display correctly as designed
- **Viewpoint:** Click/double-click Close/OK/Cancel/X button; Tab + Enter; ESC to close
- **Expected:** Dialog closes on Cancel/Close; validates on OK; error if invalid data
- **Viewpoint:** Inactive button behavior (click, double-click, Tab+Enter)
- **Expected:** Nothing happens, cannot click inactive buttons
- **Viewpoint:** Tab order focus within dialog
- **Expected:** Focus stays within dialog, left-to-right top-to-bottom order
- **Viewpoint:** Click non-interactive area in dialog
- **Expected:** Dialog remains unchanged

#### Check display when doing another action
- **Viewpoint:** Click outside dialog
- **Expected:** Dialog closes or stays open per spec
- **Viewpoint:** Scroll while dialog is open
- **Expected:** Dialog keeps displaying properly
- **Viewpoint:** Reload screen while dialog is displayed
- **Expected:** Dialog closes, no changes saved
- **Viewpoint:** Zoom in/out while dialog is open
- **Expected:** No error or broken layout
- **Viewpoint:** Rotate screen while dialog is open
- **Expected:** No error or broken layout

### 2. RichTextBox_Markdown (Message textarea)

#### Default display
- **Viewpoint:** Check default display in add new form
- **Expected:** Position, label, default blank value, placeholder displayed correctly

#### Format in Richtextbox
- **Viewpoint:** Bold, Italic, Strikethrough formatting
- **Expected:** Text displays corresponding format correctly
- **Viewpoint:** Quote a paragraph
- **Expected:** Paragraph displays in quote format
- **Viewpoint:** Add/Remove Bullet/Numbering
- **Expected:** Bullet/numbering inserted or removed correctly

#### Insert/Edit items
- **Viewpoint:** Insert/Edit/Remove Link
- **Expected:** Link inserted/edited/removed successfully
- **Viewpoint:** Add/Remove Bullet and Numbering
- **Expected:** Correctly inserted or removed

#### Null/Space
- **Viewpoint:** Not inputting any value / only spaces
- **Expected:** Validation error (field is required)

### 3. Tags (Hashtag field)

#### Check tag name field
- **Viewpoint:** Default display (position, label, default value)
- **Expected:** Display correctly as designed
- **Viewpoint:** Set tag with valid data
- **Expected:** Tag added successfully, displays as chip

#### Check display of tag in tag section/component
- **Viewpoint:** No tags selected
- **Expected:** Empty state with "+ Hashtag" button visible
- **Viewpoint:** Tags with active status
- **Expected:** Display correctly as designed (name, position, format)
- **Viewpoint:** Tag name max length
- **Expected:** Truncated if too long
- **Viewpoint:** Order of tags
- **Expected:** Displayed in correct order

### 4. Upload_Image (Image attachment)

#### Upload image
- **Viewpoint:** Default display in add new form
- **Expected:** Position, label, default blank, placeholder correctly displayed

#### Capacity image
- **Viewpoint:** Upload image with valid capacity (min to max)
- **Expected:** Upload successful
- **Viewpoint:** Upload image exceeding max capacity
- **Expected:** Error message displayed

#### Type image
- **Viewpoint:** Upload supported types (.jpg, .jpeg, .png, .gif, .svg, etc.)
- **Expected:** Upload successful
- **Viewpoint:** Upload unsupported types (.mp3, .mp4, .csv, .txt, etc.)
- **Expected:** Error message displayed
- **Viewpoint:** Change file extension from abnormal to normal
- **Expected:** Error message (validate actual file type, not just extension)

### 5. Checkbox (Anonymous toggle)

#### Default display
- **Viewpoint:** Default display in add new form
- **Expected:** Position, label, default unchecked state displayed correctly

#### Select value
- **Viewpoint:** Toggle on/off the anonymous checkbox
- **Expected:** Toggle state changes; when ON shows anonymous name field; when OFF hides it
