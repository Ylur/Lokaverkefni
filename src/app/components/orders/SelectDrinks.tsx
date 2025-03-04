"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image"; 

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

interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

export default function SelectDrinks() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
        const res = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.drinks?.[0]) {
          fetched.push(data.drinks[0]);
        }
      }
      setDrinks(fetched);
    }
    fetchDrinks();
  }, []);

  function toggleDrink(drink: Drink) {
    setSelectedDrinks((prev) => {
      const found = prev.find((d) => d.idDrink === drink.idDrink);
      if (found) {
        return prev.filter((d) => d.idDrink !== drink.idDrink);
      } else {
        return [
          ...prev,
          { idDrink: drink.idDrink, strDrink: drink.strDrink, quantity: 1 },
        ];
      }
    });
  }

  function updateQuantity(idDrink: string, quantity: number) {
    setSelectedDrinks((prev) =>
      prev.map((d) => (d.idDrink === idDrink ? { ...d, quantity } : d))
    );
  }

  function handleNext() {
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));
    router.push(`/booking?${params.toString()}`);
  }

  function handleBack() {
    const params = new URLSearchParams();
    params.set("dishes", JSON.stringify(selectedDishes));
    params.set("drinks", JSON.stringify(selectedDrinks));
    router.push(`/select-dishes?${params.toString()}`);
  }

  return (
    <div className="p-8 justify-items-center">
      <h1 className="text-xl font-bold text-white font-serif text-center">
        Select Drinks
      </h1>

      <div className="space-x-2 mb-4 text-center">
        <button
          onClick={handleBack}
          className="bg-primary hover:bg-green-700 text-white px-3 py-1 font-serif"
        >
          Back (Dishes)
        </button>
        <button
          onClick={handleNext}
          className="bg-primary hover:bg-green-700 text-white px-3 py-1 font-serif"
        >
          Next (Booking)
        </button>
      </div>

      {drinks.length === 0 ? (
        <p className="text-white text-center">Loading drinks...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4 text-center overflow-hidden">
          {drinks.map((drink) => {
            const isSelected = selectedDrinks.some(
              (d) => d.idDrink === drink.idDrink
            );
            const drinkData = selectedDrinks.find(
              (d) => d.idDrink === drink.idDrink
            );

            return (
              <div
                key={drink.idDrink}
                className="
                  border p-2 font-serif font-semibold text-white
                  flex flex-col justify-between items-center
                  min-h-[360px]
                "
              >
                {/* Top: Image + Title */}
                <div className="text-center">
                  <Image
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    width={200}
                    height={150}
                    className="mx-auto"
                  />
                  <p className="mt-2">{drink.strDrink}</p>
                </div>

                {/* Select/Remove Button */}
                <button
                  onClick={() => toggleDrink(drink)}
                  className={`${
                    isSelected
                      ? "bg-accent hover:bg-red-600"
                      : "bg-primary hover:bg-green-700"
                  } text-white px-2 py-1 mt-2 font-serif font-semibold`}
                >
                  {isSelected ? "Remove" : "Select"}
                </button>

                {/* Quantity if selected */}
                {isSelected && drinkData && (
                  <div className="mb-2 mt-2 text-white font-serif font-semibold">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      className="text-center border-primary text-primary font-serif ml-2  w-10"
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
