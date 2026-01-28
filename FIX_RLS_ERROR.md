# Fix RLS Error - "new row violates row-level security policy"

## Problem
When trying to add a transaction, you see the error:
```
new row violates row-level security policy for table "transactions"
```

This happens because Row Level Security (RLS) is still enabled in your Supabase database.

## ⚡ QUICK FIX (Copy and Run This!)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New query**

### Step 2: Copy and Run This Code

**Copy this ENTIRE code block and paste it into SQL Editor:**

```sql
-- FORCE DISABLE RLS - This will remove ALL policies and disable RLS
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'transactions') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON transactions';
    END LOOP;
END $$;

-- Disable RLS
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- Remove any remaining policies manually
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;
DROP POLICY IF EXISTS "Enable insert for all users" ON transactions;
DROP POLICY IF EXISTS "Enable read for all users" ON transactions;
DROP POLICY IF EXISTS "Enable update for all users" ON transactions;
DROP POLICY IF EXISTS "Enable delete for all users" ON transactions;

-- Final check - this will show you if RLS is disabled
SELECT 
    tablename, 
    CASE WHEN rowsecurity THEN '❌ RLS IS ENABLED' ELSE '✅ RLS IS DISABLED' END as status
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'transactions';
```

### Step 3: Execute

1. Click **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. You should see a success message
3. At the bottom, you should see: `✅ RLS IS DISABLED`

### Step 4: Test

1. Go back to your app
2. Try adding a transaction - **it should work now!**

## Still Not Working?

If you still get the error:

1. **Check if the table exists:**
   ```sql
   SELECT * FROM pg_tables WHERE tablename = 'transactions';
   ```

2. **Check current RLS status:**
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables 
   WHERE schemaname = 'public' AND tablename = 'transactions';
   ```
   `rowsecurity` should be `false`

3. **List all policies (should be empty):**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'transactions';
   ```

4. **If policies still exist, run this to remove them all:**
   ```sql
   DO $$
   DECLARE
       r RECORD;
   BEGIN
       FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'transactions') LOOP
           EXECUTE 'DROP POLICY ' || quote_ident(r.policyname) || ' ON transactions';
       END LOOP;
   END $$;
   ```

## Alternative: Use Migration File

You can also use the migration file:
- File: `supabase/migrations/004_force_disable_rls.sql`
- Copy its contents and run in SQL Editor

## Still Having Issues?

If the error persists:

1. Check if RLS is disabled:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' AND tablename = 'transactions';
   ```
   `rowsecurity` should be `false`

2. Check for any remaining policies:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'transactions';
   ```
   This should return no rows

3. If policies still exist, manually remove them:
   ```sql
   DROP POLICY IF EXISTS "policy_name" ON transactions;
   ```
