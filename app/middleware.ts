import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: authOptions.secret 
  });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Check for super admin routes
  if (request.nextUrl.pathname.startsWith('/admin/super')) {
    if (token.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  // Check for regular admin routes
  else if (request.nextUrl.pathname.startsWith('/admin')) {
    if (token.role !== 'admin' && token.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 