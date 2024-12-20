//nú er ég fyrst komin í ruglið

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [token, router]);

  if (!token) {
    return <p>Loading...</p>; // Or a spinner/loading indicator
  }

  return <>{children}</>;
};

export default ProtectedRoute;
