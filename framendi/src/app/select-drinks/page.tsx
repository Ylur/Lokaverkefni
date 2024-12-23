"use client";

import React, { Suspense } from "react";

// Lazy load the SelectDrinks component
const SelectDrinks = React.lazy(() => import("../components/SelectDrinks"));

const SelectDrinksPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Select Drinks Page...</div>}>
      <SelectDrinks />
    </Suspense>
  );
};

export default SelectDrinksPage;
