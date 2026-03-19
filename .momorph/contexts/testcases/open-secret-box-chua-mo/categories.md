# Test Categories: Open Secret Box - Chua Mo (Modal)

**Frame ID:** 1466:7676
**Type:** Modal Dialog

---

## 1. ACCESSING

Since this is a modal (not a standalone page), access tests focus on:
- **Authentication:** Only logged-in users can trigger the modal
- **Authorization:** User must have secret boxes available
- **Modal trigger:** How the modal is opened from the parent screen
- **Modal close:** How the modal is dismissed (X button, ESC, click outside)

No URL-based access tests (modal has no dedicated URL).

---

## 2. GUI

- **Modal layout:** Position, size, overlay/backdrop
- **Title (A):** Text content "KHAM PHA SECRET BOX CUA BAN", font style, color, position
- **Close button (X):** Position (top-right), style, hover state
- **Instruction text (B):** Text "Click vao box de mo", font, color, visibility rules
- **Box image (C):** Gift box illustration, size, position, cursor style (pointer vs default)
- **Counter (D):** "Secretbox chua mo" label style, count number style (large, bold, yellow)
- **Responsive display:** Modal rendering on mobile, tablet, desktop
- **Zoom/Rotate:** Layout integrity under zoom and rotation

---

## 3. FUNCTION

- **Open box action:** Click box image to open, receive random badge
- **Badge probability:** Correct distribution (Stay Gold 30%, Flow to Horizon 25%, Beyond the Boundary 10%, Root Further 5%, Touch of Light 20%, Revival 10%)
- **Counter decrement:** Count decreases by 1 after each open
- **Zero-box state:** Instruction hidden, box click disabled at count=0
- **Single open per click:** No double-open on rapid clicks
- **State transition:** Modal transitions to success state after opening
- **Data persistence:** Badge award saved to database
- **Concurrent access:** Multiple tabs/sessions handling
