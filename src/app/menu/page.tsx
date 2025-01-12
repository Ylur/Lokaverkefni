"use client";

import React, { FC, JSX, useEffect, useState } from "react";
import Image from "next/image";


interface MenuItem {
  name: string;
  image: string;
  description?: string;
}

const MenuPage: FC = () => {
  const [starters, setStarters] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        // Fetch starters from TheMealDB API as an example
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter");
        const data = await response.json();
        const starterItems: MenuItem[] = data.meals.map((meal: any) => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
          description: "", // The filter endpoint doesn't provide descriptions
        }));

        setStarters(starterItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const renderMenuSection = (title: string, items: MenuItem[]): JSX.Element => (
    <section className="mb-8">
      <h2 className="text-2xl font-serif font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
              width={400}
              height={200}
            />
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
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
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: 'url("/photos/lb.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Our LiL menu</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8">
        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <>
            {renderMenuSection("Starters", starters)}
          </>
        )}
      </div>
    </>
  );
};
