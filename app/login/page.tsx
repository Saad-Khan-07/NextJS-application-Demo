"use client";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [session, setSession] = useState<{
    user?: any;
    authenticated: boolean;
  } | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
      if (session?.authenticated) {
        redirect(`/${session?.user?.role.toLowerCase()}/dashboard`);
      }
    }

    fetchSession();
  }, []);

  // If already authenticated, redirect to dashboard

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-300">Sign in to access your dashboard</p>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">
                New to our platform?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
              >
                Create one now
              </a>
            </p>
          </div>

          {/* Features */}
          <div className="pt-4 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Secure Login</p>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Fast Access</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
