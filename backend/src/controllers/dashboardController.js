const { sequelize } = require('../config/database');
const initModels = require('../models');

const getDashboardStats = async (req, res) => {
  try {
    const models = initModels(sequelize());

    const [
      totalEnquiries,
      pendingEnquiries,
      contactedEnquiries,
      completedEnquiries,
      totalServices,
      activeServices,
      totalProjects,
      totalTestimonials,
      pendingTestimonials,
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
    ]);

    const recentEnquiries = await models.Enquiry.findAll({
      order: [['created_at', 'DESC']],
      limit: 6,
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        pendingEnquiries,
        contactedEnquiries,
        completedEnquiries,
        totalServices,
        activeServices,
        totalProjects,
        totalTestimonials,
        pendingTestimonials,
      },
      recentEnquiries,
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
