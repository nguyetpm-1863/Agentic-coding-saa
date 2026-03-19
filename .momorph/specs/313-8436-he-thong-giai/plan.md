# Implementation Plan: Awards System (He thong giai)

**Frame**: `313:8436-He thong giai`
**Date**: 2026-03-09
**Spec**: `specs/313-8436-he-thong-giai/spec.md`

---

## Summary

Build the Awards System page — a long-scroll single-page layout presenting all SAA 2025 award categories. The page features a composite hero banner (awards-specific background + gradient + ROOT FURTHER text overlays + section title), a two-column layout with a sticky left sidebar navigation (6 award categories) and scrollable right panel (6 award detail cards), a Sun* Kudos promotional section (reused from Homepage), and a standard footer. The sidebar tracks the currently visible award card using IntersectionObserver and supports click-to-scroll navigation. Award data is fetched from Supabase and rendered via Server Components, with a Client Component island for the interactive sidebar.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image
**Database**: Supabase (PostgreSQL) — awards table for award categories and details
**Testing**: Playwright (E2E), Vitest (unit/integration)
**State Management**: Server-side sessions (Supabase Auth cookies), client state for sidebar active tracking (IntersectionObserver)
**API Style**: Supabase client queries (Server Components) + Next.js server actions

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases `@/*`, PascalCase components, kebab-case files)
- [x] Uses approved libraries and patterns (Supabase, Tailwind CSS, next/image, next/font — no new deps)
- [x] Adheres to folder structure guidelines (App Router: `src/app/awards/`, shared: `src/components/shared/`, feature: `src/components/awards/`)
- [x] Meets security requirements (Principle IV: Supabase Auth only, server-side session verification, RLS on awards table, parameterized queries)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined in spec)
- [x] Server-first architecture (Principle I: Server Component page, client boundary only on AwardSidebar for IntersectionObserver)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, 44px touch targets, mobile-first Tailwind)
- [x] Edge-compatible (Principle VI: No Node.js APIs, IntersectionObserver is a browser API, Cloudflare Workers safe)
- [x] Simplicity (Principle VII: Minimal client state, data-driven award cards, reuse shared components)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based with shared component reuse
  - `src/app/awards/` — Awards page (Server Component), loading/error boundaries
  - `src/components/awards/` — Feature-specific components (AwardSidebar, AwardCard, KeyVisual, AwardSystem); KudosSection reused from `src/components/homepage/`
  - `src/components/shared/` — Reuse existing Header, Footer, LanguageSelector
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`. Glass morphism via `backdrop-blur-[32px]`. Gold accent color `#FFEA9E` used throughout.
- **Data Fetching**: Server Component fetches award categories from Supabase. Data passed as props to child components. No client-side fetching needed for award content.
- **Scroll Tracking**: Client Component (`AwardSidebar`) uses IntersectionObserver to track visible award cards and update the active sidebar item. Click handlers trigger `scrollIntoView({ behavior: 'smooth' })`.

### Backend Approach

