"use client";

import React from "react";
import "./globals.css";
import Hero from "./components/common/Hero";
import MiniOrderFlow from "./components/common/MiniOrderFlow";
import Carousel from "./components/common/Carousel";
import CreateOrderPage from "./components/orders/CreateOrder";

export default function HomePage() {
  return (
    <div className="flex flex-wrap md:flex-row">
      <div className="w-3/4 p-4">
        <Hero />
      </div>
      <div className="w-1/4 bg-gray-100 border-l-indigo-500">
        <MiniOrderFlow step={0} />
      </div>

      {/* Carousels or other content */}
      <div className="w-1/4 p-4">
        <Carousel />
      </div>
      <div className="w-1/4 p-4">
        <Carousel />
      </div>
      <div className="w-1/4 p-4">
        <Carousel />
      </div>
      <div className="w-1/4 p-4">
        <Carousel />
      </div>
    </div>
  );
}
