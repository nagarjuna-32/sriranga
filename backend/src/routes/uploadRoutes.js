const express = require('express');
const router = express.Router();
const { upload, handleUpload } = require('../controllers/uploadController');
const { authenticateAdmin } = require('../middleware/auth');

router.post('/', authenticateAdmin, upload.single('image'), handleUpload);

module.exports = router;
