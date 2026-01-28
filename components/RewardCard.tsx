'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface RewardCardProps {
  imageUrl?: string
  link?: string
  description?: string
  name?: string
}

const REWARD_ID = '00000000-0000-0000-0000-000000000001'

export default function RewardCard({ imageUrl, link, description, name }: RewardCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localImageUrl, setLocalImageUrl] = useState('')
  const [localLink, setLocalLink] = useState('')
  const [localDescription, setLocalDescription] = useState('')
  const [localName, setLocalName] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = typeof window !== 'undefined' ? createClient() : null

  // Check if user is admin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminStatus = localStorage.getItem('betscale_admin') === 'true'
      setIsAdmin(adminStatus)
    }
  }, [])

  // Load reward from database
  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    fetchReward()
  }, [supabase])

  const fetchReward = async () => {
    if (!supabase) return

    try {
      const { data, error: fetchError } = await supabase
        .from('reward')
        .select('*')
        .eq('id', REWARD_ID)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is OK for first time
        throw fetchError
      }

      if (data) {
        setLocalImageUrl(data.image_url || '')
        setLocalLink(data.link || '')
        setLocalDescription(data.description || '')
        setLocalName(data.name || '')
      }
    } catch (err: any) {
      console.error('Error fetching reward:', err)
      setError('Failed to load reward data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!supabase) {
      setError('Database connection not available')
      return
    }

    if (!isAdmin) {
      setError('Only admins can edit reward')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('reward')
        .upsert({
          id: REWARD_ID,
          name: localName || null,
          image_url: localImageUrl || null,
          link: localLink || null,
          description: localDescription || null,
        })

      if (updateError) throw updateError

      setIsEditing(false)
      // Refresh data
      await fetchReward()
    } catch (err: any) {
      console.error('Error saving reward:', err)
      setError(err.message || 'Failed to save reward')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    // Reload from database
    await fetchReward()
    setIsEditing(false)
  }

  const displayImageUrl = localImageUrl
  const displayLink = localLink
  const displayDescription = localDescription
  const displayName = localName

  return (
    <div className="bg-dark-gray rounded-xl border border-medium-gray shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-6 bg-accent rounded-full"></div>
          <h3 className="text-lg sm:text-xl font-semibold">Reward</h3>
          <div className="flex-1"></div>
          {isAdmin && (
            !isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-xs font-medium bg-medium-gray hover:bg-light-gray border border-light-gray rounded-lg transition-colors text-gray-300 hover:text-foreground"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-1.5">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-3 py-1.5 text-xs font-medium bg-accent hover:bg-accent/90 text-black rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-3 py-1.5 text-xs font-medium bg-medium-gray hover:bg-light-gray border border-light-gray rounded-lg transition-colors text-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )
          )}
        </div>

        {error && (
          <div className="mb-4 bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading && !isEditing && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
          </div>
        )}

        {loading && !isEditing ? null : isEditing ? (
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide">
                Reward Name
              </label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="Enter reward name..."
                maxLength={50}
                className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide">
                Image URL
              </label>
              <input
                type="url"
                value={localImageUrl}
                onChange={(e) => setLocalImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Link Input */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide">
                Reward Link
              </label>
              <input
                type="url"
                value={localLink}
                onChange={(e) => setLocalLink(e.target.value)}
                placeholder="https://example.com/reward"
                className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Description Input */}
            <div className="flex-1">
              <label className="block text-xs font-medium mb-2 text-gray-400 uppercase tracking-wide">
                Description
              </label>
              <textarea
                value={localDescription}
                onChange={(e) => setLocalDescription(e.target.value)}
                placeholder="Describe the reward..."
                rows={3}
                maxLength={150}
                className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none h-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* Left side: Name, Description, Button */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="space-y-3">
                {/* Reward Name */}
                {displayName ? (
                  <h4 className="text-lg sm:text-xl font-semibold text-foreground">{displayName}</h4>
                ) : (
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-500">Reward Name</h4>
                )}

                {/* Description */}
                {displayDescription ? (
                  <p className="text-sm text-gray-300 leading-relaxed">{displayDescription}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No description</p>
                )}
              </div>

              {/* Button */}
              {displayLink ? (
                <a
                  href={displayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full px-4 py-3 bg-accent hover:bg-accent/90 text-black font-semibold rounded-lg text-center transition-all hover:shadow-lg hover:shadow-accent/20"
                >
                  View Product →
                </a>
              ) : (
                <div className="mt-4 block w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg text-center text-gray-500 text-sm">
                  No link available
                </div>
              )}
            </div>

            {/* Right side: Image */}
            <div className="w-full sm:w-48 lg:w-56 flex-shrink-0">
              {displayImageUrl ? (
                <div className="relative w-full h-full min-h-[180px] sm:min-h-[200px] rounded-lg overflow-hidden bg-medium-gray border border-light-gray">
                  <img
                    src={displayImageUrl}
                    alt={displayName || 'Reward'}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                    Image not found
                  </div>
                </div>
              ) : (
                <div className="w-full h-full min-h-[180px] sm:min-h-[200px] rounded-lg bg-medium-gray border border-light-gray border-dashed flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-1">🖼️</div>
                    <p className="text-xs">No image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
