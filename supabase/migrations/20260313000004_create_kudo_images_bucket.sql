-- Create storage bucket for kudo images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('kudo-images', 'kudo-images', true, 4194304, '{image/jpeg,image/png,image/gif,image/webp}')
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload kudo images
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload kudo images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Authenticated users can upload kudo images"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'kudo-images');
  END IF;
END $$;

-- Allow public read for kudo images
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public can read kudo images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Public can read kudo images"
      ON storage.objects
      FOR SELECT
      TO anon, authenticated
      USING (bucket_id = 'kudo-images');
  END IF;
END $$;
