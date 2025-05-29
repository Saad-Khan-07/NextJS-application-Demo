'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.-]*\.?adriit@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email ending with adriit@gmail.com");
      setLoading(false);
      return;
    }

    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password)) {
      setError("Password must contain at least one letter, one number, and one special character, and be at least 8 characters long");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // Check role and route accordingly (assuming roles are uppercase from database)
        if (data.user.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (data.user.role === "MANAGER") {
          router.push("/manager/dashboard");
        } else if (data.user.role === "CLIENT") {
          router.push("/client/dashboard");
        } else {
          router.push("/dashboard"); // fallback
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
          placeholder="user@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
          placeholder="Enter your password"
        />
      </div>
      {error && (
        <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}