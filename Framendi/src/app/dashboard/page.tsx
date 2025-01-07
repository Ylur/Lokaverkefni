// src/app/dashboard/page.tsx

//Semsagt ef `user === null`, we show your existing `Login` component. 
//If `user !== null`, we show **both** the `CreateOrder` form and the `OrdersList` on the same page.

// framendi/src/app/dashboard/page.tsx
// src/app/dashboard/page.tsx

"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import OrdersList from "../components/orders/OrdersList";
import BlogPostLoggedIn from "../components/common/Carousel";
import Login from "../components/auth/Login"; 
import ResetPassword from "../components/auth/resetPassword";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  // If user is not logged in, display the Login component.
  if (user === null) {
    return <Login />;
  }

  // If user is logged in, display the dashboard contents.
  return (
    <div className="flex align-self mt-8 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-wrap gap-4">

        <div className="flex-1 bg-primary p-1 rounded shadow">
          <OrdersList />
        </div>
        <div className="flex-1 bg-primary p-4 rounded shadow flex items-center justify-center">
          <Link
            href="/select-dish"
            className="bg-blue-500 text-white px-4 rounded"
          >
            Create an Order
          </Link>
        </div>
        <div className="flex-1 bg-primary p-1 rounded shadow">
          <ResetPassword />
        </div>
        <div className="flex-4 bg-primary p-4 rounded shadow">
          <BlogPostLoggedIn />
        </div>
      </div>
    </div>
  );
}
