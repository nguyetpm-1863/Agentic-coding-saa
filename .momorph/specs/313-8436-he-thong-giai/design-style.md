# Design Style: Awards System (He thong giai)

**Frame ID**: `313:8436`
**Frame Name**: `He thong giai`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | rgba(16, 20, 23, 0.80) | 80% | Header background overlay |
| --color-accent-gold | #FFEA9E | 100% | Primary accent -- active nav, headings, borders, award titles, sidebar active |
| --color-text-white | #FFFFFF | 100% | Body text, descriptions, nav labels, award values |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow effect on active nav/sidebar items |
| --color-text-kudos | #DBD1C1 | 100% | "KUDOS" decorative text (warm beige) |
| --color-text-dark | #00101A | 100% | "Chi tiet" button text on gold background |
| --color-border-gold | #FFEA9E | 100% | Award card image border, sidebar active border |
| --color-border-muted | #998C5F | 100% | Outline/secondary button borders, user avatar border |
| --color-divider | #2E3940 | 100% | Section dividers, card separators, footer top border, title underline |
| --color-notification-red | rgba(212, 39, 29, 1) | 100% | Notification unread dot |
| --color-btn-kudos-bg | #FFEA9E | 100% | "Chi tiet" button background (filled gold) |
| --color-btn-footer-active-bg | rgba(255, 234, 158, 0.10) | 10% | Footer active nav item background |
| --color-kudos-card-bg | #0F0F0F | 100% | Kudos section card background base |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| --gradient-cover | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%) | Hero cover overlay (bottom-to-top fade) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-display | Montserrat | 57px | 700 | 64px | -0.25px | Section title ("He thong giai thuong SAA 2025"), "Sun* Kudos" |
| --text-value | Montserrat | 36px | 700 | 44px | 0 | Award prize values ("7.000.000 VND") and quantities ("10", "02") |
| --text-heading-lg | Montserrat | 24px | 700 | 32px | 0 | Award card titles, "So luong giai thuong:", "Gia tri giai thuong:", section captions, Kudos subtitle |
| --text-body | Montserrat | 16px | 700 | 24px | 0.5px | Award descriptions, Kudos description text |
| --text-label | Montserrat | 16px | 700 | 24px | 0.15px | Navigation links, footer links, button labels |
| --text-nav | Montserrat | 14px | 700 | 20px | 0.25px | Sidebar navigation items |
| --text-nav-header | Montserrat | 16px | 700 | 24px | 0.15px | Header navigation tabs |
| --text-small | Montserrat | 14px | 700 | 20px | 0.1px | Unit type labels ("Ca nhan", "Tap the"), "cho moi giai thuong" |
| --text-kudos-logo | SVN-Gotham | 96px | 400 | 24px | -13% | "KUDOS" decorative logo text |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright |
| --text-nav-shadow | -- | -- | -- | -- | -- | text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Main content horizontal padding (wide) |
| --spacing-header-x | 144px | Header horizontal padding (wide) |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-section-y | 96px | Vertical padding for main content area |
| --spacing-section-gap | 120px | Vertical gap between major sections (title, awards, kudos) |
| --spacing-sidebar-gap | 16px | Gap between sidebar navigation items |
| --spacing-card-gap | 80px | Vertical gap between award cards |
| --spacing-card-content-gap | 40px | Gap between card image and card content (horizontal) |
| --spacing-card-internal-gap | 32px | Gap between content sections within a card |
| --spacing-content-text-gap | 24px | Gap between title and description within card content |
| --spacing-title-gap | 16px | Gap between section caption and title |
| --spacing-columns-gap | 80px | Gap between sidebar and cards area |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-footer-y | 40px | Footer vertical padding |
| --spacing-kudos-internal | 32px | Gap between Kudos content sections |
| --spacing-kudos-content-x | 65px | Kudos content left padding inside card |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-sm | 4px | Sidebar items, header nav tabs, language selector, "Chi tiet" button |
| --radius-md | 16px | Card content containers, Kudos card background, award content sections |
| --radius-lg | 24px | Award card images |
| --border-award-card | 0.955px solid #FFEA9E | Award card image border |
| --border-nav-active | 1px solid #FFEA9E | Active sidebar/nav item bottom border |
| --border-divider | 1px solid #2E3940 | Section dividers, card separators |
| --border-avatar | 1px solid #998C5F | User avatar border |
| --border-footer | 1px solid #2E3940 | Footer top divider |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow on active nav/sidebar text |
| --shadow-box-gold | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award card images |
| --shadow-none | none | Default -- most elements have no box-shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| page-width | 1440px | Full design width |
| content-width | 1152px | Content area (1440 - 2*144px padding) |
| padding-x | 144px | Horizontal padding (wide breakpoint) |
| page-height | 6410px | Total page height at desktop |

