
"use client";

import React from "react";

interface ReceiptComponentProps {
  finalOrder: any;
  onDone?: () => void; 
}

const ReceiptComponent: React.FC<ReceiptComponentProps> = ({
  finalOrder,
  onDone,
}) => {
  return (
    <div className="bg-primary/10 p-4 rounded shadow space-y-2 max-w-md mx-auto">
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

      {onDone && (
        <div className="mt-4 text-center">
          <button
            onClick={onDone}
            className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceiptComponent;
