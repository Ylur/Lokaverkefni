"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

interface DishDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface DishPreviewProps {
  dishId: string;
}

const DishPreview: FC<DishPreviewProps> = ({ dishId }) => {
  const [dish, setDish] = useState<DishDetails | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchDish() {
      try {
        // Fetch dish details from an external API using the dishId
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`);
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
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white p-4 m-2">
      <Image
        className="w-full h-auto object-cover"
        src={dish.strMealThumb}
        alt={dish.strMeal}
        width={500}
        height={300}
      />
      <div className="mt-4 text-lg font-semibold">{dish.strMeal}</div>
      <p className="mt-2 text-gray-600">{dish.strInstructions.substring(0, 100)}...</p>
    </div>
  );
};

export default DishPreview;
