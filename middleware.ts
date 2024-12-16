import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Protected routes pattern
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard')
    const isAuthRoute = req.nextUrl.pathname.startsWith('/auth/')
    
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (isAuthRoute && req.nextauth.token) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // If user is not authenticated and trying to access protected routes, redirect to login
    if (isProtectedRoute && !req.nextauth.token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow public access to auth pages
        if (req.nextUrl.pathname.startsWith('/auth/')) {
          return true
        }
        // Require auth for dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard/')) {
          return !!token
        }
        // Allow public access to other pages
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
  ],
} 