"use client";

import React, { useContext } from "react";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import MiniOrderFlow from "./components/common/MiniOrderFlow";


export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 p-4">
        <Carousel />
      </div>
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <MiniOrderFlow />
      </div>
    </div>
  );
}
