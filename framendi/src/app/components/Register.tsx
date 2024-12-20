// src/app/components/Register.tsx

"use client";

import React, { useState, useContext } from "react";
import { register } from "../utils/api"; 
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await register(email, password);
      setToken(token);
      router.push("/"); // aftur á forsíðu
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-8 border border-secondary rounded">
      <h2 className="text-xl mb-4">Register</h2>
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
        Register
      </button>
    </form>
  );
};

export default Register;
