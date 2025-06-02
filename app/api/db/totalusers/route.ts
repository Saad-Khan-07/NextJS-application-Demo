import { prisma } from '@/lib/prisma';
import { withRole } from '@/lib/auth-middleware';
import { NextResponse } from 'next/server';

export const GET = withRole(['ADMIN'])(async (request) => {
  try {
    const totalUsers = await prisma.user.count();
    // const userdata = await prisma.user.findMany();
    // console.log(userdata);
    return NextResponse.json({ 
      success: true, 
      users: totalUsers 
    });
  } catch (error) {
    console.error('Error fetching total users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
});