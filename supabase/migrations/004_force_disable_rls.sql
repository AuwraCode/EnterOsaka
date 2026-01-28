-- FORCE DISABLE RLS - Uruchom to jeśli nadal masz błąd RLS

-- Najpierw usuń WSZYSTKIE polityki (nawet jeśli nie wiesz jak się nazywają)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'transactions') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON transactions';
    END LOOP;
END $$;

-- Wyłącz RLS na pewno
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- Sprawdź i usuń wszystkie polityki które mogły zostać
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;
DROP POLICY IF EXISTS "Enable insert for all users" ON transactions;
DROP POLICY IF EXISTS "Enable read for all users" ON transactions;
DROP POLICY IF EXISTS "Enable update for all users" ON transactions;
DROP POLICY IF EXISTS "Enable delete for all users" ON transactions;

-- Wyłącz RLS ponownie (na wszelki wypadek)
ALTER TABLE IF EXISTS transactions DISABLE ROW LEVEL SECURITY;

-- Sprawdź status (to tylko informacja, nie zmienia nic)
SELECT 
    tablename, 
    rowsecurity as rls_enabled,
    CASE WHEN rowsecurity THEN 'RLS IS ENABLED - PROBLEM!' ELSE 'RLS IS DISABLED - OK!' END as status
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'transactions';
