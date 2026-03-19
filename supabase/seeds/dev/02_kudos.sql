-- Dev seed: Sample kudos data
-- Uses the 10 test users from users.sql

-- Insert 15 kudos between test users
INSERT INTO public.kudos (id, sender_id, receiver_id, message, title, badge, created_at) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002', '<p>Cảm ơn Bình đã luôn hỗ trợ team trong những lúc khó khăn nhất. Tinh thần trách nhiệm của bạn thật đáng ngưỡng mộ!</p>', 'IDOL GIỚI TRẺ', 'Người truyền cảm hứng', now() - interval '1 day'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001', '<p>Anh An luôn là người dẫn dắt tuyệt vời. Nhờ có anh mà dự án hoàn thành đúng deadline!</p>', 'LEADER XUẤT SẮC', 'Leader xuất sắc', now() - interval '2 days'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000005', '<p>Hà là <strong>chuyên gia</strong> trong việc giải quyết vấn đề. Cách tiếp cận sáng tạo của bạn giúp team vượt qua nhiều thử thách.</p>', 'PROBLEM SOLVER', 'Problem Solver', now() - interval '3 days'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000006', '<p>Hiếu luôn kiên trì và tận tâm. Bạn là <em>tấm gương</em> cho cả team noi theo.</p>', 'NGÔI SAO BỀN BỈ', 'Ngôi sao bền bỉ', now() - interval '4 days'),
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000007', '<p>Khánh có khả năng giao tiếp xuất sắc. Cảm ơn bạn đã luôn kết nối mọi người trong team!</p>', 'CẦU NỐI TEAM', 'Cầu nối team', now() - interval '5 days'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000008', '<p>Long đã thể hiện sự chuyên nghiệp cao trong dự án vừa rồi. Code review của bạn luôn chi tiết và hữu ích!</p>', 'CODE MASTER', 'Code Master', now() - interval '6 days'),
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000009', '<p>Mai luôn có những ý tưởng sáng tạo. Bạn giúp team nhìn vấn đề từ nhiều góc độ khác nhau!</p>', 'CREATIVE MIND', 'Creative Mind', now() - interval '7 days'),
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000010', '<p>Nam luôn chủ động và nhiệt tình. Tinh thần <strong>wasshoi</strong> của bạn lan tỏa cả team!</p>', 'WASSHOI SPIRIT', 'Wasshoi Spirit', now() - interval '8 days'),
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000001', '<p>Anh An luôn hướng dẫn tận tình cho thành viên mới. Sự kiên nhẫn của anh thật đáng quý!</p>', 'MENTOR TUYỆT VỜI', 'Mentor tuyệt vời', now() - interval '9 days'),
  ('b0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000004', '<p>Đức đã hoàn thành xuất sắc module authentication. Chất lượng code rất cao!</p>', 'TOP PERFORMER', 'Top Performer', now() - interval '10 days'),
  ('b0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000006', '<p>Hiếu luôn giúp đỡ đồng đội không ngại khó. Cảm ơn bạn rất nhiều!</p>', 'ĐỒNG ĐỘI TIN CẬY', 'Đồng đội tin cậy', now() - interval '11 days'),
  ('b0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000009', '<p>Mai có kỹ năng quản lý thời gian tuyệt vời. Luôn deliver đúng hạn với chất lượng cao.</p>', 'TIME MASTER', 'Time Master', now() - interval '12 days'),
  ('b0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000003', '<p>Cường là người luôn <strong>aim high</strong>. Bạn đặt mục tiêu cao và luôn đạt được!</p>', 'AIM HIGH CHAMPION', 'Aim High Champion', now() - interval '13 days'),
  ('b0000001-0000-0000-0000-000000000014', 'a0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000002', '<p>Bình có khả năng phân tích vấn đề rất sắc bén. Cảm ơn bạn đã giúp team tìm ra root cause nhanh chóng!</p>', 'BUG HUNTER', 'Bug Hunter', now() - interval '14 days'),
  ('b0000001-0000-0000-0000-000000000015', 'a0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000007', '<p>Khánh đã thiết kế UI/UX rất đẹp và thân thiện. Users love it!</p>', 'DESIGN STAR', 'Design Star', now() - interval '15 days')
ON CONFLICT (id) DO NOTHING;

