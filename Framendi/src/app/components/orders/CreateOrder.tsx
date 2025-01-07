// src/app/components/orders/CreateOrder.tsx

//TODO - Prod pælingar
//Suggested Adjustments:
// Backend: Ensure a Next.js route at pages/api/orders/index.ts or app/api/orders/route.ts that handles POST to create an order.
// Include user: If I want the order to tie to a specific user, the backend might read the token to find the user’s ID or email. 
// Alternatively, form can also prompt for email.
// Better naming: Instead of item, might store dishes, drinks, etc. Or if it’s a single field, minna bras


"use client";

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const CreateOrder: React.FC = () => {
  const { verifyAuth } = useContext(AuthContext);

  const [form, setForm] = useState({
    item: '',
    quantity: 1,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // 1) Check if user is logged in
    //   If I rely on 'user' in context, I'd check that instead. 
    //   If "verifyAuth" is a function, do: 
    //   const success = await verifyAuth();
    //   if (!success) { ...
    if (!verifyAuth) {
      alert('Please log in first.');
      return;
    }

    // 2) Build the data to match the backend's validation:
    const orderData = {
      dishes: [
        {
          idMeal: `custom-${Date.now()}`,
          strMeal: form.item,
          quantity: Number(form.quantity),
        },
      ],
      drinks: [],
      total: 9.99 * Number(form.quantity), // just a placeholder calculation í bili
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      setMessage('Order created successfully!');
      setForm({ item: '', quantity: 1 });
    } catch (error: any) {
      console.error('Error creating order:', error);
      setMessage(error.message || 'An error occurred while creating the order.');
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Create Order</h2>
      {message && <p className="text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="item" className="block">Item:</label>
          <input
            id="item"
            name="item"
            value={form.item}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="quantity" className="block">Quantity:</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            value={form.quantity}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-accent text-primary px-3 py-1 rounded mt-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
