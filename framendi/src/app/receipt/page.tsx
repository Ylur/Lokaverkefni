"use client";

import React, { Suspense } from "react";
import Receipt from "../components/Receipt";

export default function ReceiptPage() {
  return (
    <Suspense>
      <Receipt />
    </Suspense>
  );
}
