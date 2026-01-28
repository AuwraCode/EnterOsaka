-- Allow negative amounts in transactions (for losses/expenses)

-- Remove the old constraint that only allowed positive amounts
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_amount_check;

-- Add new constraint that allows any non-zero amount (positive or negative)
ALTER TABLE transactions ADD CONSTRAINT transactions_amount_check CHECK (amount != 0);
