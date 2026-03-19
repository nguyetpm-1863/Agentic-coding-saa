# Test Categories - Addlink Box (Modal)

This is a MODAL dialog. No direct URL access tests are applicable.

## 1. ACCESSING

Tests for how the modal is opened and closed.

| Sub_Category | Description |
|---|---|
| Open Modal | Verify modal opens correctly via trigger action |
| Close Modal | Verify modal closes via Cancel, X, ESC, click outside |

## 2. GUI

Tests for visual display and layout of the modal.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Layout | Modal Position | Modal centered on screen, overlay/dimmed background |
| Layout | Title | Title text, font, position |
| Layout | Input Fields | Labels, input boxes, size, position, style |
| Layout | Buttons | Cancel and Save button style, position, icon |
| Display State | Default State | Initial display when modal opens |
| Display State | Focus State | Input field highlight on focus |
| Display State | Error State | Error message display on validation failure |
| Responsive | Zoom | Display when zoom in/out |
| Responsive | Screen Size | Display on different viewport sizes |

## 3. FUNCTION

Tests for functional behavior of the modal.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Text Field | Valid Input | Valid text entry scenarios |
| Text Field | Invalid Input | Empty, whitespace-only, over max length |
| Text Field | Boundary | Min/max length boundary values |
| Link Field | Valid Input | Valid URL entry scenarios |
| Link Field | Invalid Input | Empty, invalid format, over max length |
| Link Field | Boundary | Min/max length boundary values |
| Save Action | Success | Save with all valid data |
| Save Action | Failure | Save with invalid data |
| Cancel Action | Discard | Cancel discards changes |
| Security | XSS/Injection | Script and SQL injection handling |
| Keyboard | Tab Order | Tab navigation within modal |
| Keyboard | Enter/ESC | Keyboard shortcuts |
