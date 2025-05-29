import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import LogoutButton from "../dashboard/logout-button";

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
        {/* Top Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      PROFILE
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 block">
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto py-8 px-6 lg:px-8">
          <Profile user={user} />
        </main>
      </div>
    </Sidebar>
  );
}

export default ProfilePage;

// description of including roles in the user database
// role entered on signup
// role can be changed by admin
// login, email checked, role determined from db and then signed in to user/admin dashboard
