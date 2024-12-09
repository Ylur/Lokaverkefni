"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Check if an order (expense) exists for the given email
  async function checkOrderByEmail(email: string) {
    // Fetch all expenses from your server
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
      <h1 className="text-5xl font-bold text-center mb-6">
        Welcome to Lil Bits
      </h1>
      {/* Simple placeholder "carousel" - Add width/height for Next.js Image */}
      <div className="mb-8 flex space-x-4 justify-center">
        <Image
          src="/photos/sample1.jpg"
          alt="Sample 1"
          width={128}
          height={128}
          className="object-cover"
        />
        <Image
          src="/photos/sample2.jpg"
          alt="Sample 2"
          width={128}
          height={128}
          className="object-cover"
        />
        <Image
          src="/photos/sample3.jpg"
          alt="Sample 3"
          width={128}
          height={128}
          className="object-cover"
        />
      </div>

      <div className="text-center">
        <p className="mb-4">
          Enter your email to continue your order or start a new one:
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded mr-2 text-black"
          placeholder="you@example.com"
        />
        <button
          onClick={handleStartOrder}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Start Order
        </button>
      </div>
    </div>
  );
}
