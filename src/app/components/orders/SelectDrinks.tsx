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

// For skipping dishes, we just keep it an empty array if none
interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

export default function SelectDrinks() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse from query
  const [selectedDishes, setSelectedDishes] = useState<SelectedMeal[]>(() => {
    try {
      const param = searchParams.get("dishes");
      return param ? JSON.parse(param) : [];
    } catch {
      return [];
    }
  });
  const [selectedDrinks, setSelectedDrinks] = useState<SelectedDrink[]>(() => {
    try {
      const param = searchParams.get("drinks");
      return param ? JSON.parse(param) : [];
    } catch {
      return [];
    }
  });

  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    async function fetchDrinks() {
      const fetched: Drink[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await res.json();
        if (data.drinks?.[0]) {
          fetched.push(data.drinks[0]);
        }
      }
      setDrinks(fetched);
    }
    fetchDrinks();
  }, []);

  // Toggle
  function toggleDrink(drink: Drink) {
    setSelectedDrinks((prev) => {
      const found = prev.find((d) => d.idDrink === drink.idDrink);
      if (found) {
        return prev.filter((d) => d.idDrink !== drink.idDrink);
      } else {
        return [...prev, { idDrink: drink.idDrink, strDrink: drink.strDrink, quantity: 1 }];
      }
    });
  }

  // Quantity
  function updateQuantity(idDrink: string, quantity: number) {
    setSelectedDrinks((prev) =>
      prev.map((d) => (d.idDrink === idDrink ? { ...d, quantity } : d))
    );
  }

  function handleNext() {
    // We allow skipping drinks if user wants:
    // if (selectedDrinks.length === 0) {
    //   ...
    // }

    // Keep both arrays
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));

    router.push(`/booking?${params.toString()}`);
  }

  function handleBack() {
    // If user wants to go back to dishes, keep the data
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));
    router.push(`/select-dishes?${params.toString()}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Select Drinks</h1>

      <div className="space-x-2">
        <button onClick={handleBack} className="bg-gray-400 text-white px-3 py-1">
          Back (Dishes)
        </button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-3 py-1">
          Next (Booking)
        </button>
      </div>

      {drinks.length === 0 ? (
        <p>Loading drinks...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {drinks.map((drink) => {
            const isSelected = selectedDrinks.some((d) => d.idDrink === drink.idDrink);
            const drinkData = selectedDrinks.find((d) => d.idDrink === drink.idDrink);
            return (
              <div key={drink.idDrink} className="border p-2">
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-auto"
                />
                <p>{drink.strDrink}</p>
                <button
                  onClick={() => toggleDrink(drink)}
                  className={`${
                    isSelected ? "bg-red-500" : "bg-green-500"
                  } text-white px-2 py-1 mt-2`}
                >
                  {isSelected ? "Remove" : "Select"}
                </button>
                {isSelected && drinkData && (
                  <div className="mt-2">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      className="border ml-2"
                      value={drinkData.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(drink.idDrink, Number(e.target.value))
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
