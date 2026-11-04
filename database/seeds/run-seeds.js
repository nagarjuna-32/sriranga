const { initDatabase } = require('../../backend/src/config/database');
const initModels = require('../../backend/src/models');
const {
  initialSettings,
  initialCategories,
  initialServices,
  initialPortfolio,
  initialTestimonials,
  getHashedAdminPassword,
} = require('./seedData');

const runSeeds = async () => {
  try {
    console.log('[SEED] Initializing database connection...');
    const sequelize = await initDatabase();
    const models = initModels(sequelize);

    console.log('[SEED] Synchronizing database tables...');
    await sequelize.sync({ alter: true });

    // 1. Seed Admin
    const adminCount = await models.Admin.count();
    if (adminCount === 0) {
      const passwordHash = await getHashedAdminPassword();
      await models.Admin.create({
        username: 'admin',
        email: 'admin@rangasrienterprises.com',
        password_hash: passwordHash,
        full_name: 'Administrator',
        role: 'superadmin',
      });
      console.log('[SEED] Superadmin account created (admin / Admin@RangaSri2026!)');
    } else {
      console.log(`[SEED] Admin already exists (${adminCount} found)`);
    }

    // 2. Seed Settings
    for (const setting of initialSettings) {
      const [rec, created] = await models.WebsiteSetting.findOrCreate({
        where: { setting_key: setting.setting_key },
        defaults: setting,
      });
      if (!created) {
        await rec.update(setting);
      }
    }
    console.log('[SEED] Website settings populated and synchronized successfully.');

    // 3. Seed 20 Categories
    if (models.Category) {
      for (const cat of initialCategories) {
        await models.Category.findOrCreate({
          where: { slug: cat.slug },
          defaults: cat,
        });
      }
      console.log(`[SEED] ${initialCategories.length} main categories synchronized.`);
    }

    // 4. Seed 400 Services
    console.log('[SEED] Re-populating 400 specialized services catalog...');
    await models.Service.destroy({ where: {} });
    
    // Batch create without explicit ID to let autoincrement sequence smoothly
    const servicePayloads = initialServices.map(s => {
      const { id, ...rest } = s;
      return rest;
    });

    // Chunk insert in batches of 50 for efficiency
    const chunkSize = 50;
    for (let i = 0; i < servicePayloads.length; i += chunkSize) {
      const chunk = servicePayloads.slice(i, i + chunkSize);
      await models.Service.bulkCreate(chunk);
    }

    const finalServiceCount = await models.Service.count();
    console.log(`[SEED] Total ${finalServiceCount} services successfully verified in catalog!`);

    // 5. Seed Portfolio Projects
    const projectCount = await models.PortfolioProject.count();
    if (projectCount === 0) {
      await models.PortfolioProject.bulkCreate(initialPortfolio);
      console.log('[SEED] Initial portfolio projects created.');
    } else {
      console.log(`[SEED] Portfolio projects exist (${projectCount} found)`);
    }

    // 6. Seed Testimonials
    const testimonialCount = await models.Testimonial.count();
    if (testimonialCount === 0) {
      await models.Testimonial.bulkCreate(initialTestimonials);
      console.log('[SEED] Approved client testimonials populated.');
    } else {
      console.log(`[SEED] Testimonials exist (${testimonialCount} found)`);
    }

    console.log('\n======================================================');
    console.log('✅ DATABASE SEEDING COMPLETED: 20 CATEGORIES & 400 SERVICES');
    console.log('======================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('[SEED ERROR]', err);
    process.exit(1);
  }
};

runSeeds();
