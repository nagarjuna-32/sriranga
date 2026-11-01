const { sequelize } = require('../config/database');
const initModels = require('../models');

const getPublicSettings = async (req, res) => {
  try {
    const models = initModels(sequelize());
    const settings = await models.WebsiteSetting.findAll();

    // Map into an easily consumable key-value object
    const settingsMap = {};
    settings.forEach((s) => {
      settingsMap[s.setting_key] = s.setting_value;
    });

    return res.status(200).json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    console.error('[GET SETTINGS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve website settings.',
    });
  }
};

const getAllSettings = async (req, res) => {
  try {
    const models = initModels(sequelize());
    const settings = await models.WebsiteSetting.findAll({
      order: [['setting_group', 'ASC'], ['setting_key', 'ASC']],
    });

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('[GET ALL SETTINGS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve website settings list.',
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body; // Expects object { [key]: value } or array of { key, value }

    if (!settings) {
      return res.status(400).json({
        success: false,
        message: 'Settings payload is required.',
      });
    }

    const models = initModels(sequelize());

    if (Array.isArray(settings)) {
      for (const item of settings) {
        await models.WebsiteSetting.upsert({
          setting_key: item.setting_key,
          setting_value: item.setting_value,
          setting_group: item.setting_group || 'general',
          description: item.description,
        });
      }
    } else {
      for (const [key, val] of Object.entries(settings)) {
        const existing = await models.WebsiteSetting.findOne({ where: { setting_key: key } });
        if (existing) {
          existing.setting_value = val;
          await existing.save();
        } else {
          await models.WebsiteSetting.create({
            setting_key: key,
            setting_value: val,
            setting_group: 'general',
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Website settings updated successfully.',
    });
  } catch (error) {
    console.error('[UPDATE SETTINGS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update website settings.',
    });
  }
};

module.exports = {
  getPublicSettings,
  getAllSettings,
  updateSettings,
};
