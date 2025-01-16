"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Hero from "../components/common/Hero";

interface MenuItem {
  name: string;
  image: string;
  description: string;
}

const MenuPage: FC = () => {
  const [starters, setStarters] = useState<MenuItem[]>([]);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);
  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------
  // 1. Reusable fetch function
  // --------------------------
  // TheMealDB
  async function fetchFullMealsByCategory(
    category: string
  ): Promise<MenuItem[]> {
    // 1) Use filter endpoint to get minimal data
    const filterRes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const filterData = await filterRes.json();
    if (!filterData.meals) return [];

    const items: MenuItem[] = [];

    // 2) For each meal, icall lookup to get 'strInstructions'
    for (const meal of filterData.meals) {
      const detailRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const detailData = await detailRes.json();
      const fullMeal = detailData.meals?.[0];
      if (fullMeal) {
        items.push({
          name: fullMeal.strMeal,
          image: fullMeal.strMealThumb,
          description: fullMeal.strInstructions || "No description available.",
        });
      }
    }

    return items;
  }

  // For TheCocktailDB
  async function fetchFullDrinksByCategory(
    category: string
  ): Promise<MenuItem[]> {
    // 1) Using filter endpoint to get minimal data
    const filterRes = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const filterData = await filterRes.json();
    if (!filterData.drinks) return [];

    const items: MenuItem[] = [];

    // 2) For each drink, callinglookup to get instructions
    for (const drink of filterData.drinks) {
      const detailRes = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
      );
      const detailData = await detailRes.json();
      const fullDrink = detailData.drinks?.[0];
      if (fullDrink) {
        items.push({
          name: fullDrink.strDrink,
          image: fullDrink.strDrinkThumb,
          description: fullDrink.strInstructions || "No description available.",
        });
      }
    }

    return items;
  }

  // --------------------------
  // 2. Fetch all categories
  // --------------------------
  useEffect(() => {
    async function fetchMenuData() {
      try {
        setLoading(true);
        setError("");

        const [starterItems, dishItems, drinkItems] = await Promise.all([
          fetchFullMealsByCategory("Starter"), // i could change this into, Seafood, Vegetarian, etc.
          fetchFullMealsByCategory("Beef"), // similar here Chicken, Dessert, etc.
          fetchFullDrinksByCategory("Cocktail"),
        ]);

        setStarters(starterItems);
        setDishes(dishItems);
        setDrinks(drinkItems);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
      }
    }

    fetchMenuData();
  }, []);

  // --------------------------
  // 3. "ReadMoreLess" Component
  // --------------------------
  // Renders the first 120 chars of description by default.
  // A "Read More" button toggles showing the full text.
  const ReadMoreLess: FC<{ text: string }> = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    const MAX_LENGTH = 120;

    if (!text) return null;

    const isLong = text.length > MAX_LENGTH;
    const displayedText = expanded ? text : text.slice(0, MAX_LENGTH);

    return (
      <div className="font-serif text-white m-4">
        <p>
          {displayedText}
          {!expanded && isLong ? "..." : ""}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm text-primary underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    );
  };

  // --------------------------
  // 4. Render section
  // --------------------------
  const renderMenuSection = (title: string, items: MenuItem[]) => (
    <section className="mb-8">
      <h2 className="text-2xl text-white font-serif font-semibold mb-4">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-white font-semibold">No items found for {title}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-lg bg-accent"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
                width={400}
                height={200}
              />
              <h3 className="text-xl text-primary font-bold mb-2">
                {item.name}
              </h3>
              <ReadMoreLess text={item.description} />
            </div>
          ))}
        </div>
      )}
    </section>
  );

  // --------------------------
  // 5. Main return
  // --------------------------
  return (
    <>
      <Hero />
      <div className="container mx-auto p-8">
        {loading ? (
          <p className="text-white">Loading menu...</p>
        ) : error ? (
          <p className="text-accent font-bold">{error}</p>
        ) : (
          <>
            {renderMenuSection("Starters", starters)}
            {renderMenuSection("Dishes", dishes)}
            {renderMenuSection("Drinks", drinks)}
          </>
        )}
      </div>
    </>
  );
};

export default MenuPage;
