'use client'

import { useState, useEffect } from 'react'

interface RewardCardProps {
  imageUrl?: string
  link?: string
  description?: string
  name?: string
}

export default function RewardCard({ imageUrl, link, description, name }: RewardCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localImageUrl, setLocalImageUrl] = useState('')
  const [localLink, setLocalLink] = useState('')
  const [localDescription, setLocalDescription] = useState('')
  const [localName, setLocalName] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('reward_image') || imageUrl || ''
    const savedLink = localStorage.getItem('reward_link') || link || ''
    const savedDescription = localStorage.getItem('reward_description') || description || ''
    const savedName = localStorage.getItem('reward_name') || name || ''
    setLocalImageUrl(savedImage)
    setLocalLink(savedLink)
    setLocalDescription(savedDescription)
    setLocalName(savedName)
  }, [imageUrl, link, description, name])

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('reward_image', localImageUrl)
    localStorage.setItem('reward_link', localLink)
    localStorage.setItem('reward_description', localDescription)
    localStorage.setItem('reward_name', localName)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Restore from localStorage
    const savedImage = localStorage.getItem('reward_image') || imageUrl || ''
    const savedLink = localStorage.getItem('reward_link') || link || ''
    const savedDescription = localStorage.getItem('reward_description') || description || ''
    const savedName = localStorage.getItem('reward_name') || name || ''
    setLocalImageUrl(savedImage)
    setLocalLink(savedLink)
    setLocalDescription(savedDescription)
    setLocalName(savedName)
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
          {!isEditing ? (
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
                className="px-3 py-1.5 text-xs font-medium bg-accent hover:bg-accent/90 text-black rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-xs font-medium bg-medium-gray hover:bg-light-gray border border-light-gray rounded-lg transition-colors text-gray-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
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
