// src/app/components/SelectDrinks.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { SelectedDrink } from "../types";

interface Drink {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const SelectDrinks: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selected, setSelected] = useState<SelectedDrink[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const dishesParam = searchParams.get("dishes");

  useEffect(() => {
    async function fetchRandomDrinks() {
      const res = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
      );
      const data = await res.json();

      if (data.drinks && data.drinks.length > 0) {
        const shuffledDrinks = data.drinks.sort(() => 0.5 - Math.random());
        setDrinks(shuffledDrinks.slice(0, 3));
      }
    }
    fetchRandomDrinks();
  }, []);

  const toggleDrink = (drink: Drink) => {
    setSelected((prev) => {
      const existing = prev.find((d) => d.idDrink === drink.idDrink);
      if (existing) {
        return prev.filter((d) => d.idDrink !== drink.idDrink);
      } else {
        return [
          ...prev,
          { idDrink: drink.idDrink, strDrink: drink.strDrink, quantity: 1 },
        ];
      }
    });
  };

  const updateQuantity = (drinkId: string, quantity: number) => {
    setSelected((prev) =>
      prev.map((d) => (d.idDrink === drinkId ? { ...d, quantity } : d))
    );
  };

  const handleNext = () => {
    if (selected.length === 0) {
      alert("Please select at least one drink.");
      return;
    }

    const params = new URLSearchParams();
    if (email) params.set("email", email);
    if (dishesParam) params.set("dishes", dishesParam);

    const selectedDrinks = selected.map((drink) => ({
      idDrink: drink.idDrink,
      strDrink: drink.strDrink,
      quantity: drink.quantity,
    }));
    params.set("drinks", JSON.stringify(selectedDrinks));

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Select Drinks</h1>
      {drinks.length === 0 ? (
        <p>Loading drinks...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {drinks.map((drink) => {
            const isSelected = selected.some(
              (d) => d.idDrink === drink.idDrink
            );
            const selectedDrink = selected.find(
              (d) => d.idDrink === drink.idDrink
            );

            return (
              <div
                key={drink.idDrink}
                className={`p-4 bg-black rounded shadow relative ${
                  isSelected ? "border-2 border-blue-500" : ""
                }`}
              >
                <Image
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{drink.strDrink}</h2>

                <button
                  onClick={() => toggleDrink(drink)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  {isSelected ? "Remove" : "Select"}
                </button>

                {isSelected && selectedDrink && (
                  <div className="mt-2 flex items-center space-x-2">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={selectedDrink.quantity}
                      onChange={(e) =>
                        updateQuantity(drink.idDrink, Number(e.target.value))
                      }
                      className="border p-1 w-16 text-center text-black"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Booking
        </button>
      </div>
    </div>
  );
};

export default SelectDrinks;
