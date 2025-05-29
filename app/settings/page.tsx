import Sidebar from '@/components/Sidebar'
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {

        const session = await getSession();
          if (!session?.authenticated) {
            redirect('/login')
          }
        
          const { user } = session;
  return (
    <Sidebar userRole={user.role.toLowerCase()}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Settings
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto py-8 px-6 lg:px-8">
          SETTINGS
        </main>
      </div>
    </Sidebar>
  )
}

export default page