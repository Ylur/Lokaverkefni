// app/components/common/MiniOrderFlow.tsx
"use client";

import React from "react";

/** Only displays the current step # in a simple wizard-like list. */
interface MiniOrderFlowProps {
  step: number; // 1..4, or 0 if we’re not in a step
}

export default function MiniOrderFlow({ step }: MiniOrderFlowProps) {
  const steps = [
    { label: "Select Dishes", stepNumber: 1 },
    { label: "Select Drinks", stepNumber: 2 },
    { label: "Booking", stepNumber: 3 },
    { label: "Receipt", stepNumber: 4 },
  ];

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-3">Order Flow</h2>
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
