"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * TopMenu with a logo on the left that navigates home, 
 * and non-clickable labels that highlight the current page/section.
 */
export default function TopMenu() {
  const pathname = usePathname();

  /**
   * We define “sections” by an array of objects.
   * Each object has:
   *   label -> what is displayd
   *   paths -> any routes that should highlight this label
   */
  const sections = [
    {
      label: "HomePage",
      paths: ["/"], // highlight only on home
    },
    {
      label: "Menu",
      paths: ["/Menu"], 
    },
    {
      label: "Orders",
      paths: ["/orders", "/select-dishes", "/select-drinks"],
    },
    {
      label: "Booking",
      paths: ["/booking"],
    },
    {
      label: "Receipt",
      paths: ["/receipt"],
    },
  ];

  /**
   * Check if current route matches any path in the array.
   * We'll highlight if pathname === p or pathname.startsWith(p).
   */
  function isActiveSection(paths: string[]) {
    return paths.some(
      (p) => pathname === p || pathname.startsWith(p)
    );
  }

  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between">
      {/* Logo that navigates home, yes the header was supposed to be non intertact but users must be able to go to home page */}
      <Link href="/" className="flex items-center space-x-2">
      
        {/* The logo image */}
        <img
          src="/photos/lb.png"
          alt="Logo"
          className="w-8 h-8 object-contain cursor-pointer text-primary"
        />
      </Link>

      {/* Non-interactable labels */}
      <div className="space-x-6">
        {sections.map(({ label, paths }) => {
          const active = isActiveSection(paths);
          return (
            <span
              key={label}
              className={
                active
                  ? "text-primary font-serif font-semibold"
                  : "text-secondary font-serif font-semibold"
              }
            >
              {label}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
