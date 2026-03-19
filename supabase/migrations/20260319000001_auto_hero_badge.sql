-- Auto-compute hero_badge on user_profiles based on kudos received count
-- 1-4 = New Hero, 5-9 = Rising Hero, 10-20 = Super Hero, >20 = Legend Hero

CREATE OR REPLACE FUNCTION public.compute_hero_badge(user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  kudo_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO kudo_count
  FROM public.kudos
  WHERE receiver_id = user_id;

  IF kudo_count > 20 THEN
    RETURN 'Legend Hero';
  ELSIF kudo_count >= 10 THEN
    RETURN 'Super Hero';
  ELSIF kudo_count >= 5 THEN
    RETURN 'Rising Hero';
  ELSIF kudo_count >= 1 THEN
    RETURN 'New Hero';
  ELSE
    RETURN NULL;
  END IF;
END;
$$;

-- Trigger function: update hero_badge for the receiver when a kudo is inserted or deleted
CREATE OR REPLACE FUNCTION public.update_hero_badge()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE public.user_profiles
    SET hero_badge = public.compute_hero_badge(OLD.receiver_id)
    WHERE id = OLD.receiver_id;
    RETURN OLD;
  ELSE
    UPDATE public.user_profiles
    SET hero_badge = public.compute_hero_badge(NEW.receiver_id)
    WHERE id = NEW.receiver_id;
    RETURN NEW;
  END IF;
END;
$$;

-- Create trigger on kudos table
DROP TRIGGER IF EXISTS trg_update_hero_badge ON public.kudos;
CREATE TRIGGER trg_update_hero_badge
AFTER INSERT OR DELETE ON public.kudos
FOR EACH ROW
EXECUTE FUNCTION public.update_hero_badge();

-- Backfill: compute hero_badge for all existing users
UPDATE public.user_profiles
SET hero_badge = public.compute_hero_badge(id);
