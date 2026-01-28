import DashboardContent from '@/components/DashboardContent'

// Force dynamic rendering to avoid build-time issues with Supabase
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return <DashboardContent />
}
