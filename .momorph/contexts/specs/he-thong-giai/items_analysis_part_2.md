# Items Analysis - Batch #2: Hệ thống giải (he-thong-giai)

---

## Item 313:8510 — MVP

| Field | Value |
|-------|-------|
| **hasChildren** | No |
| **Name JP** | MVP |
| **Name Trans** | MVP |
| **Item Type** | others |
| **Item Subtype** | card |
| **Button Type** | - |
| **Data Type** | - |
| **Format** | - |
| **Required** | - |
| **Min/Max Length** | - |
| **Default Value** | - |
| **User Action** | Xem thông tin giải thưởng MVP |
| **Transition Note** | - |
| **Database Table/Column/Note** | - |
| **Validation Note** | - |

**Description:**
Thẻ giải thưởng "MVP (Most Valuable Person)" — giải thưởng cá nhân xuất sắc nhất năm, sử dụng common component giải thưởng.

Các thành phần hiển thị:
  - Hình ảnh giải thưởng: Graphic hình cầu pha lê với chữ "MVP" (bên trái)
  - Tiêu đề: "MVP (Most Valuable Person)" (có icon phía trước)
  - Mô tả: Đoạn văn giới thiệu về giải thưởng MVP, vinh danh cá nhân xuất sắc nhất năm đại diện cho toàn bộ tập thể Sun*
  - Dòng số lượng giải: Icon + "Số lượng giải thưởng:" + giá trị "01" + đơn vị "Cá nhân"
  - Đường phân cách (line)
  - Dòng giá trị giải: Icon + "Giá trị giải thưởng:"
  - Số tiền: "15.000.000 VNĐ"

Chức năng & Logic:
  - Hiển thị tĩnh: Nội dung text tĩnh, không có tương tác
  - Đa ngôn ngữ: Tất cả text (tiêu đề, mô tả, label, đơn vị) cần hỗ trợ i18n
  - Common component: Sử dụng chung component giải thưởng (ảnh trái, nội dung phải) với các thẻ giải khác

**Candidate QA:**
- [ ] Thẻ MVP hiển thị đầy đủ: hình ảnh, tiêu đề, mô tả, số lượng giải thưởng (01 Cá nhân), giá trị (15.000.000 VNĐ)?
- [ ] Đường phân cách (line) giữa dòng số lượng và dòng giá trị có hiển thị đúng không?
- [ ] Chuyển ngôn ngữ có cập nhật tất cả text trên thẻ MVP không?
- [ ] Layout responsive: thẻ hiển thị đúng trên mobile (có thể stack dọc), tablet và desktop?

---

## Item 335:12023 — Sunkudos

| Field | Value |
|-------|-------|
| **hasChildren** | Yes |
| **Name JP** | Sunkudos |
| **Name Trans** | Sun* Kudos |
| **Item Type** | others |
| **Item Subtype** | section |
| **Button Type** | - |
| **Data Type** | - |
| **Format** | - |
| **Required** | - |
| **Min/Max Length** | - |
| **Default Value** | - |
| **User Action** | Xem thông tin quảng bá Sun* Kudos; Click nút "Chi tiết" để điều hướng |
| **Transition Note** | Click "Chi tiết" -> Điều hướng tới trang /kudos |
| **Database Table/Column/Note** | - |
| **Validation Note** | - |

**Description:**
Khối quảng bá "Sun* Kudos" — section giới thiệu phong trào ghi nhận nhân sự, nằm cuối danh sách giải thưởng.

Các thành phần hiển thị:
  - Bên trái (Content): Label "Phong trào ghi nhận", tiêu đề lớn "Sun* Kudos", sub-label "ĐIỂM MỚI CỦA SAA 2025", đoạn mô tả về hoạt động ghi nhận và cảm ơn đồng nghiệp, nút CTA "Chi tiết"
  - Bên phải (Logo): Logo Kudos lớn (icon chim đỏ + chữ "KUDOS")
  - Background riêng với hiệu ứng gradient vàng bên trái

Chức năng & Logic:
  - Bố cục: Chia 2 nửa — nội dung text bên trái, logo bên phải
  - Nút CTA "Chi tiết": Điều hướng tới trang /kudos
  - Đa ngôn ngữ: Tất cả text (label, tiêu đề, mô tả, nút) cần hỗ trợ i18n

