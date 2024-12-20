// src/app/dashboard/page.tsx

"use client";

import React from "react";
import ProtectedRoute from "../protected/ProtectedRoute";
import OrdersList from "../components/OrdersList"; // Component to display user orders, ef þú ert loggaður inn
import CreateOrder from "../components/CreateOrder"; // Component to create a new order, ef þú ert loggaður inn

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        
        {/* Create Order Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create a New Order</h2>
          <CreateOrder />
        </section>
        
        {/* Orders List Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          <OrdersList />
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
