'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const TopMenu: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/select", label: "Select Order" }, // Updated path
    { path: "/receipt", label: "Receipt" },
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path ? "underline" : "";
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`text-white hover:text-yellow-500 ${isActive}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TopMenu;
