// bakendi/api/orders.js
//þessi fæll sér um allt order-related routes, creating, updating, fetching, og deleting orders.

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");
const { body } = require("express-validator");

// Protect all order routes
router.use(authenticateToken);

/**
 * @route   GET /api/orders
 * @desc    Get all orders for the authenticated user
 * @access  Private
 */
router.get("/", orderController.getAllOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get a specific order by ID for the authenticated user
 * @access  Private
 */
router.get("/:id", orderController.getOrderById);

/**
 * @route   POST /api/orders
 * @desc    Create a new order for the authenticated user
 * @access  Private
 */
router.post(
  "/",
  [
    body("dishes").isArray().withMessage("Dishes must be an array."),
    body("dishes.*.idMeal").notEmpty().withMessage("Dish ID is required."),
    body("dishes.*.strMeal").notEmpty().withMessage("Dish name is required."),
    body("dishes.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Dish quantity must be at least 1."),
    body("drinks").isArray().withMessage("Drinks must be an array."),
    body("drinks.*.idDrink").notEmpty().withMessage("Drink ID is required."),
    body("drinks.*.strDrink").notEmpty().withMessage("Drink name is required."),
    body("drinks.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Drink quantity must be at least 1."),
    body("total")
      .isFloat({ gt: 0 })
      .withMessage("Total must be a positive number."),
  ],
  orderController.createOrder
);

/**
 * @route   PUT /api/orders/:id
 * @desc    Update an existing order by ID for the authenticated user
 * @access  Private
 */
router.put(
  "/:id",
  [
    body("dishes").optional().isArray().withMessage("Dishes must be an array."),
    body("dishes.*.idMeal")
      .optional()
      .notEmpty()
      .withMessage("Dish ID is required."),
    body("dishes.*.strMeal")
      .optional()
      .notEmpty()
      .withMessage("Dish name is required."),
    body("dishes.*.quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Dish quantity must be at least 1."),
    body("drinks").optional().isArray().withMessage("Drinks must be an array."),
    body("drinks.*.idDrink")
      .optional()
      .notEmpty()
      .withMessage("Drink ID is required."),
    body("drinks.*.strDrink")
      .optional()
      .notEmpty()
      .withMessage("Drink name is required."),
    body("drinks.*.quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Drink quantity must be at least 1."),
    body("total")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Total must be a positive number."),
  ],
  orderController.updateOrder
);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order by ID for the authenticated user
 * @access  Private
 */
router.delete("/:id", orderController.deleteOrderById);

module.exports = router;
