// bakendi/routes/orders.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authenticateToken');

// Protect all order routes
router.use(authenticateToken);

/**
 * @route   GET /api/orders
 * @desc    Get all orders for the authenticated user
 * @access  Private
 */
router.get('/', orderController.getAllOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get a specific order by ID for the authenticated user
 * @access  Private
 */
router.get('/:id', orderController.getOrderById);

/**
 * @route   POST /api/orders
 * @desc    Create a new order for the authenticated user
 * @access  Private
 */
router.post('/', orderController.createOrder);

/**
 * @route   PUT /api/orders/:id
 * @desc    Update an existing order by ID for the authenticated user
 * @access  Private
 */
router.put('/:id', orderController.updateOrder);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order by ID for the authenticated user
 * @access  Private
 */
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;
