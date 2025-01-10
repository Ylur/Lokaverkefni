"use client";

import React, { useContext } from "react";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import MiniOrderFlow from "./components/common/MiniOrderFlow";
import Hero from "./components/common/Hero";


export default function HomePage() {
  return (
    
    <div className="flex flex-wrap md:flex-row">
      <div className="w-3/4 p-4">
        <Hero />
      </div>
      <div className="w-1/4 bg-gray-100 border-l-indigo-500">
        <MiniOrderFlow />
      </div>

      <div className="w-2/4 p-4">
        <Carousel />
      </div>
      <div className="w-2/4 p-4">
        <Carousel />
      </div>
      <div className="w-2/4 p-4">
        <Carousel />
      </div>
      <div className="w-2/4 p-4">
        <Carousel />
      </div>
    </div>
  );
}
