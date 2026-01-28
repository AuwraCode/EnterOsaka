'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if authenticated
    const isAuthenticated = localStorage.getItem('betscale_authenticated')
    if (isAuthenticated === 'true') {
      router.push('/dashboard')
    } else {
      router.push('/access')
    }
  }, [router])

  return null
}
