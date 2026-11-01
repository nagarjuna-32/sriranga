const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const serviceRoutes = require('./serviceRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const settingsRoutes = require('./settingsRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/settings', settingsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/upload', uploadRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Ranga Sri Enterprises API',
  });
});

module.exports = router;
