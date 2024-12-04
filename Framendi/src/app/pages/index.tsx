// pages/index.tsx

import React, { useState, useContext, FormEvent, useCallback } from "react";
import { useRouter } from "next/router";
import TopMenu from "../components/TopMenu";
import CarouselComponent from "../components/CarouselComponent";
import { OrderContext } from "../contexts/OrderContext";
import Image from "next/image";

const HomePage: React.FC = () => {
  const router = useRouter();
  const { setOrderData } = useContext(OrderContext)!;
  const [emailInput, setEmailInput] = useState("");

  const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

  const handleEmailCheck = useCallback(
    async (email: string) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/orders?email=${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
          router.push("/select-drink");
        } else {
          alert("No order found for this email.");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    },
    [router, setOrderData]
  );

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEmailCheck(emailInput);
  };

  return (
    <div>
      <TopMenu />
      <header className="text-center my-8">
        <Image src="/logo.png" alt="Restaurant Logo" width={375} height={360} />
        <h1 className="text-4xl font-bold text-[#3E6053]">
          Welcome Lil Bits
        </h1>
      </header>

      <CarouselComponent images={images} />

      <div className="text-center my-8">
        <button
          onClick={() => router.push("/select-drink")}
          className="bg-[#C16757] text-white px-4 py-2 rounded hover:bg-[#BA2329]"
        >
          Start Order
        </button>
      </div>

      <form onSubmit={handleEmailSubmit} className="text-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="ml-2 bg-[#C16757] text-white px-4 py-2 rounded hover:bg-[#BA2329]"
        >
          Check Order
        </button>
      </form>
    </div>
  );
};

export default HomePage;
