"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Hero from "../components/common/Hero";

interface MenuItem {
  name: string;
  image: string;
  description?: string;
}

const MenuPage: FC = () => {
  const [starters, setStarters] = useState<MenuItem[]>([]);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);
  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMenuData() {
      try {
        setLoading(true);
        setError("");

        // Fetch starters
        const startersResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter"
        );
        const startersData = await startersResponse.json();
        const startersItems: MenuItem[] = startersData.meals.map((meal: any) => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
        setStarters(startersItems);

        // Fetch random drinks
        const drinksResponse = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        );
        const drinksData = await drinksResponse.json();
        const drinksItems: MenuItem[] = drinksData.drinks.map((drink: any) => ({
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }));
        setDrinks(drinksItems);

        // Fetch random dishes
        const dishesResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"
        );
        const dishesData = await dishesResponse.json();
        const dishesItems: MenuItem[] = dishesData.meals.map((dish: any) => ({
          name: dish.strMeal,
          image: dish.strMealThumb,
        }));
        setDishes(dishesItems);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
      }
    }

    fetchMenuData();
  }, []);

  const renderMenuSection = (title: string, items: MenuItem[]) => (
    <section className="mb-8">
      <h2 className="text-2xl text-white font-serif font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-lg">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
              width={400}
              height={200}
            />
            <h3 className="text-xl text-primary font-bold mb-2">{item.name}</h3>
            {item.description && (
              <p className="text-gray-600">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
    <Hero />
    

      <div className="container mx-auto p-8">
        {loading ? (
          <p className="text-white">Loading menu...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
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
