# Design Style: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background, dark navy |
| --color-header-bg | #0B0F12 | 80% | Header background overlay |
| --color-btn-login | #FFEA9E | 100% | Google login button background |
| --color-btn-login-text | #00101A | 100% | Login button text color |
| --color-text-white | #FFFFFF | 100% | Body text, labels, logo text |
| --color-footer-border | #2E3940 | 100% | Footer top border |
| --color-gradient-start | #00101A | 100% | Left gradient overlay (solid) |
| --color-gradient-end | rgba(0,16,26,0) | 0% | Right gradient overlay (transparent) |
| --color-gradient-bottom-start | #00101A | 100% | Bottom gradient (solid at 22.48%) |
| --color-gradient-bottom-end | rgba(0,19,32,0) | 0% | Bottom gradient (transparent at 51.74%) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-body-description | Montserrat | 20px | 700 | 40px | 0.5px |
| --text-btn-login | Montserrat | 22px | 700 | 28px | 0px |
| --text-lang-label | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Main content horizontal padding |
| --spacing-header-x | 144px | Header horizontal padding |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-footer-y | 40px | Footer vertical padding |
| --spacing-hero-top | 96px | Hero section top padding |
| --spacing-hero-bottom | 96px | Hero section bottom padding |
| --spacing-kv-to-content | 80px | Gap between key visual and content |
| --spacing-content-gap | 24px | Gap between description and login button |
| --spacing-btn-x | 24px | Button horizontal padding |
| --spacing-btn-y | 16px | Button vertical padding |
| --spacing-btn-icon-gap | 8px | Gap between button text and icon |
| --spacing-cta-pl | 16px | Left padding on text + CTA wrapper |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn-login | 8px | Login button border radius |
| --radius-lang-btn | 4px | Language selector border radius |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-none | none | Default — no shadows on this screen |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Full-width desktop design |
| height | 1024px | Viewport height |
| background | #00101A | Dark navy base |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Screen (1440×1024, bg: #00101A)                                     │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  [Z1] Keyvisual Background Image (1441×1022, absolute)          ││
│  └──────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  [Z2] Left Gradient Overlay (linear-gradient 90deg)             ││
│  │  #00101A → #00101A (25.41%) → transparent (100%)                ││
│  └──────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  [Z3] Bottom Gradient Overlay (linear-gradient 0deg)            ││
│  │  #00101A (22.48%) → transparent (51.74%)                        ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  A_Header (1440×80, bg: #0B0F12 @ 80%, px: 144px, py: 12px)    ││
│  │  ┌──────────┐                                    ┌────────────┐ ││
│  │  │ A.1 Logo │                                    │ A.2 VN ▼   │ ││
│  │  │ (52×48)  │                                    │ (108×56)   │ ││
│  │  └──────────┘                                    └────────────┘ ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  B_Bìa (1440×845, px: 144px, py: 96px)                         ││
│  │                                                                  ││
│  │  ┌────────────────────────────────────┐                          ││
│  │  │  B.1 Key Visual                   │                          ││
│  │  │  "ROOT FURTHER" Logo (451×200)    │                          ││
│  │  └────────────────────────────────────┘                          ││
│  │            ↕ 80px gap                                            ││
│  │  ┌─────────────────────────────┐                                 ││
│  │  │  B.2 Content (480×80)       │                                 ││
│  │  │  "Bắt đầu hành trình..."   │                                 ││
│  │  │  "Đăng nhập để khám phá!"  │                                 ││
│  │  └─────────────────────────────┘                                 ││
│  │            ↕ 24px gap                                            ││
│  │  ┌─────────────────────────────┐                                 ││
│  │  │  B.3 Login Button            │                                 ││
│  │  │  305×60 (desktop)           │                                 ││
│  │  │  full-width×52 (mobile)     │                                 ││
│  │  │  "LOGIN With Google" [G]    │                                 ││
│  │  │  bg: #FFEA9E, r: 8px       │                                 ││
│  │  └─────────────────────────────┘                                 ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  D_Footer (1440×91, px: 90px, py: 40px, border-top: #2E3940)   ││
│  │              "Bản quyền thuộc về Sun* © 2025"                   ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header — Navigation Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14391 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(11,15,18,0.8) | `background-color: rgba(11,15,18,0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | absolute, top: 0 | `position: fixed; top: 0` |

### A.1_Logo — Sun Annual Awards Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:2166 | - |
| width | 52px | `width: 52px` |
| height | 56px | `height: 56px` |
| content | Logo image | `background: url(...) 50% / cover no-repeat` |

### A.2_Language — Language Selector Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:1601 | - |
| width | 108px | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 2px | `gap: 2px` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: #FFFFFF` |

**States:**
| State | Changes |
|-------|---------|
| Default | transparent background, cursor: pointer |
| Hover | background: rgba(255,255,255,0.08), cursor: pointer |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active/Open | background: rgba(255,255,255,0.12), chevron rotated 180deg |

### B.1_Key Visual — ROOT FURTHER Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2939:9548 | - |
| width | 451px | `width: 451px` |
| height | 200px | `height: 200px` |
| content | Logo image | `background: url(...) 50% / cover no-repeat` |
| aspect-ratio | 115/51 | `aspect-ratio: 115 / 51` |

### B.2_Content — Hero Description Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14753 | - |
| width | 480px | `width: 480px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | left | `text-align: left` |

### B.3_Login — Google Login Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14426 | - |
| width | 305px (desktop) | `w-full md:w-[305px]` (full-width on mobile, 305px from md breakpoint) |
| height | 60px (desktop), 52px (mobile) | `h-[52px] md:h-[60px]` (44px min touch target met) |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | background: #FFE07A, box-shadow: 0 4px 12px rgba(255,234,158,0.3) |
| Focus | outline: 2px solid #FFFFFF, outline-offset: 2px |
| Active | background: #FFD54F, transform: scale(0.98) |
| Disabled | background: #FFEA9E, opacity: 0.5, cursor: not-allowed |
| Loading | disabled state + animated spinner replaces Google icon |

**Icon (Google):**
| Property | Value |
|----------|-------|
| Node ID | I662:14426;186:1766 |
| Size | 24×24px |
| Position | Right of text |

### D_Footer — Copyright Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14447 | - |
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| font-family | Montserrat Alternates | `font-family: 'Montserrat Alternates', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

---

## Component Hierarchy with Styles

```
Screen (1440×1024, bg: #00101A)
├── Keyvisual (absolute, z-1, 1441×1022, background-image cover)
├── Gradient Left (absolute, z-2, linear-gradient 90deg: #00101A 0%-25.41% → transparent 100%)
├── Gradient Bottom (absolute, z-3, linear-gradient 0deg: #00101A 22.48% → transparent 51.74%)
│
├── A_Header (fixed, top: 0, z-10, 100%×80px, bg: rgba(11,15,18,0.8), px: 144px, py: 12px)
│   ├── A.1_Logo (52×56px, flex, items-center)
│   │   └── Logo Image (52×48px, object-fit: cover)
│   └── A.2_Language (108×56px, flex, items-center, gap: 2px, r: 4px)
│       ├── Flag Icon (24×24px)
│       ├── Label "VN" (Montserrat 16px/700, #FFFFFF)
│       └── Chevron Down (24×24px)
│
├── B_Bìa (1440×845px, px: 144px, py: 96px, relative, z-5)
│   └── Content (1152×653px, flex-col, gap: 80px, justify: center)
│       ├── B.1_Key Visual (1152×200px)
│       │   └── ROOT FURTHER Logo (451×200px, object-fit: cover)
│       └── Text + CTA (496×164px, flex-col, gap: 24px, pl: 16px)
│           ├── B.2_Content (480×80px, Montserrat 20px/700, #FFF, lh: 40px, ls: 0.5px)
│           └── B.3_Login (w-full md:305×60px, bg: #FFEA9E, r: 8px, px: 24px, py: 16px)
│               ├── Text "LOGIN With Google" (Montserrat 22px/700, #00101A)
│               └── Google Icon (24×24px)
│
└── D_Footer (100%×auto, px: 90px, py: 40px, border-top: 1px solid #2E3940)
    └── Copyright (Montserrat Alternates 16px/700, #FFF, text-center)
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
| Header | padding: 12px 16px; height: auto |
| Logo | 40×36px |
| Language Selector | 80×44px (minimum touch target) |
| Hero section | padding: 32px 16px |
| ROOT FURTHER logo | width: 100%, max-width: 280px, height: auto |
| Description text | font-size: 16px, line-height: 28px, width: 100% |
| Login button | width: 100%, min-height: 52px (touch target ≥ 44px) |
| Footer | padding: 24px 16px, font-size: 14px |
| Gradient overlays | Adjust to cover more area for readability |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 48px |
| Hero section | padding: 64px 48px |
| ROOT FURTHER logo | max-width: 360px |
| Description text | font-size: 18px, width: 100%, max-width: 480px |
| Login button | width: auto, min-width: 280px |
| Footer | padding: 32px 48px |

#### Desktop (1024px – 1279px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 80px |
| Hero section | padding: 96px 80px |
| ROOT FURTHER logo | max-width: 420px |
| Description text | font-size: 20px, width: 480px |
| Login button | width: auto, min-width: 305px |
| Footer | padding: 40px 80px |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design at 1440px exactly |
| Header | padding: 12px 144px |
| Hero section | padding: 96px 144px |
| Container | max-width: 1440px, margin: 0 auto |

---

## Icon Specifications

| Icon Name | Node ID | Size | Color | Usage |
|-----------|---------|------|-------|-------|
| Logo (SAA 2025) | I662:14391;178:1033 | 52×48px | N/A (image) | Header left |
| Flag (VN) | I662:14391;186:1696;186:1821;186:1709 | 24×24px | N/A (image) | Language selector |
| Chevron Down | I662:14391;186:1696;186:1821;186:1441 | 24×24px | #FFFFFF | Language dropdown |
| Google Icon | I662:14426;186:1766 | 24×24px | N/A (brand) | Login button |
| ROOT FURTHER | 2939:9548 | 451×200px | N/A (image) | Hero key visual |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Login Button | background-color, box-shadow | 150ms | ease-in-out | Hover |
| Login Button | transform | 100ms | ease-out | Active (press) |
| Language Selector | background-color | 150ms | ease-in-out | Hover |
| Language Dropdown | opacity, transform | 150ms | ease-out | Toggle |
| Page | opacity | 300ms | ease-in | Initial load |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page Background | 662:14387 | `bg-[#00101A] min-h-screen relative overflow-hidden` | `<LoginPage />` |
| Keyvisual BG | 662:14388 | `absolute inset-0 z-0` | `<Image />` (next/image) |
| Gradient Left | 662:14392 | `absolute inset-0 z-10 bg-gradient-to-r from-[#00101A] via-[#00101A] via-25% to-transparent` | `<div />` |
| Gradient Bottom | 662:14390 | `absolute inset-0 z-10 bg-gradient-to-t from-[#00101A] from-22% to-transparent to-52%` | `<div />` |
| Header | 662:14391 | `fixed top-0 w-full h-20 bg-[#0B0F12]/80 px-36 py-3 flex items-center justify-between z-50` | `<Header />` |
| Logo | I662:14391;186:2166 | `w-[52px] h-[56px] flex items-center` | `<Logo />` |
| Language Btn | I662:14391;186:1601 | `flex items-center gap-0.5 rounded px-4 py-4 cursor-pointer` | `<LanguageSelector />` |
| Hero Section | 662:14393 | `relative z-20 px-36 py-24` | `<HeroSection />` |
| ROOT FURTHER | 2939:9548 | `w-[451px] h-[200px] object-cover` | `<Image />` (next/image) |
| Description | 662:14753 | `font-montserrat text-xl font-bold leading-10 tracking-[0.5px] text-white` | `<p />` |
| Login Button | 662:14426 | `bg-[#FFEA9E] rounded-lg px-6 py-4 flex items-center gap-2 font-montserrat text-base md:text-[22px] font-bold text-[#00101A] w-full md:w-[305px] h-[52px] md:h-[60px]` | `<LoginButton />` |
| Footer | 662:14447 | `w-full px-[90px] py-10 border-t border-[#2E3940] flex items-center justify-center font-montserrat-alt text-base font-bold text-white` | `<Footer />` |

---

## Loading & Error States

### loading.tsx — Page Loading Skeleton

| Property | Value | CSS |
|----------|-------|-----|
| background | #00101A | `background-color: #00101A` |
| layout | centered, full-screen | `min-h-screen flex items-center justify-center` |
| indicator | pulsing circle or bar | `animate-pulse` (Tailwind) |
| indicator color | rgba(255,255,255,0.1) | Subtle, non-distracting |

### error.tsx — Error Boundary

| Property | Value | CSS |
|----------|-------|-----|
| background | #00101A | `background-color: #00101A` |
| layout | centered, full-screen | `min-h-screen flex flex-col items-center justify-center gap-6` |
| error text | "Something went wrong" | Montserrat 20px/700, #FFFFFF |
| retry button | "Try again" | Same style as login button: #FFEA9E, 8px radius, Montserrat 18px/700, #00101A |

### OAuth Error Message (inline, below login button)

| Property | Value | CSS |
|----------|-------|-----|
| container | aria-live="polite" | `mt-4` below login button |
| text | Montserrat 14px/400, #FFFFFF | `text-sm text-white` |
| background | rgba(255,255,255,0.08) | `bg-white/[0.08] rounded px-4 py-3` |
| auto-dismiss | 5 seconds | `useEffect` + `setTimeout` |

---

## Notes

- All colors use CSS custom properties mapped to Tailwind for theming support
- Fonts: Montserrat (primary) and Montserrat Alternates (footer) MUST be loaded via Google Fonts or `next/font`
- The ROOT FURTHER logo and SAA 2025 logo are image assets — use `next/image` with proper alt text
- Google icon MUST follow Google's brand guidelines for the "Sign in with Google" button
- Background keyvisual is a large decorative image — use WebP compression and `priority` loading (it is the LCP element, not a candidate for lazy loading)
- Ensure color contrast meets WCAG AA: white text (#FFF) on #00101A passes (contrast ratio ~18.5:1)
- All interactive elements (button, language selector) MUST have visible focus indicators for accessibility
