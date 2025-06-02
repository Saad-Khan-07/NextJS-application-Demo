import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const payload =await verifyJWT(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: payload.email,
      role: payload.role,
      username: payload.username
      // Note: No userId for security
    }
  });
}