**Candidate QA:**
- [ ] Khối Sun* Kudos hiển thị đầy đủ: label, tiêu đề, sub-label, mô tả, nút "Chi tiết", logo Kudos?
- [ ] Bố cục chia 2 nửa (text trái, logo phải) có đúng không?
- [ ] Click nút "Chi tiết" có điều hướng tới trang /kudos không?
- [ ] Chuyển ngôn ngữ có cập nhật tất cả text trong khối không?
- [ ] Layout responsive: trên mobile, 2 nửa có stack dọc hợp lý không?

---

## Item I313:8467;214:2525 — Picture-Award

| Field | Value |
|-------|-------|
| **hasChildren** | No |
| **Name JP** | Picture-Award |
| **Name Trans** | Hình ảnh giải thưởng |
| **Item Type** | others |
| **Item Subtype** | image |
| **Button Type** | - |
| **Data Type** | image |
| **Format** | - |
| **Required** | Yes |
| **Min/Max Length** | - |
| **Default Value** | Hình ảnh tương ứng với từng giải thưởng |
| **User Action** | Chỉ xem |
| **Transition Note** | - |
| **Database Table/Column/Note** | - |
| **Validation Note** | - |

**Description:**
Hình ảnh biểu thị giải thưởng — phần hình ảnh bên trái của common component thẻ giải thưởng.

Các thành phần hiển thị:
  - Hình ảnh: Graphic hình cầu pha lê trên bệ đỡ, bên trong hiển thị tên giải thưởng (ví dụ: "TOP TALENT")
  - Kích thước: Hình vuông, tỷ lệ cố định

Chức năng & Logic:
  - Common component: Đây là phần ảnh trong component giải thưởng tái sử dụng, mỗi giải có hình ảnh riêng
  - Chỉ hiển thị, không có tương tác
  - Hình ảnh là asset tĩnh, thay đổi theo từng giải thưởng

**Candidate QA:**
- [ ] Hình ảnh giải thưởng hiển thị đúng tỷ lệ, không bị méo hay cắt?
- [ ] Mỗi thẻ giải thưởng có hình ảnh riêng tương ứng với tên giải?
- [ ] Hình ảnh responsive — co giãn phù hợp trên các kích thước màn hình?

---

## Item I313:8467;214:2526 — Content

| Field | Value |
|-------|-------|
| **hasChildren** | No |
| **Name JP** | Content |
| **Name Trans** | Nội dung giải thưởng |
| **Item Type** | others |
| **Item Subtype** | content-block |
| **Button Type** | - |
| **Data Type** | - |
| **Format** | - |
| **Required** | - |
| **Min/Max Length** | - |
| **Default Value** | - |
| **User Action** | Chỉ xem |
| **Transition Note** | - |
| **Database Table/Column/Note** | - |
| **Validation Note** | - |

**Description:**
Khối nội dung giải thưởng — phần text bên phải của common component thẻ giải thưởng, ví dụ minh họa với giải "Top Talent".

Các thành phần hiển thị:
  - Icon + Tiêu đề giải: "Top Talent"
  - Mô tả: Đoạn văn giới thiệu về giải thưởng
  - Đường phân cách (line)
  - Dòng số lượng: Icon + label "Số lượng giải thưởng:" + giá trị "10" + đơn vị "Cá nhân"
  - Đường phân cách (line)
  - Dòng giá trị: Icon + label "Giá trị giải thưởng:"
  - Số tiền: "7.000.000 VNĐ"
  - Ghi chú: "cho mỗi giải thưởng"

Chức năng & Logic:
  - Common component: Đây là phần nội dung trong component giải thưởng tái sử dụng
  - Cấu trúc chung: Tiêu đề -> Mô tả -> Line -> Số lượng giải -> Line -> Giá trị giải + số tiền cho mỗi giải
  - Hiển thị tĩnh, text content thay đổi theo từng giải
  - Đa ngôn ngữ: Tất cả text (tiêu đề, mô tả, label, đơn vị, ghi chú) cần hỗ trợ i18n

