'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface TransactionFormProps {
  player: 'A' | 'B'
  setPlayer: (player: 'A' | 'B') => void
  onTransactionAdded: () => void
}

const getPlayerName = (player: 'A' | 'B') => {
  return player === 'A' ? 'Screampy' : 'Grzechu'
}

export default function TransactionForm({
  player,
  setPlayer,
  onTransactionAdded,
}: TransactionFormProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Only create client in browser and if env vars are available
  const supabase = typeof window !== 'undefined' ? createClient() : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!supabase) {
      setError('Database connection not available. Please check environment variables.')
      setLoading(false)
      return
    }

    try {
      const amountNum = parseFloat(amount)
      if (isNaN(amountNum) || amountNum === 0) {
        throw new Error('Amount cannot be zero')
      }

      const { error: insertError } = await supabase.from('transactions').insert({
        amount: amountNum,
        description: description.trim(),
        transaction_date: date,
        player,
      })

      if (insertError) throw insertError

      // Reset form
      setAmount('')
      setDescription('')
      setDate(new Date().toISOString().split('T')[0])
      onTransactionAdded()
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark-gray rounded-xl p-5 sm:p-6 border border-medium-gray shadow-lg hover:shadow-xl transition-all duration-300 sticky top-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-accent rounded-full"></div>
        <h2 className="text-lg sm:text-xl font-semibold">Add Transaction</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Player Selection */}
        <div>
          <label className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide">
            Player
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPlayer('A')}
              className={`flex-1 py-2.5 rounded-lg border transition-all duration-200 font-medium ${
                player === 'A'
                  ? 'bg-accent/20 border-accent text-accent shadow-lg shadow-accent/20'
                  : 'bg-medium-gray border-light-gray text-gray-400 hover:border-accent/50 hover:text-gray-300'
              }`}
            >
              Screampy
            </button>
            <button
              type="button"
              onClick={() => setPlayer('B')}
              className={`flex-1 py-2.5 rounded-lg border transition-all duration-200 font-medium ${
                player === 'B'
                  ? 'bg-accent-orange/20 border-accent-orange text-accent-orange shadow-lg shadow-accent-orange/20'
                  : 'bg-medium-gray border-light-gray text-gray-400 hover:border-accent-orange/50 hover:text-gray-300'
              }`}
            >
              Grzechu
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide"
          >
            Amount (PLN)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="150.00"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={100}
            className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="Flipping RAM DDR4 16GB"
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide"
          >
            Transaction Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-400 text-sm animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-accent hover:bg-accent/90 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span>
              Adding...
            </span>
          ) : (
            'Add Transaction'
          )}
        </button>
      </form>
    </div>
  )
}
