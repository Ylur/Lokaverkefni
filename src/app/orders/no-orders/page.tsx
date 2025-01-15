// src/app/no-orders/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NoOrdersPage() {
  const router = useRouter();

  function handleCreateOrder() {
    // Send user to /select-dishes
    router.push("/select-dishes");
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-black/40 max-w-md w-full p-6 rounded shadow text-white">
        <h1 className="text-2xl font-bold mb-4">No Orders Yet</h1>
        <p className="mb-6">You have not placed any orders yet.</p>
        <button
          onClick={handleCreateOrder}
          className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create Your First Order
        </button>
      </div>
    </div>
  );
}
