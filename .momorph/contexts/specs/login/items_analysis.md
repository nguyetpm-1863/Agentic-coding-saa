# Items Analysis - Login

## Screen Context
- Screen Purpose: Login screen for the SAA 2025 (Sun Annual Awards) application. Single authentication method via Google OAuth through Supabase Auth.
- Target User Type: Visitor / Unauthenticated user (IT, Digital service)

---

### Item 1: Keyvisual (`662:14388`)

- hasChildren: false
- Name JP: キービジュアル背景
- Name Trans: Key Visual Background
- Item Type: others
- Item Subtype: background_image
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Full-screen decorative background image for the login page. Purely visual; provides the artistic identity for the SAA 2025 event.

Display Elements:
  - Image: Full-bleed artwork covering the entire page behind all other content
  - Gradient overlays: Left-to-right and bottom gradients layered on top to ensure text readability

Function & Logic:
  - No interaction. Decorative only.
  - Image MUST have empty alt="" attribute for accessibility.
  - State: Always visible; static.

Candidate QA:

---

### Item 2: Header (`662:14391`)

- hasChildren: true
- Name JP: ヘッダー
- Name Trans: Header
- Item Type: others
- Item Subtype: navigation
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Fixed semi-transparent navigation bar at the top of the login page containing the SAA logo and language selector.

Display Elements:
  - Logo (A.1): SAA 2025 logo image; top-left
  - Language Selector (A.2): "VN" text with flag icon and chevron; top-right
  - Children: A.1 (Logo); A.2 (Language)

Function & Logic:
  - Container only. No direct interaction on the header bar itself.
  - State: Fixed position; always visible on scroll.

Candidate QA:

---

### Item 3: Bìa (`662:14393`)

- hasChildren: true
- Name JP: ヒーローセクション
- Name Trans: Hero Section
- Item Type: others
- Item Subtype: hero
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Main hero section of the login page. Contains the "ROOT FURTHER" branding; descriptive text; and the Google login button.

Display Elements:
  - Key Visual (B.1): "ROOT FURTHER" brand title image
  - Content (B.2): Two lines of descriptive text
  - Login Button (B.3): "LOGIN With Google" button with Google icon
  - Children: B.1 (Key Visual); B.2 (Content); B.3 (Login Button)

Function & Logic:
  - Container only. Arranges child elements vertically on the left side of the page.
  - State: Static layout container.

Candidate QA:

---

### Item 4: Key Visual (`662:14395`)

- hasChildren: false
- Name JP: ルートファーザーロゴ
- Name Trans: ROOT FURTHER Logo
- Item Type: others
- Item Subtype: hero_banner
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Hero brand image displaying "ROOT FURTHER" text as the event tagline.

Display Elements:
  - Image: "ROOT FURTHER" logo/title (451x200px)

Function & Logic:
  - No interaction. Static display.
  - Image should be loaded with priority (above-the-fold).
  - State: Always visible.

Candidate QA:

---

### Item 5: content (`662:14753`)

- hasChildren: false
- Name JP: ヒーロー説明文
- Name Trans: Hero Description Text
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Short descriptive text in the hero section inviting the user to log in and explore SAA 2025.

Display Elements:
  - Line 1: Label - "Bắt đầu hành trình của bạn cùng SAA 2025."
  - Line 2: Label - "Đăng nhập để khám phá!"

Function & Logic:
  - No interaction. Static text display.
  - Text MUST be translatable (i18n keys: login.description_line1; login.description_line2).

Candidate QA:

---

### Item 6: Login (`662:14425`)

- hasChildren: false
- Name JP: Googleログインボタン
- Name Trans: Login With Google Button
- Item Type: button
- Item Subtype:
- Button Type: icon_text
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Initiates Google OAuth flow via Supabase Auth. On success redirects to homepage or return URL. On failure redirects to /login?error=<error_code>.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Primary call-to-action button for authentication. Triggers Google OAuth flow through Supabase Auth.

Display Elements:
  - Text: "LOGIN With Google"
  - Icon: Google "G" logo (right side of text)

Function & Logic:
  - Click: Initiates Google OAuth flow via Supabase Auth; redirects to Google consent screen.
  - Loading state: Button becomes disabled and shows a spinner icon while OAuth is in progress. Prevents duplicate requests.
  - Error state: If OAuth fails (user denies consent; network error; unauthorized account); system redirects to /login?error=<error_code> and displays error message below button. Button re-enables for retry. Error auto-dismisses after 5 seconds.
  - Success state: After successful OAuth; system creates/updates session and redirects to authenticated home page (or return URL if provided via ?next= parameter).
  - State: Disabled with spinner when processing. Re-enabled on error or page reload.

Candidate QA:
- What is the exact loading spinner design (icon; animation)?
- What are the specific error messages for each OAuth failure type (denied consent; network error; unauthorized account)?

---

### Item 7: Footer (`662:14447`)

- hasChildren: false
- Name JP: フッター
- Name Trans: Footer
- Item Type: label
- Item Subtype:
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Copyright footer fixed at the bottom of the login page.

Display Elements:
  - Text: "Bản quyền thuộc về Sun* © 2025"
  - Border: Top border separating footer from content

Function & Logic:
  - No interaction. Static display.
  - Text MUST be translatable (i18n key: footer.copyright).
  - State: Always visible; fixed at bottom.

Candidate QA:

---

### Item 8: Logo (`I662:14391;186:2166`)

- hasChildren: false
- Name JP: SAAロゴ
- Name Trans: SAA 2025 Logo
- Item Type: others
- Item Subtype: logo
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Sun Annual Awards 2025 logo displayed in the top-left corner of the header.

Display Elements:
  - Image: SAA 2025 logo icon and text

Function & Logic:
  - No interaction. Static display.
  - State: Always visible.

Candidate QA:

---

### Item 9: Language (`I662:14391;186:1601`)

- hasChildren: false
- Name JP: 言語セレクター
- Name Trans: Language Selector
- Item Type: button
- Item Subtype:
- Button Type: toggle
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value: VN
- User Action: on_click
- Transition Note: Click opens language dropdown (linked frame: 721:4942 Dropdown-ngôn ngữ). Selecting a language updates all translatable text on the page and persists preference in cookie.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Purpose and Context
Language selector button in the top-right corner of the header. Allows users to switch application language.

Display Elements:
  - Flag Icon: Vietnam flag (small; left side)
  - Text: "VN" (current language code)
  - Chevron: Down arrow icon (right side)

Function & Logic:
  - Click: Opens dropdown with available language options (linked to frame 721:4942).
  - Hover: Highlight effect and cursor change.
  - Keyboard: Enter/Space opens dropdown. Escape closes.
  - Dropdown uses role="listbox" with aria-expanded attribute.
  - Selected language persists across sessions via cookie (locale).
  - State: Default shows current language. Active/expanded when dropdown is open.

Candidate QA:
- What languages are available in the dropdown besides Vietnamese?
