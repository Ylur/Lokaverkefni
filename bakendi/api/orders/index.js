// bakendi/api/orders/index.js

const { body, validationResult } = require("express-validator");
const connectToDatabase = require("../../utils/connectToDatabase");
const { getAllOrders, createOrder } = require("../../controllers/orderController");
const { cors, runMiddleware } = require("../../utils/cors");
const authenticateToken = require("../../middleware/authenticateToken");
const logger = require("../../utils/logger");

module.exports = async (req, res) => {
  try {
    // 1. Apply CORS
    await runMiddleware(req, res, cors);

    // 2. Apply token authentication
    await runMiddleware(req, res, authenticateToken);

    // 3. Handle the HTTP method
    if (req.method === "GET") {
      // GET /api/orders → Fetch all orders
      await connectToDatabase();
      await getAllOrders(req, res);
    } else if (req.method === "POST") {
      // POST /api/orders → Create a new order
      await Promise.all([
        body("dishes").isArray().withMessage("Dishes must be an array.").run(req),
        body("dishes.*.idMeal").notEmpty().withMessage("Dish ID is required.").run(req),
        body("dishes.*.strMeal").notEmpty().withMessage("Dish name is required.").run(req),
        body("dishes.*.quantity")
          .isInt({ min: 1 })
          .withMessage("Dish quantity must be at least 1.")
          .run(req),
        body("drinks").isArray().withMessage("Drinks must be an array.").run(req),
        body("drinks.*.idDrink").notEmpty().withMessage("Drink ID is required.").run(req),
        body("drinks.*.strDrink").notEmpty().withMessage("Drink name is required.").run(req),
        body("drinks.*.quantity")
          .isInt({ min: 1 })
          .withMessage("Drink quantity must be at least 1.")
          .run(req),
        body("total")
          .isFloat({ gt: 0 })
          .withMessage("Total must be a positive number.")
          .run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      // Connect to DB + create order
      await connectToDatabase();
      await createOrder(req, res);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    logger.error("Orders Index Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
