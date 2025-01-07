// framendi/src/app/select-drinks/page.tsx

"use client";

import React, { Suspense } from "react";

// Lazy load the SelectDrinks component
const SelectDrinks = React.lazy(() => import("../components/orders/SelectDrinks"));

const SelectDrinksPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Select Drinks Page...</div>}>
      <SelectDrinks />
    </Suspense>
  );
};

export default SelectDrinksPage;
