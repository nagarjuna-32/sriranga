const express = require('express');
const router = express.Router();
const {
  getPublicTestimonials,
  submitTestimonial,
  getAdminTestimonials,
  updateTestimonialStatus,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { authenticateAdmin } = require('../middleware/auth');
const { enquiryRateLimiter } = require('../middleware/rateLimiter');

// Public
router.get('/public', getPublicTestimonials);
router.post('/submit', enquiryRateLimiter, submitTestimonial);

// Admin
router.get('/', authenticateAdmin, getAdminTestimonials);
router.patch('/:id/status', authenticateAdmin, updateTestimonialStatus);
router.post('/', authenticateAdmin, createTestimonial);
router.put('/:id', authenticateAdmin, updateTestimonial);
router.delete('/:id', authenticateAdmin, deleteTestimonial);

module.exports = router;
