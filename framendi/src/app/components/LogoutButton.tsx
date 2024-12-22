// src/app/components/LogoutButton.tsx

"use client";

import React, { useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");
      if (response.data.success) {
        setIsAuthenticated(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // hægt að bæta við , handle error (e.g., show notification)
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
