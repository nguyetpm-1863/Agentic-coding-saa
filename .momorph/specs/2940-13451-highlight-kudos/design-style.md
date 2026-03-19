# Design Style: Highlight Kudos Section

**Frame ID**: `2940:13431` (section `2940:13451`, card `2940:13465`)
**Frame Name**: `Sun* Kudos - Live board` (Highlight Kudos Section)
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-16

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-accent-gold | #FFEA9E | 100% | Title text, card border, gold dividers |
| --color-text-white | #FFFFFF | 100% | Subtitle text, user names |
| --color-text-secondary | #999999 | 100% | Pagination text, department text |
| --color-divider-section | #2E3940 | 100% | Section divider between subtitle and title |
| --color-divider-gold | #FFEA9E | 100% | Divider lines inside kudo cards |
| --color-card-bg | #FFF8E1 | 100% | Kudo card background |
| --color-card-border | #FFEA9E | 100% | Kudo card border (4px) |
| --color-card-hover | #FFF3CC | 100% | Kudo card hover bg |
| --color-filter-bg | rgba(255, 234, 158, 0.10) | 10% | Filter dropdown button background |
| --color-filter-border | #998C5F | 100% | Filter dropdown button border |
| --color-hashtag-red | #D4271D | 100% | Hashtag text color |
| --color-like-red | #D4271D | 100% | Active heart/like color |
| --color-like-inactive | #999999 | 100% | Inactive heart color |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0px | "Sun* Annual Awards 2025" |
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px | "HIGHLIGHT KUDOS" |
| --text-filter-label | Montserrat | 16px | 700 | 24px | 0.15px | "Hashtag", "Phòng ban" dropdown labels |
| --text-user-name | Montserrat | 16px | 700 | 24px | 0.15px | Sender/receiver name |
| --text-user-dept | Montserrat | 14px | 700 | 20px | 0.1px | Department code under name |
| --text-timestamp | Montserrat | 16px | 700 | 24px | 0.5px | "10:00 - 10/30/2025" timestamp |
| --text-badge-title | Montserrat | 16px | 700 | 24px | 0.5px | Badge/title text (centered) |
| --text-message | Montserrat | 20px | 700 | 32px | 0px | Appreciation message text |
| --text-hashtag | Montserrat | 16px | 700 | 24px | 0.5px | Hashtag chips text |
| --text-like-count | Montserrat | 24px | 700 | 32px | 0px | Like count number |
| --text-action-btn | Montserrat | 16px | 700 | 24px | 0.15px | "Copy Link", "Xem chi tiết" |
| --text-pagination | Montserrat | 28px | 700 | 36px | 0px | Page indicator "2/5" |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-section-x | 144px (xl), 80px (lg), 48px (md), 16px (mobile) | Section horizontal padding |
| --spacing-section-y | 0px | Section vertical padding (40px gap between sub-sections) |
| --spacing-header-gap | 40px | Gap between subtitle/divider/title row and filters |
| --spacing-carousel-gap | 24px | Gap between kudo cards in carousel |
| --spacing-card-padding | 24px | Card internal padding |
| --spacing-card-gap | 16px | Gap between card content sections |
| --spacing-pagination-gap | 32px | Gap between pagination elements |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-card | 16px | Kudo card corners |
| --radius-filter | 4px | Filter dropdown button corners |
| --border-card | 4px solid #FFEA9E | Kudo card border |
| --border-filter | 1px solid #998C5F | Filter button border |
| --border-divider-section | 1px solid #2E3940 | Section divider |
| --border-divider-gold | 1px solid #FFEA9E | Gold divider inside cards |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-card | 0 2px 8px rgba(0,0,0,0.20) | Kudo card shadow |
| --shadow-card-highlight | 0 4px 16px rgba(255,234,158,0.15) | Highlight card outer glow |

---

## Layout Specifications

### Section Container (B - 2940:13451)

| Property | Value | Notes |
|----------|-------|-------|
| width | 100% (1440px design) | Full width |
| height | auto (786px in design) | Content-driven |
| display | flex | Vertical stack |
| flex-direction | column | Top to bottom |
| gap | 40px | Between header, carousel, pagination |
| padding-x | 144px (xl) | Matches page layout |

