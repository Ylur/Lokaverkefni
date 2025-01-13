// src/app/select-drinks/[id]/page.tsx
import React from "react";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}

async function fetchDrink(id: string): Promise<Drink | null> {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    if (data.drinks && data.drinks.length > 0) {
      return data.drinks[0];
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DrinkDetailPage({ params }: PageProps) {
  // Await the params before using its properties
  const { id } = await params;
  const drink = await fetchDrink(id);

  if (!drink) {
    return <p>Drink not found or error fetching details.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{drink.strDrink}</h1>
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        className="w-full h-auto mb-4"
      />
      <p>{drink.strInstructions}</p>
    </div>
  );
}
