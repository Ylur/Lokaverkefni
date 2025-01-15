"use client";

import React, { Suspense } from "react";
import MiniOrderFlow from "../components/common/MiniOrderFlow";

const SelectDrinks = React.lazy(
  () => import("../components/orders/SelectDrinks")
);

export default function SelectDrinksPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <MiniOrderFlow step={2} />
      </div>
      <Suspense
        fallback={
          <div className="text-center text-gray-500">Loading Drinks...</div>
        }
      >
        <SelectDrinks />
      </Suspense>
    </div>
  );
}
