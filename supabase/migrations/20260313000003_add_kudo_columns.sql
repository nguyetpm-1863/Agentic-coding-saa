-- Add missing columns to kudos table for Write Kudo modal
-- title: badge/title text displayed on the kudo
-- hashtags: array of hashtag strings
-- is_anonymous: whether the sender chose to be anonymous
-- anonymous_name: nickname when sending anonymously

-- Rename 'message' to keep backward compat, add new columns
ALTER TABLE public.kudos ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.kudos ADD COLUMN IF NOT EXISTS hashtags TEXT[] DEFAULT '{}';
ALTER TABLE public.kudos ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false NOT NULL;
ALTER TABLE public.kudos ADD COLUMN IF NOT EXISTS anonymous_name TEXT;

-- Add 'position' default fix for kudo_images (code uses 'sort_order' but column is 'position')
-- No schema change needed, just fix the code to use 'position'
