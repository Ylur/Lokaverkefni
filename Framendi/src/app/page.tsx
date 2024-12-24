// src/app/components/HomePage.tsx

"use client";

import React, { useContext } from "react";
import DishPreview from "./components/DishPreview"; 
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Link from "next/link";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: 'url("/photos/lb.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Welcome to LiL Bits</h1>
            <p className="mt-4 text-lg">Where LiL Food Meets LiL Company.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {!isAuthenticated ? (
          // If user is not authenticated, show the Login component
          <section>
            <h2 className="text-3xl font-bold text-center mb-6">
              Please Log In
            </h2>
            <Login />
            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </section>
        ) : (
          // If user is authenticated, show the main content
          <section>
            <h2 className="text-3xl font-bold text-center mb-6">
              Our Popular Dishes
            </h2>
            <DishPreview />
            <div className="text-center mt-8">
              <Link
                href="/menu"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Full Menu
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default HomePage;
