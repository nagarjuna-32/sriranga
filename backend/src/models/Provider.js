const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Provider = sequelize.define('Provider', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    services_offered: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: 'Bengaluru Urban',
    },
    experience_years: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gst_or_id: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending',
    },
    admin_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'providers',
    timestamps: true,
    underscored: true,
  });

  return Provider;
};
