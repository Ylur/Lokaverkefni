// src/app/context/AuthContext.tsx

"use client";

import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  setToken: (token: string | null) => void;
  verifyToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setToken: () => {},
  verifyToken: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setTokenState] = useState<string | null>(null); // Manage token state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        const valid = await verifyToken();
        setIsAuthenticated(valid);
      }
    };
    checkAuth();
  }, [token]);

  const verifyToken = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.post("/verifyToken", { token });
      return response.data.isValid;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    // Optionally, store token in localStorage or cookies
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setToken, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
