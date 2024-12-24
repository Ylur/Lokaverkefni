// src/app/components/Header.tsx

"use client";

import React, { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Header: FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://lokaverkefni-bakendi.vercel.app/api"}/auth/logout`,
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
        router.push("/login"); // Redirect to login after logout
      } else {
        console.error("Logout failed:", data.error);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error("An unexpected error occurred during logout:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <header className="bg-primary shadow-md border border-gray-800">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              src="/photos/lb.png"
              alt="Logo"
              width={128}
              height={128}
              className="object-cover"
            />
          </Link>
        </div>

        {/* Centered Links */}
        <ul className="flex flex-grow justify-center space-x-8 text-2xl">
          <li>
            <Link href="/" className="text-accent hover:text-gray-700">
              Home
            </Link>
          </li>
          <li>
            <Link href="/menu" className="text-accent hover:text-gray-700">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-accent hover:text-gray-700">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-accent hover:text-gray-700">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right-Side Authentication Links */}
        <div className="flex items-center space-x-4 text-2xl">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-accent hover:text-gray-700">
                Login
              </Link>
              <Link href="/register" className="text-accent hover:text-gray-700">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-accent hover:text-gray-700 focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
