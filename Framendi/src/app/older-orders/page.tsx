"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch older orders");
      }
      setOrders(data.orders);
    } catch (err: any) {
      setMessage(err.message || "Error fetching older orders");
    }
  }

  function handleEdit(order: any) {
    // Navigate to update page
    router.push(`/update-order?id=${order._id}`);
  }

  async function handleReorder(order: any) {
    const { _id, createdAt, ...rest } = order;
    const reorderData = { ...rest, status: "pending" };
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reorderData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reorder");
      }
      alert(`New order created! ID: ${data.order._id}`);
    } catch (err: any) {
      alert(err.message || "Reorder failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
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
      <button onClick={handleFetch} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Fetch Orders
      </button>

      {message && <p className="text-red-500 mt-2">{message}</p>}

      {orders.length > 0 && (
        <ul className="mt-4 space-y-2">
          {orders.map((o) => (
            <li key={o._id} className="border p-2">
              <h3 className="font-semibold">Order ID: {o._id}</h3>
              <p>Email: {o.email}</p>
              <p>Total: {o.total}</p>
              <p>Status: {o.status}</p>

              <button
                onClick={() => handleEdit(o)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleReorder(o)}
                className="bg-green-600 text-white px-2 py-1"
              >
                Reorder
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
