# Items Analysis - Hệ thống giải (Part 1)

**Screen:** Hệ thống giải
**Frame ID:** 313:8436
**File Key:** 9ypp4enmFmdK3YAFJLIu6C

---

## Item 313:8437 (no=3) - Keyvisual

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | キービジュアル |
| Name Trans | Keyvisual |
| Item Type | others |
| Item Subtype | banner |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Banner chính hiển thị artwork và tiêu đề chiến dịch cho trang Hệ thống giải thưởng.

Display Elements:
  - Ảnh nền: Sử dụng public/images/awards/keyvisual-award-bg.png, hiển thị full width với gradient overlay phía dưới
  - Ảnh ROOT: public/images/homepage/root-text.png, hiển thị bên trái phía trên
  - Ảnh FURTHER: public/images/homepage/further-text.png, hiển thị bên trái dưới ảnh ROOT
  - Text phụ: "Sun* Annual Awards 2025" ở giữa phía dưới
  - Tiêu đề trang: "Hệ thống giải thưởng SAA 2025" - text lớn, màu vàng, phía dưới text phụ
  - Đường line ngang: ngăn cách giữa text phụ và tiêu đề trang, cách trên dưới 16px

Function & Logic:
  - Tĩnh, không có hành vi click
  - Áp dụng đa ngôn ngữ cho text "Sun* Annual Awards 2025" và "Hệ thống giải thưởng SAA 2025"

**Candidate QA:**
1. Ảnh nền banner có hiển thị đúng full width và crop center không?
2. Gradient overlay có che phủ đúng phần dưới banner không?
3. Text "Sun* Annual Awards 2025" và "Hệ thống giải thưởng SAA 2025" có hiển thị đúng vị trí và đa ngôn ngữ không?
4. Đường line giữa text phụ và tiêu đề có hiển thị đúng không?
5. Banner hiển thị responsive trên các breakpoint (mobile, tablet, desktop) như thế nào?

---

## Item 313:8453 (no=A) - Title hệ thống giải thưởng

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | 受賞システムタイトル |
| Name Trans | Title hệ thống giải thưởng |
| Item Type | label |
| Item Subtype | heading |
| Button Type | - |
| Data Type | string |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | "Sun* annual awards 2025" / "Hệ thống giải thưởng SAA 2025" |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Tiêu đề phần giới thiệu hệ thống giải thưởng SAA 2025, nằm phía dưới banner.

Display Elements:
  - Text phụ: "Sun* annual awards 2025" - cỡ nhỏ, màu nhạt
  - Tiêu đề chính: "Hệ thống giải thưởng SAA 2025" - cỡ lớn, màu vàng

Function & Logic:
  - Tĩnh, không interactive
  - Áp dụng đa ngôn ngữ cho cả hai dòng text

**Candidate QA:**
1. Hai dòng text hiển thị đúng nội dung và đa ngôn ngữ khi chuyển ngôn ngữ không?
2. Trên mobile, tiêu đề có wrap đúng cách và vẫn đọc được không?

---

## Item 313:8458 (no=B) - Hệ thống giải thưởng

| Field | Value |
|-------|-------|
| hasChildren | Yes |
| Name JP | 受賞システム |
| Name Trans | Hệ thống giải thưởng |
| Item Type | others |
| Item Subtype | section-container |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Cuộn trang, click sidebar |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Container chứa toàn bộ phần nội dung hệ thống giải thưởng, bố cục 2 cột.

Display Elements:
  - Sidebar trái: Danh sách anchor link (rộng 178px), sticky khi cuộn
  - Content phải: Các khối thông tin giải thưởng xếp dọc, ngăn cách bằng khoảng cách + đường line

Function & Logic:
  - Click mục sidebar trái -> cuộn smooth đến section giải tương ứng bên phải
  - Sidebar sticky theo scroll, tự động highlight mục đang trong viewport

**Candidate QA:**
1. Bố cục 2 cột (sidebar + content) có hiển thị đúng tỷ lệ không?
2. Sidebar có sticky đúng khi cuộn trang không?
3. Trên mobile, sidebar có chuyển thành dạng khác (horizontal hoặc ẩn) không?
4. Các khối giải thưởng có ngăn cách đúng bằng khoảng cách + đường line không?

