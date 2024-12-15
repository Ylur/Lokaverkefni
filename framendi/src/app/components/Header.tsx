"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: FC = () => {
  return (
    <header className="bg-primary shadow-md">
    <nav className="container mx-auto flex items-center justify-between p-4">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Image
          src="/Images/lb.png"
          alt="Logoið"
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
  
      {/* Centered Links */}
      <ul className="flex flex-grow justify-center space-x-8 text-4xl">
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
    </nav>
  </header>
  
  );
};

export default Header;
