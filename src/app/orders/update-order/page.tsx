"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DishPreview from "src/app/components/orders/DishPreview";
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

  if (!order) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold">Update Order</h1>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
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
              className="text-red-500 ml-2"
            >
              Remove
            </button>
          </div>
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
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mt-4">Dish Previews:</h2>
        <div className="flex flex-wrap gap-4">
          {order.dishes?.map(
            (dish, idx) =>
              dish.idMeal && <DishPreview key={idx} dishId={dish.idMeal} />
          )}
        </div>
      </div>

      {showDishSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded max-w-lg w-full">
            <h2 className="font-semibold mb-4">Select Additional Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableDishes.map((dish) => {
                const isSelected = selectedDishes.some(
                  (d) => d.idMeal === dish.idMeal
                );
                const selectedDish = selectedDishes.find(
                  (d) => d.idMeal === dish.idMeal
                );
                return (
                  <div key={dish.idMeal} className="p-2 border rounded">
                    <img
                      src={dish.strMealThumb}
                      alt={dish.strMeal}
                      className="w-full h-auto mb-2"
                    />
                    <h3 className="font-semibold">{dish.strMeal}</h3>
                    <button
                      onClick={() => addDishToSelection(dish)}
                      className={`mt-2 px-2 py-1 text-white ${
                        isSelected ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {isSelected ? "Remove" : "Select"}
                    </button>
                    {isSelected && selectedDish && (
                      <div className="mt-2">
                        <label className="mr-2">Qty:</label>
                        <input
                          type="number"
                          min={1}
                          value={selectedDish.quantity}
                          onChange={(e) =>
                            updateSelectedDishQuantity(
                              dish.idMeal,
                              Number(e.target.value)
                            )
                          }
                          className="border px-1 w-16"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDishSelector(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDishSelection}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
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
