import { cookies } from 'next/headers';
import { User } from '@/types/auth';
import { prisma } from './prisma'
import bcrypt from 'bcryptjs';

export async function getSession(): Promise<{ user: User; authenticated: boolean } | null> {
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
    
    return {
      authenticated: true,
      user: {
        email: userEmail,
        id: userId,
        username: user?.username,
        role: user?.role || userRole
      }
    };
  }
  
  return null;
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  try {
    // Email format validation
    const emailRegex = /^[a-zA-Z0-9.-]*\.?adriit@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return null;
    }

    // Password strength validation
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password)) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
}

// Updated createUser function to include username
export async function createUser(email: string, password: string, username: string, role: string): Promise<User> {
  try {
    // Email format validation
    const emailRegex = /^[a-zA-Z0-9.-]*\.?adriit@gmail\.com$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format. Email must end with adriit@gmail.com');
    }

    // Password strength validation
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password)) {
      throw new Error('Password must contain at least one letter, one number, and one special character, and be at least 8 characters long');
    }

    // Username validation
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }

    const trimmedUsername = username.trim();
    
    // Username format validation (alphanumeric and underscores only, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      throw new Error('Username must be 3-20 characters long and contain only letters, numbers, and underscores');
    }

    // Check if user already exists (by email)
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      throw new Error('User already exists with this email address');
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: trimmedUsername }
    });

    if (existingUsername) {
      throw new Error('Username is already taken');
    }

    // Convert role to uppercase and validate
    const upperRole = role.toUpperCase();
    if (upperRole !== "CLIENT" && upperRole !== "ADMIN" && upperRole !== "MANAGER") {
      throw new Error('Invalid role. Role must be client, admin, or manager');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: trimmedUsername,
        role: upperRole as any // Cast to satisfy TypeScript, Prisma will handle the enum
      }
    });

    return {
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role
    };

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}