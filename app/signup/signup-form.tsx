"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password || !confirmPassword || !username) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    // Username validation
    const trimmedUsername = username.trim();
    if (trimmedUsername.length === 0) {
      setError("Username cannot be empty");
      setLoading(false);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      setError(
        "Username must be 3-20 characters long and contain only letters, numbers, and underscores"
      );
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9.-]*\.?adriit@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email ending with adriit@gmail.com");
      setLoading(false);
      return;
    }

    // Password validation
    const passRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password)) {
      setError(
        "Password must contain at least one letter, one number, and one special character"
      );
      setLoading(false);
      return;
    }

    // Check if username exists
    try {
      const usernameCheckResponse = await fetch(
        "/api/auth/checkusernameexists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: trimmedUsername }),
        }
      );

      const usernameCheckData = await usernameCheckResponse.json();

      if (usernameCheckData.exists) {
        setError("Username is already taken");
        setLoading(false);
        return;
      }
    } catch (error) {
      setError("Error checking username availability");
      setLoading(false);
      return;
    }

    // Create account
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username: trimmedUsername,
          role,
        }),
      });

      const data = await response.json();

      if (data.success) {
          if(data.user.role === "admin"){
            router.push("/admin/dashboard");
          } else if(data.user.role === "manager"){
            router.push("/manager/dashboard");
          } else if(data.user.role === "client"){
            router.push("/client/dashboard");
          } else {
            router.push("/dashboard"); // fallback
          }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
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
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            placeholder="Enter a unique username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
            placeholder="Confirm your password"
          />
        </div>

          <div>
            <label
              htmlFor="role-select"
              className="block text-sm font-medium text-white"
            >
              ROLE
            </label>
            <select
              id="role-select" // Changed ID to be specific to the select element
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
            >
              {/* Default/Placeholder option */}
              <option value="" disabled>
                Select a role
              </option>
              {/* Role options */}
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
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
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center">
        <div className="text-white text-sm">
          Already have an account?{" "}
          <div className="text-center">
            <p className="text-gray-300">
              <a
                href="/login"
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline"
              >
                Sign in to your account
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
