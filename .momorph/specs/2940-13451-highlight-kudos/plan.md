# Implementation Plan: Highlight Kudos Section

**Frame**: `2940-13451-highlight-kudos`
**Date**: 2026-03-16
**Spec**: `specs/2940-13451-highlight-kudos/spec.md`

---

## Summary

Fix and complete the Highlight Kudos section on `/kudos`. The section currently exists but has critical issues: no data loads (the `highlight_kudos` table has no seed data), the section header layout is wrong (subtitle should be ABOVE title, separated by a `#2E3940` divider), and the kudo card styling doesn't match Figma (needs 4px gold border, proper sender→receiver layout with badges, gold dividers inside cards). The filter dropdowns exist but use CSS variable-based styling instead of direct Tailwind classes matching the design.

**Key finding**: The `highlight_kudos` table exists in the migration (`20260310000004_create_kudos.sql`) but the dev seed (`supabase/seeds/dev/kudos.sql`) never inserts any rows into it. This is why no highlight kudos appear despite successful kudo creation.

**Approach**: Fix data layer first (seed `highlight_kudos`), then fix section header layout, then update kudo card styling to match design, and finally verify filter dropdowns work correctly.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, Supabase
**Database**: PostgreSQL (Supabase)
**State Management**: React useState + useTransition (existing pattern)
**API Style**: Server Components + Server Actions

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (TypeScript strict, PascalCase components, kebab-case files)
- [x] Uses approved libraries and patterns (Supabase, Tailwind, Server Components)
- [x] Adheres to folder structure guidelines (`src/components/kudos/`, `src/libs/kudos/`)
- [x] Meets security requirements (RLS enabled, server-side auth checks)
- [x] Follows responsive design (mobile-first with md/lg/xl breakpoints)

**Violations**: None. All changes use existing patterns and approved stack.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Modify existing components in `src/components/kudos/`. The `HighlightKudos` → `HighlightCarousel` → `KudoCard` hierarchy is correct.
- **Styling Strategy**: Direct Tailwind arbitrary values matching Figma design tokens (e.g., `text-[57px]`, `bg-[#FFF8E1]`, `border-4 border-[#FFEA9E]`).
- **Data Fetching**: Server Component (`page.tsx`) fetches initial data; client components use `fetchHighlightKudosAction` server action for pagination/filtering.

### Backend Approach

- **Data Fix**: Add `highlight_kudos` seed data referencing existing dev kudos. This is the PRIMARY blocker — without data, nothing renders.
- **Alternative approach for highlight**: Consider modifying `getHighlightKudos` to fallback to querying `kudos` table directly (sorted by like count DESC, then created_at DESC) when `highlight_kudos` is empty. This makes the feature self-populating.
- **No new migrations needed**: All tables already exist.

### Integration Points

- **Existing Services**: `getHighlightKudos()`, `fetchHighlightKudosAction()`, `toggleLike()`, `getHashtags()`, `getDepartments()`
- **Shared Components**: `HashtagFilterDropdown`, `DepartmentFilterDropdown` (from `src/components/live-board/`)
- **Reusable Components**: `KudoCard`, `KudoCardHeader`, `KudoCardBody`, `KudoCardActions`, `LikeButton`, `CopyLinkButton`, `HashtagChip`

---

## Project Structure

### Documentation

```text
.momorph/specs/2940-13451-highlight-kudos/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### Modified Files

| File | Changes |
|------|---------|
| `supabase/seeds/dev/kudos.sql` | Add `highlight_kudos` seed data for dev |
| `src/components/kudos/highlight-kudos.tsx` | Fix section header layout: subtitle ABOVE title with divider |
| `src/components/kudos/highlight-carousel.tsx` | Update card wrapper styling, pagination styling |
| `src/components/kudos/kudo-card.tsx` | Update to 4px gold border, proper padding |
| `src/components/kudos/kudo-card-header.tsx` | Fix sender→receiver layout with proper avatar sizes and department display |
| `src/components/kudos/kudo-card-body.tsx` | Add gold dividers, fix message styling (20px, max 3 lines), fix hashtag styling |
| `src/components/kudos/kudo-card-actions.tsx` | Update divider to gold, fix like count size, add "Xem chi tiết" link |
| `src/libs/kudos/queries.ts` | Fix `getHighlightKudos` to fallback to kudos table when highlight_kudos is empty |

### New Files

| File | Purpose |
|------|---------|
| None | All needed files already exist |

### Dependencies

No new dependencies needed.

---

## Implementation Strategy

### Phase 0: Data Fix (CRITICAL — unblocks everything)

1. **Add highlight_kudos seed data** in `supabase/seeds/dev/kudos.sql`
   - Insert rows linking existing dev kudos to `highlight_kudos` table
   - This immediately makes the carousel show data
2. **Fix `getHighlightKudos` fallback** — when `highlight_kudos` is empty, query `kudos` table directly sorted by like count DESC, created_at DESC
   - This ensures production works even without manual curation

### Phase 1: Section Header Fix (US1)

Fix the header layout in `highlight-kudos.tsx`:
- **Before**: `<h2>HIGHLIGHT KUDOS</h2> <p>Sun* Annual Awards 2025</p>` (subtitle below)
- **After**: `<p>Sun* Annual Awards 2025</p> <div class="divider"/> <h2>HIGHLIGHT KUDOS</h2>` (subtitle above, divider between)
- Subtitle: 24px/700/white
- Divider: 1px `#2E3940` full-width
- Title: Use responsive sizes — `text-[32px] md:text-[44px] lg:text-[57px]` / 700 / gold `#FFEA9E`

