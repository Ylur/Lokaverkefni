// src/app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { readOrdersFile, writeOrdersFile } from "../../../../../utils/files";

/**
 * GET handler for /api/orders/{id}
 * Returns a specific order by ID.
 */
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;
  const orders = readOrdersFile();
  const order = orders.find((o) => o._id === id);
  if (!order) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, order });
}

/**
 * PUT handler for /api/orders/{id}
 * Updates fields of an existing order by ID.
 */
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;
  const body = await request.json();
  const { dishes, drinks, total, status } = body;

  const orders = readOrdersFile();
  const index = orders.findIndex((o) => o._id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }

  // Update only the provided fields
  if (dishes) orders[index].dishes = dishes;
  if (drinks) orders[index].drinks = drinks;
  if (total !== undefined) orders[index].total = total;
  if (status) orders[index].status = status;

  writeOrdersFile(orders);
  return NextResponse.json({ success: true, order: orders[index] });
}

/**
 * DELETE handler for /api/orders/{id}
 * Deletes an order by ID.
 */
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  await DELETE;

  const { id } = params;
  let orders = readOrdersFile();
  const initialLength = orders.length;
  orders = orders.filter((o) => o._id !== id);

  if (orders.length === initialLength) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }

  writeOrdersFile(orders);
  return NextResponse.json({
    success: true,
    message: "Order deleted successfully",
  });
}
