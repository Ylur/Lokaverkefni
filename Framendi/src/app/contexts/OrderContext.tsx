// contexts/OrderContext.tsx
'use client'

import React, { createContext, useState, ReactNode } from "react";

interface Dish {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  quantity: number;
}

interface OrderData {
  dish: Dish | null;
  drinks: Drink[];
  dateTime: string;
  numberOfPeople: number;
  email: string;
}

interface OrderContextProps {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
);

interface OrderProviderProps {
  children: ReactNode;
}

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
