const { sequelize } = require('../config/database');
const initModels = require('../models');

const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, service_name, category, district, enquiry_type, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and message are required.',
      });
    }

    // Phone validation: allow digits, spaces, hyphens, plus sign
    const cleanPhone = phone.trim();
    if (cleanPhone.length < 7 || cleanPhone.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (7-20 characters).',
      });
    }

    const models = initModels(sequelize());
    const enquiry = await models.Enquiry.create({
      name: name.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : null,
      service_name: service_name || 'General Inquiry',
      category: category || 'General',
      district: district || 'Bengaluru Urban',
      enquiry_type: enquiry_type || 'Enquiry',
      message: message.trim(),
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully. Our team will contact you shortly.',
      data: {
        id: enquiry.id,
        name: enquiry.name,
        service_name: enquiry.service_name,
        category: enquiry.category,
        district: enquiry.district,
        enquiry_type: enquiry.enquiry_type,
        created_at: enquiry.created_at,
      },
    });
  } catch (error) {
    console.error('[CREATE ENQUIRY ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again or reach out directly on WhatsApp.',
    });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;
    const models = initModels(sequelize());

    const whereClause = {};
    if (status && ['pending', 'contacted', 'completed'].includes(status)) {
      whereClause.status = status;
    }

    if (search) {
      whereClause[models.sequelize.Sequelize.Op.or] = [
        { name: { [models.sequelize.Sequelize.Op.like]: `%${search}%` } },
        { phone: { [models.sequelize.Sequelize.Op.like]: `%${search}%` } },
        { email: { [models.sequelize.Sequelize.Op.like]: `%${search}%` } },
        { service_name: { [models.sequelize.Sequelize.Op.like]: `%${search}%` } },
      ];
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await models.Enquiry.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: true,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / parseInt(limit)),
      data: rows,
    });
  } catch (error) {
    console.error('[GET ENQUIRIES ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries.',
    });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    if (!status || !['pending', 'contacted', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (pending, contacted, completed).',
      });
    }

    const models = initModels(sequelize());
    const enquiry = await models.Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    enquiry.status = status;
    if (admin_notes !== undefined) {
      enquiry.admin_notes = admin_notes;
    }
    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: enquiry,
    });
  } catch (error) {
    console.error('[UPDATE ENQUIRY ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry.',
    });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const models = initModels(sequelize());
    const enquiry = await models.Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    await enquiry.destroy();

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    console.error('[DELETE ENQUIRY ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.',
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
