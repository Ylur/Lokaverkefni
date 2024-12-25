"use client";

import React, { FC, JSX } from "react";
import Image from "next/image";

interface MenuItem {
  name: string;
  image: string;
  description?: string;
}

const MenuPage: FC = () => {
  const starters: MenuItem[] = [
    {
      name: "Chicken Caesar Salad",
      description:
        "Romaine Lettuce, Grilled Chicken, Parmesan Cheese, and Caesar Dressing",
      image: "/photos/Dish1.png",
    },
    {
      name: "Classic Cobb Salad",
      description:
        "Grilled Chicken, Avocado, Bacon, Hard-Boiled Eggs, Tomatoes, and Blue Cheese Dressing",
      image: "/photos/Dish2.png",
    },
    {
      name: "Asian Chicken Salad",
      description:
        "Shredded Chicken, Mandarin Oranges, Crispy Wontons, and Sesame Ginger Dressing",
      image: "/photos/Dish3.png",
    },
  ];

  const mainCourses: MenuItem[] = [
    {
      name: "Southwest Chicken Salad",
      description:
        "Grilled Chicken, Corn, Black Beans, Avocado, Tomatoes, and Chipotle Ranch Dressing",
      image: "/photos/Dish4.png",
    },
    {
      name: "Grilled Chicken Salad",
      description:
        "Mixed Greens, Grilled Chicken, Cherry Tomatoes, Red Onion, and Balsamic Vinaigrette",
      image: "/photos/Dish5.png",
    },
    {
      name: "Greek Chicken Salad",
      description:
        "Grilled Chicken, Feta Cheese, Cucumbers, Kalamata Olives, and Lemon-Olive Oil Dressing",
      image: "/photos/Dish6.png",
    },
    {
      name: "Buffalo Chicken Salad",
      description:
        "Crispy Chicken Tenders, Mixed Greens, Carrots, Celery, Blue Cheese Crumbles, and Buffalo Ranch Dressing",
      image: "/photos/Dish7.png",
    },
  ];

  const sandwiches: MenuItem[] = [
    {
      name: "Grilled Chicken Panini",
      description: "Mozzarella Cheese, Roasted Red Peppers, and Pesto Mayo",
      image: "/photos/Dish8.png",
    },
    {
      name: "Chicken Salad Sandwich",
      description:
        "Shredded Chicken, Grapes, Almonds, and Lettuce on Whole Wheat Bread",
      image: "/photos/Dish9.png",
    },
  ];

  const sides: MenuItem[] = [
    { name: "Sweet Potato Fries", image: "/photos/Dish1.png" },
    { name: "Garlic Parmesan Fries", image: "/photos/Dish2.png" },
    { name: "Grilled Vegetables", image: "/photos/Dish3.png" },
  ];

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
          <div className="text-center text-accent">
            <h1 className="text-5xl font-bold">Our LiL menu</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        {renderMenuSection("Starters", starters)}
        {renderMenuSection("Main Courses", mainCourses)}
        {renderMenuSection("Sandwiches", sandwiches)}
        {renderMenuSection("Sides", sides)}
      </div>

    </>
  );
};

export default MenuPage;
