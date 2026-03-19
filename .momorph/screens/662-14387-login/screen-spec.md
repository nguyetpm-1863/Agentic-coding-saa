# Screen: Login

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 662:14387 |
| **Figma File Key** | 9ypp4enmFmdK3YAFJLIu6C |
| **Screen Group** | Authentication |
| **Status** | discovered |
| **Discovered At** | 2026-03-09 |
| **Last Updated** | 2026-03-09 |

---

## Description

The Login screen is the application entry point for Sun Annual Awards 2025. It features a full-screen hero design with a background artwork, "ROOT FURTHER" branding, and a single Google OAuth login button. The header contains the SAA logo and a language selector. A copyright footer is fixed at the bottom.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Any protected route | Auto-redirect | User is unauthenticated |
| Home/Dashboard | Logout action | User clicks logout |
| Direct URL | Browser navigation | User navigates to /login |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Google OAuth | "LOGIN With Google" button | 662:14426 | high | Opens Google consent screen via Supabase Auth |
| Home (authenticated) | OAuth callback | N/A | high | Auto-redirect after successful auth |
| Language Dropdown | "VN ▼" language selector | I662:14391;186:1601 | high | Opens dropdown overlay (frame 721:4942) |

### Navigation Rules
- **Back behavior**: N/A — this is the entry screen
- **Deep link support**: Yes — `/login` or `/` (root)
- **Auth required**: No — this is the unauthenticated entry point
- **Auth redirect**: Authenticated users MUST be redirected away from this screen

---

## Component Schema

### Layout Structure

