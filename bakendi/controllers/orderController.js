// bakendi/controllers/orderController.js
// fyrir stærri verkefni bæta pagination við getAllOrders
// klárt fyrir serverless

const Order = require("../models/Order");

/**
 * Fetch all orders for the authenticated user
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userDetails._id });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Internal server error while fetching orders.",
      });
  }
};

/**
 * Fetch a specific order by ID for the authenticated user
 */
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: id, user: req.userDetails._id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: "Order not found." });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Internal server error while fetching the order.",
      });
  }
};

/**
 * Create a new order for the authenticated user
 */
const createOrder = async (req, res) => {
  const { dishes, drinks, total } = req.body;

  // Basic validation
  if (!dishes || !drinks || !total) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Dishes, drinks, and total are required.",
      });
  }

  try {
    const newOrder = new Order({
      user: req.userDetails._id,
      email: req.userDetails.email,
      dishes,
      drinks,
      total,
    });

    await newOrder.save();

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Internal server error while creating the order.",
      });
  }
};

/**
 * Update an existing order by ID for the authenticated user
 */
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { dishes, drinks, total } = req.body;

  try {
    const order = await Order.findOne({ _id: id, user: req.userDetails._id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: "Order not found." });
    }

    // Update fields if provided
    if (dishes) order.dishes = dishes;
    if (drinks) order.drinks = drinks;
    if (total) order.total = total;

    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Internal server error while updating the order.",
      });
  }
};

/**
 * Delete an order by ID for the authenticated user
 */
const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOneAndDelete({
      _id: id,
      user: req.userDetails._id,
    });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: "Order not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Internal server error while deleting the order.",
      });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderById,
};
