// src/app/components/orders/CreateOrder.tsx
"use client";

import React, { useState } from "react";

const CreateOrder: React.FC = () => {
  const [form, setForm] = useState({
    item: "",
    quantity: 1,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Build the data to match "backend's" validation
    const orderData = {
      email: "",
      dishes: [
        {
          idMeal: `custom-${Date.now()}`,
          strMeal: form.item,
          quantity: Number(form.quantity),
        },
      ],
      drinks: [],
      total: 9.99 * Number(form.quantity), // placeholder / random prices set
    };

    try {
      // the fetch URL hits /api/orders on the same domain aka local dev
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        // credentials: "include", //  only needed if using cookies or sessions, Prod
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      setMessage("Order created successfully!");
      setForm({ item: "", quantity: 1 });
    } catch (error: any) {
      console.error("Error creating order:", error);
      setMessage(
        error.message || "An error occurred while creating the order."
      );
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Create Order</h2>
      {message && <p className="text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="item" className="block">
            Item:
          </label>
          <input
            id="item"
            name="item"
            value={form.item}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="quantity" className="block">
            Quantity:
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            value={form.quantity}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-accent text-primary px-3 py-1 rounded mt-2"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
