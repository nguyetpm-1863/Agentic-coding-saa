# Specs: He Thong Giai (Award System)

## 1. Screen Overview

- **Screen Name:** He Thong Giai (Award System)
- **Frame ID:** 313:8436
- **File Key:** 9ypp4enmFmdK3YAFJLIu6C
- **Status:** spec
- **Purpose:** Display the SAA 2025 (Sun* Annual Award 2025) award system page, showcasing all award categories with their descriptions, quantities, and prize values. Includes a promotional block for Sun* Kudos program.
- **Page Type:** Informational / Static content page with navigation

## 2. UI Elements

### 2.1 Keyvisual (Hero Banner) [No. 3]
- **Type:** Hero banner (decorative)
- **Display:** Background image 1200x871px (cover, center crop), title "ROOT FURTHER", subtitle "Sun* Annual Award 2025", logo and icon in top corner
- **Behavior:** No click action; responsive scale with center crop
- **Accessibility:** alt="Keyvisual Sun* Annual Award 2025"

### 2.2 Title Section [No. A]
- **Type:** Label (static)
- **Display:**
  - Sub-text: "Sun* annual awards 2025" (small, faded)
  - Main title: "He thong giai thuong SAA 2025" (large, gold/yellow)
- **Behavior:** Static, non-interactive

### 2.3 Award System Container [No. B]
- **Type:** Info block
- **Display:** Left navigation panel + right content area with award cards
- **Behavior:** Click left menu item scrolls to corresponding award card

### 2.4 Navigation Menu (Left Sidebar) [No. C]
- **Type:** Navigation
- **Display:** 6 menu items: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP
- **Active state:** Yellow color + underline for selected item
- **Behavior:** Click navigates to corresponding section; hover highlights item

#### Navigation Items:
- **C.1 - Top Talent** [navigation_item]: Click scrolls to Top Talent section, sets active state. Has icon before text.
- **C.2 - Top Project** [navigation_item]: Click scrolls to Top Project section, sets active state.
- **C.3 - Top Project Leader** [navigation_item]: Click scrolls to Top Project Leader section, sets active state.
- **C.4 - Best Manager** [navigation_item]: Click scrolls to Best Manager section, sets active state.
- **C.5 - Signature 2025 - Creator** [navigation_item]: Click scrolls to Signature 2025 section, sets active state.
- **C.6 - MVP** [navigation_item]: Shows award info (title "MVP (Most Valuable Person)", quantity "01", value "15,000,000 VND").

### 2.5 Award Cards (Right Content Area)

#### D.1 - Top Talent [info_block]
- Image: 336x336px award graphic
- Title: "Top Talent"
- Description: Criteria and significance text
- Quantity: 10 (Unit: "Don vi" / Individual)
- Prize value: 7,000,000 VND per award

#### D.2 - Top Project [info_block]
- Title: "Top Project"
- Quantity: 02 (Unit: "Tap the" / Team)
- Prize value: 15,000,000 VND per award

#### D.3 - Top Project Leader [info_block]
- Title: "Top Project Leader"
- Quantity: 03 (Unit: "Ca nhan" / Individual)
- Prize value: 7,000,000 VND

#### D.4 - Best Manager [info_block]
- Title: "Best Manager"
- Quantity: 01 (Unit: "Ca nhan" / Individual)
- Prize value: 10,000,000 VND

#### D.5 - Signature 2025 - Creator [info_block]
- Title: "Signature 2025 - Creator"
- Quantity: 01
- Prize value: 5,000,000 VND (individual), 8,000,000 VND (team)

#### D.6 - MVP [info_block]
- Title: "MVP (Most Valuable Person)"
- Quantity: 01
- Prize value: 15,000,000 VND

### 2.6 Sun* Kudos Promotional Block [No. D1]
- **Type:** Info block with CTA
- **Display:** Label "Phong trao ghi nhan", Title "Sun* Kudos", description text, illustration image, "Chi tiet" button
- **Button [D2.1]:** "Chi tiet" (text_link type) - navigates to Sun* Kudos page
- **Hover:** Button has subtle float/elevation effect

## 3. Validation Rules

- No user input fields on this page (read-only / informational)
- All text content is static (hardcoded or fetched from database)
- Images must load correctly with proper dimensions
- Navigation menu must correctly highlight active item
- Scroll-to behavior must target the correct award section

## 4. User Interactions

| Interaction | Element | Expected Behavior |
|---|---|---|
| Click navigation menu item | C.1-C.6 | Scrolls to corresponding award card section; sets clicked item as active (yellow + underline) |
| Hover navigation menu item | C.1-C.6 | Highlights the menu item |
| Click "Chi tiet" button | D2.1 | Navigates to Sun* Kudos detail page |
| Hover "Chi tiet" button | D2.1 | Subtle float/elevation effect |
| Scroll page | Page body | Standard vertical scroll behavior |

## 5. Security Considerations

- Page is informational/read-only; no form submissions or mutations
- Images should have proper alt attributes for accessibility
- Content should be served over HTTPS
- No sensitive data displayed on this page
- CSP headers should allow image sources appropriately
- No user-generated content; XSS risk is minimal
