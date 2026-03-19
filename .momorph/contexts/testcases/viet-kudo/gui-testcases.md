# Viet Kudo - GUI Test Cases

## GUI - Modal Layout

### GUI_001 - Modal overall layout
- **Category:** GUI > Modal Layout
- **Objective:** Verify modal layout matches Figma design (size, padding, spacing, background color)
- **Precondition:** Modal is open
- **Steps:**
  1. Open the Viet Kudo modal
  2. Compare layout with Figma design (520:11602)
- **Expected:** Modal size, padding, margins, background color, border radius match the design specifications
- **Priority:** High

### GUI_002 - Modal overlay background
- **Category:** GUI > Modal Layout
- **Objective:** Verify overlay background appearance
- **Precondition:** Modal is open
- **Steps:**
  1. Open the Viet Kudo modal
  2. Observe the overlay behind the modal
- **Expected:** Semi-transparent dark overlay covers the entire viewport behind the modal
- **Priority:** Medium

### GUI_003 - Modal scrollability with long content
- **Category:** GUI > Modal Layout
- **Objective:** Verify modal is scrollable when content exceeds viewport height
- **Precondition:** Modal is open on a small screen or with many images/hashtags
- **Steps:**
  1. Open the modal
  2. Add maximum images and hashtags to fill content
  3. Observe scrollability
- **Expected:** Modal content is scrollable; header and footer action buttons remain accessible
- **Priority:** Medium

## GUI - Title

### GUI_004 - Modal title display
- **Category:** GUI > Title
- **Objective:** Verify modal title text, font, size, alignment
- **Precondition:** Modal is open
- **Steps:**
  1. Open the Viet Kudo modal
  2. Observe the title area
- **Expected:** Title "Gui loi cam on va ghi nhan den dong doi" is displayed, large font, centered, matching design
- **Priority:** High

## GUI - Recipient Field

### GUI_005 - Recipient field label and required indicator
- **Category:** GUI > Recipient Field
- **Objective:** Verify "Nguoi nhan" label with "*" required marker is displayed
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the recipient field label
- **Expected:** Label "Nguoi nhan" is displayed with red "*" indicating required field
- **Priority:** High

### GUI_006 - Recipient field input display
- **Category:** GUI > Recipient Field
- **Objective:** Verify input field appearance with placeholder and dropdown icon
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the recipient input field
- **Expected:** Input field shows placeholder "Tim kiem"; dropdown arrow icon is visible on the right side; field dimensions match design (514x56px)
- **Priority:** High

### GUI_007 - Recipient field error state display
- **Category:** GUI > Recipient Field
- **Objective:** Verify error styling when recipient field is empty on submit attempt
- **Precondition:** Modal is open, recipient field is empty
- **Steps:**
  1. Attempt to submit the form without selecting a recipient
  2. Observe the recipient field
- **Expected:** Field border turns red; error message is displayed below the field
- **Priority:** High

## GUI - Rich Text Editor

### GUI_008 - Toolbar buttons display
- **Category:** GUI > Rich Text Editor
- **Objective:** Verify all toolbar formatting buttons are displayed correctly
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the toolbar above the textarea
- **Expected:** All 6 buttons displayed in order: Bold (B), Italic (I), Strikethrough (S), Numbered list, Link, Quote; each with correct icon and positioning
- **Priority:** High

### GUI_009 - Textarea placeholder display
- **Category:** GUI > Rich Text Editor
- **Objective:** Verify textarea shows correct placeholder text
- **Precondition:** Modal is open, textarea is empty
- **Steps:**
  1. Open the modal
  2. Observe the textarea
- **Expected:** Placeholder text "Hay gui gam loi cam on va ghi nhan den dong doi tai day nhe!" is displayed in gray
- **Priority:** Medium

### GUI_010 - Hint text display below textarea
- **Category:** GUI > Rich Text Editor
- **Objective:** Verify hint text about "@" mention feature is displayed
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe below the textarea
- **Expected:** Hint text "Ban co the '@ + ten' de nhac toi dong nghiep khac" is displayed in small font below the textarea
- **Priority:** Medium

### GUI_011 - Toolbar button active state
- **Category:** GUI > Rich Text Editor
- **Objective:** Verify toolbar buttons show active/toggled state when formatting is applied
- **Precondition:** Modal is open, text is entered
- **Steps:**
  1. Type text in the textarea
  2. Select text and click Bold button
  3. Observe the Bold button state
- **Expected:** Bold button shows active/highlighted state when bold formatting is applied to selected text
- **Priority:** Medium

## GUI - Hashtag Field

### GUI_012 - Hashtag field label and required indicator
- **Category:** GUI > Hashtag Field
- **Objective:** Verify "Hashtag" label with "*" required marker
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the hashtag field label
- **Expected:** Label "Hashtag" displayed with red "*" indicating required field
- **Priority:** High

### GUI_013 - Add hashtag button and max note display
- **Category:** GUI > Hashtag Field
- **Objective:** Verify "+ Hashtag" button and "Toi da 5" note are displayed
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the hashtag section
- **Expected:** "+ Hashtag" button and "Toi da 5" (Maximum 5) note are displayed correctly
- **Priority:** High

### GUI_014 - Hashtag chip display
- **Category:** GUI > Hashtag Field
- **Objective:** Verify added hashtags display as chips with remove button
- **Precondition:** Modal is open, at least one hashtag is added
- **Steps:**
  1. Add a hashtag
  2. Observe the chip display
