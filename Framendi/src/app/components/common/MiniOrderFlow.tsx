"use client";

import React, { useState } from "react";

/*
  This component might track or display the user's order flow status:
  e.g. Step 1: Dishes -> Step 2: Drinks -> Step 3: Confirmation
*/
export default function MiniOrderFlow() {
  const [step, setStep] = useState(1);

  // You could add buttons to move to next step
  function nextStep() {
    if (step < 3) setStep(step + 1);
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Order Flow Status</h2>
      <p>Current Step: {step}</p>
      <ul className="list-disc ml-5 mt-2">
        <li className={step >= 1 ? "font-bold" : ""}>Select Dishes</li>
        <li className={step >= 2 ? "font-bold" : ""}>Select Drinks</li>
        <li className={step >= 3 ? "font-bold" : ""}>Create Order</li>
      </ul>

      <button
        onClick={nextStep}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Next Step
      </button>
    </div>
  );
}
