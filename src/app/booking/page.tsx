"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MiniOrderFlow from "src/app/components/common/MiniOrderFlow";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract existing data from the URL
  const initialEmail = searchParams.get("email") || "";
  const initialDishes = searchParams.get("dishes");
  const initialDrinks = searchParams.get("drinks");

  const [email, setEmail] = useState(initialEmail);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  // Get today's date in YYYY-MM-DD format for date validation
  const today = new Date().toISOString().split("T")[0];

  function validate() {
    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return false;
    }
    // People count validation
    if (people < 1 || people > 10) {
      alert("Number of people must be between 1 and 10.");
      return false;
    }
    // Date validation
    if (!date) {
      alert("Please select a date.");
      return false;
    }
    if (date < today) {
      alert("Date cant be in the past.");
      return false;
    }
    // Time validation
    if (!time) {
      alert("Please select a time (between 16:00 and 23:00).");
      return false;
    }
    if (time < "16:00" || time > "23:00") {
      alert("Time must be between 16:00 and 23:00.");
      return false;
    }
    // If booking for today, ensure time is in the future
    if (date === today) {
      const now = new Date();
      const [selectedHour, selectedMinute] = time.split(":").map(Number);
      const selectedDateTime = new Date();
      selectedDateTime.setHours(selectedHour, selectedMinute, 0, 0);
      // Compare the selected time with current time
      if (selectedDateTime < now) {
        alert("You cannot book in the past.");
        return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (!validate()) return;

    if (!initialDishes || !initialDrinks) {
      alert("Missing dishes or drinks info from previous steps!");
      return;
    }

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
    <div className="container mx-auto p-4">
      <MiniOrderFlow step={3} />
      <h1 className="text-2xl font-bold mb-4 text-center">Booking Details</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email:</label>
          <input
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Date:</label>
          <input
            type="date"
            className="border p-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Time (16:00-23:00):
          </label>
          <input
            type="time"
            lang="en-GB"
            className="border p-2 w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="16:00"
            max="23:00"
            step="1800"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Number of People (1-10):
          </label>
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
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Next (Receipt)
        </button>
      </div>
    </div>
  );
}
