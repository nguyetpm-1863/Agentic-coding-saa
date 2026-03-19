# Design Style: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | rgba(16, 20, 23, 0.80) | 80% | Header background overlay |
| --color-accent-gold | #FFEA9E | 100% | Primary accent — headings, borders, active states, badges |
| --color-text-white | #FFFFFF | 100% | Body text, card messages, nav labels |
| --color-text-gold-glow | #FAE287 | 100% | Text shadow glow effect on active elements |
| --color-text-muted | rgba(255, 255, 255, 0.60) | 60% | Timestamps, secondary text, placeholder text |
| --color-border-gold | #FFEA9E | 100% | Card accent borders, section dividers |
| --color-border-muted | #998C5F | 100% | Outline button borders, card borders |
| --color-divider | #2E3940 | 100% | Section separators, footer divider |
| --color-card-bg | #FFF8E1 | 100% | Kudos card background (warm cream) |
| --color-card-bg-hover | #FFF3CC | 100% | Kudos card hover state |
| --color-like-red | #FF4D4D | 100% | Liked heart icon fill |
| --color-like-default | rgba(255, 255, 255, 0.60) | 60% | Default heart icon (outline) |
| --color-chip-text | #FFEA9E | 100% | Hashtag text color (plain text, no chip background) |
| --color-badge-title-text | #00101A | 100% | Badge title text (e.g., "IDOL GIỚI TRẺ") on cream card |
| --color-hero-badge-new | #4CAF50 | 100% | "New Hero" badge background (green) |
| --color-hero-badge-rising | #2196F3 | 100% | "Rising Hero" badge background (blue) |
| --color-hero-badge-super | #F44336 | 100% | "Super Hero" badge background (red) |
| --color-hero-badge-legend | #FFEA9E | 100% | "Legend Hero" badge background (gold) |
| --color-hero-badge-text | #FFFFFF | 100% | Hero badge text color |
| --color-input-bg | rgba(255, 255, 255, 0.08) | 8% | Recognition input pill background |
| --color-input-border | rgba(255, 255, 255, 0.20) | 20% | Recognition input pill border |
| --color-btn-primary-bg | #FFEA9E | 100% | Primary button background (Secret Box) |
| --color-btn-primary-text | #00101A | 100% | Primary button text (dark on gold) |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.10) | 10% | Secondary/outline button background |
| --color-btn-text-bg | rgba(0, 0, 0, 0.00) | 0% | Transparent text button background |
| --color-stats-bg | #00070C | 100% | Stats sidebar background (very dark) |
| --color-spotlight-name | rgba(255, 255, 255, 0.40) to 1.0 | varies | Spotlight word cloud name text (opacity varies by prominence) |
| --color-spotlight-border | #998C5F | 100% | Spotlight container border |
| --color-spotlight-log | rgba(255, 255, 255, 0.70) | 70% | Activity log text in spotlight |
| --color-search-bg | rgba(255, 255, 255, 0.08) | 8% | Search bar background |
| --color-white-10 | rgba(255, 255, 255, 0.10) | 10% | Subtle overlay / gradient end |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| --gradient-hero | linear-gradient(180deg, rgba(0, 16, 26, 0) 0%, #00101A 100%) | Hero banner bottom fade |
| --gradient-card-accent | linear-gradient(135deg, rgba(255, 234, 158, 0.10) 0%, rgba(255, 234, 158, 0) 100%) | Highlighted kudos card accent |
| --gradient-spotlight-bg | dark bg with faint network line overlay decoration | Spotlight board background (decorative) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-hero-title | Montserrat | 40px | 700 | 48px | -0.25px | Hero banner title "He thong ghi nhan loi cam on" |
| --text-section-title | Montserrat | 32px | 700 | 40px | -0.25px | Section headings (HIGHLIGHT KUDOS, SPOTLIGHT BOARD, ALL KUDOS) |
| --text-spotlight-count | Montserrat | 48px | 700 | 56px | -0.5px | "388 KUDOS" count display |
| --text-stats-number | Montserrat | 32px | 700 | 40px | 0 | Stats numbers (25, 15, 5, 3) |
| --text-card-sender | Montserrat | 16px | 700 | 24px | 0.15px | Kudos card sender/receiver name (color: #00101A on cream) |
| --text-card-dept | Montserrat | 12px | 400 | 16px | 0 | Department code e.g. "CEVC10" (color: rgba(0,16,26,0.50)) |
| --text-card-hero-badge | Montserrat | 10px | 700 | 14px | 0 | Hero badge text "New Hero" etc. (color: #FFF on colored bg) |
| --text-card-message | Montserrat | 16px | 400 | 24px | 0.5px | Kudos card message body text (color: #00101A on cream block) |
| --text-card-timestamp | Montserrat | 14px | 400 | 20px | 0.1px | Kudos card timestamp (color: rgba(0,16,26,0.50)) |
| --text-card-title | Montserrat | 16px | 700 | 24px | 0.15px | Kudo title e.g. "IDOL GIỚI TRẺ" (color: #00101A, uppercase) |
| --text-hashtag | Montserrat | 14px | 500 | 20px | 0.1px | Hashtag plain text (color: #FFEA9E — gold on cream) |
| --text-like-count | Montserrat | 16px | 700 | 24px | 0 | Like count "1.000" (color: #00101A on cream) |
| --text-copy-link | Montserrat | 14px | 500 | 20px | 0.1px | "Copy Link" action text (color: rgba(0,16,26,0.50)) |
| --text-input-placeholder | Montserrat | 16px | 400 | 24px | 0.15px | Recognition input placeholder |
| --text-search-placeholder | Montserrat | 14px | 400 | 20px | 0.1px | Search bar placeholder |
| --text-stats-label | Montserrat | 14px | 400 | 20px | 0.1px | Stats labels ("So Kudos ban nhan duoc") |
| --text-btn-label | Montserrat | 16px | 700 | 24px | 0.15px | Button labels ("Mo Secret Box") |
| --text-filter-label | Montserrat | 14px | 500 | 20px | 0.1px | Filter dropdown labels |
| --text-carousel-page | Montserrat | 16px | 500 | 24px | 0 | Carousel pagination "2/5" |
| --text-nav | Montserrat | 14px | 700 | 20px | 0.1px | Header navigation link text |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0 | Footer copyright |
| --text-nav-shadow | — | — | — | — | — | text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Main content horizontal padding (wide) |
| --spacing-header-x | 144px | Header horizontal padding (wide) |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-section-y | 64px | Vertical padding between major sections |
| --spacing-hero-y | 48px | Hero banner vertical padding |
| --spacing-gap-xs | 4px | Micro gaps (icon-to-text in chips) |
| --spacing-gap-sm | 8px | Small element gaps (chip-to-chip, avatar-to-name) |
| --spacing-gap-md | 12px | Standard intra-component gaps |
| --spacing-gap-lg | 16px | Card internal gaps, filter-to-filter gaps |
| --spacing-gap-xl | 24px | Section header-to-content gaps, card-to-card gaps in feed |
| --spacing-gap-2xl | 32px | Stats section padding, major block gaps |
| --spacing-gap-3xl | 48px | Section-to-section gaps |
| --spacing-card-padding | 24px | Kudos card internal padding |
| --spacing-stats-padding | 24px | Stats sidebar internal padding |
| --spacing-input-x | 24px | Recognition input horizontal padding |
| --spacing-input-y | 16px | Recognition input vertical padding |
| --spacing-carousel-gap | 16px | Gap between carousel cards |
| --spacing-feed-gap | 16px | Gap between kudos cards in feed |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-footer-y | 40px | Footer vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-xs | 4px | Small rounding (badges, chips) |
| --radius-sm | 8px | Buttons, filter dropdowns, small cards |
| --radius-md | 12px | Kudos cards, image gallery items |
| --radius-lg | 16px | Stats sidebar, larger containers |
| --radius-xl | 24px | Highlight carousel cards, large containers |
| --radius-pill | 9999px | Recognition input, search bar, avatar |
| --border-card | none | Kudos feed card has no visible border (cream bg card) |
| --border-highlight | 4px solid #FFEA9E | Highlighted kudos card border (thick gold) |
| --border-input | 1px solid rgba(255, 255, 255, 0.20) | Recognition input border |
| --border-search | 1px solid rgba(255, 255, 255, 0.15) | Search bar border |
| --border-stats | 1px solid #998C5F | Stats sidebar and leaderboard border |
| --border-btn-outline | 1px solid #998C5F | Outline/secondary button border |
| --border-footer | 1px solid #2E3940 | Footer top divider |
| --border-filter | 1px solid rgba(255, 255, 255, 0.15) | Filter dropdown border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow on active nav text |
| --shadow-card | 0 2px 8px rgba(0, 0, 0, 0.20) | Kudos card subtle shadow |
| --shadow-card-highlight | none | Highlighted card uses thick 4px gold border instead of shadow |
| --shadow-dropdown | 0 4px 12px rgba(0, 0, 0, 0.30) | Filter dropdown shadow |
| --shadow-none | none | Default — most elements have no box-shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| page-width | 100% (no max-width on outer wrapper) | Consistent with Homepage/Awards — outer `<div>` uses `min-h-screen bg-[#00101A]` only. Do NOT apply `max-w-[1512px] mx-auto` on the page wrapper. |
| content-width | 1224px | Content area within sections (1440px max-w - responsive padding) |
| padding-x | 144px (xl), 80px (lg), 48px (md), 16px (mobile) | Responsive horizontal padding on content sections: `px-4 md:px-12 lg:px-20 xl:px-36` |

### Layout Structure (ASCII)

```
+------------------------------------------------------------------------+
|  Page (full-width, bg: #00101A, scroll-y, NO max-width on wrapper)     |
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  Header (fixed, 1512x80px, bg: rgba(16,20,23,0.80), z-50)         ||
|  |  px: 144px, py: 12px, flex, items-center, justify-between         ||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  A - Hero Banner (KV Kudos)                                        ||
|  |  Full-width, decorative background, dark overlay                   ||
|  |  +--------------------------------------------------------------+  ||
|  |  |  Title: "He thong ghi nhan loi cam on"                      |  ||
|  |  |  KUDOS Logo (SAA 2025 branding)                              |  ||
|  |  +--------------------------------------------------------------+  ||
|  |                                                                    ||
|  |  +--------------------------------------------------------------+  ||
|  |  |  A.1 - Recognition Input (pill-shaped)                       |  ||
|  |  |  [pen icon] "Hom nay, ban muon gui..."     [Search bar]      |  ||
|  |  +--------------------------------------------------------------+  ||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  B - HIGHLIGHT KUDOS                                               ||
|  |  +--------------------------------------------------------------+  ||
|  |  |  Header: "HIGHLIGHT KUDOS" + "Sun* Annual Awards 2025"      |  ||
|  |  |  Filters: [Hashtag v] [Phong ban v]                          |  ||
|  |  +--------------------------------------------------------------+  ||
|  |  +--------------------------------------------------------------+  ||
|  |  |  Carousel                                                    |  ||
|  |  |  [<]  +----------+  +----------+  +----------+  [>]         |  ||
|  |  |       | Featured |  | Featured |  | Featured |              |  ||
|  |  |       | Kudo 1   |  | Kudo 2   |  | Kudo 3   |              |  ||
|  |  |       +----------+  +----------+  +----------+              |  ||
|  |  |                     2/5                                      |  ||
|  |  +--------------------------------------------------------------+  ||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  SPOTLIGHT BOARD                                                   ||
|  |  +--------------------------------------------------------------+  ||
|  |  |  "388 KUDOS" (large count)                                   |  ||
|  |  |  +------------------------------------------------------+   |  ||
|  |  |  |  Graph visualization                                 |   |  ||
|  |  |  |  (nodes = users, edges = kudos connections)           |   |  ||
|  |  |  +------------------------------------------------------+   |  ||
|  |  +--------------------------------------------------------------+  ||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  ALL KUDOS                                                         ||
|  |  +------------------------------------------+  +----------------+  ||
|  |  |  Kudos Feed (scrollable)                 |  |  Stats Sidebar |  ||
|  |  |  +------------------------------------+  |  |                |  ||
|  |  |  |  Kudos Card                        |  |  |  Received: 25 |  ||
|  |  |  |  +------+ Sender Name    timestamp |  |  |  Sent: 15     |  ||
|  |  |  |  |avatar| -> Receiver Name         |  |  |  Total: 25    |  ||
|  |  |  |  +------+ [IDOL GIOI TRE]          |  |  |               |  ||
|  |  |  |                                    |  |  |  Secret Box   |  ||
|  |  |  |  Message text content...           |  |  |  Opened: 5    |  ||
|  |  |  |                                    |  |  |  Unopened: 3   |  ||
|  |  |  |  [#Dedicated] [#Inspiring] [#...]  |  |  |               |  ||
|  |  |  |                                    |  |  |  [Mo Secret   |  ||
|  |  |  |  +------+ +------+ +------+       |  |  |   Box]         |  ||
|  |  |  |  | img1 | | img2 | | img3 |       |  |  +----------------+  ||
|  |  |  |  +------+ +------+ +------+       |  |                      ||
|  |  |  |                                    |  |                      ||
|  |  |  |  1,000 <3       Copy Link          |  |                      ||
|  |  |  +------------------------------------+  |                      ||
|  |  |                                          |                      ||
|  |  |  +------------------------------------+  |                      ||
|  |  |  |  Kudos Card 2...                   |  |                      ||
|  |  |  +------------------------------------+  |                      ||
|  |  +------------------------------------------+                      ||
|  +--------------------------------------------------------------------+|
|                                                                        |
|  +--------------------------------------------------------------------+|
|  |  Footer (border-top: 1px solid #2E3940, px: 90px, py: 40px)       ||
|  +--------------------------------------------------------------------+|
+------------------------------------------------------------------------+
```

---

## Component Style Details

### A - Hero Banner (KV Kudos)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13437 | - |
| width | 100% | `width: 100%` |
| min-height | 400px | `min-height: 400px` (estimated) |
| background | Decorative image + dark overlay | `background-image` + gradient overlay |
| padding | 48px 144px | `padding: 48px 144px` (wide) |
| display | flex, flex-col | `display: flex; flex-direction: column` |
| align-items | center | `align-items: center` |
| text-align | center | `text-align: center` |
| position | relative | `position: relative` (for overlay) |

**Title ("He thong ghi nhan loi cam on"):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 40px | `font-size: 40px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: #FFFFFF` |

### A.1 - Recognition Input (Pill)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13449 | - |
| width | ~600px | `width: 100%; max-width: 600px` |
| height | 56px | `height: 56px` |
| border-radius | 9999px | `border-radius: 9999px` (pill) |
| background | rgba(255, 255, 255, 0.08) | `background-color: rgba(255, 255, 255, 0.08)` |
| border | 1px solid rgba(255, 255, 255, 0.20) | `border: 1px solid rgba(255, 255, 255, 0.20)` |
| padding | 16px 24px | `padding: 16px 24px` |
| display | flex | `display: flex; align-items: center; gap: 12px` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 400 | `font-weight: 400` |
| color (placeholder) | rgba(255, 255, 255, 0.60) | `color: rgba(255, 255, 255, 0.60)` |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(255, 255, 255, 0.12), border-color: rgba(255, 255, 255, 0.30), transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Pen icon (left):**
| Property | Value |
|----------|-------|
| size | 20x20px |
| color | rgba(255, 255, 255, 0.60) |

### Search Bar

| Property | Value | CSS |
|----------|-------|-----|
| width | ~300px | `width: 100%; max-width: 300px` |
| height | 44px | `height: 44px` |
| border-radius | 9999px | `border-radius: 9999px` (pill) |
| background | rgba(255, 255, 255, 0.08) | `background-color: rgba(255, 255, 255, 0.08)` |
| border | 1px solid rgba(255, 255, 255, 0.15) | `border: 1px solid rgba(255, 255, 255, 0.15)` |
| padding | 12px 20px | `padding: 12px 20px` |
| font-size | 14px | `font-size: 14px` |
| color (placeholder) | rgba(255, 255, 255, 0.50) | `color: rgba(255, 255, 255, 0.50)` |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Focus | border-color: #FFEA9E, outline: none, box-shadow: 0 0 0 2px rgba(255, 234, 158, 0.20) |
| With results | dropdown appears below (--shadow-dropdown) |

### B - Highlight Kudos Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13451 | - |
| width | 100% | `width: 100%` |
| padding | 64px 144px | `padding: 64px 144px` (wide) |
| display | flex, flex-col | `display: flex; flex-direction: column; gap: 24px` |

**Section Header:**
| Property | Value | CSS |
|----------|-------|-----|
| "HIGHLIGHT KUDOS" | Montserrat 32px/700, #FFEA9E | `font-size: 32px; font-weight: 700; color: #FFEA9E` |
| "Sun* Annual Awards 2025" | Montserrat 14px/500, rgba(255,255,255,0.60) | `font-size: 14px; color: rgba(255,255,255,0.60)` |

**Filter Dropdowns:**
| Property | Value | CSS |
|----------|-------|-----|
| height | 40px | `height: 40px` |
| border-radius | 8px | `border-radius: 8px` |
| background | transparent | `background: transparent` |
| border | 1px solid rgba(255, 255, 255, 0.15) | `border: 1px solid rgba(255, 255, 255, 0.15)` |
| padding | 8px 16px | `padding: 8px 16px` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| color | #FFFFFF | `color: #FFFFFF` |
| gap (between filters) | 12px | `gap: 12px` |

**Highlight Card:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13465 | - |
| width | 528px | `width: 528px` |
| border-radius | 16px | `border-radius: 16px` |
| background | #FFF8E1 | `background: #FFF8E1` (warm cream, same as feed cards) |
| border | 4px solid #FFEA9E | `border: 4px solid #FFEA9E` (thick gold border) |
| padding | 24px 24px 16px 24px | `padding: 24px 24px 16px 24px` |
| display | flex, flex-col | `display: flex; flex-direction: column; gap: 16px` |
| message-max-lines | 3 | Truncate message at 3 lines with "..." |
| actions | "1.000 ❤️", "Copy Link 🔗", "Xem chi tiết ↗" | 3 actions at bottom |

**Carousel Container:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; overflow: hidden` |
| gap | 16px | `gap: 16px` |
| visible-cards | 3 (desktop) | 3 highlight cards visible at a time |

**Carousel Arrow Buttons:**
| Property | Value | CSS |
|----------|-------|-----|
| size | 40x40px | `width: 40px; height: 40px` |
| border-radius | 50% | `border-radius: 50%` |
| background | rgba(255, 255, 255, 0.10) | `background: rgba(255, 255, 255, 0.10)` |
| color | #FFFFFF | `color: #FFFFFF` |
| border | none | `border: none` |

**States (arrow):**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(255, 255, 255, 0.20), transition 150ms |
| Disabled | opacity: 0.3, cursor: not-allowed |

**Pagination Text ("2/5"):**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 500 |
| color | rgba(255, 255, 255, 0.60) |
| text-align | center |

### Kudos Card (Feed)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3127:21871 | - |
| width | 680px | `width: 680px` (fills feed column, max-width responsive) |
| border-radius | 24px | `border-radius: 24px` |
| background | #FFF8E1 | `background: #FFF8E1` (warm cream) |
| border | none | No visible border |
| padding | 40px 40px 16px 40px | `padding: 40px 40px 16px 40px` |
| display | flex, flex-col | `display: flex; flex-direction: column; gap: 16px` |

**Card Header (sender → receiver row):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; align-items: center; justify-content: center; gap: 24px` |
| avatar-size | 56x56px | `width: 56px; height: 56px; border-radius: 9999px` |
| sender-name | Montserrat 16px/700, #00101A | `font-weight: 700; color: #00101A` |
| receiver-name | Montserrat 16px/700, #00101A | `font-weight: 700; color: #00101A` |
| dept-code | Montserrat 12px/400, rgba(0,16,26,0.50) | Department code e.g. "CEVC10" |
| arrow-icon | Play/triangle icon, 24px, #00101A | Triangle arrow between sender/receiver |
| hero-badge | inline-flex, rounded-full, px-2 py-0.5 | Colored badge: "New Hero" (green), "Rising Hero" (blue), "Super Hero" (red), "Legend Hero" (gold) |
| hero-badge-text | Montserrat 10px/700, #FFFFFF | White text on colored badge |

**Timestamp:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 400 | `font-weight: 400` |
| color | rgba(0, 16, 26, 0.50) | Muted dark color on cream bg |

**Kudo Title ("IDOL GIỚI TRẺ"):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; align-items: center; justify-content: center; gap: 8px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` (dark text on cream card) |
| text-transform | uppercase | `text-transform: uppercase` |
| pen-icon | 16px, #00101A | Small edit/pen icon to the right of title |

**Message Text Block:**
| Property | Value | CSS |
|----------|-------|-----|
| background | rgba(255, 234, 158, 0.30) | Cream/yellow highlighted block within card |
| border-radius | 12px | `border-radius: 12px` |
| padding | 16px | `padding: 16px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 24px | `line-height: 24px` |
| color | #00101A | `color: #00101A` (dark text) |
| max-lines | 5 (feed), 3 (highlight) | Truncate with "..." if exceeds |

**Hashtags (plain text, not chips):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex, flex-wrap | `display: flex; flex-wrap: wrap; gap: 4px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| color | #FFEA9E | `color: #FFEA9E` (gold text on cream bg — plain text, no chip/pill bg or border) |

**Image Gallery:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; gap: 8px; flex-wrap: wrap` |
| thumbnail-size | 80x80px | `width: 80px; height: 80px` |
| thumbnail-radius | 8px | `border-radius: 8px` |
| thumbnail-fit | cover | `object-fit: cover` |
| cursor | pointer | `cursor: pointer` (opens lightbox) |

**Action Bar (bottom of card):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; justify-content: space-between; align-items: center` |
| border-top | 1px solid rgba(0, 16, 26, 0.10) | Subtle separator above actions |
| padding-top | 16px | `padding-top: 16px` |

**Like Button & Count:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; align-items: center; gap: 6px` |
| heart-icon-size | 20x20px | `width: 20px; height: 20px` |
| heart-default | rgba(0, 16, 26, 0.30), stroke only | Outline heart (dark on cream) |
| heart-liked | #FF4D4D, filled | Filled red heart |
| count-text | Montserrat 16px/700, #00101A | `font-size: 16px; font-weight: 700` (e.g. "1.000") |
| count-format | dot-separated thousands | "1.000" not "1,000" |
| cursor | pointer | `cursor: pointer` |

**States (like):**
| State | Changes |
|-------|---------|
| Default (not liked) | heart outline, dark/30% on cream bg |
| Hover | heart outline opacity increases, scale(1.1), transition 150ms |
| Liked | heart filled #FF4D4D, scale animation (pop: 1.0 -> 1.3 -> 1.0, 200ms) |

**Copy Link:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| color | rgba(0, 16, 26, 0.50) | `color: rgba(0, 16, 26, 0.50)` (dark muted on cream) |
| icon | link/chain icon 16px | Link icon next to text |
| cursor | pointer | `cursor: pointer` |

**States (copy link):**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | color: #00101A, transition 150ms |
| Clicked | text changes to "Đã sao chép!" briefly (2s), color: #FFEA9E |

### Stats Sidebar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13489 | - |
| width | 422px | `width: 422px` (desktop) |
| border-radius | 17px | `border-radius: 17px` |
| background | #00070C | `background: #00070C` (very dark) |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` (gold/muted border) |
| padding | 24px | `padding: 24px` |
| display | flex, flex-col | `display: flex; flex-direction: column; gap: 10px` |
| position | sticky | `position: sticky; top: 100px` (below header) |

**Stat Row:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; justify-content: space-between; align-items: center` |
| label | Montserrat 14px/400, rgba(255,255,255,0.60) | `font-size: 14px; color: rgba(255,255,255,0.60)` |
| value | Montserrat 32px/700, #FFEA9E | `font-size: 32px; font-weight: 700; color: #FFEA9E` |

**"Mở Secret Box" Button:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13497 | - |
| width | 100% (374px in Figma) | `width: 100%` |
| height | 60px | `height: 60px` |
| border-radius | 8px | `border-radius: 8px` |
| background | #FFEA9E | `background: #FFEA9E` |
| color | #00101A | `color: #00101A` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| icon | gift 🎁 icon, 20px | Gift box icon to the right of text |
| cursor | pointer | `cursor: pointer` |

**States (Secret Box button):**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: #FFE580, transition 150ms |
| Active | background: #FFD84D |
| Disabled | opacity: 0.4, cursor: not-allowed |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

### Top Sunners Leaderboard ("10 SUNNER NHẬN QUÀ MỚI NHẤT")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13510 | - |
| background | #00070C | `background: #00070C` (same dark as stats) |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 17px | `border-radius: 17px` |
| padding | 24px | `padding: 24px` |
| title | Montserrat 16px/700, #FFEA9E | `font-size: 16px; font-weight: 700; color: #FFEA9E; text-align: center` |
| display | flex, flex-col | `display: flex; flex-direction: column; gap: 12px` |

**Leaderboard Entry:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex; align-items: center; gap: 12px` |
| avatar-size | 48x48px | `width: 48px; height: 48px; border-radius: 9999px` |
| avatar-border | 3px solid (color varies: red, green, gold, blue) | Colored circle border around avatar |
| name | Montserrat 14px/700, #FFEA9E | `font-size: 14px; font-weight: 700; color: #FFEA9E` |
| description | Montserrat 12px/400, rgba(255,255,255,0.60) | `font-size: 12px; color: rgba(255,255,255,0.60)` — e.g. "Nhận được 1 áo phòng SAA" |

### Write Kudo FAB (Floating Action Button)

| Property | Value | CSS |
|----------|-------|-----|
| position | fixed | `position: fixed; bottom: 24px; right: 24px; z-index: 40` |
| size | 56x56px | `width: 56px; height: 56px` |
| border-radius | 50% | `border-radius: 50%` |
| background | #FFEA9E | `background: #FFEA9E` |
| color | #00101A | `color: #00101A` |
| icon | Pen/Write (24x24px) | Centered pen icon |
| box-shadow | 0 4px 12px rgba(0, 0, 0, 0.30) | Elevated shadow |

**States (FAB):**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: #FFE580, scale(1.05), transition 150ms |
| Active | background: #FFD84D, scale(0.95) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

### Highlight Card Actions

**"Xem chi tiết ↗" Link (highlight cards only):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| color | rgba(0, 16, 26, 0.50) | `color: rgba(0, 16, 26, 0.50)` (dark muted on cream card) |
| display | flex, items-center, gap-1 | With external link icon ↗ |
| cursor | pointer | `cursor: pointer` |

**States (Xem chi tiết):**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | color: #00101A, transition 150ms |

### Spotlight Board

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:14174 | - |
| width | 1157px | `width: 100%` (fills content area) |
| height | 548px | `min-height: 548px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 47px | `border-radius: 47px` (large rounded container) |
| background | dark with subtle network lines overlay | Dark bg with faint graph lines decoration |
| overflow | hidden | `overflow: hidden` |
| position | relative | `position: relative` |

**Count Display ("388 KUDOS"):**
| Property | Value | CSS |
|----------|-------|-----|
| position | absolute, top-center | `position: absolute; top: 16px; left: 50%; transform: translateX(-50%)` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 48px | `font-size: 48px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

**Word Cloud Visualization (NOT graph/network):**
| Property | Value |
|----------|-------|
| type | Word cloud — scattered user names at varying sizes |
| name-sizes | 12px to 28px (varies by kudos count) |
| name-color | rgba(255, 255, 255, 0.40) to rgba(255, 255, 255, 1.0) | Opacity varies |
| prominent-names | larger font, bolder, higher opacity (e.g. "Nguyễn Hoàng Linh") |
| layout | random scatter across full container area |

**Search Input (top-left):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:14833 | - |
| position | absolute, top-left | `position: absolute; top: 16px; left: 24px` |
| width | ~200px | `width: 200px` |
| height | 40px | `height: 40px` |
| border-radius | 8px | `border-radius: 8px` |
| background | rgba(255, 255, 255, 0.08) | Subtle dark input |
| placeholder | "Tìm kiếm" | Search icon + placeholder text |

**Activity Log (bottom-left):**
| Property | Value |
|----------|-------|
| position | absolute, bottom-left |
| content | Real-time log entries: "08:30PM Nguyễn Bá Chức đã nhận được một Kudos mới" |
| font-size | 12px |
| color | rgba(255, 255, 255, 0.70) |
| max-entries | 6 visible, stacked vertically |
| bold-name | User name in bold within each entry |

**Pan/Zoom Controls (bottom-right):**
| Property | Value |
|----------|-------|
| **Node ID** | 3007:17479 | - |
| position | absolute, bottom-right |
| icon-buttons | 2 icons (expand/contract), 24px each |
| color | rgba(255, 255, 255, 0.60) |

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| background | #00101A | Matches page background |

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
|-- Header (fixed, top-0, w-full, h-20, bg-rgba(16,20,23,0.80), px-36, py-3, z-50)
|   |-- Left (flex, items-center, gap-16) — nav next to logo, NOT centered
|   |   |-- Logo (52x48px, Image, links to `/`)
|   |   +-- NavTabs (flex, gap-6, Montserrat 14px/700) — 3 items only, no "Tiêu chuẩn chung"
|   |       +-- "Giới thiệu SAA" | "Thông tin giải thưởng" | "Sun* Kudos" (active)
|   +-- Right (flex, items-center, gap-2)
|       |-- NotificationBell (bell icon, consistent with Homepage)
|       |-- LanguageSelector
|       +-- Avatar (circular, 40px) — avatar only, triggers ProfileDropdown
|
|-- A_HeroBanner (relative, w-full, min-h-[400px])
|   |-- Background Image (absolute, inset-0, z-0, object-cover)
|   |-- Overlay (absolute, inset-0, z-1, gradient)
|   +-- Content (relative, z-10, text-center, px-36, py-12)
|       |-- Title "He thong ghi nhan loi cam on" (Montserrat 40px/700, #FFF)
|       |-- KUDOS Logo (Image)
|       +-- InputRow (flex, justify-between, items-center, gap-16)
|           |-- A.1_RecognitionInput (pill, 600px max, h-14, bg-white/8, border-white/20)
|           |   |-- PenIcon (20px, white/60)
|           |   +-- Placeholder text (16px/400, white/60)
|           +-- SearchBar (pill, 300px max, h-11, bg-white/8, border-white/15)
|
|-- B_HighlightKudos (px-36, py-16)
|   |-- Header (flex, justify-between, items-center)
|   |   |-- Title "HIGHLIGHT KUDOS" (Montserrat 32px/700, #FFEA9E)
|   |   |-- Label "Sun* Annual Awards 2025" (14px/500, white/60)
|   |   +-- Filters (flex, gap-3)
|   |       |-- HashtagDropdown (h-10, r-2, border-white/15)
|   |       +-- DepartmentDropdown (h-10, r-2, border-white/15)
|   +-- Carousel (flex, items-center, gap-4)
|       |-- LeftArrow (40px circle, bg-white/10)
|       |-- CardsContainer (flex, overflow-hidden, gap-4)
|       |   +-- HighlightCard[] (w-[528px], r-4, bg-[#FFF8E1], border-4-[#FFEA9E], p-[24px_24px_16px])
|       |       |-- Same structure as KudoCard but:
|       |       |   - message max 3 lines (vs 5 in feed)
|       |       |   - extra action: "Xem chi tiết ↗"
|       |       +-- Actions: "1.000 ❤️" | "Copy Link 🔗" | "Xem chi tiết ↗"
|       |-- RightArrow (40px circle, bg-white/10)
|       +-- Pagination "2/5" (bold "2", normal "/5", 16px/500, white/60, text-center)
|
|-- SpotlightBoard (px-36, py-16)
|   |-- Title "SPOTLIGHT BOARD" (Montserrat 32px/700, #FFEA9E)
|   +-- SpotlightContainer (r-[47px], border-[#998C5F], h-[548px], relative, overflow-hidden)
|       |-- SearchInput (absolute, top-left, 200px, "Tìm kiếm")
|       |-- Count "388 KUDOS" (absolute, top-center, 48px/700, #FFF)
|       |-- WordCloud (scattered names at varying sizes, 12-28px, white varying opacity)
|       |-- ActivityLog (absolute, bottom-left, 12px, white/70, real-time entries)
|       +-- PanZoomControls (absolute, bottom-right, icon buttons)
|
|-- AllKudos (px-36, py-16)
|   |-- Title "ALL KUDOS" (Montserrat 32px/700, #FFEA9E)
|   +-- ContentRow (flex, gap-6)
|       |-- Feed (flex-1, flex-col, gap-4)
|       |   +-- KudoCard[] (r-[24px], bg-[#FFF8E1], p-[40px_40px_16px_40px])
|       |       |-- CardHeader (flex, items-center, justify-center, gap-6)
|       |       |   |-- SenderBlock (flex-col, items-center)
|       |       |   |   |-- SenderAvatar (56px, pill)
|       |       |   |   |-- SenderName (16px/700, #00101A)
|       |       |   |   |-- DeptCode (12px/400, dark/50) e.g. "CEVC10"
|       |       |   |   +-- HeroBadge (pill, colored bg, 10px/700, white) e.g. "New Hero"
|       |       |   |-- ArrowIcon (24px, triangle/play, #00101A)
|       |       |   +-- ReceiverBlock (same as SenderBlock)
|       |       |-- Timestamp (14px/400, dark/50) e.g. "10:00 - 10/30/2025"
|       |       |-- KudoTitle (16px/700, #00101A, uppercase) + PenIcon e.g. "IDOL GIỚI TRẺ"
|       |       |-- MessageBlock (bg-gold/30, r-3, p-4, 16px/400, #00101A)
|       |       |-- ImageGallery (flex, gap-2)
|       |       |   +-- Thumbnail[] (80x80, r-2, object-cover, max 5)
|       |       |-- Hashtags (flex-wrap, gap-1, 14px/500, #FFEA9E — plain text, no chips)
|       |       +-- Actions (flex, justify-between, border-t, pt-4)
|       |           |-- LikeButton (flex, items-center, gap-1.5)
|       |           |   |-- HeartIcon (20px, dark/30 or #FF4D4D filled)
|       |           |   +-- Count (16px/700, #00101A) e.g. "1.000"
|       |           +-- CopyLink (14px/500, dark/50, link icon)
|       +-- StatsSidebar (w-[422px], sticky top-[100px])
|           |-- StatsCard (r-[17px], bg-[#00070C], border-[#998C5F], p-6)
|           |   |-- StatRow[] (flex, justify-between)
|           |   |   |-- Label (14px/400, white/60) e.g. "Số Kudos bạn nhận được:"
|           |   |   +-- Value (32px/700, #FFEA9E) e.g. "25"
|           |   |-- "Số tim bạn nhận được🔥" (with fire emoji)
|           |   |-- Divider (1px solid #2E3940)
|           |   |-- SecretBoxStats
|           |   +-- SecretBoxButton (w-full, h-[60px], r-2, bg-#FFEA9E, #00101A text + 🎁 icon)
|           +-- LeaderboardCard (r-[17px], bg-[#00070C], border-[#998C5F], p-6)
|               |-- Title "10 SUNNER NHẬN QUÀ MỚI NHẤT" (16px/700, #FFEA9E, center)
|               +-- Entry[] (flex, gap-3)
|                   |-- Avatar (48px, pill, colored border)
|                   |-- Name (14px/700, #FFEA9E)
|                   +-- Desc (12px/400, white/60) e.g. "Nhận được 1 áo phòng SAA"
|
+-- Footer (border-t border-[#2E3940], px-[90px], py-10, flex-row on lg+, flex-col on mobile/tablet, justify-between)
    |-- Logo (52x48, link to /)
    |-- NavLinks (4 items: "Giới thiệu SAA", "Thông tin giải thưởng", "Sun* Kudos" (active), "Tiêu chuẩn chung")
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
| Hero Banner | padding: 32px 16px; title font-size: 24px |
| Recognition Input | full-width, max-width: none |
| Search Bar | full-width below input, max-width: none |
| Input Row | flex-col, gap: 12px (stacked vertically) |
| Highlight Section | padding: 32px 16px |
| Carousel | single card visible, swipe-enabled |
| Filter Dropdowns | full-width, stacked vertically |
| Spotlight Board | padding: 32px 16px; reduced graph size, count font-size: 32px |
| All Kudos Section | padding: 32px 16px; single column |
| Stats Sidebar | full-width, displayed above or below feed (not sticky) |
| Kudos Card | padding: 16px; image thumbnails 60x60px |
| Footer | padding: 24px 16px; stacked layout |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 48px; nav tabs visible with smaller gap (32px) |
| Hero Banner | padding: 48px 48px |
| Input Row | side-by-side, gap: 12px |
| Highlight Section | padding: 48px 48px; 2 carousel cards visible |
| Spotlight Board | padding: 48px 48px |
| All Kudos Section | padding: 48px 48px |
| Stats Sidebar | full-width above feed or collapsible panel |
| Footer | padding: 32px 48px |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 80px |
| Hero Banner | padding: 48px 80px |
| Highlight Section | padding: 64px 80px; 3 carousel cards visible |
| Spotlight Board | padding: 64px 80px |
| All Kudos Section | padding: 64px 80px; sidebar appears beside feed |
| Stats Sidebar | width: 380px, sticky |
| Footer | padding: 40px 80px |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design at 1512px |
| Header | padding: 12px 144px |
| Content sections | padding: 64px 144px |
| Stats Sidebar | width: 422px, sticky |
| Container | No max-width on page wrapper (consistent with Homepage/Awards). Internal content sections use max-w-[1440px] mx-auto with responsive padding. |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Pen/Write | 20x20px | rgba(255,255,255,0.60) | Recognition input left icon |
| Search | 20x20px | rgba(255,255,255,0.50) | Search bar left icon |
| Play/Triangle | 24x24px | #00101A | Arrow between sender → receiver in card |
| Heart (outline) | 20x20px | rgba(0,16,26,0.30) | Like button (not liked) on cream card |
| Heart (filled) | 20x20px | #FF4D4D | Like button (liked) |
| Link/Copy | 16x16px | rgba(0,16,26,0.50) | Copy Link action icon on cream card |
| Pen/Edit | 16x16px | #00101A | Edit icon next to kudo title in card |
| Gift/Box | 20x20px | #00101A | Gift icon in "Mở Secret Box" button |
| Fire | 20x20px | — | 🔥 emoji next to "Số tim bạn nhận được" |
| Chevron Left | 20x20px | #FFFFFF | Carousel left arrow |
| Chevron Right | 20x20px | #FFFFFF | Carousel right arrow |
| Chevron Down | 16x16px | rgba(255,255,255,0.60) | Filter dropdown indicator |
| Expand | 24x24px | rgba(255,255,255,0.60) | Spotlight pan/zoom expand |
| Contract | 24x24px | rgba(255,255,255,0.60) | Spotlight pan/zoom contract |
| Logo (SAA 2025) | 52x48px | N/A (image) | Header left |
| KUDOS Logo | variable | N/A (image) | Hero banner |
| Notification Bell | 24x24px | #FFFFFF | Header right |
| Notification Dot | 8x8px | rgba(212,39,29,1) | Bell overlay |
| User Avatar | 40x40px | N/A (image) | Header, card sender/receiver |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Recognition Input | background, border-color | 150ms | ease-in-out | Hover |
| Search Bar | border-color, box-shadow | 150ms | ease-in-out | Focus |
| Carousel Slide | transform | 300ms | ease-in-out | Arrow click |
| Like Heart | transform (scale) | 200ms | ease-out | Click (pop: 1.0 -> 1.3 -> 1.0) |
| Like Heart | fill color | 150ms | ease-in | Click |
| Copy Link Text | color change | 150ms | ease-in | Click (temporary "Copied!") |
| Kudos Card | background-color | 150ms | ease-in-out | Hover |
| Filter Dropdown | opacity, transform (translateY) | 150ms | ease-out | Toggle open/close |
| Secret Box Button | background-color | 150ms | ease-in-out | Hover |
| Skeleton Loading | opacity | 1500ms | ease-in-out | Repeat (animate-pulse) |
| Nav Tab | color, text-shadow, border | 150ms | ease-in-out | Hover/Active |
| Carousel Arrow | background-color | 150ms | ease-in-out | Hover |
| Hashtag Chip | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page | 2940:13431 | `bg-[#00101A] min-h-screen` | `<KudosLiveBoardPage />` (Server) |
| Header | (shared) | `fixed top-0 w-full h-20 bg-[rgb(16,20,23)]/80 px-36 py-3 z-50` | `<Header navContent={navSlot}>` (shared) with `<UserAvatar />` |
| Hero Banner | 2940:13437 | `relative w-full min-h-[400px]` | `<KudosHeroBanner />` |
| Recognition Input | 2940:13449 | `rounded-full h-14 bg-white/[0.08] border border-white/20 px-6 py-4 flex items-center gap-3 cursor-pointer` | `<RecognitionInput />` (Client) |
| Search Bar | — | `rounded-full h-11 bg-white/[0.08] border border-white/[0.15] px-5 py-3` | `<SearchBar />` (Client) |
| Highlight Section | 2940:13451 | `px-36 py-16` | `<HighlightKudos />` |
| Carousel | — | `flex items-center gap-4` | `<HighlightCarousel />` (Client) |
| Filter Dropdown | — | `h-10 rounded-lg border border-white/[0.15] px-4 py-2` | `<FilterDropdown />` (Client) |
| Spotlight Board | 2940:14174 | `rounded-[47px] border border-[#998C5F] min-h-[548px] relative overflow-hidden` | `<SpotlightBoard />` (Client) |
| Word Cloud | — | `absolute inset-0` scattered names | `<WordCloud />` (Client, Canvas/SVG) |
| Activity Log | — | `absolute bottom-4 left-6` real-time entries | `<ActivityLog />` (Client) |
| All Kudos Section | — | `px-36 py-16` | `<AllKudos />` |
| Kudos Feed | — | `flex-1 flex flex-col gap-4` | `<KudosFeed />` (Client) |
| Kudos Card | 3127:21871 | `rounded-[24px] bg-[#FFF8E1] p-[40px_40px_16px_40px]` | `<KudoCard />` |
| Kudo Title | — | `text-base font-bold text-[#00101A] uppercase flex items-center gap-2` | Inline in `<KudoCard />` |
| Hero Badge | — | `rounded-full px-2 py-0.5 text-[10px] font-bold text-white` + dynamic bg color | `<HeroBadge />` |
| Hashtags | — | `flex flex-wrap gap-1 text-sm font-medium text-[#FFEA9E]` (plain text, no chip) | Inline in `<KudoCard />` |
| Message Block | — | `bg-[#FFEA9E]/30 rounded-xl p-4 text-base text-[#00101A]` | Inline in `<KudoCard />` |
| Image Gallery | — | `flex gap-2 flex-wrap` | `<ImageGallery />` (Client) |
| Like Button | — | `flex items-center gap-1.5 cursor-pointer` | `<LikeButton />` (Client) |
| Copy Link | — | `text-sm text-white/60 cursor-pointer` | `<CopyLinkButton />` (Client) |
| Stats Sidebar | 2940:13489 | `w-[422px] sticky top-[100px] rounded-[17px] bg-[#00070C] border border-[#998C5F] p-6` | `<StatsSidebar />` (Client) |
| Secret Box Button | 2940:13497 | `w-full h-[60px] rounded-lg bg-[#FFEA9E] text-[#00101A] font-bold` | `<SecretBoxButton />` (Client) |
| Leaderboard | 2940:13510 | `rounded-[17px] bg-[#00070C] border border-[#998C5F] p-6` | `<TopSunners />` |
| Footer | (shared) | `border-t border-[#2E3940] px-[90px] py-10` | `<Footer />` (shared) |

---

## Notes

- The header and footer are shared components with the Homepage — reuse `<Header />` and `<Footer />` components.
- The recognition input pill uses a full border-radius (9999px / pill shape), distinct from the standard 8px radius buttons used elsewhere. This is an intentional design choice to make it feel like a text input rather than a button.
- Kudos cards are the most complex atomic component on this screen with 7+ sub-elements. Consider extracting sub-components: `<KudoCardHeader />`, `<KudoCardBody />`, `<KudoCardActions />`.
- The Spotlight Board graph visualization is the most technically challenging element. Evaluate lightweight options: custom SVG, HTML Canvas, or a minimal library like d3-force (but watch bundle size per constitution Principle VI).
- The like interaction MUST use optimistic updates for perceived performance. The server action reconciles the actual state.
- Image gallery thumbnails at 80x80px on desktop should use `next/image` with appropriate sizing and lazy loading since they are below the fold.
- The Stats Sidebar uses `position: sticky` on desktop to remain visible while scrolling the feed. On mobile/tablet, it becomes a static block above or below the feed.
- Carousel page count format "2/5" suggests server-side pagination metadata (total_pages, current_page) is required from the highlights API.
- Filter dropdowns (Hashtag, Department) should pre-fetch their options on page load and cache them. They affect only the Highlight carousel, not the All Kudos feed.
- The Secret Box button uses the primary gold fill (#FFEA9E) with dark text (#00101A) — this is the only primary/filled button on the page, making it the strongest visual CTA.
- Number formatting for like counts (e.g., "1,000") must be locale-aware. Consider using `Intl.NumberFormat`.
