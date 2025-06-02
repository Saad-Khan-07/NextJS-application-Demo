"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import LogoutButton from "../../components/LogoutButton";

export default function ProfilePage() {
  const [session, setSession] = useState<{
    user?: any;
    authenticated: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setSession(data);
      } catch (error) {
        console.error('Error fetching session:', error);
        setSession({ authenticated: false });
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (session && !session.authenticated) {
    window.location.href = "/login";
    return null;
  }

  // If session is null or no user data, show error
  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Session Error</h2>
          <p className="text-gray-600 mb-4">Unable to load your session. Please try logging in again.</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <Sidebar userRole={user.role.toLowerCase()}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Top Navigation - Responsive */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 sm:h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      PROFILE
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 hidden sm:block">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {/* Mobile date - shorter format */}
                    <p className="text-xs text-gray-600 mt-0.5 block sm:hidden">
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* User info - responsive */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 block">
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </div>
                {/* Mobile user info - condensed */}
                <div className="flex sm:hidden items-center">
                  <div className="text-right mr-2">
                    <span className="text-sm font-medium text-gray-900 block truncate max-w-20">
                      {user.username}
                    </span>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main content - responsive padding */}
        <main className="max-w-4xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
          <Profile user={user} />
        </main>
      </div>
    </Sidebar>
  );
}