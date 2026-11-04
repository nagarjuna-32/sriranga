const { sequelize } = require('../config/database');
const initModels = require('../models');

const registerProvider = async (req, res) => {
  try {
    const {
      full_name,
      business_name,
      phone,
      email,
      category,
      primary_category,
      provider_type,
      services_offered,
      district,
      experience,
      experience_years,
      address,
      gst_number,
      gst_or_id,
    } = req.body;

    const chosenCategory = category || primary_category || 'Construction & Civil Works';
    const chosenBusinessName = business_name || full_name;

    if (!full_name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name and phone number are required.',
      });
    }

    const models = initModels(sequelize());

    const provider = await models.Provider.create({
      full_name,
      business_name: chosenBusinessName,
      phone,
      email: email || null,
      provider_type: provider_type || 'Contractor',
      category: chosenCategory,
      primary_category: chosenCategory,
      services_offered: services_offered || 'All category services',
      district: district || 'Bengaluru Urban',
      experience: experience || `${experience_years || 1} years`,
      experience_years: experience_years ? parseInt(experience_years, 10) : 1,
      address: address || null,
      gst_number: gst_number || gst_or_id || null,
      gst_or_id: gst_number || gst_or_id || null,
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Provider registration application received! Our onboarding team will contact you shortly.',
      data: provider,
    });
  } catch (error) {
    console.error('[PROVIDER REGISTER ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process provider registration.',
    });
  }
};

const getAllProviders = async (req, res) => {
  try {
    const models = initModels(sequelize());
    const { status, category, district } = req.query;

    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (category && category !== 'All') whereClause.category = category;
    if (district && district !== 'All Karnataka') whereClause.district = district;

    const providers = await models.Provider.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    console.error('[GET PROVIDERS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve providers list.',
    });
  }
};

const updateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const models = initModels(sequelize());
    const provider = await models.Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider application not found.',
      });
    }

    if (status) provider.status = status;
    if (admin_notes !== undefined) provider.admin_notes = admin_notes;

    await provider.save();

    return res.status(200).json({
      success: true,
      message: `Provider status updated to ${status}.`,
      data: provider,
    });
  } catch (error) {
    console.error('[UPDATE PROVIDER ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update provider status.',
    });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());

    const provider = await models.Provider.findByPk(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found.',
      });
    }

    await provider.destroy();

    return res.status(200).json({
      success: true,
      message: 'Provider record removed.',
    });
  } catch (error) {
    console.error('[DELETE PROVIDER ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete provider.',
    });
  }
};

module.exports = {
  registerProvider,
  getAllProviders,
  updateProviderStatus,
  deleteProvider,
};
