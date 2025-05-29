import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials } from '@/lib/auth';
import { AuthResponse, LoginRequest } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<AuthResponse>({ 
        success: false, 
        message: 'Email and password are required' 
      }, { status: 400 });
    }

    const user = await validateCredentials(email, password);

    if (user) {
      const response = NextResponse.json<AuthResponse>({ 
        success: true, 
        message: 'Login successful',
        user
      });

      // Set session cookies
      response.cookies.set('session', 'authenticated', {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
        sameSite: 'strict'
      });
      response.cookies.set('userEmail', user.email, {
        path: '/',
        maxAge: 3600,
        sameSite: 'strict'
      });
      response.cookies.set('userId', user.id, {
        path: '/',
        maxAge: 3600,
        sameSite: 'strict'
      });
      response.cookies.set('userRole', user.role, {
        path: '/',
        maxAge: 3600,
        sameSite: 'strict'
      });

      return response;
    }

    return NextResponse.json<AuthResponse>({ 
      success: false, 
      message: 'Invalid credentials' 
    }, { status: 401 });

  } catch (error) {
    return NextResponse.json<AuthResponse>({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}