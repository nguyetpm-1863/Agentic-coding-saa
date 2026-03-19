# Design Style: Viet Kudo (Write Kudo)

**Frame ID**: `520:11602`
**Frame Name**: `Viet Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09
**Last Verified**: 2026-03-12

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-page | #00101A | 100% | Page background (behind modal) |
| --color-overlay | rgba(0, 16, 26, 0.80) | 80% | Dark overlay/mask behind modal |
| --color-modal-bg | rgba(255, 248, 225, 1) | 100% | Modal container background (warm cream) |
| --color-text-primary | #00101A | 100% | Modal title, field labels, body text |
| --color-text-placeholder | #999999 | 100% | Input placeholder text, helper text |
| --color-text-white | #FFFFFF | 100% | Text on dark backgrounds (header nav) |
| --color-required-asterisk | rgba(207, 19, 34, 1) | 100% | Required field asterisk (*) |
| --color-community-link | rgba(228, 96, 96, 1) | 100% | "Tieu chuan cong dong" link text (coral red) |
| --color-border | #998C5F | 100% | Input borders, toolbar borders, button borders |
| --color-input-bg | #FFFFFF | 100% | Input field background, editor background |
| --color-accent-gold | #FFEA9E | 100% | Send button background, image inner border, active nav |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.10) | 10% | Cancel button background |
| --color-btn-transparent | rgba(0, 0, 0, 0.00) | 0% | Toolbar button background |
| --color-remove-btn | rgba(212, 39, 29, 1) | 100% | Image remove button (red circle) |
| --color-header-bg | rgba(16, 20, 23, 0.80) | 80% | Header background overlay |
| --color-checkbox-border | #999999 | 100% | Checkbox border color |
| --color-nav-active-gold | #FFEA9E | 100% | Active nav tab text + border |
| --color-text-gold-glow | #FAE287 | 100% | Nav text shadow glow |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-modal-title | Montserrat | 32px | 700 | 40px | 0 | Modal heading "Gui loi cam on..." |
| --text-field-label | Montserrat | 22px | 700 | 28px | 0 | Field labels ("Nguoi nhan", "Danh hieu", etc.) |
| --text-input | Montserrat | 16px | 700 | 24px | 0.15px | Input text, placeholder text, toolbar text |
| --text-helper | Montserrat | 16px | 700 | 24px | 0.15px | Helper/hint text below fields (color: #999) |
| --text-mention-hint | Montserrat | 16px | 700 | 24px | 0.5px | @ mention hint text (color: #00101A) |
| --text-required | Noto Sans JP | 16px | 700 | 20px | 0 | Required asterisk (*) |
| --text-btn-action | Montserrat | 22px | 700 | 28px | 0 | "Gui" and "Huy" button text |
| --text-btn-small | Montserrat | 16px | 700 | 24px | 0.15px | "Huy" cancel button text (16px variant) |
| --text-add-btn | Montserrat | 11px | 700 | 16px | 0.5px | "+ Hashtag" / "+ Image" button text |
| --text-community-link | Montserrat | 16px | 700 | 24px | 0.15px | "Tieu chuan cong dong" link |
| --text-nav | Montserrat | 14px | 700 | 20px | 0.1px | Header navigation text |
| --text-nav-active | Montserrat | 16px | 700 | 24px | 0.15px | Active nav tab text |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding | 40px | Modal internal padding (all sides) |
| --spacing-modal-gap | 32px | Gap between major form sections |
| --spacing-field-gap | 16px | Gap between label and input within a field group |
| --spacing-input-padding-x | 24px | Input horizontal padding |
| --spacing-input-padding-y | 16px | Input vertical padding |
| --spacing-toolbar-padding-x | 16px | Toolbar button horizontal padding |
| --spacing-toolbar-padding-y | 10px | Toolbar button vertical padding |
| --spacing-editor-padding-left | 24px | Text editor left padding |
| --spacing-hashtag-gap | 8px | Gap between hashtag chips |
| --spacing-image-gap | 16px | Gap between image thumbnails |
| --spacing-action-gap | 24px | Gap between Cancel and Send buttons |
| --spacing-anonymous-gap | 16px | Gap between checkbox and label |
| --spacing-helper-gap | 4px | Gap between input and helper text |
| --spacing-content-gap | 24px | Gap within content section (editor area) |
| --spacing-cancel-padding-x | 40px | Cancel button horizontal padding |
| --spacing-cancel-padding-y | 16px | Cancel button vertical padding |
| --spacing-send-padding | 16px | Send button padding (all sides) |
| --spacing-add-btn-padding-x | 8px | "+ Hashtag"/"+Image" button horizontal padding |
| --spacing-add-btn-padding-y | 4px | "+ Hashtag"/"+Image" button vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 24px | Modal container corners |
| --radius-input | 8px | Input fields, editor bottom corners |
| --radius-btn-primary | 8px | Send button corners |
| --radius-btn-secondary | 4px | Cancel button, checkbox corners |
| --radius-toolbar-left | 8px 0 0 0 | First toolbar button (top-left) |
| --radius-toolbar-right | 0 8px 0 0 | Last toolbar section (top-right) |
| --radius-image-outer | 18px | Image thumbnail outer container |
| --radius-image-inner | 4px | Image thumbnail inner (actual image) |
| --radius-add-btn | 8px | "+ Hashtag"/"+Image" button corners |
| --radius-remove-btn | 71px | Image remove button (circle) |
| --border-input | 1px solid #998C5F | Standard input/toolbar border |
| --border-image-inner | 1px solid #FFEA9E | Image thumbnail inner gold border |
| --border-checkbox | 1px solid #999 | Checkbox border |
| --border-nav-active | 1px solid #FFEA9E | Active nav tab bottom border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav tab text glow |
| --shadow-none | none | Default — most elements have no box-shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| page-width | 1440px | Full design width |
| modal-width | 752px | Modal container width |
| modal-height | 1012px | Modal container height (scrollable if overflow) |
| modal-content-width | 672px | Content area (752 - 2*40px padding) |
| modal-position | centered | Horizontally and vertically centered in viewport |

### Layout Structure (ASCII)

```
+----------------------------------------------------------------------+
|  Page (1440x1024px, bg: #00101A)                                      |
|                                                                        |
|  +------------------------------------------------------------------+ |
|  |  Header (reused, fixed, z-50)                                    | |
|  +------------------------------------------------------------------+ |
|                                                                        |
|  +------------------------------------------------------------------+ |
|  |  Overlay/Mask (absolute, inset-0, bg: rgba(0,16,26,0.80), z-40) | |
|  |                                                                    | |
|  |  +------------------------------------------------------------+  | |
|  |  |  Modal (752x1012px, bg: #FFF8E1, r-24, p-40, z-50)        |  | |
|  |  |  flex-col, gap-32, overflow-y-auto                          |  | |
|  |  |                                                              |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | A_Title (672px, centered)                                ||  | |
|  |  |  | "Gui loi cam on va ghi nhan den dong doi"               ||  | |
|  |  |  | Montserrat 32px/700, #00101A, text-center                ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 32px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | B_Recipient (672px, flex-row, gap-16)                    ||  | |
|  |  |  | +----------+ +--------------------------------------+  ||  | |
|  |  |  | | B.1 Label | | B.2 Search Input (flex: 1)          |  ||  | |
|  |  |  | | "Nguoi    | | border: 1px #998C5F, r-8, bg: #FFF  |  ||  | |
|  |  |  | |  nhan *"  | | p: 16px 24px, h: 56px               |  ||  | |
|  |  |  | | 22px/700  | | placeholder: "Tim kiem" #999         |  ||  | |
|  |  |  | +----------+ | dropdown icon (24x24, right)          |  ||  | |
|  |  |  |              +--------------------------------------+  ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 32px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | Badge/Title Field (672px)                                ||  | |
|  |  |  | +----------+ +--------------------------------------+  ||  | |
|  |  |  | | Label     | | Input (514px, same style as B.2)    |  ||  | |
|  |  |  | | "Danh     | | placeholder: "Danh tang mot..."     |  ||  | |
|  |  |  | |  hieu *"  | +--------------------------------------+  ||  | |
|  |  |  | +----------+                                             ||  | |
|  |  |  | Helper text (16px/700, #999, 2 lines)                   ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 32px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | C/D_Rich Text Editor (672px)                             ||  | |
|  |  |  | +------------------------------------------------------+||  | |
|  |  |  | | C_Toolbar (h: 40px, flex-row)                         |||  | |
|  |  |  | | [B][I][S][#][Link][Quote] | "Tieu chuan cong dong"   |||  | |
|  |  |  | | Each btn: 56x40, border #998C5F, bg: transparent      |||  | |
|  |  |  | | First btn: r: 8px 0 0 0, Last section: r: 0 8px 0 0  |||  | |
|  |  |  | +------------------------------------------------------+||  | |
|  |  |  | | D_Textarea (h: 200px, border top shared with toolbar) |||  | |
|  |  |  | | border: 1px #998C5F, r: 0 0 8px 8px, bg: #FFF        |||  | |
|  |  |  | | pl: 24px, min-h: 120px                                |||  | |
|  |  |  | | placeholder: "Hay gui gam loi cam on..." #999         |||  | |
|  |  |  | +------------------------------------------------------+||  | |
|  |  |  | D.1 Hint: "Ban co the @ + ten..." (16px, #00101A)       ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 24px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | E_Hashtag (672px, flex-row, gap-16)                      ||  | |
|  |  |  | +----------+ +--------------------------------------+  ||  | |
|  |  |  | | E.1 Label | | E.2 Tag Group (flex-row, gap-8)     |  ||  | |
|  |  |  | | "Hashtag  | | [+ Hashtag] button (116x48)         |  ||  | |
|  |  |  | |   *"      | | "Hashtag\nToi da 5" (11px, #999)    |  ||  | |
|  |  |  | | 22px/700  | | Plus icon (24x24)                    |  ||  | |
|  |  |  | +----------+ +--------------------------------------+  ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 24px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | F_Image (672px, flex-row, gap-16, align-center)          ||  | |
|  |  |  | +------+ +------+ +------+ +------+ +------+ +------+  ||  | |
|  |  |  | |F.1   | |F.2   | |F.3   | |F.4   | |F.5   | |F.6   |  ||  | |
|  |  |  | |Label | |Img   | |Img   | |Img   | |Img   | |+Image|  ||  | |
|  |  |  | |"Image"| |80x80 | |80x80 | |80x80 | |80x80 | |btn  |  ||  | |
|  |  |  | |22px  | |r-18  | |r-18  | |r-18  | |r-18  | |98x48 |  ||  | |
|  |  |  | +------+ +------+ +------+ +------+ +------+ +------+  ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 32px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | G_Anonymous (672px, flex-row, gap-16, align-center)      ||  | |
|  |  |  | [x] Checkbox (24x24, r-4) + Label text (22px/700, #999) ||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |           | gap: 32px                                        |  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |  | H_Actions (672px, flex-row, gap-24)                      ||  | |
|  |  |  | +------------------+ +--------------------------------+||  | |
|  |  |  | | H.1 Cancel       | | H.2 Send                      |||  | |
|  |  |  | | "Huy" + X icon   | | "Gui" + Send icon              |||  | |
|  |  |  | | secondary outline| | bg: #FFEA9E, r-8               |||  | |
|  |  |  | | r-4, h-60        | | w: 502px, h: 60px              |||  | |
|  |  |  | +------------------+ +--------------------------------+||  | |
|  |  |  +--------------------------------------------------------+|  | |
|  |  |                                                              |  | |
|  |  +------------------------------------------------------------+  | |
|  |                                                                    | |
|  +------------------------------------------------------------------+ |
+----------------------------------------------------------------------+
```

---

## Component Style Details

### Modal Container (520:11647)

| Property | Value | CSS |
|----------|-------|-----|
| width | 752px | `width: 752px` |
| height | 1012px | `height: auto; max-height: 90vh` |
| padding | 40px | `padding: 40px` |
| border-radius | 24px | `border-radius: 24px` |
| background | rgba(255, 248, 225, 1) | `background-color: #FFF8E1` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |
| align-items | flex-start | `align-items: flex-start` |
| overflow | auto | `overflow-y: auto` |
| position | fixed, centered | `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 50` |

### Dark Overlay (520:11646)

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100vw` |
| height | 100% | `height: 100vh` |
| position | fixed | `position: fixed; inset: 0; z-index: 40` |
| background | rgba(0, 16, 26, 0.80) | `background-color: rgba(0, 16, 26, 0.80)` |

### A_Title (I520:11647;520:9870)

| Property | Value | CSS |
|----------|-------|-----|
| width | 672px | `width: 100%` |
| height | 80px | `height: auto` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| text-align | center | `text-align: center` |
| color | rgba(0, 16, 26, 1) | `color: #00101A` |

### B_Recipient Field (I520:11647;520:9871)

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 56px | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 16px | `gap: 16px` |
| align-items | center | `align-items: center` |

**B.1 Label (I520:11647;520:9872):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 146px | `width: auto; flex-shrink: 0` |
| display | flex | `display: flex; gap: 2px; align-items: center` |
| label-font | Montserrat 22px/700 | `font-size: 22px; font-weight: 700; line-height: 28px` |
| label-color | #00101A | `color: #00101A` |
| asterisk-font | Noto Sans JP 16px/700 | `font-size: 16px; font-weight: 700; line-height: 20px` |
| asterisk-color | rgba(207, 19, 34, 1) | `color: #CF1322` |

**B.2 Search Input (I520:11647;520:9873):**

| Property | Value | CSS |
|----------|-------|-----|
| flex | 1 0 0 | `flex: 1` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFF | `background-color: #FFFFFF` |
| padding | 16px 24px | `padding: 16px 24px` |
| display | flex | `display: flex; justify-content: space-between; align-items: center` |
| placeholder-color | #999 | `color: #999999` (placeholder) |
| placeholder-font | Montserrat 16px/700 | Same as input font |
| icon | dropdown chevron 24x24px | Right-aligned |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Focus | border: 2px solid #FFEA9E, outline: none |
| Error | border: 2px solid #CF1322 |
| Filled | Text color: #00101A |

### Badge/Title Field (I520:11647;1688:10448)

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 104px | `height: auto` |

**Label:** Same style as B.1 (Montserrat 22px/700, #00101A, with red asterisk).

**Input (I520:11647;1688:10437):** Same style as B.2 Search Input (flex: 1, border, radius, padding).
- Placeholder: "Danh tang mot danh hieu cho dong doi" (#999)

**Helper Text (I520:11647;1688:10447):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 418px | `width: auto` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #999 | `color: #999999` |
| text-align | left | `text-align: left` |

### C_Toolbar (I520:11647;520:9877)

| Property | Value | CSS |
|----------|-------|-----|
| width | 672px (content width) | `width: 100%` |
| height | 40px | `height: 40px` |
| display | flex | `display: flex; align-items: center` |

**Toolbar Button (generic — C.1 through C.6):**

| Property | Value | CSS |
|----------|-------|-----|
| height | 40px | `height: 40px` |
| padding | 10px 16px | `padding: 10px 16px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | transparent | `background-color: transparent` |
| display | flex | `display: flex; align-items: center; justify-content: center` |
| cursor | pointer | `cursor: pointer` |
| icon-size | 24x24px | `width: 24px; height: 24px` |

**Button-specific border-radius:**

| Button | border-radius | Notes |
|--------|--------------|-------|
| C.1 Bold | 8px 0 0 0 | Top-left rounded |
| C.2 Italic | 0 | No rounding |
| C.3 Strikethrough | 0 | No rounding |
| C.4 Numbered List | 0 | No rounding |
| C.5 Link | 0 | No rounding |
| C.6 Quote | 0 | No rounding |
| "Tieu chuan cong dong" | 0 8px 0 0 | Top-right rounded, width: 336px |

**Toolbar Button States:**
| State | Changes |
|-------|---------|
| Default | bg: transparent, border: 1px solid #998C5F |
| Hover | bg: rgba(0, 0, 0, 0.05), transition 150ms |
| Active/Pressed | bg: rgba(0, 0, 0, 0.10) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: -2px |
| Toggled On | bg: rgba(255, 234, 158, 0.20) |

**"Tieu chuan cong dong" Link Section (I520:11647;3053:11619):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 336px | `width: 336px` (fills remaining space) |
| height | 40px | `height: 40px` |
| padding | 10px 16px | `padding: 10px 16px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 0 8px 0 0 | `border-radius: 0 8px 0 0` |
| background | transparent | `background-color: transparent` |
| text-align | right | `text-align: right` |
| font | Montserrat 16px/700, 0.15px spacing | Standard text |
| color | rgba(228, 96, 96, 1) | `color: #E46060` (coral link) |
| cursor | pointer | `cursor: pointer` |

### D_Text Editor (I520:11647;520:9886)

| Property | Value | CSS |
|----------|-------|-----|
| width | 672px | `align-self: stretch` |
| height | 200px | `height: 200px` |
| min-height | 120px | `min-height: 120px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 0 0 8px 8px | `border-radius: 0 0 8px 8px` |
| background | #FFF | `background-color: #FFFFFF` |
| padding | 16px 24px | `padding: 16px 24px` (Figma shows only `padding-left: 24px`, infer `padding-top: 16px` for usability) |
| display | flex | `display: flex; align-items: flex-start` |
| placeholder-color | #999 | `color: #999999` |
| placeholder-font | Montserrat 16px/700, 0.15px | Standard input font |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Focus | border: 2px solid #FFEA9E |
| Error | border: 2px solid #CF1322 |

**D.1 Mention Hint (I520:11647;520:9888):**

| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px/700 | Standard text |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #00101A | `color: #00101A` |

### E_Hashtag Section (I520:11647;520:9890)

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 48px | `height: auto` |
| display | flex | `display: flex; flex-direction: row; gap: 16px; align-items: flex-start` |

**E.1 Label:** Same as B.1 (Montserrat 22px/700, #00101A, red asterisk).

**E.2 Tag Group (I520:11647;662:8595):**

| Property | Value | CSS |
|----------|-------|-----|
| width | 548px | `flex: 1` |
| display | flex | `display: flex; flex-direction: row; gap: 8px; align-items: center; flex-wrap: wrap` |

**"+ Hashtag" Button (I520:11647;662:8911):**

| Property | Value | CSS |
|----------|-------|-----|
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFF | `background-color: #FFFFFF` |
| display | flex | `display: flex; align-items: center` |
| icon | Plus 24x24px | Left-aligned |
| text-font | Montserrat 11px/700 | `font-size: 11px; font-weight: 700` |
| text-line-height | 16px | `line-height: 16px` |
| text-spacing | 0.5px | `letter-spacing: 0.5px` |
| text-color | #999 | `color: #999999` |

### F_Image Section (I520:11647;520:9896)

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 80px | `height: auto` |
| display | flex | `display: flex; flex-direction: row; gap: 16px; align-items: center` |

**F.1 Label:** Montserrat 22px/700, #00101A (no asterisk — optional field).

**Image Thumbnail (F.2-F.5, e.g., I520:11647;662:9197):**

| Property | Value | CSS |
|----------|-------|-----|
| **Outer Container** | | |
| width | 80px | `width: 80px` |
| height | 80px | `height: 80px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 18px | `border-radius: 18px` |
| background | #FFF | `background-color: #FFFFFF` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| position | relative | `position: relative` |
| **Inner Image** | | |
| width | 80px | `width: 100%` |
| height | 80px | `height: 100%` |
| border | 1px solid #FFEA9E | `border: 1px solid #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| object-fit | cover | `object-fit: cover` |
| **Remove Button** | | |
| width | 20px | `width: 20px` |
| height | 20px | `height: 20px` |
| border-radius | 71px (circle) | `border-radius: 50%` |
| background | rgba(212, 39, 29, 1) | `background-color: #D4271D` |
| position | absolute, top-right | `position: absolute; top: -4px; right: -4px` |
| padding | ~1.4px | `padding: 1.4px` |
| display | flex | `display: flex; align-items: center; justify-content: center` |
| icon | X/Close 17x17px, white | `color: #FFFFFF` |

**"+ Image" Button (I520:11647;662:9133):** Same style as "+ Hashtag" button (48px height, 4px 8px padding, border #998C5F, radius 8px, bg #FFF, text 11px #999).

**"+ Hashtag" / "+ Image" Button States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFF, border: 1px solid #998C5F |
| Hover | bg: rgba(255, 234, 158, 0.15), transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled (max reached) | opacity: 0.5, cursor: not-allowed, pointer-events: none |

**Image Remove Button States:**
| State | Changes |
|-------|---------|
| Default | bg: #D4271D |
| Hover | bg: #B8221A, transform: scale(1.1), transition 150ms |
| Focus | outline: 2px solid #D4271D, outline-offset: 2px |

**Hashtag Chip (when added):**

| Property | Value | CSS |
|----------|-------|-----|
| height | 32px | `height: 32px` |
| padding | 4px 12px | `padding: 4px 12px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 9999px | `border-radius: 9999px` (pill shape) |
| background | rgba(255, 234, 158, 0.30) | `background-color: rgba(255, 234, 158, 0.30)` |
| font | Montserrat 14px/700 | `font-size: 14px; font-weight: 700` |
| color | #00101A | `color: #00101A` |
| display | inline-flex | `display: inline-flex; align-items: center; gap: 4px` |
| remove-btn | 16x16px circle | `width: 16px; height: 16px; border-radius: 50%` |

**Hashtag Chip States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(255, 234, 158, 0.40) |
| Remove hover | remove button bg: rgba(0, 0, 0, 0.10) |

### G_Anonymous Toggle (I520:11647;520:14099)

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 28px | `height: auto` |
| display | flex | `display: flex; flex-direction: row; gap: 16px; align-items: center` |
| **Checkbox** | | |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| border | 1px solid #999 | `border: 1px solid #999999` |
| border-radius | 4px | `border-radius: 4px` |
| background | #FFF | `background-color: #FFFFFF` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| **Label text** | | |
| font | Montserrat 22px/700 | `font-size: 22px; font-weight: 700; line-height: 28px` |
| color | #999 | `color: #999999` |

**Checkbox States:**
| State | Changes |
|-------|---------|
| Unchecked | bg: #FFF, border: 1px solid #999 |
| Checked | bg: #FFEA9E, border: 1px solid #FFEA9E, checkmark icon visible |
| Hover | border: 1px solid #998C5F |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

### H_Action Buttons (I520:11647;520:9905)

| Property | Value | CSS |
|----------|-------|-----|
| **Container** | | |
| width | 672px | `width: 100%` |
| height | 60px | `height: 60px` |
| display | flex | `display: flex; flex-direction: row; gap: 24px; align-items: flex-start` |

**H.1 Cancel Button (I520:11647;520:9906):**

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

**H.1 Cancel Button States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | bg: rgba(255, 234, 158, 0.20), transition 150ms |
| Active | bg: rgba(255, 234, 158, 0.30) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**H.2 Send Button (I520:11647;520:9907):**

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
| icon | Send 24x24px | Right of text |
| cursor | pointer | `cursor: pointer` |

**H.2 Send Button States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E |
| Hover | bg: #FFE080, transition 150ms |
| Active | bg: #FFD760 |
| Focus | outline: 2px solid #998C5F, outline-offset: 2px |
| Disabled | bg: #FFEA9E at 50% opacity, cursor: not-allowed |
| Loading | Spinner replaces send icon, text: "Dang gui...", disabled |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, min-h-screen)
+-- Header (fixed, top-0, w-full, h-20, bg-rgba(16,20,23,0.80), z-50)
|   (reused from Homepage — same component)
|
+-- Overlay (fixed, inset-0, bg-rgba(0,16,26,0.80), z-40)
|
+-- Modal (fixed, centered, w-[752px], max-h-[90vh], bg-[#FFF8E1], r-3xl, p-10, z-50)
    +-- flex-col, gap-8, overflow-y-auto
    |
    +-- A_Title (w-full, text-center)
    |   "Gui loi cam on va ghi nhan den dong doi"
    |   (Montserrat 32px/700, #00101A, lh: 40px)
    |
    +-- B_Recipient (w-full, flex-row, gap-4, items-center)
    |   +-- B.1_Label (flex, gap-0.5, items-center)
    |   |   "Nguoi nhan" (22px/700, #00101A) + "*" (16px/700, #CF1322)
    |   +-- B.2_Search (flex-1, border-#998C5F, r-2, bg-white, p-4-6)
    |       Placeholder: "Tim kiem" (#999)
    |       Dropdown chevron (24x24, right)
    |
    +-- Badge/Title Field (w-full)
    |   +-- Label + Input (same layout as B)
    |   +-- Helper text (16px/700, #999, mt-1)
    |
    +-- Content (w-full, flex-col, gap-6)
    |   +-- Kudo Editor (flex-col)
    |   |   +-- C_Toolbar (flex-row, h-10)
    |   |   |   +-- C.1 Bold (56x40, border, r: 8px 0 0 0)
    |   |   |   +-- C.2 Italic (56x40, border)
    |   |   |   +-- C.3 Strikethrough (56x40, border)
    |   |   |   +-- C.4 Number List (56x40, border)
    |   |   |   +-- C.5 Link (56x40, border)
    |   |   |   +-- C.6 Quote (56x40, border)
    |   |   |   +-- "Tieu chuan cong dong" (336x40, border, r: 0 8px 0 0, text-right, #E46060)
    |   |   +-- D_Textarea (h-[200px], min-h-[120px], border, r: 0 0 8px 8px, bg-white, pl-6)
    |   +-- D.1_Hint (16px/700, #00101A, ls: 0.5px)
    |
    +-- E_Hashtag (w-full, flex-row, gap-4, items-start)
    |   +-- E.1_Label "Hashtag *" (22px/700)
    |   +-- E.2_Tags (flex-1, flex-row, gap-2, flex-wrap)
    |       +-- [Chip tags with x remove]
    |       +-- "+ Hashtag" button (48px h, border, r-2, bg-white, 11px #999)
    |
    +-- F_Image (w-full, flex-row, gap-4, items-center)
    |   +-- F.1_Label "Image" (22px/700)
    |   +-- Image thumbnails x5 (80x80, r-[18px], border, relative)
    |   |   +-- Inner image (80x80, r-1, border-gold)
    |   |   +-- Remove btn (20x20, circle, bg-red, absolute top-right)
    |   +-- "+ Image" button (same as "+ Hashtag")
    |
    +-- G_Anonymous (w-full, flex-row, gap-4, items-center)
    |   +-- Checkbox (24x24, border-#999, r-1, bg-white)
    |   +-- Label "Gui loi cam on va ghi nhan an danh" (22px/700, #999)
    |
    +-- H_Actions (w-full, flex-row, gap-6)
        +-- H.1_Cancel (border-#998C5F, r-1, bg-gold/10, px-10 py-4)
        |   "Huy" (16px/700) + X icon (24x24)
        +-- H.2_Send (flex-1, bg-#FFEA9E, r-2, py-4, text-center)
            "Gui" (22px/700) + Send icon (24x24)
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
| Modal | width: 100vw, height: 100vh, border-radius: 0, padding: 16px |
| Title | font-size: 24px, line-height: 32px |
| Field labels | font-size: 18px |
| Field layout | Stack label above input (flex-col instead of flex-row) |
| Toolbar | Wrap buttons if needed, reduce padding to 8px |
| Image thumbnails | 64x64px, gap: 8px |
| Action buttons | Stack vertically (flex-col), both full-width |
| Send button | width: 100%, min-height: 48px |
| Cancel button | width: 100%, min-height: 48px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Modal | width: 90vw, max-width: 752px, padding: 24px |
| Title | font-size: 28px |
| Layout | Keep row layout for fields |
| Image thumbnails | 72x72px |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Modal | Match Figma design (752px width, 40px padding) |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design exactly |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Dropdown Chevron | 24x24px | #00101A | Recipient search, badge input right side |
| Bold | 24x24px | #00101A | Toolbar C.1 |
| Italic | 24x24px | #00101A | Toolbar C.2 |
| Strikethrough | 24x24px | #00101A | Toolbar C.3 |
| Numbered List | 24x24px | #00101A | Toolbar C.4 |
| Link | 24x24px | #00101A | Toolbar C.5 |
| Quote | 24x24px | #00101A | Toolbar C.6 |
| Plus | 24x24px | #999 | "+ Hashtag" / "+ Image" buttons |
| Close (X) | 24x24px | #00101A | Cancel button |
| Close Tiny | 17x17px | #FFFFFF | Image remove button (inside red circle) |
| Send | 24x24px | #00101A | Send button |
| Checkmark | 16x16px | #00101A | Checkbox checked state |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Overlay | opacity | 200ms | ease-out | Modal open/close |
| Modal | opacity, transform (translateY) | 200ms | ease-out | Modal open (slide up from +20px) |
| Toolbar Button | background-color | 150ms | ease-in-out | Hover |
| Cancel Button | background-color | 150ms | ease-in-out | Hover |
| Send Button | background-color | 150ms | ease-in-out | Hover |
| Input Focus | border-color | 150ms | ease-in-out | Focus |
| Dropdown | opacity, max-height | 150ms | ease-out | Open/close |
| Hashtag Chip | opacity, transform | 150ms | ease-out | Add/remove |
| Image Thumbnail | opacity | 200ms | ease-in | Upload complete |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Overlay | 520:11646 | `fixed inset-0 bg-[#00101A]/80 z-40` | `<KudoModalOverlay />` |
| Modal | 520:11647 | `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[752px] max-h-[90vh] bg-[#FFF8E1] rounded-3xl p-10 z-50 flex flex-col gap-8 overflow-y-auto` | `<KudoModal />` (Client) |
| Title | I520:11647;520:9870 | `w-full text-center text-[32px] font-bold leading-10 text-[#00101A] font-montserrat` | Heading in modal |
| Recipient | I520:11647;520:9871 | `w-full flex flex-row gap-4 items-center` | `<RecipientSearch />` (Client) |
| Badge | I520:11647;1688:10448 | `w-full` | `<BadgeField />` |
| Toolbar | I520:11647;520:9877 | `w-full h-10 flex items-center` | `<EditorToolbar />` (Client) |
| Toolbar Button | C.1-C.6 | `h-10 px-4 py-2.5 border border-[#998C5F] bg-transparent flex items-center justify-center` | `<ToolbarButton />` |
| Editor | I520:11647;520:9886 | `w-full h-[200px] min-h-[120px] border border-[#998C5F] rounded-b-lg bg-white pl-6` | `<RichTextEditor />` (Client) |
| Hashtag | I520:11647;520:9890 | `w-full flex flex-row gap-4 items-start` | `<HashtagField />` (Client) |
| Image Row | I520:11647;520:9896 | `w-full flex flex-row gap-4 items-center` | `<ImageUploadRow />` (Client) |
| Image Thumb | e.g., I520:11647;662:9197 | `relative w-20 h-20 rounded-[18px] border border-[#998C5F] bg-white` | `<ImageThumbnail />` |
| Remove Btn | e.g., I520:11647;662:9197;662:9287 | `absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4271D] flex items-center justify-center` | `<button />` |
| Anonymous | I520:11647;520:14099 | `w-full flex flex-row gap-4 items-center` | `<AnonymousToggle />` (Client) |
| Cancel | I520:11647;520:9906 | `border border-[#998C5F] rounded bg-[#FFEA9E]/10 px-10 py-4 flex items-center gap-2 font-montserrat text-base font-bold` | `<button />` |
| Send | I520:11647;520:9907 | `flex-1 h-[60px] bg-[#FFEA9E] rounded-lg py-4 flex items-center justify-center gap-2 font-montserrat text-[22px] font-bold` | `<button />` |

---

## Notes

- The modal background `#FFF8E1` is a warm cream/yellow that creates visual warmth for the appreciation context. This is intentionally different from the page's dark `#00101A`.
- The toolbar and editor are visually connected (no gap), creating a single "editor block" with the toolbar as the top border and the textarea as the bottom. The toolbar has `border-radius: 8px 8px 0 0` (top rounded) and the editor has `border-radius: 0 0 8px 8px` (bottom rounded). **Toolbar layout**: formatting buttons (C.1–C.6) sit on the left, each with a fixed width (~56px). The "Tiêu chuẩn cộng đồng" link section (336px) fills the remaining space on the right. Together they span the full 672px content width.
- The "Tieu chuan cong dong" text in coral red (`#E46060`) stands out intentionally as a moderation/policy link. It should open community guidelines (external or internal page).
- Image thumbnails have a double-border effect: outer container has `border: 1px solid #998C5F` with `border-radius: 18px`, inner image has `border: 1px solid #FFEA9E` with `border-radius: 4px`. The difference in border-radius creates a visible "frame" effect.
- The Send button at 502px wide takes up most of the action row, emphasizing it as the primary action. The Cancel button is narrower and uses a subdued outline style.
- Field labels at 22px/700 are unusually large for form labels — this is a deliberate design choice to make the form feel more like a guided flow than a dense data entry form.
- The asterisk for required fields uses Noto Sans JP font (not Montserrat) — this appears to be for better glyph rendering of the asterisk character. Ensure this font is loaded or substitute with a CSS-rendered asterisk.
- **Field layout at desktop is side-by-side**: Labels (B.1, "Danh hiệu", E.1, F.1) are positioned on the LEFT with the input/control on the RIGHT (`flex-row`, `gap: 16px`, `align-items: center`). On mobile, these should stack vertically (`flex-col`). This is visible in the Figma frame for Recipient, Badge, Hashtag, and Image fields.
- **"Tiêu chuẩn cộng đồng" link**: The coral red text (`#E46060`) in the toolbar right section is a clickable link that navigates to the community standards page (dedicated route).
