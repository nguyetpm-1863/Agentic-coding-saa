# Implementation Plan: Sun* Kudos Live Board

**Frame**: `2940:13431-Sun* Kudos - Live board`
**Date**: 2026-03-09
**Spec**: `specs/2940-13431-sun-kudos-live-board/spec.md`

---

## Summary

Build the Sun* Kudos Live Board — the main peer recognition screen for SAA 2025. The page is a long-scroll layout with six major sections: Hero Banner with recognition input, Highlight Kudos carousel, Spotlight Board visualization, All Kudos feed with stats sidebar, and shared Header/Footer. Users can browse kudos, send kudos (via Write Kudo modal trigger), like/unlike, copy permalink, filter highlights by hashtag/department, search Sunner profiles, view personal stats, and open Secret Boxes. The implementation uses Server Components for initial data fetching with Client Component islands for interactive elements (carousel, like, search, filters, stats, Secret Box). Data is served via Supabase DB with server actions for mutations and cursor-based pagination for the feed.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, next/font, next/image
**Database**: Supabase (PostgreSQL) — kudos, kudo_likes, users, secret_boxes, highlight_kudos, hashtags, departments tables
**Testing**: Playwright (E2E), Vitest (unit/integration)
**State Management**: Server-side sessions (Supabase Auth cookies), client state for feed pagination, carousel, likes (optimistic), search, filters, modals
**API Style**: Next.js Server Actions + Supabase client queries (no custom REST endpoints)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (Principle II: TypeScript strict, path aliases `@/*`, PascalCase components, camelCase functions, kebab-case files)
- [x] Uses approved libraries and patterns (Supabase Auth/DB, Tailwind, next/image, next/font — no new heavy deps)
- [x] Adheres to folder structure guidelines (App Router: `src/app/kudos/`, shared: `src/components/shared/`, feature: `src/components/kudos/`)
- [x] Meets security requirements (Principle IV: Supabase Auth only, server-side auth checks, RLS on all tables, server actions with CSRF, parameterized queries, input validation)
- [x] Follows testing standards (Principle III: TDD, acceptance scenarios defined per user story)
- [x] Server-first architecture (Principle I: Server Component page with client islands for interactivity, `loading.tsx` and `error.tsx`, server actions for mutations)
- [x] Mobile-first responsive (Principle V: 4 breakpoints, 44px touch targets, flexible layouts)
- [x] Edge-compatible (Principle VI: No Node.js APIs, Cloudflare Workers safe, lightweight graph visualization)
- [x] Simplicity (Principle VII: YAGNI — no WebSocket real-time for MVP, no premature abstractions, extract only when three or more usages)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | Spotlight Board uses pure CSS + SVG approach with server-precomputed node positions. No graph library needed. | (1) `d3-force` (~15KB) — over-engineered for MVP; force simulation is unnecessary when positions can be precomputed server-side. (2) Custom Canvas — harder to style consistently with the design system, no accessibility for nodes. (3) Full d3.js (~230KB) — far too heavy per Principle VI. A more advanced graph library can be added later if user feedback demands interactive force layout. |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based with shared components
  - `src/app/kudos/` — Kudos Live Board page (Server Component), loading, error
  - `src/components/kudos/` — Feature-specific components (KudoCard, HighlightCarousel, SpotlightBoard, StatsSidebar, etc.)
  - `src/components/shared/` — Reuse existing Header, Footer, LanguageSelector
