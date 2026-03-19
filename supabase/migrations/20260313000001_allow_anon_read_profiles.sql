-- Allow anon users to read user profiles, hashtags, and departments for search/autocomplete
-- This is needed because the write-kudo modal searches for recipients before the user may be fully authenticated in some flows

-- Grant table-level SELECT to anon role (required alongside RLS policies)
GRANT SELECT ON public.user_profiles TO anon;
GRANT SELECT ON public.hashtags TO anon;
GRANT SELECT ON public.departments TO anon;

CREATE POLICY "Anon users can read user profiles"
  ON public.user_profiles
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anon users can read hashtags"
  ON public.hashtags
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anon users can read departments"
  ON public.departments
  FOR SELECT
  TO anon
  USING (true);
