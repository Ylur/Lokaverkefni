"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReceiptComponent from "../components/orders/ReceiptComponent";

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReceiptContent />
    </Suspense>
  );
}

function ReceiptContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [finalOrder, setFinalOrder] = useState<any>(null);

  useEffect(() => {
    // Extract parameters from the URL
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

    // Calculate total (adjust prices as needed)
    let total = 0;
    dishes.forEach((dish) => {
      total += dish.quantity * 10;
    });
    drinks.forEach((drink) => {
      total += drink.quantity * 5;
    });

    // Build the final order object dynamically, capturing the email and other details
    const order = {
      email,
      date,
      time,
      people: Number(people),
      dishes,
      drinks,
      total,
    };

    // Function to submit the order via POST
    const submitOrder = async () => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to submit order.");
        }

        // On success, store the returned order
        setFinalOrder(data.order);
      } catch (error: any) {
        setMessage(error.message || "Error submitting order.");
      }
    };

    // Submit the order once the component mounts and dependencies are ready
    submitOrder();
  }, [searchParams]);

  // Display error message if any
  if (message) {
    return (
      <div className="p-4">
        <p className="text-red-500">{message}</p>
      </div>
    );
  }

  // Show loading state until the order is set
  if (!finalOrder) {
    return (
      <div className="p-4">
        <p>Loading your final order...</p>
      </div>
    );
  }

  // Once the order is successfully saved, display the receipt
  return (
    <div className="p-4">
      <ReceiptComponent finalOrder={finalOrder} />
    </div>
  );
}
