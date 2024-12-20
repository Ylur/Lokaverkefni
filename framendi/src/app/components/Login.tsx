// framendi/src/app/components/Login.tsx

"use client";

import React, { useState, useContext } from "react";
import { login } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      setToken(token);
      router.push("/dashboard"); // Redirect to a protected page after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-8 border border-secondary rounded">
      <h2 className="text-xl mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        Login
      </button>
    </form>
  );
};

export default Login;
