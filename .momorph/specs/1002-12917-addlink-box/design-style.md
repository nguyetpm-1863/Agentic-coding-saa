# Design Style: Addlink Box (Add Link Dialog)

**Frame ID**: `1002:12917`
**Frame Name**: `Addlink Box`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dialog-bg | rgba(255, 248, 225, 1) | 100% | Dialog container background (warm cream) |
| --color-text-primary | #00101A | 100% | Title, field labels, input text, button text |
| --color-text-placeholder | #999999 | 100% | Input placeholder text |
| --color-border | #998C5F | 100% | Input borders, button borders |
| --color-input-bg | #FFFFFF | 100% | Input field background |
| --color-accent-gold | #FFEA9E | 100% | Save button background |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.10) | 10% | Cancel button background |
| --color-error | #CF1322 | 100% | Validation error text and border |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-dialog-title | Montserrat | 32px | 700 | 40px | 0 | Dialog heading "Them duong dan" |
| --text-field-label | Montserrat | 22px | 700 | 28px | 0 | Field labels ("Noi dung", "URL") |
| --text-input | Montserrat | 16px | 700 | 24px | 0.15px | Input text, placeholder text |
| --text-btn-action | Montserrat | 22px | 700 | 28px | 0 | "Luu" save button text |
| --text-btn-cancel | Montserrat | 16px | 700 | 24px | 0.15px | "Huy" cancel button text |
| --text-error | Montserrat | 14px | 500 | 20px | 0 | Validation error messages |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dialog-padding | 40px | Dialog internal padding (all sides) |
| --spacing-section-gap | 32px | Gap between title, fields, and action row |
| --spacing-field-gap | 16px | Gap between label and input within a field |
| --spacing-input-padding-x | 24px | Input horizontal padding |
| --spacing-input-padding-y | 16px | Input vertical padding |
| --spacing-action-gap | 24px | Gap between Cancel and Save buttons |
| --spacing-cancel-padding-x | 40px | Cancel button horizontal padding |
| --spacing-cancel-padding-y | 16px | Cancel button vertical padding |
| --spacing-save-padding | 16px | Save button padding (all sides) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dialog | 24px | Dialog container corners |
| --radius-input | 8px | Input field corners |
| --radius-btn-primary | 8px | Save button corners |
| --radius-btn-secondary | 4px | Cancel button corners |
| --border-input | 1px solid #998C5F | Standard input border |
| --border-btn | 1px solid #998C5F | Button border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-none | none | Default — dialog has no box-shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| dialog-width | 752px | Dialog container width |
| dialog-height | 388px | Dialog container height (auto if content overflows) |
| dialog-content-width | 672px | Content area (752 - 2*40px padding) |
| dialog-position | centered | Over the editor area or viewport center |

### Layout Structure (ASCII)

```
+----------------------------------------------------------------------+
|  Overlay (optional — may reuse parent Kudo modal overlay)             |
|                                                                        |
|  +------------------------------------------------------------+      |
|  |  Dialog (752x388px, bg: #FFF8E1, r-24, p-40)              |      |
|  |  flex-col, gap-32                                           |      |
|  |                                                              |      |
|  |  +--------------------------------------------------------+|      |
|  |  | A_Title (672px, centered)                                ||      |
|  |  | "Them duong dan"                                         ||      |
|  |  | Montserrat 32px/700, #00101A, text-center                ||      |
|  |  +--------------------------------------------------------+|      |
|  |           | gap: 32px                                        |      |
|  |  +--------------------------------------------------------+|      |
|  |  | B_TextField (672px)                                      ||      |
|  |  | +----------+ +--------------------------------------+  ||      |
|  |  | | B.1 Label | | B.2 Input (610x56px)                |  ||      |
|  |  | | "Noi dung"| | border: 1px #998C5F, r-8, bg: #FFF  |  ||      |
|  |  | | 22px/700  | | p: 16px 24px                         |  ||      |
|  |  | +----------+ +--------------------------------------+  ||      |
|  |  +--------------------------------------------------------+|      |
|  |           | gap: 32px                                        |      |
|  |  +--------------------------------------------------------+|      |
|  |  | C_URLField (672px)                                       ||      |
|  |  | +----------+ +--------------------------------------+  ||      |
|  |  | | C.1 Label | | C.2 Input (610x56px) + Link icon    |  ||      |
|  |  | | "URL"     | | border: 1px #998C5F, r-8, bg: #FFF  |  ||      |
|  |  | | 22px/700  | | p: 16px 24px, icon 24x24 right      |  ||      |
|  |  | +----------+ +--------------------------------------+  ||      |
|  |  +--------------------------------------------------------+|      |
|  |           | gap: 32px                                        |      |
|  |  +--------------------------------------------------------+|      |
|  |  | D_Actions (672px, flex-row, gap-24)                      ||      |
|  |  | +------------------+ +--------------------------------+||      |
|  |  | | D.1 Cancel       | | D.2 Save                      |||      |
|  |  | | "Huy" + X icon   | | "Luu" + Link icon              |||      |
|  |  | | secondary outline| | bg: #FFEA9E, r-8               |||      |
|  |  | | r-4, h-60        | | w: 502px, h: 60px              |||      |
|  |  | +------------------+ +--------------------------------+||      |
|  |  +--------------------------------------------------------+|      |
|  |                                                              |      |
|  +------------------------------------------------------------+      |
+----------------------------------------------------------------------+
```

