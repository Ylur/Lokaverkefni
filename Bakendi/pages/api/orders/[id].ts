// bakendi/pages/api/orders/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readOrdersFile, writeOrdersFile } from "../../../utils/files";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  switch (req.method) {
    case "GET":
      return handleGetOrderById(id, res);
    case "PUT":
      return handleUpdateOrder(id, req, res);
    case "DELETE":
      return handleDeleteOrder(id, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}

function handleGetOrderById(id: string, res: NextApiResponse) {
  const orders = readOrdersFile();
  const order = orders.find((o) => o._id === id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  return res.status(200).json({ success: true, order });
}

function handleUpdateOrder(id: string, req: NextApiRequest, res: NextApiResponse) {
  const { dishes, drinks, total, status } = req.body;
  const orders = readOrdersFile();
  const index = orders.findIndex((o) => o._id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  // update only the fields passed
  if (dishes) orders[index].dishes = dishes;
  if (drinks) orders[index].drinks = drinks;
  if (total !== undefined) orders[index].total = total;
  if (status) orders[index].status = status;

  writeOrdersFile(orders);
  return res.status(200).json({ success: true, order: orders[index] });
}

function handleDeleteOrder(id: string, res: NextApiResponse) {
  let orders = readOrdersFile();
  const initialLength = orders.length;
  orders = orders.filter((o) => o._id !== id);

  if (orders.length === initialLength) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  writeOrdersFile(orders);
  return res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
}
