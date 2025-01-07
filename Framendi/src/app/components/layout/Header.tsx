// src/app/components/layout/Header.tsx 
//Ef user is non-null, show a “Logout” button. On click, it calls /auth/logout, then does setUser(null).
// Ef user is null, show a “Login” link.


"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

// logout function
async function handleLogout(setUser: (user: any) => void) {
  // 1) Call backend api//auth/logout
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
  } catch (err) {
    console.error("Logout error:", err);
  }

  // 2) Clear user in context so frontend knows user is logged out
  setUser(null);
}

const Header: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <header className="flex justify-between bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Lil Bits
        </Link>
        <nav>
          <ul className="flex flex-row space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/register">Create an account</Link>
            </li>
            <li>
              <Link href="/older-orders">Previous Orders</Link>
            </li>
            {user ? (
              <>
                <li>
                  <button
                    onClick={() => handleLogout(setUser)}
                    className="hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
