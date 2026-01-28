'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navigation from '@/components/Navigation'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Transaction {
  id: string
  amount: number
  description: string
  transaction_date: string
  player: string
  created_at: string
}

export default function StatisticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [goalAmount, setGoalAmount] = useState(5000)
  const supabase = createClient()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGoal = localStorage.getItem('goal_amount')
      if (savedGoal) {
        setGoalAmount(parseInt(savedGoal))
      }
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: true })

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate cumulative progress over time
  const calculateProgressData = () => {
    const screampyData: { date: string; progress: number; total: number }[] = []
    const grzechuData: { date: string; progress: number; total: number }[] = []

    let screampyTotal = 0
    let grzechuTotal = 0

    transactions.forEach((t) => {
      if (t.player === 'A') {
        screampyTotal += t.amount
      } else {
        grzechuTotal += t.amount
      }

      const date = new Date(t.transaction_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })

      screampyData.push({
        date,
        progress: Math.max(0, Math.min((screampyTotal / goalAmount) * 100, 100)),
        total: screampyTotal,
      })

      grzechuData.push({
        date,
        progress: Math.max(0, Math.min((grzechuTotal / goalAmount) * 100, 100)),
        total: grzechuTotal,
      })
    })

    // Merge data for chart
    const mergedData = screampyData.map((s, i) => ({
      date: s.date,
      Screampy: s.progress,
      Grzechu: grzechuData[i]?.progress || 0,
    }))

    return mergedData
  }

  // Calculate daily amounts
  const calculateDailyAmounts = () => {
    const dailyData: { [key: string]: { Screampy: number; Grzechu: number } } = {}

    transactions.forEach((t) => {
      const date = new Date(t.transaction_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })

      if (!dailyData[date]) {
        dailyData[date] = { Screampy: 0, Grzechu: 0 }
      }

      if (t.player === 'A') {
        dailyData[date].Screampy += t.amount
      } else {
        dailyData[date].Grzechu += t.amount
      }
    })

    return Object.entries(dailyData).map(([date, amounts]) => ({
      date,
      ...amounts,
    }))
  }

  const progressData = calculateProgressData()
  const dailyData = calculateDailyAmounts()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-gray-400 bg-clip-text text-transparent">
                  Statistics
                </h1>
                <p className="text-sm sm:text-base text-gray-400">Visual insights into your progress</p>
              </div>
              <div className="flex-shrink-0">
                <Navigation />
              </div>
            </div>
            <div className="w-[72px] flex-shrink-0"></div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress to Goal Line Chart */}
          <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Progress to Goal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Screampy"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Grzechu"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: '#f97316', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Transaction Amounts Bar Chart */}
          <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Daily Transaction Amounts</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="Screampy" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Grzechu" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
