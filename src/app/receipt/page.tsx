"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MiniOrderFlow from "../components/common/MiniOrderFlow";
import ReceiptComponent from "../components/orders/ReceiptComponent";

/**
 * Final step (Step #4): Show user the final order details.
 * In your original code, you also posted to /api/orders here.
 * That approach is fine or you can do it earlier. 
 * We'll show a simple "display" approach, but you can adapt it to call your backend.
 */
export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [finalOrder, setFinalOrder] = useState<any>(null);

  useEffect(() => {
    // Grab parameters from the URL
    const email = searchParams.get("email");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const people = searchParams.get("people");
    const dishesParam = searchParams.get("dishes");
    const drinksParam = searchParams.get("drinks");

    // Basic validation
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

    // Calculate a rough total
    let total = 0;
    dishes.forEach((dish) => {
      total += dish.quantity * 10; // $10 per dish, adjust as needed
    });
    drinks.forEach((drink) => {
      total += drink.quantity * 5; // $5 per drink, adjust as needed
    });

    // Build the final object
    const order = {
      email,
      date,
      time,
      people: Number(people),
      dishes,
      drinks,
      total,
    };

    // Optionally, POST to local /api/orders to store in DB:
    // 
    /*
    async function postOrder() {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create order");
        }
        // On success, store the created order data
        setFinalOrder(data.order);
      } catch (err: any) {
        setMessage(err.message || "Error creating order.");
      }
    }

    postOrder();
    */

    // for dev - set finalOrder:
    setFinalOrder(order);
  }, [searchParams]);

  // Display errors or a loading message
  if (message) {
    return (
      <div className="p-4">
        <MiniOrderFlow step={4} />
        <p className="text-red-500">{message}</p>
      </div>
    );
  }

  if (!finalOrder) {
    return (
      <div className="p-4">
        <MiniOrderFlow step={4} />
        <p>Loading your final order...</p>
      </div>
    );
  }

  // If we have a final order, display it in your <ReceiptComponent>
  return (
    <div className="p-4">
      <MiniOrderFlow step={4} />
      <ReceiptComponent finalOrder={finalOrder} />
    </div>
  );
}
