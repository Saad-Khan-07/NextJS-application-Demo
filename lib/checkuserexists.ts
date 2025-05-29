import { prisma } from "./prisma";

export async function checkUserExists(trimmedUsername: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { username: trimmedUsername as string }
    });
    
    return !!user; // Returns true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false; // Return false on error to be safe
  }
}