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

export default function SelectDrinksPage() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selected, setSelected] = useState<SelectedDrink[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const storedDishes = searchParams.get("dishes");

  useEffect(() => {
    async function fetchRandomDrinks() {
      const fetchedDrinks: Drink[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await res.json();
        if (data.drinks && data.drinks.length > 0) {
          fetchedDrinks.push(data.drinks[0]);
        }
      }
      setDrinks(fetchedDrinks);
    }
    fetchRandomDrinks();
  }, []);

  function toggleDrink(drink: Drink) {
    setSelected((prev) => {
      const existing = prev.find((d) => d.idDrink === drink.idDrink);
      if (existing) {
        // remove
        return prev.filter((d) => d.idDrink !== drink.idDrink);
      } else {
        // add with quantity = 1
        return [...prev, { idDrink: drink.idDrink, strDrink: drink.strDrink, quantity: 1 }];
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
    const dishes = JSON.parse(storedDishes);

    const params = new URLSearchParams();
    if (email) params.set("email", email);
    params.set("dishes", JSON.stringify(dishes));
    params.set("drinks", JSON.stringify(selected));

    // Next step: create-order page
    router.push(`/create-order?${params.toString()}`);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Select Drinks</h1>
      {drinks.length === 0 ? (
        <p>Loading drinks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drinks.map((drink) => {
            const isSelected = selected.some((d) => d.idDrink === drink.idDrink);
            const selectedDrink = selected.find((d) => d.idDrink === drink.idDrink);

            return (
              <div key={drink.idDrink} className="p-4 bg-white shadow rounded">
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-auto object-cover"
                />
                <h2 className="font-semibold text-lg mt-2">{drink.strDrink}</h2>
                <button
                  onClick={() => toggleDrink(drink)}
                  className="bg-blue-500 text-white px-2 py-1 mt-2"
                >
                  {isSelected ? "Remove" : "Select"}
                </button>
                {isSelected && selectedDrink && (
                  <div className="mt-2">
                    <label>Qty: </label>
                    <input
                      type="number"
                      min={1}
                      value={selectedDrink.quantity}
                      onChange={(e) =>
                        updateQuantity(drink.idDrink, Number(e.target.value))
                      }
                      className="border px-1"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <button onClick={handleNext} className="bg-green-600 text-white px-4 py-2 mt-4">
        Next (Create Order)
      </button>
    </div>
  );
}
