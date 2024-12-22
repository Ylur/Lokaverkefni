// src/app/components/ProtectedRoute.tsx

"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, verifyToken } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await verifyToken();
      if (!valid) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, verifyToken, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
        {/* Alternatively, use a spinner or other loading indicator */}
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
