"use client";

import BarChart from "@/components/BarChart";
import MobileChart from "@/components/MobileChart";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AnalyticsPage() {
  const router = useRouter();

  const [users, setUsers] = useState<string[]>([]);
  const [userCount, setUserCount] = useState<number[]>([]);
  const [session, setSession] = useState<{
    user?: any;
    authenticated: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setSession(data);
      } catch (err) {
        setError("Failed to fetch session.");
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  // Protection logic - redirect non-admin users
  useEffect(() => {
    if (!session || loading) return;

    if (!session.authenticated) {
      router.push("/login");
      return;
    }

    const userRole = session?.user?.role?.toLowerCase();
    if (!userRole || userRole !== "admin") {
      // Fallback to a safe default if role is undefined
      const redirectPath = userRole ? `/${userRole}/dashboard` : "/dashboard";
      router.push(redirectPath);
      return;
    }
  }, [session, loading, router]);

  useEffect(() => {
    // Only fetch analytics data if user is admin
    if (!session?.authenticated || session?.user?.role?.toLowerCase() !== "admin") {
      return;
    }

    async function fetchMetrics() {
      try {
        const [clients, usersRes, managers, admins] = await Promise.all([
          fetch("/api/db/getclients"),
          fetch("/api/db/totalusers"),
          fetch("/api/db/getmanagers"),
          fetch("/api/db/getadmins"),
        ]);

        if (!clients.ok || !managers.ok || !usersRes.ok || !admins.ok) {
          throw new Error("One or more requests failed.");
        }

        const clientData = await clients.json();
        const managerData = await managers.json();
        const adminData = await admins.json();
        const userData = await usersRes.json();

        setUsers(["users", "clients", "managers", "admins"]);
        setUserCount([
          userData.users,
          clientData.clientCount,
          managerData.clientCount,
          adminData.clientCount,
        ]);
      } catch (err) {
        setError("Failed to load analytics data.");
        console.log(err)
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [session]);

  // Show loading state
  if (loading || !session) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 px-4">
        <div className="text-center">
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  // Final check - this should not render for non-admin users due to redirects above
  if (!session.authenticated || session?.user?.role?.toLowerCase() !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 px-4">
        <div className="text-center">
          <p className="text-sm sm:text-base">Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <Sidebar userRole={user.role.toLowerCase()}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Responsive Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 sm:h-16 items-center">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Analytics
              </h1>
              {/* Mobile user indicator */}
              <div className="flex sm:hidden items-center">
                <span className="text-sm text-gray-600 capitalize">{user.role}</span>
              </div>
              {/* Desktop user info */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900 block">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content - Responsive */}
        <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
          {isMobile ? (
            <MobileChart
              usercount={userCount}
              users={users}
              text="User Analytics Overview"
            />
          ) : (
            <BarChart
              usercount={userCount}
              users={users}
              text="Number of users in each category"
            />
          )}
        </main>
      </div>
    </Sidebar>
  );
}

export default AnalyticsPage;