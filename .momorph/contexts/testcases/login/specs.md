# Login Screen Specifications

## 1. Screen Overview

- **Screen Name:** Login
- **Frame ID:** 662:14387
- **File Key:** 9ypp4enmFmdK3YAFJLIu6C
- **Status:** spec
- **Description:** The Login screen for SAA 2025 (Sun Annual Awards 2025). It features a hero visual with a Google login button, a language selector, and branding elements. The primary authentication method is Google OAuth.

## 2. UI Elements

### A. Header (ID: 662:14391, Type: others/navigation)
- **A.1 Logo** (ID: I662:14391;186:2166): "Sun Annual Awards 2025" logo at the top-left corner. Non-interactive.
- **A.2 Language Selector** (ID: I662:14391;186:1601, Type: button/toggle): Displays current language "VN" with a flag icon and chevron arrow. Clicking opens a dropdown to select language. Navigates to frame "Dropdown-ngon-ngu" (721:4942).

### B. Hero Section (ID: 662:14393, Type: others/hero)
- **B.1 Key Visual** (ID: 662:14395): Background artwork/illustration covering the hero area. Displays "ROOT FURTHER" title.
- **B.2 Content** (ID: 662:14753, Type: others/info_block): Two text lines:
  - Line 1: "Bat dau hanh trinh cua ban cung SAA 2025."
  - Line 2: "Dang nhap de kham pha!"
- **B.3 Login Button** (ID: 662:14425, Type: button/icon_text): "LOGIN With Google" button with Google icon. Triggers Google OAuth flow. Shows loading state when processing. Disabled state appears dimmed and unresponsive.

### C. Key Visual Background (ID: 662:14388)
- Decorative background element.

### D. Footer (ID: 662:14447, Type: label)
- Displays copyright: "Ban quyen thuoc ve Sun* (c) 2025"
- Non-interactive, fixed at the bottom of the page.

## 3. Validation Rules

- No form input fields on this screen (login is via Google OAuth only).
- The Login button must be disabled during authentication processing.
- Authentication is handled by Supabase Auth with Google provider.
- Only users with valid Google accounts can authenticate.

## 4. User Interactions

| Element | Action | Behavior |
|---------|--------|----------|
| Login Button | Click | Opens Google OAuth authentication flow |
| Login Button | Hover | Slight elevation / shadow effect |
| Login Button | Processing | Button disabled, shows loading indicator |
| Language Selector | Click | Opens language dropdown (frame 721:4942) |
| Language Selector | Hover | Highlight effect, cursor change |
| Logo | - | Non-interactive |
| Footer | - | Non-interactive, fixed position |

## 5. Security Considerations

- Authentication via Supabase Auth (Google OAuth) only.
- No credentials stored client-side (OAuth flow handles tokens).
- Session management via middleware (cookie-based).
- CSRF protection via Next.js server actions.
- Protected routes require valid authentication state.
- RLS (Row Level Security) enforced on all database tables.
