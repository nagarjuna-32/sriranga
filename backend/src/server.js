const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const { initDatabase } = require('./config/database');
const initModels = require('./models');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Access denied for this origin.'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ranga Sri Enterprises Core REST API',
    status: 'Running',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server and Synchronize Database
const startServer = async () => {
  try {
    const sequelize = await initDatabase();
    const models = initModels(sequelize);

    // Sync models with DB
    await sequelize.sync({ alter: false });
    console.log('[DB] Database tables synchronized successfully.');

    // Auto-seed if database is empty
    const adminCount = await models.Admin.count();
    if (adminCount === 0) {
      console.log('[SERVER] Empty database detected. Running automated bootstrap seeder...');
      const {
        initialSettings,
        initialServices,
        initialPortfolio,
        initialTestimonials,
        getHashedAdminPassword,
      } = require('../../database/seeds/seedData');

      const passwordHash = await getHashedAdminPassword();
      await models.Admin.create({
        username: 'admin',
        email: 'admin@rangasrienterprises.com',
        password_hash: passwordHash,
        full_name: 'Administrator',
        role: 'superadmin',
      });

      for (const setting of initialSettings) {
        await models.WebsiteSetting.findOrCreate({
          where: { setting_key: setting.setting_key },
          defaults: setting,
        });
      }

      for (const s of initialServices) {
        await models.Service.findOrCreate({
          where: { slug: s.slug },
          defaults: s,
        });
      }

      await models.PortfolioProject.bulkCreate(initialPortfolio);
      await models.Testimonial.bulkCreate(initialTestimonials);
      console.log('[SERVER] Initial seeds bootstrapped successfully.');
    }

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 RANGA SRI ENTERPRISES API SERVER RUNNING ON PORT ${PORT}`);
      console.log(`🌐 Base URL: http://localhost:${PORT}`);
      console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`======================================================\n`);
    });
  } catch (err) {
    console.error('Fatal: Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
