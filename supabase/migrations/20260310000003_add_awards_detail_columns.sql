-- Add detail columns to award_categories for the awards detail page
ALTER TABLE award_categories
  ADD COLUMN IF NOT EXISTS slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS unit_type text DEFAULT 'individual',
  ADD COLUMN IF NOT EXISTS prize_value bigint DEFAULT 0,
  ADD COLUMN IF NOT EXISTS prize_value_secondary bigint;

-- Populate slug and detail data for existing rows
UPDATE award_categories SET slug = 'top-talent', quantity = 10, unit_type = 'individual', prize_value = 7000000 WHERE display_order = 1;
UPDATE award_categories SET slug = 'top-project', quantity = 2, unit_type = 'team', prize_value = 15000000 WHERE display_order = 2;
UPDATE award_categories SET slug = 'top-project-leader', quantity = 3, unit_type = 'individual', prize_value = 7000000 WHERE display_order = 3;
UPDATE award_categories SET slug = 'best-manager', quantity = 1, unit_type = 'individual', prize_value = 10000000 WHERE display_order = 4;
UPDATE award_categories SET slug = 'signature-2025', quantity = 1, unit_type = 'individual', prize_value = 5000000, prize_value_secondary = 8000000 WHERE display_order = 5;
UPDATE award_categories SET slug = 'mvp', quantity = 1, unit_type = 'individual', prize_value = 15000000 WHERE display_order = 6;

-- Make slug NOT NULL after populating
ALTER TABLE award_categories ALTER COLUMN slug SET NOT NULL;