```
┌──────────────────────────────────────────────────────────────────────┐
│  BACKGROUND: Keyvisual artwork (absolute, full-screen)               │
│  OVERLAY: Left gradient + Bottom gradient                            │
├──────────────────────────────────────────────────────────────────────┤
│  HEADER (fixed, 80px, semi-transparent)                              │
│  [SAA Logo]                                          [VN ▼]         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  HERO SECTION (px: 144px, py: 96px)                                  │
│                                                                      │
│  ┌────────────────────────────────────┐                              │
│  │  ROOT FURTHER Logo (451×200)       │                              │
│  └────────────────────────────────────┘                              │
│                                                                      │
│  ┌─────────────────────────────┐                                     │
│  │  "Bắt đầu hành trình..."   │                                     │
│  │  "Đăng nhập để khám phá!"  │                                     │
│  └─────────────────────────────┘                                     │
│                                                                      │
│  ┌─────────────────────────────┐                                     │
│  │  LOGIN With Google  [G]     │                                     │
│  └─────────────────────────────┘                                     │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  FOOTER (border-top, copyright text centered)                        │
│              "Bản quyền thuộc về Sun* © 2025"                        │
└──────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
LoginScreen (Server Component)
├── KeyvisualBackground (Atom — next/image, decorative)
├── GradientLeft (Atom — div with CSS gradient)
├── GradientBottom (Atom — div with CSS gradient)
├── Header (Organism — reusable)
│   ├── Logo (Atom — next/image, SAA 2025 logo)
│   └── LanguageSelector (Molecule — Client Component)
│       ├── FlagIcon (Atom — Vietnam flag)
│       ├── LangLabel (Atom — "VN" text)
│       └── ChevronDown (Atom — dropdown indicator)
├── HeroSection (Organism)
│   ├── KeyVisualLogo (Atom — next/image, ROOT FURTHER)
│   ├── DescriptionText (Atom — static text)
│   └── LoginButton (Molecule — Client Component)
│       ├── ButtonText (Atom — "LOGIN With Google")
│       └── GoogleIcon (Atom — Google brand icon)
└── Footer (Organism — reusable)
    └── CopyrightText (Atom — static text)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Header | Organism | 662:14391 | Fixed nav bar with logo + language selector | Yes |
| Logo | Atom | I662:14391;186:2166 | SAA 2025 logo image | Yes |
| LanguageSelector | Molecule | I662:14391;186:1601 | Language toggle button with dropdown | Yes |
| HeroSection | Organism | 662:14393 | Hero content area with branding + CTA | No |
| KeyVisualLogo | Atom | 2939:9548 | ROOT FURTHER brand image | No |
| DescriptionText | Atom | 662:14753 | Call-to-action text | No |
| LoginButton | Molecule | 662:14426 | Google OAuth trigger button | No |
| Footer | Organism | 662:14447 | Copyright footer with border | Yes |

---

## Form Fields (If Applicable)

No form fields — authentication is handled entirely via Google OAuth redirect. No email/password inputs.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| Supabase Auth session check | GET | Verify if user already authenticated | Redirect to home if authenticated |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Click "LOGIN With Google" | Supabase `/auth/v1/authorize` | GET | `{provider: 'google'}` | Redirect to Google consent |
| OAuth callback | `/auth/callback` | GET | `{code}` (URL param) | Set session, redirect to home |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| OAuth denied | User denied consent | Show error toast, re-enable button |
| Network error | Connection failed | Show retry option |
| 401 | Unauthorized account | Show "account not authorized" message |
| 500 | Server error | Show generic error with retry |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isLoading | boolean | false | Login button loading state |
| error | string \| null | null | OAuth error message |
| langDropdownOpen | boolean | false | Language dropdown visibility |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| session | Supabase Auth | Write | Created on successful OAuth callback |
| locale | Cookie | Read/Write | Persisted language preference |

---

## UI States

### Default State
- Login button enabled with golden background (#FFEA9E)
- No error messages visible
- Language selector shows current language (VN)

### Loading State
- Login button disabled with reduced opacity
- Loading spinner replaces Google icon
- Button text remains visible

### Error State
- Error message displayed near the login button
- Login button re-enabled for retry
- Error auto-dismisses after 5 seconds

### Success State
- Brief success indicator (optional)
- Immediate redirect to authenticated home page

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Auto-focus login button on page load |
| Keyboard navigation | Tab: Logo → Language → Login button |
| Screen reader | `aria-label` on login button: "Sign in with Google" |
| Error announcement | `role="alert"` on error messages |
| Color contrast | White (#FFF) on dark (#00101A) = 18.5:1 ratio ✅ |
| Decorative images | Background keyvisual: `alt=""` |
| Interactive targets | All buttons ≥ 44×44px touch target |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (< 768px) | Full-width button, reduced padding (16px), scaled-down logos |
| Tablet (768–1023px) | Medium padding (48px), auto-width button |
| Desktop (≥ 1024px) | Full Figma layout (144px padding, 305px button) |
| Wide (≥ 1280px) | Constrained to max-width: 1440px, centered |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --color-bg-primary | #00101A | Page background |
| --color-header-bg | rgba(11,15,18,0.8) | Header background |
| --color-btn-login | #FFEA9E | Login button background |
| --color-btn-login-text | #00101A | Login button text |
| --color-text-white | #FFFFFF | Body text |
| --color-footer-border | #2E3940 | Footer border |
| --radius-btn | 8px | Login button corners |
| --font-primary | Montserrat | Primary font family |
| --font-footer | Montserrat Alternates | Footer font family |

> Full design token reference: [design-style.md](../../specs/662-14387-login/design-style.md)

---

## Implementation Notes

### Dependencies
- `next/font/google`: Montserrat, Montserrat Alternates
- `next/image`: Background artwork, logos
- `@supabase/ssr`: Auth session management
- `@/libs/supabase/server.ts`: Server-side auth check

### Special Considerations
- The login page MUST be a Server Component; only `LoginButton` and `LanguageSelector` need `'use client'`
- Background image should use `priority` prop in next/image for LCP optimization
- Google branding guidelines should be reviewed for the custom-styled login button
- The language dropdown (frame 721:4942) is a separate component/overlay — not part of this screen's core implementation

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-09 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [x] Get detailed design items via list_design_items
- [x] Extract styles via list_frame_styles
- [ ] Implement login page following spec.md and design-style.md
- [ ] Discover remaining application screens