### Header Row (B.1 - 2940:13452)

| Property | Value | Notes |
|----------|-------|-------|
| width | 100% | Full section width |
| display | flex | Vertical then horizontal |
| flex-direction | column | Subtitle + divider + title stacked |
| gap | 40px | Between title group and filters |
| padding-x | 144px (xl) | Section padding |

### Kudo Card (B.3 - 2940:13465)

| Property | Value | Notes |
|----------|-------|-------|
| width | 528px (design) | ~1/3 of carousel area |
| display | flex | Vertical stack |
| flex-direction | column | Top to bottom |
| gap | 16px | Between card sections |
| padding | 24px 24px 16px 24px | Top/right/bottom/left |
| background | #FFF8E1 | Cream card bg |
| border | 4px solid #FFEA9E | Gold border |
| border-radius | 16px | Rounded corners |

### Carousel Area (B.2.3 - 2940:13463)

| Property | Value | Notes |
|----------|-------|-------|
| width | 100% (1440px) | Full width |
| display | flex | Horizontal layout |
| flex-direction | row | Cards side by side |
| gap | 24px | Between cards |
| align-items | center | Vertically centered |

### Navigation Arrows (B.2.1, B.2.2)

| Property | Value | Notes |
|----------|-------|-------|
| width | 80px | Arrow button size |
| height | 80px | Arrow button size |
| display | flex | Center icon |
| align-items | center | Center vertically |
| justify-content | center | Center horizontally |
| padding | 10px | Inner padding |
| border-radius | 4px | Slight rounding |
| background | transparent | No background |

### Pagination Row (B.5 - 2940:13471)

| Property | Value | Notes |
|----------|-------|-------|
| width | 100% | Full width |
| display | flex | Horizontal layout |
| flex-direction | row | Side by side |
| gap | 32px | Between elements |
| align-items | center | Vertically centered |
| justify-content | center | Centered horizontally |
| padding-x | 144px | Section padding |

### Pagination Arrows (B.5.1, B.5.3)

| Property | Value | Notes |
|----------|-------|-------|
| width | 48px | Smaller than carousel arrows |
| height | 48px | Smaller than carousel arrows |
| display | flex | Center icon |
| align-items | center | Center vertically |
| justify-content | center | Center horizontally |
| padding | 10px | Inner padding |
| border-radius | 4px | Slight rounding |
| background | transparent | No background |

### Layout Structure (ASCII)