---

## Item 313:8459 (no=C) - Menu list

| Field | Value |
|-------|-------|
| hasChildren | Yes |
| Name JP | メニューリスト |
| Name Trans | Menu list |
| Item Type | others |
| Item Subtype | navigation |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Mục đầu tiên (Top Talent) active |
| User Action | Click chọn mục |
| Transition Note | Cuộn smooth đến section tương ứng |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Sidebar điều hướng dọc chứa danh sách 6 hạng mục giải thưởng.

Display Elements:
  - 6 mục: "Top Talent", "Top Project", "Top Project Leader", "Best Manager", "Signature 2025 Creator", "MVP"
  - Mỗi mục có icon target phía trước + text tên giải
  - Trạng thái active: text vàng + underline
  - Trạng thái mặc định: text trắng, không underline
  - Khối rộng 178px, content page 121px

Function & Logic:
  - Click mục -> cuộn smooth đến section giải tương ứng
  - Khi user cuộn trang, mục tương ứng section đang hiển thị trong viewport tự động active
  - Hover: highlight mục

**Candidate QA:**
1. Click từng mục có cuộn smooth đến đúng section tương ứng không?
2. Khi cuộn trang thủ công, mục active trong sidebar có tự động cập nhật theo section đang hiển thị không?
3. Chỉ có 1 mục active tại một thời điểm?
4. Trên mobile/tablet, sidebar navigation hiển thị như thế nào?
5. Tất cả text mục có áp dụng đa ngôn ngữ không?

---

## Item 313:8460 (no=C.1) - Top Talent (nav item)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | トップタレント（ナビ） |
| Name Trans | Top Talent (nav item) |
| Item Type | others |
| Item Subtype | anchor-link |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Active (mặc định khi vào trang) |
| User Action | Click |
| Transition Note | Cuộn đến section Top Talent |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Mục điều hướng "Top Talent" trong sidebar, là mục đầu tiên và mặc định active.

Display Elements:
  - Icon target + text "Top Talent"
  - Trạng thái active: text vàng + underline
  - Trạng thái mặc định: text trắng

Function & Logic:
  - Click -> cuộn smooth đến section Top Talent
  - Mặc định active khi vào trang

**Candidate QA:**
1. Mục này có mặc định active khi load trang không?
2. Click có cuộn đúng đến section Top Talent không?

---

## Item 313:8461 (no=C.2) - Top Project (nav item)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | トッププロジェクト（ナビ） |
| Name Trans | Top Project (nav item) |
| Item Type | others |
| Item Subtype | anchor-link |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Inactive |
| User Action | Click |
| Transition Note | Cuộn đến section Top Project |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Mục điều hướng "Top Project" trong sidebar.

Display Elements:
  - Icon target + text "Top Project"

Function & Logic:
  - Click -> cuộn smooth đến section Top Project

**Candidate QA:**
1. Click có cuộn đúng đến section Top Project không?

---

## Item 313:8462 (no=C.3) - Top Project Leader (nav item)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | トッププロジェクトリーダー（ナビ） |
| Name Trans | Top Project Leader (nav item) |
| Item Type | others |
| Item Subtype | anchor-link |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Inactive |
| User Action | Click |
| Transition Note | Cuộn đến section Top Project Leader |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Mục điều hướng "Top Project Leader" trong sidebar.

Display Elements:
  - Icon target + text "Top Project Leader"

Function & Logic:
  - Click -> cuộn smooth đến section Top Project Leader

**Candidate QA:**
1. Click có cuộn đúng đến section Top Project Leader không?

---

## Item 313:8463 (no=C.4) - Best Manager (nav item)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | ベストマネージャー（ナビ） |
| Name Trans | Best Manager (nav item) |
| Item Type | others |
| Item Subtype | anchor-link |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Inactive |
| User Action | Click |
| Transition Note | Cuộn đến section Best Manager |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Mục điều hướng "Best Manager" trong sidebar.

Display Elements:
  - Icon target + text "Best Manager"

