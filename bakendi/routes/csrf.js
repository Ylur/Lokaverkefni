// bakendi/routes/csrf.js

const express = require('express');
const router = express.Router();
const csrf = require('csurf');

// Initialize CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

router.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
