"use client";

import React, { Suspense } from "react";
import MiniOrderFlow from "../components/common/MiniOrderFlow";
// Lazy-load the actual selection UI
const SelectDrinks = React.lazy(() => import("../components/orders/SelectDrinks"));

export default function SelectDrinksPage() {
  return (
    <div className="container mx-auto p-4">
      {/* Step = 2 => "Select Drinks" */}
      <MiniOrderFlow step={2} />
      <Suspense fallback={<div>Loading Drinks...</div>}>
        <SelectDrinks />
      </Suspense>
    </div>
  );
}
