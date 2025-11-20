import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Allow access to login page without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }
  
  // For all other admin routes, check authentication
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}

