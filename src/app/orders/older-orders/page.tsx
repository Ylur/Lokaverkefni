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

      if (data.orders.length === 0) {
        router.push("/orders/no-orders");
      } else {
        setOrders(data.orders);
      }
    } catch (err: any) {
      setMessage(err.message || "Error fetching older orders");
    }
  }

  function handleUpdate(orderId: string) {
    router.push(`/orders/update-order?id=${orderId}`);
  }

  function handleReOrder(order: any) {
    const params = new URLSearchParams();
    params.set("email", order.email);
    params.set("dishes", JSON.stringify(order.dishes));
    params.set("drinks", JSON.stringify(order.drinks));
    router.push(`/booking?${params.toString()}`);
  }

  async function handleDelete(orderId: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete order");
      }
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err: any) {
      setMessage(err.message || "Error deleting order");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      {/* Centered and Sized Container */}
      <div className="flex flex-col items-center w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4 text-center font-serif">
          Older Orders
        </h1>

        <div className="mb-4 w-full">
          <label className="block mb-1 font-serif text-center">
            Enter your email here:
          </label>
          <input
            className="text-center font-serif border rounded p-2 w-full text-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-center mb-4 w-full">
          <button
            onClick={handleFetch}
            className="bg-primary hover:bg-green-700 text-white font-bold px-4 py-2 font-serif w-full"
          >
            Fetch Orders
          </button>
        </div>

        {message && (
          <p className="text-red-500 mt-2 text-center w-full">{message}</p>
        )}

        {/* Orders List if available */}
        {orders.length > 0 && (
          <ul className="mt-4 space-y-4 w-full">
            {orders.map((o) => (
              <li
                key={o._id}
                className="bg-primary/70 shadow border rounded font-serif p-4"
              >
                <h3 className="text-center mb-4 font-semibold">
                  Order ID: {o._id}
                </h3>
                <p className="text-center mb-4">Email: {o.email}</p>
                <p className="text-center mb-4">Total: {o.total}</p>
                <p className="text-center mb-4">Status: {o.status}</p>

                <div className="mt-2 flex flex-col sm:flex-row gap-4 p-4 justify-center">
                  <button
                    onClick={() => handleUpdate(o._id)}
                    className="bg-secondary hover:bg-orange-400 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleReOrder(o)}
                    className="bg-primary hover:bg-green-700 text-white px-2 py-1 rounded"
                  >
                    Re-Order
                  </button>
                  <button
                    onClick={() => handleDelete(o._id)}
                    className="bg-accent hover:bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
