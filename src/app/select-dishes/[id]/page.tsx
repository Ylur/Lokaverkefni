// src/app/select-disesh/[id]/page.tsx
import React from "react";

interface Dish {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

async function fetchDish(id: string): Promise<Dish | null> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0];
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DishDetailPage({ params }: PageProps) {
  // Await the params before using its properties
  const { id } = await params;
  const dish = await fetchDish(id);

  if (!dish) {
    return <p>Dish not found or error fetching details.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{dish.strMeal}</h1>
      <img
        src={dish.strMealThumb}
        alt={dish.strMeal}
        className="w-full h-auto mb-4"
      />
      <p>{dish.strInstructions}</p>
    </div>
  );
}
