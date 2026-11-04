const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getCategories,
  getDistricts,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { authenticateAdmin } = require('../middleware/auth');

// Public endpoints
router.get('/', getAllServices);
router.get('/meta/categories', getCategories);
router.get('/meta/districts', getDistricts);
router.get('/:slug', getServiceBySlug);

// Admin endpoints
router.post('/', authenticateAdmin, createService);
router.put('/:id', authenticateAdmin, updateService);
router.delete('/:id', authenticateAdmin, deleteService);

module.exports = router;
