// src/app/drink/[id]/page.tsx
"use client";

import React, { useEffect, useState, use } from "react";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
 
}

export default function DrinkDetailPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = use(props.params);
  const { id } = params;
  const [drink, setDrink] = useState<Drink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDrink() {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data.drinks && data.drinks.length > 0) {
          setDrink(data.drinks[0]);
        } else {
          setError("Drink not found");
        }
      } catch (err) {
        setError("Error fetching drink details");
      } finally {
        setLoading(false);
      }
    }
    fetchDrink();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!drink) return <p>No details available.</p>;

  return (
    <div>
      <h1>{drink.strDrink}</h1>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} />
      <p>{drink.strInstructions}</p>
      
    </div>
  );
}
