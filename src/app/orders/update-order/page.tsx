"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MiniOrderFlow from "../components/common/MiniOrderFlow";

/**
 * Loads an existing order from /api/orders/:id
 * Allows editing of status, dish quantity, etc. 
 * Then PUT to update the DB.
 */
export default function UpdateOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id"); // the order ID to update

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

  async function handleUpdate() {
    if (!id) return;
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishes: order.dishes,
          drinks: order.drinks,
          total: order.total,
          status: order.status,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update order");
      }
      alert("Order updated!");
      // Go back to older-orders
      router.push("/older-orders");
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  }

  function handleChangeDishes(index: number, field: string, value: any) {
    const updated = [...(order?.dishes || [])];
    updated[index][field] = value;
    setOrder((prev: any) => ({ ...prev, dishes: updated }));
  }

  function handleChangeDrinks(index: number, field: string, value: any) {
    const updated = [...(order?.drinks || [])];
    updated[index][field] = value;
    setOrder((prev: any) => ({ ...prev, drinks: updated }));
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto p-4">
        {/* "step" is optional here, not strictly in your wizard flow */}
        <MiniOrderFlow step={0} /> 
        <h1 className="text-2xl font-bold">Update Order</h1>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <MiniOrderFlow step={0} />
      <h1 className="text-2xl font-bold mb-4">Update Order #{order._id}</h1>
      {message && <p className="text-red-500 mb-2">{message}</p>}

      <div className="mb-2">
        <label className="block font-semibold">Status: </label>
        <select
          value={order.status}
          onChange={(e) =>
            setOrder((prev: any) => ({ ...prev, status: e.target.value }))
          }
          className="border p-1"
        >
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
        </select>
      </div>

      <div className="mb-2">
        <h2 className="font-semibold">Dishes</h2>
        {order.dishes?.map((dish: any, idx: number) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input
              type="text"
              value={dish.strMeal}
              onChange={(e) => handleChangeDishes(idx, "strMeal", e.target.value)}
              className="border px-1"
            />
            <input
              type="number"
              min={1}
              value={dish.quantity}
              onChange={(e) =>
                handleChangeDishes(idx, "quantity", Number(e.target.value))
              }
              className="border px-1 w-16"
            />
          </div>
        ))}
      </div>

      <div className="mb-2">
        <h2 className="font-semibold">Drinks</h2>
        {order.drinks?.map((drink: any, idx: number) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input
              type="text"
              value={drink.strDrink}
              onChange={(e) => handleChangeDrinks(idx, "strDrink", e.target.value)}
              className="border px-1"
            />
            <input
              type="number"
              min={1}
              value={drink.quantity}
              onChange={(e) =>
                handleChangeDrinks(idx, "quantity", Number(e.target.value))
              }
              className="border px-1 w-16"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