### Layout Structure (ASCII)

```
+------------------------------------------------------------------------+
|  Page (1440px wide, bg: #00101A, scroll-y)                             |
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  Header (fixed, 1440x80px, bg: rgba(16,20,23,0.80), z-50)         ||
|  |  px: 144px, py: 12px, flex, items-center, justify-between         ||
|  |  [Logo] [About SAA | Award Info (active) | Kudos]                  ||
|  |                                            [Bell] [VN] [Avatar]    ||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  Key Visual Banner (COMPOSITE, 1440x547px+, relative)              ||
|  |  +----------------------------------------------------------------+||
|  |  |  Background Image (absolute, z-0, keyvisual-award-bg.png)      |||
|  |  |  Cover Gradient (absolute, z-1, bottom-to-top)                 |||
|  |  |  ROOT FURTHER Overlays (z-2, left side):                       |||
|  |  |    root-text.png + further-text.png (from /images/homepage/)   |||
|  |  |                                                                |||
|  |  |  A_Title Section (z-2, overlaid at bottom of banner):          |||
|  |  |  +------------------------------------------------------------+|||
|  |  |  | "Sun* Annual Awards 2025" (24px/700, #FFF, center)         ||||
|  |  |  | ---------------------------------------------------- (1px) ||||
|  |  |  | "He thong giai thuong SAA 2025" (57px/700, #FFEA9E)        ||||
|  |  |  +------------------------------------------------------------+|||
|  |  +----------------------------------------------------------------+||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  Content Area (px: 144px, py: 96px, gap: 120px between sections)  ||
|  |                                                                    ||
|  |  B_Award System (313:8458, flex-row, gap: 80px)                   ||
|  |  +----------------+  +-------------------------------------------+||
|  |  | C_Sidebar      |  | D_Award Cards (853px, flex-col, gap: 80px)||
|  |  | (178px, sticky)|  |                                           |||
|  |  | gap: 16px      |  | D.1 Top Talent Card (313:8467)            |||
|  |  |                |  | +--------+  +----------------------------+|||
|  |  | > Top Talent   |  | | Image  |  | Title: Top Talent          ||||
|  |  |   (active/gold)|  | | 336x336|  | Description text...        ||||
|  |  |   Top Project  |  | | r:24px |  | ----------------------     ||||
|  |  |   Top Project  |  | | border |  | Quantity: 10 (Ca nhan)     ||||
|  |  |    Leader      |  | | gold   |  | ----------------------     ||||
|  |  |   Best Manager |  | | glow   |  | Value: 7,000,000 VND       ||||
|  |  |   Signature    |  | +--------+  | cho moi giai thuong        ||||
|  |  |    2025        |  |              +----------------------------+|||
|  |  |   MVP          |  | ----------------------------------------- |||
|  |  |                |  |                                           |||
|  |  |                |  | D.2 Top Project Card (313:8468)            |||
|  |  |                |  | (same structure, 02 Tap the, 15M VND)     |||
|  |  |                |  | ----------------------------------------- |||
|  |  |                |  | D.3 Top Project Leader (313:8469)          |||
|  |  |                |  | (03 Ca nhan, 7M VND)                      |||
|  |  |                |  | ----------------------------------------- |||
|  |  |                |  | D.4 Best Manager (313:8470)                |||
|  |  |                |  | (01 Ca nhan, 10M VND)                     |||
|  |  |                |  | ----------------------------------------- |||
|  |  |                |  | D.5 Signature 2025 (313:8471)              |||
|  |  |                |  | (01, 5M ca nhan / 8M tap the)            |||
|  |  |                |  | ----------------------------------------- |||
|  |  |                |  | D.6 MVP (313:8510)                        |||
|  |  |                |  | (01, 15M VND)                             |||
|  |  +----------------+  +-------------------------------------------+||
|  |                                                                    ||
|  |  Kudos Section (335:12023)                                         ||
|  |  +----------------------------------------------------------------+||
|  |  | BG Image + #0F0F0F, r:16px                                    |||
|  |  | "Phong trao ghi nhan" (24px/700, #FFF)                        |||
|  |  | "Sun* Kudos" (57px/700, #FFEA9E)                              |||
|  |  | Description text (16px/700, #FFF)                              |||
|  |  | [Chi tiet] button (filled gold, #00101A text)                  |||
|  |  |                          "KUDOS" (SVN-Gotham 96px, #DBD1C1)   |||
|  |  +----------------------------------------------------------------+||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  Footer (border-top: 1px solid #2E3940, px: 90px, py: 40px)      ||
|  |  [Logo] [Giới thiệu SAA | Thông tin giải thưởng (active) |       ||
|  |          Sun* Kudos | Tiêu chuẩn chung]                          ||
|  |                            [Bản quyền thuộc về Sun* © 2025]       ||
|  +--------------------------------------------------------------------+|
+------------------------------------------------------------------------+
```

