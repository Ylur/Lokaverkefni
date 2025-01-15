"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

// Props Interfaces for preview components
interface DishPreviewProps {
  dishId: string;
}

interface DrinkPreviewProps {
  drinkId: string;
}

// Data Interfaces for API responses
interface DishData {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface DrinkData {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}

// DishPreview Component
export const DishPreview: FC<DishPreviewProps> = ({ dishId }) => {
  const [dish, setDish] = useState<DishData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchDish() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setDish(data.meals[0]);
        } else {
          setError("Dish not found.");
        }
      } catch (err) {
        console.error("Error fetching dish details:", err);
        setError("Failed to load dish details.");
      }
    }
    fetchDish();
  }, [dishId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!dish) return <p>Loading dish details...</p>;

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg border p-4 m-2">
      <Image
        className="w-full h-auto object-cover"
        src={dish.strMealThumb}
        alt={dish.strMeal}
        width={500}
        height={300}
      />
      <div className="mt-4 text-lg font-semibold text-white">{dish.strMeal}</div>
      <p className="mt-2 text-primary">
        {dish.strInstructions.substring(0, 100)}...
      </p>
    </div>
  );
};

// DrinkPreview Component
export const DrinkPreview: FC<DrinkPreviewProps> = ({ drinkId }) => {
  const [drink, setDrink] = useState<DrinkData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchDrink() {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
        );
        const data = await res.json();
        if (data.drinks && data.drinks.length > 0) {
          setDrink(data.drinks[0]);
        } else {
          setError("Drink not found.");
        }
      } catch (err) {
        console.error("Error fetching drink details:", err);
        setError("Failed to load drink details.");
      }
    }
    fetchDrink();
  }, [drinkId]);

  if (error) return <p className="text-accent">{error}</p>;
  if (!drink) return <p>Loading drink details...</p>;

  return (
    <div className="border max-w-xs rounded overflow-hidden shadow-lg p-4 m-2">
      <Image
        className="w-full h-auto object-cover"
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        width={500}
        height={300}
      />
      <div className="mt-4 text-lg font-semibold">{drink.strDrink}</div>
      <p className="mt-2 text-primary">
        {drink.strInstructions.substring(0, 100)}...
      </p>
    </div>
  );
};
