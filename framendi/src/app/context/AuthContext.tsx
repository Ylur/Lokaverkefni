// src/app/context/AuthContext.tsx

"use client";

import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  verifyToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  verifyToken: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await verifyToken();
      setIsAuthenticated(valid);
    };
    checkAuth();
  }, []);

  const verifyToken = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.post("/verifyToken"); //next level shit right hörr
      return response.data.isValid;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
