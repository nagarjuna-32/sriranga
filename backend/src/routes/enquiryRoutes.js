const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { authenticateAdmin } = require('../middleware/auth');
const { enquiryRateLimiter } = require('../middleware/rateLimiter');

// Public enquiry submission
router.post('/', enquiryRateLimiter, createEnquiry);

// Admin enquiry operations
router.get('/', authenticateAdmin, getEnquiries);
router.put('/:id', authenticateAdmin, updateEnquiryStatus);
router.delete('/:id', authenticateAdmin, deleteEnquiry);

module.exports = router;
