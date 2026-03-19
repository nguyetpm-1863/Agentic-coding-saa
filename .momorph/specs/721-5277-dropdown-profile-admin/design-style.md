# Design Style: Dropdown Profile Admin

**Frame ID**: `721:5277`
**Frame Name**: `Dropdown-profile Admin`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

Shares all tokens with the regular Profile Dropdown. See [721-5223-dropdown-profile/design-style.md](../721-5223-dropdown-profile/design-style.md) for the full token table.

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Container border |
| --color-item-active-bg | rgba(255, 234, 158, 0.10) | 10% | Active item background |
| --color-item-default-bg | transparent | 0% | Default item background |
| --color-text-white | #FFFFFF | 100% | Item text |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow on active item |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-dropdown-item | Montserrat | 16px | 700 | 24px | 0.15px | Item text |

---

## Layout Specifications

### Layout Structure (ASCII)

```
┌───────────────────────────────────────┐
│  Dropdown Container                    │
│  (border: 1px solid #998C5F)          │
│  (bg: #00070C, r: 8px, p: 6px)       │
│                                        │
│  ┌───────────────────────────────────┐ │
│  │ A.1 [👤 user icon] "Profile"      │ │
│  │ (active: bg gold/10%, gold glow)  │ │
│  │ (56px height, px: 16px, r: 4px)  │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ A.2 [⊞ grid icon] "Dashboard"    │ │
│  │ (default: transparent bg)         │ │
│  │ (56px height, px: 16px, r: 4px)  │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ A.3 [→ chevron] "Logout"         │ │
│  │ (default: transparent bg)         │ │
│  │ (56px height, px: 16px, r: 4px)  │ │
│  └───────────────────────────────────┘ │
└───────────────────────────────────────┘
```

---

## Component Style Details

### A (666:9728) — Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 666:9728 | - |
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
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 0.10) | `background-color: rgba(255, 234, 158, 0.10)` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| font | Montserrat 16px/24px 700 | `font-montserrat text-base font-bold` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow |

**Icon:** User icon, 24x24px, #FFFFFF

### A.2 (Dashboard) — Default State Item

| Property | Value | CSS |
|----------|-------|-----|
| height | 56px | `height: 56px` |
| padding | 0 16px | `padding: 0 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background-color: transparent` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | none | No glow |

**Icon:** Dashboard grid icon, 24x24px, #FFFFFF

### A.3 (Logout) — Default State Item

Same styling as A.2. **Icon:** Chevron-right, 24x24px, #FFFFFF.

---

## Component States

Same state definitions as regular Profile Dropdown:

| State | Background | Text Color | Text Shadow |
|-------|------------|------------|-------------|
| Default | transparent | #FFFFFF | none |
| Hover | rgba(255, 234, 158, 0.10) | #FFFFFF | none |
| Active (current page) | rgba(255, 234, 158, 0.10) | #FFFFFF | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | current bg | #FFFFFF | current | outline: 2px solid #FFEA9E, offset: 2px |

---

## Responsive Specifications

No structural changes across breakpoints. Small overlay component. On mobile, ensure right-alignment to prevent viewport overflow.

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
| Dashboard Grid Icon | 24x24px | #FFFFFF | Dashboard item |
| Chevron Right | 24x24px | #FFFFFF | Logout item |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Container | 666:9728 | `absolute z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col` | `<ProfileDropdown />` (Client, shared with regular) |
| Active Item | A.1 | `h-14 px-4 rounded bg-[#FFEA9E]/10 flex items-center gap-2 [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<ProfileMenuItem />` |
| Default Item | A.2, A.3 | `h-14 px-4 rounded bg-transparent flex items-center gap-2 hover:bg-[#FFEA9E]/10` | `<ProfileMenuItem />` |
| Item Text | - | `font-montserrat text-base font-bold text-white tracking-[0.15px]` | `<span>` |

---

## Notes

- The admin and regular profile dropdowns SHOULD share the same base `<ProfileDropdown />` component. The admin version conditionally renders the "Dashboard" item based on an `isAdmin` prop passed from a Server Component.
- The container width adjusts automatically to fit the longest item text.
