import { cookies } from 'next/headers'

const ADMIN_EMAIL = 'prajapativraj147@gmail.com'

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')
    
    if (!token) {
      return false
    }

    // Decode token to verify (simple check)
    try {
      const decoded = Buffer.from(token.value, 'base64').toString('utf-8')
      const [email] = decoded.split(':')
      
      // Verify email matches
      return email === ADMIN_EMAIL
    } catch {
      return false
    }
  } catch (error) {
    return false
  }
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
  
  return null
}

