# Design Style: Dropdown Profile (Regular User)

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Container border |
| --color-item-active-bg | rgba(255, 234, 158, 0.10) | 10% | Active item background (Profile) |
| --color-item-hover-bg | rgba(255, 234, 158, 0.10) | 10% | Hovered item background |
| --color-item-default-bg | transparent | 0% | Default item background (Logout) |
| --color-text-white | #FFFFFF | 100% | Item text |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow on active item |
| --color-accent-gold | #FFEA9E | 100% | Focus indicator |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-dropdown-item | Montserrat | 16px | 700 | 24px | 0.15px | Item text ("Profile", "Logout") |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow on active item text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --border-dropdown | 1px solid #998C5F | Container border |
| --radius-dropdown | 8px | Container border-radius |
| --radius-item | 4px | Item border-radius |

---

## Layout Specifications

### Layout Structure (ASCII)

```
┌───────────────────────────────────┐
│  Dropdown Container                │
│  (border: 1px solid #998C5F)      │
│  (bg: #00070C, r: 8px, p: 6px)   │
│                                    │
│  ┌───────────────────────────────┐ │
│  │ A.1 [👤 user icon] "Profile"  │ │
│  │ (active: bg gold/10%)         │ │
│  │ (119×56px, px: 16px)          │ │
│  │ (r: 4px, gold glow text)     │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ A.2 [→ chevron] "Logout"     │ │
│  │ (default: transparent bg)     │ │
│  │ (121×56px, px: 16px)          │ │
│  │ (white text, no glow)        │ │
│  └───────────────────────────────┘ │
└───────────────────────────────────┘
```

---

## Component Style Details

### A (666:9601) — Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 666:9601 | - |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 6px | `padding: 6px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| position | absolute | `position: absolute` |
| z-index | 50 | `z-index: 50` |

### A.1 (Profile) — Active State Item

| Property | Value | CSS |
|----------|-------|-----|
| width | 119px | `width: auto` (fit-content, min ~119px) |
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 0.10) | `background-color: rgba(255, 234, 158, 0.10)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow |

**Icon:** User icon, 24x24px, #FFFFFF

### A.2 (Logout) — Default State Item

| Property | Value | CSS |
|----------|-------|-----|
| width | 121px | `width: auto` (fit-content, min ~121px) |
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background-color: transparent` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | none | No glow |

All other properties same as A.1. **Icon:** Chevron-right, 24x24px, #FFFFFF.

---

## Component States

### Item States

| State | Background | Text Color | Text Shadow |
|-------|------------|------------|-------------|
| Default | transparent | #FFFFFF | none |
| Hover | rgba(255, 234, 158, 0.10) | #FFFFFF | none |
| Active (current page) | rgba(255, 234, 158, 0.10) | #FFFFFF | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | current bg | #FFFFFF | current | outline: 2px solid #FFEA9E, offset: 2px |

---

## Responsive Specifications

The dropdown is a small overlay. No structural changes across breakpoints. On mobile, ensure right-alignment to prevent viewport overflow.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform (translateY -4px to 0) | 150ms | ease-out | Open |
| Dropdown | opacity, transform (0 to translateY -4px) | 100ms | ease-in | Close |
| Item | background-color | 150ms | ease-in-out | Hover |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| User Icon | 24x24px | #FFFFFF | Profile item |
| Chevron Right | 24x24px | #FFFFFF | Logout item |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Container | 666:9601 | `absolute z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col` | `<ProfileDropdown />` (Client) |
| Active Item | A.1 | `h-14 px-4 rounded bg-[#FFEA9E]/10 flex items-center gap-2 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<ProfileMenuItem />` |
| Default Item | A.2 | `h-14 px-4 rounded bg-transparent flex items-center gap-2 hover:bg-[#FFEA9E]/10` | `<ProfileMenuItem />` |
| Item Text | - | `font-montserrat text-base font-bold text-white tracking-[0.15px]` | `<span>` |
| Icon | - | `w-6 h-6 text-white` | SVG icon component |
