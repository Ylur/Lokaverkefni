// framendi/src/app/page.tsx

"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { AuthContext } from "./context/AuthContext";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { token } = useContext(AuthContext);

  // Initialize Keen Slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 5,
    },
  });

  const nextSlide = () => instanceRef.current?.next();
  const prevSlide = () => instanceRef.current?.prev();

  // Check if an order exists for the given email
  async function checkOrderByEmail(email: string) {
    if (!token) {
      throw new Error("User is not authenticated. Please log in.");
    }

    // Fetch all orders from the server
    const res = await fetch("http://localhost:3001/api/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders from backend");
    }

    const data = await res.json();

    if (data.success && Array.isArray(data.orders)) {
      // Check if any order exists for the given email
      const existingOrder = data.orders.some(
        (order: { email: string }) =>
          order.email.toLowerCase() === email.toLowerCase()
      );
      return existingOrder;
    } else {
      throw new Error(data.error || "Invalid response structure from backend");
    }
  }

  async function handleStartOrder() {
    try {
      const orderExists = await checkOrderByEmail(email);

      if (orderExists) {
        // Pass email as query param so next screen can load prefilled data
        router.push(`/select-dish?email=${encodeURIComponent(email)}`);
      } else {
        // Start fresh
        router.push("/select-dish");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message); // Consider replacing with UI-based error messages
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 border border-secondary p-4">
        {/* Upper Left: Keen Slider Carousel */}
        <div className="place-self-auto border border-secondary p-4 flex flex-col items-center relative">
          <div ref={sliderRef} className="keen-slider w-full h-full">
            <div className="keen-slider__slide">
              <Image
                src="/photos/Dish3.png"
                alt="Dish 1"
                layout="responsive"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="keen-slider__slide">
              <Image
                src="/photos/Dish1.png"
                alt="Dish 2"
                layout="responsive"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="keen-slider__slide">
              <Image
                src="/photos/Dish5.png"
                alt="Dish 3"
                layout="responsive"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 bottom-10 bg-yellow-200 p-2 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 bottom-10 bg-yellow-200 p-2 rounded-full"
          >
            &#8250;
          </button>
        </div>

        {/* Upper Right: Placeholder Content */}
        <div className="border border-secondary p-6">
          <h2 className="text-xl mb-2">Welcome to Our Service</h2>
          <p>Explore our delicious menu and place your orders seamlessly.</p>
        </div>

        {/* Lower Left: Email Section */}
        <div className="border border-secondary p-6 flex flex-col items-center">
          <p className="mb-4 text-center">
            Please enter your email to continue your order or start a new one:
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mb-4 text-primary bg-secondary"
            placeholder="you@example.com"
            required
          />
          <button
            onClick={handleStartOrder}
            className="bg-secondary text-primary py-2 px-4 rounded"
          >
            Start Order
          </button>
        </div>

        {/* Lower Right: Order View (placeholder) */}
        <div className="border border-secondary p-6">
          <h2 className="text-xl mb-2">Your Current Order</h2>
          <p>View and manage your orders after logging in.</p>
        </div>
      </div>
    </div>
  );
}
