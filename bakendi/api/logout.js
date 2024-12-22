// bakendi/api/logout.js

const express = require('express');
const router = express.Router();

/**
 * Logout user by clearing the token cookie
 */
router.post('/', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully, vertu velkomin aftur' });
});

module.exports = router;
