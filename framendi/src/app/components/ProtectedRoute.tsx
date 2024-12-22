//nú er ég fyrst komin í ruglið

// src/app/components/ProtectedRoute.tsx

// src/app/components/ProtectedRoute.tsx

"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, verifyToken } = useContext(AuthContext); // Assume verifyToken is a method in AuthContext
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        router.push("/login");
      } else {
        const isValid = await verifyToken(token);
        if (!isValid) {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, [token, router, verifyToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
