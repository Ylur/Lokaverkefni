"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  idMeal: string;
}

export default function SelectDishPage() {
  const [dishes, setDishes] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    async function fetchRandomDishes() {
      const fetchedDishes: Meal[] = [];
      // Fetch 3 random dishes for variety
      for (let i = 0; i < 3; i++) {
        const res = await fetch("https://themealdb.com/api/json/v1/1/random.php");
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
    if (selectedMeal && selectedMeal.idMeal === dish.idMeal) {
      // Deselect if already selected
      setSelectedMeal(null);
    } else {
      // Select this dish
      setSelectedMeal(dish);
    }
  }

  function handleNext() {
    if (!selectedMeal) {
      alert("Please select a dish before proceeding.");
      return;
    }

    const params = new URLSearchParams();
    if (email) params.set("email", email);
    // Pass along the selected dish’s idMeal or name as needed
    params.set("dishId", selectedMeal.idMeal);

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
            const isSelected = selectedMeal?.idMeal === dish.idMeal;
            return (
              <div
                key={dish.idMeal}
                className={`p-4 bg-white rounded shadow relative ${isSelected ? "border-2 border-blue-500" : ""}`}
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
                  {isSelected ? "Deselect" : "Select"}
                </button>
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
}
