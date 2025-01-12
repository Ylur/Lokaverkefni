// src/app/orders/layout.tsx
"use client";

import React from "react";
import MiniOrderFlow from "src/app/components/common/MiniOrderFlow";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <aside className="w-1/4 p-4 bg-gray-100">
        <MiniOrderFlow step={0} />
      </aside>

      <main className="w-3/4 p-4">{children}</main>
    </div>
  );
}
