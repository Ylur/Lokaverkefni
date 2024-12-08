"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "../components/TopMenu";
import { OrderContext, Drink } from "../contexts/OrderContext"; // Correct import
import Image from "next/image";

// Define DrinkAPI interface as received from the API
interface DrinkAPI {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const SelectDrink: React.FC = () => {
  const router = useRouter();
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("SelectDrink must be used within an OrderProvider");
  }

  const { orderData, setOrderData } = context;
  const [drinks, setDrinks] = useState<DrinkAPI[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>(
    orderData.drinks
  ); // Use Drink[] here

  // Fetch drinks from API
  const fetchDrinks = useCallback(async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
      );
      const data = await response.json();
      if (data.drinks) {
        setDrinks(data.drinks.slice(0, 20));
      }
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  // Toggle selection of a drink
  const toggleDrinkSelection = (drink: DrinkAPI) => {
    const exists = selectedDrinks.find((d) => d.idDrink === drink.idDrink);
    if (exists) {
      setSelectedDrinks(
        selectedDrinks.filter((d) => d.idDrink !== drink.idDrink)
      );
    } else {
      // Add the drink with a default quantity of 1
      const newDrink: Drink = { ...drink, quantity: 1 };
      setSelectedDrinks([...selectedDrinks, newDrink]);
    }
  };

  // Update quantity of a selected drink
  const updateQuantity = (id: string, quantity: number) => {
    setSelectedDrinks(
      selectedDrinks.map((drink) =>
        drink.idDrink === id ? { ...drink, quantity } : drink
      )
    );
  };

  const handleNext = () => {
    if (selectedDrinks.length < 1) {
      alert("Please select at least one drink.");
      return;
    }
    setOrderData({ ...orderData, drinks: selectedDrinks });
    router.push("/order");
  };

  return (
    <div>
      <TopMenu />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#3E6053]">
          Select Drinks
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {drinks.map((drink) => {
            const isSelected = selectedDrinks.some(
              (d) => d.idDrink === drink.idDrink
            );
            return (
              <li
                key={drink.idDrink}
                className={`border p-2 rounded ${
                  isSelected ? "border-[#C16757]" : "border-gray-300"
                }`}
              >
                <div
                  onClick={() => toggleDrinkSelection(drink)}
                  className="cursor-pointer"
                >
                  <Image
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-center mt-2">{drink.strDrink}</p>
                  {isSelected && (
                    <span className="block text-center text-[#C16757] font-semibold">
                      ✓ Selected
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div className="mt-2">
                    <label className="block text-sm">
                      Quantity:
                      <input
                        type="number"
                        min="1"
                        value={
                          selectedDrinks.find(
                            (d) => d.idDrink === drink.idDrink
                          )?.quantity || 1
                        }
                        onChange={(e) =>
                          updateQuantity(
                            drink.idDrink,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="border p-1 rounded w-full"
                      />
                    </label>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-4">
          <button
            onClick={handleNext}
            className="bg-[#C16757] text-white px-4 py-2 rounded hover:bg-[#BA2329]"
          >
            Next: Order Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDrink;