---

## Component Style Details

### Header -- Navigation Bar (Shared from Homepage)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8440 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.80) | `background-color: rgba(16, 20, 23, 0.80)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | fixed, top: 0 | `position: fixed; top: 0; z-index: 50` |

### Header Nav Tabs

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| gap | 24px | `gap: 24px` (between tabs) |
| padding | 16px | `padding: 16px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Normal | color: #FFFFFF, no border, no shadow |
| Hover | color: #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Active/Selected | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: gold glow, bg: rgba(255,234,158,0.10) |

### Key Visual Banner (Composite Section)

> **CRITICAL**: This is a composite section with multiple layers. The background, gradient, ROOT FURTHER overlays, and section title are ALL part of the same banner area. The section title is OVERLAID on the banner, NOT rendered as a separate section below it.

**Banner Container:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8437 | - |
| width | 1440px | `width: 100%` |
| height | 547px | `height: auto; min-height: 547px` (at xl) |
| position | relative | `position: relative` |

**Background Image:**
| Property | Value | CSS |
|----------|-------|-----|
| src | `/images/awards/keyvisual-award-bg.png` | **Awards-specific image (NOT login/homepage bg)** |
| position | absolute, inset: 0 | `position: absolute; inset: 0` |
| fit | cover | `object-fit: cover` |
| z-index | 0 | `z-index: 0` |

**Cover Gradient:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8439 | - |
| width | 1440px | `width: 100%` |
| height | 627px | `height: 627px` |
| background | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%) | Bottom-to-top gradient fade |
| position | absolute, bottom: 0 | `position: absolute; bottom: 0` |
| z-index | 1 | `z-index: 1` |

**ROOT FURTHER Text Overlays:**
| Property | Value | CSS |
|----------|-------|-----|
| images | `root-text.png` + `further-text.png` | From `/images/homepage/` (shared with Homepage) |
| position | left side of banner, upper area | `position: absolute` or flex-aligned left |
| z-index | 2 | Above gradient |
| layout | stacked vertically (ROOT above FURTHER) | Same pattern as Homepage `content-section.tsx` |

**Section Title (OVERLAID at bottom of banner):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8453 | - |
| width | 1152px | `width: 100%` (content area) |
| gap | 16px | `gap: 16px` |
| display | flex-col | `display: flex; flex-direction: column` |
| position | relative | `position: relative; z-index: 2` (above gradient) |
| alignment | centered, at bottom of banner area | Part of banner content flow, NOT a separate section |

**Caption ("Sun* Annual Awards 2025"):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8454 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

**Divider:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8455 | - |
| height | 1px | `height: 1px` |
| background | rgba(46, 57, 64, 1) | `background-color: #2E3940` |

