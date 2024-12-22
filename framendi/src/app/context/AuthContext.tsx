// src/app/context/AuthContext.tsx
'use client'

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  verifyToken: (token: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
  verifyToken: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve token from localStorage or cookies
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await axios.post("/api/verifyToken", { token });
      return response.data.isValid;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};
