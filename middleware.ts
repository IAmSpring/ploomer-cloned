import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ROLES, Role } from '@/types/roles';

// Define protected routes and their required roles/permissions
const protectedRoutes: Record<string, Role[]> = {
  '/admin': ['admin', 'super_admin'],
  '/admin/users': ['admin', 'super_admin'],
  '/admin/settings': ['super_admin'],
  '/tickets/manage': ['admin', 'super_admin'],
  '/tickets/categories': ['super_admin'],
} as const;

// Define public routes that don't require authentication
const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/',
  '/about',
  '/contact',
  '/pricing',
] as const;

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check protected routes
  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      const userRole = token.role as Role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        // If user's role isn't in the allowed roles, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  // Special handling for ticket routes
  if (pathname.startsWith('/tickets')) {
    // Allow ticket creation for all authenticated users
    if (pathname === '/tickets/create') {
      return NextResponse.next();
    }

    // Check if user can view all tickets
    if (!token.permissions?.canViewAllTickets && pathname.includes('/tickets/all')) {
      return NextResponse.redirect(new URL('/tickets/my', request.url));
    }

    // Check if user can manage ticket categories
    if (pathname.includes('/tickets/categories') && !token.permissions?.canManageTicketCategories) {
      return NextResponse.redirect(new URL('/tickets/my', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 