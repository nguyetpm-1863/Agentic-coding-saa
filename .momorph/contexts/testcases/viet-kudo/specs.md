# Viet Kudo - Screen Specifications

## 1. Screen Overview

- **Screen Name:** Viet Kudo (Write Kudo)
- **Frame ID:** 520:11602
- **Type:** Modal/Dialog
- **Purpose:** Allow authenticated users to send appreciation and recognition (Kudo) to teammates
- **Title:** "Gui loi cam on va ghi nhan den dong doi" (Send appreciation and recognition to teammates)
- **Status:** spec

## 2. UI Elements

### A. Title Label
- **Type:** label
- **Text:** "Gui loi cam on va ghi nhan den dong doi"
- **Display:** Large, centered text at the top of the modal, non-interactive

### B. Recipient Field (Nguoi nhan) - REQUIRED
- **Type:** text_form (search dropdown / autocomplete)
- **Label:** "Nguoi nhan" with "*" (required indicator)
- **Placeholder:** "Tim kiem" (Search)
- **Features:** Dropdown arrow icon, autocomplete suggestions on typing, select from list
- **Validation:** Required field, minimum 1 character to trigger search

### C. Rich Text Editor Toolbar
- **Type:** toolbar with formatting buttons
- **Buttons:**
  - C.1 Bold (B) - toggle bold formatting
  - C.2 Italic (I) - toggle italic formatting
  - C.3 Strikethrough (S) - toggle strikethrough formatting
  - C.4 Numbered list - toggle numbered list
  - C.5 Link - insert/edit hyperlink (opens URL input dialog)
  - C.6 Quote - toggle blockquote formatting

### D. Message Textarea - REQUIRED
- **Type:** text_form (rich textarea)
- **Placeholder:** "Hay gui gam loi cam on va ghi nhan den dong doi tai day nhe!" (Send your appreciation and recognition to teammates here!)
- **Features:** Rich text formatting support, "@" mention for colleagues
- **Hint text:** "Ban co the '@ + ten' de nhac toi dong nghiep khac" (You can use "@ + name" to mention other colleagues)
- **Validation:** Required field

### E. Hashtag Field - REQUIRED
- **Type:** tag group (chip input)
- **Label:** "Hashtag" with "*" (required indicator)
- **Button:** "+ Hashtag" to open dropdown and add tags
- **Note:** "Toi da 5" (Maximum 5)
- **Display:** Added tags shown as chips with "x" to remove
- **Validation:** Required (minimum 1 tag), maximum 5 tags

### F. Image Upload (Optional)
- **Type:** image upload
- **Label:** "Image"
- **Button:** "+ Image" with note "Toi da 5" (Maximum 5)
- **Display:** Thumbnails with "x" remove button
- **Behavior:** File picker opens on click; button hidden when 5 images reached
- **Validation:** Maximum 5 images, optional field

### G. Anonymous Toggle
- **Type:** text_form (checkbox/toggle)
- **Label:** "Gui an danh" (Send anonymously)
- **Description:** "Gui loi cam on va ghi nhan an danh" (Send appreciation and recognition anonymously)
- **Data type:** boolean
- **Behavior:** Toggle on/off; when enabled, shows text field for anonymous name

### H. Action Buttons
- **H.1 Cancel Button:** "Huy" - icon_text button, always enabled, closes modal and discards changes
- **H.2 Submit Button:** "Gui" (Send) - icon_text button, yellow background (primary), disabled when required fields not filled; validates form and submits on click, shows loading state

## 3. Validation Rules

| Field | Required | Min | Max | Data Type | Rules |
|-------|----------|-----|-----|-----------|-------|
| Recipient (Nguoi nhan) | Yes | 1 selection | - | string | Must select from autocomplete list |
| Message (textarea) | Yes | - | - | string | Supports rich text, "@" mentions |
| Hashtag | Yes | 1 tag | 5 tags | string | Select or create tags as chips |
| Image | No | 0 | 5 images | file | Image files only |
| Anonymous toggle | No | - | - | boolean | Default: off |
| Submit button state | - | - | - | - | Disabled until all required fields filled |

## 4. User Interactions

1. **Open modal** - Triggered from parent screen (e.g., clicking "Viet Kudo" button)
2. **Search and select recipient** - Type to filter, click to select from dropdown
3. **Write message** - Enter text with optional formatting (bold, italic, strikethrough, numbered list, link, quote)
4. **Mention colleagues** - Type "@" + name to trigger mention autocomplete
5. **Add hashtags** - Click "+ Hashtag" to open dropdown, select/create tags (1-5 required)
6. **Remove hashtag** - Click "x" on chip to remove
7. **Upload images** - Click "+ Image" to open file picker, select images (0-5)
8. **Remove image** - Click "x" on thumbnail to remove
9. **Toggle anonymous** - Click toggle to send anonymously; shows name input when enabled
10. **Cancel** - Click "Huy" to close modal and discard all changes
11. **Submit** - Click "Gui" to validate and submit the kudo; disabled if required fields are empty

## 5. Security Considerations

- **Authentication:** User must be authenticated to access the modal
- **Input Sanitization:** All text inputs (message, mentions, hashtags) must be sanitized server-side to prevent XSS
- **File Upload Security:** Validate image file types and sizes server-side; reject non-image files
- **CSRF Protection:** Form submission uses server actions with built-in CSRF protection
- **Authorization:** Verify the sender is authorized to send kudos
- **Rate Limiting:** Consider rate limiting kudo submissions to prevent spam
- **Mention Validation:** Validate that mentioned users exist and are valid team members
- **Anonymous Mode:** Ensure anonymous sender identity is properly hidden in all views and API responses
