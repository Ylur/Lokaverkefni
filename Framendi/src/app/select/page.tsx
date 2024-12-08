"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "../components/TopMenu";
import { OrderContext, Dish, Drink } from "../contexts/OrderContext";
import Image from "next/image";

// Define interfaces for API responses
interface DrinkAPI {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface DishAPI {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const Select: React.FC = () => {
  const router = useRouter();
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("Select page must be used within an OrderProvider");
  }

  const { orderData, setOrderData } = context;

  const [dishes, setDishes] = useState<DishAPI[]>([]);
  const [drinks, setDrinks] = useState<DrinkAPI[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(orderData.dish);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>(
    orderData.drinks
  );

  // Fetch dishes from API
  const fetchDishes = useCallback(async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await response.json();
      if (data.meals) {
        setDishes(data.meals.slice(0, 10)); // Limit to 10 dishes for demo
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }, []);

  // Fetch drinks from API
  const fetchDrinks = useCallback(async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
      );
      const data = await response.json();
      if (data.drinks) {
        setDrinks(data.drinks.slice(0, 10)); // Limit to 10 drinks for demo
      }
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  }, []);

  useEffect(() => {
    fetchDishes();
    fetchDrinks();
  }, [fetchDishes, fetchDrinks]);

  // Select or deselect a dish
  const selectDish = (dish: DishAPI) => {
    if (selectedDish && selectedDish.idMeal === dish.idMeal) {
      setSelectedDish(null);
      setOrderData({ ...orderData, dish: null });
    } else {
      const newDish: Dish = {
        idMeal: dish.idMeal,
        strMeal: dish.strMeal,
        strMealThumb: dish.strMealThumb,
        strInstructions: "", // You can fetch instructions if needed
      };
      setSelectedDish(newDish);
      setOrderData({ ...orderData, dish: newDish });
    }
  };

  // Toggle drink selection
  const toggleDrinkSelection = (drink: DrinkAPI) => {
    const exists = selectedDrinks.find((d) => d.idDrink === drink.idDrink);
    if (exists) {
      setSelectedDrinks(
        selectedDrinks.filter((d) => d.idDrink !== drink.idDrink)
      );
    } else {
      const newDrink: Drink = { ...drink, quantity: 1 };
      setSelectedDrinks([...selectedDrinks, newDrink]);
    }
  };

  // Update quantity of a selected drink
  const updateQuantity = (id: string, quantity: number) => {
    setSelectedDrinks(
      selectedDrinks.map((drink) =>
        drink.idDrink === id ? { ...drink, quantity } : drink
      )
    );
  };

  // Handle proceeding to receipt
  const handleNext = () => {
    if (!selectedDish && selectedDrinks.length === 0) {
      alert("Please select at least one dish or drink.");
      return;
    }
    setOrderData({ ...orderData, drinks: selectedDrinks, dish: selectedDish });
    router.push("/receipt");
  };

  return (
    <div>
      <TopMenu />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Select Your Order
        </h1>

        {/* Dish Selection */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Choose a Dish</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dishes.map((dish) => (
              <div
                key={dish.idMeal}
                className={`border p-2 rounded cursor-pointer ${
                  selectedDish && selectedDish.idMeal === dish.idMeal
                    ? "border-[#C16757]"
                    : "border-gray-300"
                }`}
                onClick={() => selectDish(dish)}
              >
                <Image
                  src={dish.strMealThumb}
                  alt={dish.strMeal}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="text-center mt-2">{dish.strMeal}</p>
                {selectedDish && selectedDish.idMeal === dish.idMeal && (
                  <span className="block text-center text-[#C16757] font-semibold">
                    ✓ Selected
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Drink Selection */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Choose Drinks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drinks.map((drink) => {
              const isSelected = selectedDrinks.some(
                (d) => d.idDrink === drink.idDrink
              );
              return (
                <div
                  key={drink.idDrink}
                  className={`border p-2 rounded cursor-pointer ${
                    isSelected ? "border-[#C16757]" : "border-gray-300"
                  }`}
                  onClick={() => toggleDrinkSelection(drink)}
                >
                  <Image
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="text-center mt-2">{drink.strDrink}</p>
                  {isSelected && (
                    <span className="block text-center text-[#C16757] font-semibold">
                      ✓ Selected
                    </span>
                  )}
                  {isSelected && (
                    <div className="mt-2">
                      <label className="block text-sm">
                        Quantity:
                        <input
                          type="number"
                          min="1"
                          value={
                            selectedDrinks.find(
                              (d) => d.idDrink === drink.idDrink
                            )?.quantity || 1
                          }
                          onChange={(e) =>
                            updateQuantity(
                              drink.idDrink,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="border p-1 rounded w-full"
                        />
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Proceed Button */}
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-[#C16757] text-white px-6 py-3 rounded hover:bg-[#BA2329]"
          >
            View Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
