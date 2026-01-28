'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ACCESS_CODE = process.env.NEXT_PUBLIC_ACCESS_CODE || 'bet5000'

export default function AccessPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('betscale_authenticated')
    if (isAuthenticated === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simple delay for better UX
    setTimeout(() => {
      if (code === ACCESS_CODE) {
        localStorage.setItem('betscale_authenticated', 'true')
        router.push('/dashboard')
        router.refresh()
      } else {
        setError('Invalid access code')
        setLoading(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-gray-400 bg-clip-text text-transparent">
            BetScale Tracker
          </h1>
          <p className="text-gray-400 text-sm">Enter access code to continue</p>
        </div>

        <div className="bg-dark-gray rounded-xl p-8 border border-medium-gray shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Access Code
              </label>
              <input
                id="code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-center text-lg tracking-widest"
                placeholder="Enter code"
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
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
