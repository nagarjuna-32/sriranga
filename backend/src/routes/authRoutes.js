const express = require('express');
const router = express.Router();
const { login, getProfile, changePassword } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/auth');
const { loginRateLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginRateLimiter, login);
router.get('/profile', authenticateAdmin, getProfile);
router.put('/change-password', authenticateAdmin, changePassword);

module.exports = router;
