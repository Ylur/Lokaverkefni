
import fs from "fs";
import path from "path";

// Use environment variable for file path,
// const ordersFilePath = process.env.ORDERS_FILE_PATH
// ? path.resolve(process.cwd(), process.env.ORDERS_FILE_PATH)
//  : path.join(process.cwd(), 'src', 'data', 'orders.json');

const ordersFilePath = path.join(process.cwd(), "src", "data", "orders.json");
console.log("Using orders file path:", ordersFilePath);

// Function to read the json files that stores orders
export function readOrdersFile(): any[] {
  try {
    const data = fs.readFileSync(ordersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading orders file:", err);
    return [];
  }
}

export function writeOrdersFile(orders: any[]): void {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");
    console.log("Orders successfully saved to", ordersFilePath);
  } catch (err) {
    console.error("Error writing orders file:", err);
  }
}
