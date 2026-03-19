-- Allow authenticated users to insert their own user_profiles row
-- Required for Google SSO users who don't have a profile yet
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
