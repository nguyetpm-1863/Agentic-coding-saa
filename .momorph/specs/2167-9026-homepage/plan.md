# Implementation Plan: Homepage SAA 2025

**Frame**: `2167:9026-Homepage SAA`
**Date**: 2026-03-09 (updated 2026-03-10)
**Spec**: `specs/2167-9026-homepage/spec.md`

---

## Summary

Build the Homepage — the main authenticated landing page for Sun Annual Awards 2025. The page is a long-scroll single-page layout featuring a hero section with "ROOT FURTHER" branding and live countdown timer, an awards grid displaying 6 award categories, a Sun* Kudos promotional section, and a fixed header with section-tracking navigation. The implementation requires extending the existing Header with navigation tabs and notification bell, creating client component islands for the countdown timer and IntersectionObserver-based nav state, fetching awards data from Supabase, and loading two custom fonts (Digital Numbers, SVN-Gotham).

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image
**Database**: Supabase (PostgreSQL) — `award_categories` table, `events` table (or env var), `notifications` (unread count)
**Testing**: Playwright (E2E), Vitest (unit/integration)
**State Management**: Server-side sessions (Supabase Auth cookies), client state for countdown timer and active nav section
**API Style**: Supabase client queries (direct DB) + Next.js Server Components for data fetching

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases `@/*`, kebab-case files, PascalCase components)
- [x] Uses approved libraries and patterns (Supabase, Tailwind, next/font, next/image — no new runtime deps)
- [x] Adheres to folder structure guidelines (App Router: `src/app/`, components: `src/components/homepage/`, shared: `src/components/shared/`)
- [x] Meets security requirements (Principle IV: Supabase Auth session verified server-side, no secrets exposed, RLS on all tables)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined in spec)
- [x] Server-first architecture (Principle I: Server Component page with client islands for countdown and nav state only)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, 44px touch targets, tested at 320/768/1024/1440px)
- [x] Edge-compatible (Principle VI: No Node.js APIs, `setInterval` and `IntersectionObserver` are Web APIs)
- [x] Simplicity (Principle VII: No unnecessary abstractions, static data where possible, minimal client state)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Custom fonts (Digital Numbers, SVN-Gotham) | Required by design for countdown digits and KUDOS logo. These are display-only fonts with minimal weight. | Using Montserrat for everything — would not match design spec. |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based with shared components
  - `src/app/(home)/` — Homepage route group (Server Component page)
  - `src/components/homepage/` — Homepage-specific components (CountdownTimer, AwardCard, NavTabs, etc.)
  - `src/components/shared/` — Reuse existing Header, Footer, LanguageSelector
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`. Custom fonts loaded via `next/font/local` for Digital Numbers and SVN-Gotham.
- **Data Fetching**: Server Component fetches awards data, event config, user session, and unread notification count. Passes data as props to client islands.
- **Client Boundaries**: Only three client components needed:
  1. `CountdownTimer` — uses `setInterval` for real-time updates
  2. `NavTabs` — uses `IntersectionObserver` to track active section
  3. `NotificationBell` — fetches unread count client-side to avoid blocking page render

### Backend Approach

- **API Design**: No custom API routes needed. Direct Supabase queries from Server Components.
- **Data Access**: Supabase client from `@/libs/supabase/server.ts` for server-side queries.
- **Validation**: No user input on this page. Read-only data display.
- **Database**: New `award_categories` table with RLS. Event config via environment variable (`EVENT_DATE`, `EVENT_VENUE`) or Supabase `app_config` table.

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/server.ts` — Server client for data fetching (awards, session, notifications)
  - `@/libs/supabase/client.ts` — Browser client for notification polling (if needed)
  - `@/libs/supabase/middleware.ts` — Session refresh (already configured in `src/middleware.ts`)
  - `@/libs/i18n/translations.ts` — Extend with homepage translation keys
- **Shared Components**:
  - `src/components/shared/header.tsx` — Add optional `className` prop for background override; wrapped by `HomeHeader` for homepage
  - `src/components/shared/footer.tsx` — Extend to include nav links in addition to copyright
  - `src/components/shared/language-selector.tsx` — Reuse as-is in header
