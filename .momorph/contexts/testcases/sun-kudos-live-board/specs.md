# Sun* Kudos - Live Board - Specification

## 1. Screen Overview
- **Screen Name:** Sun* Kudos - Live Board
- **Purpose:** Main dashboard for the Kudos system where users can send appreciation messages (kudos) to colleagues, view highlighted kudos, see a spotlight word cloud of all recipients, browse all kudos in a feed, and check personal stats.
- **User Access:** Authenticated users only (redirects to /login if unauthenticated)
- **Navigation:** Accessible via /kudos route, linked from main navigation header ("Kudos" nav item)

## 2. UI Elements

### 2.1 KV Kudos (Banner Hero) [A]
- **Type:** Hero banner (others)
- **Label:** "Hệ thống ghi nhận lời cảm ơn"
- **Description:** Banner at top of page with title and SAA 2025 KUDOS logo. Decorative background graphics.
- **Placeholder:** N/A
- **Default Value:** N/A
- **Position:** Top of page, full width

### 2.2 Button ghi nhận (Recognition Input) [A.1]
- **Type:** text_form (pill-shaped input)
- **Label:** Placeholder: "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
- **Description:** Click opens the send kudos dialog. All kudos sent are stored in database.
- **Placeholder:** "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
- **Default Value:** N/A
- **Position:** Inside hero banner area
- **Function:** Click → Opens send kudos dialog

### 2.3 Highlight Section [B]
- **Type:** Section container (others)
- **Description:** Section displaying top highlighted kudos (most liked). Contains header with subtitle, title, filters, and carousel.

