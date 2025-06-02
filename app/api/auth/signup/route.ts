// signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser, createAuthResponse } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, role } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser(email, password, username, role);

    // Return response with JWT token cookie
    return await createAuthResponse(user, 'Account created successfully');

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create account' },
      { status: 400 }
    );
  }
}