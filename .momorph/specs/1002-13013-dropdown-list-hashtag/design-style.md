# Design Style: Dropdown List Hashtag (Hashtag Selection)

**Frame ID**: `1002:13013`
**Frame Name**: `Dropdown List Hashtag`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-trigger-bg | #FFFFFF | 100% | Trigger button background |
| --color-trigger-text | #999999 | 100% | Trigger button text color |
| --color-trigger-border | #998C5F | 100% | Trigger button border |
| --color-dropdown-bg | #00070C | 100% | Dropdown container background (dark) |
| --color-dropdown-border | #998C5F | 100% | Dropdown container border |
| --color-item-text | #FFFFFF | 100% | Hashtag item text color |
| --color-item-selected-bg | rgba(255, 234, 158, 0.20) | 20% | Selected item background (gold tint) |
| --color-item-hover-bg | rgba(255, 255, 255, 0.05) | 5% | Hovered item background |
| --color-item-disabled-text | rgba(255, 255, 255, 0.40) | 40% | Disabled item text (at max limit) |
| --color-check-circle | #4CAF50 | 100% | Check icon green circle background |
| --color-check-icon | #FFFFFF | 100% | Check icon white checkmark |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-trigger | Montserrat | 11px | 700 | 16px | 0.5px | Trigger button text ("+ Hashtag / Toi da 5") |
| --text-item | Montserrat | 16px | 700 | 24px | 0.15px | Hashtag item text |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-trigger-padding-x | 8px | Trigger button horizontal padding |
| --spacing-trigger-padding-y | 4px | Trigger button vertical padding |
| --spacing-dropdown-padding | 6px | Dropdown container internal padding |
| --spacing-item-padding-x | 16px | Item horizontal padding |
| --spacing-item-padding-y | 0px | Item vertical padding (height-driven) |
| --spacing-trigger-gap | 4px | Gap between icon and text in trigger |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-trigger | 8px | Trigger button corners |
| --radius-dropdown | 8px | Dropdown container corners |
| --radius-item | 2px | Item row corners |
| --border-trigger | 1px solid #998C5F | Trigger button border |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-dropdown | 0 4px 16px rgba(0, 0, 0, 0.30) | Dropdown container shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| trigger-width | 116px | Trigger button width |
| trigger-height | 48px | Trigger button height |
| dropdown-width | 318px | Dropdown container width |
| dropdown-max-height | 400px | Max height before scroll |
| item-width | 306px | Item width (318 - 2*6px padding) |
| item-height | 40px | Individual item height |

### Layout Structure (ASCII)

```
+-- Hashtag Section (in parent Kudo form) -------------------------+
|                                                                    |
|  +----------+  +-----------------------------------------------+ |
|  | Label     |  | Tag Group (flex-row, gap-8, flex-wrap)        | |
|  | "Hashtag" |  |                                               | |
|  | 22px/700  |  |  [selected chip 1] [selected chip 2] ...     | |
|  |           |  |                                               | |
|  |           |  |  +---------+                                  | |
|  |           |  |  | Trigger |  <-- 116x48px                   | |
|  |           |  |  | [+] Hashtag                                | |
|  |           |  |  |     Toi da 5                                | |
|  |           |  |  +---------+                                  | |
|  |           |  |  |                                            | |
|  |           |  |  v (dropdown appears below)                   | |
|  +----------+  |  +--------------------------------------+     | |
|                 |  | Dropdown (318px, bg: #00070C)        |     | |
|                 |  | r-8, border: 1px #998C5F, p-[6px]   |     | |
|                 |  |                                      |     | |
|                 |  | +----------------------------------+|     | |
|                 |  | | A: Selected Item (306x40px)      ||     | |
|                 |  | | bg: rgba(255,234,158,0.20), r-2  ||     | |
|                 |  | | "Hieu suat cao"     [check icon] ||     | |
|                 |  | | 16px/700, #FFF       24x24       ||     | |
|                 |  | +----------------------------------+|     | |
|                 |  | +----------------------------------+|     | |
|                 |  | | B: Selected Item                  ||     | |
|                 |  | | "Truyen cam hung"   [check icon]  ||     | |
|                 |  | +----------------------------------+|     | |
|                 |  | +----------------------------------+|     | |
|                 |  | | C: Selected Item                  ||     | |
|                 |  | | "Cong hien"         [check icon]  ||     | |
|                 |  | +----------------------------------+|     | |
|                 |  | +----------------------------------+|     | |
|                 |  | | D: Unselected Item                ||     | |
|                 |  | | "Aim High"          (no icon)     ||     | |
|                 |  | | bg: transparent                   ||     | |
|                 |  | +----------------------------------+|     | |
|                 |  | +----------------------------------+|     | |
|                 |  | | E: Unselected Item                ||     | |
|                 |  | | "Be Agile"          (no icon)     ||     | |
|                 |  | +----------------------------------+|     | |
|                 |  | ...                                  |     | |
|                 |  +--------------------------------------+     | |
|                 +-----------------------------------------------+ |
+--------------------------------------------------------------------+
```

