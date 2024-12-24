// bakendi/types.js

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} username - Username of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Hashed password of the user.
 * @property {string} [resetPasswordToken] - Token for password reset.
 * @property {Date} [resetPasswordExpires] - Expiration time for reset token.
 */

/**
 * @typedef {Object} SelectedDish
 * @property {string} idMeal - Unique identifier for the dish.
 * @property {string} strMeal - Name of the dish.
 * @property {number} quantity - Quantity ordered.
 */

/**
 * @typedef {Object} SelectedDrink
 * @property {string} idDrink - Unique identifier for the drink.
 * @property {string} strDrink - Name of the drink.
 * @property {number} quantity - Quantity ordered.
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique identifier for the order.
 * @property {string} user - User ID who placed the order.
 * @property {string} email - Email of the user.
 * @property {Date} date - Date when the order was placed.
 * @property {SelectedDish[]} dishes - Array of dishes ordered.
 * @property {SelectedDrink[]} drinks - Array of drinks ordered.
 * @property {number} total - Total amount of the order.
 */
