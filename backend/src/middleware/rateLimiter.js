const rateLimit = require('express-rate-limit');

// Rate limiter for login to prevent brute force
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
});

// Rate limiter for public enquiry submissions
const enquiryRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15, // Max 15 submissions per 10 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiries submitted recently. Please wait a few minutes before submitting again.',
  },
});

module.exports = {
  loginRateLimiter,
  enquiryRateLimiter,
};
