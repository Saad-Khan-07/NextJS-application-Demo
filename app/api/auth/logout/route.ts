// logout/route.ts
import { createLogoutResponse } from '@/lib/auth-middleware';

export function POST() {
  return createLogoutResponse();
}