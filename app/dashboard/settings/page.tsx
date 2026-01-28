'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { createClient } from '@/lib/supabase/client'

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic'

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || 'admin123'

export default function SettingsPage() {
  const [adminCode, setAdminCode] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [goalAmount, setGoalAmount] = useState('5000')
  
  // Only create client in browser
  const supabase = typeof window !== 'undefined' ? createClient() : null

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    // Check if already admin
    const adminStatus = localStorage.getItem('betscale_admin') === 'true'
    setIsAdmin(adminStatus)
    
    // Load goal amount
    const savedGoal = localStorage.getItem('goal_amount') || '5000'
    setGoalAmount(savedGoal)
  }, [])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (adminCode === ADMIN_CODE) {
      localStorage.setItem('betscale_admin', 'true')
      setIsAdmin(true)
      setAdminCode('')
    } else {
      setError('Invalid admin code')
    }
  }

  const handleResetProgress = async () => {
    if (!supabase) {
      alert('Database connection not available')
      return
    }

    if (!confirm('Are you sure you want to delete ALL transactions? This cannot be undone!')) {
      return
    }

    try {
      const { error } = await supabase.from('transactions').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      
      if (error) throw error
      
      alert('All transactions have been deleted!')
      window.location.reload()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  const handleChangeGoal = () => {
    const newGoal = parseInt(goalAmount)
    if (isNaN(newGoal) || newGoal <= 0) {
      alert('Goal amount must be a positive number')
      return
    }

    localStorage.setItem('goal_amount', newGoal.toString())
    alert(`Goal amount changed to ${newGoal.toLocaleString()} PLN`)
    window.location.reload()
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
                  Settings
                </h1>
                <p className="text-sm sm:text-base text-gray-400">Manage your tracker settings</p>
              </div>
              <div className="flex-shrink-0">
                <Navigation />
              </div>
            </div>
            <div className="w-[72px] flex-shrink-0"></div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Admin Access */}
          <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Admin Access</h2>
            
            {!isAdmin ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Admin Code
                  </label>
                  <input
                    type="password"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter admin code"
                    className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
                {error && (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-black font-semibold rounded-lg transition-colors"
                >
                  Access Admin Panel
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-3 text-green-400 text-sm">
                  ✓ Admin access granted
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('betscale_admin')
                    setIsAdmin(false)
                  }}
                  className="px-4 py-2 bg-medium-gray hover:bg-light-gray border border-light-gray rounded-lg text-sm transition-colors text-gray-300"
                >
                  Logout Admin
                </button>
              </div>
            )}
          </div>

          {/* Admin Panel */}
          {isAdmin && (
            <div className="bg-dark-gray rounded-xl p-6 border border-red-500/30 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-red-400">Admin Panel</h2>
              </div>

              <div className="space-y-6">
                {/* Change Goal Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Goal Amount (PLN)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      min="1"
                      className="flex-1 px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <button
                      onClick={handleChangeGoal}
                      className="px-6 py-3 bg-accent hover:bg-accent/90 text-black font-semibold rounded-lg transition-colors"
                    >
                      Update Goal
                    </button>
                  </div>
                </div>

                {/* Reset Progress */}
                <div className="pt-4 border-t border-light-gray">
                  <h3 className="text-lg font-semibold mb-2 text-red-400">Danger Zone</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    This will permanently delete all transactions. This action cannot be undone!
                  </p>
                  <button
                    onClick={handleResetProgress}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Reset All Progress
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* General Settings */}
          <div className="bg-dark-gray rounded-xl p-6 border border-medium-gray shadow-lg">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Current Goal Amount
                </label>
                <div className="px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground">
                  {typeof window !== 'undefined' 
                    ? parseInt(localStorage.getItem('goal_amount') || '5000').toLocaleString() 
                    : '5000'} PLN
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Use admin panel to change this value
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
