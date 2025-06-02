import { prisma } from '@/lib/prisma';
import { withRole } from '@/lib/auth-middleware';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = (async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { email }
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      deletedUser: {
        email: deletedUser.email,
        role: deletedUser.role,
        username: deletedUser.username
      }
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);

    // If user doesn't exist
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    );
  }
});