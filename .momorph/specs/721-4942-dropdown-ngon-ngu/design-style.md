# Design Style: Dropdown Language Selector

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Container border |
| --color-item-selected-bg | rgba(255, 234, 158, 0.20) | 20% | Selected item background |
| --color-item-hover-bg | rgba(255, 234, 158, 0.10) | 10% | Hovered item background |
| --color-item-default-bg | transparent | 0% | Default item background |
| --color-text-white | #FFFFFF | 100% | Default item text |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow on selected item |
| --color-accent-gold | #FFEA9E | 100% | Focus indicator |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-dropdown-item | Montserrat | 16px | 700 | 24px | 0.15px | Dropdown item text ("VN", "EN") |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow on selected item text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --border-dropdown | 1px solid #998C5F | Container border |
| --radius-dropdown | 8px | Container border-radius |
| --radius-item | 4px | Item border-radius |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | auto (fit-content) | Sized by content |
| padding | 6px | Inner padding around items |
| gap | 0px | Items stack with no gap |
| flex-direction | column | Vertical list |

### Layout Structure (ASCII)

```
┌─────────────────────────────────┐
│  Dropdown Container              │
│  (border: 1px solid #998C5F)    │
│  (bg: #00070C, r: 8px, p: 6px) │
│                                  │
│  ┌─────────────────────────────┐ │
│  │ A.1 [🇻🇳 flag] "VN"        │ │
│  │ (selected: bg gold/20%)     │ │
│  │ (56px height, px: 16px)     │ │
│  │ (r: 4px, gold glow text)   │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │ A.2 [🇬🇧 flag] "EN"        │ │
│  │ (default: transparent bg)   │ │
│  │ (56px height, px: 16px)     │ │
│  │ (white text, no glow)       │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## Component Style Details

### A (525:11713) — Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 525:11713 | - |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 6px | `padding: 6px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| position | absolute | `position: absolute` (anchored to trigger) |
| z-index | 50 | `z-index: 50` |

### A.1 — Language Item (Selected State: "VN")

| Property | Value | CSS |
|----------|-------|-----|
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 0.20) | `background-color: rgba(255, 234, 158, 0.20)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` (between flag and text) |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow effect |

**Flag icon:**
| Property | Value |
|----------|-------|
| size | 24x24px |
| border-radius | 2px (optional, for flag rounding) |

### A.2 — Language Item (Default State: "EN")

| Property | Value | CSS |
|----------|-------|-----|
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background-color: transparent` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | none | No glow |

All other properties same as A.1.

---

## Component States

### Item States

| State | Background | Text Color | Text Shadow | Border |
|-------|------------|------------|-------------|--------|
| Default | transparent | #FFFFFF | none | none |
| Hover | rgba(255, 234, 158, 0.10) | #FFFFFF | none | none |
| Selected | rgba(255, 234, 158, 0.20) | #FFFFFF | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | none |
| Focus | transparent | #FFFFFF | none | outline: 2px solid #FFEA9E, offset: 2px |
| Selected + Focus | rgba(255, 234, 158, 0.20) | #FFFFFF | gold glow | outline: 2px solid #FFEA9E, offset: 2px |

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Tailwind Prefix |
|------|-----------|-----------------|
| Mobile | 0 | (default) |
| Tablet | 768px | md: |
| Desktop | 1024px | lg: |
| Wide | 1280px | xl: |

### Responsive Changes

The dropdown is a small overlay and does not change structure across breakpoints. Positioning adjusts relative to the header trigger.

| Breakpoint | Changes |
|------------|---------|
| Mobile | Dropdown may need right-alignment to avoid overflow. Touch targets already 56px height (>44px minimum). |
| Tablet+ | No changes. |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform (translateY -4px to 0) | 150ms | ease-out | Open |
| Dropdown | opacity, transform (0 to translateY -4px) | 100ms | ease-in | Close |
| Item | background-color | 150ms | ease-in-out | Hover |

---

## Icon Specifications

| Icon Name | Size | Source | Usage |
|-----------|------|--------|-------|
| Vietnam Flag | 24x24px | Static asset or emoji | VN item |
| UK Flag | 24x24px | Static asset or emoji | EN item |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Container | 525:11713 | `absolute z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col` | `<LanguageDropdown />` (Client) |
| Selected Item | A.1 | `h-14 px-4 rounded bg-[#FFEA9E]/20 flex items-center gap-2 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<LanguageOption />` |
| Default Item | A.2 | `h-14 px-4 rounded bg-transparent flex items-center gap-2 hover:bg-[#FFEA9E]/10` | `<LanguageOption />` |
| Item Text | - | `font-montserrat text-base font-bold text-white tracking-[0.15px]` | `<span>` |
| Flag Icon | - | `w-6 h-6` | `<Image />` (next/image) |

---

## Notes

- The dropdown is anchored below the language trigger in the header. Ensure proper positioning with `absolute` relative to a `relative` parent wrapper.
- Flag icons should be static image assets (SVG or PNG) rather than emoji for consistent cross-browser rendering.
- The selected item background uses `rgba(255, 234, 158, 0.20)` (20% opacity) which is slightly more visible than the hover state at 10%.
