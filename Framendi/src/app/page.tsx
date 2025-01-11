// Example: app/page.tsx
"use client";

import React from "react";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import MiniOrderFlow from "./components/common/MiniOrderFlow";
import Hero from "./components/common/Hero";

export default function HomePage() {
  return (
    <div className="flex flex-wrap md:flex-row">
      <div className="w-3/4 p-4 border-white">
        <Hero />
      </div>

      <div className="w-1/4 p-4 text-center border-white ">
        <MiniOrderFlow step={0} />
      </div>

      {/* 1st Carousel */}
      <div className="w-2/4 p-4 border-primary">
        <Carousel />
      </div>
       
     

      <div className="w-1/8 m-8 p-4 bg-primary rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-3">Start / Create Order</h2>
        <p className="mb-3">
          Begin your journey by selecting dishes, drinks, and finalizing your booking.
        </p>
        {/* Link to the FIRST STEP of your flow, 
            which might be /orders/select-dish or just /orders for an index page. */}
        <a
          href="/orders/select-dish"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Order
        </a>
      </div>
      
     

      {/* 4th Carousel */}
      <div className="w- p-4 border-white">
        <Carousel />
      </div>
    </div>
  );
}
