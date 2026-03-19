-- Extra kudos seed data: kudos sent TO user_profiles.id='a0000001-0000-0000-0000-000000000001' (Nguyễn Văn An)
-- and some kudos with likes, to demonstrate the feed and stats sidebar

-- Additional kudos where Nguyễn Văn An is the RECEIVER
INSERT INTO public.kudos (id, sender_id, receiver_id, message, title, badge, hashtags, created_at) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000001', '<p>Anh An luôn là người <strong>mentor tận tâm</strong>, hướng dẫn team rất chi tiết và kiên nhẫn. Cảm ơn anh rất nhiều!</p>', 'MENTOR CỦA NĂM', 'Mentor của năm', ARRAY['truyen-cam-hung', 'toan-dien'], now() - interval '6 hours'),
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000001', '<p>An đã giúp team deliver dự án <em>đúng deadline</em> với chất lượng cao. Khả năng quản lý tuyệt vời!</p>', 'DELIVERY HERO', 'Delivery Hero', ARRAY['hieu-suat-cao', 'aim-high'], now() - interval '12 hours'),
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000001', '<p>Cảm ơn anh An đã luôn chia sẻ kiến thức và giúp đỡ mọi người trong team. Anh là tấm gương sáng!</p>', 'KNOWLEDGE SHARER', 'Knowledge Sharer', ARRAY['cong-hien', 'truyen-cam-hung'], now() - interval '1 day'),
  ('c0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000001', '<p>An luôn <strong>aim high</strong> và truyền năng lượng tích cực cho cả team. Wasshoi!</p>', 'ENERGY BOOSTER', 'Energy Booster', ARRAY['aim-high', 'wasshoi'], now() - interval '2 days'),
  ('c0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000001', '<p>Code review của anh An luôn chi tiết, giúp mình học được rất nhiều. Cảm ơn anh!</p>', 'CODE REVIEWER XUẤT SẮC', 'Code Reviewer xuất sắc', ARRAY['gioi-chuyen-mon', 'chuan-quy-trinh'], now() - interval '3 days'),
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000001', '<p>Anh An có khả năng giải quyết vấn đề rất nhanh và sáng tạo. Team rất may mắn có anh!</p>', 'PROBLEM SOLVER', 'Problem Solver', ARRAY['giai-phap-sang-tao', 'gioi-chuyen-mon'], now() - interval '4 days'),
  ('c0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000001', '<p>Sự kiên nhẫn và tận tâm của anh An trong việc onboard thành viên mới thật đáng quý. Cảm ơn anh!</p>', 'ONBOARDING MASTER', 'Onboarding Master', ARRAY['toan-dien', 'cong-hien'], now() - interval '5 days')
ON CONFLICT (id) DO NOTHING;

-- Link new kudos to hashtags junction table
INSERT INTO public.kudo_hashtags (kudo_id, hashtag_id)
SELECT k.kudo_id, h.id FROM (VALUES
  ('c0000001-0000-0000-0000-000000000001'::uuid, 'truyen_cam_hung'),
  ('c0000001-0000-0000-0000-000000000001'::uuid, 'toan_dien'),
  ('c0000001-0000-0000-0000-000000000002'::uuid, 'hieu_suat_cao'),
  ('c0000001-0000-0000-0000-000000000002'::uuid, 'aim_high'),
  ('c0000001-0000-0000-0000-000000000003'::uuid, 'cong_hien'),
  ('c0000001-0000-0000-0000-000000000003'::uuid, 'truyen_cam_hung'),
  ('c0000001-0000-0000-0000-000000000004'::uuid, 'aim_high'),
  ('c0000001-0000-0000-0000-000000000004'::uuid, 'wasshoi'),
  ('c0000001-0000-0000-0000-000000000005'::uuid, 'gioi_chuyen_mon'),
  ('c0000001-0000-0000-0000-000000000005'::uuid, 'chuan_quy_trinh'),
  ('c0000001-0000-0000-0000-000000000006'::uuid, 'giai_phap_sang_tao'),
  ('c0000001-0000-0000-0000-000000000006'::uuid, 'gioi_chuyen_mon'),
  ('c0000001-0000-0000-0000-000000000007'::uuid, 'toan_dien'),
  ('c0000001-0000-0000-0000-000000000007'::uuid, 'cong_hien')
) AS k(kudo_id, hashtag_key)
JOIN public.hashtags h ON h.key = k.hashtag_key
ON CONFLICT (kudo_id, hashtag_id) DO NOTHING;

-- Add likes to these new kudos (some kudos get more likes than others)
INSERT INTO public.kudo_likes (kudo_id, user_id) VALUES
  -- c001: 5 likes (most popular)
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002'),
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003'),
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000005'),
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000006'),
  ('c0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000007'),
  -- c002: 3 likes
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000002'),
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000003'),
  ('c0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000004'),
  -- c003: 4 likes
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002'),
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000004'),
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000008'),
  ('c0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000009'),
  -- c004: 2 likes
  ('c0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000002'),
  ('c0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000005'),
  -- c005: 1 like
  ('c0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000003'),
  -- c006: 3 likes
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000004'),
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000005'),
  ('c0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000008')
ON CONFLICT (kudo_id, user_id) DO NOTHING;

-- Also feature some of the new kudos in the highlight carousel
INSERT INTO public.highlight_kudos (kudo_id, campaign, featured_at) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'Sun* Annual Awards 2025', now() - interval '30 minutes'),
  ('c0000001-0000-0000-0000-000000000003', 'Sun* Annual Awards 2025', now() - interval '1 hour'),
  ('c0000001-0000-0000-0000-000000000006', 'Sun* Annual Awards 2025', now() - interval '2 hours')
ON CONFLICT DO NOTHING;
