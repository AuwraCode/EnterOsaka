'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProgressBars from './ProgressBars'
import TransactionForm from './TransactionForm'
import TransactionHistory from './TransactionHistory'
import RewardCard from './RewardCard'
import Navigation from './Navigation'

const getGoalAmount = () => {
  if (typeof window !== 'undefined') {
    return parseInt(localStorage.getItem('goal_amount') || '5000')
  }
  return 5000
}

interface Transaction {
  id: string
  amount: number
  description: string
  transaction_date: string
  player: string
  created_at: string
}

export default function DashboardContent() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [player, setPlayer] = useState<'A' | 'B'>('A')
  const supabase = createClient()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const [goalAmount, setGoalAmount] = useState(5000)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGoal = localStorage.getItem('goal_amount')
      if (savedGoal) {
        setGoalAmount(parseInt(savedGoal))
      }
    }
  }, [])

  const calculateProgress = (playerType: 'A' | 'B') => {
    const playerTransactions = transactions.filter((t) => t.player === playerType)
    const total = playerTransactions.reduce((sum, t) => sum + t.amount, 0)
    // Allow negative percentages (for losses)
    const percentage = (total / goalAmount) * 100
    return { total, percentage: Math.max(0, Math.min(percentage, 100)) }
  }

  const progressA = calculateProgress('A')
  const progressB = calculateProgress('B')

  // Calculate statistics per player
  const totalTransactions = transactions.length
  
  // Calculate average per day for each player (last 30 days)
  const last30DaysA = transactions.filter(t => {
    if (t.player !== 'A') return false
    const transactionDate = new Date(t.transaction_date)
    const daysDiff = (Date.now() - transactionDate.getTime()) / (1000 * 60 * 60 * 24)
    return daysDiff <= 30
  })
  const totalLast30DaysA = last30DaysA.reduce((sum, t) => sum + t.amount, 0)
  const avgPerDayA = last30DaysA.length > 0 ? totalLast30DaysA / 30 : 0

  const last30DaysB = transactions.filter(t => {
    if (t.player !== 'B') return false
    const transactionDate = new Date(t.transaction_date)
    const daysDiff = (Date.now() - transactionDate.getTime()) / (1000 * 60 * 60 * 24)
    return daysDiff <= 30
  })
  const totalLast30DaysB = last30DaysB.reduce((sum, t) => sum + t.amount, 0)
  const avgPerDayB = last30DaysB.length > 0 ? totalLast30DaysB / 30 : 0

  // Get latest transaction date for each player
  const latestTransactionA = transactions.find(t => t.player === 'A')
  const latestDateA = latestTransactionA 
    ? new Date(latestTransactionA.transaction_date).toLocaleDateString('pl-PL', { 
        day: 'numeric', 
        month: 'short' 
      })
    : 'Brak'

  const latestTransactionB = transactions.find(t => t.player === 'B')
  const latestDateB = latestTransactionB 
    ? new Date(latestTransactionB.transaction_date).toLocaleDateString('pl-PL', { 
        day: 'numeric', 
        month: 'short' 
      })
    : 'Brak'

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-gray-400 bg-clip-text text-transparent">
                  BetScale Tracker
                </h1>
                <p className="text-sm sm:text-base text-gray-400">Goal: {goalAmount.toLocaleString()} PLN</p>
              </div>
              <div className="flex-shrink-0">
                <Navigation />
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('betscale_authenticated')
                window.location.href = '/access'
              }}
              className="px-4 py-2 bg-medium-gray hover:bg-light-gray border border-light-gray rounded-lg text-sm transition-colors text-gray-300 hover:text-foreground flex-shrink-0"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Statistics Cards - Screampy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-gray rounded-xl p-5 border border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Screampy Total</p>
                <p className="text-2xl font-bold text-accent">{progressA.total.toFixed(2)} PLN</p>
                <p className="text-xs text-gray-500 mt-1">{progressA.percentage.toFixed(1)}% of goal</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-gray rounded-xl p-5 border border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Screampy Avg/Day</p>
                <p className="text-2xl font-bold text-accent">{avgPerDayA.toFixed(2)} PLN</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-gray rounded-xl p-5 border border-accent-orange/30 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Grzechu Total</p>
                <p className="text-2xl font-bold text-accent-orange">{progressB.total.toFixed(2)} PLN</p>
                <p className="text-xs text-gray-500 mt-1">{progressB.percentage.toFixed(1)}% of goal</p>
              </div>
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-gray rounded-xl p-5 border border-accent-orange/30 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Grzechu Avg/Day</p>
                <p className="text-2xl font-bold text-accent-orange">{avgPerDayB.toFixed(2)} PLN</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Progress Bars - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <ProgressBars
                progressA={progressA}
                progressB={progressB}
                goalAmount={goalAmount}
              />
            </div>
            
            {/* Reward Card - Same height as TransactionForm */}
            <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <RewardCard />
            </div>
          </div>

          {/* Transaction Form - Right Column */}
          <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TransactionForm
              player={player}
              setPlayer={setPlayer}
              onTransactionAdded={fetchTransactions}
            />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Player Comparison */}
          <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-accent rounded-full"></div>
              <h3 className="text-lg font-semibold">Player Comparison</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-medium-gray/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="font-medium">Screampy</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent">{progressA.total.toFixed(2)} PLN</div>
                  <div className="text-xs text-gray-400">{progressA.percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-medium-gray/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent-orange rounded-full"></div>
                  <span className="font-medium">Grzechu</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent-orange">{progressB.total.toFixed(2)} PLN</div>
                  <div className="text-xs text-gray-400">{progressB.percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="pt-3 border-t border-medium-gray">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Difference</span>
                  <span className={`font-bold ${progressA.total > progressB.total ? 'text-accent' : 'text-accent-orange'}`}>
                    {Math.abs(progressA.total - progressB.total).toFixed(2)} PLN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray shadow-lg animate-fade-in" style={{ animationDelay: '0.35s' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-accent-orange rounded-full"></div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
                </div>
              ) : transactions.length > 0 ? (
                transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-medium-gray/50 rounded-lg hover:bg-medium-gray transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${transaction.player === 'A' ? 'bg-accent' : 'bg-accent-orange'}`}></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{transaction.description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(transaction.transaction_date).toLocaleDateString('pl-PL', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold text-sm ml-3 ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)} PLN
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No transactions yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Transaction History</h2>
            <span className="text-sm text-gray-400">{transactions.length} transactions</span>
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              <p className="mt-4">Loading...</p>
            </div>
          ) : (
            <TransactionHistory transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  )
}
