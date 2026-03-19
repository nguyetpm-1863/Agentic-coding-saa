-- Function to merge a seed profile (matched by email) into a new auth user ID.
-- Updates all FK references then reassigns the profile row.
CREATE OR REPLACE FUNCTION public.merge_profile_by_email(
  p_new_user_id UUID,
  p_email TEXT,
  p_name TEXT DEFAULT NULL,
  p_avatar_url TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_old_id UUID;
  v_old_name TEXT;
  v_old_avatar TEXT;
  v_old_dept_id UUID;
  v_old_dept_code TEXT;
  v_old_badge TEXT;
BEGIN
  -- Find existing profile with this email (but different ID)
  SELECT id, name, avatar_url, department_id, department_code, hero_badge
  INTO v_old_id, v_old_name, v_old_avatar, v_old_dept_id, v_old_dept_code, v_old_badge
  FROM public.user_profiles
  WHERE email = p_email AND id != p_new_user_id
  LIMIT 1;

  IF v_old_id IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Update FK references in kudos (references user_profiles.id)
  UPDATE public.kudos SET sender_id = p_new_user_id WHERE sender_id = v_old_id;
  UPDATE public.kudos SET receiver_id = p_new_user_id WHERE receiver_id = v_old_id;

  -- kudo_likes.user_id references auth.users(id), not user_profiles
  -- The old auth.users seed entry is gone after db reset, so these rows
  -- would have been cascade-deleted. No update needed.

  -- Delete the old profile row
  DELETE FROM public.user_profiles WHERE id = v_old_id;

  -- Insert the new profile preserving old data (name, department, badge, etc.)
  INSERT INTO public.user_profiles (id, name, email, avatar_url, department_id, department_code, hero_badge)
  VALUES (
    p_new_user_id,
    COALESCE(p_name, v_old_name),
    p_email,
    COALESCE(p_avatar_url, v_old_avatar),
    v_old_dept_id,
    v_old_dept_code,
    v_old_badge
  )
  ON CONFLICT (id) DO UPDATE SET
    name = COALESCE(EXCLUDED.name, user_profiles.name),
    email = EXCLUDED.email,
    avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url),
    department_id = COALESCE(EXCLUDED.department_id, user_profiles.department_id),
    department_code = COALESCE(EXCLUDED.department_code, user_profiles.department_code),
    hero_badge = COALESCE(EXCLUDED.hero_badge, user_profiles.hero_badge);

  RETURN TRUE;
END;
$$;

-- Allow authenticated users to call this function
GRANT EXECUTE ON FUNCTION public.merge_profile_by_email(UUID, TEXT, TEXT, TEXT) TO authenticated;
