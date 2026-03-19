# Feature Specification: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Reviewed

---

## Overview

The Login screen is the entry point to the MoMorph (Sun Annual Awards 2025) application. It presents a visually rich hero section with the "ROOT FURTHER" branding and a single call-to-action: **Sign in with Google**. The screen uses Supabase Auth with Google OAuth as the sole authentication method — no email/password form is needed.

The design emphasizes simplicity: a full-screen background artwork with gradient overlays, a fixed semi-transparent header with logo and language selector, the hero content with a prominent Google login button, and a copyright footer.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Google Login (Priority: P1)

As a visitor to SAA 2025, I want to log in with my Google account so that I can access the application and explore its features.

**Why this priority**: This is the only authentication method. Without it, no user can access the application. It is the MVP.

**Independent Test**: Navigate to the login page, click "LOGIN With Google", complete Google OAuth flow, and verify redirect to the authenticated home page.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated and on the login page, **When** they click the "LOGIN With Google" button, **Then** the system initiates the Google OAuth flow via Supabase Auth and redirects the user to Google's consent screen.

2. **Given** the user completes Google OAuth successfully, **When** they are redirected back to the application, **Then** the system creates/updates the user session via Supabase Auth and redirects to the authenticated home page.

3. **Given** the user is already authenticated with a valid session, **When** they navigate to the login page, **Then** the system MUST redirect them to the authenticated home page (skip login).

4. **Given** the user clicks the login button, **When** the OAuth flow is in progress, **Then** the button MUST show a loading state (disabled with spinner) to prevent duplicate requests.

5. **Given** the user clicks the login button, **When** Google OAuth fails (user denies consent, network error, or unauthorized account), **Then** the system redirects back to `/login?error=<error_code>`, displays a user-friendly error message near the login button, and re-enables the button for retry.

6. **Given** the user was redirected to login from a protected route `/dashboard`, **When** they complete OAuth successfully, **Then** the system MUST redirect them back to `/dashboard` (not just the home page).

---

### User Story 2 - Language Selection (Priority: P2)

As a user, I want to switch the application language so that I can view content in my preferred language (Vietnamese or other supported languages).

**Why this priority**: Internationalization enhances accessibility but is not required for core functionality.

**Independent Test**: Click the language selector, choose a different language, and verify the UI text updates accordingly.

**Acceptance Scenarios**:

1. **Given** the user is on the login page, **When** they click the language selector "VN ▼", **Then** a dropdown appears with available language options.

2. **Given** the language dropdown is open, **When** the user selects a different language, **Then** all translatable text on the page updates to the selected language, and the selection persists across navigation.

3. **Given** the language dropdown is open, **When** the user clicks outside the dropdown or presses `Escape`, **Then** the dropdown closes without changing the language.

4. **Given** the language selector is focused via keyboard, **When** the user presses `Enter` or `Space`, **Then** the dropdown opens. Arrow keys navigate options, `Enter` selects, `Escape` closes.

---

### User Story 3 - Responsive Login Experience (Priority: P3)

As a mobile user, I want the login page to display correctly on my device so that I can log in without usability issues.

**Why this priority**: Mobile support is required by constitution (Principle V) but the primary audience likely accesses via desktop during events.

**Independent Test**: Load the login page on viewports at 320px, 768px, 1024px, and 1440px widths and verify all elements are accessible and properly laid out.

**Acceptance Scenarios**:

1. **Given** the user opens the login page on a mobile device (< 768px), **When** the page loads, **Then** the ROOT FURTHER logo scales down, the description text wraps properly, and the login button is full-width with a minimum touch target of 44×44px.

2. **Given** the user opens the login page on a tablet (768px–1023px), **When** the page loads, **Then** the layout adjusts with reduced padding (48px) while maintaining visual hierarchy and readable text sizes.

3. **Given** the user opens the login page on a wide desktop (≥ 1280px), **When** the page loads, **Then** the layout matches the Figma design exactly at 1440px, constrained by `max-width: 1440px` and centered with `margin: 0 auto`.

---

### Edge Cases

