-- Remove user_id column from transactions table
-- This fixes: "null value in column "user_id" violates not-null constraint"

-- First, remove the foreign key constraint if it exists
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_user_id_fkey;

-- Remove the index on user_id if it exists
DROP INDEX IF EXISTS idx_transactions_user_id;

-- Remove the user_id column
ALTER TABLE transactions DROP COLUMN IF EXISTS user_id;

-- Verify the column is removed
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'transactions' AND table_schema = 'public'
ORDER BY ordinal_position;
