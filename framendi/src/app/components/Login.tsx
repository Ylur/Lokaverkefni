"use client";

import React, { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance"; // Using a dedicated Axios instance
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { LoginResponse, APIError } from "../types/api";
import { FaSpinner } from "react-icons/fa"; // Optional: For spinner

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setToken } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axiosInstance.post<LoginResponse>("/login", { email, password });

      if (response.data.token) {
        // Security Note: Consider using HTTP-only cookies for token storage
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        router.push("/dashboard");
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err: any) { // Use 'any' to access error.response
      console.error("Login failed:", err);

      if (err.response && err.response.data && (err.response.data as APIError).message) {
        setError((err.response.data as APIError).message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto p-8 border border-secondary rounded shadow-lg"
      aria-labelledby="login-form-title"
    >
      <h2 id="login-form-title" className="text-2xl mb-6 text-center">
        Login
      </h2>
      
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border p-2 rounded w-full ${
            loading ? "bg-gray-100 cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-secondary"
          }`}
          placeholder="you@example.com"
          required
          disabled={loading}
          aria-required="true"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border p-2 rounded w-full ${
            loading ? "bg-gray-100 cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-secondary"
          }`}
          placeholder="Your password"
          required
          disabled={loading}
          aria-required="true"
        />
      </div>
      
      <button
        type="submit"
        className={`bg-secondary text-primary py-2 px-4 rounded w-full flex items-center justify-center ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-secondary-dark transition-colors duration-300"
        }`}
        disabled={loading}
        aria-disabled={loading}
      >
        {loading && <FaSpinner className="animate-spin mr-2" aria-hidden="true" />}
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
