const { sequelize } = require('../config/database');
const initModels = require('../models');

// Helper to slugify
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const getAllServices = async (req, res) => {
  try {
    const models = initModels(sequelize());
    const isAdmin = req.query.admin === 'true';
    const whereClause = isAdmin ? {} : { is_active: true };

    const services = await models.Service.findAll({
      where: whereClause,
      order: [
        ['display_order', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('[GET SERVICES ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve services.',
    });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const models = initModels(sequelize());

    const service = await models.Service.findOne({
      where: { slug },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('[GET SERVICE ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve service details.',
    });
  }
};

const createService = async (req, res) => {
  try {
    const {
      title,
      category,
      short_description,
      full_description,
      icon,
      features,
      image_url,
      is_active,
      display_order,
    } = req.body;

    if (!title || !short_description || !full_description) {
      return res.status(400).json({
        success: false,
        message: 'Title, short description, and full description are required.',
      });
    }

    const models = initModels(sequelize());
    let slug = slugify(title);

    // Ensure unique slug
    let existing = await models.Service.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const service = await models.Service.create({
      title,
      slug,
      category: category || 'General Services',
      short_description,
      full_description,
      icon: icon || 'Briefcase',
      features: features || [],
      image_url: image_url || null,
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (error) {
    console.error('[CREATE SERVICE ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create service.',
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const service = await models.Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const {
      title,
      category,
      short_description,
      full_description,
      icon,
      features,
      image_url,
      is_active,
      display_order,
    } = req.body;

    if (title && title !== service.title) {
      service.title = title;
      // Optionally update slug if requested or keep stable
    }
    if (category !== undefined) service.category = category;
    if (short_description !== undefined) service.short_description = short_description;
    if (full_description !== undefined) service.full_description = full_description;
    if (icon !== undefined) service.icon = icon;
    if (features !== undefined) service.features = features;
    if (image_url !== undefined) service.image_url = image_url;
    if (is_active !== undefined) service.is_active = is_active;
    if (display_order !== undefined) service.display_order = display_order;

    await service.save();

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    console.error('[UPDATE SERVICE ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update service.',
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const service = await models.Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    await service.destroy();

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  } catch (error) {
    console.error('[DELETE SERVICE ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete service.',
    });
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
