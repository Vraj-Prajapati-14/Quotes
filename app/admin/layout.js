import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default async function AdminLayout({ children, params }) {
  // Check if we're on the login page by checking the URL
  // Since we can't easily get pathname in layout, we'll use a different approach
  // Move login page outside admin folder or handle it differently
  
  // For now, we'll skip auth check in layout and handle it in individual pages
  // This prevents the redirect loop
  return <>{children}</>
}

