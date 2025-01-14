"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

interface SelectedDrink {
  idDrink: string;
  strDrink: string;
  quantity: number;
}

export default function SelectDishes() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1) Parse existing dishes & drinks from query
  const [dishes, setDishes] = useState<Meal[]>([]);
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

  useEffect(() => {
    async function fetchDishes() {
      const fetched: Meal[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch("https://themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();
        if (data.meals?.[0]) {
          fetched.push(data.meals[0]);
        }
      }
      setDishes(fetched);
    }
    fetchDishes();
  }, []);

  // Toggle dish
  function toggleDish(dish: Meal) {
    setSelectedDishes((prev) => {
      const found = prev.find((m) => m.idMeal === dish.idMeal);
      if (found) {
        return prev.filter((m) => m.idMeal !== dish.idMeal);
      } else {
        return [...prev, { idMeal: dish.idMeal, strMeal: dish.strMeal, quantity: 1 }];
      }
    });
  }

  // Update quantity
  function updateQuantity(idMeal: string, quantity: number) {
    setSelectedDishes((prev) =>
      prev.map((m) => (m.idMeal === idMeal ? { ...m, quantity } : m))
    );
  }

  function handleNext() {
    // We allow skipping dishes? Then do not force the user to pick anything:
    // if (selectedDishes.length === 0) {
    //   alert("Please select at least one dish");
    //   return;
    // }

    // Put both updated dishes & drinks into query
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));
    router.push(`/select-drinks?${params.toString()}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Select Dishes</h1>
      <button onClick={handleNext} className="bg-blue-500 text-white px-3 py-1">
        Next (Select Drinks)
      </button>

      {dishes.length === 0 ? (
        <p>Loading dishes...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {dishes.map((dish) => {
            const isSelected = selectedDishes.some((d) => d.idMeal === dish.idMeal);
            const dishData = selectedDishes.find((d) => d.idMeal === dish.idMeal);

            return (
              <div key={dish.idMeal} className="border p-2">
                <Image
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  width={200}
                  height={150}
                />
                <p>{dish.strMeal}</p>
                <button
                  onClick={() => toggleDish(dish)}
                  className={`${
                    isSelected ? "bg-red-500" : "bg-green-500"
                  } text-white px-2 py-1 mt-2`}
                >
                  {isSelected ? "Remove" : "Select"}
                </button>

                {isSelected && dishData && (
                  <div className="mt-2">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      className="border ml-2"
                      value={dishData.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(dish.idMeal, Number(e.target.value))
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
