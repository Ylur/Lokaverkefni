// bakendi/utils/files.ts

import fs from "fs";
import path from "path";

const ordersFilePath = path.join(process.cwd(), "orders.json");

/**
 * Reads orders from `orders.json`. Returns an array of orders.
 * If the file doesn't exist or is malformed, returns [].
 */
export function readOrdersFile(): any[] {
  try {
    const data = fs.readFileSync(ordersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading orders file:", err);
    return [];
  }
}

/**
 * Writes the given array of orders to `orders.json`.
 */
export function writeOrdersFile(orders: any[]): void {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing orders file:", err);
  }
}
