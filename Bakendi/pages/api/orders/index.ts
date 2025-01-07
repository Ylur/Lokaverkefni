// pages/api/orders/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { orders } from "../../../utils/orderStore";


// If you still want to read/write a JSON file, you can use these helpers (optional)
// import { readJsonFile, writeJsonFile } from "../../../utils/files"; 
// let orders = readJsonFile("orders.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handleGetAllOrders(req, res);
    case "POST":
      return handleCreateOrder(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}

function handleGetAllOrders(req: NextApiRequest, res: NextApiResponse) {
  // Optional: Filter by email if ?email=...
  const email = req.query.email as string | undefined;

  const filteredOrders = email
    ? orders.filter((o) => o.email === email)
    : orders;

  return res.status(200).json({ success: true, orders: filteredOrders });
}

function handleCreateOrder(req: NextApiRequest, res: NextApiResponse) {
  // A minimal approach: no advanced validation, just check required fields
  const { email, dishes, drinks, total, date, time, people } = req.body;

  // Basic checks
  if (!email || !date || !time || !people) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: email, date, time, people",
    });
  }
  if ((!dishes || dishes.length === 0) && (!drinks || drinks.length === 0)) {
    return res.status(400).json({
      success: false,
      error: "No items in the order",
    });
  }

  // Create an order object
  const newOrder = {
    _id: Date.now().toString(), // or use a small library like uuid
    email,
    dishes,
    drinks,
    total,
    date,
    time,
    people,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  // If using JSON file:
  // orders = readJsonFile("orders.json");
  // orders.push(newOrder);
  // writeJsonFile("orders.json", orders);

  return res.status(201).json({ success: true, order: newOrder });
}
