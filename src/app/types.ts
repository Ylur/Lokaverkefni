// src/app/types.ts
/**
 * Represents a selected dish in an order.
 */
export interface SelectedDish {
  idMeal: string;
  strMeal: string;
  quantity: number;
}

/**
 * Represents a selected drink in an order.
 */
export interface SelectedDrink {
  idDrink: string;
  strDrink: string;
  quantity: number;
}

/**
 * Represents an order placed by a user.
 */
export interface Order {
  id: string;
  email: string;
  date: string;
  dishes: SelectedDish[];
  drinks: SelectedDrink[];
  total: number;
  status: string; // Added status property
}

/**
 * Represents the data required to create a new order.
 */
export interface NewOrder {
  email: string;
  dishes: SelectedDish[];
  drinks: SelectedDrink[];
  date: string;
  total: number;
}

/**
 * Authentication Responses
 */
export interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * Represents a response from the register API.
 */
export interface RegisterResponse extends AuthResponse {
  welcomeMessage?: string; // Example: Add specific properties for RegisterResponse
}

/**
 * Represents a response from the login API.
 */
export interface LoginResponse extends AuthResponse {
  lastLoginTime?: string; // Example: Add specific properties for LoginResponse
}

/**
 * Represents an error response from the API.
 */
export interface APIError extends AuthResponse {
  statusCode?: number; // HTTP status code
  debugInfo?: string; // Debugging information
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface SelectedMeal {
  idMeal: string;
  strMeal: string;
  quantity: number;
}