Function & Logic:
  - Click -> cuộn smooth đến section Best Manager

**Candidate QA:**
1. Click có cuộn đúng đến section Best Manager không?

---

## Item 313:8464 (no=C.5) - Signature 2025 Creator (nav item)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | シグネチャー2025クリエイター（ナビ） |
| Name Trans | Signature 2025 Creator (nav item) |
| Item Type | others |
| Item Subtype | anchor-link |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Inactive |
| User Action | Click |
| Transition Note | Cuộn đến section Signature 2025 Creator |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Mục điều hướng "Signature 2025 Creator" trong sidebar.

Display Elements:
  - Icon target + text "Signature 2025 Creator"

Function & Logic:
  - Click -> cuộn smooth đến section Signature 2025 Creator

**Candidate QA:**
1. Click có cuộn đúng đến section Signature 2025 Creator không?

---

## Item 313:8465 (no=C.6) - MVP (nav item)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | MVP（ナビ） |
| Name Trans | MVP (nav item) |
| Item Type | others |
| Item Subtype | anchor-link |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | Inactive |
| User Action | Click |
| Transition Note | Cuộn đến section MVP |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Mục điều hướng "MVP" trong sidebar, là mục cuối cùng.

Display Elements:
  - Icon target + text "MVP"

Function & Logic:
  - Click -> cuộn smooth đến section MVP

**Candidate QA:**
1. Click có cuộn đúng đến section MVP không?

---

## Item 313:8467 (no=D.1) - Top Talent (award block)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | トップタレント（受賞ブロック） |
| Name Trans | Top Talent (khối giải thưởng) |
| Item Type | others |
| Item Subtype | award-card |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Khối thông tin chi tiết giải thưởng Top Talent - giải đầu tiên trong danh sách. Sử dụng common component: ảnh bên trái, nội dung bên phải.

Display Elements:
  - Ảnh bên trái: Huy hiệu "TOP TALENT" trong quả cầu vàng
  - Bên phải - Tiêu đề: Icon + "Top Talent"
  - Bên phải - Mô tả: Đoạn văn giới thiệu giải (text tĩnh, đa ngôn ngữ)
  - Đường line ngăn cách
  - Số lượng giải thưởng: Icon + "Số lượng giải thưởng:" + "10" (số lớn) + "Cá nhân"
  - Đường line ngăn cách
  - Giá trị giải thưởng: Icon + "Giá trị giải thưởng:"
  - Số tiền: "7.000.000 VNĐ" (text lớn, nổi bật)
  - Ghi chú: "cho mỗi giải thưởng"

Function & Logic:
  - Tĩnh, hiển thị text tĩnh
  - Áp dụng đa ngôn ngữ cho tất cả text (tiêu đề, mô tả, label, đơn vị)
  - Là section target cho anchor link "Top Talent" trong sidebar

**Candidate QA:**
1. Layout ảnh trái + content phải có đúng theo design không?
2. Số lượng "10 Cá nhân" và giá trị "7.000.000 VNĐ" có hiển thị đúng không?
3. Tất cả text có áp dụng đa ngôn ngữ khi chuyển ngôn ngữ không?
4. Đường line ngăn cách giữa các phần có hiển thị đúng không?
5. Trên mobile, layout ảnh + content có stack dọc không?
6. Section này có đúng là target khi click "Top Talent" trong sidebar không?

---

## Item 313:8468 (no=D.2) - Top Project (award block)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | トッププロジェクト（受賞ブロック） |
| Name Trans | Top Project (khối giải thưởng) |
| Item Type | others |
| Item Subtype | award-card |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Khối thông tin chi tiết giải thưởng Top Project. Sử dụng common component với layout đảo ngược: nội dung bên trái, ảnh bên phải (alternating).

Display Elements:
  - Bên trái - Tiêu đề: Icon + "Top Project"
  - Bên trái - Mô tả: Đoạn văn giới thiệu giải (text tĩnh, đa ngôn ngữ)
  - Ảnh bên phải: Huy hiệu "TOP PROJECT" trong quả cầu vàng
  - Số lượng giải thưởng: Icon + "Số lượng giải thưởng:" + "02" + "Tập thể"
  - Giá trị giải thưởng: Icon + "Giá trị giải thưởng:"
  - Số tiền: "15.000.000 VNĐ"
  - Ghi chú: "cho mỗi giải thưởng"