**Title ("Hệ thống giải thưởng SAA 2025"):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8457 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |
| color | #FFEA9E | `color: #FFEA9E` |
| text-align | center | `text-align: center` |

### Award System Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8458 | - |
| width | 1152px | `width: 100%` (content area) |
| display | flex-row | `display: flex; flex-direction: row` |
| gap | 80px | `gap: 80px` |
| justify-content | space-between | `justify-content: space-between` |

### Sidebar Menu (C_Menu list)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8459 | - |
| width | 178px | `width: 178px` |
| display | flex-col | `display: flex; flex-direction: column` |
| gap | 16px | `gap: 16px` |
| position | sticky | `position: sticky; top: 80px` (below header) |

### Sidebar Item -- Active State (C.1 Top Talent)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8460 | - |
| display | flex | `display: flex` |
| padding | 16px | `padding: 16px` |
| align-items | center | `align-items: center` |
| border-bottom | 1px solid #FFEA9E | `border-bottom: 1px solid #FFEA9E` |
| cursor | pointer | `cursor: pointer` |

**Icon:**
| Property | Value |
|----------|-------|
| size | 24x24px |
| component | MM_MEDIA_Target |

**Text (Active):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.25px | `letter-spacing: 0.25px` |
| color | #FFEA9E | `color: #FFEA9E` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow |

### Sidebar Item -- Default State (C.2-C.6)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 313:8461 - 313:8465 | - |
| display | flex | `display: flex` |
| padding | 16px | `padding: 16px` |
| align-items | center | `align-items: center` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 4px | `gap: 4px` |

**Text (Default):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.25px | `letter-spacing: 0.25px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | none | No glow |

**States:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, no border-bottom, no text-shadow |
| Hover | color: #FFEA9E, text-shadow: gold glow (150ms transition) |
| Active/Selected | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: gold glow |

### Award Card (D.1-D.6)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 313:8467 - 313:8510 | - |
| width | 856px | `width: 100%` (fills cards area) |
| display | flex-col | `display: flex; flex-direction: column` |
| gap | 80px | `gap: 80px` (between card content and bottom divider) |

**Card Content Layout:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex-row | `display: flex; flex-direction: row` |
| gap | 40px | `gap: 40px` (between image and text content) |

### Award Card Image

| Property | Value | CSS |
|----------|-------|-----|
| width | 336px | `width: 336px` |
| height | 336px | `height: 336px` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| border-radius | 24px | `border-radius: 24px` |
| border | 0.955px solid #FFEA9E | `border: 1px solid #FFEA9E` (rounded) |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Gold glow shadow |
| mix-blend-mode | screen | `mix-blend-mode: screen` |

### Award Card Content

| Property | Value | CSS |
|----------|-------|-----|
| width | 480px | `width: 480px` (flexible, fills remaining) |
| display | flex-col | `display: flex; flex-direction: column` |
| gap | 32px | `gap: 32px` (between content sections) |
| border-radius | 16px | `border-radius: 16px` |
| backdrop-filter | blur(32px) | `backdrop-filter: blur(32px)` |

**Card Title:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFEA9E | `color: #FFEA9E` |
| icon | MM_MEDIA_Target (24x24px) | Left of title, gap: 16px |

**Card Description:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | justified | `text-align: justify` |

**Section Divider (within card):**
| Property | Value | CSS |
|----------|-------|-----|
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: #2E3940` |

**Quantity Section:**
| Property | Value | CSS |
|----------|-------|-----|
| label | "So luong giai thuong:" | Montserrat 24px/700, #FFEA9E |
| icon | MM_MEDIA_Diamond (24x24px) | Left of label, gap: 16px |
| number | 36px/700, #FFFFFF | Large number display |
| unit | 14px/700, #FFFFFF | "Ca nhan" / "Tap the" / "Don vi" next to number, gap: 8px |

**Value Section:**
| Property | Value | CSS |
|----------|-------|-----|
| label | "Gia tri giai thuong:" | Montserrat 24px/700, #FFEA9E |
| icon | MM_MEDIA_License (24x24px) | Left of label, gap: 16px |
| amount | 36px/700, #FFFFFF | Prize value display |
| note | 14px/700, #FFFFFF | "cho moi giai thuong" |

