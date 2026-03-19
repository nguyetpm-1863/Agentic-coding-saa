# Design Style: Homepage SAA 2025

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | rgba(16, 20, 23, 0.80) | 80% | Header background overlay |
| --color-accent-gold | #FFEA9E | 100% | Primary accent — active nav, headings, borders, primary button |
| --color-text-white | #FFFFFF | 100% | Body text, descriptions, nav labels |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow effect on nav |
| --color-text-kudos | #DBD1C1 | 100% | "KUDOS" section text (warm beige) |
| --color-border-gold | #FFEA9E | 100% | Award card image border, countdown digit border |
| --color-border-muted | #998C5F | 100% | Outline/secondary button borders |
| --color-divider | #2E3940 | 100% | Footer divider, section separators |
| --color-notification-red | rgba(212, 39, 29, 1) | 100% | Notification unread dot |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.10) | 10% | Secondary button background |
| --color-btn-text-bg | rgba(0, 0, 0, 0.00) | 0% | Transparent text button background |
| --color-white-10 | rgba(255, 255, 255, 0.10) | 10% | Gradient end in countdown digit boxes |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| --gradient-cover | linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%) | Cover overlay on top of keyvisual background — reduces background brightness to ensure text readability. Applied as an absolutely positioned layer (z-1) covering the full keyvisual area. |
| --gradient-countdown-digit | linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%) | Countdown digit box text/fill |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-display | Montserrat | 57px | 700 | 64px | -0.25px | Section headings ("Hệ thống giải thưởng", "Sun* Kudos") |
| --text-countdown-digit | Digital Numbers | 49px | 400 | auto | 0 | Countdown timer digit numbers |
| --text-body-lg | Montserrat | 24px | 700 | 32px | 0 | Content paragraphs, countdown labels, section subheadings |
| --text-card-title | Montserrat | 24px | 400 | 32px | 0 | Award card names |
| --text-btn-cta | Montserrat | 22px | 700 | 28px | 0 | CTA button text |
| --text-quote | Montserrat | 20px | 700 | 32px | 0 | Quote/emphasis text |
| --text-body | Montserrat | 16px | 400 | 24px | 0.5px | Card descriptions, body text |
| --text-body-bold | Montserrat | 16px | 700 | 24px | 0.5px | Kudos description, footer nav bold |
| --text-label | Montserrat | 16px | 700 | 24px | 0.15px | Navigation links, footer links, button labels |
| --text-link | Montserrat | 16px | 500 | 24px | 0.15px | "Chi tiết" detail links |
| --text-nav | Montserrat | 14px | 700 | 20px | 0.1px | Header navigation link text |
| --text-kudos-logo | SVN-Gotham | 96px | 400 | 24px | -13% | "KUDOS" decorative logo text |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0 | Footer copyright |
| --text-nav-shadow | — | — | — | — | — | text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Main content horizontal padding (wide) |
| --spacing-header-x | 144px | Header horizontal padding (wide) |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-section-y | 96px | Vertical padding between major sections |
| --spacing-gap-xs | 8px | Small element gaps (icon groups) |
| --spacing-gap-sm | 10px | Compact group gaps |
| --spacing-gap-md | 16px | Standard component gaps |
| --spacing-gap-lg | 24px | Card grid gap, CTA-to-content gap |
| --spacing-gap-xl | 48px | Awards header-to-grid gap |
| --spacing-gap-2xl | 80px | Key visual-to-content gap |
| --spacing-nav-gap | 60px | Gap between navigation tab items |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-footer-y | 40px | Footer vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-sm | 4px | Small rounding (language selector, Kudos CTA) |
| --radius-md | 8px | CTA buttons, countdown digit boxes, cards |
| --radius-lg | 16px | Larger containers |
| --radius-xl | 24px | Large containers |
| --radius-pill | 100px | Notification badge, widget floating button |
| --border-countdown | 0.5px solid #FFEA9E | Countdown digit box border |
| --border-award-card | 0.955px solid #FFEA9E | Award card image border |
| --border-outline-btn | 1px solid #998C5F | Outline/secondary button border |
| --border-nav-active | 1px solid #FFEA9E | Active nav tab bottom border |
| --border-footer | 1px solid #2E3940 | Footer top divider |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow on active nav text, footer active link |
| --shadow-box-gold | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award card images, widget button |
| --shadow-none | none | Default — most elements have no box-shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| page-width | 1512px | Full design width |
| content-width | 1224px | Content area (1512 - 2*144px padding) |
| padding-x | 144px | Horizontal padding (wide breakpoint) |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Page (1512px wide, bg: #00101A, scroll-y)                               │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │  A1_Header (fixed, 1512×80px, bg: rgba(16,20,23,0.80), z-50)       ││
│  │  px: 144px, py: 12px, flex, items-center, justify-between          ││
│  │  ┌─────────┐  ┌──────────────────────────┐  ┌─────┬────┬──────┬──┐ ││
│  │  │ A1.0    │  │ A1.1 | A1.2 | A1.3       │  │Bell │ VN │Avatar│  │ ││
│  │  │ Logo    │  │ NavTabs (gap: 60px)       │  │A1.5 │A1.6│ A1.7│  │ ││
│  │  │ (52×48) │  │ 14px/700 Montserrat       │  │     │    │      │  │ ││
│  │  └─────────┘  └──────────────────────────┘  └─────┴────┴──────┴──┘ ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │  B_Keyvisual (1512×1392px, relative)                                ││
│  │  ┌─────────────────────────────────────────────────────────────────┐ ││
│  │  │  Background Image (absolute, z-0)                               │ ││
│  │  │  Cover Gradient (absolute, z-1, 12.34deg diagonal)                 │ ││
│  │  └─────────────────────────────────────────────────────────────────┘ ││
│  │                                                                      ││
│  │  Content (px: 144px, py: 96px, z-10)                                ││
│  │  ┌─────────────────────────────────┐                                 ││
│  │  │  B.1 ROOT FURTHER Logo          │                                 ││
│  │  └─────────────────────────────────┘                                 ││
│  │            ↕ gap                                                      ││
│  │  ┌─────────────────────────────────┐                                 ││
│  │  │  B.2 "Coming soon" subtitle     │                                 ││
│  │  └─────────────────────────────────┘                                 ││
│  │            ↕ gap                                                      ││
│  │  ┌───────────┬───────────┬───────────┐                               ││
│  │  │  B.3 DAYS │  HOURS    │  MINUTES  │  Countdown Timer              ││
│  │  │  ┌──┬──┐  │  ┌──┬──┐ │  ┌──┬──┐  │  Digit boxes: ~51×82px       ││
│  │  │  │00│00│  │  │00│00│ │  │00│00│  │  r: 8px, border: 0.5px gold  ││
│  │  │  └──┴──┘  │  └──┴──┘ │  └──┴──┘  │                               ││
│  │  └───────────┴───────────┴───────────┘                               ││
│  │            ↕ gap                                                      ││
│  │  ┌─────────────────────────────────┐                                 ││
│  │  │  B.4 Event Info (18h30, venue)  │                                 ││
│  │  └─────────────────────────────────┘                                 ││
│  │            ↕ gap                                                      ││
│  │  ┌──────────────┐  ┌──────────────┐                                  ││
│  │  │ B.5 ABOUT    │  │ B.6 ABOUT    │  CTA Buttons                    ││
│  │  │ AWARDS       │  │ KUDOS        │  r: 8px, h: ~56px, outline     ││
│  │  └──────────────┘  └──────────────┘                                  ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │  C_Content (Frame 486, py: 120px, px: 104px, gap: 32px)            ││
│  │                                                                      ││
│  │  ┌──────────────────┐                                                ││
│  │  │  "ROOT" (image)  │  189×67px                                      ││
│  │  │  "FURTHER" (img) │  290×67px                                      ││
│  │  └──────────────────┘                                                ││
│  │            ↕ 32px gap                                                ││
│  │  ┌──────────────────────────────────────────────────────────────────┐││
│  │  │  B4_Content paragraphs (Montserrat 24px/32px/700, #FFF)         │││
│  │  │  Paragraph 1 → Quote (centered) → Paragraph 2                   │││
│  │  │  width: 1152px                                                   │││
│  │  └──────────────────────────────────────────────────────────────────┘││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │  D_Awards (px: 144px, py: 96px)                                     ││
│  │  ┌──────────────────────────────────────────┐                        ││
│  │  │  D.1 Caption "Sun* annual awards 2025"   │                        ││
│  │  │  D.2 Title "Hệ thống giải thưởng"          │                        ││
│  │  └──────────────────────────────────────────┘                        ││
│  │            ↕ 48px gap                                                 ││
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                     ││
│  │  │ D.3 Card 1 │  │ D.3 Card 2 │  │ D.3 Card 3 │  Row 1             ││
│  │  │ Top Talent │  │ Top Project│  │ Top Proj L.│                     ││
│  │  └────────────┘  └────────────┘  └────────────┘                     ││
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                     ││
│  │  │ D.3 Card 4 │  │ D.3 Card 5 │  │ D.3 Card 6 │  Row 2             ││
│  │  │ Best Mgr   │  │ Sig. 2025  │  │ MVP        │                     ││
│  │  └────────────┘  └────────────┘  └────────────┘                     ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │  E_Kudos (px: 144px, py: 96px)                                      ││
│  │  "KUDOS" branding (#DBD1C1) + description + "Chi tiet" button       ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │  F_Footer (border-top: 1px solid #2E3940, px: 90px, py: 40px)      ││
│  │  Logo + Nav links + Copyright                                        ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  [G_Widget] Floating button (fixed, bottom-right)                        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A1_Header — Navigation Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | A1_Header | - |
| width | 1512px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.80) | `background-color: rgba(16, 20, 23, 0.80)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | fixed, top: 0 | `position: fixed; top: 0; z-index: 50` |

### A1.1-A1.3 — Navigation Tabs

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |
| gap | 60px | `gap: 60px` (between tabs) |
| height | 56px | `height: 56px` (clickable area) |
| padding | 16px | `padding: 16px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Normal | color: #FFFFFF, no border, no shadow |
| Hover | color: #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Active/Selected | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: gold glow |

### A1.5 — Notification Bell

| Property | Value | CSS |
|----------|-------|-----|
| icon-size | 24x24px | `w-6 h-6` |
| dot-size | 8x8px | `w-2 h-2` |
| dot-color | rgba(212, 39, 29, 1) | `bg-red-600` |
| dot-position | top-right corner | `absolute -top-0.5 -right-0.5` |

### B.3 — Countdown Timer Digit Box

| Property | Value | CSS |
|----------|-------|-----|
| width | 51.2px | `width: 51px` |
| height | 81.92px | `height: 82px` |
| border-radius | 8px | `border-radius: 8px` |
| border | 0.5px solid #FFEA9E | `border: 0.5px solid #FFEA9E` |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Gradient at opacity 0.5 |
| backdrop-filter | blur(16.64px) | `backdrop-filter: blur(16.64px)` (glass effect) |
| opacity | 0.5 | `opacity: 0.5` (on the gradient background layer) |
| font-family | Digital Numbers | Custom font for countdown digits |
| font-size | 49px | `font-size: 49px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: #FFFFFF` |
| display | flex | `display: flex; align-items: center; justify-content: center` |
| digit-pair-gap | 14px | Gap between two digit cards in a pair |
| pair-group-gap | 40px | Gap between DAYS/HOURS/MINUTES groups |

**Labels below digit pairs:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| color | #FFEA9E |

### B.5/B.6 — CTA Buttons ("ABOUT AWARDS" / "ABOUT KUDOS")

Both buttons share the same styling and states. Gap between buttons: 40px.

| Property | Value | CSS |
|----------|-------|-----|
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| border-radius | 8px | `border-radius: 8px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| letter-spacing | 0px | `letter-spacing: 0px` |
| cursor | pointer | `cursor: pointer` |
| icon | Arrow top-right (↗) | After text, 8px gap |

**States (CRITICAL — verified from Figma):**
| State | Background | Border | Text Color | Other |
|-------|-----------|--------|------------|-------|
| **Normal** | rgba(255, 234, 158, 0.10) | 1px solid #998C5F | #FFFFFF (white) | — |
| **Hover** | **rgba(255, 234, 158, 1)** (solid gold) | none | **#00101A** (dark navy) | transition 150ms |
| **Focus** | same as normal | same as normal | same as normal | outline: 2px solid #FFEA9E, outline-offset: 2px |
| **Active** | rgba(255, 234, 158, 0.80) | none | #00101A | — |

> **IMPORTANT**: The hover state is a SOLID gold fill with DARK text — NOT a subtle opacity change. This is a significant visual change from the normal outline state.

### D.3 — Award Card

| Property | Value | CSS |
|----------|-------|-----|
| width | 336px | `w-full` in grid (1/3 of 1224px - gaps) |
| total-height | 504-536px | Variable based on text content |
| image-size | 336×336px | Square image area |
| image-border-radius | 24px | `border-radius: 24px` |
| image-border | 0.955px solid #FFEA9E | `border: 1px solid #FFEA9E` (approximate) |
| image-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow shadow on card images |
| text-block | 336×144-176px | Below image |
| title | Montserrat 24px/400, #FFEA9E | Gold title text (note: weight 400, not 700) |
| description | Montserrat 16px/400, #FFFFFF | White description (note: weight 400) |
| inner-gap | 9.5px | Gap between image and text block |
| grid-column-gap | 24px | `column-gap: 24px` |
| grid-row-gap | 80px | `row-gap: 80px` (large gap between rows) |

### A1.5 — Notification Bell (Interactive States)

**States:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, cursor: pointer |
| Hover | opacity: 0.8, transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

### A1.7 — User Avatar (Interactive States)

| Property | Value | CSS |
|----------|-------|-----|
| size | 40×40px | `w-10 h-10` |
| shape | circular | `rounded-full overflow-hidden` |
| border | none | - |

**States:**
| State | Changes |
|-------|---------|
| Default | cursor: pointer |
| Hover | ring: 2px solid rgba(255,255,255,0.3), transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

### C_Content — Root Further Description (Frame 486: `3204:10152`)

This section is a standalone content block between the Hero and Awards sections. It contains:
1. **"ROOT FURTHER" title** — rendered as two image assets (NOT regular text), arranged in a group
2. **Long-form content paragraphs** — descriptive text about the event philosophy
3. **A centered quote** — English quote with Vietnamese translation

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:10152 | - |
| width | 1152px | `max-w-[1152px]` (inner content area) |
| height | 1219px (auto) | `height: auto` |
| padding | 120px 104px | `py-[120px] px-[104px]` (inside Bìa container which has its own px-36) |
| gap | 32px | `gap-8` (between ROOT FURTHER title and content paragraphs) |
| background | transparent | Inherits page background #00101A |

#### C_Content.1 — "ROOT FURTHER" Title Images (Group 434: `3204:10153`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:10153 | - |
| width | 290px | `width: 290px` (group bounding box) |
| height | 134px | `height: auto` |
| layout | stacked (Root above Further) | `flex flex-col` |

**"Root" text image** (`MM_MEDIA_Root Text`, `3204:10155`):
| Property | Value |
|----------|-------|
| width | 189px |
| height | 67px |
| type | Image (NOT text) — stylized decorative version of "ROOT" |

**"Further" text image** (`MM_MEDIA_Further Text`, `3204:10154`):
| Property | Value |
|----------|-------|
| width | 290px |
| height | 67px |
| type | Image (NOT text) — stylized decorative version of "FURTHER" |

> **IMPORTANT**: These are image assets, not rendered text. They must be exported from Figma as PNG/SVG and loaded with `next/image`. They provide a smaller, decorative version of the "ROOT FURTHER" branding (distinct from the hero logo B.1 which is 451×200px).

#### C_Content.2 — Content Paragraphs (B4_content: `5001:14827`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5001:14827 | - |
| width | 1152px | `max-w-[1152px]` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | **24px** | `text-2xl` |
| font-weight | **700** | `font-bold` |
| line-height | **32px** | `leading-8` |
| color | #FFFFFF | `text-white` |
| text-align | left | `text-align: left` |

**Content structure** (3 text blocks with a centered quote):
1. **Paragraph 1** (`3204:10156`): Long-form Vietnamese text (~512px height, multiple lines)
2. **Quote block** (`3204:10161`): Centered English quote — _"A tree with deep roots fears no storm"_ with Vietnamese translation in parentheses. Uses **italic** styling, text-align: center.
3. **Paragraph 2** (`3204:10162`): Continuation of Vietnamese text (~448px height, multiple lines)

> **NOTE**: All content text uses **24px bold** (not 16px as might be assumed from the body text token). This is significantly larger than typical body text, matching the `--text-body-lg` token.

### E_Kudos — Sun* Kudos Section

| Property | Value | CSS |
|----------|-------|-----|
| padding | 96px 144px | `px-36 py-24` (wide) |
| layout | flex-col | `flex flex-col` |
| gap | 24px | `gap: 24px` |

**"KUDOS" decorative logo text:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | SVN-Gotham | Custom font (must be loaded locally) |
| font-size | 96px | `font-size: 96px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 24px | `line-height: 24px` (compressed) |
| letter-spacing | -13% | `letter-spacing: -0.13em` |
| color | #DBD1C1 | `color: #DBD1C1` (warm beige, NOT gold) |

**"Chi tiết" button:** Same outline pill style as CTA buttons (B.5/B.6).

### F_Footer — Full Footer

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | ~144px | `height: auto` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| background | #00101A | Matches page background |
| font-family | Montserrat / Montserrat Alternates | Mixed usage |

**Internal layout:**
- Logo: SAA 2025 logo (52×48px), centered or left-aligned
- Nav links: Montserrat 14px/700, #FFFFFF, flex with gap-8, horizontal
- Copyright: Montserrat Alternates 16px/700, #FFFFFF, centered
- Sections stacked vertically with ~24px gap

**Nav link states:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF |
| Hover | color: #FFEA9E, transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, min-h-screen, scroll-y)
├── A1_Header (fixed, top-0, w-full, h-20, bg-rgba(16,20,23,0.80), px-36, py-3, z-50)
│   ├── Left (flex, items-center, gap-64px, justify-start)
│   │   ├── A1.0_Logo (52×48px, Image, links to `/`)
│   │   └── A1.1-A1.3_NavTabs (flex, gap-60px, Montserrat 14px/700, next to logo NOT centered)
│   │       ├── Tab "About SAA 2025" → `/` (active: gold + border-bottom + glow)
│   │       ├── Tab "Award Information" → `/awards` (hover: gold + glow)
│   │       └── Tab "Sun* Kudos" → `/kudos` (normal: white)
│   └── Right (flex, items-center, gap-2)
│       ├── A1.6_Bell (24px, relative → red dot 8px)
│       ├── A1.7_LanguageSelector (reuse from Login)
│       └── A1.8_Avatar (circular, 40px — ONLY avatar image, no separate user icon)
│
├── B_Keyvisual (relative, 1512×1392px)
│   ├── Background Image (absolute, inset-0, z-0, object-cover — extends to beginning of B4 awards)
│   ├── Cover Gradient (absolute, z-1, 12.34deg gradient — **height: 1480px**, extends beyond keyvisual into content)
│   └── Content (relative, z-10, px-36, py-24)
│       ├── B.1_Logo "ROOT FURTHER" (Image)
│       ├── B.2_Subtitle "Coming soon" (Montserrat 20px/700, #FFF)
│       ├── B.3_Countdown (flex, gap-10)
│       │   ├── DaysGroup (flex-col, items-center)
│       │   │   ├── DigitBoxes (2× 51×82px, r-2, border gold, glass blur bg, gap-3.5)
│       │   │   └── Label "DAYS" (Montserrat 24px/700, #FFEA9E)
│       │   ├── HoursGroup (same structure)
│       │   └── MinutesGroup (same structure)
│       ├── B.4_EventInfo (flex-col, gap-8px)
│       │   ├── Row 1 (flex, gap-60px)
│       │   │   ├── "Thời gian:" (16px/700, #FFF) + "26/12/2026" (24px/700, #FFEA9E)
│       │   │   └── "Địa điểm:" (16px/700, #FFF) + "Âu Cơ Art Center" (24px/700, #FFEA9E)
│       │   └── "Tường thuật trực tiếp qua sóng Livestream" (16px/700, #FFF, ls: 0.5px)
│       └── B.5-B.6_CTAs (flex, gap-10)
│           ├── "ABOUT AWARDS" (276×60, r-2, normal: outline #998C5F + white text, hover: solid gold #FFEA9E + dark text #00101A)
│           └── "ABOUT KUDOS" (~254×60, r-2, same states as ABOUT AWARDS)
│
├── C_Content (py-[120px], px-[104px], inside Bìa container)
│   ├── ROOT FURTHER Title (290×134px, stacked images)
│   │   ├── "Root" Image (189×67px, decorative)
│   │   └── "Further" Image (290×67px, decorative)
│   └── B4_Content (w-[1152px], flex-col, gap-8)
│       ├── Paragraph 1 (Montserrat 24px/32px/700, #FFF)
│       ├── Quote ("A tree with deep roots...", centered, italic)
│       └── Paragraph 2 (Montserrat 24px/32px/700, #FFF)
│
├── D_Awards (px-36, py-24)
│   ├── D.1_Caption "Sun* annual awards 2025" (Montserrat 24px/700, #FFEA9E)
│   ├── D.2_Title "Hệ thống giải thưởng" (Montserrat 57px/700, #FFEA9E, lh: 64px)
│   └── D.3_Grid (grid, grid-cols-3, col-gap-6, row-gap-20)
│       ├── Card (336×504-536px)
│       │   ├── CardImage (336×336px, r-[24px], border gold 1px, shadow gold glow)
│       │   ├── CardTitle (Montserrat 24px/400, #FFEA9E)
│       │   └── CardDescription (Montserrat 16px/400, #FFF)
│       └── ... (6 cards total)
│
├── E_Kudos (px-36, py-24)
│   ├── "KUDOS" (SVN-Gotham 96px/400, #DBD1C1, letter-spacing: -13%)
│   ├── Description (Montserrat 16px/700, #FFF)
│   └── "Chi tiết" Button (outline, r-2, same as CTA style)
│
├── F_Footer (border-t border-[#2E3940], px-[90px], py-10)
│   ├── Logo
│   ├── Nav Links
│   └── Copyright (Montserrat Alternates 16px/700, #FFF)
│
└── G_Widget (fixed, bottom-right, z-50)
    └── Floating Button (circular)
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
| Header | padding: 12px 16px; nav tabs hidden (hamburger menu or simplified) |
| Nav Tabs | Hidden or collapsed into hamburger menu |
| Key Visual | padding: 32px 16px; reduced height |
| ROOT FURTHER Logo | width: 100%, max-width: 280px |
| Countdown Timer | Stacked vertically or reduced size, digit boxes ~48×64px |
| CTA Buttons | Full-width, stacked vertically, min-height: 48px |
| Content | padding: 32px 16px; font-size: 14px |
| Awards Grid | grid-cols-1, gap: 16px |
| Award Card | Full width |
| Kudos Section | padding: 32px 16px |
| Footer | padding: 24px 16px; stacked layout |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 48px; nav tabs may use smaller gap (32px) |
| Key Visual | padding: 64px 48px |
| Countdown Timer | Horizontal, digit boxes ~56×72px |
| CTA Buttons | Side-by-side, auto-width |
| Awards Grid | grid-cols-2, gap: 20px |
| Footer | padding: 32px 48px |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 80px |
| Key Visual | padding: 96px 80px |
| Awards Grid | grid-cols-3, gap: 24px |
| Footer | padding: 40px 80px |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design at 1512px |
| Header | padding: 12px 144px |
| Content | padding: 96px 144px |
| Container | max-width: 1512px, margin: 0 auto |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Logo (SAA 2025) | 52×48px | N/A (image) | Header left |
| Notification Bell | 24×24px | #FFFFFF | Header right |
| Notification Dot | 8×8px | rgba(212,39,29,1) | Bell overlay |
| Flag (VN) | 24×24px | N/A (image) | Language selector |
| Chevron Down | 24×24px | #FFFFFF | Language dropdown |
| User Avatar | ~40×40px | N/A (image) | Header right, circular |
| ROOT FURTHER Logo | variable | N/A (image) | Hero key visual |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav Tab | color, text-shadow, border | 150ms | ease-in-out | Hover/Active |
| CTA Button | background-color | 150ms | ease-in-out | Hover |
| Countdown | digit value | — | — | Timer tick (every minute) |
| Page sections | scroll-behavior | smooth | — | Nav click |
| Language Dropdown | opacity, transform | 150ms | ease-out | Toggle |
| Widget Button | transform, shadow | 200ms | ease-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page | 2167:9026 | `bg-[#00101A] min-h-screen` | `<HomePage />` (Server) |
| Header | A1_Header | `fixed top-0 w-full h-20 bg-[rgb(16,20,23)]/80 px-36 py-3 z-50` | `<HomeHeader />` |
| Nav Tabs | A1.1-A1.3 | `flex gap-[60px] font-montserrat text-sm font-bold` | `<NavTabs />` (Client) |
| Notification Bell | A1.5 | `relative w-6 h-6` | `<NotificationBell />` (Client) |
| Language Selector | A1.6 | (reuse from Login) | `<LanguageSelector />` (Client) |
| User Avatar | A1.7 | `w-10 h-10 rounded-full overflow-hidden` | `<UserAvatar />` |
| Key Visual | B_Keyvisual | `relative w-full` | Section in page |
| Background | — | `absolute inset-0 z-0` | `<Image />` (next/image) |
| Cover Gradient | 2167:9029 | `absolute inset-0 z-[1]` + `background: linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%)` | `<div />` — overlay to reduce keyvisual brightness |
| Countdown | B.3 | `flex gap-10` | `<CountdownTimer />` (Client) |
| Digit Box | — | `w-[51px] h-[82px] rounded-lg border-[0.5px] border-[#FFEA9E] backdrop-blur-[16.64px]` | `<DigitBox />` |
| CTA Button | B.5/B.6 | Normal: `rounded-lg border border-[#998C5F] bg-[#FFEA9E]/10 px-6 py-4 text-white text-[22px] font-bold`. Hover: `hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent` | `<Link />` |
| Awards Grid | D_Awards | `grid grid-cols-3 gap-x-6 gap-y-20` | Section in page |
| Award Card | D.3 | `w-[336px]` | `<AwardCard />` |
| Card Image | — | `rounded-3xl border border-[#FFEA9E] aspect-square object-cover shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<Image />` |
| Kudos Section | E_Kudos | `px-36 py-24` | Section in page |
| Footer | F_Footer | `border-t border-[#2E3940] px-[90px] py-10` | `<HomeFooter />` |
| Widget | G_Widget | `fixed bottom-6 right-6 z-50` | `<WidgetButton />` (Client) |

---

## Notes

- The header background color `rgba(16, 20, 23, 0.80)` differs from the Login header's `rgba(11, 15, 18, 0.80)`. This may be intentional (different pages) or a Figma inconsistency. Implementation should use the Homepage value for this screen.
- The countdown digit boxes use a **glass morphism** effect: `backdrop-filter: blur(16.64px)` with gradient overlay at `opacity: 0.5`. The font is **Digital Numbers** (custom font, weight 400, ~49px). This requires loading an additional font.
- Award card image borders use a non-standard `0.955px` width. Round to `1px` for implementation. Images have `border-radius: 24px` and a **gold glow box-shadow**.
- The gold text-shadow effect on navigation (`0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`) creates a glow effect and should be applied via Tailwind's `[text-shadow:...]` arbitrary property.
- Both CTA buttons share the same style. **Normal state**: outline (10% gold bg, #998C5F border, white text). **Hover state**: solid gold bg (#FFEA9E), dark text (#00101A), no border. Font: Montserrat 22px/700 (not 16px). Includes an arrow icon (↗) after text.
- The "KUDOS" logo text uses **SVN-Gotham** font at 96px — this is a third custom font that needs to be loaded.
- Award card titles and descriptions use **font-weight 400** (not 700) — lighter than the general bold pattern.
- The section title "Hệ thống giải thưởng" uses **57px display** size (the largest text on the page).
- The page total height is 4480px at desktop, indicating a long-scroll design. Consider lazy-loading below-the-fold sections.
- The awards grid uses asymmetric gaps: **24px column gap** and **80px row gap** between the two rows of cards.