---

## Component Style Details

### Dialog Container (1002:12917)

| Property | Value | CSS |
|----------|-------|-----|
| width | 752px | `width: 752px` |
| height | 388px | `height: auto; min-height: 388px` |
| padding | 40px | `padding: 40px` |
| border-radius | 24px | `border-radius: 24px` |
| background | rgba(255, 248, 225, 1) | `background-color: #FFF8E1` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |
| align-items | flex-start | `align-items: flex-start` |
| position | fixed, centered | `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 60` |

### A_Title

| Property | Value | CSS |
|----------|-------|-----|
| width | 672px | `width: 100%` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |

### B_TextField — Content Input

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 16px | `gap: 16px` |
| align-items | center | `align-items: center` |

**B.1 Label:**

| Property | Value | CSS |
|----------|-------|-----|
| width | auto | `width: auto; flex-shrink: 0` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

**B.2 Input:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 610px | `flex: 1` |
| height | 56px | `height: 56px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFF | `background-color: #FFFFFF` |
| padding | 16px 24px | `padding: 16px 24px` |
| font | Montserrat 16px/700, 0.15px | `font-size: 16px; font-weight: 700; letter-spacing: 0.15px` |
| color | #00101A | `color: #00101A` |
| placeholder-color | #999 | Placeholder: `color: #999999` |

**Input States:**

| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Focus | border: 2px solid #FFEA9E, outline: none |
| Error | border: 2px solid #CF1322 |
| Filled | Text color: #00101A |

### C_URLField — URL Input

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | Same as B_TextField | |

