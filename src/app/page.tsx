"use client";

import React from "react";
import Link from "next/link";
import "./globals.css";
import Carousel from "./components/common/Carousel";
import DrinkCarousel from "./components/common/DrinkCarousel";
import NavButton from "./components/orders/NavButton";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full border font-serif font-semibold text-white">
      <section className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Welcome to Our Restaurant
        </h1>
        <p className="mb-6 max-w-2xl font-serif ">
          Explore delicious dishes, refreshing drinks, and easy booking. Start
          your order or check out our featured items below!
        </p>
        <div className="space-x-3">
          <Link
            href="/select-dishes"
            className="inline-block bg-primary hover:bg-green-700 text-white px-6 py-2 rounded shadow transition font-serif"
          >
            Create Order
          </Link>
          <NavButton
            route="/menu"
            buttonText="View our menu"
            className="text-white bg-primary hover:bg-green-700 px-6 py-2 rounded shadow transition font-serif"
          />
          <NavButton
            route="/orders/older-orders"
            buttonText="View Previous Orders"
            className="text-white bg-primary hover:bg-green-700 px-6 py-2 rounded shadow transition font-serif"
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

        <h2 className="text-2xl mb-4 text-center font-serif font-semibold">
          Popular Drinks
        </h2>
        <div className="w-full mx-auto">
          <DrinkCarousel />
        </div>
      </section>
    </div>
  );
}
