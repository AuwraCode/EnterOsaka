-- Create transactions table (bez autoryzacji - prosta wersja)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player VARCHAR(1) NOT NULL CHECK (player IN ('A', 'B')),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount != 0),
  description VARCHAR(255) NOT NULL,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_player ON transactions(player);

-- Wyłącz RLS - aplikacja jest publiczna (bez logowania)
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
