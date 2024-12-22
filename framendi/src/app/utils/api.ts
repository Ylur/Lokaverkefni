// src/app/utils/api.ts

import {
  SelectedDish,
  SelectedDrink,
  Order,
  NewOrder,
  RegisterResponse,
  LoginResponse,
  APIError,
} from "../types";

// Ef locally þá nota þetta.
// const API_BASE_URL = "http://localhost:3001/api";

// nota þetta fyrir prod
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

// =====================
// Authentication Functions
// =====================

/**
 * Register a new user
 * @param username User's username
 * @param email User's email
 * @param password User's password
 * @returns JWT token upon successful registration
 */
export async function register(
  username: string,
  email: string,
  password: string
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to register");
  }

  const data: RegisterResponse = await response.json();

  if (data.success && data.token) {
    return data.token;
  } else {
    throw new Error(data.error || "Registration failed");
  }
}

/**
 * Log in an existing user
 * @param email User's email
 * @param password User's password
 * @returns JWT token upon successful login
 */
export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    // Updated endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to login");
  }

  const data: LoginResponse = await response.json();

  if (data.success && data.token) {
    return data.token;
  } else {
    throw new Error(data.error || "Login failed");
  }
}


// =====================
// Order Management Functions
// =====================

/**
 * Fetch all orders for the authenticated user
 * @param token JWT token for authentication
 * @returns Array of orders
 */
export async function getOrders(token: string): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch orders");
  }

  const data = await response.json();

  if (data.success && Array.isArray(data.orders)) {
    return data.orders;
  } else {
    throw new Error(data.error || "Unexpected response structure");
  }
}

/**
 * Fetch a specific order by ID for the authenticated user
 * @param token JWT token for authentication
 * @param id Order ID
 * @returns The specific order
 */
export async function getOrderById(token: string, id: string): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/order/id/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch the order");
  }

  const data = await response.json();

  if (data.success && data.order) {
    return data.order;
  } else {
    throw new Error(data.error || "Unexpected response structure");
  }
}

/**
 * Create a new order for the authenticated user
 * @param token JWT token for authentication
 * @param orderData Data for the new order
 * @returns The created order
 */
export async function createOrder(
  token: string,
  orderData: NewOrder
): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create order");
  }

  const data = await response.json();

  if (data.success && data.order) {
    return data.order;
  } else {
    throw new Error(data.error || "Unexpected response structure");
  }
}

/**
 * Update an existing order by ID for the authenticated user
 * @param token JWT token for authentication
 * @param id Order ID
 * @param orderData Updated data for the order
 * @returns The updated order
 */
export async function updateOrder(
  token: string,
  id: string,
  orderData: NewOrder
): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/order/id/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update order");
  }

  const data = await response.json();

  if (data.success && data.order) {
    return data.order;
  } else {
    throw new Error(data.error || "Unexpected response structure");
  }
}



/**
 * Delete an order by ID for the authenticated user
 * @param token JWT token for authentication
 * @param id Order ID
 */
export async function deleteOrderById(
  token: string,
  id: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/orders/order/id/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete order");
  }
}


/**
 * Delete all orders associated with a specific email for the authenticated user
 * @param token JWT token for authentication
 * @param email User's email
 */
export async function deleteOrdersByEmail(
  token: string,
  email: string
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/orders/order/email/${encodeURIComponent(email)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete orders by email");
  }
}

export type { LoginResponse, APIError };
export type { Order };
