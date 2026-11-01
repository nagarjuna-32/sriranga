const { sequelize } = require('../config/database');
const initModels = require('../models');

const getPublicTestimonials = async (req, res) => {
  try {
    const models = initModels(sequelize());
    const testimonials = await models.Testimonial.findAll({
      where: { status: 'approved' },
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error('[GET PUBLIC TESTIMONIALS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimonials.',
    });
  }
};

const submitTestimonial = async (req, res) => {
  try {
    const { client_name, designation, company, content, rating } = req.body;

    if (!client_name || !content) {
      return res.status(400).json({
        success: false,
        message: 'Client name and review content are required.',
      });
    }

    const models = initModels(sequelize());
    const testimonial = await models.Testimonial.create({
      client_name: client_name.trim(),
      designation: designation ? designation.trim() : null,
      company: company ? company.trim() : null,
      content: content.trim(),
      rating: rating ? Math.min(Math.max(parseInt(rating), 1), 5) : 5,
      status: 'pending', // Requires admin approval
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your valuable feedback! Your review will be published after verification.',
      data: testimonial,
    });
  } catch (error) {
    console.error('[SUBMIT TESTIMONIAL ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit review.',
    });
  }
};

const getAdminTestimonials = async (req, res) => {
  try {
    const { status } = req.query;
    const models = initModels(sequelize());

    const whereClause = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      whereClause.status = status;
    }

    const testimonials = await models.Testimonial.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error('[ADMIN GET TESTIMONIALS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimonials list.',
    });
  }
};

const updateTestimonialStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (pending, approved, rejected).',
      });
    }

    const models = initModels(sequelize());
    const testimonial = await models.Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found.',
      });
    }

    testimonial.status = status;
    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: `Testimonial status updated to ${status}.`,
      data: testimonial,
    });
  } catch (error) {
    console.error('[UPDATE TESTIMONIAL STATUS ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update testimonial status.',
    });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { client_name, designation, company, content, rating, image_url, status } = req.body;

    if (!client_name || !content) {
      return res.status(400).json({
        success: false,
        message: 'Client name and content are required.',
      });
    }

    const models = initModels(sequelize());
    const testimonial = await models.Testimonial.create({
      client_name: client_name.trim(),
      designation: designation || null,
      company: company || null,
      content: content.trim(),
      rating: rating ? parseInt(rating) : 5,
      image_url: image_url || null,
      status: status || 'approved',
    });

    return res.status(201).json({
      success: true,
      message: 'Testimonial added successfully.',
      data: testimonial,
    });
  } catch (error) {
    console.error('[ADMIN CREATE TESTIMONIAL ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create testimonial.',
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const testimonial = await models.Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found.',
      });
    }

    const { client_name, designation, company, content, rating, image_url, status } = req.body;

    if (client_name !== undefined) testimonial.client_name = client_name;
    if (designation !== undefined) testimonial.designation = designation;
    if (company !== undefined) testimonial.company = company;
    if (content !== undefined) testimonial.content = content;
    if (rating !== undefined) testimonial.rating = rating;
    if (image_url !== undefined) testimonial.image_url = image_url;
    if (status !== undefined) testimonial.status = status;

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully.',
      data: testimonial,
    });
  } catch (error) {
    console.error('[ADMIN UPDATE TESTIMONIAL ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update testimonial.',
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const testimonial = await models.Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found.',
      });
    }

    await testimonial.destroy();

    return res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully.',
    });
  } catch (error) {
    console.error('[DELETE TESTIMONIAL ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete testimonial.',
    });
  }
};

module.exports = {
  getPublicTestimonials,
  submitTestimonial,
  getAdminTestimonials,
  updateTestimonialStatus,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
