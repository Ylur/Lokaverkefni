// src/app/utils/api.ts

import {
  SelectedDish,
  SelectedDrink,
  Order,
  NewOrder,
  RegisterResponse,
  LoginResponse,
} from "../types";

/**
 * The base URL for your backend API.
 * If NEXT_PUBLIC_API_BASE_URL is unset, it defaults to your production backend.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://lokaverkefni-bakendi.vercel.app/api";

/* ===================================
   AUTHENTICATION
   =================================== */

/**
 * Registers a new user. The backend sets an HTTP-only cookie if successful.
 *
 * @param username - The user’s chosen username
 * @param email - The user’s email
 * @param password - The user’s password
 * @returns The raw backend response (e.g., { success: boolean, ... })
 */
export async function register(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include", // Important for sending/receiving cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Registration failed");
  }

  // If your backend returns { success: true, token: "...", ... }
  // you might not need to store the token client-side if you rely on cookies.
  return data;
}

/**
 * Logs in a user by sending credentials to the backend.
 * The backend sets an HTTP-only cookie upon successful authentication.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} - Resolves on successful login, rejects with an error message on failure.
 * @throws {Error} - Throws an error if the login fails.
 */
export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include", // Important for sending and receiving cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Login failed");
  }

  // If the backend also returns a token, you typically don't need it client-side
  // if you're using cookies for auth.
  return data;
}

/**
 * Logs out a user by calling the backend logout endpoint.
 *
 * @returns {Promise<void>} - Resolves on successful logout, rejects with an error message on failure.
 * @throws {Error} - Throws an error if the logout fails.
 */
export async function logout(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include", // Important for sending cookies
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Logout failed");
  }
}

/* ===================================
   ORDER MANAGEMENT
   =================================== */

/**
 * Retrieves all orders associated with the authenticated user.
 * Authentication is handled via HTTP-only cookies.
 *
 * @returns {Promise<Order[]>} - An array of orders.
 * @throws {Error} - Throws an error if fetching orders fails.
 */
export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    credentials: "include", // Important for sending cookies
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to fetch orders.");
  }

  return data.orders as Order[];
}

/**
 * Fetch a specific order by ID for the authenticated user (cookie-based).
 */
export async function getOrderById(id: string): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok || !data.success || !data.order) {
    throw new Error(data.error || "Failed to fetch the order");
  }

  return data.order;
}

/**
 * Create a new order.
 * Authentication is handled via HTTP-only cookies.
 */
export async function createOrder(orderData: NewOrder) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    credentials: "include", // Important for sending cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();
  if (!res.ok) {
    // Handle multiple errors if necessary
    throw new Error(data.error || "Failed to create order");
  }

  return data; // Expected to return the created order
}

/**
 * Update an existing order by ID (cookie-based).
 */
export async function updateOrder(
  id: string,
  orderData: NewOrder
): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();
  if (!res.ok || !data.success || !data.order) {
    throw new Error(data.error || "Failed to update order");
  }

  return data.order;
}

/**
 * Delete an existing order by ID (cookie-based).
 */
export async function deleteOrderById(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete order");
  }
}
console.log("API_BASE_URL:", API_BASE_URL);

export type { Order };

