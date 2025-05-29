import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, role } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    // Create user with username
    const user = await createUser(email, password, username, role);

    // Set session cookies
    const cookieStore = await cookies();
    cookieStore.set('session', 'authenticated', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });
    cookieStore.set('userEmail', user.email, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });
    cookieStore.set('userId', user.id, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });
    cookieStore.set('userRole', user.role, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });
    

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username
      }
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create account' },
      { status: 400 }
    );
  }
}