//src/app/components/orders/SelectDrinks.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface SelectedDrink {
  idDrink: string;
  strDrink: string;
  quantity: number;
}

/**
 * select desired drinks, set quantity, and proceed.
 */
export default function SelectDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selected, setSelected] = useState<SelectedDrink[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Grab any previously selected dishes from the URL
  const storedDishes = searchParams.get("dishes");
  const email = searchParams.get("email") || "";

  useEffect(() => {
    async function fetchRandomDrinks() {
      const fetched: Drink[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.drinks && data.drinks.length > 0) {
          fetched.push(data.drinks[0]);
        }
      }
      setDrinks(fetched);
    }
    fetchRandomDrinks();
  }, []);

  function toggleDrink(drink: Drink) {
    setSelected((prev) => {
      const exists = prev.find((d) => d.idDrink === drink.idDrink);
      if (exists) {
        return prev.filter((d) => d.idDrink !== drink.idDrink);
      } else {
        return [
          ...prev,
          { idDrink: drink.idDrink, strDrink: drink.strDrink, quantity: 1 },
        ];
      }
    });
  }

  function updateQuantity(drinkId: string, quantity: number) {
    setSelected((prev) =>
      prev.map((d) => (d.idDrink === drinkId ? { ...d, quantity } : d))
    );
  }

  function handleNext() {
    if (!storedDishes) {
      alert("No dishes selected. Please go back.");
      return;
    }
    // Build query params
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    params.set("dishes", storedDishes);
    params.set("drinks", JSON.stringify(selected));

    // The next step is "Booking" instead of "Create Order".
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold mb-4">Select Drinks</h1>
      {drinks.length === 0 ? (
        <p>Loading drinks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drinks.map((drink) => {
            const isSelected = selected.some((d) => d.idDrink === drink.idDrink);
            const selectedDrink = selected.find((d) => d.idDrink === drink.idDrink);

            return (
              <div
                key={drink.idDrink}
                className="p-4 border rounded bg-white shadow"
              >
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-auto object-cover mb-2"
                />
                <h2 className="font-semibold text-lg">{drink.strDrink}</h2>
                <button
                  onClick={() => toggleDrink(drink)}
                  className={`mt-2 px-2 py-1 text-white ${
                    isSelected ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {isSelected ? "Remove" : "Select"}
                </button>
                {isSelected && selectedDrink && (
                  <div className="mt-2">
                    <label className="mr-2">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={selectedDrink.quantity}
                      onChange={(e) =>
                        updateQuantity(drink.idDrink, Number(e.target.value))
                      }
                      className="border px-1 w-16"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Next (Booking)
      </button>
    </div>
  );
}
