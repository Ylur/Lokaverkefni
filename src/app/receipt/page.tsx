"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import ReceiptComponent from "@/app/components/orders/ReceiptComponent";

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
    return (
      <p className="text-accent">Error parsing dishes/drinks from query.</p>
    );
  }

  if (!email || !date || !time || !peopleStr) {
    return (
      <p className="text-accent">
        Missing booking info (email, date, time, or people).
      </p>
    );
  }

  const people = Number(peopleStr);
  if (Number.isNaN(people) || people < 1) {
    return <p className="text-accent">Invalid number of people.</p>;
  }

  // cost logic
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

  if (finalOrder) {
    // If posted => show the final receipt
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 text-white">
        <div className="max-w-md w-full">
          {message && (
            <p className="text-primary font-semibold text-lg mb-2">{message}</p>
          )}
          <ReceiptComponent
            finalOrder={finalOrder}
            onDone={() => router.push("/")}
          />
        </div>
      </div>
    );
  }

  // Otherwise, show “preview” portion
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-white">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center font-serif">
          Your Order (Preview)
        </h1>

        <div className="text-center mb-4">
          <button
            onClick={handleBack}
            className="bg-primary hover:bg-green-700 text-white px-3 py-1 font-serif"
          >
            Back (Booking)
          </button>
        </div>

        <div className="bg-primary/10 p-4 rounded border shadow space-y-2">
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

        <div className="text-center mt-4">
          <button
            onClick={handleDone}
            className="bg-primary hover:bg-green-700 text-white px-4 py-2 font-serif"
            disabled={orderPosted}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