- What happens when Google OAuth fails (user denies consent, network error)? → Display an error message and return to the login page with the button re-enabled.
- What happens when the user's Google account is not authorized? → Display an appropriate error message (e.g., "This account is not authorized to access SAA 2025").
- What happens when Supabase Auth service is unavailable? → Display a generic error with a retry option.
- What happens when the user navigates directly to a protected route without auth? → Middleware redirects to `/countdown` with a return URL parameter. After the 1-minute countdown, the user is redirected to `/login` which preserves the return URL. After successful login, they are sent to the originally requested page.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | 662:14391 | Fixed semi-transparent navigation bar | None (static) |
| Logo | I662:14391;186:2166 | Sun Annual Awards 2025 logo, top-left | None (static) |
| Language Selector | I662:14391;186:1601 | "VN ▼" language toggle, top-right | Click opens dropdown |
| Key Visual Background | 662:14388 | Full-screen decorative artwork | None (static) |
| Gradient Overlays | 662:14392, 662:14390 | Left and bottom gradients for text readability | None (static) |
| ROOT FURTHER Logo | 2939:9548 | Hero brand image (451×200px) | None (static) |
| Description Text | 662:14753 | "Bắt đầu hành trình..." call to action | None (static) |
| Login Button | 662:14426 | "LOGIN With Google" with Google icon | Click triggers OAuth |
| Footer | 662:14447 | Copyright text with top border | None (static) |

> **Visual specs**: See [design-style.md](./design-style.md) for complete CSS values, colors, typography, spacing, and component states.

### Navigation Flow

- **From**: Direct URL access (`/login`), or redirect from countdown page (`/countdown` → timer expires → `/login`), or redirect from any protected route via countdown (`/countdown?next=/protected-path` → `/login?next=/protected-path`)
- **To**: Authenticated home page (after successful Google login), or `next` URL if provided
- **Deep link**: `/login` — accessible without authentication
- **Triggers**:
  - Click "LOGIN With Google" → Google OAuth → Home page (or `next` URL)
  - Language selector → Dropdown (stays on page)
  - Already authenticated → Auto-redirect to home

### Visual Requirements

- **Responsive breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px) — per constitution Principle V
- **Animations/Transitions**: Button hover/active states (150ms), dropdown open/close (150ms), page fade-in (300ms)
- **Accessibility**: WCAG AA compliance required. White text on dark background meets contrast ratio (~18.5:1). All interactive elements MUST have visible focus indicators (outline or ring). Google login button MUST be keyboard-accessible. Tab order: Logo (skip) → Language Selector → Login Button. State changes (loading, error) MUST be announced via `aria-live="polite"` regions. Language dropdown MUST use `role="listbox"` with `aria-expanded`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate users exclusively via Google OAuth through Supabase Auth.
- **FR-002**: System MUST redirect authenticated users away from the login page to the home page.
- **FR-003**: System MUST show a loading state on the login button while OAuth is in progress.
- **FR-004**: System MUST handle OAuth errors gracefully and display user-friendly error messages.
- **FR-005**: System MUST persist the selected language preference across sessions.
- **FR-006**: System MUST redirect users back to their originally requested URL after successful login (return URL support).

### Technical Requirements

- **TR-001**: Login page MUST be a Server Component (constitution Principle I). The login button is a Client Component boundary for interactivity.
- **TR-002**: Authentication MUST use Supabase Auth with server-side session verification (constitution Principle IV).
- **TR-003**: No Node.js APIs — all code MUST be Cloudflare Workers compatible (constitution Principle VI).
- **TR-004**: Page MUST load in under 3 seconds on a 3G connection (images optimized, fonts preloaded).
- **TR-005**: Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) MUST only be used server-side.
- **TR-006**: The `/login` route segment MUST include `loading.tsx` and `error.tsx` per constitution Principle I.

### Key Entities *(if feature involves data)*

- **User Session**: Managed by Supabase Auth. Contains user ID, email, access token, refresh token.
- **Language Preference**: Stored in a cookie (`locale`) for server-side reading and persistence across sessions.

---

## State Management

### Local State (Client Components)

