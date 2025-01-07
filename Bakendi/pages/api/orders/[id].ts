// pages/api/orders/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { orders } from "../../../utils/orderStore";

// If using JSON:
// import { readJsonFile, writeJsonFile } from "../../../utils/files";
// let orders = readJsonFile("orders.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ success: false, error: "Invalid order ID" });
  }

  switch (req.method) {
    case "GET":
      return handleGetOrderById(id, res);
    case "PUT":
      return handleUpdateOrderById(id, req, res);
    case "DELETE":
      return handleDeleteOrderById(id, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}

function handleGetOrderById(id: string, res: NextApiResponse) {
  const order = orders.find((o) => o._id === id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  return res.status(200).json({ success: true, order });
}

function handleUpdateOrderById(id: string, req: NextApiRequest, res: NextApiResponse) {
  const { dishes, drinks, total, status } = req.body;
  const index = orders.findIndex((o) => o._id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  // Update only the fields that were provided
  if (dishes) orders[index].dishes = dishes;
  if (drinks) orders[index].drinks = drinks;
  if (total) orders[index].total = total;
  if (status) orders[index].status = status;

  // If using JSON:
  // writeJsonFile("orders.json", orders);

  return res.status(200).json({ success: true, order: orders[index] });
}

function handleDeleteOrderById(id: string, res: NextApiResponse) {
  const initialLength = orders.length;
  orders = orders.filter((o) => o._id !== id);

  if (orders.length === initialLength) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  // If using JSON:
  // writeJsonFile("orders.json", orders);

  return res
    .status(200)
    .json({ success: true, message: "Order deleted successfully." });
}
