-- Grant table-level permissions to authenticated and anon roles
-- RLS policies alone are not sufficient; PostgreSQL requires explicit GRANT for table access

-- Authenticated role: full CRUD access based on RLS policies
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;
GRANT SELECT, INSERT ON public.kudos TO authenticated;
GRANT SELECT, INSERT ON public.kudo_hashtags TO authenticated;
GRANT SELECT, INSERT ON public.kudo_images TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.kudo_likes TO authenticated;
GRANT SELECT ON public.hashtags TO authenticated;
GRANT SELECT ON public.departments TO authenticated;
GRANT SELECT ON public.highlight_kudos TO authenticated;
GRANT SELECT, UPDATE ON public.secret_boxes TO authenticated;
GRANT SELECT ON public.award_categories TO authenticated;

-- Anon role: read-only for search/autocomplete (already in 20260313000001 but repeated for completeness)
GRANT SELECT ON public.user_profiles TO anon;
GRANT SELECT ON public.hashtags TO anon;
GRANT SELECT ON public.departments TO anon;
