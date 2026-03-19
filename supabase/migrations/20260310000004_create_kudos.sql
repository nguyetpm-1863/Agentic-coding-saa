-- Kudos Live Board Tables
-- Migration: 20260310000003_create_kudos.sql

-- Hashtags table
CREATE TABLE public.hashtags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  display_text_vi TEXT NOT NULL,
  display_text_en TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.hashtags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read hashtags"
  ON public.hashtags
  FOR SELECT
  TO authenticated
  USING (true);

-- User profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  department_id UUID REFERENCES public.departments(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read user profiles"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Kudos table
CREATE TABLE public.kudos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.kudos ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_kudos_created_at_id ON public.kudos (created_at DESC, id DESC);

CREATE POLICY "Authenticated users can read kudos"
  ON public.kudos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert kudos"
  ON public.kudos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Kudo hashtags junction table
CREATE TABLE public.kudo_hashtags (
  kudo_id UUID NOT NULL REFERENCES public.kudos(id) ON DELETE CASCADE,
  hashtag_id UUID NOT NULL REFERENCES public.hashtags(id) ON DELETE CASCADE,
  PRIMARY KEY (kudo_id, hashtag_id)
);

ALTER TABLE public.kudo_hashtags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read kudo hashtags"
  ON public.kudo_hashtags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert kudo hashtags"
  ON public.kudo_hashtags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Kudo images table
CREATE TABLE public.kudo_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kudo_id UUID NOT NULL REFERENCES public.kudos(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.kudo_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read kudo images"
  ON public.kudo_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert kudo images"
  ON public.kudo_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Kudo likes table
CREATE TABLE public.kudo_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kudo_id UUID NOT NULL REFERENCES public.kudos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (kudo_id, user_id)
);

ALTER TABLE public.kudo_likes ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_kudo_likes_kudo_id ON public.kudo_likes (kudo_id);

CREATE POLICY "Authenticated users can read kudo likes"
  ON public.kudo_likes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own likes"
  ON public.kudo_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON public.kudo_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Highlight kudos table
CREATE TABLE public.highlight_kudos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kudo_id UUID NOT NULL REFERENCES public.kudos(id) ON DELETE CASCADE,
  campaign TEXT,
  featured_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.highlight_kudos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read highlight kudos"
  ON public.highlight_kudos
  FOR SELECT
  TO authenticated
  USING (true);

-- Secret boxes table
CREATE TABLE public.secret_boxes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_opened BOOLEAN DEFAULT false NOT NULL,
  reward TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.secret_boxes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own secret boxes"
  ON public.secret_boxes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own secret boxes"
  ON public.secret_boxes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
