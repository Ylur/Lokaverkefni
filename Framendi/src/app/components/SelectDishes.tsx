// src/app/components/SelectDishPage.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { SelectedDish, SelectedDrink, NewOrder } from "../types";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  idMeal: string;
}

interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

const SelectDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Meal[]>([]);
  const [selected, setSelected] = useState<SelectedMeal[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    async function fetchRandomDishes() {
      const fetchedDishes: Meal[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch(
          "https://themealdb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          fetchedDishes.push(data.meals[0]);
        }
      }
      setDishes(fetchedDishes);
    }
    fetchRandomDishes();
  }, []);

  function toggleDish(dish: Meal) {
    setSelected((prev) => {
      const existing = prev.find((d) => d.idMeal === dish.idMeal);
      if (existing) {
        // If already selected, remove it
        return prev.filter((d) => d.idMeal !== dish.idMeal);
      } else {
        // quantity 1 by default
        return [
          ...prev,
          { idMeal: dish.idMeal, strMeal: dish.strMeal, quantity: 1 },
        ];
      }
    });
  }

  function updateQuantity(dishId: string, quantity: number) {
    setSelected((prev) =>
      prev.map((d) => (d.idMeal === dishId ? { ...d, quantity } : d))
    );
  }

  function handleNext() {
    if (selected.length === 0) {
      alert("Please select at least one dish.");
      return;
    }

    const params = new URLSearchParams();
    if (email) params.set("email", email);

    // Pass selected dishes as a query parameter
    const selectedDishes = selected.map((dish) => ({
      idMeal: dish.idMeal,
      strMeal: dish.strMeal,
      quantity: dish.quantity,
    }));
    params.set("dishes", JSON.stringify(selectedDishes));

    router.push(`/select-drinks?${params.toString()}`);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Select Dish</h1>

      {dishes.length === 0 ? (
        <p>Loading dishes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dishes.map((dish) => {
            const isSelected = selected.some((d) => d.idMeal === dish.idMeal);
            const selectedDish = selected.find((d) => d.idMeal === dish.idMeal);

            return (
              <div
                key={dish.idMeal}
                className={`p-4 bg-black rounded shadow relative ${
                  isSelected ? "border-2 border-blue-500" : ""
                }`}
              >
                <Image
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{dish.strMeal}</h2>

                <button
                  onClick={() => toggleDish(dish)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  {isSelected ? "Remove" : "Select"}
                </button>

                {isSelected && selectedDish && (
                  <div className="mt-2 flex items-center space-x-2">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={selectedDish.quantity}
                      onChange={(e) =>
                        updateQuantity(dish.idMeal, Number(e.target.value))
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
          Next (Select Drinks)
        </button>
      </div>
    </div>
  );
};

export default SelectDishes;
