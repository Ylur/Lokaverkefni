// TODO: Get previously selected dish/drink info from query params or global state

// Passa:
// - date should not be in the past
// - time should be between 16:00 and 23:00, Mon-Fri
// - people between 1 and 10
// - email format: string@string.string

// framendi/src/app/receipt/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  const dishesParam = searchParams.get("dishes");
  const drinksParam = searchParams.get("drinks");

  function validate() {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (people < 1 || people > 10) {
      alert("Number of people must be between 1 and 10.");
      return false;
    }
    if (!date) {
      alert("Please select a date.");
      return false;
    }
    if (!time) {
      alert("Please select a time.");
      return false;
    }

    return true;
  }

  function handleNext() {
    if (!validate()) return;

    if (!dishesParam || !drinksParam) {
      alert("Missing dishes or drinks info from previous steps!");
      return;
    }

    const params = new URLSearchParams();
    params.set("email", email);
    params.set("date", date);
    params.set("time", time);
    params.set("people", String(people));
    params.set("dishes", dishesParam);
    params.set("drinks", drinksParam);

    // Debugging Log
    console.log("Navigating to Receipt with params:", params.toString());

    router.push(`/receipt?${params.toString()}`);
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <div className="mb-2">
        <label className="block">Email:</label>
        <input
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block">Date:</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block">Time (16:00-23:00):</label>
        <input
          type="time"
          className="border p-2 w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block">Number of People (1-10):</label>
        <input
          type="number"
          className="border p-2 w-full"
          min={1}
          max={10}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        />
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 mt-3"
      >
        Next (Receipt)
      </button>
    </div>
  );
}
