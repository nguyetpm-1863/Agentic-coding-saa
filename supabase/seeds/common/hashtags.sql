-- Seed hashtags for Kudos feature
INSERT INTO public.hashtags (key, display_text_vi, display_text_en) VALUES
  ('toan_dien', '#Toàn diện', '#Comprehensive'),
  ('gioi_chuyen_mon', '#Giỏi chuyên môn', '#Expert'),
  ('hieu_suat_cao', '#Hiệu suất cao', '#High Performance'),
  ('truyen_cam_hung', '#Truyền cảm hứng', '#Inspiring'),
  ('cong_hien', '#Cống hiến', '#Dedicated'),
  ('aim_high', '#Aim High', '#Aim High'),
  ('be_agile', '#Be Agile', '#Be Agile'),
  ('wasshoi', '#Wasshoi', '#Wasshoi'),
  ('huong_muc_tieu', '#Hướng mục tiêu', '#Goal Oriented'),
  ('huong_khach_hang', '#Hướng khách hàng', '#Customer Focused'),
  ('chuan_quy_trinh', '#Chuẩn quy trình', '#Process Standard'),
  ('giai_phap_sang_tao', '#Giải pháp sáng tạo', '#Creative Solutions'),
  ('quan_ly_xuat_sac', '#Quản lý xuất sắc', '#Excellent Management')
ON CONFLICT (key) DO NOTHING;
