/* framendi/src/app/components/common/MiniOrderFlow.tsx */
"use client";
import React from "react";

/**
 * Props for MiniOrderFlow
 * - 'step' is the current step (1..4), read-only
 * - No callbacks or buttons included
 */
interface MiniOrderFlowProps {
  step: number; // 1 = dishes, 2 = drinks, 3 = booking, 4 = receipt, etc.
}

export default function MiniOrderFlow({ step }: MiniOrderFlowProps) {
  // Define the step labels without links or functions
  const steps = [
    { label: "Select Dishes", stepNumber: 1 },
    { label: "Select Drinks", stepNumber: 2 },
    { label: "Booking Details", stepNumber: 3 },
    { label: "Receipt", stepNumber: 4 },
  ];

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl font-semibold mb-2">Order Flow Status</h2>
      <ul className="space-y-1">
        {steps.map(({ label, stepNumber }) => (
          <li
            key={stepNumber}
            className={stepNumber === step ? "font-bold" : "opacity-70"}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
