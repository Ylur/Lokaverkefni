"use client";

import React from "react";
import MiniOrderFlow from "src/app/components/common/MiniOrderFlow";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <aside
        className="w-full md:w-1/4 p-4 bg-orange"
        aria-label="Order Steps Navigation"
      >
        <MiniOrderFlow step={0} />
      </aside>

      <main className="w-full md:w-3/4 p-4">{children}</main>
    </div>
  );
}
