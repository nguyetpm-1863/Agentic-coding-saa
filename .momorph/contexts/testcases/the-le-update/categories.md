# Test Categories - The le UPDATE

## 1. ACCESSING
Test cases related to accessing and opening the "The le UPDATE" modal/panel.

### Categories:
- **Open Modal:** Verify the modal can be opened via various methods (click, double-click, keyboard)
- **Permission/Authentication:** Verify access based on user login state
- **URL/Deep Link:** Verify behavior when accessing directly (if applicable)

## 2. GUI (Graphical User Interface)
Test cases related to visual display and layout of the modal.

### Categories:
- **Layout:** Modal position, size, overlay/background
- **Content Display:**
  - Title display (position, style, text)
  - Description display (position, style, text)
  - Reward list display
  - Badge display (6 badges - position, images, labels)
- **Button Display:**
  - "Dong" button (icon X + text, secondary/outlined style)
  - "Viet KUDOS" button (icon pen + text, primary yellow style)
  - Button states (default, hover, disabled)
- **Scrollbar:** Display when content overflows
- **Responsive Design:** Mobile, tablet, desktop, wide breakpoints
- **Text Display:** Font, size, color, alignment of all text elements

## 3. FUNCTION
Test cases related to functional behavior and interactions.

### Categories:
- **Button Actions:**
  - "Dong" button click -> close modal
  - "Viet KUDOS" button click -> navigate to Viet Kudo form (520:11602)
  - Double-click behavior
  - Keyboard interaction (Tab + Enter, ESC)
- **Scroll Behavior:**
  - Scroll within modal when content exceeds visible area
  - Mouse wheel, drag scrollbar, keyboard scroll
- **Modal Behavior:**
  - Click outside modal
  - Background interaction while modal is open
  - Reload page while modal is open
  - Zoom in/out behavior
  - Rotate screen behavior
- **Text Interaction:**
  - Select text, copy/paste
  - Right-click context menu
- **Navigation:**
  - Tab order within modal
  - Focus trap within modal
