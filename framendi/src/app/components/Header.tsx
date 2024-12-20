"use client";

import React, { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Header: FC = () => {
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    setToken(null); // Clear the token from context and localStorage
    router.push("/"); // Redirect to homepage after logout
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
          {!token ? (
            <>
              <Link href="/login" className="text-accent hover:text-gray-700">
                Login
              </Link>
              <Link
                href="/register"
                className="text-accent hover:text-gray-700"
              >
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