**Bottom Divider (between cards):**
| Property | Value | CSS |
|----------|-------|-----|
| width | 853px | Full width of cards area |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: #2E3940` |

### Sun* Kudos Section — **[REUSE from Homepage]**

> **Note**: This section reuses `KudosSection` from `@/components/homepage/kudos-section.tsx`. The styles below are reference only — the actual implementation inherits all styling from the Homepage component.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 335:12023 | - |
| width | 1152px | `width: 100%` (content area) |
| height | 500px | `height: 500px` |
| display | flex | `display: flex; align-items: center; justify-content: center` |

**Background Card:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 1152px | `width: 100%` |
| height | 500px | `height: 500px` |
| background | url(...) + #0F0F0F | Background image with dark fallback |
| border-radius | 16px | `border-radius: 16px` |

**Content Container:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 470px | `width: 470px` |
| display | flex-col | `display: flex; flex-direction: column` |
| gap | 32px | `gap: 32px` |
| padding-left | ~65px | From left edge of card |

**Subtitle ("Phong trao ghi nhan"):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: #FFFFFF` |

**Title ("Sun* Kudos"):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |
| color | #FFEA9E | `color: #FFEA9E` |

**Description:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | justified | `text-align: justify` |

**"Chi tiet" Button (Filled Gold):**
| Property | Value | CSS |
|----------|-------|-----|
| width | 127px | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #00101A | `color: #00101A` |
| icon | Arrow right (24x24px) | Right of text, gap: 8px |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: #FFE07A (slightly darker gold), transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active | background: #FFD94E |

**"KUDOS" Decorative Text:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | SVN-Gotham | Custom font |
| font-size | 96px | `font-size: 96px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 24px | `line-height: 24px` (compressed) |
| letter-spacing | -13% | `letter-spacing: -0.13em` |
| color | #DBD1C1 | `color: #DBD1C1` (warm beige) |

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 354:4323 | - |
| width | 100% | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex; align-items: center; justify-content: space-between` |

**Logo:**
| Property | Value |
|----------|-------|
| size | 69x64px |
| component | LOGO (shared) |

**Nav Links Container:**
| Property | Value | CSS |
|----------|-------|-----|
| gap | 48px | `gap: 48px` (between nav link groups) |
| display | flex | `display: flex; align-items: center` |

**Footer Nav Link (Default):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| padding | 16px | `padding: 16px` |

**Footer Nav Link (Active -- "Award Information"):**
| Property | Value | CSS |
|----------|-------|-----|
| color | #FFF | `color: #FFF` |
| background | rgba(255, 234, 158, 0.10) | `background-color: rgba(255, 234, 158, 0.10)` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow |

