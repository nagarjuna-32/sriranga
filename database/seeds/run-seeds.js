const { initDatabase } = require('../../backend/src/config/database');
const initModels = require('../../backend/src/models');
const {
  initialSettings,
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
      await models.WebsiteSetting.findOrCreate({
        where: { setting_key: setting.setting_key },
        defaults: setting,
      });
    }
    console.log('[SEED] Website settings populated successfully.');

    // 3. Seed Services
    for (const s of initialServices) {
      const existing = await models.Service.findOne({ where: { slug: s.slug } });
      if (!existing) {
        await models.Service.create(s);
      }
    }
    console.log('[SEED] 6 core services verified/created.');

    // 4. Seed Portfolio Projects
    const projectCount = await models.PortfolioProject.count();
    if (projectCount === 0) {
      await models.PortfolioProject.bulkCreate(initialPortfolio);
      console.log('[SEED] Initial portfolio projects created.');
    } else {
      console.log(`[SEED] Portfolio projects exist (${projectCount} found)`);
    }

    // 5. Seed Testimonials
    const testimonialCount = await models.Testimonial.count();
    if (testimonialCount === 0) {
      await models.Testimonial.bulkCreate(initialTestimonials);
      console.log('[SEED] Approved client testimonials populated.');
    } else {
      console.log(`[SEED] Testimonials exist (${testimonialCount} found)`);
    }

    console.log('\n[SEED] Database seeding completed successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('[SEED ERROR]', err);
    process.exit(1);
  }
};

runSeeds();
