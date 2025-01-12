// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { readOrdersFile, writeOrdersFile } from "../../../../utils/files";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  console.log("GET handler triggered for /api/orders");
  // For debugging: print the file path by calling a function that uses it
  const testPath = (() => {
    const { readOrdersFile } = require("../../../../utils/files");
    return readOrdersFile(); // This will log errors if path is wrong
  })();
  console.log("Test read returns:", testPath);

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") || undefined;
  let orders = readOrdersFile();
  if (email) {
    orders = orders.filter((o) => o.email === email);
  }
  return NextResponse.json({ success: true, orders });
}

export async function POST(request: Request) {
  console.log("POST handler triggered for /api/orders");

  const body = await request.json().catch((err) => {
    console.error("Error parsing request body:", err);
    return null;
  });

  if (!body) {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, dishes, drinks, total, date, time, people } = body;

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 }
    );
  }

  console.log("Using orders file path:", process.env.ORDERS_FILE_PATH);

  const orders = readOrdersFile();
  console.log("Existing orders:", orders);

  const newOrder = {
    _id: uuidv4(),
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

  orders.push(newOrder);
  writeOrdersFile(orders);

  console.log("Order created and saved:", newOrder);

  return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
}
