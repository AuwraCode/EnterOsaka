import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Don't create client during build time
  if (typeof window === 'undefined') {
    // Return a mock client during SSR/build to prevent build-time errors
    return null as any
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
