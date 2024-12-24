// src/app/components/Login.tsx

"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/api";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Call the login function; it sets the cookie if successful
      await login(email, password);

      // Update authentication state
      setIsAuthenticated(true);

      // Redirect to the homepage or dashboard
      router.push("/"); // Adjust the route as needed
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 border border-primary rounded"
    >
      <h2 className="text-xl mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email:
        </label>
        <div className="flex items-center border p-2 rounded">
          <FaUser className="mr-2" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password:
        </label>
        <div className="flex items-center border p-2 rounded">
          <FaLock className="mr-2" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full outline-none"
            placeholder="Your password"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded w-full"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
