// server.ts

import express from 'express';
import cors from 'cors';
import { Router } from 'express';

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
  })
);
app.use(express.json());

// Interfaces
interface OrderData {
  dish: any;
  drinks: any[];
  dateTime: string;
  numberOfPeople: number;
  email: string;
}

// In-memory data store for orders
let orders: OrderData[] = [];

// GET: Fetch order by email
app.get('/api/orders', (req, res) => {
  const email = req.query.email as string;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  const order = orders.find((o) => o.email === email);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found.' });
  }
});

// POST: Save or update an order
app.post('/api/orders', (req, res) => {
  const order: OrderData = req.body;
  if (!order.email) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  // Remove existing order with same email
  orders = orders.filter((o) => o.email !== order.email);
  orders.push(order);
  res.status(201).json(order);
});

// Existing endpoints...

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
