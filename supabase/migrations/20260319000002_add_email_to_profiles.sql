-- Add email column to user_profiles for matching seed profiles after db reset
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create unique index on email (nullable, so only non-null emails are unique)
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles (email) WHERE email IS NOT NULL;
