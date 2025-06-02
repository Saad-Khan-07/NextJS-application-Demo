// signup/page.tsx
import React from 'react'
import SignupForm from './signup-form'
import { getSession } from '@/lib/auth-middleware'
import { redirect } from 'next/navigation';

async function SignupPage() {
  const session = await getSession();
  if(session?.authenticated){
    redirect('/dashboard') // Redirect to dashboard instead of logout
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden'>
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/6 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/6 right-1/6 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 max-w-200 w-full mx-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-300">
                Join us and start your journey today
              </p>
            </div>
          </div>
          
          {/* Signup Form */}
          <SignupForm />
          
          
        </div>
        
        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              Privacy Policy
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Make sure to enter valid credentials for the best experience
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage