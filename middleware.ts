// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/jwt';

const protectedRoutes = [
  '/admin/dashboard',
  '/manager/dashboard', 
  '/client/dashboard',
  '/analytics',
  '/profile',
  '/settings'
];

const publicRoutes = [
  '/login',
  '/signup',
  '/'
];

// Updated roleRoutes to include all protected routes
const roleRoutes = {
  '/admin/dashboard': ['ADMIN'],
  '/manager/dashboard': ['MANAGER'],
  '/client/dashboard': ['CLIENT'],
  '/analytics': ['ADMIN'],
  // Add these routes - accessible by all authenticated users
  '/profile': ['ADMIN', 'MANAGER', 'CLIENT'],
  '/settings': ['ADMIN', 'MANAGER', 'CLIENT']
} as const;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;
  
  // Skip API routes - they have their own protection
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if route is protected - use exact match first, then startsWith
  const isProtectedRoute = protectedRoutes.includes(pathname) || 
    protectedRoutes.some(route => pathname.startsWith(route + '/'));
  
  const isPublicRoute = publicRoutes.includes(pathname);

  // If protected route without valid token, redirect to login
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Now using async verifyJWT
    const payload = await verifyJWT(token);
    if (!payload) {
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('authToken');
      return response;
    }

    // Check role-based access - find exact match first, then prefix match
    let requiredRoles = roleRoutes[pathname as keyof typeof roleRoutes];
    
    // If no exact match, check for routes that start with the pathname
    if (!requiredRoles) {
      for (const [route, roles] of Object.entries(roleRoutes)) {
        if (pathname.startsWith(route)) {
          requiredRoles = roles;
          break;
        }
      }
    }
    
    if (requiredRoles && !requiredRoles.includes(payload.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // If user is authenticated and tries to access login/signup, redirect to dashboard
  if (isPublicRoute && token && (pathname === '/login' || pathname === '/signup')) {
    const payload = await verifyJWT(token);
    if (payload) {
      const dashboardPath = `/${payload.role.toLowerCase()}/dashboard`;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};