- **API Contracts**: Supabase DB queries — schema defined in migrations

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2167-9026-homepage/
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
│   ├── (home)/
│   │   ├── page.tsx              # Homepage (Server Component) — replaces current src/app/page.tsx
│   │   ├── loading.tsx           # Loading skeleton (constitution Principle I / TR-005)
│   │   └── error.tsx             # Error boundary with retry (constitution Principle I / TR-005)
├── components/
│   └── homepage/
│       ├── countdown-timer.tsx   # Live countdown (Client Component)
│       ├── digit-box.tsx         # Single countdown digit display
│       ├── nav-tabs.tsx          # Header navigation tabs with IntersectionObserver (Client Component)
│       ├── notification-bell.tsx # Bell icon with unread dot (Client Component)
│       ├── user-avatar.tsx       # Circular user avatar display
│       ├── hero-section.tsx      # Key visual hero (Server Component)
│       ├── awards-section.tsx    # Awards grid section (Server Component)
│       ├── award-card.tsx        # Individual award card
│       ├── home-header.tsx       # Homepage header wrapper with nav tabs + bell + avatar (Server Component)
│       ├── kudos-section.tsx     # Kudos promotional section (Server Component)
│       ├── content-section.tsx   # "Root Further" description (Server Component)
│       └── widget-button.tsx     # Floating action button placeholder (Client Component)

# Modified Files
src/
├── app/
│   ├── page.tsx                  # DELETE this file (replaced by (home)/page.tsx route group)
│   └── layout.tsx                # Add Montserrat weight 500 to font config
├── components/
│   └── shared/
│       ├── header.tsx            # Minor: add optional `className` prop for background override
│       └── footer.tsx            # Extend to include nav links row
├── libs/
│   └── i18n/
│       └── translations.ts      # Add homepage i18n keys

# New Database Migration
supabase/
└── migrations/
    ├── YYYYMMDDHHMMSS_create_award_categories.sql  # award_categories table + RLS + seed
    └── YYYYMMDDHHMMSS_create_user_profiles_sync_trigger.sql  # user_profiles table + auth.users INSERT trigger

# Assets
public/
└── images/
    └── homepage/
        ├── root-further-logo.png     # ROOT FURTHER hero logo (reuse from login or separate)
        ├── root-text.png             # "Root" decorative text image (189×67px, C_Content section)
        ├── further-text.png          # "Further" decorative text image (290×67px, C_Content section)
        ├── keyvisual-bg.webp          # Hero background (reuse from login or separate)
        ├── award-top-talent.webp      # Award card image
        ├── award-top-project.webp     # Award card image
        ├── award-top-project-leader.webp
        ├── award-best-manager.webp
        ├── award-signature-2025.webp
        └── award-mvp.webp

# Custom Fonts
public/
└── fonts/
    ├── digital-numbers.woff2         # Countdown digit font
    └── svn-gotham.woff2              # KUDOS logo font
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new runtime dependencies required |

> All required packages (`@supabase/ssr`, `next`, `react`, `tailwindcss`) are already installed. Custom fonts loaded via `next/font/local` (built-in).

---

## Implementation Strategy

### Phase 0: Asset & Font Preparation

- Download award card images from Figma using `get_media_files` tool (6 images)
- **Export "ROOT FURTHER" content section title images** from Figma (new assets per spec review):
  - "Root" text image (Figma node 3204:10155, 189×67px) → `public/images/homepage/root-text.png`
  - "Further" text image (Figma node 3204:10154, 290×67px) → `public/images/homepage/further-text.png`
  - These are stylized decorative images, NOT regular text — must be exported as separate assets
- Verify hero key visual assets — reuse from login if identical, otherwise export homepage version
- Source Digital Numbers font file → `public/fonts/digital-numbers.woff2`
- Source SVN-Gotham font file → `public/fonts/svn-gotham.woff2`
- Register custom fonts in root layout via `next/font/local`:
  ```typescript
  const digitalNumbers = localFont({
    src: '../../public/fonts/digital-numbers.woff2',
    variable: '--font-digital-numbers',
    display: 'swap',
  });
  const svnGotham = localFont({
    src: '../../public/fonts/svn-gotham.woff2',
    variable: '--font-svn-gotham',
    display: 'swap',
  });
  ```
- Verify asset quality and kebab-case naming (constitution Principle II)

### Phase 1: Database & Data Layer

**Purpose**: Set up the data foundation that the homepage reads from.

