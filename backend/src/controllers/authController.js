const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { sequelize } = require('../config/database');
const initModels = require('../models');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/email and password are required.',
      });
    }

    const models = initModels(sequelize());
    const admin = await models.Admin.findOne({
      where: {
        [models.sequelize.Sequelize.Op.or]: [
          { username: username.trim() },
          { email: username.trim().toLowerCase() },
        ],
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password credentials.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password credentials.',
      });
    }

    // Update last login
    admin.last_login = new Date();
    await admin.save();

    const token = generateToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during authentication.',
    });
  }
};

const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error('[PROFILE ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching profile.',
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both current password and new password are required.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.',
      });
    }

    const models = initModels(sequelize());
    const admin = await models.Admin.findByPk(req.admin.id);

    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    admin.password_hash = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (error) {
    console.error('[CHANGE PASSWORD ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating password.',
    });
  }
};

module.exports = {
  login,
  getProfile,
  changePassword,
};
