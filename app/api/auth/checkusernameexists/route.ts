import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { 
          error: "Username is required and must be a string",
          exists: false 
        }, 
        { status: 400 }
      );
    }

    // Trim whitespace and validate username format
    const trimmedUsername = username.trim();
    
    if (trimmedUsername.length === 0) {
      return NextResponse.json(
        { 
          error: "Username cannot be empty",
          exists: false 
        }, 
        { status: 400 }
      );
    }

    // Check if username exists in database
    const existingUser = await prisma.user.findUnique({
      where: { username: trimmedUsername }
    });

    // Return boolean result
    return NextResponse.json({
      exists: !!existingUser,
      message: existingUser ? "Username already exists" : "Username is available"
    });

  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        exists: false 
      }, 
      { status: 500 }
    );
  }
}

//signup:
//proper email, password : 8 chars or more, atleast: 1 digit, 1 spl char, alphabets
//username: 3-20 chars, no spaces, no special chars (spaces will be trimmer out), SHOULDN'T ALREADY EXIST
//only 3 roles option given
//password and confirm password should be same

// login:
// proper email, password, should exist, otherwise fallback ui
// derive the role from the user email

// dashboard:
// different for all 3 users
// analytics: only for admin
// profile: general info of user