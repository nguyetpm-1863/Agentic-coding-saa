# Design Items -He thong giai (Part 1)

**Screen:** Hệ thống giải
**Frame ID:** 313:8436
**File Key:** 9ypp4enmFmdK3YAFJLIu6C
**Batch:** 1 of 1
**Items:** 15

---

## Screen Overview

Trang "Hệ thống giải thưởng SAA 2025" hiển thị toàn bộ các hạng mục giải thưởng của Sun* Annual Awards 2025. Bố cục gồm:
1. **Header menu** - Thanh điều hướng trên cùng, mục "Award Information" đang active (chỉ có gạch dưới text, KHÔNG có background)
2. **Banner Keyvisual** - Ảnh nền nghệ thuật với tiêu đề "ROOT FURTHER" và "Sun* Annual Awards 2025", phía dưới là tiêu đề trang "Hệ thống giải thưởng SAA 2025"
3. **Section nội dung chính** - Chia 2 cột:
   - **Sidebar trái (178px):** Danh sách anchor link điều hướng đến các section giải thưởng
   - **Content phải:** Các khối thông tin giải thưởng xếp dọc, ngăn cách bằng đường line

---

## Item 313:8437 (no=3) - Keyvisual

- **Type:** others
- **Name:** Keyvisual
- **Visual:** Banner toàn chiều rộng hiển thị artwork nền với gradient overlay. Trên banner có ảnh "ROOT" + "FURTHER" (từ public/images/homepage/root-text.png và further-text.png). Phía dưới hiển thị text "Sun* Annual Awards 2025" và tiêu đề trang "Hệ thống giải thưởng SAA 2025". Ảnh nền: public/images/awards/keyvisual-award-bg.png. Gradient overlay: linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0) 52.79%). Bên dưới banner có 1 đường line (background #2E3940) cách trên dưới 16px.
- **Behavior:** Tĩnh, không interactive

---

## Item 313:8453 (no=A) - Title hệ thống giải thưởng

- **Type:** label
- **Name:** Title hệ thống giải thưởng
- **Visual:** Hai dòng text:
  - Dòng 1 (phụ): "Sun* annual awards 2025" - text nhỏ, nhạt
  - Dòng 2 (chính): "Hệ thống giải thưởng SAA 2025" - text lớn, màu vàng
- **Behavior:** Tĩnh, không interactive. Áp dụng đa ngôn ngữ.

---

## Item 313:8458 (no=B) - Hệ thống giải thưởng

- **Type:** others
- **Name:** Hệ thống giải thưởng
- **Visual:** Container chứa toàn bộ phần nội dung giải thưởng, bao gồm sidebar điều hướng bên trái và danh sách các thẻ giải bên phải. Sidebar rộng 178px, content page 121px.
- **Behavior:** Click mục sidebar bên trái cuộn tới thẻ giải tương ứng bên phải

---

## Item 313:8459 (no=C) - Menu list

- **Type:** others
- **Name:** Menu list
- **Visual:** Danh sách 6 mục điều hướng dọc bên trái (sidebar sticky):
  1. Top Talent
  2. Top Project
  3. Top Project Leader
  4. Best Manager
  5. Signature 2025 Creator
  6. MVP

  Mỗi mục có icon (target icon) kèm text. Mục đang active có màu vàng + underline.
- **Behavior:** Click vào mục -> cuộn smooth đến section giải tương ứng. Khi cuộn trang, mục tương ứng với section đang hiển thị sẽ tự động active (highlight vàng + underline).

---

## Item 313:8460 (no=C.1) - Top Talent (nav item)

- **Type:** others
- **Name:** Top Talent (navigation item)
- **Visual:** Mục "Top Talent" trong sidebar, có icon target + text. Trạng thái active: text vàng + underline.
- **Behavior:** Click -> cuộn đến section Top Talent

---

## Item 313:8461 (no=C.2) - Top Project (nav item)

- **Type:** others
- **Name:** Top Project (navigation item)
- **Visual:** Mục "Top Project" trong sidebar, có icon target + text. Trạng thái mặc định: text trắng.
- **Behavior:** Click -> cuộn đến section Top Project

---

## Item 313:8462 (no=C.3) - Top Project Leader (nav item)

- **Type:** others
- **Name:** Top Project Leader (navigation item)
- **Visual:** Mục "Top Project Leader" trong sidebar, có icon target + text.
- **Behavior:** Click -> cuộn đến section Top Project Leader

---

## Item 313:8463 (no=C.4) - Best Manager (nav item)

- **Type:** others
- **Name:** Best Manager (navigation item)
- **Visual:** Mục "Best Manager" trong sidebar, có icon target + text.
- **Behavior:** Click -> cuộn đến section Best Manager

---

## Item 313:8464 (no=C.5) - Signature 2025 Creator (nav item)

- **Type:** others
- **Name:** Signature 2025 Creator (navigation item)
- **Visual:** Mục "Signature 2025 Creator" trong sidebar, có icon target + text.
- **Behavior:** Click -> cuộn đến section Signature 2025 Creator

---

## Item 313:8465 (no=C.6) - MVP (nav item)

- **Type:** others
- **Name:** MVP (navigation item)
- **Visual:** Mục "MVP" trong sidebar, có icon target + text.
- **Behavior:** Click -> cuộn đến section MVP

---

## Item 313:8467 (no=D.1) - Top Talent (award block)

- **Type:** others
- **Name:** Top Talent
- **Visual:** Khối thông tin giải thưởng Top Talent. Bố cục: ảnh bên trái (huy hiệu "TOP TALENT" trong quả cầu vàng), bên phải gồm:
  - Icon + Tiêu đề: "Top Talent"
  - Mô tả: Đoạn văn giới thiệu giải thưởng
  - Line + "Số lượng giải thưởng: 10 Cá nhân"
  - Line + "Giá trị giải thưởng:"
  - "7.000.000 VNĐ"
  - "cho mỗi giải thưởng"
- **Behavior:** Tĩnh, hiển thị text tĩnh. Áp dụng đa ngôn ngữ.

---

## Item 313:8468 (no=D.2) - Top Project (award block)

- **Type:** others
- **Name:** Top Project
- **Visual:** Khối thông tin giải thưởng Top Project. Bố cục tương tự D.1 nhưng ảnh bên phải (alternating layout):
  - Icon + Tiêu đề: "Top Project"
  - Mô tả giải thưởng
  - "Số lượng giải thưởng: 02 Tập thể"
  - "Giá trị giải thưởng:"
  - "15.000.000 VNĐ"
  - "cho mỗi giải thưởng"
- **Behavior:** Tĩnh, hiển thị text tĩnh. Áp dụng đa ngôn ngữ.

---

## Item 313:8469 (no=D.3) - Top Project Leader (award block)

- **Type:** others
- **Name:** Top Project Leader
- **Visual:** Khối thông tin giải thưởng. Ảnh bên trái:
  - Icon + Tiêu đề: "Top Project Leader"
  - Mô tả giải thưởng
  - "Số lượng giải thưởng: 03 Cá nhân"
  - "Giá trị giải thưởng:"
  - "7.000.000 VNĐ"
  - "cho mỗi giải thưởng"
- **Behavior:** Tĩnh, hiển thị text tĩnh. Áp dụng đa ngôn ngữ.

---

## Item 313:8470 (no=D.4) - Best Manager (award block)

- **Type:** others
- **Name:** Best Manager
- **Visual:** Khối thông tin giải thưởng. Ảnh bên phải (alternating):
  - Icon + Tiêu đề: "Best Manager"
  - Mô tả giải thưởng
  - "Số lượng giải thưởng: 01 Cá nhân"
  - "Giá trị giải thưởng:"
  - "10.000.000 VNĐ"
- **Behavior:** Tĩnh, hiển thị text tĩnh. Áp dụng đa ngôn ngữ.

---

## Item 313:8471 (no=D.5) - Signature 2025 - Creator (award block)

- **Type:** others
- **Name:** Signature 2025 - Creator
- **Visual:** Khối thông tin giải thưởng. Ảnh bên trái:
  - Icon + Tiêu đề: "Signature 2025 - Creator"
  - Mô tả giải thưởng (2 đoạn)
  - "Số lượng giải thưởng: 01 Cá nhân hoặc tập thể"
  - Line ngăn cách
  - "Giá trị giải thưởng:" -> "5.000.000 VNĐ" -> "cho giải cá nhân"
  - Đường line với text "Hoặc"
  - "Giá trị giải thưởng:" -> "8.000.000 VNĐ" -> "cho giải tập thể"
- **Behavior:** Tĩnh, hiển thị text tĩnh. Áp dụng đa ngôn ngữ.
