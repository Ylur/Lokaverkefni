"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReceiptComponent from "../components/orders/ReceiptComponent";
import { v4 as uuidv4 } from 'uuid';

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
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    if (orderSubmitted) return; // Prevent duplicate submissions

    const email = searchParams.get("email");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const people = searchParams.get("people");
    const dishesParam = searchParams.get("dishes");
    const drinksParam = searchParams.get("drinks");

    if (!email || !date || !time || !people || !dishesParam || !drinksParam) {
      setMessage("Missing booking info or items from previous steps.");
      return;
    }

    let dishes: any[] = [];
    let drinks: any[] = [];
    try {
      dishes = JSON.parse(dishesParam);
      drinks = JSON.parse(drinksParam);
    } catch (err) {
      setMessage("Error parsing dishes or drinks from query params.");
      return;
    }

    let total = 0;
    dishes.forEach((dish) => {
      total += dish.quantity * 10;
    });
    drinks.forEach((drink) => {
      total += drink.quantity * 5;
    });

    const order = {
      transaction: uuidv4(),
      email,
      date,
      time,
      people: Number(people),
      dishes,
      drinks,
      total,
    };

    const submitOrder = async () => {
      console.log("Submitting order:", order); ////Debug til að sjá fjölda post triggera TODO LAGA TRIGGERA 
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

        setFinalOrder(data.order);
        setOrderSubmitted(true); // Mark as submitted
        console.log("Order Successfully submitted", data.order); //Debug til að sjá fjölda post triggera
      } catch (error: any) {
        setMessage(error.message || "Error submitting order.");
      }
    };

    submitOrder();
  }, [searchParams, orderSubmitted]);

  if (message) {
    return <p className="text-red-500">{message}</p>;
  }

  if (!finalOrder) {
    return <p>Loading your final order...</p>;
  }

  return <ReceiptComponent finalOrder={finalOrder} />;
}
