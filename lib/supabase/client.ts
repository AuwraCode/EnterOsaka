import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Don't create client during build time or SSR
  if (typeof window === 'undefined') {
    // Return a mock client during SSR/build to prevent build-time errors
    return null as any
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if environment variables are available
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your Vercel environment variables.')
    // Return null instead of throwing to allow graceful degradation
    return null as any
  }

  try {
    return createBrowserClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null as any
  }
}
