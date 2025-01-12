"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  // Showing on what page users are currently.
  const linkClass = (path: string) =>
    pathname === path ? "text-green-300 font-bold" : "";

  return (
    <header className="flex justify-between bg-primary text-white p-4 ">
      <div className="container mx-auto flex justify-between items-center ">
        <Link href="/" className="text-2xl font-bold ">
          Lil Bits
        </Link>
        <nav>
          <ul className="flex flex-row space-x-4">
            <li>
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className={linkClass("/menu")}>
                Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass("/about")}>
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass("/contact")}>
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/orders/older-orders"
                className={linkClass("/orders/older-orders")}
              >
                Previous Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
