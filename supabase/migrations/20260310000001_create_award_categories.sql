-- Award Categories table for SAA 2025
CREATE TABLE IF NOT EXISTS award_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_vi text NOT NULL,
  name_en text NOT NULL,
  description_vi text,
  description_en text,
  image_url text,
  display_order integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE award_categories ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read awards
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can read award categories' AND tablename = 'award_categories'
  ) THEN
    CREATE POLICY "Authenticated users can read award categories"
      ON award_categories
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Seed 6 awards (skip if data exists)
INSERT INTO award_categories (name_vi, name_en, description_vi, description_en, image_url, display_order)
SELECT v.name_vi, v.name_en, v.description_vi, v.description_en, v.image_url, v.display_order
FROM (VALUES
  ('Top Talent', 'Top Talent', 'Vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật trong năm.', 'Honoring the most outstanding individuals with remarkable contributions throughout the year.', '/images/homepage/award-top-talent.webp', 1),
  ('Top Project', 'Top Project', 'Ghi nhận những dự án xuất sắc đã tạo ra giá trị vượt trội.', 'Recognizing outstanding projects that created exceptional value.', '/images/homepage/award-top-project.webp', 2),
  ('Top Project Leader', 'Top Project Leader', 'Tôn vinh những người dẫn dắt dự án xuất sắc nhất.', 'Celebrating the most exceptional project leaders.', '/images/homepage/award-top-project-leader.webp', 3),
  ('Best Manager', 'Best Manager', 'Vinh danh những nhà quản lý truyền cảm hứng và tạo động lực.', 'Honoring managers who inspire and motivate their teams.', '/images/homepage/award-best-manager.webp', 4),
  ('Signature 2025 Creator', 'Signature 2025 Creator', 'Ghi nhận những sáng tạo đột phá mang dấu ấn năm 2025.', 'Recognizing breakthrough creations that define 2025.', '/images/homepage/award-signature-2025.webp', 5),
  ('MVP', 'MVP', 'Vinh danh người có giá trị nhất trong cộng đồng Sun*.', 'Honoring the most valuable person in the Sun* community.', '/images/homepage/award-mvp.webp', 6)
) AS v(name_vi, name_en, description_vi, description_en, image_url, display_order)
WHERE NOT EXISTS (SELECT 1 FROM award_categories LIMIT 1);
