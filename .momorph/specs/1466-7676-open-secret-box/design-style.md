# Design Style: Open Secret Box (Unopened State)

**Frame ID**: `1466:7676`
**Frame Name**: `Open secret box- chưa mở`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-modal-bg | #00101A | 100% | Modal background (var(--Details-Background)) |
| --color-overlay-bg | rgba(0, 16, 26, 0.80) | 80% | Backdrop overlay behind modal |
| --color-accent-gold | #FFEA9E | 100% | Title text, count number, primary accent |
| --color-text-white | #FFFFFF | 100% | Instruction text, count label |
| --color-divider | #2E3940 | 100% | Horizontal divider lines |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-modal-title | Montserrat | 25.46px (~25px) | 700 | 31.82px (~32px) | 0 | Modal title "KHAM PHA SECRET BOX CUA BAN" |
| --text-instruction | Montserrat | 12.73px (~13px) | 700 | 19.09px (~19px) | 0.398px (~0.4px) | Instruction text "Click vao box de mo" |
| --text-count-number | Montserrat | 28.64px (~29px) | 700 | 35px | 0 | Unopened count number "05" |
| --text-count-label | Montserrat | 12.73px (~13px) | 700 | 19.09px (~19px) | 0.398px (~0.4px) | Count label "Secretbox chua mo" |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding-y | 23.87px (~24px) | Modal top/bottom padding |
| --spacing-modal-padding-x | 12.73px (~13px) | Modal left/right padding |
| --spacing-modal-gap | 22.28px (~22px) | Gap between modal sections |
| --spacing-count-gap | 6.36px (~6px) | Gap between count number and label |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 12.73px (~13px) | Modal container border-radius |
| --border-divider | 1px solid #2E3940 | Section divider lines |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| modal-width | 651.5px (~652px) | Figma design width |
| modal-height | 822.6px (~823px) | Figma design height (content-driven) |
| content-width | 626px | Divider width (modal minus horizontal padding) |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Overlay (fixed, inset-0, bg: rgba(0, 16, 26, 0.80), z-40)             │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐      │
│  │  Modal (651.5×822.6px, bg: #00101A, r: 13px, centered)       │      │
│  │  padding: 24px 13px, flex-col, items-center, gap: 22px       │      │
│  │                                                                │      │
│  │  ┌────────────────────────────────────────────────────────┐   │      │
│  │  │  A_Title (1466:7678)                                    │   │      │
│  │  │  "KHAM PHA SECRET BOX CUA BAN"                          │   │      │
│  │  │  Montserrat 25px/700, #FFEA9E, centered                 │   │      │
│  │  │                                           [X] 19×19px   │   │      │
│  │  └────────────────────────────────────────────────────────┘   │      │
│  │                                                                │      │
│  │  ─────────────────────────────────────────────────── (626px)  │      │
│  │  Divider (1466:7680) — 1px, #2E3940                           │      │
│  │                                                                │      │
│  │  ┌────────────────────────────────────────────────────────┐   │      │
│  │  │  B_Instruction (1466:7681)                              │   │      │
│  │  │  "Click vao box de mo"                                  │   │      │
│  │  │  Montserrat 13px/700, #FFF, centered                    │   │      │
│  │  │  (hidden when unopenedCount = 0)                        │   │      │
│  │  └────────────────────────────────────────────────────────┘   │      │
│  │                                                                │      │
│  │  ┌────────────────────────────────────────────────────────┐   │      │
│  │  │  C_BoxImage (1466:7684)                                 │   │      │
│  │  │  557×557px area                                         │   │      │
│  │  │  ┌──────────────────────────────────────────────────┐   │   │      │
│  │  │  │                                                  │   │   │      │
│  │  │  │         Gift Box (558.5×558.5px)                 │   │   │      │
│  │  │  │         aspect-ratio: 1/1                        │   │   │      │
│  │  │  │         Clickable (role="button")                │   │   │      │
│  │  │  │                                                  │   │   │      │
│  │  │  │    ┌──────────────────────────────────────┐      │   │   │      │
│  │  │  │    │  Particle Glow Overlay               │      │   │   │      │
│  │  │  │    │  546.5×546.5px, glow effect          │      │   │   │      │
│  │  │  │    └──────────────────────────────────────┘      │   │   │      │
│  │  │  │                                                  │   │   │      │
│  │  │  └──────────────────────────────────────────────────┘   │   │      │
│  │  └────────────────────────────────────────────────────────┘   │      │
│  │                                                                │      │
│  │  ─────────────────────────────────────────────────── (626px)  │      │
│  │  Divider (1466:7688) — 1px, #2E3940                           │      │
│  │                                                                │      │
│  │  ┌────────────────────────────────────────────────────────┐   │      │
│  │  │  D_UnopenedCount (1466:7689)                            │   │      │
│  │  │  flex-row, gap: 6px, items-center                       │   │      │
│  │  │  ┌──────┐ ┌──────────────────────────┐                 │   │      │
│  │  │  │  05  │ │  Secretbox chua mo        │                 │   │      │
│  │  │  │ 29px │ │  13px/700, #FFF            │                 │   │      │
│  │  │  │ gold │ │  letter-spacing: 0.4px     │                 │   │      │
│  │  │  └──────┘ └──────────────────────────┘                 │   │      │
│  │  └────────────────────────────────────────────────────────┘   │      │
│  │                                                                │      │
│  └────────────────────────────────────────────────────────────────┘      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Overlay — Backdrop

| Property | Value | CSS |
|----------|-------|-----|
| position | fixed | `position: fixed` |
| inset | 0 | `inset: 0` |
| background | rgba(0, 16, 26, 0.80) | `background-color: rgba(0, 16, 26, 0.80)` |
| z-index | 40 | `z-index: 40` |
| display | flex | `display: flex; align-items: center; justify-content: center` |

### Modal Container (1466:7676)

| Property | Value | CSS |
|----------|-------|-----|
| width | 651.5px (~652px) | `max-width: 652px; width: calc(100% - 32px)` |
| height | auto (content-driven) | `height: auto` |
| background | #00101A | `background-color: #00101A` |
| border-radius | 12.73px (~13px) | `border-radius: 13px` |
| padding | 23.87px 12.73px (~24px 13px) | `padding: 24px 13px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| gap | 22.28px (~22px) | `gap: 22px` |
| z-index | 50 | `z-index: 50` |
| position | relative | `position: relative` |

### A_Title (1466:7678)

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| display | flex | `display: flex; align-items: center; justify-content: center` |
| position | relative | `position: relative` (for close button positioning) |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 25.46px (~25px) | `font-size: 25px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 31.82px (~32px) | `line-height: 32px` |
| color | #FFEA9E | `color: #FFEA9E` |
| text-align | center | `text-align: center` |

### Close Button (X Icon)

| Property | Value | CSS |
|----------|-------|-----|
| size | 19×19px | `width: 19px; height: 19px` |
| position | absolute, top-right of title | `position: absolute; top: 0; right: 0` |
| color | #FFFFFF | `color: #FFFFFF` (assumed) |
| cursor | pointer | `cursor: pointer` |
| min-touch-target | 44×44px | `min-width: 44px; min-height: 44px` (for mobile accessibility) |

**States:**
| State | Changes |
|-------|---------|
| Default | opacity: 0.8 |
| Hover | opacity: 1, transition 150ms |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

### Divider Lines (1466:7680, 1466:7688)

| Property | Value | CSS |
|----------|-------|-----|
| width | 626px | `width: 100%; max-width: 626px` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: #2E3940` |

### B_Instruction Text (1466:7681)

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 12.73px (~13px) | `font-size: 13px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 19.09px (~19px) | `line-height: 19px` |
| letter-spacing | 0.398px (~0.4px) | `letter-spacing: 0.4px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |
| visibility | hidden when count = 0 | Conditional render (do not render when count = 0) |

### C_BoxImage — Gift Box Area (1466:7684)

| Property | Value | CSS |
|----------|-------|-----|
| width | 557px | `width: 100%; max-width: 557px` |
| height | 557px | `aspect-ratio: 1 / 1` |
| position | relative | `position: relative` (for particle overlay) |
| cursor | pointer (when enabled) | `cursor: pointer` / `cursor: not-allowed` |

**Gift Box Image:**
| Property | Value | CSS |
|----------|-------|-----|
| size | 558.5×558.5px | `width: 100%; height: 100%` |
| aspect-ratio | 1/1 | `aspect-ratio: 1 / 1` |
| object-fit | contain | `object-fit: contain` |

**Particle Glow Overlay:**
| Property | Value | CSS |
|----------|-------|-----|
| size | 546.5×546.5px | `width: 98%; height: 98%` (proportional) |
| position | absolute, centered | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| pointer-events | none | `pointer-events: none` |
| z-index | 1 | `z-index: 1` (above box image) |

**States:**
| State | Changes |
|-------|---------|
| Default (idle) | cursor: pointer, opacity: 1 |
| Hover | subtle glow intensification (filter: brightness(1.1)), transition 200ms |
| Active (click) | scale: 0.98, transition 100ms |
| Opening | animation: box shake/open sequence ~1000-1500ms |
| Revealed | replaced with badge image + celebration effect |
| Disabled (count = 0) | opacity: 0.5, cursor: not-allowed, pointer-events: none on click handler |

### D_UnopenedCount (1466:7689)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 6.36px (~6px) | `gap: 6px` |

**Count Number ("05"):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 28.64px (~29px) | `font-size: 29px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 35px | `line-height: 35px` |
| color | #FFEA9E | `color: #FFEA9E` |

**Count Label ("Secretbox chua mo"):**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 12.73px (~13px) | `font-size: 13px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 19.09px (~19px) | `line-height: 19px` |
| letter-spacing | 0.398px (~0.4px) | `letter-spacing: 0.4px` |
| color | #FFFFFF | `color: #FFFFFF` |

---

## Component Hierarchy with Styles

```
Overlay (fixed inset-0 bg-[rgba(0,16,26,0.80)] z-40 flex items-center justify-center)
└── Modal (max-w-[652px] w-[calc(100%-32px)] bg-[#00101A] rounded-[13px] p-[24px_13px] flex flex-col items-center gap-[22px] z-50)
    ├── A_Title (w-full relative flex items-center justify-center)
    │   ├── TitleText ("KHAM PHA SECRET BOX CUA BAN", font-montserrat text-[25px] font-bold leading-[32px] text-[#FFEA9E] text-center)
    │   └── CloseButton (absolute top-0 right-0 w-[19px] h-[19px] min-w-[44px] min-h-[44px] cursor-pointer)
    │
    ├── Divider (w-full max-w-[626px] h-px bg-[#2E3940])
    │
    ├── B_Instruction (font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white text-center)
    │   └── (conditionally rendered: hidden when unopenedCount === 0)
    │
    ├── C_BoxImage (relative w-full max-w-[557px] aspect-square cursor-pointer)
    │   ├── GiftBoxImage (w-full h-full object-contain, next/image)
    │   └── ParticleOverlay (absolute inset-0 pointer-events-none z-[1])
    │
    ├── Divider (w-full max-w-[626px] h-px bg-[#2E3940])
    │
    └── D_UnopenedCount (flex items-center gap-[6px])
        ├── CountNumber ("05", font-montserrat text-[29px] font-bold leading-[35px] text-[#FFEA9E])
        └── CountLabel ("Secretbox chua mo", font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white)
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
| Modal | width: calc(100% - 32px), max-width: 100%, padding: 16px 12px |
| Title | font-size: 20px, line-height: 26px |
| Box Image Area | max-width: 100%, scales proportionally |
| Count Number | font-size: 24px |
| Close Button | min touch target 44x44px maintained |
| Gap | gap: 16px between sections |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Modal | max-width: 580px |
| Title | font-size: 22px |
| Box Image Area | max-width: 480px |

#### Desktop (1024px - 1279px)

| Component | Changes |
|-----------|---------|
| Modal | max-width: 620px |
| All | Near-Figma values |

#### Wide (>= 1280px)

| Component | Changes |
|-----------|---------|
| All | Match Figma design at 652px modal width |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Close (X) | 19×19px | #FFFFFF | Modal close button (top-right of title) |
| Gift Box (closed) | 558.5×558.5px | N/A (image) | Unopened box state — clickable |
| Particle Glow | 546.5×546.5px | N/A (image/effect) | Overlay effect on box image |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Overlay | opacity | 200ms | ease-out | Modal open/close |
| Modal | opacity, transform (scale) | 200ms | ease-out | Modal open/close |
| Box (hover) | filter: brightness | 200ms | ease-in-out | Mouse hover |
| Box (active) | transform: scale | 100ms | ease-out | Mouse click |
| Box (opening) | custom keyframes | 1000-1500ms | custom | Box click (server action) |
| Count number | — | 300ms | ease-out | After badge reveal (decrement) |
| Instruction text | opacity | 200ms | ease-out | When count reaches 0 |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Overlay | — | `fixed inset-0 bg-[rgba(0,16,26,0.80)] z-40 flex items-center justify-center` | `<SecretBoxModal />` (Client) |
| Modal | 1466:7676 | `max-w-[652px] w-[calc(100%-32px)] bg-[#00101A] rounded-[13px] p-[24px_13px] flex flex-col items-center gap-[22px]` | Inner `<div>` |
| Title | 1466:7678 | `font-montserrat text-[25px] font-bold leading-[32px] text-[#FFEA9E] text-center` | `<h2>` with aria |
| Close Button | — | `absolute top-0 right-0 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer` | `<button>` |
| Divider | 1466:7680, 1466:7688 | `w-full max-w-[626px] h-px bg-[#2E3940]` | `<hr>` or `<div>` |
| Instruction | 1466:7681 | `font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white text-center` | `<p>` (conditional) |
| Box Image | 1466:7684 | `relative w-full max-w-[557px] aspect-square cursor-pointer` | `<button>` wrapping `<Image />` |
| Particle Overlay | — | `absolute inset-0 pointer-events-none z-[1]` | `<Image />` or CSS effect |
| Count Row | 1466:7689 | `flex items-center gap-[6px]` | `<div>` with aria-live |
| Count Number | — | `font-montserrat text-[29px] font-bold leading-[35px] text-[#FFEA9E]` | `<span>` |
| Count Label | — | `font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white` | `<span>` |

---

## Notes

- The Figma design uses fractional pixel values (12.73px, 25.46px, 22.28px, etc.) which appear to be the result of a scale factor applied to the base design. All values have been rounded to practical integers for implementation.
- The modal uses a very dark background (#00101A) which matches the page background — the visual separation comes from the overlay backdrop and the modal's border-radius creating a distinct container.
- The particle/glow effect overlay is a key visual element that creates the "magical" feel of the secret box. Implementation options: (1) animated SVG/CSS radial gradient, (2) pre-rendered image sequence, (3) canvas-based particle system. Recommend option 1 or 2 for bundle size (constitution Principle VI — keep bundle minimal).
- The close button icon is 19x19px in Figma but MUST have a 44x44px minimum touch target (constitution Principle V — 44x44px mobile touch targets). Use padding or an invisible hit area expansion.
- Font: Only Montserrat 700 is used in this modal. No additional fonts need to be loaded beyond what the main application already includes.
- The gold color #FFEA9E is reused from the homepage design system (`--color-accent-gold`). This should reference the same design token for consistency.
- The divider color #2E3940 matches `--color-divider` from the homepage design system.
