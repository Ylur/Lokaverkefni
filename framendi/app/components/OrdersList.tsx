// src/app/components/OrdersList.tsx

"use client";

import React, { useContext, useEffect, useState } from "react";
import { getOrders, Order } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const OrdersList: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        setError("You must be logged in to view your orders.");
        return;
      }

      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (err: any) {
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (orders.length === 0) return <p>You have no orders.</p>;

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Order #{order.id}</h3>
          <p>Email: {order.email}</p>
          <p>Date: {new Date(order.date).toLocaleString()}</p>
          <div className="mt-2">
            <h4 className="font-semibold">Dishes:</h4>
            {order.dishes.map((dish, index) => (
              <p key={index}>
                {dish.strMeal} x {dish.quantity}
              </p>
            ))}
          </div>
          <div className="mt-2">
            <h4 className="font-semibold">Drinks:</h4>
            {order.drinks.map((drink, index) => (
              <p key={index}>
                {drink.strDrink} x {drink.quantity}
              </p>
            ))}
          </div>
          <p className="mt-2 font-bold">Total: ₽{order.total}</p>
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