1. **Create migration `supabase/migrations/YYYYMMDDHHMMSS_create_award_categories.sql`**
   - Table `award_categories`: `id` (uuid, PK), `name_vi` (text, not null), `name_en` (text, not null), `description_vi` (text), `description_en` (text), `image_url` (text), `display_order` (integer), `created_at` (timestamptz)
   - **Note**: Award names/descriptions are stored with `_vi` and `_en` suffixes for i18n. The Server Component selects the correct column based on the locale cookie value.
   - Enable RLS: `ALTER TABLE award_categories ENABLE ROW LEVEL SECURITY;`
   - Policy: Allow `SELECT` for authenticated users
   - Seed data: 6 awards (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP)

2. **Define event configuration approach**
   - Use environment variables for simplicity (Principle VII): `EVENT_DATE` (ISO 8601), `EVENT_VENUE`, `EVENT_TIME_DISPLAY`
   - Add to `.env.example`: `EVENT_DATE=2025-12-15T18:30:00+07:00`, `EVENT_VENUE=...`, `EVENT_TIME_DISPLAY=18h30`
   - Server Component reads `process.env.EVENT_DATE` — no client exposure needed (countdown receives calculated values as props)
   - **Note**: `process.env` works in Next.js server context on Cloudflare Workers via OpenNext runtime.

3. **Create migration `supabase/migrations/YYYYMMDDHHMMSS_create_user_profiles_sync_trigger.sql`** — Sync `auth.users` to `user_profiles`
   - Create table `user_profiles`: `id` (uuid, PK, FK auth.users), `name` (text), `avatar_url` (text), `department_id` (uuid, nullable FK departments), `created_at` (timestamptz)
   - Enable RLS: `ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;`
   - Policy: Allow `SELECT` for authenticated users
   - Create a PostgreSQL function `handle_new_user()` that fires on `INSERT` to `auth.users` and copies `id`, `email`, `raw_user_meta_data->>'full_name'` → `name`, `raw_user_meta_data->>'avatar_url'` → `avatar_url` to `user_profiles`
   - Create trigger: `CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();`
   - **Cross-reference**: The `user_profiles` table is also required by the Sun* Kudos Live Board feature (see `.momorph/specs/2940-13431-sun-kudos-live-board/plan.md`). This migration is defined here as the Homepage is implemented first; the Live Board plan references the same table and sync strategy.

4. **Extend `src/libs/i18n/translations.ts`** — Add all homepage i18n keys
   - Add keys: `homepage.coming_soon`, `homepage.event_time`, `homepage.cta_awards`, `homepage.cta_kudos`, `nav.about_saa`, `nav.award_info`, `nav.kudos`, `awards.caption`, `awards.title`, `kudos.detail_button`, `countdown.days`, `countdown.hours`, `countdown.minutes`, `footer.copyright` (already exists)
   - Update `TranslationKeys` type to include new keys

### Phase 2: User Story 1 — Hero & Countdown (P1, MVP)

**Purpose**: Core above-the-fold experience — hero visual with live countdown.

1. **Create `src/components/homepage/home-header.tsx`** — Homepage Header wrapper (Server Component)
   - Composes the shared `<Header>` and uses the same background as Login: `rgba(11, 15, 18, 0.80)` (canonical value — see **Resolved Decision** below)
   - Renders NavTabs (client) in a center slot, and NotificationBell + LanguageSelector + UserAvatar on the right
   - Does NOT modify the shared `header.tsx` API — avoids breaking the login page (Principle VII: simplicity)
   - If the shared `<Header>` needs a `className` or `bgClassName` prop for background override, add that single prop as a minimal extension

2. **Update `src/app/layout.tsx`** — Add Montserrat weight 500
   - Add weight `"500"` to the existing Montserrat font configuration (needed for "Chi tiet" links and nav tab text)

3. **Create `src/components/homepage/hero-section.tsx`** — Server Component
   - Relative container with background image (next/image, `priority`, `fill`, `object-cover`)
   - **Cover gradient overlay** (Node ID: 2167:9029) — absolutely positioned div on top of keyvisual background to reduce brightness: `linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%)`. Implement as inline style for exact angle precision (Tailwind cannot express `12.34deg` directly).
   - Content stack: ROOT FURTHER logo, "Coming soon" subtitle, CountdownTimer (client), event info, CTA buttons
   - CTA buttons: anchor links with `href="#awards"` and `href="#kudos"`, `scroll-behavior: smooth` on html
   - Responsive: padding 16px → 48px → 80px → 144px

