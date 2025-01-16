"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Info menu for the footer.
 */
const SECTIONS = [
  {
    label: "About us",
    paths: ["/about"],
  },
  {
    label: "Contact us",
    paths: ["/contact"],
  },
];

export default function TopMenu() {
  const pathname = usePathname();

  function isActiveSection(paths: string[]) {
    return paths.some((p) => pathname === p || pathname.startsWith(p));
  }

  return (
    <div className="w-full px-4 py-3 flex items-center justify-center bg-primary border rounded">
      <div className="space-x-6 flex items-center justify-center  ">
        {SECTIONS.map(({ label, paths }) => {
          const active = isActiveSection(paths);
          return (
            <Link
              key={label}
              href={paths[0]}
              className={
                active
                  ? "text-primary font-serif font-bold transition-transform duration-300 hover:animate-pulse"
                  : "text-secondary font-serif font-bold transition-transform duration-300 hover:animate-pulse"
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
