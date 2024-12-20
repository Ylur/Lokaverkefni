// bakendi/types.js

/**
 * @typedef {Object} Provision
 * @property {string} id - Unique identifier.
 * @property {string} name - Name of the provision.
 * @property {string} description - Description of the provision.
 * @property {string} imageSource - URL to the image of the provision.
 * @property {number} price - Price of the provision.
 * @property {string} category - Category of the provision.
 */

/**
 * @typedef {Provision} Dish
 * @property {string} cousine - Type of cuisine.
 */

/**
 * @typedef {Provision} Drink
 * @property {string} brewer - Brewer of the drink.
 */

/**
 * @typedef {Object} Order
 * @property {number} id - Unique identifier for the order.
 * @property {string} email - Email of the user who placed the order.
 * @property {Dish} dish - The dish ordered.
 * @property {Drink[]} drinks - Array of drinks ordered.
 * @property {number} count - Quantity of the order.
 * @property {Date} date - Date when the order was placed.
 */
