// controllers/orderController.ts (Optional if you want an MVC-ish separation)

// In-memory store or import from a single store
let orders: any[] = [];

// GET all
export function getAllOrders(email?: string) {
  if (email) return orders.filter((o) => o.email === email);
  return orders;
}

// CREATE
export function createOrder(data: any) {
  const newOrder = {
    _id: Date.now().toString(),
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
}

// GET one by ID
export function getOrderById(id: string) {
  return orders.find((o) => o._id === id);
}

// UPDATE
export function updateOrder(id: string, data: any) {
  const index = orders.findIndex((o) => o._id === id);
  if (index === -1) return null;

  orders[index] = { ...orders[index], ...data };
  return orders[index];
}

// DELETE
export function deleteOrderById(id: string) {
  const initialLength = orders.length;
  orders = orders.filter((o) => o._id !== id);
  return orders.length !== initialLength;
}
