"use client";

import React, { useContext } from "react";
import Link from "next/link";

const Header: React.FC = () => {
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
              <Link href="/older-orders">Previous Orders</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
