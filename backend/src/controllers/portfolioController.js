const { sequelize } = require('../config/database');
const initModels = require('../models');

const getPortfolioProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const models = initModels(sequelize());

    const whereClause = {};
    if (category && category !== 'All') {
      whereClause.category = category;
    }
    if (featured === 'true') {
      whereClause.is_featured = true;
    }

    const projects = await models.PortfolioProject.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('[GET PORTFOLIO ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio projects.',
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const project = await models.PortfolioProject.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('[GET PROJECT ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve project details.',
    });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      client_name,
      project_date,
      image_url,
      tags,
      is_featured,
    } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and description are required.',
      });
    }

    const models = initModels(sequelize());
    const project = await models.PortfolioProject.create({
      title,
      category,
      description,
      client_name: client_name || null,
      project_date: project_date || null,
      image_url: image_url || null,
      tags: tags || [],
      is_featured: is_featured || false,
    });

    return res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully.',
      data: project,
    });
  } catch (error) {
    console.error('[CREATE PROJECT ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create portfolio project.',
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const project = await models.PortfolioProject.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    const {
      title,
      category,
      description,
      client_name,
      project_date,
      image_url,
      tags,
      is_featured,
    } = req.body;

    if (title !== undefined) project.title = title;
    if (category !== undefined) project.category = category;
    if (description !== undefined) project.description = description;
    if (client_name !== undefined) project.client_name = client_name;
    if (project_date !== undefined) project.project_date = project_date;
    if (image_url !== undefined) project.image_url = image_url;
    if (tags !== undefined) project.tags = tags;
    if (is_featured !== undefined) project.is_featured = is_featured;

    await project.save();

    return res.status(200).json({
      success: true,
      message: 'Portfolio project updated successfully.',
      data: project,
    });
  } catch (error) {
    console.error('[UPDATE PROJECT ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update portfolio project.',
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const project = await models.PortfolioProject.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    await project.destroy();

    return res.status(200).json({
      success: true,
      message: 'Portfolio project deleted successfully.',
    });
  } catch (error) {
    console.error('[DELETE PROJECT ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete portfolio project.',
    });
  }
};

module.exports = {
  getPortfolioProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
