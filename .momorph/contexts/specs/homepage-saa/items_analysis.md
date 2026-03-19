# Items Analysis - Homepage SAA (C1 ~ D1)

## Screen Context
- Screen Purpose: Trang chủ giới thiệu hệ thống giải thưởng Sun* Annual Awards và phong trào Sun* Kudos
- Target User Type: Nhân viên Sun* (Sunner)

---

### Item C1: Header Giải thưởng (`2167:9069`)

- hasChildren: true
- Name JP: 受賞セクションヘッダー
- Name Trans: Awards Section Header
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
Tiêu đề section giới thiệu hệ thống giải thưởng.

Purpose and Context
Khối tiêu đề phía trên danh sách giải thưởng; căn trái.

Display Elements:
  - Caption: Label – 'Sun* annual awards 2025' (Montserrat 24px/32px Bold; màu trắng #FFFFFF)
  - Đường gạch ngang trang trí (Rectangle) phía dưới caption
  - Title: Text – 'Hệ thống giải thưởng' (Montserrat 57px/64px Bold; màu vàng #FFEA9E; letter-spacing -0.25px)

Function & Logic:
  - Static: chỉ hiển thị thông tin; không tương tác
  - Responsive: Mobile text-3xl → Tablet text-4xl → Desktop text-[57px]

Candidate QA:

---

### Item C2: Award list (`5005:14974`)

- hasChildren: true
- Name JP: 受賞リスト
- Name Trans: Award List
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào thẻ giải hoặc 'Chi tiết' → điều hướng đến /awards kèm anchor (#slug) và cuộn mượt tới vị trí tương ứng
- Database Table: - (static data)
- Database Column: -
- Database Note: Dữ liệu lấy từ bảng award_categories; mỗi giải có slug dùng làm anchor

Validation Note:

Description:
Danh sách 6 hạng mục giải thưởng hiển thị dạng lưới thẻ.

Purpose and Context
Container chứa 6 thẻ giải thưởng; mỗi thẻ gồm ảnh; tiêu đề; mô tả; link 'Chi tiết'.

Display Elements:
  - Grid layout: 3 cột trên Desktop (lg); 2 cột trên Tablet (md); 1 cột trên Mobile
  - Mỗi thẻ gồm: Ảnh vuông (bo góc; viền vàng; hiệu ứng ánh sáng); Tiêu đề (Montserrat 24px/32px Regular #FFEA9E); Mô tả (Montserrat 16px/24px Regular #FFFFFF; tối đa 2 dòng; overflow hiển thị ...); Link 'Chi tiết' kèm icon arrow-up-right (Montserrat 16px/24px Medium #FFFFFF)
  - Hàng 1: Top Talent (ảnh: /images/homepage/Picture-Award-Talent.png); Top Project (ảnh: /images/homepage/Picture-Award-Project.png); Top Project Leader (ảnh: /images/homepage/Picture-Award-Leader.png)
  - Hàng 2: Best Manager (ảnh: /images/homepage/Picture-Award-Manager.png); Signature 2025 - Creator (ảnh: /images/homepage/Picture-Award-Signature.png); MVP (ảnh: /images/homepage/Picture-Award-MVP.png)

Function & Logic:
  - Click ảnh hoặc tiêu đề hoặc 'Chi tiết': điều hướng đến trang /awards kèm hashtag là slug của hạng mục (ví dụ: /awards#top-talent) để trình duyệt tự động cuộn mượt (smooth scroll) tới đúng vị trí chứa thông tin chi tiết
  - Hover: nâng nhẹ thẻ và viền/ánh sáng nổi bật
  - Responsive: Mobile 1 cột; Tablet 2 cột; Desktop 3 cột

Candidate QA:
- Slug cụ thể cho mỗi hạng mục giải thưởng cần xác nhận (top-talent; top-project; top-project-leader; best-manager; signature; mvp)

---

### Item C2.1: Top Talent Award (`2167:9075`)

- hasChildren: true
- Name JP: トップタレント賞
- Name Trans: Top Talent Award Card
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click → /awards#top-talent; cuộn mượt đến vị trí giải Top Talent
- Database Table: - (static data)
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thẻ hiển thị thông tin hạng mục giải thưởng 'Top Talent'.

Display Elements:
  - Ảnh: /images/homepage/Picture-Award-Talent.png (vuông; bo góc; viền vàng; hiệu ứng ánh sáng vòng)
  - Title: 'Top Talent' (Montserrat 24px/32px Regular; #FFEA9E)
  - Description: 'Vinh danh top cá nhân xuất sắc trên mọi phương diện' (Montserrat 16px/24px Regular; #FFFFFF; tối đa 2 dòng; overflow ...)
  - Link: 'Chi tiết' kèm icon arrow-up-right (Montserrat 16px/24px Medium; #FFFFFF)

Function & Logic:
  - Click ảnh/tiêu đề/'Chi tiết': mở /awards#top-talent; smooth scroll đến anchor tương ứng
  - Hover: nâng nhẹ và viền/ánh sáng nổi bật

Candidate QA:

---

### Item C2.2: Top Project Award (`2167:9076`)

- hasChildren: true
- Name JP: トッププロジェクト賞
- Name Trans: Top Project Award Card
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click → /awards#top-project; cuộn mượt đến vị trí giải Top Project
- Database Table: - (static data)
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thẻ hiển thị thông tin hạng mục giải thưởng 'Top Project'.

Display Elements:
  - Ảnh: /images/homepage/Picture-Award-Project.png
  - Title: 'Top Project' (Montserrat 24px/32px Regular; #FFEA9E)
  - Description: 'Vinh danh dự án xuất sắc trên mọi phương diện; dự án có doanh thu nổi bật' (Montserrat 16px/24px Regular; #FFFFFF; tối đa 2 dòng)
  - Link: 'Chi tiết' kèm icon arrow-up-right

Function & Logic:
  - Click ảnh/tiêu đề/'Chi tiết': mở /awards#top-project; smooth scroll
  - Hover: nâng nhẹ và viền/ánh sáng nổi bật

Candidate QA:

---

### Item C2.3: Top Project Leader Award (`2167:9077`)

- hasChildren: true
- Name JP: トッププロジェクトリーダー賞
- Name Trans: Top Project Leader Award Card
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click → /awards#top-project-leader; cuộn mượt
- Database Table: - (static data)
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thẻ hiển thị thông tin hạng mục 'Top Project Leader'.

Display Elements:
  - Ảnh: /images/homepage/Picture-Award-Leader.png
  - Title: 'Top Project Leader' (Montserrat 24px/32px Regular; #FFEA9E)
  - Description: 'Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá' (Montserrat 16px/24px Regular; #FFFFFF; tối đa 2 dòng)
  - Link: 'Chi tiết' kèm icon arrow-up-right

Function & Logic:
  - Click ảnh/tiêu đề/'Chi tiết': mở /awards#top-project-leader; smooth scroll
  - Hover: nâng nhẹ và viền/ánh sáng nổi bật

Candidate QA:

---

### Item C2.4: Best Manager Award (`2167:9079`)

- hasChildren: true
- Name JP: ベストマネージャー賞
- Name Trans: Best Manager Award Card
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click → /awards#best-manager; cuộn mượt
- Database Table: - (static data)
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thẻ hiển thị thông tin hạng mục 'Best Manager'.

Display Elements:
  - Ảnh: /images/homepage/Picture-Award-Manager.png
  - Title: 'Best Manager' (Montserrat 24px/32px Regular; #FFEA9E)
  - Description: 'Vinh danh người quản lý có năng lực quản lý tốt; dẫn dắt đội nhóm' (Montserrat 16px/24px Regular; #FFFFFF; tối đa 2 dòng)
  - Link: 'Chi tiết' kèm icon arrow-up-right

Function & Logic:
  - Click ảnh/tiêu đề/'Chi tiết': mở /awards#best-manager; smooth scroll
  - Hover: nâng nhẹ và viền/ánh sáng nổi bật

Candidate QA:

---

### Item C2.5: Signature 2025 - Creator Award (`2167:9080`)

- hasChildren: true
- Name JP: シグネチャー2025クリエイター賞
- Name Trans: Signature 2025 Creator Award Card
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click → /awards#signature; cuộn mượt
- Database Table: - (static data)
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thẻ hiển thị thông tin hạng mục 'Signature 2025 - Creator'.

Display Elements:
  - Ảnh: /images/homepage/Picture-Award-Signature.png
  - Title: 'Signature 2025 - Creator' (Montserrat 24px/32px Regular; #FFEA9E)
  - Description: 'Vinh danh người quản lý có năng lực quản lý tốt; dẫn dắt đội nhóm' (Montserrat 16px/24px Regular; #FFFFFF; tối đa 2 dòng)
  - Link: 'Chi tiết' kèm icon arrow-up-right

Function & Logic:
  - Click ảnh/tiêu đề/'Chi tiết': mở /awards#signature; smooth scroll
  - Hover: nâng nhẹ và viền/ánh sáng nổi bật

Candidate QA:

---

### Item C2.6: MVP Award (`2167:9081`)

- hasChildren: true
- Name JP: MVP賞
- Name Trans: MVP Award Card
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click → /awards#mvp; cuộn mượt
- Database Table: - (static data)
- Database Column: -
- Database Note: -

Validation Note:

Description:
Thẻ hiển thị thông tin hạng mục 'MVP (Most Valuable Person)'.

Display Elements:
  - Ảnh: /images/homepage/Picture-Award-MVP.png
  - Title: 'MVP (Most Valuable Person)' (Montserrat 24px/32px Regular; #FFEA9E)
  - Description: 'Vinh danh người quản lý có năng lực quản lý tốt; dẫn dắt đội nhóm' (Montserrat 16px/24px Regular; #FFFFFF; tối đa 2 dòng)
  - Link: 'Chi tiết' kèm icon arrow-up-right

Function & Logic:
  - Click ảnh/tiêu đề/'Chi tiết': mở /awards#mvp; smooth scroll
  - Hover: nâng nhẹ và viền/ánh sáng nổi bật

Candidate QA:

---

### Item D1: Sunkudos (`3390:10349`)

- hasChildren: true
- Name JP: Sun*Kudos セクション
- Name Trans: Sun* Kudos Section
- Item Type: others
- Item Subtype: card
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click 'Chi tiết' → điều hướng đến /kudos
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Khối quảng bá 'Sun* Kudos' với ảnh nền; nội dung chia 2 nửa; nút CTA.

Purpose and Context
Section giới thiệu phong trào ghi nhận Sun* Kudos trên trang chủ.

Display Elements:
  - Container: max-width 1120px; chiều cao 500px; border-radius 16px; căn giữa trang
  - Background: ảnh nền /images/homepage/kudos-bg.png (cover toàn bộ container bo tròn)
  - Nửa trái (Content):
    - Label: 'Phong trào ghi nhận' (Montserrat 24px/32px Bold; #FFFFFF)
    - Title: 'Sun* Kudos' (Montserrat 57px/64px Bold; #FFEA9E; letter-spacing -0.25px)
    - Sub-label: 'ĐIỂM MỚI CỦA SAA 2025' (uppercase; Montserrat 16px/24px Bold; #FFFFFF)
    - Description: đoạn mô tả về hoạt động ghi nhận (Montserrat 16px/24px Bold; #FFFFFF; text-align justify; letter-spacing 0.5px)
    - Button: 'Chi tiết' kèm icon arrow-up-right (Montserrat 16px/24px Bold; rounded 4px; nền vàng đặc #FFEA9E; chữ tối #00101A; hover: #E8D68E; active: #D4C27E)
  - Nửa phải:
    - Ảnh: /images/homepage/kudos.png (logo KUDOS lớn; căn chính giữa khung)

Function & Logic:
  - Click 'Chi tiết': điều hướng đến trang /kudos
  - Hover button: đổi màu nền nhẹ
  - Responsive: Mobile → xếp dọc (content trên; ảnh dưới); Desktop → chia 2 cột ngang

Candidate QA:

---

### Item D2: Content (`I3390:10349;313:8419`)

- hasChildren: true
- Name JP: Sun*Kudosコンテンツ
- Name Trans: Sun* Kudos Content Block
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
Khối nội dung bên trái của section Sun* Kudos.

Display Elements:
  - Label: 'Phong trào ghi nhận' (Montserrat 24px/32px Bold; #FFFFFF)
  - Title: 'Sun* Kudos' (Montserrat 57px/64px Bold; #FFEA9E; letter-spacing -0.25px)
  - Sub-label: 'ĐIỂM MỚI CỦA SAA 2025' (Montserrat 16px/24px Bold; #FFFFFF)
  - Paragraph: Mô tả chi tiết hoạt động (Montserrat 16px/24px Bold; #FFFFFF; text-align justify)
  - Button container: chứa nút 'Chi tiết'

Function & Logic:
  - Static text content; chỉ nút 'Chi tiết' có tương tác

Candidate QA:

---

### Item D2.1: Button-IC (`I3390:10349;313:8426`)

- hasChildren: false
- Name JP: 「詳細」ボタン
- Name Trans: Detail Button
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
- Transition Note: Click → điều hướng đến trang /kudos
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:

Description:
Nút 'Chi tiết' mở trang chi tiết Sun* Kudos.

Display Elements:
  - Text: 'Chi tiết' (Montserrat 16px/24px Medium; #FFFFFF)
  - Icon: arrow-up-right (bên phải text)
  - Background: nền vàng đặc #FFEA9E; rounded 4px; không viền

Function & Logic:
  - Click: điều hướng đến /kudos
  - Hover: đổi màu nền nhẹ hơn
  - State: luôn enabled

Candidate QA:
