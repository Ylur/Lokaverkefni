"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // carouselið Keen Slider
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
      <div className="grid grid-cols-2 grid-rows-2 gap-4 border border-secondary p-4">
        {/* Upper Left: Keen Slider Carousel */}
        <div className="place-self-auto border border-secondary p-4 flex flex-col items-center">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <Image
                src="/Images/lb.png"
                alt="Diskur 1"
                layout="responsive"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="keen-slider__slide">
              <Image
                src="/Images/lb.png"
                alt="Diskur 2"
                layout="responsive"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="keen-slider__slide">
              <Image
                src="/Images/lb.png"
                alt="Diskur 3"
                layout="responsive"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button
          onClick={prevSlide}
          className="absolute left-2 bottom-10 bg-yellow-200 p-2 rounded-full"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 bottom-10  bg-yellow-200 p-2 rounded-full"
        >
          &#8250;
        </button>
          </div>
        </div>

      

        {/* Upper Right: Placeholder Content */}
        <div className="border border-secondary p-6">
          <h2 className="text-xl mb-2">Welcome to Our Service</h2>
          <p>TODO setja eitthvað hér.</p>
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
          <p>No items selected yet.</p>
        </div>
      </div>
    </div>
  );
}