- **Expected:** Hashtag displays as a chip/tag with text and "x" remove button; styling matches design
- **Priority:** Medium

### GUI_015 - Hashtag field with maximum tags
- **Category:** GUI > Hashtag Field
- **Objective:** Verify display when 5 hashtags are added
- **Precondition:** Modal is open
- **Steps:**
  1. Add 5 hashtags
  2. Observe the hashtag section
- **Expected:** All 5 hashtag chips are displayed; layout is not broken; "+ Hashtag" button behavior per spec (hidden or disabled)
- **Priority:** Medium

## GUI - Image Upload

### GUI_016 - Image upload section default display
- **Category:** GUI > Image Upload
- **Objective:** Verify image section displays label, button, and max note
- **Precondition:** Modal is open, no images uploaded
- **Steps:**
  1. Open the modal
  2. Observe the image section
- **Expected:** "Image" label displayed; "+ Image" button with "Toi da 5" note visible; no thumbnails
- **Priority:** Medium

### GUI_017 - Image thumbnail display
- **Category:** GUI > Image Upload
- **Objective:** Verify uploaded image thumbnail with remove button
- **Precondition:** Modal is open, at least one image uploaded
- **Steps:**
  1. Upload an image
  2. Observe the image thumbnails area
- **Expected:** Image thumbnail displayed with "x" remove button; correct size and alignment per design
- **Priority:** Medium

### GUI_018 - Image section with 5 images
- **Category:** GUI > Image Upload
- **Objective:** Verify display when maximum 5 images are uploaded
- **Precondition:** Modal is open
- **Steps:**
  1. Upload 5 images
  2. Observe the image section
- **Expected:** All 5 thumbnails displayed in a row; "+ Image" button is hidden; layout is not broken
- **Priority:** Medium

## GUI - Anonymous Toggle

### GUI_019 - Anonymous toggle default display
- **Category:** GUI > Anonymous Toggle
- **Objective:** Verify anonymous toggle checkbox and label display
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the anonymous toggle
- **Expected:** Toggle/checkbox is displayed unchecked by default; label "Gui an danh" is visible; description "Gui loi cam on va ghi nhan an danh" is shown
- **Priority:** Medium

### GUI_020 - Anonymous toggle active state display
- **Category:** GUI > Anonymous Toggle
- **Objective:** Verify display when anonymous toggle is enabled
- **Precondition:** Modal is open
- **Steps:**
  1. Click the anonymous toggle to enable it
  2. Observe the toggle state and additional fields
- **Expected:** Toggle shows checked/enabled state; anonymous name text field becomes visible
- **Priority:** Medium

## GUI - Action Buttons

### GUI_021 - Cancel button display
- **Category:** GUI > Action Buttons
- **Objective:** Verify "Huy" (Cancel) button styling and position
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Observe the footer action buttons
- **Expected:** "Huy" button displayed with icon + text style; positioned on the left side of the footer
- **Priority:** High

### GUI_022 - Submit button display (disabled state)
- **Category:** GUI > Action Buttons
- **Objective:** Verify "Gui" (Submit) button disabled state when form is incomplete
- **Precondition:** Modal is open, required fields are empty
- **Steps:**
  1. Open the modal without filling any fields
  2. Observe the "Gui" button
- **Expected:** "Gui" button displayed with yellow background but in disabled state (reduced opacity or grayed out); not clickable
- **Priority:** High

### GUI_023 - Submit button display (enabled state)
- **Category:** GUI > Action Buttons
- **Objective:** Verify "Gui" button enabled state when all required fields are filled
- **Precondition:** Modal is open, all required fields filled
- **Steps:**
  1. Fill recipient, message, and at least 1 hashtag
  2. Observe the "Gui" button
- **Expected:** "Gui" button displayed with yellow background in active/enabled state; clickable
- **Priority:** High

## GUI - Responsive Design

### GUI_024 - Modal display on mobile (320px)
- **Category:** GUI > Responsive Design
- **Objective:** Verify modal layout on mobile viewport
- **Precondition:** Browser viewport set to 320px width
- **Steps:**
  1. Open the Viet Kudo modal on mobile viewport
  2. Check all elements are visible and properly sized
- **Expected:** Modal adapts to mobile width; all fields are accessible; touch targets are at least 44x44px; no horizontal overflow
- **Priority:** High

### GUI_025 - Modal display on tablet (768px)
- **Category:** GUI > Responsive Design
- **Objective:** Verify modal layout on tablet viewport
- **Precondition:** Browser viewport set to 768px width
- **Steps:**
  1. Open the Viet Kudo modal on tablet viewport
  2. Check layout and spacing
- **Expected:** Modal displays correctly with appropriate width and spacing for tablet
- **Priority:** Medium

### GUI_026 - Modal display on desktop (1024px+)
- **Category:** GUI > Responsive Design
- **Objective:** Verify modal layout on desktop viewport
- **Precondition:** Browser viewport set to 1024px or wider
- **Steps:**
  1. Open the Viet Kudo modal on desktop viewport
  2. Check layout matches Figma design
- **Expected:** Modal displays centered with design-specified width; all elements properly laid out
- **Priority:** Medium

### GUI_027 - Modal display on zoom in/out
- **Category:** GUI > Responsive Design
- **Objective:** Verify modal displays correctly when browser zoom is changed
- **Precondition:** Modal is open
- **Steps:**
  1. Open the modal
  2. Zoom in to 150%
  3. Zoom out to 75%
- **Expected:** Modal layout is not broken at different zoom levels; all content remains accessible
- **Priority:** Low
