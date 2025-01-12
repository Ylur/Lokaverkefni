// app/page.tsx
"use client";

import React from "react";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import OlderOrdersPage from "./components/orders/OrdersList";

export default function HomePage() {
  return (
    <div className="flex flex-wrap h-screen">
      {/* Top-Left Section */}
      <div className="w-full md:w-1/2 p-4 border border-gray-300">
        <Carousel />
      </div>

      {/* Top-Right Section */}
      <div className="w-full md:w-1/2 p-4 border border-gray-300">
        <OlderOrdersPage />
      </div>

      {/* Bottom-Left Section */}
      <div className="w-full md:w-1/2 p-4 border border-gray-300 text-center">
        <h2 className="text-xl font-semibold mb-3">Start / Create Order</h2>
        <p className="mb-3">
          Begin your journey by selecting dishes, drinks, and finalizing your
          booking.
        </p>
        <a
          href="/select-dish"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Order
        </a>
      </div>

      {/* Bottom-Right Section */}
      <div className="w-full md:w-1/2 p-4 border border-gray-300">
        <Carousel />
      </div>
    </div>
  );
}
