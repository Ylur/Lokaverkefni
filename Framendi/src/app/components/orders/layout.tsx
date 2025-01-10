// src/app/orders/layout.tsx
"use client";

import React from "react";
import MiniOrderFlow from "../../components/common/MiniOrderFlow";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      {/* Mini flow on the left (or top) for all order-related pages */}
      <aside className="w-1/4 p-4 bg-gray-100">
        {/* If you want to highlight a step dynamically, 
            you can do something more advanced.
            But for now, let's just show step=0 or a read-only state */}
        <MiniOrderFlow step={0} />
      </aside>

      <main className="w-3/4 p-4">{children}</main>
    </div>
  );
}
