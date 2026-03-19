-- Add department_code and hero_badge to user_profiles for card display
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS department_code TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS hero_badge TEXT;
