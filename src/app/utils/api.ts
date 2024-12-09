// api.ts
// Utility functions to interact with the backend expenses API

const API_BASE_URL = "http://localhost:3001/api";

export interface Expense {
  id: number;
  name: string;
  amount: number;
}

export interface NewExpense {
  name: string;
  amount: number;
}

/**
 * Fetch all expenses from the backend
 */
export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

/**
 * Create a new expense on the backend
 * @param expense An object containing the `name` and `amount` of the expense
 */
export async function createExpense(expense: NewExpense): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/create-expense`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to create expense");
  }
  return response.json();
}

/**
 * Delete an existing expense by ID
 * @param id The ID of the expense to delete
 */
export async function deleteExpense(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/expense/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
}
