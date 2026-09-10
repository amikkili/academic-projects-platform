-- ============================================================
-- AcademiCode — Supabase schema  (all tables prefixed ac_)
-- Run this in Supabase SQL Editor → New Query
-- Safe to re-run: uses IF NOT EXISTS and ON CONFLICT DO NOTHING
-- ============================================================

-- ── Tables ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ac_profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ac_payments (
  id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan                 TEXT NOT NULL,           -- 'single' | 'all'
  project_id           TEXT,                   -- only for single plan
  amount_paise         INTEGER NOT NULL,
  razorpay_order_id    TEXT UNIQUE NOT NULL,
  razorpay_payment_id  TEXT,
  razorpay_signature   TEXT,
  status               TEXT NOT NULL DEFAULT 'created',  -- created | paid | failed
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  paid_at              TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS ac_marks_entries (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,
  data_json   TEXT NOT NULL,
  total_marks INTEGER DEFAULT 50,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ac_resume_entries (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  mode         TEXT DEFAULT 'fresher',
  skills       TEXT NOT NULL,
  years_exp    TEXT DEFAULT '0',
  input_json   TEXT NOT NULL,
  bullets_json TEXT NOT NULL,
  summary      TEXT DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ac_site_stats (
  key   TEXT PRIMARY KEY,
  value INTEGER DEFAULT 0
);

-- Seed visitor count (idempotent)
INSERT INTO ac_site_stats (key, value)
VALUES ('visitor_count', 0)
ON CONFLICT (key) DO NOTHING;

-- ── Row Level Security ────────────────────────────────────────

ALTER TABLE ac_profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE ac_payments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE ac_marks_entries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ac_resume_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ac_site_stats     ENABLE ROW LEVEL SECURITY;

-- Drop policies before re-creating (safe to re-run)
DROP POLICY IF EXISTS "ac own profile"       ON ac_profiles;
DROP POLICY IF EXISTS "ac own payments"      ON ac_payments;
DROP POLICY IF EXISTS "ac own marks"         ON ac_marks_entries;
DROP POLICY IF EXISTS "ac own resumes"       ON ac_resume_entries;
DROP POLICY IF EXISTS "ac read stats"        ON ac_site_stats;
DROP POLICY IF EXISTS "ac service stats"     ON ac_site_stats;

CREATE POLICY "ac own profile"   ON ac_profiles       FOR ALL USING (auth.uid() = id);
CREATE POLICY "ac own payments"  ON ac_payments        FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "ac own marks"     ON ac_marks_entries   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "ac own resumes"   ON ac_resume_entries  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "ac read stats"    ON ac_site_stats      FOR SELECT USING (true);
-- service_role key bypasses RLS; anon users only need SELECT

-- ── Trigger: auto-create profile on signup ───────────────────

CREATE OR REPLACE FUNCTION ac_handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.ac_profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      ''
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ac_on_auth_user_created ON auth.users;
CREATE TRIGGER ac_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION ac_handle_new_user();