- **API Design**: No custom API routes needed. Supabase queries in Server Components via `@/libs/supabase/server.ts`.
- **Data Access**: Direct Supabase query — `supabase.from('awards').select('*').order('sort_order')`.
- **Validation**: Server-side auth check via `supabase.auth.getUser()`. RLS policies ensure only authenticated users can read awards.

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/server.ts` — Server client for auth check and data fetching
  - `@/libs/supabase/middleware.ts` — Auth middleware (redirects unauthenticated to `/login`)
  - `@/libs/i18n/translations.ts` — Translation strings for awards page
- **Shared Components**:
  - `src/components/shared/header.tsx` — Reuse with "Award Information" as active tab
  - `src/components/shared/footer.tsx` — Reuse with additional "Tieu chuan chung" nav item
  - `src/components/shared/language-selector.tsx` — Reuse in header
- **API Contracts**: Supabase table schema for `awards` (see Key Entities in spec)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/313-8436-he-thong-giai/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # Codebase research findings
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/
│   └── awards/
│       ├── page.tsx              # Awards page (Server Component)
│       ├── loading.tsx           # Loading skeleton (constitution Principle I)
│       └── error.tsx             # Error boundary with retry (constitution Principle I)
├── components/
│   └── awards/
│       ├── award-sidebar.tsx     # Sticky sidebar navigation (Client Component)
│       ├── award-card.tsx        # Award detail card (presentational, rendered within Client Component boundary)
│       └── award-system.tsx      # Two-column layout wrapper (Client Component - hosts IntersectionObserver)
│       └── key-visual.tsx        # Composite banner: bg image + gradient + ROOT FURTHER overlays + section title (Server Component)
# NOTE: KudosSection reused from src/components/homepage/kudos-section.tsx (no awards-specific copy)
# NOTE: section-title.tsx REMOVED — merged into key-visual.tsx composite banner
└── libs/
    └── i18n/
        └── translations.ts      # Add awards.* and kudos.* i18n keys

# Modified Files
src/
├── components/
│   └── shared/
│       ├── header.tsx            # Support active tab prop for route-based highlighting
│       └── footer.tsx            # Support additional nav items (e.g., "Tieu chuan chung")

# Database
supabase/
├── migrations/
│   └── YYYYMMDDHHMMSS_create_awards_table.sql  # Awards table with RLS
└── seeds/
    └── common/
        └── awards.sql            # Seed data for 6 award categories

# Assets
public/
└── images/
    └── awards/
        ├── keyvisual-award-bg.png # Hero key visual (awards-specific, NOT shared from login)
        ├── top-talent.png        # Award card image
        ├── top-project.png       # Award card image
        ├── top-project-leader.png
        ├── best-manager.png
        ├── signature-2025.png
        ├── mvp.png
        ├── kudos-bg.webp         # Kudos section background
        ├── icon-target.svg       # Target icon for sidebar/card titles
        ├── icon-diamond.svg      # Diamond icon for quantity section
        ├── icon-license.svg      # License icon for value section
        └── icon-arrow-right.svg  # Arrow icon for "Chi tiet" button
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required |

> All required packages (`@supabase/ssr`, `next`, `react`, `tailwindcss`) are already installed. IntersectionObserver is a native browser API.

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download required UI assets from Figma using `get_media_files` tool:
  - Award card images (6 images, 336x336px each) → `public/images/awards/`
  - Icon assets (target, diamond, license, arrow-right) → `public/images/awards/`
  - Kudos section background → `public/images/awards/kudos-bg.webp`
- Export and optimize the key visual background → `public/images/awards/keyvisual-award-bg.png` (awards-specific, NOT reused from login)
- Verify asset quality and naming conventions (kebab-case per constitution)

### Phase 1: Foundation (Database + i18n)

**Purpose**: Set up the data layer and translation keys that the UI depends on.

1. **Create database migration** — `supabase/migrations/YYYYMMDDHHMMSS_create_awards_table.sql`
   - Table: `awards` with columns: `id` (uuid, PK), `slug` (text, unique), `name` (text), `name_en` (text), `description` (text), `description_en` (text), `image_url` (text), `quantity` (integer), `unit_type` (text — 'individual'/'team'/'unit'), `prize_value` (bigint), `prize_value_secondary` (bigint, nullable — for dual-value awards like Signature 2025), `sort_order` (integer), `created_at` (timestamptz)
   - Enable RLS: `ALTER TABLE awards ENABLE ROW LEVEL SECURITY`
   - Policy: `CREATE POLICY "Authenticated users can read awards" ON awards FOR SELECT TO authenticated USING (true)`

2. **Create seed data** — `supabase/seeds/common/awards.sql`
   - Insert 6 award categories: Top Talent (10, individual, 7M), Top Project (02, team, 15M), Top Project Leader (03, individual, 7M), Best Manager (01, individual, 10M), Signature 2025 Creator (01, dual: 5M individual / 8M team), MVP (01, individual, 15M)

3. **Update translations** — `src/libs/i18n/translations.ts`
   - Add all `awards.*` and `kudos.*` i18n keys from the spec

### Phase 2: User Story 1 — View Award Details (P1, MVP)

**Purpose**: Core awards display with all 6 award cards.

1. **Create `src/app/awards/page.tsx`** — Awards page (Server Component)
   - Check auth via `supabase.auth.getUser()` — middleware handles redirect if unauthenticated
   - Fetch awards data from Supabase: `supabase.from('awards').select('*').order('sort_order')`
   - Read locale from cookie for i18n
   - Render: Header (active tab: "Award Information") → Key Visual → Section Title → Award System (sidebar + cards) → Kudos Section → Footer
   - Background: `bg-[#00101A] min-h-screen`

2. **Create `src/app/awards/loading.tsx`** — Loading skeleton
   - Full-screen dark background (`#00101A`) with centered pulsing placeholder
   - 6 skeleton card placeholders with `animate-pulse`

3. **Create `src/app/awards/error.tsx`** — Error boundary
   - Dark background, centered "Something went wrong" with "Try again" button (`#FFEA9E`, 8px radius)

4. **Create `src/components/awards/key-visual.tsx`** — Composite banner (Server Component)
   - 4 layers: (1) awards-specific background image (`keyvisual-award-bg.png`, `next/image` with `priority`, `object-cover`), (2) gradient overlay (`linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0.00) 52.79%)`), (3) ROOT FURTHER text overlays (left-aligned, reuse `root-text.png` + `further-text.png` from `/images/homepage/`), (4) section title at bottom (caption + divider + title in `#FFEA9E`)
   - Accept `caption` and `title` props for i18n
   - ~~`section-title.tsx`~~ — REMOVED, merged into key-visual.tsx

6. **Create `src/components/awards/award-card.tsx`** — Award detail card (Server Component)
   - Award image (336x336px, `rounded-3xl`, gold border, gold glow shadow, `mix-blend-screen`)
   - Card content with `backdrop-blur-[32px]`, `rounded-2xl`
   - Title with target icon, description (justified text), divider, quantity section with diamond icon, divider, value section with license icon
   - Handle dual-value layout for Signature 2025 Creator (separate lines for individual/team prizes)
   - Bottom divider between cards (`#2E3940`)

7. **Reuse `src/components/homepage/kudos-section.tsx`** — KudosSection (Server Component, REUSED from Homepage)
   - No awards-specific KudosSection component. Import and render the Homepage KudosSection directly in the awards page.
   - Pass awards-page translations as props: `subtitle`, `title`, `newFeatureLabel`, `description`, `detailButtonText`.

### Phase 3: User Story 2 — Sidebar Navigation (P2)

**Purpose**: Interactive sidebar with scroll tracking and click navigation.

1. **Create `src/components/awards/award-system.tsx`** — Two-column layout (Client Component)
   - `'use client'` directive — hosts IntersectionObserver logic
   - Flex row layout: sidebar (178px) + cards area (flex-1), gap: 80px
   - Manages `activeAward` state and `isScrolling` flag
   - IntersectionObserver configuration: `threshold: 0.5` (or adaptive), `rootMargin: '-80px 0px 0px 0px'` (accounts for fixed header)
   - Passes `activeAward` and `onAwardClick` handler to sidebar
   - On click: sets `isScrolling = true`, calls `element.scrollIntoView({ behavior: 'smooth' })`, resets `isScrolling` after scroll completes (via `setTimeout` or `scrollend` event)
   - While `isScrolling` is true, IntersectionObserver updates are suppressed to prevent flickering
   - **Note on component boundary**: Since this is a Client Component, `AwardCard` components rendered as children will also run on the client. This is acceptable because award data is passed as serializable props from the Server Component page. The AwardCard itself does not fetch data — it is a presentational component receiving pre-fetched award data. This keeps the `'use client'` boundary contained while allowing IntersectionObserver to track card DOM elements via refs.

2. **Create `src/components/awards/award-sidebar.tsx`** — Sidebar navigation (presentational)
   - Receives `activeAward`, `awards`, and `onAwardClick` as props
   - `position: sticky; top: 80px` (below fixed header)
   - Active state: gold color `#FFEA9E`, `border-bottom: 1px solid #FFEA9E`, text-shadow gold glow
   - Default state: white `#FFFFFF`, no border, no glow
   - Hover state: gold color with glow (150ms transition)
   - Each item: flex, padding 16px, target icon (24x24), text (14px/700)
   - Keyboard accessible: `role="navigation"`, `aria-label="Award categories"`, items focusable with `Tab`, `Enter` to activate
   - **Arrow key navigation**: `ArrowDown` moves focus to next item, `ArrowUp` moves to previous (spec requirement). Use `onKeyDown` handler with `event.preventDefault()` to prevent page scroll. Wrap focus at list boundaries.
   - Focus indicator: `outline: 2px solid #FFEA9E, outline-offset: 2px`

### Phase 4: User Story 3 — Kudos Section Interaction (P3)

**Purpose**: Ensure Kudos CTA button navigates correctly.

1. **Wire "Chi tiet" button** — Link to Kudos detail page
   - Use `next/link` for client-side navigation
   - Button styling: `bg-[#FFEA9E] text-[#00101A] rounded px-4 py-4 font-bold`
   - Hover state: slightly darker gold (`#FFE07A`, 150ms transition)
   - Arrow right icon (24x24) to the right of text

### Phase 5: User Story 4 — Responsive Design (P4)

**Purpose**: Ensure layout works across all breakpoints.

1. **Mobile (< 768px)**:
   - Header: `px-4`, hamburger menu for nav tabs
   - Key visual: reduced height, `px-4`
   - Section title: `text-[32px] leading-[40px]`
   - Sidebar: hidden or converted to horizontal scrollable tabs above cards
   - Award cards: full width, single column, image 280px, content stacked below image (`flex-col`)
   - Kudos: `px-4`, auto height, "KUDOS" text 48px
   - Footer: stacked layout, `px-4`
   - All touch targets >= 44x44px

2. **Tablet (768px - 1023px)**:
   - Header: `md:px-12`
   - Sidebar: horizontal scrollable tabs or collapsed
   - Award cards: image 280px, reduced gaps
   - Kudos: adjusted padding and font sizes
   - Footer: `md:px-12`

3. **Desktop (1024px - 1279px)**:
   - Header: `lg:px-20`
   - Content: `lg:px-20`
   - Sidebar: visible, sticky, `lg:w-[160px]`
   - Award cards: image 280px, columns gap 40px
   - Footer: `lg:px-20`

4. **Wide (>= 1280px)**:
   - Match Figma at 1440px: `xl:px-36`, sidebar 178px, cards 853px, gap 80px
   - Container: `max-w-[1440px] mx-auto`

### Phase 6: Polish & Edge Cases

**Purpose**: Accessibility, performance, and edge case handling.

1. **Accessibility audit**:
   - Sidebar: `role="navigation"`, `aria-label="Award categories"`, keyboard navigation (`Tab`, `ArrowUp/Down`, `Enter`)
   - All interactive elements have visible focus indicators (`outline: 2px solid #FFEA9E, offset: 2px`)
   - Award card images: descriptive `alt` text
   - Color contrast: verify 4.5:1 ratio for all text
   - Run axe-core automated check — target WCAG AA pass

2. **Performance optimization**:
   - Key visual: `next/image` with `priority`, WebP format, responsive `sizes`
   - Award card images: lazy loading for below-the-fold cards (only first 1-2 get `priority`)
   - Minimize Client Component bundle — only `award-system.tsx` needs `'use client'`
   - Consider `loading="lazy"` for Kudos background image

3. **Edge cases**:
   - ~~No awards data → display "Coming soon" placeholder~~ _(REMOVED — awards are static seed data, always present)_
   - Last award scrolled past → "MVP" remains active in sidebar
   - Sidebar taller than viewport → `overflow-y: auto` within sticky container
   - Direct navigation to award anchor (e.g., `#top-project`) → scroll to card and update sidebar
   - Notification API failure → silently hide red dot in header

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| IntersectionObserver flickering during rapid scroll | Med | Med | Use `isScrolling` flag to suppress updates during programmatic scroll; debounce observer callbacks |
| Sidebar sticky positioning conflicts with mobile layout | Low | Med | Conditionally render sidebar vs horizontal tabs based on breakpoint; use Tailwind responsive utilities |
| SVN-Gotham font not available (custom font for "KUDOS") | Med | Low | Define font in `next/font/local` or fallback to sans-serif; verify font file is available |
| Award card images too heavy (6 x 336x336px) | Med | Med | Optimize as WebP, lazy-load below-the-fold images, use responsive `sizes` attribute |
| Glass morphism (`backdrop-filter: blur`) performance on mobile | Low | Med | Test on low-end devices; consider removing blur on mobile if performance is poor |
| Database migration conflicts with other features | Low | Low | Use timestamped migration files; coordinate with team |

### Estimated Complexity

- **Frontend**: High — Two-column layout, IntersectionObserver scroll tracking, 6 detailed award cards with multiple sub-sections, responsive adaptations (sidebar → horizontal tabs), glass morphism effects
- **Backend**: Low — Single database table, seed data, RLS policy, Supabase query
- **Testing**: Medium — IntersectionObserver mocking, scroll behavior testing, responsive viewport testing, accessibility audit

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: AwardSidebar ↔ IntersectionObserver ↔ AwardCards scroll tracking
- [x] **External dependencies**: Supabase Auth (session), Supabase DB (awards query)
- [x] **Data layer**: Awards table CRUD, RLS policies
- [x] **User workflows**: Page load → view awards → sidebar navigation → Kudos CTA click

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Sidebar click → smooth scroll to card, IntersectionObserver → sidebar active state update |
| Service ↔ Service | Yes | Server Component → Supabase query for awards data |
| App ↔ External API | No | No external APIs beyond Supabase |
| App ↔ Data Layer | Yes | Awards table read with RLS, seed data verification |
| Cross-platform | Yes | Responsive layout at 4 breakpoints, sidebar → horizontal tabs on mobile |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E
- **Test data strategy**: Seeded awards data in `supabase/seeds/common/awards.sql`
- **Isolation approach**: Fresh Supabase state per test suite, seeded with known award data

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack |
| Supabase DB | Real (local) | Seeded local database for awards data |
| IntersectionObserver | Mock (Vitest) | Unit test sidebar logic without browser scroll |
| Scroll behavior | Real (Playwright) | E2E tests verify actual scroll and sidebar tracking |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Page loads with 6 award cards displaying correct data (images, titles, descriptions, quantities, values)
   - [ ] Sidebar displays 6 navigation items matching award categories
   - [ ] Click sidebar item "Top Project" → page smooth-scrolls to Top Project card → sidebar item becomes active
   - [ ] Manual scroll to "Best Manager" card → sidebar "Best Manager" item becomes active
   - [ ] "Chi tiet" button in Kudos section navigates to Kudos detail page
   - [ ] Header shows "Award Information" as active tab

2. **Error Handling**
   - [ ] Unauthenticated user → redirected to `/login`
   - [ ] Awards data fetch fails → error boundary displays with retry button
   - ~~Empty awards data → "Coming soon" placeholder displayed~~ _(N/A — static seed data)_

3. **Edge Cases**
   - [ ] Rapid scroll through all 6 sections → sidebar tracks correctly without flickering
   - [ ] Last award (MVP) scrolled past → MVP remains active in sidebar
   - [ ] Direct navigation to `#top-project` anchor → scrolls to card, sidebar reflects
   - [ ] Signature 2025 Creator card displays dual prize values correctly
   - [ ] Page renders at 320px, 768px, 1024px, 1440px — layout adapts correctly

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: Supabase local, Playwright browser automation, axe-core (accessibility)
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Award cards rendering | 90%+ | High |
| Sidebar navigation + scroll tracking | 85%+ | High |
| Responsive layout | Visual regression | Medium |
| i18n translations | 80%+ | Medium |
| Kudos section + CTA | 80%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [ ] Database migrations planned (awards table)
- [ ] Figma assets exported and optimized

### External Dependencies

- Supabase local running (`make up`)
- Figma media assets downloaded to `public/images/awards/`
- SVN-Gotham font file available for "KUDOS" decorative text
- Login implementation complete (shared Header, Footer, LanguageSelector, middleware)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- **Shared Header needs extension**: The existing header component from the login screen needs to support an `activeTab` prop or route-based active state detection for "Award Information" highlighting. The header on this page includes navigation tabs (About SAA, Award Info, Kudos, Tieu chuan chung) and a notification bell, user avatar — these may not be in the login header. **Action**: Add `activeTab?: string` and `navItems?: NavItem[]` props to `header.tsx`. Add notification bell icon with red dot driven by unread count (passed as prop or fetched).
- **Shared Footer needs extension**: The footer on this page includes 4 navigation items (one more than Homepage: "Tieu chuan chung"). The footer component should accept `navItems` as a prop or derive them from a route-based configuration. **Action**: Add `navItems?: NavItem[]` prop to `footer.tsx` with default items. The Awards page passes the additional "Tieu chuan chung" item.
- **Notification unread count**: The spec lists `/api/notifications/unread-count` as a predicted new API. The plan should fetch this in the Server Component and pass the count to the Header. If the API is not yet available, pass `0` as default and silently hide the red dot (per spec edge case: "Notification API failure: Silently hide red dot").
- **SVN-Gotham font**: The "KUDOS" decorative text uses SVN-Gotham at 96px. This is a custom/local font that needs to be configured via `next/font/local`. If the font file is unavailable, use a sans-serif fallback.
- **Signature 2025 Creator dual values**: This is the only award card with two prize values (individual + team). The `AwardCard` component must handle this special case — either via a `prize_value_secondary` field or a structured `prize_values` array.
- **Award card images use `mix-blend-mode: screen`**: This creates a lighter compositing effect against the dark background. It is a deliberate design choice for the awards aesthetic.
- **No new npm packages needed.** IntersectionObserver is a native browser API. All other dependencies are already installed.
- **The user avatar border style differs between designs**: The login header may use a circular avatar while the awards page header uses `border-radius: 4px`. Verify which is correct and standardize across pages.
