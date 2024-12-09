"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get("email");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const people = Number(searchParams.get("people")) || 1;
  const dishId = searchParams.get("dishId");
  
 
  const dishPricePerPerson = 20; // TODO skoða verðin
  const selectedDrinks = [
    // TODO extract these from query params or global state.
    // Hard-kóðað í bili
    { strDrink: "Margarita", quantity: 2, price: 8 },
    { strDrink: "Mojito", quantity: 1, price: 10 },
  ];

  const dishTotal = dishPricePerPerson * people;
  const drinksTotal = selectedDrinks.reduce((sum, d) => sum + d.price * d.quantity, 0);
  const total = dishTotal + drinksTotal;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Receipt</h1>

      <div className="max-w-md mx-auto bg-black p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <p className="mb-2">Email: {email}</p>
        <p className="mb-2">Date: {date}</p>
        <p className="mb-2">Time: {time}</p>
        <p className="mb-2">People: {people}</p>
        
        <hr className="my-4" />
        
        <h3 className="text-lg font-bold mb-2">Selected Dish:</h3>
        <p>{dishId ? `Dish ID: ${dishId}` : "No dish selected"}</p>
        <p>Price per person: ${dishPricePerPerson}</p>
        <p>Dish Total: ${dishTotal}</p>

        <hr className="my-4" />

        <h3 className="text-lg font-bold mb-2">Selected Drinks:</h3>
        {selectedDrinks.map((d, i) => (
          <div key={i} className="mb-2">
            {d.strDrink} x {d.quantity} = ${d.price * d.quantity}
          </div>
        ))}
        <p className="font-bold">Drinks Total: ${drinksTotal}</p>

        <hr className="my-4" />

        <h2 className="text-xl font-bold">Total: ${total}</h2>
        
        <div className="text-center mt-4">
          {/* In a real flow, you might have a button to complete the order or go home */}
          <button
            onClick={() => router.push("/")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
