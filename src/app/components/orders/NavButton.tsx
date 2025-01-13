"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface NavigationButtonProps {
  route: string;
  buttonText?: string;
  className?: string;
}

const NavButton: React.FC<NavigationButtonProps> = ({
  route,
  buttonText = "Ima butttoN!",
  className = "bg-green-600 text-white px-4 py-2 rounded"
}) => {
  const router = useRouter();

  return (
    <div className="mt-4 text-center">
      <button
        onClick={() => router.push(route)}
        className={className}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NavButton;
