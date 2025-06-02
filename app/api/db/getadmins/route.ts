import { prisma } from '@/lib/prisma';
import { withRole } from '@/lib/auth-middleware';
import { NextResponse } from 'next/server';

export const GET = withRole(['ADMIN'])(async (request) => {
  try {
    const clientCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    return NextResponse.json({ 
      success: true, 
      clientCount 
    });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch manager data' },
      { status: 500 }
    );
  }
});