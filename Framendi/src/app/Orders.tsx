"use client";

import { useState, useEffect } from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

const RestaurantOrder = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [order, setOrder] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/menu-items")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  const addToOrder = (item: MenuItem) => {
    setOrder([...order, item]);
  };

  const removeFromOrder = (index: number) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const totalBill = order.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h1 className="text-xl font-semibold mb-4 text-black">Menu</h1>
      <ul className="mb-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-2 border-b text-black"
          >
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button
              onClick={() => addToOrder(item)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add to Order
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mb-2 text-black">Your Order</h2>
      <ul className="mb-4">
        {order.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border-b text-black"
          >
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button
              onClick={() => removeFromOrder(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mb-4 text-black">
        <p>
          Total Items: <strong>{order.length}</strong>
        </p>
        <p>
          Total Bill: <strong>${totalBill.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};

export default RestaurantOrder;