**Copyright:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat Alternates | `font-family: var(--font-montserrat-alternates)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: #FFFFFF` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, min-h-screen, scroll-y, 313:8436)
+-- Header (fixed, top-0, w-full, h-20, bg-rgba(16,20,23,0.80), px-36, py-3, z-50, 313:8440)
|   +-- Left (flex, items-center, gap-16) — nav next to logo, NOT centered
|   |   +-- Logo (52x48px, Image, links to `/`)
|   |   +-- NavTabs (flex, gap-6, Montserrat 16px/700) — 3 items only, no "Tiêu chuẩn chung" in header
|   |       +-- Tab "Giới thiệu SAA" (normal: white)
|   |       +-- Tab "Thông tin giải thưởng" (active: gold + border-bottom + glow + bg gold/10)
|   |       +-- Tab "Sun* Kudos" (normal: white)
|   +-- Right (flex, items-center, gap-2)
|       +-- LanguageSelector (reuse)
|       +-- Avatar (40px, circular, r-full) — avatar only, triggers ProfileDropdown
|
+-- Key Visual Banner (relative, w-full, min-h-[547px], 313:8437) — COMPOSITE SECTION
|   +-- Background Image (absolute, inset-0, z-0, keyvisual-award-bg.png — AWARDS-SPECIFIC)
|   +-- Cover Gradient (absolute, bottom-0, z-1, 1440x627px, bottom-to-top gradient, 313:8439)
|   +-- ROOT FURTHER Overlays (relative z-2, left-aligned, upper area)
|   |   +-- root-text.png (from /images/homepage/)
|   |   +-- further-text.png (from /images/homepage/)
|   +-- A_Title (relative z-2, overlaid at bottom of banner, flex-col, gap-4, 313:8453)
|       +-- Caption "Sun* Annual Awards 2025" (24px/700, #FFF, center, 313:8454)
|       +-- Divider (h-px, bg-[#2E3940], 313:8455)
|       +-- Title Container (flex, items-center, justify-center, gap-8, 313:8456)
|           +-- "Hệ thống giải thưởng SAA 2025" (57px/700, #FFEA9E, 313:8457)
|
+-- Content Container (px-36, py-24, flex-col, gap-[120px], 313:8449)
    +-- B_Award System (flex-row, gap-20, justify-between, 313:8458)
    |   +-- C_Sidebar (w-[178px], flex-col, gap-4, sticky top-20, 313:8459)
    |   |   +-- C.1 Top Talent (active: gold, border-b, glow, icon 24px, 313:8460)
    |   |   +-- C.2 Top Project (default: white, icon 24px, 313:8461)
    |   |   +-- C.3 Top Project Leader (default: white, 313:8462)
    |   |   +-- C.4 Best Manager (default: white, 313:8463)
    |   |   +-- C.5 Signature 2025 Creator (default: white, 313:8464)
    |   |   +-- C.6 MVP (default: white, 313:8465)
    |   |
    |   +-- D_Cards Area (w-[853px], flex-col, gap-20, 313:8466)
    |       +-- D.1 Top Talent (313:8467)
    |       |   +-- Card Content (flex-row, gap-10)
    |       |   |   +-- Image (336x336, r-[24px], border gold 1px, shadow gold, 214:2525)
    |       |   |   +-- Content (flex-col, gap-8, r-4, backdrop-blur-[32px], 214:2526)
    |       |   |       +-- Title Row (flex, gap-4): icon + "Top Talent" (24px/700, #FFEA9E)
    |       |   |       +-- Description (16px/700, #FFF, justify)
    |       |   |       +-- Divider (h-px, bg-[#2E3940])
    |       |   |       +-- Quantity: icon + "So luong giai thuong:" (24px/700, #FFEA9E)
    |       |   |       |   "10" (36px/700, #FFF) + "Ca nhan" (14px/700, #FFF)
    |       |   |       +-- Divider
    |       |   |       +-- Value: icon + "Gia tri giai thuong:" (24px/700, #FFEA9E)
    |       |   |           "7.000.000 VND" (36px/700, #FFF)
    |       |   |           "cho moi giai thuong" (14px/700, #FFF)
    |       |   +-- Bottom Divider (w-full, h-px, bg-[#2E3940])
    |       |
    |       +-- D.2 Top Project (313:8468, same structure)
    |       +-- D.3 Top Project Leader (313:8469, same structure)
    |       +-- D.4 Best Manager (313:8470, same structure)
    |       +-- D.5 Signature 2025 Creator (313:8471, dual value)
    |       +-- D.6 MVP (313:8510, same structure)
    |
    +-- Kudos Section (1152x500px, flex, center, 335:12023)
        +-- BG Card (1152x500px, r-4, bg: image + #0F0F0F)
        +-- Content (w-[470px], flex-col, gap-8)
        |   +-- "Phong trao ghi nhan" (24px/700, #FFF)
        |   +-- "Sun* Kudos" (57px/700, #FFEA9E)
        |   +-- Description (16px/700, #FFF, justify)
        |   +-- "Chi tiet" Button (bg: #FFEA9E, text: #00101A, r-1, flex, gap-2)
        +-- "KUDOS" Logo (SVN-Gotham 96px/400, #DBD1C1, -13% spacing)

+-- Footer (border-t border-[#2E3940], px-[90px], py-10, flex-row on lg+, flex-col on mobile/tablet, justify-between, 354:4323)
    +-- Logo (52x48, link to /)
    +-- NavLinks (4 items, flex)
    |   +-- "Giới thiệu SAA" (16px/700, #FFF)
    |   +-- "Thông tin giải thưởng" (active: bg gold/10, glow)
    |   +-- "Sun* Kudos" (16px/700, #FFF)
    |   +-- "Tiêu chuẩn chung" (16px/700, #FFF)
    +-- Copyright "Bản quyền thuộc về Sun* © 2025" (Montserrat Alternates 16px/700, #FFF)
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
| Header | padding: 12px 16px; nav tabs hidden (hamburger menu) |
| Key Visual | Reduced height, padding: 32px 16px |
| Section Title | font-size: 32px, line-height: 40px |
| Sidebar | Hidden or converted to horizontal scrollable tabs above cards |
| Award Cards | Full width, single column, image: 280px, content stacked below image |
| Card Content | flex-direction: column, image and text stack vertically |
| Kudos Section | padding: 24px 16px, height: auto, "KUDOS" text: 48px |
| Footer | padding: 24px 16px, stacked layout |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 48px; nav may use smaller gap |
| Sidebar | May become horizontal scrollable tabs above cards |
| Award Cards | Image: 280px, content width adjusted |
| Card Layout | flex-direction: column or reduced gap |
| Kudos Section | Adjusted padding, reduced font sizes |
| Footer | padding: 32px 48px |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 80px |
| Content | padding: 64px 80px |
| Sidebar | Visible, sticky, width: 160px |
| Award Cards | Reduced image size to 280px |
| Columns gap | 40px instead of 80px |
| Footer | padding: 40px 80px |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design at 1440px |
| Header | padding: 12px 144px |
| Content | padding: 96px 144px |
| Container | max-width: 1440px, margin: 0 auto |
| Sidebar | 178px wide, sticky |
| Award Cards | 853px content area, 336px images |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Logo (SAA 2025) | 52x48px (header), 69x64px (footer) | N/A (image) | Header left, Footer left |
| Notification Bell | 24x24px | #FFFFFF | Header right |
| Notification Dot | 8x8px | rgba(212,39,29,1) | Bell overlay |
| Flag (VN) | 24x24px | N/A (image) | Language selector |
| Chevron Down | 24x24px | #FFFFFF | Language dropdown |
| User Avatar | 24x24px | N/A (image) | Header right |
| MM_MEDIA_Target | 24x24px | N/A | Sidebar items, award card titles |
| MM_MEDIA_Diamond | 24x24px | N/A | Quantity section label |
| MM_MEDIA_License | 24x24px | N/A | Value section label |
| Arrow Right | 24x24px | #00101A | "Chi tiet" button |
| ROOT FURTHER Logo | variable | N/A (image) | Key visual (338x150px) |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Sidebar Item | color, text-shadow, border-bottom | 150ms | ease-in-out | Hover/Active/IntersectionObserver |
| Header Nav Tab | color, text-shadow, border, background | 150ms | ease-in-out | Hover/Active |
| Page sections | scroll-behavior | smooth | -- | Sidebar click |
| "Chi tiet" Button | background-color | 150ms | ease-in-out | Hover |
| Footer Nav Link | color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page | 313:8436 | `bg-[#00101A] min-h-screen` | `<AwardsSystemPage />` (Server) |
| Header | 313:8440 | `fixed top-0 w-full h-20 bg-[rgb(16,20,23)]/80 px-36 py-3 z-50` | `<Header navContent={navSlot}>` (shared) with `<UserAvatar />` |
| Key Visual Banner | 313:8437 | `relative w-full min-h-[547px]` | `<KeyVisual />` — composite: bg image (`keyvisual-award-bg.png`) + gradient + ROOT FURTHER overlays + section title |
| Background Image | (in 313:8437) | `absolute inset-0 z-0 object-cover` | `<Image />` (next/image, priority, src=`/images/awards/keyvisual-award-bg.png`) |
| Cover Gradient | 313:8439 | `absolute bottom-0 w-full h-[627px] z-[1]` | `<div />` with CSS gradient |
| ROOT FURTHER | (in 313:8437) | `relative z-[2]` | `<Image />` × 2: `root-text.png` + `further-text.png` from `/images/homepage/` |
| Section Title | 313:8453 | `relative z-[2] flex flex-col gap-4 w-full` — INSIDE Key Visual Banner | Part of `<KeyVisual />` |
| Title Display | 313:8457 | `text-[57px] font-bold leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | `<h1 />` inside banner |
| Content Container | 313:8449 | `px-36 py-24 flex flex-col gap-[120px]` | Section in page (starts AFTER banner) |
| Award System | 313:8458 | `flex flex-row gap-20 justify-between` | `<AwardSystem />` |
| Sidebar | 313:8459 | `w-[178px] flex flex-col gap-4 sticky top-20` | `<AwardSidebar />` (Client) |
| Sidebar Item Active | 313:8460 | `flex items-center p-4 border-b border-[#FFEA9E] text-[#FFEA9E] [text-shadow:...]` | `<SidebarItem />` |
| Sidebar Item Default | 313:8461-8465 | `flex items-center p-4 rounded text-white` | `<SidebarItem />` |
| Cards Container | 313:8466 | `flex flex-col gap-20 w-[853px]` | Section in sidebar |
| Award Card | 313:8467-8510 | `flex flex-col gap-20` | `<AwardCard />` |
| Card Image | -- | `w-[336px] h-[336px] rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] mix-blend-screen` | `<Image />` |
| Card Content | -- | `flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]` | `<div />` |
| Kudos Section | 335:12023 | `w-full h-[500px] flex items-center justify-center` | `<KudosSection />` |
| Kudos Card BG | -- | `w-full h-[500px] rounded-2xl bg-[#0F0F0F] overflow-hidden` | `<div />` |
| "Chi tiet" Button | -- | `bg-[#FFEA9E] text-[#00101A] rounded px-4 py-4 font-bold` | `<Link />` or `<button />` |
| Footer | 354:4323 | `border-t border-[#2E3940] px-[90px] py-10 flex items-center justify-between` | `<Footer />` (shared) |

---

## Notes

- **CRITICAL - Banner image**: The Key Visual MUST use `/images/awards/keyvisual-award-bg.png` (awards-specific). Do NOT use the login (`/images/login/keyvisual-bg.png`) or homepage (`/images/homepage/keyvisual-bg.png`) backgrounds. The ROOT FURTHER overlay images (`root-text.png`, `further-text.png`) are shared from `/images/homepage/` and should be positioned on the left side of the banner. The Section Title ("Sun* Annual Awards 2025" + divider + "Hệ thống giải thưởng SAA 2025") is positioned at the bottom of this banner area WITHIN the gradient zone — it must be rendered as part of the `<KeyVisual />` component, NOT as a separate section.
- The header on this page shows "Award Information" as the active tab (gold + border-bottom + glow + background rgba(255,234,158,0.10)), confirming the shared header component respects the current route.
- Award card images use `mix-blend-mode: screen` which creates a lighter effect when composited against the dark background. This is a deliberate design choice for the award aesthetic.
- The sidebar items use the same Button-IC component instances from the design system, with the active state matching `componentId: 186:1501` (with border-bottom) and default state matching `componentId: 186:1433` (without border).
- The "Chi tiet" button in the Kudos section uses a **filled gold background** with dark text (#00101A), which is distinctly different from the outline-style buttons on the Homepage. It uses `componentId: 186:1567`.
- The content area starts at y=88px (below header at 80px + 8px gap), with the key visual extending from y=80 to y=627.
- The footer is a shared component: single horizontal row on PC (flex-row on lg+, flex-col on mobile/tablet) with logo + 4 nav links ("Giới thiệu SAA", "Thông tin giải thưởng" (active), "Sun* Kudos", "Tiêu chuẩn chung") + copyright text "Bản quyền thuộc về Sun* © 2025". "Tiêu chuẩn chung" appears only in the footer, NOT in the header.
- Award card descriptions use `text-align: justified` which may cause uneven spacing in Vietnamese text. Consider using `text-align: left` with `hyphens: auto` for better readability.
- The user avatar in the header MUST use the same circular style as all other pages: `border-radius: 9999px` (circular), no separate user icon — only the avatar image is shown. The avatar serves as the trigger for the profile dropdown. This is consistent across all screens (homepage, awards, kudos).
