const express = require('express');
const router = express.Router();
const {
  getPublicSettings,
  getAllSettings,
  updateSettings,
} = require('../controllers/settingsController');
const { authenticateAdmin } = require('../middleware/auth');

// Public
router.get('/public', getPublicSettings);

// Admin
router.get('/', authenticateAdmin, getAllSettings);
router.post('/update', authenticateAdmin, updateSettings);

module.exports = router;
