'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/statistics', label: 'Statistics' },
    { href: '/dashboard/settings', label: 'Settings' },
  ]

  return (
    <nav className="flex items-center gap-1 bg-dark-gray rounded-lg p-1 border border-medium-gray w-fit">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              isActive
                ? 'bg-accent text-black shadow-lg'
                : 'text-gray-400 hover:text-foreground hover:bg-medium-gray'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
