-- 1. Grant usage on the public schema (often needed for anon/authenticated roles)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 2. Grant all privileges on the settings table to postgres and service_role (admins)
GRANT ALL ON TABLE "public"."settings" TO postgres, service_role;

-- 3. Grant SELECT (read) access to the settings table for authenticated users and anon users
-- We grant to 'anon' as well just in case fetch happens before full session hydration, 
-- though your app seems protected. It doesn't hurt for 'settings' which are usually public config.
GRANT SELECT ON TABLE "public"."settings" TO anon, authenticated;

-- 4. Grant UPDATE (write) access to authenticated users
GRANT UPDATE ON TABLE "public"."settings" TO authenticated;

-- 5. Enable Row Level Security (RLS) - It is best practice to keep this ENABLED
ALTER TABLE "public"."settings" ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies to avoid conflicts/duplicates
DROP POLICY IF EXISTS "Allow read access for all users" ON "public"."settings";
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON "public"."settings";
DROP POLICY IF EXISTS "Allow update access for authenticated users" ON "public"."settings";

-- 7. Create Policy for SELECT: Allow EVERYONE (auth + anon) to read settings
-- This fixes the issue if the user's session isn't perfectly recognized yet
CREATE POLICY "Allow read access for all users"
ON "public"."settings"
FOR SELECT
TO public
USING (true);

-- 8. Create Policy for UPDATE: Allow only authenticated users to update
CREATE POLICY "Allow update access for authenticated users"
ON "public"."settings"
FOR UPDATE
TO authenticated
USING (true);
