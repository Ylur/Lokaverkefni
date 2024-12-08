'use client';

import React, { createContext, useState, ReactNode } from "react";

// Define the structure of a Dish
export interface Dish {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

// Define the structure of a Drink
export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  quantity: number;
}

// Define the structure of the entire order
export interface OrderData {
  dish: Dish | null;
  drinks: Drink[];
  dateTime: string;
  numberOfPeople: number;
  email: string;
}

// Define the context's value type
interface OrderContextProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
}

// Create the context with an initial undefined value
export const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Define the props for the OrderProvider
interface OrderProviderProps {
  children: ReactNode;
}

// Create the OrderProvider component
export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orderData, setOrderData] = useState<OrderData>({
    dish: null,
    drinks: [],
    dateTime: "",
    numberOfPeople: 1,
    email: "",
  });

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
