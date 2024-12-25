// src/app/components/Receipt.tsx

"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SelectedDish, SelectedDrink } from "../types"; 

const Receipt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const date = searchParams.get("date");
  const dishesParam = searchParams.get("dishes");
  const drinksParam = searchParams.get("drinks");
  const totalParam = searchParams.get("total");

  // Validate required parameters
  if (!email || !date || !dishesParam || !drinksParam || !totalParam) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Invalid Receipt Data</h1>
        <p className="text-red-500 text-center">
          Missing order details. Please try placing the order again.
        </p>
        <div className="text-center mt-4">
          <button
            onClick={() => router.push("/")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const selectedDishes: SelectedDish[] = JSON.parse(dishesParam);
  const selectedDrinks: SelectedDrink[] = JSON.parse(drinksParam);
  const total: number = parseFloat(totalParam);

  const dishPricePerPerson = 20;
  const drinkPrice = 8;

  const dishTotal = selectedDishes.reduce(
    (sum: number, dish: SelectedDish) => sum + dish.quantity * dishPricePerPerson,
    0
  );

  const drinksTotal = selectedDrinks.reduce(
    (sum: number, drink: SelectedDrink) => sum + drink.quantity * drinkPrice,
    0
  );

  const calculatedTotal = dishTotal + drinksTotal;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Receipt</h1>
      <div className="max-w-md mx-auto bg-black p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <p className="mb-2">Email: {email}</p>
        <p className="mb-2">Date: {new Date(date).toLocaleDateString()}</p>

        <hr className="my-4" />

        <h3 className="text-lg font-bold mb-2">Selected Dishes:</h3>
        {selectedDishes.length > 0 ? (
          selectedDishes.map((dish, i) => (
            <div key={i} className="mb-2">
              {dish.strMeal} x {dish.quantity} = ₽{dish.quantity * dishPricePerPerson}
            </div>
          ))
        ) : (
          <p>No dishes selected</p>
        )}
        <p className="font-bold">Dishes Total: ₽{dishTotal}</p>

        <hr className="my-4" />

        <h3 className="text-lg font-bold mb-2">Selected Drinks:</h3>
        {selectedDrinks.length > 0 ? (
          selectedDrinks.map((drink, i) => (
            <div key={i} className="mb-2">
              {drink.strDrink} x {drink.quantity} = ₽{drink.quantity * drinkPrice}
            </div>
          ))
        ) : (
          <p>No drinks selected</p>
        )}
        <p className="font-bold">Drinks Total: ₽{drinksTotal}</p>

        <hr className="my-4" />

        <h2 className="text-xl font-bold">Total: ₽{calculatedTotal}</h2>

        <div className="text-center mt-4">
          <button
            onClick={() => router.push("/")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
