import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BetScale Tracker',
  description: 'Track your progress toward 5,000 PLN profit goal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  )
}
