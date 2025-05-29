import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const userEmail = cookieStore.get('userEmail')?.value;
  const userId = cookieStore.get('userId')?.value;
  const userRole = cookieStore.get('userRole')?.value;

  if (session === 'authenticated' && userEmail && userId) {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { username: true, role: true }
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        email: userEmail,
        id: userId,
        username: user?.username || '',
        role: user?.role || userRole || 'USER'
      }
    });
  }

  return NextResponse.json({ authenticated: false });
}
