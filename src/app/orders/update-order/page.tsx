"use client";

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

  // For drinks selection
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

  // Fetch random dishes only when dishSelector is open
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

  // Fetch random drinks only when drinkSelector is open
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


  function recalcTotal() {
    if (!order) return 0;
    let total = 0;
    for (const d of order.dishes) {
      total += (d.quantity || 1) * 10;
    }
    for (const dr of order.drinks) {
      total += (dr.quantity || 1) * 5;
    }
    return total;
  }

  async function handleUpdate() {
    if (!id || !order) return;
    // Optional: recalc total here or do it on backend dno whats better
    const newTotal = recalcTotal();

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishes: order.dishes,
          drinks: order.drinks,
          total: newTotal,
          status: order.status,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update order");
      }
      // Show an inline success message
      setMessage("Order updated successfully!");
      // Optionally navigate away after a delay
      setTimeout(() => router.push("/orders/older-orders"), 1500);
    } catch (err: any) {
      setMessage(err.message || "Update failed");
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
    // Confirm removing?
    const confirmDelete = confirm("Are you sure you want to remove this dish?");
    if (!confirmDelete) return;
    const updatedDishes = order.dishes.filter((_item, i) => i !== index);
    setOrder({ ...order, dishes: updatedDishes });
  }

  function removeDrink(index: number) {
    if (!order) return;
    // Confirm removing?
    const confirmDelete = confirm(
      "Are you sure you want to remove this drink?"
    );
    if (!confirmDelete) return;
    const updatedDrinks = order.drinks.filter((_item, i) => i !== index);
    setOrder({ ...order, drinks: updatedDrinks });
  }

  // ----- Dishes
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

  // ----- Drinks
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

  // If no order yet, show loading or error
  if (!order) {
    return (
      <div className="w-full max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold">Update Order</h1>
        {message && <p className="text-red-500">{message}</p>}
        <p>Loading order or ID missing...</p>
      </div>
    );
  }

  // --- Rendered UI ---
  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 space-y-4 text-white font-bold">
      <h1 className="text-2xl font-bold mb-2">Update Order {order.id}</h1>

      {message && (
        <p className="p-2 bg-primary text-secondary rounded">{message}</p>
      )}

      {/* Status Section */}
      <div className="p-3 border rounded mb-2 bg-opacity-10">
        <div className="text-center">
          <button
            onClick={handleUpdate}
            className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>

      <hr />

      {/* Dishes Section */}
      <div className="p-3 border rounded">
        <h2 className="text-lg font-semibold mb-2">Dishes</h2>
        {order.dishes?.map((dish, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={dish.strMeal}
              onChange={(e) =>
                handleChangeDishes(idx, "strMeal", e.target.value)
              }
              className="border px-1 text-primary"
            />
            <input
              type="number"
              min={1}
              value={dish.quantity}
              onChange={(e) =>
                handleChangeDishes(idx, "quantity", Number(e.target.value))
              }
              className="border px-1 w-16 text-primary"
            />
            <button
              onClick={() => removeDish(idx)}
              className="bg-accent hover:bg-red-700 text-white px-2 py-1 border rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => setShowDishSelector(true)}
          className="bg-primary hover:bg-green-700 text-white px-3 py-1 rounded mt-2"
        >
          + Add Dish
        </button>
      </div>

      <hr />

      {/* Drinks Section */}
      <div className="p-3 border rounded">
        <h2 className="text-lg font-semibold mb-2">Drinks</h2>
        {order.drinks?.map((drink, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={drink.strDrink}
              onChange={(e) =>
                handleChangeDrinks(idx, "strDrink", e.target.value)
              }
              className="border px-1 text-primary"
            />
            <input
              type="number"
              min={1}
              value={drink.quantity}
              onChange={(e) =>
                handleChangeDrinks(idx, "quantity", Number(e.target.value))
              }
              className="border px-1 w-16 text-primary"
            />
            <button
              onClick={() => removeDrink(idx)}
              className="border rounded hover:bg-red-700 text-white px-2 py-1"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => setShowDrinkSelector(true)}
          className="bg-primary hover:bg-green-700 text-white px-3 py-1 rounded mt-2"
        >
          + Add Drink
        </button>
      </div>

      <hr />

      {/* Preview Section */}
      <div className="p-3 border rounded">
        <h2 className="text-lg font-semibold mb-2">Preview of order</h2>
        <p className="font-medium">
          Estimated Total:{" "}
          <span className="text-primary font-bold">${recalcTotal()}</span>
        </p>

        <div className="flex flex-col space-y-4 mt-2">
          {/* Horizontal scroller for dishes */}
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
          {/* Horizontal scroller for drinks */}
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

      {/* Dish Selector Modal */}
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

      {/* Drink Selector Modal */}
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
    </div>
  );
}
