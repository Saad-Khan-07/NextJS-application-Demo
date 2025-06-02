// auth-middleware.ts - Complete Authentication Module
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, signJWT } from './jwt';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

// Types
export interface User {
  email: string;
  id: string;
  username: string;
  role: string;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
    username: string;
  };
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export async function getSession(request?: NextRequest): Promise<{ user: User; authenticated: boolean } | null> {
  let token: string | undefined;
  
  if (request) {
    // For API routes - get token from request
    token = request.cookies.get('authToken')?.value;
  } else {
    // For server components - get token from cookies
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    token = cookieStore.get('authToken')?.value;
  }
  
  if (!token) {
    return null;
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return null;
  }

  return {
    authenticated: true,
    user: {
      email: payload.email,
      id: payload.userId,
      username: payload.username,
      role: payload.role
    }
  };
}

// ============================================
// USER VALIDATION & CREATION
// ============================================

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  try {
    // Email format validation
    const emailRegex = /^[a-zA-Z0-9.-]*\.?adriit@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return null;
    }

    // Password strength validation
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password)) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
}

export async function createUser(email: string, password: string, username: string, role: string): Promise<User> {
  try {
    // Email format validation
    const emailRegex = /^[a-zA-Z0-9.-]*\.?adriit@gmail\.com$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format. Email must end with adriit@gmail.com');
    }

    // Password strength validation
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password)) {
      throw new Error('Password must contain at least one letter, one number, and one special character, and be at least 8 characters long');
    }

    // Username validation
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }

    const trimmedUsername = username.trim();
    
    // Username format validation (alphanumeric and underscores only, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      throw new Error('Username must be 3-20 characters long and contain only letters, numbers, and underscores');
    }

    // Check if user already exists (by email)
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      throw new Error('User already exists with this email address');
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: trimmedUsername }
    });

    if (existingUsername) {
      throw new Error('Username is already taken');
    }

    // Convert role to uppercase and validate
    const upperRole = role.toUpperCase();
    if (upperRole !== "CLIENT" && upperRole !== "ADMIN" && upperRole !== "MANAGER") {
      throw new Error('Invalid role. Role must be client, admin, or manager');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: trimmedUsername,
        role: upperRole as any
      }
    });

    return {
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role
    };

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// ============================================
// AUTHENTICATION HELPERS
// ============================================

export async function createAuthResponse(user: User, message: string = 'Authentication successful'): Promise<NextResponse> {
  // Create JWT token
  const token = await signJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    username: user.username
  });

  const response = NextResponse.json({ 
    success: true, 
    message,
    user: {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username
    }
  });

  // Set secure HTTP-only cookie
  response.cookies.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  });

  return response;
}

export function createLogoutResponse(): NextResponse {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });

  // Clear the JWT token
  response.cookies.set('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  });

  return response;
}

// ============================================
// MIDDLEWARE FUNCTIONS
// ============================================

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' }, 
        { status: 401 }
      );
    }

    // Add user info to request
    (request as AuthenticatedRequest).user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      username: payload.username
    };

    return handler(request as AuthenticatedRequest);
  };
}

export function withRole(roles: string[]) {
  return function(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return withAuth(async (request: AuthenticatedRequest) => {
      if (!request.user || !roles.includes(request.user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      return handler(request);
    });
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function requireAuth(user: User | null): user is User {
  return user !== null;
}

export function hasRole(user: User | null, role: string): boolean {
  return user?.role === role;
}

export function hasAnyRole(user: User | null, roles: string[]): boolean {
  return user ? roles.includes(user.role) : false;
}