Function & Logic:
  - Tĩnh, hiển thị text tĩnh
  - Áp dụng đa ngôn ngữ
  - Là section target cho anchor link "Top Project"
  - Layout alternating: content trái, ảnh phải (ngược với D.1)

**Candidate QA:**
1. Layout có đảo ngược đúng so với D.1 (content trái, ảnh phải) không?
2. Số lượng "02 Tập thể" và giá trị "15.000.000 VNĐ" có đúng không?
3. Đường line ngăn cách với section trước (D.1) có hiển thị đúng không?
4. Tất cả text có áp dụng đa ngôn ngữ không?

---

## Item 313:8469 (no=D.3) - Top Project Leader (award block)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | トッププロジェクトリーダー（受賞ブロック） |
| Name Trans | Top Project Leader (khối giải thưởng) |
| Item Type | others |
| Item Subtype | award-card |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Khối thông tin chi tiết giải thưởng Top Project Leader. Sử dụng common component: ảnh bên trái, nội dung bên phải.

Display Elements:
  - Ảnh bên trái: Huy hiệu "TOP PROJECT LEADER" trong quả cầu vàng
  - Bên phải - Tiêu đề: Icon + "Top Project Leader"
  - Bên phải - Mô tả: Đoạn văn giới thiệu giải (text tĩnh, đa ngôn ngữ)
  - Số lượng giải thưởng: Icon + "Số lượng giải thưởng:" + "03" + "Cá nhân"
  - Giá trị giải thưởng: Icon + "Giá trị giải thưởng:"
  - Số tiền: "7.000.000 VNĐ"
  - Ghi chú: "cho mỗi giải thưởng"

Function & Logic:
  - Tĩnh, hiển thị text tĩnh
  - Áp dụng đa ngôn ngữ
  - Là section target cho anchor link "Top Project Leader"
  - Layout: ảnh trái, content phải (giống D.1)

**Candidate QA:**
1. Layout ảnh trái + content phải có đúng (giống D.1, ngược D.2) không?
2. Số lượng "03 Cá nhân" và giá trị "7.000.000 VNĐ" có đúng không?
3. Tất cả text có áp dụng đa ngôn ngữ không?

---

## Item 313:8470 (no=D.4) - Best Manager (award block)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | ベストマネージャー（受賞ブロック） |
| Name Trans | Best Manager (khối giải thưởng) |
| Item Type | others |
| Item Subtype | award-card |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Khối thông tin chi tiết giải thưởng Best Manager. Sử dụng common component layout đảo ngược: nội dung trái, ảnh phải.

Display Elements:
  - Bên trái - Tiêu đề: Icon + "Best Manager"
  - Bên trái - Mô tả: Đoạn văn giới thiệu giải (text tĩnh, đa ngôn ngữ)
  - Ảnh bên phải: Huy hiệu "BEST MANAGER" trong quả cầu vàng
  - Số lượng giải thưởng: Icon + "Số lượng giải thưởng:" + "01" + "Cá nhân"
  - Giá trị giải thưởng: Icon + "Giá trị giải thưởng:"
  - Số tiền: "10.000.000 VNĐ"

Function & Logic:
  - Tĩnh, hiển thị text tĩnh
  - Áp dụng đa ngôn ngữ
  - Là section target cho anchor link "Best Manager"
  - Layout alternating: content trái, ảnh phải (giống D.2)

**Candidate QA:**
1. Layout content trái + ảnh phải có đúng (giống D.2) không?
2. Số lượng "01 Cá nhân" và giá trị "10.000.000 VNĐ" có đúng không?
3. Tất cả text có áp dụng đa ngôn ngữ không?

---

## Item 313:8471 (no=D.5) - Signature 2025 - Creator (award block)