### Phase 2: Kudo Card Styling Fix (US1)

Update kudo card components to match Figma:

**kudo-card.tsx**:
- Change from `rounded-3xl bg-[#FFF8E1] p-6 pt-10` to `rounded-2xl bg-[#FFF8E1] border-4 border-[#FFEA9E] p-6 pb-4`

**kudo-card-header.tsx**:
- Sender (left) → arrow → Receiver (right) layout already exists ✅
- Fix avatar size to 48px (currently 56px)
- Fix department text: use `departmentCode` with `text-[#999]` color
- Verify hero badge display

**kudo-card-body.tsx**:
- Add gold divider (`h-px bg-[#FFEA9E]`) BEFORE timestamp
- Fix timestamp: `text-base font-bold text-[#999] tracking-[0.5px]`
- Add badge title centered text below timestamp
- Fix message: `text-xl font-bold leading-8 text-[#00101A]` with `line-clamp-3`
- Fix hashtag color: `text-[#D4271D]` with `line-clamp-1`
- Add gold divider AFTER hashtags

**kudo-card-actions.tsx**:
- Change border from `border-t border-[#00101A]/10` to gold divider is handled by body
- Fix like count size: `text-2xl font-bold`
- Add "Xem chi tiết" link with arrow icon

### Phase 3: Filter & Pagination (US2, US3)

- Verify `KudosFilters` component renders correctly with the golden style
- Verify filter buttons match design: `bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded p-4`
- The existing `HashtagFilterDropdown` uses CSS variables — may need to verify these are set correctly
- Update pagination: `text-[28px] font-bold text-[#999]` with gold current page number

### Phase 4: Card Actions (US4)

- Verify like/unlike works (server action `toggleLike` exists)
- Verify copy link copies correct URL
- Add "Xem chi tiết" link that navigates to `/kudos/{kudoId}` (or appropriate route)

### Phase 5: Polish

- Responsive testing at 320px, 768px, 1024px, 1440px
- Verify carousel navigation arrows work
- Verify filter + pagination combination works
- Empty state when no kudos match filters

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `highlight_kudos` table empty in prod | High | High | Add fallback query to `kudos` table sorted by likes |
| Filter dropdowns CSS variables not set | Medium | Medium | Use direct Tailwind classes instead of CSS vars |
| Kudo card layout breaks on different content lengths | Medium | Low | Use `line-clamp` for message and hashtags, test with various content |
| Highlight query with filters returns empty | Low | Medium | Show appropriate empty state message |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: HighlightKudos → filters → carousel → cards
- [x] **Data layer**: Supabase queries for highlight kudos, hashtags, departments
- [x] **User workflows**: Filter → paginate → like → copy link flow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Filter selection triggers re-fetch, pagination works |
| App ↔ Data Layer | Yes | CRUD operations for likes, data loading |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page loads with highlight kudos displayed
   - [x] Selecting a hashtag filter updates the carousel
   - [x] Selecting a department filter updates the carousel
   - [x] Pagination navigates between pages
   - [x] Like/unlike toggles correctly

2. **Error Handling**
   - [x] Empty state when no kudos match filters
   - [x] Graceful handling when API fails

3. **Edge Cases**
   - [x] Both filters combined (AND logic)
   - [x] Single page — pagination arrows disabled
   - [x] Long message text truncated to 3 lines

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` completed
- [x] `design-style.md` completed
- [x] Database migrations exist (tables already created)
- [x] Seed data for hashtags and departments exists
- [ ] Seed data for `highlight_kudos` table (TO BE ADDED)

### External Dependencies

- Supabase local instance running (`make up`)
- Seed data applied (`supabase db reset` or manual seed)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation — start with Phase 0 (data fix) as it unblocks everything

---

## Notes

- The `highlight_kudos` table is designed for admin-curated highlights. For the MVP, we'll seed some dev data AND add a fallback to the query that shows top-liked kudos when no curated highlights exist.
- The existing `KudoCard` component hierarchy (`KudoCard` → `KudoCardHeader` + `KudoCardBody` + `KudoCardActions`) is the right structure. We just need to fix styling to match Figma.
- The `HashtagFilterDropdown` and `DepartmentFilterDropdown` in `src/components/live-board/` are already used by `KudosFilters`. The main fix is ensuring their styling matches the design (golden bg, #998C5F border, 4px radius).
- The `getHighlightKudos` query currently filters via nested Supabase relations (`query.eq("kudo.kudo_hashtags.hashtag_id", hashtagId)`) which may not work correctly with nested PostgREST filters. This should be tested and potentially rewritten.
