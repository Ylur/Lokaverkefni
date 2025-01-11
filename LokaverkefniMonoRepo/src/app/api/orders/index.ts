// bakendi/pages/api/orders/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readOrdersFile, writeOrdersFile } from "../../../../utils/files";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handleGetOrders(req, res);
    case "POST":
      return handleCreateOrder(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
  }
}

function handleGetOrders(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email as string | undefined;
  let orders = readOrdersFile(); // read from JSON

  // If `?email=` is provided, filter
  if (email) {
    orders = orders.filter((o) => o.email === email);
  }

  return res.status(200).json({ success: true, orders });
}

function handleCreateOrder(req: NextApiRequest, res: NextApiResponse) {
  const { email, dishes, drinks, total, date, time, people } = req.body;

  // Basic checks
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  // read current orders
  const orders = readOrdersFile();

  // build new order
  const newOrder = {
    _id: Date.now().toString(),
    email,
    dishes: dishes || [],
    drinks: drinks || [],
    total: total || 0,
    date: date || null,
    time: time || null,
    people: people || 1,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  // add to array, then write back to file
  orders.push(newOrder);
  writeOrdersFile(orders);

  return res.status(201).json({ success: true, order: newOrder });
}
