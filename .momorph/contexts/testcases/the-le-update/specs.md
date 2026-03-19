# Specs - The le UPDATE (3204:6051)

## 1. Screen Overview

- **Screen Name:** The le UPDATE
- **Frame ID:** 3204:6051
- **File Key:** 9ypp4enmFmdK3YAFJLIu6C
- **Status:** spec
- **Description:** Modal/Panel displaying the rules and regulations ("The le") of the KUDOS program. Contains content area with title, description, reward list, 6 badges, and two action buttons ("Dong"/"Viet KUDOS") in the footer.

## 2. Design Items

### A. Noi dung the le (Info Block)
- **Type:** others (info_block)
- **Name Translation:** Panel noi dung the le
- **Description:** Panel displaying the rules/regulations content of the program
- **Display:**
  - Title, description, reward list, 6 badges, 2 buttons ("Dong"/"Viet KUDOS")
- **Function:**
  - Scroll when content is too long
  - Click "Dong": close panel
  - Click "Viet KUDOS": open form

### B. Button (Footer Modal)
- **Type:** button (icon_text)
- **Name Translation:** Nut hanh dong (Footer modal)
- **Description:** Footer modal with two action buttons
- **Display:**
  - "Dong": icon "X" + text, secondary/outlined style
  - "Viet KUDOS": icon pen + text, primary style (yellow)
- **Function:**
  - Click "Dong": Close modal
  - Click "Viet KUDOS": Open KUDOS writing form
  - States: Hover changes color/elevation, Disabled is dimmed and non-clickable

### B.1. Button dong (Close Button)
- **Type:** button (icon_text)
- **Name Translation:** Nut "Dong"
- **Description:** Close button for modal/panel, includes icon and text "Dong"
- **Function:**
  - Click: Close modal/panel and return to previous content
  - Hover: Hover effect

### B.2. Button viet kudos (Write KUDOS Button)
- **Type:** button (icon_text)
- **Name Translation:** Nut "Viet KUDOS"
- **Description:** Button to open the KUDOS writing form
- **Navigation:** on_click -> Frame "Viet Kudo" (520:11602)
- **Function:**
  - Click: Open modal to write/send KUDOS
  - Display: Icon (pen) on the left with text "Viet KUDOS"

## 3. Navigation

| Element | Action | Target |
|---------|--------|--------|
| Button "Dong" | on_click | Close modal (return to previous screen) |
| Button "Viet KUDOS" | on_click | Navigate to "Viet Kudo" frame (520:11602) |

## 4. Validation Rules

- No input fields on this screen
- No validation rules apply (display-only modal)

## 5. Database

- No direct database operations specified
- Content (rules/regulations) is loaded from backend/database for display
