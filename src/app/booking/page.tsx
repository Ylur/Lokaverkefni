"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse data from query
  const [selectedDishes] = useState<SelectedMeal[]>(() => {
    try {
      const param = searchParams.get("dishes");
      return param ? JSON.parse(param) : [];
    } catch {
      return [];
    }
  });
  const [selectedDrinks] = useState<SelectedDrink[]>(() => {
    try {
      const param = searchParams.get("drinks");
      return param ? JSON.parse(param) : [];
    } catch {
      return [];
    }
  });

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  function handleNext() {
    // Basic validation
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (!date) {
      alert("Please select a date.");
      return;
    }
    if (!time) {
      alert("Please select a time (16:00-23:00).");
      return;
    }
    if (people < 1 || people > 10) {
      alert("Number of people must be between 1 and 10.");
      return;
    }

    // Build query params for the next (Receipt) page
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));
    params.set("email", email);
    params.set("date", date);
    params.set("time", time);
    params.set("people", String(people));

    router.push(`/receipt?${params.toString()}`);
  }

  function handleBack() {
    // If user wants to go back to drinks
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));
    router.push(`/select-drinks?${params.toString()}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Booking Details</h1>
      <div className="space-x-2 mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white px-3 py-1"
        >
          Back (Drinks)
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-3 py-1"
        >
          Next (Receipt)
        </button>
      </div>

      <div className="max-w-md space-y-2">
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="border w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            className="border w-full"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Time (16:00-23:00):</label>
          <input
            type="time"
            className="border w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="16:00"
            max="23:00"
            step={1800}
          />
        </div>
        <div>
          <label>People (1-10):</label>
          <input
            type="number"
            className="border w-full"
            min={1}
            max={10}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
