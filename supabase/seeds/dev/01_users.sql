-- Dev seed: 10 test users for recipient dropdown
-- Insert into auth.users first (required FK for user_profiles)
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role, confirmation_token, recovery_token, email_change, email_change_token_new, raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous)
VALUES
  ('a0000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'nguyen.van.an@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'tran.thi.binh@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'le.hoang.cuong@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'pham.minh.duc@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'hoang.thu.ha@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'vo.quang.hieu@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'dang.ngoc.khanh@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'bui.thanh.long@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'ngo.phuong.mai@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'do.quoc.nam@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000000', 'phan.thanh.tung@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000000', 'nguyen.thi.lan@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000000', 'tran.van.hung@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000000', 'le.thi.hong@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000000', 'vu.duc.toan@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000000', 'hoang.minh.tam@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000000', 'nguyen.duc.phong@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000000', 'tran.minh.chau@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000000', 'le.van.thanh@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false),
  ('a0000001-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000000', 'pham.thi.thao@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '', '', '', '', '{"provider":"email","providers":["email"]}', '{}', false, false)
ON CONFLICT (id) DO NOTHING;

-- Insert user profiles with names, avatars, departments, department codes, and hero badges
INSERT INTO public.user_profiles (id, name, avatar_url, department_id, department_code, hero_badge)
SELECT u.id, u.name, u.avatar_url, d.id, u.dept_code, u.hero_badge
FROM (VALUES
  ('a0000001-0000-0000-0000-000000000001'::uuid, 'Nguyễn Văn An', 'https://i.pravatar.cc/150?u=nva01', 'CTO', 'CTO01', 'Legend Hero'),
  ('a0000001-0000-0000-0000-000000000002'::uuid, 'Trần Thị Bình', 'https://i.pravatar.cc/150?u=ttb02', 'SPD', 'SPD01', 'Super Hero'),
  ('a0000001-0000-0000-0000-000000000003'::uuid, 'Lê Hoàng Cường', 'https://i.pravatar.cc/150?u=lhc03', 'FCOV', 'FCOV01', 'Rising Hero'),
  ('a0000001-0000-0000-0000-000000000004'::uuid, 'Phạm Minh Đức', 'https://i.pravatar.cc/150?u=pmd04', 'CEVC1', 'CEVC10', 'New Hero'),
  ('a0000001-0000-0000-0000-000000000005'::uuid, 'Hoàng Thu Hà', 'https://i.pravatar.cc/150?u=hth05', 'CEVC2', 'CEVC20', NULL),
  ('a0000001-0000-0000-0000-000000000006'::uuid, 'Võ Quang Hiếu', 'https://i.pravatar.cc/150?u=vqh06', 'STVC', 'STVC01', 'New Hero'),
  ('a0000001-0000-0000-0000-000000000007'::uuid, 'Đặng Ngọc Khánh', 'https://i.pravatar.cc/150?u=dnk07', 'CEVEC', 'CEVEC1', NULL),
  ('a0000001-0000-0000-0000-000000000008'::uuid, 'Bùi Thanh Long', 'https://i.pravatar.cc/150?u=btl08', 'GEU', 'GEU01', 'Rising Hero'),
  ('a0000001-0000-0000-0000-000000000009'::uuid, 'Ngô Phương Mai', 'https://i.pravatar.cc/150?u=npm09', 'PAO', 'PAO01', NULL),
  ('a0000001-0000-0000-0000-000000000010'::uuid, 'Đỗ Quốc Nam', 'https://i.pravatar.cc/150?u=dqn10', 'BDV', 'BDV01', 'Super Hero'),
  ('a0000001-0000-0000-0000-000000000011'::uuid, 'Phan Thanh Tùng', 'https://i.pravatar.cc/150?u=ptt11', 'CEVC1', 'CEVC11', NULL),
  ('a0000001-0000-0000-0000-000000000012'::uuid, 'Nguyễn Thị Lan', 'https://i.pravatar.cc/150?u=ntl12', 'CEVC2', 'CEVC21', 'New Hero'),
  ('a0000001-0000-0000-0000-000000000013'::uuid, 'Trần Văn Hùng', 'https://i.pravatar.cc/150?u=tvh13', 'CEVC3', 'CEVC30', NULL),
  ('a0000001-0000-0000-0000-000000000014'::uuid, 'Lê Thị Hồng', 'https://i.pravatar.cc/150?u=lth14', 'CEVC1 - DSV', 'DSV01', NULL),
  ('a0000001-0000-0000-0000-000000000015'::uuid, 'Vũ Đức Toàn', 'https://i.pravatar.cc/150?u=vdt15', 'CEVC2 - CySS', 'CySS01', 'Legend Hero'),
  ('a0000001-0000-0000-0000-000000000016'::uuid, 'Hoàng Minh Tâm', 'https://i.pravatar.cc/150?u=hmt16', 'CEVC1 - AIE', 'AIE01', NULL),
  ('a0000001-0000-0000-0000-000000000017'::uuid, 'Nguyễn Đức Phong', 'https://i.pravatar.cc/150?u=ndp17', 'STVC - R&D', 'RnD01', 'Rising Hero'),
  ('a0000001-0000-0000-0000-000000000018'::uuid, 'Trần Minh Châu', 'https://i.pravatar.cc/150?u=tmc18', 'CEVC4', 'CEVC40', NULL),
  ('a0000001-0000-0000-0000-000000000019'::uuid, 'Lê Văn Thành', 'https://i.pravatar.cc/150?u=lvt19', 'CEVC2 - System', 'SYS01', NULL),
  ('a0000001-0000-0000-0000-000000000020'::uuid, 'Phạm Thị Thảo', 'https://i.pravatar.cc/150?u=ptt20', 'CEVC3', 'CEVC31', 'New Hero')
) AS u(id, name, avatar_url, dept_name, dept_code, hero_badge)
LEFT JOIN public.departments d ON d.name = u.dept_name
ON CONFLICT (id) DO NOTHING;
