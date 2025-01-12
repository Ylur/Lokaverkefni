"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MiniOrderFlow from "src/app/components/common/MiniOrderFlow";

/**
 * Booking step (Step #3 in the miniflow):
 * - email must be valid
 * - date must not be in the past
 * - time: only allow between 16:00 and 23:00
 * - people: 1..10
 * - must have dishes & drinks from previous steps
 */
export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract any existing data from the URL
  const initialEmail = searchParams.get("email") || "";
  const initialDishes = searchParams.get("dishes");
  const initialDrinks = searchParams.get("drinks");

  const [email, setEmail] = useState(initialEmail);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  function validate() {
    // email check
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a email address.");
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
      alert("Please select a time (between 16:00 and 23:00).");
      return false;
    }
    //  time check
    if (time < "16:00" || time > "23:00") {
      alert("Time must be between 16:00 and 23:00.");
      return false;
    }

    return true;
  }

  function handleNext() {
    if (!validate()) return;

    if (!initialDishes || !initialDrinks) {
      alert("Missing dishes or drinks info from previous steps!");
      return;
    }

    // Build final query params to pass to /receipt
    const params = new URLSearchParams();
    params.set("email", email);
    params.set("date", date);
    params.set("time", time);
    params.set("people", String(people));
    params.set("dishes", initialDishes);
    params.set("drinks", initialDrinks);

    router.push(`/receipt?${params.toString()}`);
  }

  return (
    <div className="container mx-auto p-4 ">
      <MiniOrderFlow step={3} />

      <div className="table-layout: auto ">
        <h1 className="text-2xl font-bold mb-4 min-w-min">Booking Details</h1>

        <div className="mb-2">
          <label className="block font-semibold ">Email:</label>
          <input
            type="email"
            className="border p-2 min-w-max"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Date:</label>
          <input
            type="date"
            className="border p-2 min-w-max"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold min-w-max">
            Time (16:00-23:00):
          </label>
          <input
            type="time"
            lang="en-GB" // Hint for 24-hour format
            className="border p-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="16:00"
            max="23:00"
            step="1800" // 30-minute increments
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold min-w-max">
            Number of People (1-10):
          </label>
          <input
            type="number"
            className="border p-2"
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
    </div>
  );
}