---

## Component Style Details

### Trigger Button (1002:15114)

| Property | Value | CSS |
|----------|-------|-----|
| width | 116px | `width: 116px` |
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFF | `background-color: #FFFFFF` |
| display | flex | `display: flex; align-items: center; gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Trigger Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 11px | `font-size: 11px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 16px | `line-height: 16px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #999 | `color: #999999` |

**Trigger Icon (Plus):**

| Property | Value | CSS |
|----------|-------|-----|
| size | 24x24px | `width: 24px; height: 24px` |
| color | #999 | `color: #999999` |

**Trigger States:**

| State | Changes |
|-------|---------|
| Default | bg: #FFF, border: 1px solid #998C5F |
| Hover | bg: #F5F5F5, transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active/Open | bg: #F0F0F0, border: 1px solid #FFEA9E |
| Disabled (max reached) | opacity: 0.5, cursor: not-allowed |

### Dropdown Container (1002:13102)

| Property | Value | CSS |
|----------|-------|-----|
| width | 318px | `width: 318px` |
| max-height | 400px | `max-height: 400px` |
| padding | 6px | `padding: 6px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| background | #00070C | `background-color: #00070C` |
| box-shadow | 0 4px 16px rgba(0,0,0,0.30) | `box-shadow: 0 4px 16px rgba(0,0,0,0.30)` |
| overflow-y | auto | `overflow-y: auto` |
| position | absolute | `position: absolute; top: calc(100% + 4px); left: 0; z-index: 60` |

### Selected Item (A, B, C pattern)

| Property | Value | CSS |
|----------|-------|-----|
| width | 306px | `width: 100%` |
| height | 40px | `height: 40px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 2px | `border-radius: 2px` |
| background | rgba(255, 234, 158, 0.20) | `background-color: rgba(255, 234, 158, 0.20)` |
| display | flex | `display: flex; align-items: center; justify-content: space-between` |
| cursor | pointer | `cursor: pointer` |

**Selected Item Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFF | `color: #FFFFFF` |

**Check Icon (in selected items):**

| Property | Value | CSS |
|----------|-------|-----|
| size | 24x24px | `width: 24px; height: 24px` |
| shape | Circle with checkmark | Green circle bg + white check |
| circle-color | #4CAF50 | `background-color: #4CAF50; border-radius: 50%` |
| check-color | #FFF | `color: #FFFFFF` |

### Unselected Item (D+ pattern)