| State | Type | Initial | Component | Purpose |
|-------|------|---------|-----------|---------|
| isLoading | boolean | false | LoginButton | Disable button + show spinner during OAuth |
| error | string \| null | null | LoginButton | Display OAuth error message (read from URL `?error=`) |
| isDropdownOpen | boolean | false | LanguageSelector | Toggle dropdown visibility |

### Server State

| State | Source | Purpose |
|-------|--------|---------|
| User session | Supabase Auth (cookies) | Redirect authenticated users away from login |
| Locale | Cookie (`locale`) | Determine language for server-rendered text |

### Loading/Error States

- **Page loading** (`loading.tsx`): Full-screen dark background (#00101A) with a centered pulsing placeholder for the hero area. Keep it minimal — no header/footer chrome needed, just a dark screen with subtle loading indicator to prevent layout shift.
- **OAuth in-flight**: LoginButton shows disabled state with spinner (local `isLoading`).
- **OAuth error**: Error message rendered below login button in an `aria-live="polite"` region, read from `?error=` URL param. Auto-dismisses after 5 seconds. Text: white on semi-transparent dark background, Montserrat 14px.
- **Supabase unavailable** (`error.tsx`): Dark background (#00101A), centered error message ("Something went wrong") with a "Try again" button styled consistently with the login button (#FFEA9E). The `error.tsx` component receives a `reset` function to retry.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth `/auth/v1/authorize` | GET | Initiate Google OAuth flow | Exists (Supabase built-in) |
| `/auth/callback` | GET | Handle OAuth redirect callback | New (route handler) |
| Supabase Auth `/auth/v1/token` | POST | Exchange code for session | Exists (Supabase built-in) |

*Note: These are predicted based on Supabase Auth patterns. The `/auth/callback` route handler is the only custom endpoint needed.*

### `/auth/callback` Route Handler Detail

- **Input**: URL search param `code` (string, required) — OAuth authorization code from Google
- **Input**: URL search param `next` (string, optional) — Return URL after successful login (default: `/`)
- **Validation**: `next` MUST be a relative path starting with `/`. Reject absolute URLs, external domains, or protocol-relative URLs (`//`). Default to `/` if invalid. *(OWASP: Open Redirect prevention — constitution Principle IV)*
- **Process**: Call `supabase.auth.exchangeCodeForSession(code)` using server client
- **Success**: Redirect 302 to validated `next` URL
- **Error**: Redirect 302 to `/login?error=auth_callback_failed`

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of users can complete Google login flow without errors under normal conditions.
- **SC-002**: Login page loads in under 3 seconds (LCP) on desktop with good network.
- **SC-003**: Login page passes WCAG AA automated checks (axe-core or similar).
- **SC-004**: Login page renders correctly at all 4 breakpoints (320px, 768px, 1024px, 1440px).
- **SC-005**: Authenticated users are redirected away from login page within 500ms.

---

## Out of Scope

- Email/password authentication — Google OAuth is the sole login method per the Figma design.
- User registration flow — Google OAuth handles account creation implicitly.
- Password reset/recovery — Not applicable with OAuth-only auth.
- Social login with providers other than Google — Only Google is shown in the design.
- Admin user management — Separate feature/screen.
- Language dropdown implementation details (content of the dropdown) — A separate frame (721:4942) handles the dropdown state.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Figma design shows Vietnamese text ("Bắt đầu hành trình của bạn cùng SAA 2025. Đăng nhập để khám phá!") — this confirms i18n support is expected. The language selector links to frame `721:4942` (Dropdown-ngôn ngữ).
- The login button text "LOGIN With Google" uses mixed case — this should be preserved as designed.
- The footer copyright text "Bản quyền thuộc về Sun* © 2025" is static but MUST be translatable (i18n key: `footer.copyright`) since language selection is supported.
- Fonts required: Montserrat (700) and Montserrat Alternates (700) — load via `next/font/google`.
- The key visual background image is purely decorative and MUST have an empty `alt=""` attribute for accessibility.
- Google's "Sign in with Google" branding guidelines should be reviewed — the current design uses a custom-styled button rather than Google's standard button, which may need compliance verification.
