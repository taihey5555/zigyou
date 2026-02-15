-- ============================================================
-- 東京 運搬・空港送迎 MVP / Supabase schema
-- ============================================================

-- enums
DO $$ BEGIN
  CREATE TYPE service_type AS ENUM ('kagu', 'airport');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'confirmed', 'done', 'canceled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- tables
CREATE TABLE IF NOT EXISTS areas (
  slug        text PRIMARY KEY,
  name        text NOT NULL,
  "group"     text NOT NULL,
  description text DEFAULT '',
  created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type                service_type NOT NULL,
  name                text NOT NULL,
  phone               text NOT NULL,
  email               text NOT NULL,
  pickup_address      text NOT NULL,
  dropoff_address     text NOT NULL,
  datetime_candidates jsonb NOT NULL DEFAULT '[]',
  payload             jsonb NOT NULL DEFAULT '{}',
  photo_urls          text[] DEFAULT '{}',
  status              inquiry_status DEFAULT 'new' NOT NULL,
  admin_note          text,
  estimated_price     int,
  final_price         int,
  created_at          timestamptz DEFAULT now() NOT NULL,
  updated_at          timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS cases (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type       service_type NOT NULL,
  title      text NOT NULL,
  body       text NOT NULL DEFAULT '',
  area_slug  text REFERENCES areas(slug) ON DELETE SET NULL,
  image_urls text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text NOT NULL,
  email      text NOT NULL,
  message    text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_inquiries_updated_at ON inquiries;
CREATE TRIGGER set_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_cases_updated_at ON cases;
CREATE TRIGGER set_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Admin check via admin_emails table
CREATE TABLE IF NOT EXISTS admin_emails (
  email text PRIMARY KEY
);

ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_emails_select_authenticated"
  ON admin_emails FOR SELECT
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_emails
    WHERE email = auth.jwt() ->> 'email'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- inquiries
CREATE POLICY "inquiries_insert_public"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "inquiries_select_admin"
  ON inquiries FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "inquiries_update_admin"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "inquiries_delete_admin"
  ON inquiries FOR DELETE
  TO authenticated
  USING (is_admin());

-- cases
CREATE POLICY "cases_select_public"
  ON cases FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "cases_insert_admin"
  ON cases FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "cases_update_admin"
  ON cases FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "cases_delete_admin"
  ON cases FOR DELETE
  TO authenticated
  USING (is_admin());

-- areas
CREATE POLICY "areas_select_public"
  ON areas FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "areas_insert_admin"
  ON areas FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "areas_update_admin"
  ON areas FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "areas_delete_admin"
  ON areas FOR DELETE
  TO authenticated
  USING (is_admin());

-- contact_messages
CREATE POLICY "contact_messages_insert_public"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "contact_messages_select_admin"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (is_admin());

-- Storage buckets (manual in Dashboard)
-- inquiry-photos (private)
-- case-images (public)

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_type ON inquiries (type);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_type ON cases (type);
CREATE INDEX IF NOT EXISTS idx_cases_area_slug ON cases (area_slug);
CREATE INDEX IF NOT EXISTS idx_areas_group ON areas ("group");
