"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function HomePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Check if an order (expense) exists for the given email
  async function checkOrderByEmail(email: string) {
    // Fetch all expenses from the server
    const res = await fetch("http://localhost:3001/api/expenses", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch expenses from backend");
    }
    const expenses = await res.json();

    // Check if any expense has a name matching the email
    const existingOrder = expenses.some(
      (expense: { name: string }) =>
        expense.name.toLowerCase() === email.toLowerCase()
    );
    return existingOrder;
  }

  async function handleStartOrder() {
    const orderExists = await checkOrderByEmail(email);

    if (orderExists) {
      // Pass email as query param so next screen can load prefilled data
      router.push(`/select-dish?email=${encodeURIComponent(email)}`);
    } else {
      // Start fresh
      router.push("/select-dish");
    }
  }

  return (
    <div className="container mx-auto p-8">
      {/* Main 2x2 grid container  */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 border border-secondary p-4">
        {/* Upper Left: Carousel TODO ath með að breyta þessu*/}
        <div className="border border-secondary p-4">
          <div className="flex space-x-4 justify-center">
            <Image
              src="/Images/lb.png"
              alt="Diskur eitt"
              width={128}
              height={128}
              className="object-cover"
            />
            <Image
              src="/Images/lb.png"
              alt="Diskur tvö"
              width={128}
              height={128}
              className="object-cover"
            />
            <Image
              src="/Images/lb.png"
              alt="Diskur þrjú"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>

        {/* Upper Right: Placeholder Content */}
        <div className="border border-secondary p-4">
          {/* Add content */}
          <h2 className="text-xl mb-2">Welcome to Our Service</h2>
          <p>Additional information herdygerdy here.</p>
        </div>

        {/* Lower Left: Email Section */}
        <div className="border border-secondary p-4 text-center">
          <p className="mb-4">
            Please enter your email to continue your order or start a new one:
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mr-2 text-primary bg-secondary"
            placeholder="you@example.com"
          />
          <button
            onClick={handleStartOrder}
            className="bg-secondary text-primary p-2 rounded"
          >
            Start Order
          </button>
        </div>

        {/* Lower Right: Order View (placeholder) */}
        <div className="border border-secondary p-4">
          <h2 className="text-xl mb-2">Your Current Order</h2>
          {/* TODO load order/dish/drinks  details here */}
          <p>No items selected yet.</p>
        </div>
      </div>
    </div>
  );
}
