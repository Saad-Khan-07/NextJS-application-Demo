import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import LogoutButton from "../../components/LogoutButton";

async function ProfilePage() {
  const session = await getSession();
  // If not authenticated, show error
  if (!session?.authenticated) {
    redirect("/login");
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

export default ProfilePage;