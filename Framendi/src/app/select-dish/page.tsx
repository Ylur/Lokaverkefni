"use client";

import React, { Suspense } from "react";
import MiniOrderFlow from "../components/common/MiniOrderFlow";
// Lazy-load the actual selection UI
const SelectDishes = React.lazy(() => import("../components/orders/SelectDishes"));

export default function SelectDishesPage() {
  return (
    <div className="container mx-auto p-4">
      {/* Step = 1 => "Select Dishes" */}
      <MiniOrderFlow step={1} />
      <Suspense fallback={<div>Loading Dishes...</div>}>
        <SelectDishes />
      </Suspense>
    </div>
  );
}
