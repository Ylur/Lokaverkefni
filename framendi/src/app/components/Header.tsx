"use client";

import React, { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="bg-black shadow-md">
      <nav className="container mx-auto flex justify-between p-4">
        <div className="text-2xl font-bold">LOGO HÉR</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
          </li>
          <li>
            <Link href="/menu" className="hover:text-gray-700">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-700">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-700">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
