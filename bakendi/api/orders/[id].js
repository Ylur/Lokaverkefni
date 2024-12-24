// bakendi/api/orders/[id].js
// nota  await connectToDatabase(); uppá serverless cold start
// klárt fyrir serverless

const { body, validationResult } = require("express-validator");
const connectToDatabase = require("../../utils/connectToDatabase");
const {
  getOrderById,
  updateOrder,
  deleteOrderById,
} = require("../../controllers/orderController");
const { cors, runMiddleware } = require("../../utils/cors");
const authenticateToken = require("../../middleware/authenticateToken");
const logger = require("../../utils/logger");

module.exports = async (req, res) => {
  try {
    // 1. CORS
    await runMiddleware(req, res, cors);

    // 2. Token authentication
    await runMiddleware(req, res, authenticateToken);

    const {
      query: { id },
      method,
    } = req;

    if (method === "GET") {
      // GET /api/orders/:id → get one order by ID
      await connectToDatabase();
      await getOrderById(req, res);
    } else if (method === "PUT") {
      // PUT /api/orders/:id → update an existing order
      await Promise.all([
        body("dishes")
          .optional()
          .isArray()
          .withMessage("Dishes must be an array.")
          .run(req),
        body("dishes.*.idMeal")
          .optional()
          .notEmpty()
          .withMessage("Dish ID is required.")
          .run(req),
        body("dishes.*.strMeal")
          .optional()
          .notEmpty()
          .withMessage("Dish name is required.")
          .run(req),
        body("dishes.*.quantity")
          .optional()
          .isInt({ min: 1 })
          .withMessage("Dish quantity must be at least 1.")
          .run(req),
        body("drinks")
          .optional()
          .isArray()
          .withMessage("Drinks must be an array.")
          .run(req),
        body("drinks.*.idDrink")
          .optional()
          .notEmpty()
          .withMessage("Drink ID is required.")
          .run(req),
        body("drinks.*.strDrink")
          .optional()
          .notEmpty()
          .withMessage("Drink name is required.")
          .run(req),
        body("drinks.*.quantity")
          .optional()
          .isInt({ min: 1 })
          .withMessage("Drink quantity must be at least 1.")
          .run(req),
        body("total")
          .optional()
          .isFloat({ gt: 0 })
          .withMessage("Total must be a positive number.")
          .run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      await connectToDatabase();
      await updateOrder(req, res);
    } else if (method === "DELETE") {
      // DELETE /api/orders/:id → remove an order
      await connectToDatabase();
      await deleteOrderById(req, res);
    } else {
      // Method not supported
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    logger.error("Orders [id] Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
