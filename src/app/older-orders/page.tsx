"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MiniOrderFlow from "../components/common/MiniOrderFlow";

export default function OlderOrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleFetch() {
    setMessage("");
    setOrders([]);

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    try {
      // Use relative path now that backend is integrated
      const res = await fetch(
        `/api/orders?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch older orders");
      }
      setOrders(data.orders);
    } catch (err: any) {
      setMessage(err.message || "Error fetching older orders");
    }
  }

  function handleUpdate(orderId: string) {
    router.push(`/update-order?id=${orderId}`);
  }

  function handleReOrder(order: any) {
    const params = new URLSearchParams();
    params.set("email", order.email);
    params.set("dishes", JSON.stringify(order.dishes));
    params.set("drinks", JSON.stringify(order.drinks));
    // Update route if needed; for integrated backend, adjust path accordingly
    router.push(`/booking?${params.toString()}`);
    // If your booking page is under /orders, use:
    // router.push(`/orders/booking?${params.toString()}`);
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <MiniOrderFlow step={0} />

      <h1 className="text-2xl font-bold mb-4">Older Orders</h1>
      <div className="mb-2">
        <label>Email to search:</label>
        <input
          className="border p-2 w-full"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Fetch Orders
      </button>

      {message && <p className="text-red-500 mt-2">{message}</p>}

      {orders.length > 0 && (
        <ul className="mt-4 space-y-2">
          {orders.map((o) => (
            <li key={o._id} className="border p-2">
              <h3>Order ID: {o._id}</h3>
              <p>Email: {o.email}</p>
              <p>Total: {o.total}</p>
              <p>Status: {o.status}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleUpdate(o._id)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Update
                </button>
                <button
                  onClick={() => handleReOrder(o)}
                  className="bg-green-600 text-white px-2 py-1"
                >
                  Re-Order
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
