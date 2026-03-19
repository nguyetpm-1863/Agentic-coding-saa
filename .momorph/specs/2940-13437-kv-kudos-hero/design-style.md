# Design Style: KV Kudos Hero Section

**Frame ID**: `2940:13431` (items `2940:13437`, `2940:13449`)
**Frame Name**: `Sun* Kudos - Live board` (Hero Section)
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-16

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background, fallback behind hero |
| --color-hero-gradient-start | #00101A | 100% | Gradient overlay start (at 14.74%) |
| --color-hero-gradient-end | rgba(0, 19, 32, 0) | 0% | Gradient overlay end (at 47.8%) |
| --color-accent-gold | #FFEA9E | 100% | Title text highlight color |
| --color-text-white | #FFFFFF | 100% | Search bar text, nav text |
| --color-text-muted | rgba(255, 255, 255, 0.60) | 60% | Pen icon stroke, placeholder text |
| --color-input-bg | rgba(255, 255, 255, 0.08) | 8% | Recognition input background |
| --color-input-border | rgba(255, 255, 255, 0.20) | 20% | Recognition input border |
| --color-search-bg | rgba(255, 234, 158, 0.10) | 10% | Search bar background |
| --color-search-border | #998C5F | 100% | Search bar border |
| --color-dropdown-bg | #00101A | 100% | Dropdown results background |
| --color-dropdown-border | rgba(255, 255, 255, 0.15) | 15% | Dropdown border |
| --color-dropdown-hover | rgba(255, 255, 255, 0.08) | 8% | Dropdown item hover |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| --gradient-hero-overlay | linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0) 47.8%) | Hero background gradient overlay |
| --gradient-hero-bottom | linear-gradient(180deg, rgba(0, 16, 26, 0) 0%, #00101A 100%) | Bottom fade to page background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-hero-title | Montserrat | 36px | 700 | 44px | 0px | "Hệ thống ghi nhận và cảm ơn" title text |
| --text-recognition-placeholder | Montserrat | 16px | 400 | 24px | 0.15px | Recognition input placeholder |
| --text-search-placeholder | Montserrat | 16px | 700 | 24px | 0.15px | "Tìm kiếm profile Sunner" text |
| --text-dropdown-name | Montserrat | 14px | 700 | 20px | 0px | User name in dropdown result |
| --text-dropdown-dept | Montserrat | 12px | 400 | 16px | 0px | Department in dropdown result |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-hero-content-x | 144px | Content horizontal padding from edges (xl) |
| --spacing-hero-top | 96px | Content padding from top of hero area |
| --spacing-hero-bottom | 120px | Content padding from bottom of hero area |
| --spacing-title-to-logo | 16px | Gap between title text and KUDOS logo |
| --spacing-logo-to-inputs | 32px | Gap between logo and input row |
| --spacing-input-gap | 16px | Gap between recognition input and search bar |
| --spacing-input-icon-gap | 12px | Gap between icon and text inside inputs |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-input | 9999px (full) | Pill-shaped inputs |
| --radius-dropdown | 8px | Dropdown container |
| --border-input | 1px solid rgba(255,255,255,0.20) | Recognition input border |
| --border-search | 1px solid #998C5F | Search bar border |
| --border-dropdown | 1px solid rgba(255,255,255,0.15) | Dropdown border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-dropdown | 0 4px 12px rgba(0, 0, 0, 0.3) | Dropdown container shadow |

---

## Layout Specifications

### Hero Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 100% (1440px design) | Full viewport width |
| height | 512px (Figma) / min-h auto | Background image area |
| position | relative | For absolute overlays |
| overflow | hidden | Clip background image |

### Content Area

| Property | Value | Notes |
|----------|-------|-------|
| padding-top | 96px | Space from top of hero |
| padding-bottom | 120px | Space below inputs |
| padding-x | 144px (xl) | Matches --spacing-page-x |
| display | flex | Vertical stack |
| flex-direction | column | Top to bottom |
| align-items | flex-start | Left-aligned content |
| gap | see per-element | Variable spacing |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Hero Section (w: 100%, min-h: 512px, position: relative)           │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  Background Image (absolute, inset-0, object-cover)             ││
│  │  public/images/kudos/Keyvisual.png                              ││
│  └─────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  Gradient Overlay (absolute, inset-0, 25deg gradient)           ││
│  └─────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  Bottom Gradient (absolute, bottom-0, 180deg fade to #00101A)   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌───── Content (relative z-10, px: 144px, pt: 96px, pb: 120px) ──┐│
│  │                                                                  ││
│  │  "Hệ thống ghi nhận và cảm ơn"                                  ││
│  │  (Montserrat 36px/44px, bold, color: #FFEA9E)                   ││
│  │                                                 ↕ 16px gap      ││
│  │  ┌──────────────────┐                                            ││
│  │  │  KUDOS Logo      │  (public/images/homepage/kudos.png)        ││
│  │  │  (h: ~80px auto) │                                            ││
│  │  └──────────────────┘                                            ││
│  │                                                 ↕ 32px gap      ││
│  │  ┌─────────────── Input Row (flex, gap: 16px) ────────────────┐ ││
│  │  │                                                             │ ││
│  │  │  ┌─ Recognition Input (pill, flex-1, max-w: 600px) ──────┐ │ ││
│  │  │  │ ✏️  Hôm nay, bạn muốn gửi lời cảm ơn...              │ │ ││
│  │  │  │ (h: 56px, bg: white/8%, border: white/20%)            │ │ ││
│  │  │  │ (px: 24px, rounded-full)                               │ │ ││
│  │  │  └────────────────────────────────────────────────────────┘ │ ││
│  │  │                                                             │ ││
│  │  │  ┌─ Search Bar (pill, w: 381px) ─────────────────────────┐ │ ││
│  │  │  │ 🔍  Tìm kiếm profile Sunner                           │ │ ││
│  │  │  │ (h: 72px, bg: gold/10%, border: #998C5F)              │ │ ││
│  │  │  │ (px: 16px, py: 24px, rounded-full)                    │ │ ││
│  │  │  └────────────────────────────────────────────────────────┘ │ ││
│  │  │                                                             │ ││
│  │  └─────────────────────────────────────────────────────────────┘ ││
│  │                                                                  ││
│  └──────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A. Hero Background — Node `2940:13437`

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | 2940:13437 | — |
| width | 100% (1440px in Figma) | `w-full` |
| height | 512px | `min-h-[512px]` |
| position | relative | `relative` |
| overflow | hidden | `overflow-hidden` |

**Background Image:**
| Property | Value | CSS |
|----------|-------|-----|
| source | `/images/kudos/Keyvisual.png` | `background-image: url('/images/kudos/Keyvisual.png')` |
| size | cover | `background-size: cover` |
| position | center | `background-position: center` |

**Gradient Overlay (25deg angle):**
| Property | Value | CSS |
|----------|-------|-----|
| position | absolute, inset-0 | `absolute inset-0` |
| background | linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%) | `background: linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%)` |

**Bottom Fade Gradient:**
| Property | Value | CSS |
|----------|-------|-----|
| position | absolute, bottom-0, left-0, right-0 | `absolute bottom-0 left-0 right-0` |
| height | ~200px | `h-[200px]` |
| background | linear-gradient(180deg, transparent 0%, #00101A 100%) | `bg-gradient-to-b from-transparent to-[#00101A]` |

---

### Title Text — "Hệ thống ghi nhận và cảm ơn"

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| font-family | Montserrat | `font-[family-name:var(--font-montserrat)]` |
| font-size | 36px | `text-[36px]` |
| font-weight | 700 | `font-bold` |
| line-height | 44px | `leading-[44px]` |
| letter-spacing | 0px | — |
| color | #FFEA9E | `text-[#FFEA9E]` |
| text-align | left | `text-left` |

---

### KUDOS Logo Image

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| source | `/images/homepage/kudos.png` | Next.js `<Image>` |
| width | auto (approx 300px) | `w-auto` |
| height | auto (approx 80px) | `h-[80px]` |
| margin-top | 16px from title | `mt-4` |

---

### A.1 Recognition Input — Node `2940:13449`

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | 2940:13449 | — |
| width | flex-1, max-width 600px | `flex-1 max-w-[600px]` |
| height | 56px | `h-14` |
| padding | 16px 24px | `px-6 py-4` |
| background | rgba(255, 255, 255, 0.08) | `bg-white/[0.08]` |
| border | 1px solid rgba(255, 255, 255, 0.20) | `border border-white/20` |
| border-radius | 9999px | `rounded-full` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| gap | 12px | `gap-3` |
| cursor | pointer → text (when focused) | `cursor-pointer` / `cursor-text` |

**Pen Icon (inside):**
| Property | Value |
|----------|-------|
| size | 20px × 20px |
| stroke | rgba(255, 255, 255, 0.60) |
| stroke-width | 1.5 |

**Placeholder Text:**
| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| font-family | Montserrat | `font-[family-name:var(--font-montserrat)]` |
| font-size | 16px | `text-base` |
| font-weight | 400 | `font-normal` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | rgba(255, 255, 255, 0.60) | `text-white/60` |
| text-vi | "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" | — |
| text-en | "Who do you want to appreciate and recognize today?" | — |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: white/8%, border: white/20% |
| Hover | bg: white/12%, border: white/30% |
| Focus | border: #FFEA9E, outline: 2px solid #FFEA9E offset 2px |
| Active (typing) | Shows input cursor, placeholder hidden, dropdown visible |

---

### Search Bar — "Tìm kiếm profile Sunner"

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| width | 381px | `w-[381px]` |
| height | 72px | `h-[72px]` |
| padding | 24px 16px | `px-4 py-6` |
| background | rgba(255, 234, 158, 0.10) | `bg-[rgba(255,234,158,0.10)]` |
| border | 1px solid #998C5F | `border border-[#998C5F]` |
| border-radius | 68px | `rounded-[68px]` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| gap | 8px | `gap-2` |

**Search Icon:**
| Property | Value |
|----------|-------|
| size | 24px × 24px |
| color | white |

**Placeholder Text:**
| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| font-family | Montserrat | `font-[family-name:var(--font-montserrat)]` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #FFFFFF | `text-white` |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: gold/10%, border: #998C5F |
| Focus | border: #FFEA9E, box-shadow: 0 0 0 2px rgba(255,234,158,0.2) |

---

### Recipient Dropdown (appears below recognition input)

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| width | same as input (100%) | `w-full` |
| max-height | 400px | `max-h-[400px] overflow-y-auto` |
| margin-top | 4px | `mt-1` |
| background | #00101A | `bg-[#00101A]` |
| border | 1px solid rgba(255,255,255,0.15) | `border border-white/15` |
| border-radius | 8px | `rounded-lg` |
| box-shadow | 0 4px 12px rgba(0,0,0,0.3) | `shadow-[0_4px_12px_rgba(0,0,0,0.3)]` |
| z-index | 50 | `z-50` |

**Dropdown Item:**
| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| padding | 12px 16px | `px-4 py-3` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| gap | 12px | `gap-3` |
| min-height | 44px | `min-h-[44px]` |
| cursor | pointer | `cursor-pointer` |

**Dropdown Item — Avatar:**
| Property | Value |
|----------|-------|
| size | 32px × 32px |
| border-radius | 50% |
| fallback bg | #FFEA9E/20% |

**Dropdown Item — Name:**
| Property | Value |
|----------|-------|
| font-size | 14px |
| font-weight | 700 |
| color | #FFFFFF |

**Dropdown Item — Department:**
| Property | Value |
|----------|-------|
| font-size | 12px |
| font-weight | 400 |
| color | rgba(255, 255, 255, 0.50) |

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | 1279px |
| Wide | 1280px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Hero height | min-h: auto (content-driven) |
| Content padding-x | 16px |
| Content padding-y | 32px top, 48px bottom |
| Title font-size | 24px, line-height: 32px |
| KUDOS logo height | 48px |
| Input row | flex-col, full width |
| Recognition Input | w-full, max-w: none |
| Search Bar | w-full, h-11 (44px) |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Content padding-x | 48px |
| Content padding-y | 48px top, 64px bottom |
| Title font-size | 32px, line-height: 40px |
| Input row | flex-row |
| Recognition Input | flex-1, max-w: 600px |
| Search Bar | w-[300px], h-[56px] |

#### Desktop / Wide (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Content padding-x | 80px (lg) / 144px (xl) |
| Content padding-y | 96px top, 120px bottom |
| Title font-size | 36px, line-height: 44px |
| Search Bar | w-[381px], h-[72px] |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Recognition Input | background-color, border-color | 150ms | ease-in-out | Hover/Focus |
| Search Bar | border-color, box-shadow | 150ms | ease-in-out | Focus |
| Dropdown | opacity, transform | 150ms | ease-out | Open/Close |
| Dropdown Item | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Hero Section | 2940:13437 | `relative w-full min-h-[512px] overflow-hidden` | `<HeroBanner>` |
| Background Image | — | `absolute inset-0 object-cover` | CSS `background-image` |
| Gradient Overlay | — | `absolute inset-0` + inline gradient | `<div>` with inline style |
| Bottom Fade | — | `absolute bottom-0 h-[200px] bg-gradient-to-b` | `<div>` |
| Title Text | — | `text-[36px] font-bold leading-[44px] text-[#FFEA9E]` | `<h1>` |
| KUDOS Logo | — | `h-[80px] w-auto` | `<Image>` |
| Recognition Input | 2940:13449 | `h-14 rounded-full bg-white/[0.08] border-white/20` | `<RecognitionInput>` |
| Search Bar | — | `w-[381px] h-[72px] rounded-[68px] bg-[rgba(255,234,158,0.10)] border-[#998C5F]` | `<SearchBar>` |
| Recipient Dropdown | — | `bg-[#00101A] border-white/15 rounded-lg shadow-[...]` | Part of `<RecognitionInput>` |

---

## Notes

- All colors should use inline values or Tailwind arbitrary values (project uses Tailwind CSS 4)
- Font is loaded via `--font-montserrat` CSS variable (already configured)
- Icons are inline SVG (no separate icon component library)
- Background image uses CSS background (not Next.js `<Image>`) for full-bleed hero coverage
- Ensure color contrast meets WCAG AA (gold #FFEA9E on dark bg passes for large text)
