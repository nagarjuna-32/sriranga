const express = require('express');
const router = express.Router();
const {
  registerProvider,
  getAllProviders,
  updateProviderStatus,
  deleteProvider,
} = require('../controllers/providerController');
const { authenticateAdmin } = require('../middleware/auth');
const { enquiryRateLimiter } = require('../middleware/rateLimiter');

// Public partner registration
router.post('/register', enquiryRateLimiter, registerProvider);

// Admin endpoints
router.get('/', authenticateAdmin, getAllProviders);
router.put('/:id/status', authenticateAdmin, updateProviderStatus);
router.delete('/:id', authenticateAdmin, deleteProvider);

module.exports = router;
