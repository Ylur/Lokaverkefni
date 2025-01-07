"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const storedDishes = searchParams.get("dishes");
  const storedDrinks = searchParams.get("drinks");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [date, setDate] = useState("2025-01-07");
  const [time, setTime] = useState("19:00");
  const [people, setPeople] = useState("2");
  const [message, setMessage] = useState("");

  // Convert to arrays
  const dishes = storedDishes ? JSON.parse(storedDishes) : [];
  const drinks = storedDrinks ? JSON.parse(storedDrinks) : [];

  function calculateTotal() {
    // Very rough example: $10 per dish + $5 per drink x quantity
    let total = 0;
    for (let d of dishes) {
      total += 10 * (d.quantity || 1);
    }
    for (let dr of drinks) {
      total += 5 * (dr.quantity || 1);
    }
    return total;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    if (dishes.length === 0 && drinks.length === 0) {
      setMessage("No items selected. Please go back and choose items.");
      return;
    }

    const orderData = {
      email,
      dishes: dishes.map((d: any) => ({
        idMeal: d.idMeal,
        strMeal: d.strMeal,
        quantity: d.quantity,
      })),
      drinks: drinks.map((dr: any) => ({
        idDrink: dr.idDrink,
        strDrink: dr.strDrink,
        quantity: dr.quantity,
      })),
      total: calculateTotal(),
      date,
      time,
      people: Number(people),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      // If successful, redirect to receipt
      router.push(`/receipt?id=${data.order._id}`);
    } catch (err: any) {
      setMessage(err.message || "An error occurred while creating the order.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      {message && <p className="text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label>Email:</label>
          <input
            className="border p-2 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            className="border p-2 w-full"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            className="border p-2 w-full"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label>People:</label>
          <input
            className="border p-2 w-full"
            type="number"
            min={1}
            max={10}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Confirm Order
        </button>
      </form>
    </div>
  );
}