- **Styling Strategy**: Tailwind CSS 4 utility classes with design tokens from `design-style.md`. Dark theme (#00101A) with gold accents (#FFEA9E). Montserrat font (already configured from login).
- **Data Fetching**: Server Component fetches initial feed page, highlight kudos, spotlight data, user stats, hashtags, and departments. Client Components handle pagination, filtering, search, and optimistic mutations.
- **State Strategy**:
  - Feed pagination: Client state (`cursor`) triggers server action to fetch next page, append to client-side list
  - Likes: Optimistic update in client state, server action reconciles. Use `Set<string>` for user's liked kudos
  - Carousel: Client-controlled page index, lazy-fetch pages on navigation
  - Search: Debounced client input (300ms), server action returns results
  - Filters: Client state for selected hashtag/department, triggers re-fetch of highlights
  - Modals: Client boolean state for Write Kudo dialog and Secret Box modal

### Backend Approach

- **API Design**: Server actions for all mutations (create kudo, toggle like, open secret box). Server-side data fetching via Supabase client for reads (feed, highlights, stats, search).
- **Data Access**: Supabase client with parameterized queries. RLS policies enforce authorization.
- **Validation**: Server-side validation in server actions for all user inputs (kudo message, recipient, like toggle, secret box open). Validate cursor parameters for pagination.
- **Pagination**: Cursor-based pagination for the kudos feed using `created_at` + `id` composite cursor. Return `pageSize + 1` items to determine `hasMore`.

### Integration Points

- **Existing Services**:
  - `@/libs/supabase/client.ts` — Browser client for real-time-like interactions (future)
  - `@/libs/supabase/server.ts` — Server client for data fetching and server actions
  - `@/libs/supabase/middleware.ts` — Middleware client for session refresh
  - `@/libs/i18n/translations.ts` — i18n translations (extend with `kudos.*` keys)
- **Shared Components**: `<Header />`, `<Footer />`, `<LanguageSelector />` from `src/components/shared/`
- **Write Kudo Modal**: Triggered from RecognitionInput — the modal itself is a separate spec/frame. This plan only handles the trigger (opening the modal). The modal component will be imported when available.
- **Secret Box Modal**: Triggered from StatsSidebar — the reveal modal is a separate interaction. This plan implements the trigger and basic open action.
- **API Contracts**: Supabase DB queries defined by table schemas. No external REST API contracts needed.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2940-13431-sun-kudos-live-board/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # Codebase research findings (next step)
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/
│   └── kudos/
│       ├── page.tsx                    # Live Board page (Server Component)
│       ├── loading.tsx                 # Full-page skeleton (constitution Principle I)
│       └── error.tsx                   # Error boundary with retry (constitution Principle I)
├── components/
│   └── kudos/
│       ├── hero-banner.tsx             # Hero section with background + title (Server Component)
│       ├── recognition-input.tsx       # Pill-shaped input trigger (Client Component)
│       ├── search-bar.tsx              # Sunner profile search (Client Component)
│       ├── highlight-kudos.tsx         # Highlight section container (Client Component — owns filter state)
│       ├── highlight-carousel.tsx      # Carousel with pagination (Client Component)
│       ├── filter-dropdown.tsx         # Reusable filter dropdown (Client Component)
│       ├── spotlight-board.tsx         # Spotlight section container (Server Component)
│       ├── spotlight-graph.tsx         # Graph visualization (Server Component, SVG)
│       ├── all-kudos.tsx              # All Kudos section container (Server Component)
│       ├── kudos-feed.tsx             # Paginated feed list (Client Component)
│       ├── kudo-card.tsx              # Individual kudo card (Server-compatible)
│       ├── kudo-card-header.tsx       # Card header: avatars, names, timestamp, badge
│       ├── kudo-card-body.tsx         # Card body: message, hashtags, image gallery
│       ├── kudo-card-actions.tsx      # Card actions: like, copy link (Client Component)
│       ├── kudo-badge.tsx             # Badge chip (e.g., "IDOL GIOI TRE")
│       ├── hashtag-chip.tsx           # Hashtag pill chip
│       ├── image-gallery.tsx          # Thumbnail gallery with lightbox (Client Component)
│       ├── like-button.tsx            # Heart toggle with optimistic update (Client Component)
│       ├── copy-link-button.tsx       # Copy permalink button (Client Component)
│       ├── stats-sidebar.tsx          # Personal stats + Secret Box (Client Component)
│       └── secret-box-button.tsx      # Secret Box open CTA (Client Component)
├── components/
│   └── shared/
│       └── toast.tsx                  # Toast notification component (Client Component) — used for like errors, copy link confirmation, Secret Box errors
├── libs/
│   └── kudos/
│       ├── actions.ts                 # Server actions: createKudo, toggleLike, openSecretBox, fetchMoreKudos, fetchHighlightKudos, searchUsers
│       ├── queries.ts                 # Server-side data fetching: getKudosFeed, getHighlights, getStats, etc.
│       └── types.ts                   # TypeScript types: Kudo, KudoLike, HighlightKudo, UserStats, etc.
└── types/
    (types may live in libs/kudos/types.ts per simplicity principle)

# Modified Files
src/
├── libs/
│   └── i18n/
│       └── translations.ts            # Add kudos.* translation keys
└── app/
    └── globals.css                    # Add kudos-specific design tokens (if not already covered)

# Database
supabase/
├── migrations/
│   └── YYYYMMDDHHMMSS_create_kudos_tables.sql  # Create kudos, kudo_likes, highlight_kudos, secret_boxes, hashtags, departments tables with RLS
└── seeds/
    └── dev/
        └── kudos-seed.sql             # Seed data for development

# Assets
public/
└── images/
    └── kudos/
        ├── hero-bg.webp               # Hero banner background (from Figma, optimized)
        └── kudos-logo.png             # KUDOS branding logo (from Figma)
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | No new dependencies required (pending Spotlight Board evaluation) |

> The Spotlight Board uses pure CSS + inline SVG with server-precomputed node positions. No graph library needed. This keeps the component as a Server Component with zero client JS overhead.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Database Schema

**Purpose**: Prepare all assets and database infrastructure before UI work begins.

1. **Download required UI assets from Figma** using MoMorph tools:
   - Hero banner background -> `public/images/kudos/hero-bg.webp`
   - KUDOS logo -> `public/images/kudos/kudos-logo.png`
   - Verify asset quality and kebab-case naming (constitution Principle II)

2. **Create database migration** `supabase/migrations/YYYYMMDDHHMMSS_create_kudos_tables.sql`:
   - `kudos` table: id (uuid, PK), sender_id (uuid, FK auth.users), receiver_id (uuid, FK auth.users), message (text, NOT NULL), badge (text, nullable), created_at, updated_at
   - `kudo_hashtags` junction table: kudo_id (uuid, FK kudos), hashtag_id (uuid, FK hashtags)
   - `kudo_images` table: id (uuid, PK), kudo_id (uuid, FK kudos), image_url (text), position (int), created_at
   - `kudo_likes` table: id (uuid, PK), kudo_id (uuid, FK kudos), user_id (uuid, FK auth.users), created_at — UNIQUE(kudo_id, user_id)
   - `hashtags` table: id (uuid, PK), name (text, UNIQUE), created_at
   - `departments` table: id (uuid, PK), name (text, UNIQUE), created_at
   - `highlight_kudos` table: id (uuid, PK), kudo_id (uuid, FK kudos), campaign (text), featured_at (timestamptz), created_at
   - `secret_boxes` table: id (uuid, PK), user_id (uuid, FK auth.users), is_opened (boolean, default false), reward (text, nullable), created_at
   - `user_profiles` table: id (uuid, PK, FK auth.users), name (text), avatar_url (text), department_id (uuid, FK departments)
     - **Sync strategy**: Create a Supabase database trigger function on `auth.users` INSERT that auto-creates a `user_profiles` row with default values. Profile updates (name, avatar) are handled by the profile management feature (separate spec). For seed data, manually insert matching user_profiles entries.
   - **RLS policies** on ALL tables (constitution Principle IV):
     - `kudos`: SELECT for all authenticated; INSERT for authenticated (sender_id = auth.uid())
     - `kudo_likes`: SELECT for all authenticated; INSERT/DELETE for authenticated (user_id = auth.uid())
     - `secret_boxes`: SELECT/UPDATE for authenticated (user_id = auth.uid())
     - All other tables: SELECT for all authenticated
   - Indexes: `kudos(created_at DESC, id DESC)` for cursor pagination, `kudo_likes(kudo_id, user_id)` for unique constraint + lookup, `kudo_likes(kudo_id)` for count aggregation
   - **Supabase Storage bucket**: Create `kudo-images` bucket for kudos image uploads. Set RLS: authenticated users can INSERT, all authenticated can SELECT. Max file size 5MB via Supabase dashboard or config.

3. **Create `src/components/shared/toast.tsx`** — Toast notification (Client Component)
   - `'use client'` — manages visibility state with auto-dismiss timer
   - Positioned fixed bottom-center, z-50
   - Supports success (green) and error (red) variants
   - Auto-dismiss after 3 seconds
   - Used by: LikeButton (error), CopyLinkButton (success), SecretBoxButton (error)
   - Simple implementation: local state + `useEffect` timer. No external library needed (Principle VII).

4. **Create seed data** `supabase/seeds/dev/kudos-seed.sql`:
   - Sample users (5-10), kudos (20-30), likes, hashtags (#Dedicated, #Inspiring, #TeamPlayer, #Innovative), departments, highlight kudos, secret boxes

5. **Define TypeScript types** `src/libs/kudos/types.ts`:
   - `Kudo`, `KudoWithDetails` (joined with sender, receiver, hashtags, images, like count, user's like status)
   - `HighlightKudo`, `UserStats`, `SecretBox`, `Hashtag`, `Department`, `UserProfile`
   - `KudosFeedResponse` (items, nextCursor, hasMore)
   - `HighlightsResponse` (items, currentPage, totalPages)

### Phase 1: Foundation (Route + Page Shell + Loading/Error)

**Purpose**: Establish the route, page shell, and App Router conventions.

1. **Create `src/app/kudos/page.tsx`** — Live Board page (Server Component)
   - Verify auth via `supabase.auth.getUser()` — redirect to `/login` if not authenticated (middleware handles this, but double-check)
   - Read locale from cookie for i18n
   - Fetch initial data in parallel using `Promise.all`:
     - First page of kudos feed (10 items)
     - Highlighted kudos (first page, 3-5 items)
     - Spotlight data (total count, graph nodes/edges)
     - User stats (sent, received, secret box counts)
     - Hashtags list (for filters)
     - Departments list (for filters)
   - Render page layout: Header, HeroBanner, HighlightKudos, SpotlightBoard, AllKudos, Footer
   - Pass fetched data as props to child components

2. **Create `src/app/kudos/loading.tsx`** — Loading skeleton
   - Dark background (#00101A) with skeleton blocks for each section
   - Hero: pulsing rectangle for title and input
   - Highlight: pulsing rectangles for carousel cards
   - Feed: 3-5 pulsing card skeletons
   - Use `animate-pulse` Tailwind utility

3. **Create `src/app/kudos/error.tsx`** — Error boundary
   - `'use client'` directive (required by Next.js)
   - Dark background (#00101A), centered error message
   - "Something went wrong" text + "Try again" button (#FFEA9E, 8px radius)
   - `reset` function prop to retry

4. **Add `kudos.*` i18n keys** to `src/libs/i18n/translations.ts`
   - All keys from spec i18n table (Vietnamese + English)

### Phase 2: User Story 1 — View All Kudos Feed (P1, MVP)

**Purpose**: Core feed rendering — the primary value of the Live Board.

1. **Create `src/libs/kudos/queries.ts`** — Server-side data fetching
   - `getKudosFeed(cursor?, pageSize = 10)`: Cursor-based paginated query joining kudos with sender, receiver, hashtags, images, like count, and current user's like status. Order by `created_at DESC, id DESC`.
   - `getKudoLikeStatus(kudoIds[], userId)`: Batch query for user's like status on multiple kudos.
   - `getHashtags()`: Fetch all hashtags for filter dropdowns. Called from Server Component in page.tsx.
   - `getDepartments()`: Fetch all departments for filter dropdowns. Called from Server Component in page.tsx.
   - Return `KudosFeedResponse` with `items`, `nextCursor`, `hasMore`.

2. **Create `src/libs/kudos/actions.ts`** — Server actions
   - `toggleLike(kudoId: string)`: Server action — verify auth, check existing like, INSERT or DELETE from `kudo_likes`. Return new like count + liked status.
   - `fetchMoreKudos(cursor: string)`: Server action — fetch next page using cursor. Return `KudosFeedResponse`.
   - `fetchHighlightKudos(page: number, hashtagId?: string, departmentId?: string)`: Server action — fetch filtered highlights for carousel. Called from HighlightCarousel Client Component when filters change or user navigates pages. Return `HighlightsResponse`.

3. **Create `src/components/kudos/all-kudos.tsx`** — Section container (Server Component)
   - Renders "ALL KUDOS" heading (#FFEA9E, Montserrat 32px/700)
   - Layout: flex row on desktop (feed + sidebar), single column on mobile
   - Responsive padding: 16px mobile, 48px tablet, 80px desktop, 144px wide

4. **Create `src/components/kudos/kudos-feed.tsx`** — Feed list (Client Component)
   - `'use client'` — manages pagination state
   - Receives initial kudos from server as prop
   - Renders list of `<KudoCard />` with 16px gap
   - "Load more" button or infinite scroll (intersection observer) at bottom
   - Calls `fetchMoreKudos` server action, appends results
   - Shows skeleton cards while loading more
   - Empty state: "Chua co kudos nao..." message with CTA

5. **Create Kudo Card components** (extracted sub-components per design-style.md notes):
   - **`kudo-card.tsx`**: Container — 12px radius, bg-white/5, border-white/8, 24px padding (16px mobile), flex-col gap-16px. Hover state: bg-white/8.
   - **`kudo-card-header.tsx`**: Sender avatar (40px, pill) + name (16px/700) -> arrow -> receiver avatar + name. Timestamp (14px/400, white/50). Badge if present.
   - **`kudo-card-body.tsx`**: Message text (16px/400, white, 24px line-height). Hashtag chips row. Image gallery if images exist.
   - **`kudo-card-actions.tsx`** (Client Component): Like button + count on left, Copy Link on right. Flex, justify-between.

6. **Create `src/components/kudos/like-button.tsx`** — Like toggle (Client Component)
   - `'use client'` — manages optimistic like state
   - Heart icon: outline (white/60) when not liked, filled (#FF4D4D) when liked
   - Click: optimistic toggle (instant UI update), call `toggleLike` server action in background
   - On server error: revert optimistic state, show brief error toast
   - Scale animation on click: 1.0 -> 1.3 -> 1.0, 200ms ease-out
   - Count formatted with `Intl.NumberFormat` for locale-aware thousands separator
   - `aria-pressed` for toggle state, `aria-label` for accessibility

7. **Create `src/components/kudos/copy-link-button.tsx`** — Copy link (Client Component)
   - `'use client'` — uses `navigator.clipboard.writeText()`
   - Copies `${origin}/kudos?kudo=${kudoId}` permalink
   - Text changes to "Da sao chep!" for 2 seconds, color #FFEA9E
   - Hover: color transitions to white (150ms)

8. **Create `src/components/kudos/kudo-badge.tsx`** — Badge chip
   - 4px radius, bg-gold/15, 12px/700 uppercase, #FFEA9E text
   - Simple presentational component

9. **Create `src/components/kudos/hashtag-chip.tsx`** — Hashtag chip
   - Pill shape, bg-gold/10, border-gold/30, 14px/500, #FFEA9E text
   - Padding: 6px 12px

10. **Create `src/components/kudos/image-gallery.tsx`** — Image thumbnails (Client Component)
    - `'use client'` — manages lightbox state
    - Thumbnails: 80x80px (60x60 mobile), 8px radius, object-cover, `next/image` with lazy loading
    - Click thumbnail: open lightbox/modal with full image
    - Lightbox: `Escape` to close, dark overlay
    - Cursor pointer on thumbnails

### Phase 3: User Story 2 — Send a Kudo (P2)

**Purpose**: Primary write action — trigger the Write Kudo modal.

1. **Create `src/components/kudos/hero-banner.tsx`** — Hero section (Server Component)
   - Full-width, min-height 400px, decorative background with gradient overlay
   - `next/image` for hero-bg.webp with `priority` (above the fold, LCP)
   - Title: "He thong ghi nhan loi cam on" (Montserrat 40px/700, white, centered)
   - KUDOS logo image
   - Input row: flex, justify-between on desktop; flex-col on mobile
   - Responsive padding: 32px 16px mobile, 48px 48px tablet, 48px 144px wide

2. **Create `src/components/kudos/recognition-input.tsx`** — Pill input trigger (Client Component)
   - `'use client'` — manages modal open state
   - Pill shape (border-radius 9999px), max-width 600px, height 56px
   - Pen icon (20px, white/60) + placeholder text (16px/400, white/60)
   - Background: white/8, border: white/20
   - Hover: bg white/12, border white/30 (150ms transition)
   - Focus: outline 2px solid #FFEA9E, offset 2px
   - Click: opens Write Kudo dialog (set `isWriteDialogOpen = true`)
   - The Write Kudo dialog component is imported from its own spec/module when available. For now, render a placeholder modal or pass the open state up via callback.

3. **Add `createKudo` server action** to `src/libs/kudos/actions.ts`:
   - Validate: recipient (required, valid user ID), message (required, non-empty, max 1000 chars), hashtags (array of valid IDs), images (FormData with files, max 5 files, max 5MB each)
   - Server-side auth check: `supabase.auth.getUser()`
   - **Image upload flow**: Accept images as FormData, upload each to Supabase Storage bucket `kudo-images` via `supabase.storage.from('kudo-images').upload(...)`, get public URLs, then insert URLs into `kudo_images` table
   - Insert into `kudos` table, `kudo_hashtags` junction, `kudo_images`
   - Return created kudo
   - **Security**: Parameterized queries, input sanitization, auth verification, file type validation (only JPEG/PNG/WebP), file size validation

### Phase 4: User Story 3 — Highlight Kudos Carousel (P3)

**Purpose**: Featured kudos carousel with filtering.

1. **Add `getHighlightKudos` to `src/libs/kudos/queries.ts`**:
   - Paginated query (page-based, not cursor) for highlight_kudos joined with kudos details
   - Filter by hashtag and/or department
   - Return `HighlightsResponse` with items, currentPage, totalPages

2. **Create `src/components/kudos/highlight-kudos.tsx`** — Section wrapper (Client Component)
   - `'use client'` — **Must be a Client Component** because it owns filter state (selectedHashtag, selectedDepartment) shared between FilterDropdown and HighlightCarousel children
   - Receives initial highlights data, hashtags list, and departments list as props from the page Server Component
   - "HIGHLIGHT KUDOS" heading (#FFEA9E, Montserrat 32px/700)
   - "Sun* Annual Awards 2025" label (14px/500, white/60)
   - Renders FilterDropdown components and HighlightCarousel, passing filter state down
   - On filter change: calls `fetchHighlightKudos` server action with new filters, updates carousel data
   - Responsive padding: 32px 16px mobile, 48px tablet, 64px 144px wide

3. **Create `src/components/kudos/highlight-carousel.tsx`** — Carousel (Client Component)
   - `'use client'` — manages carousel page state (filter state is owned by parent highlight-kudos.tsx)
   - Displays 1 card (mobile), 2 cards (tablet), 3 cards (desktop/wide)
   - Left/right arrow buttons: 40px circle, bg-white/10, hover bg-white/20
   - Disabled state: opacity 0.3, cursor not-allowed
   - Pagination text: "2/5" (Montserrat 16px/500, white/60, centered)
   - Slide transition: 300ms ease-in-out transform
   - Lazy-load pages: only fetch next page data when navigating (TR-007)
   - Keyboard navigation: ArrowLeft/ArrowRight to navigate, Enter to interact

4. **Create `src/components/kudos/filter-dropdown.tsx`** — Filter dropdown (Client Component)
   - `'use client'` — manages open/selected state
   - Reusable for both Hashtag and Department filters
   - Height 40px, 8px radius, border white/15, transparent bg
   - Dropdown: appears below with shadow (0 4px 12px rgba(0,0,0,0.30))
   - Keyboard accessible: Enter/Space to open, arrow keys to navigate, Enter to select, Escape to close
   - ARIA: `role="listbox"`, `aria-expanded`, `aria-label`
   - On selection: trigger carousel content re-fetch with filter

### Phase 5: User Story 4 — Spotlight Board Visualization (P4)

**Purpose**: Visual graph showing kudos connections.

1. **Add `getSpotlightData` to `src/libs/kudos/queries.ts`**:
   - Total kudos count
   - Graph data: nodes (users with kudos count for sizing) and edges (sender->receiver pairs with weight)
   - For MVP: limit to top 50 most-connected users to keep rendering performant
   - Pre-compute node `(x, y)` positions server-side using a circular/grid layout algorithm (no force simulation). Return positions alongside node/edge data for direct SVG rendering

2. **Create `src/components/kudos/spotlight-board.tsx`** — Section container (Server Component)
   - "SPOTLIGHT BOARD" heading (#FFEA9E, Montserrat 32px/700)
   - Count display: "{count} KUDOS" (Montserrat 48px/700, #FFEA9E, centered) — 32px on mobile
   - Radial gradient background glow
   - Responsive padding: 32px 16px mobile, 48px tablet, 64px 144px wide

3. **Create `src/components/kudos/spotlight-graph.tsx`** — Graph visualization (Server Component, pure CSS + SVG)
   - **Approach**: Pure CSS + SVG with server-precomputed node positions. No client-side JS graph library needed. This keeps the component as a Server Component (zero client JS) and follows Principle VII (simplicity).
   - Server precomputes node `(x, y)` positions using a simple circular/grid layout algorithm in `getSpotlightData()`. No force simulation needed for MVP.
   - Render as inline `<svg>` element:
     - Nodes: `<circle>` elements with fill #FFEA9E, radius 4-12px based on kudos count
     - Edges: `<line>` elements with stroke rgba(255,234,158,0.3), stroke-width 1px
     - Node labels (optional): `<text>` with user initials on hover via CSS `:hover` pseudo-class
   - Min-height 300px, responsive via `viewBox` and `preserveAspectRatio="xMidYMid meet"`
   - Node sizes vary by kudos count (4px minimum radius, 12px maximum radius)
   - Graceful fallback: if data unavailable, show "Data loading" placeholder
   - **Future enhancement**: If interactive force-directed layout is needed based on user feedback, a lightweight graph library can be introduced in a later iteration

### Phase 6: User Story 5 — User Stats & Secret Box (P5)

**Purpose**: Personal stats and gamification.

1. **Add `getUserStats` to `src/libs/kudos/queries.ts`**:
   - Kudos received count, kudos sent count, total kudos received
   - Secret boxes opened count, secret boxes unopened count
   - Auth-gated: only returns stats for the authenticated user

2. **Add `openSecretBox` server action** to `src/libs/kudos/actions.ts`:
   - Verify auth, verify user has unopened boxes
   - Update `secret_boxes` SET `is_opened = true` WHERE user_id = auth.uid() AND is_opened = false LIMIT 1
   - Return the opened box with reward info

3. **Create `src/components/kudos/stats-sidebar.tsx`** — Stats sidebar (Client Component)
   - `'use client'` — manages Secret Box modal state, updates stats after actions
   - Width: 300px (wide), 280px (desktop), full-width (mobile/tablet)
   - Sticky on desktop: `position: sticky; top: 100px`
   - Non-sticky on mobile/tablet: static block above or below feed
   - Background: white/5, border: white/8, 16px radius, 24px padding
   - Stat rows: label (14px/400, white/60) + value (32px/700, #FFEA9E)
   - Divider: 1px solid #2E3940 between kudos stats and secret box stats

4. **Create `src/components/kudos/secret-box-button.tsx`** — Secret Box CTA (Client Component)
   - `'use client'` — triggers openSecretBox action
   - Full-width, 48px height, 8px radius
   - Background: #FFEA9E, text: #00101A, Montserrat 16px/700
   - Hover: #FFE580, Active: #FFD84D
   - Disabled: opacity 0.4, cursor not-allowed (when no unopened boxes)
   - Focus: outline 2px solid #FFEA9E, offset 2px
   - Click: call `openSecretBox` server action, show reveal animation/modal
   - Secret Box reveal modal: placeholder for now (separate spec for detailed design)

### Phase 7: User Story 6 — Filter and Search (P6)

**Purpose**: Discoverability via search and filtering.

1. **Add `searchUsers` server action to `src/libs/kudos/actions.ts`**:
   - **Must be a server action** (not a query function) because it is called from the SearchBar Client Component. Client Components cannot import server-only functions directly.
   - Search `user_profiles` by name (ILIKE `%query%`) with parameterized query
   - Server-side input validation: minimum 2 characters, max 100 characters, sanitize input
   - Auth check: verify `supabase.auth.getUser()` before querying
   - Return top 10 matches with id, name, avatar_url, department

2. **Create `src/components/kudos/search-bar.tsx`** — Search input (Client Component)
   - `'use client'` — manages query, results, and debounce
   - Pill shape (9999px), max-width 300px (full-width on mobile), height 44px
   - Background: white/8, border: white/15
   - Focus: border #FFEA9E, box-shadow 0 0 0 2px gold/20
   - Placeholder: "Tim kiem profile Sunner" (14px/400, white/50)
   - Debounce: 300ms (TR-008)
   - Results dropdown: appears below, shadow (0 4px 12px rgba(0,0,0,0.30))
   - Each result: avatar (32px) + name + department
   - Select result: navigate to user profile page (or filter feed — TBD based on profile page availability)
   - No results: "Khong tim thay ket qua"
   - ARIA: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`

### Phase 8: User Story 7 — Responsive Layout (P7)

**Purpose**: Ensure all sections display correctly at all breakpoints.

1. **Apply responsive styles** across all components per design-style.md responsive specifications:

   | Breakpoint | Padding (section) | Carousel cards | Stats sidebar | Feed layout |
   |------------|-------------------|----------------|---------------|-------------|
   | Mobile (<768px) | 32px 16px | 1 card, swipe | Full-width, above/below feed | Single column |
   | Tablet (768-1023px) | 48px 48px | 2 cards | Full-width, collapsible | Single column |
   | Desktop (1024-1279px) | 64px 80px | 3 cards | 280px, sticky, beside feed | Two columns |
   | Wide (>=1280px) | 64px 144px | 3 cards | 300px, sticky, beside feed | Two columns |

2. **Hero banner responsive**:
   - Title: 24px mobile, 32px tablet, 40px desktop/wide
   - Input row: flex-col (stacked) on mobile, flex-row on tablet+
   - Recognition input: full-width on mobile, max-width 600px on tablet+
   - Search bar: full-width on mobile, max-width 300px on tablet+

3. **Touch targets**: Verify all interactive elements >= 44x44px on mobile (like button, carousel arrows, filter dropdowns, search bar, Secret Box button)

4. **Container**: max-width 1512px, mx-auto on wide screens

5. **Test at 4 widths**: 320px, 768px, 1024px, 1440px

### Phase 9: Polish & Edge Cases

**Purpose**: Accessibility, performance, and edge case handling.

1. **Accessibility audit**:
   - Carousel: keyboard-navigable with ArrowLeft/ArrowRight, Enter to interact
   - Like button: `aria-pressed` toggle state
   - Feed: `aria-live="polite"` for new items loaded
   - Filter dropdowns: keyboard-accessible (Enter, arrows, Escape)
   - Image gallery lightbox: `Escape` to close, focus trap
   - Color contrast: 4.5:1 ratio minimum (gold #FFEA9E on dark #00101A = ~13:1, passes)
   - Focus indicators: 2px solid #FFEA9E, offset 2px on all interactive elements
   - Run axe-core automated check — target WCAG AA

2. **Performance optimization**:
   - Hero background: `next/image` with `priority`, WebP, responsive `sizes`
   - Feed images: `next/image` with lazy loading (below fold)
   - Carousel: lazy-load pages on navigation (TR-007)
   - Spotlight graph: Inline SVG with server-precomputed positions (zero client JS for graph)
   - Feed skeleton: show 3-5 skeleton cards during load more
   - Bundle: verify no heavy dependencies, tree-shake unused code

3. **Edge cases** (from spec):
   - Empty feed: "Chua co kudos nao..." message with CTA to Write Kudo dialog
   - Slow network: skeleton loading states for cards, carousel, stats
   - Like API failure: revert optimistic UI, show error toast "Could not update like. Try again."
   - Image load failure: placeholder with broken-image indicator
   - No Secret Boxes: "0" counts, disabled button
   - Spotlight data unavailable: "Data loading" placeholder or hide section
   - Filter/search no results: "Khong tim thay ket qua"
   - Write Kudo submission failure: keep dialog open, inline error, allow retry

4. **Animations** per design-style.md:
   - Carousel slide: 300ms ease-in-out
   - Like heart pop: scale 1.0 -> 1.3 -> 1.0, 200ms ease-out
   - Button hover/active: 150ms transitions
   - Skeleton: animate-pulse (1500ms)
   - Filter dropdown: opacity + translateY, 150ms ease-out

---

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Spotlight Board graph performance with many nodes | Low | Med | Limit to top 50 users for MVP. Use inline SVG with server-precomputed positions (no client-side computation). SVG with 50 nodes + edges is well within browser rendering limits. |
| Cursor-based pagination complexity | Low | Med | Well-established pattern. Use `(created_at, id)` composite cursor to avoid issues with identical timestamps. |
| Write Kudo modal integration (separate spec) | Med | Med | Interface contract agreed: `WriteKudoModalProps { isOpen, onClose, onSuccess }` (see Notes). Use placeholder until modal component from spec `520-11602-viet-kudo` is implemented. |
| Optimistic like state desync | Low | Med | Reconcile on server action response. If mismatch, re-fetch card data. Show brief error toast on failure. |
| Supabase RLS policy complexity | Low | High | Test RLS policies thoroughly with different user roles in seed data. Write integration tests for auth-gated queries. |
| Large image uploads in kudos | Med | Med | Validate file size (max 5MB per image, max 5 images) in server action. Use Supabase Storage for uploads. Serve optimized thumbnails via `next/image`. |
| Secret Box reveal animation complexity | Low | Low | Start with simple modal. Enhance animation in polish phase. Separate spec for detailed Secret Box reveal. |
| Real-time feed updates (out of scope) | N/A | Low | MVP uses pagination + manual refresh. Near-real-time via polling can be added later. Document as known limitation. |

### Estimated Complexity

- **Frontend**: High — 20+ components, complex card composition, carousel, graph visualization, multiple interactive states, responsive at 4 breakpoints
- **Backend**: Medium — 6-8 database tables with RLS, cursor-based pagination, 3+ server actions, search with debounce
- **Testing**: High — Many interaction flows (like toggle, carousel navigation, search, pagination), optimistic updates, responsive viewports, accessibility

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: KudosFeed pagination -> server action -> DB, LikeButton -> toggleLike -> optimistic update, Carousel -> filter -> re-fetch, SearchBar -> debounce -> searchUsers
- [x] **External dependencies**: Supabase Auth (session), Supabase DB (queries + mutations), Supabase Storage (images)
- [x] **Data layer**: Kudos CRUD, likes toggle, secret box open, cursor pagination, search queries
- [x] **User workflows**: Full feed browsing, like/unlike flow, send kudo flow, carousel navigation + filtering, search + select, secret box open

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Feed pagination, like toggle optimistic update, carousel navigation, search debounce, filter selection |
| Service <-> Service | Yes | Server actions -> Supabase DB, auth middleware -> protected route |
| App <-> External API | Yes | Supabase Auth session, Supabase Storage image upload |
| App <-> Data Layer | Yes | Cursor-based feed queries, like insert/delete, kudo creation, search ILIKE, stats aggregation |
| Cross-platform | Yes | Responsive layout at 4 breakpoints, touch interactions on mobile |

### Test Environment

- **Environment type**: Local (Supabase local via `make up`) + Playwright for E2E, Vitest for unit/integration
- **Test data strategy**: Supabase seed data (`supabase/seeds/dev/kudos-seed.sql`) with predictable users, kudos, likes, hashtags
- **Isolation approach**: Transaction rollback per test or fresh seed per test suite

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Real (local) | Local Supabase provides full auth stack |
| Supabase DB | Real (local) | Test actual queries, RLS policies, and pagination |
| Supabase Storage | Mock | Image upload can be mocked to avoid file I/O in tests |
| Clipboard API | Mock | `navigator.clipboard.writeText` needs mocking in tests |
| Intersection Observer | Mock | For infinite scroll testing in Vitest |
| SVG rendering | Real | Spotlight graph is inline SVG rendered server-side — no mocking needed |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Authenticated user loads `/kudos` -> sees hero, highlight, spotlight, feed, stats
   - [ ] Feed displays kudos cards with sender, receiver, message, hashtags, images, like count
   - [ ] User scrolls to bottom -> "Load more" fetches next page, appends to feed
   - [ ] User clicks like -> heart fills red, count increments (optimistic)
   - [ ] User clicks unlike -> heart unfills, count decrements (optimistic)
   - [ ] User clicks "Copy Link" -> permalink copied, confirmation text shown
   - [ ] User clicks recognition input -> Write Kudo dialog opens
   - [ ] Carousel displays highlighted kudos with pagination "1/N"
   - [ ] User clicks carousel right arrow -> advances to next page
   - [ ] User selects hashtag filter -> carousel re-filters
   - [ ] Stats sidebar shows correct counts for authenticated user
   - [ ] User clicks "Mo Secret Box" -> secret box opens, counts update

2. **Error Handling**
   - [ ] Like server action fails -> optimistic update reverted, error toast shown
   - [ ] Feed fetch fails -> error boundary displayed with retry
   - [ ] Search returns error -> search dropdown shows error state
   - [ ] Secret box open fails -> error toast, modal stays closed
   - [ ] Image fails to load -> placeholder shown

3. **Edge Cases**
   - [ ] Empty feed -> "No kudos yet" message displayed
   - [ ] Feed with exactly `pageSize` items -> "Load more" shows, next fetch returns empty
   - [ ] User has no Secret Boxes -> button disabled
   - [ ] Search with < 2 characters -> no request sent
   - [ ] Filter + no matching highlights -> "No results" in carousel area
   - [ ] Unauthenticated user visits `/kudos` -> redirected to `/login`
   - [ ] Like count formatted with locale-aware thousands separator

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: Supabase local, Playwright browser automation, axe-core for accessibility
- **CI integration**: Run on every PR via GitHub Actions

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Kudos feed (pagination, rendering) | 90%+ | High |
| Like/unlike flow (optimistic + server) | 90%+ | High |
| Server actions (createKudo, toggleLike, openSecretBox) | 90%+ | High |
| Carousel navigation + filtering | 85%+ | Medium |
| Search bar (debounce, results, navigation) | 85%+ | Medium |
| Stats sidebar + Secret Box | 80%+ | Medium |
| Spotlight Board graph rendering | 70%+ | Low |
| Responsive layout | Visual regression | Medium |
| Accessibility (keyboard, ARIA) | axe-core zero violations | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [ ] `research.md` completed (next step)
- [ ] Database schema finalized (Phase 0)
- [ ] Figma media assets downloaded (Phase 0)
- [ ] Write Kudo dialog spec available (can stub with placeholder)

### External Dependencies

- Supabase local running (`make up`) with kudos tables migrated and seeded
- Figma media assets exported for hero background and KUDOS logo
- Write Kudo dialog component (separate spec — stub interface until available)
- Secret Box reveal animation/modal (separate spec — basic modal for MVP)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 first)

---

## Notes

- **No new npm packages needed.** All required dependencies (Supabase, Tailwind, Next.js, React) are already installed. The Spotlight Board uses pure CSS + inline SVG with server-precomputed positions — no graph library required.
- **Fonts are already configured.** Montserrat was set up during the login implementation and is available globally.
- **Shared components reuse.** Header, Footer, and LanguageSelector from `src/components/shared/` are reused directly. The Header may need minor updates to support the "Sun* Kudos" nav tab active state with gold text glow.
- **Write Kudo modal interface contract.** The recognition input triggers the modal, but the modal's internal design is a separate spec (`520-11602-viet-kudo`). The agreed interface contract is:
  ```typescript
  interface WriteKudoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // triggers feed refresh (e.g., router.refresh() or revalidatePath)
  }
  ```
  Stub with a placeholder until the modal component is implemented. The `onSuccess` callback is intentionally simple (no kudo payload) — the Live Board refreshes its feed via server revalidation rather than client-side list prepend.
- **Real-time updates are out of scope.** The feed uses manual pagination (load more). Near-real-time updates via polling or Supabase Realtime can be added in a future iteration.
- **Number formatting.** Like counts (e.g., "1,000") and stats numbers must use `Intl.NumberFormat` for locale-aware formatting. This is safe on Cloudflare Workers (Web API).
- **Content area width.** The Figma design uses 1512px total with 144px padding on each side = 1224px content area. Apply `max-w-[1512px] mx-auto` on the page container for wide screens.
- **Kudo card complexity.** The KudoCard is the most complex component with 7+ sub-elements. Extracting into KudoCardHeader, KudoCardBody, and KudoCardActions follows the spec recommendation and keeps each component focused (constitution Principle VII).
- **Carousel pagination.** The "2/5" format means discrete page navigation, not continuous scroll. The server must return `totalPages` alongside items. Each page shows 1-3 cards depending on breakpoint.
- **Dark theme consistency.** All SAA 2025 screens use #00101A background with #FFEA9E gold accents. This is consistent with the login screen already implemented.
