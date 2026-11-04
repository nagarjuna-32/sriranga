const { sequelize } = require('../config/database');
const initModels = require('../models');
const { RAW_CATEGORIES, ALL_SERVICES, KARNATAKA_DISTRICTS, slugify } = require('../data/servicesCatalog');
const { Op } = require('sequelize');

const getAllServices = async (req, res) => {
  try {
    const models = initModels(sequelize());
    const isAdmin = req.query.admin === 'true';
    const { category, search, district, limit, offset } = req.query;

    const whereClause = isAdmin ? {} : { is_active: true };

    if (category && category !== 'All' && category !== 'all') {
      whereClause.category = {
        [Op.like]: `%${category}%`
      };
    }

    if (search && search.trim() !== '') {
      const q = `%${search.trim()}%`;
      whereClause[Op.or] = [
        { title: { [Op.like]: q } },
        { category: { [Op.like]: q } },
        { short_description: { [Op.like]: q } }
      ];
    }

    let services = await models.Service.findAll({
      where: whereClause,
      order: [
        ['display_order', 'ASC'],
        ['id', 'ASC'],
      ],
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });

    // Resilient fallback: If database is not fully populated yet, use our built-in 400-service catalog
    if (!services || services.length === 0) {
      let filtered = [...ALL_SERVICES];
      if (!isAdmin) {
        filtered = filtered.filter(s => s.is_active);
      }
      if (category && category !== 'All' && category !== 'all') {
        const catLower = category.toLowerCase();
        filtered = filtered.filter(s => s.category.toLowerCase().includes(catLower) || s.category_slug.includes(catLower));
      }
      if (search && search.trim() !== '') {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(q) || 
          s.category.toLowerCase().includes(q) || 
          s.short_description.toLowerCase().includes(q)
        );
      }
      services = filtered;
    }

    return res.status(200).json({
      success: true,
      total_count: services.length,
      categories_count: RAW_CATEGORIES.length,
      data: services,
    });
  } catch (error) {
    console.error('[GET SERVICES ERROR]', error);
    // Graceful fallback to static 400 catalog
    return res.status(200).json({
      success: true,
      total_count: ALL_SERVICES.length,
      categories_count: RAW_CATEGORIES.length,
      data: ALL_SERVICES,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categoriesWithCount = RAW_CATEGORIES.map(c => ({
      ...c,
      services_count: c.services.length
    }));

    return res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      data: categoriesWithCount
    });
  } catch (error) {
    console.error('[GET CATEGORIES ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories.'
    });
  }
};

const getDistricts = async (req, res) => {
  return res.status(200).json({
    success: true,
    count: KARNATAKA_DISTRICTS.length,
    data: KARNATAKA_DISTRICTS
  });
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const models = initModels(sequelize());

    let service = await models.Service.findOne({
      where: { slug },
    });

    if (!service) {
      // Check in memory catalog
      service = ALL_SERVICES.find(s => s.slug === slug || s.slug.endsWith(slug));
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found in catalog.',
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('[GET SERVICE ERROR]', error);
    const fallback = ALL_SERVICES.find(s => s.slug === req.params.slug);
    if (fallback) {
      return res.status(200).json({ success: true, data: fallback });
    }
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

    let existing = await models.Service.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newService = await models.Service.create({
      title,
      slug,
      category: category || 'General',
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
      data: newService,
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
      service.slug = slugify(title);
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
  getCategories,
  getDistricts,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
