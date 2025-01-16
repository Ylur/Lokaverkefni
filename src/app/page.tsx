"use client";

import React from "react";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import DrinkCarousel from "./components/common/DrinkCarousel";
import NavButton from "./components/orders/NavButton";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full border rounded font-serif font-semibold text-white">
      <section className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Welcome to Our Restaurant
        </h1>
        <p className="mb-6 max-w-2xl font-serif ">
          Explore delicious dishes, refreshing drinks, and easy booking. Start
          your order or check out our featured items below!
        </p>

        <div className="flex justify-items-center space-x-3 mt-4 mx:auto overflow-auto ">
          <NavButton
            route="/select-dishes"
            buttonText="Create an order"
            className="bg-primary hover:bg-green-700 text-white border px-4 py-2 rounded shadow transition font-serif"
          />
          <NavButton
            route="/menu"
            buttonText="View our menu"
            className="text-white bg-primary hover:bg-green-700 border px-4 py-2 rounded shadow transition font-serif"
          />
          <NavButton
            route="/orders/older-orders"
            buttonText="View Previous Orders"
            className="text-white bg-primary hover:bg-green-700 border px-4 py-2 rounded shadow transition font-serif"
          />
        </div>
      </section>

      <hr className="my-8 border-gray-200" />
      <section className="container mx-auto px-4 py-8  ">
        <h2 className="text-2xl mb-4 text-center font-serif font-semibold">
          Popular Dishes
        </h2>
        <div className="w-full mx-auto mb-6">
          <Carousel />
        </div>

        <h2 className="text-2xl mb-4 text-center font-serif font-semibold ">
          Popular Drinks
        </h2>
        <div className="w-full mx-auto ">
          <DrinkCarousel />
        </div>
      </section>
    </div>
  );
}