### 2.3.1 Highlight Header [B.1]
- **Type:** Header container
- **Description:** Contains subtitle "Sun* Annual Awards 2025", divider line (#2E3940), title "HIGHLIGHT KUDOS", and filter buttons on same row as title.

### 2.3.2 ButtonHashtag [B.1.1]
- **Type:** button
- **Description:** Opens hashtag dropdown filter. Hashtag list queried from database.
- **Function:** Click → Opens dropdown list of hashtags for filtering
- **Navigation:** Opens Dropdown list hashtag

### 2.3.3 Button Phòng ban [B.1.2]
- **Type:** button
- **Description:** Opens department dropdown filter. Department list queried from database.
- **Function:** Click → Opens dropdown list of departments for filtering
- **Navigation:** Opens Dropdown Phòng ban

### 2.3.4 HIGHLIGHT KUDOS Carousel [B.2]
- **Type:** Carousel container (others)
- **Description:** Carousel displaying 5 kudo cards with most hearts. Center card is larger (scale 1.0), adjacent cards scale 0.85, far cards scale 0.75. Left/right fade gradients. 24px gap between cards.

### 2.3.5 Button tiến (Next) [B.2.2]
- **Type:** button
- **Description:** Forward navigation button in carousel.
- **Function:** Click → Slide to next item. Disabled at last page.

### 2.3.6 Button lùi (Previous) [B.2.1]
- **Type:** button
- **Description:** Back navigation button in carousel.
- **Function:** Click → Slide to previous card. Disabled at first page (page 1).

### 2.3.7 Pagination [B.5]
- **Type:** Pagination controls
- **Description:** Shows current page and total (e.g., "2/5"). Left/right arrows, page indicator.
- **Display:** Active page number: gold (#FFEA9E), 32px bold. Total: 16px, white/60%.

### 2.3.8 KUDO Highlight Card [B.3]
- **Type:** Card (others)
- **Description:** Kudo card in carousel showing:
  - Left: Sender info (avatar, name, department, star count)
  - Right: Receiver info (avatar, name, department, title/danh hiệu)
  - Arrow icon between sender and receiver
  - Divider line (#FFEA9E)
  - Awarded title/danh hiệu (from the send kudos form)
  - Appreciation message (max 3 lines, truncated with "...")
  - Hashtag list
  - Divider line (#FFEA9E)
  - Like count (can like/unlike), Copy link button, View detail link
- **Sub-elements:**
  - B.3.1 Avatar người gửi: Click → profile; Hover → preview popup
  - B.3.2 Thông tin người gửi: Name, department, star count; Click name → profile
  - B.3.4 Icon mũi tên: Non-interactive arrow icon
  - B.3.5 Avatar người nhận: Click → profile; Hover → preview popup
  - B.3.6 Thông tin người nhận: Name, department, title; Click name → profile
  - B.4.1 Thời gian đăng: Format "HH:mm - MM/DD/YYYY"
  - B.4.2 Nội dung: Max 3 lines, truncated with "..."
  - B.4.3 Hashtag: List of hashtags (e.g., "#Dedicated #Inspiring...")
  - B.4.4 Action bar: Like count, Copy link, View detail

### 2.4 Spotlight Board Section [B.7, B.6]
- **Type:** Section with word cloud
- **Description:** Interactive board displaying recipient names as a word cloud/diagram.

### 2.4.1 Header Giải thưởng (Spotlight) [B.6]
- **Type:** Header
- **Description:** Section header with "Sun* Annual Awards 2025" subtitle + divider + "SPOTLIGHT" title

### 2.4.2 Spotlight Canvas [B.7]
- **Type:** Interactive canvas
- **Description:** Word cloud area with scattered user names. Background: spotlight-bg.png (bottom layer) + image-bg.png (top layer, opacity 0.3). Container: rounded-[47px], border #998C5F, min-height 548px.
- **Display:** Names scattered in grid-based positions with jitter to avoid overlap. Font: Montserrat 7.94px bold, line-height 6.36px, letter-spacing 0.21px. Opacity varies by kudos count (0.4 to 1.0).

### 2.4.3 Tìm kiếm sunner (Search) [B.7.3]
- **Type:** text_form
- **Description:** Search input to find Sunner profiles. Top-left of spotlight board.
- **Placeholder:** "Tìm kiếm"
- **Function:** Type → Search and highlight matching profiles on the board

### 2.4.4 Pan zoom [B.7.2]
- **Type:** button
- **Description:** Toggle between pan and zoom modes on Spotlight board.
- **Function:** Click → Toggle pan/zoom mode

### 2.4.5 388 KUDOS Counter [B.7.1]
- **Type:** label
- **Description:** Displays total kudos count prominently at top center. Font: 48px bold white.

### 2.4.6 Latest Kudo Notification
- **Type:** label (bottom-left of spotlight)
- **Description:** Shows latest kudo received, e.g., "08:30PM Nguyễn Bá Chức đã nhận được một Kudos mới". Font: Montserrat 14px bold, white/70%.

### 2.5 ALL KUDOS Section [C]
- **Type:** Section container
- **Description:** Feed of all kudos with stats sidebar on the right.

### 2.5.1 Header Giải thưởng (All Kudos) [C.1]
- **Type:** Header
- **Description:** "Sun* Annual Awards 2025" subtitle + divider (#2E3940) + "ALL KUDOS" title

### 2.5.2 Danh sách lời cảm ơn (Kudos Feed) [C.2]
- **Type:** Feed/list (others)
- **Description:** List of kudo cards showing appreciation messages and metadata. Infinite scroll with "Load more" cursor-based pagination.

### 2.5.3 KUDO Post Card [C.3]
- **Type:** Card (others)
- **Description:** Individual kudo post in feed showing:
  - Sender info (avatar, name, department, star count) [C.3.1]
  - Icon sent arrow [C.3.2]
  - Receiver info (avatar, name, department, title) [C.3.3]
  - Time posted (format: HH:mm - MM/DD/YYYY) [C.3.4]
  - Content (max 5 lines, truncated "...") [C.3.5]
  - Attached images (thumbnails in horizontal row) [C.3.6]
  - Hashtags [C.3.7]
  - Action bar [C.4]:
    - Hearts button (like/unlike, shows count) [C.4.1]
    - Copy link button [C.4.2]
    - View detail link
- **States:**
  - Heart: gray when not liked, colored when liked
  - Content: truncated at 5 lines with "..."
  - Images: horizontal thumbnails, click to expand

### 2.5.4 Hashtag Button (in post) [D.4]
- **Type:** button
- **Description:** Tag/hashtag in a kudo post. Click → Filters feed to show only kudos with that hashtag.

### 2.6 Stats Sidebar [D]
- **Type:** Sidebar container
- **Description:** Right sidebar with statistics and top receivers list. Sticky positioning.

### 2.6.1 Thống kê tổng quat (Stats Overview) [D.1]
- **Type:** Card (others)
- **Description:** Overview of user's kudos and secret box stats. Contains 6 stat rows:
  - Số Kudos bạn nhận được: [value] [D.1.2]
  - Số Kudos bạn đã gửi: [value] [D.1.3]
  - Số tim bạn nhận được: [value] [D.1.4]
  - Divider line [D.1.5]
  - Số Secret Box bạn đã mở: [value] [D.1.6]
  - Số Secret Box chưa mở: [value] [D.1.7]
  - Button "Mở quà" [D.1.8]

### 2.6.2 Button mở quà (Open Gift) [D.1.8]
- **Type:** button
- **Description:** Opens secret box dialog.
- **Function:** Click → Opens "Open Secret Box" dialog
- **Navigation:** Opens "Open secret box- chưa mở" dialog

### 2.6.3 10 SUNNER nhận quà (Top Receivers Leaderboard) [D.3]
- **Type:** Card/list (others)
- **Description:** Displays top 10 Sunners who received gifts most recently. Shows avatar, name, "Đã nhận ticket". Sticky with stats sidebar, scrollable if too tall (overflow-y: auto).
- **Sub-elements:**
  - D.3.1 Title: "10 SUNNER NHẬN QUÀ MỚI NHẤT"
  - D.3.2-D.3.6 Individual sunner rows: avatar (colored border), name (gold), "Đã nhận ticket" label

## 3. Validation Rules

### 3.1 Button ghi nhận (A.1)
- **Required:** Yes (must click to open form)
- **Format:** N/A (click-to-open)
- **Error Message:** N/A

### 3.2 Tìm kiếm sunner (B.7.3)
- **Required:** No
- **Format:** String (free text search)
- **Min Length:** N/A
- **Max Length:** N/A
- **Error Message:** N/A

### 3.3 Hearts Button (C.4.1)
- **Required:** No
- **States:** Not liked (gray heart) / Liked (colored heart)
- **Toggle behavior:** Click toggles like/unlike, updates count

### 3.4 Hashtag Filter (B.1.1)
- **Required:** No
- **Format:** Select from dropdown list
- **Behavior:** Selecting a hashtag filters highlighted kudos

### 3.5 Department Filter (B.1.2)
- **Required:** No
- **Format:** Select from dropdown list
- **Behavior:** Selecting a department filters highlighted kudos

## 4. User Interactions

### 4.1 Open Send Kudos Dialog
- **Element:** Button ghi nhận (A.1)
- **Trigger:** Click
- **Expected Behavior:** Opens the send kudos form dialog
- **Success State:** Dialog opens with form fields

### 4.2 Filter by Hashtag
- **Element:** ButtonHashtag (B.1.1)
- **Trigger:** Click
- **Expected Behavior:** Opens hashtag dropdown, selecting filters the highlight carousel
- **Success State:** Carousel shows only kudos matching selected hashtag

### 4.3 Filter by Department
- **Element:** Button Phòng ban (B.1.2)
- **Trigger:** Click
- **Expected Behavior:** Opens department dropdown, selecting filters the highlight carousel
- **Success State:** Carousel shows only kudos from selected department

### 4.4 Navigate Carousel (Next)
- **Element:** Button tiến (B.2.2) or Pagination next (B.5.3)
- **Trigger:** Click
- **Expected Behavior:** Slides carousel to next card
- **Disabled State:** At last page, button is disabled

### 4.5 Navigate Carousel (Previous)
- **Element:** Button lùi (B.2.1) or Pagination prev (B.5.1)
- **Trigger:** Click
- **Expected Behavior:** Slides carousel to previous card
- **Disabled State:** At first page, button is disabled

### 4.6 Like/Unlike Kudo
- **Element:** Hearts button (C.4.1)
- **Trigger:** Click
- **Expected Behavior:** Toggles like state, updates like count
- **States:** Gray (not liked) → Colored (liked), count +1 / -1

### 4.7 Copy Link
- **Element:** Copy link button (C.4.2)
- **Trigger:** Click
- **Expected Behavior:** Copies kudo URL to clipboard, shows toast confirmation

### 4.8 View Kudo Detail
- **Element:** View detail link in action bar
- **Trigger:** Click
- **Expected Behavior:** Navigates to kudo detail page

### 4.9 View Profile (Hover)
- **Element:** Avatar of sender/receiver (B.3.1, B.3.5, C.3.1, C.3.3)
- **Trigger:** Hover
- **Expected Behavior:** Shows preview popup of user profile

### 4.10 View Profile (Click)
- **Element:** Avatar or name of sender/receiver
- **Trigger:** Click
- **Expected Behavior:** Navigates to user profile page

### 4.11 Search Sunner
- **Element:** Tìm kiếm sunner (B.7.3)
- **Trigger:** Type in search input
- **Expected Behavior:** Searches and highlights matching profiles on spotlight board

### 4.12 Pan/Zoom Toggle
- **Element:** Pan zoom (B.7.2)
- **Trigger:** Click
- **Expected Behavior:** Toggles between pan and zoom modes on spotlight board

### 4.13 Open Secret Box
- **Element:** Button mở quà (D.1.8)
- **Trigger:** Click
- **Expected Behavior:** Opens secret box dialog
- **Condition:** Enabled when user has unopened secret boxes

### 4.14 Filter by Hashtag (in Feed)
- **Element:** Hashtag button in kudo post (D.4)
- **Trigger:** Click
- **Expected Behavior:** Filters the feed to show only kudos with that hashtag

### 4.15 Load More Kudos
- **Element:** Scroll / Load more in feed
- **Trigger:** Scroll to bottom or click load more
- **Expected Behavior:** Loads next batch of kudos (cursor-based pagination)

## 5. Security Considerations
- Authentication required: unauthenticated users redirect to /login
- Session managed via Supabase Auth with cookie-based session
- Row Level Security (RLS) on all tables
- Like/unlike requires authenticated user
- Copy link copies public URL (kudo detail page)
- Search input should be sanitized before query
