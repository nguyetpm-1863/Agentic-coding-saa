# Design Style: Dropdown Department Filter (Phong ban)

**Frame ID**: `721:5684`
**Frame Name**: `Dropdown Phòng ban`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Container border |
| --color-item-selected-bg | rgba(255, 234, 158, 0.20) | 20% | Selected department background |
| --color-item-hover-bg | rgba(255, 234, 158, 0.10) | 10% | Hovered item background |
| --color-item-default-bg | transparent | 0% | Default item background |
| --color-text-white | #FFFFFF | 100% | Default item text |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow on selected item |
| --color-accent-gold | #FFEA9E | 100% | Focus indicator |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-dropdown-item | Montserrat | 16px | 700 | 24px | 0.5px | Department item text |

Note: Letter-spacing is **0.5px** (same as Hashtag Filter, differs from 0.15px in profile/language dropdowns).

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
| content-width | 101px | Figma content area width |
| content-height | 348px | Visible scroll area height |
| padding | 6px | Inner padding around items |
| flex-direction | column | Vertical list |
| overflow-y | auto | Scrollable (50 items) |

### Layout Structure (ASCII)

```
┌────────────────────────────────────────┐
│  Dropdown Container                     │
│  (border: 1px solid #998C5F)           │
│  (bg: #00070C, r: 8px, p: 6px)        │
│  (overflow-y: auto, h: ~348px content) │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │ A.1 "CEVC2"                        │ │
│  │ (selected: bg gold/20%, glow)      │ │
│  │ (56px height, px: 16px, r: 4px)   │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │ A.2 "CEVC3"                        │ │
│  │ (default: transparent bg)           │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │ A.3 "CEVC4"                        │ │
│  │ (default)                           │ │
│  └────────────────────────────────────┘ │
│  │ ... (scrollable, 50 items total)    │ │
│  ┌────────────────────────────────────┐ │
│  │ A.50 "PAO - PAO"                   │ │
│  │ (default)                           │ │
│  └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

## Component Style Details

### A (563:8027) — Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 563:8027 | - |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 6px | `padding: 6px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| overflow-y | auto | `overflow-y: auto` |
| max-height | 360px | 348px content + 12px padding |
| position | absolute | `position: absolute` |
| z-index | 50 | `z-index: 50` |

**Scrollbar styling:** Thin scrollbar with dark track and gold-muted thumb. `scrollbar-width: thin; scrollbar-color: #998C5F #00070C`.

### A.1 — Department Item (Selected State)

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | Fills container width |
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

### A.2, A.3+ — Department Item (Default State)

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
| Mobile | May need adjusted positioning to avoid viewport overflow. Touch scroll enabled. Touch targets 56px (>44px). Container width may expand to fit longer department names. |
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
| Container | 563:8027 | `absolute z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col overflow-y-auto max-h-[360px]` | `<DepartmentFilterDropdown />` (Client) |
| Selected Item | A.1 | `h-14 px-4 rounded bg-[#FFEA9E]/20 flex items-center whitespace-nowrap [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<DepartmentOption />` |
| Default Item | A.2+ | `h-14 px-4 rounded bg-transparent flex items-center whitespace-nowrap hover:bg-[#FFEA9E]/10` | `<DepartmentOption />` |
| Item Text | - | `font-montserrat text-base font-bold text-white tracking-[0.5px]` | `<span>` |

---

## Notes

- The Figma content area is 101x348px, which is quite narrow. The actual implementation width should be `auto`/`fit-content` to accommodate longer department names like "CEVC1 - DSV - UI/UX 1" or "OPDC - HRD - HRBP".
- With 50 items at 56px each, the total scroll height is ~2800px. Standard scroll is sufficient per constitution Principle VII (Simplicity) — only add virtualization if measured performance is poor.
- Department names are organizational codes and are NOT translated (i18n not needed for item content).
- The Department and Hashtag filter dropdowns share nearly identical styling. Consider extracting a shared `<FilterDropdown />` base component that accepts items and a renderItem function.
- Custom scrollbar styling should match: `scrollbar-color: #998C5F #00070C` for dark theme consistency.
