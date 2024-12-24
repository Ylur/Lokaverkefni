// src/app/components/Register.tsx
"use client";

import React, { useState, useContext } from "react";
import { register } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]    = useState<string | null>(null);

  // We no longer store a token; we just track `isAuthenticated`
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await register(username, email, password);
      if (data.success) {
        // Mark user as authenticated in context
        setIsAuthenticated(true);
        // Redirect or do something else
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-8 border border-secondary rounded">
      <h2 className="text-xl mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <label className="block mb-2">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Your username"
        required
      />

      <label className="block mb-2">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="you@example.com"
        required
      />

      <label className="block mb-2">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Your password"
        required
      />

      <button type="submit" className="bg-secondary text-primary py-2 px-4 rounded w-full">
        Register
      </button>
    </form>
  );
};

export default Register;
