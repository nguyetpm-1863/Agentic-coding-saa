# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Sun* Kudos Live Board is the main Kudos experience screen where authenticated users can view, send, and interact with peer recognition messages ("kudos"). The page is a long-scroll layout with distinct sections: Hero Banner (KV Kudos branding), Recognition Input, Highlight Kudos carousel, Spotlight Board visualization, All Kudos feed, and Footer.

Key capabilities include sending kudos (via a modal triggered from the pill-shaped input), browsing a real-time feed of all kudos, viewing highlighted/featured kudos in a carousel, exploring a visual spotlight board showing kudos connections, tracking personal stats (kudos sent/received), and a gamification element (Secret Box). The page uses a dark theme (#00101A) with gold accents (#FFEA9E).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View All Kudos Feed (Priority: P1)

As an authenticated user, I want to browse all kudos in a feed so that I can see peer recognition messages across the organization.

**Why this priority**: The kudos feed is the core content of the Live Board — it delivers the primary value of peer recognition visibility. It is the MVP.

**Independent Test**: Navigate to `/kudos` after login, verify the All Kudos section renders with kudos cards displaying sender/receiver info, timestamps, messages, hashtags, and interaction controls.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and navigates to `/kudos`, **When** the page loads, **Then** the All Kudos section displays a list of kudos cards on warm cream (#FFF8E1) backgrounds, each showing: sender avatar + name + department code + hero badge, play/triangle arrow, receiver avatar + name + department code + hero badge, timestamp, kudo title (e.g., "IDOL GIỚI TRẺ") with pen icon, message text in a highlighted cream block, image gallery thumbnails, gold-colored hashtag text, and like count with "Copy Link" action.

2. **Given** a kudos card has attached images, **When** the card renders, **Then** an image gallery is displayed below the message text, showing thumbnails that can be expanded.

3. **Given** a kudos card has a kudo title (e.g., "IDOL GIỚI TRẺ"), **When** the card renders, **Then** the title is displayed centered below the timestamp in bold uppercase dark text, with a small pen/edit icon to the right. Each sender and receiver also shows a colored hero badge (e.g., "New Hero" green, "Rising Hero" blue, "Super Hero" red, "Legend Hero" gold) below their department code.

4. **Given** more kudos exist than can be displayed at once, **When** the user scrolls to the bottom of the feed, **Then** additional kudos are loaded via pagination or infinite scroll.

5. **Given** a kudos card is displayed, **When** the user views the interaction area, **Then** they see a heart/like button with count (e.g., "1,000") and a "Copy Link" action.

6. **Given** the user clicks the heart/like button on a kudos card, **When** the click is registered, **Then** the like count increments by 1 and the heart icon fills/changes to indicate the user has liked it. Clicking again removes the like.

7. **Given** the user clicks "Copy Link" on a kudos card, **When** the click occurs, **Then** a shareable link to that specific kudos is copied to the clipboard and a toast/notification confirms the copy.

---

### User Story 2 - Send a Kudo (Priority: P2)

As an authenticated user, I want to send a kudos message to a colleague so that I can publicly recognize their contributions.

**Why this priority**: Sending kudos is the primary write action and the reason the platform exists. Without it, the feed would be empty.

**Independent Test**: Click the recognition input pill, verify the Write Kudo dialog opens with fields for recipient, message, hashtags, and optional image upload. Submit and verify the kudo appears in the feed.

**Acceptance Scenarios**:

1. **Given** the user is on the Live Board, **When** they view the hero section, **Then** they see a pill-shaped input with placeholder text "Hom nay, ban muon gui loi cam on va ghi nhan den ai?" and a pen icon on the left.

2. **Given** the user clicks the recognition input pill, **When** the click occurs, **Then** a Write Kudo dialog/modal opens.

3. **Given** the Write Kudo dialog is open, **When** the user fills in the recipient, message text, selects hashtags, and optionally attaches images, **Then** the "Send" button becomes enabled.

4. **Given** the user submits a valid kudo, **When** the submission succeeds, **Then** the dialog closes, a success notification is shown, and the new kudo appears at the top of the All Kudos feed.

5. **Given** the user submits a kudo without a required field (recipient or message), **When** the validation runs, **Then** inline error messages are shown for the missing fields and the submission is blocked.

---

### User Story 3 - Highlight Kudos Carousel (Priority: P3)

As an authenticated user, I want to view highlighted/featured kudos so that I can see the most notable recognition messages.

**Why this priority**: The highlight section promotes high-quality kudos and the "Sun* Annual Awards 2025" branding, adding editorial value to the feed.

**Independent Test**: Verify the Highlight Kudos section displays a carousel with featured kudos cards, pagination controls (< 2/5 >), and filter dropdowns.

**Acceptance Scenarios**:

1. **Given** the user views the Highlight Kudos section, **When** the section loads, **Then** they see a "HIGHLIGHT KUDOS" heading with a "Sun* Annual Awards 2025" label and featured kudos cards.

2. **Given** the carousel is displayed, **When** the user views the pagination, **Then** they see the current position (e.g., "2/5") and left/right navigation arrows.

3. **Given** the user clicks the right arrow on the carousel, **When** the click occurs, **Then** the carousel advances to the next set of featured kudos cards with a smooth transition.

4. **Given** the user clicks the left arrow on the first page, **When** the click occurs, **Then** the carousel wraps to the last page or the left arrow is disabled.

5. **Given** the Highlight section has filter dropdowns, **When** the user selects a "Hashtag" filter, **Then** the carousel content filters to show only highlighted kudos matching that hashtag.

6. **Given** the user selects a "Phong ban" (Department) filter, **When** the filter is applied, **Then** the carousel content filters to show only highlighted kudos from that department.

---

### User Story 4 - Spotlight Board Visualization (Priority: P4)

As an authenticated user, I want to see a visual board showing kudos connections so that I can understand recognition patterns across the organization.

**Why this priority**: The spotlight board provides a unique data visualization that differentiates the Kudos platform, but it is supplementary to the core feed.

**Independent Test**: Verify the Spotlight Board section displays a total kudos count (e.g., "388 KUDOS") and a graph visualization showing user connections.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the Spotlight Board section, **When** the section loads, **Then** they see a "SPOTLIGHT BOARD" heading, and a large rounded container (border-radius ~47px, border: 1px solid #998C5F) containing: a total kudos count "388 KUDOS" at the top center, a word cloud of user names scattered at varying sizes and opacities, a "Tìm kiếm" search input at the top-left, a real-time activity log at the bottom-left, and pan/zoom controls at the bottom-right.

2. **Given** the word cloud is displayed, **When** the user views it, **Then** they see user names scattered across the container at varying font sizes (12-28px) — users with more kudos appear larger and more prominent (e.g., "Nguyễn Hoàng Linh" is larger). Names are NOT connected by lines/edges — this is a word cloud, not a network graph.

3. **Given** the activity log is visible at the bottom-left, **When** new kudos are sent, **Then** real-time entries appear (e.g., "08:30PM Nguyễn Bá Chức đã nhận được một Kudos mới") and the total count updates.

4. **Given** the search input is displayed, **When** the user types a name, **Then** the word cloud highlights or focuses on matching names.

---

### User Story 5 - User Stats & Secret Box (Priority: P5)

As an authenticated user, I want to view my personal kudos statistics and interact with Secret Boxes so that I can track my recognition activity and enjoy gamification rewards.

**Why this priority**: Personal stats and gamification encourage engagement but are secondary to the core viewing and sending experience.

**Independent Test**: Verify the stats sidebar in the All Kudos section displays personal kudos counts and Secret Box status. Click "Mo Secret Box" and verify the interaction.

**Acceptance Scenarios**:

1. **Given** the user views the All Kudos section, **When** they look at the right sidebar, **Then** they see a dark card (#00070C bg, #998C5F border, rounded 17px) with: "Số Kudos bạn nhận được: 25", "Số Kudos bạn đã gửi: 25", "Số tim bạn nhận được🔥: 25" (with fire emoji).

2. **Given** the stats sidebar is displayed, **When** the user views the Secret Box area, **Then** they see: "Số Secret Box bạn đã mở: 25", "Số Secret Box chưa mở: 25", and a "Mở Secret Box 🎁" button (60px height, #FFEA9E bg, with gift icon).

3. **Given** the user has unopened Secret Boxes, **When** they click "Mo Secret Box", **Then** a Secret Box opening animation/modal is triggered and the box count updates.

4. **Given** the user has zero unopened Secret Boxes, **When** they view the Secret Box area, **Then** the "Mo Secret Box" button is disabled or hidden.

5. **Given** the stats sidebar is displayed, **When** the user views the "10 SUNNER NHẬN QUÀ MỚI NHẤT" section below the stats, **Then** they see a separate dark card (#00070C bg, #998C5F border) with a leaderboard of the 10 most recent Sunners who received gifts, each showing a user avatar with colored circle border, name in gold (#FFEA9E), and description (e.g., "Nhận được 1 áo phòng SAA").

6. **Given** the leaderboard displays user entries, **When** the user views each entry, **Then** they see a colored avatar circle, the user's name, and a description of the gift received.

---

### User Story 6 - Filter and Search Kudos (Priority: P6)

As an authenticated user, I want to filter and search kudos so that I can find specific recognition messages or people.

**Why this priority**: Filtering and search enhance discoverability but the feed is usable without them.

**Independent Test**: Use the search bar to search for a profile name. Use the Hashtag and Department filter dropdowns. Verify results update accordingly.

**Acceptance Scenarios**:

1. **Given** the user views the top of the page, **When** they see the search bar, **Then** it displays the placeholder "Tim kiem profile Sunner".

2. **Given** the user types a name in the search bar, **When** at least 2 characters are entered, **Then** search results/suggestions appear showing matching user profiles.

3. **Given** the user selects a profile from search results, **When** the selection occurs, **Then** the page navigates to that user's profile or filters the feed to show kudos involving that user.

4. **Given** the Highlight section has a "Hashtag" dropdown, **When** the user selects a hashtag (e.g., #Dedicated), **Then** the highlighted kudos filter to only those tagged with that hashtag.

5. **Given** the Highlight section has a "Phong ban" (Department) dropdown, **When** the user selects a department, **Then** the highlighted kudos filter to only those from that department.

---

### User Story 7 - Responsive Layout (Priority: P7)

As a mobile/tablet user, I want the Live Board to display correctly on my device so that I can browse and interact with kudos without usability issues.

**Why this priority**: Mobile support is required by constitution (Principle V) but the primary audience accesses via desktop.

**Independent Test**: Load the Live Board at 320px, 768px, 1024px, and 1440px widths. Verify all sections are accessible and properly laid out.

**Acceptance Scenarios**:

1. **Given** the user opens the Live Board on mobile (< 768px), **When** the page loads, **Then** the kudos feed displays in a single column, the carousel shows one card at a time, the stats sidebar moves above or below the feed, and all touch targets are at least 44x44px.

2. **Given** the user opens the Live Board on tablet (768px-1023px), **When** the page loads, **Then** the layout adjusts with the stats sidebar stacking above the feed or appearing in a collapsible panel.

3. **Given** the user opens the Live Board on desktop (>= 1024px), **When** the page loads, **Then** the layout matches the Figma design with the feed and stats sidebar side by side, carousel showing multiple cards, and full horizontal navigation.

---

### Edge Cases

- What happens when the kudos feed is empty? -> Display a "No kudos yet. Be the first to send one!" message with a CTA to the Write Kudo dialog.
- What happens when the user's network is slow? -> Show skeleton loading states for kudos cards and the carousel.
- What happens when the like API fails? -> Revert the optimistic UI update and show a brief error toast.
- What happens when a kudos image fails to load? -> Show a placeholder image with a subtle broken-image indicator.
- What happens when a kudos has video content? -> Display a play button overlay on the video thumbnail. Click opens an inline video player or lightbox.
- What happens when the user has no Secret Boxes? -> Display the stats with "0" for both opened and unopened, disable the "Mo Secret Box" button.
- What happens when the Top Sunners leaderboard data is unavailable? -> Hide the leaderboard section or show a placeholder message.
- What happens when the Spotlight Board data is unavailable? -> Show a "Data loading" placeholder or hide the section gracefully.
- What happens when filter/search returns no results? -> Display "Khong tim thay ket qua" (No results found) message.
- What happens when the Write Kudo dialog submission fails? -> Keep the dialog open, display an error message, and allow the user to retry.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | (shared) | Shared header: logo (links to `/`) + 3 nav tabs next to logo (not centered): "Giới thiệu SAA", "Thông tin giải thưởng", "Sun* Kudos" (active) — no "Tiêu chuẩn chung" in header + right section (bell, language selector, user avatar only — no separate icon) | Tab click navigates, avatar opens profile dropdown |
| Hero Banner (KV Kudos) | A - 2940:13437 | "He thong ghi nhan loi cam on" title + KUDOS logo, decorative background | Static display |
| Recognition Input | A.1 - 2940:13449 | Pill-shaped input with placeholder text and pen icon | Click opens Write Kudo dialog |
| Search Bar | — | "Tim kiem profile Sunner" search input | Type to search, select result |
| Highlight Kudos Section | B - 2940:13451 | Carousel with "Sun* Annual Awards 2025" label, featured cards, pagination, filters | Carousel navigation, filter dropdowns |
| Highlight Carousel | B child | Featured kudos cards (cream #FFF8E1 bg, 4px gold border, r-16px, w-528px) with < 2/5 > pagination (bold current page), each card has "Xem chi tiết ↗" link and "Copy Link 🔗" action, message truncated at 3 lines | Left/right arrows, card detail links |
| Filter: Hashtag | B child | Dropdown to filter by hashtag | Select to filter carousel content |
| Filter: Phong ban | B child | Dropdown to filter by department | Select to filter carousel content |
| Spotlight Board | 2940:14174 | Large rounded container (r-47px, border #998C5F) with "388 KUDOS" count, word cloud of user names (NOT graph), search input "Tìm kiếm", real-time activity log, and pan/zoom controls | Search, view word cloud, real-time updates |
| All Kudos Feed | — | Scrollable list of kudos cards | Scroll, like, copy link |
| Stats Sidebar | 2940:13489 | Dark card (#00070C bg, #998C5F border, r-17px) with personal kudos stats: received, sent, hearts received 🔥, Secret Box opened/unopened, "Mở Secret Box 🎁" button (h-60px) | View stats, open Secret Box |
| Top Sunners Leaderboard | 2940:13510 | Separate dark card below stats: "10 SUNNER NHẬN QUÀ MỚI NHẤT" with avatars (colored borders), names (#FFEA9E), descriptions | Static display |
| Kudos Card | 3127:21871 | Cream card (#FFF8E1 bg, r-24px, p-40px): sender/receiver with avatars + dept code + hero badges, play arrow icon, timestamp, kudo title + pen icon, message in highlighted cream block, image gallery (max 5), gold hashtag text, like count ("1.000"), "Copy Link" | Like toggle, copy link, view images |
| Hashtags | — | Plain gold text (#FFEA9E), NOT chip/pill styled — e.g. "#Dedicated #Inspring #Dedicated" | Display only |
| Image/Video Gallery | — | Thumbnail images and video content attached to a kudos (play button for video) | Click to expand/lightbox, play video |
| Like Button | — | Heart icon with count (e.g., 1,000) | Click to toggle like |
| Copy Link | — | "Copy Link" text button | Click to copy permalink |
| Secret Box Button | — | "Mo Secret Box" button | Click to open a secret box |
| Write Kudo FAB | — | Floating action button at bottom-right of page | Click opens Write Kudo dialog |
| Footer | — | Shared footer (single row on PC): logo (links to /) + 4 nav links ("Giới thiệu SAA", "Thông tin giải thưởng", "Sun* Kudos" (active), "Tiêu chuẩn chung") + copyright text "Bản quyền thuộc về Sun* © 2025" | Nav link clicks |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Homepage Kudos CTA, Header "Sun* Kudos" nav tab, or direct URL `/kudos`
- **To**: User profile (from search/click), Write Kudo dialog (modal), Individual kudo permalink, Secret Box reveal modal
- **Deep link**: `/kudos` — requires authentication (middleware redirects to `/countdown` if unauthenticated; countdown then redirects to `/login` after 1-minute timer)
- **Triggers**:
  - Recognition input click -> Open Write Kudo dialog (modal)
  - Write Kudo FAB click -> Open Write Kudo dialog (modal) — same as recognition input
  - Search bar input -> Show search suggestions, select navigates to profile
  - Carousel arrows -> Navigate between highlighted kudos pages
  - Highlight card "Xem chi tiet" -> Navigate to kudo detail view
  - Highlight card "Copy Link" -> Copy kudo permalink to clipboard
  - Filter dropdown select -> Filter carousel content
  - Like button click -> Toggle like on kudos
  - "Copy Link" click -> Copy kudos permalink to clipboard
  - "Mo Secret Box" click -> Open Secret Box reveal modal
  - Hashtag chip click -> Filter feed by hashtag (future)

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)
- **Animations/Transitions**: Carousel slide transitions (300ms ease), like button animation (scale + fill, 200ms), button hover/active states (150ms), skeleton loading pulse, Secret Box reveal animation
- **Accessibility**: WCAG AA compliance. All interactive elements MUST have visible focus indicators (outline: 2px solid #FFEA9E, offset: 2px). Carousel MUST be keyboard-navigable: `ArrowLeft`/`ArrowRight` to navigate, `Enter` to interact with cards. Like button MUST use `aria-pressed` for toggle state. Kudos feed MUST use `aria-live="polite"` for new items. Color contrast MUST meet 4.5:1 ratio. Filter dropdowns MUST be keyboard-accessible. Image gallery MUST support `Escape` to close lightbox.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a paginated or infinite-scroll feed of all kudos, ordered by most recent first.
- **FR-002**: System MUST allow authenticated users to send kudos by clicking the recognition input, which opens a Write Kudo dialog.
- **FR-003**: Each kudos card MUST display: sender name/avatar, receiver name/avatar, timestamp, message text, hashtag chips, optional image gallery, like count, and "Copy Link" action.
- **FR-004**: System MUST allow users to like/unlike kudos with optimistic UI updates.
- **FR-005**: System MUST provide a "Copy Link" action that copies a permalink for a specific kudos to the clipboard.
- **FR-006**: System MUST display a Highlight Kudos carousel with featured/editorial kudos and pagination controls.
- **FR-007**: Highlight Kudos section MUST support filtering by Hashtag and Department (Phong ban) via dropdown selectors.
- **FR-008**: System MUST display a Spotlight Board section with total kudos count, a word cloud of user names (NOT a graph/network diagram), a search input, a real-time activity log, and pan/zoom controls, all inside a large rounded container (r-47px, border #998C5F).
- **FR-009**: System MUST display personal stats: kudos received count, kudos sent count, Secret Boxes opened, Secret Boxes unopened.
- **FR-010**: System MUST allow users to open Secret Boxes via the "Mo Secret Box" button when unopened boxes are available.
- **FR-011**: System MUST provide a search bar to search for Sunner profiles.
- **FR-012**: Kudos cards MUST display: (a) kudo title (e.g., "IDOL GIỚI TRẺ") centered with pen icon, (b) hero badges below each user's dept code (e.g., "New Hero" green, "Rising Hero" blue, "Super Hero" red, "Legend Hero" gold), (c) message text in a highlighted cream block within the cream card.
- **FR-013**: System MUST display the hero banner with "He thong ghi nhan loi cam on" branding.

### Technical Requirements

- **TR-001**: Live Board page MUST be a Server Component with Client Component islands for: carousel, like interactions, search, filters, Secret Box, and stats updates (constitution Principle I).
- **TR-002**: Kudos feed MUST use pagination (cursor-based preferred) or infinite scroll with proper loading states.
- **TR-003**: Like/unlike MUST use optimistic updates with server-side reconciliation via server actions.
- **TR-004**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-005**: Page MUST include `loading.tsx` and `error.tsx` per constitution Principle I.
- **TR-006**: Images MUST use `next/image` with appropriate `priority` for above-the-fold content and lazy loading for below-the-fold.
- **TR-007**: Carousel MUST not load all pages upfront — lazy-load carousel pages on navigation.
- **TR-008**: Search MUST debounce input (300ms) to avoid excessive API calls.
- **TR-009**: All form submissions (Write Kudo, like, Secret Box) MUST use server actions with CSRF protection.
- **TR-010**: Spotlight Board word cloud MUST use a lightweight library or canvas/SVG-based rendering for scattered name placement. The real-time activity log MUST update with new entries as kudos are sent. The search input MUST filter/highlight names in the word cloud.

### Key Entities *(if feature involves data)*

- **Kudo**: id, sender_id, receiver_id, message, hashtags[], images[], videos[], badge, created_at, updated_at — core entity for the feed (supports both image and video attachments).
- **KudoLike**: id, kudo_id, user_id, created_at — tracks likes on kudos.
- **User/Sunner**: id, name, avatar_url, department_code (e.g., "CEVC10"), hero_badge (e.g., "New Hero", "Rising Hero", "Super Hero", "Legend Hero"), star_count — sender/receiver display and search.
- **SecretBox**: id, user_id, is_opened, reward, created_at — gamification element.
- **HighlightKudo**: id, kudo_id, featured_at, campaign (e.g., "Sun* Annual Awards 2025") — editorial selection for carousel.
- **Hashtag**: id, name — predefined tags (#Dedicated, #Inspiring, etc.).
- **Department**: id, name — organizational unit for filtering.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (session) | GET | Verify authentication, get user profile | Exists |
| `GET /api/kudos` | GET | Fetch paginated kudos feed (supports cursor, filters) | Predicted (New) |
| `POST /api/kudos` | POST | Create a new kudo (server action) | Predicted (New) |
| `POST /api/kudos/:id/like` | POST | Toggle like on a kudo (server action) | Predicted (New) |
| `GET /api/kudos/highlights` | GET | Fetch highlighted/featured kudos for carousel | Predicted (New) |
| `GET /api/kudos/spotlight` | GET | Fetch spotlight board data (total count, graph nodes/edges) | Predicted (New) |
| `GET /api/kudos/stats` | GET | Fetch personal kudos stats (sent, received, secret box counts) | Predicted (New) |
| `POST /api/secret-box/open` | POST | Open a secret box (server action) | Predicted (New) |
| `GET /api/users/search?q=` | GET | Search for Sunner profiles by name | Predicted (New) |
| `GET /api/hashtags` | GET | Fetch available hashtags for filtering | Predicted (New) |
| `GET /api/departments` | GET | Fetch departments for filtering | Predicted (New) |
| `GET /api/kudos/top-sunners` | GET | Fetch top 10 Sunners who received the most gifts for leaderboard | Predicted (New) |

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| feedPage | number or string (cursor) | 1 / null | KudosFeed | Current page/cursor for pagination |
| likedKudos | Set\<string\> | fetched from server | KudoCard | Track which kudos the current user has liked (optimistic) |
| carouselPage | number | 1 | HighlightCarousel | Current page of the highlight carousel |
| selectedHashtag | string \| null | null | HighlightFilters | Selected hashtag filter |
| selectedDepartment | string \| null | null | HighlightFilters | Selected department filter |
| searchQuery | string | "" | SearchBar | Current search input value |
| searchResults | User[] | [] | SearchBar | Search suggestions |
| isWriteDialogOpen | boolean | false | RecognitionInput | Write Kudo dialog visibility |
| isSecretBoxModalOpen | boolean | false | SecretBoxButton | Secret Box reveal modal visibility |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Verify authentication, get user info |
| Locale | Cookie (`locale`) | Determine language for server-rendered text |
| Kudos feed data | Supabase DB (kudos table) | Paginated kudos for the feed |
| Highlight kudos | Supabase DB (highlight_kudos view/table) | Featured kudos for carousel |
| Spotlight data | Supabase DB (aggregation) | Total count and graph data |
| User stats | Supabase DB (aggregation) | Personal kudos sent/received, secret box counts |
| Hashtags | Supabase DB | Available hashtags for filtering |
| Departments | Supabase DB | Available departments for filtering |

### Loading/Error States

- **Page loading** (`loading.tsx`): Full-screen dark background (#00101A) with centered pulsing placeholder. Skeleton blocks for hero, carousel, and feed sections.
- **Error boundary** (`error.tsx`): Dark background (#00101A), centered "Something went wrong" message with "Try again" button (#FFEA9E, 8px radius).
- **Feed loading**: Display 3-5 skeleton kudos card placeholders (animate-pulse) with gray blocks for avatar, text lines, and image areas.
- **Carousel loading**: Display skeleton card placeholders in the carousel area.
- **Spotlight loading**: Display a placeholder with pulsing circle/graph outline.
- **Stats loading**: Display skeleton number placeholders.
- **Search loading**: Show a spinner in the search dropdown while results load.
- **Like failure**: Revert optimistic update, show brief error toast "Could not update like. Try again."
- **Write Kudo failure**: Keep dialog open, display inline error message, allow retry.
- **Secret Box failure**: Show error toast, keep modal closed.

---

## Internationalization (i18n)

The following texts MUST be translatable via i18n keys:

| i18n Key | Vietnamese (default) | English |
|----------|---------------------|---------|
| `kudos.hero_title` | He thong ghi nhan loi cam on | Recognition System |
| `kudos.input_placeholder` | Hom nay, ban muon gui loi cam on va ghi nhan den ai? | Who would you like to thank and recognize today? |
| `kudos.search_placeholder` | Tim kiem profile Sunner | Search Sunner profile |
| `kudos.highlight_title` | HIGHLIGHT KUDOS | HIGHLIGHT KUDOS |
| `kudos.highlight_label` | Sun* Annual Awards 2025 | Sun* Annual Awards 2025 |
| `kudos.filter_hashtag` | Hashtag | Hashtag |
| `kudos.filter_department` | Phong ban | Department |
| `kudos.spotlight_title` | SPOTLIGHT BOARD | SPOTLIGHT BOARD |
| `kudos.spotlight_count` | {count} KUDOS | {count} KUDOS |
| `kudos.all_title` | ALL KUDOS | ALL KUDOS |
| `kudos.stats_received` | Số Kudos bạn nhận được | Kudos you received |
| `kudos.stats_sent` | Số Kudos bạn đã gửi | Kudos you sent |
| `kudos.stats_hearts` | Số tim bạn nhận được🔥 | Hearts you received 🔥 |
| `kudos.secret_box_opened` | Số Secret Box bạn đã mở | Secret Boxes you opened |
| `kudos.secret_box_unopened` | Số Secret Box chưa mở | Unopened Secret Boxes |
| `kudos.open_secret_box` | Mở Secret Box 🎁 | Open Secret Box 🎁 |
| `kudos.top_sunners_title` | 10 SUNNER NHẬN QUÀ MỚI NHẤT | 10 SUNNERS WHO RECEIVED GIFTS MOST RECENTLY |
| `kudos.like_count` | {count} | {count} |
| `kudos.copy_link` | Copy Link | Copy Link |
| `kudos.link_copied` | Da sao chep lien ket | Link copied |
| `kudos.empty_feed` | Chua co kudos nao. Hay la nguoi dau tien gui loi cam on! | No kudos yet. Be the first to send one! |
| `kudos.no_results` | Khong tim thay ket qua | No results found |
| `kudos.load_more` | Xem them | Load more |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Live Board page loads in under 3 seconds (LCP) on desktop with good network.
- **SC-002**: Kudos feed renders the first page of cards within 2 seconds of navigation.
- **SC-003**: Like/unlike interaction completes optimistic update within 100ms (perceived).
- **SC-004**: Carousel navigation between pages completes within 300ms.
- **SC-005**: Search results appear within 500ms of debounced input.
- **SC-006**: All sections render correctly at all 4 responsive breakpoints.
- **SC-007**: Live Board passes WCAG AA automated checks.

---

## Out of Scope

- Write Kudo dialog internal design — separate frame/spec (only the trigger from the recognition input is in scope).
- User profile page — only search navigation to it is in scope.
- Notification panel — handled by the shared Header component.
- Admin management of highlighted kudos or hashtags.
- Real-time WebSocket updates for the feed (near-real-time via polling or refresh is acceptable for MVP).
- Spotlight Board interactive features (hover to see user details, click to navigate) — only static visualization is in scope.
- Secret Box reward details page.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [ ] Write Kudo dialog spec (linked frame)

---

## Notes

- The Figma design uses a 1512px wide frame with 144px horizontal padding. However, the page wrapper must NOT use `max-w-[1512px] mx-auto` — it must use `min-h-screen bg-[#00101A]` without max-width constraint, consistent with the Homepage and Awards pages. Internal content sections use `max-w-[1440px] mx-auto` with responsive padding (`px-4 md:px-12 lg:px-20 xl:px-36`).
- The dark theme (#00101A background) with gold accents (#FFEA9E) is consistent across all SAA 2025 screens.
- The recognition input uses a pill shape (full border-radius) distinct from the standard 8px radius buttons.
- Kudos cards have warm cream (#FFF8E1) backgrounds with rounded corners (24px for feed, 16px for highlight). The message text sits inside a highlighted cream block (bg: rgba(255,234,158,0.30)). Cards contain: sender/receiver blocks (avatar + name + dept code + hero badge), play arrow icon, timestamp, kudo title with pen icon, message block, image gallery (max 5), gold hashtag text (plain, no chips), and action bar with like count + copy link.
- The Spotlight Board is a **word cloud** (NOT a graph/network diagram). User names are scattered at varying sizes and opacities. It includes: search input (top-left), total count (top-center), activity log (bottom-left), pan/zoom controls (bottom-right). The container has a very large border-radius (47px) with #998C5F border.
- The carousel in the Highlight section uses pagination (e.g., "2/5") rather than dot indicators, suggesting discrete page navigation rather than continuous scrolling.
- Stats sidebar placement (right side) on desktop should collapse to above or below the feed on mobile.
- The Secret Box gamification element should use engaging animations for the "open" interaction to encourage participation.
- Hashtag chips (#Dedicated, #Inspiring, etc.) are predefined tags, not user-generated freeform text.
- The like count format uses dot-separated thousands (e.g., "1.000" NOT "1,000") per Vietnamese number formatting convention.
- "IDOL GIỚI TRẺ" is the kudo title/badge displayed centered within the card, NOT near the sender/receiver. Hero badges (New Hero, Rising Hero, Super Hero, Legend Hero) are colored pills displayed below each user's department code.
- The stats sidebar and leaderboard are separate dark cards (#00070C bg) with gold-muted borders (#998C5F), NOT transparent overlays. They are 422px wide on desktop.
- "Số tim bạn nhận được" (hearts received) uses a fire 🔥 emoji, and "Mở Secret Box" button has a gift 🎁 icon.
- The leaderboard title is "10 SUNNER NHẬN QUÀ MỚI NHẤT" (most recent), NOT "NỔI BẬT" (outstanding).
