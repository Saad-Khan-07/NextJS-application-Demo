import { prisma } from '@/lib/prisma';
import { withRole } from '@/lib/auth-middleware';
import { NextResponse } from 'next/server';

export const GET = withRole(['ADMIN', 'MANAGER'])(async (request) => {
  try {
    const clientCount = await prisma.user.count({
      where: { role: 'CLIENT' }
    });

    return NextResponse.json({ 
      success: true, 
      clientCount 
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client data' },
      { status: 500 }
    );
  }
});