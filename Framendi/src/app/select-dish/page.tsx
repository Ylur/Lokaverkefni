"use client";

import React, { Suspense } from "react";

// Lazy load the SelectDrinks component
const SelectDishes = React.lazy(() => import("../components/SelectDishes"));

const SelectDishesPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Select Drinks Page...</div>}>
      <SelectDishes />
    </Suspense>
  );
};

export default SelectDishesPage;
