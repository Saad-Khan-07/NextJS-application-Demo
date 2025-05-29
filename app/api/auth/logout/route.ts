import { NextResponse } from 'next/server';
import { AuthResponse } from '@/types/auth';

export async function POST() {
  const response = NextResponse.json<AuthResponse>({ 
    success: true, 
    message: 'Logged out successfully' 
  });

  response.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'strict'
  });
  response.cookies.set('userEmail', '', {
    path: '/',
    maxAge: 0,
    sameSite: 'strict'
  });
  response.cookies.set('userId', '', {
    path: '/',
    maxAge: 0,
    sameSite: 'strict'
  });

  return response;
}