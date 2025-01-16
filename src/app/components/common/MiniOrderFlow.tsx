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
    { label: "Reviewing", stepNumber: 5 },
  ];

  return (
    <div className="text-white font-bold p-4 border rounded-xl shadow-md w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl bg-primary">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-center">
        Order Status
      </h2>
      <ul className="space-y-2 text-center">
        {steps.map(({ label, stepNumber }) => (
          <li
            key={stepNumber}
            className={`${
              stepNumber === step ? "font-bold " : "opacity-60"
            } text-sm md:text-base lg:text-lg`}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