**Candidate QA:**
- [ ] Khối nội dung hiển thị đầy đủ: icon + tiêu đề, mô tả, số lượng giải thưởng, giá trị giải thưởng, ghi chú?
- [ ] Các đường phân cách (line) giữa các phần có hiển thị đúng không?
- [ ] Thứ tự hiển thị đúng: tiêu đề -> mô tả -> line -> số lượng -> line -> giá trị -> số tiền -> ghi chú?
- [ ] Chuyển ngôn ngữ có cập nhật tất cả text không?
- [ ] Component có tái sử dụng được cho các giải khác (thay đổi data) không?

---

## Item I335:12023;313:8419 — Content (Sun* Kudos)

| Field | Value |
|-------|-------|
| **hasChildren** | Yes |
| **Name JP** | Content |
| **Name Trans** | Nội dung Sun* Kudos |
| **Item Type** | others |
| **Item Subtype** | content-block |
| **Button Type** | - |
| **Data Type** | - |
| **Format** | - |
| **Required** | - |
| **Min/Max Length** | - |
| **Default Value** | - |
| **User Action** | Xem thông tin; Click nút "Chi tiết" |
| **Transition Note** | Click "Chi tiết" -> Điều hướng tới /kudos |
| **Database Table/Column/Note** | - |
| **Validation Note** | - |

**Description:**
Khối nội dung bên trái của section Sun* Kudos — chứa thông tin giới thiệu phong trào ghi nhận.

Các thành phần hiển thị:
  - Label: "Phong trào ghi nhận"
  - Tiêu đề lớn: "Sun* Kudos"
  - Sub-label: "ĐIỂM MỚI CỦA SAA 2025"
  - Mô tả: Đoạn văn giới thiệu hoạt động ghi nhận và cảm ơn đồng nghiệp, triển khai tháng 11/2025, khuyến khích chia sẻ lời ghi nhận trên hệ thống do BTC công bố
  - Nút CTA: "Chi tiết" với icon mũi tên (child item D2.1)

Chức năng & Logic:
  - Nút "Chi tiết": Điều hướng tới trang /kudos
  - Đa ngôn ngữ: Tất cả text (label, tiêu đề, sub-label, mô tả, nút) cần hỗ trợ i18n
  - Nội dung tĩnh, chỉ nút CTA có tương tác

**Candidate QA:**
- [ ] Khối nội dung hiển thị đầy đủ: label, tiêu đề "Sun* Kudos", sub-label, mô tả, nút "Chi tiết"?
- [ ] Thứ tự hiển thị: label -> tiêu đề -> sub-label -> mô tả -> nút CTA?
- [ ] Click nút "Chi tiết" có điều hướng đúng tới /kudos không?
- [ ] Chuyển ngôn ngữ có cập nhật tất cả text không?

---

## Item I335:12023;313:8426 — Button-IC

| Field | Value |
|-------|-------|
| **hasChildren** | No |
| **Name JP** | Button-IC |
| **Name Trans** | Nút Chi tiết |
| **Item Type** | button |
| **Item Subtype** | cta |
| **Button Type** | outlined |
| **Data Type** | - |
| **Format** | - |
| **Required** | - |
| **Min/Max Length** | - |
| **Default Value** | "Chi tiết" |
| **User Action** | Click |
| **Transition Note** | Click -> Điều hướng tới trang /kudos |
| **Database Table/Column/Note** | - |
| **Validation Note** | - |

**Description:**
Nút CTA "Chi tiết" trong section Sun* Kudos — điều hướng người dùng tới trang chi tiết Kudos.

Các thành phần hiển thị:
  - Text: "Chi tiết"
  - Icon: Mũi tên hướng lên-phải (arrow upper-right)
  - Kiểu nút: Outlined (viền)

Chức năng & Logic:
  - Click: Điều hướng tới trang /kudos
  - Đa ngôn ngữ: Text nút "Chi tiết" cần hỗ trợ i18n

**Candidate QA:**
- [ ] Nút hiển thị đúng text "Chi tiết" và icon mũi tên?
- [ ] Click nút có điều hướng tới /kudos không?
- [ ] Chuyển ngôn ngữ có cập nhật text nút không?
- [ ] Nút có hover state không?
- [ ] Nút responsive — kích thước touch target đủ lớn trên mobile (>=44x44px)?
