'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('betscale_authenticated')
    if (isAuthenticated !== 'true') {
      router.push('/access')
    }
  }, [router])

  return <>{children}</>
}
