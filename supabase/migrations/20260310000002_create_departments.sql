CREATE TABLE IF NOT EXISTS public.departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can read departments' AND tablename = 'departments'
  ) THEN
    CREATE POLICY "Authenticated users can read departments"
      ON public.departments
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;
