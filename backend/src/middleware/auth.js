const { verifyToken } = require('../utils/jwt');
const { sequelize } = require('../config/database');
const initModels = require('../models');

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization required. Please log in.',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing.',
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.',
      });
    }

    const models = initModels(sequelize());
    const admin = await models.Admin.findByPk(decoded.id, {
      attributes: ['id', 'username', 'email', 'full_name', 'role'],
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found or deactivated.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('[AUTH ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

module.exports = {
  authenticateAdmin,
};
