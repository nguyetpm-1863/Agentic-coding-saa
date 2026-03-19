# Viet Kudo - Test Categories

## 1. ACCESSING

Since "Viet Kudo" is a modal/dialog (not a standalone page), accessing tests focus on how the modal is triggered and opened, rather than URL navigation.

### Sub-categories:
- **Open Modal** - Verify modal opens correctly from trigger button/link
- **Authentication** - Verify only authenticated users can trigger the modal
- **Modal Display on Open** - Verify modal renders correctly upon opening (overlay, position, animation)

## 2. GUI

Visual and layout testing of all UI elements within the modal.

### Sub-categories:
- **Modal Layout** - Overall modal structure, overlay, positioning, responsiveness
- **Title** - Modal title display and styling
- **Recipient Field** - Label, input field, placeholder, dropdown icon, required indicator
- **Rich Text Editor** - Toolbar buttons display, textarea, placeholder, hint text
- **Hashtag Field** - Label, "+ Hashtag" button, "Toi da 5" note, chip display, required indicator
- **Image Upload** - Label, "+ Image" button, "Toi da 5" note, thumbnail display
- **Anonymous Toggle** - Toggle/checkbox display, label text
- **Action Buttons** - "Huy" and "Gui" button styling, positioning, states (enabled/disabled)
- **Responsive Design** - Modal display across mobile, tablet, desktop breakpoints

## 3. FUNCTION

Functional testing of all interactive elements, validations, and form submission.

### Sub-categories:
- **Recipient Search & Select** - Autocomplete search, dropdown filtering, selection behavior
- **Rich Text Editing** - Bold, italic, strikethrough, numbered list, link, quote formatting
- **Mention Feature** - "@" mention autocomplete and insertion
- **Hashtag Management** - Add/remove hashtags, min/max validation (1-5)
- **Image Upload** - File picker, upload, thumbnail preview, remove, max limit (5), file type validation
- **Anonymous Toggle** - Toggle on/off behavior, anonymous name field display
- **Form Validation** - Required field validation, submit button state management
- **Form Submission** - Submit with valid data, loading state, success/error handling
- **Cancel Operation** - Discard changes and close modal
- **Modal Behavior** - Click outside, ESC key, scroll background, keyboard navigation (Tab order)
- **Edge Cases** - Double submit, network errors, concurrent operations
