// src/app/booking/page.tsx

"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OrderForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // TODO: Get previously selected dish/drink info from query params or global state
  // á meðan we just proceed to the receipt page with these new params.


    // Passa:
    // - date should not be in the past
    // - time should be between 16:00 and 23:00, Mon-Fri 
    // - people between 1 and 10
    // - email format: string@string.string

    function validate() {
      if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return false;
      }
  
      if (people < 1 || people > 10) {
        alert("Number of people must be between 1 and 10.");
        return false;
      }

    // Add more checks for date/time as needed.
    return true;
  }

  function handleNext() {
    if (!validate()) return;
  
    const params = new URLSearchParams();
    params.set("email", email);
    params.set("date", date);
    params.set("time", time);
    params.set("people", people.toString());
  
    // Retrieve dishes and drinks from the current search params.
    const dishes = searchParams.get("dishes");
    const drinks = searchParams.get("drinks");
  
    // Pass along to the receipt page.
    if (dishes) params.set("dishes", dishes);
    if (drinks) params.set("drinks", drinks);
  
    // dishId stored:
    const dishId = searchParams.get("dishId");
    if (dishId) params.set("dishId", dishId);
  
    router.push(`/receipt?${params.toString()}`);
  }
  

  return (

    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Order Details</h1>

      <div className="max-w-md mx-auto bg-black p-4 rounded shadow">
        <label className="block mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full mb-4 text-black"
        />

        <label className="block mb-2">Time (16:00 - 23:00):</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded w-full mb-4 text-black"
        />

        <label className="block mb-2">Number of People (1-10):</label>
        <input
          type="number"
          min={1}
          max={10}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="border p-2 rounded w-full mb-4 text-black"
        />

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-4 text-black"
        />

        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Next (Receipt)
        </button>
      </div>
    </div>
  
  );
}
export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderForm />
    </Suspense>
  );
}