// src/app/components/orders/ReceiptComponent.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ReceiptComponentProps {
  finalOrder: any;
}

const ReceiptComponent: React.FC<ReceiptComponentProps> = ({ finalOrder }) => {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Receipt</h1>
      <p>
        <strong>Email:</strong> {finalOrder.email}
      </p>
      <p>
        <strong>Date:</strong> {finalOrder.date}
      </p>
      <p>
        <strong>Time:</strong> {finalOrder.time}
      </p>
      <p>
        <strong>People:</strong> {finalOrder.people}
      </p>

      <h2 className="text-xl font-semibold mt-4">Dishes:</h2>
      {finalOrder.dishes?.map((dish: any, i: number) => (
        <p key={i}>
          {dish.strMeal} (x{dish.quantity})
        </p>
      ))}

      <h2 className="text-xl font-semibold mt-4">Drinks:</h2>
      {finalOrder.drinks?.map((drink: any, i: number) => (
        <p key={i}>
          {drink.strDrink} (x{drink.quantity})
        </p>
      ))}

      <p className="mt-2 font-bold">Total: ${finalOrder.total?.toFixed(2)}</p>

      <div className="mt-4 text-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ReceiptComponent;
