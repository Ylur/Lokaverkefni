// ./

// TODO Athuga með protected route og redirect ef ekki innskráður

"use client";

import React, { useContext } from "react";
import "./globals.css";
import DashboardPage from "./dashboard/page";


import BlogPostNOtLoggedIn from "./components/common/Carousel";

const HomePage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    // Means not verified or there's no user
    return (
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">Please Log In</h2>
        <Login />
        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
            <BlogPostNOtLoggedIn />
          </p>
        </div>
      </section>
    );
  }

  // If user is set, show the "logged in" content
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-6">Featured Dishes</h2>
      <DashboardPage />
    </section>
  );
};

export default HomePage;
