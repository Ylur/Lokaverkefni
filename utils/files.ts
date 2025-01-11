//Users/ingiharalds/Next/LV MRepo/utils/files.ts
import fs from "fs";
import path from "path";

// Update the path to point to the data directory
const ordersFilePath = path.join(process.cwd(), "src", "data", "orders.json");

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