| Field | Value |
|-------|-------|
| hasChildren | No |
| Name JP | シグネチャー2025 - クリエイター（受賞ブロック） |
| Name Trans | Signature 2025 - Creator (khối giải thưởng) |
| Item Type | others |
| Item Subtype | award-card |
| Button Type | - |
| Data Type | - |
| Format | - |
| Required | - |
| Min/Max Length | - |
| Default Value | - |
| User Action | Không |
| Transition Note | - |
| Database Table | - |
| Database Column | - |
| Database Note | - |
| Validation Note | - |

**Description:**
Khối thông tin chi tiết giải thưởng Signature 2025 - Creator. Đây là giải đặc biệt có 2 mức giá trị (cá nhân và tập thể). Sử dụng common component: ảnh bên trái, nội dung bên phải.

Display Elements:
  - Ảnh bên trái: Huy hiệu "SIGNATURE 2025 CREATOR" trong quả cầu vàng
  - Bên phải - Tiêu đề: Icon + "Signature 2025 - Creator"
  - Bên phải - Mô tả: 2 đoạn văn giới thiệu giải (text tĩnh, đa ngôn ngữ)
  - Số lượng giải thưởng: Icon + "Số lượng giải thưởng:" + "01" + "Cá nhân hoặc tập thể"
  - Đường line ngăn cách
  - Giá trị giải thưởng (cá nhân): Icon + "Giá trị giải thưởng:" + "5.000.000 VNĐ" + "cho giải cá nhân"
  - Đường line với text "Hoặc" ở giữa
  - Giá trị giải thưởng (tập thể): Icon + "Giá trị giải thưởng:" + "8.000.000 VNĐ" + "cho giải tập thể"

Function & Logic:
  - Tĩnh, hiển thị text tĩnh
  - Áp dụng đa ngôn ngữ
  - Là section target cho anchor link "Signature 2025 Creator"
  - Layout: ảnh trái, content phải (giống D.1, D.3)
  - Đặc biệt: Có 2 mức giá trị giải thưởng ngăn cách bằng đường line + text "Hoặc"

**Candidate QA:**
1. Layout ảnh trái + content phải có đúng không?
2. Số lượng "01 Cá nhân hoặc tập thể" có hiển thị đúng không?
3. Hai mức giá trị (5.000.000 VNĐ cho cá nhân, 8.000.000 VNĐ cho tập thể) có hiển thị đúng và phân biệt rõ ràng không?
4. Đường line với text "Hoặc" ở giữa có hiển thị đúng giữa 2 mức giá trị không?
5. Tất cả text có áp dụng đa ngôn ngữ không?
6. Mô tả có hiển thị đủ 2 đoạn văn không?

---

## Common Component Notes

### Award Card Component (Reusable)
Tất cả các khối giải D.1 - D.5 sử dụng chung 1 common component với các props:
- **image**: Ảnh huy hiệu giải (bên trái hoặc phải tùy alternating)
- **imagePosition**: "left" | "right" (alternating: D.1 left, D.2 right, D.3 left, D.4 right, D.5 left)
- **title**: Tên giải thưởng
- **description**: Đoạn mô tả giải
- **quantity**: Số lượng giải (number)
- **quantityUnit**: Đơn vị ("Cá nhân" | "Tập thể" | "Cá nhân hoặc tập thể")
- **values**: Mảng giá trị giải thưởng, mỗi item gồm { amount, label }
  - Thông thường: 1 giá trị (vd: 7.000.000 VNĐ, cho mỗi giải thưởng)
  - Đặc biệt (Signature): 2 giá trị ngăn cách bằng "Hoặc"

### Alternating Layout Pattern
- D.1 (Top Talent): ảnh TRÁI, content PHẢI
- D.2 (Top Project): content TRÁI, ảnh PHẢI
- D.3 (Top Project Leader): ảnh TRÁI, content PHẢI
- D.4 (Best Manager): content TRÁI, ảnh PHẢI
- D.5 (Signature 2025): ảnh TRÁI, content PHẢI

### MVP Note
Giải MVP (D.6) hiển thị trong full screen image nhưng KHÔNG nằm trong batch này (Item ID không có trong danh sách assigned). MVP có: "01 Cá nhân", "15.000.000 VNĐ".
