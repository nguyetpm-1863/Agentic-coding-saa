# Design Style: Countdown — Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background / frame fill |
| --color-text-white | #FFFFFF | 100% | Title text, digit text |
| --color-accent-gold | #FFEA9E | 100% | Digit box border |
| --color-white-10 | rgba(255, 255, 255, 0.10) | 10% | Gradient end in digit box background |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| --gradient-cover | linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%) | Background overlay on key visual |
| --gradient-digit-box | linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%) | Digit box glass fill (applied at opacity 0.5) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-countdown-title | Montserrat | 36px | 700 | 48px | 0 | Title "Su kien se bat dau sau" |
| --text-countdown-digit | Digital Numbers | 73.73px | 400 | auto | 0 | Countdown digit numbers |
| --text-countdown-label | Montserrat | 36px | 700 | 48px | 0 | Unit labels (HOURS, MINUTES, SECONDS) |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-content-x | 144px | Content container horizontal padding |
| --spacing-content-y | 96px | Content container vertical padding |
| --spacing-title-timer-gap | 120px | Gap between title and countdown timer |
| --spacing-unit-gap | 60px | Gap between countdown unit groups (Hours/Minutes/Seconds) |
| --spacing-digit-gap | 21px | Gap between two digit boxes within a unit |
| --spacing-digit-label-gap | 21px | Gap between digit boxes and label text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-digit-box | 12px | Countdown digit box corners |
| --border-digit-box | 0.75px solid #FFEA9E | Countdown digit box border |

### Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --blur-digit-box | blur(24.96px) | Backdrop-filter on digit boxes (glass morphism) |
| --opacity-digit-box-bg | 0.5 | Opacity of the gradient background layer on digit boxes |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| frame-width | 1512px | Full design width |
| frame-height | 1077px | Full design height |
| content-width | 1512px | Content container spans full width |
| content-height | 456px | Content container height |
| padding | 96px 144px | Content container padding |

### Layout Structure (ASCII)

```
+----------------------------------------------------------------------+
|  Page (1512x1077px, bg: #00101A, overflow: hidden)                   |
|                                                                      |
|  +------------------------------------------------------------------+|
|  |  Background Image (absolute, z-0)                                ||
|  |  Key visual artwork, positioned -142px -789px                    ||
|  |  Scale: 109.4% width / 216% height (covers full frame)          ||
|  +------------------------------------------------------------------+|
|                                                                      |
|  +------------------------------------------------------------------+|
|  |  Gradient Overlay (absolute, z-1)                                ||
|  |  18deg diagonal, dark bottom-left to transparent top-right       ||
|  +------------------------------------------------------------------+|
|                                                                      |
|  +------------------------------------------------------------------+|
|  |  Content Container (relative, z-10, flex-col, center)            ||
|  |  1512 x 456px, padding: 96px 144px, gap: 120px                  ||
|  |                                                                  ||
|  |  +--------------------------------------------------------------+||
|  |  |  Title: "Su kien se bat dau sau"                             |||
|  |  |  Montserrat 36px/48px, weight 700, white, text-center        |||
|  |  +--------------------------------------------------------------+||
|  |                         | 120px gap                              ||
|  |  +--------------------------------------------------------------+||
|  |  |  Countdown Timer (flex-row, gap: 60px, centered)             |||
|  |  |                                                              |||
|  |  |  +----------------+  +----------------+  +----------------+  |||
|  |  |  | HOURS Unit     |  | MINUTES Unit   |  | SECONDS Unit   |  |||
|  |  |  | 175 x 192px    |  | 175 x 192px    |  | 175 x 192px    |  |||
|  |  |  | flex-col, gap:21|  | flex-col, gap:21|  | flex-col, gap:21| |||
|  |  |  |                |  |                |  |                |  |||
|  |  |  | +--+  21  +--+ |  | +--+  21  +--+ |  | +--+  21  +--+ |  |||
|  |  |  | |D1| px  |D2| |  | |D1| px  |D2| |  | |D1| px  |D2| |  |||
|  |  |  | |77|     |77| |  | |77|     |77| |  | |77|     |77| |  |||
|  |  |  | |x |     |x | |  | |x |     |x | |  | |x |     |x | |  |||
|  |  |  | |123     |123 |  | |123     |123 |  | |123     |123 |  |||
|  |  |  | +--+     +--+ |  | +--+     +--+ |  | +--+     +--+ |  |||
|  |  |  |                |  |                |  |                |  |||
|  |  |  |   "HOURS"      |  |   "MINUTES"    |  |   "SECONDS"    |  |||
|  |  |  | 36px/700 white |  | 36px/700 white |  | 36px/700 white |  |||
|  |  |  +----------------+  +----------------+  +----------------+  |||
|  |  +--------------------------------------------------------------+||
|  +------------------------------------------------------------------+|
+----------------------------------------------------------------------+
```

