# Specs: Open Secret Box - Chua Mo (Modal)

**Frame ID:** 1466:7676
**File Key:** 9ypp4enmFmdK3YAFJLIu6C
**Status:** spec

---

## 1. Overview

This is a modal dialog titled "KHAM PHA SECRET BOX CUA BAN" (Discover Your Secret Box). It allows logged-in users to open their secret boxes to receive random badges/awards. The modal displays an unopened gift box image, instruction text, and a counter showing how many secret boxes remain unopened. Users click on the box image to open it and receive a random badge.

---

## 2. UI Elements

| No | Element | Type | Description |
|----|---------|------|-------------|
| A | Title | Label | Displays "KHAM PHA SECRET BOX CUA BAN" at the top of the modal. Not interactive. |
| A | Close button (X) | Button | "X" button in the top-right corner to close the modal. |
| B | Instruction text | Label | Displays "Click vao box de mo" (Click on the box to open). Hidden when unopened secret box count = 0. |
| C | Box image | Card/Image | Illustration of an unopened gift box on a golden pedestal. Clickable to open the box. Disabled when unopened secret box count = 0. |
| D | Unopened box counter | Label | Displays "Secretbox chua mo" label (small, white) and the count number (large, bold, yellow). Updates dynamically based on data. |

---

## 3. Validation Rules

- No form input fields on this screen.
- The unopened secret box count must be a non-negative integer.
- When unopened secret box count = 0:
  - Instruction text (B) is hidden.
  - Box image (C) click is disabled.

---

## 4. User Interactions

| Action | Target | Result |
|--------|--------|--------|
| Click X button | Close button | Closes the modal |
| Click box image | Box image (C) | Opens one secret box, reveals a random badge. Count decreases by 1. |
| Click box image when count = 0 | Box image (C) | Nothing happens (disabled). |
| Click outside modal | Background overlay | Modal closes / stays open (per spec). |

---

## 5. Functional / Business Rules

1. **Random badge distribution:** Each box opening awards exactly 1 random badge with the following probabilities:
   - Stay Gold: 30%
   - Flow to Horizon: 25%
   - Beyond the Boundary: 10%
   - Root Further: 5%
   - Touch of Light: 20%
   - Revival: 10%
2. **Counter update:** After opening a box, the "Secretbox chua mo" counter decreases by 1.
3. **Zero boxes state:** When count reaches 0, instruction text is hidden and box image click is disabled.
4. **Single open per click:** Each click opens exactly one box.
5. **Badge result display:** After opening, the box image transitions to show the received badge image (transitions to "MO SECRET BOX THANH CONG" state).
