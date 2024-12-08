"use client";

import React, { useContext } from "react";
import TopMenu from "../components/TopMenu";
import { OrderContext } from "../contexts/OrderContext";
import Image from "next/image";

const Receipt: React.FC = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("Receipt page must be used within an OrderProvider");
  }

  const { orderData } = context;

  return (
    <div>
      <TopMenu />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Receipt</h1>

        {/* Display Selected Dish */}
        {orderData.dish && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Dish</h2>
            <div className="flex items-center">
              <Image
                src={orderData.dish.strMealThumb}
                alt={orderData.dish.strMeal}
                width={200}
                height={150}
                className="w-48 h-36 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">
                  {orderData.dish.strMeal}
                </h3>
                <p>{orderData.dish.strInstructions}</p>
              </div>
            </div>
          </section>
        )}

        {/* Display Selected Drinks */}
        {orderData.drinks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Drinks</h2>
            <ul>
              {orderData.drinks.map((drink) => (
                <li key={drink.idDrink} className="flex items-center mb-4">
                  <Image
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    width={100}
                    height={75}
                    className="w-24 h-18 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{drink.strDrink}</h3>
                    <p>Quantity: {drink.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Additional Order Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <p>
            <strong>Date & Time:</strong> {orderData.dateTime}
          </p>
          <p>
            <strong>Number of People:</strong> {orderData.numberOfPeople}
          </p>
          <p>
            <strong>Email:</strong> {orderData.email}
          </p>
        </section>

        {/* Final Submission or Confirmation */}
        <div className="text-center">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            onClick={() => alert("Order placed successfully!")}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
