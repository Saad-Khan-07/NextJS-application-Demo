'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Settings, BarChart3, FileText, Bell, Lock } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  children: React.ReactNode;
  userRole: string
}

export default function Sidebar({ children, userRole }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  // Base menu items available to all users
  const baseMenuItems = [
    { icon: Home, label: 'Dashboard', href: `/${userRole}/dashboard` },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { icon: BarChart3, label: 'Analytics', href: '/analytics', adminOnly: true },
  ];

  // Combine menu items based on user role
  const menuItems = userRole === 'admin' 
    ? [...baseMenuItems.slice(0, 2), ...adminMenuItems, ...baseMenuItems.slice(2)]
    : baseMenuItems;

  // Function to check if a menu item is currently active
  const isActiveItem = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Handle navigation with role validation
  const handleNavigation = (item: any, event: React.MouseEvent) => {
    if (item.adminOnly && userRole !== 'admin') {
      event.preventDefault();
      // Optional: Show a toast notification or modal here
      alert('Access denied. Admin privileges required.');
      return;
    }
    // Navigation will proceed normally for allowed items
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-16'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200 relative">
          <div className={`
            flex items-center space-x-2 transition-opacity duration-200
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-gray-900">Dashboard</span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isExpanded ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* User Role Badge */}
        <div className={`
          mx-2 mt-4 transition-opacity duration-200
          ${isExpanded ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className={`
            px-3 py-1 rounded-full text-xs font-medium text-center
            ${userRole === 'admin' 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
            }
          `}>
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = isActiveItem(item.href);
              const isRestricted = item.adminOnly && userRole !== 'admin';
              
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavigation(item, e)}
                    className={`
                      flex items-center px-3 py-3 rounded-lg transition-all duration-200
                      group relative
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : isRestricted
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r-full" />
                    )}
                    
                    <div className="flex items-center">
                      <item.icon className={`
                        w-5 h-5 flex-shrink-0
                        ${isActive 
                          ? 'text-blue-700' 
                          : isRestricted
                            ? 'text-gray-400'
                            : 'text-gray-500 group-hover:text-gray-700'
                        }
                      `} />
                      
                      {isRestricted && (
                        <Lock className="w-3 h-3 ml-1 text-gray-400" />
                      )}
                    </div>
                    
                    <span className={`
                      ml-3 font-medium transition-opacity duration-200
                      ${isExpanded ? 'opacity-100' : 'opacity-0'}
                    `}>
                      {item.label}
                    </span>
                    
                    
                    {!isExpanded && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                        {isRestricted && (
                          <span className="block text-red-300">Admin Only</span>
                        )}
                      </div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Access Level Info */}
        {isExpanded && userRole !== 'admin' && (
          <div className="mx-2 mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center text-amber-800">
              <Lock className="w-4 h-4 mr-2" />
              <span className="text-xs font-medium">Limited Access</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">
              Some features require admin privileges
            </p>
          </div>
        )}

        {/* Sidebar Footer */}
        {/* <div className={`
          absolute bottom-4 left-2 right-2 transition-opacity duration-200
          ${isExpanded ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
            <h4 className="font-semibold text-sm mb-1">Upgrade to Pro</h4>
            <p className="text-xs opacity-90 mb-2">Get access to premium features</p>
            <button className="bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-md px-3 py-1 text-xs font-medium">
              Learn More
            </button>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className={`
        flex-1 transition-all duration-300 ease-in-out
        ${isExpanded ? 'ml-64' : 'ml-16'}
      `}>
        {children}
      </div>

      {/* Mobile Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}