"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingForm from "@/app/components/orders/BookingForm";

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
    // min-h-screen + flex-col + justify-center + items-center => vertical center
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-white">
      {/* Container for the heading and buttons */}
      <div className="max-w-md w-full mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Booking Details</h1>
        <div className="flex justify-center gap-4 mb-4">
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
        <p className="mb-4 text-center">
          Please fill in your booking details. We'll prepare your table and
          confirm your order!
        </p>
      </div>

      {/* Center the form itself */}
      <div className="max-w-md w-full">
        <BookingForm
          email={email}
          date={date}
          time={time}
          people={people}
          today={today}
          timeSlots={timeSlots}
          onChangeEmail={(val) => setEmail(val)}
          onChangeDate={(val) => setDate(val)}
          onChangeTime={(val) => setTime(val)}
          onChangePeople={(val) => setPeople(val)}
        />
      </div>
    </div>
  );
}
