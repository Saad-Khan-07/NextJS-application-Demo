"use client";

import BarChart from "@/components/BarChart";
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
        Loading...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  // Final check - this should not render for non-admin users due to redirects above
  if (!session.authenticated || session?.user?.role?.toLowerCase() !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Access denied. Admin privileges required.
      </div>
    );
  }

  const { user } = session;

  return (
    <Sidebar userRole={user.role.toLowerCase()}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Analytics
              </h1>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto py-8 px-6 lg:px-8">
          <BarChart
            usercount={userCount}
            users={users}
            text="Number of users in each category"
          />
        </main>
      </div>
    </Sidebar>
  );
}

export default AnalyticsPage;