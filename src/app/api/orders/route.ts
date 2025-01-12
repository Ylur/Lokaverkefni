// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { readOrdersFile, writeOrdersFile } from '../../../../utils/files';

export async function POST(request: Request) {
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