3. **Create `src/components/homepage/countdown-timer.tsx`** — Client Component
   - Props: `targetDate: string` (ISO 8601, passed from server)
   - State: `{ days, hours, minutes }` computed from `targetDate - Date.now()`
   - `useEffect` with `setInterval` at 60-second intervals (TR-002)
   - Handle edge case: past date shows `00:00:00` or "The event has started!"
   - `aria-live="polite"` region for screen reader updates
   - Responsive: horizontal layout on desktop, stacked/smaller on mobile

4. **Create `src/components/homepage/digit-box.tsx`** — Presentational component
   - Renders a single digit in the glass morphism box
   - Styles: 51x82px, rounded-lg, `border-[0.5px] border-[#FFEA9E]`, `backdrop-blur-[16.64px]`
   - Font: Digital Numbers 49px
   - Each digit in its own box; pairs grouped (tens + ones) with label below

5. **Delete `src/app/page.tsx`** and **Create `src/app/(home)/page.tsx`** — Homepage Server Component
   - **IMPORTANT**: The existing `src/app/page.tsx` must be deleted because `(home)` is a route group mapping to `/`, creating a route conflict. Remove the old file before creating the new one.
   - Verify auth via `supabase.auth.getUser()` (middleware handles redirect, but double-check for data)
   - Fetch awards data from Supabase: `supabase.from('award_categories').select('*').order('display_order')`
   - Read event config from env vars
   - Read locale from cookie
   - Compose full page: HomeHeader → Hero → Content → Awards → Kudos → Footer
   - Add `id` attributes to sections for anchor navigation: `id="about"`, `id="awards"`, `id="kudos"`
   - Set `scroll-behavior: smooth` on the page/html

