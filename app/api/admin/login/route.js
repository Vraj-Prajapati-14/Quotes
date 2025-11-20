import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_EMAIL = 'prajapativraj147@gmail.com'
const ADMIN_PASSWORD = 'Vraj@#1234'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple token (in production, use JWT or proper session)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      
      // Set cookie
      const cookieStore = await cookies()
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return NextResponse.json({ 
        success: true,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'An error occurred'
    }, { status: 500 })
  }
}

