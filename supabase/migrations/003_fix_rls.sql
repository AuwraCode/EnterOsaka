-- Naprawa RLS - upewnij się, że RLS jest wyłączone i wszystkie polityki usunięte

-- Usuń wszystkie istniejące polityki RLS
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;
DROP POLICY IF EXISTS "Enable insert for all users" ON transactions;
DROP POLICY IF EXISTS "Enable read for all users" ON transactions;

-- Wyłącz RLS
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- Sprawdź czy RLS jest wyłączone (to nie wykona się jeśli już jest wyłączone, ale nie zaszkodzi)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'transactions'
  ) THEN
    ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
  END IF;
END $$;
