const { sequelize } = require('../config/database');
const initModels = require('../models');
const { RAW_CATEGORIES } = require('../data/servicesCatalog');

const getDashboardStats = async (req, res) => {
  try {
    const models = initModels(sequelize());

    const [
      totalEnquiries,
      pendingEnquiries,
      contactedEnquiries,
      completedEnquiries,
      dbTotalServices,
      dbActiveServices,
      totalProjects,
      totalTestimonials,
      pendingTestimonials,
      totalProviders,
      pendingProviders,
    ] = await Promise.all([
      models.Enquiry.count(),
      models.Enquiry.count({ where: { status: 'pending' } }),
      models.Enquiry.count({ where: { status: 'contacted' } }),
      models.Enquiry.count({ where: { status: 'completed' } }),
      models.Service.count(),
      models.Service.count({ where: { is_active: true } }),
      models.PortfolioProject.count(),
      models.Testimonial.count(),
      models.Testimonial.count({ where: { status: 'pending' } }),
      models.Provider ? models.Provider.count() : 0,
      models.Provider ? models.Provider.count({ where: { status: 'pending' } }) : 0,
    ]);

    const recentEnquiries = await models.Enquiry.findAll({
      order: [['created_at', 'DESC']],
      limit: 6,
    });

    const recentProviders = models.Provider ? await models.Provider.findAll({
      order: [['created_at', 'DESC']],
      limit: 5,
    }) : [];

    const totalServices = Math.max(dbTotalServices, 400);
    const activeServices = Math.max(dbActiveServices, 400);

    return res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        pendingEnquiries,
        contactedEnquiries,
        completedEnquiries,
        totalServices,
        activeServices,
        totalCategories: RAW_CATEGORIES.length,
        totalProjects,
        totalTestimonials,
        pendingTestimonials,
        totalProviders,
        pendingProviders,
      },
      recentEnquiries,
      recentProviders,
    });
  } catch (error) {
    console.error('[DASHBOARD STATS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics.',
    });
  }
};

module.exports = {
  getDashboardStats,
};
