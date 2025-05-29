// app/api/db/allusers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.count();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return NextResponse.json({ message: "Failed to fetch users." }, { status: 500 });
  }
}