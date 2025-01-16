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

      // If no orders are returned, redirect to the No Orders page
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
    <div className="p-4 min-h-screen text-white flex justify-items-center">
      <div className="max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4 text-center font-serif">
          Older Orders
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-serif text-center">
            Enter your email here:
          </label>
          <input
            className="text-center border rounded p-2 w-full text-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleFetch}
            className=" bg-primary hover:bg-green-700 text-white font-bold px-4 py-2 font-serif"
          >
            Fetch Orders
          </button>
        </div>
        {message && <p className="text-red-500 mt-2">{message}</p>}

        {/* Orders List if available*/}
        {orders.length > 0 && (
          <ul className="mt-4 space-y-4">
            {orders.map((o) => (
              <li
                key={o._id}
                className="bg-primary/70 shadow border rounded font-serif mx-8"
              >
                <h3 className="text-center mb-4 font-semibold font-serif ">
                  Order ID: {o._id}
                </h3>
                <p className="text-center mb-4">Email: {o.email}</p>
                <p className="text-center mb-4">Total: {o.total}</p>
                <p className="text-center mb-4">Status: {o.status}</p>

                <div className="mt-2 flex gap-4 p-4">
                  <button
                    onClick={() => handleUpdate(o._id)}
                    className="bg-secondary hover:bg-orange-400 text-white px-2 font-serif"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleReOrder(o)}
                    className="bg-primary hover:bg-green-700 text-white px-2 font-serif"
                  >
                    Re-Order
                  </button>
                  <button
                    onClick={() => handleDelete(o._id)}
                    className="bg-accent hover:bg-red-500 text-white px-2 py-1 rounded font-serif"
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
