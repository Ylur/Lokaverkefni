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

  // Predefine half-hour slots from 16:00 to 23:00
  const timeSlots = [
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
  ];

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
    <div className="p-4 text-white flex justify-center">
      {/* Constrain the form to max-width and center it */}
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Booking Details</h1>

        <div className="space-x-2 mb-4">
          <button
            onClick={handleBack}
            className="bg-primary hover:bg-green-700 text-white px-3 py-1"
          >
            Back (Drinks)
          </button>
          <button
            onClick={handleNext}
            className="bg-primary hover:bg-green-700 text-white px-3 py-1"
          >
            Next (Receipt)
          </button>
        </div>

        <p className="mb-4">
          Please fill in your booking details. We’ll prepare your table and
          confirm your order!
        </p>

        <div className="bg-black/40 p-4 rounded shadow space-y-4">
          {/* Email */}
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              className="border w-full text-black p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Date */}
          <div>
            <label className="block font-semibold">Date:</label>
            <input
              type="date"
              className="border w-full text-black p-1"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* Time (Half-Hour Slots) */}
          <div>
            <label className="block font-semibold">Time (16:00-23:00):</label>
            <select
              className="border w-full text-black p-1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Select a Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          {/* People */}
          <div>
            <label className="block font-semibold">People (1-10):</label>
            <input
              type="number"
              className="border w-full text-black p-1"
              min={1}
              max={10}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
