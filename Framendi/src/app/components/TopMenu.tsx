// components/TopMenu.tsx

import Link from "next/link";
import { useRouter } from "next/router";

const TopMenu: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/select-dish", label: "Select Dish" },
    { path: "/select-drink", label: "Select Drink" },
    { path: "/order", label: "Order" },
    { path: "/receipt", label: "Receipt" },
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <a
                className={`text-white hover:text-yellow-500 ${
                  router.pathname === item.path ? "underline" : ""
                }`}
              >
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopMenu;