| Property | Value | CSS |
|----------|-------|-----|
| width | 306px | `width: 100%` |
| height | 40px | `height: 40px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 2px | `border-radius: 2px` |
| background | transparent | `background-color: transparent` |
| display | flex | `display: flex; align-items: center` |
| cursor | pointer | `cursor: pointer` |
| font | Same as selected item | Montserrat 16px/700, #FFF, 0.15px |

**Item States:**

| State | Changes |
|-------|---------|
| Default (unselected) | bg: transparent, no check icon |
| Hover | bg: rgba(255, 255, 255, 0.05), transition 150ms |
| Selected | bg: rgba(255, 234, 158, 0.20), check icon visible |
| Selected + Hover | bg: rgba(255, 234, 158, 0.30) |
| Focused (keyboard) | outline: 2px solid #FFEA9E, outline-offset: -2px |
| Disabled (at max limit) | color: rgba(255, 255, 255, 0.40), cursor: not-allowed, no hover effect |

---

## Component Hierarchy with Styles

```
HashtagDropdown (relative, inline-block)
+-- Trigger (w-[116px], h-12, border-#998C5F, r-2, bg-white, px-2 py-1)
|   +-- Plus Icon (24x24, #999)
|   +-- Text "Hashtag\nToi da 5" (11px/700, #999, ls: 0.5px)
|
+-- Dropdown (absolute, top-full+1, left-0, w-[318px], max-h-[400px])
    +-- Container (bg-[#00070C], border-#998C5F, r-2, p-1.5, shadow-lg, overflow-y-auto)
    |
    +-- Item[0] — Selected (w-full, h-10, bg-[#FFEA9E]/20, r-[2px], px-4)
    |   +-- Text "Hieu suat cao" (Montserrat 16px/700, #FFF, ls: 0.15px)
    |   +-- CheckIcon (24x24, green circle + white check)
    |
    +-- Item[1] — Selected (same as above)
    |   +-- Text "Truyen cam hung"
    |   +-- CheckIcon
    |
    +-- Item[2] — Selected (same as above)
    |   +-- Text "Cong hien"
    |   +-- CheckIcon
    |
    +-- Item[3] — Unselected (w-full, h-10, bg-transparent, r-[2px], px-4)
    |   +-- Text "Aim High" (Montserrat 16px/700, #FFF)
    |   (no check icon)
    |
    +-- Item[4..12] — Unselected (same pattern)
        ...
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
| Trigger | Same size (116x48px) — already compact |
| Dropdown | width: calc(100vw - 32px), max-width: 318px, position: fixed or adjusted to not overflow viewport |
| Dropdown position | May need to open upward if near bottom of screen |
| Items | Touch targets already 40px height (meets 44px min with padding) — consider increasing to 44px |
| Max height | max-height: 60vh to prevent dropdown from exceeding screen |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Dropdown | Same as desktop (318px width) |
| Position | Ensure dropdown stays within viewport bounds |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design exactly |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Plus | 24x24px | #999999 | Trigger button |
| Check Circle | 24x24px | Circle: #4CAF50, Check: #FFFFFF | Selected item indicator |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform (translateY -4px to 0) | 150ms | ease-out | Open |
| Dropdown | opacity, transform (0 to translateY -4px) | 100ms | ease-in | Close |
| Item | background-color | 150ms | ease-in-out | Hover/Select |
| Check Icon | opacity, scale (0.8 to 1) | 150ms | ease-out | Select |
| Check Icon | opacity, scale (1 to 0.8) | 100ms | ease-in | Deselect |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Wrapper | — | `relative inline-block` | `<HashtagDropdown />` (Client) |
| Trigger | 1002:15114 | `w-[116px] h-12 border border-[#998C5F] rounded-lg bg-white px-2 py-1 flex items-center gap-1 cursor-pointer` | `<button />` |
| Trigger Text | — | `font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[#999]` | `<span />` |
| Dropdown | 1002:13102 | `absolute top-full mt-1 left-0 w-[318px] max-h-[400px] bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] overflow-y-auto z-[60]` | `<div role="listbox" />` |
| Selected Item | A, B, C | `w-full h-10 bg-[#FFEA9E]/20 rounded-[2px] px-4 flex items-center justify-between cursor-pointer` | `<div role="option" aria-selected="true" />` |
| Unselected Item | D+ | `w-full h-10 bg-transparent rounded-[2px] px-4 flex items-center cursor-pointer` | `<div role="option" aria-selected="false" />` |
| Item Text | — | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` | `<span />` |
| Check Icon | — | `w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center` | `<span />` with SVG check |

---

## Notes

- The dark dropdown background (`#00070C`) is nearly black and close to the page background (`#00101A`). This creates a "floating dark panel" effect that contrasts with the warm cream modal behind it.
- The gold-tinted selected background (`rgba(255, 234, 158, 0.20)`) is subtle on the dark background. It provides just enough differentiation from unselected items without being visually heavy.
- The green check circle icon is the strongest selection indicator — it uses a bright green (`#4CAF50`) that stands out clearly against both the dark background and the gold-tinted background.
- Selected items appear at their natural position in the list (not sorted to the top) based on the design. However, the design shows selected items grouped at the top (A, B, C) — implementation should sort selected items to the top of the list.
- The trigger button reuses the exact same style as the "+ Hashtag" button defined in the parent Viet Kudo design-style (11px/700 text, 116x48px, border `#998C5F`, radius 8px, white bg).
- Item height at 40px is slightly below the 44px touch target minimum for mobile. Consider adding extra vertical padding on mobile breakpoints.
- With 13 items at 40px each, total content height is 520px + 12px padding = 532px, which exceeds the 400px max-height. The dropdown will scroll on all breakpoints when all items are visible.
