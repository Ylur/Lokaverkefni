

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
  
  export interface RegisterResponse extends AuthResponse {}
  export interface LoginResponse extends AuthResponse {}
  export interface APIError extends AuthResponse{}
  