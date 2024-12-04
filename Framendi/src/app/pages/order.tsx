// pages/order.tsx

import React, { useState, useContext, FormEvent } from "react";
import { useRouter } from "next/router";
import TopMenu from "../components/TopMenu";
import { OrderContext } from "../contexts/OrderContext";

const OrderScreen: React.FC = () => {
  const router = useRouter();
  const { orderData, setOrderData } = useContext(OrderContext)!;
  const [dateTime, setDateTime] = useState(orderData.dateTime);
  const [numberOfPeople, setNumberOfPeople] = useState(
    orderData.numberOfPeople
  );
  const [email, setEmail] = useState(orderData.email);

  const validateDateTime = () => {
    const selectedDate = new Date(dateTime);
    const now = new Date();

    if (selectedDate < now) {
      alert("Please select a future date and time.");
      return false;
    }

    const day = selectedDate.getDay(); // 0 (Sun) to 6 (Sat)
    const hour = selectedDate.getHours();

    if (day === 0 || day === 6) {
      alert("Please select a date between Monday and Friday.");
      return false;
    }

    if (hour < 16 || hour > 23) {
      alert("Please select a time between 16:00 and 23:00.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateDateTime()) return;

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (numberOfPeople < 1 || numberOfPeople > 10) {
      alert("Please select between 1 and 10 people.");
      return;
    }

    setOrderData({ ...orderData, dateTime, numberOfPeople, email });
    router.push("/receipt");
  };

  return (
    <div>
      <TopMenu />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#3E6053]">Order Screen</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">
              Date and Time:
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Number of People:
              <input
                type="number"
                min="1"
                max="10"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                required
                className="border p-2 rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Email Address:
              <input
                type="email"
                pattern="\S+@\S+\.\S+"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#C16757] text-white px-4 py-2 rounded hover:bg-[#BA2329]"
          >
            {orderData.email ? "Update Order" : "Complete Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderScreen;
