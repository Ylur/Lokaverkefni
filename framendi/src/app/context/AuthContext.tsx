// src/app/context/AuthContext.tsx

"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

/**
 * The shape of our AuthContext.
 * We track `isAuthenticated` and provide `verifyAuth()` and `logout()` functions.
 */
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  verifyAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
}

/**
 * Default values for the AuthContext.
 */
export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  verifyAuth: async () => false,
  logout: async () => {},
});

/**
 * An AuthProvider component that:
 * 1. Tracks a boolean isAuthenticated
 * 2. Calls /auth/verifyToken to see if the user's cookie is valid
 * 3. Provides login and logout functions to manage authentication state
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Verify authentication status on mount
    (async () => {
      const valid = await verifyAuth();
      setIsAuthenticated(valid);
    })();
  }, []);

  /**
   * Verify if the user is authenticated by checking with the backend.
   */
  const verifyAuth = async (): Promise<boolean> => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://lokaverkefni-bakendi.vercel.app/api"
        }/auth/verifyToken`,
        {
          method: "POST",
          credentials: "include", // Important for sending cookies
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        return false;
      }
      const data = await res.json();
      return data.isValid === true;
    } catch (error) {
      console.error("Authentication verification failed:", error);
      return false;
    }
  };

  /**
   * Logs out the user by calling the backend logout endpoint and updating state.
   */
  const logout = async (): Promise<void> => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://lokaverkefni-bakendi.vercel.app/api"
        }/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(false);
      } else {
        console.error("Logout failed:", data.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        verifyAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