---

## Component Style Details

### Background Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35129 | — |
| position | absolute | `position: absolute` |
| top | -789px | Figma offset (use `object-cover` + `inset-0` in implementation) |
| left | -142px | Figma offset |
| width | 109.4% of frame | `width: 100%; height: 100%; object-cover` |
| z-index | 0 | `z-index: 0` |

### Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35130 | — |
| position | absolute, inset-0 | `position: absolute; inset: 0` |
| background | linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%) | `background: linear-gradient(18deg, ...)` |
| z-index | 1 | `z-index: 1` |

### Content Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35131 | — |
| width | 1512px | `width: 100%` |
| height | 456px | `height: auto` (let content define) |
| padding | 96px 144px | `padding: 96px 144px` |
| display | flex column | `display: flex; flex-direction: column; align-items: center` |
| gap | 120px | `gap: 120px` |
| position | relative | `position: relative; z-index: 10` |

### Title Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35137 | — |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

### Countdown Timer Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35138 | — |
| display | flex row | `display: flex; flex-direction: row` |
| gap | 60px | `gap: 60px` |
| align-items | center | `align-items: center` |

### Countdown Unit Group (Hours / Minutes / Seconds)

| Property | Value | CSS |
|----------|-------|-----|
| width | 175px | `width: 175px` |
| height | 192px | `height: auto` |
| display | flex column | `display: flex; flex-direction: column; align-items: center` |
| gap | 21px | `gap: 21px` |

### Digit Box

| Property | Value | CSS |
|----------|-------|-----|
| width | 77px (76.8px actual) | `width: 77px` |
| height | 123px (122.88px actual) | `height: 123px` |
| border-radius | 12px | `border-radius: 12px` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid #FFEA9E` |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Applied at opacity 0.5 |
| backdrop-filter | blur(24.96px) | `backdrop-filter: blur(24.96px)` |
| opacity | 0.5 | On the background gradient layer (not the entire box) |
| display | flex center | `display: flex; align-items: center; justify-content: center` |

**Digit pair layout** (two boxes per unit):
| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; flex-direction: row` |
| gap | 21px | `gap: 21px` |

### Digit Text

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Digital Numbers | Custom font |
| font-size | 73.73px | `font-size: 73.73px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

