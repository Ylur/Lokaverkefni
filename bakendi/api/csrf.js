// bakendi/routes/csrf.js
//Handles CSRF token generation

const express = require('express');
const router = express.Router();
const csrf = require('csurf');

// Initialize CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Define the route at '/' since it's mounted at '/api/csrf-token'
router.get('/', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
