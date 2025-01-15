//app/select-dish/page.tsx
"use client";

import React, { Suspense } from "react";
import MiniOrderFlow from "src/app/components/common/MiniOrderFlow";
// Lazy-loading the actual selection UI
const SelectDishes = React.lazy(() => import("../components/orders/SelectDishes"));

export default function SelectDishesPage() {
  return (
    <div className="container mx-auto p-4">
      <MiniOrderFlow step={1} />
      <Suspense fallback={<div>Loading Dishes...</div>}>
        <SelectDishes />
      </Suspense>
    </div>
  );
}
