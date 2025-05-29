import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        {/* App Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Your secure authentication platform with role-based access control
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <button className="w-48 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-blue-500/30">
              Sign In
            </button>
          </Link>

          <Link href="/signup">
            <button className="w-48 py-3 px-6 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-500/30">
              Create Account
            </button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-blue-400 text-2xl mb-2">🔐</div>
            <h3 className="text-white font-semibold mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-400 text-sm">
              Advanced security with encrypted sessions and secure cookies
            </p>
          </div>

          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-blue-400 text-2xl mb-2">👥</div>
            <h3 className="text-white font-semibold mb-2">Role-Based Access</h3>
            <p className="text-gray-400 text-sm">
              Different access levels for admins, managers, and clients
            </p>
          </div>

          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-blue-400 text-2xl mb-2">⚡</div>
            <h3 className="text-white font-semibold mb-2">Fast & Modern</h3>
            <p className="text-gray-400 text-sm">
              Built with Next.js and Prisma for optimal performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