-- Link kudos to hashtags
INSERT INTO public.kudo_hashtags (kudo_id, hashtag_id)
SELECT k.kudo_id, h.id FROM (VALUES
  ('b0000001-0000-0000-0000-000000000001'::uuid, 'truyen_cam_hung'),
  ('b0000001-0000-0000-0000-000000000001'::uuid, 'cong_hien'),
  ('b0000001-0000-0000-0000-000000000002'::uuid, 'quan_ly_xuat_sac'),
  ('b0000001-0000-0000-0000-000000000002'::uuid, 'aim_high'),
  ('b0000001-0000-0000-0000-000000000003'::uuid, 'giai_phap_sang_tao'),
  ('b0000001-0000-0000-0000-000000000003'::uuid, 'gioi_chuyen_mon'),
  ('b0000001-0000-0000-0000-000000000004'::uuid, 'cong_hien'),
  ('b0000001-0000-0000-0000-000000000004'::uuid, 'toan_dien'),
  ('b0000001-0000-0000-0000-000000000005'::uuid, 'toan_dien'),
  ('b0000001-0000-0000-0000-000000000006'::uuid, 'gioi_chuyen_mon'),
  ('b0000001-0000-0000-0000-000000000006'::uuid, 'chuan_quy_trinh'),
  ('b0000001-0000-0000-0000-000000000007'::uuid, 'giai_phap_sang_tao'),
  ('b0000001-0000-0000-0000-000000000008'::uuid, 'wasshoi'),
  ('b0000001-0000-0000-0000-000000000008'::uuid, 'truyen_cam_hung'),
  ('b0000001-0000-0000-0000-000000000009'::uuid, 'toan_dien'),
  ('b0000001-0000-0000-0000-000000000009'::uuid, 'truyen_cam_hung'),
  ('b0000001-0000-0000-0000-000000000010'::uuid, 'hieu_suat_cao'),
  ('b0000001-0000-0000-0000-000000000010'::uuid, 'gioi_chuyen_mon'),
  ('b0000001-0000-0000-0000-000000000011'::uuid, 'cong_hien'),
  ('b0000001-0000-0000-0000-000000000012'::uuid, 'hieu_suat_cao'),
  ('b0000001-0000-0000-0000-000000000012'::uuid, 'chuan_quy_trinh'),
  ('b0000001-0000-0000-0000-000000000013'::uuid, 'aim_high'),
  ('b0000001-0000-0000-0000-000000000013'::uuid, 'hieu_suat_cao'),
  ('b0000001-0000-0000-0000-000000000014'::uuid, 'gioi_chuyen_mon'),
  ('b0000001-0000-0000-0000-000000000014'::uuid, 'giai_phap_sang_tao'),
  ('b0000001-0000-0000-0000-000000000015'::uuid, 'giai_phap_sang_tao'),
  ('b0000001-0000-0000-0000-000000000015'::uuid, 'huong_khach_hang')
) AS k(kudo_id, hashtag_key)
JOIN public.hashtags h ON h.key = k.hashtag_key
ON CONFLICT (kudo_id, hashtag_id) DO NOTHING;

-- Highlight kudos: feature top-liked kudos in the carousel
INSERT INTO public.highlight_kudos (kudo_id, campaign, featured_at) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'Sun* Annual Awards 2025', now() - interval '1 hour'),
  ('b0000001-0000-0000-0000-000000000002', 'Sun* Annual Awards 2025', now() - interval '2 hours'),
  ('b0000001-0000-0000-0000-000000000003', 'Sun* Annual Awards 2025', now() - interval '3 hours'),
  ('b0000001-0000-0000-0000-000000000006', 'Sun* Annual Awards 2025', now() - interval '4 hours'),
  ('b0000001-0000-0000-0000-000000000008', 'Sun* Annual Awards 2025', now() - interval '5 hours'),
  ('b0000001-0000-0000-0000-000000000010', 'Sun* Annual Awards 2025', now() - interval '6 hours'),
  ('b0000001-0000-0000-0000-000000000013', 'Sun* Annual Awards 2025', now() - interval '7 hours'),
  ('b0000001-0000-0000-0000-000000000014', 'Sun* Annual Awards 2025', now() - interval '8 hours'),
  ('b0000001-0000-0000-0000-000000000015', 'Sun* Annual Awards 2025', now() - interval '9 hours')
ON CONFLICT DO NOTHING;

-- Add some likes to make highlight sorting meaningful
INSERT INTO public.kudo_likes (kudo_id, user_id) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000004'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000005'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000004'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000005'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000001'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000002'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000003'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000004'),
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000001'),
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000002')
ON CONFLICT (kudo_id, user_id) DO NOTHING;
