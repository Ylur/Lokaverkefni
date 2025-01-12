// src/app/dish/[id]/page.tsx
"use client";

import React, { useEffect, useState, use } from "react";

interface Dish {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

export default function DishDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { id } = params;
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDish() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setDish(data.meals[0]);
        } else {
          setError("Dish not found");
        }
      } catch (err) {
        setError("Error fetching dish details");
      } finally {
        setLoading(false);
      }
    }
    fetchDish();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!dish) return <p>No details available.</p>;

  return (
    <div>
      <h1>{dish.strMeal}</h1>
      <img src={dish.strMealThumb} alt={dish.strMeal} />
      <p>{dish.strInstructions}</p>
    </div>
  );
}