### Unit Label Text

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, min-h-screen, relative, overflow-hidden)
|
+-- Background Image (absolute, inset-0, z-0, object-cover, priority)
|
+-- Gradient Overlay (absolute, inset-0, z-[1], 18deg gradient)
|
+-- Content Container (relative, z-10, flex, flex-col, items-center, px-36, py-24, gap-[120px])
    |
    +-- Title (Montserrat 36px/48px/700, white, text-center)
    |   "Su kien se bat dau sau"
    |
    +-- Countdown Timer (flex, gap-[60px], items-center) [Client Component]
        |
        +-- Hours Unit (flex, flex-col, items-center, gap-[21px], w-[175px])
        |   +-- Digit Pair (flex, gap-[21px])
        |   |   +-- Digit Box (77x123px, r-[12px], border-[0.75px] border-[#FFEA9E], backdrop-blur-[24.96px])
        |   |   |   +-- Digit (Digital Numbers 73.73px/400, white)
        |   |   +-- Digit Box (same)
        |   |       +-- Digit (same)
        |   +-- Label "HOURS" (Montserrat 36px/48px/700, white)
        |
        +-- Minutes Unit (same structure as Hours)
        |
        +-- Seconds Unit (same structure as Hours)
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
| Content Container | padding: 32px 16px; gap: 48px |
| Title | font-size: 20px; line-height: 28px |
| Countdown Timer | gap: 24px (or stack vertically if needed) |
| Digit Box | width: 48px; height: 77px; border-radius: 8px |
| Digit Text | font-size: 46px |
| Unit Label | font-size: 16px; line-height: 24px |
| Digit Pair Gap | 12px |
| Unit Gap (digit-to-label) | 12px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Content Container | padding: 64px 48px; gap: 80px |
| Title | font-size: 28px; line-height: 36px |
| Countdown Timer | gap: 40px |
| Digit Box | width: 60px; height: 96px; border-radius: 10px |
| Digit Text | font-size: 58px |
| Unit Label | font-size: 24px; line-height: 32px |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Content Container | padding: 96px 80px; gap: 100px |
| Countdown Timer | gap: 48px |
| Digit Box | width: 68px; height: 110px |
| Digit Text | font-size: 66px |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design at 1512px |
| Content Container | padding: 96px 144px; gap: 120px |
| Digit Box | 77x123px as designed |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Countdown digits | text content | — | — | Timer tick (every second) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page | 2268:35127 | `bg-[#00101A] min-h-screen relative overflow-hidden` | `<CountdownPage />` (Server) |
| Background Image | 2268:35129 | `absolute inset-0 z-0 object-cover` | `<Image />` (next/image, priority) |
| Gradient Overlay | 2268:35130 | `absolute inset-0 z-[1]` + inline gradient | `<div />` |
| Content Container | 2268:35131 | `relative z-10 flex flex-col items-center px-4 py-8 md:px-12 md:py-16 lg:px-20 lg:py-24 xl:px-36 xl:py-24 gap-12 md:gap-20 lg:gap-[100px] xl:gap-[120px]` | `<div />` |
| Title | 2268:35137 | `font-montserrat text-xl md:text-[28px] lg:text-4xl font-bold text-white text-center` | `<h1 />` |
| Countdown Timer | 2268:35138 | `flex gap-6 md:gap-10 lg:gap-12 xl:gap-[60px] items-center` | `<CountdownTimer />` (Client) |
| Countdown Unit | — | `flex flex-col items-center gap-3 md:gap-4 xl:gap-[21px]` | `<CountdownUnit />` |
| Digit Pair | — | `flex gap-3 md:gap-4 xl:gap-[21px]` | `<div />` |
| Digit Box | — | `w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[68px] lg:h-[110px] xl:w-[77px] xl:h-[123px] rounded-lg xl:rounded-[12px] border-[0.75px] border-[#FFEA9E] backdrop-blur-[24.96px] flex items-center justify-center` | `<div />` |
| Digit Text | — | `font-digital-numbers text-[46px] md:text-[58px] lg:text-[66px] xl:text-[73.73px] font-normal text-white` | `<span />` |
| Unit Label | — | `font-montserrat text-base md:text-2xl xl:text-4xl font-bold text-white` | `<span />` |

---

## Notes

- The digit box glass morphism effect requires a pseudo-element or wrapper for the gradient background at `opacity: 0.5`, while keeping the digit text at full opacity. Use a `::before` pseudo-element or an inner `<div>` with the gradient and opacity, positioned behind the text.
- The gradient overlay angle is 18deg (different from the Homepage's 12deg). Verify this matches the Figma design.
- The digit boxes on this page (77x123px, 12px radius, 0.75px border, blur 24.96px) are larger than the Homepage countdown (51x82px, 8px radius, 0.5px border, blur 16.64px). This is intentional — this is the hero countdown.
- Fonts required: Montserrat (700) and Digital Numbers (400). Both should already be loaded if the Homepage is implemented. Ensure the font loading configuration includes Digital Numbers.
- The title and labels both use Montserrat 36px/48px/700 at desktop — they share the same typography token.
