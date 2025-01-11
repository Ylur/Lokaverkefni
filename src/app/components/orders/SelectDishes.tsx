"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

/** Basic interface for random Meal data from themealdb.com */
interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

/**
 * Allows user to fetch random dishes (3 in this example),
 * select desired dishes, set quantity, and proceed to "SelectDrinks".
 */
export default function SelectDishes() {
  const [dishes, setDishes] = useState<Meal[]>([]);
  const [selected, setSelected] = useState<SelectedMeal[]>([]);
  const router = useRouter();
  // So we can carry forward any existing "email" param or other data if needed
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    // On mount, fetch 3 random dishes
    async function fetchRandomDishes() {
      const fetched: Meal[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch("https://themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          fetched.push(data.meals[0]);
        }
      }
      setDishes(fetched);
    }

    fetchRandomDishes();
  }, []);

  // Toggle selection of a dish (if selected, remove; else add)
  function toggleDish(dish: Meal) {
    setSelected((prev) => {
      const exists = prev.find((d) => d.idMeal === dish.idMeal);
      if (exists) {
        return prev.filter((d) => d.idMeal !== dish.idMeal);
      } else {
        return [...prev, { idMeal: dish.idMeal, strMeal: dish.strMeal, quantity: 1 }];
      }
    });
  }

  // Update quantity for a selected dish
  function updateQuantity(dishId: string, quantity: number) {
    setSelected((prev) =>
      prev.map((d) => (d.idMeal === dishId ? { ...d, quantity } : d))
    );
  }

  // Proceed to next step -> /select-drinks
  function handleNext() {
    if (selected.length === 0) {
      alert("Please select at least one dish.");
      return;
    }
    // Build the query params
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    params.set("dishes", JSON.stringify(selected));
    // Move on to the next step
    router.push(`/select-drinks?${params.toString()}`);
  }

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold mb-4">Select Dishes</h1>
      {dishes.length === 0 ? (
        <p>Loading dishes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dishes.map((dish) => {
            const isSelected = selected.some((d) => d.idMeal === dish.idMeal);
            const selectedDish = selected.find((d) => d.idMeal === dish.idMeal);

            return (
              <div
                key={dish.idMeal}
                className="p-4 border rounded bg-white shadow"
              >
                <Image
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  width={400}
                  height={300}
                  className="object-cover mb-2"
                />
                <h2 className="font-semibold text-lg">{dish.strMeal}</h2>
                <button
                  onClick={() => toggleDish(dish)}
                  className={`mt-2 px-2 py-1 text-white ${
                    isSelected ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {isSelected ? "Remove" : "Select"}
                </button>
                {isSelected && selectedDish && (
                  <div className="mt-2">
                    <label className="mr-2">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={selectedDish.quantity}
                      onChange={(e) =>
                        updateQuantity(dish.idMeal, Number(e.target.value))
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
        Next (Select Drinks)
      </button>
    </div>
  );
}