6. **Create `src/app/(home)/loading.tsx`** — Loading state
   - Dark background (#00101A), centered pulsing placeholder
   - Minimal — avoid layout shift

7. **Create `src/app/(home)/error.tsx`** — Error boundary
   - Dark background, centered "Something went wrong" message
   - "Try again" button styled with #FFEA9E, 8px radius
   - Same pattern as Login error.tsx

8. **Extend `src/components/shared/footer.tsx`** for homepage
   - Add optional `navLinks` prop: `Array<{ label: string; href: string }>` for the nav links row above copyright
   - Render nav links (About SAA, Award Info, Kudos) above copyright text
   - Nav link hover: gold text (#FFEA9E), transition 150ms
   - Login page continues to pass no navLinks, so backward-compatible

### Phase 3: User Story 2 — Awards Grid (P2)

**Purpose**: Display 6 award categories in a responsive grid.

1. **Create `src/components/homepage/awards-section.tsx`** — Server Component
   - Section header: caption "Sun* annual awards 2025" (24px/700, #FFEA9E) + title "Hệ thống giải thưởng" (57px/700, #FFEA9E)
   - 48px gap between header and grid
   - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-x-6 gap-y-16 lg:gap-y-20`
   - Receives awards data as props from page

2. **Create `src/components/homepage/award-card.tsx`** — Presentational component
   - Props: `name: string`, `description: string`, `imageUrl: string`
   - Image: next/image, square aspect ratio, `rounded-3xl`, `border border-[#FFEA9E]`, gold glow box-shadow
   - Title: Montserrat 24px/400, #FFEA9E
   - Description: Montserrat 16px/400, #FFFFFF
   - 9.5px gap between image and text

### Phase 4: User Story 3 — Header Navigation (P3)

**Purpose**: Section-tracking navigation with smooth scroll.

1. **Create `src/components/homepage/nav-tabs.tsx`** — Client Component
   - Props: `sections: Array<{ id: string, label: string }>`
   - Uses `IntersectionObserver` to detect which section is currently in viewport (TR-003)
   - Tracks `activeSection` state
   - Renders tab buttons with states:
     - Normal: white text, no border
     - Hover: gold text (#FFEA9E) + text-shadow glow
     - Active: gold text + `border-bottom: 1px solid #FFEA9E` + text-shadow glow
   - `onClick` calls `document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })`
   - ARIA: `role="tablist"` container, `role="tab"` per tab, `aria-selected` on active
   - Keyboard: `Tab` to focus group, `ArrowLeft`/`ArrowRight` between tabs, `Enter` to activate

2. **Create `src/components/homepage/notification-bell.tsx`** — Client Component
   - Fetches unread count from Supabase on mount (client-side)
   - Bell icon (24x24px) with conditional red dot (8px, positioned top-right)
   - Graceful failure: if fetch fails, hide red dot silently (spec edge case)
   - Focus state: `outline: 2px solid #FFEA9E, offset: 2px`

3. **Create `src/components/homepage/user-avatar.tsx`** — Server or Client Component
   - Props: `avatarUrl: string`, `userName: string`
   - Circular image (40x40px, `rounded-full`)
   - Hover ring: `ring-2 ring-white/30`
   - Focus: `outline: 2px solid #FFEA9E`

### Phase 5: User Story 4 — Kudos Section (P4)

**Purpose**: Sun* Kudos promotional area.

1. **Create `src/components/homepage/kudos-section.tsx`** — Server Component
   - "KUDOS" decorative text: SVN-Gotham 96px/400, #DBD1C1, `letter-spacing: -0.13em`
   - Description paragraph: Montserrat 16px/700, #FFFFFF
   - "Chi tiết" button: outline style matching CTA buttons, navigates to Kudos detail page (`<Link href="/kudos">`)
   - Responsive padding: 16px → 48px → 80px → 144px

2. **Create `src/components/homepage/content-section.tsx`** — Server Component (**MAJOR UPDATE per spec review**)
   - This section is **NOT just a text paragraph** — it contains:
     1. **"ROOT FURTHER" title as two image assets** (NOT text):
        - "Root" image: 189×67px (`MM_MEDIA_Root Text`, Figma node 3204:10155)
        - "Further" image: 290×67px (`MM_MEDIA_Further Text`, Figma node 3204:10154)
        - Stacked vertically in a group (290×134px bounding box)
        - These are decorative styled images — export from Figma as PNG/SVG to `public/images/homepage/root-text.png` and `public/images/homepage/further-text.png`
     2. **Long-form content paragraphs**: Montserrat **24px/700** (NOT 16px), line-height **32px**, #FFFFFF
     3. **Centered quote block**: _"A tree with deep roots fears no storm"_ with Vietnamese translation, centered, italic style
   - Section padding: **120px 104px** (NOT 96px 144px) — CSS: `py-[120px] px-[104px]`
   - Gap between title images and content: **32px** — CSS: `gap-8`
   - Content area width: **1152px** — CSS: `max-w-[1152px]`
   - Content text may be from i18n or hardcoded (multi-paragraph with quote — confirm with design team)

### Phase 6: User Story 5 — Responsive & Polish (P5)

**Purpose**: Ensure all breakpoints work, accessibility audit, performance.

1. **Apply responsive styles** per `design-style.md` responsive specifications:
   - **Mobile (< 768px)**: Header simplified (nav tabs hidden or hamburger), awards 1-col, countdown stacked/smaller, CTAs full-width stacked, padding 16px
   - **Tablet (768-1023px)**: Nav tabs with smaller gap (32px), awards 2-col, padding 48px
   - **Desktop (1024-1279px)**: Full nav, awards 3-col, padding 80px
   - **Wide (>= 1280px)**: Match Figma at 1512px, `max-w-[1512px] mx-auto`, padding 144px

2. **Verify touch targets**: All interactive elements >= 44x44px on mobile (nav tabs 56px height, CTAs 48px+ height, bell/avatar with padding)

3. **Accessibility audit**:
   - Countdown `aria-live="polite"` announces updates
   - Nav tabs keyboard navigable (ArrowLeft/Right, Enter)
   - All images have appropriate alt text (decorative images use `alt=""`)
   - Focus indicators: `outline: 2px solid #FFEA9E, outline-offset: 2px`
   - Color contrast >= 4.5:1 (gold #FFEA9E on #00101A = ~11.8:1, passes)
   - Run axe-core automated check

4. **Performance optimization**:
   - Hero background: `next/image` with `priority`, WebP, responsive `sizes`
   - Award images: lazy-loaded (below fold), WebP
   - Custom fonts: `display: swap`, preloaded by next/font
   - Consider `loading="lazy"` on Kudos section images
   - Target LCP < 3s (SC-001)

5. **Widget button placeholder**:
   - Create `src/components/homepage/widget-button.tsx` — Client Component
   - Fixed position, bottom-right, z-50
   - Visual only — click handler is out of scope

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Custom fonts (Digital Numbers, SVN-Gotham) unavailable or licensing issue | Med | High | Source fonts early in Phase 0. Fallback: use Montserrat for countdown, sans-serif for KUDOS. |
| Award card images too large for mobile performance | Med | Med | Serve optimized WebP, use responsive `sizes` attribute, lazy-load below-fold cards. |
| IntersectionObserver scroll tracking unreliable with rapid scrolling | Low | Med | Debounce observer callbacks. Use `threshold: [0, 0.25, 0.5, 0.75, 1.0]` for smooth transitions. |
| Countdown timer drift over long page sessions | Low | Low | Re-sync with `Date.now()` on each interval tick (not cumulative). |
| ~~Header background color discrepancy (Login vs Homepage)~~ | — | — | **Resolved**: Use `rgba(11, 15, 18, 0.80)` (Login's value) as canonical. Homepage shares the Header component — no override needed. |
| Glass morphism `backdrop-filter` not supported in all browsers | Low | Med | Progressive enhancement — graceful fallback to semi-transparent background without blur. |
| `process.env` for event config on Cloudflare Workers | Low | Med | OpenNext supports build-time env vars. Test early with `wrangler dev`. Fallback: use Supabase `app_config` table. |

### Estimated Complexity

- **Frontend**: High — Long-scroll layout with multiple sections, custom fonts, glass morphism effects, IntersectionObserver, countdown timer, responsive at 4 breakpoints
- **Backend**: Low — Single table migration + seed, read-only Supabase queries, env var config
- **Testing**: Medium — Countdown timer logic, IntersectionObserver mocking, responsive viewport testing, accessibility checks

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: NavTabs ↔ IntersectionObserver ↔ page sections, CountdownTimer ↔ event date config
- [x] **External dependencies**: Supabase Auth (session verification), Supabase DB (awards query)
- [x] **Data layer**: Award categories fetch, notification unread count
- [x] **User workflows**: Authenticated user lands on homepage → views countdown → scrolls to awards → navigates via header → clicks Kudos CTA

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown timer updates, nav tab active state tracks scroll position |
| Service ↔ Service | Yes | Server Component → Supabase DB (awards fetch) |
| App ↔ External API | No | No external APIs beyond Supabase |
| App ↔ Data Layer | Yes | Award categories CRUD read, notification count read |
| Cross-platform | Yes | Responsive layout at 4 breakpoints, touch targets on mobile |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E
- **Test data strategy**: Seed data in migration for award categories. Event date via test env vars.
- **Isolation approach**: Fresh Supabase state per test suite via seed reset

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack; middleware already tested in login |
| Supabase DB (awards) | Real (local) | Seed data ensures deterministic results |
| IntersectionObserver | Mock (Vitest) | Not available in JSDOM; mock for unit tests, real in Playwright |
| Date/Time (countdown) | Mock (Vitest) | Use `vi.useFakeTimers()` for deterministic countdown testing |
| Notification API | Mock | Notification backend may not exist yet; mock unread count response |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Authenticated user navigates to `/` → hero section with "ROOT FURTHER" and countdown renders
   - [ ] Countdown timer displays correct days/hours/minutes relative to event date
   - [ ] Countdown updates after 1 minute without page refresh
   - [ ] Awards section displays 6 cards in correct grid layout
   - [ ] Clicking "ABOUT AWARDS" CTA smooth-scrolls to awards section
   - [ ] Clicking "ABOUT KUDOS" CTA smooth-scrolls to kudos section
   - [ ] Nav tab active state changes when scrolling between sections
   - [ ] "Chi tiết" button in Kudos section navigates to Kudos detail page

2. **Error Handling**
   - [ ] Awards data fetch fails → error boundary displays retry UI
   - [ ] Notification API fails → red dot hidden, page loads normally
   - [ ] Event date not configured → countdown shows 00:00:00

3. **Edge Cases**
   - [ ] Event date has passed → countdown shows 00:00:00 or "The event has started!"
   - [ ] No awards in database → "Coming soon" placeholder displayed
   - [ ] Rapid scrolling → nav active state correctly tracks visible section
   - [ ] Unauthenticated user visits `/` → redirected to `/login` (middleware)

### Tooling & Framework

- **Test framework**: Vitest (unit/integration for countdown logic, nav state), Playwright (E2E for full page flow)
- **Supporting tools**: Supabase local, Playwright browser automation, axe-core for accessibility
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Countdown timer logic | 95%+ | High |
| Nav tabs + IntersectionObserver | 85%+ | High |
| Awards data fetching & rendering | 85%+ | High |
| Responsive layout | Visual regression (Playwright snapshots) | Medium |
| Accessibility (WCAG AA) | axe-core zero violations | Medium |
| i18n translations | 80%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed
- [ ] Custom fonts sourced (Digital Numbers, SVN-Gotham)
- [ ] Award card images exported from Figma
- [ ] Database migration for `award_categories` reviewed
- [ ] Event date/venue confirmed for environment variables

### External Dependencies

- Supabase local running (`make up`)
- Figma media assets downloaded to `public/images/homepage/`
- Custom font files obtained and placed in `public/fonts/`
- Login feature fully implemented (Header, Footer, LanguageSelector, middleware, i18n infrastructure)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities (Phase 0 + Phase 1 can partially overlap)
3. **Begin** implementation following task order

---

## Notes

- **Header extension strategy**: The existing `Header` component accepts `children` for the right side. For the homepage, a `HomeHeader` wrapper in `src/components/homepage/home-header.tsx` composes `<Header>` with nav tabs in the center and bell + language + avatar on the right. The only change to the shared `Header` is adding an optional `className` prop for background color override. This avoids breaking the login page (Principle VII).
- **Route group `(home)`**: Using a route group allows the homepage to have its own `loading.tsx` and `error.tsx` without affecting the root route segment. The `page.tsx` at `src/app/(home)/page.tsx` maps to `/`.
- **No new npm packages needed.** Custom fonts use `next/font/local` (built-in). IntersectionObserver and setInterval are Web APIs.
- **Shared key visual background**: The hero background appears identical to the login screen's key visual. Verify with design — if identical, symlink or reference the same image path (`/images/login/keyvisual-bg.png`). If different, export separately.
- **Header background color (RESOLVED)**: Use `rgba(11, 15, 18, 0.80)` as the canonical header background color. Login is already implemented with this value. The Homepage header should reuse the same shared Header component with the same background — no override needed. The Figma spec's `rgba(16, 20, 23, 0.80)` is treated as a minor design variance; Login's implemented value takes precedence for consistency.
- **Award data source**: For MVP, seed data in the database is sufficient. Admin CRUD for awards is out of scope. If the `award_categories` table is premature, a static array in the Server Component satisfies Principle VII (simplicity) — migrate to DB later.
- **Countdown granularity**: The spec requires minute-level updates (TR-002). The interval is 60 seconds, not 1 second, to minimize re-renders. Initial value is computed immediately on mount to avoid the first-minute blank.
- **Font loading for Montserrat weights**: The root layout already loads Montserrat with weights 400 and 700. The homepage needs weight 500 for "Chi tiet" links. This is addressed in Phase 2, Step 2 (update layout.tsx).

### Spec Review Changes (2026-03-10)

The following changes were applied after the spec review (`/momorph.reviewspecify`) and this plan has been updated accordingly:

1. **Cover gradient overlay angle**: Updated from `12deg` to exact `12.34deg`. Gradient: `linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%)`. Purpose: reduces keyvisual background brightness for text readability. Implement as inline `style` (Tailwind cannot express `12.34deg`).

2. **C_Content "Root Further" section — MAJOR rewrite**:
   - **Before**: Simple text paragraph, Montserrat 16px/700, padding 96px 144px
   - **After**: Contains "ROOT FURTHER" title as **two image assets** (189×67 + 290×67px), followed by **multi-paragraph content** at Montserrat **24px/700** with a centered quote block. Padding **120px 104px**. Gap **32px**.
   - **Impact**: Phase 0 needs 2 new image assets. `content-section.tsx` implementation is significantly more complex (images + multi-paragraph + centered quote).
