// src/app/receipt/page.tsx

"use client";

import React, { Suspense } from "react";
import Receipt from "../components/Receipt";

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div>Loading Receipt...</div>}>
      <Receipt />
    </Suspense>
  );
}
