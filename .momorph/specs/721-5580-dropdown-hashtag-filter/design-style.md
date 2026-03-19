# Design Style: Dropdown Hashtag Filter

**Frame ID**: `721:5580`
**Frame Name**: `Dropdown Hashtag filter`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Container border |
| --color-item-selected-bg | rgba(255, 234, 158, 0.20) | 20% | Selected hashtag background |
| --color-item-hover-bg | rgba(255, 234, 158, 0.10) | 10% | Hovered item background |
| --color-item-default-bg | transparent | 0% | Default item background |
| --color-text-white | #FFFFFF | 100% | Default item text |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow on selected item |
| --color-accent-gold | #FFEA9E | 100% | Focus indicator |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-dropdown-item | Montserrat | 16px | 700 | 24px | 0.5px | Hashtag item text |

Note: Letter-spacing is **0.5px** for hashtag items (differs from 0.15px used in profile/language dropdowns).

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
| width | auto (fit-content) | Sized by longest hashtag text |
| max-height | ~400px | Scrollable when content exceeds |
| padding | 6px | Inner padding around items |
| flex-direction | column | Vertical list |
| overflow-y | auto | Scrollable |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────┐
│  Dropdown Container                   │
│  (border: 1px solid #998C5F)         │
│  (bg: #00070C, r: 8px, p: 6px)      │
│  (overflow-y: auto, max-h: ~400px)   │
│                                       │
│  ┌──────────────────────────────────┐ │
│  │ A.1 "#Dedicated" (Cống hiến)     │ │
│  │ (selected: bg gold/20%, glow)    │ │
│  │ (135×56px, px: 16px, r: 4px)    │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │ A.2 "#Inspiring" (Truyền c.h.)   │ │
│  │ (default: transparent bg)         │ │
│  │ (118×56px, px: 16px, r: 4px)    │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │ A.3 "#Aim High"                   │ │
│  │ (default)                         │ │
│  └──────────────────────────────────┘ │
│  │ ... (scrollable, 13 items total)  │ │
│  ┌──────────────────────────────────┐ │
│  │ A.13 "#Quản lý xuất sắc"         │ │
│  │ (default)                         │ │
│  └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

---

## Component Style Details

### A (563:8026) — Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 563:8026 | - |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 6px | `padding: 6px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| overflow-y | auto | `overflow-y: auto` |
| max-height | ~400px | Limits visible area, enables scroll |
| position | absolute | `position: absolute` |
| z-index | 50 | `z-index: 50` |

**Scrollbar styling:** Use thin scrollbar with dark track and gold thumb for consistency with the dark theme. Consider `scrollbar-width: thin` or custom WebKit scrollbar styles.

### A.1 — Hashtag Item (Selected State)

| Property | Value | CSS |
|----------|-------|-----|
| width | auto (e.g., 135px for "#Dedicated") | `width: 100%` (fills container) |
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 0.20) | `background-color: rgba(255, 234, 158, 0.20)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow |
| white-space | nowrap | `white-space: nowrap` |

### A.2+ — Hashtag Item (Default State)

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

| State | Background | Text Color | Text Shadow |
|-------|------------|------------|-------------|
| Default | transparent | #FFFFFF | none |
| Hover | rgba(255, 234, 158, 0.10) | #FFFFFF | none |
| Selected | rgba(255, 234, 158, 0.20) | #FFFFFF | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | current bg | #FFFFFF | current | outline: 2px solid #FFEA9E, offset: 2px |

---

## Responsive Specifications

The dropdown is a small overlay. No structural changes across breakpoints.

| Breakpoint | Changes |
|------------|---------|
| Mobile | May need full-width or adjusted positioning. Touch scroll for the list. Touch targets already 56px (>44px). |
| Tablet+ | No changes. |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform (translateY -4px to 0) | 150ms | ease-out | Open |
| Dropdown | opacity, transform (0 to translateY -4px) | 100ms | ease-in | Close |
| Item | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Container | 563:8026 | `absolute z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[400px]` | `<HashtagFilterDropdown />` (Client) |
| Selected Item | A.1 | `h-14 px-4 rounded bg-[#FFEA9E]/20 flex items-center whitespace-nowrap [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<HashtagOption />` |
| Default Item | A.2+ | `h-14 px-4 rounded bg-transparent flex items-center whitespace-nowrap hover:bg-[#FFEA9E]/10` | `<HashtagOption />` |
| Item Text | - | `font-montserrat text-base font-bold text-white tracking-[0.5px]` | `<span>` |

---

## Notes

- Letter-spacing for hashtag items is **0.5px** (not 0.15px as in profile/language dropdowns). This matches the `--text-body` token.
- The container width adapts to the longest hashtag text. The longest item is likely "#Giải pháp sáng tạo" or "#Quản lý xuất sắc".
- Custom scrollbar styling should match the dark theme: `scrollbar-color: #998C5F #00070C` or equivalent WebKit styles.
- Items use `white-space: nowrap` since hashtag text should not wrap.
