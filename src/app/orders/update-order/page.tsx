"use client";
// LAGA UI Á DISHES OG DRINKS SVO ÞAÐ SÉ HORIZONTAL LIÍKA
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DishPreview,
  DrinkPreview,
} from "../../components/orders/DishDrinkPreview";
import DishSelectorModal from "../../components/orders/DishSelectorModal";
import DrinkSelectorModal from "../../components/orders/DrinkSelectorModal";

import {
  Order,
  SelectedDish,
  SelectedDrink,
  Meal,
  SelectedMeal,
} from "src/app/types";

export default function UpdateOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateOrder />
    </Suspense>
  );
}

function UpdateOrder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState("");
  const [showDishSelector, setShowDishSelector] = useState(false);
  const [availableDishes, setAvailableDishes] = useState<Meal[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<SelectedMeal[]>([]);

  // States for drinks selection
  const [showDrinkSelector, setShowDrinkSelector] = useState(false);
  const [availableDrinks, setAvailableDrinks] = useState<any[]>([]);
  const [selectedDrinksToAdd, setSelectedDrinksToAdd] = useState<
    SelectedDrink[]
  >([]);

  useEffect(() => {
    if (!id) return;
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Order not found");
        }
        setOrder(data.order);
      } catch (err: any) {
        setMessage(err.message || "Error fetching order");
      }
    }
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!showDishSelector) return;
    async function fetchRandomDishes() {
      const fetched: Meal[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch(
          "https://themealdb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          fetched.push(data.meals[0]);
        }
      }
      setAvailableDishes(fetched);
    }
    fetchRandomDishes();
  }, [showDishSelector]);

  useEffect(() => {
    if (!showDrinkSelector) return;
    async function fetchRandomDrinks() {
      const fetched: any[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.drinks && data.drinks.length > 0) {
          fetched.push(data.drinks[0]);
        }
      }
      setAvailableDrinks(fetched);
    }
    fetchRandomDrinks();
  }, [showDrinkSelector]);

  async function handleUpdate() {
    if (!id || !order) return;
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishes: order.dishes,
          drinks: order.drinks,
          total: order.total,
          status: order.status,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update order");
      }
      alert("Order updated!");
      router.push("/orders/older-orders");
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  }

  function handleChangeDishes(
    index: number,
    field: keyof SelectedDish,
    value: any
  ) {
    if (!order) return;
    const updatedDishes = [...order.dishes];
    updatedDishes[index] = { ...updatedDishes[index], [field]: value };
    setOrder({ ...order, dishes: updatedDishes });
  }

  function handleChangeDrinks(
    index: number,
    field: keyof SelectedDrink,
    value: any
  ) {
    if (!order) return;
    const updatedDrinks = [...order.drinks];
    updatedDrinks[index] = { ...updatedDrinks[index], [field]: value };
    setOrder({ ...order, drinks: updatedDrinks });
  }

  function removeDish(index: number) {
    if (!order) return;
    const updatedDishes = order.dishes.filter(
      (_: any, i: number) => i !== index
    );
    setOrder({ ...order, dishes: updatedDishes });
  }

  function addDishToSelection(dish: Meal) {
    setSelectedDishes((prev) => {
      const exists = prev.find((d) => d.idMeal === dish.idMeal);
      if (exists) {
        return prev.filter((d) => d.idMeal !== dish.idMeal);
      } else {
        return [
          ...prev,
          { idMeal: dish.idMeal, strMeal: dish.strMeal, quantity: 1 },
        ];
      }
    });
  }

  function updateSelectedDishQuantity(dishId: string, quantity: number) {
    setSelectedDishes((prev) =>
      prev.map((d) => (d.idMeal === dishId ? { ...d, quantity } : d))
    );
  }

  function confirmDishSelection() {
    if (!order) return;
    setOrder({ ...order, dishes: [...order.dishes, ...selectedDishes] });
    setShowDishSelector(false);
    setSelectedDishes([]);
  }

  // Drink selection handlers
  function addDrinkToSelection(drink: any) {
    setSelectedDrinksToAdd((prev) => {
      const exists = prev.find((d) => d.idDrink === drink.idDrink);
      if (exists) {
        return prev.filter((d) => d.idDrink !== drink.idDrink);
      } else {
        return [
          ...prev,
          { idDrink: drink.idDrink, strDrink: drink.strDrink, quantity: 1 },
        ];
      }
    });
  }

  function updateSelectedDrinkQuantity(drinkId: string, quantity: number) {
    setSelectedDrinksToAdd((prev) =>
      prev.map((d) => (d.idDrink === drinkId ? { ...d, quantity } : d))
    );
  }

  function confirmDrinkSelection() {
    if (!order) return;
    setOrder({ ...order, drinks: [...order.drinks, ...selectedDrinksToAdd] });
    setShowDrinkSelector(false);
    setSelectedDrinksToAdd([]);
  }

  if (!order) {
    return (
      <div className="w-full max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold">Update Order</h1>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Order #{order.id}</h1>
      {message && <p className="text-red-500 mb-2">{message}</p>}

      <div className="mb-2">
        <label className="block font-semibold">Status: </label>
        <select
          value={order.status}
          onChange={(e) => setOrder({ ...order, status: e.target.value })}
          className="border p-1"
        >
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
        </select>
      </div>

      <div className="mb-2">
        <h2 className="font-semibold">Dishes</h2>
        {order.dishes?.map((dish, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input
              type="text"
              value={dish.strMeal}
              onChange={(e) =>
                handleChangeDishes(idx, "strMeal", e.target.value)
              }
              className="border px-1"
            />
            <input
              type="number"
              min={1}
              value={dish.quantity}
              onChange={(e) =>
                handleChangeDishes(idx, "quantity", Number(e.target.value))
              }
              className="border px-1 w-16"
            />
            <button
              onClick={() => removeDish(idx)}
              className="text-black font-bold ml-2"
            >
              Remove
            </button>
          </div> //TODO SETJA REMOVE Á DRYKKI
        ))}
        <button
          onClick={() => setShowDishSelector(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
        >
          Add Dish
        </button>
      </div>

      <div className="mb-2">
        <h2 className="font-semibold">Drinks</h2>
        {order.drinks?.map((drink, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input
              type="text"
              value={drink.strDrink}
              onChange={(e) =>
                handleChangeDrinks(idx, "strDrink", e.target.value)
              }
              className="border px-1"
            />
            <input
              type="number"
              min={1}
              value={drink.quantity}
              onChange={(e) =>
                handleChangeDrinks(idx, "quantity", Number(e.target.value))
              }
              className="border px-1 w-16"
            />
          </div>
        ))}

        <button
          onClick={() => setShowDrinkSelector(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
        >
          Add Drink
        </button>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mt-4">Your Order Preview:</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex overflow-x-auto space-x-4">
            {order.dishes?.map(
              (dish, idx) =>
                dish.idMeal && (
                  <div key={idx} className="shrink-0">
                    <DishPreview dishId={dish.idMeal} />
                  </div>
                )
            )}
          </div>
          <div className="flex overflow-x-auto space-x-4">
            {order.drinks?.map(
              (drink, idx) =>
                drink.idDrink && (
                  <div key={idx} className="shrink-0">
                    <DrinkPreview drinkId={drink.idDrink} />
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {showDishSelector && (
        <DishSelectorModal
          availableDishes={availableDishes}
          selectedDishes={selectedDishes}
          addDishToSelection={addDishToSelection}
          updateSelectedDishQuantity={updateSelectedDishQuantity}
          setShowDishSelector={setShowDishSelector}
          confirmDishSelection={confirmDishSelection}
        />
      )}

      {showDrinkSelector && (
        <DrinkSelectorModal
          availableDrinks={availableDrinks}
          selectedDrinksToAdd={selectedDrinksToAdd}
          addDrinkToSelection={addDrinkToSelection}
          updateSelectedDrinkQuantity={updateSelectedDrinkQuantity}
          setShowDrinkSelector={setShowDrinkSelector}
          confirmDrinkSelection={confirmDrinkSelection}
        />
      )}

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
}
