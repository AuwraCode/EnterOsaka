# Fix "null value in column user_id" Error

## Problem
When trying to add a transaction, you see the error:
```
null value in column "user_id" of relation "transactions" violates not-null constraint
```

This happens because your `transactions` table still has a `user_id` column that requires a value, but the app no longer uses authentication.

## ⚡ QUICK FIX

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New query**

### Step 2: Copy and Run This Code

**Copy this ENTIRE code block and paste it into SQL Editor:**

```sql
-- Remove user_id column from transactions table

-- First, remove the foreign key constraint if it exists
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_user_id_fkey;

-- Remove the index on user_id if it exists
DROP INDEX IF EXISTS idx_transactions_user_id;

-- Remove the user_id column
ALTER TABLE transactions DROP COLUMN IF EXISTS user_id;

-- Verify the column is removed (should NOT show user_id)
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'transactions' AND table_schema = 'public'
ORDER BY ordinal_position;
```

### Step 3: Execute

1. Click **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. You should see a success message
3. At the bottom, you should see a list of columns - `user_id` should NOT be in the list

### Step 4: Test

1. Go back to your app
2. Refresh the page (F5)
3. Try adding a transaction - **it should work now!**

## Expected Result

After running the migration, your `transactions` table should have these columns:
- `id` (uuid)
- `player` (varchar)
- `amount` (numeric)
- `description` (varchar)
- `transaction_date` (date)
- `created_at` (timestamp)

**NOT** `user_id` - this column should be removed.

## Still Having Issues?

If you still get errors:

1. **Check if user_id column exists:**
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'transactions' AND column_name = 'user_id';
   ```
   This should return 0 rows (no user_id column)

2. **Check all columns in the table:**
   ```sql
   SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'transactions' AND table_schema = 'public';
   ```

3. **If user_id still exists, try removing it manually:**
   ```sql
   ALTER TABLE transactions DROP COLUMN user_id CASCADE;
   ```

## Alternative: Use Migration File

You can also use the migration file:
- File: `supabase/migrations/005_remove_user_id_column.sql`
- Copy its contents and run in SQL Editor
