'use client';

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "../components/TopMenu";
import { OrderContext, Dish } from "../contexts/OrderContext"; // Correct import
import Image from "next/image";

const SelectDish: React.FC = () => {
  const router = useRouter();
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("SelectDish must be used within an OrderProvider");
  }

  const { orderData, setOrderData } = context;
  const [dish, setDish] = useState<Dish | null>(orderData.dish);

  const fetchRandomDish = useCallback(async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      if (data.meals) {
        setDish(data.meals[0]);
        setOrderData({ ...orderData, dish: data.meals[0] });
      }
    } catch (error) {
      console.error("Error fetching dish:", error);
    }
  }, [orderData, setOrderData]);

  useEffect(() => {
    if (!dish) {
      fetchRandomDish();
    }
  }, [dish, fetchRandomDish]);

  const handleNext = () => {
    router.push("/select-drink");
  };

  return (
    <div>
      <TopMenu />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Select Dish</h1>
        {dish && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{dish.strMeal}</h2>
            <Image
              src={dish.strMealThumb}
              alt={dish.strMeal}
              width={500}
              height={300}
              className="w-full h-auto my-4 rounded"
            />
            <p>{dish.strInstructions}</p>
          </div>
        )}
        <div className="flex space-x-4">
          <button
            onClick={fetchRandomDish}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Get Another Dish
          </button>
          <button
            onClick={handleNext}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Next: Select Drink
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDish;
