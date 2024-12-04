// pages/index.tsx

import React, {
  useState,
  useEffect,
  useContext,
  FormEvent,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import TopMenu from "../components/TopMenu";
import CarouselComponent from "../components/CarouselComponent";
import { OrderContext } from "../contexts/OrderContext";

const HomePage: React.FC = () => {
  const router = useRouter();
  const { setOrderData } = useContext(OrderContext)!;
  const [emailInput, setEmailInput] = useState("");

  // Images for the carousel
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
          router.push("/select-dish");
        } else {
          alert("No order found for this email.");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    },
    [router, setOrderData]
  );

  // Check if email is provided in the URL slug
  useEffect(() => {
    const { email } = router.query;
    if (email && typeof email === "string") {
      handleEmailCheck(email);
    }
  }, [router.query, handleEmailCheck]);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEmailCheck(emailInput);
  };

  return (
    <div>
      <TopMenu />
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">Restaurant Logo</h1>
      </header>

      <CarouselComponent images={images} />

      <div className="text-center my-8">
        <button
          onClick={() => router.push("/select-dish")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Check Order
        </button>
      </form>
    </div>
  );
};

export default HomePage;
