// gert til að minnka update-order file
"use client";

import React from "react";
import { SelectedDrink } from "src/app/types";

interface DrinkSelectorModalProps {
  availableDrinks: any[];
  selectedDrinksToAdd: SelectedDrink[];
  addDrinkToSelection: (drink: any) => void;
  updateSelectedDrinkQuantity: (drinkId: string, quantity: number) => void;
  setShowDrinkSelector: (show: boolean) => void;
  confirmDrinkSelection: () => void;
}

const DrinkSelectorModal: React.FC<DrinkSelectorModalProps> = ({
  availableDrinks,
  selectedDrinksToAdd,
  addDrinkToSelection,
  updateSelectedDrinkQuantity,
  setShowDrinkSelector,
  confirmDrinkSelection,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded max-w-lg w-full">
      <h2 className="font-semibold mb-4">Select Additional Drinks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableDrinks.map((drink) => {
          const isSelected = selectedDrinksToAdd.some(
            (d) => d.idDrink === drink.idDrink
          );
          const selectedDrink = selectedDrinksToAdd.find(
            (d) => d.idDrink === drink.idDrink
          );
          return (
            <div key={drink.idDrink} className="p-2 border rounded">
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="w-full h-auto mb-2"
              />
              <h3 className="font-semibold">{drink.strDrink}</h3>
              <button
                onClick={() => addDrinkToSelection(drink)}
                className={`mt-2 px-2 py-1 text-white ${
                  isSelected ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {isSelected ? "Remove" : "Select"}
              </button>
              {isSelected && selectedDrink && (
                <div className="mt-2">
                  <label className="mr-2">Qty:</label>
                  <input
                    type="number"
                    min={1}
                    value={selectedDrink.quantity}
                    onChange={(e) =>
                      updateSelectedDrinkQuantity(
                        drink.idDrink,
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
          onClick={() => setShowDrinkSelector(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={confirmDrinkSelection}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  </div>
);

export default DrinkSelectorModal;
