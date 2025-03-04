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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-primary p-4 rounded max-w-lg w-full mx-4 sm:mx-0">
      {/* Centered heading */}
      <h2 className="text-center font-serif font-semibold mb-4 text-white">
        Select Additional Drinks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableDrinks.map((drink) => {
          const isSelected = selectedDrinksToAdd.some(
            (d) => d.idDrink === drink.idDrink
          );
          const selectedDrink = selectedDrinksToAdd.find(
            (d) => d.idDrink === drink.idDrink
          );

          return (
            <div
              key={drink.idDrink}
              className="
                p-2 border rounded
                flex flex-col justify-between
                min-h-[300px]
              "
            >
              {/* Top: Image + Name */}
              <div>
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-auto mb-2"
                />
                <h3 className="font-serif font-semibold">{drink.strDrink}</h3>
              </div>

              {/* Bottom: Select/Remove button + Quantity */}
              <div className="mt-2">
                <button
                  onClick={() => addDrinkToSelection(drink)}
                  className={`
                    px-2 py-1 text-white border rounded
                    ${
                      isSelected
                        ? "bg-accent hover:bg-red-700"
                        : "bg-primary hover:bg-green-700"
                    }
                  `}
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
                      className="border px-1 w-16 text-primary"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Centered bottom buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setShowDrinkSelector(false)}
          className="px-4 py-2 bg-accent hover:bg-red-700 rounded text-white font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={confirmDrinkSelection}
          className="px-4 py-2 bg-primary hover:bg-green-700 border rounded text-white font-semibold"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  </div>
);

export default DrinkSelectorModal;
