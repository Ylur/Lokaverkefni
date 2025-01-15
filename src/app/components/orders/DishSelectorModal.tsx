// gert til að minnka update-order file
"use client";

import React from "react";
import { Meal, SelectedMeal } from "src/app/types";

interface DishSelectorModalProps {
  availableDishes: Meal[];
  selectedDishes: SelectedMeal[];
  addDishToSelection: (dish: Meal) => void;
  updateSelectedDishQuantity: (dishId: string, quantity: number) => void;
  setShowDishSelector: (show: boolean) => void;
  confirmDishSelection: () => void;
}

const DishSelectorModal: React.FC<DishSelectorModalProps> = ({
  availableDishes,
  selectedDishes,
  addDishToSelection,
  updateSelectedDishQuantity,
  setShowDishSelector,
  confirmDishSelection,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-primary p-4 rounded max-w-lg w-full">
      <h2 className="font-semibold mb-4 text-white">
        Select Additional Dishes
      </h2>
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
                  isSelected
                    ? "bg-accent hover:bg-red-700"
                    : "bg-primary hover:bg-green-700"
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
                    className="border px-1 w-16 text-primary"
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
          className="px-4 py-2 bg-accent hover:bg-red-700 rounded"
        >
          Cancel
        </button>
        <button
          onClick={confirmDishSelection}
          className="px-4 py-2 bg-primary hover:bg-green-700 rounded"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  </div>
);

export default DishSelectorModal;
