// src/app/components/CreateOrder.tsx

"use client";

import React, { useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createOrder } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { SelectedDish, SelectedDrink, NewOrder } from "../types";

const CreateOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useContext(AuthContext);

  const emailParam = searchParams.get("email");
  const dishesParam = searchParams.get("dishes");
  const drinksParam = searchParams.get("drinks");

  // Ensure email is a string; if not, handle appropriately
  if (!emailParam) {
    // Optionally, redirect to a different page or show an error
    return (
      <p className="text-red-500">Email is missing. Cannot create order.</p>
    );
  }

  const email: string = emailParam;
  const selectedDishes: SelectedDish[] = dishesParam
    ? JSON.parse(dishesParam)
    : [];
  const selectedDrinks: SelectedDrink[] = drinksParam
    ? JSON.parse(drinksParam)
    : [];

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      setError("You must be logged in to create an order.");
      return;
    }

    setLoading(true);
    setError(null);

    const total = calculateTotal();

    const orderData: NewOrder = {
      email,
      dishes: selectedDishes,
      drinks: selectedDrinks,
      date: new Date().toISOString(),
      total,
    };

    try {
      const order = await createOrder(orderData);
      // Redirect to Receipt with order details
      router.push(
        `/receipt?email=${encodeURIComponent(
          order.email
        )}&date=${encodeURIComponent(order.date)}&dishes=${encodeURIComponent(
          JSON.stringify(order.dishes)
        )}&drinks=${encodeURIComponent(
          JSON.stringify(order.drinks)
        )}&total=${encodeURIComponent(order.total.toString())}`
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (): number => {
    const dishPricePerPerson = 20;
    const drinkPrice = 8;

    const dishTotal = selectedDishes.reduce(
      (sum: number, dish: SelectedDish) =>
        sum + dish.quantity * dishPricePerPerson,
      0
    );

    const drinksTotal = selectedDrinks.reduce(
      (sum: number, drink: SelectedDrink) => sum + drink.quantity * drinkPrice,
      0
    );

    return dishTotal + drinksTotal;
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleCreateOrder}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Creating Order..." : "Confirm Order"}
      </button>
    </div>
  );
};

export default CreateOrder;