**C.1 Label:** Same as B.1 (Montserrat 22px/700, #00101A), text: "URL".

**C.2 Input:** Same as B.2, with additional link icon.

| Property | Value | CSS |
|----------|-------|-----|
| width | 610px | `flex: 1` |
| height | 56px | `height: 56px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFF | `background-color: #FFFFFF` |
| padding | 16px 24px | `padding: 16px 24px` |
| display | flex | `display: flex; align-items: center; justify-content: space-between` |
| icon | Link 24x24px, right-aligned | `width: 24px; height: 24px` |

**Input States:** Same as B.2 Input States.

### D_Actions — Button Row

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 60px | `height: 60px` |
| display | flex | `display: flex; flex-direction: row; gap: 24px; align-items: flex-start` |

**D.1 Cancel Button ("Huy"):**

| Property | Value | CSS |
|----------|-------|-----|
| height | 60px | `align-self: stretch` |
| padding | 16px 40px | `padding: 16px 40px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 0.10) | `background-color: rgba(255, 234, 158, 0.10)` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| font | Montserrat 16px/700, 0.15px | `font-size: 16px; font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | X/Close 24x24px | Right of text |
| cursor | pointer | `cursor: pointer` |

**D.1 Cancel Button States:**

| State | Changes |
|-------|---------|
| Default | as above |
| Hover | bg: rgba(255, 234, 158, 0.20), transition 150ms |
| Active | bg: rgba(255, 234, 158, 0.30) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**D.2 Save Button ("Luu"):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 502px | `flex: 1` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| border-radius | 8px | `border-radius: 8px` |
| background | rgba(255, 234, 158, 1) | `background-color: #FFEA9E` |
| display | flex | `display: flex; align-items: center; justify-content: center; gap: 8px` |
| font | Montserrat 22px/700 | `font-size: 22px; font-weight: 700; line-height: 28px` |
| color | #00101A | `color: #00101A` |
| icon | Link 24x24px | Right of text |
| cursor | pointer | `cursor: pointer` |

**D.2 Save Button States:**

| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E |
| Hover | bg: #FFE080, transition 150ms |
| Active | bg: #FFD760 |
| Focus | outline: 2px solid #998C5F, outline-offset: 2px |
| Disabled | bg: #FFEA9E at 50% opacity, cursor: not-allowed |

---

## Component Hierarchy with Styles

```
Dialog (fixed, centered, w-[752px], min-h-[388px], bg-[#FFF8E1], r-3xl, p-10, z-60)
+-- flex-col, gap-8
|
+-- A_Title (w-full, text-center)
|   "Them duong dan"
|   (Montserrat 32px/700, #00101A, lh: 40px)
|
+-- B_TextField (w-full, flex-row, gap-4, items-center)
|   +-- B.1_Label "Noi dung" (22px/700, #00101A, shrink-0)
|   +-- B.2_Input (flex-1, h-14, border-#998C5F, r-2, bg-white, px-6 py-4)
|       Placeholder text (#999)
|
+-- C_URLField (w-full, flex-row, gap-4, items-center)
|   +-- C.1_Label "URL" (22px/700, #00101A, shrink-0)
|   +-- C.2_Input (flex-1, h-14, border-#998C5F, r-2, bg-white, px-6 py-4)
|       + Link icon (24x24, right)
|
+-- D_Actions (w-full, flex-row, gap-6)
    +-- D.1_Cancel (border-#998C5F, r-1, bg-gold/10, px-10 py-4)
    |   "Huy" (16px/700) + X icon (24x24)
    +-- D.2_Save (flex-1, bg-#FFEA9E, r-2, py-4, text-center)
        "Luu" (22px/700) + Link icon (24x24)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width | Tailwind Prefix |
|------|-----------|-----------|-----------------|
| Mobile | 0 | 767px | (default) |
| Tablet | 768px | 1023px | md: |
| Desktop | 1024px | 1279px | lg: |
| Wide | 1280px | infinite | xl: |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dialog | width: calc(100vw - 32px), max-width: 752px, padding: 16px, border-radius: 16px |
| Title | font-size: 24px, line-height: 32px |
| Field labels | font-size: 18px |
| Field layout | Stack label above input (flex-col instead of flex-row) |
| Input | width: 100% |
| Action buttons | Stack vertically (flex-col), both full-width |
| Save button | width: 100%, min-height: 48px |
| Cancel button | width: 100%, min-height: 48px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Dialog | width: 90vw, max-width: 752px, padding: 24px |
| Title | font-size: 28px |
| Layout | Keep row layout for fields |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Dialog | Match Figma design (752px width, 40px padding) |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design exactly |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Link | 24x24px | #00101A | URL field right side, Save button |
| Close (X) | 24x24px | #00101A | Cancel button |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dialog | opacity, transform (scale) | 150ms | ease-out | Open/close |
| Cancel Button | background-color | 150ms | ease-in-out | Hover |
| Save Button | background-color | 150ms | ease-in-out | Hover |
| Input Focus | border-color | 150ms | ease-in-out | Focus |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Dialog | 1002:12917 | `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[752px] min-h-[388px] bg-[#FFF8E1] rounded-3xl p-10 z-[60] flex flex-col gap-8` | `<AddLinkDialog />` (Client) |
| Title | A | `w-full text-center text-[32px] font-bold leading-10 text-[#00101A] font-montserrat` | Heading in dialog |
| Text Field | B | `w-full flex flex-row gap-4 items-center` | `<div>` with label + input |
| Text Label | B.1 | `shrink-0 text-[22px] font-bold leading-7 text-[#00101A] font-montserrat` | `<label>` |
| Text Input | B.2 | `flex-1 h-14 border border-[#998C5F] rounded-lg bg-white px-6 py-4 font-montserrat text-base font-bold` | `<input />` |
| URL Field | C | `w-full flex flex-row gap-4 items-center` | `<div>` with label + input |
| URL Label | C.1 | Same as B.1 | `<label>` |
| URL Input | C.2 | Same as B.2, with icon | `<div>` wrapping `<input />` + icon |
| Cancel | D.1 | `border border-[#998C5F] rounded bg-[#FFEA9E]/10 px-10 py-4 flex items-center gap-2 font-montserrat text-base font-bold` | `<button />` |
| Save | D.2 | `flex-1 h-[60px] bg-[#FFEA9E] rounded-lg py-4 flex items-center justify-center gap-2 font-montserrat text-[22px] font-bold` | `<button />` |

---

## Notes

- The dialog shares the same visual language as the parent Viet Kudo modal: `#FFF8E1` background, `#998C5F` borders, Montserrat typography, and gold accent buttons.
- The dialog z-index should be higher than the parent modal (z-50) to layer correctly — use z-60.
- The Save button is identical in style to the parent modal's Send button (502x60px, `#FFEA9E` background, 8px radius).
- The Cancel button matches the parent modal's Cancel button exactly.
- Input fields use the same styling as the parent modal's input fields (border `#998C5F`, radius 8px, padding 16px 24px, white background).
- The URL input includes a link icon (24x24px) right-aligned inside the input, similar to the recipient field's dropdown chevron in the parent modal.
