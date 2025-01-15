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
  const [orderPosted, setOrderPosted] = useState(false);

  // Safely parse from query
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
    return <p className="text-accent">Error parsing dishes/drinks from query.</p>;
  }

  if (!email || !date || !time || !peopleStr) {
    return <p className="text-accent">Missing booking info (email, date, time, or people).</p>;
  }

  const people = Number(peopleStr);
  if (Number.isNaN(people) || people < 1) {
    return <p className="text-accent">Invalid number of people.</p>;
  }

  // Example cost logic
  let total = 0;
  for (const dish of dishes) {
    total += dish.quantity * 10;
  }
  for (const drink of drinks) {
    total += drink.quantity * 5;
  }

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

  // If finalOrder is set, show the "confirmed" receipt
  if (finalOrder) {
    return (
      <div className="p-4 text-white flex justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-primary text-2xl font-bold mb-4">Receipt</h1>

          {message && <p className="text-primary font-bold text-lg mb-2">{message}</p>}

          <div className="bg-black/40 p-4 rounded shadow space-y-2 ">
            <p>
              <span className="font-semibold">Email:</span> {finalOrder.email}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {finalOrder.date}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {finalOrder.time}
            </p>
            <p>
              <span className="font-semibold">People:</span> {finalOrder.people}
            </p>

            <div>
              <h2 className="font-semibold mt-4">Dishes:</h2>
              {finalOrder.dishes?.map((dish: any, i: number) => (
                <p key={i}>
                  {dish.strMeal} (x{dish.quantity})
                </p>
              ))}
            </div>

            <div>
              <h2 className="font-semibold mt-4">Drinks:</h2>
              {finalOrder.drinks?.map((drink: any, i: number) => (
                <p key={i}>
                  {drink.strDrink} (x{drink.quantity})
                </p>
              ))}
            </div>

            <p className="font-bold mt-2">Total: ${finalOrder.total}</p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="bg-primary hover:bg-green-700 text-white px-4 py-2 mt-4"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, show the "preview" (not posted yet)
  return (
    <div className="p-4 flex justify-center text-white">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Your order (Preview)</h1>

        <div className="mb-2">
          <button onClick={handleBack} className=" bg-primary hover:bg-green-700 text-white px-3 py-1">
            Back (Booking)
          </button>
        </div>

        <div className="bg-accent/40 p-4 rounded border shadow space-y-2 ">
          <p>
            <span className="font-semibold font-serif">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold font-serif">Date:</span> {date}
          </p>
          <p>
            <span className="font-semibold font-serif">Time:</span> {time}
          </p>
          <p>
            <span className="font-semibold font-serif">People:</span> {people}
          </p>

          <div>
            <h2 className="font-semibold font-serif mt-4">Dishes:</h2>
            {dishes.map((dish, i) => (
              <p key={i}>
                {dish.strMeal} (x{dish.quantity})
              </p>
            ))}
          </div>

          <div>
            <h2 className="font-semibold font-serif mt-4">Drinks:</h2>
            {drinks.map((drink, i) => (
              <p key={i}>
                {drink.strDrink} (x{drink.quantity})
              </p>
            ))}
          </div>

          <p className="font-semibold font-serif mt-2">Total: ${total}</p>
        </div>

        {message && <p className="text-red-500 mt-2">{message}</p>}

        <button
          onClick={handleDone}
          className="bg-primary hover:bg-green-700 text-white px-4 py-2 mt-4"
          disabled={orderPosted}
        >
          Confirm order
        </button>
      </div>
    </div>
  );
}
