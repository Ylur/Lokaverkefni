// app/components/common/MiniOrderFlow.tsx
"use client";

import React from "react";

/* Displays the current step */
interface MiniOrderFlowProps {
  step: number;
}

export default function MiniOrderFlow({ step }: MiniOrderFlowProps) {
  const steps = [
    { label: "Not started", stepNumber: 0 },
    { label: "Select Dishes", stepNumber: 1 },
    { label: "Select Drinks", stepNumber: 2 },
    { label: "Booking", stepNumber: 3 },
    { label: "Receipt", stepNumber: 4 },
  ];

  return (
    <div className="p-4 border rounded-full">
      <h2 className="text-2xl font-semibold mb-3">Order status</h2>
      <ul className="space-y-1">
        {steps.map(({ label, stepNumber }) => (
          <li
            key={stepNumber}
            className={stepNumber === step ? "font-bold" : "opacity-60"}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
