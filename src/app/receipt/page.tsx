"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

interface SelectedDrink {
  idDrink: string;
  strDrink: string;
  quantity: number;
}

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [finalOrder, setFinalOrder] = useState<any>(null);
  const [message, setMessage] = useState("");

  // Safely parse from query (use coalescing so they're never null)
  const email = searchParams.get("email") ?? "";
  const date = searchParams.get("date") ?? "";
  const time = searchParams.get("time") ?? "";
  const peopleStr = searchParams.get("people") ?? "";

  let dishes: SelectedMeal[] = [];
  let drinks: SelectedDrink[] = [];

  try {
    dishes = JSON.parse(searchParams.get("dishes") ?? "[]");
    drinks = JSON.parse(searchParams.get("drinks") ?? "[]");
  } catch (err) {
    return <p className="text-red-500">Error parsing dishes/drinks from query.</p>;
  }

  // If something is missing, show an error (optional)
  if (!email || !date || !time || !peopleStr) {
    return <p className="text-red-500">Missing booking info (email, date, time, or people).</p>;
  }

  // Convert people to a number
  const people = Number(peopleStr);
  if (Number.isNaN(people) || people < 1) {
    return <p className="text-red-500">Invalid number of people.</p>;
  }

  // Example cost logic
  let total = 0;
  for (const dish of dishes) {
    total += dish.quantity * 10;
  }
  for (const drink of drinks) {
    total += drink.quantity * 5;
  }

  // Build the order object to POST (when user presses Done)
  const orderToPost = {
    transaction: uuidv4(),
    email,
    date,
    time,
    people,
    dishes,
    drinks,
    total,
  };

  // POST /api/orders only on button click
  const [orderPosted, setOrderPosted] = useState(false);

  async function handleDone() {
    setMessage("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderToPost),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }
      setFinalOrder(data.order);
      setMessage("Order created successfully!");
      setOrderPosted(true);
    } catch (error: any) {
      setMessage(error.message || "Error submitting order.");
    }
  }

  // Go back to booking
  function handleBack() {
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(dishes));
    params.set("drinks", JSON.stringify(drinks));
    params.set("email", email);
    params.set("date", date);
    params.set("time", time);
    params.set("people", String(people));
    router.push(`/booking?${params.toString()}`);
  }

  // If we have a finalOrder, show the actual “receipt”
  if (finalOrder) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Receipt</h1>
        {message && <p className="text-green-600">{message}</p>}

        <p>Email: {finalOrder.email}</p>
        <p>Date: {finalOrder.date}</p>
        <p>Time: {finalOrder.time}</p>
        <p>People: {finalOrder.people}</p>

        <h2 className="font-semibold mt-4">Dishes:</h2>
        {finalOrder.dishes?.map((dish: any, i: number) => (
          <p key={i}>
            {dish.strMeal} (x{dish.quantity})
          </p>
        ))}

        <h2 className="font-semibold mt-4">Drinks:</h2>
        {finalOrder.drinks?.map((drink: any, i: number) => (
          <p key={i}>
            {drink.strDrink} (x{drink.quantity})
          </p>
        ))}

        <p className="font-bold mt-2">Total: ${finalOrder.total}</p>

        <button onClick={() => router.push("/")} className="bg-green-500 text-white px-4 py-2 mt-4">
          Done
        </button>
      </div>
    );
  }

  // Otherwise, show “preview” (not posted yet)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Receipt (Preview)</h1>
      <div className="mb-2">
        <button onClick={handleBack} className="bg-gray-400 text-white px-3 py-1">
          Back (Booking)
        </button>
      </div>

      <p>Email: {email}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>People: {people}</p>

      <h2 className="font-semibold mt-4">Dishes:</h2>
      {dishes.map((dish, i) => (
        <p key={i}>
          {dish.strMeal} (x{dish.quantity})
        </p>
      ))}

      <h2 className="font-semibold mt-4">Drinks:</h2>
      {drinks.map((drink, i) => (
        <p key={i}>
          {drink.strDrink} (x{drink.quantity})
        </p>
      ))}

      <p className="font-bold mt-2">Total: ${total}</p>

      {message && <p className="text-red-500 mt-2">{message}</p>}

      <button
        onClick={handleDone}
        className="bg-blue-600 text-white px-4 py-2 mt-4"
        disabled={orderPosted}
      >
        Confirm (POST Order)
      </button>
    </div>
  );
}
