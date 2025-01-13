"use client";

import React from "react";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import DrinkCarousel from "./components/common/DrinkCarousel"
import NavButton from "./components/orders/NavButton"

export default function HomePage() {
  return (
    <div className="flex flex-wrap h-screen">
      <div className="flex justify-center items-center w-full md:w-1/2 p-4 border border-gray-300">
        <Carousel />
      </div>


      <div className="flex justify-center items-center w-full md:w-1/2 p-4 border border-gray-300">
        <NavButton 
        route="/orders/older-orders"
        buttonText="Look up your previous orders here"
        />
      </div>


      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-4 border border-gray-300 text-center">
        <h2 className="text-xl font-semibold mb-3">Start / Create Order</h2>
        <p className="mb-3">
          Begin your journey by selecting dishes, drinks, and finalizing your booking.
        </p>
        <a
          href="/select-dish"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Order
        </a>
      </div>


      <div className="flex justify-center items-center w-full md:w-1/2 p-4 border border-gray-300">
        <DrinkCarousel />
      </div>
    </div>
  );
}
