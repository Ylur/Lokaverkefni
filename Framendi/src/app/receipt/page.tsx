// src/app/receipt/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReceiptComponent from "../components/orders/ReceiptComponent";

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [finalOrder, setFinalOrder] = useState<any>(null);

  // Pull query params from the URL
  const email = searchParams.get("email");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const people = searchParams.get("people");
  const dishesParam = searchParams.get("dishes");
  const drinksParam = searchParams.get("drinks");

  useEffect(() => {
    // Quick check for required info
    if (!email || !date || !time || !people || !dishesParam || !drinksParam) {
      setMessage("Missing booking info or items from previous steps.");
      return;
    }

    // Parse the JSON parameters
    let dishes: any[] = [];
    let drinks: any[] = [];
    try {
      dishes = JSON.parse(dishesParam);
      drinks = JSON.parse(drinksParam);
    } catch (err) {
      setMessage("Error parsing dishes or drinks from query params.");
      return;
    }

    // Calculate total (replace with your real pricing logic)
    let total = 0;
    dishes.forEach((dish) => {
      total += dish.quantity * 9.99;
    });
    drinks.forEach((drink) => {
      total += drink.quantity * 4.99;
    });

    // Build the final order object
    const order = {
      email,
      dishes,
      drinks,
      total,
      date,
      time,
      people: Number(people),
    };

    // Post the order to the *local* Next.js API route
    async function postOrder() {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          // If the server returns an error, show it
          const errorMessages =
            data.errors?.map((e: any) => e.msg).join(", ") ||
            data.error ||
            "Failed to create order";
          throw new Error(errorMessages);
        }

        // Success: set the final order for display
        setFinalOrder(data.order);
      } catch (err: any) {
        setMessage(err.message || "Error creating order.");
      }
    }

    postOrder();
  }, [email, date, time, people, dishesParam, drinksParam]);

  // Display error message if any
  if (message) {
    return <div className="p-4 text-center text-red-500">{message}</div>;
  }

  // Show processing message while waiting for the response
  if (!finalOrder) {
    return <div className="p-4 text-center">Processing your order...</div>;
  }

  // Display the final receipt using your existing <ReceiptComponent>
  return <ReceiptComponent finalOrder={finalOrder} />;
}
