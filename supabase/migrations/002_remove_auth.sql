-- Migracja do usunięcia autoryzacji (opcjonalna - tylko jeśli masz już starą tabelę z user_id)

-- Usuń kolumnę user_id jeśli istnieje
ALTER TABLE transactions DROP COLUMN IF EXISTS user_id;

-- Usuń indeks user_id jeśli istnieje
DROP INDEX IF EXISTS idx_transactions_user_id;

-- Usuń wszystkie polityki RLS jeśli istnieją
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;

-- Wyłącz RLS
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
