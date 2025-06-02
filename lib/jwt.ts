// jwt.ts
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret"
);
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  username: string;
  iat?: number;
  exp?: number;
}

export async function signJWT(payload: Omit<JwtPayload, "iat" | "exp">): Promise<string> {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer('your-app-name')
      .setExpirationTime(JWT_EXPIRATION)
      .sign(JWT_SECRET);
  } catch (error) {
    console.error("JWT signing failed:", error);
    throw new Error("Failed to sign JWT");
  }
}

export async function verifyJWT(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'your-app-name'
    });
    return payload as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function refreshToken(token: string): Promise<string | null> {
  try {
    const payload = await verifyJWT(token);
    if (!payload) return null;
    
    const { iat, exp, ...newPayload } = payload;
    return await signJWT(newPayload);
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}