-- Seed data for dev user: Phạm Thị Minh Nguyệt
-- Uses a stable dev ID so data persists across db resets.
-- When the real SSO user logs in, middleware merges their session with this profile via email match.

-- Create auth entry and profile with stable ID
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role, confirmation_token, recovery_token, email_change, email_change_token_new, raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous)
VALUES ('a0000001-0000-0000-0000-00000000a001', '00000000-0000-0000-0000-000000000000', 'pham.thi.minh.nguyet@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_profiles (id, name, email, department_id, department_code)
VALUES (
  'a0000001-0000-0000-0000-00000000a001',
  'Phạm Thị Minh Nguyệt',
  'pham.thi.minh.nguyet@sun-asterisk.com',
  (SELECT id FROM public.departments WHERE name = 'CEVC1 - DSV' LIMIT 1),
  'CEVC1 - DSV'
)
ON CONFLICT (id) DO UPDATE SET
  name = 'Phạm Thị Minh Nguyệt',
  email = 'pham.thi.minh.nguyet@sun-asterisk.com',
  department_id = (SELECT id FROM public.departments WHERE name = 'CEVC1 - DSV' LIMIT 1),
  department_code = 'CEVC1 - DSV';

DO $$
DECLARE
  v_user_id uuid := 'a0000001-0000-0000-0000-00000000a001';
BEGIN
  -- Kudos SENT BY Nguyệt
  INSERT INTO public.kudos (id, sender_id, receiver_id, message, title, badge, hashtags, created_at) VALUES
    ('d0000001-0000-0000-0000-000000000001', v_user_id, 'a0000001-0000-0000-0000-000000000001', '<p>Anh An luôn <strong>support team</strong> rất nhiệt tình, cảm ơn anh đã giúp đỡ em trong dự án vừa rồi!</p>', 'NGƯỜI ANH CẢ CỦA TEAM', 'Người anh cả của team', ARRAY['truyen-cam-hung', 'toan-dien'], now() - interval '2 hours'),
    ('d0000001-0000-0000-0000-000000000002', v_user_id, 'a0000001-0000-0000-0000-000000000003', '<p>Cường rất giỏi trong việc debug và optimize performance. Nhờ có Cường mà dự án chạy <em>mượt mà</em>!</p>', 'PERFORMANCE KING', 'Performance King', ARRAY['gioi-chuyen-mon', 'hieu-suat-cao'], now() - interval '1 day'),
    ('d0000001-0000-0000-0000-000000000003', v_user_id, 'a0000001-0000-0000-0000-000000000005', '<p>Chị Hà luôn tận tâm review code và đưa feedback rất chi tiết. Cảm ơn chị!</p>', 'QUEEN OF CODE REVIEW', 'Queen of Code Review', ARRAY['chuan-quy-trinh', 'gioi-chuyen-mon'], now() - interval '3 days')
  ON CONFLICT (id) DO NOTHING;

  -- Kudos RECEIVED BY Nguyệt
  INSERT INTO public.kudos (id, sender_id, receiver_id, message, title, badge, hashtags, created_at) VALUES
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', v_user_id, '<p>Nguyệt là người luôn <strong>chủ động</strong> và có trách nhiệm cao trong công việc. Mọi task Nguyệt nhận đều hoàn thành xuất sắc!</p>', 'NGÔI SAO SÁNG NHẤT', 'Ngôi sao sáng nhất', ARRAY['toan-dien', 'hieu-suat-cao'], now() - interval '1 hour'),
    ('d0000002-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000002', v_user_id, '<p>Cảm ơn Nguyệt đã giúp team setup CI/CD pipeline hoàn chỉnh. Nhờ có Nguyệt mà deploy <em>nhanh và ổn định</em> hơn rất nhiều!</p>', 'DEVOPS CHAMPION', 'DevOps Champion', ARRAY['gioi-chuyen-mon', 'giai-phap-sang-tao'], now() - interval '3 hours'),
    ('d0000002-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000004', v_user_id, '<p>Nguyệt có khả năng <strong>communicate</strong> rất tốt với khách hàng. Luôn biến những yêu cầu phức tạp thành giải pháp đơn giản!</p>', 'CẦU NỐI TUYỆT VỜI', 'Cầu nối tuyệt vời', ARRAY['huong-khach-hang', 'truyen-cam-hung'], now() - interval '8 hours'),
    ('d0000002-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000006', v_user_id, '<p>Nguyệt luôn sẵn sàng giúp đỡ thành viên mới, chia sẻ kiến thức một cách rất dễ hiểu và kiên nhẫn.</p>', 'MENTOR TẬN TÂM', 'Mentor tận tâm', ARRAY['truyen-cam-hung', 'cong-hien'], now() - interval '1 day'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000007', v_user_id, '<p>Nhờ có Nguyệt mà sprint vừa rồi team deliver <strong>100% story points</strong>! Khả năng quản lý task tuyệt vời!</p>', 'SPRINT MASTER', 'Sprint Master', ARRAY['hieu-suat-cao', 'aim-high'], now() - interval '2 days'),
    ('d0000002-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000009', v_user_id, '<p>Nguyệt có ý tưởng <em>rất sáng tạo</em> trong việc cải thiện UX. Sản phẩm đẹp và dễ dùng hơn rất nhiều!</p>', 'UX INNOVATOR', 'UX Innovator', ARRAY['giai-phap-sang-tao', 'huong-khach-hang'], now() - interval '3 days'),
    ('d0000002-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000010', v_user_id, '<p>Nguyệt luôn aim high và không ngại thử thách mới. Tinh thần học hỏi rất đáng ngưỡng mộ!</p>', 'ALWAYS AIM HIGH', 'Always Aim High', ARRAY['aim-high', 'wasshoi'], now() - interval '4 days'),
    ('d0000002-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000012', v_user_id, '<p>Cảm ơn Nguyệt đã dẫn dắt team qua giai đoạn khó khăn. Chị luôn bình tĩnh và đưa ra quyết định đúng đắn!</p>', 'LEADER BÌNH TĨNH', 'Leader bình tĩnh', ARRAY['toan-dien', 'cong-hien'], now() - interval '5 days')
  ON CONFLICT (id) DO NOTHING;

  -- Link kudos to hashtags junction table
  INSERT INTO public.kudo_hashtags (kudo_id, hashtag_id)
  SELECT k.kudo_id, h.id FROM (VALUES
    ('d0000001-0000-0000-0000-000000000001'::uuid, 'truyen_cam_hung'),
    ('d0000001-0000-0000-0000-000000000001'::uuid, 'toan_dien'),
    ('d0000001-0000-0000-0000-000000000002'::uuid, 'gioi_chuyen_mon'),
    ('d0000001-0000-0000-0000-000000000002'::uuid, 'hieu_suat_cao'),
    ('d0000001-0000-0000-0000-000000000003'::uuid, 'chuan_quy_trinh'),
    ('d0000001-0000-0000-0000-000000000003'::uuid, 'gioi_chuyen_mon'),
    ('d0000002-0000-0000-0000-000000000001'::uuid, 'toan_dien'),
    ('d0000002-0000-0000-0000-000000000001'::uuid, 'hieu_suat_cao'),
    ('d0000002-0000-0000-0000-000000000002'::uuid, 'gioi_chuyen_mon'),
    ('d0000002-0000-0000-0000-000000000002'::uuid, 'giai_phap_sang_tao'),
    ('d0000002-0000-0000-0000-000000000003'::uuid, 'huong_khach_hang'),
    ('d0000002-0000-0000-0000-000000000003'::uuid, 'truyen_cam_hung'),
    ('d0000002-0000-0000-0000-000000000004'::uuid, 'truyen_cam_hung'),
    ('d0000002-0000-0000-0000-000000000004'::uuid, 'cong_hien'),
    ('d0000002-0000-0000-0000-000000000005'::uuid, 'hieu_suat_cao'),
    ('d0000002-0000-0000-0000-000000000005'::uuid, 'aim_high'),
    ('d0000002-0000-0000-0000-000000000006'::uuid, 'giai_phap_sang_tao'),
    ('d0000002-0000-0000-0000-000000000006'::uuid, 'huong_khach_hang'),
    ('d0000002-0000-0000-0000-000000000007'::uuid, 'aim_high'),
    ('d0000002-0000-0000-0000-000000000007'::uuid, 'wasshoi'),
    ('d0000002-0000-0000-0000-000000000008'::uuid, 'toan_dien'),
    ('d0000002-0000-0000-0000-000000000008'::uuid, 'cong_hien')
  ) AS k(kudo_id, hashtag_key)
  JOIN public.hashtags h ON h.key = k.hashtag_key
  ON CONFLICT (kudo_id, hashtag_id) DO NOTHING;

  -- Likes on kudos RECEIVED by Nguyệt (affects heart count)
  INSERT INTO public.kudo_likes (kudo_id, user_id) VALUES
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002'),
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003'),
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000004'),
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000005'),
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000007'),
    ('d0000002-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000009'),
    ('d0000002-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001'),
    ('d0000002-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000005'),
    ('d0000002-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000008'),
    ('d0000002-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000010'),
    ('d0000002-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001'),
    ('d0000002-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000003'),
    ('d0000002-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000005'),
    ('d0000002-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000007'),
    ('d0000002-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000010'),
    ('d0000002-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000002'),
    ('d0000002-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000008'),
    ('d0000002-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000009'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000001'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000002'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000003'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000004'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000006'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000008'),
    ('d0000002-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000010'),
    ('d0000002-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000003'),
    ('d0000002-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000006'),
    ('d0000002-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000001'),
    ('d0000002-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000004'),
    ('d0000002-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000005'),
    ('d0000002-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000009'),
    ('d0000002-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000003'),
    ('d0000002-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000007'),
    ('d0000002-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000008')
  ON CONFLICT (kudo_id, user_id) DO NOTHING;

  -- Likes on kudos sent by Nguyệt
  INSERT INTO public.kudo_likes (kudo_id, user_id) VALUES
    ('d0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003'),
    ('d0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000005'),
    ('d0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001'),
    ('d0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000008'),
    ('d0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002'),
    ('d0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000004')
  ON CONFLICT (kudo_id, user_id) DO NOTHING;

  -- Feature some kudos in highlight carousel
  INSERT INTO public.highlight_kudos (kudo_id, campaign, featured_at) VALUES
    ('d0000002-0000-0000-0000-000000000001', 'Sun* Annual Awards 2025', now() - interval '10 minutes'),
    ('d0000002-0000-0000-0000-000000000005', 'Sun* Annual Awards 2025', now() - interval '45 minutes'),
    ('d0000002-0000-0000-0000-000000000003', 'Sun* Annual Awards 2025', now() - interval '90 minutes')
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Seed data for Phạm Thị Minh Nguyệt (%) created successfully', v_user_id;
END $$;