```
┌───────────────────────────────────────────────────────────────────┐
│  Highlight Kudos Section (px: 144px xl, gap: 40px vertical)      │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  Header Row (flex-col, gap: 40px)                         │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │  "Sun* Annual Awards 2025" (24px/700/white)         │  │   │
│  │  │  ─────────────────────── (#2E3940 divider) ──────── │  │   │
│  │  │  "HIGHLIGHT KUDOS" (57px/700/gold)                  │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────┐  ┌────────────────┐                   │   │
│  │  │  Hashtag ▼     │  │  Phòng ban ▼   │  (filter btns)   │   │
│  │  └────────────────┘  └────────────────┘                   │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  Carousel Row (flex-row, gap: 24px, align-center)         │   │
│  │                                                           │   │
│  │  ◀ │ ┌──Card 1──┐ ┌──Card 2──┐ ┌──Card 3──┐ │ ▶       │   │
│  │ 80px│ │ Sender→  │ │ Sender→  │ │ Sender→  │ │80px     │   │
│  │     │ │ Receiver │ │ Receiver │ │ Receiver │ │          │   │
│  │     │ │ ──gold── │ │ ──gold── │ │ ──gold── │ │          │   │
│  │     │ │ Badge    │ │ Badge    │ │ Badge    │ │          │   │
│  │     │ │ Message  │ │ Message  │ │ Message  │ │          │   │
│  │     │ │ #tags    │ │ #tags    │ │ #tags    │ │          │   │
│  │     │ │ ──gold── │ │ ──gold── │ │ ──gold── │ │          │   │
│  │     │ │ ♥ Copy   │ │ ♥ Copy   │ │ ♥ Copy   │ │          │   │
│  │     │ └──────────┘ └──────────┘ └──────────┘ │          │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  Pagination (center, gap: 32px)                           │   │
│  │           ◁    2/5    ▷                                   │   │
│  │         48px  28px/700 48px                               │   │
│  └───────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Section Subtitle — "Sun* Annual Awards 2025" (2940:13454)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13454 | - |
| width | 100% (1152px) | `width: 100%` |
| height | 32px | `height: auto` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `text-[24px]` |
| font-weight | 700 | `font-bold` |
| line-height | 32px | `leading-8` |
| color | #FFFFFF | `text-white` |
| text-align | left | `text-left` |

---

### Section Divider (2940:13455)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13455 | - |
| width | 100% (1152px) | `w-full` |
| height | 1px | `h-px` |
| background | #2E3940 | `bg-[#2E3940]` |

---

### Section Title — "HIGHLIGHT KUDOS" (2940:13457)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13457 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 57px | `text-[57px]` |
| font-weight | 700 | `font-bold` |
| line-height | 64px | `leading-[64px]` |
| letter-spacing | -0.25px | `tracking-[-0.25px]` |
| color | #FFEA9E | `text-[#FFEA9E]` |
| text-align | left | `text-left` |

---

### Filter Button — Hashtag / Phòng ban (2940:13459, 2940:13460)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13459 (Hashtag), 2940:13460 (Phòng ban) | - |
| display | flex | `flex` |
| align-items | center | `items-center` |
| gap | 8px | `gap-2` |
| padding | 16px | `p-4` |
| background | rgba(255, 234, 158, 0.10) | `bg-[rgba(255,234,158,0.10)]` |
| border | 1px solid #998C5F | `border border-[#998C5F]` |
| border-radius | 4px | `rounded` |
| cursor | pointer | `cursor-pointer` |

**Filter Label Text:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #FFFFFF | `text-white` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.15) |
| Active/Open | border-color: #FFEA9E |

---

### Kudo Card (B.3 - 2940:13465)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13465 | - |
| width | 528px (design) / flex | `w-full` |
| display | flex | `flex` |
| flex-direction | column | `flex-col` |
| gap | 16px | `gap-4` |
| padding | 24px 24px 16px 24px | `p-6 pt-6 pb-4` |
| background | #FFF8E1 | `bg-[#FFF8E1]` |
| border | 4px solid #FFEA9E | `border-4 border-[#FFEA9E]` |
| border-radius | 16px | `rounded-2xl` |
| flex-shrink | 0 | `shrink-0` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: #FFF3CC |

---

### Card Header — Sender / Receiver Row

**Layout:** Flex row with sender info (left), arrow icon (center), receiver info (right)

**User Info Block (each side):**

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| gap | 8px | `gap-2` |

**Avatar:**

| Property | Value | CSS |
|----------|-------|-----|
| width | 48px | `w-12` |
| height | 48px | `h-12` |
| border-radius | 50% | `rounded-full` |
| object-fit | cover | `object-cover` |

**User Name:**

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| color | #00101A | `text-[#00101A]` |

**Department Code:**

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 14px | `text-sm` |
| font-weight | 700 | `font-bold` |
| line-height | 20px | `leading-5` |
| color | #999999 | `text-[#999]` |

**Hero Badge Stars:**

| Property | Value | CSS |
|----------|-------|-----|
| font-size | ~11px | `text-[11px]` |
| font-weight | 700 | `font-bold` |
| color | #FFFFFF | `text-white` |
| text-shadow | 0 0.4px 1.5px #000 | `[text-shadow:0_0.4px_1.5px_#000]` |

---

### Gold Divider Inside Card

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `w-full` |
| height | 1px | `h-px` |
| background | #FFEA9E | `bg-[#FFEA9E]` |

---

### Timestamp

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.5px | `tracking-[0.5px]` |
| color | #999999 | `text-[#999]` |

---

### Badge Title (centered)

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.5px | `tracking-[0.5px]` |
| color | #00101A | `text-[#00101A]` |
| text-align | center | `text-center` |

---

### Appreciation Message

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 20px | `text-xl` |
| font-weight | 700 | `font-bold` |
| line-height | 32px | `leading-8` |
| color | #00101A | `text-[#00101A]` |
| text-align | justified | `text-justify` |
| max-lines | 3 | `line-clamp-3` |

---

### Hashtag Chips

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.5px | `tracking-[0.5px]` |
| color | #D4271D | `text-[#D4271D]` |
| max-lines | 1 | `line-clamp-1` |

---

### Action Row (Like / Copy Link / Xem chi tiết)

**Like Count:**

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 24px | `text-2xl` |
| font-weight | 700 | `font-bold` |
| line-height | 32px | `leading-8` |
| color | #00101A | `text-[#00101A]` |

**Action Button Text (Copy Link, Xem chi tiết):**

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #00101A | `text-[#00101A]` |

---

### Pagination Page Indicator (2940:13473)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13473 | - |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 28px | `text-[28px]` |
| font-weight | 700 | `font-bold` |
| line-height | 36px | `leading-9` |
| color | #999999 | `text-[#999]` |

Current page number uses `color: #FFEA9E` (gold), total pages stays `#999`.

---

## Component Hierarchy with Styles

```
Highlight Kudos Section (bg: #00101A, px: 144px, gap: 40px)
├── Header (flex-col, gap: 40px)
│   ├── Title Group (flex-col)
│   │   ├── Subtitle "Sun* Annual Awards 2025" (24px/700/white)
│   │   ├── Divider (h: 1px, bg: #2E3940, w: full)
│   │   └── Title "HIGHLIGHT KUDOS" (57px/700/gold #FFEA9E)
│   └── Filters (flex-row, gap)
│       ├── Hashtag Button (bg: gold/10%, border: #998C5F, rounded-4px)
│       └── Phòng ban Button (bg: gold/10%, border: #998C5F, rounded-4px)
│
├── Carousel (flex-row, gap: 24px, align-center)
│   ├── Left Arrow (80x80, transparent)
│   ├── Cards Container (flex-row, gap: 24px)
│   │   └── KudoCard (528px, border-4 gold, bg: #FFF8E1, rounded-16px)
│   │       ├── Header Row (flex-row, sender ← arrow → receiver)
│   │       │   ├── Sender (avatar 48px + name + dept + badge)
│   │       │   ├── Arrow Icon
│   │       │   └── Receiver (avatar 48px + name + dept + badge)
│   │       ├── Gold Divider (1px, #FFEA9E)
│   │       ├── Timestamp (16px/700/#999)
│   │       ├── Badge Title (16px/700/center)
│   │       ├── Message (20px/700, max 3 lines)
│   │       ├── Hashtags (16px/700/#D4271D, max 1 line)
│   │       ├── Gold Divider (1px, #FFEA9E)
│   │       └── Actions (flex-row, space-between)
│   │           ├── Like (count 24px + heart icon)
│   │           ├── Copy Link (text button)
│   │           └── Xem chi tiết (text button + icon)
│   └── Right Arrow (80x80, transparent)
│
└── Pagination (center, gap: 32px)
    ├── Back Arrow (48x48)
    ├── Page "2/5" (28px/700, gold current / #999 total)
    └── Next Arrow (48x48)
```

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
| Section padding | px: 16px |
| Title | font-size: 32px, line-height: 40px |
| Subtitle | font-size: 16px |
| Carousel | 1 card per page, no side arrows |
| Cards | Full width |
| Filters | Stack vertically |
| Pagination | Smaller text (20px) |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Section padding | px: 48px |
| Title | font-size: 44px |
| Carousel | 2 cards per page |
| Navigation arrows | 60x60 |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Section padding | px: 80px |
| Carousel | 3 cards per page |

#### Wide (≥ 1280px)

| Component | Changes |
|-----------|---------|
| Section padding | px: 144px |
| Carousel | 3 cards per page (max width) |

---

## Hashtag Dropdown Styles (from frameId: 1002:13013)

| Property | Value | Notes |
|----------|-------|-------|
| background | #00101A | Dark dropdown bg |
| border | 1px solid rgba(255,255,255,0.15) | Subtle border |
| border-radius | 8px | Rounded corners |
| max-height | ~400px | Scrollable if many items |
| item height | ~48px | Each hashtag row |
| item padding | 16px | Horizontal padding |
| selected check | 24px circle with ✓ | Gold/white check icon |
| max selections | 5 | "Tối đa 5" subtitle |

**Item Text:** Montserrat, 16px, 700, white
**Selected Item:** Check icon visible (24x24 circle)
**Unselected Item:** No check icon
**Disabled (max reached):** Opacity reduced for unselected items

---

## Department Dropdown Styles (from frameId: 721:5684)

| Property | Value | Notes |
|----------|-------|-------|
| width | ~101px (auto) | Content-driven width |
| background | #00101A | Dark dropdown bg |
| border-radius | 8px | Rounded corners |
| item height | ~58px | Each department row |
| item text-align | center | Centered text |
| selected item | Highlighted background (#998C5F or lighter) | Active state |

**Item Text:** Montserrat, 16px, 700, white
**Selected Item:** Background highlight, text remains white
**Hover:** Subtle background change

---

## Hero Badge Tooltip (from frameId: 3241:15003)

| Property | Value | Notes |
|----------|-------|-------|
| background | dark gradient/image | Card-like tooltip |
| border-radius | 8px | Rounded |
| padding | 16px | Internal spacing |
| title | "Legend Hero" badge name | Green badge label |
| subtitle | Description text | Italic explanation |
| text color | white | On dark background |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Filter Button | background-color, border-color | 150ms | ease-in-out | Hover |
| Kudo Card | background-color | 150ms | ease-in-out | Hover |
| Carousel | transform | 300ms | ease-in-out | Page change |
| Like Button | color, transform | 200ms | ease-out | Click |
| Dropdown | opacity, transform | 150ms | ease-out | Open/Close |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Section container | 2940:13451 | `w-full px-4 md:px-12 lg:px-20 xl:px-36` | `<HighlightKudos>` |
| Section subtitle | 2940:13454 | `text-[24px] font-bold text-white leading-8` | Text in `<HighlightKudos>` |
| Section divider | 2940:13455 | `w-full h-px bg-[#2E3940]` | `<div>` |
| Section title | 2940:13457 | `text-[57px] font-bold text-[#FFEA9E] leading-[64px]` | Text in `<HighlightKudos>` |
| Filter - Hashtag | 2940:13459 | `flex items-center gap-2 p-4 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded` | `<HashtagFilterDropdown>` |
| Filter - Phòng ban | 2940:13460 | Same as Hashtag filter | `<DepartmentFilterDropdown>` |
| Carousel container | 2940:13463 | `flex items-center gap-6` | `<HighlightCarousel>` |
| Kudo card | 2940:13465 | `border-4 border-[#FFEA9E] bg-[#FFF8E1] rounded-2xl p-6` | `<KudoCard>` |
| Left arrow | 2940:13470 | `w-20 h-20 flex items-center justify-center` | `<button>` |
| Right arrow | 2940:13468 | Same as left arrow | `<button>` |
| Pagination | 2940:13471 | `flex items-center justify-center gap-8` | Pagination in `<HighlightCarousel>` |
| Page indicator | 2940:13473 | `text-[28px] font-bold leading-9 text-[#999]` | `<span>` |

---

## Notes

- All colors should use direct Tailwind arbitrary values matching the design tokens
- The kudo card in Highlight section has a 4px gold border, unlike AllKudos cards
- Current page number in pagination should be gold (#FFEA9E), total should be gray (#999)
- Filter dropdowns should reuse existing `HashtagFilterDropdown` and `DepartmentFilterDropdown` components from `src/components/live-board/`
- Hero badge star display uses text-shadow for glow effect
