const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'ranga_sri_enterprises';
const dialect = process.env.DB_DIALECT || 'mysql';

let sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database/ranga_sri_local.sqlite'),
    logging: false,
  });
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
    },
  });
}

// Resilient connection handler with fallback for dev if MySQL server is not locally running
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`[DB] Connected successfully to ${dialect.toUpperCase()} database: ${dialect === 'sqlite' ? 'local sqlite' : dbName}`);
    return sequelize;
  } catch (error) {
    if (dialect === 'mysql' && (error.name === 'SequelizeConnectionRefusedError' || error.name === 'SequelizeAccessDeniedError' || error.original?.code === 'ECONNREFUSED')) {
      console.warn(`\n[DB WARNING] Could not connect to MySQL server at ${dbHost}:${dbPort} (${error.message}).`);
      console.warn('[DB WARNING] Switching gracefully to SQLite fallback so you can run, develop and test without local MySQL server setup.\n');
      
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../database/ranga_sri_local.sqlite'),
        logging: false,
        define: {
          timestamps: true,
          underscored: true,
        },
      });
      await sequelize.authenticate();
      console.log('[DB] Fallback SQLite database connected successfully.');
      return sequelize;
    }
    throw error;
  }
};

module.exports = {
  sequelize: () => sequelize,
  initDatabase,
};
