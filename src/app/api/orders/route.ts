// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { readOrdersFile, writeOrdersFile } from '../../../../utils/files';

export async function GET(request: Request) {
  console.log("GET handler triggered for /api/orders");  // Debug log for GET
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || undefined;
  let orders = readOrdersFile();
  if (email) {
    orders = orders.filter((o) => o.email === email);
  }
  return NextResponse.json({ success: true, orders });
}

export async function POST(request: Request) {
  console.log("POST handler triggered for /api/orders");  // Debug log for POST
  const body = await request.json();
  const { email, dishes, drinks, total, date, time, people } = body;
  
  if (!email) {
    return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
  }
  
  const orders = readOrdersFile();
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
  
  orders.push(newOrder);
  writeOrdersFile(orders);
  
  console.log("Order created and saved:", newOrder);  // Debug log
  
  return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
}
