"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Order not found");
        }
        setOrder(data.order);
      } catch (err: any) {
        setMessage(err.message || "Error fetching order");
      }
    }
    fetchOrder();
  }, [id]);

  if (!id) {
    return <div>No order ID provided.</div>;
  }

  if (message) {
    return <div className="text-red-500">{message}</div>;
  }

  if (!order) {
    return <div>Loading order...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Receipt</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Time:</strong> {order.time}</p>
      <p><strong>People:</strong> {order.people}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <h2 className="text-xl font-semibold mt-4">Dishes</h2>
      {order.dishes?.map((dish: any, i: number) => (
        <p key={i}>
          {dish.strMeal} (x{dish.quantity})
        </p>
      ))}

      <h2 className="text-xl font-semibold mt-4">Drinks</h2>
      {order.drinks?.map((drink: any, i: number) => (
        <p key={i}>
          {drink.strDrink} (x{drink.quantity})
        </p>
      ))}

      <p className="mt-2 font-bold">Total: ${order.total}</p>

      <button
        onClick={() => router.push("/older-orders")}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        See Older Orders
      </button>
    </div>
  );
}
