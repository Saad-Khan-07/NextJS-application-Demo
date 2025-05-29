export interface User {
  email: string;
  id: string;
  username: string;
  role: string;
}

export interface NewUser {
  email: string;
  id: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface SessionData {
  user: User;
  authenticated: boolean;
}