"use client";

import React, { createContext, useState, useEffect } from "react";

/**
 * The shape of our AuthContext.
 * We track `isAuthenticated` and optionally provide a `verifyToken()` function
 * that calls the backend to confirm if the user is still logged in.
 */
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  verifyToken: () => Promise<boolean>;
}

/**
 * Default values for the AuthContext.
 */
export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  verifyToken: async () => false,
});

/**
 * An AuthProvider component that:
 * 1. Tracks a boolean isAuthenticated
 * 2. Optionally calls /auth/verifyToken (or similar) to see if the user's cookie is valid
 * 3. Doesn't store any token in localStorage—relies on the server's HTTP-only cookie
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // OPTIONAL: If you want to verify the cookie automatically on mount
  useEffect(() => {
    (async () => {
      const valid = await verifyToken();
      setIsAuthenticated(valid);
    })();
  }, []);

  /**
   * Verify the user's cookie by calling your backend's verify endpoint.
   * Adjust the URL/method to match your actual backend route:
   *   e.g. POST /auth/verifyToken with credentials: "include"
   */
  const verifyToken = async (): Promise<boolean> => {
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
        // e.g. 401 or 403 if token is invalid
        return false;
      }
      const data = await res.json();
      return data.isValid === true; // or however your backend responds
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
