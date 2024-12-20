// bakendi/routes/orders.js

const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const generateUUID = require('../utils/uuidGenerator');

const router = express.Router();

// In-memory order store
const orders = [];
let nextOrderId = 1;

/**
 * @route   GET /api/orders
 * @desc    Get all orders for the authenticated user
 * @access  Protected
 */
router.get('/', authenticateToken, (req, res) => {
    const userEmail = req.user.email;
    const userOrders = orders.filter(order => order.email === userEmail);
    return res.status(200).json({ success: true, orders: userOrders });
});

/**
 * @route   GET /api/orders/order/id/:id
 * @desc    Get a specific order by ID for the authenticated user
 * @access  Protected
 */
router.get('/order/id/:id', authenticateToken, (req, res) => {
    const userEmail = req.user.email;
    const orderId = parseInt(req.params.id, 10);

    const order = orders.find(o => o.id === orderId && o.email === userEmail);

    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    return res.status(200).json({ success: true, order });
});

/**
 * @route   POST /api/orders/create-order
 * @desc    Create a new order for the authenticated user
 * @access  Protected
 */
router.post('/create-order', authenticateToken, (req, res) => {
    const userEmail = req.user.email;
    const { drinks, dish, count } = req.body;

    // Basic validation
    if (!drinks || !Array.isArray(drinks) || !dish || typeof count !== 'number') {
        return res.status(400).json({ success: false, error: 'Invalid order data.' });
    }

    // Assign unique IDs to drinks if not provided
    const processedDrinks = drinks.map(drink => ({
        id: drink.id || generateUUID(),
        name: drink.name,
        description: drink.description,
        imageSource: drink.imageSource,
        price: drink.price,
        category: drink.category,
        brewer: drink.brewer,
    }));

    // Ensure dish has an ID
    const processedDish = {
        id: dish.id || generateUUID(),
        name: dish.name,
        description: dish.description,
        imageSource: dish.imageSource,
        price: dish.price,
        category: dish.category,
        cousine: dish.cousine,
    };

    const newOrder = {
        id: nextOrderId++,
        email: userEmail,
        drinks: processedDrinks,
        dish: processedDish,
        count,
        date: new Date(),
    };

    orders.push(newOrder);

    return res.status(201).json({ success: true, order: newOrder });
});

/**
 * @route   PUT /api/orders/order/id/:id
 * @desc    Update an existing order by ID for the authenticated user
 * @access  Protected
 */
router.put('/order/id/:id', authenticateToken, (req, res) => {
    const userEmail = req.user.email;
    const orderId = parseInt(req.params.id, 10);
    const { drinks, dish, count } = req.body;

    // Basic validation
    if (!drinks || !Array.isArray(drinks) || !dish || typeof count !== 'number') {
        return res.status(400).json({ success: false, error: 'Invalid order data.' });
    }

    const orderIndex = orders.findIndex(o => o.id === orderId && o.email === userEmail);

    if (orderIndex === -1) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    // Assign unique IDs to drinks if not provided
    const processedDrinks = drinks.map(drink => ({
        id: drink.id || generateUUID(),
        name: drink.name,
        description: drink.description,
        imageSource: drink.imageSource,
        price: drink.price,
        category: drink.category,
        brewer: drink.brewer,
    }));

    // Ensure dish has an ID
    const processedDish = {
        id: dish.id || generateUUID(),
        name: dish.name,
        description: dish.description,
        imageSource: dish.imageSource,
        price: dish.price,
        category: dish.category,
        cousine: dish.cousine,
    };

    // Update order
    orders[orderIndex] = {
        ...orders[orderIndex],
        drinks: processedDrinks,
        dish: processedDish,
        count,
        date: new Date(), // Update the date to reflect modification time
    };

    return res.status(200).json({ success: true, order: orders[orderIndex] });
});

/**
 * @route   DELETE /api/orders/order/id/:id
 * @desc    Delete an order by ID for the authenticated user
 * @access  Protected
 */
router.delete('/order/id/:id', authenticateToken, (req, res) => {
    const userEmail = req.user.email;
    const orderId = parseInt(req.params.id, 10);

    const orderIndex = orders.findIndex(o => o.id === orderId && o.email === userEmail);

    if (orderIndex === -1) {
        return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    const deletedOrder = orders.splice(orderIndex, 1)[0];

    return res.status(200).json({ success: true, deletedOrder });
});

/**
 * @route   DELETE /api/orders/order/email/:email
 * @desc    Delete all orders by email for the authenticated user
 * @access  Protected
 */
router.delete('/order/email/:email', authenticateToken, (req, res) => {
    const userEmail = req.user.email;
    const paramEmail = req.params.email;

    if (paramEmail !== userEmail) {
        return res.status(403).json({ success: false, error: 'Unauthorized to delete orders for this email.' });
    }

    const userOrders = orders.filter(o => o.email === paramEmail);

    if (userOrders.length === 0) {
        return res.status(404).json({ success: false, error: 'No orders found for this email.' });
    }

    // Remove all orders for the user
    for (let i = orders.length - 1; i >= 0; i--) {
        if (orders[i].email === paramEmail) {
            orders.splice(i, 1);
        }
    }

    return res.status(200).json({ success: true, deletedOrders: userOrders });
});

module.exports = router;
