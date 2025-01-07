// framendi/src/app/components/SelectDishPage.tsx (or `SelectDishes.tsx`)

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
  // To pass email along to the next page
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
        // remove
        return prev.filter((d) => d.idMeal !== dish.idMeal);
      } else {
        // add with quantity = 1
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
    // build query params
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    params.set("dishes", JSON.stringify(selected));

    // navigate to /select-drinks
    router.push(`/select-drinks?${params.toString()}`);
  }

  return (
    <div className="container mx-auto p-8">
      <h1>Select Dish</h1>
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
                className="p-4 bg-primary text-secondary rounded"
              >
                <Image
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  width={400}
                  height={300}
                  className="object-cover"
                />
                <h2>{dish.strMeal}</h2>
                <button onClick={() => toggleDish(dish)}>
                  {isSelected ? "Remove" : "Select"}
                </button>
                {isSelected && selectedDish && (
                  <div>
                    <label>Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={selectedDish.quantity}
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
      <button onClick={handleNext}>Next (Select Drinks)</button>
    </div>
  );
};

export default SelectDishes;
