# ACCESSING Test Cases: Dropdown-ngon-ngu

## ACC_001 - Component Visibility on Login Page
- **Objective:** Verify language dropdown is visible on the Login page
- **Precondition:** User is not logged in
- **Steps:** 1. Navigate to /login. 2. Observe the header area.
- **Expected:** Language dropdown is displayed in the header with VN flag and "VN" text.
- **Priority:** High

## ACC_002 - Component Visibility on Home Page (Authenticated)
- **Objective:** Verify language dropdown is visible on the Home page for authenticated users
- **Precondition:** User is logged in with valid session
- **Steps:** 1. Log in successfully. 2. Navigate to home page. 3. Observe the header area.
- **Expected:** Language dropdown is displayed in the header with current language flag and code.
- **Priority:** High

## ACC_003 - Component Visibility Across Pages
- **Objective:** Verify language dropdown is consistently available across all application pages
- **Precondition:** User is logged in
- **Steps:** 1. Navigate to home page, verify dropdown present. 2. Navigate to kudos page, verify dropdown present. 3. Navigate to awards page, verify dropdown present.
- **Expected:** Language dropdown is displayed in the header on all pages with consistent appearance.
- **Priority:** Medium

## ACC_004 - Component Availability After Session Expiry
- **Objective:** Verify language dropdown remains visible even when session expires
- **Precondition:** User's session has expired
- **Steps:** 1. Log in. 2. Wait for session to expire. 3. Refresh the page. 4. Observe header area.
- **Expected:** Language dropdown is still visible on the redirected login page.
- **Priority:** Medium

## ACC_005 - Language Dropdown Accessibility via Keyboard
- **Objective:** Verify language dropdown is reachable via keyboard Tab navigation
- **Precondition:** User is on any page with the language dropdown
- **Steps:** 1. Navigate to a page. 2. Press Tab key repeatedly to cycle through focusable elements.
- **Expected:** Language dropdown receives focus and shows a visible focus indicator.
- **Priority:** Medium
